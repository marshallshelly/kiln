mod check;
mod devtools;
mod dom;
mod events;
mod native;
mod package;
mod replay;
mod script;

use std::sync::Arc;

use anyhow::{Context, Result, bail};
use anyrender::WindowRenderer;
use anyrender_vello::VelloWindowRenderer;
use winit::application::ApplicationHandler;
use winit::dpi::PhysicalPosition;
use winit::event::{ElementState, MouseButton, WindowEvent};
use winit::event_loop::{ActiveEventLoop, ControlFlow, EventLoop};
use winit::window::{Window, WindowId};

use dom::Dom;
use script::Script;

const DEFAULT_WIDTH: u32 = 1000;
const DEFAULT_HEIGHT: u32 = 700;

struct Watch {
    entry: std::path::PathBuf,
    stamps: Vec<(std::path::PathBuf, Option<std::time::SystemTime>)>,
}

impl Watch {
    fn new(entry: &str, dom: &Dom) -> Self {
        let entry = std::path::PathBuf::from(entry);
        let mut watch = Self {
            entry,
            stamps: Vec::new(),
        };
        watch.stamps = watch.stamp(dom);
        watch
    }

    fn sources(&self, dom: &Dom) -> Vec<std::path::PathBuf> {
        let base = self
            .entry
            .parent()
            .unwrap_or_else(|| std::path::Path::new("."));
        let mut paths = vec![self.entry.clone()];
        for source in dom.scripts() {
            if let dom::Script::Src(src) = source {
                paths.push(base.join(src));
            }
        }
        paths
    }

    fn stamp(&self, dom: &Dom) -> Vec<(std::path::PathBuf, Option<std::time::SystemTime>)> {
        self.sources(dom)
            .into_iter()
            .map(|path| {
                let stamp = std::fs::metadata(&path).and_then(|m| m.modified()).ok();
                (path, stamp)
            })
            .collect()
    }

    fn changed(&mut self, dom: &Dom) -> bool {
        let current = self.stamp(dom);
        let changed = current != self.stamps;
        self.stamps = current;
        changed
    }
}

struct App {
    native: std::rc::Rc<native::Native>,
    window: Option<Arc<Window>>,
    renderer: VelloWindowRenderer,
    dom: Dom,
    script: Script,
    cursor: PhysicalPosition<f64>,
    scale: f32,
    size: (u32, u32),
    started: std::time::Instant,
    watch: Option<Watch>,
    devtools: Option<devtools::Devtools>,
    failure: Option<anyhow::Error>,
}

impl App {
    fn new(dom: Dom, script: Script, native: std::rc::Rc<native::Native>) -> Self {
        Self {
            native,
            window: None,
            renderer: VelloWindowRenderer::new(),
            dom,
            script,
            cursor: PhysicalPosition::new(0.0, 0.0),
            scale: 1.0,
            size: (DEFAULT_WIDTH, DEFAULT_HEIGHT),
            started: std::time::Instant::now(),
            watch: None,
            devtools: None,
            failure: None,
        }
    }

    fn init(&mut self, event_loop: &ActiveEventLoop) -> Result<()> {
        let window = Arc::new(
            event_loop
                .create_window(
                    Window::default_attributes()
                        .with_title("Kiln")
                        .with_inner_size(winit::dpi::LogicalSize::new(
                            f64::from(DEFAULT_WIDTH),
                            f64::from(DEFAULT_HEIGHT),
                        )),
                )
                .context("create window")?,
        );

        let size = window.inner_size();
        self.scale = window.scale_factor() as f32;
        self.size = (size.width, size.height);

        self.renderer.resume(
            Arc::clone(&window) as Arc<_>,
            size.width,
            size.height,
            || {},
        );
        if !self.renderer.complete_resume() {
            bail!("renderer failed to initialize");
        }

        if let Err(error) = self.native.realise() {
            eprintln!("{error:?}");
        }
        window.set_ime_allowed(true);
        self.dom.set_viewport(size.width, size.height, self.scale);
        window.request_redraw();
        self.window = Some(window);
        Ok(())
    }

    fn drive(&mut self, event: blitz_traits::events::UiEvent) {
        let mut redraw = false;
        for dispatch in self.dom.drive(event) {
            match self.script.dispatch(&dispatch) {
                Ok(fired) => redraw |= fired,
                Err(error) => eprintln!("{error:?}"),
            }
        }
        if redraw && let Some(window) = self.window.as_ref() {
            window.request_redraw();
        }
    }

    fn poll_reload(&mut self, event_loop: &ActiveEventLoop) {
        let Some(watch) = self.watch.as_mut() else {
            return;
        };
        if !watch.changed(&self.dom) {
            return;
        }

        let entry = watch.entry.clone();
        let input = entry.to_string_lossy().into_owned();
        match load(&input) {
            Ok((dom, script, native)) => {
                dom.set_viewport(self.size.0, self.size.1, self.scale);
                self.dom = dom;
                self.script = script;
                self.native = native;
                if let Some(watch) = self.watch.as_mut() {
                    watch.stamps = watch.stamp(&self.dom);
                }
                if let Err(error) = self.native.realise() {
                    eprintln!("{error:?}");
                }
                println!("reloaded {input}");
            }
            Err(error) => eprintln!("reload failed: {error:?}"),
        }

        if let Some(window) = self.window.as_ref() {
            window.request_redraw();
        }
        let _ = event_loop;
    }

    fn pump_menu(&mut self) {
        for id in self.native.drain_menu_events() {
            if let Err(error) = self.script.dispatch_menu(&id) {
                eprintln!("{error:?}");
            }
        }
    }

    fn redraw(&mut self) {
        if !self.renderer.is_active() {
            return;
        }
        self.dom.set_time(self.started.elapsed().as_secs_f64());
        self.dom.settle(&self.script);

        let animating = self.dom.is_animating();
        let Self {
            renderer,
            dom,
            scale,
            size,
            ..
        } = self;
        let (width, height) = *size;
        let scale = f64::from(*scale);
        renderer.render(|scene| dom.paint(scene, scale, width, height));

        if animating && let Some(window) = self.window.as_ref() {
            window.request_redraw();
        }
    }
}

impl ApplicationHandler for App {
    fn about_to_wait(&mut self, event_loop: &ActiveEventLoop) {
        if let Some(devtools) = self.devtools.as_ref() {
            devtools.pump(&self.dom, &self.script);
            if let Some(window) = self.window.as_ref() {
                window.request_redraw();
            }
        }
        if self.watch.is_none() && self.devtools.is_none() {
            return;
        }
        self.poll_reload(event_loop);
        event_loop.set_control_flow(ControlFlow::WaitUntil(
            std::time::Instant::now() + std::time::Duration::from_millis(250),
        ));
    }

    fn resumed(&mut self, event_loop: &ActiveEventLoop) {
        if self.window.is_some() {
            return;
        }
        if let Err(error) = self.init(event_loop) {
            self.failure = Some(error);
            event_loop.exit();
        }
    }

    fn window_event(&mut self, event_loop: &ActiveEventLoop, _id: WindowId, event: WindowEvent) {
        match event {
            WindowEvent::CloseRequested => event_loop.exit(),
            WindowEvent::Resized(size) => {
                if size.width == 0 || size.height == 0 {
                    return;
                }
                self.size = (size.width, size.height);
                self.renderer.set_size(size.width, size.height);
                self.dom.set_viewport(size.width, size.height, self.scale);
                if let Some(window) = self.window.as_ref() {
                    window.request_redraw();
                }
            }
            WindowEvent::CursorMoved { position, .. } => {
                self.cursor = position;
                self.drive(events::pointer_move(position.x as f32, position.y as f32));
                if let Some(window) = self.window.as_ref() {
                    window.request_redraw();
                }
            }
            WindowEvent::MouseInput { state, button, .. } => {
                let x = self.cursor.x as f32;
                let y = self.cursor.y as f32;
                self.drive(events::pointer_button(x, y, button, state));
                if let Some(window) = self.window.as_ref() {
                    window.request_redraw();
                }
            }
            WindowEvent::MouseWheel { delta, .. } => {
                let x = self.cursor.x as f32;
                let y = self.cursor.y as f32;
                self.drive(events::wheel(x, y, delta));
                let (dx, dy) = events::wheel_pixels_of(delta);
                let anchor = self.dom.hover_node();
                for dispatch in self.dom.scroll(anchor, dx, dy) {
                    if let Err(error) = self.script.dispatch(&dispatch) {
                        eprintln!("{error:?}");
                    }
                }
                if let Some(window) = self.window.as_ref() {
                    window.request_redraw();
                }
            }
            WindowEvent::Ime(event) => self.drive(events::ime(event)),
            WindowEvent::KeyboardInput { event, .. } => self.drive(events::key(&event)),
            WindowEvent::RedrawRequested => {
                self.pump_menu();
                self.redraw();
            }
            _ => {}
        }
    }
}

fn load(input: &str) -> Result<(Dom, Script, std::rc::Rc<native::Native>)> {
    let path = std::path::Path::new(input);
    let html = std::fs::read_to_string(path).with_context(|| format!("read {input}"))?;
    let base = path.parent().unwrap_or_else(|| std::path::Path::new("."));
    let dom = Dom::from_html(&html, Some(path), DEFAULT_WIDTH, DEFAULT_HEIGHT, 1.0);

    let native = std::rc::Rc::new(native::Native::default());
    let script =
        Script::new(dom.clone(), std::rc::Rc::clone(&native)).context("start script runtime")?;

    dom.resolve();

    for source in dom.scripts() {
        match source {
            dom::Script::Inline(code) => script.eval(&code)?,
            dom::Script::Src(src) => {
                let file = base.join(&src);
                let code = std::fs::read_to_string(&file)
                    .with_context(|| format!("read script {}", file.display()))?;
                script.eval(&code)?;
            }
        }
    }

    Ok((dom, script, native))
}

fn open(input: &str, watch: bool, inspect: Option<u16>) -> Result<()> {
    let (dom, script, native) = load(input)?;

    let event_loop = EventLoop::new().context("create event loop")?;
    event_loop.set_control_flow(ControlFlow::Wait);

    let watcher = watch.then(|| Watch::new(input, &dom));
    let mut app = App::new(dom, script, native);
    app.watch = watcher;

    if let Some(port) = inspect {
        let server = devtools::Devtools::start(port)?;
        println!("devtools listening on 127.0.0.1:{}", server.port);
        println!("  {}", server.url());
        app.devtools = Some(server);
    }
    if watch {
        println!("watching {input} — edit and save to reload");
    }
    event_loop.run_app(&mut app).context("run event loop")?;

    match app.failure {
        Some(error) => Err(error),
        None => Ok(()),
    }
}

#[derive(Default)]
struct Run {
    clicks: Vec<String>,
    points: Vec<String>,
    hovers: Vec<String>,
    scrolls: Vec<String>,
    types: Vec<String>,
    presses: Vec<String>,
    snapshot: Option<String>,
    at: Option<String>,
    a11y: Option<String>,
    menu: Option<String>,
}

fn render(input: &str, output: &str, run: &Run) -> Result<()> {
    let Run {
        clicks,
        points,
        hovers,
        scrolls,
        types,
        presses,
        snapshot,
        at,
        a11y,
        menu,
    } = run;
    let (dom, script, native) = load(input)?;

    let mut targets: Vec<(f32, f32)> = Vec::new();

    dom.settle(&script);

    for selector in hovers {
        let node = dom
            .query_selector(selector)
            .with_context(|| format!("no element matches {selector}"))?;
        let (x, y) = dom
            .center_of(node)
            .with_context(|| format!("{selector} has no layout box"))?;
        for dispatch in dom.drive(events::pointer_move(x, y)) {
            script.dispatch(&dispatch)?;
        }
        dom.settle(&script);
    }

    for selector in clicks {
        let node = dom
            .query_selector(selector)
            .with_context(|| format!("no element matches {selector}"))?;
        let (x, y) = dom
            .center_of(node)
            .with_context(|| format!("{selector} has no layout box"))?;
        targets.push((x, y));
    }

    for point in points {
        let (x, y) = point.split_once(',').context("--click-at expects X,Y")?;
        targets.push((
            x.trim().parse().context("--click-at X")?,
            y.trim().parse().context("--click-at Y")?,
        ));
    }

    for (x, y) in targets {
        for event in [
            events::pointer_button(x, y, MouseButton::Left, ElementState::Pressed),
            events::pointer_button(x, y, MouseButton::Left, ElementState::Released),
        ] {
            for dispatch in dom.drive(event) {
                script.dispatch(&dispatch)?;
            }
        }
        dom.settle(&script);
    }

    for text in types {
        for ch in text.chars() {
            let ch = ch.to_string();
            for pressed in [true, false] {
                for dispatch in dom.drive(events::text_key(&ch, pressed)) {
                    script.dispatch(&dispatch)?;
                }
            }
        }
        dom.settle(&script);
    }

    for name in presses {
        for pressed in [true, false] {
            let event =
                events::named(name, pressed).with_context(|| format!("unknown key {name}"))?;
            for dispatch in dom.drive(event) {
                script.dispatch(&dispatch)?;
            }
        }
        dom.settle(&script);
    }

    for spec in scrolls {
        let mut parts = spec.split(',');
        let selector = parts.next().context("--scroll expects SELECTOR,DX,DY")?;
        let dx: f64 = parts
            .next()
            .context("--scroll DX")?
            .trim()
            .parse()
            .context("--scroll DX")?;
        let dy: f64 = parts
            .next()
            .context("--scroll DY")?
            .trim()
            .parse()
            .context("--scroll DY")?;

        let node = dom
            .query_selector(selector.trim())
            .with_context(|| format!("no element matches {selector}"))?;
        let (x, y) = dom
            .center_of(node)
            .with_context(|| format!("{selector} has no layout box"))?;

        for dispatch in dom.drive(events::pointer_move(x, y)) {
            script.dispatch(&dispatch)?;
        }
        for dispatch in dom.drive(events::wheel_pixels(x, y, dx, dy)) {
            script.dispatch(&dispatch)?;
        }
        let anchor = dom.hover_node();
        for dispatch in dom.scroll(anchor, -dx, -dy) {
            script.dispatch(&dispatch)?;
        }
        dom.settle(&script);
    }

    if let Some(seconds) = at {
        let seconds: f64 = seconds.parse().context("--at expects seconds")?;
        dom.set_time(seconds);
        dom.settle(&script);
    }

    if let Some(path) = menu {
        let model = format!("{}\n{}", native.menu_snapshot(), native.tray_snapshot());
        std::fs::write(path, model).with_context(|| format!("write {path}"))?;
        println!("{input} -> {path}");
    }

    if let Some(path) = a11y {
        std::fs::write(path, dom.accessibility_snapshot())
            .with_context(|| format!("write {path}"))?;
        println!("{input} -> {path}");
    }

    if let Some(path) = snapshot {
        std::fs::write(path, dom.snapshot()).with_context(|| format!("write {path}"))?;
        println!("{input} -> {path}");
    }

    dom.write_png(output, DEFAULT_WIDTH, DEFAULT_HEIGHT, 1.0)?;
    println!("{input} -> {output} ({DEFAULT_WIDTH}x{DEFAULT_HEIGHT})");
    Ok(())
}

const TEMPLATE: &str = r##"<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>NAME</title>
    <style>
      :root { --accent: #f5a93c; --ink: #0b1226; --paper: #f4e7d3; }
      body {
        margin: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        background: var(--ink);
        color: var(--paper);
        font-family: Helvetica, Arial, sans-serif;
      }
      h1 { margin: 0; font-size: 15px; letter-spacing: 0.18em; text-transform: uppercase; color: #8fa0c4; }
      button {
        padding: 12px 22px;
        font-size: 16px;
        color: var(--ink);
        background: var(--accent);
        border: none;
        border-radius: 8px;
      }
      output { font-size: 42px; font-variant-numeric: tabular-nums; }
    </style>
  </head>
  <body>
    <h1>NAME</h1>
    <output id="count">0</output>
    <button id="inc">Count up</button>

    <script>
      let count = 0;
      const display = document.querySelector("#count");
      document.querySelector("#inc").addEventListener("click", () => {
        display.textContent = ++count;
      });
    </script>
  </body>
</html>
"##;

fn init(name: &str) -> Result<()> {
    let dir = std::path::Path::new(name);
    if dir.exists() {
        bail!("{name} already exists");
    }

    std::fs::create_dir_all(dir).with_context(|| format!("create {name}"))?;
    let entry = dir.join("index.html");
    std::fs::write(&entry, TEMPLATE.replace("NAME", name))
        .with_context(|| format!("write {}", entry.display()))?;

    println!("created {}", entry.display());
    println!();
    println!("  kiln open   {}", entry.display());
    println!("  kiln check  {}", entry.display());
    Ok(())
}

fn build(input: &str, out: &str) -> Result<()> {
    let entry = std::path::Path::new(input);
    let base = entry.parent().unwrap_or_else(|| std::path::Path::new("."));
    let out = std::path::Path::new(out);

    let report = check::check_path(entry)?;
    print!("\n{}", check::render_report(entry, &report));

    let (dom, _script, _native) = load(input)?;

    std::fs::create_dir_all(out).with_context(|| format!("create {}", out.display()))?;
    let mut copied = 0usize;

    let name = entry.file_name().context("entry has no file name")?;
    std::fs::copy(entry, out.join(name)).with_context(|| format!("copy {}", entry.display()))?;
    copied += 1;

    for source in dom.scripts() {
        let dom::Script::Src(src) = source else {
            continue;
        };
        let from = base.join(&src);
        let to = out.join(&src);
        if let Some(parent) = to.parent() {
            std::fs::create_dir_all(parent)
                .with_context(|| format!("create {}", parent.display()))?;
        }
        std::fs::copy(&from, &to).with_context(|| format!("copy {}", from.display()))?;
        copied += 1;
    }

    println!("  {} files -> {}\n", copied, out.display());
    Ok(())
}

fn trace(input: &str, args: &[String], out: Option<&String>) -> Result<()> {
    let flag = |name: &str| -> Vec<String> {
        args.windows(2)
            .filter(|pair| pair[0] == name)
            .map(|pair| pair[1].clone())
            .collect()
    };

    // Steps are taken in the order the flags appear, so a trace reproduces the
    // interaction rather than a canonical ordering of it.
    let mut steps = Vec::new();
    let mut index = 0;
    while index < args.len() {
        let value = args.get(index + 1).cloned().unwrap_or_default();
        match args[index].as_str() {
            "--click" => steps.push(replay::Step::Click(value)),
            "--type" => steps.push(replay::Step::Type(value)),
            "--press" => steps.push(replay::Step::Press(value)),
            "--at" => {
                if let Ok(seconds) = value.parse() {
                    steps.push(replay::Step::At(seconds));
                }
            }
            "--scroll" => {
                let mut parts = value.split(',');
                if let (Some(sel), Some(dx), Some(dy)) = (parts.next(), parts.next(), parts.next())
                    && let (Ok(dx), Ok(dy)) = (dx.trim().parse(), dy.trim().parse())
                {
                    steps.push(replay::Step::Scroll(sel.trim().to_string(), dx, dy));
                }
            }
            _ => {}
        }
        index += 1;
    }
    let _ = flag;

    let path = out.map_or_else(|| std::path::PathBuf::from("trace.kiln"), Into::into);
    let outcome = replay::record(input, &steps, &path)?;
    println!(
        "recorded {} steps, {} mutations -> {}",
        outcome.steps,
        outcome.mutations,
        path.display()
    );
    Ok(())
}

fn replay_trace(input: &str, trace: &str) -> Result<()> {
    let outcome = replay::replay(input, std::path::Path::new(trace))?;
    println!(
        "replayed {} steps, {} mutations — identical to the recording",
        outcome.steps, outcome.mutations
    );
    Ok(())
}

fn package(input: &str, args: &[String]) -> Result<()> {
    let entry = std::path::Path::new(input);
    let flag = |name: &str| -> Option<String> {
        args.windows(2)
            .find(|pair| pair[0] == name)
            .map(|pair| pair[1].clone())
    };

    let default_name = entry
        .parent()
        .and_then(|parent| parent.file_name())
        .map(|name| name.to_string_lossy().into_owned())
        .filter(|name| !name.is_empty() && name != ".")
        .unwrap_or_else(|| "Kiln App".to_string());

    let name = flag("--name").unwrap_or(default_name);
    let options = package::Options {
        identifier: flag("--identifier")
            .unwrap_or_else(|| format!("app.kiln.{}", name.to_lowercase().replace(' ', "-"))),
        version: flag("--version").unwrap_or_else(|| "0.1.0".to_string()),
        out: flag("--out").map_or_else(|| std::path::PathBuf::from("dist"), Into::into),
        sign: flag("--sign"),
        dmg: args.iter().any(|arg| arg == "--dmg"),
        deb: args.iter().any(|arg| arg == "--deb"),
        msi: args.iter().any(|arg| arg == "--msi"),
        notarize: flag("--notarize"),
        name,
    };

    let report = check::check_path(entry)?;
    print!("\n{}", check::render_report(entry, &report));

    let (dom, _script, _native) = load(input)?;
    let app = package::bundle(entry, &dom, &options)?;
    println!("  {}\n", app.display());
    Ok(())
}

fn check(inputs: &[String]) -> Result<()> {
    let mut total = check::Report::default();
    let mut out = String::from("\n");

    for input in inputs {
        let path = std::path::Path::new(input);
        let report = check::check_path(path)?;
        out.push_str(&check::render_report(path, &report));
        total.declarations += report.declarations;
        total.findings.extend(report.findings);
    }

    print!("{out}");
    if inputs.len() > 1 {
        println!(
            "  {} files   {} declarations   {}% supported\n",
            inputs.len(),
            total.declarations,
            total.percent()
        );
    }
    Ok(())
}

/// Where a packaged app keeps its page, relative to the executable. macOS puts
/// it in `Contents/Resources/app`; every other layout keeps it beside the
/// binary. Running a packaged app with no arguments opens it.
fn bundled_entry() -> Option<std::path::PathBuf> {
    let exe = std::env::current_exe().ok()?;
    let beside = exe.parent()?;

    let candidates = [
        beside.join("app").join("index.html"),
        beside
            .parent()?
            .join("Resources")
            .join("app")
            .join("index.html"),
    ];
    candidates.into_iter().find(|path| path.exists())
}

fn inspect_port(args: &[String]) -> Option<u16> {
    let index = args.iter().position(|arg| arg == "--inspect")?;
    Some(
        args.get(index + 1)
            .and_then(|value| value.parse().ok())
            .unwrap_or(9223),
    )
}

fn usage() -> ! {
    eprintln!("usage:");
    eprintln!("  kiln init   <name>                 scaffold a new app");
    eprintln!("  kiln open   <page.html>            open in a native window");
    eprintln!("  kiln dev    <page.html>            open and reload on save");
    eprintln!("        [--inspect [port]]           serve DevTools over CDP (default 9223)");
    eprintln!("  kiln check  <page.html|style.css>...");
    eprintln!("                                     report unsupported CSS");
    eprintln!("  kiln build  <page.html> [outdir]   bundle the app and its scripts");
    eprintln!("  kiln record <page.html> [--out trace.kiln] [--click …] [--type …]");
    eprintln!("                                     record an interaction and its mutations");
    eprintln!("  kiln replay <page.html> <trace.kiln>");
    eprintln!("                                     replay it and assert nothing diverged");
    eprintln!("  kiln package <page.html>           build a .app");
    eprintln!("        [--name N] [--identifier ID] [--version V] [--out DIR]");
    eprintln!("        [--dmg] (macOS)  [--deb] (Linux)  [--msi] (Windows)");
    eprintln!("        [--sign IDENTITY] [--notarize PROFILE]");
    eprintln!("  kiln render <page.html> [out.png]  render headless to a PNG");
    eprintln!("        [--click <selector>] [--click-at <x,y>] [--hover <selector>]");
    eprintln!("        [--type <text>] [--press <key>] [--scroll <selector,dx,dy>]");
    eprintln!("        [--at <seconds>]");
    eprintln!("        [--snapshot <out.txt>] [--a11y <out.txt>] [--menu <out.txt>]");
    std::process::exit(2)
}

fn main() -> Result<()> {
    let args: Vec<String> = std::env::args().skip(1).collect();

    match args.first().map(String::as_str) {
        Some("open") => match args.get(1) {
            Some(input) => open(input, false, inspect_port(&args)),
            None => usage(),
        },
        Some("dev") => match args.get(1) {
            Some(input) => open(input, true, inspect_port(&args)),
            None => usage(),
        },
        Some("render") => {
            let positional: Vec<&String> = args[1..]
                .iter()
                .take_while(|arg| !arg.starts_with("--"))
                .collect();
            let flag = |name: &str| -> Vec<String> {
                args.windows(2)
                    .filter(|pair| pair[0] == name)
                    .map(|pair| pair[1].clone())
                    .collect()
            };
            let run = Run {
                clicks: flag("--click"),
                points: flag("--click-at"),
                hovers: flag("--hover"),
                scrolls: flag("--scroll"),
                types: flag("--type"),
                presses: flag("--press"),
                snapshot: flag("--snapshot").into_iter().next(),
                at: flag("--at").into_iter().next(),
                a11y: flag("--a11y").into_iter().next(),
                menu: flag("--menu").into_iter().next(),
            };
            match positional.first() {
                Some(input) => render(
                    input,
                    positional.get(1).map_or("out.png", |s| s.as_str()),
                    &run,
                ),
                None => usage(),
            }
        }
        Some("init") => match args.get(1) {
            Some(name) => init(name),
            None => usage(),
        },
        Some("build") => match args.get(1) {
            Some(input) => build(input, args.get(2).map_or("dist", |s| s.as_str())),
            None => usage(),
        },
        Some("package") => match args.get(1) {
            Some(input) => package(input, &args[1..]),
            None => usage(),
        },
        Some("record") => match args.get(1) {
            Some(input) => {
                let out = args
                    .windows(2)
                    .find(|pair| pair[0] == "--out")
                    .map(|pair| pair[1].clone());
                trace(input, &args[1..], out.as_ref())
            }
            None => usage(),
        },
        Some("replay") => match (args.get(1), args.get(2)) {
            (Some(input), Some(trace)) => replay_trace(input, trace),
            _ => usage(),
        },
        Some("check") => {
            let inputs: Vec<String> = args[1..].to_vec();
            if inputs.is_empty() {
                usage()
            }
            check(&inputs)
        }
        Some(other) => bail!("unknown command: {other}"),
        None => match bundled_entry() {
            Some(entry) => open(&entry.to_string_lossy(), false, None),
            None => usage(),
        },
    }
}

#[cfg(test)]
mod snapshot_tests {
    use super::*;

    /// Compare a golden that is the same everywhere: CSS reports, the
    /// accessibility tree, the menu model.
    #[track_caller]
    fn compare(path: &str, actual: &str) {
        if std::env::var_os("KILN_BLESS").is_some() {
            std::fs::write(path, actual).unwrap();
            return;
        }
        let expected = std::fs::read_to_string(path)
            .unwrap_or_else(|_| panic!("missing {path}; run with KILN_BLESS=1"));

        // .gitattributes keeps these LF everywhere, but a contributor with
        // core.autocrlf set should get a real diff rather than a line-ending one.
        assert_eq!(
            expected.replace("\r\n", "\n"),
            actual.replace("\r\n", "\n"),
            "golden changed: {path}"
        );
    }

    /// Tree snapshots record box sizes, which depend on the installed fonts, so
    /// they are only compared on the platform they were blessed on. Every
    /// platform still *runs* the code that produces them, which is what catches
    /// panics and logic errors in CI — only the byte comparison is skipped.
    #[track_caller]
    fn compare_layout(path: &str, actual: &str) {
        if cfg!(target_os = "macos") || std::env::var_os("KILN_BLESS").is_some() {
            compare(path, actual);
        }
    }

    fn golden(name: &str, clicks: &[&str]) {
        golden_at(name, clicks, None);
    }

    fn golden_at(name: &str, clicks: &[&str], at: Option<f64>) {
        let (dom, script, _native) = load(&format!("examples/{name}.html")).unwrap();
        dom.settle(&script);

        for selector in clicks {
            let node = dom.query_selector(selector).unwrap();
            let (x, y) = dom.center_of(node).unwrap();
            for event in [
                events::pointer_button(x, y, MouseButton::Left, ElementState::Pressed),
                events::pointer_button(x, y, MouseButton::Left, ElementState::Released),
            ] {
                for dispatch in dom.drive(event) {
                    script.dispatch(&dispatch).unwrap();
                }
            }
            dom.settle(&script);
        }

        if let Some(seconds) = at {
            dom.set_time(seconds);
            dom.settle(&script);
        }

        let actual = dom.snapshot();
        compare_layout(&format!("tests/golden/{name}.txt"), &actual);
    }

    #[test]
    fn hello() {
        golden("hello", &[]);
    }

    #[test]
    fn counter() {
        golden("counter", &["#inc", "#inc", "#dec"]);
    }

    #[test]
    fn controls() {
        golden("controls", &[]);
    }

    #[test]
    fn preact() {
        golden("preact", &["#inc"]);
    }

    #[test]
    fn observers() {
        golden("observers", &[]);
    }

    #[test]
    fn baseui() {
        golden("baseui", &[]);
    }

    #[test]
    fn scroll() {
        golden("scroll", &[]);
    }

    #[test]
    fn fixed() {
        golden("fixed", &[]);
    }

    #[test]
    fn text() {
        golden("text", &[]);
    }

    #[test]
    fn animation() {
        golden_at("animation", &[], Some(1.0));
    }

    #[test]
    fn replay_detects_both_kinds_of_divergence() {
        let dir = std::env::temp_dir().join("kiln-replay-test");
        let _ = std::fs::remove_dir_all(&dir);
        std::fs::create_dir_all(&dir).unwrap();
        let trace = dir.join("counter.kiln");

        let steps = vec![
            replay::Step::Click("#inc".into()),
            replay::Step::Click("#inc".into()),
            replay::Step::Click("#dec".into()),
        ];
        let recorded = replay::record("examples/counter.html", &steps, &trace).unwrap();
        assert!(recorded.mutations > 0, "the counter should mutate the DOM");

        // The happy path: same input, same everything.
        replay::replay("examples/counter.html", &trace).unwrap();

        let source = std::fs::read_to_string(&trace).unwrap();

        // A different route through the same nodes.
        let route = dir.join("route.kiln");
        std::fs::write(&route, source.replace("# 4 characterData", "# 4 attribute")).unwrap();
        assert!(
            replay::replay("examples/counter.html", &route).is_err(),
            "a changed mutation sequence must fail"
        );

        // The same route to a different place. Clicking increment three times
        // touches exactly the nodes that two increments and a decrement do, in
        // the same order, so only the end state tells them apart.
        let destination = dir.join("destination.kiln");
        std::fs::write(&destination, source.replace("click #dec", "click #inc")).unwrap();
        let error = replay::replay("examples/counter.html", &destination)
            .err()
            .expect("a changed end state must fail");
        assert!(
            error.to_string().contains("tree"),
            "the tree digest is what should catch this, got: {error}"
        );

        let _ = std::fs::remove_dir_all(&dir);
    }

    #[test]
    fn automation_drives_the_document_over_cdp() {
        use serde_json::json;

        let (dom, script, _native) = load("examples/counter.html").unwrap();
        dom.settle(&script);

        let call = |method: &str, params: serde_json::Value| {
            devtools::handle(method, &params, &dom, &script)
        };

        let read = || {
            call(
                "Runtime.evaluate",
                json!({ "expression": "document.querySelector('#count').textContent" }),
            )["result"]["value"]
                .clone()
        };
        assert_eq!(read(), json!("0"));

        // Find the button the way an automation client would, then click it
        // through the same EventDriver path a real mouse uses.
        let node = call("DOM.querySelector", json!({ "selector": "#inc" }))["nodeId"]
            .as_u64()
            .unwrap() as usize;
        let (x, y) = dom.center_of(node).unwrap();

        for kind in ["mousePressed", "mouseReleased"] {
            call(
                "Input.dispatchMouseEvent",
                json!({ "type": kind, "x": x, "y": y }),
            );
        }
        assert_eq!(read(), json!("1"), "a dispatched click must reach the app");
    }

    #[test]
    fn devtools_protocol_answers_the_core_domains() {
        use serde_json::json;

        let (dom, script, _native) = load("examples/counter.html").unwrap();
        dom.settle(&script);

        let call = |method: &str, params: serde_json::Value| {
            devtools::handle(method, &params, &dom, &script)
        };

        // Runtime.evaluate runs against the live document.
        let result = call("Runtime.evaluate", json!({ "expression": "1 + 1" }));
        assert_eq!(result["result"]["value"], json!(2));
        assert_eq!(result["result"]["type"], "number");

        let result = call(
            "Runtime.evaluate",
            json!({ "expression": "document.querySelector('#count').textContent" }),
        );
        assert_eq!(result["result"]["value"], json!("0"));

        // A thrown expression reports rather than panicking.
        let result = call("Runtime.evaluate", json!({ "expression": "nope.nope" }));
        assert!(result["exceptionDetails"].is_object());

        // DOM.getDocument returns a tree DevTools can render.
        let document = call("DOM.getDocument", json!({ "depth": -1 }));
        let root = &document["root"];
        assert_eq!(root["nodeName"], "#document");
        assert!(!root["children"].as_array().unwrap().is_empty());

        // Element nodes carry their attributes as CDP's flat name/value array.
        let counter = dom.query_selector("#count").unwrap();
        let html = call("DOM.getOuterHTML", json!({ "nodeId": counter }));
        assert_eq!(html["outerHTML"], "<div id=\"count\">0</div>");

        // CSS.getComputedStyleForNode is the styles pane.
        let styles = call("CSS.getComputedStyleForNode", json!({ "nodeId": counter }));
        let names: Vec<&str> = styles["computedStyle"]
            .as_array()
            .unwrap()
            .iter()
            .map(|entry| entry["name"].as_str().unwrap())
            .collect();
        assert!(names.contains(&"display"), "styles pane needs display");
        assert!(names.contains(&"position"), "styles pane needs position");

        // DOM.getBoxModel drives the layout overlay.
        let box_model = call("DOM.getBoxModel", json!({ "nodeId": counter }));
        assert!(box_model["model"]["width"].as_f64().unwrap() > 0.0);

        // The handshake calls DevTools makes on connect must not error.
        for method in [
            "Page.enable",
            "DOM.enable",
            "CSS.enable",
            "Runtime.enable",
            "Page.getFrameTree",
            "Target.getTargetInfo",
        ] {
            assert!(call(method, json!({})).is_object(), "{method} failed");
        }
        assert_eq!(
            call("Page.getFrameTree", json!({}))["frameTree"]["frame"]["id"],
            devtools::FRAME_ID
        );
    }

    #[test]
    fn watch_notices_the_entry_and_its_scripts() {
        let dir = std::env::temp_dir().join("kiln-watch-test");
        let _ = std::fs::remove_dir_all(&dir);
        std::fs::create_dir_all(&dir).unwrap();

        let entry = dir.join("index.html");
        let script = dir.join("app.js");
        std::fs::write(&script, "globalThis.x = 1;\n").unwrap();
        std::fs::write(
            &entry,
            "<html><body><script src=\"app.js\"></script></body></html>",
        )
        .unwrap();

        let (dom, _script, _native) = load(entry.to_str().unwrap()).unwrap();
        let mut watch = Watch::new(entry.to_str().unwrap(), &dom);

        // The referenced script is watched, not just the entry.
        assert_eq!(watch.sources(&dom).len(), 2);
        assert!(!watch.changed(&dom), "nothing changed yet");

        // mtime has second granularity on some filesystems, so move it
        // explicitly rather than racing the clock.
        let past = std::time::SystemTime::now() - std::time::Duration::from_secs(5);
        std::fs::write(&script, "globalThis.x = 2;\n").unwrap();
        filetime_set(&script, past);
        assert!(watch.changed(&dom), "editing a script should be noticed");
        assert!(!watch.changed(&dom), "and only once");

        let _ = std::fs::remove_dir_all(&dir);
    }

    fn filetime_set(path: &std::path::Path, when: std::time::SystemTime) {
        let file = std::fs::OpenOptions::new().write(true).open(path).unwrap();
        file.set_modified(when).unwrap();
    }

    #[test]
    #[cfg(target_os = "macos")]
    fn package_produces_a_launchable_bundle() {
        let out = std::env::temp_dir().join("kiln-package-test");
        let _ = std::fs::remove_dir_all(&out);

        let entry = std::path::Path::new("examples/tailwind.html");
        let (dom, _script, _native) = load(entry.to_str().unwrap()).unwrap();

        let options = package::Options {
            name: "Packaged".to_string(),
            identifier: "app.kiln.packaged".to_string(),
            version: "1.2.3".to_string(),
            out: out.clone(),
            sign: None,
            dmg: false,
            deb: false,
            msi: false,
            notarize: None,
        };
        let app = package::bundle(entry, &dom, &options).unwrap();

        // The layout macOS requires to treat this as an application.
        assert!(app.join("Contents/Info.plist").is_file());
        assert!(app.join("Contents/PkgInfo").is_file());
        assert!(app.join("Contents/MacOS/Packaged").is_file());

        // The entry is renamed, and referenced files keep their relative paths
        // so the HTML's own links still resolve inside the bundle.
        assert!(app.join("Contents/Resources/app/index.html").is_file());
        assert!(
            app.join("Contents/Resources/app/vendor/tailwind.css")
                .is_file(),
            "a linked stylesheet must travel with the app"
        );

        let plist = std::fs::read_to_string(app.join("Contents/Info.plist")).unwrap();
        assert!(plist.contains("<string>app.kiln.packaged</string>"));
        assert!(plist.contains("<string>1.2.3</string>"));
        assert!(
            plist.contains("<key>CFBundleExecutable</key>      <string>Packaged</string>"),
            "the executable name must match the file in MacOS/"
        );

        let _ = std::fs::remove_dir_all(&out);
    }

    #[test]
    fn init_scaffolds_something_that_runs() {
        let dir = std::env::temp_dir().join("kiln-init-test");
        let _ = std::fs::remove_dir_all(&dir);

        init(dir.to_str().unwrap()).unwrap();
        let entry = dir.join("index.html");

        // The scaffold must stay inside the subset it advertises.
        let report = check::check_path(&entry).unwrap();
        assert!(report.findings.is_empty(), "scaffold uses unsupported CSS");
        assert!(report.declarations > 0, "scaffold has no CSS at all");

        // And it must actually work when driven.
        let (dom, script, _native) = load(entry.to_str().unwrap()).unwrap();
        dom.settle(&script);
        let node = dom.query_selector("#inc").unwrap();
        let (x, y) = dom.center_of(node).unwrap();
        for event in [
            events::pointer_button(x, y, MouseButton::Left, ElementState::Pressed),
            events::pointer_button(x, y, MouseButton::Left, ElementState::Released),
        ] {
            for dispatch in dom.drive(event) {
                script.dispatch(&dispatch).unwrap();
            }
        }
        dom.settle(&script);

        assert!(
            dom.snapshot().contains("\"1\""),
            "the scaffolded counter did not increment"
        );

        let _ = std::fs::remove_dir_all(&dir);
    }

    #[test]
    fn tailwind() {
        golden("tailwind", &[]);
    }

    #[test]
    fn check_reports_tailwind_utilities_the_page_uses() {
        // The vendored stylesheet ships utilities this page never references.
        let clean = check::check_path(std::path::Path::new("examples/tailwind.html")).unwrap();
        assert!(
            clean.declarations > 300,
            "the linked stylesheet was not read"
        );
        assert!(
            clean.findings.is_empty(),
            "unused utilities should not be reported: {:?}",
            clean.findings.first().map(|f| &f.declaration)
        );

        // Using two of them surfaces both, named as utilities rather than as
        // the declarations Tailwind generated.
        let page = std::env::temp_dir().join("kiln-tw-uses.html");
        let source = std::fs::read_to_string("examples/tailwind.html").unwrap();
        std::fs::write(
            &page,
            source.replace("class=\"mt-6", "class=\"sticky truncate mt-6"),
        )
        .unwrap();
        let vendor = std::env::temp_dir().join("vendor");
        std::fs::create_dir_all(&vendor).unwrap();
        std::fs::copy("examples/vendor/tailwind.css", vendor.join("tailwind.css")).unwrap();

        let used = check::check_path(&page).unwrap();
        let utilities: Vec<&str> = used
            .findings
            .iter()
            .filter_map(|f| f.origin.as_deref())
            .collect();
        assert!(utilities.contains(&"sticky"), "got {utilities:?}");
        assert!(utilities.contains(&"truncate"), "got {utilities:?}");

        // And the location points at the stylesheet, not the page.
        assert!(
            used.findings[0]
                .source
                .as_deref()
                .is_some_and(|s| s.ends_with("tailwind.css")),
            "findings must name the file they came from"
        );

        let _ = std::fs::remove_file(&page);
    }

    #[test]
    fn check_reports_the_subset() {
        let path = std::path::Path::new("examples/unsupported.css");
        let report = check::check_path(path).unwrap();
        let actual = check::render_report(path, &report);

        compare("tests/golden/check.txt", &actual);
    }

    #[test]
    fn check_passes_our_own_examples() {
        for entry in std::fs::read_dir("examples").unwrap() {
            let path = entry.unwrap().path();
            if path.extension().and_then(|e| e.to_str()) != Some("html") {
                continue;
            }
            let report = check::check_path(&path).unwrap();

            if path.file_name().and_then(|name| name.to_str()) == Some("fixed.html") {
                assert!(
                    !report.findings.is_empty(),
                    "examples/fixed.html exists to demonstrate the position: fixed gap, \
                     so check must report it — delete this branch with the rule"
                );
                continue;
            }

            assert!(
                report.findings.is_empty(),
                "{} uses unsupported CSS: {:?}",
                path.display(),
                report.findings.first().map(|f| &f.declaration)
            );
        }
    }

    #[test]
    fn native_menu_model() {
        let (dom, script, native) = load("examples/native.html").unwrap();
        dom.settle(&script);

        let actual = format!("{}\n{}", native.menu_snapshot(), native.tray_snapshot());
        compare("tests/golden/native.menu.txt", &actual);
    }

    #[test]
    fn clipboard_round_trips() {
        let native = native::Native::default();

        // A headless box may have no clipboard at all; that is not a failure.
        if native.write_text("kiln clipboard probe").is_err() {
            return;
        }
        assert_eq!(
            native.read_text().as_deref(),
            Some("kiln clipboard probe"),
            "clipboard did not return what was written"
        );
    }

    #[test]
    fn semantics_accessibility() {
        let (dom, script, _native) = load("examples/semantics.html").unwrap();
        dom.settle(&script);

        let actual = dom.accessibility_snapshot();
        compare("tests/golden/semantics.a11y.txt", &actual);
    }

    #[test]
    fn input() {
        let (dom, script, _native) = load("examples/input.html").unwrap();
        dom.settle(&script);

        for ch in "Marshall".chars() {
            let ch = ch.to_string();
            for pressed in [true, false] {
                for dispatch in dom.drive(events::text_key(&ch, pressed)) {
                    script.dispatch(&dispatch).unwrap();
                }
            }
        }
        dom.settle(&script);

        let node = dom.query_selector("#list").unwrap();
        let (x, y) = dom.center_of(node).unwrap();
        for dispatch in dom.drive(events::pointer_move(x, y)) {
            script.dispatch(&dispatch).unwrap();
        }
        for dispatch in dom.drive(events::wheel_pixels(x, y, 0.0, 90.0)) {
            script.dispatch(&dispatch).unwrap();
        }
        let anchor = dom.hover_node();
        for dispatch in dom.scroll(anchor, 0.0, -90.0) {
            script.dispatch(&dispatch).unwrap();
        }
        dom.settle(&script);

        let actual = dom.snapshot();
        compare_layout("tests/golden/input.txt", &actual);
    }
}

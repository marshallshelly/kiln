mod check;
mod dom;
mod events;
mod native;
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

        self.renderer
            .resume(Arc::clone(&window) as Arc<_>, size.width, size.height, || {});
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
        if self.watch.is_none() {
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
    let dom = Dom::from_html(&html, DEFAULT_WIDTH, DEFAULT_HEIGHT, 1.0);

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

fn open(input: &str, watch: bool) -> Result<()> {
    let (dom, script, native) = load(input)?;

    let event_loop = EventLoop::new().context("create event loop")?;
    event_loop.set_control_flow(ControlFlow::Wait);

    let watcher = watch.then(|| Watch::new(input, &dom));
    let mut app = App::new(dom, script, native);
    app.watch = watcher;
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
            let event = events::named(name, pressed)
                .with_context(|| format!("unknown key {name}"))?;
            for dispatch in dom.drive(event) {
                script.dispatch(&dispatch)?;
            }
        }
        dom.settle(&script);
    }

    for spec in scrolls {
        let mut parts = spec.split(',');
        let selector = parts.next().context("--scroll expects SELECTOR,DX,DY")?;
        let dx: f64 = parts.next().context("--scroll DX")?.trim().parse().context("--scroll DX")?;
        let dy: f64 = parts.next().context("--scroll DY")?.trim().parse().context("--scroll DY")?;

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

    let name = entry
        .file_name()
        .context("entry has no file name")?;
    std::fs::copy(entry, out.join(name))
        .with_context(|| format!("copy {}", entry.display()))?;
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

fn usage() -> ! {
    eprintln!("usage:");
    eprintln!("  kiln init   <name>                 scaffold a new app");
    eprintln!("  kiln open   <page.html>            open in a native window");
    eprintln!("  kiln dev    <page.html>            open and reload on save");
    eprintln!("  kiln check  <page.html|style.css>...");
    eprintln!("                                     report unsupported CSS");
    eprintln!("  kiln build  <page.html> [outdir]   bundle the app and its scripts");
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
            Some(input) => open(input, false),
            None => usage(),
        },
        Some("dev") => match args.get(1) {
            Some(input) => open(input, true),
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
        Some("check") => {
            let inputs: Vec<String> = args[1..].to_vec();
            if inputs.is_empty() {
                usage()
            }
            check(&inputs)
        }
        Some(other) => bail!("unknown command: {other}"),
        None => usage(),
    }
}

#[cfg(test)]
mod snapshot_tests {
    use super::*;

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
        let path = format!("tests/golden/{name}.txt");

        if std::env::var_os("KILN_BLESS").is_some() {
            std::fs::write(&path, &actual).unwrap();
            return;
        }

        let expected = std::fs::read_to_string(&path)
            .unwrap_or_else(|_| panic!("missing {path}; run with KILN_BLESS=1"));
        assert_eq!(expected, actual, "snapshot changed for {name}");
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
    fn check_reports_the_subset() {
        let path = std::path::Path::new("examples/unsupported.css");
        let report = check::check_path(path).unwrap();
        let actual = check::render_report(path, &report);

        let golden = "tests/golden/check.txt";
        if std::env::var_os("KILN_BLESS").is_some() {
            std::fs::write(golden, &actual).unwrap();
            return;
        }
        let expected = std::fs::read_to_string(golden)
            .unwrap_or_else(|_| panic!("missing {golden}; run with KILN_BLESS=1"));
        assert_eq!(expected, actual, "check report changed");
    }

    #[test]
    fn check_passes_our_own_examples() {
        for entry in std::fs::read_dir("examples").unwrap() {
            let path = entry.unwrap().path();
            if path.extension().and_then(|e| e.to_str()) != Some("html") {
                continue;
            }
            let report = check::check_path(&path).unwrap();
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
        let path = "tests/golden/native.menu.txt";
        if std::env::var_os("KILN_BLESS").is_some() {
            std::fs::write(path, &actual).unwrap();
            return;
        }
        let expected = std::fs::read_to_string(path)
            .unwrap_or_else(|_| panic!("missing {path}; run with KILN_BLESS=1"));
        assert_eq!(expected, actual, "menu model changed");
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
        let path = "tests/golden/semantics.a11y.txt";
        if std::env::var_os("KILN_BLESS").is_some() {
            std::fs::write(path, &actual).unwrap();
            return;
        }
        let expected = std::fs::read_to_string(path)
            .unwrap_or_else(|_| panic!("missing {path}; run with KILN_BLESS=1"));
        assert_eq!(expected, actual, "accessibility tree changed for semantics");
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
        let path = "tests/golden/input.txt";
        if std::env::var_os("KILN_BLESS").is_some() {
            std::fs::write(path, &actual).unwrap();
            return;
        }
        let expected = std::fs::read_to_string(path)
            .unwrap_or_else(|_| panic!("missing {path}; run with KILN_BLESS=1"));
        assert_eq!(expected, actual, "snapshot changed for input");
    }
}

mod dom;
mod events;
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

struct App {
    window: Option<Arc<Window>>,
    renderer: VelloWindowRenderer,
    dom: Dom,
    script: Script,
    cursor: PhysicalPosition<f64>,
    scale: f32,
    size: (u32, u32),
    started: std::time::Instant,
    failure: Option<anyhow::Error>,
}

impl App {
    fn new(dom: Dom, script: Script) -> Self {
        Self {
            window: None,
            renderer: VelloWindowRenderer::new(),
            dom,
            script,
            cursor: PhysicalPosition::new(0.0, 0.0),
            scale: 1.0,
            size: (DEFAULT_WIDTH, DEFAULT_HEIGHT),
            started: std::time::Instant::now(),
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
            WindowEvent::RedrawRequested => self.redraw(),
            _ => {}
        }
    }
}

fn load(input: &str) -> Result<(Dom, Script)> {
    let path = std::path::Path::new(input);
    let html = std::fs::read_to_string(path).with_context(|| format!("read {input}"))?;
    let base = path.parent().unwrap_or_else(|| std::path::Path::new("."));
    let dom = Dom::from_html(&html, DEFAULT_WIDTH, DEFAULT_HEIGHT, 1.0);

    let script = Script::new(dom.clone()).context("start script runtime")?;

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

    Ok((dom, script))
}

fn open(input: &str) -> Result<()> {
    let (dom, script) = load(input)?;

    let event_loop = EventLoop::new().context("create event loop")?;
    event_loop.set_control_flow(ControlFlow::Wait);

    let mut app = App::new(dom, script);
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
    } = run;
    let (dom, script) = load(input)?;

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

fn usage() -> ! {
    eprintln!("usage:");
    eprintln!("  kiln open   <page.html>            open in a native window");
    eprintln!("  kiln render <page.html> [out.png]");
    eprintln!("        [--click <selector>] [--click-at <x,y>] [--hover <selector>]");
    eprintln!("        [--snapshot <out.txt>] [--at <seconds>]");
    eprintln!("        [--scroll <selector,dx,dy>] [--type <text>] [--press <key>]");
    eprintln!("        [--a11y <out.txt>]");
    eprintln!("                                     render headless to a PNG");
    std::process::exit(2)
}

fn main() -> Result<()> {
    let args: Vec<String> = std::env::args().skip(1).collect();

    match args.first().map(String::as_str) {
        Some("open") => match args.get(1) {
            Some(input) => open(input),
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
        let (dom, script) = load(&format!("examples/{name}.html")).unwrap();
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
    fn semantics_accessibility() {
        let (dom, script) = load("examples/semantics.html").unwrap();
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
        let (dom, script) = load("examples/input.html").unwrap();
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

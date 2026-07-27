mod page;

use std::sync::Arc;

use anyhow::{Context, Result, bail};
use anyrender::WindowRenderer;
use anyrender_vello::VelloWindowRenderer;
use winit::application::ApplicationHandler;
use winit::event::WindowEvent;
use winit::event_loop::{ActiveEventLoop, ControlFlow, EventLoop};
use winit::window::{Window, WindowId};

use page::Page;

const DEFAULT_WIDTH: u32 = 1000;
const DEFAULT_HEIGHT: u32 = 700;

struct App {
    window: Option<Arc<Window>>,
    renderer: VelloWindowRenderer,
    page: Page,
    failure: Option<anyhow::Error>,
}

impl App {
    fn new(page: Page) -> Self {
        Self {
            window: None,
            renderer: VelloWindowRenderer::new(),
            page,
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
        let scale = window.scale_factor() as f32;

        self.renderer
            .resume(Arc::clone(&window) as Arc<_>, size.width, size.height, || {});
        if !self.renderer.complete_resume() {
            bail!("renderer failed to initialize");
        }

        self.page.resize(size.width, size.height, scale);
        window.request_redraw();
        self.window = Some(window);
        Ok(())
    }

    fn redraw(&mut self) {
        if !self.renderer.is_active() {
            return;
        }
        let Self { renderer, page, .. } = self;
        page.resolve();
        renderer.render(|scene| page.paint(scene));
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
                let scale = self
                    .window
                    .as_ref()
                    .map_or(1.0, |w| w.scale_factor() as f32);
                self.renderer.set_size(size.width, size.height);
                self.page.resize(size.width, size.height, scale);
                if let Some(window) = self.window.as_ref() {
                    window.request_redraw();
                }
            }
            WindowEvent::RedrawRequested => self.redraw(),
            _ => {}
        }
    }
}

fn open(input: &str) -> Result<()> {
    let page = Page::from_file(input, DEFAULT_WIDTH, DEFAULT_HEIGHT, 1.0).context("load page")?;

    let event_loop = EventLoop::new().context("create event loop")?;
    event_loop.set_control_flow(ControlFlow::Wait);

    let mut app = App::new(page);
    event_loop.run_app(&mut app).context("run event loop")?;

    match app.failure {
        Some(error) => Err(error),
        None => Ok(()),
    }
}

fn render(input: &str, output: &str) -> Result<()> {
    let mut page =
        Page::from_file(input, DEFAULT_WIDTH, DEFAULT_HEIGHT, 1.0).context("load page")?;
    page.write_png(output)?;
    println!("{input} -> {output} ({DEFAULT_WIDTH}x{DEFAULT_HEIGHT})");
    Ok(())
}

fn usage() -> ! {
    eprintln!("usage:");
    eprintln!("  kiln open   <page.html>            open in a native window");
    eprintln!("  kiln render <page.html> [out.png]  render headless to a PNG");
    std::process::exit(2)
}

fn main() -> Result<()> {
    let args: Vec<String> = std::env::args().skip(1).collect();

    match args.first().map(String::as_str) {
        Some("open") => match args.get(1) {
            Some(input) => open(input),
            None => usage(),
        },
        Some("render") => match args.get(1) {
            Some(input) => render(input, args.get(2).map_or("out.png", String::as_str)),
            None => usage(),
        },
        Some(other) => bail!("unknown command: {other}"),
        None => usage(),
    }
}

use anyhow::{Context, Result};
use anyrender::ImageRenderer;
use anyrender_vello::VelloImageRenderer;
use blitz_dom::DocumentConfig;
use blitz_html::HtmlDocument;
use blitz_traits::shell::{ColorScheme, Viewport};

pub struct Page {
    document: HtmlDocument,
    width: u32,
    height: u32,
    scale: f32,
}

impl Page {
    pub fn from_html(html: &str, width: u32, height: u32, scale: f32) -> Self {
        let document = HtmlDocument::from_html(
            html,
            DocumentConfig {
                viewport: Some(Viewport::new(width, height, scale, ColorScheme::Light)),
                ..Default::default()
            },
        );
        Self {
            document,
            width,
            height,
            scale,
        }
    }

    pub fn from_file(path: &str, width: u32, height: u32, scale: f32) -> Result<Self> {
        let html = std::fs::read_to_string(path).with_context(|| format!("read {path}"))?;
        Ok(Self::from_html(&html, width, height, scale))
    }

    pub fn resize(&mut self, width: u32, height: u32, scale: f32) {
        self.width = width;
        self.height = height;
        self.scale = scale;
        self.document
            .set_viewport(Viewport::new(width, height, scale, ColorScheme::Light));
    }

    pub fn resolve(&mut self) {
        self.document.resolve(0.0);
    }

    pub fn paint(&mut self, scene: &mut impl anyrender::PaintScene) {
        blitz_paint::paint_scene(
            scene,
            &mut self.document,
            f64::from(self.scale),
            self.width,
            self.height,
            0,
            0,
        );
    }

    pub fn write_png(&mut self, path: &str) -> Result<()> {
        self.resolve();

        let mut renderer = VelloImageRenderer::new(self.width, self.height);
        let mut pixels = Vec::new();
        renderer.render_to_vec(|scene| self.paint(scene), &mut pixels);

        let file = std::fs::File::create(path).with_context(|| format!("create {path}"))?;
        let mut encoder = png::Encoder::new(std::io::BufWriter::new(file), self.width, self.height);
        encoder.set_color(png::ColorType::Rgba);
        encoder.set_depth(png::BitDepth::Eight);
        encoder
            .write_header()
            .context("write png header")?
            .write_image_data(&pixels)
            .context("write png data")?;

        Ok(())
    }
}

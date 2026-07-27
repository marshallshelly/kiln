use std::cell::RefCell;
use std::rc::Rc;

use anyhow::{Context, Result};
use blitz_dom::{DocumentConfig, EventDriver, NodeData};
use blitz_traits::events::UiEvent;
use blitz_html::HtmlDocument;
use blitz_traits::shell::{ColorScheme, Viewport};

#[derive(Clone)]
pub struct Dom {
    document: Rc<RefCell<HtmlDocument>>,
}

impl Dom {
    pub fn from_html(html: &str, width: u32, height: u32, scale: f32) -> Self {
        let document = HtmlDocument::from_html(
            html,
            DocumentConfig {
                viewport: Some(Viewport::new(width, height, scale, ColorScheme::Light)),
                ..Default::default()
            },
        );
        Self {
            document: Rc::new(RefCell::new(document)),
        }
    }

    pub fn set_viewport(&self, width: u32, height: u32, scale: f32) {
        self.document
            .borrow_mut()
            .set_viewport(Viewport::new(width, height, scale, ColorScheme::Light));
    }

    pub fn resolve(&self) {
        self.document.borrow_mut().resolve(0.0);
    }

    pub fn paint(&self, scene: &mut impl anyrender::PaintScene, scale: f64, width: u32, height: u32) {
        blitz_paint::paint_scene(scene, &mut self.document.borrow_mut(), scale, width, height, 0, 0);
    }

    pub fn query_selector(&self, selector: &str) -> Option<usize> {
        self.document
            .borrow()
            .query_selector(selector)
            .ok()
            .flatten()
    }

    pub fn drive(&self, event: UiEvent) -> Vec<crate::events::Dispatch> {
        let collector = crate::events::Collector::default();
        {
            let mut document = self.document.borrow_mut();
            let mut driver = EventDriver::new(&mut *document, collector.clone());
            driver.handle_ui_event(event);
        }
        collector.queued.take()
    }

    pub fn center_of(&self, node_id: usize) -> Option<(f32, f32)> {
        let document = self.document.borrow();
        let node = document.get_node(node_id)?;
        let size = node.final_layout.size;
        if size.width <= 0.0 || size.height <= 0.0 {
            return None;
        }
        let position = node.absolute_position(0.0, 0.0);
        Some((position.x + size.width / 2.0, position.y + size.height / 2.0))
    }

    pub fn text_content(&self, node_id: usize) -> String {
        let document = self.document.borrow();
        let Some(node) = document.get_node(node_id) else {
            return String::new();
        };
        if let NodeData::Text(text) = &node.data {
            return text.content.clone();
        }
        node.children
            .iter()
            .filter_map(|child| document.get_node(*child))
            .filter_map(|child| match &child.data {
                NodeData::Text(text) => Some(text.content.as_str()),
                _ => None,
            })
            .collect()
    }

    pub fn set_text_content(&self, node_id: usize, value: &str) {
        let target = {
            let document = self.document.borrow();
            let Some(node) = document.get_node(node_id) else {
                return;
            };
            if matches!(node.data, NodeData::Text(_)) {
                Some(node_id)
            } else {
                node.children
                    .iter()
                    .copied()
                    .find(|child| {
                        document
                            .get_node(*child)
                            .is_some_and(|n| matches!(n.data, NodeData::Text(_)))
                    })
            }
        };

        let mut document = self.document.borrow_mut();
        let mut mutator = document.mutate();
        match target {
            Some(text_node) => mutator.set_node_text(text_node, value),
            None => {
                let text_node = mutator.create_text_node(value);
                mutator.append_children(node_id, &[text_node]);
            }
        }
    }

    pub fn scripts(&self) -> Vec<String> {
        let document = self.document.borrow();
        let Ok(nodes) = document.query_selector_all("script") else {
            return Vec::new();
        };
        nodes
            .into_iter()
            .map(|id| {
                document
                    .get_node(id)
                    .map(|node| {
                        node.children
                            .iter()
                            .filter_map(|child| document.get_node(*child))
                            .filter_map(|child| match &child.data {
                                NodeData::Text(text) => Some(text.content.as_str()),
                                _ => None,
                            })
                            .collect::<String>()
                    })
                    .unwrap_or_default()
            })
            .filter(|source| !source.trim().is_empty())
            .collect()
    }

    pub fn write_png(&self, path: &str, width: u32, height: u32, scale: f32) -> Result<()> {
        use anyrender::ImageRenderer;

        self.resolve();

        let mut renderer = anyrender_vello::VelloImageRenderer::new(width, height);
        let mut pixels = Vec::new();
        renderer.render_to_vec(
            |scene| self.paint(scene, f64::from(scale), width, height),
            &mut pixels,
        );

        let file = std::fs::File::create(path).with_context(|| format!("create {path}"))?;
        let mut encoder = png::Encoder::new(std::io::BufWriter::new(file), width, height);
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

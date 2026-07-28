use std::cell::RefCell;
use std::rc::Rc;

use anyhow::{Context, Result};
use blitz_dom::{DocumentConfig, EventDriver, NodeData, QualName, ns};
use blitz_traits::events::UiEvent;
use blitz_html::HtmlDocument;
use blitz_traits::shell::{ColorScheme, Viewport};

pub enum Script {
    Inline(String),
    Src(String),
}

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

    pub fn flush_layout(&self) {
        self.document.borrow_mut().resolve(0.0);
    }

    pub fn settle(&self, script: &crate::script::Script) {
        const MAX_PASSES: usize = 4;
        for _ in 0..MAX_PASSES {
            self.resolve();
            if script.run_observers() == 0 {
                return;
            }
        }
        self.resolve();
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

    fn element_name(name: &str) -> QualName {
        QualName::new(None, ns!(html), name.to_ascii_lowercase().into())
    }

    fn attr_name(name: &str) -> QualName {
        QualName::new(None, ns!(), name.to_ascii_lowercase().into())
    }

    pub fn create_element(&self, tag: &str) -> usize {
        let mut document = self.document.borrow_mut();
        document.mutate().create_element(Self::element_name(tag), Vec::new())
    }

    pub fn create_text_node(&self, text: &str) -> usize {
        let mut document = self.document.borrow_mut();
        document.mutate().create_text_node(text)
    }

    pub fn append_child(&self, parent: usize, child: usize) {
        let mut document = self.document.borrow_mut();
        document.mutate().append_children(parent, &[child]);
    }

    pub fn insert_before(&self, child: usize, reference: usize) {
        let mut document = self.document.borrow_mut();
        document.mutate().insert_nodes_before(reference, &[child]);
    }

    pub fn remove_child(&self, child: usize) {
        let mut document = self.document.borrow_mut();
        document.mutate().remove_node(child);
    }

    pub fn set_attribute(&self, node_id: usize, name: &str, value: &str) {
        let mut document = self.document.borrow_mut();
        document.mutate().set_attribute(node_id, Self::attr_name(name), value);
    }

    pub fn remove_attribute(&self, node_id: usize, name: &str) {
        let mut document = self.document.borrow_mut();
        document.mutate().clear_attribute(node_id, Self::attr_name(name));
    }

    pub fn attribute(&self, node_id: usize, name: &str) -> Option<String> {
        let document = self.document.borrow();
        let element = document.get_node(node_id)?.element_data()?;
        element
            .attrs
            .iter()
            .find(|attr| attr.name.local.as_ref() == name)
            .map(|attr| attr.value.to_string())
    }

    pub fn set_style_property(&self, node_id: usize, name: &str, value: &str) {
        let mut document = self.document.borrow_mut();
        if value.is_empty() {
            document.mutate().remove_style_property(node_id, name);
        } else {
            document.mutate().set_style_property(node_id, name, value);
        }
    }

    pub fn parent(&self, node_id: usize) -> Option<usize> {
        self.document.borrow().get_node(node_id)?.parent
    }

    pub fn next_sibling(&self, node_id: usize) -> Option<usize> {
        let document = self.document.borrow();
        let parent = document.get_node(node_id)?.parent?;
        let children = &document.get_node(parent)?.children;
        let index = children.iter().position(|id| *id == node_id)?;
        children.get(index + 1).copied()
    }

    pub fn children(&self, node_id: usize) -> Vec<usize> {
        self.document
            .borrow()
            .get_node(node_id)
            .map(|node| node.children.clone())
            .unwrap_or_default()
    }

    pub fn tag_name(&self, node_id: usize) -> Option<String> {
        let document = self.document.borrow();
        let element = document.get_node(node_id)?.element_data()?;
        Some(element.name.local.to_string())
    }

    pub fn is_text(&self, node_id: usize) -> bool {
        self.document
            .borrow()
            .get_node(node_id)
            .is_some_and(|node| matches!(node.data, NodeData::Text(_)))
    }

    pub fn query_selector_all(&self, root: Option<usize>, selector: &str) -> Vec<usize> {
        let document = self.document.borrow();
        let Ok(all) = document.query_selector_all(selector) else {
            return Vec::new();
        };
        let Some(root) = root else {
            return all.into_iter().collect();
        };
        all.into_iter()
            .filter(|id| {
                let mut current = document.get_node(*id).and_then(|n| n.parent);
                while let Some(p) = current {
                    if p == root {
                        return true;
                    }
                    current = document.get_node(p).and_then(|n| n.parent);
                }
                false
            })
            .collect()
    }

    pub fn matches(&self, node_id: usize, selector: &str) -> bool {
        self.query_selector_all(None, selector).contains(&node_id)
    }

    pub fn focus(&self, node_id: Option<usize>) {
        let mut document = self.document.borrow_mut();
        match node_id {
            Some(id) => {
                document.set_focus_to(id);
            }
            None => document.clear_focus(),
        }
    }

    pub fn active_element(&self) -> Option<usize> {
        self.document.borrow().get_focussed_node_id()
    }

    pub fn client_rect(&self, node_id: usize) -> Option<Vec<f64>> {
        self.flush_layout();
        let rect = self.document.borrow().get_client_bounding_rect(node_id)?;
        Some(vec![rect.x, rect.y, rect.width, rect.height])
    }

    pub fn box_metrics(&self, node_id: usize) -> Option<Vec<f64>> {
        self.flush_layout();
        let document = self.document.borrow();
        let node = document.get_node(node_id)?;
        let layout = &node.unrounded_layout;

        let border_width = f64::from(layout.size.width);
        let border_height = f64::from(layout.size.height);

        let client_width = (border_width
            - f64::from(layout.border.left + layout.border.right)
            - f64::from(layout.scrollbar_size.width))
        .max(0.0);
        let client_height = (border_height
            - f64::from(layout.border.top + layout.border.bottom)
            - f64::from(layout.scrollbar_size.height))
        .max(0.0);

        Some(vec![
            border_width,
            border_height,
            client_width,
            client_height,
            f64::from(layout.content_size.width).max(client_width),
            f64::from(layout.content_size.height).max(client_height),
            node.scroll_offset.x,
            node.scroll_offset.y,
        ])
    }

    pub fn viewport_size(&self) -> Vec<f64> {
        let document = self.document.borrow();
        let (width, height) = document.viewport().window_size;
        vec![f64::from(width), f64::from(height)]
    }


    pub fn body(&self) -> Option<usize> {
        self.query_selector("body")
    }

    pub fn scripts(&self) -> Vec<Script> {
        let document = self.document.borrow();
        let Ok(nodes) = document.query_selector_all("script") else {
            return Vec::new();
        };
        drop(document);

        nodes
            .into_iter()
            .filter_map(|id| match self.attribute(id, "src") {
                Some(src) if !src.trim().is_empty() => Some(Script::Src(src)),
                _ => {
                    let text = self.text_content(id);
                    (!text.trim().is_empty()).then_some(Script::Inline(text))
                }
            })
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

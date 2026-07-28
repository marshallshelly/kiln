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

fn keyword<T: std::fmt::Debug>(value: &T) -> String {
    let raw = format!("{value:?}");
    let mut result = String::with_capacity(raw.len() + 4);
    for (i, ch) in raw.chars().enumerate() {
        if ch.is_uppercase() {
            if i > 0 {
                result.push('-');
            }
            result.extend(ch.to_lowercase());
        } else {
            result.push(ch);
        }
    }
    result
}

fn quantise(value: f32) -> String {
    let snapped = (f64::from(value) * 4.0).round() / 4.0;
    let snapped = if snapped == 0.0 { 0.0 } else { snapped };
    format!("{snapped}")
}

fn collapse(text: &str) -> String {
    let mut out = String::with_capacity(text.len());
    let mut spaced = false;
    for ch in text.chars() {
        if ch.is_whitespace() {
            if !out.is_empty() && !spaced {
                out.push(' ');
                spaced = true;
            }
        } else {
            out.push(ch);
            spaced = false;
        }
    }
    out.trim_end().to_string()
}

fn write_snapshot_node(
    document: &HtmlDocument,
    node_id: usize,
    path: &str,
    depth: usize,
    out: &mut String,
) {
    use std::fmt::Write;

    let Some(node) = document.get_node(node_id) else {
        return;
    };
    let indent = "  ".repeat(depth);

    match &node.data {
        NodeData::Comment => return,
        NodeData::Text(text) => {
            let opaque = node
                .parent
                .and_then(|parent| document.get_node(parent))
                .and_then(|parent| parent.element_data())
                .is_some_and(|element| {
                    matches!(element.name.local.as_ref(), "script" | "style")
                });
            let content = collapse(&text.content);
            if opaque {
                let _ = writeln!(out, "{indent}{path} <{} chars>", content.len());
            } else if !content.is_empty() {
                let _ = writeln!(out, "{indent}{path} {content:?}");
            }
            return;
        }
        NodeData::Document => {
            let _ = writeln!(out, "{indent}{path} #document");
        }
        NodeData::AnonymousBlock(_) => {
            let _ = writeln!(out, "{indent}{path} <anonymous>");
        }
        NodeData::Element(element) => {
            let _ = write!(out, "{indent}{path} {}", element.name.local);

            if element.name.ns != ns!(html) {
                let _ = write!(out, "[ns={}]", element.name.ns);
            }

            let attribute = |name: &str| {
                element
                    .attrs
                    .iter()
                    .find(|attr| attr.name.local.as_ref() == name)
                    .map(|attr| attr.value.to_string())
            };

            if let Some(id) = attribute("id") {
                let _ = write!(out, "#{id}");
            }
            if let Some(class) = attribute("class") {
                let mut classes: Vec<&str> = class.split_ascii_whitespace().collect();
                classes.sort_unstable();
                for name in classes {
                    let _ = write!(out, ".{name}");
                }
            }

            let mut rest: Vec<(String, String)> = element
                .attrs
                .iter()
                .filter(|attr| !matches!(attr.name.local.as_ref(), "id" | "class"))
                .map(|attr| (attr.name.local.to_string(), collapse(&attr.value)))
                .collect();
            rest.sort();
            for (name, value) in rest {
                let _ = write!(out, " {name}={value:?}");
            }

            let layout = &node.unrounded_layout;
            let position = node.absolute_position(0.0, 0.0);
            let _ = write!(
                out,
                " @ {},{} {}x{}",
                quantise(position.x),
                quantise(position.y),
                quantise(layout.size.width),
                quantise(layout.size.height),
            );

            match node.primary_styles() {
                Some(style) => {
                    let display = style.clone_display();
                    let _ = write!(
                        out,
                        " | display:{}/{} position:{}",
                        keyword(&display.outside()),
                        keyword(&display.inside()),
                        keyword(&style.clone_position()),
                    );
                }
                None => {
                    let _ = write!(out, " | display:none");
                }
            }
            let _ = writeln!(out);
        }
    }

    for (index, child) in node.children.iter().enumerate() {
        write_snapshot_node(document, *child, &format!("{path}/{index}"), depth + 1, out);
    }
}

fn label_of(id: u64) -> String {
    if id == u64::MAX {
        "window".to_string()
    } else {
        id.to_string()
    }
}

fn is_presentational(document: &HtmlDocument, id: u64) -> bool {
    let Ok(node_id) = usize::try_from(id) else {
        return false;
    };
    let Some(node) = document.get_node(node_id) else {
        return false;
    };

    if let NodeData::Text(text) = &node.data {
        if collapse(&text.content).is_empty() {
            return true;
        }
        return node
            .parent
            .and_then(|parent| document.get_node(parent))
            .and_then(|parent| parent.element_data())
            .is_some_and(|element| {
                matches!(element.name.local.as_ref(), "script" | "style" | "head")
            });
    }

    node.element_data()
        .is_some_and(|element| matches!(element.name.local.as_ref(), "script" | "style" | "head"))
}

fn write_accessibility_node(
    document: &HtmlDocument,
    nodes: &std::collections::BTreeMap<u64, &accesskit::Node>,
    id: u64,
    depth: usize,
    out: &mut String,
) {
    use std::fmt::Write;

    let Some(node) = nodes.get(&id) else {
        return;
    };
    if is_presentational(document, id) {
        return;
    }
    let indent = "  ".repeat(depth);

    let _ = write!(out, "{indent}{}", keyword(&node.role()));
    if let Some(label) = node.label() {
        let _ = write!(out, " {:?}", collapse(label));
    }
    if let Some(value) = node.value() {
        let _ = write!(out, " value={:?}", collapse(value));
    }
    let _ = writeln!(out);

    for child in node.children() {
        write_accessibility_node(document, nodes, child.0, depth + 1, out);
    }
}

pub enum Mutation {
    ChildList {
        parent: usize,
        added: Vec<usize>,
        removed: Vec<usize>,
        previous_sibling: Option<usize>,
        next_sibling: Option<usize>,
    },
    Attribute {
        target: usize,
        name: String,
        old_value: Option<String>,
    },
    CharacterData {
        target: usize,
        old_value: String,
    },
}

pub struct Record {
    pub seq: u64,
    pub mutation: Mutation,
}

#[derive(Default)]
pub struct Journal {
    records: std::collections::VecDeque<Record>,
    next: u64,
}

impl Journal {
    fn push(&mut self, mutation: Mutation) {
        let seq = self.next;
        self.next += 1;
        self.records.push_back(Record { seq, mutation });
    }

    pub fn next_seq(&self) -> u64 {
        self.next
    }

    pub fn since(&self, cursor: u64) -> impl Iterator<Item = &Record> {
        self.records.iter().filter(move |record| record.seq >= cursor)
    }

    pub fn retain_from(&mut self, seq: u64) {
        while self.records.front().is_some_and(|record| record.seq < seq) {
            self.records.pop_front();
        }
    }
}

#[derive(Clone)]
pub struct Dom {
    document: Rc<RefCell<HtmlDocument>>,
    journal: Rc<RefCell<Journal>>,
    clock: Rc<std::cell::Cell<f64>>,
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
            journal: Rc::new(RefCell::new(Journal::default())),
            clock: Rc::new(std::cell::Cell::new(0.0)),
        }
    }

    pub fn journal(&self) -> &Rc<RefCell<Journal>> {
        &self.journal
    }

    fn siblings_of(&self, node_id: usize) -> (Option<usize>, Option<usize>) {
        let document = self.document.borrow();
        let Some(parent) = document.get_node(node_id).and_then(|node| node.parent) else {
            return (None, None);
        };
        let Some(parent) = document.get_node(parent) else {
            return (None, None);
        };
        let Some(index) = parent.children.iter().position(|id| *id == node_id) else {
            return (None, None);
        };
        (
            index
                .checked_sub(1)
                .and_then(|previous| parent.children.get(previous).copied()),
            parent.children.get(index + 1).copied(),
        )
    }

    fn record_detach(&self, node_id: usize) {
        let Some(parent) = self.parent(node_id) else {
            return;
        };
        let (previous_sibling, next_sibling) = self.siblings_of(node_id);
        self.journal.borrow_mut().push(Mutation::ChildList {
            parent,
            added: Vec::new(),
            removed: vec![node_id],
            previous_sibling,
            next_sibling,
        });
    }

    pub fn set_viewport(&self, width: u32, height: u32, scale: f32) {
        self.document
            .borrow_mut()
            .set_viewport(Viewport::new(width, height, scale, ColorScheme::Light));
    }

    pub fn resolve(&self) {
        let now = self.clock.get();
        self.document.borrow_mut().resolve(now);
    }

    pub fn flush_layout(&self) {
        self.resolve();
    }

    pub fn set_time(&self, seconds: f64) {
        self.clock.set(seconds);
    }

    pub fn is_animating(&self) -> bool {
        self.document.borrow().is_animating()
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

    pub fn value(&self, node_id: usize) -> Option<String> {
        let document = self.document.borrow();
        let element = document.get_node(node_id)?.element_data()?;
        let input = element.text_input_data()?;
        let text = input.editor.text().to_string();

        let seeded = !element
            .attrs
            .iter()
            .any(|attr| attr.name.local.as_ref() == "value");
        if seeded && let Some(trimmed) = text.strip_suffix(' ') {
            return Some(trimmed.to_string());
        }
        Some(text)
    }

    pub fn set_value(&self, node_id: usize, value: &str) {
        let mut document = self.document.borrow_mut();
        let Some(element) = document
            .get_node_mut(node_id)
            .and_then(|node| node.element_data_mut())
        else {
            return;
        };
        let Some(input) = element.text_input_data_mut() else {
            return;
        };
        input.editor.set_text(value);
    }

    pub fn hover_node(&self) -> Option<usize> {
        self.document.borrow().get_hover_node_id()
    }

    pub fn scroll(&self, anchor: Option<usize>, dx: f64, dy: f64) -> Vec<crate::events::Dispatch> {
        let mut queued = Vec::new();
        {
            let mut document = self.document.borrow_mut();
            document.scroll_by(anchor, dx, dy, &mut |event| {
                queued.push(crate::events::Dispatch {
                    chain: vec![event.target],
                    kind: "scroll",
                    key: None,
                    button: 0,
                    client_x: 0.0,
                    client_y: 0.0,
                });
            });
        }
        queued
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

        let old_value = target.map(|text_node| self.text_content(text_node));

        let created = {
            let mut document = self.document.borrow_mut();
            let mut mutator = document.mutate();
            match target {
                Some(text_node) => {
                    mutator.set_node_text(text_node, value);
                    None
                }
                None => {
                    let text_node = mutator.create_text_node(value);
                    mutator.append_children(node_id, &[text_node]);
                    Some(text_node)
                }
            }
        };

        let mut journal = self.journal.borrow_mut();
        match (target, created) {
            (Some(text_node), _) => journal.push(Mutation::CharacterData {
                target: text_node,
                old_value: old_value.unwrap_or_default(),
            }),
            (None, Some(text_node)) => journal.push(Mutation::ChildList {
                parent: node_id,
                added: vec![text_node],
                removed: Vec::new(),
                previous_sibling: None,
                next_sibling: None,
            }),
            (None, None) => {}
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
        self.record_detach(child);
        let previous_sibling = self.children(parent).last().copied();

        {
            let mut document = self.document.borrow_mut();
            document.mutate().append_children(parent, &[child]);
        }

        self.journal.borrow_mut().push(Mutation::ChildList {
            parent,
            added: vec![child],
            removed: Vec::new(),
            previous_sibling,
            next_sibling: None,
        });
    }

    pub fn insert_before(&self, child: usize, reference: usize) {
        self.record_detach(child);
        let parent = self.parent(reference);
        let (previous_sibling, _) = self.siblings_of(reference);

        {
            let mut document = self.document.borrow_mut();
            document.mutate().insert_nodes_before(reference, &[child]);
        }

        if let Some(parent) = parent {
            self.journal.borrow_mut().push(Mutation::ChildList {
                parent,
                added: vec![child],
                removed: Vec::new(),
                previous_sibling,
                next_sibling: Some(reference),
            });
        }
    }

    pub fn remove_child(&self, child: usize) {
        self.record_detach(child);
        let mut document = self.document.borrow_mut();
        document.mutate().remove_node(child);
    }

    pub fn set_attribute(&self, node_id: usize, name: &str, value: &str) {
        let old_value = self.attribute(node_id, name);
        {
            let mut document = self.document.borrow_mut();
            document.mutate().set_attribute(node_id, Self::attr_name(name), value);
        }
        self.journal.borrow_mut().push(Mutation::Attribute {
            target: node_id,
            name: name.to_ascii_lowercase(),
            old_value,
        });
    }

    pub fn remove_attribute(&self, node_id: usize, name: &str) {
        let old_value = self.attribute(node_id, name);
        {
            let mut document = self.document.borrow_mut();
            document.mutate().clear_attribute(node_id, Self::attr_name(name));
        }
        self.journal.borrow_mut().push(Mutation::Attribute {
            target: node_id,
            name: name.to_ascii_lowercase(),
            old_value,
        });
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
        let old_value = self.attribute(node_id, "style");
        {
            let mut document = self.document.borrow_mut();
            if value.is_empty() {
                document.mutate().remove_style_property(node_id, name);
            } else {
                document.mutate().set_style_property(node_id, name, value);
            }
        }
        self.journal.borrow_mut().push(Mutation::Attribute {
            target: node_id,
            name: "style".into(),
            old_value,
        });
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
            f64::from(layout.border.left),
            f64::from(layout.border.top),
        ])
    }

    pub fn computed_style(&self, node_id: usize) -> Vec<String> {
        self.flush_layout();
        let document = self.document.borrow();
        let Some(node) = document.get_node(node_id) else {
            return Vec::new();
        };

        let layout = &node.unrounded_layout;
        let px = |v: f32| format!("{v}px");

        let content_width = (layout.size.width
            - layout.border.left
            - layout.border.right
            - layout.padding.left
            - layout.padding.right
            - layout.scrollbar_size.width)
            .max(0.0);
        let content_height = (layout.size.height
            - layout.border.top
            - layout.border.bottom
            - layout.padding.top
            - layout.padding.bottom
            - layout.scrollbar_size.height)
            .max(0.0);

        let mut out = vec![
            "width".into(),
            px(content_width),
            "height".into(),
            px(content_height),
            "padding-left".into(),
            px(layout.padding.left),
            "padding-right".into(),
            px(layout.padding.right),
            "padding-top".into(),
            px(layout.padding.top),
            "padding-bottom".into(),
            px(layout.padding.bottom),
            "border-left-width".into(),
            px(layout.border.left),
            "border-right-width".into(),
            px(layout.border.right),
            "border-top-width".into(),
            px(layout.border.top),
            "border-bottom-width".into(),
            px(layout.border.bottom),
            "margin-left".into(),
            px(layout.margin.left),
            "margin-right".into(),
            px(layout.margin.right),
            "margin-top".into(),
            px(layout.margin.top),
            "margin-bottom".into(),
            px(layout.margin.bottom),
        ];

        if let Some(style) = node.primary_styles() {
            out.push("position".into());
            out.push(keyword(&style.clone_position()));
            out.push("overflow-x".into());
            out.push(keyword(&style.clone_overflow_x()));
            out.push("overflow-y".into());
            out.push(keyword(&style.clone_overflow_y()));
            out.push("box-sizing".into());
            out.push(keyword(&style.clone_box_sizing()));
            out.push("visibility".into());
            out.push(keyword(&style.clone_visibility()));
            out.push("direction".into());
            out.push(keyword(&style.clone_direction()));
        }

        out
    }

    pub fn snapshot(&self) -> String {
        self.flush_layout();
        let document = self.document.borrow();
        let mut out = String::new();
        let root = document.root_node().id;
        write_snapshot_node(&document, root, "0", 0, &mut out);
        out
    }

    pub fn accessibility_snapshot(&self) -> String {
        use std::fmt::Write;

        self.flush_layout();
        let document = self.document.borrow();
        let update = document.build_accessibility_tree();

        let mut by_id: std::collections::BTreeMap<u64, &accesskit::Node> = Default::default();
        for (id, node) in &update.nodes {
            by_id.insert(id.0, node);
        }

        let mut out = String::new();
        let _ = writeln!(out, "focus {}", label_of(update.focus.0));

        let root = update.tree.as_ref().map(|tree| tree.root.0);
        if let Some(root) = root {
            write_accessibility_node(&document, &by_id, root, 0, &mut out);
        }
        out
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

#[cfg(test)]
mod tests {
    use super::*;

    fn describe(record: &Record) -> String {
        match &record.mutation {
            Mutation::ChildList {
                parent,
                added,
                removed,
                previous_sibling,
                next_sibling,
            } => format!(
                "childList parent={parent} added={added:?} removed={removed:?} prev={previous_sibling:?} next={next_sibling:?}"
            ),
            Mutation::Attribute {
                target,
                name,
                old_value,
            } => format!("attributes target={target} name={name} old={old_value:?}"),
            Mutation::CharacterData { target, old_value } => {
                format!("characterData target={target} old={old_value:?}")
            }
        }
    }

    #[test]
    fn journal_records_edits_in_order() {
        let dom = Dom::from_html(
            "<html><body><div id=host><span>a</span></div></body></html>",
            100,
            100,
            1.0,
        );
        let host = dom.query_selector("#host").unwrap();
        let span = dom.query_selector("span").unwrap();

        dom.set_attribute(host, "data-x", "1");
        dom.set_attribute(host, "data-x", "2");
        let paragraph = dom.create_element("p");
        dom.append_child(host, paragraph);
        dom.set_text_content(span, "b");
        dom.remove_child(paragraph);

        let journal = dom.journal().borrow();
        let actual: Vec<String> = journal.since(0).map(describe).collect();

        assert_eq!(
            actual,
            vec![
                format!("attributes target={host} name=data-x old=None"),
                format!("attributes target={host} name=data-x old=Some(\"1\")"),
                format!(
                    "childList parent={host} added=[{paragraph}] removed=[] prev=Some({span}) next=None"
                ),
                format!("characterData target={} old=\"a\"", dom.children(span)[0]),
                format!(
                    "childList parent={host} added=[] removed=[{paragraph}] prev=Some({span}) next=None"
                ),
            ]
        );
    }

    #[test]
    fn creating_a_node_records_nothing_until_it_is_attached() {
        let dom = Dom::from_html("<html><body></body></html>", 100, 100, 1.0);
        dom.create_element("div");
        dom.create_text_node("hello");
        assert_eq!(dom.journal().borrow().since(0).count(), 0);
    }

    #[test]
    fn moving_a_node_records_the_detach_first() {
        let dom = Dom::from_html(
            "<html><body><div id=from><i></i></div><div id=to></div></body></html>",
            100,
            100,
            1.0,
        );
        let from = dom.query_selector("#from").unwrap();
        let to = dom.query_selector("#to").unwrap();
        let moved = dom.query_selector("i").unwrap();

        dom.append_child(to, moved);

        let journal = dom.journal().borrow();
        let actual: Vec<String> = journal.since(0).map(describe).collect();
        assert_eq!(
            actual,
            vec![
                format!("childList parent={from} added=[] removed=[{moved}] prev=None next=None"),
                format!("childList parent={to} added=[{moved}] removed=[] prev=None next=None"),
            ]
        );
    }

    #[test]
    fn retain_from_drops_consumed_records() {
        let dom = Dom::from_html("<html><body><p></p></body></html>", 100, 100, 1.0);
        let node = dom.query_selector("p").unwrap();
        dom.set_attribute(node, "a", "1");
        dom.set_attribute(node, "b", "2");

        let cursor = dom.journal().borrow().next_seq();
        dom.journal().borrow_mut().retain_from(cursor);

        assert_eq!(dom.journal().borrow().since(0).count(), 0);
        assert_eq!(dom.journal().borrow().next_seq(), cursor);
    }

    #[test]
    fn the_document_is_only_mutated_through_this_module() {
        for entry in std::fs::read_dir("src").unwrap() {
            let path = entry.unwrap().path();
            if path.file_name().is_some_and(|name| name == "dom.rs") {
                continue;
            }
            let source = std::fs::read_to_string(&path).unwrap();
            assert!(
                !source.contains(".mutate()"),
                "{} mutates the document outside dom.rs, so the journal would miss it",
                path.display()
            );
        }
    }
}

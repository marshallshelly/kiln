use std::cell::RefCell;
use std::rc::Rc;

use anyhow::{Context, Result};

pub struct MenuNode {
    pub id: String,
    pub label: String,
    pub accelerator: Option<String>,
    pub enabled: bool,
    pub children: Vec<MenuNode>,
}

impl MenuNode {
    fn is_separator(&self) -> bool {
        self.label == "-"
    }
}

#[derive(Default)]
pub struct Native {
    menu: Rc<RefCell<Vec<MenuNode>>>,
    tray_menu: Rc<RefCell<Vec<MenuNode>>>,
    tray_tooltip: RefCell<String>,
    realised: RefCell<Option<muda::Menu>>,
    tray: RefCell<Option<tray_icon::TrayIcon>>,
}

impl Native {
    pub fn set_menu(&self, flat: &[String]) {
        *self.menu.borrow_mut() = parse_menu(flat);
    }

    pub fn menu_snapshot(&self) -> String {
        let mut out = String::new();
        write_menu(&self.menu.borrow(), 0, &mut out);
        out
    }

    pub fn set_tray(&self, tooltip: &str, flat: &[String]) {
        *self.tray_tooltip.borrow_mut() = tooltip.to_string();
        *self.tray_menu.borrow_mut() = parse_menu(flat);
    }

    pub fn tray_snapshot(&self) -> String {
        let mut out = format!("tooltip {:?}\n", self.tray_tooltip.borrow());
        write_menu(&self.tray_menu.borrow(), 0, &mut out);
        out
    }

    pub fn realise(&self) -> Result<()> {
        let menu = muda::Menu::new();
        for node in self.menu.borrow().iter() {
            menu.append(&*build_item(node)?).context("append menu item")?;
        }

        #[cfg(target_os = "macos")]
        menu.init_for_nsapp();

        *self.realised.borrow_mut() = Some(menu);

        if !self.tray_menu.borrow().is_empty() {
            let tray_menu = muda::Menu::new();
            for node in self.tray_menu.borrow().iter() {
                tray_menu.append(&*build_item(node)?).context("append tray item")?;
            }

            let tray = tray_icon::TrayIconBuilder::new()
                .with_tooltip(self.tray_tooltip.borrow().as_str())
                .with_menu(Box::new(tray_menu))
                .with_icon(kiln_tray_icon()?)
                .build()
                .context("build tray icon")?;
            *self.tray.borrow_mut() = Some(tray);
        }

        Ok(())
    }

    pub fn drain_menu_events(&self) -> Vec<String> {
        let mut ids = Vec::new();
        while let Ok(event) = muda::MenuEvent::receiver().try_recv() {
            ids.push(event.id().0.clone());
        }
        ids
    }

    pub fn read_text(&self) -> Option<String> {
        arboard::Clipboard::new().ok()?.get_text().ok()
    }

    pub fn write_text(&self, value: &str) -> Result<()> {
        arboard::Clipboard::new()
            .context("open clipboard")?
            .set_text(value.to_string())
            .context("write clipboard")
    }

    pub fn notify(&self, title: &str, body: &str) -> Result<()> {
        notify_rust::Notification::new()
            .summary(title)
            .body(body)
            .show()
            .map(|_| ())
            .context("show notification")
    }

    pub fn open_file(&self, multiple: bool) -> Vec<String> {
        let dialog = rfd::FileDialog::new();
        let paths = if multiple {
            dialog.pick_files().unwrap_or_default()
        } else {
            dialog.pick_file().into_iter().collect()
        };
        paths
            .into_iter()
            .map(|path| path.to_string_lossy().into_owned())
            .collect()
    }

    pub fn save_file(&self, suggested: &str) -> Option<String> {
        rfd::FileDialog::new()
            .set_file_name(suggested)
            .save_file()
            .map(|path| path.to_string_lossy().into_owned())
    }

    pub fn message(&self, title: &str, body: &str) {
        rfd::MessageDialog::new()
            .set_title(title)
            .set_description(body)
            .show();
    }
}

fn kiln_tray_icon() -> Result<tray_icon::Icon> {
    const SIZE: u32 = 32;
    let mut rgba = Vec::with_capacity((SIZE * SIZE * 4) as usize);
    let centre = (SIZE as f32 - 1.0) / 2.0;

    for y in 0..SIZE {
        for x in 0..SIZE {
            let dx = x as f32 - centre;
            let dy = y as f32 - centre;
            let radius = (dx * dx + dy * dy).sqrt();
            let alpha = if radius <= centre { 255 } else { 0 };
            rgba.extend_from_slice(&[0xF5, 0xA9, 0x3C, alpha]);
        }
    }

    tray_icon::Icon::from_rgba(rgba, SIZE, SIZE).context("build tray icon bitmap")
}

fn accelerator(node: &MenuNode) -> Option<muda::accelerator::Accelerator> {
    use std::str::FromStr;
    node.accelerator
        .as_ref()
        .and_then(|text| muda::accelerator::Accelerator::from_str(text).ok())
}

fn build_item(node: &MenuNode) -> Result<Box<dyn muda::IsMenuItem>> {
    if node.is_separator() {
        return Ok(Box::new(muda::PredefinedMenuItem::separator()));
    }

    if node.children.is_empty() {
        return Ok(Box::new(muda::MenuItem::with_id(
            node.id.clone(),
            &node.label,
            node.enabled,
            accelerator(node),
        )));
    }

    let submenu = muda::Submenu::with_id(node.id.clone(), &node.label, node.enabled);
    for child in &node.children {
        submenu
            .append(&*build_item(child)?)
            .context("append submenu item")?;
    }
    Ok(Box::new(submenu))
}

fn parse_menu(flat: &[String]) -> Vec<MenuNode> {
    let mut roots: Vec<MenuNode> = Vec::new();

    for entry in flat.chunks_exact(5) {
        let depth: usize = entry[0].parse().unwrap_or(0);
        let node = MenuNode {
            id: entry[1].clone(),
            label: entry[2].clone(),
            accelerator: (!entry[3].is_empty()).then(|| entry[3].clone()),
            enabled: entry[4] != "0",
            children: Vec::new(),
        };

        match parent_at(&mut roots, depth) {
            Some(parent) => parent.push(node),
            None => roots.push(node),
        }
    }

    roots
}

fn parent_at(roots: &mut Vec<MenuNode>, depth: usize) -> Option<&mut Vec<MenuNode>> {
    if depth == 0 {
        return None;
    }
    let mut level = roots;
    for _ in 0..depth {
        let last = level.last_mut()?;
        level = &mut last.children;
    }
    Some(level)
}

fn write_menu(nodes: &[MenuNode], depth: usize, out: &mut String) {
    use std::fmt::Write;

    for node in nodes {
        let indent = "  ".repeat(depth);
        if node.is_separator() {
            let _ = writeln!(out, "{indent}---");
            continue;
        }

        let _ = write!(out, "{indent}{:?}", node.label);
        if !node.id.is_empty() {
            let _ = write!(out, " #{}", node.id);
        }
        if let Some(accelerator) = &node.accelerator {
            let _ = write!(out, " [{accelerator}]");
        }
        if !node.enabled {
            let _ = write!(out, " disabled");
        }
        let _ = writeln!(out);

        write_menu(&node.children, depth + 1, out);
    }
}

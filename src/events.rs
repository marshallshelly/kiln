use std::cell::RefCell;
use std::rc::Rc;
use std::sync::Arc;

use atomic_refcell::AtomicRefCell;
use blitz_dom::{Document, EventHandler};
use blitz_traits::events::{
    BlitzKeyEvent, BlitzPointerEvent, BlitzPointerId, DomEvent, DomEventData, EventState, KeyState,
    MouseEventButton, MouseEventButtons, Point, PointerCoords, PointerDetails, UiEvent,
};
use keyboard_types::{Code, Key, Location, Modifiers};
use winit::event::{ElementState, MouseButton};
use winit::keyboard::{KeyCode, PhysicalKey};

pub struct Dispatch {
    pub chain: Vec<usize>,
    pub kind: &'static str,
    pub key: Option<String>,
    pub button: u16,
    pub client_x: f32,
    pub client_y: f32,
}

#[derive(Default, Clone)]
pub struct Collector {
    pub queued: Rc<RefCell<Vec<Dispatch>>>,
}

impl EventHandler for Collector {
    fn handle_event(
        &mut self,
        chain: &[usize],
        event: &mut DomEvent,
        _doc: &mut dyn Document,
        _state: &mut EventState,
    ) {
        let kind = match &event.data {
            DomEventData::Click(_) => "click",
            DomEventData::MouseDown(_) => "mousedown",
            DomEventData::MouseUp(_) => "mouseup",
            DomEventData::MouseMove(_) => "mousemove",
            DomEventData::KeyDown(_) => "keydown",
            DomEventData::KeyUp(_) => "keyup",
            DomEventData::Input(_) => "input",
            DomEventData::Focus(_) => "focus",
            DomEventData::Blur(_) => "blur",
            _ => return,
        };

        let (button, client_x, client_y) = match &event.data {
            DomEventData::Click(p)
            | DomEventData::MouseDown(p)
            | DomEventData::MouseUp(p)
            | DomEventData::MouseMove(p) => {
                (p.button as u16, p.client_x(), p.client_y())
            }
            _ => (0, 0.0, 0.0),
        };

        let key = match &event.data {
            DomEventData::KeyDown(k) | DomEventData::KeyUp(k) => Some(k.key.to_string()),
            _ => None,
        };

        self.queued.borrow_mut().push(Dispatch {
            chain: chain.to_vec(),
            kind,
            key,
            button,
            client_x,
            client_y,
        });
    }
}

fn coords(x: f32, y: f32) -> PointerCoords {
    PointerCoords {
        page_x: x,
        page_y: y,
        screen_x: x,
        screen_y: y,
        client_x: x,
        client_y: y,
    }
}

fn mouse_button(button: MouseButton) -> MouseEventButton {
    match button {
        MouseButton::Right => MouseEventButton::Secondary,
        MouseButton::Middle => MouseEventButton::Auxiliary,
        _ => MouseEventButton::Main,
    }
}

fn pointer(x: f32, y: f32, button: MouseButton, pressed: bool) -> BlitzPointerEvent {
    BlitzPointerEvent {
        id: BlitzPointerId::Mouse,
        is_primary: true,
        coords: coords(x, y),
        button: mouse_button(button),
        buttons: if pressed {
            MouseEventButtons::Primary
        } else {
            MouseEventButtons::empty()
        },
        mods: Modifiers::default(),
        details: PointerDetails::default(),
        element: Point { x, y },
        active_pointers: Arc::new(AtomicRefCell::new(Vec::new())),
    }
}

pub fn pointer_move(x: f32, y: f32) -> UiEvent {
    UiEvent::PointerMove(pointer(x, y, MouseButton::Left, false))
}

pub fn pointer_button(x: f32, y: f32, button: MouseButton, state: ElementState) -> UiEvent {
    let pressed = state == ElementState::Pressed;
    let event = pointer(x, y, button, pressed);
    if pressed {
        UiEvent::PointerDown(event)
    } else {
        UiEvent::PointerUp(event)
    }
}

fn named_key(code: PhysicalKey) -> Key {
    let PhysicalKey::Code(code) = code else {
        return Key::Unidentified;
    };
    match code {
        KeyCode::Enter | KeyCode::NumpadEnter => Key::Enter,
        KeyCode::Escape => Key::Escape,
        KeyCode::Tab => Key::Tab,
        KeyCode::Backspace => Key::Backspace,
        KeyCode::Delete => Key::Delete,
        KeyCode::ArrowUp => Key::ArrowUp,
        KeyCode::ArrowDown => Key::ArrowDown,
        KeyCode::ArrowLeft => Key::ArrowLeft,
        KeyCode::ArrowRight => Key::ArrowRight,
        KeyCode::Home => Key::Home,
        KeyCode::End => Key::End,
        KeyCode::PageUp => Key::PageUp,
        KeyCode::PageDown => Key::PageDown,
        KeyCode::Space => Key::Character(" ".into()),
        _ => Key::Unidentified,
    }
}

pub fn key(event: &winit::event::KeyEvent) -> UiEvent {
    let named = named_key(event.physical_key);
    let key = match (&named, &event.text) {
        (Key::Unidentified, Some(text)) => Key::Character(text.as_str().into()),
        _ => named,
    };

    let state = match event.state {
        ElementState::Pressed => KeyState::Pressed,
        ElementState::Released => KeyState::Released,
    };

    let blitz = BlitzKeyEvent {
        key,
        code: Code::Unidentified,
        modifiers: Modifiers::default(),
        location: Location::Standard,
        is_auto_repeating: event.repeat,
        is_composing: false,
        state,
        text: event.text.as_ref().map(|t| t.as_str().into()),
    };

    match event.state {
        ElementState::Pressed => UiEvent::KeyDown(blitz),
        ElementState::Released => UiEvent::KeyUp(blitz),
    }
}

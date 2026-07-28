use std::cell::RefCell;
use std::rc::Rc;
use std::sync::Arc;

use atomic_refcell::AtomicRefCell;
use blitz_dom::{Document, EventHandler};
use blitz_traits::events::{
    BlitzImeEvent, BlitzKeyEvent, BlitzPointerEvent, BlitzPointerId, BlitzWheelDelta,
    BlitzWheelEvent, DomEvent, DomEventData, EventState, KeyState, MouseEventButton,
    MouseEventButtons, Point, PointerCoords, PointerDetails, UiEvent,
};
use keyboard_types::{Code, Key, Location, Modifiers};
use winit::event::{ElementState, MouseButton, MouseScrollDelta};
use winit::keyboard::{KeyCode, PhysicalKey};

const LINE_HEIGHT: f64 = 20.0;

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
            DomEventData::Wheel(_) => "wheel",
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
            | DomEventData::MouseMove(p) => (p.button as u16, p.client_x(), p.client_y()),
            DomEventData::Wheel(w) => (0, w.client_x(), w.client_y()),
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

pub fn wheel(x: f32, y: f32, delta: MouseScrollDelta) -> UiEvent {
    let delta = match delta {
        MouseScrollDelta::LineDelta(dx, dy) => {
            BlitzWheelDelta::Lines(f64::from(-dx), f64::from(-dy))
        }
        MouseScrollDelta::PixelDelta(position) => {
            BlitzWheelDelta::Pixels(-position.x, -position.y)
        }
    };

    UiEvent::Wheel(BlitzWheelEvent {
        delta,
        coords: coords(x, y),
        buttons: MouseEventButtons::empty(),
        mods: Modifiers::default(),
        element: Point { x, y },
    })
}

pub fn wheel_pixels_of(delta: MouseScrollDelta) -> (f64, f64) {
    match delta {
        MouseScrollDelta::LineDelta(dx, dy) => {
            (f64::from(dx) * LINE_HEIGHT, f64::from(dy) * LINE_HEIGHT)
        }
        MouseScrollDelta::PixelDelta(position) => (position.x, position.y),
    }
}

pub fn wheel_pixels(x: f32, y: f32, dx: f64, dy: f64) -> UiEvent {
    UiEvent::Wheel(BlitzWheelEvent {
        delta: BlitzWheelDelta::Pixels(dx, dy),
        coords: coords(x, y),
        buttons: MouseEventButtons::empty(),
        mods: Modifiers::default(),
        element: Point { x, y },
    })
}

pub fn ime(event: winit::event::Ime) -> UiEvent {
    UiEvent::Ime(match event {
        winit::event::Ime::Enabled => BlitzImeEvent::Enabled,
        winit::event::Ime::Disabled => BlitzImeEvent::Disabled,
        winit::event::Ime::Preedit(text, cursor) => BlitzImeEvent::Preedit(text, cursor),
        winit::event::Ime::Commit(text) => BlitzImeEvent::Commit(text),
    })
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

pub fn text_key(text: &str, pressed: bool) -> UiEvent {
    let event = BlitzKeyEvent {
        key: Key::Character(text.into()),
        code: Code::Unidentified,
        modifiers: Modifiers::default(),
        location: Location::Standard,
        is_auto_repeating: false,
        is_composing: false,
        state: if pressed {
            KeyState::Pressed
        } else {
            KeyState::Released
        },
        text: Some(text.into()),
    };
    if pressed {
        UiEvent::KeyDown(event)
    } else {
        UiEvent::KeyUp(event)
    }
}

pub fn named(name: &str, pressed: bool) -> Option<UiEvent> {
    let key = match name {
        "Enter" => Key::Enter,
        "Tab" => Key::Tab,
        "Escape" => Key::Escape,
        "Backspace" => Key::Backspace,
        "Delete" => Key::Delete,
        "ArrowUp" => Key::ArrowUp,
        "ArrowDown" => Key::ArrowDown,
        "ArrowLeft" => Key::ArrowLeft,
        "ArrowRight" => Key::ArrowRight,
        "Home" => Key::Home,
        "End" => Key::End,
        _ => return None,
    };
    let event = BlitzKeyEvent {
        key,
        code: Code::Unidentified,
        modifiers: Modifiers::default(),
        location: Location::Standard,
        is_auto_repeating: false,
        is_composing: false,
        state: if pressed {
            KeyState::Pressed
        } else {
            KeyState::Released
        },
        text: None,
    };
    Some(if pressed {
        UiEvent::KeyDown(event)
    } else {
        UiEvent::KeyUp(event)
    })
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

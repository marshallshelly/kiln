use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::sync::mpsc::{Receiver, Sender, channel};

use anyhow::{Context, Result};
use serde_json::{Value, json};

use crate::dom::Dom;
use crate::script::Script;

pub const FRAME_ID: &str = "KILN-FRAME";
const TARGET_ID: &str = "KILN-TARGET";

/// A request from the socket thread, with the channel its answer goes back on.
pub struct Call {
    pub method: String,
    pub params: Value,
    pub reply: Sender<Value>,
}

pub struct Devtools {
    calls: Receiver<Call>,
    pub port: u16,
}

impl Devtools {
    pub fn start(port: u16) -> Result<Self> {
        let listener = TcpListener::bind(("127.0.0.1", port))
            .with_context(|| format!("bind 127.0.0.1:{port}"))?;
        let port = listener.local_addr().context("read local addr")?.port();
        let (sender, calls) = channel();

        std::thread::spawn(move || {
            for stream in listener.incoming().flatten() {
                let sender = sender.clone();
                std::thread::spawn(move || {
                    if let Err(error) = serve(stream, port, sender) {
                        eprintln!("devtools: {error}");
                    }
                });
            }
        });

        Ok(Self { calls, port })
    }

    pub fn url(&self) -> String {
        format!(
            "devtools://devtools/bundled/inspector.html?ws=127.0.0.1:{}/kiln",
            self.port
        )
    }

    /// Answer everything the socket threads have queued. Called from the event
    /// loop, because the document is not `Send`.
    pub fn pump(&self, dom: &Dom, script: &Script) {
        while let Ok(call) = self.calls.try_recv() {
            let result = handle(&call.method, &call.params, dom, script);
            let _ = call.reply.send(result);
        }
    }
}

/// Send a UI event through the same `EventDriver` path a real mouse or
/// keyboard takes, then let layout and observers settle.
fn drive(dom: &Dom, script: &Script, event: blitz_traits::events::UiEvent) {
    for dispatch in dom.drive(event) {
        if let Err(error) = script.dispatch(&dispatch) {
            eprintln!("devtools: {error}");
        }
    }
    dom.settle(script);
}

pub fn handle(method: &str, params: &Value, dom: &Dom, script: &Script) -> Value {
    match method {
        "Input.dispatchMouseEvent" => {
            let x = params["x"].as_f64().unwrap_or(0.0) as f32;
            let y = params["y"].as_f64().unwrap_or(0.0) as f32;
            match params["type"].as_str().unwrap_or_default() {
                "mousePressed" => drive(
                    dom,
                    script,
                    crate::events::pointer_button(
                        x,
                        y,
                        winit::event::MouseButton::Left,
                        winit::event::ElementState::Pressed,
                    ),
                ),
                "mouseReleased" => drive(
                    dom,
                    script,
                    crate::events::pointer_button(
                        x,
                        y,
                        winit::event::MouseButton::Left,
                        winit::event::ElementState::Released,
                    ),
                ),
                "mouseMoved" => drive(dom, script, crate::events::pointer_move(x, y)),
                "mouseWheel" => {
                    let dx = params["deltaX"].as_f64().unwrap_or(0.0);
                    let dy = params["deltaY"].as_f64().unwrap_or(0.0);
                    drive(dom, script, crate::events::wheel_pixels(x, y, dx, dy));
                    let anchor = dom.hover_node();
                    for dispatch in dom.scroll(anchor, -dx, -dy) {
                        let _ = script.dispatch(&dispatch);
                    }
                    dom.settle(script);
                }
                _ => {}
            }
            json!({})
        }

        "Input.insertText" => {
            for ch in params["text"].as_str().unwrap_or_default().chars() {
                let ch = ch.to_string();
                for pressed in [true, false] {
                    drive(dom, script, crate::events::text_key(&ch, pressed));
                }
            }
            json!({})
        }

        "Input.dispatchKeyEvent" => {
            let pressed = params["type"].as_str().unwrap_or_default() != "keyUp";
            let key = params["key"].as_str().unwrap_or_default();
            match crate::events::named(key, pressed) {
                Some(event) => drive(dom, script, event),
                None => {
                    let text = params["text"].as_str().unwrap_or(key);
                    if !text.is_empty() {
                        drive(dom, script, crate::events::text_key(text, pressed));
                    }
                }
            }
            json!({})
        }

        "DOM.querySelector" => {
            let selector = params["selector"].as_str().unwrap_or_default();
            json!({ "nodeId": dom.query_selector(selector).unwrap_or(0) })
        }
        "Runtime.evaluate" => {
            let expression = params["expression"].as_str().unwrap_or_default();
            match script.evaluate(expression) {
                Ok(value) => json!({
                    "result": {
                        "type": value_type(&value),
                        "value": serde_json::from_str::<Value>(&value).unwrap_or(Value::Null),
                        "description": value,
                    }
                }),
                Err(error) => json!({
                    "result": { "type": "string", "value": error.to_string() },
                    "exceptionDetails": { "text": error.to_string() },
                }),
            }
        }

        "DOM.getDocument" => {
            let depth = params["depth"].as_i64().unwrap_or(2);
            json!({ "root": node_json(dom, dom.root(), depth) })
        }

        "DOM.requestChildNodes" => json!({}),

        "DOM.getOuterHTML" => {
            let id = params["nodeId"].as_u64().unwrap_or(0) as usize;
            json!({ "outerHTML": outer_html(dom, id) })
        }

        "DOM.getBoxModel" => {
            let id = params["nodeId"].as_u64().unwrap_or(0) as usize;
            match dom.client_rect(id) {
                Some(rect) => {
                    let (x, y, w, h) = (rect[0], rect[1], rect[2], rect[3]);
                    let quad = json!([x, y, x + w, y, x + w, y + h, x, y + h]);
                    json!({ "model": {
                        "content": quad, "padding": quad, "border": quad, "margin": quad,
                        "width": w, "height": h,
                    }})
                }
                None => json!({}),
            }
        }

        "CSS.getComputedStyleForNode" => {
            let id = params["nodeId"].as_u64().unwrap_or(0) as usize;
            let flat = dom.computed_style(id);
            let properties: Vec<Value> = flat
                .chunks_exact(2)
                .map(|pair| json!({ "name": pair[0], "value": pair[1] }))
                .collect();
            json!({ "computedStyle": properties })
        }

        // The one thing an automation client could not do over the protocol:
        // drive the page but never see it. Renders through the same paint call
        // the CLI and the window use.
        "Page.captureScreenshot" => {
            let size = dom.viewport_size();
            let width = size[0] as u32;
            let height = size[1] as u32;

            match dom.png_bytes(width, height, 1.0) {
                Ok(png) => {
                    use base64::Engine as _;
                    json!({ "data": base64::engine::general_purpose::STANDARD.encode(png) })
                }
                Err(error) => json!({ "error": error.to_string() }),
            }
        }

        "Page.getFrameTree" => json!({
            "frameTree": {
                "frame": {
                    "id": FRAME_ID,
                    "loaderId": "KILN-LOADER",
                    "url": "kiln://app",
                    "domainAndRegistry": "",
                    "securityOrigin": "kiln://app",
                    "mimeType": "text/html",
                },
                "childFrames": [],
            }
        }),

        "Page.getResourceTree" => json!({
            "frameTree": {
                "frame": {
                    "id": FRAME_ID,
                    "loaderId": "KILN-LOADER",
                    "url": "kiln://app",
                    "securityOrigin": "kiln://app",
                    "mimeType": "text/html",
                },
                "resources": [],
            }
        }),

        "Target.getTargetInfo" => json!({
            "targetInfo": {
                "targetId": TARGET_ID,
                "type": "page",
                "title": "Kiln",
                "url": "kiln://app",
                "attached": true,
            }
        }),

        // Every `*.enable`, `*.disable` and the capability probes DevTools sends
        // on connect are acknowledged so the front end finishes its handshake.
        _ => json!({}),
    }
}

fn value_type(value: &str) -> &'static str {
    match value {
        "undefined" => "undefined",
        "null" => "object",
        _ if value.starts_with('"') => "string",
        _ if value == "true" || value == "false" => "boolean",
        _ if value.starts_with('{') || value.starts_with('[') => "object",
        _ if value.parse::<f64>().is_ok() => "number",
        _ => "string",
    }
}

fn node_json(dom: &Dom, id: usize, depth: i64) -> Value {
    let children = dom.children(id);

    let (node_type, node_name, local_name, node_value) = if dom.is_text(id) {
        (3, "#text".to_string(), String::new(), dom.text_content(id))
    } else {
        match dom.tag_name(id) {
            Some(tag) => (1, tag.to_uppercase(), tag, String::new()),
            None => (9, "#document".to_string(), String::new(), String::new()),
        }
    };

    let mut node = json!({
        "nodeId": id,
        "backendNodeId": id,
        "nodeType": node_type,
        "nodeName": node_name,
        "localName": local_name,
        "nodeValue": node_value,
        "childNodeCount": children.len(),
        "attributes": dom.attributes(id),
    });

    if depth != 0 {
        let kids: Vec<Value> = children
            .into_iter()
            .map(|child| node_json(dom, child, depth - 1))
            .collect();
        node["children"] = Value::Array(kids);
    }

    node
}

fn outer_html(dom: &Dom, id: usize) -> String {
    if dom.is_text(id) {
        return dom.text_content(id);
    }

    let Some(tag) = dom.tag_name(id) else {
        return dom
            .children(id)
            .into_iter()
            .map(|child| outer_html(dom, child))
            .collect();
    };

    let mut out = format!("<{tag}");
    for pair in dom.attributes(id).chunks_exact(2) {
        out.push_str(&format!(" {}=\"{}\"", pair[0], pair[1]));
    }
    out.push('>');
    for child in dom.children(id) {
        out.push_str(&outer_html(dom, child));
    }
    out.push_str(&format!("</{tag}>"));
    out
}

fn serve(mut stream: TcpStream, port: u16, sender: Sender<Call>) -> Result<()> {
    let mut peek = [0u8; 1024];
    let read = stream.peek(&mut peek).context("peek request")?;
    let head = String::from_utf8_lossy(&peek[..read]);

    if head.starts_with("GET /json") && !head.contains("Upgrade: websocket") {
        let mut discard = vec![0u8; read];
        let _ = stream.read(&mut discard);
        return respond_discovery(&mut stream, port, &head);
    }

    let mut socket = tungstenite::accept(stream).context("websocket handshake")?;

    loop {
        let message = match socket.read() {
            Ok(message) => message,
            Err(_) => return Ok(()),
        };
        let Ok(text) = message.into_text() else {
            continue;
        };
        let Ok(request): Result<Value, _> = serde_json::from_str(&text) else {
            continue;
        };

        let id = request["id"].clone();
        let method = request["method"].as_str().unwrap_or_default().to_string();
        let params = request["params"].clone();

        let (reply, answer) = channel();
        if sender
            .send(Call {
                method,
                params,
                reply,
            })
            .is_err()
        {
            return Ok(());
        }

        let result = answer.recv().unwrap_or_else(|_| json!({}));
        let response = json!({ "id": id, "result": result });
        if socket.send(response.to_string().into()).is_err() {
            return Ok(());
        }
    }
}

fn respond_discovery(stream: &mut TcpStream, port: u16, head: &str) -> Result<()> {
    let ws = format!("127.0.0.1:{port}/kiln");
    let body = if head.starts_with("GET /json/version") {
        json!({
            "Browser": "Kiln",
            "Protocol-Version": "1.3",
            "webSocketDebuggerUrl": format!("ws://{ws}"),
        })
        .to_string()
    } else {
        json!([{
            "id": TARGET_ID,
            "type": "page",
            "title": "Kiln",
            "url": "kiln://app",
            "webSocketDebuggerUrl": format!("ws://{ws}"),
            "devtoolsFrontendUrl": format!(
                "devtools://devtools/bundled/inspector.html?ws={ws}"
            ),
        }])
        .to_string()
    };

    let response = format!(
        "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nContent-Length: {}\r\n\r\n{body}",
        body.len()
    );
    stream
        .write_all(response.as_bytes())
        .context("write discovery")?;
    stream.flush().context("flush discovery")?;
    Ok(())
}

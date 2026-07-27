use anyhow::{Context as _, Result, anyhow};
use rquickjs::{Context, Function, Object, Runtime};

use crate::dom::Dom;

const PRELUDE: &str = r#"
globalThis.console = {
  log: (...args) => __kiln.log(args.map((a) => typeof a === "string" ? a : JSON.stringify(a)).join(" ")),
};
globalThis.console.info = globalThis.console.log;
globalThis.console.warn = globalThis.console.log;
globalThis.console.error = globalThis.console.log;

const __listeners = new Map();
const __nodes = new Map();
const __styles = new Map();

class Node {
  constructor(id) { this.__id = id; }
  get nodeType() { return __kiln.isText(this.__id) ? 3 : 1; }
  get parentNode() { return __wrap(__kiln.parent(this.__id)); }
  get parentElement() { return this.parentNode; }
  get nextSibling() { return __wrap(__kiln.nextSibling(this.__id)); }
  get childNodes() { return __kiln.children(this.__id).map(__wrap); }
  get firstChild() { const c = __kiln.children(this.__id); return c.length ? __wrap(c[0]) : null; }
  get textContent() { return __kiln.getText(this.__id); }
  set textContent(value) { __kiln.setText(this.__id, value == null ? "" : String(value)); }
  appendChild(child) { __kiln.appendChild(this.__id, child.__id); return child; }
  insertBefore(child, reference) {
    if (!reference) return this.appendChild(child);
    __kiln.insertBefore(child.__id, reference.__id);
    return child;
  }
  removeChild(child) { __kiln.removeChild(child.__id); return child; }
  remove() { __kiln.removeChild(this.__id); }
  addEventListener(type, handler) {
    const key = this.__id + ":" + type;
    const existing = __listeners.get(key);
    if (existing) { existing.push(handler); } else { __listeners.set(key, [handler]); }
  }
  removeEventListener(type, handler) {
    const key = this.__id + ":" + type;
    const existing = __listeners.get(key);
    if (!existing) return;
    const index = existing.indexOf(handler);
    if (index >= 0) existing.splice(index, 1);
  }
}

class Text extends Node {
  get data() { return __kiln.getText(this.__id); }
  set data(value) { __kiln.setText(this.__id, value == null ? "" : String(value)); }
  get nodeValue() { return this.data; }
  set nodeValue(value) { this.data = value; }
}

class Element extends Node {
  get localName() { return __kiln.tagName(this.__id) || ""; }
  get nodeName() { return this.localName.toUpperCase(); }
  get tagName() { return this.nodeName; }
  setAttribute(name, value) { __kiln.setAttribute(this.__id, name, value == null ? "" : String(value)); }
  removeAttribute(name) { __kiln.removeAttribute(this.__id, name); }
  getAttribute(name) { return __kiln.getAttribute(this.__id, name); }
  hasAttribute(name) { return __kiln.getAttribute(this.__id, name) !== null; }
  get className() { return __kiln.getAttribute(this.__id, "class") || ""; }
  set className(value) { this.setAttribute("class", value); }
  get id() { return __kiln.getAttribute(this.__id, "id") || ""; }
  set id(value) { this.setAttribute("id", value); }
  get style() {
    let proxy = __styles.get(this.__id);
    if (!proxy) { proxy = __makeStyle(this.__id); __styles.set(this.__id, proxy); }
    return proxy;
  }
}

function __dashed(name) {
  return String(name).replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
}

function __makeStyle(id) {
  return new Proxy({}, {
    get(_target, prop) {
      if (prop === "setProperty") {
        return (name, value) => __kiln.setStyle(id, __dashed(name), value == null ? "" : String(value));
      }
      if (prop === "removeProperty") return (name) => __kiln.setStyle(id, __dashed(name), "");
      if (prop === "cssText") return "";
      return "";
    },
    set(_target, prop, value) {
      if (prop === "cssText") return true;
      __kiln.setStyle(id, __dashed(prop), value == null ? "" : String(value));
      return true;
    },
  });
}

function __wrap(id) {
  if (id === null || id === undefined) return null;
  let node = __nodes.get(id);
  if (!node) {
    node = __kiln.isText(id) ? new Text(id) : new Element(id);
    __nodes.set(id, node);
  }
  return node;
}

for (const name of [
  "onclick", "oninput", "onchange", "onsubmit", "onkeydown", "onkeyup", "onkeypress",
  "onmousedown", "onmouseup", "onmousemove", "onmouseover", "onmouseout",
  "onmouseenter", "onmouseleave", "onfocus", "onblur", "ondblclick",
  "onpointerdown", "onpointerup", "onpointermove", "onwheel", "onscroll",
]) {
  Object.defineProperty(Element.prototype, name, {
    value: null,
    writable: true,
    configurable: true,
  });
}

globalThis.Node = Node;
globalThis.Element = Element;
globalThis.Text = Text;

globalThis.document = {
  createElement(tag) { return __wrap(__kiln.createElement(String(tag))); },
  createElementNS(_ns, tag) { return __wrap(__kiln.createElement(String(tag))); },
  createTextNode(text) { return __wrap(__kiln.createText(text == null ? "" : String(text))); },
  querySelector(selector) { return __wrap(__kiln.querySelector(selector)); },
  get body() { return __wrap(__kiln.body()); },
  get documentElement() { return __wrap(__kiln.querySelector("html")); },
  addEventListener(type, handler) { const b = this.body; if (b) b.addEventListener(type, handler); },
  removeEventListener(type, handler) { const b = this.body; if (b) b.removeEventListener(type, handler); },
};

globalThis.__dispatch = (path, type, detail) => {
  let fired = false;
  let stopped = false;
  const event = {
    type,
    key: detail.key,
    button: detail.button,
    clientX: detail.clientX,
    clientY: detail.clientY,
    target: __wrap(path[0]),
    currentTarget: null,
    defaultPrevented: false,
    preventDefault() { this.defaultPrevented = true; },
    stopPropagation() { stopped = true; },
  };
  for (const id of path) {
    const handlers = __listeners.get(id + ":" + type);
    if (handlers && handlers.length) {
      event.currentTarget = __wrap(id);
      const node = event.currentTarget;
      for (const handler of handlers.slice()) {
        if (typeof handler === "function") { handler.call(node, event); }
        else if (handler && typeof handler.handleEvent === "function") { handler.handleEvent(event); }
        fired = true;
      }
    }
    if (stopped) break;
  }
  return fired;
};
"#;

pub struct Script {
    runtime: Runtime,
    context: Context,
}

impl Script {
    pub fn new(dom: Dom) -> Result<Self> {
        let runtime = Runtime::new().map_err(|e| anyhow!("create js runtime: {e}"))?;
        let context = Context::full(&runtime).map_err(|e| anyhow!("create js context: {e}"))?;

        context
            .with(|ctx| -> rquickjs::Result<()> {
                let kiln = Object::new(ctx.clone())?;

                let query_dom = dom.clone();
                kiln.set(
                    "querySelector",
                    Function::new(ctx.clone(), move |selector: String| {
                        query_dom.query_selector(&selector)
                    })?,
                )?;

                let get_dom = dom.clone();
                kiln.set(
                    "getText",
                    Function::new(ctx.clone(), move |id: usize| get_dom.text_content(id))?,
                )?;

                let set_dom = dom.clone();
                kiln.set(
                    "setText",
                    Function::new(ctx.clone(), move |id: usize, value: String| {
                        set_dom.set_text_content(id, &value);
                    })?,
                )?;

                macro_rules! bind {
                    ($name:literal, $d:ident, $f:expr) => {{
                        let $d = dom.clone();
                        kiln.set($name, Function::new(ctx.clone(), $f)?)?;
                    }};
                }

                bind!("createElement", d, move |tag: String| d.create_element(&tag));
                bind!("createText", d, move |text: String| d.create_text_node(&text));
                bind!("appendChild", d, move |parent: usize, child: usize| d
                    .append_child(parent, child));
                bind!("insertBefore", d, move |child: usize, reference: usize| d
                    .insert_before(child, reference));
                bind!("removeChild", d, move |child: usize| d.remove_child(child));
                bind!("setAttribute", d, move |id: usize, name: String, value: String| d
                    .set_attribute(id, &name, &value));
                bind!("removeAttribute", d, move |id: usize, name: String| d
                    .remove_attribute(id, &name));
                bind!("getAttribute", d, move |id: usize, name: String| d
                    .attribute(id, &name));
                bind!("setStyle", d, move |id: usize, name: String, value: String| d
                    .set_style_property(id, &name, &value));
                bind!("parent", d, move |id: usize| d.parent(id));
                bind!("nextSibling", d, move |id: usize| d.next_sibling(id));
                bind!("children", d, move |id: usize| d.children(id));
                bind!("tagName", d, move |id: usize| d.tag_name(id));
                bind!("isText", d, move |id: usize| d.is_text(id));
                bind!("body", d, move || d.body());

                kiln.set(
                    "log",
                    Function::new(ctx.clone(), |message: String| println!("{message}"))?,
                )?;

                ctx.globals().set("__kiln", kiln)?;
                ctx.eval::<(), _>(PRELUDE)?;
                Ok(())
            })
            .map_err(|e| anyhow!("install dom bindings: {e}"))?;

        let script = Self { runtime, context };
        script.drain();
        Ok(script)
    }

    pub fn drain(&self) {
        loop {
            match self.runtime.execute_pending_job() {
                Ok(true) => {}
                Ok(false) => break,
                Err(error) => {
                    eprintln!("unhandled job error: {error}");
                    break;
                }
            }
        }
    }

    pub fn eval(&self, source: &str) -> Result<()> {
        let result = self
            .context
            .with(|ctx| ctx.eval::<(), _>(source))
            .map_err(|e| anyhow!("{e}"))
            .context("evaluate script");
        self.drain();
        result
    }

    pub fn dispatch(&self, event: &crate::events::Dispatch) -> Result<bool> {
        let fired = self
            .context
            .with(|ctx| -> rquickjs::Result<bool> {
                let detail = Object::new(ctx.clone())?;
                detail.set("key", event.key.clone())?;
                detail.set("button", event.button)?;
                detail.set("clientX", event.client_x)?;
                detail.set("clientY", event.client_y)?;

                let dispatch: Function = ctx.globals().get("__dispatch")?;
                dispatch.call((event.chain.clone(), event.kind, detail))
            })
            .map_err(|e| anyhow!("{e}"))
            .context("dispatch event");

        self.drain();
        fired
    }
}

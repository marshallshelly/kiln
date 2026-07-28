use anyhow::{Context as _, Result, anyhow};
use rquickjs::{Context, Function, Object, Runtime};

use crate::dom::Dom;

const PRELUDE: &str = r##"
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
  get children() { return this.childNodes.filter((n) => n.nodeType === 1); }
  get firstElementChild() { const c = this.children; return c.length ? c[0] : null; }
  get lastElementChild() { const c = this.children; return c.length ? c[c.length - 1] : null; }
  insertAdjacentElement(position, element) {
    if (position === "beforebegin") { const p = this.parentNode; if (p) p.insertBefore(element, this); }
    else if (position === "afterbegin") { this.insertBefore(element, this.firstChild); }
    else if (position === "beforeend") { this.appendChild(element); }
    else if (position === "afterend") {
      const p = this.parentNode;
      if (p) p.insertBefore(element, this.nextSibling);
    }
    return element;
  }
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
  get ownerDocument() { return globalThis.document; }
  getRootNode() { return globalThis.document; }
  get previousSibling() {
    const parent = __kiln.parent(this.__id);
    if (parent === null) return null;
    const kids = __kiln.children(parent);
    const i = kids.indexOf(this.__id);
    return i > 0 ? __wrap(kids[i - 1]) : null;
  }
  get lastChild() {
    const kids = __kiln.children(this.__id);
    return kids.length ? __wrap(kids[kids.length - 1]) : null;
  }
  contains(other) {
    let node = other;
    while (node) { if (node.__id === this.__id) return true; node = node.parentNode; }
    return false;
  }
  dispatchEvent(event) {
    const path = [];
    let node = this;
    while (node) { path.push(node.__id); node = node.parentNode; }
    return __dispatch(path, event && event.type, event || {});
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
  get classList() {
    if (!this.__classList) { this.__classList = new __TokenList(this); }
    return this.__classList;
  }
  get tabIndex() { const v = __kiln.getAttribute(this.__id, "tabindex"); return v === null ? -1 : parseInt(v, 10); }
  set tabIndex(value) { this.setAttribute("tabindex", String(value)); }
  focus() { __kiln.focus(this.__id); }
  blur() { __kiln.focus(null); }
  matches(selector) { return __kiln.matches(this.__id, selector); }
  closest(selector) { let n = this; while (n && n.nodeType === 1) { if (n.matches(selector)) return n; n = n.parentNode; } return null; }
  querySelector(selector) { return __wrap(__kiln.querySelectorIn(this.__id, selector)); }
  querySelectorAll(selector) { return __kiln.querySelectorAllIn(this.__id, selector).map(__wrap); }
  getBoundingClientRect() {
    const r = __kiln.rect(this.__id);
    if (!r) return __emptyRect();
    return __rect(r[0], r[1], r[2], r[3]);
  }
  getClientRects() { return [this.getBoundingClientRect()]; }
  get offsetWidth() { const m = __kiln.boxMetrics(this.__id); return m ? m[0] : 0; }
  get offsetHeight() { const m = __kiln.boxMetrics(this.__id); return m ? m[1] : 0; }
  get clientWidth() { const m = __kiln.boxMetrics(this.__id); return m ? m[2] : 0; }
  get clientHeight() { const m = __kiln.boxMetrics(this.__id); return m ? m[3] : 0; }
  get scrollWidth() { const m = __kiln.boxMetrics(this.__id); return m ? m[4] : 0; }
  get scrollHeight() { const m = __kiln.boxMetrics(this.__id); return m ? m[5] : 0; }
  get scrollLeft() { const m = __kiln.boxMetrics(this.__id); return m ? m[6] : 0; }
  set scrollLeft(_v) {}
  get scrollTop() { const m = __kiln.boxMetrics(this.__id); return m ? m[7] : 0; }
  set scrollTop(_v) {}
  get offsetTop() { return this.getBoundingClientRect().top; }
  get offsetLeft() { return this.getBoundingClientRect().left; }
  get offsetParent() { return this.parentElement; }
  get shadowRoot() { return null; }
  get isContentEditable() { return false; }
  get style() {
    let proxy = __styles.get(this.__id);
    if (!proxy) { proxy = __makeStyle(this.__id); __styles.set(this.__id, proxy); }
    return proxy;
  }
}

function __rect(x, y, width, height) {
  return {
    x, y, left: x, top: y, width, height,
    right: x + width, bottom: y + height,
    toJSON() { return { x, y, left: x, top: y, width, height, right: x + width, bottom: y + height }; },
  };
}

function __emptyRect() { return __rect(0, 0, 0, 0); }

function __dashed(name) {
  return String(name).replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
}

const __inline = new Map();

function __declarations(id) {
  let decls = __inline.get(id);
  if (!decls) {
    decls = new Map();
    const existing = __kiln.getAttribute(id, "style");
    if (existing) {
      for (const part of existing.split(";")) {
        const i = part.indexOf(":");
        if (i > 0) decls.set(part.slice(0, i).trim(), part.slice(i + 1).trim());
      }
    }
    __inline.set(id, decls);
  }
  return decls;
}

function __cssText(id) {
  let out = "";
  for (const [name, value] of __declarations(id)) out += name + ": " + value + "; ";
  return out.trim();
}

function __setStyle(id, name, value) {
  const decls = __declarations(id);
  if (value === null || value === undefined || value === "") decls.delete(name);
  else decls.set(name, String(value));
  __kiln.setAttribute(id, "style", __cssText(id));
}

function __makeStyle(id) {
  return new Proxy({}, {
    get(_target, prop) {
      if (prop === "setProperty") return (name, value) => __setStyle(id, __dashed(name), value);
      if (prop === "removeProperty") return (name) => __setStyle(id, __dashed(name), "");
      if (prop === "getPropertyValue") return (name) => __declarations(id).get(__dashed(name)) || "";
      if (prop === "cssText") return __cssText(id);
      if (typeof prop !== "string") return undefined;
      return __declarations(id).get(__dashed(prop)) || "";
    },
    set(_target, prop, value) {
      if (prop === "cssText") {
        __inline.set(id, new Map());
        const decls = __declarations(id);
        for (const part of String(value == null ? "" : value).split(";")) {
          const i = part.indexOf(":");
          if (i > 0) decls.set(part.slice(0, i).trim(), part.slice(i + 1).trim());
        }
        __kiln.setAttribute(id, "style", __cssText(id));
        return true;
      }
      __setStyle(id, __dashed(prop), value);
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

class __TokenList {
  constructor(el) { this.__el = el; }
  get __items() { const c = this.__el.className; return c ? c.split(/\s+/).filter(Boolean) : []; }
  add(...names) { const s = new Set(this.__items); names.forEach((n) => s.add(n)); this.__el.className = [...s].join(" "); }
  remove(...names) { const s = new Set(this.__items); names.forEach((n) => s.delete(n)); this.__el.className = [...s].join(" "); }
  toggle(name, force) { const has = this.contains(name); const on = force === undefined ? !has : !!force; if (on) this.add(name); else this.remove(name); return on; }
  contains(name) { return this.__items.indexOf(name) >= 0; }
}

globalThis.Node = Node;
globalThis.Element = Element;
globalThis.Text = Text;
globalThis.HTMLElement = Element;
globalThis.SVGElement = Element;
globalThis.DocumentFragment = Element;
globalThis.HTMLDocument = Object;
globalThis.Document = Object;
globalThis.Window = Object;
globalThis.Comment = Text;
for (const name of [
  "HTMLInputElement", "HTMLTextAreaElement", "HTMLSelectElement", "HTMLOptionElement",
  "HTMLButtonElement", "HTMLFormElement", "HTMLAnchorElement", "HTMLImageElement",
  "HTMLIFrameElement", "HTMLCanvasElement", "HTMLDivElement", "HTMLSpanElement",
  "HTMLLabelElement", "HTMLTemplateElement", "HTMLStyleElement", "HTMLScriptElement",
]) {
  globalThis[name] = Element;
}

class KilnEvent {
  constructor(type, init) {
    this.type = type;
    this.bubbles = !!(init && init.bubbles);
    this.cancelable = !!(init && init.cancelable);
    this.defaultPrevented = false;
    if (init) Object.assign(this, init);
  }
  preventDefault() { this.defaultPrevented = true; }
  stopPropagation() {}
  stopImmediatePropagation() {}
  composedPath() { return []; }
}
globalThis.Event = KilnEvent;
globalThis.CustomEvent = KilnEvent;
globalThis.UIEvent = KilnEvent;
globalThis.MouseEvent = KilnEvent;
globalThis.PointerEvent = KilnEvent;
globalThis.KeyboardEvent = KilnEvent;
globalThis.FocusEvent = KilnEvent;
globalThis.InputEvent = KilnEvent;

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

Object.assign(globalThis.document, {
  querySelectorAll(selector) { return __kiln.querySelectorAllIn(null, selector).map(__wrap); },
  get activeElement() { return __wrap(__kiln.activeElement()); },
  getElementById(id) { return __wrap(__kiln.querySelector("#" + id)); },
  get ownerDocument() { return null; },
  getRootNode() { return globalThis.document; },
  get nodeType() { return 9; },
  contains(node) { return node != null; },
  createDocumentFragment() { return __wrap(__kiln.createElement("kiln-fragment")); },
  get children() { const el = __wrap(__kiln.querySelector("html")); return el ? el.children : []; },
  get firstChild() { return __wrap(__kiln.querySelector("html")); },
  get childNodes() { const el = __wrap(__kiln.querySelector("html")); return el ? [el] : []; },
  createComment() { return __wrap(__kiln.createText("")); },
  defaultView: globalThis,
});

globalThis.window = globalThis;
globalThis.self = globalThis;

const __windowListeners = new Map();
globalThis.addEventListener = (type, handler) => {
  const existing = __windowListeners.get(type);
  if (existing) existing.push(handler); else __windowListeners.set(type, [handler]);
};
globalThis.removeEventListener = (type, handler) => {
  const existing = __windowListeners.get(type);
  if (!existing) return;
  const i = existing.indexOf(handler);
  if (i >= 0) existing.splice(i, 1);
};
globalThis.dispatchEvent = (event) => {
  const handlers = __windowListeners.get(event && event.type);
  if (handlers) for (const h of handlers.slice()) h.call(globalThis, event);
  return true;
};
globalThis.navigator = { userAgent: "Kiln", platform: "Kiln", maxTouchPoints: 0, clipboard: {} };
globalThis.location = { href: "kiln://app", origin: "kiln://app", protocol: "kiln:" };
globalThis.matchMedia = (query) => ({
  matches: false, media: query, addEventListener() {}, removeEventListener() {},
  addListener() {}, removeListener() {},
});
globalThis.CSS = { supports: () => false, escape: (s) => String(s) };
globalThis.getComputedStyle = () => new Proxy({}, {
  get(_t, prop) {
    if (prop === "getPropertyValue") return () => "";
    return "";
  },
});
Object.defineProperty(globalThis, "innerWidth", { get: () => __kiln.viewportSize()[0] });
Object.defineProperty(globalThis, "innerHeight", { get: () => __kiln.viewportSize()[1] });
globalThis.devicePixelRatio = 1;
globalThis.visualViewport = null;

let __timerId = 0;
const __timers = new Map();
globalThis.setTimeout = (fn, delay, ...args) => {
  const id = ++__timerId;
  __timers.set(id, { fn, args, delay: delay || 0 });
  return id;
};
globalThis.clearTimeout = (id) => { __timers.delete(id); };
globalThis.setInterval = (fn, delay, ...args) => globalThis.setTimeout(fn, delay, ...args);
globalThis.clearInterval = (id) => globalThis.clearTimeout(id);
globalThis.queueMicrotask = (fn) => { Promise.resolve().then(fn); };
globalThis.__runTimers = () => {
  const pending = [...__timers.entries()].sort((a, b) => a[1].delay - b[1].delay);
  __timers.clear();
  for (const [, t] of pending) {
    try { t.fn(...t.args); } catch (e) { console.log("timer threw: " + (e && e.message ? e.message : e)); }
  }
  return pending.length;
};

let __rafId = 0;
const __rafQueue = new Map();
globalThis.requestAnimationFrame = (fn) => { const id = ++__rafId; __rafQueue.set(id, fn); return id; };
globalThis.cancelAnimationFrame = (id) => { __rafQueue.delete(id); };
globalThis.__runFrame = () => {
  const pending = [...__rafQueue.entries()];
  __rafQueue.clear();
  for (const [, fn] of pending) { fn(Date.now()); }
  return pending.length;
};

let __observerSeq = 0;
const __observers = new Map();

class ResizeObserver {
  constructor(callback) {
    this.__id = ++__observerSeq;
    __observers.set(this.__id, { callback, targets: new Map() });
  }
  observe(element) {
    const entry = __observers.get(this.__id);
    if (entry && element) entry.targets.set(element.__id, null);
  }
  unobserve(element) {
    const entry = __observers.get(this.__id);
    if (entry && element) entry.targets.delete(element.__id);
  }
  disconnect() { __observers.delete(this.__id); }
  takeRecords() { return []; }
}
globalThis.ResizeObserver = ResizeObserver;

globalThis.__runObservers = () => {
  let delivered = 0;
  for (const observer of [...__observers.values()]) {
    const entries = [];
    for (const [nodeId, previous] of observer.targets) {
      const m = __kiln.boxMetrics(nodeId);
      if (!m) continue;
      const width = m[2];
      const height = m[3];
      if (previous && previous.width === width && previous.height === height) continue;
      observer.targets.set(nodeId, { width, height });
      entries.push({
        target: __wrap(nodeId),
        contentRect: __rect(0, 0, width, height),
        borderBoxSize: [{ inlineSize: m[0], blockSize: m[1] }],
        contentBoxSize: [{ inlineSize: width, blockSize: height }],
        devicePixelContentBoxSize: [{ inlineSize: width, blockSize: height }],
      });
    }
    if (entries.length) {
      delivered += entries.length;
      observer.callback(entries, observer);
    }
  }
  return delivered;
};

class __InertObserver {
  constructor(callback) { this.__callback = callback; }
  observe() {} unobserve() {} disconnect() {} takeRecords() { return []; }
}
globalThis.MutationObserver = __InertObserver;
globalThis.IntersectionObserver = __InertObserver;

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
"##;

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
                bind!("querySelectorIn", d, move |root: Option<usize>, sel: String| d
                    .query_selector_all(root, &sel)
                    .first()
                    .copied());
                bind!("querySelectorAllIn", d, move |root: Option<usize>, sel: String| d
                    .query_selector_all(root, &sel));
                bind!("matches", d, move |id: usize, sel: String| d.matches(id, &sel));
                bind!("focus", d, move |id: Option<usize>| d.focus(id));
                bind!("activeElement", d, move || d.active_element());
                bind!("rect", d, move |id: usize| d.client_rect(id));
                bind!("boxMetrics", d, move |id: usize| d.box_metrics(id));
                bind!("viewportSize", d, move || d.viewport_size());

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

    fn drain_microtasks(&self) {
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

    fn run_timers(&self) -> usize {
        self.context
            .with(|ctx| -> rquickjs::Result<usize> {
                let run: Function = ctx.globals().get("__runTimers")?;
                run.call(())
            })
            .unwrap_or(0)
    }

    pub fn run_observers(&self) -> usize {
        let delivered = self
            .context
            .with(|ctx| -> rquickjs::Result<usize> {
                let run: Function = ctx.globals().get("__runObservers")?;
                run.call(())
            })
            .unwrap_or(0);
        if delivered > 0 {
            self.drain();
        }
        delivered
    }

    pub fn drain(&self) {
        for _ in 0..64 {
            self.drain_microtasks();
            if self.run_timers() == 0 {
                break;
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

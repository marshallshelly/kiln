use std::rc::Rc;

use anyhow::{Context as _, Result, anyhow};
use rquickjs::{Array, Context, Ctx, Function, Object, Runtime};

use crate::dom::Dom;
use crate::native::Native;

const PRELUDE: &str = r##"
const __show = (a) => {
  if (typeof a === "string") return a;
  // JSON.stringify(new Error("x")) is "{}", which is how a stack trace turns
  // into no information at all.
  if (a instanceof Error || (a && typeof a.message === "string" && typeof a.stack !== "undefined")) {
    return (a.name || "Error") + ": " + a.message + (a.stack ? "\n" + a.stack : "");
  }
  try { return JSON.stringify(a) ?? String(a); } catch (_) { return String(a); }
};

globalThis.console = {
  log: (...args) => __kiln.log(args.map(__show).join(" ")),
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
  get value() {
    const v = __kiln.getValue(this.__id);
    return v === null ? (__kiln.getAttribute(this.__id, "value") || "") : v;
  }
  set value(v) { __kiln.setValue(this.__id, v == null ? "" : String(v)); }
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
  get clientWidth() {
    if (this.localName === "html") return __kiln.viewportSize()[0];
    const m = __kiln.boxMetrics(this.__id); return m ? m[2] : 0;
  }
  get clientHeight() {
    if (this.localName === "html") return __kiln.viewportSize()[1];
    const m = __kiln.boxMetrics(this.__id); return m ? m[3] : 0;
  }
  get scrollWidth() { const m = __kiln.boxMetrics(this.__id); return m ? m[4] : 0; }
  get scrollHeight() { const m = __kiln.boxMetrics(this.__id); return m ? m[5] : 0; }
  get clientLeft() { const m = __kiln.boxMetrics(this.__id); return m ? m[8] : 0; }
  get clientTop() { const m = __kiln.boxMetrics(this.__id); return m ? m[9] : 0; }
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
  addEventListener(type, handler) {
    const key = "document:" + type;
    const existing = __listeners.get(key);
    if (existing) existing.push(handler); else __listeners.set(key, [handler]);
  },
  removeEventListener(type, handler) {
    const existing = __listeners.get("document:" + type);
    if (!existing) return;
    const index = existing.indexOf(handler);
    if (index >= 0) existing.splice(index, 1);
  },
  createTreeWalker(root, whatToShow, filter) {
    return new __TreeWalker(root || this.documentElement, whatToShow, filter);
  },
  createTreeWalker(root, whatToShow, filter) {
    return new __TreeWalker(root || this.documentElement, whatToShow, filter);
  },
  dispatchEvent(event) {
    const type = event && event.type;
    if (!type) return true;
    __fireDocument(type, event);
    return !event.defaultPrevented;
  },
};

Object.defineProperties(globalThis.document, Object.getOwnPropertyDescriptors({
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
}));

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
const __computedDefaults = {
  transform: "none",
  perspective: "none",
  filter: "none",
  "backdrop-filter": "none",
  "will-change": "auto",
  contain: "none",
  "container-type": "normal",
  translate: "none",
  rotate: "none",
  scale: "none",
  "content-visibility": "visible",
  display: "block",
  float: "none",
  "z-index": "auto",
  top: "auto",
  left: "auto",
  right: "auto",
  bottom: "auto",
};

globalThis.getComputedStyle = (element) => {
  const id = element && element.__id;
  const values = new Map();
  if (id !== undefined && id !== null) {
    const flat = __kiln.computedStyle(id);
    for (let i = 0; i + 1 < flat.length; i += 2) values.set(flat[i], flat[i + 1]);
  }
  const inline = id === undefined || id === null ? new Map() : __declarations(id);

  const lookup = (name) => {
    const key = __dashed(name);
    if (key === "overflow") return values.get("overflow-x") || "visible";
    const own = values.get(key);
    if (own !== undefined) return own;
    const declared = inline.get(key);
    if (declared !== undefined) return declared;
    const fallback = __computedDefaults[key];
    return fallback === undefined ? "" : fallback;
  };

  return new Proxy({}, {
    get(_target, prop) {
      if (prop === "getPropertyValue") return (name) => lookup(name);
      if (prop === "getPropertyPriority") return () => "";
      if (prop === "length") return values.size;
      if (typeof prop !== "string") return undefined;
      return lookup(prop);
    },
    has(_target, prop) { return typeof prop === "string"; },
  });
};
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

let __intersectionSeq = 0;
const __intersectionObservers = new Map();

const __parseRootMargin = (raw) => {
  const [top, right = top, bottom = top, left = right] =
    String(raw == null ? "0px" : raw).trim().split(/\s+/);
  return [top, right, bottom, left].map((side) => ({
    amount: parseFloat(side) || 0,
    percent: String(side).includes("%"),
  }));
};

const __normaliseThresholds = (raw) => {
  const list = (Array.isArray(raw) ? raw : [raw == null ? 0 : raw])
    .map(Number)
    .filter((value) => value >= 0 && value <= 1);
  return (list.length ? list : [0]).sort((a, b) => a - b);
};

const __rootBounds = (rootId, margin) => {
  let base;
  if (rootId == null) {
    const viewport = __kiln.viewportSize();
    base = { x: 0, y: 0, width: viewport[0], height: viewport[1] };
  } else {
    const r = __kiln.rect(rootId);
    if (!r) return null;
    base = { x: r[0], y: r[1], width: r[2], height: r[3] };
  }
  const resolve = (side, extent) => side.percent ? (side.amount / 100) * extent : side.amount;
  const top = resolve(margin[0], base.height);
  const right = resolve(margin[1], base.width);
  const bottom = resolve(margin[2], base.height);
  const left = resolve(margin[3], base.width);
  return {
    x: base.x - left,
    y: base.y - top,
    width: base.width + left + right,
    height: base.height + top + bottom,
  };
};

const __overlap = (a, b) => {
  const left = Math.max(a.x, b.x);
  const top = Math.max(a.y, b.y);
  const right = Math.min(a.x + a.width, b.x + b.width);
  const bottom = Math.min(a.y + a.height, b.y + b.height);
  if (right <= left || bottom <= top) return null;
  return { x: left, y: top, width: right - left, height: bottom - top };
};

const __thresholdIndex = (thresholds, ratio, intersecting) => {
  if (!intersecting) return 0;
  let index = 0;
  while (index < thresholds.length && ratio >= thresholds[index]) index += 1;
  return index;
};

class IntersectionObserver {
  constructor(callback, options) {
    const o = options || {};
    this.__id = ++__intersectionSeq;
    this.root = o.root || null;
    this.rootMargin = o.rootMargin == null ? "0px" : String(o.rootMargin);
    this.thresholds = __normaliseThresholds(o.threshold);
    this.__queue = [];
    __intersectionObservers.set(this.__id, {
      callback,
      observer: this,
      margin: __parseRootMargin(this.rootMargin),
      rootId: this.root ? this.root.__id : null,
      targets: new Map(),
    });
  }
  observe(target) {
    const entry = __intersectionObservers.get(this.__id);
    if (entry && target) entry.targets.set(target.__id, -1);
  }
  unobserve(target) {
    const entry = __intersectionObservers.get(this.__id);
    if (entry && target) entry.targets.delete(target.__id);
  }
  disconnect() {
    const entry = __intersectionObservers.get(this.__id);
    if (entry) entry.targets.clear();
    this.__queue = [];
  }
  takeRecords() { const queued = this.__queue; this.__queue = []; return queued; }
}
globalThis.IntersectionObserver = IntersectionObserver;

globalThis.__runIntersections = () => {
  let delivered = 0;
  for (const entry of [...__intersectionObservers.values()]) {
    const root = __rootBounds(entry.rootId, entry.margin);
    if (!root) continue;
    const entries = [];

    for (const [nodeId, previous] of entry.targets) {
      const r = __kiln.rect(nodeId);
      if (!r) continue;
      const box = { x: r[0], y: r[1], width: r[2], height: r[3] };
      const area = box.width * box.height;
      const overlap = __overlap(box, root);
      const ratio = overlap && area > 0 ? (overlap.width * overlap.height) / area : 0;
      const intersecting = overlap !== null;
      const index = __thresholdIndex(entry.observer.thresholds, ratio, intersecting);
      if (index === previous) continue;

      entry.targets.set(nodeId, index);
      entries.push({
        target: __wrap(nodeId),
        time: Date.now(),
        isIntersecting: intersecting,
        intersectionRatio: ratio,
        boundingClientRect: __rect(box.x, box.y, box.width, box.height),
        intersectionRect: overlap
          ? __rect(overlap.x, overlap.y, overlap.width, overlap.height)
          : __emptyRect(),
        rootBounds: __rect(root.x, root.y, root.width, root.height),
      });
    }

    if (entries.length) {
      delivered += entries.length;
      entry.observer.__queue = [];
      entry.callback(entries, entry.observer);
    }
  }
  return delivered;
};

globalThis.__runObservers = () => {
  let delivered = __runIntersections();
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

let __mutationSeq = 0;
let __mutationCursor = 0;
const __mutationObservers = new Map();

const __isAncestorOf = (ancestor, node) => {
  let current = __kiln.parent(node);
  while (current !== null && current !== undefined) {
    if (current === ancestor) return true;
    current = __kiln.parent(current);
  }
  return false;
};

const __scoped = (spec, target) =>
  spec.id === target || (spec.subtree && __isAncestorOf(spec.id, target));

const __wants = (spec, record) => {
  if (record.type === "childList") return spec.childList && __scoped(spec, record.target);
  if (record.type === "characterData") return spec.characterData && __scoped(spec, record.target);
  if (!spec.attributes) return false;
  if (spec.attributeFilter && !spec.attributeFilter.includes(record.attributeName)) return false;
  return __scoped(spec, record.target);
};

const __mutationRecord = (spec, record) => {
  const keepOld = record.type === "attributes"
    ? spec.attributeOldValue
    : record.type === "characterData" && spec.characterDataOldValue;
  return {
    type: record.type,
    target: __wrap(record.target),
    addedNodes: (record.addedNodes || []).map(__wrap),
    removedNodes: (record.removedNodes || []).map(__wrap),
    previousSibling: record.previousSibling == null ? null : __wrap(record.previousSibling),
    nextSibling: record.nextSibling == null ? null : __wrap(record.nextSibling),
    attributeName: record.attributeName == null ? null : record.attributeName,
    attributeNamespace: null,
    oldValue: keepOld && record.oldValue != null ? record.oldValue : null,
  };
};

class MutationObserver {
  constructor(callback) {
    this.__id = ++__mutationSeq;
    this.__queue = [];
    __mutationObservers.set(this.__id, { callback, observer: this, specs: [] });
  }
  observe(target, options) {
    const entry = __mutationObservers.get(this.__id);
    if (!entry || !target) return;
    const o = options || {};
    entry.specs.push({
      id: target.__id,
      childList: !!o.childList,
      attributes: o.attributes === undefined
        ? !!(o.attributeFilter || o.attributeOldValue)
        : !!o.attributes,
      characterData: o.characterData === undefined
        ? !!o.characterDataOldValue
        : !!o.characterData,
      subtree: !!o.subtree,
      attributeOldValue: !!o.attributeOldValue,
      characterDataOldValue: !!o.characterDataOldValue,
      attributeFilter: o.attributeFilter || null,
    });
  }
  disconnect() {
    const entry = __mutationObservers.get(this.__id);
    if (entry) entry.specs = [];
    this.__queue = [];
  }
  takeRecords() { const queued = this.__queue; this.__queue = []; return queued; }
}
globalThis.MutationObserver = MutationObserver;

globalThis.__deliverMutations = () => {
  const taken = __kiln.takeMutations(__mutationCursor);
  __mutationCursor = taken.cursor;
  __kiln.retainMutationsFrom(__mutationCursor);

  for (const entry of __mutationObservers.values()) {
    for (const record of taken.records) {
      const spec = entry.specs.find((candidate) => __wants(candidate, record));
      if (spec) entry.observer.__queue.push(__mutationRecord(spec, record));
    }
  }

  let delivered = 0;
  for (const entry of [...__mutationObservers.values()]) {
    if (!entry.observer.__queue.length) continue;
    const queued = entry.observer.takeRecords();
    delivered += queued.length;
    entry.callback(queued, entry.observer);
  }
  return delivered;
};


const __flattenMenu = (items, depth, out) => {
  for (const item of items || []) {
    const separator = item === "-" || item.type === "separator";
    const label = separator ? "-" : String(item.label == null ? "" : item.label);
    out.push(
      String(depth),
      String(item.id == null ? "" : item.id),
      label,
      String(item.accelerator == null ? "" : item.accelerator),
      item.enabled === false ? "0" : "1",
    );
    if (item.items) __flattenMenu(item.items, depth + 1, out);
  }
  return out;
};

const __menuHandlers = new Map();
globalThis.__menuActivated = (id) => {
  const handler = __menuHandlers.get(id);
  if (handler) handler(id);
};

globalThis.kiln = {
  menu: {
    set(items) {
      __menuHandlers.clear();
      const collect = (list) => {
        for (const item of list || []) {
          if (item && item.id && typeof item.click === "function") {
            __menuHandlers.set(String(item.id), item.click);
          }
          if (item && item.items) collect(item.items);
        }
      };
      collect(items);
      __kiln.setMenu(__flattenMenu(items, 0, []));
    },
  },
  tray: {
    set(options) {
      const items = (options && options.items) || [];
      const collect = (list) => {
        for (const item of list || []) {
          if (item && item.id && typeof item.click === "function") {
            __menuHandlers.set(String(item.id), item.click);
          }
          if (item && item.items) collect(item.items);
        }
      };
      collect(items);
      __kiln.setTray(String((options && options.tooltip) || ""), __flattenMenu(items, 0, []));
    },
  },
  clipboard: {
    readText() { return __kiln.clipboardRead(); },
    writeText(value) { return __kiln.clipboardWrite(value == null ? "" : String(value)); },
  },
  dialog: {
    open(options) { return __kiln.openFile(!!(options && options.multiple)); },
    save(options) { return __kiln.saveFile(String((options && options.defaultName) || "")); },
    message(title, body) { __kiln.messageBox(String(title || ""), String(body || "")); },
  },
  notify(title, body) { return __kiln.notify(String(title || ""), String(body || "")); },
};

globalThis.NodeFilter = {
  SHOW_ALL: 0xffffffff,
  SHOW_ELEMENT: 1,
  SHOW_TEXT: 4,
  FILTER_ACCEPT: 1,
  FILTER_REJECT: 2,
  FILTER_SKIP: 3,
};

/// Focus traps walk the tree looking for tabbable elements, so this only needs
/// to be faithful in document order, not lazy.
class __TreeWalker {
  constructor(root, whatToShow, filter) {
    this.root = root;
    this.currentNode = root;
    this.__queue = [];

    const wantsElements = !whatToShow || (whatToShow & NodeFilter.SHOW_ELEMENT) !== 0;
    const wantsText = (whatToShow & NodeFilter.SHOW_TEXT) !== 0;

    const visit = (node) => {
      for (const child of node.childNodes) {
        const isText = child.nodeType === 3;
        if ((isText && wantsText) || (!isText && wantsElements)) {
          let verdict = NodeFilter.FILTER_ACCEPT;
          if (typeof filter === "function") verdict = filter(child);
          else if (filter && typeof filter.acceptNode === "function") verdict = filter.acceptNode(child);

          if (verdict === NodeFilter.FILTER_REJECT) continue;
          if (verdict !== NodeFilter.FILTER_SKIP) this.__queue.push(child);
        }
        if (!isText) visit(child);
      }
    };
    visit(root);
  }

  nextNode() {
    const next = this.__queue.shift();
    this.currentNode = next || this.currentNode;
    return next || null;
  }

  firstChild() { return this.nextNode(); }
}
globalThis.TreeWalker = __TreeWalker;

globalThis.__fireDocument = (type, event) => {
  const handlers = __listeners.get("document:" + type);
  if (!handlers || !handlers.length) return false;
  if (event && event.currentTarget === undefined) event.currentTarget = globalThis.document;
  for (const handler of handlers.slice()) {
    if (typeof handler === "function") handler.call(globalThis.document, event);
    else if (handler && typeof handler.handleEvent === "function") handler.handleEvent(event);
  }
  return true;
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
  if (!stopped && __fireDocument(type, event)) fired = true;
  return fired;
};
"##;

pub struct Script {
    runtime: Runtime,
    context: Context,
}

fn take_mutations<'js>(ctx: Ctx<'js>, dom: &Dom, cursor: u64) -> rquickjs::Result<Object<'js>> {
    use crate::dom::Mutation;

    let journal = dom.journal().borrow();
    let records = Array::new(ctx.clone())?;

    for (index, record) in journal.since(cursor).enumerate() {
        let entry = Object::new(ctx.clone())?;
        match &record.mutation {
            Mutation::ChildList {
                parent,
                added,
                removed,
                previous_sibling,
                next_sibling,
            } => {
                entry.set("type", "childList")?;
                entry.set("target", *parent)?;
                entry.set("addedNodes", added.clone())?;
                entry.set("removedNodes", removed.clone())?;
                entry.set("previousSibling", *previous_sibling)?;
                entry.set("nextSibling", *next_sibling)?;
            }
            Mutation::Attribute {
                target,
                name,
                old_value,
            } => {
                entry.set("type", "attributes")?;
                entry.set("target", *target)?;
                entry.set("attributeName", name.clone())?;
                entry.set("oldValue", old_value.clone())?;
            }
            Mutation::CharacterData { target, old_value } => {
                entry.set("type", "characterData")?;
                entry.set("target", *target)?;
                entry.set("oldValue", old_value.clone())?;
            }
        }
        records.set(index, entry)?;
    }

    let result = Object::new(ctx)?;
    result.set("cursor", journal.next_seq())?;
    result.set("records", records)?;
    Ok(result)
}

fn bind_journal<'js>(ctx: &Ctx<'js>, kiln: &Object<'js>, dom: Dom) -> rquickjs::Result<()> {
    let take = dom.clone();
    kiln.set(
        "takeMutations",
        Function::new(ctx.clone(), move |ctx: Ctx<'js>, cursor: u64| {
            take_mutations(ctx, &take, cursor)
        })?,
    )?;
    let consumer = dom.journal().borrow_mut().register();
    kiln.set(
        "retainMutationsFrom",
        Function::new(ctx.clone(), move |seq: u64| {
            dom.journal().borrow_mut().advance(consumer, seq);
        })?,
    )?;
    Ok(())
}

impl Script {
    pub fn new(dom: Dom, native: Rc<Native>) -> Result<Self> {
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

                bind!("createElement", d, move |tag: String| d
                    .create_element(&tag));
                bind!("createText", d, move |text: String| d
                    .create_text_node(&text));
                bind!("appendChild", d, move |parent: usize, child: usize| d
                    .append_child(parent, child));
                bind!("insertBefore", d, move |child: usize, reference: usize| d
                    .insert_before(child, reference));
                bind!("removeChild", d, move |child: usize| d.remove_child(child));
                bind!(
                    "setAttribute",
                    d,
                    move |id: usize, name: String, value: String| d
                        .set_attribute(id, &name, &value)
                );
                bind!("removeAttribute", d, move |id: usize, name: String| d
                    .remove_attribute(id, &name));
                bind!("getAttribute", d, move |id: usize, name: String| d
                    .attribute(id, &name));
                bind!(
                    "setStyle",
                    d,
                    move |id: usize, name: String, value: String| d
                        .set_style_property(id, &name, &value)
                );
                bind!("parent", d, move |id: usize| d.parent(id));
                bind!("nextSibling", d, move |id: usize| d.next_sibling(id));
                bind!("children", d, move |id: usize| d.children(id));
                bind!("tagName", d, move |id: usize| d.tag_name(id));
                bind!("isText", d, move |id: usize| d.is_text(id));
                bind!("body", d, move || d.body());
                bind!(
                    "querySelectorIn",
                    d,
                    move |root: Option<usize>, sel: String| d
                        .query_selector_all(root, &sel)
                        .first()
                        .copied()
                );
                bind!(
                    "querySelectorAllIn",
                    d,
                    move |root: Option<usize>, sel: String| d.query_selector_all(root, &sel)
                );
                bind!("matches", d, move |id: usize, sel: String| d
                    .matches(id, &sel));
                bind!("focus", d, move |id: Option<usize>| d.focus(id));
                bind!("activeElement", d, move || d.active_element());
                bind!("getValue", d, move |id: usize| d.value(id));

                let menu_native = Rc::clone(&native);
                kiln.set(
                    "setMenu",
                    Function::new(ctx.clone(), move |flat: Vec<String>| {
                        menu_native.set_menu(&flat);
                    })?,
                )?;

                let tray_native = Rc::clone(&native);
                kiln.set(
                    "setTray",
                    Function::new(ctx.clone(), move |tooltip: String, flat: Vec<String>| {
                        tray_native.set_tray(&tooltip, &flat);
                    })?,
                )?;

                let clip_read = Rc::clone(&native);
                kiln.set(
                    "clipboardRead",
                    Function::new(ctx.clone(), move || clip_read.read_text())?,
                )?;

                let clip_write = Rc::clone(&native);
                kiln.set(
                    "clipboardWrite",
                    Function::new(ctx.clone(), move |value: String| {
                        clip_write.write_text(&value).is_ok()
                    })?,
                )?;

                let notify_native = Rc::clone(&native);
                kiln.set(
                    "notify",
                    Function::new(ctx.clone(), move |title: String, body: String| {
                        notify_native.notify(&title, &body).is_ok()
                    })?,
                )?;

                let open_native = Rc::clone(&native);
                kiln.set(
                    "openFile",
                    Function::new(ctx.clone(), move |multiple: bool| {
                        open_native.open_file(multiple)
                    })?,
                )?;

                let save_native = Rc::clone(&native);
                kiln.set(
                    "saveFile",
                    Function::new(ctx.clone(), move |suggested: String| {
                        save_native.save_file(&suggested)
                    })?,
                )?;

                let message_native = Rc::clone(&native);
                kiln.set(
                    "messageBox",
                    Function::new(ctx.clone(), move |title: String, body: String| {
                        message_native.message(&title, &body);
                    })?,
                )?;
                bind!("setValue", d, move |id: usize, v: String| d
                    .set_value(id, &v));
                bind!("rect", d, move |id: usize| d.client_rect(id));
                bind!("boxMetrics", d, move |id: usize| d.box_metrics(id));
                bind!("viewportSize", d, move || d.viewport_size());
                bind!("computedStyle", d, move |id: usize| d.computed_style(id));

                bind_journal(&ctx, &kiln, dom.clone())?;

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

    fn deliver_mutations(&self) -> usize {
        self.context
            .with(|ctx| -> rquickjs::Result<usize> {
                let deliver: Function = ctx.globals().get("__deliverMutations")?;
                deliver.call(())
            })
            .unwrap_or(0)
    }

    pub fn evaluate(&self, expression: &str) -> Result<String> {
        let value = self
            .context
            .with(|ctx| -> rquickjs::Result<String> {
                let value: rquickjs::Value = ctx.eval(expression)?;
                if value.is_undefined() {
                    return Ok("undefined".to_string());
                }
                if value.is_null() {
                    return Ok("null".to_string());
                }
                let stringify: Function = ctx
                    .globals()
                    .get::<_, Object>("JSON")
                    .and_then(|json| json.get("stringify"))?;
                match stringify.call::<_, Option<String>>((value.clone(),)) {
                    Ok(Some(text)) => Ok(text),
                    _ => Ok(format!("{value:?}")),
                }
            })
            .map_err(|e| anyhow!("evaluate: {e}"))?;
        self.drain();
        Ok(value)
    }

    pub fn dispatch_menu(&self, id: &str) -> Result<()> {
        self.context
            .with(|ctx| -> rquickjs::Result<()> {
                let run: Function = ctx.globals().get("__menuActivated")?;
                run.call((id.to_string(),))
            })
            .map_err(|e| anyhow!("dispatch menu {id}: {e}"))?;
        self.drain();
        Ok(())
    }

    pub fn drain(&self) {
        for _ in 0..64 {
            let delivered = self.deliver_mutations();
            self.drain_microtasks();
            if self.run_timers() == 0 && delivered == 0 {
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

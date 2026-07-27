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

class Element {
  constructor(id) { this.__id = id; }
  get textContent() { return __kiln.getText(this.__id); }
  set textContent(value) { __kiln.setText(this.__id, String(value)); }
  addEventListener(type, handler) {
    const key = this.__id + ":" + type;
    const existing = __listeners.get(key);
    if (existing) { existing.push(handler); } else { __listeners.set(key, [handler]); }
  }
}

globalThis.document = {
  querySelector(selector) {
    const id = __kiln.querySelector(selector);
    return id === null ? null : new Element(id);
  },
};

globalThis.__dispatch = (path, type) => {
  let fired = false;
  for (const id of path) {
    const handlers = __listeners.get(id + ":" + type);
    if (!handlers) continue;
    for (const handler of handlers) { handler(); fired = true; }
  }
  return fired;
};
"#;

pub struct Script {
    _runtime: Runtime,
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

                kiln.set(
                    "log",
                    Function::new(ctx.clone(), |message: String| println!("{message}"))?,
                )?;

                ctx.globals().set("__kiln", kiln)?;
                ctx.eval::<(), _>(PRELUDE)?;
                Ok(())
            })
            .map_err(|e| anyhow!("install dom bindings: {e}"))?;

        Ok(Self {
            _runtime: runtime,
            context,
        })
    }

    pub fn eval(&self, source: &str) -> Result<()> {
        self.context
            .with(|ctx| ctx.eval::<(), _>(source))
            .map_err(|e| anyhow!("{e}"))
            .context("evaluate script")
    }

    pub fn dispatch(&self, path: &[usize], event: &str) -> Result<bool> {
        self.context
            .with(|ctx| -> rquickjs::Result<bool> {
                let dispatch: Function = ctx.globals().get("__dispatch")?;
                dispatch.call((path.to_vec(), event))
            })
            .map_err(|e| anyhow!("{e}"))
            .context("dispatch event")
    }
}

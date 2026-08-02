<p align="center">
  <img src="assets/logo/kiln-mark-masthead.svg" width="150" alt="Kiln">
</p>

<h1 align="center">Kiln</h1>

<p align="center">
  <em>Your HTML. Your CSS. No browser.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/marshallshelly/kiln?style=flat-square&color=0B1226&label=stars" alt="Stars">
  <img src="https://img.shields.io/badge/status-M0--M10-F5A93C?style=flat-square" alt="Status: M0 to M10">
  <img src="https://github.com/marshallshelly/kiln/actions/workflows/ci.yml/badge.svg" alt="CI">
  <img src="https://img.shields.io/badge/built%20with-Rust-0B1226?style=flat-square" alt="Built with Rust">
  <img src="https://img.shields.io/badge/license-Apache--2.0-0B1226?style=flat-square" alt="Apache-2.0 license">
</p>

<p align="center">
  <strong>Native desktop apps from real HTML, CSS, and TypeScript &middot; rendered by our own engine &middot; no Chromium, no WebView</strong><br>
  <sub>TypeScript is compiled by your own toolchain — Kiln runs the JavaScript that comes out, and <a href="#a-real-vite-build-runs">an unmodified Vite build works</a>.</sub><br>
  <sub><strong>This is early.</strong> An unmodified Vite React build renders, responds to clicks and hot-swaps its CSS. The CSS surface is partial, code signing is unverified, and runtime self-update is out of scope. Read <a href="#status">Status</a> before you get excited.</sub>
</p>

---

Electron ships an entire browser so you can render a settings page. Tauri borrows the OS WebView, so your app looks different on every machine and you don't control the engine. Both are reasonable trades.

Kiln makes a different one: we render it ourselves.

Your HTML gets parsed by a real HTML parser. Your CSS is resolved by Firefox's cascade engine. Your text is shaped by the same stack Firefox shapes text with. Then it's drawn on the GPU into a real OS window — with real menus, a real tray, and real accessibility — and none of it needs a browser to be there.

<p align="center">
  <img src="assets/hero.png" width="620" alt="An application window lifted out of a small kiln">
</p>

## Status

Honesty is the product, so here is the unflattering version.

| Milestone | | |
|---|---|---|
| **M0** | ✅ | winit window + wgpu, one rounded rectangle from a hardcoded struct |
| **M1** | ✅ | HTML + CSS renders — cascade, flexbox, gradients, text — in a window and headless |
| **M2** | ✅ | Parley text: ligatures, RTL, Devanagari, CJK, Thai line breaking, bidi, colour emoji |
| **M3** | ✅ | QuickJS + DOM bridge + events — **a counter app works**; hover, checkbox, details and focus come from the engine |
| **M4** | ✅ | transitions, `@keyframes`, custom properties, `@media` — driven by a real animation clock |
| **M5** | ✅ | scrolling, focus, keyboard nav, text input — IME wired but unverified |
| **M6** | ✅ | accessibility tree, native menus, tray, clipboard, dialogs, notifications |
| **M7** | ✅ | `init`, `dev` with CSS hot-swap and reload on save, `check`, `build`, DevTools over CDP |
| **M8** | ✅ | **Preact runs unmodified. Tailwind works.** |
| **M9** | ◐ | `.app`/`.dmg`, `.deb` and `.msi` all build and install; signing and notarization are implemented but **unverified** — they need a Developer ID |
| **M10** | ✅ | automation over CDP including screenshots, record/replay as a determinism oracle |

M3 is when this becomes demonstrable. M8 is when you could port something real. **ES modules landed after M10**, which is when an off-the-shelf Vite build started working.

### The numbers

Measured rather than estimated, with [`bench/run.sh`](bench/run.sh) in this repo. Apple M3 Pro, macOS, release build.

```
  binary, as built                   32.9 MB
  binary, stripped                   26.9 MB
  peak RSS, check (no GPU)           26.6 MB
  peak RSS, headless render          56.0 MB
  headless render, best of 5          114 ms
  window, first paint (warm)        175.1 ms
  window, idle RSS                  117.2 MB
```

**Two of the three targets are missed, and by a lot.** PLAN.md said this approach should mean "the binary is 20 MB instead of 200, boots in 15 ms instead of 900, and idles at 30 MB of RSS instead of 400."

| | target | actual | |
|---|---|---|---|
| binary | 20 MB | 26.9 MB stripped | close |
| first paint | 15 ms | 175 ms | **12× over** |
| idle RSS | 30 MB | 117 MB | **4× over** |

The size target is roughly met, and the trajectory is documented: 25.1 MB before Thai line breaking, 28.8 MB after, 30.0 MB after the native surfaces, 32.9 MB now. Every increase was a named feature.

The other two are the GPU stack, and the split says so. `kiln check` parses, cascades and lays out with no renderer at all: **26.6 MB**. Adding wgpu and Vello for a headless render takes it to **56.0 MB**. A real window with a swapchain reaches **117 MB**. So roughly a quarter of resident memory is the engine this project actually writes, and the rest is the renderer it assembles.

**The first launch is far worse than the steady state, and the cause is now known.** It is Vello's shaders being compiled for the GPU and cached by the OS. Move macOS's Metal shader cache aside and the next launch takes **1949 ms**; the one straight after it, with the cache repopulated, takes **233 ms**. That is the whole gap.

It also explains the odd part: a freshly *copied* binary was slow once and then fast, because the cache is system-wide rather than per-binary. A rebuild does not reproduce it either. So the cost is paid once per machine, by whichever Vello application runs first — not once per install of your app.

Nothing in `src/` can fix that, but the shape of a fix is narrower than it first looked. Vello already accepts a `pipeline_cache`; `anyrender_vello` hardcodes it to `None` and offers no way to set one, so no consumer can opt in — filed as [anyrender#72](https://github.com/DioxusLabs/anyrender/issues/72).

That would not help here, though. `wgpu-hal`'s Metal `create_pipeline_cache` is a unit-struct stub, as are DX12 and GLES; only Vulkan builds a real one. macOS gets its speedup from the OS cache instead, which is exactly why the second launch is already fast. So the win is Linux, and on macOS the 1.9 seconds is a cost paid once per machine by whichever Vello app runs first.

None of this is compared against Electron or Tauri, because nothing here runs them. Treat it as a floor to improve on and a regression check, not as a competitive claim.

## Getting started

There is no published crate yet, so install from the repository:

```console
$ cargo install --git https://github.com/marshallshelly/kiln
```

Or build it locally, which is what you want if you plan to change anything:

```console
$ git clone https://github.com/marshallshelly/kiln
$ cd kiln
$ cargo build --release        # target/release/kiln
```

On Linux you also need GTK, `libxdo` and appindicator for the native menu, tray
and dialog surfaces, plus X11 and Wayland headers for the window. macOS and
Windows need nothing beyond a recent Rust toolchain.

Then scaffold something and open it:

```console
$ kiln init my-app
$ kiln dev  my-app/index.html
```

`kiln init` writes a working counter that is already inside the CSS subset, and
`kiln dev` opens it in a real window and watches it — a CSS edit swaps the
stylesheet without losing state, and a JS edit reloads.

**Bringing an existing app.** If it builds to static HTML, CSS and JavaScript,
point Kiln at the output. For a Vite project that means one flag:

```console
$ vite build --base ./          # relative asset paths, not /assets/…
$ kiln check dist/index.html    # what CSS Kiln cannot honour, before you debug it
$ kiln dev   dist/index.html
```

Run `kiln check` first. It is faster than discovering the gaps by looking at
wrong pixels, and it is the difference between an incomplete engine and an
illegible one.

## Why not just use a WebView

|  | Electron | Tauri | Kiln |
|---|---|---|---|
| Author in HTML/CSS/TS | yes | yes | yes |
| Ships a browser | Chromium | borrows the OS WebView | **no** |
| Identical rendering on every OS | yes | **no** | yes — [layout and text metrics asserted on all three platforms](#building) |
| You control the engine | no | no | **yes** |
| Full CSS support | yes | yes | **no — see [The subset](#the-subset)** |
| Production ready | yes | yes | **no — see [Status](#status)** |

<p align="center">
  <img src="assets/comparison.png" width="620" alt="An oversized shipping crate beside a small glowing cube">
</p>

The last two rows are on purpose. Tauri is the right answer whenever the host WebView is acceptable to you; the overlap is real and worth saying out loud. Kiln is for when it isn't — when rendering has to be identical everywhere, when you need the engine to be something you can reason about, or when 40 MB of resident memory before the first paint is too much.

## Assemble, don't build

The load-bearing decision in this project is what it *doesn't* write.

<p align="center">
  <img src="assets/stack.png" width="420" alt="An exploded stack of engine layers">
</p>

| Layer | Crate | Why |
|---|---|---|
| CSS | [Stylo](https://github.com/servo/stylo) | Firefox's actual cascade engine. Real selector matching, real invalidation, real custom properties. |
| Layout | [Taffy](https://github.com/DioxusLabs/taffy) | Flexbox, CSS Grid, block, absolute. |
| Text | [Parley](https://github.com/linebender/parley) | Shaping, bidi, line breaking, font fallback. The subsystem that kills projects like this one. |
| Paint | [Vello](https://github.com/linebender/vello) + [wgpu](https://github.com/gfx-rs/wgpu) | GPU compute rasterizer. Metal, D3D12, Vulkan from one backend. |
| Window | [winit](https://github.com/rust-windowing/winit) | Events, IME, HiDPI, multi-monitor. |
| Accessibility | [AccessKit](https://github.com/AccessKit/accesskit) | UIAutomation, AT-SPI, NSAccessibility. |
| HTML | [html5ever](https://github.com/servo/html5ever) | Servo's spec-compliant parser. |
| Script | [QuickJS-ng](https://github.com/quickjs-ng/quickjs) | ~620 KB, ES2023, bytecode precompilation. |

Most of the first seven are already assembled by [Blitz](https://github.com/DioxusLabs/blitz), which Kiln builds on. Blitz has no JavaScript. That is precisely and only the thing this project adds — the DOM bridge, the script runtime, the CLI, the tooling, and the packaging.

Writing a CSS engine or a text-shaping stack from scratch is the failure mode this repo exists to avoid.

<p align="center">
  <img src="assets/pipeline.png" width="620" alt="HTML, CSS and TypeScript entering a kiln, an application coming out">
</p>

## The subset

Kiln is not a browser and will never render arbitrary websites. HTML and CSS are the *authoring* language, not a compatibility promise.

Some of CSS is therefore out of scope for v1 — `float`, table layout, `position: sticky`, `:has()`, `@container`, `backdrop-filter`, 3D transforms, subgrid.

The important part is not the list, it's the mechanic: **a property Kiln can't honor will never be a silent no-op.** `kiln check` reports every unsupported declaration with a code, a `file:line:column`, and a rewrite hint:

```console
$ kiln check examples/unsupported.css

  examples/unsupported.css
    declarations         16
    supported             5  (31%)

    ×1   .card:has(> .selected)             KC1002  not supported — restructure or use a class
         examples/unsupported.css:35:1
    ×1   sidebar                            KC1101  use flexbox or grid
         float: left
         examples/unsupported.css:5:3
    ×1   legacy                             KC1102  use flexbox or grid
         display: table-cell
         examples/unsupported.css:31:3
    ×1   legacy                             KC1150  not supported
         writing-mode: vertical-rl
         examples/unsupported.css:32:3
    ×1   toolbar                            KC1201  use a fixed header plus scroll padding
         position: sticky
         examples/unsupported.css:10:3
```

It runs over `.css` files and the `<style>` blocks inside `.html`, and it is tested in both directions: [`tests/golden/check.txt`](tests/golden/check.txt) pins that report, and another test asserts every committed example stays inside the subset.

A silently ignored property is the fastest way to destroy trust in an engine like this: you write correct CSS, see wrong pixels, and blame yourself. Making the gap explicit and teachable turns an incomplete engine into a legible one.

## What runs today

HTML and CSS render, and JavaScript can drive the DOM.

```console
$ kiln init   my-app                 # scaffold a working counter
$ kiln dev    my-app/index.html      # native window, reloads on save
$ kiln check  my-app/index.html      # report unsupported CSS
$ kiln build  my-app/index.html dist # bundle the app and its scripts
$ kiln render my-app/index.html out.png --click "#inc"   # headless
```

`kiln dev` watches the entry, every script it references, every module those import, and every linked stylesheet.

**A CSS edit swaps the stylesheet under the running app.** Nothing is torn down, so every scrap of application state survives by construction rather than by being saved and restored.

A JS edit rebuilds the runtime, and that is a limit rather than a choice: QuickJS caches modules and rquickjs exposes no way to evict one, so a module cannot be replaced in a live context. State crosses that gap only if the page writes it down:

```js
let count = kiln.hot.data.count ?? 0;
kiln.hot.dispose((data) => { data.count = count; });
```

`dispose` runs while the old runtime is still alive; `data` is what the next one receives. A page that never calls `dispose` pays nothing and behaves exactly as it did before the API existed.

### DevTools attaches over CDP

```console
$ kiln dev examples/counter.html --inspect
devtools listening on 127.0.0.1:9223
```

`Runtime.evaluate`, `DOM.getDocument`, `DOM.getOuterHTML`, `DOM.getBoxModel`, `CSS.getComputedStyleForNode` and the discovery endpoints are served, so you can inspect a running Kiln app with the tool you already use.

The document is not `Send`, which shaped the design: `tungstenite` is blocking, so a connection is a thread, and those threads hand work to the event loop over a channel rather than touching the DOM. That also keeps the protocol layer a plain function over the document — which is how it gets tested without a socket.

<p align="center">
  <img src="assets/m3.png" width="620" alt="A counter app: minus and plus buttons either side of the number 5">
</p>

That is [`examples/counter.html`](examples/counter.html) after five clicks. The page holds an ordinary `<script>`:

```js
const display = document.querySelector("#count");
document.querySelector("#inc").addEventListener("click", () => {
  display.textContent = ++count;
});
```

`document` and `Element` are a thin JavaScript shim over four native calls. **Nodes live in Rust; JavaScript only ever holds an opaque id.** Setting `textContent` mutates the real document, which marks it dirty, which re-runs style and layout on the next frame — the same path a resize takes.

Input goes through Blitz's `EventDriver`, so the engine's built-in behaviour comes with it — `:hover`, checkbox and radio toggling, `<details>` disclosure, focus, and form submission all work without a line of application code:

<p align="center">
  <img src="assets/controls.png" width="620" alt="A hover-highlighted box, a checked checkbox and an opened details element">
</p>

JavaScript gets real event objects — `type`, `key`, `target`, `currentTarget`, `clientX/Y`, `preventDefault()`, `stopPropagation()` — and clicks bubble through ancestors, so a listener on a `<button>` fires when the hit lands on the text inside it.

[`examples/hello.html`](examples/hello.html) exercises the CSS side — custom properties, descendant selectors, flexbox with `gap` and `flex: 1`, `border-radius`, `linear-gradient`, inline styles, `letter-spacing`, monospace fallback. None of it is special-cased in Kiln; Stylo resolves the cascade and Taffy does layout.

Events can be driven without a mouse, which is how the counter above was verified:

```console
$ kiln render examples/counter.html out.png --click "#inc" --click "#dec"
$ kiln render examples/counter.html out.png --click-at 642,351
$ kiln render examples/controls.html out.png --hover ".box"
```

All three synthesize real pointer events and run the same `EventDriver` path the window uses — `--click` just resolves a selector to its centre point first.

## Preact runs

An unmodified Preact build renders and updates against Kiln's DOM, hooks and all:

<p align="center">
  <img src="assets/preact.png" width="620" alt="A Preact counter showing 4, with five conditional tags, four of them highlighted">
</p>

```console
$ cargo run -- render examples/preact.html out.png --click "#inc" --click "#inc"
```

[`examples/preact.html`](examples/preact.html) loads `preact.umd.js` and `hooks.umd.js` with `<script src>` — no build step, no shim, no patched fork. `useState` triggers a re-render, Preact diffs, and the DOM mutations flow through style, layout and paint.

Getting there needed three specific things, each worth knowing if you're porting another framework:

- **Stable node identity.** Preact compares DOM nodes with `===`, so JavaScript wrappers are cached per node id rather than created per call.
- **`onclick` must exist as a property.** Preact lowercases an event name only if `"onclick" in element`; otherwise it registers the type as `"Click"` and nothing ever matches. Handlers are also called with `this` bound to the node, which its event proxy relies on.
- **The microtask queue has to be drained.** Preact schedules re-renders on a promise. Without draining QuickJS's job queue after every script evaluation and event dispatch, state updates run and the screen never changes.

## A real Vite build runs

`pnpm create vite --template react-ts`, `vite build --base ./`, and Kiln renders the output — React mounts, assets load, and clicking the counter updates it. No shims, no IIFE bundling, no patched fork.

```console
$ kiln render dist/index.html out.png --click "button.counter"
```

`<script type="module">` runs inline or from `src`, `import "./thing.js"` resolves off disk, and a resolved path must still sit inside the app directory — so `import "../../../etc/passwd"` fails to resolve rather than reading the file.

Two things had to be fixed to get there, and both were invisible until a real bundle was run:

- **`import.meta.url` was undefined.** QuickJS creates the object but leaves it empty for the host to fill. Bundlers address their assets with `new URL("./thing.png", import.meta.url)`, so with no base every asset resolved against the entry's directory and every image 404'd.
- **QuickJS has no `URL`.** A Vite bundle dies on its first line with `URL is not defined`, so this was the difference between "bundler output runs" and "does not". `URL` and `URLSearchParams` are now in the prelude — enough of RFC 3986 for real bundles, deliberately not WHATWG.

Every line of [`examples/url.html`](examples/url.html) was diffed against Chrome, which caught `href` dropping the `user:password@` credentials a browser keeps. Fifteen cases, one wrong — about the rate to expect from writing a URL parser out of memory, and why the golden holds the whole table.

`--base ./` matters: Vite defaults to `/assets/…`, and a root-absolute path under `file:` resolves against the filesystem root.

Script ordering follows the spec too — classic scripts run where the parser meets them, modules and `<script defer src>` run after parsing, and `defer` on an *inline* script is correctly ignored.

## Tailwind works

Tailwind v4 renders as written — `oklch()` colours, `@layer` cascade layers, grid, and Preflight's reset:

<p align="center">
  <img src="assets/tailwind.png" width="720" alt="A dark Tailwind page with a heading, an amber badge, a three-column grid of bordered cards and an amber button.">
</p>

```console
$ kiln render examples/tailwind.html out.png
$ kiln check  examples/tailwind.html
    declarations        333
    supported           333  (100%)
```

That is real generated CSS, vendored in [`examples/vendor/`](examples/vendor/) so the claim can be rebuilt.

Getting there needed one fix worth naming: Kiln had never been handed a page with `<link rel="stylesheet">`, and **panicked** on one. Since Tailwind emits a `.css` file, the normal workflow was impossible. Pages now resolve local sub-resources against a `file:` base URL. Nothing is fetched over the network, and an attempt to says so out loud.

### check speaks in utilities

`display: flex` is not what you edit — `flex` is. So findings from generated CSS report the utility, with the declaration underneath:

```console
    ×1   sticky                             KC1201  use a fixed header plus scroll padding
         position: sticky
         examples/vendor/tailwind.css:213:5
```

Only utilities the markup actually uses are reported. Tailwind ships more CSS than any page references, and telling you about `truncate` when you never wrote it is noise, not honesty.

## Base UI runs

Unstyled component primitives work too. [Base UI](https://base-ui.com) `1.0.0-rc.0`'s `Menu` — trigger, portal, positioner, popup — renders and opens, on `preact/compat` rather than react-dom. The bundle is vendored in [`examples/vendor/`](examples/vendor/), so this is reproducible with no install step:

```bash
cargo run -- render examples/baseui.html out.png
```

Getting there needed real layout geometry rather than stubs:

- **`getBoundingClientRect`, `offsetWidth`, `clientWidth`, `scrollWidth`, `scrollTop`** report actual values from the layout tree — border box, padding box, content size and scroll offset kept distinct rather than collapsed into one number.
- **`ResizeObserver` is real.** It runs off the layout pass: after each relayout, observed elements whose content box changed get an entry. Layout re-runs until observers stop firing, bounded at four passes like a browser's resize-loop guard.
- **Reading geometry forces a synchronous layout flush.** This is the one that mattered. Floating-element libraries measure inside a timer, before the next frame — without a flush every rect read back as `0x0` and popups positioned themselves at the origin.
- **`getComputedStyle` returns resolved values.** Floating-ui reads it nine times in a bundled Base UI build: `getCssDimensions` parses `width`/`height`, `isContainingBlock` inspects `transform` and `willChange`, `getOffsetParent` walks the tree comparing `position`. Lengths come from the layout tree, keywords from the cascade.

### Collision detection and edge flipping work

Three menus, all opened against a viewport edge, in one headless render of [`examples/baseui.html`](examples/baseui.html):

<p align="center">
  <img src="assets/collision.png" width="720" alt="Three menus. The one at the top opens downward, the one near the bottom edge opens upward instead, and the one near the right edge is shifted left to stay on screen.">
</p>

Nothing in the page says where these should go. Floating-ui measures the trigger, compares it against the viewport, and writes a transform:

| Trigger | Computed transform | Behaviour |
| --- | --- | --- |
| `top` at y=29 | `translate(40px, 72px)` | opens downward, 6px below the trigger |
| `near bottom` at y=619 | `translate(40px, 495px)` | **flipped** — 619 − 118 − 6, above the trigger |
| `near right` at x=930 | `translate(781px, 342px)` | **shifted left** to keep 214px on screen |

Getting the last one honest took `clientLeft`/`clientTop`, which floating-ui adds to every offset — unimplemented, they made `number + undefined` and every popup landed at `translate(NaNpx, NaNpx)`.

Those three transforms are pinned by [`tests/golden/baseui.txt`](tests/golden/baseui.txt), so a regression in positioning fails `cargo test` rather than quietly changing a screenshot.

Still missing: `getBoundingClientRect` ignores transforms, so a positioned popup reports its untransformed box.

### `position: fixed` is honest about being wrong

Taffy has no `fixed`, so `stylo_taffy` maps it to `absolute`. The cascade still reports `fixed` — `getComputedStyle` says so, and so does the snapshot — but layout resolves the element against its nearest positioned ancestor rather than the viewport. [`examples/fixed.html`](examples/fixed.html) pins every case:

| Case | Result |
| --- | --- |
| no positioned ancestor | **correct** — `absolute` and `fixed` share the initial containing block |
| inside `position: relative` | wrong offset, the ancestor's origin is added |
| `inset: 0` inside one | wrong offset *and* wrong size — stretches to the ancestor, not the viewport |

This one cannot be fixed from Kiln's side, so it went upstream as [blitz#549](https://github.com/DioxusLabs/blitz/pull/549) — and the review was more useful than a merge would have been. The maintainers wanted one principled positioning pass rather than a targeted hoist, and chasing that turned up a **larger bug the PR had not noticed**: `position: absolute` is wrong too, whenever the element is not a direct child of its positioned ancestor.

[`examples/absolute.html`](examples/absolute.html) puts both cases side by side. A mark that is a direct child lands at `12,12`, matching Chrome; the same mark one unpositioned `<div>` deeper lands at `72,77` where Chrome puts it at `12,12`. The cause is in Taffy, which lays absolute children out against their *direct parent* and never walks up to find a positioned ancestor — filed as [taffy#1008](https://github.com/DioxusLabs/taffy/issues/1008).

`kiln check` reports both (KC1202, KC1203) rather than letting them be silent. KC1203 is the first rule that reads the *document* instead of the stylesheet, because whether an element is affected is a fact about the tree — and a blanket rule was measured first and rejected: `absolute` appears in three examples and two of them render correctly.

`IntersectionObserver` needed no engine work at all — it is a hundred lines of prelude over the rect and viewport calls that already existed, running on the same layout pass as `ResizeObserver`. `root`, `rootMargin` in px and %, and `threshold` arrays all behave:

| Target | Result |
| --- | --- |
| fully on screen | `isIntersecting: true`, ratio `1.00` |
| 50px past the bottom edge | `false`, ratio `0.00` |
| same target, `rootMargin: "100px"` | `true`, ratio `0.50` |

It reports the answer at the time the layout pass runs, so re-observing after a scroll gives a different result.

## Non-Latin text

The subsystem that kills projects like this one. Vercel's Native SDK is honest about its own: *"no hinting, no kerning, no shaping, no CFF"* — which means no Arabic, no Devanagari, no ligatures.

Kiln doesn't have that problem, because Kiln didn't write a text stack. Parley does the shaping, bidi, line breaking and font fallback:

<p align="center">
  <img src="assets/text.png" width="720" alt="Eight panels showing Latin ligatures, Arabic and Hebrew right-to-left text wrapping across two lines, Devanagari with conjuncts, Thai, Japanese, a bidirectional line mixing Arabic into English, and colour emoji.">
</p>

```bash
cargo run -- render examples/text.html out.png
```

Arabic and Hebrew lay out right-to-left with correct cursive joining. Devanagari forms conjuncts and reorders matras. A bidi run embeds Arabic inside an English sentence at the right position. Emoji render in colour, including ZWJ sequences like 👨‍👩‍👧‍👦 that are four codepoints joined into one glyph.

One thing needed fixing, and the fix is the whole thesis in miniature. Thai, Lao, Khmer and Burmese have no spaces between words, so they need dictionary segmentation to know where a line may break — without it the text simply ran out of its container. Parley depends on `icu_segmenter` with default features off and calls `new_for_non_complex_scripts` unless told otherwise. The repair was one line:

```toml
parley = { version = "0.10", features = ["complex-scripts"] }
```

That costs 3.7 MB of dictionary data — a release binary goes from 25.1 MB to 28.8 MB. Worth paying, and stated rather than buried.

Still missing: **`text-overflow: ellipsis` clips without drawing the ellipsis.** It isn't implemented in Parley, so it isn't a flag — it needs truncation support upstream first.

## Animation

CSS transitions and `@keyframes` run off a real clock. In a window it advances from an `Instant` and re-requests a frame while anything is animating, so animation drives redraws rather than input.

Headless, the clock is a flag — which is what makes animation testable at all:

```bash
cargo run -- render examples/animation.html out.png --at 1.0
```

<p align="center">
  <img src="assets/animation.png" width="720" alt="Three animations sampled one second in: a bar half-widened with its colour interpolated between amber and mint, a box translated halfway and faded, and a bar at its keyframe height peak.">
</p>

That is a single deterministic frame one second into a two-second timeline. The bar is 270px through a 120→420 transition with its background interpolated between amber and mint; the second box has translated 160 of 320px and faded to 0.6 opacity; the third is at its `@keyframes` height peak.

`tests/golden/animation.txt` is blessed at exactly that instant, so a frozen clock — which is what this was before M4, with `resolve()` hardcoded to time zero — fails the build instead of quietly rendering the first frame forever.

## Scrolling, focus and typing

An app has to accept a keystroke and scroll a list. Both now work, and both are driven headlessly so they are testable:

```bash
cargo run -- render examples/input.html out.png --type "Marshall" --scroll "#list,0,90"
```

<p align="center">
  <img src="assets/input.png" width="720" alt="A focused text input containing the typed word Marshall with a visible caret and amber focus ring, above a scrolled list showing rows 2 through 5 with a scrollbar.">
</p>

Nothing in that page polls. The input's `input` listener wrote the echo line, the list's `scroll` listener wrote `scrollTop: 90`, and the `:focus` border came from the cascade. `tests/golden/input.txt` records both strings.

Wheel events go through Blitz's `EventDriver` like every other input, so scroll clamping and bubbling to the parent — then the viewport — come from the engine. Kiln's part is forwarding winit's wheel and IME events, which it previously did not, and calling `scroll_by`, since Blitz treats scrolling as the shell's job rather than the DOM's.

`scrollTop` and `scrollLeft` used to have **no-op setters** — `el.scrollTop = 0` did nothing, and the getter read back the old value so the write looked like it had worked. That is the same silent no-op the CSS subset has `kiln check` to prevent, sitting where `check` cannot see it. Real setters now exist, plus `scrollTo`, `scrollBy` and `scrollIntoView`, and a scripted scroll fires one coalesced `scroll` event the way a browser does. All six cases were diffed against Chrome; `scrollIntoView` was off by one until it aligned to the padding box rather than the border box.

## Native where it should be native

Menus, the tray, the clipboard, file dialogs and notifications are real OS objects, not drawn by Kiln. JavaScript sees one `kiln.*` global:

```js
kiln.menu.set([
  { label: "File", items: [
      { id: "new", label: "New Window", accelerator: "CmdOrCtrl+N",
        click: (id) => console.log(id) },
      "-",
      { id: "close", label: "Close", enabled: false },
  ]},
]);

kiln.clipboard.writeText("written by kiln");
kiln.notify("Done", "Export finished");
```

A native menu bar cannot be checked by a screenshot, so the menu is kept as a **model** and the OS binding is a thin adapter over it. The model serialises, which makes the structure a golden like everything else:

```console
$ kiln render examples/native.html out.png --menu out.txt

"File"
  "New Window" #new [CmdOrCtrl+N]
  ---
  "Close" #close [CmdOrCtrl+W] disabled
```

Being explicit about what that does and doesn't prove: the menu and tray structure are pinned by a golden, and the clipboard round-trips in a real test that skips when the machine has no clipboard. Dialogs and notifications are fire-and-forget and are **not** verified — they block on the OS, and no golden covers them.

## The accessibility tree is testable

Semantic HTML maps to a real accessibility tree, and because it is text it can be a golden like everything else:

```bash
cargo run -- render examples/semantics.html out.png --a11y out.txt
```

```
window
  header
    heading
      text-run value="Semantics"
  button
    text-run value="Save"
  check-box
  text-run value="Subscribe"
```

This is also how the gap gets measured rather than assumed. Blitz's role mapping was thin — 21 nodes in that example came back `unknown`, including `<a>`, `<nav>`, `<main>`, `<ul>`, `<li>`, `<table>` and `<label>`, so a screen reader got nothing useful for navigation or lists.

That is fixed upstream: [blitz#550](https://github.com/DioxusLabs/blitz/pull/550) adds the HTML-AAM mappings and **merged the day it was sent**. Kiln pins a published Blitz, so [`tests/golden/semantics.a11y.txt`](tests/golden/semantics.a11y.txt) still records all 21 `unknown` roles — and that diff, on the next release, is the proof the fix is real rather than a link to a merged PR.

Accessibility being a golden rather than a promise is the point. PLAN.md rates it a High risk precisely because it is usually an afterthought.

## Record and replay

An interaction can be recorded and replayed, and the replay fails if anything about the run changed:

```console
$ kiln record examples/counter.html --out t.kiln --click "#inc" --click "#inc" --click "#dec"
recorded 3 steps, 6 mutations -> t.kiln

$ kiln replay examples/counter.html t.kiln
replayed 3 steps, 6 mutations — identical to the recording
```

The trace holds the interaction and a fingerprint of what the document did — every DOM mutation in order, plus a digest of the settled tree. Both halves earn their place: the mutation sequence catches a different *route*, and the digest catches a different *destination*. Clicking increment three times touches the same nodes in the same order as two increments and a decrement, so without the digest the oracle would call them identical.

Automation runs over the same CDP server DevTools uses, rather than a second protocol:

```js
await send("DOM.querySelector", { selector: "#inc" });
await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y });
```

Dispatched input goes through the same `EventDriver` path a real mouse takes, so anything an automation client can do, a user could have done.

## Tests read text, not pixels

A PNG is a poor oracle for a DOM bug. It shows the final state and hides the sequence, it cannot say *why* a box landed where it did, and once real text layout arrives it will churn on font and antialiasing drift.

So the primary artifact is a serialisation of the settled tree:

```
0/0/2/3 div.row @ 316,301 368x100.75 | display:block/flex position:static
  0/0/2/3/1 button#dec.ghost @ 316,313 86x76 | display:block/flex position:static
  0/0/2/3/3 div#count @ 426,301 150x100.75 | display:block/flow position:static
    0/0/2/3/3/0 "1"
```

Goldens are driven through the same click path the CLI uses, so interaction state is part of the diff — that `"1"` is the counter after `+1 +1 -1`. The namespace marker prints only for elements *outside* the HTML namespace, which is why the bug where every element was created in the empty namespace — invisible in a screenshot, because attribute selectors still matched — would now be a one-line diff.

```bash
cargo test
```

## Mutations are a log, not a callback

`MutationObserver` is not implemented as a standalone API. Every tree edit appends to an append-only journal, and the observer is one reader over it:

| Reader | Status |
| --- | --- |
| `MutationObserver` | works — subtree scoping, `attributeFilter`, old values, `takeRecords`, `disconnect` |
| Goldens | `examples/observers.html` writes observer results back into the DOM, so the text snapshot records them |
| Restyle invalidation | the same records are the dirty-set the cascade wants |
| DevTools, record/replay | further readers of the same stream |

Parent and siblings are captured *before* each edit, because after a removal there is no walking up from an orphaned handle. And `document.mutate()` is allowed in exactly one file — a test fails the build otherwise, since one missed append would break every reader at once, silently.

The headless path is not a debugging convenience. It's the deterministic reference renderer — what makes golden-image tests, CI on a machine with no display, and automated verification possible. Both paths share one document and one paint call, so they cannot drift.

## Shipping an app

```console
$ kiln package app/index.html --name "My App" --dmg
  declarations         26
  supported            26  (100%)
  dist/My App.dmg
  dist/My App.app
```

The bundle carries the Kiln runtime, your page renamed to `index.html`, and every local file it references with paths intact — so a `<link>` that worked in development still resolves inside the bundle. Double-clicking it opens your app; the runtime locates its own page relative to the executable.

`--dmg`, `--deb` and `--msi` opt into an installer for the platform you're on. Each is a known directory layout plus one system tool, so there's no bundler dependency. CI builds all three on their own platforms and **installs the `.deb` with `dpkg -i`** before running the installed binary, because `dpkg-deb --contents` would not catch a broken symlink.

Two empty installers once shipped green, which is why every artifact is now size-asserted rather than existence-checked: a `.msi` built from relative `File Source` paths was 5,942 bytes, and one with an external cabinet was 32,768 bytes with a 10.6 MB `.cab` sitting beside it. Both *succeeded*.

`--sign` and `--notarize` shell out to Apple's own `codesign` and `notarytool`. Both are implemented and **neither has been run end to end here**, because that needs a Developer ID certificate.

### Updating a shipped app

```console
$ kiln package app/index.html --update-url https://example.com/feed.json \
                              --update-key RWQf6LRC…
```

An app can replace **its own `app/` directory** — not the runtime binary. That split is what makes it cheap: no binary to overwrite, no re-signing, no notarization to invalidate, and none of the platform grief of replacing a running executable. Runtime self-update is deliberately out of scope.

```js
const version = kiln.update.check();      // null when nothing is newer
if (version && confirm(`Install ${version}?`)) kiln.update.apply();
```

Kiln draws no update UI; the app decides. Bundles are signed with [minisign](https://jedisct1.github.io/minisign/) and verified before anything is written — TLS says which host answered, not whose bytes arrived. The public key lives *beside* `app/` rather than inside it, because a key in the replaceable tree would let one compromised release authorise every release after it. Downgrades are refused, and the install is two renames so a crash leaves one whole tree or the other.

**This is the only place Kiln touches the network**, and only when an app was packaged with an update URL.

## Building

Requires a recent Rust toolchain. On Linux you also need GTK, `libxdo` and
appindicator for the native menu, tray and dialog surfaces, plus X11 and
Wayland headers for the window.

```console
$ cargo build
$ cargo test
$ cargo clippy --all-targets --all-features --locked -- -D warnings
```

CI builds and tests on macOS, Linux and Windows, and builds an installer on
each. Exactly one test paints — the CDP screenshot — and it is skipped on
Windows, whose runners have no GPU adapter and where wgpu aborts the process
rather than returning an error. Everything else is GPU-free by design.

Most tree snapshots record box sizes that depend on installed fonts, so they
only *compare* on macOS where they were blessed — though they still run
everywhere, which is what catches panics and logic errors.

[`examples/geometry.html`](examples/geometry.html) is the exception, and it
exists to hold the "identical rendering" claim rather than let it sit as an
assertion. It has no laid-out text and no font-relative units, so nothing is
left to vary, and its golden is compared on **all three platforms**. It covers
flex grow and basis, wrapping, grid with `fr` and spans, absolute insets
including a stretched one, `aspect-ratio`, min/max clamping, and a scroll
container — that last one because scrollbar reservation was the most plausible
thing to differ.

It was blessed on macOS and passes byte-for-byte on Linux and Windows.

[`examples/text-metrics.html`](examples/text-metrics.html) closes the other
half. It uses a single vendored face with **no fallback anywhere**, so the same
file feeds the same shaper on every platform — which is the case that matters,
since a shipped app vendors its fonts rather than hoping the host has them. It
measures advances at three sizes, letter-spacing and word-spacing, wrapping,
an unbreakable word overflowing its box, and line-height. Its golden is also
compared on all three, and also passes.

That test is only meaningful if the vendored font is really the one being
measured, so that was checked rather than assumed: break the `@font-face` src
and the first box measures 65px instead of 71px, because a system face takes
over. A page whose font silently failed to load would otherwise still produce
a golden — one testing the host's fonts rather than the vendored one.

**What this does and does not prove.** Layout and text metrics are identical to
the quarter-pixel on macOS, Linux and Windows. It compares boxes, not pixels:
paint-level identity — antialiasing, hinting, subpixel positioning — is still
unverified, and hard to verify in CI where the Windows runner has no GPU. The
CSS report, the accessibility tree and the menu model are asserted on all three
as well.

## Contributing

The project is early enough that the most useful contribution is argument. If you think the architecture is wrong, the subset is drawn in the wrong place, or a dependency is a mistake, open an issue and say so.

## License

[Apache-2.0](LICENSE).

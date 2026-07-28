<p align="center">
  <img src="assets/logo/kiln-mark-masthead.svg" width="150" alt="Kiln">
</p>

<h1 align="center">Kiln</h1>

<p align="center">
  <em>Your HTML. Your CSS. No browser.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/marshallshelly/kiln?style=flat-square&color=0B1226&label=stars" alt="Stars">
  <img src="https://img.shields.io/badge/status-M0--M6%20%2B%20Preact--F5A93C?style=flat-square" alt="Status: M0 to M6 plus Preact">
  <img src="https://img.shields.io/badge/built%20with-Rust-0B1226?style=flat-square" alt="Built with Rust">
  <img src="https://img.shields.io/badge/license-Apache--2.0-0B1226?style=flat-square" alt="Apache-2.0 license">
</p>

<p align="center">
  <strong>Native desktop apps from real HTML, CSS, and TypeScript &middot; rendered by our own engine &middot; no Chromium, no WebView</strong><br>
  <sub><strong>This is early.</strong> HTML and CSS render, and JavaScript can drive the DOM — a counter app works. The CSS surface is partial and parts of the toolkit (packaging, DevTools, hot reload) are not built. Read <a href="#status">Status</a> before you get excited.</sub>
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
| M7 | next | `kiln init/dev/build/check`, hot reload, DevTools over CDP |
| M8 | | **Preact runs unmodified.** Tailwind works. |
| M9 | | packaging: `.app`/`.dmg`/`.msi`/`.deb`, signing, notarization |
| M10 | | automation server, record/replay, deterministic screenshots |
| M11 | | static TypeScript compilation tier |

M3 is when this becomes demonstrable. M8 is when you could port something real.

**No benchmarks are published yet, deliberately.** Targets exist — a binary in the tens of megabytes rather than hundreds, startup in milliseconds, idle memory in tens of megabytes — but nothing has been measured on a real application, so nothing gets printed here as though it had been. When the numbers land they'll ship with a reproducible benchmark in this repo.

## Why not just use a WebView

|  | Electron | Tauri | Kiln |
|---|---|---|---|
| Author in HTML/CSS/TS | yes | yes | yes |
| Ships a browser | Chromium | borrows the OS WebView | **no** |
| Identical rendering on every OS | yes | **no** | yes |
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
$ kiln check

  src/app.css
    declarations         412
    supported            401  (97%)

    ×6  position: sticky                  KC1201  use a fixed header + scroll padding
    ×3  backdrop-filter: blur(12px)       KC1340  filter: blur() on a sibling layer
    ×2  :has(> .active)                   KC1102  not supported — restructure or use a class
```

A silently ignored property is the fastest way to destroy trust in an engine like this: you write correct CSS, see wrong pixels, and blame yourself. Making the gap explicit and teachable turns an incomplete engine into a legible one.

## What runs today

HTML and CSS render, and JavaScript can drive the DOM.

```console
$ cargo run -- open   examples/counter.html    # native window, buttons work
$ cargo run -- render examples/hello.html out.png   # headless
```

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

This one cannot be fixed from Kiln's side. The correct fix is to hoist fixed nodes to be layout children of the root before paint order is derived from the layout tree — a step inside Blitz's `resolve`, which cannot be reassembled externally because three of the fields it touches are crate-private. Reimplementing that pipeline to sneak a step in would mean owning a copy of an engine this project deliberately does not write, so it stays a documented gap with a golden that flips the day the upstream fix lands.

`IntersectionObserver` needed no engine work at all — it is a hundred lines of prelude over the rect and viewport calls that already existed, running on the same layout pass as `ResizeObserver`. `root`, `rootMargin` in px and %, and `threshold` arrays all behave:

| Target | Result |
| --- | --- |
| fully on screen | `isIntersecting: true`, ratio `1.00` |
| 50px past the bottom edge | `false`, ratio `0.00` |
| same target, `rootMargin: "100px"` | `true`, ratio `0.50` |

The honest limit: until scrolling lands, the answer can only ever be the initial static one. That is still what lazy-loading and reveal-on-view libraries ask for, and it is a real measurement rather than a stub returning zero.

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

This is also how the gap gets measured rather than assumed. Blitz's role mapping is currently thin — 21 nodes in that example come back `unknown`, including `<a>`, `<nav>`, `<main>`, `<ul>`, `<li>`, `<table>` and `<label>`. A screen reader gets nothing useful for navigation or lists. [`tests/golden/semantics.a11y.txt`](tests/golden/semantics.a11y.txt) records exactly that, so it improves visibly rather than silently.

Accessibility being a golden rather than a promise is the point. PLAN.md rates it a High risk precisely because it is usually an afterthought.

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
| HMR, DevTools, record/replay | later readers of the same stream |

Parent and siblings are captured *before* each edit, because after a removal there is no walking up from an orphaned handle. And `document.mutate()` is allowed in exactly one file — a test fails the build otherwise, since one missed append would break every reader at once, silently.

The headless path is not a debugging convenience. It's the deterministic reference renderer — what makes golden-image tests, CI on a machine with no display, and automated verification possible. Both paths share one document and one paint call, so they cannot drift.

## Building

Requires a recent Rust toolchain. No other system dependencies.

```console
$ cargo build
$ cargo clippy --all-targets --all-features --locked -- -D warnings
```

## Contributing

The project is early enough that the most useful contribution is argument. If you think the architecture is wrong, the subset is drawn in the wrong place, or a dependency is a mistake, open an issue and say so.

## License

[Apache-2.0](LICENSE).

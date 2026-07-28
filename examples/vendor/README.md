Third-party bundles, vendored so the examples run with no install step.

## `preact.umd.js`, `hooks.umd.js`

Preact 10, MIT. https://github.com/preactjs/preact

Unmodified release builds. They exist to demonstrate that an unmodified
framework build runs against Kiln's DOM, loaded with a plain `<script src>`.

## `baseui.js`

Base UI `1.0.0-rc.0` running on `preact/compat`, bundled with esbuild. Every
bundled package is MIT: `@base-ui-components/react`, `preact`,
`@floating-ui/dom`, `tabbable`, `reselect`, `use-sync-external-store`.

React and react-dom are aliased away at bundle time, so no React runtime is in
the file — `ReactDOM.createPortal` in the output is esbuild's binding name for
`preact/compat`'s export.

The bundle is checked in unminified on purpose. Diagnosing Kiln against a real
component library means grepping it: the `translate(NaNpx, NaNpx)` bug was found
by reading floating-ui's `offsetParent.clientLeft` arithmetic in this file, which
minified output would have hidden.

`baseui.entry.js` is the entry point. To rebuild:

```bash
npm install @base-ui-components/react@1.0.0-rc.0 preact@10 react@19 react-dom@19
npx esbuild baseui.entry.js --bundle --format=iife \
  --alias:react=./node_modules/preact/compat \
  --alias:react-dom=./node_modules/preact/compat \
  --alias:react/jsx-runtime=./node_modules/preact/compat/jsx-runtime \
  --define:process.env.NODE_ENV='"production"' \
  --outfile=baseui.js
```

esbuild resolves `--alias` targets against the current working directory rather
than the entry file, so those paths must point at a real `node_modules` from
wherever the command is run.

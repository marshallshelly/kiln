import { render as preactRender, h } from "preact";
import * as React from "preact/compat";
import { Menu } from "@base-ui-components/react/menu";
globalThis.React = React;
globalThis.BaseMenu = Menu;
globalThis.preactRender = preactRender;
globalThis.h = h;

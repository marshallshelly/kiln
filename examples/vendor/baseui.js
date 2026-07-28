(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn2, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
    } catch (e3) {
      throw err = [e3], e3;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e3) {
      throw mod = 0, e3;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/preact/dist/preact.module.js
  var preact_module_exports = {};
  __export(preact_module_exports, {
    Component: () => C,
    Fragment: () => S,
    cloneElement: () => W,
    createContext: () => X,
    createElement: () => k,
    createRef: () => M,
    h: () => k,
    hydrate: () => U,
    isValidElement: () => t,
    options: () => l,
    render: () => R,
    toChildArray: () => F
  });
  function m(n3, l4) {
    for (var u4 in l4) n3[u4] = l4[u4];
    return n3;
  }
  function b(n3) {
    n3 && n3.parentNode && n3.parentNode.removeChild(n3);
  }
  function k(l4, u4, t4) {
    var i4, r3, o4, e3 = {};
    for (o4 in u4) "key" == o4 ? i4 = u4[o4] : "ref" == o4 ? r3 = u4[o4] : e3[o4] = u4[o4];
    if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t4), "function" == typeof l4 && null != l4.defaultProps) for (o4 in l4.defaultProps) void 0 === e3[o4] && (e3[o4] = l4.defaultProps[o4]);
    return x(l4, e3, i4, r3, null);
  }
  function x(n3, t4, i4, r3, o4) {
    var e3 = { type: n3, props: t4, key: i4, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o4 ? ++u : o4, __i: -1, __u: 0 };
    return null == o4 && null != l.vnode && l.vnode(e3), e3;
  }
  function M() {
    return { current: null };
  }
  function S(n3) {
    return n3.children;
  }
  function C(n3, l4) {
    this.props = n3, this.context = l4;
  }
  function $(n3, l4) {
    if (null == l4) return n3.__ ? $(n3.__, n3.__i + 1) : null;
    for (var u4; l4 < n3.__k.length; l4++) if (null != (u4 = n3.__k[l4]) && null != u4.__e) return u4.__e;
    return "function" == typeof n3.type ? $(n3) : null;
  }
  function I(n3) {
    if (n3.__P && n3.__d) {
      var u4 = n3.__v, t4 = u4.__e, i4 = [], r3 = [], o4 = m({}, u4);
      o4.__v = u4.__v + 1, l.vnode && l.vnode(o4), q(n3.__P, o4, u4, n3.__n, n3.__P.namespaceURI, 32 & u4.__u ? [t4] : null, i4, null == t4 ? $(u4) : t4, !!(32 & u4.__u), r3), o4.__v = u4.__v, o4.__.__k[o4.__i] = o4, D(i4, o4, r3), u4.__e = u4.__ = null, o4.__e != t4 && P(o4);
    }
  }
  function P(n3) {
    if (null != (n3 = n3.__) && null != n3.__c) return n3.__e = n3.__c.base = null, n3.__k.some(function(l4) {
      if (null != l4 && null != l4.__e) return n3.__e = n3.__c.base = l4.__e;
    }), P(n3);
  }
  function A(n3) {
    (!n3.__d && (n3.__d = true) && i.push(n3) && !H.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)(H);
  }
  function H() {
    try {
      for (var n3, l4 = 1; i.length; ) i.length > l4 && i.sort(e), n3 = i.shift(), l4 = i.length, I(n3);
    } finally {
      i.length = H.__r = 0;
    }
  }
  function L(n3, l4, u4, t4, i4, r3, o4, e3, f4, c4, a4) {
    var s4, h3, p4, v3, y3, _3, g4, m3 = t4 && t4.__k || w, b3 = l4.length;
    for (f4 = T(u4, l4, m3, f4, b3), s4 = 0; s4 < b3; s4++) null != (p4 = u4.__k[s4]) && (h3 = -1 != p4.__i && m3[p4.__i] || d, p4.__i = s4, _3 = q(n3, p4, h3, i4, r3, o4, e3, f4, c4, a4), v3 = p4.__e, p4.ref && h3.ref != p4.ref && (h3.ref && J(h3.ref, null, p4), a4.push(p4.ref, p4.__c || v3, p4)), null == y3 && null != v3 && (y3 = v3), (g4 = !!(4 & p4.__u)) || h3.__k === p4.__k ? (f4 = j(p4, f4, n3, g4), g4 && h3.__e && (h3.__e = null)) : "function" == typeof p4.type && void 0 !== _3 ? f4 = _3 : v3 && (f4 = v3.nextSibling), p4.__u &= -7);
    return u4.__e = y3, f4;
  }
  function T(n3, l4, u4, t4, i4) {
    var r3, o4, e3, f4, c4, a4 = u4.length, s4 = a4, h3 = 0;
    for (n3.__k = new Array(i4), r3 = 0; r3 < i4; r3++) null != (o4 = l4[r3]) && "boolean" != typeof o4 && "function" != typeof o4 ? ("string" == typeof o4 || "number" == typeof o4 || "bigint" == typeof o4 || o4.constructor == String ? o4 = n3.__k[r3] = x(null, o4, null, null, null) : g(o4) ? o4 = n3.__k[r3] = x(S, { children: o4 }, null, null, null) : void 0 === o4.constructor && o4.__b > 0 ? o4 = n3.__k[r3] = x(o4.type, o4.props, o4.key, o4.ref ? o4.ref : null, o4.__v) : n3.__k[r3] = o4, f4 = r3 + h3, o4.__ = n3, o4.__b = n3.__b + 1, e3 = null, -1 != (c4 = o4.__i = O(o4, u4, f4, s4)) && (s4--, (e3 = u4[c4]) && (e3.__u |= 2)), null == e3 || null == e3.__v ? (-1 == c4 && (i4 > a4 ? h3-- : i4 < a4 && h3++), "function" != typeof o4.type && (o4.__u |= 4)) : c4 != f4 && (c4 == f4 - 1 ? h3-- : c4 == f4 + 1 ? h3++ : (c4 > f4 ? h3-- : h3++, o4.__u |= 4))) : n3.__k[r3] = null;
    if (s4) for (r3 = 0; r3 < a4; r3++) null != (e3 = u4[r3]) && 0 == (2 & e3.__u) && (e3.__e == t4 && (t4 = $(e3)), K(e3, e3));
    return t4;
  }
  function j(n3, l4, u4, t4) {
    var i4, r3;
    if ("function" == typeof n3.type) {
      for (i4 = n3.__k, r3 = 0; i4 && r3 < i4.length; r3++) i4[r3] && (i4[r3].__ = n3, l4 = j(i4[r3], l4, u4, t4));
      return l4;
    }
    n3.__e != l4 && (t4 && (l4 && n3.type && !l4.parentNode && (l4 = $(n3)), u4.insertBefore(n3.__e, l4 || null)), l4 = n3.__e);
    do {
      l4 = l4 && l4.nextSibling;
    } while (null != l4 && 8 == l4.nodeType);
    return l4;
  }
  function F(n3, l4) {
    return l4 = l4 || [], null == n3 || "boolean" == typeof n3 || (g(n3) ? n3.some(function(n4) {
      F(n4, l4);
    }) : l4.push(n3)), l4;
  }
  function O(n3, l4, u4, t4) {
    var i4, r3, o4, e3 = n3.key, f4 = n3.type, c4 = l4[u4], a4 = null != c4 && 0 == (2 & c4.__u);
    if (null === c4 && null == e3 || a4 && e3 == c4.key && f4 == c4.type) return u4;
    if (t4 > (a4 ? 1 : 0)) {
      for (i4 = u4 - 1, r3 = u4 + 1; i4 >= 0 || r3 < l4.length; ) if (null != (c4 = l4[o4 = i4 >= 0 ? i4-- : r3++]) && 0 == (2 & c4.__u) && e3 == c4.key && f4 == c4.type) return o4;
    }
    return -1;
  }
  function z(n3, l4, u4) {
    "-" == l4[0] ? n3.setProperty(l4, null == u4 ? "" : u4) : n3[l4] = null == u4 ? "" : "number" != typeof u4 || _.test(l4) ? u4 : u4 + "px";
  }
  function N(n3, l4, u4, t4, i4) {
    var r3, o4;
    n: if ("style" == l4) if ("string" == typeof u4) n3.style.cssText = u4;
    else {
      if ("string" == typeof t4 && (n3.style.cssText = t4 = ""), t4) for (l4 in t4) u4 && l4 in u4 || z(n3.style, l4, "");
      if (u4) for (l4 in u4) t4 && u4[l4] == t4[l4] || z(n3.style, l4, u4[l4]);
    }
    else if ("o" == l4[0] && "n" == l4[1]) r3 = l4 != (l4 = l4.replace(s, "$1")), o4 = l4.toLowerCase(), l4 = o4 in n3 || "onFocusOut" == l4 || "onFocusIn" == l4 ? o4.slice(2) : l4.slice(2), n3.l || (n3.l = {}), n3.l[l4 + r3] = u4, u4 ? t4 ? u4[a] = t4[a] : (u4[a] = h, n3.addEventListener(l4, r3 ? v : p, r3)) : n3.removeEventListener(l4, r3 ? v : p, r3);
    else {
      if ("http://www.w3.org/2000/svg" == i4) l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l4 && "height" != l4 && "href" != l4 && "list" != l4 && "form" != l4 && "tabIndex" != l4 && "download" != l4 && "rowSpan" != l4 && "colSpan" != l4 && "role" != l4 && "popover" != l4 && l4 in n3) try {
        n3[l4] = null == u4 ? "" : u4;
        break n;
      } catch (n4) {
      }
      "function" == typeof u4 || (null == u4 || false === u4 && "-" != l4[4] ? n3.removeAttribute(l4) : n3.setAttribute(l4, "popover" == l4 && 1 == u4 ? "" : u4));
    }
  }
  function V(n3) {
    return function(u4) {
      if (this.l) {
        var t4 = this.l[u4.type + n3];
        if (null == u4[c]) u4[c] = h++;
        else if (u4[c] < t4[a]) return;
        return t4(l.event ? l.event(u4) : u4);
      }
    };
  }
  function q(n3, u4, t4, i4, r3, o4, e3, f4, c4, a4) {
    var s4, h3, p4, v3, y3, d3, _3, k4, x4, M3, $3, I3, P4, A4, H3, T4, j4 = u4.type;
    if (void 0 !== u4.constructor) return null;
    128 & t4.__u && (c4 = !!(32 & t4.__u), o4 = [f4 = u4.__e = t4.__e]), (s4 = l.__b) && s4(u4);
    n: if ("function" == typeof j4) {
      h3 = e3.length;
      try {
        if (x4 = u4.props, M3 = j4.prototype && j4.prototype.render, $3 = (s4 = j4.contextType) && i4[s4.__c], I3 = s4 ? $3 ? $3.props.value : s4.__ : i4, t4.__c ? k4 = (p4 = u4.__c = t4.__c).__ = p4.__E : (M3 ? u4.__c = p4 = new j4(x4, I3) : (u4.__c = p4 = new C(x4, I3), p4.constructor = j4, p4.render = Q), $3 && $3.sub(p4), p4.state || (p4.state = {}), p4.__n = i4, v3 = p4.__d = true, p4.__h = [], p4._sb = []), M3 && null == p4.__s && (p4.__s = p4.state), M3 && null != j4.getDerivedStateFromProps && (p4.__s == p4.state && (p4.__s = m({}, p4.__s)), m(p4.__s, j4.getDerivedStateFromProps(x4, p4.__s))), y3 = p4.props, d3 = p4.state, p4.__v = u4, v3) M3 && null == j4.getDerivedStateFromProps && null != p4.componentWillMount && p4.componentWillMount(), M3 && null != p4.componentDidMount && p4.__h.push(p4.componentDidMount);
        else {
          if (M3 && null == j4.getDerivedStateFromProps && x4 !== y3 && null != p4.componentWillReceiveProps && p4.componentWillReceiveProps(x4, I3), u4.__v == t4.__v || !p4.__e && null != p4.shouldComponentUpdate && false === p4.shouldComponentUpdate(x4, p4.__s, I3)) {
            u4.__v != t4.__v && (p4.props = x4, p4.state = p4.__s, p4.__d = false), u4.__e = t4.__e, u4.__k = t4.__k, u4.__k.some(function(n4) {
              n4 && (n4.__ = u4);
            }), w.push.apply(p4.__h, p4._sb), p4._sb = [], p4.__h.length && e3.push(p4);
            break n;
          }
          null != p4.componentWillUpdate && p4.componentWillUpdate(x4, p4.__s, I3), M3 && null != p4.componentDidUpdate && p4.__h.push(function() {
            p4.componentDidUpdate(y3, d3, _3);
          });
        }
        if (p4.context = I3, p4.props = x4, p4.__P = n3, p4.__e = false, P4 = l.__r, A4 = 0, M3) p4.state = p4.__s, p4.__d = false, P4 && P4(u4), s4 = p4.render(p4.props, p4.state, p4.context), w.push.apply(p4.__h, p4._sb), p4._sb = [];
        else do {
          p4.__d = false, P4 && P4(u4), s4 = p4.render(p4.props, p4.state, p4.context), p4.state = p4.__s;
        } while (p4.__d && ++A4 < 25);
        p4.state = p4.__s, null != p4.getChildContext && (i4 = m(m({}, i4), p4.getChildContext())), M3 && !v3 && null != p4.getSnapshotBeforeUpdate && (_3 = p4.getSnapshotBeforeUpdate(y3, d3)), H3 = null != s4 && s4.type === S && null == s4.key ? E(s4.props.children) : s4, f4 = L(n3, g(H3) ? H3 : [H3], u4, t4, i4, r3, o4, e3, f4, c4, a4), p4.base = u4.__e, u4.__u &= -161, p4.__h.length && e3.push(p4), k4 && (p4.__E = p4.__ = null);
      } catch (n4) {
        if (e3.length = h3, u4.__v = null, c4 || null != o4) {
          if (n4.then) {
            for (u4.__u |= c4 ? 160 : 128; f4 && 8 == f4.nodeType && f4.nextSibling; ) f4 = f4.nextSibling;
            null != o4 && (o4[o4.indexOf(f4)] = null), u4.__e = f4;
          } else if (null != o4) for (T4 = o4.length; T4--; ) b(o4[T4]);
        } else u4.__e = t4.__e;
        null == u4.__k && (u4.__k = t4.__k || []), n4.then || B(u4), l.__e(n4, u4, t4);
      }
    } else null == o4 && u4.__v == t4.__v ? (u4.__k = t4.__k, u4.__e = t4.__e) : f4 = u4.__e = G(t4.__e, u4, t4, i4, r3, o4, e3, c4, a4);
    return (s4 = l.diffed) && s4(u4), 128 & u4.__u ? void 0 : f4;
  }
  function B(n3) {
    n3 && (n3.__c && (n3.__c.__e = true), n3.__k && n3.__k.some(B));
  }
  function D(n3, u4, t4) {
    for (var i4 = 0; i4 < t4.length; i4++) J(t4[i4], t4[++i4], t4[++i4]);
    l.__c && l.__c(u4, n3), n3.some(function(u5) {
      try {
        n3 = u5.__h, u5.__h = [], n3.some(function(n4) {
          n4.call(u5);
        });
      } catch (n4) {
        l.__e(n4, u5.__v);
      }
    });
  }
  function E(n3) {
    return "object" != typeof n3 || null == n3 || n3.__b > 0 ? n3 : g(n3) ? n3.map(E) : void 0 !== n3.constructor ? null : m({}, n3);
  }
  function G(u4, t4, i4, r3, o4, e3, f4, c4, a4) {
    var s4, h3, p4, v3, y3, w4, _3, m3 = i4.props || d, k4 = t4.props, x4 = t4.type;
    if ("svg" == x4 ? o4 = "http://www.w3.org/2000/svg" : "math" == x4 ? o4 = "http://www.w3.org/1998/Math/MathML" : o4 || (o4 = "http://www.w3.org/1999/xhtml"), null != e3) {
      for (s4 = 0; s4 < e3.length; s4++) if ((y3 = e3[s4]) && "setAttribute" in y3 == !!x4 && (x4 ? y3.localName == x4 : 3 == y3.nodeType)) {
        u4 = y3, e3[s4] = null;
        break;
      }
    }
    if (null == u4) {
      if (null == x4) return document.createTextNode(k4);
      u4 = document.createElementNS(o4, x4, k4.is && k4), c4 && (l.__m && l.__m(t4, e3), c4 = false), e3 = null;
    }
    if (null == x4) m3 === k4 || c4 && u4.data == k4 || (u4.data = k4);
    else {
      if (e3 = "textarea" == x4 && null != k4.defaultValue ? null : e3 && n.call(u4.childNodes), !c4 && null != e3) for (m3 = {}, s4 = 0; s4 < u4.attributes.length; s4++) m3[(y3 = u4.attributes[s4]).name] = y3.value;
      for (s4 in m3) y3 = m3[s4], "dangerouslySetInnerHTML" == s4 ? p4 = y3 : "children" == s4 || s4 in k4 || "value" == s4 && "defaultValue" in k4 || "checked" == s4 && "defaultChecked" in k4 || N(u4, s4, null, y3, o4);
      for (s4 in k4) y3 = k4[s4], "children" == s4 ? v3 = y3 : "dangerouslySetInnerHTML" == s4 ? h3 = y3 : "value" == s4 ? w4 = y3 : "checked" == s4 ? _3 = y3 : c4 && "function" != typeof y3 || m3[s4] === y3 || N(u4, s4, y3, m3[s4], o4);
      if (h3) c4 || p4 && (h3.__html == p4.__html || h3.__html == u4.innerHTML) || (u4.innerHTML = h3.__html), t4.__k = [];
      else if (p4 && (u4.innerHTML = ""), L("template" == t4.type ? u4.content : u4, g(v3) ? v3 : [v3], t4, i4, r3, "foreignObject" == x4 ? "http://www.w3.org/1999/xhtml" : o4, e3, f4, e3 ? e3[0] : i4.__k && $(i4, 0), c4, a4), null != e3) for (s4 = e3.length; s4--; ) b(e3[s4]);
      c4 && "textarea" != x4 || (s4 = "value", "progress" == x4 && null == w4 ? u4.removeAttribute("value") : null != w4 && (w4 !== u4[s4] || "progress" == x4 && !w4 || "option" == x4 && w4 != m3[s4]) && N(u4, s4, w4, m3[s4], o4), s4 = "checked", null != _3 && _3 != u4[s4] && N(u4, s4, _3, m3[s4], o4));
    }
    return u4;
  }
  function J(n3, u4, t4) {
    try {
      if ("function" == typeof n3) {
        var i4 = "function" == typeof n3.__u;
        i4 && n3.__u(), i4 && null == u4 || (n3.__u = n3(u4));
      } else n3.current = u4;
    } catch (n4) {
      l.__e(n4, t4);
    }
  }
  function K(n3, u4, t4) {
    var i4, r3;
    if (l.unmount && l.unmount(n3), (i4 = n3.ref) && (i4.current && i4.current != n3.__e || J(i4, null, u4)), null != (i4 = n3.__c)) {
      if (i4.componentWillUnmount) try {
        i4.componentWillUnmount();
      } catch (n4) {
        l.__e(n4, u4);
      }
      i4.base = i4.__P = i4.__n = null;
    }
    if (i4 = n3.__k) for (r3 = 0; r3 < i4.length; r3++) i4[r3] && K(i4[r3], u4, t4 || "function" != typeof n3.type);
    t4 || b(n3.__e), n3.__c = n3.__ = n3.__e = void 0;
  }
  function Q(n3, l4, u4) {
    return this.constructor(n3, u4);
  }
  function R(u4, t4, i4) {
    var r3, o4, e3, f4;
    t4 == document && (t4 = document.documentElement), l.__ && l.__(u4, t4), o4 = (r3 = "function" == typeof i4) ? null : i4 && i4.__k || t4.__k, e3 = [], f4 = [], q(t4, u4 = (!r3 && i4 || t4).__k = k(S, null, [u4]), o4 || d, d, t4.namespaceURI, !r3 && i4 ? [i4] : o4 ? null : t4.firstChild ? n.call(t4.childNodes) : null, e3, !r3 && i4 ? i4 : o4 ? o4.__e : t4.firstChild, r3, f4), D(e3, u4, f4), u4.props.children = null;
  }
  function U(n3, l4) {
    R(n3, l4, U);
  }
  function W(l4, u4, t4) {
    var i4, r3, o4, e3, f4 = m({}, l4.props);
    for (o4 in l4.type && l4.type.defaultProps && (e3 = l4.type.defaultProps), u4) "key" == o4 ? i4 = u4[o4] : "ref" == o4 ? r3 = u4[o4] : f4[o4] = void 0 === u4[o4] && null != e3 ? e3[o4] : u4[o4];
    return arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : t4), x(l4.type, f4, i4 || l4.key, r3 || l4.ref, null);
  }
  function X(n3) {
    function l4(n4) {
      var u4, t4;
      return this.getChildContext || (u4 = /* @__PURE__ */ new Set(), (t4 = {})[l4.__c] = this, this.getChildContext = function() {
        return t4;
      }, this.componentWillUnmount = function() {
        u4 = null;
      }, this.shouldComponentUpdate = function(n5) {
        this.props.value != n5.value && u4.forEach(function(n6) {
          n6.__e = true, A(n6);
        });
      }, this.sub = function(n5) {
        u4.add(n5);
        var l5 = n5.componentWillUnmount;
        n5.componentWillUnmount = function() {
          u4 && u4.delete(n5), l5 && l5.call(n5);
        };
      }), n4.children;
    }
    return l4.__c = "__cC" + y++, l4.__ = n3, l4.Provider = l4.__l = (l4.Consumer = function(n4, l5) {
      return n4.children(l5);
    }).contextType = l4, l4;
  }
  var n, l, u, t, i, r, o, e, f, c, a, s, h, p, v, y, d, w, _, g;
  var init_preact_module = __esm({
    "../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/preact/dist/preact.module.js"() {
      d = {};
      w = [];
      _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      g = Array.isArray;
      n = w.slice, l = { __e: function(n3, l4, u4, t4) {
        for (var i4, r3, o4; l4 = l4.__; ) if ((i4 = l4.__c) && !i4.__) try {
          if ((r3 = i4.constructor) && null != r3.getDerivedStateFromError && (i4.setState(r3.getDerivedStateFromError(n3)), o4 = i4.__d), null != i4.componentDidCatch && (i4.componentDidCatch(n3, t4 || {}), o4 = i4.__d), o4) return i4.__E = i4;
        } catch (l5) {
          n3 = l5;
        }
        throw n3;
      } }, u = 0, t = function(n3) {
        return null != n3 && void 0 === n3.constructor;
      }, C.prototype.setState = function(n3, l4) {
        var u4;
        u4 = null != this.__s && this.__s != this.state ? this.__s : this.__s = m({}, this.state), "function" == typeof n3 && (n3 = n3(m({}, u4), this.props)), n3 && m(u4, n3), null != n3 && this.__v && (l4 && this._sb.push(l4), A(this));
      }, C.prototype.forceUpdate = function(n3) {
        this.__v && (this.__e = true, n3 && this.__h.push(n3), A(this));
      }, C.prototype.render = S, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n3, l4) {
        return n3.__v.__b - l4.__v.__b;
      }, H.__r = 0, f = Math.random().toString(8), c = "__d" + f, a = "__a" + f, s = /(PointerCapture)$|Capture$/i, h = 0, p = V(false), v = V(true), y = 0;
    }
  });

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/preact/hooks/dist/hooks.module.js
  var hooks_module_exports = {};
  __export(hooks_module_exports, {
    useCallback: () => q2,
    useContext: () => x2,
    useDebugValue: () => P2,
    useEffect: () => h2,
    useErrorBoundary: () => b2,
    useId: () => g2,
    useImperativeHandle: () => F2,
    useLayoutEffect: () => _2,
    useMemo: () => T2,
    useReducer: () => y2,
    useRef: () => A2,
    useState: () => d2
  });
  function s2(n3, t4) {
    c2.__h && c2.__h(r2, n3, o2 || t4), o2 = 0;
    var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n3 >= u4.__.length && u4.__.push({}), u4.__[n3];
  }
  function d2(n3) {
    return o2 = 1, y2(D2, n3);
  }
  function y2(n3, u4, i4) {
    var o4 = s2(t2++, 2);
    if (o4.t = n3, !o4.__c && (o4.__ = [i4 ? i4(u4) : D2(void 0, u4), function(n4) {
      var t4 = o4.__N ? o4.__N[0] : o4.__[0], r3 = o4.t(t4, n4);
      t4 !== r3 && (o4.__N = [r3, o4.__[1]], o4.__c.setState({}));
    }], o4.__c = r2, !r2.__f)) {
      var f4 = function(n4, t4, r3) {
        if (!o4.__c.__H) return true;
        var u5 = false, i5 = o4.__c.props !== n4;
        if (o4.__c.__H.__.some(function(n5) {
          if (n5.__N) {
            u5 = true;
            var t5 = n5.__[0];
            n5.__ = n5.__N, n5.__N = void 0, t5 !== n5.__[0] && (i5 = true);
          }
        }), c4) {
          var f5 = c4.call(this, n4, t4, r3);
          return u5 ? f5 || i5 : f5;
        }
        return !u5 || i5;
      };
      r2.__f = true;
      var c4 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n4, t4, r3) {
        if (this.__e) {
          var u5 = c4;
          c4 = void 0, f4(n4, t4, r3), c4 = u5;
        }
        e3 && e3.call(this, n4, t4, r3);
      }, r2.shouldComponentUpdate = f4;
    }
    return o4.__N || o4.__;
  }
  function h2(n3, u4) {
    var i4 = s2(t2++, 3);
    !c2.__s && C2(i4.__H, u4) && (i4.__ = n3, i4.u = u4, r2.__H.__h.push(i4));
  }
  function _2(n3, u4) {
    var i4 = s2(t2++, 4);
    !c2.__s && C2(i4.__H, u4) && (i4.__ = n3, i4.u = u4, r2.__h.push(i4));
  }
  function A2(n3) {
    return o2 = 5, T2(function() {
      return { current: n3 };
    }, []);
  }
  function F2(n3, t4, r3) {
    o2 = 6, _2(function() {
      if ("function" == typeof n3) {
        var r4 = n3(t4());
        return function() {
          n3(null), r4 && "function" == typeof r4 && r4();
        };
      }
      if (n3) return n3.current = t4(), function() {
        return n3.current = null;
      };
    }, null == r3 ? r3 : r3.concat(n3));
  }
  function T2(n3, r3) {
    var u4 = s2(t2++, 7);
    return C2(u4.__H, r3) && (u4.__ = n3(), u4.__H = r3, u4.__h = n3), u4.__;
  }
  function q2(n3, t4) {
    return o2 = 8, T2(function() {
      return n3;
    }, t4);
  }
  function x2(n3) {
    var u4 = r2.context[n3.__c], i4 = s2(t2++, 9);
    return i4.c = n3, u4 ? (null == i4.__ && (i4.__ = true, u4.sub(r2)), u4.props.value) : n3.__;
  }
  function P2(n3, t4) {
    c2.useDebugValue && c2.useDebugValue(t4 ? t4(n3) : n3);
  }
  function b2(n3) {
    var u4 = s2(t2++, 10), i4 = d2();
    return u4.__ = n3, r2.componentDidCatch || (r2.componentDidCatch = function(n4, t4) {
      u4.__ && u4.__(n4, t4), i4[1](n4);
    }), [i4[0], function() {
      i4[1](void 0);
    }];
  }
  function g2() {
    var n3 = s2(t2++, 11);
    if (!n3.__) {
      for (var u4 = r2.__v; null !== u4 && !u4.__m && null !== u4.__; ) u4 = u4.__;
      var i4 = u4.__m || (u4.__m = [0, 0]);
      n3.__ = "P" + i4[0] + "-" + i4[1]++;
    }
    return n3.__;
  }
  function j2() {
    for (var n3; n3 = f2.shift(); ) {
      var t4 = n3.__H;
      if (n3.__P && t4) try {
        t4.__h.some(z2), t4.__h.some(B2), t4.__h = [];
      } catch (r3) {
        t4.__h = [], c2.__e(r3, n3.__v);
      }
    }
  }
  function w2(n3) {
    var t4, r3 = function() {
      clearTimeout(u4), k2 && cancelAnimationFrame(t4), setTimeout(n3);
    }, u4 = setTimeout(r3, 35);
    k2 && (t4 = requestAnimationFrame(r3));
  }
  function z2(n3) {
    var t4 = r2, u4 = n3.__c;
    "function" == typeof u4 && (n3.__c = void 0, u4()), r2 = t4;
  }
  function B2(n3) {
    var t4 = r2;
    n3.__c = n3.__(), r2 = t4;
  }
  function C2(n3, t4) {
    return !n3 || n3.length !== t4.length || t4.some(function(t5, r3) {
      return t5 !== n3[r3];
    });
  }
  function D2(n3, t4) {
    return "function" == typeof t4 ? t4(n3) : t4;
  }
  var t2, r2, u2, i2, o2, f2, c2, e2, a2, v2, l2, m2, p2, k2;
  var init_hooks_module = __esm({
    "../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/preact/hooks/dist/hooks.module.js"() {
      init_preact_module();
      o2 = 0;
      f2 = [];
      c2 = l;
      e2 = c2.__b;
      a2 = c2.__r;
      v2 = c2.diffed;
      l2 = c2.__c;
      m2 = c2.unmount;
      p2 = c2.__;
      c2.__b = function(n3) {
        r2 = null, e2 && e2(n3);
      }, c2.__ = function(n3, t4) {
        n3 && t4.__k && t4.__k.__m && (n3.__m = t4.__k.__m), p2 && p2(n3, t4);
      }, c2.__r = function(n3) {
        a2 && a2(n3), t2 = 0;
        var i4 = (r2 = n3.__c).__H;
        i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.some(function(n4) {
          n4.__N && (n4.__ = n4.__N), n4.u = n4.__N = void 0;
        })) : (i4.__h.some(z2), i4.__h.some(B2), i4.__h = [], t2 = 0)), u2 = r2;
      }, c2.diffed = function(n3) {
        v2 && v2(n3);
        var t4 = n3.__c;
        t4 && t4.__H && (t4.__H.__h.length && (1 !== f2.push(t4) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t4.__H.__.some(function(n4) {
          n4.u && (n4.__H = n4.u, n4.u = void 0);
        })), u2 = r2 = null;
      }, c2.__c = function(n3, t4) {
        t4.some(function(n4) {
          try {
            n4.__h.some(z2), n4.__h = n4.__h.filter(function(n5) {
              return !n5.__ || B2(n5);
            });
          } catch (r3) {
            t4.some(function(n5) {
              n5.__h && (n5.__h = []);
            }), t4 = [], c2.__e(r3, n4.__v);
          }
        }), l2 && l2(n3, t4);
      }, c2.unmount = function(n3) {
        m2 && m2(n3);
        var t4, r3 = n3.__c;
        r3 && r3.__H && (r3.__H.__.some(function(n4) {
          try {
            z2(n4);
          } catch (n5) {
            t4 = n5;
          }
        }), r3.__H = void 0, t4 && c2.__e(t4, r3.__v));
      };
      k2 = "function" == typeof requestAnimationFrame;
    }
  });

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/preact/compat/dist/compat.module.js
  var compat_module_exports = {};
  __export(compat_module_exports, {
    Children: () => L2,
    Component: () => C,
    Fragment: () => S,
    PureComponent: () => M2,
    StrictMode: () => S,
    Suspense: () => P3,
    SuspenseList: () => B3,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => fn,
    cloneElement: () => mn,
    createContext: () => X,
    createElement: () => k,
    createFactory: () => sn,
    createPortal: () => $2,
    createRef: () => M,
    default: () => gn,
    findDOMNode: () => yn,
    flushSync: () => bn,
    forwardRef: () => D3,
    hydrate: () => tn,
    isElement: () => Sn,
    isFragment: () => vn,
    isMemo: () => dn,
    isValidElement: () => hn,
    lazy: () => z3,
    memo: () => N2,
    render: () => nn,
    startTransition: () => x3,
    unmountComponentAtNode: () => pn,
    unstable_batchedUpdates: () => _n,
    useCallback: () => q2,
    useContext: () => x2,
    useDebugValue: () => P2,
    useDeferredValue: () => w3,
    useEffect: () => h2,
    useErrorBoundary: () => b2,
    useId: () => g2,
    useImperativeHandle: () => F2,
    useInsertionEffect: () => I2,
    useLayoutEffect: () => _2,
    useMemo: () => T2,
    useReducer: () => y2,
    useRef: () => A2,
    useState: () => d2,
    useSyncExternalStore: () => C3,
    useTransition: () => k3,
    version: () => an
  });
  function g3(n3, t4) {
    for (var e3 in t4) n3[e3] = t4[e3];
    return n3;
  }
  function E2(n3, t4) {
    for (var e3 in n3) if ("__source" !== e3 && !(e3 in t4)) return true;
    for (var r3 in t4) if ("__source" !== r3 && n3[r3] !== t4[r3]) return true;
    return false;
  }
  function C3(n3, t4) {
    var e3 = t4(), r3 = d2({ t: { __: e3, u: t4 } }), u4 = r3[0].t, o4 = r3[1];
    return _2(function() {
      u4.__ = e3, u4.u = t4, R2(u4) && o4({ t: u4 });
    }, [n3, e3, t4]), h2(function() {
      return R2(u4) && o4({ t: u4 }), n3(function() {
        R2(u4) && o4({ t: u4 });
      });
    }, [n3]), e3;
  }
  function R2(n3) {
    try {
      return !((t4 = n3.__) === (e3 = n3.u()) && (0 !== t4 || 1 / t4 == 1 / e3) || t4 != t4 && e3 != e3);
    } catch (n4) {
      return true;
    }
    var t4, e3;
  }
  function x3(n3) {
    n3();
  }
  function w3(n3) {
    return n3;
  }
  function k3() {
    return [false, x3];
  }
  function M2(n3, t4) {
    this.props = n3, this.context = t4;
  }
  function N2(n3, e3) {
    function r3(n4) {
      var t4 = this.props.ref;
      return t4 != n4.ref && t4 && ("function" == typeof t4 ? t4(null) : t4.current = null), e3 ? !e3(this.props, n4) || t4 != n4.ref : E2(this.props, n4);
    }
    function u4(e4) {
      return this.shouldComponentUpdate = r3, k(n3, e4);
    }
    return u4.displayName = "Memo(" + (n3.displayName || n3.name) + ")", u4.__f = u4.prototype.isReactComponent = true, u4.type = n3, u4;
  }
  function D3(n3) {
    function t4(t5) {
      var e3 = g3({}, t5);
      return delete e3.ref, n3(e3, t5.ref || null);
    }
    return t4.$$typeof = A3, t4.render = n3, t4.prototype.isReactComponent = t4.__f = true, t4.displayName = "ForwardRef(" + (n3.displayName || n3.name) + ")", t4;
  }
  function V2(n3, t4, e3) {
    return n3 && (n3.__c && n3.__c.__H && (n3.__c.__H.__.forEach(function(n4) {
      "function" == typeof n4.__c && n4.__c();
    }), n3.__c.__H = null), null != (n3 = g3({}, n3)).__c && (n3.__c.__P === e3 && (n3.__c.__P = t4), n3.__c.__e = true, n3.__c = null), n3.__k = n3.__k && n3.__k.map(function(n4) {
      return V2(n4, t4, e3);
    })), n3;
  }
  function W2(n3, t4, e3) {
    return n3 && e3 && (n3.__v = null, n3.__k = n3.__k && n3.__k.map(function(n4) {
      return W2(n4, t4, e3);
    }), n3.__c && n3.__c.__P === t4 && (n3.__e && e3.appendChild(n3.__e), n3.__c.__e = true, n3.__c.__P = e3)), n3;
  }
  function P3() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function j3(n3) {
    var t4 = n3.__ && n3.__.__c;
    return t4 && t4.__a && t4.__a(n3);
  }
  function z3(n3) {
    var e3, r3, u4, o4 = null;
    function i4(i5) {
      if (e3 || (e3 = n3()).then(function(n4) {
        n4 && (o4 = n4.default || n4), u4 = true;
      }, function(n4) {
        r3 = n4, u4 = true;
      }), r3) throw r3;
      if (!u4) throw e3;
      return o4 ? k(o4, i5) : null;
    }
    return i4.displayName = "Lazy", i4.__f = true, i4;
  }
  function B3() {
    this.i = null, this.l = null;
  }
  function Z(n3) {
    return this.getChildContext = function() {
      return n3.context;
    }, n3.children;
  }
  function Y(n3) {
    var e3 = this, r3 = n3.h;
    if (e3.componentWillUnmount = function() {
      R(null, e3.v), e3.v = null, e3.h = null;
    }, e3.h && e3.h !== r3 && e3.componentWillUnmount(), !e3.v) {
      for (var u4 = e3.__v; null !== u4 && !u4.__m && null !== u4.__; ) u4 = u4.__;
      e3.h = r3, e3.v = { nodeType: 1, parentNode: r3, childNodes: [], __k: { __m: u4.__m }, contains: function() {
        return true;
      }, namespaceURI: r3.namespaceURI, insertBefore: function(n4, t4) {
        this.childNodes.push(n4), e3.h.insertBefore(n4, t4);
      }, removeChild: function(n4) {
        this.childNodes.splice(this.childNodes.indexOf(n4) >>> 1, 1), e3.h.removeChild(n4);
      } };
    }
    R(k(Z, { context: e3.context }, n3.__v), e3.v);
  }
  function $2(n3, e3) {
    var r3 = k(Y, { __v: n3, h: e3 });
    return r3.containerInfo = e3, r3;
  }
  function nn(n3, t4, e3) {
    return null == t4.__k && (t4.textContent = ""), R(n3, t4), "function" == typeof e3 && e3(), n3 ? n3.__c : null;
  }
  function tn(n3, t4, e3) {
    return U(n3, t4), "function" == typeof e3 && e3(), n3 ? n3.__c : null;
  }
  function sn(n3) {
    return k.bind(null, n3);
  }
  function hn(n3) {
    return !!n3 && n3.$$typeof === q3;
  }
  function vn(n3) {
    return hn(n3) && n3.type === S;
  }
  function dn(n3) {
    return !!n3 && "string" == typeof n3.displayName && 0 == n3.displayName.indexOf("Memo(");
  }
  function mn(n3) {
    return hn(n3) ? W.apply(null, arguments) : n3;
  }
  function pn(n3) {
    return !!n3.__k && (R(null, n3), true);
  }
  function yn(n3) {
    return n3 && (n3.base || 1 === n3.nodeType && n3) || null;
  }
  var I2, T3, A3, F3, L2, O2, U2, H2, q3, G2, J2, K2, Q2, X2, en, rn, un, on, ln, cn, fn, an, _n, bn, Sn, gn;
  var init_compat_module = __esm({
    "../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/preact/compat/dist/compat.module.js"() {
      init_preact_module();
      init_preact_module();
      init_hooks_module();
      init_hooks_module();
      I2 = _2;
      (M2.prototype = new C()).isPureReactComponent = true, M2.prototype.shouldComponentUpdate = function(n3, t4) {
        return E2(this.props, n3) || E2(this.state, t4);
      };
      T3 = l.__b;
      l.__b = function(n3) {
        n3.type && n3.type.__f && n3.ref && (n3.props.ref = n3.ref, n3.ref = null), T3 && T3(n3);
      };
      A3 = "undefined" != typeof Symbol && Symbol.for && /* @__PURE__ */ Symbol.for("react.forward_ref") || 3911;
      F3 = function(n3, t4) {
        return null == n3 ? null : F(F(n3).map(t4));
      };
      L2 = { map: F3, forEach: F3, count: function(n3) {
        return n3 ? F(n3).length : 0;
      }, only: function(n3) {
        var t4 = F(n3);
        if (1 !== t4.length) throw "Children.only";
        return t4[0];
      }, toArray: F };
      O2 = l.__e;
      l.__e = function(n3, t4, e3, r3) {
        if (n3.then) {
          for (var u4, o4 = t4; o4 = o4.__; ) if ((u4 = o4.__c) && u4.__c) return null == t4.__e && (t4.__e = e3.__e, t4.__k = e3.__k || []), u4.__c(n3, t4);
        }
        O2(n3, t4, e3, r3);
      };
      U2 = l.unmount;
      l.unmount = function(n3) {
        var t4 = n3.__c;
        t4 && (t4.__z = true), t4 && t4.__R && t4.__R(), t4 && 32 & n3.__u && (n3.type = null), U2 && U2(n3);
      }, (P3.prototype = new C()).__c = function(n3, t4) {
        var e3 = t4.__c, r3 = this;
        null == r3.o && (r3.o = []), r3.o.push(e3);
        var u4 = j3(r3.__v), o4 = false, i4 = function() {
          o4 || r3.__z || (o4 = true, e3.__R = null, u4 ? u4(c4) : c4());
        };
        e3.__R = i4;
        var l4 = e3.__P;
        e3.__P = null;
        var c4 = function() {
          if (!--r3.__u) {
            if (r3.state.__a) {
              var n4 = r3.state.__a;
              r3.__v.__k[0] = W2(n4, n4.__c.__P, n4.__c.__O);
            }
            var t5;
            for (r3.setState({ __a: r3.__b = null }); t5 = r3.o.pop(); ) t5.__P = l4, t5.forceUpdate();
          }
        };
        r3.__u++ || 32 & t4.__u || r3.setState({ __a: r3.__b = r3.__v.__k[0] }), n3.then(i4, i4);
      }, P3.prototype.componentWillUnmount = function() {
        this.o = [];
      }, P3.prototype.render = function(n3, e3) {
        if (this.__b) {
          if (this.__v.__k) {
            var r3 = document.createElement("div"), o4 = this.__v.__k[0].__c;
            this.__v.__k[0] = V2(this.__b, r3, o4.__O = o4.__P);
          }
          this.__b = null;
        }
        var i4 = e3.__a && k(S, null, n3.fallback);
        return i4 && (i4.__u &= -33), [k(S, null, e3.__a ? null : n3.children), i4];
      };
      H2 = function(n3, t4, e3) {
        if (++e3[1] === e3[0] && n3.l.delete(t4), n3.props.revealOrder && ("t" !== n3.props.revealOrder[0] || !n3.l.size)) for (e3 = n3.i; e3; ) {
          for (; e3.length > 3; ) e3.pop()();
          if (e3[1] < e3[0]) break;
          n3.i = e3 = e3[2];
        }
      };
      (B3.prototype = new C()).__a = function(n3) {
        var t4 = this, e3 = j3(t4.__v), r3 = t4.l.get(n3);
        return r3[0]++, function(u4) {
          var o4 = function() {
            t4.props.revealOrder ? (r3.push(u4), H2(t4, n3, r3)) : u4();
          };
          e3 ? e3(o4) : o4();
        };
      }, B3.prototype.render = function(n3) {
        this.i = null, this.l = /* @__PURE__ */ new Map();
        var t4 = F(n3.children);
        n3.revealOrder && "b" === n3.revealOrder[0] && t4.reverse();
        for (var e3 = t4.length; e3--; ) this.l.set(t4[e3], this.i = [1, 0, this.i]);
        return n3.children;
      }, B3.prototype.componentDidUpdate = B3.prototype.componentDidMount = function() {
        var n3 = this;
        this.l.forEach(function(t4, e3) {
          H2(n3, e3, t4);
        });
      };
      q3 = "undefined" != typeof Symbol && Symbol.for && /* @__PURE__ */ Symbol.for("react.element") || 60103;
      G2 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
      J2 = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
      K2 = /[A-Z0-9]/g;
      Q2 = "undefined" != typeof document;
      X2 = function(n3) {
        return ("undefined" != typeof Symbol && "symbol" == typeof /* @__PURE__ */ Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n3);
      };
      C.prototype.isReactComponent = true, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t4) {
        Object.defineProperty(C.prototype, t4, { configurable: true, get: function() {
          return this["UNSAFE_" + t4];
        }, set: function(n3) {
          Object.defineProperty(this, t4, { configurable: true, writable: true, value: n3 });
        } });
      });
      en = l.event;
      l.event = function(n3) {
        return en && (n3 = en(n3)), n3.persist = function() {
        }, n3.isPropagationStopped = function() {
          return this.cancelBubble;
        }, n3.isDefaultPrevented = function() {
          return this.defaultPrevented;
        }, n3.nativeEvent = n3;
      };
      un = { configurable: true, get: function() {
        return this.class;
      } };
      on = l.vnode;
      l.vnode = function(n3) {
        "string" == typeof n3.type && (function(n4) {
          var t4 = n4.props, e3 = n4.type, u4 = {}, o4 = -1 == e3.indexOf("-");
          for (var i4 in t4) {
            var l4 = t4[i4];
            if (!("value" === i4 && "defaultValue" in t4 && null == l4 || Q2 && "children" === i4 && "noscript" === e3 || "class" === i4 || "className" === i4)) {
              var c4 = i4.toLowerCase();
              "defaultValue" === i4 && "value" in t4 && null == t4.value ? i4 = "value" : "download" === i4 && true === l4 ? l4 = "" : "translate" === c4 && "no" === l4 ? l4 = false : "o" === c4[0] && "n" === c4[1] ? "ondoubleclick" === c4 ? i4 = "ondblclick" : "onchange" !== c4 || "input" !== e3 && "textarea" !== e3 || X2(t4.type) ? "onfocus" === c4 ? i4 = "onfocusin" : "onblur" === c4 ? i4 = "onfocusout" : J2.test(i4) && (i4 = c4) : c4 = i4 = "oninput" : o4 && G2.test(i4) ? i4 = i4.replace(K2, "-$&").toLowerCase() : null === l4 && (l4 = void 0), "oninput" === c4 && u4[i4 = c4] && (i4 = "oninputCapture"), u4[i4] = l4;
            }
          }
          "select" == e3 && (u4.multiple && Array.isArray(u4.value) && (u4.value = F(t4.children).forEach(function(n5) {
            n5.props.selected = -1 != u4.value.indexOf(n5.props.value);
          })), null != u4.defaultValue && (u4.value = F(t4.children).forEach(function(n5) {
            n5.props.selected = u4.multiple ? -1 != u4.defaultValue.indexOf(n5.props.value) : u4.defaultValue == n5.props.value;
          }))), t4.class && !t4.className ? (u4.class = t4.class, Object.defineProperty(u4, "className", un)) : t4.className && (u4.class = u4.className = t4.className), n4.props = u4;
        })(n3), n3.$$typeof = q3, on && on(n3);
      };
      ln = l.__r;
      l.__r = function(n3) {
        ln && ln(n3), rn = n3.__c;
      };
      cn = l.diffed;
      l.diffed = function(n3) {
        cn && cn(n3);
        var t4 = n3.props, e3 = n3.__e;
        null != e3 && "textarea" === n3.type && "value" in t4 && t4.value !== e3.value && (e3.value = null == t4.value ? "" : t4.value), rn = null;
      };
      fn = { ReactCurrentDispatcher: { current: { readContext: function(n3) {
        return rn.__n[n3.__c].props.value;
      }, useCallback: q2, useContext: x2, useDebugValue: P2, useDeferredValue: w3, useEffect: h2, useId: g2, useImperativeHandle: F2, useInsertionEffect: I2, useLayoutEffect: _2, useMemo: T2, useReducer: y2, useRef: A2, useState: d2, useSyncExternalStore: C3, useTransition: k3 } } };
      an = "18.3.1";
      _n = function(n3, t4) {
        return n3(t4);
      };
      bn = function(n3, t4) {
        var r3 = l.debounceRendering;
        l.debounceRendering = function(n4) {
          return n4();
        };
        var u4 = n3(t4);
        return l.debounceRendering = r3, u4;
      };
      Sn = hn;
      gn = { useState: d2, useId: g2, useReducer: y2, useEffect: h2, useLayoutEffect: _2, useInsertionEffect: I2, useTransition: k3, useDeferredValue: w3, useSyncExternalStore: C3, startTransition: x3, useRef: A2, useImperativeHandle: F2, useMemo: T2, useCallback: q2, useContext: x2, useDebugValue: P2, version: "18.3.1", Children: L2, render: nn, hydrate: tn, unmountComponentAtNode: pn, createPortal: $2, createElement: k, createContext: X, createFactory: sn, cloneElement: mn, createRef: M, Fragment: S, isValidElement: hn, isElement: Sn, isFragment: vn, isMemo: dn, findDOMNode: yn, Component: C, PureComponent: M2, memo: N2, forwardRef: D3, flushSync: bn, unstable_batchedUpdates: _n, StrictMode: S, Suspense: P3, SuspenseList: B3, lazy: z3, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: fn };
    }
  });

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/preact/compat/dist/compat.js
  var require_compat = __commonJS({
    "../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/preact/compat/dist/compat.js"(exports) {
      var n3 = (init_preact_module(), __toCommonJS(preact_module_exports));
      var t4 = (init_hooks_module(), __toCommonJS(hooks_module_exports));
      function e3(n4, t5) {
        for (var e4 in t5) n4[e4] = t5[e4];
        return n4;
      }
      function r3(n4, t5) {
        for (var e4 in n4) if ("__source" !== e4 && !(e4 in t5)) return true;
        for (var r4 in t5) if ("__source" !== r4 && n4[r4] !== t5[r4]) return true;
        return false;
      }
      function u4(n4, e4) {
        var r4 = e4(), u5 = t4.useState({ t: { __: r4, u: e4 } }), i5 = u5[0].t, c5 = u5[1];
        return t4.useLayoutEffect(function() {
          i5.__ = r4, i5.u = e4, o4(i5) && c5({ t: i5 });
        }, [n4, r4, e4]), t4.useEffect(function() {
          return o4(i5) && c5({ t: i5 }), n4(function() {
            o4(i5) && c5({ t: i5 });
          });
        }, [n4]), r4;
      }
      function o4(n4) {
        try {
          return !((t5 = n4.__) === (e4 = n4.u()) && (0 !== t5 || 1 / t5 == 1 / e4) || t5 != t5 && e4 != e4);
        } catch (n5) {
          return true;
        }
        var t5, e4;
      }
      function i4(n4) {
        n4();
      }
      function c4(n4) {
        return n4;
      }
      function l4() {
        return [false, i4];
      }
      var f4 = t4.useLayoutEffect;
      function a4(n4, t5) {
        this.props = n4, this.context = t5;
      }
      function s4(t5, e4) {
        function u5(n4) {
          var t6 = this.props.ref;
          return t6 != n4.ref && t6 && ("function" == typeof t6 ? t6(null) : t6.current = null), e4 ? !e4(this.props, n4) || t6 != n4.ref : r3(this.props, n4);
        }
        function o5(e5) {
          return this.shouldComponentUpdate = u5, n3.createElement(t5, e5);
        }
        return o5.displayName = "Memo(" + (t5.displayName || t5.name) + ")", o5.__f = o5.prototype.isReactComponent = true, o5.type = t5, o5;
      }
      (a4.prototype = new n3.Component()).isPureReactComponent = true, a4.prototype.shouldComponentUpdate = function(n4, t5) {
        return r3(this.props, n4) || r3(this.state, t5);
      };
      var p4 = n3.options.__b;
      n3.options.__b = function(n4) {
        n4.type && n4.type.__f && n4.ref && (n4.props.ref = n4.ref, n4.ref = null), p4 && p4(n4);
      };
      var v3 = "undefined" != typeof Symbol && Symbol.for && /* @__PURE__ */ Symbol.for("react.forward_ref") || 3911;
      function h3(n4) {
        function t5(t6) {
          var r4 = e3({}, t6);
          return delete r4.ref, n4(r4, t6.ref || null);
        }
        return t5.$$typeof = v3, t5.render = n4, t5.prototype.isReactComponent = t5.__f = true, t5.displayName = "ForwardRef(" + (n4.displayName || n4.name) + ")", t5;
      }
      var d3 = function(t5, e4) {
        return null == t5 ? null : n3.toChildArray(n3.toChildArray(t5).map(e4));
      };
      var m3 = { map: d3, forEach: d3, count: function(t5) {
        return t5 ? n3.toChildArray(t5).length : 0;
      }, only: function(t5) {
        var e4 = n3.toChildArray(t5);
        if (1 !== e4.length) throw "Children.only";
        return e4[0];
      }, toArray: n3.toChildArray };
      var x4 = n3.options.__e;
      n3.options.__e = function(n4, t5, e4, r4) {
        if (n4.then) {
          for (var u5, o5 = t5; o5 = o5.__; ) if ((u5 = o5.__c) && u5.__c) return null == t5.__e && (t5.__e = e4.__e, t5.__k = e4.__k || []), u5.__c(n4, t5);
        }
        x4(n4, t5, e4, r4);
      };
      var b3 = n3.options.unmount;
      function y3(n4, t5, r4) {
        return n4 && (n4.__c && n4.__c.__H && (n4.__c.__H.__.forEach(function(n5) {
          "function" == typeof n5.__c && n5.__c();
        }), n4.__c.__H = null), null != (n4 = e3({}, n4)).__c && (n4.__c.__P === r4 && (n4.__c.__P = t5), n4.__c.__e = true, n4.__c = null), n4.__k = n4.__k && n4.__k.map(function(n5) {
          return y3(n5, t5, r4);
        })), n4;
      }
      function _3(n4, t5, e4) {
        return n4 && e4 && (n4.__v = null, n4.__k = n4.__k && n4.__k.map(function(n5) {
          return _3(n5, t5, e4);
        }), n4.__c && n4.__c.__P === t5 && (n4.__e && e4.appendChild(n4.__e), n4.__c.__e = true, n4.__c.__P = e4)), n4;
      }
      function g4() {
        this.__u = 0, this.o = null, this.__b = null;
      }
      function S2(n4) {
        var t5 = n4.__ && n4.__.__c;
        return t5 && t5.__a && t5.__a(n4);
      }
      function E3(t5) {
        var e4, r4, u5, o5 = null;
        function i5(i6) {
          if (e4 || (e4 = t5()).then(function(n4) {
            n4 && (o5 = n4.default || n4), u5 = true;
          }, function(n4) {
            r4 = n4, u5 = true;
          }), r4) throw r4;
          if (!u5) throw e4;
          return o5 ? n3.createElement(o5, i6) : null;
        }
        return i5.displayName = "Lazy", i5.__f = true, i5;
      }
      function C4() {
        this.i = null, this.l = null;
      }
      n3.options.unmount = function(n4) {
        var t5 = n4.__c;
        t5 && (t5.__z = true), t5 && t5.__R && t5.__R(), t5 && 32 & n4.__u && (n4.type = null), b3 && b3(n4);
      }, (g4.prototype = new n3.Component()).__c = function(n4, t5) {
        var e4 = t5.__c, r4 = this;
        null == r4.o && (r4.o = []), r4.o.push(e4);
        var u5 = S2(r4.__v), o5 = false, i5 = function() {
          o5 || r4.__z || (o5 = true, e4.__R = null, u5 ? u5(l5) : l5());
        };
        e4.__R = i5;
        var c5 = e4.__P;
        e4.__P = null;
        var l5 = function() {
          if (!--r4.__u) {
            if (r4.state.__a) {
              var n5 = r4.state.__a;
              r4.__v.__k[0] = _3(n5, n5.__c.__P, n5.__c.__O);
            }
            var t6;
            for (r4.setState({ __a: r4.__b = null }); t6 = r4.o.pop(); ) t6.__P = c5, t6.forceUpdate();
          }
        };
        r4.__u++ || 32 & t5.__u || r4.setState({ __a: r4.__b = r4.__v.__k[0] }), n4.then(i5, i5);
      }, g4.prototype.componentWillUnmount = function() {
        this.o = [];
      }, g4.prototype.render = function(t5, e4) {
        if (this.__b) {
          if (this.__v.__k) {
            var r4 = document.createElement("div"), u5 = this.__v.__k[0].__c;
            this.__v.__k[0] = y3(this.__b, r4, u5.__O = u5.__P);
          }
          this.__b = null;
        }
        var o5 = e4.__a && n3.createElement(n3.Fragment, null, t5.fallback);
        return o5 && (o5.__u &= -33), [n3.createElement(n3.Fragment, null, e4.__a ? null : t5.children), o5];
      };
      var O3 = function(n4, t5, e4) {
        if (++e4[1] === e4[0] && n4.l.delete(t5), n4.props.revealOrder && ("t" !== n4.props.revealOrder[0] || !n4.l.size)) for (e4 = n4.i; e4; ) {
          for (; e4.length > 3; ) e4.pop()();
          if (e4[1] < e4[0]) break;
          n4.i = e4 = e4[2];
        }
      };
      function R3(n4) {
        return this.getChildContext = function() {
          return n4.context;
        }, n4.children;
      }
      function w4(t5) {
        var e4 = this, r4 = t5.p;
        if (e4.componentWillUnmount = function() {
          n3.render(null, e4.v), e4.v = null, e4.p = null;
        }, e4.p && e4.p !== r4 && e4.componentWillUnmount(), !e4.v) {
          for (var u5 = e4.__v; null !== u5 && !u5.__m && null !== u5.__; ) u5 = u5.__;
          e4.p = r4, e4.v = { nodeType: 1, parentNode: r4, childNodes: [], __k: { __m: u5.__m }, contains: function() {
            return true;
          }, namespaceURI: r4.namespaceURI, insertBefore: function(n4, t6) {
            this.childNodes.push(n4), e4.p.insertBefore(n4, t6);
          }, removeChild: function(n4) {
            this.childNodes.splice(this.childNodes.indexOf(n4) >>> 1, 1), e4.p.removeChild(n4);
          } };
        }
        n3.render(n3.createElement(R3, { context: e4.context }, t5.__v), e4.v);
      }
      function j4(t5, e4) {
        var r4 = n3.createElement(w4, { __v: t5, p: e4 });
        return r4.containerInfo = e4, r4;
      }
      (C4.prototype = new n3.Component()).__a = function(n4) {
        var t5 = this, e4 = S2(t5.__v), r4 = t5.l.get(n4);
        return r4[0]++, function(u5) {
          var o5 = function() {
            t5.props.revealOrder ? (r4.push(u5), O3(t5, n4, r4)) : u5();
          };
          e4 ? e4(o5) : o5();
        };
      }, C4.prototype.render = function(t5) {
        this.i = null, this.l = /* @__PURE__ */ new Map();
        var e4 = n3.toChildArray(t5.children);
        t5.revealOrder && "b" === t5.revealOrder[0] && e4.reverse();
        for (var r4 = e4.length; r4--; ) this.l.set(e4[r4], this.i = [1, 0, this.i]);
        return t5.children;
      }, C4.prototype.componentDidUpdate = C4.prototype.componentDidMount = function() {
        var n4 = this;
        this.l.forEach(function(t5, e4) {
          O3(n4, e4, t5);
        });
      };
      var I3 = "undefined" != typeof Symbol && Symbol.for && /* @__PURE__ */ Symbol.for("react.element") || 60103;
      var k4 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
      var M3 = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
      var N3 = /[A-Z0-9]/g;
      var T4 = "undefined" != typeof document;
      var A4 = function(n4) {
        return ("undefined" != typeof Symbol && "symbol" == typeof /* @__PURE__ */ Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n4);
      };
      function D4(t5, e4, r4) {
        return null == e4.__k && (e4.textContent = ""), n3.render(t5, e4), "function" == typeof r4 && r4(), t5 ? t5.__c : null;
      }
      function L3(t5, e4, r4) {
        return n3.hydrate(t5, e4), "function" == typeof r4 && r4(), t5 ? t5.__c : null;
      }
      n3.Component.prototype.isReactComponent = true, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t5) {
        Object.defineProperty(n3.Component.prototype, t5, { configurable: true, get: function() {
          return this["UNSAFE_" + t5];
        }, set: function(n4) {
          Object.defineProperty(this, t5, { configurable: true, writable: true, value: n4 });
        } });
      });
      var U3 = n3.options.event;
      n3.options.event = function(n4) {
        return U3 && (n4 = U3(n4)), n4.persist = function() {
        }, n4.isPropagationStopped = function() {
          return this.cancelBubble;
        }, n4.isDefaultPrevented = function() {
          return this.defaultPrevented;
        }, n4.nativeEvent = n4;
      };
      var F4;
      var V3 = { configurable: true, get: function() {
        return this.class;
      } };
      var W3 = n3.options.vnode;
      n3.options.vnode = function(t5) {
        "string" == typeof t5.type && (function(t6) {
          var e4 = t6.props, r4 = t6.type, u5 = {}, o5 = -1 == r4.indexOf("-");
          for (var i5 in e4) {
            var c5 = e4[i5];
            if (!("value" === i5 && "defaultValue" in e4 && null == c5 || T4 && "children" === i5 && "noscript" === r4 || "class" === i5 || "className" === i5)) {
              var l5 = i5.toLowerCase();
              "defaultValue" === i5 && "value" in e4 && null == e4.value ? i5 = "value" : "download" === i5 && true === c5 ? c5 = "" : "translate" === l5 && "no" === c5 ? c5 = false : "o" === l5[0] && "n" === l5[1] ? "ondoubleclick" === l5 ? i5 = "ondblclick" : "onchange" !== l5 || "input" !== r4 && "textarea" !== r4 || A4(e4.type) ? "onfocus" === l5 ? i5 = "onfocusin" : "onblur" === l5 ? i5 = "onfocusout" : M3.test(i5) && (i5 = l5) : l5 = i5 = "oninput" : o5 && k4.test(i5) ? i5 = i5.replace(N3, "-$&").toLowerCase() : null === c5 && (c5 = void 0), "oninput" === l5 && u5[i5 = l5] && (i5 = "oninputCapture"), u5[i5] = c5;
            }
          }
          "select" == r4 && (u5.multiple && Array.isArray(u5.value) && (u5.value = n3.toChildArray(e4.children).forEach(function(n4) {
            n4.props.selected = -1 != u5.value.indexOf(n4.props.value);
          })), null != u5.defaultValue && (u5.value = n3.toChildArray(e4.children).forEach(function(n4) {
            n4.props.selected = u5.multiple ? -1 != u5.defaultValue.indexOf(n4.props.value) : u5.defaultValue == n4.props.value;
          }))), e4.class && !e4.className ? (u5.class = e4.class, Object.defineProperty(u5, "className", V3)) : e4.className && (u5.class = u5.className = e4.className), t6.props = u5;
        })(t5), t5.$$typeof = I3, W3 && W3(t5);
      };
      var P4 = n3.options.__r;
      n3.options.__r = function(n4) {
        P4 && P4(n4), F4 = n4.__c;
      };
      var z4 = n3.options.diffed;
      n3.options.diffed = function(n4) {
        z4 && z4(n4);
        var t5 = n4.props, e4 = n4.__e;
        null != e4 && "textarea" === n4.type && "value" in t5 && t5.value !== e4.value && (e4.value = null == t5.value ? "" : t5.value), F4 = null;
      };
      var B4 = { ReactCurrentDispatcher: { current: { readContext: function(n4) {
        return F4.__n[n4.__c].props.value;
      }, useCallback: t4.useCallback, useContext: t4.useContext, useDebugValue: t4.useDebugValue, useDeferredValue: c4, useEffect: t4.useEffect, useId: t4.useId, useImperativeHandle: t4.useImperativeHandle, useInsertionEffect: f4, useLayoutEffect: t4.useLayoutEffect, useMemo: t4.useMemo, useReducer: t4.useReducer, useRef: t4.useRef, useState: t4.useState, useSyncExternalStore: u4, useTransition: l4 } } };
      function H3(t5) {
        return n3.createElement.bind(null, t5);
      }
      function q4(n4) {
        return !!n4 && n4.$$typeof === I3;
      }
      function Z2(t5) {
        return q4(t5) && t5.type === n3.Fragment;
      }
      function Y2(n4) {
        return !!n4 && "string" == typeof n4.displayName && 0 == n4.displayName.indexOf("Memo(");
      }
      function $3(t5) {
        return q4(t5) ? n3.cloneElement.apply(null, arguments) : t5;
      }
      function G3(t5) {
        return !!t5.__k && (n3.render(null, t5), true);
      }
      function J3(n4) {
        return n4 && (n4.base || 1 === n4.nodeType && n4) || null;
      }
      var K3 = function(n4, t5) {
        return n4(t5);
      };
      var Q3 = function(t5, e4) {
        var r4 = n3.options.debounceRendering;
        n3.options.debounceRendering = function(n4) {
          return n4();
        };
        var u5 = t5(e4);
        return n3.options.debounceRendering = r4, u5;
      };
      var X3 = q4;
      var nn2 = { useState: t4.useState, useId: t4.useId, useReducer: t4.useReducer, useEffect: t4.useEffect, useLayoutEffect: t4.useLayoutEffect, useInsertionEffect: f4, useTransition: l4, useDeferredValue: c4, useSyncExternalStore: u4, startTransition: i4, useRef: t4.useRef, useImperativeHandle: t4.useImperativeHandle, useMemo: t4.useMemo, useCallback: t4.useCallback, useContext: t4.useContext, useDebugValue: t4.useDebugValue, version: "18.3.1", Children: m3, render: D4, hydrate: L3, unmountComponentAtNode: G3, createPortal: j4, createElement: n3.createElement, createContext: n3.createContext, createFactory: H3, cloneElement: $3, createRef: n3.createRef, Fragment: n3.Fragment, isValidElement: q4, isElement: X3, isFragment: Z2, isMemo: Y2, findDOMNode: J3, Component: n3.Component, PureComponent: a4, memo: s4, forwardRef: h3, flushSync: Q3, unstable_batchedUpdates: K3, StrictMode: n3.Fragment, Suspense: g4, SuspenseList: C4, lazy: E3, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: B4 };
      Object.defineProperty(exports, "Component", { enumerable: true, get: function() {
        return n3.Component;
      } }), Object.defineProperty(exports, "Fragment", { enumerable: true, get: function() {
        return n3.Fragment;
      } }), Object.defineProperty(exports, "StrictMode", { enumerable: true, get: function() {
        return n3.Fragment;
      } }), Object.defineProperty(exports, "createContext", { enumerable: true, get: function() {
        return n3.createContext;
      } }), Object.defineProperty(exports, "createElement", { enumerable: true, get: function() {
        return n3.createElement;
      } }), Object.defineProperty(exports, "createRef", { enumerable: true, get: function() {
        return n3.createRef;
      } }), exports.Children = m3, exports.PureComponent = a4, exports.Suspense = g4, exports.SuspenseList = C4, exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = B4, exports.cloneElement = $3, exports.createFactory = H3, exports.createPortal = j4, exports.default = nn2, exports.findDOMNode = J3, exports.flushSync = Q3, exports.forwardRef = h3, exports.hydrate = L3, exports.isElement = X3, exports.isFragment = Z2, exports.isMemo = Y2, exports.isValidElement = q4, exports.lazy = E3, exports.memo = s4, exports.render = D4, exports.startTransition = i4, exports.unmountComponentAtNode = G3, exports.unstable_batchedUpdates = K3, exports.useDeferredValue = c4, exports.useInsertionEffect = f4, exports.useSyncExternalStore = u4, exports.useTransition = l4, exports.version = "18.3.1", Object.keys(t4).forEach(function(n4) {
        "default" === n4 || exports.hasOwnProperty(n4) || Object.defineProperty(exports, n4, { enumerable: true, get: function() {
          return t4[n4];
        } });
      });
    }
  });

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var jsxRuntime_module_exports = {};
  __export(jsxRuntime_module_exports, {
    Fragment: () => S,
    jsx: () => u3,
    jsxAttr: () => l3,
    jsxDEV: () => u3,
    jsxEscape: () => s3,
    jsxTemplate: () => a3,
    jsxs: () => u3
  });
  function n2(r3) {
    if (0 === r3.length || false === t3.test(r3)) return r3;
    for (var e3 = 0, n3 = 0, o4 = "", f4 = ""; n3 < r3.length; n3++) {
      switch (r3.charCodeAt(n3)) {
        case 34:
          f4 = "&quot;";
          break;
        case 38:
          f4 = "&amp;";
          break;
        case 60:
          f4 = "&lt;";
          break;
        default:
          continue;
      }
      n3 !== e3 && (o4 += r3.slice(e3, n3)), o4 += f4, e3 = n3 + 1;
    }
    return n3 !== e3 && (o4 += r3.slice(e3, n3)), o4;
  }
  function u3(e3, t4, n3, o4, i4, u4) {
    t4 || (t4 = {});
    var a4, c4, p4 = t4;
    if ("ref" in p4) for (c4 in p4 = {}, t4) "ref" == c4 ? a4 = t4[c4] : p4[c4] = t4[c4];
    var l4 = { type: e3, props: p4, key: n3, ref: a4, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f3, __i: -1, __u: 0, __source: i4, __self: u4 };
    if ("function" == typeof e3 && (a4 = e3.defaultProps)) for (c4 in a4) void 0 === p4[c4] && (p4[c4] = a4[c4]);
    return l.vnode && l.vnode(l4), l4;
  }
  function a3(r3) {
    var t4 = u3(S, { tpl: r3, exprs: [].slice.call(arguments, 1) });
    return t4.key = t4.__v, t4;
  }
  function l3(e3, t4) {
    if (l.attr) {
      var f4 = l.attr(e3, t4);
      if ("string" == typeof f4) return f4;
    }
    if (t4 = (function(r3) {
      return null !== r3 && "object" == typeof r3 && "function" == typeof r3.valueOf ? r3.valueOf() : r3;
    })(t4), "ref" === e3 || "key" === e3) return "";
    if ("style" === e3 && "object" == typeof t4) {
      var i4 = "";
      for (var u4 in t4) {
        var a4 = t4[u4];
        if (null != a4 && "" !== a4) {
          var l4 = "-" == u4[0] ? u4 : c3[u4] || (c3[u4] = u4.replace(p3, "-$&").toLowerCase()), s4 = ";";
          "number" != typeof a4 || l4.startsWith("--") || o3.test(l4) || (s4 = "px;"), i4 = i4 + l4 + ":" + a4 + s4;
        }
      }
      return e3 + '="' + n2(i4) + '"';
    }
    return null == t4 || false === t4 || "function" == typeof t4 || "object" == typeof t4 ? "" : true === t4 ? e3 : e3 + '="' + n2("" + t4) + '"';
  }
  function s3(r3) {
    if (null == r3 || "boolean" == typeof r3 || "function" == typeof r3) return null;
    if ("object" == typeof r3) {
      if (void 0 === r3.constructor) return r3;
      if (i3(r3)) {
        for (var e3 = 0; e3 < r3.length; e3++) r3[e3] = s3(r3[e3]);
        return r3;
      }
    }
    return n2("" + r3);
  }
  var t3, o3, f3, i3, c3, p3;
  var init_jsxRuntime_module = __esm({
    "../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js"() {
      init_preact_module();
      init_preact_module();
      t3 = /["&<]/;
      o3 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      f3 = 0;
      i3 = Array.isArray;
      c3 = {};
      p3 = /[A-Z]/g;
    }
  });

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/preact/compat/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/preact/compat/jsx-runtime.js"(exports, module) {
      init_compat_module();
      module.exports = (init_jsxRuntime_module(), __toCommonJS(jsxRuntime_module_exports));
    }
  });

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
  var require_use_sync_external_store_shim_production = __commonJS({
    "../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js"(exports) {
      "use strict";
      var React77 = require_compat();
      function is(x4, y3) {
        return x4 === y3 && (0 !== x4 || 1 / x4 === 1 / y3) || x4 !== x4 && y3 !== y3;
      }
      var objectIs = "function" === typeof Object.is ? Object.is : is;
      var useState14 = React77.useState;
      var useEffect18 = React77.useEffect;
      var useLayoutEffect4 = React77.useLayoutEffect;
      var useDebugValue2 = React77.useDebugValue;
      function useSyncExternalStore$2(subscribe, getSnapshot) {
        var value = getSnapshot(), _useState = useState14({ inst: { value, getSnapshot } }), inst = _useState[0].inst, forceUpdate = _useState[1];
        useLayoutEffect4(
          function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          },
          [subscribe, value, getSnapshot]
        );
        useEffect18(
          function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            return subscribe(function() {
              checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            });
          },
          [subscribe]
        );
        useDebugValue2(value);
        return value;
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch (error) {
          return true;
        }
      }
      function useSyncExternalStore$1(subscribe, getSnapshot) {
        return getSnapshot();
      }
      var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
      exports.useSyncExternalStore = void 0 !== React77.useSyncExternalStore ? React77.useSyncExternalStore : shim;
    }
  });

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/use-sync-external-store/shim/index.js
  var require_shim = __commonJS({
    "../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/use-sync-external-store/shim/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_use_sync_external_store_shim_production();
      } else {
        module.exports = null;
      }
    }
  });

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
  var require_with_selector_production = __commonJS({
    "../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js"(exports) {
      "use strict";
      var React77 = require_compat();
      var shim = require_shim();
      function is(x4, y3) {
        return x4 === y3 && (0 !== x4 || 1 / x4 === 1 / y3) || x4 !== x4 && y3 !== y3;
      }
      var objectIs = "function" === typeof Object.is ? Object.is : is;
      var useSyncExternalStore2 = shim.useSyncExternalStore;
      var useRef29 = React77.useRef;
      var useEffect18 = React77.useEffect;
      var useMemo40 = React77.useMemo;
      var useDebugValue2 = React77.useDebugValue;
      exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
        var instRef = useRef29(null);
        if (null === instRef.current) {
          var inst = { hasValue: false, value: null };
          instRef.current = inst;
        } else inst = instRef.current;
        instRef = useMemo40(
          function() {
            function memoizedSelector(nextSnapshot) {
              if (!hasMemo) {
                hasMemo = true;
                memoizedSnapshot = nextSnapshot;
                nextSnapshot = selector(nextSnapshot);
                if (void 0 !== isEqual && inst.hasValue) {
                  var currentSelection = inst.value;
                  if (isEqual(currentSelection, nextSnapshot))
                    return memoizedSelection = currentSelection;
                }
                return memoizedSelection = nextSnapshot;
              }
              currentSelection = memoizedSelection;
              if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
              var nextSelection = selector(nextSnapshot);
              if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
                return memoizedSnapshot = nextSnapshot, currentSelection;
              memoizedSnapshot = nextSnapshot;
              return memoizedSelection = nextSelection;
            }
            var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
            return [
              function() {
                return memoizedSelector(getSnapshot());
              },
              null === maybeGetServerSnapshot ? void 0 : function() {
                return memoizedSelector(maybeGetServerSnapshot());
              }
            ];
          },
          [getSnapshot, getServerSnapshot, selector, isEqual]
        );
        var value = useSyncExternalStore2(subscribe, instRef[0], instRef[1]);
        useEffect18(
          function() {
            inst.hasValue = true;
            inst.value = value;
          },
          [value]
        );
        useDebugValue2(value);
        return value;
      };
    }
  });

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/use-sync-external-store/shim/with-selector.js
  var require_with_selector = __commonJS({
    "../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/use-sync-external-store/shim/with-selector.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_with_selector_production();
      } else {
        module.exports = null;
      }
    }
  });

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/entry.js
  init_preact_module();
  init_compat_module();

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/index.parts.js
  var index_parts_exports = {};
  __export(index_parts_exports, {
    Arrow: () => MenuArrow,
    Backdrop: () => MenuBackdrop,
    CheckboxItem: () => MenuCheckboxItem,
    CheckboxItemIndicator: () => MenuCheckboxItemIndicator,
    Group: () => MenuGroup,
    GroupLabel: () => MenuGroupLabel,
    Handle: () => MenuHandle,
    Item: () => MenuItem,
    Popup: () => MenuPopup,
    Portal: () => MenuPortal,
    Positioner: () => MenuPositioner,
    RadioGroup: () => MenuRadioGroup,
    RadioItem: () => MenuRadioItem,
    RadioItemIndicator: () => MenuRadioItemIndicator,
    Root: () => MenuRoot,
    Separator: () => Separator,
    SubmenuRoot: () => MenuSubmenuRoot,
    SubmenuTrigger: () => MenuSubmenuTrigger,
    Trigger: () => MenuTrigger,
    createHandle: () => createMenuHandle
  });

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/arrow/MenuArrow.js
  var React7 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/formatErrorMessage.js
  function formatErrorMessage(code, ...args) {
    const url = new URL(`https://base-ui.com/production-error/${code}`);
    args.forEach((arg) => url.searchParams.append("args[]", arg));
    return `Base UI error #${code}; visit ${url} for the full message.`;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/positioner/MenuPositionerContext.js
  var React = __toESM(require_compat(), 1);
  var MenuPositionerContext = /* @__PURE__ */ React.createContext(void 0);
  if (false) MenuPositionerContext.displayName = "MenuPositionerContext";
  function useMenuPositionerContext(optional) {
    const context = React.useContext(MenuPositionerContext);
    if (context === void 0 && !optional) {
      throw new Error(false ? "Base UI: MenuPositionerContext is missing. MenuPositioner parts must be placed within <Menu.Positioner>." : formatErrorMessage(33));
    }
    return context;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/root/MenuRootContext.js
  var React2 = __toESM(require_compat(), 1);
  var MenuRootContext = /* @__PURE__ */ React2.createContext(void 0);
  if (false) MenuRootContext.displayName = "MenuRootContext";
  function useMenuRootContext(optional) {
    const context = React2.useContext(MenuRootContext);
    if (context === void 0 && !optional) {
      throw new Error(false ? "Base UI: MenuRootContext is missing. Menu parts must be placed within <Menu.Root>." : formatErrorMessage(36));
    }
    return context;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js
  var React6 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/useRefWithInit.js
  var React3 = __toESM(require_compat(), 1);
  var UNINITIALIZED = {};
  function useRefWithInit(init, initArg) {
    const ref = React3.useRef(UNINITIALIZED);
    if (ref.current === UNINITIALIZED) {
      ref.current = init(initArg);
    }
    return ref;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/useMergedRefs.js
  function useMergedRefs(a4, b3, c4, d3) {
    const forkRef = useRefWithInit(createForkRef).current;
    if (didChange(forkRef, a4, b3, c4, d3)) {
      update(forkRef, [a4, b3, c4, d3]);
    }
    return forkRef.callback;
  }
  function useMergedRefsN(refs) {
    const forkRef = useRefWithInit(createForkRef).current;
    if (didChangeN(forkRef, refs)) {
      update(forkRef, refs);
    }
    return forkRef.callback;
  }
  function createForkRef() {
    return {
      callback: null,
      cleanup: null,
      refs: []
    };
  }
  function didChange(forkRef, a4, b3, c4, d3) {
    return forkRef.refs[0] !== a4 || forkRef.refs[1] !== b3 || forkRef.refs[2] !== c4 || forkRef.refs[3] !== d3;
  }
  function didChangeN(forkRef, newRefs) {
    return forkRef.refs.length !== newRefs.length || forkRef.refs.some((ref, index2) => ref !== newRefs[index2]);
  }
  function update(forkRef, refs) {
    forkRef.refs = refs;
    if (refs.every((ref) => ref == null)) {
      forkRef.callback = null;
      return;
    }
    forkRef.callback = (instance) => {
      if (forkRef.cleanup) {
        forkRef.cleanup();
        forkRef.cleanup = null;
      }
      if (instance != null) {
        const cleanupCallbacks = Array(refs.length).fill(null);
        for (let i4 = 0; i4 < refs.length; i4 += 1) {
          const ref = refs[i4];
          if (ref == null) {
            continue;
          }
          switch (typeof ref) {
            case "function": {
              const refCleanup = ref(instance);
              if (typeof refCleanup === "function") {
                cleanupCallbacks[i4] = refCleanup;
              }
              break;
            }
            case "object": {
              ref.current = instance;
              break;
            }
            default:
          }
        }
        forkRef.cleanup = () => {
          for (let i4 = 0; i4 < refs.length; i4 += 1) {
            const ref = refs[i4];
            if (ref == null) {
              continue;
            }
            switch (typeof ref) {
              case "function": {
                const cleanupCallback = cleanupCallbacks[i4];
                if (typeof cleanupCallback === "function") {
                  cleanupCallback();
                } else {
                  ref(null);
                }
                break;
              }
              case "object": {
                ref.current = null;
                break;
              }
              default:
            }
          }
        };
      }
    };
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/getReactElementRef.js
  var React5 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/reactVersion.js
  var React4 = __toESM(require_compat(), 1);
  var majorVersion = parseInt(React4.version, 10);
  function isReactVersionAtLeast(reactVersionToCheck) {
    return majorVersion >= reactVersionToCheck;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/getReactElementRef.js
  function getReactElementRef(element) {
    if (!/* @__PURE__ */ React5.isValidElement(element)) {
      return null;
    }
    const reactElement = element;
    const propsWithRef = reactElement.props;
    return (isReactVersionAtLeast(19) ? propsWithRef?.ref : reactElement.ref) ?? null;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/mergeObjects.js
  function mergeObjects(a4, b3) {
    if (a4 && !b3) {
      return a4;
    }
    if (!a4 && b3) {
      return b3;
    }
    if (a4 || b3) {
      return {
        ...a4,
        ...b3
      };
    }
    return void 0;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/getStateAttributesProps.js
  function getStateAttributesProps(state, customMapping) {
    const props = {};
    for (const key in state) {
      const value = state[key];
      if (customMapping?.hasOwnProperty(key)) {
        const customProps = customMapping[key](value);
        if (customProps != null) {
          Object.assign(props, customProps);
        }
        continue;
      }
      if (value === true) {
        props[`data-${key.toLowerCase()}`] = "";
      } else if (value) {
        props[`data-${key.toLowerCase()}`] = value.toString();
      }
    }
    return props;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/resolveClassName.js
  function resolveClassName(className, state) {
    return typeof className === "function" ? className(state) : className;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/resolveStyle.js
  function resolveStyle(style, state) {
    return typeof style === "function" ? style(state) : style;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/merge-props/mergeProps.js
  var EMPTY_PROPS = {};
  function mergeProps(a4, b3, c4, d3, e3) {
    let merged = {
      ...resolvePropsGetter(a4, EMPTY_PROPS)
    };
    if (b3) {
      merged = mergeOne(merged, b3);
    }
    if (c4) {
      merged = mergeOne(merged, c4);
    }
    if (d3) {
      merged = mergeOne(merged, d3);
    }
    if (e3) {
      merged = mergeOne(merged, e3);
    }
    return merged;
  }
  function mergePropsN(props) {
    if (props.length === 0) {
      return EMPTY_PROPS;
    }
    if (props.length === 1) {
      return resolvePropsGetter(props[0], EMPTY_PROPS);
    }
    let merged = {
      ...resolvePropsGetter(props[0], EMPTY_PROPS)
    };
    for (let i4 = 1; i4 < props.length; i4 += 1) {
      merged = mergeOne(merged, props[i4]);
    }
    return merged;
  }
  function mergeOne(merged, inputProps) {
    if (isPropsGetter(inputProps)) {
      return inputProps(merged);
    }
    return mutablyMergeInto(merged, inputProps);
  }
  function mutablyMergeInto(mergedProps, externalProps) {
    if (!externalProps) {
      return mergedProps;
    }
    for (const propName in externalProps) {
      const externalPropValue = externalProps[propName];
      switch (propName) {
        case "style": {
          mergedProps[propName] = mergeObjects(mergedProps.style, externalPropValue);
          break;
        }
        case "className": {
          mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue);
          break;
        }
        default: {
          if (isEventHandler(propName, externalPropValue)) {
            mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue);
          } else {
            mergedProps[propName] = externalPropValue;
          }
        }
      }
    }
    return mergedProps;
  }
  function isEventHandler(key, value) {
    const code0 = key.charCodeAt(0);
    const code1 = key.charCodeAt(1);
    const code2 = key.charCodeAt(2);
    return code0 === 111 && code1 === 110 && code2 >= 65 && code2 <= 90 && (typeof value === "function" || typeof value === "undefined");
  }
  function isPropsGetter(inputProps) {
    return typeof inputProps === "function";
  }
  function resolvePropsGetter(inputProps, previousProps) {
    if (isPropsGetter(inputProps)) {
      return inputProps(previousProps);
    }
    return inputProps ?? EMPTY_PROPS;
  }
  function mergeEventHandlers(ourHandler, theirHandler) {
    if (!theirHandler) {
      return ourHandler;
    }
    if (!ourHandler) {
      return theirHandler;
    }
    return (event) => {
      if (isSyntheticEvent(event)) {
        const baseUIEvent = event;
        makeEventPreventable(baseUIEvent);
        const result2 = theirHandler(baseUIEvent);
        if (!baseUIEvent.baseUIHandlerPrevented) {
          ourHandler?.(baseUIEvent);
        }
        return result2;
      }
      const result = theirHandler(event);
      ourHandler?.(event);
      return result;
    };
  }
  function makeEventPreventable(event) {
    event.preventBaseUIHandler = () => {
      event.baseUIHandlerPrevented = true;
    };
    return event;
  }
  function mergeClassNames(ourClassName, theirClassName) {
    if (theirClassName) {
      if (ourClassName) {
        return theirClassName + " " + ourClassName;
      }
      return theirClassName;
    }
    return ourClassName;
  }
  function isSyntheticEvent(event) {
    return event != null && typeof event === "object" && "nativeEvent" in event;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/empty.js
  function NOOP() {
  }
  var EMPTY_ARRAY = Object.freeze([]);
  var EMPTY_OBJECT = Object.freeze({});

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/constants.js
  var TYPEAHEAD_RESET_MS = 500;
  var PATIENT_CLICK_THRESHOLD = 500;
  var DISABLED_TRANSITIONS_STYLE = {
    style: {
      transition: "none"
    }
  };
  var CLICK_TRIGGER_IDENTIFIER = "data-base-ui-click-trigger";
  var DROPDOWN_COLLISION_AVOIDANCE = {
    fallbackAxisSide: "none"
  };
  var ownerVisuallyHidden = {
    clipPath: "inset(50%)",
    position: "fixed",
    top: 0,
    left: 0
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js
  var import_react = __toESM(require_compat(), 1);
  function useRenderElement(element, componentProps, params = {}) {
    const renderProp = componentProps.render;
    const outProps = useRenderElementProps(componentProps, params);
    if (params.enabled === false) {
      return null;
    }
    const state = params.state ?? EMPTY_OBJECT;
    return evaluateRenderProp(element, renderProp, outProps, state);
  }
  function useRenderElementProps(componentProps, params = {}) {
    const {
      className: classNameProp,
      style: styleProp,
      render: renderProp
    } = componentProps;
    const {
      state = EMPTY_OBJECT,
      ref,
      props,
      stateAttributesMapping: stateAttributesMapping3,
      enabled = true
    } = params;
    const className = enabled ? resolveClassName(classNameProp, state) : void 0;
    const style = enabled ? resolveStyle(styleProp, state) : void 0;
    const stateProps = enabled ? getStateAttributesProps(state, stateAttributesMapping3) : EMPTY_OBJECT;
    const outProps = enabled ? mergeObjects(stateProps, Array.isArray(props) ? mergePropsN(props) : props) ?? EMPTY_OBJECT : EMPTY_OBJECT;
    if (typeof document !== "undefined") {
      if (!enabled) {
        useMergedRefs(null, null);
      } else if (Array.isArray(ref)) {
        outProps.ref = useMergedRefsN([outProps.ref, getReactElementRef(renderProp), ...ref]);
      } else {
        outProps.ref = useMergedRefs(outProps.ref, getReactElementRef(renderProp), ref);
      }
    }
    if (!enabled) {
      return EMPTY_OBJECT;
    }
    if (className !== void 0) {
      outProps.className = mergeClassNames(outProps.className, className);
    }
    if (style !== void 0) {
      outProps.style = mergeObjects(outProps.style, style);
    }
    return outProps;
  }
  function evaluateRenderProp(element, render, props, state) {
    if (render) {
      if (typeof render === "function") {
        return render(props, state);
      }
      const mergedProps = mergeProps(props, render.props);
      mergedProps.ref = props.ref;
      return /* @__PURE__ */ React6.cloneElement(render, mergedProps);
    }
    if (element) {
      if (typeof element === "string") {
        return renderTag(element, props);
      }
    }
    throw new Error(false ? "Base UI: Render element or function are not defined." : formatErrorMessage(8));
  }
  function renderTag(Tag, props) {
    if (Tag === "button") {
      return /* @__PURE__ */ (0, import_react.createElement)("button", {
        type: "button",
        ...props,
        key: props.key
      });
    }
    if (Tag === "img") {
      return /* @__PURE__ */ (0, import_react.createElement)("img", {
        alt: "",
        ...props,
        key: props.key
      });
    }
    return /* @__PURE__ */ React6.createElement(Tag, props);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/stateAttributesMapping.js
  var TransitionStatusDataAttributes = /* @__PURE__ */ (function(TransitionStatusDataAttributes2) {
    TransitionStatusDataAttributes2["startingStyle"] = "data-starting-style";
    TransitionStatusDataAttributes2["endingStyle"] = "data-ending-style";
    return TransitionStatusDataAttributes2;
  })({});
  var STARTING_HOOK = {
    [TransitionStatusDataAttributes.startingStyle]: ""
  };
  var ENDING_HOOK = {
    [TransitionStatusDataAttributes.endingStyle]: ""
  };
  var transitionStatusMapping = {
    transitionStatus(value) {
      if (value === "starting") {
        return STARTING_HOOK;
      }
      if (value === "ending") {
        return ENDING_HOOK;
      }
      return null;
    }
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js
  var CommonPopupDataAttributes = (function(CommonPopupDataAttributes2) {
    CommonPopupDataAttributes2["open"] = "data-open";
    CommonPopupDataAttributes2["closed"] = "data-closed";
    CommonPopupDataAttributes2[CommonPopupDataAttributes2["startingStyle"] = TransitionStatusDataAttributes.startingStyle] = "startingStyle";
    CommonPopupDataAttributes2[CommonPopupDataAttributes2["endingStyle"] = TransitionStatusDataAttributes.endingStyle] = "endingStyle";
    CommonPopupDataAttributes2["anchorHidden"] = "data-anchor-hidden";
    return CommonPopupDataAttributes2;
  })({});
  var CommonTriggerDataAttributes = /* @__PURE__ */ (function(CommonTriggerDataAttributes2) {
    CommonTriggerDataAttributes2["popupOpen"] = "data-popup-open";
    CommonTriggerDataAttributes2["pressed"] = "data-pressed";
    return CommonTriggerDataAttributes2;
  })({});
  var TRIGGER_HOOK = {
    [CommonTriggerDataAttributes.popupOpen]: ""
  };
  var PRESSABLE_TRIGGER_HOOK = {
    [CommonTriggerDataAttributes.popupOpen]: "",
    [CommonTriggerDataAttributes.pressed]: ""
  };
  var POPUP_OPEN_HOOK = {
    [CommonPopupDataAttributes.open]: ""
  };
  var POPUP_CLOSED_HOOK = {
    [CommonPopupDataAttributes.closed]: ""
  };
  var ANCHOR_HIDDEN_HOOK = {
    [CommonPopupDataAttributes.anchorHidden]: ""
  };
  var triggerOpenStateMapping = {
    open(value) {
      if (value) {
        return TRIGGER_HOOK;
      }
      return null;
    }
  };
  var pressableTriggerOpenStateMapping = {
    open(value) {
      if (value) {
        return PRESSABLE_TRIGGER_HOOK;
      }
      return null;
    }
  };
  var popupStateMapping = {
    open(value) {
      if (value) {
        return POPUP_OPEN_HOOK;
      }
      return POPUP_CLOSED_HOOK;
    },
    anchorHidden(value) {
      if (value) {
        return ANCHOR_HIDDEN_HOOK;
      }
      return null;
    }
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/arrow/MenuArrow.js
  var MenuArrow = /* @__PURE__ */ React7.forwardRef(function MenuArrow2(componentProps, forwardedRef) {
    const {
      className,
      render,
      ...elementProps
    } = componentProps;
    const {
      store
    } = useMenuRootContext();
    const {
      arrowRef,
      side,
      align,
      arrowUncentered,
      arrowStyles
    } = useMenuPositionerContext();
    const open = store.useState("open");
    const state = React7.useMemo(() => ({
      open,
      side,
      align,
      uncentered: arrowUncentered
    }), [open, side, align, arrowUncentered]);
    return useRenderElement("div", componentProps, {
      ref: [arrowRef, forwardedRef],
      stateAttributesMapping: popupStateMapping,
      state,
      props: {
        style: arrowStyles,
        "aria-hidden": true,
        ...elementProps
      }
    });
  });
  if (false) MenuArrow.displayName = "MenuArrow";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/backdrop/MenuBackdrop.js
  var React9 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/context-menu/root/ContextMenuRootContext.js
  var React8 = __toESM(require_compat(), 1);
  var ContextMenuRootContext = /* @__PURE__ */ React8.createContext(void 0);
  if (false) ContextMenuRootContext.displayName = "ContextMenuRootContext";
  function useContextMenuRootContext(optional = true) {
    const context = React8.useContext(ContextMenuRootContext);
    if (context === void 0 && !optional) {
      throw new Error(false ? "Base UI: ContextMenuRootContext is missing. ContextMenu parts must be placed within <ContextMenu.Root>." : formatErrorMessage(25));
    }
    return context;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/reason-parts.js
  var reason_parts_exports = {};
  __export(reason_parts_exports, {
    cancelOpen: () => cancelOpen,
    chipRemovePress: () => chipRemovePress,
    clearPress: () => clearPress,
    closePress: () => closePress,
    decrementPress: () => decrementPress,
    disabled: () => disabled,
    drag: () => drag,
    escapeKey: () => escapeKey,
    focusOut: () => focusOut,
    imperativeAction: () => imperativeAction,
    incrementPress: () => incrementPress,
    inputBlur: () => inputBlur,
    inputChange: () => inputChange,
    inputClear: () => inputClear,
    inputPaste: () => inputPaste,
    itemPress: () => itemPress,
    keyboard: () => keyboard,
    linkPress: () => linkPress,
    listNavigation: () => listNavigation,
    none: () => none,
    outsidePress: () => outsidePress,
    pointer: () => pointer,
    scrub: () => scrub,
    siblingOpen: () => siblingOpen,
    trackPress: () => trackPress,
    triggerFocus: () => triggerFocus,
    triggerHover: () => triggerHover,
    triggerPress: () => triggerPress,
    wheel: () => wheel,
    windowResize: () => windowResize
  });
  var none = "none";
  var triggerPress = "trigger-press";
  var triggerHover = "trigger-hover";
  var triggerFocus = "trigger-focus";
  var outsidePress = "outside-press";
  var itemPress = "item-press";
  var closePress = "close-press";
  var linkPress = "link-press";
  var clearPress = "clear-press";
  var chipRemovePress = "chip-remove-press";
  var trackPress = "track-press";
  var incrementPress = "increment-press";
  var decrementPress = "decrement-press";
  var inputChange = "input-change";
  var inputClear = "input-clear";
  var inputBlur = "input-blur";
  var inputPaste = "input-paste";
  var focusOut = "focus-out";
  var escapeKey = "escape-key";
  var listNavigation = "list-navigation";
  var keyboard = "keyboard";
  var pointer = "pointer";
  var drag = "drag";
  var wheel = "wheel";
  var scrub = "scrub";
  var cancelOpen = "cancel-open";
  var siblingOpen = "sibling-open";
  var disabled = "disabled";
  var imperativeAction = "imperative-action";
  var windowResize = "window-resize";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/backdrop/MenuBackdrop.js
  var stateAttributesMapping = {
    ...popupStateMapping,
    ...transitionStatusMapping
  };
  var MenuBackdrop = /* @__PURE__ */ React9.forwardRef(function MenuBackdrop2(componentProps, forwardedRef) {
    const {
      className,
      render,
      ...elementProps
    } = componentProps;
    const {
      store
    } = useMenuRootContext();
    const open = store.useState("open");
    const mounted = store.useState("mounted");
    const transitionStatus = store.useState("transitionStatus");
    const lastOpenChangeReason = store.useState("lastOpenChangeReason");
    const contextMenuContext = useContextMenuRootContext();
    const state = React9.useMemo(() => ({
      open,
      transitionStatus
    }), [open, transitionStatus]);
    return useRenderElement("div", componentProps, {
      ref: contextMenuContext?.backdropRef ? [forwardedRef, contextMenuContext.backdropRef] : forwardedRef,
      state,
      stateAttributesMapping,
      props: [{
        role: "presentation",
        hidden: !mounted,
        style: {
          pointerEvents: lastOpenChangeReason === reason_parts_exports.triggerHover ? "none" : void 0,
          userSelect: "none",
          WebkitUserSelect: "none"
        }
      }, elementProps]
    });
  });
  if (false) MenuBackdrop.displayName = "MenuBackdrop";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/checkbox-item/MenuCheckboxItem.js
  var React22 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/useStableCallback.js
  var React10 = __toESM(require_compat(), 1);
  var useInsertionEffect = React10[`useInsertionEffect${Math.random().toFixed(1)}`.slice(0, -3)];
  var useSafeInsertionEffect = (
    // React 17 doesn't have useInsertionEffect.
    useInsertionEffect && // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
    useInsertionEffect !== React10.useLayoutEffect ? useInsertionEffect : (fn2) => fn2()
  );
  function useStableCallback(callback) {
    const stable = useRefWithInit(createStableCallback).current;
    stable.next = callback;
    useSafeInsertionEffect(stable.effect);
    return stable.trampoline;
  }
  function createStableCallback() {
    const stable = {
      next: void 0,
      callback: assertNotCalled,
      trampoline: (...args) => stable.callback?.(...args),
      effect: () => {
        stable.callback = stable.next;
      }
    };
    return stable;
  }
  function assertNotCalled() {
    if (false) {
      throw new Error("Base UI: Cannot call an event handler while rendering.");
    }
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/useControlled.js
  var React11 = __toESM(require_compat(), 1);
  function useControlled({
    controlled,
    default: defaultProp,
    name,
    state = "value"
  }) {
    const {
      current: isControlled
    } = React11.useRef(controlled !== void 0);
    const [valueState, setValue] = React11.useState(defaultProp);
    const value = isControlled ? controlled : valueState;
    if (false) {
      React11.useEffect(() => {
        if (isControlled !== (controlled !== void 0)) {
          console.error([`Base UI: A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join("\n"));
        }
      }, [state, name, controlled]);
      const {
        current: defaultValue
      } = React11.useRef(defaultProp);
      React11.useEffect(() => {
        if (!isControlled && JSON.stringify(defaultValue) !== JSON.stringify(defaultProp)) {
          console.error([`Base UI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join("\n"));
        }
      }, [JSON.stringify(defaultProp)]);
    }
    const setValueIfUncontrolled = React11.useCallback((newValue) => {
      if (!isControlled) {
        setValue(newValue);
      }
    }, []);
    return [value, setValueIfUncontrolled];
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/checkbox-item/MenuCheckboxItemContext.js
  var React12 = __toESM(require_compat(), 1);
  var MenuCheckboxItemContext = /* @__PURE__ */ React12.createContext(void 0);
  if (false) MenuCheckboxItemContext.displayName = "MenuCheckboxItemContext";
  function useMenuCheckboxItemContext() {
    const context = React12.useContext(MenuCheckboxItemContext);
    if (context === void 0) {
      throw new Error(false ? "Base UI: MenuCheckboxItemContext is missing. MenuCheckboxItem parts must be placed within <Menu.CheckboxItem>." : formatErrorMessage(30));
    }
    return context;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/item/useMenuItem.js
  var React17 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/use-button/useButton.js
  var React16 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
  function hasWindow() {
    return typeof window !== "undefined";
  }
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || "").toLowerCase();
    }
    return "#document";
  }
  function getWindow(node) {
    var _node$ownerDocument;
    return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
  }
  function isNode(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Node || value instanceof getWindow(value).Node;
  }
  function isElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Element || value instanceof getWindow(value).Element;
  }
  function isHTMLElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
  }
  function isShadowRoot(value) {
    if (!hasWindow() || typeof ShadowRoot === "undefined") {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
  }
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle2(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
  }
  function isTableElement(element) {
    return /^(table|td|th)$/.test(getNodeName(element));
  }
  function isTopLayer(element) {
    try {
      if (element.matches(":popover-open")) {
        return true;
      }
    } catch (_e) {
    }
    try {
      return element.matches(":modal");
    } catch (_e) {
      return false;
    }
  }
  var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
  var containRe = /paint|layout|strict|content/;
  var isNotNone = (value) => !!value && value !== "none";
  var isWebKitValue;
  function isContainingBlock(elementOrCss) {
    const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
    return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else if (isTopLayer(currentNode)) {
        return null;
      }
      currentNode = getParentNode(currentNode);
    }
    return null;
  }
  function isWebKit() {
    if (isWebKitValue == null) {
      isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
    }
    return isWebKitValue;
  }
  function isLastTraversableNode(node) {
    return /^(html|body|#document)$/.test(getNodeName(node));
  }
  function getComputedStyle2(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.scrollX,
      scrollTop: element.scrollY
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === "html") {
      return node;
    }
    const result = (
      // Step into the shadow DOM of the parent of a slotted node.
      node.assignedSlot || // DOM Element detected.
      node.parentNode || // ShadowRoot detected.
      isShadowRoot(node) && node.host || // Fallback.
      getDocumentElement(node)
    );
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return (node.ownerDocument || node).body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
      list = [];
    }
    if (traverseIframes === void 0) {
      traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      const frameElement = getFrameElement(win);
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
    } else {
      return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
    }
  }
  function getFrameElement(win) {
    return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js
  var React13 = __toESM(require_compat(), 1);
  var noop = () => {
  };
  var useIsoLayoutEffect = typeof document !== "undefined" ? React13.useLayoutEffect : noop;

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/composite/root/CompositeRootContext.js
  var React14 = __toESM(require_compat(), 1);
  var CompositeRootContext = /* @__PURE__ */ React14.createContext(void 0);
  if (false) CompositeRootContext.displayName = "CompositeRootContext";
  function useCompositeRootContext(optional = false) {
    const context = React14.useContext(CompositeRootContext);
    if (context === void 0 && !optional) {
      throw new Error(false ? "Base UI: CompositeRootContext is missing. Composite parts must be placed within <Composite.Root>." : formatErrorMessage(16));
    }
    return context;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/useFocusableWhenDisabled.js
  var React15 = __toESM(require_compat(), 1);
  function useFocusableWhenDisabled(parameters) {
    const {
      focusableWhenDisabled,
      disabled: disabled2,
      composite = false,
      tabIndex: tabIndexProp = 0,
      isNativeButton
    } = parameters;
    const isFocusableComposite = composite && focusableWhenDisabled !== false;
    const isNonFocusableComposite = composite && focusableWhenDisabled === false;
    const props = React15.useMemo(() => {
      const additionalProps = {
        // allow Tabbing away from focusableWhenDisabled elements
        onKeyDown(event) {
          if (disabled2 && focusableWhenDisabled && event.key !== "Tab") {
            event.preventDefault();
          }
        }
      };
      if (!composite) {
        additionalProps.tabIndex = tabIndexProp;
        if (!isNativeButton && disabled2) {
          additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
        }
      }
      if (isNativeButton && (focusableWhenDisabled || isFocusableComposite) || !isNativeButton && disabled2) {
        additionalProps["aria-disabled"] = disabled2;
      }
      if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) {
        additionalProps.disabled = disabled2;
      }
      return additionalProps;
    }, [composite, disabled2, focusableWhenDisabled, isFocusableComposite, isNonFocusableComposite, isNativeButton, tabIndexProp]);
    return {
      props
    };
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/use-button/useButton.js
  function useButton(parameters = {}) {
    const {
      disabled: disabled2 = false,
      focusableWhenDisabled,
      tabIndex = 0,
      native: isNativeButton = true
    } = parameters;
    const elementRef = React16.useRef(null);
    const isCompositeItem = useCompositeRootContext(true) !== void 0;
    const isValidLink = useStableCallback(() => {
      const element = elementRef.current;
      return Boolean(element?.tagName === "A" && element?.href);
    });
    const {
      props: focusableWhenDisabledProps
    } = useFocusableWhenDisabled({
      focusableWhenDisabled,
      disabled: disabled2,
      composite: isCompositeItem,
      tabIndex,
      isNativeButton
    });
    if (false) {
      React16.useEffect(() => {
        if (!elementRef.current) {
          return;
        }
        const isButtonTag = elementRef.current.tagName === "BUTTON";
        if (isNativeButton) {
          if (!isButtonTag) {
            error("A component that acts as a button was not rendered as a native <button>, which does not match the default. Ensure that the element passed to the `render` prop of the component is a real <button>, or set the `nativeButton` prop on the component to `false`.");
          }
        } else if (isButtonTag) {
          error("A component that acts as a button was rendered as a native <button>, which does not match the default. Ensure that the element passed to the `render` prop of the component is not a real <button>, or set the `nativeButton` prop on the component to `true`.");
        }
      }, [isNativeButton]);
    }
    const updateDisabled = React16.useCallback(() => {
      const element = elementRef.current;
      if (!isButtonElement(element)) {
        return;
      }
      if (isCompositeItem && disabled2 && focusableWhenDisabledProps.disabled === void 0 && element.disabled) {
        element.disabled = false;
      }
    }, [disabled2, focusableWhenDisabledProps.disabled, isCompositeItem]);
    useIsoLayoutEffect(updateDisabled, [updateDisabled]);
    const getButtonProps = React16.useCallback((externalProps = {}) => {
      const {
        onClick: externalOnClick,
        onMouseDown: externalOnMouseDown,
        onKeyUp: externalOnKeyUp,
        onKeyDown: externalOnKeyDown,
        onPointerDown: externalOnPointerDown,
        ...otherExternalProps
      } = externalProps;
      const type = isNativeButton ? "button" : void 0;
      return mergeProps({
        type,
        onClick(event) {
          if (disabled2) {
            event.preventDefault();
            return;
          }
          externalOnClick?.(event);
        },
        onMouseDown(event) {
          if (!disabled2) {
            externalOnMouseDown?.(event);
          }
        },
        onKeyDown(event) {
          if (!disabled2) {
            makeEventPreventable(event);
            externalOnKeyDown?.(event);
          }
          if (event.baseUIHandlerPrevented) {
            return;
          }
          const shouldClick = event.target === event.currentTarget && !isNativeButton && !isValidLink() && !disabled2;
          const isEnterKey = event.key === "Enter";
          const isSpaceKey = event.key === " ";
          if (shouldClick) {
            if (isSpaceKey || isEnterKey) {
              event.preventDefault();
            }
            if (isEnterKey) {
              externalOnClick?.(event);
            }
          }
        },
        onKeyUp(event) {
          if (!disabled2) {
            makeEventPreventable(event);
            externalOnKeyUp?.(event);
          }
          if (event.baseUIHandlerPrevented) {
            return;
          }
          if (event.target === event.currentTarget && !isNativeButton && !disabled2 && event.key === " ") {
            externalOnClick?.(event);
          }
        },
        onPointerDown(event) {
          if (disabled2) {
            event.preventDefault();
            return;
          }
          externalOnPointerDown?.(event);
        }
      }, !isNativeButton ? {
        role: "button"
      } : void 0, focusableWhenDisabledProps, otherExternalProps);
    }, [disabled2, focusableWhenDisabledProps, isNativeButton, isValidLink]);
    const buttonRef = useStableCallback((element) => {
      elementRef.current = element;
      updateDisabled();
    });
    return {
      getButtonProps,
      buttonRef
    };
  }
  function isButtonElement(elem) {
    return isHTMLElement(elem) && elem.tagName === "BUTTON";
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/item/useMenuItem.js
  var REGULAR_ITEM = {
    type: "regular-item"
  };
  function useMenuItem(params) {
    const {
      closeOnClick,
      disabled: disabled2 = false,
      highlighted,
      id,
      store,
      nativeButton,
      itemMetadata,
      nodeId
    } = params;
    const itemRef = React17.useRef(null);
    const contextMenuContext = useContextMenuRootContext(true);
    const isContextMenu = contextMenuContext !== void 0;
    const {
      events: menuEvents
    } = store.useState("floatingTreeRoot");
    const {
      getButtonProps,
      buttonRef
    } = useButton({
      disabled: disabled2,
      focusableWhenDisabled: true,
      native: nativeButton
    });
    const getItemProps = React17.useCallback((externalProps) => {
      return mergeProps({
        id,
        role: "menuitem",
        tabIndex: highlighted ? 0 : -1,
        onMouseMove(event) {
          if (!nodeId) {
            return;
          }
          menuEvents.emit("itemhover", {
            nodeId,
            target: event.currentTarget
          });
        },
        onMouseEnter() {
          if (itemMetadata.type !== "submenu-trigger") {
            return;
          }
          itemMetadata.setActive();
        },
        onKeyUp(event) {
          if (event.key === " " && store.context.typingRef.current) {
            event.preventBaseUIHandler();
          }
        },
        onClick(event) {
          if (closeOnClick) {
            menuEvents.emit("close", {
              domEvent: event,
              reason: reason_parts_exports.itemPress
            });
          }
        },
        onMouseUp(event) {
          if (contextMenuContext) {
            const initialCursorPoint = contextMenuContext.initialCursorPointRef.current;
            contextMenuContext.initialCursorPointRef.current = null;
            if (isContextMenu && initialCursorPoint && Math.abs(event.clientX - initialCursorPoint.x) <= 1 && Math.abs(event.clientY - initialCursorPoint.y) <= 1) {
              return;
            }
          }
          if (itemRef.current && store.context.allowMouseUpTriggerRef.current && (!isContextMenu || event.button === 2)) {
            if (itemMetadata.type === "regular-item") {
              itemRef.current.click();
            }
          }
        }
      }, externalProps, getButtonProps);
    }, [id, highlighted, getButtonProps, closeOnClick, menuEvents, store, isContextMenu, contextMenuContext, itemMetadata, nodeId]);
    const mergedRef = useMergedRefs(itemRef, buttonRef);
    return React17.useMemo(() => ({
      getItemProps,
      itemRef: mergedRef
    }), [getItemProps, mergedRef]);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/composite/list/useCompositeListItem.js
  var React19 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/composite/list/CompositeListContext.js
  var React18 = __toESM(require_compat(), 1);
  var CompositeListContext = /* @__PURE__ */ React18.createContext({
    register: () => {
    },
    unregister: () => {
    },
    subscribeMapChange: () => {
      return () => {
      };
    },
    elementsRef: {
      current: []
    },
    nextIndexRef: {
      current: 0
    }
  });
  if (false) CompositeListContext.displayName = "CompositeListContext";
  function useCompositeListContext() {
    return React18.useContext(CompositeListContext);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/composite/list/useCompositeListItem.js
  var IndexGuessBehavior = /* @__PURE__ */ (function(IndexGuessBehavior2) {
    IndexGuessBehavior2[IndexGuessBehavior2["None"] = 0] = "None";
    IndexGuessBehavior2[IndexGuessBehavior2["GuessFromOrder"] = 1] = "GuessFromOrder";
    return IndexGuessBehavior2;
  })({});
  function useCompositeListItem(params = {}) {
    const {
      label,
      metadata,
      textRef,
      indexGuessBehavior,
      index: externalIndex
    } = params;
    const {
      register,
      unregister,
      subscribeMapChange,
      elementsRef,
      labelsRef,
      nextIndexRef
    } = useCompositeListContext();
    const indexRef = React19.useRef(-1);
    const [index2, setIndex] = React19.useState(externalIndex ?? (indexGuessBehavior === IndexGuessBehavior.GuessFromOrder ? () => {
      if (indexRef.current === -1) {
        const newIndex = nextIndexRef.current;
        nextIndexRef.current += 1;
        indexRef.current = newIndex;
      }
      return indexRef.current;
    } : -1));
    const componentRef = React19.useRef(null);
    const ref = React19.useCallback((node) => {
      componentRef.current = node;
      if (index2 !== -1 && node !== null) {
        elementsRef.current[index2] = node;
        if (labelsRef) {
          const isLabelDefined = label !== void 0;
          labelsRef.current[index2] = isLabelDefined ? label : textRef?.current?.textContent ?? node.textContent;
        }
      }
    }, [index2, elementsRef, labelsRef, label, textRef]);
    useIsoLayoutEffect(() => {
      if (externalIndex != null) {
        return void 0;
      }
      const node = componentRef.current;
      if (node) {
        register(node, metadata);
        return () => {
          unregister(node);
        };
      }
      return void 0;
    }, [externalIndex, register, unregister, metadata]);
    useIsoLayoutEffect(() => {
      if (externalIndex != null) {
        return void 0;
      }
      return subscribeMapChange((map) => {
        const i4 = componentRef.current ? map.get(componentRef.current)?.index : null;
        if (i4 != null) {
          setIndex(i4);
        }
      });
    }, [externalIndex, subscribeMapChange, setIndex]);
    return React19.useMemo(() => ({
      ref,
      index: index2
    }), [index2, ref]);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/useId.js
  var React21 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/safeReact.js
  var React20 = __toESM(require_compat(), 1);
  var SafeReact = {
    ...React20
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/useId.js
  var globalId = 0;
  function useGlobalId(idOverride, prefix = "mui") {
    const [defaultId, setDefaultId] = React21.useState(idOverride);
    const id = idOverride || defaultId;
    React21.useEffect(() => {
      if (defaultId == null) {
        globalId += 1;
        setDefaultId(`${prefix}-${globalId}`);
      }
    }, [defaultId, prefix]);
    return id;
  }
  var maybeReactUseId = SafeReact.useId;
  function useId(idOverride, prefix) {
    if (maybeReactUseId !== void 0) {
      const reactId = maybeReactUseId();
      return idOverride ?? (prefix ? `${prefix}-${reactId}` : reactId);
    }
    return useGlobalId(idOverride, prefix);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js
  function useBaseUiId(idOverride) {
    return useId(idOverride, "base-ui");
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/checkbox-item/MenuCheckboxItemDataAttributes.js
  var MenuCheckboxItemDataAttributes = /* @__PURE__ */ (function(MenuCheckboxItemDataAttributes2) {
    MenuCheckboxItemDataAttributes2["checked"] = "data-checked";
    MenuCheckboxItemDataAttributes2["unchecked"] = "data-unchecked";
    MenuCheckboxItemDataAttributes2["disabled"] = "data-disabled";
    MenuCheckboxItemDataAttributes2["highlighted"] = "data-highlighted";
    return MenuCheckboxItemDataAttributes2;
  })({});

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/utils/stateAttributesMapping.js
  var itemMapping = {
    checked(value) {
      if (value) {
        return {
          [MenuCheckboxItemDataAttributes.checked]: ""
        };
      }
      return {
        [MenuCheckboxItemDataAttributes.unchecked]: ""
      };
    },
    ...transitionStatusMapping
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/createBaseUIEventDetails.js
  function createChangeEventDetails(reason, event, trigger, customProperties) {
    let canceled = false;
    let allowPropagation = false;
    const custom = customProperties ?? EMPTY_OBJECT;
    const details = {
      reason,
      event: event ?? new Event("base-ui"),
      cancel() {
        canceled = true;
      },
      allowPropagation() {
        allowPropagation = true;
      },
      get isCanceled() {
        return canceled;
      },
      get isPropagationAllowed() {
        return allowPropagation;
      },
      trigger,
      ...custom
    };
    return details;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/checkbox-item/MenuCheckboxItem.js
  var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
  var MenuCheckboxItem = /* @__PURE__ */ React22.forwardRef(function MenuCheckboxItem2(componentProps, forwardedRef) {
    const {
      render,
      className,
      id: idProp,
      label,
      nativeButton = false,
      disabled: disabled2 = false,
      closeOnClick = false,
      checked: checkedProp,
      defaultChecked,
      onCheckedChange,
      ...elementProps
    } = componentProps;
    const listItem = useCompositeListItem({
      label
    });
    const menuPositionerContext = useMenuPositionerContext(true);
    const id = useBaseUiId(idProp);
    const {
      store
    } = useMenuRootContext();
    const highlighted = store.useState("isActive", listItem.index);
    const itemProps = store.useState("itemProps");
    const [checked, setChecked] = useControlled({
      controlled: checkedProp,
      default: defaultChecked ?? false,
      name: "MenuCheckboxItem",
      state: "checked"
    });
    const {
      getItemProps,
      itemRef
    } = useMenuItem({
      closeOnClick,
      disabled: disabled2,
      highlighted,
      id,
      store,
      nativeButton,
      nodeId: menuPositionerContext?.nodeId,
      itemMetadata: REGULAR_ITEM
    });
    const state = React22.useMemo(() => ({
      disabled: disabled2,
      highlighted,
      checked
    }), [disabled2, highlighted, checked]);
    const handleClick = useStableCallback((event) => {
      const details = {
        ...createChangeEventDetails(reason_parts_exports.itemPress, event.nativeEvent),
        preventUnmountOnClose: () => {
        }
      };
      onCheckedChange?.(!checked, details);
      if (details.isCanceled) {
        return;
      }
      setChecked((currentlyChecked) => !currentlyChecked);
    });
    const element = useRenderElement("div", componentProps, {
      state,
      stateAttributesMapping: itemMapping,
      props: [itemProps, {
        role: "menuitemcheckbox",
        "aria-checked": checked,
        onClick: handleClick
      }, elementProps, getItemProps],
      ref: [itemRef, forwardedRef, listItem.ref]
    });
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuCheckboxItemContext.Provider, {
      value: state,
      children: element
    });
  });
  if (false) MenuCheckboxItem.displayName = "MenuCheckboxItem";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/checkbox-item-indicator/MenuCheckboxItemIndicator.js
  var React26 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/useTransitionStatus.js
  var React24 = __toESM(require_compat(), 1);
  var ReactDOM = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/useOnMount.js
  var React23 = __toESM(require_compat(), 1);
  var EMPTY = [];
  function useOnMount(fn2) {
    React23.useEffect(fn2, EMPTY);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/useAnimationFrame.js
  var EMPTY2 = null;
  var LAST_RAF = globalThis.requestAnimationFrame;
  var Scheduler = class {
    /* This implementation uses an array as a backing data-structure for frame callbacks.
     * It allows `O(1)` callback cancelling by inserting a `null` in the array, though it
     * never calls the native `cancelAnimationFrame` if there are no frames left. This can
     * be much more efficient if there is a call pattern that alterns as
     * "request-cancel-request-cancel-…".
     * But in the case of "request-request-…-cancel-cancel-…", it leaves the final animation
     * frame to run anyway. We turn that frame into a `O(1)` no-op via `callbacksCount`. */
    callbacks = [];
    callbacksCount = 0;
    nextId = 1;
    startId = 1;
    isScheduled = false;
    tick = (timestamp) => {
      this.isScheduled = false;
      const currentCallbacks = this.callbacks;
      const currentCallbacksCount = this.callbacksCount;
      this.callbacks = [];
      this.callbacksCount = 0;
      this.startId = this.nextId;
      if (currentCallbacksCount > 0) {
        for (let i4 = 0; i4 < currentCallbacks.length; i4 += 1) {
          currentCallbacks[i4]?.(timestamp);
        }
      }
    };
    request(fn2) {
      const id = this.nextId;
      this.nextId += 1;
      this.callbacks.push(fn2);
      this.callbacksCount += 1;
      const didRAFChange = false;
      if (!this.isScheduled || didRAFChange) {
        requestAnimationFrame(this.tick);
        this.isScheduled = true;
      }
      return id;
    }
    cancel(id) {
      const index2 = id - this.startId;
      if (index2 < 0 || index2 >= this.callbacks.length) {
        return;
      }
      this.callbacks[index2] = null;
      this.callbacksCount -= 1;
    }
  };
  var scheduler = new Scheduler();
  var AnimationFrame = class _AnimationFrame {
    static create() {
      return new _AnimationFrame();
    }
    static request(fn2) {
      return scheduler.request(fn2);
    }
    static cancel(id) {
      return scheduler.cancel(id);
    }
    currentId = EMPTY2;
    /**
     * Executes `fn` after `delay`, clearing any previously scheduled call.
     */
    request(fn2) {
      this.cancel();
      this.currentId = scheduler.request(() => {
        this.currentId = EMPTY2;
        fn2();
      });
    }
    cancel = () => {
      if (this.currentId !== EMPTY2) {
        scheduler.cancel(this.currentId);
        this.currentId = EMPTY2;
      }
    };
    disposeEffect = () => {
      return this.cancel;
    };
  };
  function useAnimationFrame() {
    const timeout = useRefWithInit(AnimationFrame.create).current;
    useOnMount(timeout.disposeEffect);
    return timeout;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/useTransitionStatus.js
  function useTransitionStatus(open, enableIdleState = false, deferEndingState = false) {
    const [transitionStatus, setTransitionStatus] = React24.useState(open && enableIdleState ? "idle" : void 0);
    const [mounted, setMounted] = React24.useState(open);
    if (open && !mounted) {
      setMounted(true);
      setTransitionStatus("starting");
    }
    if (!open && mounted && transitionStatus !== "ending" && !deferEndingState) {
      setTransitionStatus("ending");
    }
    if (!open && !mounted && transitionStatus === "ending") {
      setTransitionStatus(void 0);
    }
    useIsoLayoutEffect(() => {
      if (!open && mounted && transitionStatus !== "ending" && deferEndingState) {
        const frame = AnimationFrame.request(() => {
          setTransitionStatus("ending");
        });
        return () => {
          AnimationFrame.cancel(frame);
        };
      }
      return void 0;
    }, [open, mounted, transitionStatus, deferEndingState]);
    useIsoLayoutEffect(() => {
      if (!open || enableIdleState) {
        return void 0;
      }
      const frame = AnimationFrame.request(() => {
        ReactDOM.flushSync(() => {
          setTransitionStatus(void 0);
        });
      });
      return () => {
        AnimationFrame.cancel(frame);
      };
    }, [enableIdleState, open]);
    useIsoLayoutEffect(() => {
      if (!open || !enableIdleState) {
        return void 0;
      }
      if (open && mounted && transitionStatus !== "idle") {
        setTransitionStatus("starting");
      }
      const frame = AnimationFrame.request(() => {
        setTransitionStatus("idle");
      });
      return () => {
        AnimationFrame.cancel(frame);
      };
    }, [enableIdleState, open, mounted, setTransitionStatus, transitionStatus]);
    return React24.useMemo(() => ({
      mounted,
      setMounted,
      transitionStatus
    }), [mounted, transitionStatus]);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/useOpenChangeComplete.js
  var React25 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/useValueAsRef.js
  function useValueAsRef(value) {
    const latest = useRefWithInit(createLatestRef, value).current;
    latest.next = value;
    useIsoLayoutEffect(latest.effect);
    return latest;
  }
  function createLatestRef(value) {
    const latest = {
      current: value,
      next: value,
      effect: () => {
        latest.current = latest.next;
      }
    };
    return latest;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/useAnimationsFinished.js
  var ReactDOM2 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/resolveRef.js
  function resolveRef(maybeRef) {
    if (maybeRef == null) {
      return maybeRef;
    }
    return "current" in maybeRef ? maybeRef.current : maybeRef;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/useAnimationsFinished.js
  function useAnimationsFinished(elementOrRef, waitForNextTick = false, treatAbortedAsFinished = true) {
    const frame = useAnimationFrame();
    return useStableCallback((fnToExecute, signal = null) => {
      frame.cancel();
      const element = resolveRef(elementOrRef);
      if (element == null) {
        return;
      }
      if (typeof element.getAnimations !== "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
        fnToExecute();
      } else {
        frame.request(() => {
          function exec() {
            if (!element) {
              return;
            }
            Promise.all(element.getAnimations().map((anim) => anim.finished)).then(() => {
              if (signal != null && signal.aborted) {
                return;
              }
              ReactDOM2.flushSync(fnToExecute);
            }).catch(() => {
              if (treatAbortedAsFinished) {
                if (signal != null && signal.aborted) {
                  return;
                }
                ReactDOM2.flushSync(fnToExecute);
              } else if (element.getAnimations().length > 0 && element.getAnimations().some((anim) => anim.pending || anim.playState !== "finished")) {
                exec();
              }
            });
          }
          if (waitForNextTick) {
            frame.request(exec);
          } else {
            exec();
          }
        });
      }
    });
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/useOpenChangeComplete.js
  function useOpenChangeComplete(parameters) {
    const {
      enabled = true,
      open,
      ref,
      onComplete: onCompleteParam
    } = parameters;
    const openRef = useValueAsRef(open);
    const onComplete = useStableCallback(onCompleteParam);
    const runOnceAnimationsFinish = useAnimationsFinished(ref, open);
    React25.useEffect(() => {
      if (!enabled) {
        return;
      }
      runOnceAnimationsFinish(() => {
        if (open === openRef.current) {
          onComplete();
        }
      });
    }, [enabled, open, onComplete, runOnceAnimationsFinish, openRef]);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/checkbox-item-indicator/MenuCheckboxItemIndicator.js
  var MenuCheckboxItemIndicator = /* @__PURE__ */ React26.forwardRef(function MenuCheckboxItemIndicator2(componentProps, forwardedRef) {
    const {
      render,
      className,
      keepMounted = false,
      ...elementProps
    } = componentProps;
    const item = useMenuCheckboxItemContext();
    const indicatorRef = React26.useRef(null);
    const {
      transitionStatus,
      setMounted
    } = useTransitionStatus(item.checked);
    useOpenChangeComplete({
      open: item.checked,
      ref: indicatorRef,
      onComplete() {
        if (!item.checked) {
          setMounted(false);
        }
      }
    });
    const state = React26.useMemo(() => ({
      checked: item.checked,
      disabled: item.disabled,
      highlighted: item.highlighted,
      transitionStatus
    }), [item.checked, item.disabled, item.highlighted, transitionStatus]);
    const element = useRenderElement("span", componentProps, {
      state,
      ref: [forwardedRef, indicatorRef],
      stateAttributesMapping: itemMapping,
      props: {
        "aria-hidden": true,
        ...elementProps
      },
      enabled: keepMounted || item.checked
    });
    return element;
  });
  if (false) MenuCheckboxItemIndicator.displayName = "MenuCheckboxItemIndicator";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/group/MenuGroup.js
  var React28 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/group/MenuGroupContext.js
  var React27 = __toESM(require_compat(), 1);
  var MenuGroupContext = /* @__PURE__ */ React27.createContext(void 0);
  if (false) MenuGroupContext.displayName = "MenuGroupContext";
  function useMenuGroupRootContext() {
    const context = React27.useContext(MenuGroupContext);
    if (context === void 0) {
      throw new Error(false ? "Base UI: MenuGroupRootContext is missing. Menu group parts must be used within <Menu.Group>." : formatErrorMessage(31));
    }
    return context;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/group/MenuGroup.js
  var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
  var MenuGroup = /* @__PURE__ */ React28.forwardRef(function MenuGroup2(componentProps, forwardedRef) {
    const {
      render,
      className,
      ...elementProps
    } = componentProps;
    const [labelId, setLabelId] = React28.useState(void 0);
    const context = React28.useMemo(() => ({
      setLabelId
    }), [setLabelId]);
    const element = useRenderElement("div", componentProps, {
      ref: forwardedRef,
      props: {
        role: "group",
        "aria-labelledby": labelId,
        ...elementProps
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(MenuGroupContext.Provider, {
      value: context,
      children: element
    });
  });
  if (false) MenuGroup.displayName = "MenuGroup";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/group-label/MenuGroupLabel.js
  var React29 = __toESM(require_compat(), 1);
  var MenuGroupLabel = /* @__PURE__ */ React29.forwardRef(function MenuGroupLabelComponent(componentProps, forwardedRef) {
    const {
      className,
      render,
      id: idProp,
      ...elementProps
    } = componentProps;
    const id = useBaseUiId(idProp);
    const {
      setLabelId
    } = useMenuGroupRootContext();
    useIsoLayoutEffect(() => {
      setLabelId(id);
      return () => {
        setLabelId(void 0);
      };
    }, [setLabelId, id]);
    return useRenderElement("div", componentProps, {
      ref: forwardedRef,
      props: {
        id,
        role: "presentation",
        ...elementProps
      }
    });
  });
  if (false) MenuGroupLabel.displayName = "MenuGroupLabel";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/item/MenuItem.js
  var React30 = __toESM(require_compat(), 1);
  var MenuItem = /* @__PURE__ */ React30.forwardRef(function MenuItem2(componentProps, forwardedRef) {
    const {
      render,
      className,
      id: idProp,
      label,
      nativeButton = false,
      disabled: disabled2 = false,
      closeOnClick = true,
      ...elementProps
    } = componentProps;
    const listItem = useCompositeListItem({
      label
    });
    const menuPositionerContext = useMenuPositionerContext(true);
    const id = useBaseUiId(idProp);
    const {
      store
    } = useMenuRootContext();
    const highlighted = store.useState("isActive", listItem.index);
    const itemProps = store.useState("itemProps");
    const {
      getItemProps,
      itemRef
    } = useMenuItem({
      closeOnClick,
      disabled: disabled2,
      highlighted,
      id,
      store,
      nativeButton,
      nodeId: menuPositionerContext?.nodeId,
      itemMetadata: REGULAR_ITEM
    });
    const state = React30.useMemo(() => ({
      disabled: disabled2,
      highlighted
    }), [disabled2, highlighted]);
    return useRenderElement("div", componentProps, {
      state,
      props: [itemProps, elementProps, getItemProps],
      ref: [itemRef, forwardedRef, listItem.ref]
    });
  });
  if (false) MenuItem.displayName = "MenuItem";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/popup/MenuPopup.js
  var React52 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/useTimeout.js
  var EMPTY3 = 0;
  var Timeout = class _Timeout {
    static create() {
      return new _Timeout();
    }
    currentId = EMPTY3;
    /**
     * Executes `fn` after `delay`, clearing any previously scheduled call.
     */
    start(delay, fn2) {
      this.clear();
      this.currentId = setTimeout(() => {
        this.currentId = EMPTY3;
        fn2();
      }, delay);
    }
    isStarted() {
      return this.currentId !== EMPTY3;
    }
    clear = () => {
      if (this.currentId !== EMPTY3) {
        clearTimeout(this.currentId);
        this.currentId = EMPTY3;
      }
    };
    disposeEffect = () => {
      return this.clear;
    };
  };
  function useTimeout() {
    const timeout = useRefWithInit(Timeout.create).current;
    useOnMount(timeout.disposeEffect);
    return timeout;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useHover.js
  var React32 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/detectBrowser.js
  var hasNavigator = typeof navigator !== "undefined";
  var nav = getNavigatorData();
  var platform = getPlatform();
  var userAgent = getUserAgent();
  var isWebKit2 = typeof CSS === "undefined" || !CSS.supports ? false : CSS.supports("-webkit-backdrop-filter:none");
  var isIOS = (
    // iPads can claim to be MacIntel
    nav.platform === "MacIntel" && nav.maxTouchPoints > 1 ? true : /iP(hone|ad|od)|iOS/.test(nav.platform)
  );
  var isFirefox = hasNavigator && /firefox/i.test(userAgent);
  var isSafari = hasNavigator && /apple/i.test(navigator.vendor);
  var isEdge = hasNavigator && /Edg/i.test(userAgent);
  var isAndroid = hasNavigator && /android/i.test(platform) || /android/i.test(userAgent);
  var isMac = hasNavigator && platform.toLowerCase().startsWith("mac") && !navigator.maxTouchPoints;
  var isJSDOM = userAgent.includes("jsdom/");
  function getNavigatorData() {
    if (!hasNavigator) {
      return {
        platform: "",
        maxTouchPoints: -1
      };
    }
    const uaData = navigator.userAgentData;
    if (uaData?.platform) {
      return {
        platform: uaData.platform,
        maxTouchPoints: navigator.maxTouchPoints
      };
    }
    return {
      platform: navigator.platform ?? "",
      maxTouchPoints: navigator.maxTouchPoints ?? -1
    };
  }
  function getUserAgent() {
    if (!hasNavigator) {
      return "";
    }
    const uaData = navigator.userAgentData;
    if (uaData && Array.isArray(uaData.brands)) {
      return uaData.brands.map(({
        brand,
        version: version2
      }) => `${brand}/${version2}`).join(" ");
    }
    return navigator.userAgent;
  }
  function getPlatform() {
    if (!hasNavigator) {
      return "";
    }
    const uaData = navigator.userAgentData;
    if (uaData?.platform) {
      return uaData.platform;
    }
    return navigator.platform ?? "";
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/constants.js
  var FOCUSABLE_ATTRIBUTE = "data-base-ui-focusable";
  var ACTIVE_KEY = "active";
  var SELECTED_KEY = "selected";
  var TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
  var ARROW_LEFT = "ArrowLeft";
  var ARROW_RIGHT = "ArrowRight";
  var ARROW_UP = "ArrowUp";
  var ARROW_DOWN = "ArrowDown";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/element.js
  function activeElement(doc) {
    let element = doc.activeElement;
    while (element?.shadowRoot?.activeElement != null) {
      element = element.shadowRoot.activeElement;
    }
    return element;
  }
  function contains(parent, child) {
    if (!parent || !child) {
      return false;
    }
    const rootNode = child.getRootNode?.();
    if (parent.contains(child)) {
      return true;
    }
    if (rootNode && isShadowRoot(rootNode)) {
      let next = child;
      while (next) {
        if (parent === next) {
          return true;
        }
        next = next.parentNode || next.host;
      }
    }
    return false;
  }
  function getTarget(event) {
    if ("composedPath" in event) {
      return event.composedPath()[0];
    }
    return event.target;
  }
  function isEventTargetWithin(event, node) {
    if (node == null) {
      return false;
    }
    if ("composedPath" in event) {
      return event.composedPath().includes(node);
    }
    const eventAgain = event;
    return eventAgain.target != null && node.contains(eventAgain.target);
  }
  function isRootElement(element) {
    return element.matches("html,body");
  }
  function getDocument(node) {
    return node?.ownerDocument || document;
  }
  function isTypeableElement(element) {
    return isHTMLElement(element) && element.matches(TYPEABLE_SELECTOR);
  }
  function isTypeableCombobox(element) {
    if (!element) {
      return false;
    }
    return element.getAttribute("role") === "combobox" && isTypeableElement(element);
  }
  function matchesFocusVisible(element) {
    if (!element || isJSDOM) {
      return true;
    }
    try {
      return element.matches(":focus-visible");
    } catch (_e) {
      return true;
    }
  }
  function getFloatingFocusElement(floatingElement) {
    if (!floatingElement) {
      return null;
    }
    return floatingElement.hasAttribute(FOCUSABLE_ATTRIBUTE) ? floatingElement : floatingElement.querySelector(`[${FOCUSABLE_ATTRIBUTE}]`) || floatingElement;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/nodes.js
  function getNodeChildren(nodes, id, onlyOpenChildren = true) {
    const directChildren = nodes.filter((node) => node.parentId === id && (!onlyOpenChildren || node.context?.open));
    return directChildren.flatMap((child) => [child, ...getNodeChildren(nodes, child.id, onlyOpenChildren)]);
  }
  function getNodeAncestors(nodes, id) {
    let allAncestors = [];
    let currentParentId = nodes.find((node) => node.id === id)?.parentId;
    while (currentParentId) {
      const currentNode = nodes.find((node) => node.id === currentParentId);
      currentParentId = currentNode?.parentId;
      if (currentNode) {
        allAncestors = allAncestors.concat(currentNode);
      }
    }
    return allAncestors;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/event.js
  function stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  function isReactEvent(event) {
    return "nativeEvent" in event;
  }
  function isVirtualClick(event) {
    if (event.mozInputSource === 0 && event.isTrusted) {
      return true;
    }
    if (isAndroid && event.pointerType) {
      return event.type === "click" && event.buttons === 1;
    }
    return event.detail === 0 && !event.pointerType;
  }
  function isVirtualPointerEvent(event) {
    if (isJSDOM) {
      return false;
    }
    return !isAndroid && event.width === 0 && event.height === 0 || isAndroid && event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "mouse" || // iOS VoiceOver returns 0.333• for width/height.
    event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "touch";
  }
  function isMouseLikePointerType(pointerType, strict) {
    const values = ["mouse", "pen"];
    if (!strict) {
      values.push("", void 0);
    }
    return values.includes(pointerType);
  }
  function isClickLikeEvent(event) {
    const type = event.type;
    return type === "click" || type === "mousedown" || type === "keydown" || type === "keyup";
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
  var sides = ["top", "right", "bottom", "left"];
  var min = Math.min;
  var max = Math.max;
  var round = Math.round;
  var floor = Math.floor;
  var createCoords = (v3) => ({
    x: v3,
    y: v3
  });
  var oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function clamp(start, value, end) {
    return max(start, min(value, end));
  }
  function evaluate(value, param) {
    return typeof value === "function" ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split("-")[0];
  }
  function getAlignment(placement) {
    return placement.split("-")[1];
  }
  function getOppositeAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  function getAxisLength(axis) {
    return axis === "y" ? "height" : "width";
  }
  function getSideAxis(placement) {
    const firstChar = placement[0];
    return firstChar === "t" || firstChar === "b" ? "y" : "x";
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const length = getAxisLength(alignmentAxis);
    let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
  }
  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  function getOppositeAlignmentPlacement(placement) {
    return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
  }
  var lrPlacement = ["left", "right"];
  var rlPlacement = ["right", "left"];
  var tbPlacement = ["top", "bottom"];
  var btPlacement = ["bottom", "top"];
  function getSideList(side, isStart, rtl) {
    switch (side) {
      case "top":
      case "bottom":
        if (rtl) return isStart ? rlPlacement : lrPlacement;
        return isStart ? lrPlacement : rlPlacement;
      case "left":
      case "right":
        return isStart ? tbPlacement : btPlacement;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === "start", rtl);
    if (alignment) {
      list = list.map((side) => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }
  function getOppositePlacement(placement) {
    const side = getSide(placement);
    return oppositeSideMap[side] + placement.slice(side.length);
  }
  function expandPaddingObject(padding) {
    var _padding$top, _padding$right, _padding$bottom, _padding$left;
    return {
      top: (_padding$top = padding.top) != null ? _padding$top : 0,
      right: (_padding$right = padding.right) != null ? _padding$right : 0,
      bottom: (_padding$bottom = padding.bottom) != null ? _padding$bottom : 0,
      left: (_padding$left = padding.left) != null ? _padding$left : 0
    };
  }
  function getPaddingObject(padding) {
    return typeof padding !== "number" ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    const {
      x: x4,
      y: y3,
      width,
      height
    } = rect;
    return {
      width,
      height,
      top: y3,
      left: x4,
      right: x4 + width,
      bottom: y3 + height,
      x: x4,
      y: y3
    };
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/composite.js
  function isDifferentGridRow(index2, cols, prevRow) {
    return Math.floor(index2 / cols) !== prevRow;
  }
  function isIndexOutOfListBounds(listRef, index2) {
    return index2 < 0 || index2 >= listRef.current.length;
  }
  function getMinListIndex(listRef, disabledIndices) {
    return findNonDisabledListIndex(listRef, {
      disabledIndices
    });
  }
  function getMaxListIndex(listRef, disabledIndices) {
    return findNonDisabledListIndex(listRef, {
      decrement: true,
      startingIndex: listRef.current.length,
      disabledIndices
    });
  }
  function findNonDisabledListIndex(listRef, {
    startingIndex = -1,
    decrement = false,
    disabledIndices,
    amount = 1
  } = {}) {
    let index2 = startingIndex;
    do {
      index2 += decrement ? -amount : amount;
    } while (index2 >= 0 && index2 <= listRef.current.length - 1 && isListIndexDisabled(listRef, index2, disabledIndices));
    return index2;
  }
  function getGridNavigatedIndex(listRef, {
    event,
    orientation,
    loopFocus,
    rtl,
    cols,
    disabledIndices,
    minIndex,
    maxIndex,
    prevIndex,
    stopEvent: stop = false
  }) {
    let nextIndex = prevIndex;
    const rows = [];
    const rowIndexMap = {};
    let hasRoleRow = false;
    {
      let currentRowEl = null;
      let currentRowIndex = -1;
      listRef.current.forEach((el, idx) => {
        if (el == null) {
          return;
        }
        const rowEl = el.closest('[role="row"]');
        if (rowEl) {
          hasRoleRow = true;
        }
        if (rowEl !== currentRowEl || currentRowIndex === -1) {
          currentRowEl = rowEl;
          currentRowIndex += 1;
          rows[currentRowIndex] = [];
        }
        rows[currentRowIndex].push(idx);
        rowIndexMap[idx] = currentRowIndex;
      });
    }
    const hasDomRows = hasRoleRow && rows.length > 0 && rows.some((row) => row.length !== cols);
    function navigateVertically(direction) {
      if (!hasDomRows || prevIndex === -1) {
        return void 0;
      }
      const currentRow = rowIndexMap[prevIndex];
      if (currentRow == null) {
        return void 0;
      }
      const colInRow = rows[currentRow].indexOf(prevIndex);
      let nextRow = direction === "up" ? currentRow - 1 : currentRow + 1;
      if (loopFocus) {
        if (nextRow < 0) {
          nextRow = rows.length - 1;
        } else if (nextRow >= rows.length) {
          nextRow = 0;
        }
      }
      const visited = /* @__PURE__ */ new Set();
      while (nextRow >= 0 && nextRow < rows.length && !visited.has(nextRow)) {
        visited.add(nextRow);
        const targetRow = rows[nextRow];
        if (targetRow.length === 0) {
          nextRow = direction === "up" ? nextRow - 1 : nextRow + 1;
          continue;
        }
        const clampedCol = Math.min(colInRow, targetRow.length - 1);
        for (let col = clampedCol; col >= 0; col -= 1) {
          const candidate = targetRow[col];
          if (!isListIndexDisabled(listRef, candidate, disabledIndices)) {
            return candidate;
          }
        }
        nextRow = direction === "up" ? nextRow - 1 : nextRow + 1;
        if (loopFocus) {
          if (nextRow < 0) {
            nextRow = rows.length - 1;
          } else if (nextRow >= rows.length) {
            nextRow = 0;
          }
        }
      }
      return void 0;
    }
    if (event.key === ARROW_UP) {
      const domBasedCandidate = navigateVertically("up");
      if (domBasedCandidate !== void 0) {
        if (stop) {
          stopEvent(event);
        }
        nextIndex = domBasedCandidate;
      } else {
        if (stop) {
          stopEvent(event);
        }
        if (prevIndex === -1) {
          nextIndex = maxIndex;
        } else {
          nextIndex = findNonDisabledListIndex(listRef, {
            startingIndex: nextIndex,
            amount: cols,
            decrement: true,
            disabledIndices
          });
          if (loopFocus && (prevIndex - cols < minIndex || nextIndex < 0)) {
            const col = prevIndex % cols;
            const maxCol = maxIndex % cols;
            const offset4 = maxIndex - (maxCol - col);
            if (maxCol === col) {
              nextIndex = maxIndex;
            } else {
              nextIndex = maxCol > col ? offset4 : offset4 - cols;
            }
          }
        }
        if (isIndexOutOfListBounds(listRef, nextIndex)) {
          nextIndex = prevIndex;
        }
      }
    }
    if (event.key === ARROW_DOWN) {
      const domBasedCandidate = navigateVertically("down");
      if (domBasedCandidate !== void 0) {
        if (stop) {
          stopEvent(event);
        }
        nextIndex = domBasedCandidate;
      } else {
        if (stop) {
          stopEvent(event);
        }
        if (prevIndex === -1) {
          nextIndex = minIndex;
        } else {
          nextIndex = findNonDisabledListIndex(listRef, {
            startingIndex: prevIndex,
            amount: cols,
            disabledIndices
          });
          if (loopFocus && prevIndex + cols > maxIndex) {
            nextIndex = findNonDisabledListIndex(listRef, {
              startingIndex: prevIndex % cols - cols,
              amount: cols,
              disabledIndices
            });
          }
        }
        if (isIndexOutOfListBounds(listRef, nextIndex)) {
          nextIndex = prevIndex;
        }
      }
    }
    if (orientation === "both") {
      const prevRow = floor(prevIndex / cols);
      if (event.key === (rtl ? ARROW_LEFT : ARROW_RIGHT)) {
        if (stop) {
          stopEvent(event);
        }
        if (prevIndex % cols !== cols - 1) {
          nextIndex = findNonDisabledListIndex(listRef, {
            startingIndex: prevIndex,
            disabledIndices
          });
          if (loopFocus && isDifferentGridRow(nextIndex, cols, prevRow)) {
            nextIndex = findNonDisabledListIndex(listRef, {
              startingIndex: prevIndex - prevIndex % cols - 1,
              disabledIndices
            });
          }
        } else if (loopFocus) {
          nextIndex = findNonDisabledListIndex(listRef, {
            startingIndex: prevIndex - prevIndex % cols - 1,
            disabledIndices
          });
        }
        if (isDifferentGridRow(nextIndex, cols, prevRow)) {
          nextIndex = prevIndex;
        }
      }
      if (event.key === (rtl ? ARROW_RIGHT : ARROW_LEFT)) {
        if (stop) {
          stopEvent(event);
        }
        if (prevIndex % cols !== 0) {
          nextIndex = findNonDisabledListIndex(listRef, {
            startingIndex: prevIndex,
            decrement: true,
            disabledIndices
          });
          if (loopFocus && isDifferentGridRow(nextIndex, cols, prevRow)) {
            nextIndex = findNonDisabledListIndex(listRef, {
              startingIndex: prevIndex + (cols - prevIndex % cols),
              decrement: true,
              disabledIndices
            });
          }
        } else if (loopFocus) {
          nextIndex = findNonDisabledListIndex(listRef, {
            startingIndex: prevIndex + (cols - prevIndex % cols),
            decrement: true,
            disabledIndices
          });
        }
        if (isDifferentGridRow(nextIndex, cols, prevRow)) {
          nextIndex = prevIndex;
        }
      }
      const lastRow = floor(maxIndex / cols) === prevRow;
      if (isIndexOutOfListBounds(listRef, nextIndex)) {
        if (loopFocus && lastRow) {
          nextIndex = event.key === (rtl ? ARROW_RIGHT : ARROW_LEFT) ? maxIndex : findNonDisabledListIndex(listRef, {
            startingIndex: prevIndex - prevIndex % cols - 1,
            disabledIndices
          });
        } else {
          nextIndex = prevIndex;
        }
      }
    }
    return nextIndex;
  }
  function createGridCellMap(sizes, cols, dense) {
    const cellMap = [];
    let startIndex = 0;
    sizes.forEach(({
      width,
      height
    }, index2) => {
      if (width > cols) {
        if (false) {
          throw new Error(false ? `[Floating UI]: Invalid grid - item width at index ${index2} is greater than grid columns` : formatErrorMessage(29, index2));
        }
      }
      let itemPlaced = false;
      if (dense) {
        startIndex = 0;
      }
      while (!itemPlaced) {
        const targetCells = [];
        for (let i4 = 0; i4 < width; i4 += 1) {
          for (let j4 = 0; j4 < height; j4 += 1) {
            targetCells.push(startIndex + i4 + j4 * cols);
          }
        }
        if (startIndex % cols + width <= cols && targetCells.every((cell) => cellMap[cell] == null)) {
          targetCells.forEach((cell) => {
            cellMap[cell] = index2;
          });
          itemPlaced = true;
        } else {
          startIndex += 1;
        }
      }
    });
    return [...cellMap];
  }
  function getGridCellIndexOfCorner(index2, sizes, cellMap, cols, corner) {
    if (index2 === -1) {
      return -1;
    }
    const firstCellIndex = cellMap.indexOf(index2);
    const sizeItem = sizes[index2];
    switch (corner) {
      case "tl":
        return firstCellIndex;
      case "tr":
        if (!sizeItem) {
          return firstCellIndex;
        }
        return firstCellIndex + sizeItem.width - 1;
      case "bl":
        if (!sizeItem) {
          return firstCellIndex;
        }
        return firstCellIndex + (sizeItem.height - 1) * cols;
      case "br":
        return cellMap.lastIndexOf(index2);
      default:
        return -1;
    }
  }
  function getGridCellIndices(indices, cellMap) {
    return cellMap.flatMap((index2, cellIndex) => indices.includes(index2) ? [cellIndex] : []);
  }
  function isListIndexDisabled(listRef, index2, disabledIndices) {
    if (typeof disabledIndices === "function") {
      return disabledIndices(index2);
    }
    if (disabledIndices) {
      return disabledIndices.includes(index2);
    }
    const element = listRef.current[index2];
    if (!element) {
      return false;
    }
    return element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/tabbable/dist/index.esm.js
  var candidateSelectors = ["input:not([inert]):not([inert] *)", "select:not([inert]):not([inert] *)", "textarea:not([inert]):not([inert] *)", "a[href]:not([inert]):not([inert] *)", "area[href]:not([inert]):not([inert] *)", "button:not([inert]):not([inert] *)", "[tabindex]:not(slot):not([inert]):not([inert] *)", "audio[controls]:not([inert]):not([inert] *)", "video[controls]:not([inert]):not([inert] *)", '[contenteditable]:not([contenteditable="false"]):not([inert]):not([inert] *)', "details>summary:first-of-type:not([inert]):not([inert] *)", "details:not([inert]):not([inert] *)"];
  var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
  var NoElement = typeof Element === "undefined";
  var matches = NoElement ? function() {
  } : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
    var _element$getRootNode;
    return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
  } : function(element) {
    return element === null || element === void 0 ? void 0 : element.ownerDocument;
  };
  var _isInert = function isInert(node, lookUp) {
    var _node$getAttribute;
    if (lookUp === void 0) {
      lookUp = true;
    }
    var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
    var inert = inertAtt === "" || inertAtt === "true";
    var result = inert || lookUp && node && // closest does not exist on shadow roots, so we fall back to a manual
    // lookup upward, in case it is not defined.
    (typeof node.closest === "function" ? node.closest("[inert]") : _isInert(node.parentNode));
    return result;
  };
  var isContentEditable = function isContentEditable2(node) {
    var _node$getAttribute2;
    var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
    return attValue === "" || attValue === "true";
  };
  var getCandidates = function getCandidates2(el, includeContainer, filter) {
    if (_isInert(el)) {
      return [];
    }
    var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
    if (includeContainer && matches.call(el, candidateSelector)) {
      candidates.unshift(el);
    }
    candidates = candidates.filter(filter);
    return candidates;
  };
  var _getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
    var candidates = [];
    var elementsToCheck = Array.from(elements);
    while (elementsToCheck.length) {
      var element = elementsToCheck.shift();
      if (_isInert(element, false)) {
        continue;
      }
      if (element.tagName === "SLOT") {
        var assigned = element.assignedElements();
        var content = assigned.length ? assigned : element.children;
        var nestedCandidates = _getCandidatesIteratively(content, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: nestedCandidates
          });
        }
      } else {
        var validCandidate = matches.call(element, candidateSelector);
        if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
          candidates.push(element);
        }
        var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
        typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
        var validShadowRoot = !_isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
        if (shadowRoot && validShadowRoot) {
          var _nestedCandidates = _getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
          if (options.flatten) {
            candidates.push.apply(candidates, _nestedCandidates);
          } else {
            candidates.push({
              scopeParent: element,
              candidates: _nestedCandidates
            });
          }
        } else {
          elementsToCheck.unshift.apply(elementsToCheck, element.children);
        }
      }
    }
    return candidates;
  };
  var hasTabIndex = function hasTabIndex2(node) {
    return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
  };
  var getTabIndex = function getTabIndex2(node) {
    if (!node) {
      throw new Error("No node provided");
    }
    if (node.tabIndex < 0) {
      if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
        return 0;
      }
    }
    return node.tabIndex;
  };
  var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
    var tabIndex = getTabIndex(node);
    if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
      return 0;
    }
    return tabIndex;
  };
  var sortOrderedTabbables = function sortOrderedTabbables2(a4, b3) {
    return a4.tabIndex === b3.tabIndex ? a4.documentOrder - b3.documentOrder : a4.tabIndex - b3.tabIndex;
  };
  var isInput = function isInput2(node) {
    return node.tagName === "INPUT";
  };
  var isHiddenInput = function isHiddenInput2(node) {
    return isInput(node) && node.type === "hidden";
  };
  var isDetailsWithSummary = function isDetailsWithSummary2(node) {
    var r3 = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
      return child.tagName === "SUMMARY";
    });
    return r3;
  };
  var getCheckedRadio = function getCheckedRadio2(nodes, form) {
    for (var i4 = 0; i4 < nodes.length; i4++) {
      if (nodes[i4].checked && nodes[i4].form === form) {
        return nodes[i4];
      }
    }
  };
  var isTabbableRadio = function isTabbableRadio2(node) {
    if (!node.name) {
      return true;
    }
    var radioScope = node.form || getRootNode(node);
    var queryRadios = function queryRadios2(name) {
      return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
    };
    var radioSet;
    if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
      radioSet = queryRadios(window.CSS.escape(node.name));
    } else {
      try {
        radioSet = queryRadios(node.name);
      } catch (err) {
        console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
        return false;
      }
    }
    var checked = getCheckedRadio(radioSet, node.form);
    return !checked || checked === node;
  };
  var isRadio = function isRadio2(node) {
    return isInput(node) && node.type === "radio";
  };
  var isNonTabbableRadio = function isNonTabbableRadio2(node) {
    return isRadio(node) && !isTabbableRadio(node);
  };
  var isNodeAttached = function isNodeAttached2(node) {
    var _nodeRoot;
    var nodeRoot = node && getRootNode(node);
    var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
    var attached = false;
    if (nodeRoot && nodeRoot !== node) {
      var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
      attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
      while (!attached && nodeRootHost) {
        var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
        nodeRoot = getRootNode(nodeRootHost);
        nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
        attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
      }
    }
    return attached;
  };
  var isZeroArea = function isZeroArea2(node) {
    var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
    return width === 0 && height === 0;
  };
  var isHidden = function isHidden2(node, _ref) {
    var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
    if (displayCheck === "full-native") {
      if ("checkVisibility" in node) {
        var visible = node.checkVisibility({
          // Checking opacity might be desirable for some use cases, but natively,
          // opacity zero elements _are_ focusable and tabbable.
          checkOpacity: false,
          opacityProperty: false,
          contentVisibilityAuto: true,
          visibilityProperty: true,
          // This is an alias for `visibilityProperty`. Contemporary browsers
          // support both. However, this alias has wider browser support (Chrome
          // >= 105 and Firefox >= 106, vs. Chrome >= 121 and Firefox >= 122), so
          // we include it anyway.
          checkVisibilityCSS: true
        });
        return !visible;
      }
    }
    var _getComputedStyle = getComputedStyle(node), visibility = _getComputedStyle.visibility;
    if (visibility === "hidden" || visibility === "collapse") {
      return true;
    }
    var isDirectSummary = matches.call(node, "details>summary:first-of-type");
    var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
    if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
      return true;
    }
    if (!displayCheck || displayCheck === "full" || // full-native can run this branch when it falls through in case
    // Element#checkVisibility is unsupported
    displayCheck === "full-native" || displayCheck === "legacy-full") {
      if (typeof getShadowRoot === "function") {
        var originalNode = node;
        while (node) {
          var parentElement = node.parentElement;
          var rootNode = getRootNode(node);
          if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
            return isZeroArea(node);
          } else if (node.assignedSlot) {
            node = node.assignedSlot;
          } else if (!parentElement && rootNode !== node.ownerDocument) {
            node = rootNode.host;
          } else {
            node = parentElement;
          }
        }
        node = originalNode;
      }
      if (isNodeAttached(node)) {
        return !node.getClientRects().length;
      }
      if (displayCheck !== "legacy-full") {
        return true;
      }
    } else if (displayCheck === "non-zero-area") {
      return isZeroArea(node);
    }
    return false;
  };
  var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
    if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
      var parentNode = node.parentElement;
      while (parentNode) {
        if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
          for (var i4 = 0; i4 < parentNode.children.length; i4++) {
            var child = parentNode.children.item(i4);
            if (child.tagName === "LEGEND") {
              return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
            }
          }
          return true;
        }
        parentNode = parentNode.parentElement;
      }
    }
    return false;
  };
  var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
    if (node.disabled || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
    isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
      return false;
    }
    return true;
  };
  var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
    if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
      return false;
    }
    return true;
  };
  var isShadowRootTabbable = function isShadowRootTabbable2(shadowHostNode) {
    var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
    if (isNaN(tabIndex) || tabIndex >= 0) {
      return true;
    }
    return false;
  };
  var _sortByOrder = function sortByOrder(candidates) {
    var regularTabbables = [];
    var orderedTabbables = [];
    candidates.forEach(function(item, i4) {
      var isScope = !!item.scopeParent;
      var element = isScope ? item.scopeParent : item;
      var candidateTabindex = getSortOrderTabIndex(element, isScope);
      var elements = isScope ? _sortByOrder(item.candidates) : element;
      if (candidateTabindex === 0) {
        isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
      } else {
        orderedTabbables.push({
          documentOrder: i4,
          tabIndex: candidateTabindex,
          item,
          isScope,
          content: elements
        });
      }
    });
    return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
      sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
      return acc;
    }, []).concat(regularTabbables);
  };
  var tabbable = function tabbable2(container, options) {
    options = options || {};
    var candidates;
    if (options.getShadowRoot) {
      candidates = _getCandidatesIteratively([container], options.includeContainer, {
        filter: isNodeMatchingSelectorTabbable.bind(null, options),
        flatten: false,
        getShadowRoot: options.getShadowRoot,
        shadowRootFilter: isShadowRootTabbable
      });
    } else {
      candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
    }
    return _sortByOrder(candidates);
  };
  var focusable = function focusable2(container, options) {
    options = options || {};
    var candidates;
    if (options.getShadowRoot) {
      candidates = _getCandidatesIteratively([container], options.includeContainer, {
        filter: isNodeMatchingSelectorFocusable.bind(null, options),
        flatten: true,
        getShadowRoot: options.getShadowRoot
      });
    } else {
      candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
    }
    return candidates;
  };
  var isTabbable = function isTabbable2(node, options) {
    options = options || {};
    if (!node) {
      throw new Error("No node provided");
    }
    if (matches.call(node, candidateSelector) === false) {
      return false;
    }
    return isNodeMatchingSelectorTabbable(options, node);
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/tabbable.js
  var getTabbableOptions = () => ({
    getShadowRoot: true,
    displayCheck: (
      // JSDOM does not support the `tabbable` library. To solve this we can
      // check if `ResizeObserver` is a real function (not polyfilled), which
      // determines if the current environment is JSDOM-like.
      typeof ResizeObserver === "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
    )
  });
  function getTabbableIn(container, dir) {
    const list = tabbable(container, getTabbableOptions());
    const len = list.length;
    if (len === 0) {
      return void 0;
    }
    const active = activeElement(getDocument(container));
    const index2 = list.indexOf(active);
    const nextIndex = index2 === -1 ? dir === 1 ? 0 : len - 1 : index2 + dir;
    return list[nextIndex];
  }
  function getNextTabbable(referenceElement) {
    return getTabbableIn(getDocument(referenceElement).body, 1) || referenceElement;
  }
  function getPreviousTabbable(referenceElement) {
    return getTabbableIn(getDocument(referenceElement).body, -1) || referenceElement;
  }
  function getTabbableNearElement(referenceElement, dir) {
    if (!referenceElement) {
      return null;
    }
    const list = tabbable(getDocument(referenceElement).body, getTabbableOptions());
    const elementCount = list.length;
    if (elementCount === 0) {
      return null;
    }
    const index2 = list.indexOf(referenceElement);
    if (index2 === -1) {
      return null;
    }
    const nextIndex = (index2 + dir + elementCount) % elementCount;
    return list[nextIndex];
  }
  function getTabbableAfterElement(referenceElement) {
    return getTabbableNearElement(referenceElement, 1);
  }
  function getTabbableBeforeElement(referenceElement) {
    return getTabbableNearElement(referenceElement, -1);
  }
  function isOutsideEvent(event, container) {
    const containerElement = container || event.currentTarget;
    const relatedTarget = event.relatedTarget;
    return !relatedTarget || !contains(containerElement, relatedTarget);
  }
  function disableFocusInside(container) {
    const tabbableElements = tabbable(container, getTabbableOptions());
    tabbableElements.forEach((element) => {
      element.dataset.tabindex = element.getAttribute("tabindex") || "";
      element.setAttribute("tabindex", "-1");
    });
  }
  function enableFocusInside(container) {
    const elements = container.querySelectorAll("[data-tabindex]");
    elements.forEach((element) => {
      const tabindex = element.dataset.tabindex;
      delete element.dataset.tabindex;
      if (tabindex) {
        element.setAttribute("tabindex", tabindex);
      } else {
        element.removeAttribute("tabindex");
      }
    });
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingTree.js
  var React31 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/createEventEmitter.js
  function createEventEmitter() {
    const map = /* @__PURE__ */ new Map();
    return {
      emit(event, data) {
        map.get(event)?.forEach((listener) => listener(data));
      },
      on(event, listener) {
        if (!map.has(event)) {
          map.set(event, /* @__PURE__ */ new Set());
        }
        map.get(event).add(listener);
      },
      off(event, listener) {
        map.get(event)?.delete(listener);
      }
    };
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingTreeStore.js
  var FloatingTreeStore = class {
    nodesRef = {
      current: []
    };
    events = createEventEmitter();
    addNode(node) {
      this.nodesRef.current.push(node);
    }
    removeNode(node) {
      const index2 = this.nodesRef.current.findIndex((n3) => n3 === node);
      if (index2 !== -1) {
        this.nodesRef.current.splice(index2, 1);
      }
    }
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingTree.js
  var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
  var FloatingNodeContext = /* @__PURE__ */ React31.createContext(null);
  if (false) FloatingNodeContext.displayName = "FloatingNodeContext";
  var FloatingTreeContext = /* @__PURE__ */ React31.createContext(null);
  if (false) FloatingTreeContext.displayName = "FloatingTreeContext";
  var useFloatingParentNodeId = () => React31.useContext(FloatingNodeContext)?.id || null;
  var useFloatingTree = (externalTree) => {
    const contextTree = React31.useContext(FloatingTreeContext);
    return externalTree ?? contextTree;
  };
  function useFloatingNodeId(externalTree) {
    const id = useId();
    const tree = useFloatingTree(externalTree);
    const parentId = useFloatingParentNodeId();
    useIsoLayoutEffect(() => {
      if (!id) {
        return void 0;
      }
      const node = {
        id,
        parentId
      };
      tree?.addNode(node);
      return () => {
        tree?.removeNode(node);
      };
    }, [tree, id, parentId]);
    return id;
  }
  function FloatingNode(props) {
    const {
      children,
      id
    } = props;
    const parentId = useFloatingParentNodeId();
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(FloatingNodeContext.Provider, {
      value: React31.useMemo(() => ({
        id,
        parentId
      }), [id, parentId]),
      children
    });
  }
  function FloatingTree(props) {
    const {
      children,
      externalTree
    } = props;
    const tree = useRefWithInit(() => externalTree ?? new FloatingTreeStore()).current;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(FloatingTreeContext.Provider, {
      value: tree,
      children
    });
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/createAttribute.js
  function createAttribute(name) {
    return `data-base-ui-${name}`;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useHover.js
  var safePolygonIdentifier = createAttribute("safe-polygon");
  var interactiveSelector = `button,[role="button"],select,[tabindex]:not([tabindex="-1"]),${TYPEABLE_SELECTOR}`;
  function getDelay(value, prop, pointerType) {
    if (pointerType && !isMouseLikePointerType(pointerType)) {
      return 0;
    }
    if (typeof value === "number") {
      return value;
    }
    if (typeof value === "function") {
      const result = value();
      if (typeof result === "number") {
        return result;
      }
      return result?.[prop];
    }
    return value?.[prop];
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingFocusManager.js
  var React35 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/visuallyHidden.js
  var visuallyHidden = {
    clip: "rect(0 0 0 0)",
    overflow: "hidden",
    whiteSpace: "nowrap",
    position: "fixed",
    top: 0,
    left: 0,
    border: 0,
    padding: 0,
    width: 1,
    height: 1,
    margin: -1
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/owner.js
  function ownerDocument(node) {
    return node?.ownerDocument || document;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/FocusGuard.js
  var React33 = __toESM(require_compat(), 1);
  var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
  var FocusGuard = /* @__PURE__ */ React33.forwardRef(function FocusGuard2(props, ref) {
    const [role, setRole] = React33.useState();
    useIsoLayoutEffect(() => {
      if (isSafari) {
        setRole("button");
      }
    }, []);
    const restProps = {
      tabIndex: 0,
      // Role is only for VoiceOver
      role
    };
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", {
      ...props,
      ref,
      style: visuallyHidden,
      "aria-hidden": role ? void 0 : true,
      ...restProps,
      "data-base-ui-focus-guard": ""
    });
  });
  if (false) FocusGuard.displayName = "FocusGuard";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/enqueueFocus.js
  var rafId = 0;
  function enqueueFocus(el, options = {}) {
    const {
      preventScroll = false,
      cancelPrevious = true,
      sync = false
    } = options;
    if (cancelPrevious) {
      cancelAnimationFrame(rafId);
    }
    const exec = () => el?.focus({
      preventScroll
    });
    if (sync) {
      exec();
    } else {
      rafId = requestAnimationFrame(exec);
    }
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/markOthers.js
  var counters = {
    inert: /* @__PURE__ */ new WeakMap(),
    "aria-hidden": /* @__PURE__ */ new WeakMap(),
    none: /* @__PURE__ */ new WeakMap()
  };
  function getCounterMap(control) {
    if (control === "inert") {
      return counters.inert;
    }
    if (control === "aria-hidden") {
      return counters["aria-hidden"];
    }
    return counters.none;
  }
  var uncontrolledElementsSet = /* @__PURE__ */ new WeakSet();
  var markerMap = {};
  var lockCount = 0;
  var unwrapHost = (node) => node && (node.host || unwrapHost(node.parentNode));
  var correctElements = (parent, targets) => targets.map((target) => {
    if (parent.contains(target)) {
      return target;
    }
    const correctedTarget = unwrapHost(target);
    if (parent.contains(correctedTarget)) {
      return correctedTarget;
    }
    return null;
  }).filter((x4) => x4 != null);
  function applyAttributeToOthers(uncorrectedAvoidElements, body, ariaHidden, inert) {
    const markerName = "data-base-ui-inert";
    const controlAttribute = inert ? "inert" : ariaHidden ? "aria-hidden" : null;
    const avoidElements = correctElements(body, uncorrectedAvoidElements);
    const elementsToKeep = /* @__PURE__ */ new Set();
    const elementsToStop = new Set(avoidElements);
    const hiddenElements = [];
    if (!markerMap[markerName]) {
      markerMap[markerName] = /* @__PURE__ */ new WeakMap();
    }
    const markerCounter = markerMap[markerName];
    avoidElements.forEach(keep);
    deep(body);
    elementsToKeep.clear();
    function keep(el) {
      if (!el || elementsToKeep.has(el)) {
        return;
      }
      elementsToKeep.add(el);
      if (el.parentNode) {
        keep(el.parentNode);
      }
    }
    function deep(parent) {
      if (!parent || elementsToStop.has(parent)) {
        return;
      }
      [].forEach.call(parent.children, (node) => {
        if (getNodeName(node) === "script") {
          return;
        }
        if (elementsToKeep.has(node)) {
          deep(node);
        } else {
          const attr2 = controlAttribute ? node.getAttribute(controlAttribute) : null;
          const alreadyHidden = attr2 !== null && attr2 !== "false";
          const counterMap = getCounterMap(controlAttribute);
          const counterValue = (counterMap.get(node) || 0) + 1;
          const markerValue = (markerCounter.get(node) || 0) + 1;
          counterMap.set(node, counterValue);
          markerCounter.set(node, markerValue);
          hiddenElements.push(node);
          if (counterValue === 1 && alreadyHidden) {
            uncontrolledElementsSet.add(node);
          }
          if (markerValue === 1) {
            node.setAttribute(markerName, "");
          }
          if (!alreadyHidden && controlAttribute) {
            node.setAttribute(controlAttribute, controlAttribute === "inert" ? "" : "true");
          }
        }
      });
    }
    lockCount += 1;
    return () => {
      hiddenElements.forEach((element) => {
        const counterMap = getCounterMap(controlAttribute);
        const currentCounterValue = counterMap.get(element) || 0;
        const counterValue = currentCounterValue - 1;
        const markerValue = (markerCounter.get(element) || 0) - 1;
        counterMap.set(element, counterValue);
        markerCounter.set(element, markerValue);
        if (!counterValue) {
          if (!uncontrolledElementsSet.has(element) && controlAttribute) {
            element.removeAttribute(controlAttribute);
          }
          uncontrolledElementsSet.delete(element);
        }
        if (!markerValue) {
          element.removeAttribute(markerName);
        }
      });
      lockCount -= 1;
      if (!lockCount) {
        counters.inert = /* @__PURE__ */ new WeakMap();
        counters["aria-hidden"] = /* @__PURE__ */ new WeakMap();
        counters.none = /* @__PURE__ */ new WeakMap();
        uncontrolledElementsSet = /* @__PURE__ */ new WeakSet();
        markerMap = {};
      }
    };
  }
  function markOthers(avoidElements, ariaHidden = false, inert = false) {
    const body = getDocument(avoidElements[0]).body;
    return applyAttributeToOthers(avoidElements.concat(Array.from(body.querySelectorAll("[aria-live]"))), body, ariaHidden, inert);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingPortal.js
  var React34 = __toESM(require_compat(), 1);
  var ReactDOM3 = __toESM(require_compat(), 1);
  var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
  var PortalContext = /* @__PURE__ */ React34.createContext(null);
  if (false) PortalContext.displayName = "PortalContext";
  var usePortalContext = () => React34.useContext(PortalContext);
  var attr = createAttribute("portal");
  function useFloatingPortalNode(props = {}) {
    const {
      ref,
      container: containerProp,
      componentProps = EMPTY_OBJECT,
      elementProps,
      elementState
    } = props;
    const uniqueId = useId();
    const portalContext = usePortalContext();
    const parentPortalNode = portalContext?.portalNode;
    const [containerElement, setContainerElement] = React34.useState(null);
    const [portalNode, setPortalNode] = React34.useState(null);
    const containerRef = React34.useRef(null);
    useIsoLayoutEffect(() => {
      if (containerProp === null) {
        if (containerRef.current) {
          containerRef.current = null;
          setPortalNode(null);
          setContainerElement(null);
        }
        return;
      }
      if (uniqueId == null) {
        return;
      }
      const resolvedContainer = (containerProp && (isNode(containerProp) ? containerProp : containerProp.current)) ?? parentPortalNode ?? document.body;
      if (resolvedContainer == null) {
        if (containerRef.current) {
          containerRef.current = null;
          setPortalNode(null);
          setContainerElement(null);
        }
        return;
      }
      if (containerRef.current !== resolvedContainer) {
        containerRef.current = resolvedContainer;
        setPortalNode(null);
        setContainerElement(resolvedContainer);
      }
    }, [containerProp, parentPortalNode, uniqueId]);
    const portalElement = useRenderElement("div", componentProps, {
      ref: [ref, setPortalNode],
      state: elementState,
      props: [{
        id: uniqueId,
        [attr]: ""
      }, elementProps]
    });
    const portalSubtree = containerElement && portalElement ? /* @__PURE__ */ ReactDOM3.createPortal(portalElement, containerElement) : null;
    return {
      portalNode,
      portalSubtree
    };
  }
  var FloatingPortal = /* @__PURE__ */ React34.forwardRef(function FloatingPortal2(componentProps, forwardedRef) {
    const {
      children,
      container,
      className,
      render,
      renderGuards,
      ...elementProps
    } = componentProps;
    const {
      portalNode,
      portalSubtree
    } = useFloatingPortalNode({
      container,
      ref: forwardedRef,
      componentProps,
      elementProps
    });
    const beforeOutsideRef = React34.useRef(null);
    const afterOutsideRef = React34.useRef(null);
    const beforeInsideRef = React34.useRef(null);
    const afterInsideRef = React34.useRef(null);
    const [focusManagerState, setFocusManagerState] = React34.useState(null);
    const modal = focusManagerState?.modal;
    const open = focusManagerState?.open;
    const shouldRenderGuards = typeof renderGuards === "boolean" ? renderGuards : !!focusManagerState && !focusManagerState.modal && focusManagerState.open && !!portalNode;
    React34.useEffect(() => {
      if (!portalNode || modal) {
        return void 0;
      }
      function onFocus(event) {
        if (portalNode && isOutsideEvent(event)) {
          const focusing = event.type === "focusin";
          const manageFocus = focusing ? enableFocusInside : disableFocusInside;
          manageFocus(portalNode);
        }
      }
      portalNode.addEventListener("focusin", onFocus, true);
      portalNode.addEventListener("focusout", onFocus, true);
      return () => {
        portalNode.removeEventListener("focusin", onFocus, true);
        portalNode.removeEventListener("focusout", onFocus, true);
      };
    }, [portalNode, modal]);
    React34.useEffect(() => {
      if (!portalNode || open) {
        return;
      }
      enableFocusInside(portalNode);
    }, [open, portalNode]);
    const portalContextValue = React34.useMemo(() => ({
      beforeOutsideRef,
      afterOutsideRef,
      beforeInsideRef,
      afterInsideRef,
      portalNode,
      setFocusManagerState
    }), [portalNode]);
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(React34.Fragment, {
      children: [portalSubtree, /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(PortalContext.Provider, {
        value: portalContextValue,
        children: [shouldRenderGuards && portalNode && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(FocusGuard, {
          "data-type": "outside",
          ref: beforeOutsideRef,
          onFocus: (event) => {
            if (isOutsideEvent(event, portalNode)) {
              beforeInsideRef.current?.focus();
            } else {
              const domReference = focusManagerState ? focusManagerState.domReference : null;
              const prevTabbable = getPreviousTabbable(domReference);
              prevTabbable?.focus();
            }
          }
        }), shouldRenderGuards && portalNode && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", {
          "aria-owns": portalNode.id,
          style: ownerVisuallyHidden
        }), portalNode && /* @__PURE__ */ ReactDOM3.createPortal(children, portalNode), shouldRenderGuards && portalNode && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(FocusGuard, {
          "data-type": "outside",
          ref: afterOutsideRef,
          onFocus: (event) => {
            if (isOutsideEvent(event, portalNode)) {
              afterInsideRef.current?.focus();
            } else {
              const domReference = focusManagerState ? focusManagerState.domReference : null;
              const nextTabbable = getNextTabbable(domReference);
              nextTabbable?.focus();
              if (focusManagerState?.closeOnFocusOut) {
                focusManagerState?.onOpenChange(false, createChangeEventDetails(reason_parts_exports.focusOut, event.nativeEvent));
              }
            }
          }
        })]
      })]
    });
  });
  if (false) FloatingPortal.displayName = "FloatingPortal";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingFocusManager.js
  var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
  function getEventType(event, lastInteractionType) {
    const win = getWindow(event.target);
    if (event instanceof win.KeyboardEvent) {
      return "keyboard";
    }
    if (event instanceof win.FocusEvent) {
      return lastInteractionType || "keyboard";
    }
    if ("pointerType" in event) {
      return event.pointerType || "keyboard";
    }
    if ("touches" in event) {
      return "touch";
    }
    if (event instanceof win.MouseEvent) {
      return lastInteractionType || (event.detail === 0 ? "keyboard" : "mouse");
    }
    return "";
  }
  var LIST_LIMIT = 20;
  var previouslyFocusedElements = [];
  function clearDisconnectedPreviouslyFocusedElements() {
    previouslyFocusedElements = previouslyFocusedElements.filter((el) => el.isConnected);
  }
  function addPreviouslyFocusedElement(element) {
    clearDisconnectedPreviouslyFocusedElements();
    if (element && getNodeName(element) !== "body") {
      previouslyFocusedElements.push(element);
      if (previouslyFocusedElements.length > LIST_LIMIT) {
        previouslyFocusedElements = previouslyFocusedElements.slice(-LIST_LIMIT);
      }
    }
  }
  function getPreviouslyFocusedElement() {
    clearDisconnectedPreviouslyFocusedElements();
    return previouslyFocusedElements[previouslyFocusedElements.length - 1];
  }
  function getFirstTabbableElement(container) {
    if (!container) {
      return null;
    }
    const tabbableOptions = getTabbableOptions();
    if (isTabbable(container, tabbableOptions)) {
      return container;
    }
    return tabbable(container, tabbableOptions)[0] || container;
  }
  function isFocusable(element) {
    if (!element || !element.isConnected) {
      return false;
    }
    if (typeof element.checkVisibility === "function") {
      return element.checkVisibility();
    }
    return getComputedStyle2(element).display !== "none";
  }
  function handleTabIndex(floatingFocusElement, orderRef) {
    if (!orderRef.current.includes("floating") && !floatingFocusElement.getAttribute("role")?.includes("dialog")) {
      return;
    }
    const options = getTabbableOptions();
    const focusableElements = focusable(floatingFocusElement, options);
    const tabbableContent = focusableElements.filter((element) => {
      const dataTabIndex = element.getAttribute("data-tabindex") || "";
      return isTabbable(element, options) || element.hasAttribute("data-tabindex") && !dataTabIndex.startsWith("-");
    });
    const tabIndex = floatingFocusElement.getAttribute("tabindex");
    if (orderRef.current.includes("floating") || tabbableContent.length === 0) {
      if (tabIndex !== "0") {
        floatingFocusElement.setAttribute("tabindex", "0");
      }
    } else if (tabIndex !== "-1" || floatingFocusElement.hasAttribute("data-tabindex") && floatingFocusElement.getAttribute("data-tabindex") !== "-1") {
      floatingFocusElement.setAttribute("tabindex", "-1");
      floatingFocusElement.setAttribute("data-tabindex", "-1");
    }
  }
  function FloatingFocusManager(props) {
    const {
      context,
      children,
      disabled: disabled2 = false,
      order = ["content"],
      initialFocus = true,
      returnFocus = true,
      restoreFocus = false,
      modal = true,
      closeOnFocusOut = true,
      openInteractionType = "",
      getInsideElements: getInsideElementsProp = () => [],
      nextFocusableElement,
      previousFocusableElement,
      beforeContentFocusGuardRef,
      externalTree
    } = props;
    const store = "rootStore" in context ? context.rootStore : context;
    const open = store.useState("open");
    const domReference = store.useState("domReferenceElement");
    const floating = store.useState("floatingElement");
    const {
      events,
      dataRef
    } = store.context;
    const getNodeId = useStableCallback(() => dataRef.current.floatingContext?.nodeId);
    const getInsideElements = useStableCallback(getInsideElementsProp);
    const ignoreInitialFocus = initialFocus === false;
    const isUntrappedTypeableCombobox = isTypeableCombobox(domReference) && ignoreInitialFocus;
    const orderRef = useValueAsRef(order);
    const initialFocusRef = useValueAsRef(initialFocus);
    const returnFocusRef = useValueAsRef(returnFocus);
    const openInteractionTypeRef = useValueAsRef(openInteractionType);
    const tree = useFloatingTree(externalTree);
    const portalContext = usePortalContext();
    const startDismissButtonRef = React35.useRef(null);
    const endDismissButtonRef = React35.useRef(null);
    const preventReturnFocusRef = React35.useRef(false);
    const isPointerDownRef = React35.useRef(false);
    const pointerDownOutsideRef = React35.useRef(false);
    const tabbableIndexRef = React35.useRef(-1);
    const closeTypeRef = React35.useRef("");
    const lastInteractionTypeRef = React35.useRef("");
    const blurTimeout = useTimeout();
    const pointerDownTimeout = useTimeout();
    const restoreFocusFrame = useAnimationFrame();
    const isInsidePortal = portalContext != null;
    const floatingFocusElement = getFloatingFocusElement(floating);
    const getTabbableContent = useStableCallback((container = floatingFocusElement) => {
      return container ? tabbable(container, getTabbableOptions()) : [];
    });
    const getTabbableElements = useStableCallback((container) => {
      const content = getTabbableContent(container);
      return orderRef.current.map(() => content).filter(Boolean).flat();
    });
    React35.useEffect(() => {
      if (disabled2) {
        return void 0;
      }
      if (!modal) {
        return void 0;
      }
      function onKeyDown(event) {
        if (event.key === "Tab") {
          if (contains(floatingFocusElement, activeElement(getDocument(floatingFocusElement))) && getTabbableContent().length === 0 && !isUntrappedTypeableCombobox) {
            stopEvent(event);
          }
        }
      }
      const doc = getDocument(floatingFocusElement);
      doc.addEventListener("keydown", onKeyDown);
      return () => {
        doc.removeEventListener("keydown", onKeyDown);
      };
    }, [disabled2, domReference, floatingFocusElement, modal, orderRef, isUntrappedTypeableCombobox, getTabbableContent, getTabbableElements]);
    React35.useEffect(() => {
      if (disabled2) {
        return void 0;
      }
      if (!floating) {
        return void 0;
      }
      function handleFocusIn(event) {
        const target = getTarget(event);
        const tabbableContent = getTabbableContent();
        const tabbableIndex = tabbableContent.indexOf(target);
        if (tabbableIndex !== -1) {
          tabbableIndexRef.current = tabbableIndex;
        }
      }
      floating.addEventListener("focusin", handleFocusIn);
      return () => {
        floating.removeEventListener("focusin", handleFocusIn);
      };
    }, [disabled2, floating, getTabbableContent]);
    React35.useEffect(() => {
      if (disabled2 || !open) {
        return void 0;
      }
      const doc = getDocument(floatingFocusElement);
      function clearPointerDownOutside() {
        pointerDownOutsideRef.current = false;
      }
      function onPointerDown(event) {
        const target = getTarget(event);
        const pointerTargetInside = contains(floating, target) || contains(domReference, target) || contains(portalContext?.portalNode, target);
        pointerDownOutsideRef.current = !pointerTargetInside;
        lastInteractionTypeRef.current = event.pointerType || "keyboard";
      }
      function onKeyDown() {
        lastInteractionTypeRef.current = "keyboard";
      }
      doc.addEventListener("pointerdown", onPointerDown, true);
      doc.addEventListener("pointerup", clearPointerDownOutside, true);
      doc.addEventListener("pointercancel", clearPointerDownOutside, true);
      doc.addEventListener("keydown", onKeyDown, true);
      return () => {
        doc.removeEventListener("pointerdown", onPointerDown, true);
        doc.removeEventListener("pointerup", clearPointerDownOutside, true);
        doc.removeEventListener("pointercancel", clearPointerDownOutside, true);
        doc.removeEventListener("keydown", onKeyDown, true);
      };
    }, [disabled2, floating, domReference, floatingFocusElement, open, portalContext]);
    React35.useEffect(() => {
      if (disabled2) {
        return void 0;
      }
      if (!closeOnFocusOut) {
        return void 0;
      }
      function handlePointerDown() {
        isPointerDownRef.current = true;
        pointerDownTimeout.start(0, () => {
          isPointerDownRef.current = false;
        });
      }
      function handleFocusOutside(event) {
        const relatedTarget = event.relatedTarget;
        const currentTarget = event.currentTarget;
        const target = getTarget(event);
        queueMicrotask(() => {
          const nodeId = getNodeId();
          const triggers = store.context.triggerElements;
          const movedToUnrelatedNode = !(contains(domReference, relatedTarget) || contains(floating, relatedTarget) || contains(relatedTarget, floating) || contains(portalContext?.portalNode, relatedTarget) || relatedTarget != null && triggers.hasElement(relatedTarget) || triggers.hasMatchingElement((trigger) => contains(trigger, relatedTarget)) || relatedTarget?.hasAttribute(createAttribute("focus-guard")) || tree && (getNodeChildren(tree.nodesRef.current, nodeId).find((node) => contains(node.context?.elements.floating, relatedTarget) || contains(node.context?.elements.domReference, relatedTarget)) || getNodeAncestors(tree.nodesRef.current, nodeId).find((node) => [node.context?.elements.floating, getFloatingFocusElement(node.context?.elements.floating)].includes(relatedTarget) || node.context?.elements.domReference === relatedTarget)));
          if (currentTarget === domReference && floatingFocusElement) {
            handleTabIndex(floatingFocusElement, orderRef);
          }
          if (restoreFocus && currentTarget !== domReference && !isFocusable(target) && activeElement(getDocument(floatingFocusElement)) === getDocument(floatingFocusElement).body) {
            if (isHTMLElement(floatingFocusElement)) {
              floatingFocusElement.focus();
              if (restoreFocus === "popup") {
                restoreFocusFrame.request(() => {
                  floatingFocusElement.focus();
                });
                return;
              }
            }
            const prevTabbableIndex = tabbableIndexRef.current;
            const tabbableContent = getTabbableContent();
            const nodeToFocus = tabbableContent[prevTabbableIndex] || tabbableContent[tabbableContent.length - 1] || floatingFocusElement;
            if (isHTMLElement(nodeToFocus)) {
              nodeToFocus.focus();
            }
          }
          if (dataRef.current.insideReactTree) {
            dataRef.current.insideReactTree = false;
            return;
          }
          if ((isUntrappedTypeableCombobox ? true : !modal) && relatedTarget && movedToUnrelatedNode && !isPointerDownRef.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
          // For an "untrapped" typeable combobox (input role=combobox with
          // initialFocus=false), re-opening the popup and tabbing out should still close it even
          // when the previously focused element (e.g. the next tabbable outside the popup) is
          // focused again. Otherwise, the popup remains open on the second Tab sequence:
          // click input -> Tab (closes) -> click input -> Tab.
          // Allow closing when `isUntrappedTypeableCombobox` regardless of the previously focused element.
          (isUntrappedTypeableCombobox || relatedTarget !== getPreviouslyFocusedElement())) {
            preventReturnFocusRef.current = true;
            store.setOpen(false, createChangeEventDetails(reason_parts_exports.focusOut, event));
          }
        });
      }
      function markInsideReactTree() {
        if (pointerDownOutsideRef.current) {
          return;
        }
        dataRef.current.insideReactTree = true;
        blurTimeout.start(0, () => {
          dataRef.current.insideReactTree = false;
        });
      }
      const domReferenceElement = isHTMLElement(domReference) ? domReference : null;
      const cleanups = [];
      if (!floating && !domReferenceElement) {
        return void 0;
      }
      if (domReferenceElement) {
        domReferenceElement.addEventListener("focusout", handleFocusOutside);
        domReferenceElement.addEventListener("pointerdown", handlePointerDown);
        cleanups.push(() => {
          domReferenceElement.removeEventListener("focusout", handleFocusOutside);
          domReferenceElement.removeEventListener("pointerdown", handlePointerDown);
        });
      }
      if (floating) {
        floating.addEventListener("focusout", handleFocusOutside);
        if (portalContext) {
          floating.addEventListener("focusout", markInsideReactTree, true);
          cleanups.push(() => {
            floating.removeEventListener("focusout", markInsideReactTree, true);
          });
        }
        cleanups.push(() => {
          floating.removeEventListener("focusout", handleFocusOutside);
        });
      }
      return () => {
        cleanups.forEach((cleanup) => {
          cleanup();
        });
      };
    }, [disabled2, domReference, floating, floatingFocusElement, modal, tree, portalContext, store, closeOnFocusOut, restoreFocus, getTabbableContent, isUntrappedTypeableCombobox, getNodeId, orderRef, dataRef, blurTimeout, pointerDownTimeout, restoreFocusFrame]);
    const beforeGuardRef = React35.useRef(null);
    const afterGuardRef = React35.useRef(null);
    const mergedBeforeGuardRef = useMergedRefs(beforeGuardRef, beforeContentFocusGuardRef, portalContext?.beforeInsideRef);
    const mergedAfterGuardRef = useMergedRefs(afterGuardRef, portalContext?.afterInsideRef);
    React35.useEffect(() => {
      if (disabled2 || !floating || !open) {
        return void 0;
      }
      const portalNodes = Array.from(portalContext?.portalNode?.querySelectorAll(`[${createAttribute("portal")}]`) || []);
      const ancestors = tree ? getNodeAncestors(tree.nodesRef.current, getNodeId()) : [];
      const rootAncestorComboboxDomReference = ancestors.find((node) => isTypeableCombobox(node.context?.elements.domReference || null))?.context?.elements.domReference;
      const insideElements = [floating, rootAncestorComboboxDomReference, ...portalNodes, ...getInsideElements(), startDismissButtonRef.current, endDismissButtonRef.current, beforeGuardRef.current, afterGuardRef.current, portalContext?.beforeOutsideRef.current, portalContext?.afterOutsideRef.current, resolveRef(previousFocusableElement), resolveRef(nextFocusableElement), isUntrappedTypeableCombobox ? domReference : null].filter((x4) => x4 != null);
      const cleanup = markOthers(insideElements, modal || isUntrappedTypeableCombobox);
      return () => {
        cleanup();
      };
    }, [open, disabled2, domReference, floating, modal, orderRef, portalContext, isUntrappedTypeableCombobox, tree, getNodeId, getInsideElements, nextFocusableElement, previousFocusableElement]);
    useIsoLayoutEffect(() => {
      if (!open || disabled2 || !isHTMLElement(floatingFocusElement)) {
        return;
      }
      const doc = getDocument(floatingFocusElement);
      const previouslyFocusedElement = activeElement(doc);
      queueMicrotask(() => {
        const focusableElements = getTabbableElements(floatingFocusElement);
        const initialFocusValueOrFn = initialFocusRef.current;
        const resolvedInitialFocus = typeof initialFocusValueOrFn === "function" ? initialFocusValueOrFn(openInteractionTypeRef.current || "") : initialFocusValueOrFn;
        if (resolvedInitialFocus === void 0 || resolvedInitialFocus === false) {
          return;
        }
        let elToFocus;
        if (resolvedInitialFocus === true || resolvedInitialFocus === null) {
          elToFocus = focusableElements[0] || floatingFocusElement;
        } else {
          elToFocus = resolveRef(resolvedInitialFocus);
        }
        elToFocus = elToFocus || focusableElements[0] || floatingFocusElement;
        const focusAlreadyInsideFloatingEl = contains(floatingFocusElement, previouslyFocusedElement);
        if (focusAlreadyInsideFloatingEl) {
          return;
        }
        enqueueFocus(elToFocus, {
          preventScroll: elToFocus === floatingFocusElement
        });
      });
    }, [disabled2, open, floatingFocusElement, ignoreInitialFocus, getTabbableElements, initialFocusRef, openInteractionTypeRef]);
    useIsoLayoutEffect(() => {
      if (disabled2 || !floatingFocusElement) {
        return void 0;
      }
      const doc = getDocument(floatingFocusElement);
      const previouslyFocusedElement = activeElement(doc);
      addPreviouslyFocusedElement(previouslyFocusedElement);
      function onOpenChangeLocal(details) {
        if (!details.open) {
          closeTypeRef.current = getEventType(details.nativeEvent, lastInteractionTypeRef.current);
        }
        if (details.reason === reason_parts_exports.triggerHover && details.nativeEvent.type === "mouseleave") {
          preventReturnFocusRef.current = true;
        }
        if (details.reason !== reason_parts_exports.outsidePress) {
          return;
        }
        if (details.nested) {
          preventReturnFocusRef.current = false;
        } else if (isVirtualClick(details.nativeEvent) || isVirtualPointerEvent(details.nativeEvent)) {
          preventReturnFocusRef.current = false;
        } else {
          let isPreventScrollSupported = false;
          document.createElement("div").focus({
            get preventScroll() {
              isPreventScrollSupported = true;
              return false;
            }
          });
          if (isPreventScrollSupported) {
            preventReturnFocusRef.current = false;
          } else {
            preventReturnFocusRef.current = true;
          }
        }
      }
      events.on("openchange", onOpenChangeLocal);
      const fallbackEl = doc.createElement("span");
      fallbackEl.setAttribute("tabindex", "-1");
      fallbackEl.setAttribute("aria-hidden", "true");
      Object.assign(fallbackEl.style, visuallyHidden);
      if (isInsidePortal && domReference) {
        domReference.insertAdjacentElement("afterend", fallbackEl);
      }
      function getReturnElement() {
        const returnFocusValueOrFn = returnFocusRef.current;
        let resolvedReturnFocusValue = typeof returnFocusValueOrFn === "function" ? returnFocusValueOrFn(closeTypeRef.current) : returnFocusValueOrFn;
        if (resolvedReturnFocusValue === void 0 || resolvedReturnFocusValue === false) {
          return null;
        }
        if (resolvedReturnFocusValue === null) {
          resolvedReturnFocusValue = true;
        }
        if (typeof resolvedReturnFocusValue === "boolean") {
          const el = domReference || getPreviouslyFocusedElement();
          return el && el.isConnected ? el : fallbackEl;
        }
        const fallback = domReference || getPreviouslyFocusedElement() || fallbackEl;
        return resolveRef(resolvedReturnFocusValue) || fallback;
      }
      return () => {
        events.off("openchange", onOpenChangeLocal);
        const activeEl = activeElement(doc);
        const isFocusInsideFloatingTree = contains(floating, activeEl) || tree && getNodeChildren(tree.nodesRef.current, getNodeId(), false).some((node) => contains(node.context?.elements.floating, activeEl));
        const returnElement = getReturnElement();
        queueMicrotask(() => {
          const tabbableReturnElement = getFirstTabbableElement(returnElement);
          const hasExplicitReturnFocus = typeof returnFocusRef.current !== "boolean";
          if (
            // eslint-disable-next-line react-hooks/exhaustive-deps
            returnFocusRef.current && !preventReturnFocusRef.current && isHTMLElement(tabbableReturnElement) && // If the focus moved somewhere else after mount, avoid returning focus
            // since it likely entered a different element which should be
            // respected: https://github.com/floating-ui/floating-ui/issues/2607
            (!hasExplicitReturnFocus && tabbableReturnElement !== activeEl && activeEl !== doc.body ? isFocusInsideFloatingTree : true)
          ) {
            tabbableReturnElement.focus({
              preventScroll: true
            });
          }
          fallbackEl.remove();
        });
      };
    }, [disabled2, floating, floatingFocusElement, returnFocusRef, dataRef, events, tree, isInsidePortal, domReference, getNodeId]);
    React35.useEffect(() => {
      queueMicrotask(() => {
        preventReturnFocusRef.current = false;
      });
    }, [disabled2]);
    React35.useEffect(() => {
      if (disabled2 || !open) {
        return void 0;
      }
      function handlePointerDown(event) {
        const target = getTarget(event);
        if (target?.closest(`[${CLICK_TRIGGER_IDENTIFIER}]`)) {
          isPointerDownRef.current = true;
        }
      }
      const doc = getDocument(floatingFocusElement);
      doc.addEventListener("pointerdown", handlePointerDown, true);
      return () => {
        doc.removeEventListener("pointerdown", handlePointerDown, true);
      };
    }, [disabled2, open, floatingFocusElement]);
    useIsoLayoutEffect(() => {
      if (disabled2) {
        return void 0;
      }
      if (!portalContext) {
        return void 0;
      }
      portalContext.setFocusManagerState({
        modal,
        closeOnFocusOut,
        open,
        onOpenChange: store.setOpen,
        domReference
      });
      return () => {
        portalContext.setFocusManagerState(null);
      };
    }, [disabled2, portalContext, modal, open, store, closeOnFocusOut, domReference]);
    useIsoLayoutEffect(() => {
      if (disabled2 || !floatingFocusElement) {
        return void 0;
      }
      handleTabIndex(floatingFocusElement, orderRef);
      return () => {
        queueMicrotask(clearDisconnectedPreviouslyFocusedElements);
      };
    }, [disabled2, floatingFocusElement, orderRef]);
    const shouldRenderGuards = !disabled2 && (modal ? !isUntrappedTypeableCombobox : true) && (isInsidePortal || modal);
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(React35.Fragment, {
      children: [shouldRenderGuards && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(FocusGuard, {
        "data-type": "inside",
        ref: mergedBeforeGuardRef,
        onFocus: (event) => {
          if (modal) {
            const els = getTabbableElements();
            enqueueFocus(els[els.length - 1]);
          } else if (portalContext?.portalNode) {
            preventReturnFocusRef.current = false;
            if (isOutsideEvent(event, portalContext.portalNode)) {
              const nextTabbable = getNextTabbable(domReference);
              nextTabbable?.focus();
            } else {
              resolveRef(previousFocusableElement ?? portalContext.beforeOutsideRef)?.focus();
            }
          }
        }
      }), children, shouldRenderGuards && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(FocusGuard, {
        "data-type": "inside",
        ref: mergedAfterGuardRef,
        onFocus: (event) => {
          if (modal) {
            enqueueFocus(getTabbableElements()[0]);
          } else if (portalContext?.portalNode) {
            if (closeOnFocusOut) {
              preventReturnFocusRef.current = true;
            }
            if (isOutsideEvent(event, portalContext.portalNode)) {
              const prevTabbable = getPreviousTabbable(domReference);
              prevTabbable?.focus();
            } else {
              resolveRef(nextFocusableElement ?? portalContext.afterOutsideRef)?.focus();
            }
          }
        }
      })]
    });
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useClick.js
  var React36 = __toESM(require_compat(), 1);
  function useClick(context, props = {}) {
    const store = "rootStore" in context ? context.rootStore : context;
    const dataRef = store.context.dataRef;
    const {
      enabled = true,
      event: eventOption = "click",
      toggle = true,
      ignoreMouse = false,
      stickIfOpen = true,
      touchOpenDelay = 0
    } = props;
    const pointerTypeRef = React36.useRef(void 0);
    const frame = useAnimationFrame();
    const touchOpenTimeout = useTimeout();
    const reference = React36.useMemo(() => ({
      onPointerDown(event) {
        pointerTypeRef.current = event.pointerType;
      },
      onMouseDown(event) {
        const pointerType = pointerTypeRef.current;
        const nativeEvent = event.nativeEvent;
        const open = store.select("open");
        if (event.button !== 0 || eventOption === "click" || isMouseLikePointerType(pointerType, true) && ignoreMouse) {
          return;
        }
        const openEvent = dataRef.current.openEvent;
        const openEventType = openEvent?.type;
        const hasClickedOnInactiveTrigger = store.select("domReferenceElement") !== event.currentTarget;
        const nextOpen = open && hasClickedOnInactiveTrigger || !(open && toggle && (openEvent && stickIfOpen ? openEventType === "click" || openEventType === "mousedown" : true));
        if (isTypeableElement(nativeEvent.target)) {
          const details = createChangeEventDetails(reason_parts_exports.triggerPress, nativeEvent, nativeEvent.target);
          if (nextOpen && pointerType === "touch" && touchOpenDelay > 0) {
            touchOpenTimeout.start(touchOpenDelay, () => {
              store.setOpen(true, details);
            });
          } else {
            store.setOpen(nextOpen, details);
          }
          return;
        }
        const eventCurrentTarget = event.currentTarget;
        frame.request(() => {
          const details = createChangeEventDetails(reason_parts_exports.triggerPress, nativeEvent, eventCurrentTarget);
          if (nextOpen && pointerType === "touch" && touchOpenDelay > 0) {
            touchOpenTimeout.start(touchOpenDelay, () => {
              store.setOpen(true, details);
            });
          } else {
            store.setOpen(nextOpen, details);
          }
        });
      },
      onClick(event) {
        if (eventOption === "mousedown-only") {
          return;
        }
        const pointerType = pointerTypeRef.current;
        if (eventOption === "mousedown" && pointerType) {
          pointerTypeRef.current = void 0;
          return;
        }
        if (isMouseLikePointerType(pointerType, true) && ignoreMouse) {
          return;
        }
        const open = store.select("open");
        const openEvent = dataRef.current.openEvent;
        const hasClickedOnInactiveTrigger = store.select("domReferenceElement") !== event.currentTarget;
        const nextOpen = open && hasClickedOnInactiveTrigger || !(open && toggle && (openEvent && stickIfOpen ? isClickLikeEvent(openEvent) : true));
        const details = createChangeEventDetails(reason_parts_exports.triggerPress, event.nativeEvent, event.currentTarget);
        if (nextOpen && pointerType === "touch" && touchOpenDelay > 0) {
          touchOpenTimeout.start(touchOpenDelay, () => {
            store.setOpen(true, details);
          });
        } else {
          store.setOpen(nextOpen, details);
        }
      },
      onKeyDown() {
        pointerTypeRef.current = void 0;
      }
    }), [dataRef, eventOption, ignoreMouse, store, stickIfOpen, toggle, frame, touchOpenTimeout, touchOpenDelay]);
    return React36.useMemo(() => enabled ? {
      reference
    } : EMPTY_OBJECT, [enabled, reference]);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useDismiss.js
  var React38 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const sideAxis = getSideAxis(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const alignLength = getAxisLength(alignmentAxis);
    const side = getSide(placement);
    const isVertical = sideAxis === "y";
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch (side) {
      case "top":
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case "bottom":
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case "right":
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case "left":
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    const alignment = getAlignment(placement);
    if (alignment) {
      coords[alignmentAxis] += commonAlign * (alignment === "end" ? 1 : -1) * (rtl && isVertical ? -1 : 1);
    }
    return coords;
  }
  async function detectOverflow(state, options) {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x: x4,
      y: y3,
      platform: platform3,
      rects,
      elements,
      strategy
    } = state;
    const {
      boundary = "clippingAncestors",
      rootBoundary = "viewport",
      elementContext = "floating",
      altBoundary = false,
      padding = 0
    } = evaluate(options, state);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === "floating" ? "reference" : "floating";
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform3.getClippingRect({
      element: ((_await$platform$isEle = await (platform3.isElement == null ? void 0 : platform3.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform3.getDocumentElement == null ? void 0 : platform3.getDocumentElement(elements.floating)),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === "floating" ? {
      x: x4,
      y: y3,
      width: rects.floating.width,
      height: rects.floating.height
    } : rects.reference;
    const offsetParent = await (platform3.getOffsetParent == null ? void 0 : platform3.getOffsetParent(elements.floating));
    const offsetScale = await (platform3.isElement == null ? void 0 : platform3.isElement(offsetParent)) && await (platform3.getScale == null ? void 0 : platform3.getScale(offsetParent)) || {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform3.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform3.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements,
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }
  var MAX_RESET_COUNT = 50;
  var computePosition = async (reference, floating, config) => {
    const {
      placement = "bottom",
      strategy = "absolute",
      middleware = [],
      platform: platform3
    } = config;
    const platformWithDetectOverflow = platform3.detectOverflow ? platform3 : {
      ...platform3,
      detectOverflow
    };
    const rtl = await (platform3.isRTL == null ? void 0 : platform3.isRTL(floating));
    let rects = await platform3.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x: x4,
      y: y3
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let resetCount = 0;
    const middlewareData = {};
    for (let i4 = 0; i4 < middleware.length; i4++) {
      const currentMiddleware = middleware[i4];
      if (!currentMiddleware) {
        continue;
      }
      const {
        name,
        fn: fn2
      } = currentMiddleware;
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn2({
        x: x4,
        y: y3,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform: platformWithDetectOverflow,
        elements: {
          reference,
          floating
        }
      });
      x4 = nextX != null ? nextX : x4;
      y3 = nextY != null ? nextY : y3;
      middlewareData[name] = {
        ...middlewareData[name],
        ...data
      };
      if (reset && resetCount < MAX_RESET_COUNT) {
        resetCount++;
        if (typeof reset === "object") {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform3.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x: x4,
            y: y3
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i4 = -1;
      }
    }
    return {
      x: x4,
      y: y3,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };
  var flip = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "flip",
      options,
      async fn(state) {
        var _middlewareData$arrow, _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform: platform3,
          elements
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = "bestFit",
          fallbackAxisSideDirection = "none",
          flipAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state);
        if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        const side = getSide(placement);
        const initialSideAxis = getSideAxis(initialPlacement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = await (platform3.isRTL == null ? void 0 : platform3.isRTL(elements.floating));
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
        if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements2 = [initialPlacement, ...fallbackPlacements];
        const overflow = await platform3.detectOverflow(state, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const sides2 = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];
        if (!overflows.every((side2) => side2 <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements2[nextIndex];
          if (nextPlacement) {
            const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
            if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
            // overflows the main axis.
            overflowsData.every((d3) => getSideAxis(d3.placement) === initialSideAxis ? d3.overflows[0] > 0 : true)) {
              return {
                data: {
                  index: nextIndex,
                  overflows: overflowsData
                },
                reset: {
                  placement: nextPlacement
                }
              };
            }
          }
          let resetPlacement = (_overflowsData$filter = overflowsData.filter((d3) => d3.overflows[0] <= 0).sort((a4, b3) => a4.overflows[1] - b3.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case "bestFit": {
                var _overflowsData$filter2;
                const placement2 = (_overflowsData$filter2 = overflowsData.filter((d3) => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d3.placement);
                    return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === "y";
                  }
                  return true;
                }).map((d3) => [d3.placement, d3.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a4, b3) => a4[1] - b3[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement2) {
                  resetPlacement = placement2;
                }
                break;
              }
              case "initialPlacement":
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };
  function getSideOffsets(overflow, rect) {
    return {
      top: overflow.top - rect.height,
      right: overflow.right - rect.width,
      bottom: overflow.bottom - rect.height,
      left: overflow.left - rect.width
    };
  }
  function isAnySideFullyClipped(overflow) {
    return sides.some((side) => overflow[side] >= 0);
  }
  var hide = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "hide",
      options,
      async fn(state) {
        const {
          rects,
          platform: platform3
        } = state;
        const {
          strategy = "referenceHidden",
          ...detectOverflowOptions
        } = evaluate(options, state);
        switch (strategy) {
          case "referenceHidden": {
            const overflow = await platform3.detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: "reference"
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
          case "escaped": {
            const overflow = await platform3.detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
          default: {
            return {};
          }
        }
      }
    };
  };
  var originSides = /* @__PURE__ */ new Set(["left", "top"]);
  async function convertValueToCoords(state, options) {
    const {
      placement,
      platform: platform3,
      elements
    } = state;
    const rtl = await (platform3.isRTL == null ? void 0 : platform3.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === "y";
    const mainAxisMulti = originSides.has(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === "number" ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: rawValue.mainAxis || 0,
      crossAxis: rawValue.crossAxis || 0,
      alignmentAxis: rawValue.alignmentAxis
    };
    if (alignment && typeof alignmentAxis === "number") {
      crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }
  var offset = function(options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: "offset",
      options,
      async fn(state) {
        var _middlewareData$offse, _middlewareData$arrow;
        const {
          x: x4,
          y: y3,
          placement,
          middlewareData
        } = state;
        const diffCoords = await convertValueToCoords(state, options);
        if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        return {
          x: x4 + diffCoords.x,
          y: y3 + diffCoords.y,
          data: {
            ...diffCoords,
            placement
          }
        };
      }
    };
  };
  var shift = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "shift",
      options,
      async fn(state) {
        const {
          x: x4,
          y: y3,
          placement,
          platform: platform3
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: (_ref) => {
              let {
                x: x5,
                y: y4
              } = _ref;
              return {
                x: x5,
                y: y4
              };
            }
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const coords = {
          x: x4,
          y: y3
        };
        const overflow = await platform3.detectOverflow(state, detectOverflowOptions);
        const crossAxis = getSideAxis(placement);
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        const clampCoord = (axis, coord) => clamp(coord + overflow[axis === "y" ? "top" : "left"], coord, coord - overflow[axis === "y" ? "bottom" : "right"]);
        if (checkMainAxis) {
          mainAxisCoord = clampCoord(mainAxis, mainAxisCoord);
        }
        if (checkCrossAxis) {
          crossAxisCoord = clampCoord(crossAxis, crossAxisCoord);
        }
        const limitedCoords = limiter.fn({
          ...state,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x4,
            y: limitedCoords.y - y3,
            enabled: {
              [mainAxis]: checkMainAxis,
              [crossAxis]: checkCrossAxis
            }
          }
        };
      }
    };
  };
  var limitShift = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      options,
      fn(state) {
        var _rawOffset$mainAxis, _rawOffset$crossAxis;
        const {
          x: x4,
          y: y3,
          placement,
          rects,
          middlewareData
        } = state;
        const {
          offset: offset4 = 0,
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true
        } = evaluate(options, state);
        const coords = {
          x: x4,
          y: y3
        };
        const crossAxis = getSideAxis(placement);
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        const rawOffset = evaluate(offset4, state);
        const computedOffset = typeof rawOffset === "number" ? {
          mainAxis: rawOffset,
          crossAxis: 0
        } : {
          mainAxis: (_rawOffset$mainAxis = rawOffset.mainAxis) != null ? _rawOffset$mainAxis : 0,
          crossAxis: (_rawOffset$crossAxis = rawOffset.crossAxis) != null ? _rawOffset$crossAxis : 0
        };
        if (checkMainAxis) {
          const len = mainAxis === "y" ? "height" : "width";
          const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
          const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
          if (mainAxisCoord < limitMin) {
            mainAxisCoord = limitMin;
          } else if (mainAxisCoord > limitMax) {
            mainAxisCoord = limitMax;
          }
        }
        if (checkCrossAxis) {
          var _middlewareData$offse, _middlewareData$offse2;
          const len = mainAxis === "y" ? "width" : "height";
          const isOriginSide = originSides.has(getSide(placement));
          const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
          const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
          if (crossAxisCoord < limitMin) {
            crossAxisCoord = limitMin;
          } else if (crossAxisCoord > limitMax) {
            crossAxisCoord = limitMax;
          }
        }
        return {
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        };
      }
    };
  };
  var size = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "size",
      options,
      async fn(state) {
        const {
          placement,
          rects,
          platform: platform3,
          elements
        } = state;
        const {
          apply = () => {
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const overflow = await platform3.detectOverflow(state, detectOverflowOptions);
        const side = getSide(placement);
        const alignment = getAlignment(placement);
        const isYAxis = getSideAxis(placement) === "y";
        const {
          width,
          height
        } = rects.floating;
        let heightSide;
        let widthSide;
        if (side === "top" || side === "bottom") {
          heightSide = side;
          widthSide = alignment === (await (platform3.isRTL == null ? void 0 : platform3.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
        } else {
          widthSide = side;
          heightSide = alignment === "end" ? "top" : "bottom";
        }
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        const maximumClippingWidth = width - overflow.left - overflow.right;
        const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
        const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
        const shiftData = state.middlewareData.shift;
        const noShift = !shiftData;
        let availableHeight = overflowAvailableHeight;
        let availableWidth = overflowAvailableWidth;
        if (shiftData != null && shiftData.enabled.x) {
          availableWidth = maximumClippingWidth;
        }
        if (shiftData != null && shiftData.enabled.y) {
          availableHeight = maximumClippingHeight;
        }
        if (noShift && !alignment) {
          if (isYAxis) {
            availableWidth = width - 2 * max(overflow.left, overflow.right);
          } else {
            availableHeight = height - 2 * max(overflow.top, overflow.bottom);
          }
        }
        await apply({
          ...state,
          availableWidth,
          availableHeight
        });
        const nextDimensions = await platform3.getDimensions(elements.floating);
        if (width !== nextDimensions.width || height !== nextDimensions.height) {
          return {
            reset: {
              rects: true
            }
          };
        }
        return {};
      }
    };
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
  function getCssDimensions(element) {
    const css = getComputedStyle2(element);
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }
  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }
  function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $: $3
    } = getCssDimensions(domElement);
    let x4 = ($3 ? round(rect.width) : rect.width) / width;
    let y3 = ($3 ? round(rect.height) : rect.height) / height;
    if (!x4 || !Number.isFinite(x4)) {
      x4 = 1;
    }
    if (!y3 || !Number.isFinite(y3)) {
      y3 = 1;
    }
    return {
      x: x4,
      y: y3
    };
  }
  var noOffsets = /* @__PURE__ */ createCoords(0);
  function getVisualOffsets(element) {
    const win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    return !!floatingOffsetParent && isFixed && floatingOffsetParent === getWindow(element);
  }
  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    let x4 = (clientRect.left + visualOffsets.x) / scale.x;
    let y3 = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement && offsetParent) {
      const win = getWindow(domElement);
      const offsetWin = isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentWin = win;
      let currentIFrame = getFrameElement(currentWin);
      while (currentIFrame && offsetWin !== currentWin) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle2(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x4 *= iframeScale.x;
        y3 *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x4 += left;
        y3 += top;
        currentWin = getWindow(currentIFrame);
        currentIFrame = getFrameElement(currentWin);
      }
    }
    return rectToClientRect({
      width,
      height,
      x: x4,
      y: y3
    });
  }
  function getWindowScrollBarX(element, rect) {
    const leftScroll = getNodeScroll(element).scrollLeft;
    if (!rect) {
      return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
    }
    return rect.left + leftScroll;
  }
  function getHTMLOffset(documentElement, scroll) {
    const htmlRect = documentElement.getBoundingClientRect();
    const x4 = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
    const y3 = htmlRect.top + scroll.scrollTop;
    return {
      x: x4,
      y: y3
    };
  }
  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      elements,
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isFixed = strategy === "fixed";
    const documentElement = getDocumentElement(offsetParent);
    const topLayer = elements ? isTopLayer(elements.floating) : false;
    if (offsetParent === documentElement || topLayer && isFixed) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createCoords(1);
    const offsets = createCoords(0);
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    if (isOffsetParentAnElement || !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
    };
  }
  function getClientRects(element) {
    return element.getClientRects ? Array.from(element.getClientRects()) : [];
  }
  function getDocumentRect(html) {
    const scroll = getNodeScroll(html);
    const body = html.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x4 = -scroll.scrollLeft + getWindowScrollBarX(html);
    const y3 = -scroll.scrollTop;
    if (getComputedStyle2(body).direction === "rtl") {
      x4 += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x: x4,
      y: y3
    };
  }
  var SCROLLBAR_MAX = 25;
  function getViewportRect(element, strategy, rootBoundary) {
    if (rootBoundary === void 0) {
      rootBoundary = "viewport";
    }
    const isLayoutViewport = rootBoundary === "layoutViewport";
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x4 = 0;
    let y3 = 0;
    if (visualViewport) {
      const layoutRelativeClientCoords = !isWebKit() || strategy === "fixed";
      if (isLayoutViewport) {
        if (!layoutRelativeClientCoords) {
          x4 = -visualViewport.offsetLeft;
          y3 = -visualViewport.offsetTop;
        }
      } else {
        width = visualViewport.width;
        height = visualViewport.height;
        if (layoutRelativeClientCoords) {
          x4 = visualViewport.offsetLeft;
          y3 = visualViewport.offsetTop;
        }
      }
    }
    const windowScrollbarX = getWindowScrollBarX(html);
    if (windowScrollbarX <= 0) {
      const doc = html.ownerDocument;
      const body = doc.body;
      const bodyStyles = getComputedStyle(body);
      const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
      const reservedWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
      const gutter = getComputedStyle(html).scrollbarGutter === "stable both-edges" ? reservedWidth / 2 : reservedWidth;
      if (gutter <= SCROLLBAR_MAX) {
        width -= gutter;
      }
    }
    return {
      width,
      height,
      x: x4,
      y: y3
    };
  }
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = getScale(element);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x4 = left * scale.x;
    const y3 = top * scale.y;
    return {
      width,
      height,
      x: x4,
      y: y3
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === "viewport" || clippingAncestor === "layoutViewport") {
      rect = getViewportRect(element, strategy, clippingAncestor);
    } else if (clippingAncestor === "document") {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y,
        width: clippingAncestor.width,
        height: clippingAncestor.height
      };
    }
    return rectToClientRect(rect);
  }
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
    let lastKeptComputedStyle = null;
    const elementIsFixed = getComputedStyle2(element).position === "fixed";
    let currentNode = elementIsFixed ? getParentNode(element) : element;
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle2(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      const lastPosition = lastKeptComputedStyle ? lastKeptComputedStyle.position : elementIsFixed ? "fixed" : "";
      const shouldDropCurrentNode = !currentNodeIsContaining && (lastPosition === "fixed" || lastPosition === "absolute" && computedStyle.position === "static");
      if (shouldDropCurrentNode) {
        result = result.filter((ancestor) => ancestor !== currentNode);
      } else {
        lastKeptComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
    let top = firstRect.top;
    let right = firstRect.right;
    let bottom = firstRect.bottom;
    let left = firstRect.left;
    for (let i4 = 1; i4 < clippingAncestors.length; i4++) {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i4], strategy);
      top = max(rect.top, top);
      right = min(rect.right, right);
      bottom = min(rect.bottom, bottom);
      left = max(rect.left, left);
    }
    return {
      width: right - left,
      height: bottom - top,
      x: left,
      y: top
    };
  }
  function getDimensions(element) {
    const {
      width,
      height
    } = getCssDimensions(element);
    return {
      width,
      height
    };
  }
  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === "fixed";
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createCoords(0);
    if (isOffsetParentAnElement || !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    if (!isOffsetParentAnElement && documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    const x4 = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
    const y3 = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
    return {
      x: x4,
      y: y3,
      width: rect.width,
      height: rect.height
    };
  }
  function isStaticPositioned(element) {
    return getComputedStyle2(element).position === "static";
  }
  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    let rawOffsetParent = element.offsetParent;
    if (getDocumentElement(element) === rawOffsetParent) {
      rawOffsetParent = rawOffsetParent.ownerDocument.body;
    }
    return rawOffsetParent;
  }
  function getOffsetParent(element, polyfill) {
    const win = getWindow(element);
    if (isTopLayer(element)) {
      return win;
    }
    if (!isHTMLElement(element)) {
      let svgOffsetParent = getParentNode(element);
      while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
        if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
          return svgOffsetParent;
        }
        svgOffsetParent = getParentNode(svgOffsetParent);
      }
      return win;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
      return win;
    }
    return offsetParent || getContainingBlock(element) || win;
  }
  var getElementRects = async function(data) {
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    const floatingDimensions = await getDimensionsFn(data.floating);
    return {
      reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
      floating: {
        x: 0,
        y: 0,
        width: floatingDimensions.width,
        height: floatingDimensions.height
      }
    };
  };
  function isRTL(element) {
    return getComputedStyle2(element).direction === "rtl";
  }
  var platform2 = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL
  };
  function rectsAreEqual(a4, b3) {
    return a4.x === b3.x && a4.y === b3.y && a4.width === b3.width && a4.height === b3.height;
  }
  function observeMove(element, onMove, ancestorResize) {
    let io = null;
    let timeoutId;
    const root = getDocumentElement(element);
    function cleanup() {
      var _io;
      clearTimeout(timeoutId);
      (_io = io) == null || _io.disconnect();
      io = null;
    }
    function refresh(skip, threshold) {
      if (skip === void 0) {
        skip = false;
      }
      if (threshold === void 0) {
        threshold = 1;
      }
      cleanup();
      const elementRectForRootMargin = element.getBoundingClientRect();
      const {
        left,
        top,
        width,
        height
      } = elementRectForRootMargin;
      if (!skip) {
        onMove();
      }
      if (!width || !height) {
        return;
      }
      const insetTop = floor(top);
      const insetRight = floor(root.clientWidth - (left + width));
      const insetBottom = floor(root.clientHeight - (top + height));
      const insetLeft = floor(left);
      const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
      const options = {
        rootMargin,
        threshold: max(0, min(1, threshold)) || 1
      };
      let isFirstUpdate = true;
      function handleObserve(entries) {
        const ratio = entries[0].intersectionRatio;
        if (!rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
          return refresh();
        }
        if (ratio !== threshold) {
          if (!isFirstUpdate) {
            return refresh();
          }
          if (!ratio) {
            timeoutId = setTimeout(() => {
              refresh(false, 1e-7);
            }, 1e3);
          } else {
            refresh(false, ratio);
          }
        }
        isFirstUpdate = false;
      }
      try {
        io = new IntersectionObserver(handleObserve, {
          ...options,
          // Handle <iframe>s
          root: root.ownerDocument
        });
      } catch (_e) {
        io = new IntersectionObserver(handleObserve, options);
      }
      io.observe(element);
    }
    const win = getWindow(element);
    const handleResize = () => refresh(ancestorResize);
    win.addEventListener("resize", handleResize);
    refresh(true);
    return () => {
      win.removeEventListener("resize", handleResize);
      cleanup();
    };
  }
  function autoUpdate(reference, floating, update2, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      ancestorScroll = true,
      ancestorResize = true,
      elementResize = typeof ResizeObserver === "function",
      layoutShift = typeof IntersectionObserver === "function",
      animationFrame = false
    } = options;
    const referenceEl = unwrapElement(reference);
    const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.addEventListener("scroll", update2);
      ancestorResize && ancestor.addEventListener("resize", update2);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update2, ancestorResize) : null;
    let reobserveFrame = -1;
    let resizeObserver = null;
    if (elementResize) {
      resizeObserver = new ResizeObserver((_ref) => {
        let [firstEntry] = _ref;
        if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
          resizeObserver.unobserve(floating);
          cancelAnimationFrame(reobserveFrame);
          reobserveFrame = requestAnimationFrame(() => {
            var _resizeObserver;
            (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
          });
        }
        update2();
      });
      if (referenceEl && !animationFrame) {
        resizeObserver.observe(referenceEl);
      }
      if (floating) {
        resizeObserver.observe(floating);
      }
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
      frameLoop();
    }
    function frameLoop() {
      const nextRefRect = getBoundingClientRect(reference);
      if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
        update2();
      }
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop);
    }
    update2();
    return () => {
      var _resizeObserver2;
      ancestors.forEach((ancestor) => {
        ancestorScroll && ancestor.removeEventListener("scroll", update2);
        ancestorResize && ancestor.removeEventListener("resize", update2);
      });
      cleanupIo == null || cleanupIo();
      (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
      resizeObserver = null;
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  }
  var offset2 = offset;
  var shift2 = shift;
  var flip2 = flip;
  var size2 = size;
  var hide2 = hide;
  var limitShift2 = limitShift;
  var computePosition2 = (reference, floating, options) => {
    const cache = /* @__PURE__ */ new Map();
    const mergedOptions = options != null ? options : {};
    const platformWithCache = {
      ...platform2,
      ...mergedOptions.platform,
      _c: cache
    };
    return computePosition(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
  var React37 = __toESM(require_compat(), 1);
  var import_react2 = __toESM(require_compat(), 1);
  var ReactDOM4 = __toESM(require_compat(), 1);
  var isClient = typeof document !== "undefined";
  var noop2 = function noop3() {
  };
  var index = isClient ? import_react2.useLayoutEffect : noop2;
  function deepEqual(a4, b3) {
    if (a4 === b3) {
      return true;
    }
    if (typeof a4 !== typeof b3) {
      return false;
    }
    if (typeof a4 === "function" && a4.toString() === b3.toString()) {
      return true;
    }
    let length;
    let i4;
    let keys;
    if (a4 && b3 && typeof a4 === "object") {
      if (Array.isArray(a4)) {
        length = a4.length;
        if (length !== b3.length) return false;
        for (i4 = length; i4-- !== 0; ) {
          if (!deepEqual(a4[i4], b3[i4])) {
            return false;
          }
        }
        return true;
      }
      keys = Object.keys(a4);
      length = keys.length;
      if (length !== Object.keys(b3).length) {
        return false;
      }
      for (i4 = length; i4-- !== 0; ) {
        if (!{}.hasOwnProperty.call(b3, keys[i4])) {
          return false;
        }
      }
      for (i4 = length; i4-- !== 0; ) {
        const key = keys[i4];
        if (key === "_owner" && a4.$$typeof) {
          continue;
        }
        if (!deepEqual(a4[key], b3[key])) {
          return false;
        }
      }
      return true;
    }
    return a4 !== a4 && b3 !== b3;
  }
  function getDPR(element) {
    if (typeof window === "undefined") {
      return 1;
    }
    const win = element.ownerDocument.defaultView || window;
    return win.devicePixelRatio || 1;
  }
  function roundByDPR(element, value) {
    const dpr = getDPR(element);
    return Math.round(value * dpr) / dpr;
  }
  function useLatestRef(value) {
    const ref = React37.useRef(value);
    index(() => {
      ref.current = value;
    });
    return ref;
  }
  function useFloating(options) {
    if (options === void 0) {
      options = {};
    }
    const {
      placement = "bottom",
      strategy = "absolute",
      middleware = [],
      platform: platform3,
      elements: {
        reference: externalReference,
        floating: externalFloating
      } = {},
      transform = true,
      whileElementsMounted,
      open
    } = options;
    const [data, setData] = React37.useState({
      x: 0,
      y: 0,
      strategy,
      placement,
      middlewareData: {},
      isPositioned: false
    });
    const [latestMiddleware, setLatestMiddleware] = React37.useState(middleware);
    if (!deepEqual(latestMiddleware, middleware)) {
      setLatestMiddleware(middleware);
    }
    const [_reference, _setReference] = React37.useState(null);
    const [_floating, _setFloating] = React37.useState(null);
    const setReference = React37.useCallback((node) => {
      if (node !== referenceRef.current) {
        referenceRef.current = node;
        _setReference(node);
      }
    }, []);
    const setFloating = React37.useCallback((node) => {
      if (node !== floatingRef.current) {
        floatingRef.current = node;
        _setFloating(node);
      }
    }, []);
    const referenceEl = externalReference || _reference;
    const floatingEl = externalFloating || _floating;
    const referenceRef = React37.useRef(null);
    const floatingRef = React37.useRef(null);
    const dataRef = React37.useRef(data);
    const hasWhileElementsMounted = whileElementsMounted != null;
    const whileElementsMountedRef = useLatestRef(whileElementsMounted);
    const platformRef = useLatestRef(platform3);
    const openRef = useLatestRef(open);
    const update2 = React37.useCallback(() => {
      if (!referenceRef.current || !floatingRef.current) {
        return;
      }
      const config = {
        placement,
        strategy,
        middleware: latestMiddleware
      };
      if (platformRef.current) {
        config.platform = platformRef.current;
      }
      computePosition2(referenceRef.current, floatingRef.current, config).then((data2) => {
        const fullData = {
          ...data2,
          // The floating element's position may be recomputed while it's closed
          // but still mounted (such as when transitioning out). To ensure
          // `isPositioned` will be `false` initially on the next open, avoid
          // setting it to `true` when `open === false` (must be specified).
          isPositioned: openRef.current !== false
        };
        if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
          dataRef.current = fullData;
          ReactDOM4.flushSync(() => {
            setData(fullData);
          });
        }
      });
    }, [latestMiddleware, placement, strategy, platformRef, openRef]);
    index(() => {
      if (open === false && dataRef.current.isPositioned) {
        dataRef.current.isPositioned = false;
        setData((data2) => ({
          ...data2,
          isPositioned: false
        }));
      }
    }, [open]);
    const isMountedRef = React37.useRef(false);
    index(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
      };
    }, []);
    index(() => {
      if (referenceEl) referenceRef.current = referenceEl;
      if (floatingEl) floatingRef.current = floatingEl;
      if (referenceEl && floatingEl) {
        if (whileElementsMountedRef.current) {
          return whileElementsMountedRef.current(referenceEl, floatingEl, update2);
        }
        update2();
      }
    }, [referenceEl, floatingEl, update2, whileElementsMountedRef, hasWhileElementsMounted]);
    const refs = React37.useMemo(() => ({
      reference: referenceRef,
      floating: floatingRef,
      setReference,
      setFloating
    }), [setReference, setFloating]);
    const elements = React37.useMemo(() => ({
      reference: referenceEl,
      floating: floatingEl
    }), [referenceEl, floatingEl]);
    const floatingStyles = React37.useMemo(() => {
      const initialStyles = {
        position: strategy,
        left: 0,
        top: 0
      };
      if (!elements.floating) {
        return initialStyles;
      }
      const x4 = roundByDPR(elements.floating, data.x);
      const y3 = roundByDPR(elements.floating, data.y);
      if (transform) {
        return {
          ...initialStyles,
          transform: "translate(" + x4 + "px, " + y3 + "px)",
          ...getDPR(elements.floating) >= 1.5 && {
            willChange: "transform"
          }
        };
      }
      return {
        position: strategy,
        left: x4,
        top: y3
      };
    }, [strategy, transform, elements.floating, data.x, data.y]);
    return React37.useMemo(() => ({
      ...data,
      update: update2,
      refs,
      elements,
      floatingStyles
    }), [data, update2, refs, elements, floatingStyles]);
  }
  var offset3 = (options, deps) => {
    const result = offset2(options);
    return {
      name: result.name,
      fn: result.fn,
      options: [options, deps]
    };
  };
  var shift3 = (options, deps) => {
    const result = shift2(options);
    return {
      name: result.name,
      fn: result.fn,
      options: [options, deps]
    };
  };
  var limitShift3 = (options, deps) => {
    const result = limitShift2(options);
    return {
      fn: result.fn,
      options: [options, deps]
    };
  };
  var flip3 = (options, deps) => {
    const result = flip2(options);
    return {
      name: result.name,
      fn: result.fn,
      options: [options, deps]
    };
  };
  var size3 = (options, deps) => {
    const result = size2(options);
    return {
      name: result.name,
      fn: result.fn,
      options: [options, deps]
    };
  };
  var hide3 = (options, deps) => {
    const result = hide2(options);
    return {
      name: result.name,
      fn: result.fn,
      options: [options, deps]
    };
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useDismiss.js
  var bubbleHandlerKeys = {
    intentional: "onClick",
    sloppy: "onPointerDown"
  };
  function normalizeProp(normalizable) {
    return {
      escapeKey: typeof normalizable === "boolean" ? normalizable : normalizable?.escapeKey ?? false,
      outsidePress: typeof normalizable === "boolean" ? normalizable : normalizable?.outsidePress ?? true
    };
  }
  function useDismiss(context, props = {}) {
    const store = "rootStore" in context ? context.rootStore : context;
    const open = store.useState("open");
    const floatingElement = store.useState("floatingElement");
    const referenceElement = store.useState("referenceElement");
    const domReferenceElement = store.useState("domReferenceElement");
    const {
      onOpenChange,
      dataRef
    } = store.context;
    const {
      enabled = true,
      escapeKey: escapeKey2 = true,
      outsidePress: outsidePressProp = true,
      outsidePressEvent = "sloppy",
      referencePress = false,
      referencePressEvent = "sloppy",
      ancestorScroll = false,
      bubbles,
      externalTree
    } = props;
    const tree = useFloatingTree(externalTree);
    const outsidePressFn = useStableCallback(typeof outsidePressProp === "function" ? outsidePressProp : () => false);
    const outsidePress2 = typeof outsidePressProp === "function" ? outsidePressFn : outsidePressProp;
    const endedOrStartedInsideRef = React38.useRef(false);
    const {
      escapeKey: escapeKeyBubbles,
      outsidePress: outsidePressBubbles
    } = normalizeProp(bubbles);
    const touchStateRef = React38.useRef(null);
    const cancelDismissOnEndTimeout = useTimeout();
    const clearInsideReactTreeTimeout = useTimeout();
    const clearInsideReactTree = useStableCallback(() => {
      clearInsideReactTreeTimeout.clear();
      dataRef.current.insideReactTree = false;
    });
    const isComposingRef = React38.useRef(false);
    const currentPointerTypeRef = React38.useRef("");
    const trackPointerType = useStableCallback((event) => {
      currentPointerTypeRef.current = event.pointerType;
    });
    const getOutsidePressEvent = useStableCallback(() => {
      const type = currentPointerTypeRef.current;
      const computedType = type === "pen" || !type ? "mouse" : type;
      const resolved = typeof outsidePressEvent === "function" ? outsidePressEvent() : outsidePressEvent;
      if (typeof resolved === "string") {
        return resolved;
      }
      return resolved[computedType];
    });
    const closeOnEscapeKeyDown = useStableCallback((event) => {
      if (!open || !enabled || !escapeKey2 || event.key !== "Escape") {
        return;
      }
      if (isComposingRef.current) {
        return;
      }
      const nodeId = dataRef.current.floatingContext?.nodeId;
      const children = tree ? getNodeChildren(tree.nodesRef.current, nodeId) : [];
      if (!escapeKeyBubbles) {
        if (children.length > 0) {
          let shouldDismiss = true;
          children.forEach((child) => {
            if (child.context?.open && !child.context.dataRef.current.__escapeKeyBubbles) {
              shouldDismiss = false;
            }
          });
          if (!shouldDismiss) {
            return;
          }
        }
      }
      const native = isReactEvent(event) ? event.nativeEvent : event;
      const eventDetails = createChangeEventDetails(reason_parts_exports.escapeKey, native);
      store.setOpen(false, eventDetails);
      if (!escapeKeyBubbles && !eventDetails.isPropagationAllowed) {
        event.stopPropagation();
      }
    });
    const shouldIgnoreEvent = useStableCallback((event) => {
      const computedOutsidePressEvent = getOutsidePressEvent();
      return computedOutsidePressEvent === "intentional" && event.type !== "click" || computedOutsidePressEvent === "sloppy" && event.type === "click";
    });
    const markInsideReactTree = useStableCallback(() => {
      dataRef.current.insideReactTree = true;
      clearInsideReactTreeTimeout.start(0, clearInsideReactTree);
    });
    const closeOnPressOutside = useStableCallback((event, endedOrStartedInside = false) => {
      if (shouldIgnoreEvent(event)) {
        clearInsideReactTree();
        return;
      }
      if (dataRef.current.insideReactTree) {
        clearInsideReactTree();
        return;
      }
      if (getOutsidePressEvent() === "intentional" && endedOrStartedInside) {
        return;
      }
      if (typeof outsidePress2 === "function" && !outsidePress2(event)) {
        return;
      }
      const target = getTarget(event);
      const inertSelector = `[${createAttribute("inert")}]`;
      const markers = getDocument(store.select("floatingElement")).querySelectorAll(inertSelector);
      const triggers = store.context.triggerElements;
      if (target && (triggers.hasElement(target) || triggers.hasMatchingElement((trigger) => contains(trigger, target)))) {
        return;
      }
      let targetRootAncestor = isElement(target) ? target : null;
      while (targetRootAncestor && !isLastTraversableNode(targetRootAncestor)) {
        const nextParent = getParentNode(targetRootAncestor);
        if (isLastTraversableNode(nextParent) || !isElement(nextParent)) {
          break;
        }
        targetRootAncestor = nextParent;
      }
      if (markers.length && isElement(target) && !isRootElement(target) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
      !contains(target, store.select("floatingElement")) && // If the target root element contains none of the markers, then the
      // element was injected after the floating element rendered.
      Array.from(markers).every((marker) => !contains(targetRootAncestor, marker))) {
        return;
      }
      if (isHTMLElement(target) && !("touches" in event)) {
        const lastTraversableNode = isLastTraversableNode(target);
        const style = getComputedStyle2(target);
        const scrollRe = /auto|scroll/;
        const isScrollableX = lastTraversableNode || scrollRe.test(style.overflowX);
        const isScrollableY = lastTraversableNode || scrollRe.test(style.overflowY);
        const canScrollX = isScrollableX && target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
        const canScrollY = isScrollableY && target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
        const isRTL2 = style.direction === "rtl";
        const pressedVerticalScrollbar = canScrollY && (isRTL2 ? event.offsetX <= target.offsetWidth - target.clientWidth : event.offsetX > target.clientWidth);
        const pressedHorizontalScrollbar = canScrollX && event.offsetY > target.clientHeight;
        if (pressedVerticalScrollbar || pressedHorizontalScrollbar) {
          return;
        }
      }
      const nodeId = dataRef.current.floatingContext?.nodeId;
      const targetIsInsideChildren = tree && getNodeChildren(tree.nodesRef.current, nodeId).some((node) => isEventTargetWithin(event, node.context?.elements.floating));
      if (isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement")) || targetIsInsideChildren) {
        return;
      }
      const children = tree ? getNodeChildren(tree.nodesRef.current, nodeId) : [];
      if (children.length > 0) {
        let shouldDismiss = true;
        children.forEach((child) => {
          if (child.context?.open && !child.context.dataRef.current.__outsidePressBubbles) {
            shouldDismiss = false;
          }
        });
        if (!shouldDismiss) {
          return;
        }
      }
      store.setOpen(false, createChangeEventDetails(reason_parts_exports.outsidePress, event));
      clearInsideReactTree();
    });
    const handlePointerDown = useStableCallback((event) => {
      if (getOutsidePressEvent() !== "sloppy" || event.pointerType === "touch" || !store.select("open") || !enabled || isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement"))) {
        return;
      }
      closeOnPressOutside(event);
    });
    const handleTouchStart = useStableCallback((event) => {
      if (getOutsidePressEvent() !== "sloppy" || !store.select("open") || !enabled || isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement"))) {
        return;
      }
      const touch = event.touches[0];
      if (touch) {
        touchStateRef.current = {
          startTime: Date.now(),
          startX: touch.clientX,
          startY: touch.clientY,
          dismissOnTouchEnd: false,
          dismissOnMouseDown: true
        };
        cancelDismissOnEndTimeout.start(1e3, () => {
          if (touchStateRef.current) {
            touchStateRef.current.dismissOnTouchEnd = false;
            touchStateRef.current.dismissOnMouseDown = false;
          }
        });
      }
    });
    const handleTouchStartCapture = useStableCallback((event) => {
      const target = getTarget(event);
      function callback() {
        handleTouchStart(event);
        target?.removeEventListener(event.type, callback);
      }
      target?.addEventListener(event.type, callback);
    });
    const closeOnPressOutsideCapture = useStableCallback((event) => {
      const endedOrStartedInside = endedOrStartedInsideRef.current;
      endedOrStartedInsideRef.current = false;
      cancelDismissOnEndTimeout.clear();
      if (event.type === "mousedown" && touchStateRef.current && !touchStateRef.current.dismissOnMouseDown) {
        return;
      }
      const target = getTarget(event);
      function callback() {
        if (event.type === "pointerdown") {
          handlePointerDown(event);
        } else {
          closeOnPressOutside(event, endedOrStartedInside);
        }
        target?.removeEventListener(event.type, callback);
      }
      target?.addEventListener(event.type, callback);
    });
    const handleTouchMove = useStableCallback((event) => {
      if (getOutsidePressEvent() !== "sloppy" || !touchStateRef.current || isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement"))) {
        return;
      }
      const touch = event.touches[0];
      if (!touch) {
        return;
      }
      const deltaX = Math.abs(touch.clientX - touchStateRef.current.startX);
      const deltaY = Math.abs(touch.clientY - touchStateRef.current.startY);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance > 5) {
        touchStateRef.current.dismissOnTouchEnd = true;
      }
      if (distance > 10) {
        closeOnPressOutside(event);
        cancelDismissOnEndTimeout.clear();
        touchStateRef.current = null;
      }
    });
    const handleTouchMoveCapture = useStableCallback((event) => {
      const target = getTarget(event);
      function callback() {
        handleTouchMove(event);
        target?.removeEventListener(event.type, callback);
      }
      target?.addEventListener(event.type, callback);
    });
    const handleTouchEnd = useStableCallback((event) => {
      if (getOutsidePressEvent() !== "sloppy" || !touchStateRef.current || isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement"))) {
        return;
      }
      if (touchStateRef.current.dismissOnTouchEnd) {
        closeOnPressOutside(event);
      }
      cancelDismissOnEndTimeout.clear();
      touchStateRef.current = null;
    });
    const handleTouchEndCapture = useStableCallback((event) => {
      const target = getTarget(event);
      function callback() {
        handleTouchEnd(event);
        target?.removeEventListener(event.type, callback);
      }
      target?.addEventListener(event.type, callback);
    });
    React38.useEffect(() => {
      if (!open || !enabled) {
        return void 0;
      }
      dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
      dataRef.current.__outsidePressBubbles = outsidePressBubbles;
      const compositionTimeout = new Timeout();
      function onScroll(event) {
        store.setOpen(false, createChangeEventDetails(reason_parts_exports.none, event));
      }
      function handleCompositionStart() {
        compositionTimeout.clear();
        isComposingRef.current = true;
      }
      function handleCompositionEnd() {
        compositionTimeout.start(
          // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
          // Only apply to WebKit for the test to remain 0ms.
          isWebKit() ? 5 : 0,
          () => {
            isComposingRef.current = false;
          }
        );
      }
      const doc = getDocument(floatingElement);
      doc.addEventListener("pointerdown", trackPointerType, true);
      if (escapeKey2) {
        doc.addEventListener("keydown", closeOnEscapeKeyDown);
        doc.addEventListener("compositionstart", handleCompositionStart);
        doc.addEventListener("compositionend", handleCompositionEnd);
      }
      if (outsidePress2) {
        doc.addEventListener("click", closeOnPressOutsideCapture, true);
        doc.addEventListener("pointerdown", closeOnPressOutsideCapture, true);
        doc.addEventListener("touchstart", handleTouchStartCapture, true);
        doc.addEventListener("touchmove", handleTouchMoveCapture, true);
        doc.addEventListener("touchend", handleTouchEndCapture, true);
        doc.addEventListener("mousedown", closeOnPressOutsideCapture, true);
      }
      let ancestors = [];
      if (ancestorScroll) {
        if (isElement(domReferenceElement)) {
          ancestors = getOverflowAncestors(domReferenceElement);
        }
        if (isElement(floatingElement)) {
          ancestors = ancestors.concat(getOverflowAncestors(floatingElement));
        }
        if (!isElement(referenceElement) && referenceElement && referenceElement.contextElement) {
          ancestors = ancestors.concat(getOverflowAncestors(referenceElement.contextElement));
        }
      }
      ancestors = ancestors.filter((ancestor) => ancestor !== doc.defaultView?.visualViewport);
      ancestors.forEach((ancestor) => {
        ancestor.addEventListener("scroll", onScroll, {
          passive: true
        });
      });
      return () => {
        doc.removeEventListener("pointerdown", trackPointerType, true);
        if (escapeKey2) {
          doc.removeEventListener("keydown", closeOnEscapeKeyDown);
          doc.removeEventListener("compositionstart", handleCompositionStart);
          doc.removeEventListener("compositionend", handleCompositionEnd);
        }
        if (outsidePress2) {
          doc.removeEventListener("click", closeOnPressOutsideCapture, true);
          doc.removeEventListener("pointerdown", closeOnPressOutsideCapture, true);
          doc.removeEventListener("touchstart", handleTouchStartCapture, true);
          doc.removeEventListener("touchmove", handleTouchMoveCapture, true);
          doc.removeEventListener("touchend", handleTouchEndCapture, true);
          doc.removeEventListener("mousedown", closeOnPressOutsideCapture, true);
        }
        ancestors.forEach((ancestor) => {
          ancestor.removeEventListener("scroll", onScroll);
        });
        compositionTimeout.clear();
      };
    }, [dataRef, floatingElement, referenceElement, domReferenceElement, escapeKey2, outsidePress2, open, onOpenChange, ancestorScroll, enabled, escapeKeyBubbles, outsidePressBubbles, closeOnEscapeKeyDown, closeOnPressOutside, closeOnPressOutsideCapture, handlePointerDown, handleTouchStartCapture, handleTouchMoveCapture, handleTouchEndCapture, trackPointerType, store]);
    React38.useEffect(clearInsideReactTree, [outsidePress2, clearInsideReactTree]);
    const reference = React38.useMemo(() => ({
      onKeyDown: closeOnEscapeKeyDown,
      ...referencePress && {
        [bubbleHandlerKeys[referencePressEvent]]: (event) => {
          store.setOpen(false, createChangeEventDetails(reason_parts_exports.triggerPress, event.nativeEvent));
        },
        ...referencePressEvent !== "intentional" && {
          onClick(event) {
            store.setOpen(false, createChangeEventDetails(reason_parts_exports.triggerPress, event.nativeEvent));
          }
        }
      }
    }), [closeOnEscapeKeyDown, store, referencePress, referencePressEvent]);
    const handlePressedInside = useStableCallback((event) => {
      const target = getTarget(event.nativeEvent);
      if (!contains(store.select("floatingElement"), target) || event.button !== 0) {
        return;
      }
      endedOrStartedInsideRef.current = true;
    });
    const floating = React38.useMemo(() => ({
      onKeyDown: closeOnEscapeKeyDown,
      // `onMouseDown` may be blocked if `event.preventDefault()` is called in
      // `onPointerDown`, such as with <NumberField.ScrubArea>.
      // See https://github.com/mui/base-ui/pull/3379
      onPointerDown: handlePressedInside,
      onMouseDown: handlePressedInside,
      onMouseUp: handlePressedInside,
      onClickCapture: markInsideReactTree,
      onMouseDownCapture: markInsideReactTree,
      onPointerDownCapture: markInsideReactTree,
      onMouseUpCapture: markInsideReactTree,
      onTouchEndCapture: markInsideReactTree,
      onTouchMoveCapture: markInsideReactTree
    }), [closeOnEscapeKeyDown, handlePressedInside, markInsideReactTree]);
    return React38.useMemo(() => enabled ? {
      reference,
      floating,
      trigger: reference
    } : {}, [enabled, reference, floating]);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useFloating.js
  var React42 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/reselect/dist/reselect.mjs
  var NOT_FOUND = /* @__PURE__ */ Symbol("NOT_FOUND");
  function assertIsFunction(func, errorMessage = `expected a function, instead received ${typeof func}`) {
    if (typeof func !== "function") {
      throw new TypeError(errorMessage);
    }
  }
  function assertIsArrayOfFunctions(array, errorMessage = `expected all items to be functions, instead received the following types: `) {
    if (!array.every((item) => typeof item === "function")) {
      const itemTypes = array.map(
        (item) => typeof item === "function" ? `function ${item.name || "unnamed"}()` : typeof item
      ).join(", ");
      throw new TypeError(`${errorMessage}[${itemTypes}]`);
    }
  }
  var ensureIsArray = (item) => {
    return Array.isArray(item) ? item : [item];
  };
  function getDependencies(createSelectorArgs) {
    const dependencies = Array.isArray(createSelectorArgs[0]) ? createSelectorArgs[0] : createSelectorArgs;
    assertIsArrayOfFunctions(
      dependencies,
      `createSelector expects all input-selectors to be functions, but received the following types: `
    );
    return dependencies;
  }
  function collectInputSelectorResults(dependencies, inputSelectorArgs) {
    const inputSelectorResults = [];
    const { length } = dependencies;
    for (let i4 = 0; i4 < length; i4++) {
      inputSelectorResults.push(dependencies[i4].apply(null, inputSelectorArgs));
    }
    return inputSelectorResults;
  }
  function createSingletonCache(equals) {
    let entry;
    return {
      get(key) {
        if (entry && equals(entry.key, key)) {
          return entry.value;
        }
        return NOT_FOUND;
      },
      put(key, value) {
        entry = { key, value };
      },
      getEntries() {
        return entry ? [entry] : [];
      },
      clear() {
        entry = void 0;
      }
    };
  }
  function createLruCache(maxSize, equals) {
    let entries = [];
    function get(key) {
      const cacheIndex = entries.findIndex((entry) => equals(key, entry.key));
      if (cacheIndex > -1) {
        const entry = entries[cacheIndex];
        if (cacheIndex > 0) {
          entries.splice(cacheIndex, 1);
          entries.unshift(entry);
        }
        return entry.value;
      }
      return NOT_FOUND;
    }
    function put(key, value) {
      if (get(key) === NOT_FOUND) {
        entries.unshift({ key, value });
        if (entries.length > maxSize) {
          entries.pop();
        }
      }
    }
    function getEntries() {
      return entries;
    }
    function clear() {
      entries = [];
    }
    return { get, put, getEntries, clear };
  }
  var referenceEqualityCheck = (a4, b3) => a4 === b3;
  function createCacheKeyComparator(equalityCheck) {
    return function areArgumentsShallowlyEqual(prev, next) {
      if (prev === null || next === null || prev.length !== next.length) {
        return false;
      }
      const { length } = prev;
      for (let i4 = 0; i4 < length; i4++) {
        if (!equalityCheck(prev[i4], next[i4])) {
          return false;
        }
      }
      return true;
    };
  }
  function lruMemoize(func, equalityCheckOrOptions) {
    const providedOptions = typeof equalityCheckOrOptions === "object" ? equalityCheckOrOptions : { equalityCheck: equalityCheckOrOptions };
    const {
      equalityCheck = referenceEqualityCheck,
      maxSize = 1,
      resultEqualityCheck
    } = providedOptions;
    const comparator = createCacheKeyComparator(equalityCheck);
    let resultsCount = 0;
    const cache = maxSize <= 1 ? createSingletonCache(comparator) : createLruCache(maxSize, comparator);
    function memoized() {
      let value = cache.get(arguments);
      if (value === NOT_FOUND) {
        value = func.apply(null, arguments);
        resultsCount++;
        if (resultEqualityCheck) {
          const entries = cache.getEntries();
          const matchingEntry = entries.find(
            (entry) => resultEqualityCheck(entry.value, value)
          );
          if (matchingEntry) {
            value = matchingEntry.value;
            resultsCount !== 0 && resultsCount--;
          }
        }
        cache.put(arguments, value);
      }
      return value;
    }
    memoized.clearCache = () => {
      cache.clear();
      memoized.resetResultsCount();
    };
    memoized.resultsCount = () => resultsCount;
    memoized.resetResultsCount = () => {
      resultsCount = 0;
    };
    return memoized;
  }
  var StrongRef = class {
    constructor(value) {
      this.value = value;
    }
    deref() {
      return this.value;
    }
  };
  var getWeakRef = () => typeof WeakRef === "undefined" ? StrongRef : WeakRef;
  var Ref = /* @__PURE__ */ getWeakRef();
  var UNTERMINATED = 0;
  var TERMINATED = 1;
  function createCacheNode() {
    return {
      s: UNTERMINATED,
      v: void 0,
      o: null,
      p: null
    };
  }
  function maybeDeref(r3) {
    if (r3 instanceof Ref) {
      return r3.deref();
    }
    return r3;
  }
  function weakMapMemoize(func, options = {}) {
    let fnNode = createCacheNode();
    const { resultEqualityCheck } = options;
    let lastResult;
    let resultsCount = 0;
    function memoized() {
      let cacheNode = fnNode;
      const { length } = arguments;
      for (let i4 = 0, l4 = length; i4 < l4; i4++) {
        const arg = arguments[i4];
        if (typeof arg === "function" || typeof arg === "object" && arg !== null) {
          let objectCache = cacheNode.o;
          if (objectCache === null) {
            cacheNode.o = objectCache = /* @__PURE__ */ new WeakMap();
          }
          const objectNode = objectCache.get(arg);
          if (objectNode === void 0) {
            cacheNode = createCacheNode();
            objectCache.set(arg, cacheNode);
          } else {
            cacheNode = objectNode;
          }
        } else {
          let primitiveCache = cacheNode.p;
          if (primitiveCache === null) {
            cacheNode.p = primitiveCache = /* @__PURE__ */ new Map();
          }
          const primitiveNode = primitiveCache.get(arg);
          if (primitiveNode === void 0) {
            cacheNode = createCacheNode();
            primitiveCache.set(arg, cacheNode);
          } else {
            cacheNode = primitiveNode;
          }
        }
      }
      const terminatedNode = cacheNode;
      let result;
      if (cacheNode.s === TERMINATED) {
        result = cacheNode.v;
      } else {
        result = func.apply(null, arguments);
        resultsCount++;
        if (resultEqualityCheck) {
          const lastResultValue = maybeDeref(lastResult);
          if (lastResultValue != null && resultEqualityCheck(lastResultValue, result)) {
            result = lastResultValue;
            resultsCount !== 0 && resultsCount--;
          }
          const needsWeakRef = typeof result === "object" && result !== null || typeof result === "function";
          lastResult = needsWeakRef ? /* @__PURE__ */ new Ref(result) : result;
        }
      }
      terminatedNode.s = TERMINATED;
      terminatedNode.v = result;
      return result;
    }
    memoized.clearCache = () => {
      fnNode = createCacheNode();
      memoized.resetResultsCount();
    };
    memoized.resultsCount = () => resultsCount;
    memoized.resetResultsCount = () => {
      resultsCount = 0;
    };
    return memoized;
  }
  function createSelectorCreator(memoizeOrOptions, ...memoizeOptionsFromArgs) {
    const createSelectorCreatorOptions = typeof memoizeOrOptions === "function" ? {
      memoize: memoizeOrOptions,
      memoizeOptions: memoizeOptionsFromArgs
    } : memoizeOrOptions;
    const createSelector2 = (...createSelectorArgs) => {
      let recomputations = 0;
      let dependencyRecomputations = 0;
      let lastResult;
      let directlyPassedOptions = {};
      let resultFunc = createSelectorArgs.pop();
      if (typeof resultFunc === "object") {
        directlyPassedOptions = resultFunc;
        resultFunc = createSelectorArgs.pop();
      }
      assertIsFunction(
        resultFunc,
        `createSelector expects an output function after the inputs, but received: [${typeof resultFunc}]`
      );
      const combinedOptions = {
        ...createSelectorCreatorOptions,
        ...directlyPassedOptions
      };
      const {
        memoize,
        memoizeOptions = [],
        argsMemoize = weakMapMemoize,
        argsMemoizeOptions = []
      } = combinedOptions;
      const finalMemoizeOptions = ensureIsArray(memoizeOptions);
      const finalArgsMemoizeOptions = ensureIsArray(argsMemoizeOptions);
      const dependencies = getDependencies(createSelectorArgs);
      const memoizedResultFunc = memoize(function recomputationWrapper() {
        recomputations++;
        return resultFunc.apply(
          null,
          arguments
        );
      }, ...finalMemoizeOptions);
      let firstRun = true;
      const selector = argsMemoize(function dependenciesChecker() {
        dependencyRecomputations++;
        const inputSelectorResults = collectInputSelectorResults(
          dependencies,
          arguments
        );
        lastResult = memoizedResultFunc.apply(null, inputSelectorResults);
        if (false) {
          const { devModeChecks = {} } = combinedOptions;
          const { identityFunctionCheck, inputStabilityCheck } = getDevModeChecksExecutionInfo(firstRun, devModeChecks);
          if (identityFunctionCheck.shouldRun) {
            identityFunctionCheck.run(
              resultFunc,
              inputSelectorResults,
              lastResult
            );
          }
          if (inputStabilityCheck.shouldRun) {
            const inputSelectorResultsCopy = collectInputSelectorResults(
              dependencies,
              arguments
            );
            inputStabilityCheck.run(
              { inputSelectorResults, inputSelectorResultsCopy },
              { memoize, memoizeOptions: finalMemoizeOptions },
              arguments
            );
          }
          if (firstRun) firstRun = false;
        }
        return lastResult;
      }, ...finalArgsMemoizeOptions);
      return Object.assign(selector, {
        resultFunc,
        memoizedResultFunc,
        dependencies,
        dependencyRecomputations: () => dependencyRecomputations,
        resetDependencyRecomputations: () => {
          dependencyRecomputations = 0;
        },
        lastResult: () => lastResult,
        recomputations: () => recomputations,
        resetRecomputations: () => {
          recomputations = 0;
        },
        memoize,
        argsMemoize
      });
    };
    Object.assign(createSelector2, {
      withTypes: () => createSelector2
    });
    return createSelector2;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/store/createSelector.js
  var reselectCreateSelector = createSelectorCreator({
    memoize: lruMemoize,
    memoizeOptions: {
      maxSize: 1,
      equalityCheck: Object.is
    }
  });
  var createSelector = (a4, b3, c4, d3, e3, f4, ...other) => {
    if (other.length > 0) {
      throw new Error(false ? "Unsupported number of selectors" : formatErrorMessage(1));
    }
    let selector;
    if (a4 && b3 && c4 && d3 && e3 && f4) {
      selector = (state, a1, a22, a32) => {
        const va = a4(state, a1, a22, a32);
        const vb = b3(state, a1, a22, a32);
        const vc = c4(state, a1, a22, a32);
        const vd = d3(state, a1, a22, a32);
        const ve = e3(state, a1, a22, a32);
        return f4(va, vb, vc, vd, ve, a1, a22, a32);
      };
    } else if (a4 && b3 && c4 && d3 && e3) {
      selector = (state, a1, a22, a32) => {
        const va = a4(state, a1, a22, a32);
        const vb = b3(state, a1, a22, a32);
        const vc = c4(state, a1, a22, a32);
        const vd = d3(state, a1, a22, a32);
        return e3(va, vb, vc, vd, a1, a22, a32);
      };
    } else if (a4 && b3 && c4 && d3) {
      selector = (state, a1, a22, a32) => {
        const va = a4(state, a1, a22, a32);
        const vb = b3(state, a1, a22, a32);
        const vc = c4(state, a1, a22, a32);
        return d3(va, vb, vc, a1, a22, a32);
      };
    } else if (a4 && b3 && c4) {
      selector = (state, a1, a22, a32) => {
        const va = a4(state, a1, a22, a32);
        const vb = b3(state, a1, a22, a32);
        return c4(va, vb, a1, a22, a32);
      };
    } else if (a4 && b3) {
      selector = (state, a1, a22, a32) => {
        const va = a4(state, a1, a22, a32);
        return b3(va, a1, a22, a32);
      };
    } else if (a4) {
      selector = a4;
    } else {
      throw new Error("Missing arguments");
    }
    return selector;
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/store/useStore.js
  var React39 = __toESM(require_compat(), 1);
  var import_shim = __toESM(require_shim(), 1);
  var import_with_selector = __toESM(require_with_selector(), 1);
  var canUseRawUseSyncExternalStore = isReactVersionAtLeast(19);
  var useStoreImplementation = canUseRawUseSyncExternalStore ? useStoreR19 : useStoreLegacy;
  function useStore(store, selector, a1, a22, a32) {
    return useStoreImplementation(store, selector, a1, a22, a32);
  }
  function useStoreR19(store, selector, a1, a22, a32) {
    const getSelection = React39.useCallback(() => selector(store.getSnapshot(), a1, a22, a32), [store, selector, a1, a22, a32]);
    return (0, import_shim.useSyncExternalStore)(store.subscribe, getSelection, getSelection);
  }
  function useStoreLegacy(store, selector, a1, a22, a32) {
    return (0, import_with_selector.useSyncExternalStoreWithSelector)(store.subscribe, store.getSnapshot, store.getSnapshot, (state) => selector(state, a1, a22, a32));
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/store/Store.js
  var Store = class _Store {
    /**
     * The current state of the store.
     * This property is updated immediately when the state changes as a result of calling {@link setState}, {@link update}, or {@link set}.
     * To subscribe to state changes, use the {@link useState} method. The value returned by {@link useState} is updated after the component renders (similarly to React's useState).
     * The values can be used directly (to avoid subscribing to the store) in effects or event handlers.
     *
     * Do not modify properties in state directly. Instead, use the provided methods to ensure proper state management and listener notification.
     */
    // Internal state to handle recursive `setState()` calls
    constructor(state) {
      this.state = state;
      this.listeners = /* @__PURE__ */ new Set();
      this.updateTick = 0;
    }
    /**
     * Registers a listener that will be called whenever the store's state changes.
     *
     * @param fn The listener function to be called on state changes.
     * @returns A function to unsubscribe the listener.
     */
    subscribe = (fn2) => {
      this.listeners.add(fn2);
      return () => {
        this.listeners.delete(fn2);
      };
    };
    /**
     * Returns the current state of the store.
     */
    getSnapshot = () => {
      return this.state;
    };
    /**
     * Updates the entire store's state and notifies all registered listeners.
     *
     * @param newState The new state to set for the store.
     */
    setState(newState) {
      if (this.state === newState) {
        return;
      }
      this.state = newState;
      this.updateTick += 1;
      const currentTick = this.updateTick;
      for (const listener of this.listeners) {
        if (currentTick !== this.updateTick) {
          return;
        }
        listener(newState);
      }
    }
    /**
     * Merges the provided changes into the current state and notifies listeners if there are changes.
     *
     * @param changes An object containing the changes to apply to the current state.
     */
    update(changes) {
      for (const key in changes) {
        if (!Object.is(this.state[key], changes[key])) {
          _Store.prototype.setState.call(this, {
            ...this.state,
            ...changes
          });
          return;
        }
      }
    }
    /**
     * Sets a specific key in the store's state to a new value and notifies listeners if the value has changed.
     *
     * @param key The key in the store's state to update.
     * @param value The new value to set for the specified key.
     */
    set(key, value) {
      if (!Object.is(this.state[key], value)) {
        _Store.prototype.setState.call(this, {
          ...this.state,
          [key]: value
        });
      }
    }
    /**
     * Gives the state a new reference and updates all registered listeners.
     */
    notifyAll() {
      const newState = {
        ...this.state
      };
      _Store.prototype.setState.call(this, newState);
    }
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/store/ReactStore.js
  var React40 = __toESM(require_compat(), 1);
  var ReactStore = class extends Store {
    /**
     * Creates a new ReactStore instance.
     *
     * @param state Initial state of the store.
     * @param context Non-reactive context values.
     * @param selectors Optional selectors for use with `useState`.
     */
    constructor(state, context = {}, selectors3) {
      super(state);
      this.context = context;
      this.selectors = selectors3;
    }
    /**
     * Non-reactive values such as refs, callbacks, etc.
     */
    /**
     * Keeps track of which properties are controlled.
     */
    controlledValues = /* @__PURE__ */ new Map();
    /**
     * Synchronizes a single external value into the store.
     *
     * Note that the while the value in `state` is updated immediately, the value returned
     * by `useState` is updated before the next render (similarly to React's `useState`).
     */
    useSyncedValue(key, value) {
      React40.useDebugValue(key);
      useIsoLayoutEffect(() => {
        if (this.state[key] !== value) {
          this.set(key, value);
        }
      }, [key, value]);
    }
    /**
     * Synchronizes a single external value into the store and
     * cleans it up (sets to `undefined`) on unmount.
     *
     * Note that the while the value in `state` is updated immediately, the value returned
     * by `useState` is updated before the next render (similarly to React's `useState`).
     */
    useSyncedValueWithCleanup(key, value) {
      useIsoLayoutEffect(() => {
        if (this.state[key] !== value) {
          this.set(key, value);
        }
        return () => {
          this.set(key, void 0);
        };
      }, [key, value]);
    }
    /**
     * Synchronizes multiple external values into the store.
     *
     * Note that the while the values in `state` are updated immediately, the values returned
     * by `useState` are updated before the next render (similarly to React's `useState`).
     */
    useSyncedValues(statePart) {
      if (false) {
        React40.useDebugValue(statePart, (p4) => Object.keys(p4));
        const keys = React40.useRef(Object.keys(statePart)).current;
        const nextKeys = Object.keys(statePart);
        if (keys.length !== nextKeys.length || keys.some((key, index2) => key !== nextKeys[index2])) {
          console.error("ReactStore.useSyncedValues expects the same prop keys on every render. Keys should be stable.");
        }
      }
      const dependencies = Object.values(statePart);
      useIsoLayoutEffect(() => {
        this.update(statePart);
      }, dependencies);
    }
    /**
     * Registers a controllable prop pair (`controlled`, `defaultValue`) for a specific key.
     * - If `controlled` is non-undefined, the key is marked as controlled and the store's
     *   state at `key` is updated to match `controlled`. Local writes to that key are ignored.
     * - If `controlled` is undefined, the key is marked as uncontrolled. The store's state
     *   is initialized to `defaultValue` on first render and can be updated with local writes.
     */
    useControlledProp(key, controlled, defaultValue) {
      React40.useDebugValue(key);
      const isControlled = controlled !== void 0;
      if (false) {
        const previouslyControlled = this.controlledValues.get(key);
        if (previouslyControlled !== void 0 && previouslyControlled !== isControlled) {
          console.error(`A component is changing the ${isControlled ? "" : "un"}controlled state of ${key.toString()} to be ${isControlled ? "un" : ""}controlled. Elements should not switch from uncontrolled to controlled (or vice versa).`);
        }
      }
      if (!this.controlledValues.has(key)) {
        this.controlledValues.set(key, isControlled);
        if (!isControlled && !Object.is(this.state[key], defaultValue)) {
          super.setState({
            ...this.state,
            [key]: defaultValue
          });
        }
      }
      useIsoLayoutEffect(() => {
        if (isControlled && !Object.is(this.state[key], controlled)) {
          super.setState({
            ...this.state,
            [key]: controlled
          });
        }
      }, [key, controlled, defaultValue, isControlled]);
    }
    /**
     * Sets a specific key in the store's state to a new value and notifies listeners if the value has changed.
     * If the key is controlled (registered via {@link useControlledProp} with a non-undefined value),
     * the update is ignored and no listeners are notified.
     *
     * @param key The state key to update.
     * @param value The new value to set for the specified key.
     */
    set(key, value) {
      if (this.controlledValues.get(key) === true) {
        return;
      }
      super.set(key, value);
    }
    /**
     * Merges the provided changes into the current state and notifies listeners if there are changes.
     * Controlled keys are filtered out and not updated.
     *
     * @param values An object containing the changes to apply to the current state.
     */
    update(values) {
      const newValues = {
        ...values
      };
      for (const key in newValues) {
        if (!Object.hasOwn(newValues, key)) {
          continue;
        }
        if (this.controlledValues.get(key) === true) {
          delete newValues[key];
          continue;
        }
      }
      super.update(newValues);
    }
    /**
     * Updates the entire store's state and notifies all registered listeners.
     * Controlled keys are left unchanged; only uncontrolled keys from `newState` are applied.
     *
     * @param newState The new state to set for the store.
     */
    setState(newState) {
      const newValues = {
        ...newState
      };
      for (const key in newValues) {
        if (!Object.hasOwn(newValues, key)) {
          continue;
        }
        if (this.controlledValues.get(key) === true) {
          delete newValues[key];
          continue;
        }
      }
      super.setState({
        ...this.state,
        ...newValues
      });
    }
    /** Gets the current value from the store using a selector with the provided key.
     *
     * @param key Key of the selector to use.
     */
    select = (key, a1, a22, a32) => {
      const selector = this.selectors[key];
      return selector(this.state, a1, a22, a32);
    };
    /**
     * Returns a value from the store's state using a selector function.
     * Used to subscribe to specific parts of the state.
     * This methods causes a rerender whenever the selected state changes.
     *
     * @param key Key of the selector to use.
     */
    useState = (key, a1, a22, a32) => {
      React40.useDebugValue(key);
      const selector = this.selectors[key];
      const value = useStore(this, selector, a1, a22, a32);
      return value;
    };
    /**
     * Wraps a function with `useStableCallback` to ensure it has a stable reference
     * and assigns it to the context.
     *
     * @param key Key of the event callback. Must be a function in the context.
     * @param fn Function to assign.
     */
    useContextCallback(key, fn2) {
      React40.useDebugValue(key);
      const stableFunction = useStableCallback(fn2 ?? NOOP);
      this.context[key] = stableFunction;
    }
    /**
     * Returns a stable setter function for a specific key in the store's state.
     * It's commonly used to pass as a ref callback to React elements.
     *
     * @param key Key of the state to set.
     */
    useStateSetter(key) {
      const ref = React40.useRef(void 0);
      if (ref.current === void 0) {
        ref.current = (value) => {
          this.set(key, value);
        };
      }
      return ref.current;
    }
    /**
     * Observes changes derived from the store's selectors and calls the listener when the selected value changes.
     *
     * @param key Key of the selector to observe.
     * @param listener Listener function called when the selector result changes.
     */
    observe(selector, listener) {
      let selectFn;
      if (typeof selector === "function") {
        selectFn = selector;
      } else {
        selectFn = this.selectors[selector];
      }
      let prevValue = selectFn(this.state);
      listener(prevValue, prevValue, this);
      return this.subscribe((nextState) => {
        const nextValue = selectFn(nextState);
        if (!Object.is(prevValue, nextValue)) {
          const oldValue = prevValue;
          prevValue = nextValue;
          listener(nextValue, oldValue, this);
        }
      });
    }
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingRootStore.js
  var selectors = {
    open: createSelector((state) => state.open),
    domReferenceElement: createSelector((state) => state.domReferenceElement),
    referenceElement: createSelector((state) => state.positionReference ?? state.referenceElement),
    floatingElement: createSelector((state) => state.floatingElement),
    floatingId: createSelector((state) => state.floatingId)
  };
  var FloatingRootStore = class extends ReactStore {
    constructor(options) {
      const {
        nested,
        noEmit,
        onOpenChange,
        triggerElements,
        ...initialState
      } = options;
      super({
        ...initialState,
        positionReference: initialState.referenceElement,
        domReferenceElement: initialState.referenceElement
      }, {
        onOpenChange,
        dataRef: {
          current: {}
        },
        events: createEventEmitter(),
        nested,
        noEmit,
        triggerElements
      }, selectors);
    }
    /**
     * Emits the `openchange` event through the internal event emitter and calls the `onOpenChange` handler with the provided arguments.
     *
     * @param newOpen The new open state.
     * @param eventDetails Details about the event that triggered the open state change.
     */
    setOpen = (newOpen, eventDetails) => {
      if (!newOpen || !this.state.open || // Prevent a pending hover-open from overwriting a click-open event, while allowing
      // click events to upgrade a hover-open.
      isClickLikeEvent(eventDetails.event)) {
        this.context.dataRef.current.openEvent = newOpen ? eventDetails.event : void 0;
      }
      if (!this.context.noEmit) {
        const details = {
          open: newOpen,
          reason: eventDetails.reason,
          nativeEvent: eventDetails.event,
          nested: this.context.nested,
          triggerElement: eventDetails.trigger
        };
        this.context.events.emit("openchange", details);
      }
      this.context.onOpenChange?.(newOpen, eventDetails);
    };
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/popups/popupStoreUtils.js
  var React41 = __toESM(require_compat(), 1);
  function useTriggerRegistration(id, store) {
    const registeredElementId = React41.useRef(null);
    return React41.useCallback((element) => {
      if (id === void 0) {
        return void 0;
      }
      if (registeredElementId.current !== null) {
        store.context.triggerElements.delete(registeredElementId.current);
        registeredElementId.current = null;
      }
      if (element !== null) {
        registeredElementId.current = id;
        store.context.triggerElements.add(id, element);
        return () => {
          if (registeredElementId.current !== null) {
            store.context.triggerElements.delete(registeredElementId.current);
            registeredElementId.current = null;
          }
        };
      }
      return void 0;
    }, [store, id]);
  }
  function useTriggerDataForwarding(triggerId, triggerElementRef, store, stateUpdates) {
    const isMountedByThisTrigger = store.useState("isMountedByTrigger", triggerId);
    const baseRegisterTrigger = useTriggerRegistration(triggerId, store);
    const registerTrigger = useStableCallback((element) => {
      const cleanup = baseRegisterTrigger(element);
      if (element !== null && store.select("open") && store.select("activeTriggerId") == null) {
        store.update({
          activeTriggerId: triggerId,
          activeTriggerElement: element,
          ...stateUpdates
        });
      }
      return cleanup;
    });
    useIsoLayoutEffect(() => {
      if (isMountedByThisTrigger) {
        store.update({
          activeTriggerElement: triggerElementRef.current,
          ...stateUpdates
        });
      }
    }, [isMountedByThisTrigger, store, triggerElementRef, ...Object.values(stateUpdates)]);
    return {
      registerTrigger,
      isMountedByThisTrigger
    };
  }
  function useImplicitActiveTrigger(store) {
    const open = store.useState("open");
    useIsoLayoutEffect(() => {
      if (open && !store.select("activeTriggerId") && store.context.triggerElements.size === 1) {
        const iteratorResult = store.context.triggerElements.entries().next();
        if (!iteratorResult.done) {
          const [implicitTriggerId, implicitTriggerElement] = iteratorResult.value;
          store.update({
            activeTriggerId: implicitTriggerId,
            activeTriggerElement: implicitTriggerElement
          });
        }
      }
    }, [open, store]);
  }
  function useOpenStateTransitions(open, store, onUnmount) {
    const {
      mounted,
      setMounted,
      transitionStatus
    } = useTransitionStatus(open);
    store.useSyncedValues({
      mounted,
      transitionStatus
    });
    const forceUnmount = useStableCallback(() => {
      setMounted(false);
      store.update({
        activeTriggerId: null,
        activeTriggerElement: null,
        mounted: false
      });
      onUnmount?.();
      store.context.onOpenChangeComplete?.(false);
    });
    const preventUnmountingOnClose = store.useState("preventUnmountingOnClose");
    useOpenChangeComplete({
      enabled: !preventUnmountingOnClose,
      open,
      ref: store.context.popupRef,
      onComplete() {
        if (!open) {
          forceUnmount();
        }
      }
    });
    return {
      forceUnmount,
      transitionStatus
    };
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/popups/popupTriggerMap.js
  var PopupTriggerMap = class {
    constructor() {
      this.elements = /* @__PURE__ */ new Set();
      this.idMap = /* @__PURE__ */ new Map();
    }
    /**
     * Adds a trigger element with the given ID.
     *
     * Note: The provided element is assumed to not be registered under multiple IDs.
     */
    add(id, element) {
      const existingElement = this.idMap.get(id);
      if (existingElement === element) {
        return;
      }
      if (existingElement !== void 0) {
        this.elements.delete(existingElement);
      }
      this.elements.add(element);
      this.idMap.set(id, element);
      if (false) {
        if (this.elements.size !== this.idMap.size) {
          throw new Error(false ? "Base UI: A trigger element cannot be registered under multiple IDs in PopupTriggerMap." : formatErrorMessage(87));
        }
      }
    }
    /**
     * Removes the trigger element with the given ID.
     */
    delete(id) {
      const element = this.idMap.get(id);
      if (element) {
        this.elements.delete(element);
        this.idMap.delete(id);
      }
    }
    /**
     * Whether the given element is registered as a trigger.
     */
    hasElement(element) {
      return this.elements.has(element);
    }
    /**
     * Whether there is a registered trigger element matching the given predicate.
     */
    hasMatchingElement(predicate) {
      for (const element of this.elements) {
        if (predicate(element)) {
          return true;
        }
      }
      return false;
    }
    getById(id) {
      return this.idMap.get(id);
    }
    entries() {
      return this.idMap.entries();
    }
    get size() {
      return this.idMap.size;
    }
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/getEmptyRootContext.js
  function getEmptyRootContext() {
    return new FloatingRootStore({
      open: false,
      floatingElement: null,
      referenceElement: null,
      triggerElements: new PopupTriggerMap(),
      floatingId: "",
      nested: false,
      noEmit: false,
      onOpenChange: void 0
    });
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/popups/store.js
  function createInitialPopupStoreState() {
    return {
      open: false,
      mounted: false,
      transitionStatus: "idle",
      floatingRootContext: getEmptyRootContext(),
      preventUnmountingOnClose: false,
      payload: void 0,
      activeTriggerId: null,
      activeTriggerElement: null,
      popupElement: null,
      positionerElement: null,
      activeTriggerProps: EMPTY_OBJECT,
      inactiveTriggerProps: EMPTY_OBJECT,
      popupProps: EMPTY_OBJECT
    };
  }
  var popupStoreSelectors = {
    open: createSelector((state) => state.open),
    mounted: createSelector((state) => state.mounted),
    transitionStatus: createSelector((state) => state.transitionStatus),
    floatingRootContext: createSelector((state) => state.floatingRootContext),
    preventUnmountingOnClose: createSelector((state) => state.preventUnmountingOnClose),
    payload: createSelector((state) => state.payload),
    activeTriggerId: createSelector((state) => state.activeTriggerId),
    activeTriggerElement: createSelector((state) => state.mounted ? state.activeTriggerElement : null),
    /**
     * Whether the trigger with the given ID was used to open the popup.
     */
    isTriggerActive: createSelector((state, triggerId) => triggerId !== void 0 && state.activeTriggerId === triggerId),
    /**
     * Whether the popup is open and was activated by a trigger with the given ID.
     */
    isOpenedByTrigger: createSelector((state, triggerId) => triggerId !== void 0 && state.activeTriggerId === triggerId && state.open),
    /**
     * Whether the popup is mounted and was activated by a trigger with the given ID.
     */
    isMountedByTrigger: createSelector((state, triggerId) => triggerId !== void 0 && state.activeTriggerId === triggerId && state.mounted),
    triggerProps: createSelector((state, isActive) => isActive ? state.activeTriggerProps : state.inactiveTriggerProps),
    popupProps: createSelector((state) => state.popupProps),
    popupElement: createSelector((state) => state.popupElement),
    positionerElement: createSelector((state) => state.positionerElement)
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useFloatingRootContext.js
  function useFloatingRootContext(options) {
    const {
      open = false,
      onOpenChange,
      elements = {}
    } = options;
    const floatingId = useId();
    const nested = useFloatingParentNodeId() != null;
    if (false) {
      const optionDomReference = elements.reference;
      if (optionDomReference && !isElement(optionDomReference)) {
        console.error("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `context.setPositionReference()`", "instead.");
      }
    }
    const store = useRefWithInit(() => new FloatingRootStore({
      open,
      onOpenChange,
      referenceElement: elements.reference ?? null,
      floatingElement: elements.floating ?? null,
      triggerElements: elements.triggers ?? new PopupTriggerMap(),
      floatingId,
      nested,
      noEmit: options.noEmit || false
    })).current;
    useIsoLayoutEffect(() => {
      const valuesToSync = {
        open,
        floatingId
      };
      if (elements.reference !== void 0) {
        valuesToSync.referenceElement = elements.reference;
        valuesToSync.domReferenceElement = isElement(elements.reference) ? elements.reference : null;
      }
      if (elements.floating !== void 0) {
        valuesToSync.floatingElement = elements.floating;
      }
      store.update(valuesToSync);
    }, [open, floatingId, elements.reference, elements.floating, store]);
    store.context.onOpenChange = onOpenChange;
    store.context.nested = nested;
    store.context.noEmit = options.noEmit || false;
    return store;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useFloating.js
  function useFloating2(options = {}) {
    const {
      nodeId,
      externalTree
    } = options;
    const internalRootStore = useFloatingRootContext(options);
    const rootContext = options.rootContext || internalRootStore;
    const rootContextElements = {
      reference: rootContext.useState("referenceElement"),
      floating: rootContext.useState("floatingElement"),
      domReference: rootContext.useState("domReferenceElement")
    };
    const [positionReference, setPositionReferenceRaw] = React42.useState(null);
    const domReferenceRef = React42.useRef(null);
    const tree = useFloatingTree(externalTree);
    useIsoLayoutEffect(() => {
      if (rootContextElements.domReference) {
        domReferenceRef.current = rootContextElements.domReference;
      }
    }, [rootContextElements.domReference]);
    const position = useFloating({
      ...options,
      elements: {
        ...rootContextElements,
        ...positionReference && {
          reference: positionReference
        }
      }
    });
    const setPositionReference = React42.useCallback((node) => {
      const computedPositionReference = isElement(node) ? {
        getBoundingClientRect: () => node.getBoundingClientRect(),
        getClientRects: () => node.getClientRects(),
        contextElement: node
      } : node;
      setPositionReferenceRaw(computedPositionReference);
      position.refs.setReference(computedPositionReference);
    }, [position.refs]);
    const [localDomReference, setLocalDomReference] = React42.useState(null);
    const [localFloatingElement, setLocalFloatingElement] = React42.useState(null);
    rootContext.useSyncedValue("referenceElement", localDomReference);
    rootContext.useSyncedValue("domReferenceElement", isElement(localDomReference) ? localDomReference : null);
    rootContext.useSyncedValue("floatingElement", localFloatingElement);
    const setReference = React42.useCallback((node) => {
      if (isElement(node) || node === null) {
        domReferenceRef.current = node;
        setLocalDomReference(node);
      }
      if (isElement(position.refs.reference.current) || position.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
      // `null` to support `positionReference` + an unstable `reference`
      // callback ref.
      node !== null && !isElement(node)) {
        position.refs.setReference(node);
      }
    }, [position.refs, setLocalDomReference]);
    const setFloating = React42.useCallback((node) => {
      setLocalFloatingElement(node);
      position.refs.setFloating(node);
    }, [position.refs]);
    const refs = React42.useMemo(() => ({
      ...position.refs,
      setReference,
      setFloating,
      setPositionReference,
      domReference: domReferenceRef
    }), [position.refs, setReference, setFloating, setPositionReference]);
    const elements = React42.useMemo(() => ({
      ...position.elements,
      domReference: rootContextElements.domReference
    }), [position.elements, rootContextElements.domReference]);
    const open = rootContext.useState("open");
    const floatingId = rootContext.useState("floatingId");
    const context = React42.useMemo(() => ({
      ...position,
      dataRef: rootContext.context.dataRef,
      open,
      onOpenChange: rootContext.setOpen,
      events: rootContext.context.events,
      floatingId,
      refs,
      elements,
      nodeId,
      rootStore: rootContext
    }), [position, refs, elements, nodeId, rootContext, open, floatingId]);
    useIsoLayoutEffect(() => {
      rootContext.context.dataRef.current.floatingContext = context;
      const node = tree?.nodesRef.current.find((n3) => n3.id === nodeId);
      if (node) {
        node.context = context;
      }
    });
    return React42.useMemo(() => ({
      ...position,
      context,
      refs,
      elements,
      rootStore: rootContext
    }), [position, refs, elements, context, rootContext]);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useSyncedFloatingRootContext.js
  function useSyncedFloatingRootContext(options) {
    const {
      popupStore,
      noEmit = false,
      treatPopupAsFloatingElement = false,
      onOpenChange
    } = options;
    const floatingId = useId();
    const nested = useFloatingParentNodeId() != null;
    const open = popupStore.useState("open");
    const referenceElement = popupStore.useState("activeTriggerElement");
    const floatingElement = popupStore.useState(treatPopupAsFloatingElement ? "popupElement" : "positionerElement");
    const triggerElements = popupStore.context.triggerElements;
    const store = useRefWithInit(() => new FloatingRootStore({
      open,
      referenceElement,
      floatingElement,
      triggerElements,
      onOpenChange,
      floatingId,
      nested,
      noEmit
    })).current;
    useIsoLayoutEffect(() => {
      const valuesToSync = {
        open,
        floatingId,
        referenceElement,
        floatingElement
      };
      if (isElement(referenceElement)) {
        valuesToSync.domReferenceElement = referenceElement;
      }
      store.update(valuesToSync);
    }, [open, floatingId, referenceElement, floatingElement, store]);
    store.context.onOpenChange = onOpenChange;
    store.context.nested = nested;
    store.context.noEmit = noEmit;
    return store;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useFocus.js
  var React43 = __toESM(require_compat(), 1);
  var isMacSafari = isMac && isSafari;
  function useFocus(context, props = {}) {
    const store = "rootStore" in context ? context.rootStore : context;
    const {
      events,
      dataRef
    } = store.context;
    const {
      enabled = true,
      visibleOnly = true
    } = props;
    const blockFocusRef = React43.useRef(false);
    const timeout = useTimeout();
    const keyboardModalityRef = React43.useRef(true);
    React43.useEffect(() => {
      const domReference = store.select("domReferenceElement");
      if (!enabled) {
        return void 0;
      }
      const win = getWindow(domReference);
      function onBlur() {
        if (!store.select("open") && isHTMLElement(domReference) && domReference === activeElement(getDocument(domReference))) {
          blockFocusRef.current = true;
        }
      }
      function onKeyDown() {
        keyboardModalityRef.current = true;
      }
      function onPointerDown() {
        keyboardModalityRef.current = false;
      }
      win.addEventListener("blur", onBlur);
      if (isMacSafari) {
        win.addEventListener("keydown", onKeyDown, true);
        win.addEventListener("pointerdown", onPointerDown, true);
      }
      return () => {
        win.removeEventListener("blur", onBlur);
        if (isMacSafari) {
          win.removeEventListener("keydown", onKeyDown, true);
          win.removeEventListener("pointerdown", onPointerDown, true);
        }
      };
    }, [store, enabled]);
    React43.useEffect(() => {
      if (!enabled) {
        return void 0;
      }
      function onOpenChangeLocal(details) {
        if (details.reason === reason_parts_exports.triggerPress || details.reason === reason_parts_exports.escapeKey) {
          blockFocusRef.current = true;
        }
      }
      events.on("openchange", onOpenChangeLocal);
      return () => {
        events.off("openchange", onOpenChangeLocal);
      };
    }, [events, enabled]);
    const reference = React43.useMemo(() => ({
      onMouseLeave() {
        blockFocusRef.current = false;
      },
      onFocus(event) {
        if (blockFocusRef.current) {
          return;
        }
        const target = getTarget(event.nativeEvent);
        if (visibleOnly && isElement(target)) {
          if (isMacSafari && !event.relatedTarget) {
            if (!keyboardModalityRef.current && !isTypeableElement(target)) {
              return;
            }
          } else if (!matchesFocusVisible(target)) {
            return;
          }
        }
        store.setOpen(true, createChangeEventDetails(reason_parts_exports.triggerFocus, event.nativeEvent, event.currentTarget));
      },
      onBlur(event) {
        blockFocusRef.current = false;
        const relatedTarget = event.relatedTarget;
        const nativeEvent = event.nativeEvent;
        const movedToFocusGuard = isElement(relatedTarget) && relatedTarget.hasAttribute(createAttribute("focus-guard")) && relatedTarget.getAttribute("data-type") === "outside";
        timeout.start(0, () => {
          const domReference = store.select("domReferenceElement");
          const activeEl = activeElement(domReference ? domReference.ownerDocument : document);
          if (!relatedTarget && activeEl === domReference) {
            return;
          }
          if (contains(dataRef.current.floatingContext?.refs.floating.current, activeEl) || contains(domReference, activeEl) || movedToFocusGuard) {
            return;
          }
          if (store.context.triggerElements.hasElement(event.relatedTarget)) {
            return;
          }
          store.setOpen(false, createChangeEventDetails(reason_parts_exports.triggerFocus, nativeEvent));
        });
      }
    }), [dataRef, store, visibleOnly, timeout]);
    return React43.useMemo(() => enabled ? {
      reference,
      trigger: reference
    } : {}, [enabled, reference]);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useHoverFloatingInteraction.js
  var React45 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useHoverInteractionSharedState.js
  var React44 = __toESM(require_compat(), 1);
  var safePolygonIdentifier2 = createAttribute("safe-polygon");
  var interactiveSelector2 = `button,a,[role="button"],select,[tabindex]:not([tabindex="-1"]),${TYPEABLE_SELECTOR}`;
  function isInteractiveElement(element) {
    return element ? Boolean(element.closest(interactiveSelector2)) : false;
  }
  function useHoverInteractionSharedState(store) {
    const pointerTypeRef = React44.useRef(void 0);
    const interactedInsideRef = React44.useRef(false);
    const handlerRef = React44.useRef(void 0);
    const blockMouseMoveRef = React44.useRef(true);
    const performedPointerEventsMutationRef = React44.useRef(false);
    const unbindMouseMoveRef = React44.useRef(() => {
    });
    const restTimeoutPendingRef = React44.useRef(false);
    const openChangeTimeout = useTimeout();
    const restTimeout = useTimeout();
    const handleCloseOptionsRef = React44.useRef(void 0);
    return React44.useMemo(() => {
      const data = store.context.dataRef.current;
      if (!data.hoverInteractionState) {
        data.hoverInteractionState = {
          pointerTypeRef,
          interactedInsideRef,
          handlerRef,
          blockMouseMoveRef,
          performedPointerEventsMutationRef,
          unbindMouseMoveRef,
          restTimeoutPendingRef,
          openChangeTimeout,
          restTimeout,
          handleCloseOptionsRef
        };
      }
      return data.hoverInteractionState;
    }, [store, pointerTypeRef, interactedInsideRef, handlerRef, blockMouseMoveRef, performedPointerEventsMutationRef, unbindMouseMoveRef, restTimeoutPendingRef, openChangeTimeout, restTimeout, handleCloseOptionsRef]);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useHoverFloatingInteraction.js
  var clickLikeEvents = /* @__PURE__ */ new Set(["click", "mousedown"]);
  function useHoverFloatingInteraction(context, parameters = {}) {
    const store = "rootStore" in context ? context.rootStore : context;
    const open = store.useState("open");
    const floatingElement = store.useState("floatingElement");
    const domReferenceElement = store.useState("domReferenceElement");
    const {
      dataRef
    } = store.context;
    const {
      enabled = true,
      closeDelay: closeDelayProp = 0,
      externalTree
    } = parameters;
    const {
      pointerTypeRef,
      interactedInsideRef,
      handlerRef,
      performedPointerEventsMutationRef,
      unbindMouseMoveRef,
      restTimeoutPendingRef,
      openChangeTimeout,
      handleCloseOptionsRef
    } = useHoverInteractionSharedState(store);
    const tree = useFloatingTree(externalTree);
    const parentId = useFloatingParentNodeId();
    const isClickLikeOpenEvent = useStableCallback(() => {
      if (interactedInsideRef.current) {
        return true;
      }
      return dataRef.current.openEvent ? clickLikeEvents.has(dataRef.current.openEvent.type) : false;
    });
    const isHoverOpen = useStableCallback(() => {
      const type = dataRef.current.openEvent?.type;
      return type?.includes("mouse") && type !== "mousedown";
    });
    const closeWithDelay = React45.useCallback((event, runElseBranch = true) => {
      const closeDelay = getDelay2(closeDelayProp, pointerTypeRef.current);
      if (closeDelay && !handlerRef.current) {
        openChangeTimeout.start(closeDelay, () => store.setOpen(false, createChangeEventDetails(reason_parts_exports.triggerHover, event)));
      } else if (runElseBranch) {
        openChangeTimeout.clear();
        store.setOpen(false, createChangeEventDetails(reason_parts_exports.triggerHover, event));
      }
    }, [closeDelayProp, handlerRef, store, pointerTypeRef, openChangeTimeout]);
    const cleanupMouseMoveHandler = useStableCallback(() => {
      unbindMouseMoveRef.current();
      handlerRef.current = void 0;
    });
    const clearPointerEvents = useStableCallback(() => {
      if (performedPointerEventsMutationRef.current) {
        const body = getDocument(floatingElement).body;
        body.style.pointerEvents = "";
        body.removeAttribute(safePolygonIdentifier2);
        performedPointerEventsMutationRef.current = false;
      }
    });
    const handleInteractInside = useStableCallback((event) => {
      const target = getTarget(event);
      if (!isInteractiveElement(target)) {
        interactedInsideRef.current = false;
        return;
      }
      interactedInsideRef.current = true;
    });
    useIsoLayoutEffect(() => {
      if (!open) {
        pointerTypeRef.current = void 0;
        restTimeoutPendingRef.current = false;
        interactedInsideRef.current = false;
        cleanupMouseMoveHandler();
        clearPointerEvents();
      }
    }, [open, pointerTypeRef, restTimeoutPendingRef, interactedInsideRef, cleanupMouseMoveHandler, clearPointerEvents]);
    React45.useEffect(() => {
      return () => {
        cleanupMouseMoveHandler();
      };
    }, [cleanupMouseMoveHandler]);
    React45.useEffect(() => {
      return clearPointerEvents;
    }, [clearPointerEvents]);
    useIsoLayoutEffect(() => {
      if (!enabled) {
        return void 0;
      }
      if (open && handleCloseOptionsRef.current?.blockPointerEvents && isHoverOpen() && isElement(domReferenceElement) && floatingElement) {
        performedPointerEventsMutationRef.current = true;
        const body = getDocument(floatingElement).body;
        body.setAttribute(safePolygonIdentifier2, "");
        const ref = domReferenceElement;
        const floatingEl = floatingElement;
        const parentFloating = tree?.nodesRef.current.find((node) => node.id === parentId)?.context?.elements.floating;
        if (parentFloating) {
          parentFloating.style.pointerEvents = "";
        }
        body.style.pointerEvents = "none";
        ref.style.pointerEvents = "auto";
        floatingEl.style.pointerEvents = "auto";
        return () => {
          body.style.pointerEvents = "";
          ref.style.pointerEvents = "";
          floatingEl.style.pointerEvents = "";
        };
      }
      return void 0;
    }, [enabled, open, domReferenceElement, floatingElement, handleCloseOptionsRef, isHoverOpen, tree, parentId, performedPointerEventsMutationRef]);
    React45.useEffect(() => {
      if (!enabled) {
        return void 0;
      }
      function onScrollMouseLeave(event) {
        if (isClickLikeOpenEvent()) {
          return;
        }
        if (!dataRef.current.floatingContext) {
          return;
        }
        const triggerElements = store.context.triggerElements;
        if (event.relatedTarget && triggerElements.hasElement(event.relatedTarget)) {
          return;
        }
        clearPointerEvents();
        cleanupMouseMoveHandler();
        if (!isClickLikeOpenEvent()) {
          closeWithDelay(event);
        }
      }
      function onFloatingMouseEnter(event) {
        openChangeTimeout.clear();
        clearPointerEvents();
        handlerRef.current?.(event);
        cleanupMouseMoveHandler();
      }
      function onFloatingMouseLeave(event) {
        if (!isClickLikeOpenEvent()) {
          closeWithDelay(event, false);
        }
      }
      const floating = floatingElement;
      if (floating) {
        floating.addEventListener("mouseleave", onScrollMouseLeave);
        floating.addEventListener("mouseenter", onFloatingMouseEnter);
        floating.addEventListener("mouseleave", onFloatingMouseLeave);
        floating.addEventListener("pointerdown", handleInteractInside, true);
      }
      return () => {
        if (floating) {
          floating.removeEventListener("mouseleave", onScrollMouseLeave);
          floating.removeEventListener("mouseenter", onFloatingMouseEnter);
          floating.removeEventListener("mouseleave", onFloatingMouseLeave);
          floating.removeEventListener("pointerdown", handleInteractInside, true);
        }
      };
    });
  }
  function getDelay2(value, pointerType) {
    if (pointerType && !isMouseLikePointerType(pointerType)) {
      return 0;
    }
    if (typeof value === "function") {
      return value();
    }
    return value;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useHoverReferenceInteraction.js
  var React46 = __toESM(require_compat(), 1);
  var ReactDOM5 = __toESM(require_compat(), 1);
  function getRestMs(value) {
    if (typeof value === "function") {
      return value();
    }
    return value;
  }
  var EMPTY_REF = {
    current: null
  };
  function useHoverReferenceInteraction(context, props = {}) {
    const store = "rootStore" in context ? context.rootStore : context;
    const {
      dataRef,
      events
    } = store.context;
    const {
      enabled = true,
      delay = 0,
      handleClose = null,
      mouseOnly = false,
      restMs = 0,
      move = true,
      triggerElementRef = EMPTY_REF,
      externalTree,
      isActiveTrigger = true
    } = props;
    const tree = useFloatingTree(externalTree);
    const {
      pointerTypeRef,
      interactedInsideRef,
      handlerRef: closeHandlerRef,
      blockMouseMoveRef,
      performedPointerEventsMutationRef,
      unbindMouseMoveRef,
      restTimeoutPendingRef,
      openChangeTimeout,
      restTimeout,
      handleCloseOptionsRef
    } = useHoverInteractionSharedState(store);
    const handleCloseRef = useValueAsRef(handleClose);
    const delayRef = useValueAsRef(delay);
    const restMsRef = useValueAsRef(restMs);
    if (isActiveTrigger) {
      handleCloseOptionsRef.current = handleCloseRef.current?.__options;
    }
    const isClickLikeOpenEvent = useStableCallback(() => {
      if (interactedInsideRef.current) {
        return true;
      }
      return dataRef.current.openEvent ? ["click", "mousedown"].includes(dataRef.current.openEvent.type) : false;
    });
    const closeWithDelay = React46.useCallback((event, runElseBranch = true) => {
      const closeDelay = getDelay(delayRef.current, "close", pointerTypeRef.current);
      if (closeDelay && !closeHandlerRef.current) {
        openChangeTimeout.start(closeDelay, () => store.setOpen(false, createChangeEventDetails(reason_parts_exports.triggerHover, event)));
      } else if (runElseBranch) {
        openChangeTimeout.clear();
        store.setOpen(false, createChangeEventDetails(reason_parts_exports.triggerHover, event));
      }
    }, [delayRef, closeHandlerRef, store, pointerTypeRef, openChangeTimeout]);
    const cleanupMouseMoveHandler = useStableCallback(() => {
      unbindMouseMoveRef.current();
      closeHandlerRef.current = void 0;
    });
    const clearPointerEvents = useStableCallback(() => {
      if (performedPointerEventsMutationRef.current) {
        const body = getDocument(store.select("domReferenceElement")).body;
        body.style.pointerEvents = "";
        body.removeAttribute(safePolygonIdentifier2);
        performedPointerEventsMutationRef.current = false;
      }
    });
    React46.useEffect(() => {
      if (!enabled) {
        return void 0;
      }
      function onOpenChangeLocal(details) {
        if (!details.open) {
          openChangeTimeout.clear();
          restTimeout.clear();
          blockMouseMoveRef.current = true;
          restTimeoutPendingRef.current = false;
        }
      }
      events.on("openchange", onOpenChangeLocal);
      return () => {
        events.off("openchange", onOpenChangeLocal);
      };
    }, [enabled, events, openChangeTimeout, restTimeout, blockMouseMoveRef, restTimeoutPendingRef]);
    const handleScrollMouseLeave = useStableCallback((event) => {
      if (isClickLikeOpenEvent()) {
        return;
      }
      if (!dataRef.current.floatingContext) {
        return;
      }
      const triggerElements = store.context.triggerElements;
      if (event.relatedTarget && triggerElements.hasElement(event.relatedTarget)) {
        return;
      }
      handleCloseRef.current?.({
        ...dataRef.current.floatingContext,
        tree,
        x: event.clientX,
        y: event.clientY,
        onClose() {
          clearPointerEvents();
          cleanupMouseMoveHandler();
          if (!isClickLikeOpenEvent()) {
            closeWithDelay(event);
          }
        }
      })(event);
    });
    React46.useEffect(() => {
      if (!enabled) {
        return void 0;
      }
      const trigger = triggerElementRef.current ?? (isActiveTrigger ? store.select("domReferenceElement") : null);
      if (!isElement(trigger)) {
        return void 0;
      }
      function onMouseEnter(event) {
        openChangeTimeout.clear();
        blockMouseMoveRef.current = false;
        if (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current)) {
          return;
        }
        if (getRestMs(restMsRef.current) > 0 && !getDelay(delayRef.current, "open")) {
          return;
        }
        const openDelay = getDelay(delayRef.current, "open", pointerTypeRef.current);
        const currentDomReference = store.select("domReferenceElement");
        const allTriggers = store.context.triggerElements;
        const isOverInactiveTrigger = (allTriggers.hasElement(event.target) || allTriggers.hasMatchingElement((t4) => contains(t4, event.target))) && (!currentDomReference || !contains(currentDomReference, event.target));
        const triggerNode = event.currentTarget ?? null;
        if (openDelay) {
          openChangeTimeout.start(openDelay, () => {
            if (!store.select("open")) {
              store.setOpen(true, createChangeEventDetails(reason_parts_exports.triggerHover, event, triggerNode));
            }
          });
        } else if (!store.select("open") || isOverInactiveTrigger) {
          store.setOpen(true, createChangeEventDetails(reason_parts_exports.triggerHover, event, triggerNode));
        }
      }
      function onMouseLeave(event) {
        if (isClickLikeOpenEvent()) {
          clearPointerEvents();
          return;
        }
        unbindMouseMoveRef.current();
        const domReferenceElement = store.select("domReferenceElement");
        const doc = getDocument(domReferenceElement);
        restTimeout.clear();
        restTimeoutPendingRef.current = false;
        const triggerElements = store.context.triggerElements;
        if (event.relatedTarget && triggerElements.hasElement(event.relatedTarget)) {
          return;
        }
        if (handleCloseRef.current && dataRef.current.floatingContext) {
          if (!store.select("open")) {
            openChangeTimeout.clear();
          }
          closeHandlerRef.current = handleCloseRef.current({
            ...dataRef.current.floatingContext,
            tree,
            x: event.clientX,
            y: event.clientY,
            onClose() {
              clearPointerEvents();
              cleanupMouseMoveHandler();
              if (!isClickLikeOpenEvent()) {
                closeWithDelay(event, true);
              }
            }
          });
          const handler = closeHandlerRef.current;
          handler(event);
          doc.addEventListener("mousemove", handler);
          unbindMouseMoveRef.current = () => {
            doc.removeEventListener("mousemove", handler);
          };
          return;
        }
        const shouldClose = pointerTypeRef.current === "touch" ? !contains(store.select("floatingElement"), event.relatedTarget) : true;
        if (shouldClose) {
          closeWithDelay(event);
        }
      }
      function onScrollMouseLeave(event) {
        handleScrollMouseLeave(event);
      }
      if (store.select("open")) {
        trigger.addEventListener("mouseleave", onScrollMouseLeave);
      }
      if (move) {
        trigger.addEventListener("mousemove", onMouseEnter, {
          once: true
        });
      }
      trigger.addEventListener("mouseenter", onMouseEnter);
      trigger.addEventListener("mouseleave", onMouseLeave);
      return () => {
        trigger.removeEventListener("mouseleave", onScrollMouseLeave);
        if (move) {
          trigger.removeEventListener("mousemove", onMouseEnter);
        }
        trigger.removeEventListener("mouseenter", onMouseEnter);
        trigger.removeEventListener("mouseleave", onMouseLeave);
      };
    }, [cleanupMouseMoveHandler, clearPointerEvents, blockMouseMoveRef, dataRef, delayRef, closeWithDelay, store, enabled, handleCloseRef, handleScrollMouseLeave, isActiveTrigger, isClickLikeOpenEvent, mouseOnly, move, pointerTypeRef, restMsRef, restTimeout, restTimeoutPendingRef, openChangeTimeout, triggerElementRef, tree, unbindMouseMoveRef, closeHandlerRef]);
    return React46.useMemo(() => {
      function setPointerRef(event) {
        pointerTypeRef.current = event.pointerType;
      }
      return {
        onPointerDown: setPointerRef,
        onPointerEnter: setPointerRef,
        onMouseMove(event) {
          const {
            nativeEvent
          } = event;
          const trigger = event.currentTarget;
          const currentDomReference = store.select("domReferenceElement");
          const allTriggers = store.context.triggerElements;
          const currentOpen = store.select("open");
          const isOverInactiveTrigger = (allTriggers.hasElement(event.target) || allTriggers.hasMatchingElement((t4) => contains(t4, event.target))) && (!currentDomReference || !contains(currentDomReference, event.target));
          if (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current)) {
            return;
          }
          if (currentOpen && !isOverInactiveTrigger || getRestMs(restMsRef.current) === 0) {
            return;
          }
          if (!isOverInactiveTrigger && restTimeoutPendingRef.current && event.movementX ** 2 + event.movementY ** 2 < 2) {
            return;
          }
          restTimeout.clear();
          function handleMouseMove() {
            if (!blockMouseMoveRef.current && (!currentOpen || isOverInactiveTrigger)) {
              store.setOpen(true, createChangeEventDetails(reason_parts_exports.triggerHover, nativeEvent, trigger));
            }
          }
          if (pointerTypeRef.current === "touch") {
            ReactDOM5.flushSync(() => {
              handleMouseMove();
            });
          } else if (isOverInactiveTrigger && currentOpen) {
            handleMouseMove();
          } else {
            restTimeoutPendingRef.current = true;
            restTimeout.start(getRestMs(restMsRef.current), handleMouseMove);
          }
        }
      };
    }, [blockMouseMoveRef, mouseOnly, store, pointerTypeRef, restMsRef, restTimeout, restTimeoutPendingRef]);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useInteractions.js
  var React47 = __toESM(require_compat(), 1);
  function useInteractions(propsList = []) {
    const referenceDeps = propsList.map((key) => key?.reference);
    const floatingDeps = propsList.map((key) => key?.floating);
    const itemDeps = propsList.map((key) => key?.item);
    const triggerDeps = propsList.map((key) => key?.trigger);
    const getReferenceProps = React47.useCallback(
      (userProps) => mergeProps2(userProps, propsList, "reference"),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      referenceDeps
    );
    const getFloatingProps = React47.useCallback(
      (userProps) => mergeProps2(userProps, propsList, "floating"),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      floatingDeps
    );
    const getItemProps = React47.useCallback(
      (userProps) => mergeProps2(userProps, propsList, "item"),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      itemDeps
    );
    const getTriggerProps = React47.useCallback(
      (userProps) => mergeProps2(userProps, propsList, "trigger"),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      triggerDeps
    );
    return React47.useMemo(() => ({
      getReferenceProps,
      getFloatingProps,
      getItemProps,
      getTriggerProps
    }), [getReferenceProps, getFloatingProps, getItemProps, getTriggerProps]);
  }
  function mergeProps2(userProps, propsList, elementKey) {
    const eventHandlers = /* @__PURE__ */ new Map();
    const isItem = elementKey === "item";
    const outputProps = {};
    if (elementKey === "floating") {
      outputProps.tabIndex = -1;
      outputProps[FOCUSABLE_ATTRIBUTE] = "";
    }
    for (const key in userProps) {
      if (isItem && userProps) {
        if (key === ACTIVE_KEY || key === SELECTED_KEY) {
          continue;
        }
      }
      outputProps[key] = userProps[key];
    }
    for (let i4 = 0; i4 < propsList.length; i4 += 1) {
      let props;
      const propsOrGetProps = propsList[i4]?.[elementKey];
      if (typeof propsOrGetProps === "function") {
        props = userProps ? propsOrGetProps(userProps) : null;
      } else {
        props = propsOrGetProps;
      }
      if (!props) {
        continue;
      }
      mutablyMergeProps(outputProps, props, isItem, eventHandlers);
    }
    mutablyMergeProps(outputProps, userProps, isItem, eventHandlers);
    return outputProps;
  }
  function mutablyMergeProps(outputProps, props, isItem, eventHandlers) {
    for (const key in props) {
      const value = props[key];
      if (isItem && (key === ACTIVE_KEY || key === SELECTED_KEY)) {
        continue;
      }
      if (!key.startsWith("on")) {
        outputProps[key] = value;
      } else {
        if (!eventHandlers.has(key)) {
          eventHandlers.set(key, []);
        }
        if (typeof value === "function") {
          eventHandlers.get(key)?.push(value);
          outputProps[key] = (...args) => {
            return eventHandlers.get(key)?.map((fn2) => fn2(...args)).find((val) => val !== void 0);
          };
        }
      }
    }
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useListNavigation.js
  var React48 = __toESM(require_compat(), 1);
  var ESCAPE = "Escape";
  function doSwitch(orientation, vertical, horizontal) {
    switch (orientation) {
      case "vertical":
        return vertical;
      case "horizontal":
        return horizontal;
      default:
        return vertical || horizontal;
    }
  }
  function isMainOrientationKey(key, orientation) {
    const vertical = key === ARROW_UP || key === ARROW_DOWN;
    const horizontal = key === ARROW_LEFT || key === ARROW_RIGHT;
    return doSwitch(orientation, vertical, horizontal);
  }
  function isMainOrientationToEndKey(key, orientation, rtl) {
    const vertical = key === ARROW_DOWN;
    const horizontal = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
    return doSwitch(orientation, vertical, horizontal) || key === "Enter" || key === " " || key === "";
  }
  function isCrossOrientationOpenKey(key, orientation, rtl) {
    const vertical = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
    const horizontal = key === ARROW_DOWN;
    return doSwitch(orientation, vertical, horizontal);
  }
  function isCrossOrientationCloseKey(key, orientation, rtl, cols) {
    const vertical = rtl ? key === ARROW_RIGHT : key === ARROW_LEFT;
    const horizontal = key === ARROW_UP;
    if (orientation === "both" || orientation === "horizontal" && cols && cols > 1) {
      return key === ESCAPE;
    }
    return doSwitch(orientation, vertical, horizontal);
  }
  function useListNavigation(context, props) {
    const store = "rootStore" in context ? context.rootStore : context;
    const open = store.useState("open");
    const floatingElement = store.useState("floatingElement");
    const domReferenceElement = store.useState("domReferenceElement");
    const dataRef = store.context.dataRef;
    const {
      listRef,
      activeIndex,
      onNavigate: onNavigateProp = () => {
      },
      enabled = true,
      selectedIndex = null,
      allowEscape = false,
      loopFocus = false,
      nested = false,
      rtl = false,
      virtual = false,
      focusItemOnOpen = "auto",
      focusItemOnHover = true,
      openOnArrowKeyDown = true,
      disabledIndices = void 0,
      orientation = "vertical",
      parentOrientation,
      cols = 1,
      scrollItemIntoView = true,
      itemSizes,
      dense = false,
      id,
      resetOnPointerLeave = true,
      externalTree
    } = props;
    if (false) {
      if (allowEscape) {
        if (!loopFocus) {
          console.warn("`useListNavigation` looping must be enabled to allow escaping.");
        }
        if (!virtual) {
          console.warn("`useListNavigation` must be virtual to allow escaping.");
        }
      }
      if (orientation === "vertical" && cols > 1) {
        console.warn("In grid list navigation mode (`cols` > 1), the `orientation` should", 'be either "horizontal" or "both".');
      }
    }
    const floatingFocusElement = getFloatingFocusElement(floatingElement);
    const floatingFocusElementRef = useValueAsRef(floatingFocusElement);
    const parentId = useFloatingParentNodeId();
    const tree = useFloatingTree(externalTree);
    useIsoLayoutEffect(() => {
      dataRef.current.orientation = orientation;
    }, [dataRef, orientation]);
    const typeableComboboxReference = isTypeableCombobox(domReferenceElement);
    const focusItemOnOpenRef = React48.useRef(focusItemOnOpen);
    const indexRef = React48.useRef(selectedIndex ?? -1);
    const keyRef = React48.useRef(null);
    const isPointerModalityRef = React48.useRef(true);
    const onNavigate = useStableCallback((event) => {
      onNavigateProp(indexRef.current === -1 ? null : indexRef.current, event);
    });
    const previousOnNavigateRef = React48.useRef(onNavigate);
    const previousMountedRef = React48.useRef(!!floatingElement);
    const previousOpenRef = React48.useRef(open);
    const forceSyncFocusRef = React48.useRef(false);
    const forceScrollIntoViewRef = React48.useRef(false);
    const disabledIndicesRef = useValueAsRef(disabledIndices);
    const latestOpenRef = useValueAsRef(open);
    const scrollItemIntoViewRef = useValueAsRef(scrollItemIntoView);
    const selectedIndexRef = useValueAsRef(selectedIndex);
    const resetOnPointerLeaveRef = useValueAsRef(resetOnPointerLeave);
    const focusItem = useStableCallback(() => {
      function runFocus(item2) {
        if (virtual) {
          tree?.events.emit("virtualfocus", item2);
        } else {
          enqueueFocus(item2, {
            sync: forceSyncFocusRef.current,
            preventScroll: true
          });
        }
      }
      const initialItem = listRef.current[indexRef.current];
      const forceScrollIntoView = forceScrollIntoViewRef.current;
      if (initialItem) {
        runFocus(initialItem);
      }
      const scheduler2 = forceSyncFocusRef.current ? (v3) => v3() : requestAnimationFrame;
      scheduler2(() => {
        const waitedItem = listRef.current[indexRef.current] || initialItem;
        if (!waitedItem) {
          return;
        }
        if (!initialItem) {
          runFocus(waitedItem);
        }
        const scrollIntoViewOptions = scrollItemIntoViewRef.current;
        const shouldScrollIntoView = scrollIntoViewOptions && // eslint-disable-next-line @typescript-eslint/no-use-before-define
        item && (forceScrollIntoView || !isPointerModalityRef.current);
        if (shouldScrollIntoView) {
          waitedItem.scrollIntoView?.(typeof scrollIntoViewOptions === "boolean" ? {
            block: "nearest",
            inline: "nearest"
          } : scrollIntoViewOptions);
        }
      });
    });
    useIsoLayoutEffect(() => {
      if (!enabled) {
        return;
      }
      if (open && floatingElement) {
        indexRef.current = selectedIndex ?? -1;
        if (focusItemOnOpenRef.current && selectedIndex != null) {
          forceScrollIntoViewRef.current = true;
          onNavigate();
        }
      } else if (previousMountedRef.current) {
        indexRef.current = -1;
        previousOnNavigateRef.current();
      }
    }, [enabled, open, floatingElement, selectedIndex, onNavigate]);
    useIsoLayoutEffect(() => {
      if (!enabled) {
        return;
      }
      if (!open) {
        forceSyncFocusRef.current = false;
        return;
      }
      if (!floatingElement) {
        return;
      }
      if (activeIndex == null) {
        forceSyncFocusRef.current = false;
        if (selectedIndexRef.current != null) {
          return;
        }
        if (previousMountedRef.current) {
          indexRef.current = -1;
          focusItem();
        }
        if ((!previousOpenRef.current || !previousMountedRef.current) && focusItemOnOpenRef.current && (keyRef.current != null || focusItemOnOpenRef.current === true && keyRef.current == null)) {
          let runs = 0;
          const waitForListPopulated = () => {
            if (listRef.current[0] == null) {
              if (runs < 2) {
                const scheduler2 = runs ? requestAnimationFrame : queueMicrotask;
                scheduler2(waitForListPopulated);
              }
              runs += 1;
            } else {
              indexRef.current = keyRef.current == null || isMainOrientationToEndKey(keyRef.current, orientation, rtl) || nested ? getMinListIndex(listRef) : getMaxListIndex(listRef);
              keyRef.current = null;
              onNavigate();
            }
          };
          waitForListPopulated();
        }
      } else if (!isIndexOutOfListBounds(listRef, activeIndex)) {
        indexRef.current = activeIndex;
        focusItem();
        forceScrollIntoViewRef.current = false;
      }
    }, [enabled, open, floatingElement, activeIndex, selectedIndexRef, nested, listRef, orientation, rtl, onNavigate, focusItem, disabledIndicesRef]);
    useIsoLayoutEffect(() => {
      if (!enabled || floatingElement || !tree || virtual || !previousMountedRef.current) {
        return;
      }
      const nodes = tree.nodesRef.current;
      const parent = nodes.find((node) => node.id === parentId)?.context?.elements.floating;
      const activeEl = activeElement(getDocument(floatingElement));
      const treeContainsActiveEl = nodes.some((node) => node.context && contains(node.context.elements.floating, activeEl));
      if (parent && !treeContainsActiveEl && isPointerModalityRef.current) {
        parent.focus({
          preventScroll: true
        });
      }
    }, [enabled, floatingElement, tree, parentId, virtual]);
    useIsoLayoutEffect(() => {
      previousOnNavigateRef.current = onNavigate;
      previousOpenRef.current = open;
      previousMountedRef.current = !!floatingElement;
    });
    useIsoLayoutEffect(() => {
      if (!open) {
        keyRef.current = null;
        focusItemOnOpenRef.current = focusItemOnOpen;
      }
    }, [open, focusItemOnOpen]);
    const hasActiveIndex = activeIndex != null;
    const item = React48.useMemo(() => {
      function syncCurrentTarget(event) {
        if (!latestOpenRef.current) {
          return;
        }
        const index2 = listRef.current.indexOf(event.currentTarget);
        if (index2 !== -1 && indexRef.current !== index2) {
          indexRef.current = index2;
          onNavigate(event);
        }
      }
      const itemProps = {
        onFocus(event) {
          forceSyncFocusRef.current = true;
          syncCurrentTarget(event);
        },
        onClick: ({
          currentTarget
        }) => currentTarget.focus({
          preventScroll: true
        }),
        // Safari
        onMouseMove(event) {
          forceSyncFocusRef.current = true;
          forceScrollIntoViewRef.current = false;
          if (focusItemOnHover) {
            syncCurrentTarget(event);
          }
        },
        onPointerLeave(event) {
          if (!latestOpenRef.current || !isPointerModalityRef.current || event.pointerType === "touch") {
            return;
          }
          forceSyncFocusRef.current = true;
          const relatedTarget = event.relatedTarget;
          if (!focusItemOnHover || listRef.current.includes(relatedTarget)) {
            return;
          }
          if (!resetOnPointerLeaveRef.current) {
            return;
          }
          indexRef.current = -1;
          onNavigate(event);
          if (!virtual) {
            floatingFocusElementRef.current?.focus({
              preventScroll: true
            });
          }
        }
      };
      return itemProps;
    }, [latestOpenRef, floatingFocusElementRef, focusItemOnHover, listRef, onNavigate, resetOnPointerLeaveRef, virtual]);
    const getParentOrientation = React48.useCallback(() => {
      return parentOrientation ?? tree?.nodesRef.current.find((node) => node.id === parentId)?.context?.dataRef?.current.orientation;
    }, [parentId, tree, parentOrientation]);
    const commonOnKeyDown = useStableCallback((event) => {
      isPointerModalityRef.current = false;
      forceSyncFocusRef.current = true;
      if (event.which === 229) {
        return;
      }
      if (!latestOpenRef.current && event.currentTarget === floatingFocusElementRef.current) {
        return;
      }
      if (nested && isCrossOrientationCloseKey(event.key, orientation, rtl, cols)) {
        if (!isMainOrientationKey(event.key, getParentOrientation())) {
          stopEvent(event);
        }
        store.setOpen(false, createChangeEventDetails(reason_parts_exports.listNavigation, event.nativeEvent));
        if (isHTMLElement(domReferenceElement)) {
          if (virtual) {
            tree?.events.emit("virtualfocus", domReferenceElement);
          } else {
            domReferenceElement.focus();
          }
        }
        return;
      }
      const currentIndex = indexRef.current;
      const minIndex = getMinListIndex(listRef, disabledIndices);
      const maxIndex = getMaxListIndex(listRef, disabledIndices);
      if (!typeableComboboxReference) {
        if (event.key === "Home") {
          stopEvent(event);
          indexRef.current = minIndex;
          onNavigate(event);
        }
        if (event.key === "End") {
          stopEvent(event);
          indexRef.current = maxIndex;
          onNavigate(event);
        }
      }
      if (cols > 1) {
        const sizes = itemSizes || Array.from({
          length: listRef.current.length
        }, () => ({
          width: 1,
          height: 1
        }));
        const cellMap = createGridCellMap(sizes, cols, dense);
        const minGridIndex = cellMap.findIndex((index3) => index3 != null && !isListIndexDisabled(listRef, index3, disabledIndices));
        const maxGridIndex = cellMap.reduce((foundIndex, index3, cellIndex) => index3 != null && !isListIndexDisabled(listRef, index3, disabledIndices) ? cellIndex : foundIndex, -1);
        const index2 = cellMap[getGridNavigatedIndex({
          current: cellMap.map((itemIndex) => itemIndex != null ? listRef.current[itemIndex] : null)
        }, {
          event,
          orientation,
          loopFocus,
          rtl,
          cols,
          // treat undefined (empty grid spaces) as disabled indices so we
          // don't end up in them
          disabledIndices: getGridCellIndices([...(typeof disabledIndices !== "function" ? disabledIndices : null) || listRef.current.map((_3, listIndex) => isListIndexDisabled(listRef, listIndex, disabledIndices) ? listIndex : void 0), void 0], cellMap),
          minIndex: minGridIndex,
          maxIndex: maxGridIndex,
          prevIndex: getGridCellIndexOfCorner(
            indexRef.current > maxIndex ? minIndex : indexRef.current,
            sizes,
            cellMap,
            cols,
            // use a corner matching the edge closest to the direction
            // we're moving in so we don't end up in the same item. Prefer
            // top/left over bottom/right.
            // eslint-disable-next-line no-nested-ternary
            event.key === ARROW_DOWN ? "bl" : event.key === (rtl ? ARROW_LEFT : ARROW_RIGHT) ? "tr" : "tl"
          ),
          stopEvent: true
        })];
        if (index2 != null) {
          indexRef.current = index2;
          onNavigate(event);
        }
        if (orientation === "both") {
          return;
        }
      }
      if (isMainOrientationKey(event.key, orientation)) {
        stopEvent(event);
        if (open && !virtual && activeElement(event.currentTarget.ownerDocument) === event.currentTarget) {
          indexRef.current = isMainOrientationToEndKey(event.key, orientation, rtl) ? minIndex : maxIndex;
          onNavigate(event);
          return;
        }
        if (isMainOrientationToEndKey(event.key, orientation, rtl)) {
          if (loopFocus) {
            if (currentIndex >= maxIndex) {
              if (allowEscape && currentIndex !== listRef.current.length) {
                indexRef.current = -1;
              } else {
                forceSyncFocusRef.current = false;
                indexRef.current = minIndex;
              }
            } else {
              indexRef.current = findNonDisabledListIndex(listRef, {
                startingIndex: currentIndex,
                disabledIndices
              });
            }
          } else {
            indexRef.current = Math.min(maxIndex, findNonDisabledListIndex(listRef, {
              startingIndex: currentIndex,
              disabledIndices
            }));
          }
        } else if (loopFocus) {
          if (currentIndex <= minIndex) {
            if (allowEscape && currentIndex !== -1) {
              indexRef.current = listRef.current.length;
            } else {
              forceSyncFocusRef.current = false;
              indexRef.current = maxIndex;
            }
          } else {
            indexRef.current = findNonDisabledListIndex(listRef, {
              startingIndex: currentIndex,
              decrement: true,
              disabledIndices
            });
          }
        } else {
          indexRef.current = Math.max(minIndex, findNonDisabledListIndex(listRef, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          }));
        }
        if (isIndexOutOfListBounds(listRef, indexRef.current)) {
          indexRef.current = -1;
        }
        onNavigate(event);
      }
    });
    const ariaActiveDescendantProp = React48.useMemo(() => {
      return virtual && open && hasActiveIndex && {
        "aria-activedescendant": `${id}-${activeIndex}`
      };
    }, [virtual, open, hasActiveIndex, id, activeIndex]);
    const floating = React48.useMemo(() => {
      return {
        "aria-orientation": orientation === "both" ? void 0 : orientation,
        ...!typeableComboboxReference ? ariaActiveDescendantProp : {},
        onKeyDown(event) {
          if (event.key === "Tab" && event.shiftKey && open && !virtual) {
            const target = getTarget(event.nativeEvent);
            if (target && !contains(floatingFocusElementRef.current, target)) {
              return;
            }
            stopEvent(event);
            store.setOpen(false, createChangeEventDetails(reason_parts_exports.focusOut, event.nativeEvent));
            if (isHTMLElement(domReferenceElement)) {
              domReferenceElement.focus();
            }
            return;
          }
          commonOnKeyDown(event);
        },
        onPointerMove() {
          isPointerModalityRef.current = true;
        }
      };
    }, [ariaActiveDescendantProp, commonOnKeyDown, floatingFocusElementRef, orientation, typeableComboboxReference, store, open, virtual, domReferenceElement]);
    const trigger = React48.useMemo(() => {
      function checkVirtualMouse(event) {
        if (focusItemOnOpen === "auto" && isVirtualClick(event.nativeEvent)) {
          focusItemOnOpenRef.current = !virtual;
        }
      }
      function checkVirtualPointer(event) {
        focusItemOnOpenRef.current = focusItemOnOpen;
        if (focusItemOnOpen === "auto" && isVirtualPointerEvent(event.nativeEvent)) {
          focusItemOnOpenRef.current = true;
        }
      }
      return {
        onKeyDown(event) {
          const currentOpen = store.select("open");
          isPointerModalityRef.current = false;
          const isArrowKey = event.key.startsWith("Arrow");
          const isParentCrossOpenKey = isCrossOrientationOpenKey(event.key, getParentOrientation(), rtl);
          const isMainKey = isMainOrientationKey(event.key, orientation);
          const isNavigationKey = (nested ? isParentCrossOpenKey : isMainKey) || event.key === "Enter" || event.key.trim() === "";
          if (virtual && currentOpen) {
            return commonOnKeyDown(event);
          }
          if (!currentOpen && !openOnArrowKeyDown && isArrowKey) {
            return void 0;
          }
          if (isNavigationKey) {
            const isParentMainKey = isMainOrientationKey(event.key, getParentOrientation());
            keyRef.current = nested && isParentMainKey ? null : event.key;
          }
          if (nested) {
            if (isParentCrossOpenKey) {
              stopEvent(event);
              if (currentOpen) {
                indexRef.current = getMinListIndex(listRef, disabledIndicesRef.current);
                onNavigate(event);
              } else {
                store.setOpen(true, createChangeEventDetails(reason_parts_exports.listNavigation, event.nativeEvent, event.currentTarget));
              }
            }
            return void 0;
          }
          if (isMainKey) {
            if (selectedIndexRef.current != null) {
              indexRef.current = selectedIndexRef.current;
            }
            stopEvent(event);
            if (!currentOpen && openOnArrowKeyDown) {
              store.setOpen(true, createChangeEventDetails(reason_parts_exports.listNavigation, event.nativeEvent, event.currentTarget));
            } else {
              commonOnKeyDown(event);
            }
            if (currentOpen) {
              onNavigate(event);
            }
          }
          return void 0;
        },
        onFocus(event) {
          if (store.select("open") && !virtual) {
            indexRef.current = -1;
            onNavigate(event);
          }
        },
        onPointerDown: checkVirtualPointer,
        onPointerEnter: checkVirtualPointer,
        onMouseDown: checkVirtualMouse,
        onClick: checkVirtualMouse
      };
    }, [commonOnKeyDown, disabledIndicesRef, focusItemOnOpen, listRef, nested, onNavigate, store, openOnArrowKeyDown, orientation, getParentOrientation, rtl, selectedIndexRef, virtual]);
    const reference = React48.useMemo(() => {
      return {
        ...ariaActiveDescendantProp,
        ...trigger
      };
    }, [ariaActiveDescendantProp, trigger]);
    return React48.useMemo(() => enabled ? {
      reference,
      floating,
      item,
      trigger
    } : {}, [enabled, reference, floating, trigger, item]);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useRole.js
  var React49 = __toESM(require_compat(), 1);
  var componentRoleToAriaRoleMap = /* @__PURE__ */ new Map([["select", "listbox"], ["combobox", "listbox"], ["label", false]]);
  function useRole(context, props = {}) {
    const store = "rootStore" in context ? context.rootStore : context;
    const open = store.useState("open");
    const defaultFloatingId = store.useState("floatingId");
    const domReference = store.useState("domReferenceElement");
    const floatingElement = store.useState("floatingElement");
    const {
      enabled = true,
      role = "dialog"
    } = props;
    const defaultReferenceId = useId();
    const referenceId = domReference?.id || defaultReferenceId;
    const floatingId = React49.useMemo(() => getFloatingFocusElement(floatingElement)?.id || defaultFloatingId, [floatingElement, defaultFloatingId]);
    const ariaRole = componentRoleToAriaRoleMap.get(role) ?? role;
    const parentId = useFloatingParentNodeId();
    const isNested = parentId != null;
    const trigger = React49.useMemo(() => {
      if (ariaRole === "tooltip" || role === "label") {
        return EMPTY_OBJECT;
      }
      return {
        "aria-haspopup": ariaRole === "alertdialog" ? "dialog" : ariaRole,
        "aria-expanded": "false",
        ...ariaRole === "listbox" && {
          role: "combobox"
        },
        ...ariaRole === "menu" && isNested && {
          role: "menuitem"
        },
        ...role === "select" && {
          "aria-autocomplete": "none"
        },
        ...role === "combobox" && {
          "aria-autocomplete": "list"
        }
      };
    }, [ariaRole, isNested, role]);
    const reference = React49.useMemo(() => {
      if (ariaRole === "tooltip" || role === "label") {
        return {
          [`aria-${role === "label" ? "labelledby" : "describedby"}`]: open ? floatingId : void 0
        };
      }
      const triggerProps = trigger;
      return {
        ...triggerProps,
        "aria-expanded": open ? "true" : "false",
        "aria-controls": open ? floatingId : void 0,
        ...ariaRole === "menu" && {
          id: referenceId
        }
      };
    }, [ariaRole, floatingId, open, referenceId, role, trigger]);
    const floating = React49.useMemo(() => {
      const floatingProps = {
        id: floatingId,
        ...ariaRole && {
          role: ariaRole
        }
      };
      if (ariaRole === "tooltip" || role === "label") {
        return floatingProps;
      }
      return {
        ...floatingProps,
        ...ariaRole === "menu" && {
          "aria-labelledby": referenceId
        }
      };
    }, [ariaRole, floatingId, referenceId, role]);
    const item = React49.useCallback(({
      active,
      selected
    }) => {
      const commonProps = {
        role: "option",
        ...active && {
          id: `${floatingId}-fui-option`
        }
      };
      switch (role) {
        case "select":
        case "combobox":
          return {
            ...commonProps,
            "aria-selected": selected
          };
        default:
      }
      return {};
    }, [floatingId, role]);
    return React49.useMemo(() => enabled ? {
      reference,
      floating,
      item,
      trigger
    } : {}, [enabled, reference, floating, trigger, item]);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useTypeahead.js
  var React50 = __toESM(require_compat(), 1);
  function useTypeahead(context, props) {
    const store = "rootStore" in context ? context.rootStore : context;
    const open = store.useState("open");
    const dataRef = store.context.dataRef;
    const {
      listRef,
      activeIndex,
      onMatch: onMatchProp,
      onTypingChange,
      enabled = true,
      findMatch = null,
      resetMs = 750,
      ignoreKeys = EMPTY_ARRAY,
      selectedIndex = null
    } = props;
    const timeout = useTimeout();
    const stringRef = React50.useRef("");
    const prevIndexRef = React50.useRef(selectedIndex ?? activeIndex ?? -1);
    const matchIndexRef = React50.useRef(null);
    useIsoLayoutEffect(() => {
      if (open) {
        timeout.clear();
        matchIndexRef.current = null;
        stringRef.current = "";
      }
    }, [open, timeout]);
    useIsoLayoutEffect(() => {
      if (open && stringRef.current === "") {
        prevIndexRef.current = selectedIndex ?? activeIndex ?? -1;
      }
    }, [open, selectedIndex, activeIndex]);
    const setTypingChange = useStableCallback((value) => {
      if (value) {
        if (!dataRef.current.typing) {
          dataRef.current.typing = value;
          onTypingChange?.(value);
        }
      } else if (dataRef.current.typing) {
        dataRef.current.typing = value;
        onTypingChange?.(value);
      }
    });
    const onKeyDown = useStableCallback((event) => {
      function getMatchingIndex(list, orderedList, string) {
        const str = findMatch ? findMatch(orderedList, string) : orderedList.find((text) => text?.toLocaleLowerCase().indexOf(string.toLocaleLowerCase()) === 0);
        return str ? list.indexOf(str) : -1;
      }
      const listContent = listRef.current;
      if (stringRef.current.length > 0 && stringRef.current[0] !== " ") {
        if (getMatchingIndex(listContent, listContent, stringRef.current) === -1) {
          setTypingChange(false);
        } else if (event.key === " ") {
          stopEvent(event);
        }
      }
      if (listContent == null || ignoreKeys.includes(event.key) || // Character key.
      event.key.length !== 1 || // Modifier key.
      event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }
      if (open && event.key !== " ") {
        stopEvent(event);
        setTypingChange(true);
      }
      const allowRapidSuccessionOfFirstLetter = listContent.every((text) => text ? text[0]?.toLocaleLowerCase() !== text[1]?.toLocaleLowerCase() : true);
      if (allowRapidSuccessionOfFirstLetter && stringRef.current === event.key) {
        stringRef.current = "";
        prevIndexRef.current = matchIndexRef.current;
      }
      stringRef.current += event.key;
      timeout.start(resetMs, () => {
        stringRef.current = "";
        prevIndexRef.current = matchIndexRef.current;
        setTypingChange(false);
      });
      const prevIndex = prevIndexRef.current;
      const index2 = getMatchingIndex(listContent, [...listContent.slice((prevIndex || 0) + 1), ...listContent.slice(0, (prevIndex || 0) + 1)], stringRef.current);
      if (index2 !== -1) {
        onMatchProp?.(index2);
        matchIndexRef.current = index2;
      } else if (event.key !== " ") {
        stringRef.current = "";
        setTypingChange(false);
      }
    });
    const reference = React50.useMemo(() => ({
      onKeyDown
    }), [onKeyDown]);
    const floating = React50.useMemo(() => {
      return {
        onKeyDown,
        onKeyUp(event) {
          if (event.key === " ") {
            setTypingChange(false);
          }
        }
      };
    }, [onKeyDown, setTypingChange]);
    return React50.useMemo(() => enabled ? {
      reference,
      floating
    } : {}, [enabled, reference, floating]);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/safePolygon.js
  function isPointInPolygon(point, polygon) {
    const [x4, y3] = point;
    let isInsideValue = false;
    const length = polygon.length;
    for (let i4 = 0, j4 = length - 1; i4 < length; j4 = i4++) {
      const [xi, yi] = polygon[i4] || [0, 0];
      const [xj, yj] = polygon[j4] || [0, 0];
      const intersect = yi >= y3 !== yj >= y3 && x4 <= (xj - xi) * (y3 - yi) / (yj - yi) + xi;
      if (intersect) {
        isInsideValue = !isInsideValue;
      }
    }
    return isInsideValue;
  }
  function isInside(point, rect) {
    return point[0] >= rect.x && point[0] <= rect.x + rect.width && point[1] >= rect.y && point[1] <= rect.y + rect.height;
  }
  function safePolygon(options = {}) {
    const {
      buffer = 0.5,
      blockPointerEvents = false,
      requireIntent = true
    } = options;
    const timeout = new Timeout();
    let hasLanded = false;
    let lastX = null;
    let lastY = null;
    let lastCursorTime = typeof performance !== "undefined" ? performance.now() : 0;
    function getCursorSpeed(x4, y3) {
      const currentTime = performance.now();
      const elapsedTime = currentTime - lastCursorTime;
      if (lastX === null || lastY === null || elapsedTime === 0) {
        lastX = x4;
        lastY = y3;
        lastCursorTime = currentTime;
        return null;
      }
      const deltaX = x4 - lastX;
      const deltaY = y3 - lastY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const speed = distance / elapsedTime;
      lastX = x4;
      lastY = y3;
      lastCursorTime = currentTime;
      return speed;
    }
    const fn2 = ({
      x: x4,
      y: y3,
      placement,
      elements,
      onClose,
      nodeId,
      tree
    }) => {
      return function onMouseMove(event) {
        function close() {
          timeout.clear();
          onClose();
        }
        timeout.clear();
        if (!elements.domReference || !elements.floating || placement == null || x4 == null || y3 == null) {
          return void 0;
        }
        const {
          clientX,
          clientY
        } = event;
        const clientPoint = [clientX, clientY];
        const target = getTarget(event);
        const isLeave = event.type === "mouseleave";
        const isOverFloatingEl = contains(elements.floating, target);
        const isOverReferenceEl = contains(elements.domReference, target);
        const refRect = elements.domReference.getBoundingClientRect();
        const rect = elements.floating.getBoundingClientRect();
        const side = placement.split("-")[0];
        const cursorLeaveFromRight = x4 > rect.right - rect.width / 2;
        const cursorLeaveFromBottom = y3 > rect.bottom - rect.height / 2;
        const isOverReferenceRect = isInside(clientPoint, refRect);
        const isFloatingWider = rect.width > refRect.width;
        const isFloatingTaller = rect.height > refRect.height;
        const left = (isFloatingWider ? refRect : rect).left;
        const right = (isFloatingWider ? refRect : rect).right;
        const top = (isFloatingTaller ? refRect : rect).top;
        const bottom = (isFloatingTaller ? refRect : rect).bottom;
        if (isOverFloatingEl) {
          hasLanded = true;
          if (!isLeave) {
            return void 0;
          }
        }
        if (isOverReferenceEl) {
          hasLanded = false;
        }
        if (isOverReferenceEl && !isLeave) {
          hasLanded = true;
          return void 0;
        }
        if (isLeave && isElement(event.relatedTarget) && contains(elements.floating, event.relatedTarget)) {
          return void 0;
        }
        if (tree && getNodeChildren(tree.nodesRef.current, nodeId).some(({
          context
        }) => context?.open)) {
          return void 0;
        }
        if (side === "top" && y3 >= refRect.bottom - 1 || side === "bottom" && y3 <= refRect.top + 1 || side === "left" && x4 >= refRect.right - 1 || side === "right" && x4 <= refRect.left + 1) {
          return close();
        }
        let rectPoly = [];
        switch (side) {
          case "top":
            rectPoly = [[left, refRect.top + 1], [left, rect.bottom - 1], [right, rect.bottom - 1], [right, refRect.top + 1]];
            break;
          case "bottom":
            rectPoly = [[left, rect.top + 1], [left, refRect.bottom - 1], [right, refRect.bottom - 1], [right, rect.top + 1]];
            break;
          case "left":
            rectPoly = [[rect.right - 1, bottom], [rect.right - 1, top], [refRect.left + 1, top], [refRect.left + 1, bottom]];
            break;
          case "right":
            rectPoly = [[refRect.right - 1, bottom], [refRect.right - 1, top], [rect.left + 1, top], [rect.left + 1, bottom]];
            break;
          default:
        }
        function getPolygon([px, py]) {
          switch (side) {
            case "top": {
              const cursorPointOne = [isFloatingWider ? px + buffer / 2 : cursorLeaveFromRight ? px + buffer * 4 : px - buffer * 4, py + buffer + 1];
              const cursorPointTwo = [isFloatingWider ? px - buffer / 2 : cursorLeaveFromRight ? px + buffer * 4 : px - buffer * 4, py + buffer + 1];
              const commonPoints = [[rect.left, cursorLeaveFromRight ? rect.bottom - buffer : isFloatingWider ? rect.bottom - buffer : rect.top], [rect.right, cursorLeaveFromRight ? isFloatingWider ? rect.bottom - buffer : rect.top : rect.bottom - buffer]];
              return [cursorPointOne, cursorPointTwo, ...commonPoints];
            }
            case "bottom": {
              const cursorPointOne = [isFloatingWider ? px + buffer / 2 : cursorLeaveFromRight ? px + buffer * 4 : px - buffer * 4, py - buffer];
              const cursorPointTwo = [isFloatingWider ? px - buffer / 2 : cursorLeaveFromRight ? px + buffer * 4 : px - buffer * 4, py - buffer];
              const commonPoints = [[rect.left, cursorLeaveFromRight ? rect.top + buffer : isFloatingWider ? rect.top + buffer : rect.bottom], [rect.right, cursorLeaveFromRight ? isFloatingWider ? rect.top + buffer : rect.bottom : rect.top + buffer]];
              return [cursorPointOne, cursorPointTwo, ...commonPoints];
            }
            case "left": {
              const cursorPointOne = [px + buffer + 1, isFloatingTaller ? py + buffer / 2 : cursorLeaveFromBottom ? py + buffer * 4 : py - buffer * 4];
              const cursorPointTwo = [px + buffer + 1, isFloatingTaller ? py - buffer / 2 : cursorLeaveFromBottom ? py + buffer * 4 : py - buffer * 4];
              const commonPoints = [[cursorLeaveFromBottom ? rect.right - buffer : isFloatingTaller ? rect.right - buffer : rect.left, rect.top], [cursorLeaveFromBottom ? isFloatingTaller ? rect.right - buffer : rect.left : rect.right - buffer, rect.bottom]];
              return [...commonPoints, cursorPointOne, cursorPointTwo];
            }
            case "right": {
              const cursorPointOne = [px - buffer, isFloatingTaller ? py + buffer / 2 : cursorLeaveFromBottom ? py + buffer * 4 : py - buffer * 4];
              const cursorPointTwo = [px - buffer, isFloatingTaller ? py - buffer / 2 : cursorLeaveFromBottom ? py + buffer * 4 : py - buffer * 4];
              const commonPoints = [[cursorLeaveFromBottom ? rect.left + buffer : isFloatingTaller ? rect.left + buffer : rect.right, rect.top], [cursorLeaveFromBottom ? isFloatingTaller ? rect.left + buffer : rect.right : rect.left + buffer, rect.bottom]];
              return [cursorPointOne, cursorPointTwo, ...commonPoints];
            }
            default:
              return [];
          }
        }
        if (isPointInPolygon([clientX, clientY], rectPoly)) {
          return void 0;
        }
        if (hasLanded && !isOverReferenceRect) {
          return close();
        }
        if (!isLeave && requireIntent) {
          const cursorSpeed = getCursorSpeed(event.clientX, event.clientY);
          const cursorSpeedThreshold = 0.1;
          if (cursorSpeed !== null && cursorSpeed < cursorSpeedThreshold) {
            return close();
          }
        }
        if (!isPointInPolygon([clientX, clientY], getPolygon([x4, y3]))) {
          close();
        } else if (!hasLanded && requireIntent) {
          timeout.start(40, close);
        }
        return void 0;
      };
    };
    fn2.__options = {
      blockPointerEvents
    };
    return fn2;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/toolbar/root/ToolbarRootContext.js
  var React51 = __toESM(require_compat(), 1);
  var ToolbarRootContext = /* @__PURE__ */ React51.createContext(void 0);
  if (false) ToolbarRootContext.displayName = "ToolbarRootContext";
  function useToolbarRootContext(optional) {
    const context = React51.useContext(ToolbarRootContext);
    if (context === void 0 && !optional) {
      throw new Error(false ? "Base UI: ToolbarRootContext is missing. Toolbar parts must be placed within <Toolbar.Root>." : formatErrorMessage(69));
    }
    return context;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/composite/composite.js
  var ARROW_UP2 = "ArrowUp";
  var ARROW_DOWN2 = "ArrowDown";
  var ARROW_LEFT2 = "ArrowLeft";
  var ARROW_RIGHT2 = "ArrowRight";
  var HOME = "Home";
  var END = "End";
  var HORIZONTAL_KEYS = /* @__PURE__ */ new Set([ARROW_LEFT2, ARROW_RIGHT2]);
  var VERTICAL_KEYS = /* @__PURE__ */ new Set([ARROW_UP2, ARROW_DOWN2]);
  var ARROW_KEYS = /* @__PURE__ */ new Set([...HORIZONTAL_KEYS, ...VERTICAL_KEYS]);
  var ALL_KEYS = /* @__PURE__ */ new Set([...ARROW_KEYS, HOME, END]);
  var COMPOSITE_KEYS = /* @__PURE__ */ new Set([ARROW_UP2, ARROW_DOWN2, ARROW_LEFT2, ARROW_RIGHT2, HOME, END]);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/getDisabledMountTransitionStyles.js
  function getDisabledMountTransitionStyles(transitionStatus) {
    return transitionStatus === "starting" ? DISABLED_TRANSITIONS_STYLE : EMPTY_OBJECT;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/popup/MenuPopup.js
  var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
  var stateAttributesMapping2 = {
    ...popupStateMapping,
    ...transitionStatusMapping
  };
  var MenuPopup = /* @__PURE__ */ React52.forwardRef(function MenuPopup2(componentProps, forwardedRef) {
    const {
      render,
      className,
      finalFocus,
      ...elementProps
    } = componentProps;
    const {
      store
    } = useMenuRootContext();
    const {
      side,
      align
    } = useMenuPositionerContext();
    const insideToolbar = useToolbarRootContext(true) != null;
    const open = store.useState("open");
    const transitionStatus = store.useState("transitionStatus");
    const popupProps = store.useState("popupProps");
    const mounted = store.useState("mounted");
    const instantType = store.useState("instantType");
    const triggerElement = store.useState("activeTriggerElement");
    const parent = store.useState("parent");
    const lastOpenChangeReason = store.useState("lastOpenChangeReason");
    const rootId = store.useState("rootId");
    const floatingContext = store.useState("floatingRootContext");
    const floatingTreeRoot = store.useState("floatingTreeRoot");
    const closeDelay = store.useState("closeDelay");
    const activeTriggerElement = store.useState("activeTriggerElement");
    useOpenChangeComplete({
      open,
      ref: store.context.popupRef,
      onComplete() {
        if (open) {
          store.context.onOpenChangeComplete?.(true);
        }
      }
    });
    React52.useEffect(() => {
      function handleClose(event) {
        store.setOpen(false, createChangeEventDetails(event.reason, event.domEvent));
      }
      floatingTreeRoot.events.on("close", handleClose);
      return () => {
        floatingTreeRoot.events.off("close", handleClose);
      };
    }, [floatingTreeRoot.events, store]);
    const hoverEnabled = store.useState("hoverEnabled");
    const disabled2 = store.useState("disabled");
    useHoverFloatingInteraction(floatingContext, {
      enabled: hoverEnabled && !disabled2 && parent.type !== "context-menu" && parent.type !== "menubar",
      closeDelay
    });
    const state = React52.useMemo(() => ({
      transitionStatus,
      side,
      align,
      open,
      nested: parent.type === "menu",
      instant: instantType
    }), [transitionStatus, side, align, open, parent.type, instantType]);
    const element = useRenderElement("div", componentProps, {
      state,
      ref: [forwardedRef, store.context.popupRef],
      stateAttributesMapping: stateAttributesMapping2,
      props: [popupProps, {
        onKeyDown(event) {
          if (insideToolbar && COMPOSITE_KEYS.has(event.key)) {
            event.stopPropagation();
          }
        }
      }, getDisabledMountTransitionStyles(transitionStatus), elementProps, {
        "data-rootownerid": rootId
      }]
    });
    let returnFocus = parent.type === void 0 || parent.type === "context-menu";
    if (triggerElement || parent.type === "menubar" && lastOpenChangeReason !== reason_parts_exports.outsidePress) {
      returnFocus = true;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(FloatingFocusManager, {
      context: floatingContext,
      modal: false,
      disabled: !mounted,
      returnFocus: finalFocus === void 0 ? returnFocus : finalFocus,
      initialFocus: parent.type !== "menu",
      restoreFocus: true,
      externalTree: parent.type !== "menubar" ? floatingTreeRoot : void 0,
      previousFocusableElement: activeTriggerElement,
      nextFocusableElement: parent.type === void 0 ? store.context.triggerFocusTargetRef : void 0,
      beforeContentFocusGuardRef: parent.type === void 0 ? store.context.beforeContentFocusGuardRef : void 0,
      children: element
    });
  });
  if (false) MenuPopup.displayName = "MenuPopup";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/portal/MenuPortal.js
  var React54 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/portal/MenuPortalContext.js
  var React53 = __toESM(require_compat(), 1);
  var MenuPortalContext = /* @__PURE__ */ React53.createContext(void 0);
  if (false) MenuPortalContext.displayName = "MenuPortalContext";
  function useMenuPortalContext() {
    const value = React53.useContext(MenuPortalContext);
    if (value === void 0) {
      throw new Error(false ? "Base UI: <Menu.Portal> is missing." : formatErrorMessage(32));
    }
    return value;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/portal/MenuPortal.js
  var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
  var MenuPortal = /* @__PURE__ */ React54.forwardRef(function MenuPortal2(props, forwardedRef) {
    const {
      keepMounted = false,
      ...portalProps
    } = props;
    const {
      store
    } = useMenuRootContext();
    const mounted = store.useState("mounted");
    const shouldRender = mounted || keepMounted;
    if (!shouldRender) {
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(MenuPortalContext.Provider, {
      value: keepMounted,
      children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(FloatingPortal, {
        ref: forwardedRef,
        ...portalProps
      })
    });
  });
  if (false) MenuPortal.displayName = "MenuPortal";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/positioner/MenuPositioner.js
  var React59 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/inertValue.js
  function inertValue(value) {
    if (isReactVersionAtLeast(19)) {
      return value;
    }
    return value ? "true" : void 0;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/useAnchorPositioning.js
  var React56 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/direction-provider/DirectionContext.js
  var React55 = __toESM(require_compat(), 1);
  var DirectionContext = /* @__PURE__ */ React55.createContext(void 0);
  if (false) DirectionContext.displayName = "DirectionContext";
  function useDirection() {
    const context = React55.useContext(DirectionContext);
    return context?.direction ?? "ltr";
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/floating-ui-react/middleware/arrow.js
  var baseArrow = (options) => ({
    name: "arrow",
    options,
    async fn(state) {
      const {
        x: x4,
        y: y3,
        placement,
        rects,
        platform: platform3,
        elements,
        middlewareData
      } = state;
      const {
        element,
        padding = 0,
        offsetParent = "real"
      } = evaluate(options, state) || {};
      if (element == null) {
        return {};
      }
      const paddingObject = getPaddingObject(padding);
      const coords = {
        x: x4,
        y: y3
      };
      const axis = getAlignmentAxis(placement);
      const length = getAxisLength(axis);
      const arrowDimensions = await platform3.getDimensions(element);
      const isYAxis = axis === "y";
      const minProp = isYAxis ? "top" : "left";
      const maxProp = isYAxis ? "bottom" : "right";
      const clientProp = isYAxis ? "clientHeight" : "clientWidth";
      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];
      const arrowOffsetParent = offsetParent === "real" ? await platform3.getOffsetParent?.(element) : elements.floating;
      let clientSize = elements.floating[clientProp] || rects.floating[length];
      if (!clientSize || !await platform3.isElement?.(arrowOffsetParent)) {
        clientSize = elements.floating[clientProp] || rects.floating[length];
      }
      const centerToReference = endDiff / 2 - startDiff / 2;
      const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
      const minPadding = Math.min(paddingObject[minProp], largestPossiblePadding);
      const maxPadding = Math.min(paddingObject[maxProp], largestPossiblePadding);
      const min2 = minPadding;
      const max2 = clientSize - arrowDimensions[length] - maxPadding;
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const offset4 = clamp(min2, center, max2);
      const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset4 && rects.reference[length] / 2 - (center < min2 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
      const alignmentOffset = shouldAddOffset ? center < min2 ? center - min2 : center - max2 : 0;
      return {
        [axis]: coords[axis] + alignmentOffset,
        data: {
          [axis]: offset4,
          centerOffset: center - offset4 - alignmentOffset,
          ...shouldAddOffset && {
            alignmentOffset
          }
        },
        reset: shouldAddOffset
      };
    }
  });
  var arrow4 = (options, deps) => ({
    ...baseArrow(options),
    options: [options, deps]
  });

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/hideMiddleware.js
  var hide4 = {
    name: "hide",
    async fn(state) {
      const {
        width,
        height,
        x: x4,
        y: y3
      } = state.rects.reference;
      const anchorHidden = width === 0 && height === 0 && x4 === 0 && y3 === 0;
      const nativeHideResult = await hide3().fn(state);
      return {
        data: {
          referenceHidden: nativeHideResult.data?.referenceHidden || anchorHidden
        }
      };
    }
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/adaptiveOriginMiddleware.js
  var DEFAULT_SIDES = {
    sideX: "left",
    sideY: "top"
  };

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/useAnchorPositioning.js
  function getLogicalSide(sideParam, renderedSide, isRtl) {
    const isLogicalSideParam = sideParam === "inline-start" || sideParam === "inline-end";
    const logicalRight = isRtl ? "inline-start" : "inline-end";
    const logicalLeft = isRtl ? "inline-end" : "inline-start";
    return {
      top: "top",
      right: isLogicalSideParam ? logicalRight : "right",
      bottom: "bottom",
      left: isLogicalSideParam ? logicalLeft : "left"
    }[renderedSide];
  }
  function getOffsetData(state, sideParam, isRtl) {
    const {
      rects,
      placement
    } = state;
    const data = {
      side: getLogicalSide(sideParam, getSide(placement), isRtl),
      align: getAlignment(placement) || "center",
      anchor: {
        width: rects.reference.width,
        height: rects.reference.height
      },
      positioner: {
        width: rects.floating.width,
        height: rects.floating.height
      }
    };
    return data;
  }
  function useAnchorPositioning(params) {
    const {
      // Public parameters
      anchor,
      positionMethod = "absolute",
      side: sideParam = "bottom",
      sideOffset = 0,
      align = "center",
      alignOffset = 0,
      collisionBoundary,
      collisionPadding: collisionPaddingParam = 5,
      sticky = false,
      arrowPadding = 5,
      disableAnchorTracking = false,
      // Private parameters
      keepMounted = false,
      floatingRootContext,
      mounted,
      collisionAvoidance,
      shiftCrossAxis = false,
      nodeId,
      adaptiveOrigin,
      lazyFlip = false,
      externalTree
    } = params;
    const [mountSide, setMountSide] = React56.useState(null);
    if (!mounted && mountSide !== null) {
      setMountSide(null);
    }
    const collisionAvoidanceSide = collisionAvoidance.side || "flip";
    const collisionAvoidanceAlign = collisionAvoidance.align || "flip";
    const collisionAvoidanceFallbackAxisSide = collisionAvoidance.fallbackAxisSide || "end";
    const anchorFn = typeof anchor === "function" ? anchor : void 0;
    const anchorFnCallback = useStableCallback(anchorFn);
    const anchorDep = anchorFn ? anchorFnCallback : anchor;
    const anchorValueRef = useValueAsRef(anchor);
    const direction = useDirection();
    const isRtl = direction === "rtl";
    const side = mountSide || {
      top: "top",
      right: "right",
      bottom: "bottom",
      left: "left",
      "inline-end": isRtl ? "left" : "right",
      "inline-start": isRtl ? "right" : "left"
    }[sideParam];
    const placement = align === "center" ? side : `${side}-${align}`;
    let collisionPadding = collisionPaddingParam;
    const bias = 1;
    const biasTop = sideParam === "bottom" ? bias : 0;
    const biasBottom = sideParam === "top" ? bias : 0;
    const biasLeft = sideParam === "right" ? bias : 0;
    const biasRight = sideParam === "left" ? bias : 0;
    if (typeof collisionPadding === "number") {
      collisionPadding = {
        top: collisionPadding + biasTop,
        right: collisionPadding + biasRight,
        bottom: collisionPadding + biasBottom,
        left: collisionPadding + biasLeft
      };
    } else if (collisionPadding) {
      collisionPadding = {
        top: (collisionPadding.top || 0) + biasTop,
        right: (collisionPadding.right || 0) + biasRight,
        bottom: (collisionPadding.bottom || 0) + biasBottom,
        left: (collisionPadding.left || 0) + biasLeft
      };
    }
    const commonCollisionProps = {
      boundary: collisionBoundary === "clipping-ancestors" ? "clippingAncestors" : collisionBoundary,
      padding: collisionPadding
    };
    const arrowRef = React56.useRef(null);
    const sideOffsetRef = useValueAsRef(sideOffset);
    const alignOffsetRef = useValueAsRef(alignOffset);
    const sideOffsetDep = typeof sideOffset !== "function" ? sideOffset : 0;
    const alignOffsetDep = typeof alignOffset !== "function" ? alignOffset : 0;
    const middleware = [offset3((state) => {
      const data = getOffsetData(state, sideParam, isRtl);
      const sideAxis = typeof sideOffsetRef.current === "function" ? sideOffsetRef.current(data) : sideOffsetRef.current;
      const alignAxis = typeof alignOffsetRef.current === "function" ? alignOffsetRef.current(data) : alignOffsetRef.current;
      return {
        mainAxis: sideAxis,
        crossAxis: alignAxis,
        alignmentAxis: alignAxis
      };
    }, [sideOffsetDep, alignOffsetDep, isRtl, sideParam])];
    const shiftDisabled = collisionAvoidanceAlign === "none" && collisionAvoidanceSide !== "shift";
    const crossAxisShiftEnabled = !shiftDisabled && (sticky || shiftCrossAxis || collisionAvoidanceSide === "shift");
    const flipMiddleware = collisionAvoidanceSide === "none" ? null : flip3({
      ...commonCollisionProps,
      // Ensure the popup flips if it's been limited by its --available-height and it resizes.
      // Since the size() padding is smaller than the flip() padding, flip() will take precedence.
      padding: {
        top: collisionPadding.top + bias,
        right: collisionPadding.right + bias,
        bottom: collisionPadding.bottom + bias,
        left: collisionPadding.left + bias
      },
      mainAxis: !shiftCrossAxis && collisionAvoidanceSide === "flip",
      crossAxis: collisionAvoidanceAlign === "flip" ? "alignment" : false,
      fallbackAxisSideDirection: collisionAvoidanceFallbackAxisSide
    });
    const shiftMiddleware = shiftDisabled ? null : shift3((data) => {
      const html = ownerDocument(data.elements.floating).documentElement;
      return {
        ...commonCollisionProps,
        // Use the Layout Viewport to avoid shifting around when pinch-zooming
        // for context menus.
        rootBoundary: shiftCrossAxis ? {
          x: 0,
          y: 0,
          width: html.clientWidth,
          height: html.clientHeight
        } : void 0,
        mainAxis: collisionAvoidanceAlign !== "none",
        crossAxis: crossAxisShiftEnabled,
        limiter: sticky || shiftCrossAxis ? void 0 : limitShift3((limitData) => {
          if (!arrowRef.current) {
            return {};
          }
          const {
            width,
            height
          } = arrowRef.current.getBoundingClientRect();
          const sideAxis = getSideAxis(getSide(limitData.placement));
          const arrowSize = sideAxis === "y" ? width : height;
          const offsetAmount = sideAxis === "y" ? collisionPadding.left + collisionPadding.right : collisionPadding.top + collisionPadding.bottom;
          return {
            offset: arrowSize / 2 + offsetAmount / 2
          };
        })
      };
    }, [commonCollisionProps, sticky, shiftCrossAxis, collisionPadding, collisionAvoidanceAlign]);
    if (collisionAvoidanceSide === "shift" || collisionAvoidanceAlign === "shift" || align === "center") {
      middleware.push(shiftMiddleware, flipMiddleware);
    } else {
      middleware.push(flipMiddleware, shiftMiddleware);
    }
    middleware.push(size3({
      ...commonCollisionProps,
      apply({
        elements: {
          floating
        },
        rects: {
          reference
        },
        availableWidth,
        availableHeight
      }) {
        Object.entries({
          "--available-width": `${availableWidth}px`,
          "--available-height": `${availableHeight}px`,
          "--anchor-width": `${reference.width}px`,
          "--anchor-height": `${reference.height}px`
        }).forEach(([key, value]) => {
          floating.style.setProperty(key, value);
        });
      }
    }), arrow4(() => ({
      // `transform-origin` calculations rely on an element existing. If the arrow hasn't been set,
      // we'll create a fake element.
      element: arrowRef.current || document.createElement("div"),
      padding: arrowPadding,
      offsetParent: "floating"
    }), [arrowPadding]), {
      name: "transformOrigin",
      fn(state) {
        const {
          elements: elements2,
          middlewareData: middlewareData2,
          placement: renderedPlacement2,
          rects,
          y: y4
        } = state;
        const currentRenderedSide = getSide(renderedPlacement2);
        const currentRenderedAxis = getSideAxis(currentRenderedSide);
        const arrowEl = arrowRef.current;
        const arrowX = middlewareData2.arrow?.x || 0;
        const arrowY = middlewareData2.arrow?.y || 0;
        const arrowWidth = arrowEl?.clientWidth || 0;
        const arrowHeight = arrowEl?.clientHeight || 0;
        const transformX = arrowX + arrowWidth / 2;
        const transformY = arrowY + arrowHeight / 2;
        const shiftY = Math.abs(middlewareData2.shift?.y || 0);
        const halfAnchorHeight = rects.reference.height / 2;
        const sideOffsetValue = typeof sideOffset === "function" ? sideOffset(getOffsetData(state, sideParam, isRtl)) : sideOffset;
        const isOverlappingAnchor = shiftY > sideOffsetValue;
        const adjacentTransformOrigin = {
          top: `${transformX}px calc(100% + ${sideOffsetValue}px)`,
          bottom: `${transformX}px ${-sideOffsetValue}px`,
          left: `calc(100% + ${sideOffsetValue}px) ${transformY}px`,
          right: `${-sideOffsetValue}px ${transformY}px`
        }[currentRenderedSide];
        const overlapTransformOrigin = `${transformX}px ${rects.reference.y + halfAnchorHeight - y4}px`;
        elements2.floating.style.setProperty("--transform-origin", crossAxisShiftEnabled && currentRenderedAxis === "y" && isOverlappingAnchor ? overlapTransformOrigin : adjacentTransformOrigin);
        return {};
      }
    }, hide4, adaptiveOrigin);
    useIsoLayoutEffect(() => {
      if (!mounted && floatingRootContext) {
        floatingRootContext.update({
          referenceElement: null,
          floatingElement: null,
          domReferenceElement: null
        });
      }
    }, [mounted, floatingRootContext]);
    const autoUpdateOptions = React56.useMemo(() => ({
      elementResize: !disableAnchorTracking && typeof ResizeObserver !== "undefined",
      layoutShift: !disableAnchorTracking && typeof IntersectionObserver !== "undefined"
    }), [disableAnchorTracking]);
    const {
      refs,
      elements,
      x: x4,
      y: y3,
      middlewareData,
      update: update2,
      placement: renderedPlacement,
      context,
      isPositioned,
      floatingStyles: originalFloatingStyles
    } = useFloating2({
      rootContext: floatingRootContext,
      placement,
      middleware,
      strategy: positionMethod,
      whileElementsMounted: keepMounted ? void 0 : (...args) => autoUpdate(...args, autoUpdateOptions),
      nodeId,
      externalTree
    });
    const {
      sideX,
      sideY
    } = middlewareData.adaptiveOrigin || DEFAULT_SIDES;
    const resolvedPosition = isPositioned ? positionMethod : "fixed";
    const floatingStyles = React56.useMemo(() => adaptiveOrigin ? {
      position: resolvedPosition,
      [sideX]: x4,
      [sideY]: y3
    } : {
      position: resolvedPosition,
      ...originalFloatingStyles
    }, [adaptiveOrigin, resolvedPosition, sideX, x4, sideY, y3, originalFloatingStyles]);
    const registeredPositionReferenceRef = React56.useRef(null);
    useIsoLayoutEffect(() => {
      if (!mounted) {
        return;
      }
      const anchorValue = anchorValueRef.current;
      const resolvedAnchor = typeof anchorValue === "function" ? anchorValue() : anchorValue;
      const unwrappedElement = (isRef(resolvedAnchor) ? resolvedAnchor.current : resolvedAnchor) || null;
      const finalAnchor = unwrappedElement || null;
      if (finalAnchor !== registeredPositionReferenceRef.current) {
        refs.setPositionReference(finalAnchor);
        registeredPositionReferenceRef.current = finalAnchor;
      }
    }, [mounted, refs, anchorDep, anchorValueRef]);
    React56.useEffect(() => {
      if (!mounted) {
        return;
      }
      const anchorValue = anchorValueRef.current;
      if (typeof anchorValue === "function") {
        return;
      }
      if (isRef(anchorValue) && anchorValue.current !== registeredPositionReferenceRef.current) {
        refs.setPositionReference(anchorValue.current);
        registeredPositionReferenceRef.current = anchorValue.current;
      }
    }, [mounted, refs, anchorDep, anchorValueRef]);
    React56.useEffect(() => {
      if (keepMounted && mounted && elements.domReference && elements.floating) {
        return autoUpdate(elements.domReference, elements.floating, update2, autoUpdateOptions);
      }
      return void 0;
    }, [keepMounted, mounted, elements, update2, autoUpdateOptions]);
    const renderedSide = getSide(renderedPlacement);
    const logicalRenderedSide = getLogicalSide(sideParam, renderedSide, isRtl);
    const renderedAlign = getAlignment(renderedPlacement) || "center";
    const anchorHidden = Boolean(middlewareData.hide?.referenceHidden);
    useIsoLayoutEffect(() => {
      if (lazyFlip && mounted && isPositioned) {
        setMountSide(renderedSide);
      }
    }, [lazyFlip, mounted, isPositioned, renderedSide]);
    const arrowStyles = React56.useMemo(() => ({
      position: "absolute",
      top: middlewareData.arrow?.y,
      left: middlewareData.arrow?.x
    }), [middlewareData.arrow]);
    const arrowUncentered = middlewareData.arrow?.centerOffset !== 0;
    return React56.useMemo(() => ({
      positionerStyles: floatingStyles,
      arrowStyles,
      arrowRef,
      arrowUncentered,
      side: logicalRenderedSide,
      align: renderedAlign,
      physicalSide: renderedSide,
      anchorHidden,
      refs,
      context,
      isPositioned,
      update: update2
    }), [floatingStyles, arrowStyles, arrowRef, arrowUncentered, logicalRenderedSide, renderedAlign, renderedSide, anchorHidden, refs, context, isPositioned, update2]);
  }
  function isRef(param) {
    return param != null && "current" in param;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/composite/list/CompositeList.js
  var React57 = __toESM(require_compat(), 1);
  var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
  function CompositeList(props) {
    const {
      children,
      elementsRef,
      labelsRef,
      onMapChange: onMapChangeProp
    } = props;
    const onMapChange = useStableCallback(onMapChangeProp);
    const nextIndexRef = React57.useRef(0);
    const listeners = useRefWithInit(createListeners).current;
    const map = useRefWithInit(createMap).current;
    const [mapTick, setMapTick] = React57.useState(0);
    const lastTickRef = React57.useRef(mapTick);
    const register = useStableCallback((node, metadata) => {
      map.set(node, metadata ?? null);
      lastTickRef.current += 1;
      setMapTick(lastTickRef.current);
    });
    const unregister = useStableCallback((node) => {
      map.delete(node);
      lastTickRef.current += 1;
      setMapTick(lastTickRef.current);
    });
    const sortedMap = React57.useMemo(() => {
      disableEslintWarning(mapTick);
      const newMap = /* @__PURE__ */ new Map();
      const sortedNodes = Array.from(map.keys()).filter((node) => node.isConnected).sort(sortByDocumentPosition);
      sortedNodes.forEach((node, index2) => {
        const metadata = map.get(node) ?? {};
        newMap.set(node, {
          ...metadata,
          index: index2
        });
      });
      return newMap;
    }, [map, mapTick]);
    useIsoLayoutEffect(() => {
      if (typeof MutationObserver !== "function" || sortedMap.size === 0) {
        return void 0;
      }
      const mutationObserver = new MutationObserver((entries) => {
        const diff = /* @__PURE__ */ new Set();
        const updateDiff = (node) => diff.has(node) ? diff.delete(node) : diff.add(node);
        entries.forEach((entry) => {
          entry.removedNodes.forEach(updateDiff);
          entry.addedNodes.forEach(updateDiff);
        });
        if (diff.size === 0) {
          lastTickRef.current += 1;
          setMapTick(lastTickRef.current);
        }
      });
      sortedMap.forEach((_3, node) => {
        if (node.parentElement) {
          mutationObserver.observe(node.parentElement, {
            childList: true
          });
        }
      });
      return () => {
        mutationObserver.disconnect();
      };
    }, [sortedMap]);
    useIsoLayoutEffect(() => {
      const shouldUpdateLengths = lastTickRef.current === mapTick;
      if (shouldUpdateLengths) {
        if (elementsRef.current.length !== sortedMap.size) {
          elementsRef.current.length = sortedMap.size;
        }
        if (labelsRef && labelsRef.current.length !== sortedMap.size) {
          labelsRef.current.length = sortedMap.size;
        }
        nextIndexRef.current = sortedMap.size;
      }
      onMapChange(sortedMap);
    }, [onMapChange, sortedMap, elementsRef, labelsRef, mapTick]);
    useIsoLayoutEffect(() => {
      return () => {
        elementsRef.current = [];
      };
    }, [elementsRef]);
    useIsoLayoutEffect(() => {
      return () => {
        if (labelsRef) {
          labelsRef.current = [];
        }
      };
    }, [labelsRef]);
    const subscribeMapChange = useStableCallback((fn2) => {
      listeners.add(fn2);
      return () => {
        listeners.delete(fn2);
      };
    });
    useIsoLayoutEffect(() => {
      listeners.forEach((l4) => l4(sortedMap));
    }, [listeners, sortedMap]);
    const contextValue = React57.useMemo(() => ({
      register,
      unregister,
      subscribeMapChange,
      elementsRef,
      labelsRef,
      nextIndexRef
    }), [register, unregister, subscribeMapChange, elementsRef, labelsRef, nextIndexRef]);
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CompositeListContext.Provider, {
      value: contextValue,
      children
    });
  }
  function createMap() {
    return /* @__PURE__ */ new Map();
  }
  function createListeners() {
    return /* @__PURE__ */ new Set();
  }
  function sortByDocumentPosition(a4, b3) {
    const position = a4.compareDocumentPosition(b3);
    if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      return -1;
    }
    if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
      return 1;
    }
    return 0;
  }
  function disableEslintWarning(_3) {
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/InternalBackdrop.js
  var React58 = __toESM(require_compat(), 1);
  var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
  var InternalBackdrop = /* @__PURE__ */ React58.forwardRef(function InternalBackdrop2(props, ref) {
    const {
      cutout,
      ...otherProps
    } = props;
    let clipPath;
    if (cutout) {
      const rect = cutout?.getBoundingClientRect();
      clipPath = `polygon(
      0% 0%,
      100% 0%,
      100% 100%,
      0% 100%,
      0% 0%,
      ${rect.left}px ${rect.top}px,
      ${rect.left}px ${rect.bottom}px,
      ${rect.right}px ${rect.bottom}px,
      ${rect.right}px ${rect.top}px,
      ${rect.left}px ${rect.top}px
    )`;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", {
      ref,
      role: "presentation",
      "data-base-ui-inert": "",
      ...otherProps,
      style: {
        position: "fixed",
        inset: 0,
        userSelect: "none",
        WebkitUserSelect: "none",
        clipPath
      }
    });
  });
  if (false) InternalBackdrop.displayName = "InternalBackdrop";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/positioner/MenuPositioner.js
  var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
  var MenuPositioner = /* @__PURE__ */ React59.forwardRef(function MenuPositioner2(componentProps, forwardedRef) {
    const {
      anchor: anchorProp,
      positionMethod: positionMethodProp = "absolute",
      className,
      render,
      side,
      align: alignProp,
      sideOffset: sideOffsetProp = 0,
      alignOffset: alignOffsetProp = 0,
      collisionBoundary = "clipping-ancestors",
      collisionPadding = 5,
      arrowPadding = 5,
      sticky = false,
      disableAnchorTracking = false,
      collisionAvoidance = DROPDOWN_COLLISION_AVOIDANCE,
      ...elementProps
    } = componentProps;
    const {
      store
    } = useMenuRootContext();
    const keepMounted = useMenuPortalContext();
    const contextMenuContext = useContextMenuRootContext(true);
    const parent = store.useState("parent");
    const floatingRootContext = store.useState("floatingRootContext");
    const floatingTreeRoot = store.useState("floatingTreeRoot");
    const mounted = store.useState("mounted");
    const open = store.useState("open");
    const modal = store.useState("modal");
    const triggerElement = store.useState("activeTriggerElement");
    const lastOpenChangeReason = store.useState("lastOpenChangeReason");
    const floatingNodeId = store.useState("floatingNodeId");
    const floatingParentNodeId = store.useState("floatingParentNodeId");
    let anchor = anchorProp;
    let sideOffset = sideOffsetProp;
    let alignOffset = alignOffsetProp;
    let align = alignProp;
    if (parent.type === "context-menu") {
      anchor = anchorProp ?? parent.context?.anchor;
      align = align ?? "start";
      if (!side && align !== "center") {
        alignOffset = componentProps.alignOffset ?? 2;
        sideOffset = componentProps.sideOffset ?? -5;
      }
    }
    let computedSide = side;
    let computedAlign = align;
    if (parent.type === "menu") {
      computedSide = computedSide ?? "inline-end";
      computedAlign = computedAlign ?? "start";
    } else if (parent.type === "menubar") {
      computedSide = computedSide ?? "bottom";
      computedAlign = computedAlign ?? "start";
    }
    const contextMenu = parent.type === "context-menu";
    const positioner = useAnchorPositioning({
      anchor,
      floatingRootContext,
      positionMethod: contextMenuContext ? "fixed" : positionMethodProp,
      mounted,
      side: computedSide,
      sideOffset,
      align: computedAlign,
      alignOffset,
      arrowPadding: contextMenu ? 0 : arrowPadding,
      collisionBoundary,
      collisionPadding,
      sticky,
      nodeId: floatingNodeId,
      keepMounted,
      disableAnchorTracking,
      collisionAvoidance,
      shiftCrossAxis: contextMenu,
      externalTree: floatingTreeRoot
    });
    const positionerProps = React59.useMemo(() => {
      const hiddenStyles = {};
      if (!open) {
        hiddenStyles.pointerEvents = "none";
      }
      return {
        role: "presentation",
        hidden: !mounted,
        style: {
          ...positioner.positionerStyles,
          ...hiddenStyles
        }
      };
    }, [open, mounted, positioner.positionerStyles]);
    React59.useEffect(() => {
      function onMenuOpenChange(details) {
        if (details.open) {
          if (details.parentNodeId === floatingNodeId) {
            store.set("hoverEnabled", false);
          }
          if (details.nodeId !== floatingNodeId && details.parentNodeId === store.select("floatingParentNodeId")) {
            store.setOpen(false, createChangeEventDetails(reason_parts_exports.siblingOpen));
          }
        } else if (details.parentNodeId === floatingNodeId) {
          if (details.reason !== reason_parts_exports.siblingOpen) {
            store.set("hoverEnabled", true);
          }
        }
      }
      floatingTreeRoot.events.on("menuopenchange", onMenuOpenChange);
      return () => {
        floatingTreeRoot.events.off("menuopenchange", onMenuOpenChange);
      };
    }, [store, floatingTreeRoot.events, floatingNodeId]);
    React59.useEffect(() => {
      if (store.select("floatingParentNodeId") == null) {
        return void 0;
      }
      function onParentClose(details) {
        if (details.open || details.nodeId !== store.select("floatingParentNodeId")) {
          return;
        }
        const reason = details.reason ?? reason_parts_exports.siblingOpen;
        store.setOpen(false, createChangeEventDetails(reason));
      }
      floatingTreeRoot.events.on("menuopenchange", onParentClose);
      return () => {
        floatingTreeRoot.events.off("menuopenchange", onParentClose);
      };
    }, [floatingTreeRoot.events, store]);
    React59.useEffect(() => {
      function onItemHover(event) {
        if (!open || event.nodeId !== store.select("floatingParentNodeId")) {
          return;
        }
        if (event.target && triggerElement && triggerElement !== event.target) {
          store.setOpen(false, createChangeEventDetails(reason_parts_exports.siblingOpen));
        }
      }
      floatingTreeRoot.events.on("itemhover", onItemHover);
      return () => {
        floatingTreeRoot.events.off("itemhover", onItemHover);
      };
    }, [floatingTreeRoot.events, open, triggerElement, store]);
    React59.useEffect(() => {
      const eventDetails = {
        open,
        nodeId: floatingNodeId,
        parentNodeId: floatingParentNodeId,
        reason: store.select("lastOpenChangeReason")
      };
      floatingTreeRoot.events.emit("menuopenchange", eventDetails);
    }, [floatingTreeRoot.events, open, store, floatingNodeId, floatingParentNodeId]);
    const state = React59.useMemo(() => ({
      open,
      side: positioner.side,
      align: positioner.align,
      anchorHidden: positioner.anchorHidden,
      nested: parent.type === "menu"
    }), [open, positioner.side, positioner.align, positioner.anchorHidden, parent.type]);
    const contextValue = React59.useMemo(() => ({
      side: positioner.side,
      align: positioner.align,
      arrowRef: positioner.arrowRef,
      arrowUncentered: positioner.arrowUncentered,
      arrowStyles: positioner.arrowStyles,
      nodeId: positioner.context.nodeId
    }), [positioner.side, positioner.align, positioner.arrowRef, positioner.arrowUncentered, positioner.arrowStyles, positioner.context.nodeId]);
    const element = useRenderElement("div", componentProps, {
      state,
      stateAttributesMapping: popupStateMapping,
      ref: [forwardedRef, store.useStateSetter("positionerElement")],
      props: [positionerProps, elementProps]
    });
    const shouldRenderBackdrop = mounted && parent.type !== "menu" && (parent.type !== "menubar" && modal && lastOpenChangeReason !== reason_parts_exports.triggerHover || parent.type === "menubar" && parent.context.modal);
    let backdropCutout = null;
    if (parent.type === "menubar") {
      backdropCutout = parent.context.contentElement;
    } else if (parent.type === void 0) {
      backdropCutout = triggerElement;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(MenuPositionerContext.Provider, {
      value: contextValue,
      children: [shouldRenderBackdrop && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(InternalBackdrop, {
        ref: parent.type === "context-menu" || parent.type === "nested-context-menu" ? parent.context.internalBackdropRef : null,
        inert: inertValue(!open),
        cutout: backdropCutout
      }), /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(FloatingNode, {
        id: floatingNodeId,
        children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(CompositeList, {
          elementsRef: store.context.itemDomElements,
          labelsRef: store.context.itemLabels,
          children: element
        })
      })]
    });
  });
  if (false) MenuPositioner.displayName = "MenuPositioner";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/radio-group/MenuRadioGroup.js
  var React61 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/radio-group/MenuRadioGroupContext.js
  var React60 = __toESM(require_compat(), 1);
  var MenuRadioGroupContext = /* @__PURE__ */ React60.createContext(void 0);
  if (false) MenuRadioGroupContext.displayName = "MenuRadioGroupContext";
  function useMenuRadioGroupContext() {
    const context = React60.useContext(MenuRadioGroupContext);
    if (context === void 0) {
      throw new Error(false ? "Base UI: MenuRadioGroupContext is missing. MenuRadioGroup parts must be placed within <Menu.RadioGroup>." : formatErrorMessage(34));
    }
    return context;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/radio-group/MenuRadioGroup.js
  var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
  var MenuRadioGroup = /* @__PURE__ */ React61.memo(/* @__PURE__ */ React61.forwardRef(function MenuRadioGroup2(componentProps, forwardedRef) {
    const {
      render,
      className,
      value: valueProp,
      defaultValue,
      onValueChange: onValueChangeProp,
      disabled: disabled2 = false,
      ...elementProps
    } = componentProps;
    const [value, setValueUnwrapped] = useControlled({
      controlled: valueProp,
      default: defaultValue,
      name: "MenuRadioGroup"
    });
    const onValueChange = useStableCallback(onValueChangeProp);
    const setValue = useStableCallback((newValue, eventDetails) => {
      onValueChange?.(newValue, eventDetails);
      if (eventDetails.isCanceled) {
        return;
      }
      setValueUnwrapped(newValue);
    });
    const state = React61.useMemo(() => ({
      disabled: disabled2
    }), [disabled2]);
    const element = useRenderElement("div", componentProps, {
      state,
      ref: forwardedRef,
      props: {
        role: "group",
        "aria-disabled": disabled2 || void 0,
        ...elementProps
      }
    });
    const context = React61.useMemo(() => ({
      value,
      setValue,
      disabled: disabled2
    }), [value, setValue, disabled2]);
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(MenuRadioGroupContext.Provider, {
      value: context,
      children: element
    });
  }));
  if (false) MenuRadioGroup.displayName = "MenuRadioGroup";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/radio-item/MenuRadioItem.js
  var React63 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/radio-item/MenuRadioItemContext.js
  var React62 = __toESM(require_compat(), 1);
  var MenuRadioItemContext = /* @__PURE__ */ React62.createContext(void 0);
  if (false) MenuRadioItemContext.displayName = "MenuRadioItemContext";
  function useMenuRadioItemContext() {
    const context = React62.useContext(MenuRadioItemContext);
    if (context === void 0) {
      throw new Error(false ? "Base UI: MenuRadioItemContext is missing. MenuRadioItem parts must be placed within <Menu.RadioItem>." : formatErrorMessage(35));
    }
    return context;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/radio-item/MenuRadioItem.js
  var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
  var MenuRadioItem = /* @__PURE__ */ React63.forwardRef(function MenuRadioItem2(componentProps, forwardedRef) {
    const {
      render,
      className,
      id: idProp,
      label,
      nativeButton = false,
      disabled: disabledProp = false,
      closeOnClick = false,
      value,
      ...elementProps
    } = componentProps;
    const listItem = useCompositeListItem({
      label
    });
    const menuPositionerContext = useMenuPositionerContext(true);
    const id = useBaseUiId(idProp);
    const {
      store
    } = useMenuRootContext();
    const highlighted = store.useState("isActive", listItem.index);
    const itemProps = store.useState("itemProps");
    const {
      value: selectedValue,
      setValue: setSelectedValue,
      disabled: groupDisabled
    } = useMenuRadioGroupContext();
    const disabled2 = groupDisabled || disabledProp;
    const checked = selectedValue === value;
    const {
      getItemProps,
      itemRef
    } = useMenuItem({
      closeOnClick,
      disabled: disabled2,
      highlighted,
      id,
      store,
      nativeButton,
      nodeId: menuPositionerContext?.nodeId,
      itemMetadata: REGULAR_ITEM
    });
    const state = React63.useMemo(() => ({
      disabled: disabled2,
      highlighted,
      checked
    }), [disabled2, highlighted, checked]);
    const handleClick = useStableCallback((event) => {
      const details = {
        ...createChangeEventDetails(reason_parts_exports.itemPress, event.nativeEvent),
        preventUnmountOnClose: () => {
        }
      };
      setSelectedValue(value, details);
    });
    const element = useRenderElement("div", componentProps, {
      state,
      stateAttributesMapping: itemMapping,
      props: [itemProps, {
        role: "menuitemradio",
        "aria-checked": checked,
        onClick: handleClick
      }, elementProps, getItemProps],
      ref: [itemRef, forwardedRef, listItem.ref]
    });
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(MenuRadioItemContext.Provider, {
      value: state,
      children: element
    });
  });
  if (false) MenuRadioItem.displayName = "MenuRadioItem";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/radio-item-indicator/MenuRadioItemIndicator.js
  var React64 = __toESM(require_compat(), 1);
  var MenuRadioItemIndicator = /* @__PURE__ */ React64.forwardRef(function MenuRadioItemIndicator2(componentProps, forwardedRef) {
    const {
      render,
      className,
      keepMounted = false,
      ...elementProps
    } = componentProps;
    const item = useMenuRadioItemContext();
    const indicatorRef = React64.useRef(null);
    const {
      transitionStatus,
      setMounted
    } = useTransitionStatus(item.checked);
    useOpenChangeComplete({
      open: item.checked,
      ref: indicatorRef,
      onComplete() {
        if (!item.checked) {
          setMounted(false);
        }
      }
    });
    const state = React64.useMemo(() => ({
      checked: item.checked,
      disabled: item.disabled,
      highlighted: item.highlighted,
      transitionStatus
    }), [item.checked, item.disabled, item.highlighted, transitionStatus]);
    const element = useRenderElement("span", componentProps, {
      state,
      stateAttributesMapping: itemMapping,
      ref: [forwardedRef, indicatorRef],
      props: {
        "aria-hidden": true,
        ...elementProps
      },
      enabled: keepMounted || item.checked
    });
    return element;
  });
  if (false) MenuRadioItemIndicator.displayName = "MenuRadioItemIndicator";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/root/MenuRoot.js
  var React70 = __toESM(require_compat(), 1);
  var ReactDOM6 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/useScrollLock.js
  var originalHtmlStyles = {};
  var originalBodyStyles = {};
  var originalHtmlScrollBehavior = "";
  function hasInsetScrollbars(referenceElement) {
    if (typeof document === "undefined") {
      return false;
    }
    const doc = ownerDocument(referenceElement);
    const win = getWindow(doc);
    return win.innerWidth - doc.documentElement.clientWidth > 0;
  }
  function preventScrollOverlayScrollbars(referenceElement) {
    const doc = ownerDocument(referenceElement);
    const html = doc.documentElement;
    const body = doc.body;
    const elementToLock = isOverflowElement(html) ? html : body;
    const originalOverflow = elementToLock.style.overflow;
    elementToLock.style.overflow = "hidden";
    return () => {
      elementToLock.style.overflow = originalOverflow;
    };
  }
  function preventScrollInsetScrollbars(referenceElement) {
    const doc = ownerDocument(referenceElement);
    const html = doc.documentElement;
    const body = doc.body;
    const win = getWindow(html);
    let scrollTop = 0;
    let scrollLeft = 0;
    const resizeFrame = AnimationFrame.create();
    const supportsStableScrollbarGutter = typeof CSS !== "undefined" && CSS.supports?.("scrollbar-gutter", "stable");
    if (isWebKit2 && (win.visualViewport?.scale ?? 1) !== 1) {
      return () => {
      };
    }
    function lockScroll() {
      const htmlStyles = win.getComputedStyle(html);
      const bodyStyles = win.getComputedStyle(body);
      const htmlScrollbarGutterValue = htmlStyles.scrollbarGutter || "";
      const hasBothEdges = htmlScrollbarGutterValue.includes("both-edges");
      const scrollbarGutterValue = hasBothEdges ? "stable both-edges" : "stable";
      scrollTop = html.scrollTop;
      scrollLeft = html.scrollLeft;
      originalHtmlStyles = {
        scrollbarGutter: html.style.scrollbarGutter,
        overflowY: html.style.overflowY,
        overflowX: html.style.overflowX
      };
      originalHtmlScrollBehavior = html.style.scrollBehavior;
      originalBodyStyles = {
        position: body.style.position,
        height: body.style.height,
        width: body.style.width,
        boxSizing: body.style.boxSizing,
        overflowY: body.style.overflowY,
        overflowX: body.style.overflowX,
        scrollBehavior: body.style.scrollBehavior
      };
      const isScrollableY = html.scrollHeight > html.clientHeight;
      const isScrollableX = html.scrollWidth > html.clientWidth;
      const hasConstantOverflowY = htmlStyles.overflowY === "scroll" || bodyStyles.overflowY === "scroll";
      const hasConstantOverflowX = htmlStyles.overflowX === "scroll" || bodyStyles.overflowX === "scroll";
      const scrollbarWidth = Math.max(0, win.innerWidth - html.clientWidth);
      const scrollbarHeight = Math.max(0, win.innerHeight - html.clientHeight);
      const marginY = parseFloat(bodyStyles.marginTop) + parseFloat(bodyStyles.marginBottom);
      const marginX = parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight);
      const elementToLock = isOverflowElement(html) ? html : body;
      if (supportsStableScrollbarGutter) {
        html.style.scrollbarGutter = scrollbarGutterValue;
        elementToLock.style.overflowY = "hidden";
        elementToLock.style.overflowX = "hidden";
        return;
      }
      Object.assign(html.style, {
        scrollbarGutter: scrollbarGutterValue,
        overflowY: "hidden",
        overflowX: "hidden"
      });
      if (isScrollableY || hasConstantOverflowY) {
        html.style.overflowY = "scroll";
      }
      if (isScrollableX || hasConstantOverflowX) {
        html.style.overflowX = "scroll";
      }
      Object.assign(body.style, {
        position: "relative",
        height: marginY || scrollbarHeight ? `calc(100dvh - ${marginY + scrollbarHeight}px)` : "100dvh",
        width: marginX || scrollbarWidth ? `calc(100vw - ${marginX + scrollbarWidth}px)` : "100vw",
        boxSizing: "border-box",
        overflow: "hidden",
        scrollBehavior: "unset"
      });
      body.scrollTop = scrollTop;
      body.scrollLeft = scrollLeft;
      html.setAttribute("data-base-ui-scroll-locked", "");
      html.style.scrollBehavior = "unset";
    }
    function cleanup() {
      Object.assign(html.style, originalHtmlStyles);
      Object.assign(body.style, originalBodyStyles);
      if (!supportsStableScrollbarGutter) {
        html.scrollTop = scrollTop;
        html.scrollLeft = scrollLeft;
        html.removeAttribute("data-base-ui-scroll-locked");
        html.style.scrollBehavior = originalHtmlScrollBehavior;
      }
    }
    function handleResize() {
      cleanup();
      resizeFrame.request(lockScroll);
    }
    lockScroll();
    win.addEventListener("resize", handleResize);
    return () => {
      resizeFrame.cancel();
      cleanup();
      if (typeof win.removeEventListener === "function") {
        win.removeEventListener("resize", handleResize);
      }
    };
  }
  var ScrollLocker = class {
    lockCount = 0;
    restore = null;
    timeoutLock = Timeout.create();
    timeoutUnlock = Timeout.create();
    acquire(referenceElement) {
      this.lockCount += 1;
      if (this.lockCount === 1 && this.restore === null) {
        this.timeoutLock.start(0, () => this.lock(referenceElement));
      }
      return this.release;
    }
    release = () => {
      this.lockCount -= 1;
      if (this.lockCount === 0 && this.restore) {
        this.timeoutUnlock.start(0, this.unlock);
      }
    };
    unlock = () => {
      if (this.lockCount === 0 && this.restore) {
        this.restore?.();
        this.restore = null;
      }
    };
    lock(referenceElement) {
      if (this.lockCount === 0 || this.restore !== null) {
        return;
      }
      const doc = ownerDocument(referenceElement);
      const html = doc.documentElement;
      const htmlOverflowY = getWindow(html).getComputedStyle(html).overflowY;
      if (htmlOverflowY === "hidden" || htmlOverflowY === "clip") {
        this.restore = NOOP;
        return;
      }
      const hasOverlayScrollbars = isIOS || !hasInsetScrollbars(referenceElement);
      this.restore = hasOverlayScrollbars ? preventScrollOverlayScrollbars(referenceElement) : preventScrollInsetScrollbars(referenceElement);
    }
  };
  var SCROLL_LOCKER = new ScrollLocker();
  function useScrollLock(enabled = true, referenceElement = null) {
    useIsoLayoutEffect(() => {
      if (!enabled) {
        return void 0;
      }
      return SCROLL_LOCKER.acquire(referenceElement);
    }, [enabled, referenceElement]);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menubar/MenubarContext.js
  var React65 = __toESM(require_compat(), 1);
  var MenubarContext = /* @__PURE__ */ React65.createContext(null);
  if (false) MenubarContext.displayName = "MenubarContext";
  function useMenubarContext(optional) {
    const context = React65.useContext(MenubarContext);
    if (context === null && !optional) {
      throw new Error(false ? "Base UI: MenubarContext is missing. Menubar parts must be placed within <Menubar>." : formatErrorMessage(5));
    }
    return context;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/useOpenInteractionType.js
  var React67 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/utils/esm/useEnhancedClickHandler.js
  var React66 = __toESM(require_compat(), 1);
  function useEnhancedClickHandler(handler) {
    const lastClickInteractionTypeRef = React66.useRef("");
    const handlePointerDown = React66.useCallback((event) => {
      if (event.defaultPrevented) {
        return;
      }
      lastClickInteractionTypeRef.current = event.pointerType;
      handler(event, event.pointerType);
    }, [handler]);
    const handleClick = React66.useCallback((event) => {
      if (event.detail === 0) {
        handler(event, "keyboard");
        return;
      }
      if ("pointerType" in event) {
        handler(event, event.pointerType);
      }
      handler(event, lastClickInteractionTypeRef.current);
      lastClickInteractionTypeRef.current = "";
    }, [handler]);
    return {
      onClick: handleClick,
      onPointerDown: handlePointerDown
    };
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/useOpenInteractionType.js
  function useOpenInteractionType(open) {
    const [openMethod, setOpenMethod] = React67.useState(null);
    const handleTriggerClick = useStableCallback((_3, interactionType) => {
      if (!open) {
        setOpenMethod(interactionType);
      }
    });
    const reset = React67.useCallback(() => {
      setOpenMethod(null);
    }, []);
    const {
      onClick,
      onPointerDown
    } = useEnhancedClickHandler(handleTriggerClick);
    return React67.useMemo(() => ({
      openMethod,
      reset,
      triggerProps: {
        onClick,
        onPointerDown
      }
    }), [openMethod, reset, onClick, onPointerDown]);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/store/MenuStore.js
  var React68 = __toESM(require_compat(), 1);
  var selectors2 = {
    ...popupStoreSelectors,
    disabled: createSelector((state) => state.parent.type === "menubar" ? state.parent.context.disabled || state.disabled : state.disabled),
    modal: createSelector((state) => (state.parent.type === void 0 || state.parent.type === "context-menu") && (state.modal ?? true)),
    allowMouseEnter: createSelector((state) => state.parent.type === "menu" ? state.parent.store.select("allowMouseEnter") : state.allowMouseEnter),
    stickIfOpen: createSelector((state) => state.stickIfOpen),
    parent: createSelector((state) => state.parent),
    rootId: createSelector((state) => {
      if (state.parent.type === "menu") {
        return state.parent.store.select("rootId");
      }
      return state.parent.type !== void 0 ? state.parent.context.rootId : state.rootId;
    }),
    activeIndex: createSelector((state) => state.activeIndex),
    isActive: createSelector((state, itemIndex) => state.activeIndex === itemIndex),
    hoverEnabled: createSelector((state) => state.hoverEnabled),
    instantType: createSelector((state) => state.instantType),
    lastOpenChangeReason: createSelector((state) => state.openChangeReason),
    floatingTreeRoot: createSelector((state) => {
      if (state.parent.type === "menu") {
        return state.parent.store.select("floatingTreeRoot");
      }
      return state.floatingTreeRoot;
    }),
    floatingNodeId: createSelector((state) => state.floatingNodeId),
    floatingParentNodeId: createSelector((state) => state.floatingParentNodeId),
    itemProps: createSelector((state) => state.itemProps),
    closeDelay: createSelector((state) => state.closeDelay),
    keyboardEventRelay: createSelector((state) => {
      if (state.keyboardEventRelay) {
        return state.keyboardEventRelay;
      }
      if (state.parent.type === "menu") {
        return state.parent.store.select("keyboardEventRelay");
      }
      return void 0;
    })
  };
  var MenuStore = class _MenuStore extends ReactStore {
    constructor(initialState) {
      super({
        ...createInitialState(),
        ...initialState
      }, {
        positionerRef: /* @__PURE__ */ React68.createRef(),
        popupRef: /* @__PURE__ */ React68.createRef(),
        typingRef: {
          current: false
        },
        itemDomElements: {
          current: []
        },
        itemLabels: {
          current: []
        },
        allowMouseUpTriggerRef: {
          current: false
        },
        triggerFocusTargetRef: /* @__PURE__ */ React68.createRef(),
        beforeContentFocusGuardRef: /* @__PURE__ */ React68.createRef(),
        onOpenChangeComplete: void 0,
        triggerElements: new PopupTriggerMap()
      }, selectors2);
      this.observe(createSelector((state) => state.allowMouseEnter), (allowMouseEnter, oldValue) => {
        if (this.state.parent.type === "menu" && allowMouseEnter !== oldValue) {
          this.state.parent.store.set("allowMouseEnter", allowMouseEnter);
        }
      });
      this.unsubscribeParentListener = this.observe("parent", (parent) => {
        this.unsubscribeParentListener?.();
        if (parent.type === "menu") {
          this.unsubscribeParentListener = parent.store.subscribe(() => {
            this.notifyAll();
          });
          this.context.allowMouseUpTriggerRef = parent.store.context.allowMouseUpTriggerRef;
          return;
        }
        if (parent.type !== void 0) {
          this.context.allowMouseUpTriggerRef = parent.context.allowMouseUpTriggerRef;
        }
        this.unsubscribeParentListener = null;
      });
    }
    setOpen(open, eventDetails) {
      this.state.floatingRootContext.context.events.emit("setOpen", {
        open,
        eventDetails
      });
    }
    static useStore(externalStore, initialState) {
      const store = useRefWithInit(() => {
        return externalStore ?? new _MenuStore(initialState);
      }).current;
      return store;
    }
    unsubscribeParentListener = null;
  };
  function createInitialState() {
    return {
      ...createInitialPopupStoreState(),
      disabled: false,
      modal: true,
      allowMouseEnter: true,
      stickIfOpen: true,
      parent: {
        type: void 0
      },
      rootId: void 0,
      activeIndex: null,
      hoverEnabled: true,
      instantType: void 0,
      openChangeReason: null,
      floatingTreeRoot: new FloatingTreeStore(),
      floatingNodeId: void 0,
      floatingParentNodeId: null,
      itemProps: EMPTY_OBJECT,
      keyboardEventRelay: void 0,
      closeDelay: 0
    };
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/submenu-root/MenuSubmenuRootContext.js
  var React69 = __toESM(require_compat(), 1);
  var MenuSubmenuRootContext = /* @__PURE__ */ React69.createContext(void 0);
  if (false) MenuSubmenuRootContext.displayName = "MenuSubmenuRootContext";
  function useMenuSubmenuRootContext() {
    return React69.useContext(MenuSubmenuRootContext);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/root/MenuRoot.js
  var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
  function MenuRoot(props) {
    const {
      children,
      open: openProp,
      onOpenChange,
      onOpenChangeComplete,
      defaultOpen = false,
      disabled: disabledProp = false,
      modal: modalProp,
      loopFocus = true,
      orientation = "vertical",
      actionsRef,
      closeParentOnEsc = true,
      handle,
      triggerId: triggerIdProp,
      defaultTriggerId: defaultTriggerIdProp = null,
      highlightItemOnHover = true
    } = props;
    const contextMenuContext = useContextMenuRootContext(true);
    const parentMenuRootContext = useMenuRootContext(true);
    const menubarContext = useMenubarContext(true);
    const isSubmenu = useMenuSubmenuRootContext();
    const parentFromContext = React70.useMemo(() => {
      if (isSubmenu && parentMenuRootContext) {
        return {
          type: "menu",
          store: parentMenuRootContext.store
        };
      }
      if (menubarContext) {
        return {
          type: "menubar",
          context: menubarContext
        };
      }
      if (contextMenuContext && !parentMenuRootContext) {
        return {
          type: "context-menu",
          context: contextMenuContext
        };
      }
      return {
        type: void 0
      };
    }, [contextMenuContext, parentMenuRootContext, menubarContext, isSubmenu]);
    const store = MenuStore.useStore(handle?.store, {
      parent: parentFromContext
    });
    const floatingTreeRoot = store.useState("floatingTreeRoot");
    const floatingNodeIdFromContext = useFloatingNodeId(floatingTreeRoot);
    const floatingParentNodeIdFromContext = useFloatingParentNodeId();
    useIsoLayoutEffect(() => {
      if (contextMenuContext && !parentMenuRootContext) {
        store.update({
          parent: {
            type: "context-menu",
            context: contextMenuContext
          },
          floatingNodeId: floatingNodeIdFromContext,
          floatingParentNodeId: floatingParentNodeIdFromContext
        });
      } else if (parentMenuRootContext) {
        store.update({
          floatingNodeId: floatingNodeIdFromContext,
          floatingParentNodeId: floatingParentNodeIdFromContext
        });
      }
    }, [contextMenuContext, parentMenuRootContext, floatingNodeIdFromContext, floatingParentNodeIdFromContext, store]);
    store.useControlledProp("open", openProp, defaultOpen);
    store.useControlledProp("activeTriggerId", triggerIdProp, defaultTriggerIdProp);
    store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
    const open = store.useState("open");
    const activeTriggerElement = store.useState("activeTriggerElement");
    const positionerElement = store.useState("positionerElement");
    const hoverEnabled = store.useState("hoverEnabled");
    const modal = store.useState("modal");
    const disabled2 = store.useState("disabled");
    const lastOpenChangeReason = store.useState("lastOpenChangeReason");
    const parent = store.useState("parent");
    const activeIndex = store.useState("activeIndex");
    const payload = store.useState("payload");
    const floatingParentNodeId = store.useState("floatingParentNodeId");
    const openEventRef = React70.useRef(null);
    const nested = floatingParentNodeId != null;
    let floatingEvents;
    if (false) {
      if (parent.type !== void 0 && modalProp !== void 0) {
        console.warn("Base UI: The `modal` prop is not supported on nested menus. It will be ignored.");
      }
    }
    store.useSyncedValues({
      disabled: disabledProp,
      modal: parent.type === void 0 ? modalProp : void 0,
      rootId: useId()
    });
    const {
      openMethod,
      triggerProps: interactionTypeProps,
      reset: resetOpenInteractionType
    } = useOpenInteractionType(open);
    useImplicitActiveTrigger(store);
    const {
      forceUnmount
    } = useOpenStateTransitions(open, store, () => {
      store.update({
        allowMouseEnter: false,
        stickIfOpen: true
      });
      resetOpenInteractionType();
    });
    const allowOutsidePressDismissalRef = React70.useRef(parent.type !== "context-menu");
    const allowOutsidePressDismissalTimeout = useTimeout();
    React70.useEffect(() => {
      if (!open) {
        openEventRef.current = null;
      }
      if (parent.type !== "context-menu") {
        return;
      }
      if (!open) {
        allowOutsidePressDismissalTimeout.clear();
        allowOutsidePressDismissalRef.current = false;
        return;
      }
      allowOutsidePressDismissalTimeout.start(500, () => {
        allowOutsidePressDismissalRef.current = true;
      });
    }, [allowOutsidePressDismissalTimeout, open, parent.type]);
    useScrollLock(open && modal && lastOpenChangeReason !== reason_parts_exports.triggerHover && openMethod !== "touch", positionerElement);
    useIsoLayoutEffect(() => {
      if (!open && !hoverEnabled) {
        store.set("hoverEnabled", true);
      }
    }, [open, hoverEnabled, store]);
    const allowTouchToCloseRef = React70.useRef(true);
    const allowTouchToCloseTimeout = useTimeout();
    const setOpen = useStableCallback((nextOpen, eventDetails) => {
      const reason = eventDetails.reason;
      if (open === nextOpen && eventDetails.trigger === activeTriggerElement) {
        return;
      }
      eventDetails.preventUnmountOnClose = () => {
        store.set("preventUnmountingOnClose", true);
      };
      if (!nextOpen && eventDetails.trigger == null) {
        eventDetails.trigger = activeTriggerElement ?? void 0;
      }
      onOpenChange?.(nextOpen, eventDetails);
      if (eventDetails.isCanceled) {
        return;
      }
      const details = {
        open: nextOpen,
        nativeEvent: eventDetails.event,
        reason: eventDetails.reason,
        nested
      };
      floatingEvents?.emit("openchange", details);
      const nativeEvent = eventDetails.event;
      if (nextOpen === false && nativeEvent?.type === "click" && nativeEvent.pointerType === "touch" && !allowTouchToCloseRef.current) {
        return;
      }
      if (!nextOpen && activeIndex !== null) {
        const activeOption = store.context.itemDomElements.current[activeIndex];
        queueMicrotask(() => {
          activeOption?.setAttribute("tabindex", "-1");
        });
      }
      if (nextOpen && reason === reason_parts_exports.triggerFocus) {
        allowTouchToCloseRef.current = false;
        allowTouchToCloseTimeout.start(300, () => {
          allowTouchToCloseRef.current = true;
        });
      } else {
        allowTouchToCloseRef.current = true;
        allowTouchToCloseTimeout.clear();
      }
      const isKeyboardClick = (reason === reason_parts_exports.triggerPress || reason === reason_parts_exports.itemPress) && nativeEvent.detail === 0 && nativeEvent?.isTrusted;
      const isDismissClose = !nextOpen && (reason === reason_parts_exports.escapeKey || reason == null);
      function changeState() {
        const updatedState = {
          open: nextOpen,
          openChangeReason: reason
        };
        openEventRef.current = eventDetails.event ?? null;
        const newTriggerId = eventDetails.trigger?.id ?? null;
        if (newTriggerId || nextOpen) {
          updatedState.activeTriggerId = newTriggerId;
          updatedState.activeTriggerElement = eventDetails.trigger ?? null;
        }
        store.update(updatedState);
      }
      if (reason === reason_parts_exports.triggerHover) {
        ReactDOM6.flushSync(changeState);
      } else {
        changeState();
      }
      if (parent.type === "menubar" && (reason === reason_parts_exports.triggerFocus || reason === reason_parts_exports.focusOut || reason === reason_parts_exports.triggerHover || reason === reason_parts_exports.listNavigation || reason === reason_parts_exports.siblingOpen)) {
        store.set("instantType", "group");
      } else if (isKeyboardClick || isDismissClose) {
        store.set("instantType", isKeyboardClick ? "click" : "dismiss");
      } else {
        store.set("instantType", void 0);
      }
    });
    const createMenuEventDetails = React70.useCallback((reason) => {
      const details = createChangeEventDetails(reason);
      details.preventUnmountOnClose = () => {
        store.set("preventUnmountingOnClose", true);
      };
      return details;
    }, [store]);
    const handleImperativeClose = React70.useCallback(() => {
      store.setOpen(false, createMenuEventDetails(reason_parts_exports.imperativeAction));
    }, [store, createMenuEventDetails]);
    React70.useImperativeHandle(actionsRef, () => ({
      unmount: forceUnmount,
      close: handleImperativeClose
    }), [forceUnmount, handleImperativeClose]);
    let ctx;
    if (parent.type === "context-menu") {
      ctx = parent.context;
    }
    React70.useImperativeHandle(ctx?.positionerRef, () => positionerElement, [positionerElement]);
    React70.useImperativeHandle(ctx?.actionsRef, () => ({
      setOpen
    }), [setOpen]);
    const floatingRootContext = useSyncedFloatingRootContext({
      popupStore: store,
      onOpenChange: setOpen
    });
    floatingEvents = floatingRootContext.context.events;
    React70.useEffect(() => {
      const handleSetOpenEvent = ({
        open: nextOpen,
        eventDetails
      }) => setOpen(nextOpen, eventDetails);
      floatingEvents.on("setOpen", handleSetOpenEvent);
      return () => {
        floatingEvents?.off("setOpen", handleSetOpenEvent);
      };
    }, [floatingEvents, setOpen]);
    const dismiss = useDismiss(floatingRootContext, {
      enabled: !disabled2,
      bubbles: closeParentOnEsc && parent.type === "menu",
      outsidePress() {
        if (parent.type !== "context-menu" || openEventRef.current?.type === "contextmenu") {
          return true;
        }
        return allowOutsidePressDismissalRef.current;
      },
      externalTree: nested ? floatingTreeRoot : void 0
    });
    const role = useRole(floatingRootContext, {
      role: "menu"
    });
    const direction = useDirection();
    const setActiveIndex = React70.useCallback((index2) => {
      if (store.select("activeIndex") === index2) {
        return;
      }
      store.set("activeIndex", index2);
    }, [store]);
    const listNavigation2 = useListNavigation(floatingRootContext, {
      enabled: !disabled2,
      listRef: store.context.itemDomElements,
      activeIndex,
      nested: parent.type !== void 0,
      loopFocus,
      orientation,
      parentOrientation: parent.type === "menubar" ? parent.context.orientation : void 0,
      rtl: direction === "rtl",
      disabledIndices: EMPTY_ARRAY,
      onNavigate: setActiveIndex,
      openOnArrowKeyDown: parent.type !== "context-menu",
      externalTree: nested ? floatingTreeRoot : void 0,
      focusItemOnHover: highlightItemOnHover
    });
    const onTypingChange = React70.useCallback((nextTyping) => {
      store.context.typingRef.current = nextTyping;
    }, [store]);
    const typeahead = useTypeahead(floatingRootContext, {
      listRef: store.context.itemLabels,
      activeIndex,
      resetMs: TYPEAHEAD_RESET_MS,
      onMatch: (index2) => {
        if (open && index2 !== activeIndex) {
          store.set("activeIndex", index2);
        }
      },
      onTypingChange
    });
    const {
      getReferenceProps,
      getFloatingProps,
      getItemProps,
      getTriggerProps
    } = useInteractions([dismiss, role, listNavigation2, typeahead]);
    const activeTriggerProps = React70.useMemo(() => {
      const referenceProps = mergeProps(getReferenceProps(), {
        onMouseEnter() {
          store.set("hoverEnabled", true);
        },
        onMouseMove() {
          store.set("allowMouseEnter", true);
        }
      }, interactionTypeProps);
      delete referenceProps.role;
      return referenceProps;
    }, [getReferenceProps, store, interactionTypeProps]);
    const inactiveTriggerProps = React70.useMemo(() => {
      const triggerProps = getTriggerProps();
      if (!triggerProps) {
        return triggerProps;
      }
      const {
        role: roleDiscarded,
        ["aria-controls"]: ariaControlsDiscarded,
        ...rest
      } = triggerProps;
      return rest;
    }, [getTriggerProps]);
    const disableHoverTimeout = useAnimationFrame();
    const popupProps = React70.useMemo(() => getFloatingProps({
      onMouseEnter() {
        if (parent.type === "menu") {
          disableHoverTimeout.request(() => store.set("hoverEnabled", false));
        }
      },
      onMouseMove() {
        store.set("allowMouseEnter", true);
      },
      onClick() {
        if (store.select("hoverEnabled")) {
          store.set("hoverEnabled", false);
        }
      },
      onKeyDown(event) {
        const relay = store.select("keyboardEventRelay");
        if (relay && !event.isPropagationStopped()) {
          relay(event);
        }
      }
    }), [getFloatingProps, parent.type, disableHoverTimeout, store]);
    const itemProps = React70.useMemo(() => getItemProps(), [getItemProps]);
    store.useSyncedValues({
      floatingRootContext,
      activeTriggerProps,
      inactiveTriggerProps,
      popupProps,
      itemProps
    });
    const context = React70.useMemo(() => ({
      store,
      parent: parentFromContext
    }), [store, parentFromContext]);
    const content = /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(MenuRootContext.Provider, {
      value: context,
      children: typeof children === "function" ? children({
        payload
      }) : children
    });
    if (parent.type === void 0 || parent.type === "context-menu") {
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(FloatingTree, {
        externalTree: floatingTreeRoot,
        children: content
      });
    }
    return content;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/submenu-root/MenuSubmenuRoot.js
  var React71 = __toESM(require_compat(), 1);
  var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);
  function MenuSubmenuRoot(props) {
    const {
      closeParentOnEsc = false
    } = props;
    const parentMenu = useMenuRootContext().store;
    const contextValue = React71.useMemo(() => ({
      parentMenu
    }), [parentMenu]);
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(MenuSubmenuRootContext.Provider, {
      value: contextValue,
      children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(MenuRoot, {
        ...props,
        closeParentOnEsc
      })
    });
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/trigger/MenuTrigger.js
  var React74 = __toESM(require_compat(), 1);
  var ReactDOM7 = __toESM(require_compat(), 1);

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/getPseudoElementBounds.js
  function getPseudoElementBounds(element) {
    const elementRect = element.getBoundingClientRect();
    if (false) {
      return elementRect;
    }
    const beforeStyles = window.getComputedStyle(element, "::before");
    const afterStyles = window.getComputedStyle(element, "::after");
    const hasPseudoElements = beforeStyles.content !== "none" || afterStyles.content !== "none";
    if (!hasPseudoElements) {
      return elementRect;
    }
    const beforeWidth = parseFloat(beforeStyles.width) || 0;
    const beforeHeight = parseFloat(beforeStyles.height) || 0;
    const afterWidth = parseFloat(afterStyles.width) || 0;
    const afterHeight = parseFloat(afterStyles.height) || 0;
    const totalWidth = Math.max(elementRect.width, beforeWidth, afterWidth);
    const totalHeight = Math.max(elementRect.height, beforeHeight, afterHeight);
    const widthDiff = totalWidth - elementRect.width;
    const heightDiff = totalHeight - elementRect.height;
    return {
      left: elementRect.left - widthDiff / 2,
      right: elementRect.right + widthDiff / 2,
      top: elementRect.top - heightDiff / 2,
      bottom: elementRect.bottom + heightDiff / 2
    };
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/composite/item/useCompositeItem.js
  var React72 = __toESM(require_compat(), 1);
  function useCompositeItem(params = {}) {
    const {
      highlightItemOnHover,
      highlightedIndex,
      onHighlightedIndexChange
    } = useCompositeRootContext();
    const {
      ref,
      index: index2
    } = useCompositeListItem(params);
    const isHighlighted = highlightedIndex === index2;
    const itemRef = React72.useRef(null);
    const mergedRef = useMergedRefs(ref, itemRef);
    const compositeProps = React72.useMemo(() => ({
      tabIndex: isHighlighted ? 0 : -1,
      onFocus() {
        onHighlightedIndexChange(index2);
      },
      onMouseMove() {
        const item = itemRef.current;
        if (!highlightItemOnHover || !item) {
          return;
        }
        const disabled2 = item.hasAttribute("disabled") || item.ariaDisabled === "true";
        if (!isHighlighted && !disabled2) {
          item.focus();
        }
      }
    }), [isHighlighted, onHighlightedIndexChange, index2, highlightItemOnHover]);
    return {
      compositeProps,
      compositeRef: mergedRef,
      index: index2
    };
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/composite/item/CompositeItem.js
  function CompositeItem(componentProps) {
    const {
      render,
      className,
      state = EMPTY_OBJECT,
      props = EMPTY_ARRAY,
      refs = EMPTY_ARRAY,
      metadata,
      stateAttributesMapping: stateAttributesMapping3,
      tag = "div",
      ...elementProps
    } = componentProps;
    const {
      compositeProps,
      compositeRef
    } = useCompositeItem({
      metadata
    });
    return useRenderElement(tag, componentProps, {
      state,
      ref: [...refs, compositeRef],
      props: [compositeProps, ...props, elementProps],
      stateAttributesMapping: stateAttributesMapping3
    });
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/utils/findRootOwnerId.js
  function findRootOwnerId(node) {
    if (isHTMLElement(node) && node.hasAttribute("data-rootownerid")) {
      return node.getAttribute("data-rootownerid") ?? void 0;
    }
    if (isLastTraversableNode(node)) {
      return void 0;
    }
    return findRootOwnerId(getParentNode(node));
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/utils/useMixedToggleClickHander.js
  var React73 = __toESM(require_compat(), 1);
  function useMixedToggleClickHandler(params) {
    const {
      enabled = true,
      mouseDownAction,
      open
    } = params;
    const ignoreClickRef = React73.useRef(false);
    return React73.useMemo(() => {
      if (!enabled) {
        return EMPTY_OBJECT;
      }
      return {
        onMouseDown: (event) => {
          if (mouseDownAction === "open" && !open || mouseDownAction === "close" && open) {
            ignoreClickRef.current = true;
            ownerDocument(event.currentTarget).addEventListener("click", () => {
              ignoreClickRef.current = false;
            }, {
              once: true
            });
          }
        },
        onClick: (event) => {
          if (ignoreClickRef.current) {
            ignoreClickRef.current = false;
            event.preventBaseUIHandler();
          }
        }
      };
    }, [enabled, mouseDownAction, open]);
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/trigger/MenuTrigger.js
  var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);
  var BOUNDARY_OFFSET = 2;
  var MenuTrigger = /* @__PURE__ */ React74.forwardRef(function MenuTrigger2(componentProps, forwardedRef) {
    const {
      render,
      className,
      disabled: disabledProp = false,
      nativeButton = true,
      id: idProp,
      openOnHover: openOnHoverProp,
      delay = 100,
      closeDelay = 0,
      handle,
      payload,
      ...elementProps
    } = componentProps;
    const rootContext = useMenuRootContext(true);
    const store = handle?.store ?? rootContext?.store;
    if (!store) {
      throw new Error(false ? "Base UI: <Menu.Trigger> must be either used within a <Menu.Root> component or provided with a handle." : formatErrorMessage(85));
    }
    const thisTriggerId = useBaseUiId(idProp);
    const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
    const floatingRootContext = store.useState("floatingRootContext");
    const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
    const triggerElementRef = React74.useRef(null);
    const parent = useMenuParent();
    const compositeRootContext = useCompositeRootContext(true);
    const floatingTreeRootFromContext = useFloatingTree();
    const floatingTreeRoot = React74.useMemo(() => {
      return floatingTreeRootFromContext ?? new FloatingTreeStore();
    }, [floatingTreeRootFromContext]);
    const floatingNodeId = useFloatingNodeId(floatingTreeRoot);
    const floatingParentNodeId = useFloatingParentNodeId();
    const {
      registerTrigger,
      isMountedByThisTrigger
    } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
      payload,
      closeDelay,
      parent,
      floatingTreeRoot,
      floatingNodeId,
      floatingParentNodeId,
      keyboardEventRelay: compositeRootContext?.relayKeyboardEvent
    });
    const rootDisabled = store.useState("disabled");
    const disabled2 = disabledProp || rootDisabled || parent.type === "menubar" && parent.context.disabled;
    const {
      getButtonProps,
      buttonRef
    } = useButton({
      disabled: disabled2,
      native: nativeButton
    });
    React74.useEffect(() => {
      if (!isOpenedByThisTrigger && parent.type === void 0) {
        store.context.allowMouseUpTriggerRef.current = false;
      }
    }, [store, isOpenedByThisTrigger, parent.type]);
    const triggerRef = React74.useRef(null);
    const allowMouseUpTriggerTimeout = useTimeout();
    const handleDocumentMouseUp = useStableCallback((mouseEvent) => {
      if (!triggerRef.current) {
        return;
      }
      allowMouseUpTriggerTimeout.clear();
      store.context.allowMouseUpTriggerRef.current = false;
      const mouseUpTarget = mouseEvent.target;
      if (contains(triggerRef.current, mouseUpTarget) || contains(store.select("positionerElement"), mouseUpTarget) || mouseUpTarget === triggerRef.current) {
        return;
      }
      if (mouseUpTarget != null && findRootOwnerId(mouseUpTarget) === store.select("rootId")) {
        return;
      }
      const bounds = getPseudoElementBounds(triggerRef.current);
      if (mouseEvent.clientX >= bounds.left - BOUNDARY_OFFSET && mouseEvent.clientX <= bounds.right + BOUNDARY_OFFSET && mouseEvent.clientY >= bounds.top - BOUNDARY_OFFSET && mouseEvent.clientY <= bounds.bottom + BOUNDARY_OFFSET) {
        return;
      }
      floatingTreeRoot.events.emit("close", {
        domEvent: mouseEvent,
        reason: reason_parts_exports.cancelOpen
      });
    });
    React74.useEffect(() => {
      if (isOpenedByThisTrigger && store.select("lastOpenChangeReason") === reason_parts_exports.triggerHover) {
        const doc = ownerDocument(triggerRef.current);
        doc.addEventListener("mouseup", handleDocumentMouseUp, {
          once: true
        });
      }
    }, [isOpenedByThisTrigger, handleDocumentMouseUp, store]);
    const parentMenubarHasSubmenuOpen = parent.type === "menubar" && parent.context.hasSubmenuOpen;
    const openOnHover = openOnHoverProp ?? parentMenubarHasSubmenuOpen ?? false;
    const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
      enabled: openOnHover && !disabled2 && parent.type !== "context-menu" && (parent.type !== "menubar" || parentMenubarHasSubmenuOpen && !isMountedByThisTrigger),
      handleClose: safePolygon({
        blockPointerEvents: parent.type !== "menubar"
      }),
      mouseOnly: true,
      move: false,
      restMs: parent.type === void 0 ? delay : void 0,
      delay: {
        close: closeDelay
      },
      triggerElementRef,
      externalTree: floatingTreeRoot,
      isActiveTrigger: isTriggerActive
    });
    const stickIfOpen = useStickIfOpen(isOpenedByThisTrigger, store.select("lastOpenChangeReason"));
    const click = useClick(floatingRootContext, {
      enabled: !disabled2 && parent.type !== "context-menu",
      event: isOpenedByThisTrigger && parent.type === "menubar" ? "click" : "mousedown",
      toggle: true,
      ignoreMouse: false,
      stickIfOpen: parent.type === void 0 ? stickIfOpen : false
    });
    const focus = useFocus(floatingRootContext, {
      enabled: !disabled2 && (parent.type !== "menubar" && isOpenedByThisTrigger || parentMenubarHasSubmenuOpen)
    });
    const mixedToggleHandlers = useMixedToggleClickHandler({
      open: isOpenedByThisTrigger,
      enabled: parent.type === "menubar",
      mouseDownAction: "open"
    });
    const localInteractionProps = useInteractions([click, focus]);
    const isInMenubar = parent.type === "menubar";
    const state = React74.useMemo(() => ({
      disabled: disabled2,
      open: isOpenedByThisTrigger
    }), [disabled2, isOpenedByThisTrigger]);
    const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
    const ref = [triggerRef, forwardedRef, buttonRef, registerTrigger, triggerElementRef];
    const props = [localInteractionProps.getReferenceProps(), hoverProps ?? EMPTY_OBJECT, rootTriggerProps, {
      "aria-haspopup": "menu",
      id: thisTriggerId,
      onMouseDown: (event) => {
        if (store.select("open")) {
          return;
        }
        allowMouseUpTriggerTimeout.start(200, () => {
          store.context.allowMouseUpTriggerRef.current = true;
        });
        const doc = ownerDocument(event.currentTarget);
        doc.addEventListener("mouseup", handleDocumentMouseUp, {
          once: true
        });
      }
    }, isInMenubar ? {
      role: "menuitem"
    } : {}, mixedToggleHandlers, elementProps, getButtonProps];
    const preFocusGuardRef = React74.useRef(null);
    const handlePreFocusGuardFocus = useStableCallback((event) => {
      ReactDOM7.flushSync(() => {
        store.setOpen(false, createChangeEventDetails(reason_parts_exports.focusOut, event.nativeEvent, event.currentTarget));
      });
      const previousTabbable = getTabbableBeforeElement(preFocusGuardRef.current);
      previousTabbable?.focus();
    });
    const handleFocusTargetFocus = useStableCallback((event) => {
      const currentPositionerElement = store.select("positionerElement");
      if (currentPositionerElement && isOutsideEvent(event, currentPositionerElement)) {
        store.context.beforeContentFocusGuardRef.current?.focus();
      } else {
        ReactDOM7.flushSync(() => {
          store.setOpen(false, createChangeEventDetails(reason_parts_exports.focusOut, event.nativeEvent, event.currentTarget));
        });
        let nextTabbable = getTabbableAfterElement(triggerElementRef.current);
        while (nextTabbable !== null && contains(currentPositionerElement, nextTabbable) || nextTabbable?.hasAttribute("aria-hidden")) {
          const prevTabbable = nextTabbable;
          nextTabbable = getNextTabbable(nextTabbable);
          if (nextTabbable === prevTabbable) {
            break;
          }
        }
        nextTabbable?.focus();
      }
    });
    const element = useRenderElement("button", componentProps, {
      enabled: !isInMenubar,
      stateAttributesMapping: pressableTriggerOpenStateMapping,
      state,
      ref,
      props
    });
    if (isInMenubar) {
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(CompositeItem, {
        tag: "button",
        render,
        className,
        state,
        refs: ref,
        props,
        stateAttributesMapping: pressableTriggerOpenStateMapping
      });
    }
    if (isOpenedByThisTrigger) {
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(React74.Fragment, {
        children: [/* @__PURE__ */ (0, import_jsx_runtime16.jsx)(FocusGuard, {
          ref: preFocusGuardRef,
          onFocus: handlePreFocusGuardFocus
        }, `${thisTriggerId}-pre-focus-guard`), /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(React74.Fragment, {
          children: element
        }, thisTriggerId), /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(FocusGuard, {
          ref: store.context.triggerFocusTargetRef,
          onFocus: handleFocusTargetFocus
        }, `${thisTriggerId}-post-focus-guard`)]
      });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(React74.Fragment, {
      children: element
    }, thisTriggerId);
  });
  if (false) MenuTrigger.displayName = "MenuTrigger";
  function useStickIfOpen(open, openReason) {
    const stickIfOpenTimeout = useTimeout();
    const [stickIfOpen, setStickIfOpen] = React74.useState(false);
    useIsoLayoutEffect(() => {
      if (open && openReason === "trigger-hover") {
        setStickIfOpen(true);
        stickIfOpenTimeout.start(PATIENT_CLICK_THRESHOLD, () => {
          setStickIfOpen(false);
        });
      } else if (!open) {
        stickIfOpenTimeout.clear();
        setStickIfOpen(false);
      }
    }, [open, openReason, stickIfOpenTimeout]);
    return stickIfOpen;
  }
  function useMenuParent() {
    const contextMenuContext = useContextMenuRootContext(true);
    const parentContext = useMenuRootContext(true);
    const menubarContext = useMenubarContext(true);
    const parent = React74.useMemo(() => {
      if (menubarContext) {
        return {
          type: "menubar",
          context: menubarContext
        };
      }
      if (contextMenuContext && !parentContext) {
        return {
          type: "context-menu",
          context: contextMenuContext
        };
      }
      return {
        type: void 0
      };
    }, [contextMenuContext, parentContext, menubarContext]);
    return parent;
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/separator/Separator.js
  var React75 = __toESM(require_compat(), 1);
  var Separator = /* @__PURE__ */ React75.forwardRef(function SeparatorComponent(componentProps, forwardedRef) {
    const {
      className,
      render,
      orientation = "horizontal",
      ...elementProps
    } = componentProps;
    const state = React75.useMemo(() => ({
      orientation
    }), [orientation]);
    const element = useRenderElement("div", componentProps, {
      state,
      ref: forwardedRef,
      props: [{
        role: "separator",
        "aria-orientation": orientation
      }, elementProps]
    });
    return element;
  });
  if (false) Separator.displayName = "Separator";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/submenu-trigger/MenuSubmenuTrigger.js
  var React76 = __toESM(require_compat(), 1);
  var MenuSubmenuTrigger = /* @__PURE__ */ React76.forwardRef(function SubmenuTriggerComponent(componentProps, forwardedRef) {
    const {
      render,
      className,
      label,
      id: idProp,
      nativeButton = false,
      openOnHover = true,
      delay = 100,
      closeDelay = 0,
      disabled: disabledProp = false,
      ...elementProps
    } = componentProps;
    const listItem = useCompositeListItem();
    const menuPositionerContext = useMenuPositionerContext();
    const {
      store
    } = useMenuRootContext();
    const thisTriggerId = useBaseUiId(idProp);
    const open = store.useState("open");
    const floatingRootContext = store.useState("floatingRootContext");
    const floatingTreeRoot = store.useState("floatingTreeRoot");
    const baseRegisterTrigger = useTriggerRegistration(thisTriggerId, store);
    const registerTrigger = React76.useCallback((element2) => {
      const cleanup = baseRegisterTrigger(element2);
      if (element2 !== null && store.select("open") && store.select("activeTriggerId") == null) {
        store.update({
          activeTriggerId: thisTriggerId,
          activeTriggerElement: element2,
          closeDelay
        });
      }
      return cleanup;
    }, [baseRegisterTrigger, closeDelay, store, thisTriggerId]);
    const triggerElementRef = React76.useRef(null);
    const handleTriggerElementRef = React76.useCallback((el) => {
      triggerElementRef.current = el;
      store.set("activeTriggerElement", el);
    }, [store]);
    const submenuRootContext = useMenuSubmenuRootContext();
    if (!submenuRootContext?.parentMenu) {
      throw new Error(false ? "Base UI: <Menu.SubmenuTrigger> must be placed in <Menu.SubmenuRoot>." : formatErrorMessage(37));
    }
    store.useSyncedValue("closeDelay", closeDelay);
    const parentMenuStore = submenuRootContext.parentMenu;
    const itemProps = parentMenuStore.useState("itemProps");
    const highlighted = parentMenuStore.useState("isActive", listItem.index);
    const itemMetadata = React76.useMemo(() => ({
      type: "submenu-trigger",
      setActive: () => parentMenuStore.set("activeIndex", listItem.index)
    }), [parentMenuStore, listItem.index]);
    const rootDisabled = store.useState("disabled");
    const disabled2 = disabledProp || rootDisabled;
    const {
      getItemProps,
      itemRef
    } = useMenuItem({
      closeOnClick: false,
      disabled: disabled2,
      highlighted,
      id: thisTriggerId,
      store,
      nativeButton,
      itemMetadata,
      nodeId: menuPositionerContext?.nodeId
    });
    const hoverEnabled = store.useState("hoverEnabled");
    const allowMouseEnter = store.useState("allowMouseEnter");
    const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
      enabled: hoverEnabled && openOnHover && !disabled2,
      handleClose: safePolygon({
        blockPointerEvents: true
      }),
      mouseOnly: true,
      move: true,
      restMs: allowMouseEnter ? delay : void 0,
      delay: {
        open: allowMouseEnter ? delay : 10 ** 10,
        close: closeDelay
      },
      triggerElementRef,
      externalTree: floatingTreeRoot
    });
    const click = useClick(floatingRootContext, {
      enabled: !disabled2,
      event: "mousedown",
      toggle: !openOnHover,
      ignoreMouse: openOnHover,
      stickIfOpen: false
    });
    const localInteractionProps = useInteractions([click]);
    const rootTriggerProps = store.useState("triggerProps", true);
    delete rootTriggerProps.id;
    const state = React76.useMemo(() => ({
      disabled: disabled2,
      highlighted,
      open
    }), [disabled2, highlighted, open]);
    const element = useRenderElement("div", componentProps, {
      state,
      stateAttributesMapping: triggerOpenStateMapping,
      props: [localInteractionProps.getReferenceProps(), hoverProps, rootTriggerProps, itemProps, {
        tabIndex: open || highlighted ? 0 : -1,
        onBlur() {
          if (highlighted) {
            parentMenuStore.set("activeIndex", null);
          }
        }
      }, elementProps, getItemProps],
      ref: [forwardedRef, listItem.ref, itemRef, registerTrigger, handleTriggerElementRef]
    });
    return element;
  });
  if (false) MenuSubmenuTrigger.displayName = "MenuSubmenuTrigger";

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/node_modules/@base-ui-components/react/esm/menu/store/MenuHandle.js
  var MenuHandle = class {
    /**
     * Internal store holding the menu's state.
     * @internal
     */
    constructor() {
      this.store = new MenuStore();
    }
    /**
     * Opens the menu and associates it with the trigger with the given id.
     * The trigger must be a Menu.Trigger component with this handle passed as a prop.
     *
     * @param triggerId ID of the trigger to associate with the menu.
     */
    open(triggerId) {
      const triggerElement = triggerId ? this.store.context.triggerElements.getById(triggerId) : void 0;
      if (triggerId && !triggerElement) {
        throw new Error(false ? `Base UI: MenuHandle.open: No trigger found with id "${triggerId}".` : formatErrorMessage(83, triggerId));
      }
      this.store.setOpen(true, createChangeEventDetails("imperative-action", void 0, triggerElement));
    }
    /**
     * Closes the menu.
     */
    close() {
      this.store.setOpen(false, createChangeEventDetails("imperative-action", void 0, void 0));
    }
    /**
     * Indicates whether the menu is currently open.
     */
    get isOpen() {
      return this.store.state.open;
    }
  };
  function createMenuHandle() {
    return new MenuHandle();
  }

  // ../../../../../private/tmp/claude-501/-Users-marshallshelly-Documents-GitHub-native/f04dfeb2-9c67-43b2-a11b-fb8dec8d2404/scratchpad/spike/entry.js
  globalThis.React = compat_module_exports;
  globalThis.BaseMenu = index_parts_exports;
  globalThis.preactRender = R;
  globalThis.h = k;
})();
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.production.js:
  (**
   * @license React
   * use-sync-external-store-shim.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

tabbable/dist/index.esm.js:
  (*!
  * tabbable 6.5.0
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)
*/

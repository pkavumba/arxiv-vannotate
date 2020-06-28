parcelRequire = function (e, r, t, n) {
    var i, o = "function" == typeof parcelRequire && parcelRequire,
        u = "function" == typeof require && require;

    function f(t, n) {
        if (!r[t]) {
            if (!e[t]) {
                var i = "function" == typeof parcelRequire && parcelRequire;
                if (!n && i) return i(t, !0);
                if (o) return o(t, !0);
                if (u && "string" == typeof t) return u(t);
                var c = new Error("Cannot find module '" + t + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            p.resolve = function (r) {
                return e[t][1][r] || r
            }, p.cache = {};
            var l = r[t] = new f.Module(t);
            e[t][0].call(l.exports, p, l, l.exports, this)
        }
        return r[t].exports;

        function p(e) {
            return f(p.resolve(e))
        }
    }
    f.isParcelRequire = !0, f.Module = function (e) {
        this.id = e, this.bundle = f, this.exports = {}
    }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) {
        e[r] = [function (e, r) {
            r.exports = t
        }, {}]
    };
    for (var c = 0; c < t.length; c++) try {
        f(t[c])
    } catch (e) {
        i || (i = e)
    }
    if (t.length) {
        var l = f(t[t.length - 1]);
        "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
            return l
        }) : n && (this[n] = l)
    }
    if (parcelRequire = f, i) throw i;
    return f
}({
    "CD2u": [function (require, module, exports) {
        var global = arguments[3];
        var e = arguments[3];
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        for (var t = "undefined" != typeof window && "undefined" != typeof document, n = ["Edge", "Trident", "Firefox"], o = 0, r = 0; r < n.length; r += 1)
            if (t && navigator.userAgent.indexOf(n[r]) >= 0) {
                o = 1;
                break
            }

        function i(e) {
            var t = !1;
            return function () {
                t || (t = !0, window.Promise.resolve().then(function () {
                    t = !1, e()
                }))
            }
        }

        function a(e) {
            var t = !1;
            return function () {
                t || (t = !0, setTimeout(function () {
                    t = !1, e()
                }, o))
            }
        }
        var s = t && window.Promise,
            f = s ? i : a;

        function p(e) {
            return e && "[object Function]" === {}.toString.call(e)
        }

        function l(e, t) {
            if (1 !== e.nodeType) return [];
            var n = e.ownerDocument.defaultView.getComputedStyle(e, null);
            return t ? n[t] : n
        }

        function u(e) {
            return "HTML" === e.nodeName ? e : e.parentNode || e.host
        }

        function d(e) {
            if (!e) return document.body;
            switch (e.nodeName) {
                case "HTML":
                case "BODY":
                    return e.ownerDocument.body;
                case "#document":
                    return e.body
            }
            var t = l(e),
                n = t.overflow,
                o = t.overflowX,
                r = t.overflowY;
            return /(auto|scroll|overlay)/.test(n + r + o) ? e : d(u(e))
        }
        var c = t && !(!window.MSInputMethodContext || !document.documentMode),
            h = t && /MSIE 10/.test(navigator.userAgent);

        function m(e) {
            return 11 === e ? c : 10 === e ? h : c || h
        }

        function v(e) {
            if (!e) return document.documentElement;
            for (var t = m(10) ? document.body : null, n = e.offsetParent || null; n === t && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
            var o = n && n.nodeName;
            return o && "BODY" !== o && "HTML" !== o ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === l(n, "position") ? v(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
        }

        function g(e) {
            var t = e.nodeName;
            return "BODY" !== t && ("HTML" === t || v(e.firstElementChild) === e)
        }

        function b(e) {
            return null !== e.parentNode ? b(e.parentNode) : e
        }

        function w(e, t) {
            if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;
            var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
                o = n ? e : t,
                r = n ? t : e,
                i = document.createRange();
            i.setStart(o, 0), i.setEnd(r, 0);
            var a = i.commonAncestorContainer;
            if (e !== a && t !== a || o.contains(r)) return g(a) ? a : v(a);
            var s = b(e);
            return s.host ? w(s.host, t) : w(e, b(t).host)
        }

        function y(e) {
            var t = "top" === (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
                n = e.nodeName;
            if ("BODY" === n || "HTML" === n) {
                var o = e.ownerDocument.documentElement;
                return (e.ownerDocument.scrollingElement || o)[t]
            }
            return e[t]
        }

        function E(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                o = y(t, "top"),
                r = y(t, "left"),
                i = n ? -1 : 1;
            return e.top += o * i, e.bottom += o * i, e.left += r * i, e.right += r * i, e
        }

        function x(e, t) {
            var n = "x" === t ? "Left" : "Top",
                o = "Left" === n ? "Right" : "Bottom";
            return parseFloat(e["border" + n + "Width"], 10) + parseFloat(e["border" + o + "Width"], 10)
        }

        function O(e, t, n, o) {
            return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], m(10) ? parseInt(n["offset" + e]) + parseInt(o["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(o["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0)
        }

        function L(e) {
            var t = e.body,
                n = e.documentElement,
                o = m(10) && getComputedStyle(n);
            return {
                height: O("Height", t, n, o),
                width: O("Width", t, n, o)
            }
        }
        var T = function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            },
            M = function () {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                    }
                }
                return function (t, n, o) {
                    return n && e(t.prototype, n), o && e(t, o), t
                }
            }(),
            C = function (e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e
            },
            D = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
                }
                return e
            };

        function N(e) {
            return D({}, e, {
                right: e.left + e.width,
                bottom: e.top + e.height
            })
        }

        function F(e) {
            var t = {};
            try {
                if (m(10)) {
                    t = e.getBoundingClientRect();
                    var n = y(e, "top"),
                        o = y(e, "left");
                    t.top += n, t.left += o, t.bottom += n, t.right += o
                } else t = e.getBoundingClientRect()
            } catch (d) {}
            var r = {
                    left: t.left,
                    top: t.top,
                    width: t.right - t.left,
                    height: t.bottom - t.top
                },
                i = "HTML" === e.nodeName ? L(e.ownerDocument) : {},
                a = i.width || e.clientWidth || r.right - r.left,
                s = i.height || e.clientHeight || r.bottom - r.top,
                f = e.offsetWidth - a,
                p = e.offsetHeight - s;
            if (f || p) {
                var u = l(e);
                f -= x(u, "x"), p -= x(u, "y"), r.width -= f, r.height -= p
            }
            return N(r)
        }

        function k(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                o = m(10),
                r = "HTML" === t.nodeName,
                i = F(e),
                a = F(t),
                s = d(e),
                f = l(t),
                p = parseFloat(f.borderTopWidth, 10),
                u = parseFloat(f.borderLeftWidth, 10);
            n && r && (a.top = Math.max(a.top, 0), a.left = Math.max(a.left, 0));
            var c = N({
                top: i.top - a.top - p,
                left: i.left - a.left - u,
                width: i.width,
                height: i.height
            });
            if (c.marginTop = 0, c.marginLeft = 0, !o && r) {
                var h = parseFloat(f.marginTop, 10),
                    v = parseFloat(f.marginLeft, 10);
                c.top -= p - h, c.bottom -= p - h, c.left -= u - v, c.right -= u - v, c.marginTop = h, c.marginLeft = v
            }
            return (o && !n ? t.contains(s) : t === s && "BODY" !== s.nodeName) && (c = E(c, t)), c
        }

        function S(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = e.ownerDocument.documentElement,
                o = k(e, n),
                r = Math.max(n.clientWidth, window.innerWidth || 0),
                i = Math.max(n.clientHeight, window.innerHeight || 0),
                a = t ? 0 : y(n),
                s = t ? 0 : y(n, "left");
            return N({
                top: a - o.top + o.marginTop,
                left: s - o.left + o.marginLeft,
                width: r,
                height: i
            })
        }

        function W(e) {
            var t = e.nodeName;
            if ("BODY" === t || "HTML" === t) return !1;
            if ("fixed" === l(e, "position")) return !0;
            var n = u(e);
            return !!n && W(n)
        }

        function H(e) {
            if (!e || !e.parentElement || m()) return document.documentElement;
            for (var t = e.parentElement; t && "none" === l(t, "transform");) t = t.parentElement;
            return t || document.documentElement
        }

        function P(e, t, n, o) {
            var r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                i = {
                    top: 0,
                    left: 0
                },
                a = r ? H(e) : w(e, t);
            if ("viewport" === o) i = S(a, r);
            else {
                var s = void 0;
                "scrollParent" === o ? "BODY" === (s = d(u(t))).nodeName && (s = e.ownerDocument.documentElement) : s = "window" === o ? e.ownerDocument.documentElement : o;
                var f = k(s, a, r);
                if ("HTML" !== s.nodeName || W(a)) i = f;
                else {
                    var p = L(e.ownerDocument),
                        l = p.height,
                        c = p.width;
                    i.top += f.top - f.marginTop, i.bottom = l + f.top, i.left += f.left - f.marginLeft, i.right = c + f.left
                }
            }
            var h = "number" == typeof (n = n || 0);
            return i.left += h ? n : n.left || 0, i.top += h ? n : n.top || 0, i.right -= h ? n : n.right || 0, i.bottom -= h ? n : n.bottom || 0, i
        }

        function B(e) {
            return e.width * e.height
        }

        function A(e, t, n, o, r) {
            var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
            if (-1 === e.indexOf("auto")) return e;
            var a = P(n, o, i, r),
                s = {
                    top: {
                        width: a.width,
                        height: t.top - a.top
                    },
                    right: {
                        width: a.right - t.right,
                        height: a.height
                    },
                    bottom: {
                        width: a.width,
                        height: a.bottom - t.bottom
                    },
                    left: {
                        width: t.left - a.left,
                        height: a.height
                    }
                },
                f = Object.keys(s).map(function (e) {
                    return D({
                        key: e
                    }, s[e], {
                        area: B(s[e])
                    })
                }).sort(function (e, t) {
                    return t.area - e.area
                }),
                p = f.filter(function (e) {
                    var t = e.width,
                        o = e.height;
                    return t >= n.clientWidth && o >= n.clientHeight
                }),
                l = p.length > 0 ? p[0].key : f[0].key,
                u = e.split("-")[1];
            return l + (u ? "-" + u : "")
        }

        function I(e, t, n) {
            var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
            return k(n, o ? H(t) : w(t, n), o)
        }

        function j(e) {
            var t = e.ownerDocument.defaultView.getComputedStyle(e),
                n = parseFloat(t.marginTop || 0) + parseFloat(t.marginBottom || 0),
                o = parseFloat(t.marginLeft || 0) + parseFloat(t.marginRight || 0);
            return {
                width: e.offsetWidth + o,
                height: e.offsetHeight + n
            }
        }

        function R(e) {
            var t = {
                left: "right",
                right: "left",
                bottom: "top",
                top: "bottom"
            };
            return e.replace(/left|right|bottom|top/g, function (e) {
                return t[e]
            })
        }

        function U(e, t, n) {
            n = n.split("-")[0];
            var o = j(e),
                r = {
                    width: o.width,
                    height: o.height
                },
                i = -1 !== ["right", "left"].indexOf(n),
                a = i ? "top" : "left",
                s = i ? "left" : "top",
                f = i ? "height" : "width",
                p = i ? "width" : "height";
            return r[a] = t[a] + t[f] / 2 - o[f] / 2, r[s] = n === s ? t[s] - o[p] : t[R(s)], r
        }

        function Y(e, t) {
            return Array.prototype.find ? e.find(t) : e.filter(t)[0]
        }

        function V(e, t, n) {
            if (Array.prototype.findIndex) return e.findIndex(function (e) {
                return e[t] === n
            });
            var o = Y(e, function (e) {
                return e[t] === n
            });
            return e.indexOf(o)
        }

        function q(e, t, n) {
            return (void 0 === n ? e : e.slice(0, V(e, "name", n))).forEach(function (e) {
                e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                var n = e.function || e.fn;
                e.enabled && p(n) && (t.offsets.popper = N(t.offsets.popper), t.offsets.reference = N(t.offsets.reference), t = n(t, e))
            }), t
        }

        function K() {
            if (!this.state.isDestroyed) {
                var e = {
                    instance: this,
                    styles: {},
                    arrowStyles: {},
                    attributes: {},
                    flipped: !1,
                    offsets: {}
                };
                e.offsets.reference = I(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = A(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = U(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = q(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
            }
        }

        function _(e, t) {
            return e.some(function (e) {
                var n = e.name;
                return e.enabled && n === t
            })
        }

        function z(e) {
            for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), o = 0; o < t.length; o++) {
                var r = t[o],
                    i = r ? "" + r + n : e;
                if (void 0 !== document.body.style[i]) return i
            }
            return null
        }

        function G() {
            return this.state.isDestroyed = !0, _(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[z("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
        }

        function X(e) {
            var t = e.ownerDocument;
            return t ? t.defaultView : window
        }

        function J(e, t, n, o) {
            var r = "BODY" === e.nodeName,
                i = r ? e.ownerDocument.defaultView : e;
            i.addEventListener(t, n, {
                passive: !0
            }), r || J(d(i.parentNode), t, n, o), o.push(i)
        }

        function Q(e, t, n, o) {
            n.updateBound = o, X(e).addEventListener("resize", n.updateBound, {
                passive: !0
            });
            var r = d(e);
            return J(r, "scroll", n.updateBound, n.scrollParents), n.scrollElement = r, n.eventsEnabled = !0, n
        }

        function Z() {
            this.state.eventsEnabled || (this.state = Q(this.reference, this.options, this.state, this.scheduleUpdate))
        }

        function $(e, t) {
            return X(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function (e) {
                e.removeEventListener("scroll", t.updateBound)
            }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
        }

        function ee() {
            this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = $(this.reference, this.state))
        }

        function te(e) {
            return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
        }

        function ne(e, t) {
            Object.keys(t).forEach(function (n) {
                var o = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && te(t[n]) && (o = "px"), e.style[n] = t[n] + o
            })
        }

        function oe(e, t) {
            Object.keys(t).forEach(function (n) {
                !1 !== t[n] ? e.setAttribute(n, t[n]) : e.removeAttribute(n)
            })
        }

        function re(e) {
            return ne(e.instance.popper, e.styles), oe(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && ne(e.arrowElement, e.arrowStyles), e
        }

        function ie(e, t, n, o, r) {
            var i = I(r, t, e, n.positionFixed),
                a = A(n.placement, i, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
            return t.setAttribute("x-placement", a), ne(t, {
                position: n.positionFixed ? "fixed" : "absolute"
            }), n
        }

        function ae(e, t) {
            var n = e.offsets,
                o = n.popper,
                r = n.reference,
                i = Math.round,
                a = Math.floor,
                s = function (e) {
                    return e
                },
                f = i(r.width),
                p = i(o.width),
                l = -1 !== ["left", "right"].indexOf(e.placement),
                u = -1 !== e.placement.indexOf("-"),
                d = t ? l || u || f % 2 == p % 2 ? i : a : s,
                c = t ? i : s;
            return {
                left: d(f % 2 == 1 && p % 2 == 1 && !u && t ? o.left - 1 : o.left),
                top: c(o.top),
                bottom: c(o.bottom),
                right: d(o.right)
            }
        }
        var se = t && /Firefox/i.test(navigator.userAgent);

        function fe(e, t) {
            var n = t.x,
                o = t.y,
                r = e.offsets.popper,
                i = Y(e.instance.modifiers, function (e) {
                    return "applyStyle" === e.name
                }).gpuAcceleration;
            void 0 !== i && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
            var a = void 0 !== i ? i : t.gpuAcceleration,
                s = v(e.instance.popper),
                f = F(s),
                p = {
                    position: r.position
                },
                l = ae(e, window.devicePixelRatio < 2 || !se),
                u = "bottom" === n ? "top" : "bottom",
                d = "right" === o ? "left" : "right",
                c = z("transform"),
                h = void 0,
                m = void 0;
            if (m = "bottom" === u ? "HTML" === s.nodeName ? -s.clientHeight + l.bottom : -f.height + l.bottom : l.top, h = "right" === d ? "HTML" === s.nodeName ? -s.clientWidth + l.right : -f.width + l.right : l.left, a && c) p[c] = "translate3d(" + h + "px, " + m + "px, 0)", p[u] = 0, p[d] = 0, p.willChange = "transform";
            else {
                var g = "bottom" === u ? -1 : 1,
                    b = "right" === d ? -1 : 1;
                p[u] = m * g, p[d] = h * b, p.willChange = u + ", " + d
            }
            var w = {
                "x-placement": e.placement
            };
            return e.attributes = D({}, w, e.attributes), e.styles = D({}, p, e.styles), e.arrowStyles = D({}, e.offsets.arrow, e.arrowStyles), e
        }

        function pe(e, t, n) {
            var o = Y(e, function (e) {
                    return e.name === t
                }),
                r = !!o && e.some(function (e) {
                    return e.name === n && e.enabled && e.order < o.order
                });
            if (!r) {
                var i = "`" + t + "`",
                    a = "`" + n + "`";
                console.warn(a + " modifier is required by " + i + " modifier in order to work, be sure to include it before " + i + "!")
            }
            return r
        }

        function le(e, t) {
            var n;
            if (!pe(e.instance.modifiers, "arrow", "keepTogether")) return e;
            var o = t.element;
            if ("string" == typeof o) {
                if (!(o = e.instance.popper.querySelector(o))) return e
            } else if (!e.instance.popper.contains(o)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
            var r = e.placement.split("-")[0],
                i = e.offsets,
                a = i.popper,
                s = i.reference,
                f = -1 !== ["left", "right"].indexOf(r),
                p = f ? "height" : "width",
                u = f ? "Top" : "Left",
                d = u.toLowerCase(),
                c = f ? "left" : "top",
                h = f ? "bottom" : "right",
                m = j(o)[p];
            s[h] - m < a[d] && (e.offsets.popper[d] -= a[d] - (s[h] - m)), s[d] + m > a[h] && (e.offsets.popper[d] += s[d] + m - a[h]), e.offsets.popper = N(e.offsets.popper);
            var v = s[d] + s[p] / 2 - m / 2,
                g = l(e.instance.popper),
                b = parseFloat(g["margin" + u], 10),
                w = parseFloat(g["border" + u + "Width"], 10),
                y = v - e.offsets.popper[d] - b - w;
            return y = Math.max(Math.min(a[p] - m, y), 0), e.arrowElement = o, e.offsets.arrow = (C(n = {}, d, Math.round(y)), C(n, c, ""), n), e
        }

        function ue(e) {
            return "end" === e ? "start" : "start" === e ? "end" : e
        }
        var de = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
            ce = de.slice(3);

        function he(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = ce.indexOf(e),
                o = ce.slice(n + 1).concat(ce.slice(0, n));
            return t ? o.reverse() : o
        }
        var me = {
            FLIP: "flip",
            CLOCKWISE: "clockwise",
            COUNTERCLOCKWISE: "counterclockwise"
        };

        function ve(e, t) {
            if (_(e.instance.modifiers, "inner")) return e;
            if (e.flipped && e.placement === e.originalPlacement) return e;
            var n = P(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                o = e.placement.split("-")[0],
                r = R(o),
                i = e.placement.split("-")[1] || "",
                a = [];
            switch (t.behavior) {
                case me.FLIP:
                    a = [o, r];
                    break;
                case me.CLOCKWISE:
                    a = he(o);
                    break;
                case me.COUNTERCLOCKWISE:
                    a = he(o, !0);
                    break;
                default:
                    a = t.behavior
            }
            return a.forEach(function (s, f) {
                if (o !== s || a.length === f + 1) return e;
                o = e.placement.split("-")[0], r = R(o);
                var p = e.offsets.popper,
                    l = e.offsets.reference,
                    u = Math.floor,
                    d = "left" === o && u(p.right) > u(l.left) || "right" === o && u(p.left) < u(l.right) || "top" === o && u(p.bottom) > u(l.top) || "bottom" === o && u(p.top) < u(l.bottom),
                    c = u(p.left) < u(n.left),
                    h = u(p.right) > u(n.right),
                    m = u(p.top) < u(n.top),
                    v = u(p.bottom) > u(n.bottom),
                    g = "left" === o && c || "right" === o && h || "top" === o && m || "bottom" === o && v,
                    b = -1 !== ["top", "bottom"].indexOf(o),
                    w = !!t.flipVariations && (b && "start" === i && c || b && "end" === i && h || !b && "start" === i && m || !b && "end" === i && v),
                    y = !!t.flipVariationsByContent && (b && "start" === i && h || b && "end" === i && c || !b && "start" === i && v || !b && "end" === i && m),
                    E = w || y;
                (d || g || E) && (e.flipped = !0, (d || g) && (o = a[f + 1]), E && (i = ue(i)), e.placement = o + (i ? "-" + i : ""), e.offsets.popper = D({}, e.offsets.popper, U(e.instance.popper, e.offsets.reference, e.placement)), e = q(e.instance.modifiers, e, "flip"))
            }), e
        }

        function ge(e) {
            var t = e.offsets,
                n = t.popper,
                o = t.reference,
                r = e.placement.split("-")[0],
                i = Math.floor,
                a = -1 !== ["top", "bottom"].indexOf(r),
                s = a ? "right" : "bottom",
                f = a ? "left" : "top",
                p = a ? "width" : "height";
            return n[s] < i(o[f]) && (e.offsets.popper[f] = i(o[f]) - n[p]), n[f] > i(o[s]) && (e.offsets.popper[f] = i(o[s])), e
        }

        function be(e, t, n, o) {
            var r = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                i = +r[1],
                a = r[2];
            if (!i) return e;
            if (0 === a.indexOf("%")) {
                var s = void 0;
                switch (a) {
                    case "%p":
                        s = n;
                        break;
                    case "%":
                    case "%r":
                    default:
                        s = o
                }
                return N(s)[t] / 100 * i
            }
            if ("vh" === a || "vw" === a) {
                return ("vh" === a ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * i
            }
            return i
        }

        function we(e, t, n, o) {
            var r = [0, 0],
                i = -1 !== ["right", "left"].indexOf(o),
                a = e.split(/(\+|\-)/).map(function (e) {
                    return e.trim()
                }),
                s = a.indexOf(Y(a, function (e) {
                    return -1 !== e.search(/,|\s/)
                }));
            a[s] && -1 === a[s].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
            var f = /\s*,\s*|\s+/,
                p = -1 !== s ? [a.slice(0, s).concat([a[s].split(f)[0]]), [a[s].split(f)[1]].concat(a.slice(s + 1))] : [a];
            return (p = p.map(function (e, o) {
                var r = (1 === o ? !i : i) ? "height" : "width",
                    a = !1;
                return e.reduce(function (e, t) {
                    return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, a = !0, e) : a ? (e[e.length - 1] += t, a = !1, e) : e.concat(t)
                }, []).map(function (e) {
                    return be(e, r, t, n)
                })
            })).forEach(function (e, t) {
                e.forEach(function (n, o) {
                    te(n) && (r[t] += n * ("-" === e[o - 1] ? -1 : 1))
                })
            }), r
        }

        function ye(e, t) {
            var n = t.offset,
                o = e.placement,
                r = e.offsets,
                i = r.popper,
                a = r.reference,
                s = o.split("-")[0],
                f = void 0;
            return f = te(+n) ? [+n, 0] : we(n, i, a, s), "left" === s ? (i.top += f[0], i.left -= f[1]) : "right" === s ? (i.top += f[0], i.left += f[1]) : "top" === s ? (i.left += f[0], i.top -= f[1]) : "bottom" === s && (i.left += f[0], i.top += f[1]), e.popper = i, e
        }

        function Ee(e, t) {
            var n = t.boundariesElement || v(e.instance.popper);
            e.instance.reference === n && (n = v(n));
            var o = z("transform"),
                r = e.instance.popper.style,
                i = r.top,
                a = r.left,
                s = r[o];
            r.top = "", r.left = "", r[o] = "";
            var f = P(e.instance.popper, e.instance.reference, t.padding, n, e.positionFixed);
            r.top = i, r.left = a, r[o] = s, t.boundaries = f;
            var p = t.priority,
                l = e.offsets.popper,
                u = {
                    primary: function (e) {
                        var n = l[e];
                        return l[e] < f[e] && !t.escapeWithReference && (n = Math.max(l[e], f[e])), C({}, e, n)
                    },
                    secondary: function (e) {
                        var n = "right" === e ? "left" : "top",
                            o = l[n];
                        return l[e] > f[e] && !t.escapeWithReference && (o = Math.min(l[n], f[e] - ("right" === e ? l.width : l.height))), C({}, n, o)
                    }
                };
            return p.forEach(function (e) {
                var t = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
                l = D({}, l, u[t](e))
            }), e.offsets.popper = l, e
        }

        function xe(e) {
            var t = e.placement,
                n = t.split("-")[0],
                o = t.split("-")[1];
            if (o) {
                var r = e.offsets,
                    i = r.reference,
                    a = r.popper,
                    s = -1 !== ["bottom", "top"].indexOf(n),
                    f = s ? "left" : "top",
                    p = s ? "width" : "height",
                    l = {
                        start: C({}, f, i[f]),
                        end: C({}, f, i[f] + i[p] - a[p])
                    };
                e.offsets.popper = D({}, a, l[o])
            }
            return e
        }

        function Oe(e) {
            if (!pe(e.instance.modifiers, "hide", "preventOverflow")) return e;
            var t = e.offsets.reference,
                n = Y(e.instance.modifiers, function (e) {
                    return "preventOverflow" === e.name
                }).boundaries;
            if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
                if (!0 === e.hide) return e;
                e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
            } else {
                if (!1 === e.hide) return e;
                e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
            }
            return e
        }

        function Le(e) {
            var t = e.placement,
                n = t.split("-")[0],
                o = e.offsets,
                r = o.popper,
                i = o.reference,
                a = -1 !== ["left", "right"].indexOf(n),
                s = -1 === ["top", "left"].indexOf(n);
            return r[a ? "left" : "top"] = i[n] - (s ? r[a ? "width" : "height"] : 0), e.placement = R(t), e.offsets.popper = N(r), e
        }
        var Te = {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: xe
                },
                offset: {
                    order: 200,
                    enabled: !0,
                    fn: ye,
                    offset: 0
                },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: Ee,
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent"
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: ge
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: le,
                    element: "[x-arrow]"
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: ve,
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport",
                    flipVariations: !1,
                    flipVariationsByContent: !1
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: Le
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: Oe
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: fe,
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right"
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: re,
                    onLoad: ie,
                    gpuAcceleration: void 0
                }
            },
            Me = {
                placement: "bottom",
                positionFixed: !1,
                eventsEnabled: !0,
                removeOnDestroy: !1,
                onCreate: function () {},
                onUpdate: function () {},
                modifiers: Te
            },
            Ce = function () {
                function e(t, n) {
                    var o = this,
                        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    T(this, e), this.scheduleUpdate = function () {
                        return requestAnimationFrame(o.update)
                    }, this.update = f(this.update.bind(this)), this.options = D({}, e.Defaults, r), this.state = {
                        isDestroyed: !1,
                        isCreated: !1,
                        scrollParents: []
                    }, this.reference = t && t.jquery ? t[0] : t, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(D({}, e.Defaults.modifiers, r.modifiers)).forEach(function (t) {
                        o.options.modifiers[t] = D({}, e.Defaults.modifiers[t] || {}, r.modifiers ? r.modifiers[t] : {})
                    }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
                        return D({
                            name: e
                        }, o.options.modifiers[e])
                    }).sort(function (e, t) {
                        return e.order - t.order
                    }), this.modifiers.forEach(function (e) {
                        e.enabled && p(e.onLoad) && e.onLoad(o.reference, o.popper, o.options, e, o.state)
                    }), this.update();
                    var i = this.options.eventsEnabled;
                    i && this.enableEventListeners(), this.state.eventsEnabled = i
                }
                return M(e, [{
                    key: "update",
                    value: function () {
                        return K.call(this)
                    }
                }, {
                    key: "destroy",
                    value: function () {
                        return G.call(this)
                    }
                }, {
                    key: "enableEventListeners",
                    value: function () {
                        return Z.call(this)
                    }
                }, {
                    key: "disableEventListeners",
                    value: function () {
                        return ee.call(this)
                    }
                }]), e
            }();
        Ce.Utils = ("undefined" != typeof window ? window : e).PopperUtils, Ce.placements = de, Ce.Defaults = Me;
        var De = Ce;
        exports.default = De;
    }, {}],
    "BK9G": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var t = e(require("popper.js"));

        function e(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function n() {
            return (n = Object.assign || function (t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                }
                return t
            }).apply(this, arguments)
        }
        var r = "4.3.5",
            i = "undefined" != typeof window && "undefined" != typeof document,
            o = i ? navigator.userAgent : "",
            a = /MSIE |Trident\//.test(o),
            s = /UCBrowser\//.test(o),
            p = i && /iPhone|iPad|iPod/.test(navigator.platform) && !window.MSStream,
            c = {
                a11y: !0,
                allowHTML: !0,
                animateFill: !0,
                animation: "shift-away",
                appendTo: function () {
                    return document.body
                },
                aria: "describedby",
                arrow: !1,
                arrowType: "sharp",
                boundary: "scrollParent",
                content: "",
                delay: 0,
                distance: 10,
                duration: [325, 275],
                flip: !0,
                flipBehavior: "flip",
                flipOnUpdate: !1,
                followCursor: !1,
                hideOnClick: !0,
                ignoreAttributes: !1,
                inertia: !1,
                interactive: !1,
                interactiveBorder: 2,
                interactiveDebounce: 0,
                lazy: !0,
                maxWidth: 350,
                multiple: !1,
                offset: 0,
                onHidden: function () {},
                onHide: function () {},
                onMount: function () {},
                onShow: function () {},
                onShown: function () {},
                onTrigger: function () {},
                placement: "top",
                popperOptions: {},
                role: "tooltip",
                showOnInit: !1,
                size: "regular",
                sticky: !1,
                target: "",
                theme: "dark",
                touch: !0,
                touchHold: !1,
                trigger: "mouseenter focus",
                triggerTarget: null,
                updateDuration: 0,
                wait: null,
                zIndex: 9999
            },
            u = ["arrow", "arrowType", "boundary", "distance", "flip", "flipBehavior", "flipOnUpdate", "offset", "placement", "popperOptions"],
            l = i ? Element.prototype : {},
            d = l.matches || l.matchesSelector || l.webkitMatchesSelector || l.mozMatchesSelector || l.msMatchesSelector;

        function f(t) {
            return [].slice.call(t)
        }

        function v(t, e) {
            return m(t, function (t) {
                return d.call(t, e)
            })
        }

        function m(t, e) {
            for (; t;) {
                if (e(t)) return t;
                t = t.parentElement
            }
            return null
        }
        var b = {
                passive: !0
            },
            h = 4,
            y = "x-placement",
            g = "x-out-of-boundaries",
            w = "tippy-iOS",
            A = "tippy-active",
            E = "tippy-popper",
            C = "tippy-tooltip",
            L = "tippy-content",
            I = "tippy-backdrop",
            T = "tippy-arrow",
            x = "tippy-roundarrow",
            S = ".".concat(E),
            O = ".".concat(C),
            k = ".".concat(L),
            M = ".".concat(I),
            _ = ".".concat(T),
            V = ".".concat(x),
            H = !1;

        function N() {
            H || (H = !0, p && document.body.classList.add(w), window.performance && document.addEventListener("mousemove", D))
        }
        var z = 0;

        function D() {
            var t = performance.now();
            t - z < 20 && (H = !1, document.removeEventListener("mousemove", D), p || document.body.classList.remove(w)), z = t
        }

        function P() {
            var t = document.activeElement;
            t && t.blur && t._tippy && t.blur()
        }

        function q() {
            document.addEventListener("touchstart", N, b), window.addEventListener("blur", P)
        }
        var B = Object.keys(c);

        function F(t) {
            return B.reduce(function (e, n) {
                var r = (t.getAttribute("data-tippy-".concat(n)) || "").trim();
                if (!r) return e;
                if ("content" === n) e[n] = r;
                else try {
                    e[n] = JSON.parse(r)
                } catch (i) {
                    e[n] = r
                }
                return e
            }, {})
        }

        function j(t) {
            var e = {
                isVirtual: !0,
                attributes: t.attributes || {},
                contains: function () {},
                setAttribute: function (e, n) {
                    t.attributes[e] = n
                },
                getAttribute: function (e) {
                    return t.attributes[e]
                },
                removeAttribute: function (e) {
                    delete t.attributes[e]
                },
                hasAttribute: function (e) {
                    return e in t.attributes
                },
                addEventListener: function () {},
                removeEventListener: function () {},
                classList: {
                    classNames: {},
                    add: function (e) {
                        t.classList.classNames[e] = !0
                    },
                    remove: function (e) {
                        delete t.classList.classNames[e]
                    },
                    contains: function (e) {
                        return e in t.classList.classNames
                    }
                }
            };
            for (var n in e) t[n] = e[n]
        }

        function U(t) {
            return "[object Object]" === {}.toString.call(t) && !t.addEventListener
        }

        function W(t) {
            return !!t._tippy && !d.call(t, S)
        }

        function R(t, e) {
            return {}.hasOwnProperty.call(t, e)
        }

        function X(t) {
            if (Z(t)) return [t];
            if (t instanceof NodeList) return f(t);
            if (Array.isArray(t)) return t;
            try {
                return f(document.querySelectorAll(t))
            } catch (e) {
                return []
            }
        }

        function Y(t, e, n) {
            if (Array.isArray(t)) {
                var r = t[e];
                return null == r ? n : r
            }
            return t
        }

        function J(t, e) {
            return 0 === e ? t : function (r) {
                clearTimeout(n), n = setTimeout(function () {
                    t(r)
                }, e)
            };
            var n
        }

        function G(t, e) {
            return t && t.modifiers && t.modifiers[e]
        }

        function K(t, e) {
            return t.indexOf(e) > -1
        }

        function Q(t) {
            return t instanceof Element
        }

        function Z(t) {
            return !(!t || !R(t, "isVirtual")) || Q(t)
        }

        function $() {
            return "innerHTML"
        }

        function tt(t, e) {
            return "function" == typeof t ? t.apply(null, e) : t
        }

        function et(t, e) {
            t.filter(function (t) {
                return "flip" === t.name
            })[0].enabled = e
        }

        function nt(t) {
            return !Q(t) || d.call(t, "a[href],area[href],button,details,input,textarea,select,iframe,[tabindex]") && !t.hasAttribute("disabled")
        }

        function rt() {
            return document.createElement("div")
        }

        function it(t, e) {
            t.forEach(function (t) {
                t && (t.style.transitionDuration = "".concat(e, "ms"))
            })
        }

        function ot(t, e) {
            t.forEach(function (t) {
                t && t.setAttribute("data-state", e)
            })
        }

        function at(t, e) {
            var r = n({}, e, {
                content: tt(e.content, [t])
            }, e.ignoreAttributes ? {} : F(t));
            return (r.arrow || s) && (r.animateFill = !1), r
        }

        function st(t, e) {
            Object.keys(t).forEach(function (t) {
                if (!R(e, t)) throw new Error("[tippy]: `".concat(t, "` is not a valid option"))
            })
        }

        function pt(t, e) {
            t[$()] = Q(e) ? e[$()] : e
        }

        function ct(t, e) {
            if (Q(e.content)) pt(t, ""), t.appendChild(e.content);
            else if ("function" != typeof e.content) {
                t[e.allowHTML ? "innerHTML" : "textContent"] = e.content
            }
        }

        function ut(t) {
            return {
                tooltip: t.querySelector(O),
                backdrop: t.querySelector(M),
                content: t.querySelector(k),
                arrow: t.querySelector(_) || t.querySelector(V)
            }
        }

        function lt(t) {
            t.setAttribute("data-inertia", "")
        }

        function dt(t) {
            t.removeAttribute("data-inertia")
        }

        function ft(t) {
            var e = rt();
            return "round" === t ? (e.className = x, pt(e, '<svg viewBox="0 0 18 7" xmlns="http://www.w3.org/2000/svg"><path d="M0 7s2.021-.015 5.253-4.218C6.584 1.051 7.797.007 9 0c1.203-.007 2.416 1.035 3.761 2.782C16.012 7.005 18 7 18 7H0z"/></svg>')) : e.className = T, e
        }

        function vt() {
            var t = rt();
            return t.className = I, t.setAttribute("data-state", "hidden"), t
        }

        function mt(t, e) {
            t.setAttribute("tabindex", "-1"), e.setAttribute("data-interactive", "")
        }

        function bt(t, e) {
            t.removeAttribute("tabindex"), e.removeAttribute("data-interactive")
        }

        function ht(t, e, n) {
            var r = s && void 0 !== document.body.style.webkitTransition ? "webkitTransitionEnd" : "transitionend";
            t[e + "EventListener"](r, n)
        }

        function yt(t) {
            var e = t.getAttribute(y);
            return e ? e.split("-")[0] : ""
        }

        function gt(t) {
            t.offsetHeight
        }

        function wt(t, e, n) {
            n.split(" ").forEach(function (n) {
                t.classList[e](n + "-theme")
            })
        }

        function At(t, e) {
            var n = rt();
            n.className = E, n.id = "tippy-".concat(t), n.style.zIndex = "" + e.zIndex, n.style.position = "absolute", n.style.top = "0", n.style.left = "0", e.role && n.setAttribute("role", e.role);
            var r = rt();
            r.className = C, r.style.maxWidth = e.maxWidth + ("number" == typeof e.maxWidth ? "px" : ""), r.setAttribute("data-size", e.size), r.setAttribute("data-animation", e.animation), r.setAttribute("data-state", "hidden"), wt(r, "add", e.theme);
            var i = rt();
            return i.className = L, i.setAttribute("data-state", "hidden"), e.interactive && mt(n, r), e.arrow && r.appendChild(ft(e.arrowType)), e.animateFill && (r.appendChild(vt()), r.setAttribute("data-animatefill", "")), e.inertia && lt(r), ct(i, e), r.appendChild(i), n.appendChild(r), n
        }

        function Et(t, e, n) {
            var r = ut(t),
                i = r.tooltip,
                o = r.content,
                a = r.backdrop,
                s = r.arrow;
            t.style.zIndex = "" + n.zIndex, i.setAttribute("data-size", n.size), i.setAttribute("data-animation", n.animation), i.style.maxWidth = n.maxWidth + ("number" == typeof n.maxWidth ? "px" : ""), n.role ? t.setAttribute("role", n.role) : t.removeAttribute("role"), e.content !== n.content && ct(o, n), !e.animateFill && n.animateFill ? (i.appendChild(vt()), i.setAttribute("data-animatefill", "")) : e.animateFill && !n.animateFill && (i.removeChild(a), i.removeAttribute("data-animatefill")), !e.arrow && n.arrow ? i.appendChild(ft(n.arrowType)) : e.arrow && !n.arrow && i.removeChild(s), e.arrow && n.arrow && e.arrowType !== n.arrowType && i.replaceChild(ft(n.arrowType), s), !e.interactive && n.interactive ? mt(t, i) : e.interactive && !n.interactive && bt(t, i), !e.inertia && n.inertia ? lt(i) : e.inertia && !n.inertia && dt(i), e.theme !== n.theme && (wt(i, "remove", e.theme), wt(i, "add", n.theme))
        }

        function Ct() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                e = t.exclude,
                n = t.duration;
            f(document.querySelectorAll(S)).forEach(function (t) {
                var r = t._tippy;
                if (r) {
                    var i = !1;
                    e && (i = W(e) ? r.reference === e : t === e.popper), i || r.hide(n)
                }
            })
        }

        function Lt(t, e, n, r) {
            if (!t) return !0;
            var i = n.clientX,
                o = n.clientY,
                a = r.interactiveBorder,
                s = r.distance,
                p = e.top - o > ("top" === t ? a + s : a),
                c = o - e.bottom > ("bottom" === t ? a + s : a),
                u = e.left - i > ("left" === t ? a + s : a),
                l = i - e.right > ("right" === t ? a + s : a);
            return p || c || u || l
        }

        function It(t) {
            return -(t - 10) + "px"
        }
        var Tt = 1,
            xt = [];

        function St(e, r) {
            var i, o, s, p, l, d = at(e, r);
            if (!d.multiple && e._tippy) return null;
            var w, E, C, L, I = !1,
                T = !1,
                x = !1,
                O = !1,
                k = [],
                M = J(ct, d.interactiveDebounce),
                _ = Tt++,
                V = At(_, d),
                N = ut(V),
                z = {
                    id: _,
                    reference: e,
                    popper: V,
                    popperChildren: N,
                    popperInstance: null,
                    props: d,
                    state: {
                        isEnabled: !0,
                        isVisible: !1,
                        isDestroyed: !1,
                        isMounted: !1,
                        isShown: !1
                    },
                    clearDelayTimeouts: Mt,
                    set: _t,
                    setContent: function (t) {
                        _t({
                            content: t
                        })
                    },
                    show: Vt,
                    hide: Ht,
                    enable: function () {
                        z.state.isEnabled = !0
                    },
                    disable: function () {
                        z.state.isEnabled = !1
                    },
                    destroy: function (t) {
                        if (z.state.isDestroyed) return;
                        T = !0, z.state.isMounted && Ht(0);
                        $(), delete e._tippy;
                        var n = z.props.target;
                        n && t && Q(e) && f(e.querySelectorAll(n)).forEach(function (t) {
                            t._tippy && t._tippy.destroy()
                        });
                        z.popperInstance && z.popperInstance.destroy();
                        T = !1, z.state.isDestroyed = !0
                    }
                };
            return e._tippy = z, V._tippy = z, Z(), d.lazy || wt(), d.showOnInit && Ct(), !d.a11y || d.target || nt(q()) || q().setAttribute("tabindex", "0"), V.addEventListener("mouseenter", function (t) {
                z.props.interactive && z.state.isVisible && "mouseenter" === i && Ct(t, !0)
            }), V.addEventListener("mouseleave", function () {
                z.props.interactive && "mouseenter" === i && document.addEventListener("mousemove", M)
            }), z;

            function D() {
                document.removeEventListener("mousemove", rt)
            }

            function P() {
                document.body.removeEventListener("mouseleave", Ot), document.removeEventListener("mousemove", M), xt = xt.filter(function (t) {
                    return t !== M
                })
            }

            function q() {
                return z.props.triggerTarget || e
            }

            function B() {
                document.addEventListener("click", kt, !0)
            }

            function F() {
                document.removeEventListener("click", kt, !0)
            }

            function j() {
                return [z.popperChildren.tooltip, z.popperChildren.backdrop, z.popperChildren.content]
            }

            function U() {
                var t = z.props.followCursor;
                return t && "focus" !== i || H && "initial" === t
            }

            function W(t, e) {
                var n = z.popperChildren.tooltip;

                function r(t) {
                    t.target === n && (ht(n, "remove", r), e())
                }
                if (0 === t) return e();
                ht(n, "remove", C), ht(n, "add", r), C = r
            }

            function X(t, e) {
                var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                q().addEventListener(t, e, n), k.push({
                    eventType: t,
                    handler: e,
                    options: n
                })
            }

            function Z() {
                z.props.touchHold && !z.props.target && (X("touchstart", pt, b), X("touchend", lt, b)), z.props.trigger.trim().split(" ").forEach(function (t) {
                    if ("manual" !== t)
                        if (z.props.target) switch (t) {
                            case "mouseenter":
                                X("mouseover", ft), X("mouseout", vt);
                                break;
                            case "focus":
                                X("focusin", ft), X("focusout", vt);
                                break;
                            case "click":
                                X(t, ft)
                        } else switch (X(t, pt), t) {
                            case "mouseenter":
                                X("mouseleave", lt);
                                break;
                            case "focus":
                                X(a ? "focusout" : "blur", dt)
                        }
                })
            }

            function $() {
                k.forEach(function (t) {
                    var e = t.eventType,
                        n = t.handler,
                        r = t.options;
                    q().removeEventListener(e, n, r)
                }), k = []
            }

            function rt(t) {
                var r = o = t,
                    i = r.clientX,
                    a = r.clientY;
                if (L) {
                    var s = m(t.target, function (t) {
                            return t === e
                        }),
                        p = e.getBoundingClientRect(),
                        c = z.props.followCursor,
                        u = "horizontal" === c,
                        l = "vertical" === c,
                        d = K(["top", "bottom"], yt(V)),
                        f = V.getAttribute(y),
                        v = !!f && !!f.split("-")[1],
                        b = d ? V.offsetWidth : V.offsetHeight,
                        h = b / 2,
                        g = d ? 0 : v ? b : h,
                        w = d ? v ? b : h : 0;
                    !s && z.props.interactive || (z.popperInstance.reference = n({}, z.popperInstance.reference, {
                        referenceNode: e,
                        clientWidth: 0,
                        clientHeight: 0,
                        getBoundingClientRect: function () {
                            return {
                                width: d ? b : 0,
                                height: d ? 0 : b,
                                top: (u ? p.top : a) - g,
                                bottom: (u ? p.bottom : a) + g,
                                left: (l ? p.left : i) - w,
                                right: (l ? p.right : i) + w
                            }
                        }
                    }), z.popperInstance.update()), "initial" === c && z.state.isVisible && D()
                }
            }

            function pt(t) {
                z.state.isEnabled && !mt(t) && (z.state.isVisible || (i = t.type, t instanceof MouseEvent && (o = t, xt.forEach(function (e) {
                    return e(t)
                }))), "click" === t.type && !1 !== z.props.hideOnClick && z.state.isVisible ? Ot() : Ct(t))
            }

            function ct(t) {
                var n = v(t.target, S) === V,
                    r = m(t.target, function (t) {
                        return t === e
                    });
                n || r || Lt(yt(V), V.getBoundingClientRect(), t, z.props) && (P(), Ot())
            }

            function lt(t) {
                if (!mt(t)) return z.props.interactive ? (document.body.addEventListener("mouseleave", Ot), document.addEventListener("mousemove", M), void xt.push(M)) : void Ot()
            }

            function dt(t) {
                t.target === q() && (z.props.interactive && t.relatedTarget && V.contains(t.relatedTarget) || Ot())
            }

            function ft(t) {
                v(t.target, z.props.target) && Ct(t)
            }

            function vt(t) {
                v(t.target, z.props.target) && Ot()
            }

            function mt(t) {
                var e = "ontouchstart" in window,
                    n = K(t.type, "touch"),
                    r = z.props.touchHold;
                return e && H && r && !n || H && !r && n
            }

            function bt() {
                !O && E && (O = !0, gt(V), E())
            }

            function wt() {
                var r = z.props.popperOptions,
                    i = z.popperChildren,
                    o = i.tooltip,
                    a = i.arrow,
                    s = G(r, "preventOverflow");

                function p(t) {
                    z.props.flip && !z.props.flipOnUpdate && (t.flipped && (z.popperInstance.options.placement = t.placement), et(z.popperInstance.modifiers, !1)), o.setAttribute(y, t.placement), !1 !== t.attributes[g] ? o.setAttribute(g, "") : o.removeAttribute(g), w && w !== t.placement && x && (o.style.transition = "none", requestAnimationFrame(function () {
                        o.style.transition = ""
                    })), w = t.placement, x = z.state.isVisible;
                    var e = yt(V),
                        r = o.style;
                    r.top = r.bottom = r.left = r.right = "", r[e] = It(z.props.distance);
                    var i = s && void 0 !== s.padding ? s.padding : h,
                        a = "number" == typeof i,
                        p = n({
                            top: a ? i : i.top,
                            bottom: a ? i : i.bottom,
                            left: a ? i : i.left,
                            right: a ? i : i.right
                        }, !a && i);
                    p[e] = a ? i + z.props.distance : (i[e] || 0) + z.props.distance, z.popperInstance.modifiers.filter(function (t) {
                        return "preventOverflow" === t.name
                    })[0].padding = p, L = p
                }
                var c = n({
                    eventsEnabled: !1,
                    placement: z.props.placement
                }, r, {
                    modifiers: n({}, r ? r.modifiers : {}, {
                        preventOverflow: n({
                            boundariesElement: z.props.boundary,
                            padding: h
                        }, s),
                        arrow: n({
                            element: a,
                            enabled: !!a
                        }, G(r, "arrow")),
                        flip: n({
                            enabled: z.props.flip,
                            padding: z.props.distance + h,
                            behavior: z.props.flipBehavior
                        }, G(r, "flip")),
                        offset: n({
                            offset: z.props.offset
                        }, G(r, "offset"))
                    }),
                    onCreate: function (t) {
                        p(t), bt(), r && r.onCreate && r.onCreate(t)
                    },
                    onUpdate: function (t) {
                        p(t), bt(), r && r.onUpdate && r.onUpdate(t)
                    }
                });
                z.popperInstance = new t.default(e, V, c)
            }

            function Ct(t, e) {
                if (Mt(), !z.state.isVisible) {
                    if (z.props.target) return function (t) {
                        if (t) {
                            var e = v(t.target, z.props.target);
                            e && !e._tippy && St(e, n({}, z.props, {
                                content: tt(r.content, [e]),
                                appendTo: r.appendTo,
                                target: "",
                                showOnInit: !0
                            }))
                        }
                    }(t);
                    if (I = !0, t && !e && z.props.onTrigger(z, t), z.props.wait) return z.props.wait(z, t);
                    U() && !z.state.isMounted && (z.popperInstance || wt(), document.addEventListener("mousemove", rt)), B();
                    var i = Y(z.props.delay, 0, c.delay);
                    i ? s = setTimeout(function () {
                        Vt()
                    }, i) : Vt()
                }
            }

            function Ot() {
                if (Mt(), !z.state.isVisible) return D(), void F();
                I = !1;
                var t = Y(z.props.delay, 1, c.delay);
                t ? p = setTimeout(function () {
                    z.state.isVisible && Ht()
                }, t) : l = requestAnimationFrame(function () {
                    Ht()
                })
            }

            function kt(t) {
                if (!z.props.interactive || !V.contains(t.target)) {
                    if (q().contains(t.target)) {
                        if (H) return;
                        if (z.state.isVisible && K(z.props.trigger, "click")) return
                    }!0 === z.props.hideOnClick && (Mt(), Ht())
                }
            }

            function Mt() {
                clearTimeout(s), clearTimeout(p), cancelAnimationFrame(l)
            }

            function _t(t) {
                st(t = t || {}, c), $();
                var r = z.props,
                    i = at(e, n({}, z.props, {}, t, {
                        ignoreAttributes: !0
                    }));
                i.ignoreAttributes = R(t, "ignoreAttributes") ? t.ignoreAttributes || !1 : r.ignoreAttributes, z.props = i, Z(), P(), M = J(ct, i.interactiveDebounce), Et(V, r, i), z.popperChildren = ut(V), z.popperInstance && (u.some(function (e) {
                    return R(t, e) && t[e] !== r[e]
                }) ? (z.popperInstance.destroy(), wt(), z.state.isVisible && z.popperInstance.enableEventListeners(), z.props.followCursor && o && rt(o)) : z.popperInstance.update())
            }

            function Vt() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Y(z.props.duration, 0, c.duration[1]);
                if (!z.state.isDestroyed && z.state.isEnabled && (!H || z.props.touch) && !q().hasAttribute("disabled") && !1 !== z.props.onShow(z)) {
                    B(), V.style.visibility = "visible", z.state.isVisible = !0, z.props.interactive && q().classList.add(A);
                    var n = j();
                    it(n.concat(V), 0), E = function () {
                            if (z.state.isVisible) {
                                var r = U();
                                r && o ? rt(o) : r || z.popperInstance.update(), z.popperChildren.backdrop && (z.popperChildren.content.style.transitionDelay = Math.round(t / 12) + "ms"), z.props.sticky && function () {
                                        it([V], a ? 0 : z.props.updateDuration);
                                        var t = e.getBoundingClientRect();
                                        ! function n() {
                                            var r = e.getBoundingClientRect();
                                            t.top === r.top && t.right === r.right && t.bottom === r.bottom && t.left === r.left || z.popperInstance.scheduleUpdate(), t = r, z.state.isMounted && requestAnimationFrame(n)
                                        }()
                                    }(), it([V], z.props.updateDuration), it(n, t), ot(n, "visible"),
                                    function (t, e) {
                                        W(t, e)
                                    }(t, function () {
                                        z.props.aria && q().setAttribute("aria-".concat(z.props.aria), V.id), z.props.onShown(z), z.state.isShown = !0
                                    })
                            }
                        },
                        function () {
                            O = !1;
                            var t = U();
                            z.popperInstance ? (et(z.popperInstance.modifiers, z.props.flip), t || (z.popperInstance.reference = e, z.popperInstance.enableEventListeners()), z.popperInstance.scheduleUpdate()) : (wt(), t || z.popperInstance.enableEventListeners());
                            var n = z.props.appendTo,
                                r = "parent" === n ? e.parentNode : tt(n, [e]);
                            r.contains(V) || (r.appendChild(V), z.props.onMount(z), z.state.isMounted = !0)
                        }()
                }
            }

            function Ht() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Y(z.props.duration, 1, c.duration[1]);
                if (!z.state.isDestroyed && (z.state.isEnabled || T) && (!1 !== z.props.onHide(z) || T)) {
                    F(), V.style.visibility = "hidden", z.state.isVisible = !1, z.state.isShown = !1, x = !1, z.props.interactive && q().classList.remove(A);
                    var e = j();
                    it(e, t), ot(e, "hidden"),
                        function (t, e) {
                            W(t, function () {
                                !z.state.isVisible && V.parentNode && V.parentNode.contains(V) && e()
                            })
                        }(t, function () {
                            I || D(), z.props.aria && q().removeAttribute("aria-".concat(z.props.aria)), z.popperInstance.disableEventListeners(), z.popperInstance.options.placement = z.props.placement, V.parentNode.removeChild(V), z.props.onHidden(z), z.state.isMounted = !1
                        })
                }
            }
        }

        function Ot(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                r = e.delay,
                i = void 0 === r ? t[0].props.delay : r,
                o = e.duration,
                a = void 0 === o ? 0 : o,
                s = !1;

            function p(t) {
                s = t, d()
            }

            function c(e) {
                e._originalProps.onShow(e), t.forEach(function (t) {
                    t.set({
                        duration: a
                    }), t.state.isVisible && t.hide()
                }), p(!0)
            }

            function u(t) {
                t._originalProps.onHide(t), p(!1)
            }

            function l(t) {
                t._originalProps.onShown(t), t.set({
                    duration: t._originalProps.duration
                })
            }

            function d() {
                t.forEach(function (t) {
                    t.set({
                        onShow: c,
                        onShown: l,
                        onHide: u,
                        delay: s ? [0, Array.isArray(i) ? i[1] : i] : i,
                        duration: s ? a : t._originalProps.duration
                    })
                })
            }
            t.forEach(function (t) {
                t._originalProps ? t.set(t._originalProps) : t._originalProps = n({}, t.props)
            }), d()
        }
        var kt = !1;

        function Mt(t, e) {
            st(e || {}, c), kt || (q(), kt = !0);
            var r = n({}, c, {}, e);
            U(t) && j(t);
            var i = X(t).reduce(function (t, e) {
                var n = e && St(e, r);
                return n && t.push(n), t
            }, []);
            return Z(t) ? i[0] : i
        }

        function _t() {
            f(document.querySelectorAll("[data-tippy]")).forEach(function (t) {
                var e = t.getAttribute("data-tippy");
                e && Mt(t, {
                    content: e
                })
            })
        }
        Mt.version = r, Mt.defaults = c, Mt.setDefaults = function (t) {
            Object.keys(t).forEach(function (e) {
                c[e] = t[e]
            })
        }, Mt.hideAll = Ct, Mt.group = Ot, i && setTimeout(_t);
        var Vt = Mt;
        exports.default = Vt;
    }, {
        "popper.js": "CD2u"
    }],
    "RYfA": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.createTooltip = r;
        var e = t(require("tippy.js/esm"));

        function t(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function r(t, r) {
            (0, e.default)(t, {
                content: r,
                arrow: !0,
                animateFill: !1,
                animation: "fade",
                delay: [0, 250],
                duration: [0, 300],
                interactive: !0,
                interactiveBorder: 5,
                interactiveDebounce: 100,
                placement: "top-start",
                size: "large",
                theme: "light-border",
                popperOptions: {
                    modifiers: {
                        preventOverflow: {
                            boundariesElement: "viewport"
                        }
                    }
                },
                onShow: function (t) {
                    e.default.hideAll({
                        exclude: t
                    })
                }
            }), t.className += " ltx_engrafo_tooltip"
        }
    }, {
        "tippy.js/esm": "BK9G"
    }],
    "QzZA": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = l;
        var e = require("./utils/tooltips");

        function t(e, t) {
            var r = t.getAttribute("href");
            if (r) return e.querySelector("*[id='".concat(r.slice(1), "']"))
        }

        function r(e) {
            var t = document.createElement("div");
            return t.className = "ltx_bibitem", t.innerHTML = e.innerHTML, t.querySelector(".ltx_tag_bibitem").remove(), t
        }

        function l(l) {
            var i = l.querySelectorAll(".ltx_cite"),
                n = !0,
                a = !1,
                o = void 0;
            try {
                for (var u, c = i[Symbol.iterator](); !(n = (u = c.next()).done); n = !0) {
                    var f = u.value.querySelectorAll("a.ltx_ref"),
                        v = !0,
                        y = !1,
                        s = void 0;
                    try {
                        for (var b, d = f[Symbol.iterator](); !(v = (b = d.next()).done); v = !0) {
                            var _ = b.value,
                                m = t(l, _);
                            if (m) {
                                var x = r(m);
                                (0, e.createTooltip)(_, x);
                                var h = m.querySelector("a");
                                h ? (_.setAttribute("href", h.getAttribute("href")), _.setAttribute("target", "_blank")) : (_.addEventListener("click", function (e) {
                                    e.preventDefault()
                                }), _.className += " engrafo_not_a_link")
                            }
                        }
                    } catch (S) {
                        y = !0, s = S
                    } finally {
                        try {
                            v || null == d.return || d.return()
                        } finally {
                            if (y) throw s
                        }
                    }
                }
            } catch (S) {
                a = !0, o = S
            } finally {
                try {
                    n || null == c.return || c.return()
                } finally {
                    if (a) throw o
                }
            }
        }
    }, {
        "./utils/tooltips": "RYfA"
    }],
    "ViSy": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = t;
        var e = require("./utils/tooltips");

        function t(t) {
            var r = t.querySelectorAll(".ltx_note"),
                o = !0,
                l = !1,
                a = void 0;
            try {
                for (var n, u = r[Symbol.iterator](); !(o = (n = u.next()).done); o = !0) {
                    var c = n.value,
                        i = c.querySelector(".ltx_note_mark").cloneNode(!0);
                    i.className = "ltx_engrafo_note_mark_tooltip", c.appendChild(i);
                    var _ = c.querySelector(".ltx_note_content").cloneNode(!0),
                        v = _.querySelector(".ltx_note_mark");
                    v && v.remove();
                    var y = _.querySelector(".ltx_tag");
                    y && y.remove(), (0, e.createTooltip)(i, _)
                }
            } catch (d) {
                l = !0, a = d
            } finally {
                try {
                    o || null == u.return || u.return()
                } finally {
                    if (l) throw a
                }
            }
        }
    }, {
        "./utils/tooltips": "RYfA"
    }],
    "vZDL": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = r;
        var e = u(require("./citations")),
            t = u(require("./footnotes"));

        function u(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function r(u) {
            (0, e.default)(u), (0, t.default)(u)
        }
    }, {
        "./citations": "QzZA",
        "./footnotes": "ViSy"
    }],
    "rEqs": [function (require, module, exports) {
        "use strict";
        var e = t(require("./main"));

        function t(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(0, e.default)(document.querySelector(".ltx_page_main"));
    }, {
        "./main": "vZDL"
    }]
}, {}, ["rEqs"], null)
//# sourceMappingURL=/javascript/index.js.map
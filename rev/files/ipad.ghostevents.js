
define('ipad.ghostevents', ['require'], function(require) {
    var e = !1
      , t = null;
    function n(t) {
        e && c.evtInScope(t) && (t.stopPropagation(),
        t.stopImmediatePropagation())
    }
    function o(t) {
        e && c.evtInScope(t) && (t.preventDefault(),
        t.stopPropagation(),
        t.stopImmediatePropagation())
    }
    var c = {
        isGhostEvent: function(e) {
            return !1
        },
        evtInScope: function(e) {
            return !1
        }
    };
    return document.addEventListener("mousedown", function(o) {
        c.evtInScope(o) && (t = document.activeElement,
        e = c.isGhostEvent(o),
        n(o))
    }, !0),
    document.addEventListener("mouseup", n, !0),
    document.addEventListener("click", function(n) {
        o(n),
        e && document.activeElement !== t && (document.activeElement && document.activeElement.blur(),
        t && t.focus()),
        e = !1
    }, !0),
    document.addEventListener("focus", o, !0),
    document.addEventListener("blur", o, !0),
    c
});
!function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document)
            throw new Error("jQuery requires a window with a document");
        return t(e)
    }
    : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";
    var n = []
      , r = Object.getPrototypeOf
      , i = n.slice
      , o = n.flat ? function(e) {
        return n.flat.call(e)
    }
    : function(e) {
        return n.concat.apply([], e)
    }
      , a = n.push
      , s = n.indexOf
      , u = {}
      , l = u.toString
      , c = u.hasOwnProperty
      , f = c.toString
      , p = f.call(Object)
      , d = {}
      , h = function(e) {
        return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item
    }
      , g = function(e) {
        return null != e && e === e.window
    }
      , v = e.document
      , y = {
        type: !0,
        src: !0,
        nonce: !0,
        noModule: !0
    };
    function m(e, t, n) {
        var r, i, o = (n = n || v).createElement("script");
        if (o.text = e,
        t)
            for (r in y)
                (i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
        n.head.appendChild(o).parentNode.removeChild(o)
    }
    function x(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? u[l.call(e)] || "object" : typeof e
    }
    var b = "3.6.0"
      , w = function(e, t) {
        return new w.fn.init(e,t)
    };
    function T(e) {
        var t = !!e && "length"in e && e.length
          , n = x(e);
        return !h(e) && !g(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }
    w.fn = w.prototype = {
        jquery: b,
        constructor: w,
        length: 0,
        toArray: function() {
            return i.call(this)
        },
        get: function(e) {
            return null == e ? i.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = w.merge(this.constructor(), e);
            return t.prevObject = this,
            t
        },
        each: function(e) {
            return w.each(this, e)
        },
        map: function(e) {
            return this.pushStack(w.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(i.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        even: function() {
            return this.pushStack(w.grep(this, function(e, t) {
                return (t + 1) % 2
            }))
        },
        odd: function() {
            return this.pushStack(w.grep(this, function(e, t) {
                return t % 2
            }))
        },
        eq: function(e) {
            var t = this.length
              , n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: a,
        sort: n.sort,
        splice: n.splice
    },
    w.extend = w.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof a && (l = a,
        a = arguments[s] || {},
        s++),
        "object" == typeof a || h(a) || (a = {}),
        s === u && (a = this,
        s--); s < u; s++)
            if (null != (e = arguments[s]))
                for (t in e)
                    r = e[t],
                    "__proto__" !== t && a !== r && (l && r && (w.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t],
                    o = i && !Array.isArray(n) ? [] : i || w.isPlainObject(n) ? n : {},
                    i = !1,
                    a[t] = w.extend(l, o, r)) : void 0 !== r && (a[t] = r));
        return a
    }
    ,
    w.extend({
        expando: "jQuery" + (b + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== l.call(e)) && (!(t = r(e)) || "function" == typeof (n = c.call(t, "constructor") && t.constructor) && f.call(n) === p)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        },
        globalEval: function(e, t, n) {
            m(e, {
                nonce: t && t.nonce
            }, n)
        },
        each: function(e, t) {
            var n, r = 0;
            if (T(e))
                for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++)
                    ;
            else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r]))
                        break;
            return e
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (T(Object(e)) ? w.merge(n, "string" == typeof e ? [e] : e) : a.call(n, e)),
            n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : s.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++)
                e[i++] = t[r];
            return e.length = i,
            e
        },
        grep: function(e, t, n) {
            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)
                !t(e[i], i) !== a && r.push(e[i]);
            return r
        },
        map: function(e, t, n) {
            var r, i, a = 0, s = [];
            if (T(e))
                for (r = e.length; a < r; a++)
                    null != (i = t(e[a], a, n)) && s.push(i);
            else
                for (a in e)
                    null != (i = t(e[a], a, n)) && s.push(i);
            return o(s)
        },
        guid: 1,
        support: d
    }),
    "function" == typeof Symbol && (w.fn[Symbol.iterator] = n[Symbol.iterator]),
    w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        u["[object " + t + "]"] = t.toLowerCase()
    });
    var C = function(e) {
        var t, n, r, i, o, a, s, u, l, c, f, p, d, h, g, v, y, m, x, b = "sizzle" + 1 * new Date, w = e.document, T = 0, C = 0, E = ue(), S = ue(), k = ue(), A = ue(), N = function(e, t) {
            return e === t && (f = !0),
            0
        }, j = {}.hasOwnProperty, D = [], q = D.pop, L = D.push, H = D.push, O = D.slice, P = function(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
                if (e[n] === t)
                    return n;
            return -1
        }, R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", M = "[\\x20\\t\\r\\n\\f]", I = "(?:\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", W = "\\[[\\x20\\t\\r\\n\\f]*(" + I + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + M + "*\\]", F = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)", B = new RegExp(M + "+","g"), $ = new RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$","g"), _ = new RegExp("^[\\x20\\t\\r\\n\\f]*,[\\x20\\t\\r\\n\\f]*"), z = new RegExp("^[\\x20\\t\\r\\n\\f]*([>+~]|[\\x20\\t\\r\\n\\f])[\\x20\\t\\r\\n\\f]*"), U = new RegExp(M + "|>"), X = new RegExp(F), V = new RegExp("^" + I + "$"), G = {
            ID: new RegExp("^#(" + I + ")"),
            CLASS: new RegExp("^\\.(" + I + ")"),
            TAG: new RegExp("^(" + I + "|[*])"),
            ATTR: new RegExp("^" + W),
            PSEUDO: new RegExp("^" + F),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)","i"),
            bool: new RegExp("^(?:" + R + ")$","i"),
            needsContext: new RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)","i")
        }, Y = /HTML$/i, Q = /^(?:input|select|textarea|button)$/i, J = /^h\d$/i, K = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ee = /[+~]/, te = new RegExp("\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\([^\\r\\n\\f])","g"), ne = function(e, t) {
            var n = "0x" + e.slice(1) - 65536;
            return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
        }, re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ie = function(e, t) {
            return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
        }, oe = function() {
            p()
        }, ae = be(function(e) {
            return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
        }, {
            dir: "parentNode",
            next: "legend"
        });
        try {
            H.apply(D = O.call(w.childNodes), w.childNodes),
            D[w.childNodes.length].nodeType
        } catch (e) {
            H = {
                apply: D.length ? function(e, t) {
                    L.apply(e, O.call(t))
                }
                : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++]; )
                        ;
                    e.length = n - 1
                }
            }
        }
        function se(e, t, r, i) {
            var o, s, l, c, f, h, y, m = t && t.ownerDocument, w = t ? t.nodeType : 9;
            if (r = r || [],
            "string" != typeof e || !e || 1 !== w && 9 !== w && 11 !== w)
                return r;
            if (!i && (p(t),
            t = t || d,
            g)) {
                if (11 !== w && (f = Z.exec(e)))
                    if (o = f[1]) {
                        if (9 === w) {
                            if (!(l = t.getElementById(o)))
                                return r;
                            if (l.id === o)
                                return r.push(l),
                                r
                        } else if (m && (l = m.getElementById(o)) && x(t, l) && l.id === o)
                            return r.push(l),
                            r
                    } else {
                        if (f[2])
                            return H.apply(r, t.getElementsByTagName(e)),
                            r;
                        if ((o = f[3]) && n.getElementsByClassName && t.getElementsByClassName)
                            return H.apply(r, t.getElementsByClassName(o)),
                            r
                    }
                if (n.qsa && !A[e + " "] && (!v || !v.test(e)) && (1 !== w || "object" !== t.nodeName.toLowerCase())) {
                    if (y = e,
                    m = t,
                    1 === w && (U.test(e) || z.test(e))) {
                        for ((m = ee.test(e) && ye(t.parentNode) || t) === t && n.scope || ((c = t.getAttribute("id")) ? c = c.replace(re, ie) : t.setAttribute("id", c = b)),
                        s = (h = a(e)).length; s--; )
                            h[s] = (c ? "#" + c : ":scope") + " " + xe(h[s]);
                        y = h.join(",")
                    }
                    try {
                        return H.apply(r, m.querySelectorAll(y)),
                        r
                    } catch (t) {
                        A(e, !0)
                    } finally {
                        c === b && t.removeAttribute("id")
                    }
                }
            }
            return u(e.replace($, "$1"), t, r, i)
        }
        function ue() {
            var e = [];
            return function t(n, i) {
                return e.push(n + " ") > r.cacheLength && delete t[e.shift()],
                t[n + " "] = i
            }
        }
        function le(e) {
            return e[b] = !0,
            e
        }
        function ce(e) {
            var t = d.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                t = null
            }
        }
        function fe(e, t) {
            for (var n = e.split("|"), i = n.length; i--; )
                r.attrHandle[n[i]] = t
        }
        function pe(e, t) {
            var n = t && e
              , r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r)
                return r;
            if (n)
                for (; n = n.nextSibling; )
                    if (n === t)
                        return -1;
            return e ? 1 : -1
        }
        function de(e) {
            return function(t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }
        function he(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }
        function ge(e) {
            return function(t) {
                return "form"in t ? t.parentNode && !1 === t.disabled ? "label"in t ? "label"in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ae(t) === e : t.disabled === e : "label"in t && t.disabled === e
            }
        }
        function ve(e) {
            return le(function(t) {
                return t = +t,
                le(function(n, r) {
                    for (var i, o = e([], n.length, t), a = o.length; a--; )
                        n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }
        function ye(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }
        for (t in n = se.support = {},
        o = se.isXML = function(e) {
            var t = e && e.namespaceURI
              , n = e && (e.ownerDocument || e).documentElement;
            return !Y.test(t || n && n.nodeName || "HTML")
        }
        ,
        p = se.setDocument = function(e) {
            var t, i, a = e ? e.ownerDocument || e : w;
            return a != d && 9 === a.nodeType && a.documentElement ? (h = (d = a).documentElement,
            g = !o(d),
            w != d && (i = d.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", oe, !1) : i.attachEvent && i.attachEvent("onunload", oe)),
            n.scope = ce(function(e) {
                return h.appendChild(e).appendChild(d.createElement("div")),
                void 0 !== e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
            }),
            n.attributes = ce(function(e) {
                return e.className = "i",
                !e.getAttribute("className")
            }),
            n.getElementsByTagName = ce(function(e) {
                return e.appendChild(d.createComment("")),
                !e.getElementsByTagName("*").length
            }),
            n.getElementsByClassName = K.test(d.getElementsByClassName),
            n.getById = ce(function(e) {
                return h.appendChild(e).id = b,
                !d.getElementsByName || !d.getElementsByName(b).length
            }),
            n.getById ? (r.filter.ID = function(e) {
                var t = e.replace(te, ne);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }
            ,
            r.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && g) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }
            ) : (r.filter.ID = function(e) {
                var t = e.replace(te, ne);
                return function(e) {
                    var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }
            ,
            r.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && g) {
                    var n, r, i, o = t.getElementById(e);
                    if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === e)
                            return [o];
                        for (i = t.getElementsByName(e),
                        r = 0; o = i[r++]; )
                            if ((n = o.getAttributeNode("id")) && n.value === e)
                                return [o]
                    }
                    return []
                }
            }
            ),
            r.find.TAG = n.getElementsByTagName ? function(e, t) {
                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
            }
            : function(e, t) {
                var n, r = [], i = 0, o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i++]; )
                        1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }
            ,
            r.find.CLASS = n.getElementsByClassName && function(e, t) {
                if (void 0 !== t.getElementsByClassName && g)
                    return t.getElementsByClassName(e)
            }
            ,
            y = [],
            v = [],
            (n.qsa = K.test(d.querySelectorAll)) && (ce(function(e) {
                var t;
                h.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"),
                e.querySelectorAll("[selected]").length || v.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|" + R + ")"),
                e.querySelectorAll("[id~=" + b + "-]").length || v.push("~="),
                (t = d.createElement("input")).setAttribute("name", ""),
                e.appendChild(t),
                e.querySelectorAll("[name='']").length || v.push("\\[[\\x20\\t\\r\\n\\f]*name[\\x20\\t\\r\\n\\f]*=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"),
                e.querySelectorAll(":checked").length || v.push(":checked"),
                e.querySelectorAll("a#" + b + "+*").length || v.push(".#.+[+~]"),
                e.querySelectorAll("\\\f"),
                v.push("[\\r\\n\\f]")
            }),
            ce(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = d.createElement("input");
                t.setAttribute("type", "hidden"),
                e.appendChild(t).setAttribute("name", "D"),
                e.querySelectorAll("[name=d]").length && v.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?="),
                2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"),
                h.appendChild(e).disabled = !0,
                2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"),
                e.querySelectorAll("*,:x"),
                v.push(",.*:")
            })),
            (n.matchesSelector = K.test(m = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ce(function(e) {
                n.disconnectedMatch = m.call(e, "*"),
                m.call(e, "[s!='']:x"),
                y.push("!=", F)
            }),
            v = v.length && new RegExp(v.join("|")),
            y = y.length && new RegExp(y.join("|")),
            t = K.test(h.compareDocumentPosition),
            x = t || K.test(h.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e
                  , r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            }
            : function(e, t) {
                if (t)
                    for (; t = t.parentNode; )
                        if (t === e)
                            return !0;
                return !1
            }
            ,
            N = t ? function(e, t) {
                if (e === t)
                    return f = !0,
                    0;
                var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return r || (1 & (r = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e == d || e.ownerDocument == w && x(w, e) ? -1 : t == d || t.ownerDocument == w && x(w, t) ? 1 : c ? P(c, e) - P(c, t) : 0 : 4 & r ? -1 : 1)
            }
            : function(e, t) {
                if (e === t)
                    return f = !0,
                    0;
                var n, r = 0, i = e.parentNode, o = t.parentNode, a = [e], s = [t];
                if (!i || !o)
                    return e == d ? -1 : t == d ? 1 : i ? -1 : o ? 1 : c ? P(c, e) - P(c, t) : 0;
                if (i === o)
                    return pe(e, t);
                for (n = e; n = n.parentNode; )
                    a.unshift(n);
                for (n = t; n = n.parentNode; )
                    s.unshift(n);
                for (; a[r] === s[r]; )
                    r++;
                return r ? pe(a[r], s[r]) : a[r] == w ? -1 : s[r] == w ? 1 : 0
            }
            ,
            d) : d
        }
        ,
        se.matches = function(e, t) {
            return se(e, null, null, t)
        }
        ,
        se.matchesSelector = function(e, t) {
            if (p(e),
            n.matchesSelector && g && !A[t + " "] && (!y || !y.test(t)) && (!v || !v.test(t)))
                try {
                    var r = m.call(e, t);
                    if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                        return r
                } catch (e) {
                    A(t, !0)
                }
            return se(t, d, null, [e]).length > 0
        }
        ,
        se.contains = function(e, t) {
            return (e.ownerDocument || e) != d && p(e),
            x(e, t)
        }
        ,
        se.attr = function(e, t) {
            (e.ownerDocument || e) != d && p(e);
            var i = r.attrHandle[t.toLowerCase()]
              , o = i && j.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !g) : void 0;
            return void 0 !== o ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
        }
        ,
        se.escape = function(e) {
            return (e + "").replace(re, ie)
        }
        ,
        se.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }
        ,
        se.uniqueSort = function(e) {
            var t, r = [], i = 0, o = 0;
            if (f = !n.detectDuplicates,
            c = !n.sortStable && e.slice(0),
            e.sort(N),
            f) {
                for (; t = e[o++]; )
                    t === e[o] && (i = r.push(o));
                for (; i--; )
                    e.splice(r[i], 1)
            }
            return c = null,
            e
        }
        ,
        i = se.getText = function(e) {
            var t, n = "", r = 0, o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent)
                        return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)
                        n += i(e)
                } else if (3 === o || 4 === o)
                    return e.nodeValue
            } else
                for (; t = e[r++]; )
                    n += i(t);
            return n
        }
        ,
        (r = se.selectors = {
            cacheLength: 50,
            createPseudo: le,
            match: G,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(te, ne),
                    e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]),
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                    e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                    e[2] = n.slice(0, t)),
                    e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(te, ne).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    }
                    : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = E[e + " "];
                    return t || (t = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + e + "(" + M + "|$)")) && E(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, t, n) {
                    return function(r) {
                        var i = se.attr(r, e);
                        return null == i ? "!=" === t : !t || (i += "",
                        "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace(B, " ") + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"))
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3)
                      , a = "last" !== e.slice(-4)
                      , s = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode
                    }
                    : function(t, n, u) {
                        var l, c, f, p, d, h, g = o !== a ? "nextSibling" : "previousSibling", v = t.parentNode, y = s && t.nodeName.toLowerCase(), m = !u && !s, x = !1;
                        if (v) {
                            if (o) {
                                for (; g; ) {
                                    for (p = t; p = p[g]; )
                                        if (s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType)
                                            return !1;
                                    h = g = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? v.firstChild : v.lastChild],
                            a && m) {
                                for (x = (d = (l = (c = (f = (p = v)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]) && l[2],
                                p = d && v.childNodes[d]; p = ++d && p && p[g] || (x = d = 0) || h.pop(); )
                                    if (1 === p.nodeType && ++x && p === t) {
                                        c[e] = [T, d, x];
                                        break
                                    }
                            } else if (m && (x = d = (l = (c = (f = (p = t)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]),
                            !1 === x)
                                for (; (p = ++d && p && p[g] || (x = d = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== y : 1 !== p.nodeType) || !++x || (m && ((c = (f = p[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] = [T, x]),
                                p !== t)); )
                                    ;
                            return (x -= i) === r || x % r == 0 && x / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
                    return i[b] ? i(t) : i.length > 1 ? (n = [e, e, "", t],
                    r.setFilters.hasOwnProperty(e.toLowerCase()) ? le(function(e, n) {
                        for (var r, o = i(e, t), a = o.length; a--; )
                            e[r = P(e, o[a])] = !(n[r] = o[a])
                    }) : function(e) {
                        return i(e, 0, n)
                    }
                    ) : i
                }
            },
            pseudos: {
                not: le(function(e) {
                    var t = []
                      , n = []
                      , r = s(e.replace($, "$1"));
                    return r[b] ? le(function(e, t, n, i) {
                        for (var o, a = r(e, null, i, []), s = e.length; s--; )
                            (o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function(e, i, o) {
                        return t[0] = e,
                        r(t, null, o, n),
                        t[0] = null,
                        !n.pop()
                    }
                }),
                has: le(function(e) {
                    return function(t) {
                        return se(e, t).length > 0
                    }
                }),
                contains: le(function(e) {
                    return e = e.replace(te, ne),
                    function(t) {
                        return (t.textContent || i(t)).indexOf(e) > -1
                    }
                }),
                lang: le(function(e) {
                    return V.test(e || "") || se.error("unsupported lang: " + e),
                    e = e.replace(te, ne).toLowerCase(),
                    function(t) {
                        var n;
                        do {
                            if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                        } while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === h
                },
                focus: function(e) {
                    return e === d.activeElement && (!d.hasFocus || d.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: ge(!1),
                disabled: ge(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(e) {
                    return !r.pseudos.empty(e)
                },
                header: function(e) {
                    return J.test(e.nodeName)
                },
                input: function(e) {
                    return Q.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: ve(function() {
                    return [0]
                }),
                last: ve(function(e, t) {
                    return [t - 1]
                }),
                eq: ve(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: ve(function(e, t) {
                    for (var n = 0; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                odd: ve(function(e, t) {
                    for (var n = 1; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                lt: ve(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n > t ? t : n; --r >= 0; )
                        e.push(r);
                    return e
                }),
                gt: ve(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t; )
                        e.push(r);
                    return e
                })
            }
        }).pseudos.nth = r.pseudos.eq,
        {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            r.pseudos[t] = de(t);
        for (t in {
            submit: !0,
            reset: !0
        })
            r.pseudos[t] = he(t);
        function me() {}
        function xe(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++)
                r += e[t].value;
            return r
        }
        function be(e, t, n) {
            var r = t.dir
              , i = t.next
              , o = i || r
              , a = n && "parentNode" === o
              , s = C++;
            return t.first ? function(t, n, i) {
                for (; t = t[r]; )
                    if (1 === t.nodeType || a)
                        return e(t, n, i);
                return !1
            }
            : function(t, n, u) {
                var l, c, f, p = [T, s];
                if (u) {
                    for (; t = t[r]; )
                        if ((1 === t.nodeType || a) && e(t, n, u))
                            return !0
                } else
                    for (; t = t[r]; )
                        if (1 === t.nodeType || a)
                            if (c = (f = t[b] || (t[b] = {}))[t.uniqueID] || (f[t.uniqueID] = {}),
                            i && i === t.nodeName.toLowerCase())
                                t = t[r] || t;
                            else {
                                if ((l = c[o]) && l[0] === T && l[1] === s)
                                    return p[2] = l[2];
                                if (c[o] = p,
                                p[2] = e(t, n, u))
                                    return !0
                            }
                return !1
            }
        }
        function we(e) {
            return e.length > 1 ? function(t, n, r) {
                for (var i = e.length; i--; )
                    if (!e[i](t, n, r))
                        return !1;
                return !0
            }
            : e[0]
        }
        function Te(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
                (o = e[s]) && (n && !n(o, r, i) || (a.push(o),
                l && t.push(s)));
            return a
        }
        function Ce(e, t, n, r, i, o) {
            return r && !r[b] && (r = Ce(r)),
            i && !i[b] && (i = Ce(i, o)),
            le(function(o, a, s, u) {
                var l, c, f, p = [], d = [], h = a.length, g = o || function(e, t, n) {
                    for (var r = 0, i = t.length; r < i; r++)
                        se(e, t[r], n);
                    return n
                }(t || "*", s.nodeType ? [s] : s, []), v = !e || !o && t ? g : Te(g, p, e, s, u), y = n ? i || (o ? e : h || r) ? [] : a : v;
                if (n && n(v, y, s, u),
                r)
                    for (l = Te(y, d),
                    r(l, [], s, u),
                    c = l.length; c--; )
                        (f = l[c]) && (y[d[c]] = !(v[d[c]] = f));
                if (o) {
                    if (i || e) {
                        if (i) {
                            for (l = [],
                            c = y.length; c--; )
                                (f = y[c]) && l.push(v[c] = f);
                            i(null, y = [], l, u)
                        }
                        for (c = y.length; c--; )
                            (f = y[c]) && (l = i ? P(o, f) : p[c]) > -1 && (o[l] = !(a[l] = f))
                    }
                } else
                    y = Te(y === a ? y.splice(h, y.length) : y),
                    i ? i(null, a, y, u) : H.apply(a, y)
            })
        }
        function Ee(e) {
            for (var t, n, i, o = e.length, a = r.relative[e[0].type], s = a || r.relative[" "], u = a ? 1 : 0, c = be(function(e) {
                return e === t
            }, s, !0), f = be(function(e) {
                return P(t, e) > -1
            }, s, !0), p = [function(e, n, r) {
                var i = !a && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : f(e, n, r));
                return t = null,
                i
            }
            ]; u < o; u++)
                if (n = r.relative[e[u].type])
                    p = [be(we(p), n)];
                else {
                    if ((n = r.filter[e[u].type].apply(null, e[u].matches))[b]) {
                        for (i = ++u; i < o && !r.relative[e[i].type]; i++)
                            ;
                        return Ce(u > 1 && we(p), u > 1 && xe(e.slice(0, u - 1).concat({
                            value: " " === e[u - 2].type ? "*" : ""
                        })).replace($, "$1"), n, u < i && Ee(e.slice(u, i)), i < o && Ee(e = e.slice(i)), i < o && xe(e))
                    }
                    p.push(n)
                }
            return we(p)
        }
        return me.prototype = r.filters = r.pseudos,
        r.setFilters = new me,
        a = se.tokenize = function(e, t) {
            var n, i, o, a, s, u, l, c = S[e + " "];
            if (c)
                return t ? 0 : c.slice(0);
            for (s = e,
            u = [],
            l = r.preFilter; s; ) {
                for (a in n && !(i = _.exec(s)) || (i && (s = s.slice(i[0].length) || s),
                u.push(o = [])),
                n = !1,
                (i = z.exec(s)) && (n = i.shift(),
                o.push({
                    value: n,
                    type: i[0].replace($, " ")
                }),
                s = s.slice(n.length)),
                r.filter)
                    !(i = G[a].exec(s)) || l[a] && !(i = l[a](i)) || (n = i.shift(),
                    o.push({
                        value: n,
                        type: a,
                        matches: i
                    }),
                    s = s.slice(n.length));
                if (!n)
                    break
            }
            return t ? s.length : s ? se.error(e) : S(e, u).slice(0)
        }
        ,
        s = se.compile = function(e, t) {
            var n, i = [], o = [], s = k[e + " "];
            if (!s) {
                for (t || (t = a(e)),
                n = t.length; n--; )
                    (s = Ee(t[n]))[b] ? i.push(s) : o.push(s);
                (s = k(e, function(e, t) {
                    var n = t.length > 0
                      , i = e.length > 0
                      , o = function(o, a, s, u, c) {
                        var f, h, v, y = 0, m = "0", x = o && [], b = [], w = l, C = o || i && r.find.TAG("*", c), E = T += null == w ? 1 : Math.random() || .1, S = C.length;
                        for (c && (l = a == d || a || c); m !== S && null != (f = C[m]); m++) {
                            if (i && f) {
                                for (h = 0,
                                a || f.ownerDocument == d || (p(f),
                                s = !g); v = e[h++]; )
                                    if (v(f, a || d, s)) {
                                        u.push(f);
                                        break
                                    }
                                c && (T = E)
                            }
                            n && ((f = !v && f) && y--,
                            o && x.push(f))
                        }
                        if (y += m,
                        n && m !== y) {
                            for (h = 0; v = t[h++]; )
                                v(x, b, a, s);
                            if (o) {
                                if (y > 0)
                                    for (; m--; )
                                        x[m] || b[m] || (b[m] = q.call(u));
                                b = Te(b)
                            }
                            H.apply(u, b),
                            c && !o && b.length > 0 && y + t.length > 1 && se.uniqueSort(u)
                        }
                        return c && (T = E,
                        l = w),
                        x
                    };
                    return n ? le(o) : o
                }(o, i))).selector = e
            }
            return s
        }
        ,
        u = se.select = function(e, t, n, i) {
            var o, u, l, c, f, p = "function" == typeof e && e, d = !i && a(e = p.selector || e);
            if (n = n || [],
            1 === d.length) {
                if ((u = d[0] = d[0].slice(0)).length > 2 && "ID" === (l = u[0]).type && 9 === t.nodeType && g && r.relative[u[1].type]) {
                    if (!(t = (r.find.ID(l.matches[0].replace(te, ne), t) || [])[0]))
                        return n;
                    p && (t = t.parentNode),
                    e = e.slice(u.shift().value.length)
                }
                for (o = G.needsContext.test(e) ? 0 : u.length; o-- && (l = u[o],
                !r.relative[c = l.type]); )
                    if ((f = r.find[c]) && (i = f(l.matches[0].replace(te, ne), ee.test(u[0].type) && ye(t.parentNode) || t))) {
                        if (u.splice(o, 1),
                        !(e = i.length && xe(u)))
                            return H.apply(n, i),
                            n;
                        break
                    }
            }
            return (p || s(e, d))(i, t, !g, n, !t || ee.test(e) && ye(t.parentNode) || t),
            n
        }
        ,
        n.sortStable = b.split("").sort(N).join("") === b,
        n.detectDuplicates = !!f,
        p(),
        n.sortDetached = ce(function(e) {
            return 1 & e.compareDocumentPosition(d.createElement("fieldset"))
        }),
        ce(function(e) {
            return e.innerHTML = "<a href='#'></a>",
            "#" === e.firstChild.getAttribute("href")
        }) || fe("type|href|height|width", function(e, t, n) {
            if (!n)
                return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }),
        n.attributes && ce(function(e) {
            return e.innerHTML = "<input/>",
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
        }) || fe("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase())
                return e.defaultValue
        }),
        ce(function(e) {
            return null == e.getAttribute("disabled")
        }) || fe(R, function(e, t, n) {
            var r;
            if (!n)
                return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }),
        se
    }(e);
    w.find = C,
    w.expr = C.selectors,
    w.expr[":"] = w.expr.pseudos,
    w.uniqueSort = w.unique = C.uniqueSort,
    w.text = C.getText,
    w.isXMLDoc = C.isXML,
    w.contains = C.contains,
    w.escapeSelector = C.escape;
    var E = function(e, t, n) {
        for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
            if (1 === e.nodeType) {
                if (i && w(e).is(n))
                    break;
                r.push(e)
            }
        return r
    }
      , S = function(e, t) {
        for (var n = []; e; e = e.nextSibling)
            1 === e.nodeType && e !== t && n.push(e);
        return n
    }
      , k = w.expr.match.needsContext;
    function A(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function j(e, t, n) {
        return h(t) ? w.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        }) : t.nodeType ? w.grep(e, function(e) {
            return e === t !== n
        }) : "string" != typeof t ? w.grep(e, function(e) {
            return s.call(t, e) > -1 !== n
        }) : w.filter(t, e, n)
    }
    w.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === r.nodeType ? w.find.matchesSelector(r, e) ? [r] : [] : w.find.matches(e, w.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }
    ,
    w.fn.extend({
        find: function(e) {
            var t, n, r = this.length, i = this;
            if ("string" != typeof e)
                return this.pushStack(w(e).filter(function() {
                    for (t = 0; t < r; t++)
                        if (w.contains(i[t], this))
                            return !0
                }));
            for (n = this.pushStack([]),
            t = 0; t < r; t++)
                w.find(e, i[t], n);
            return r > 1 ? w.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(j(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(j(this, e || [], !0))
        },
        is: function(e) {
            return !!j(this, "string" == typeof e && k.test(e) ? w(e) : e || [], !1).length
        }
    });
    var D, q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (w.fn.init = function(e, t, n) {
        var r, i;
        if (!e)
            return this;
        if (n = n || D,
        "string" == typeof e) {
            if (!(r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : q.exec(e)) || !r[1] && t)
                return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (r[1]) {
                if (t = t instanceof w ? t[0] : t,
                w.merge(this, w.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : v, !0)),
                N.test(r[1]) && w.isPlainObject(t))
                    for (r in t)
                        h(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            return (i = v.getElementById(r[2])) && (this[0] = i,
            this.length = 1),
            this
        }
        return e.nodeType ? (this[0] = e,
        this.length = 1,
        this) : h(e) ? void 0 !== n.ready ? n.ready(e) : e(w) : w.makeArray(e, this)
    }
    ).prototype = w.fn,
    D = w(v);
    var L = /^(?:parents|prev(?:Until|All))/
      , H = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    function O(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType; )
            ;
        return e
    }
    w.fn.extend({
        has: function(e) {
            var t = w(e, this)
              , n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (w.contains(this, t[e]))
                        return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0, i = this.length, o = [], a = "string" != typeof e && w(e);
            if (!k.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && w.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        }
            return this.pushStack(o.length > 1 ? w.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? s.call(w(e), this[0]) : s.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(w.uniqueSort(w.merge(this.get(), w(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }),
    w.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return E(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return E(e, "parentNode", n)
        },
        next: function(e) {
            return O(e, "nextSibling")
        },
        prev: function(e) {
            return O(e, "previousSibling")
        },
        nextAll: function(e) {
            return E(e, "nextSibling")
        },
        prevAll: function(e) {
            return E(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return E(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return E(e, "previousSibling", n)
        },
        siblings: function(e) {
            return S((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return S(e.firstChild)
        },
        contents: function(e) {
            return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (A(e, "template") && (e = e.content || e),
            w.merge([], e.childNodes))
        }
    }, function(e, t) {
        w.fn[e] = function(n, r) {
            var i = w.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n),
            r && "string" == typeof r && (i = w.filter(r, i)),
            this.length > 1 && (H[e] || w.uniqueSort(i),
            L.test(e) && i.reverse()),
            this.pushStack(i)
        }
    });
    var P = /[^\x20\t\r\n\f]+/g;
    function R(e) {
        return e
    }
    function M(e) {
        throw e
    }
    function I(e, t, n, r) {
        var i;
        try {
            e && h(i = e.promise) ? i.call(e).done(t).fail(n) : e && h(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }
    w.Callbacks = function(e) {
        e = "string" == typeof e ? function(e) {
            var t = {};
            return w.each(e.match(P) || [], function(e, n) {
                t[n] = !0
            }),
            t
        }(e) : w.extend({}, e);
        var t, n, r, i, o = [], a = [], s = -1, u = function() {
            for (i = i || e.once,
            r = t = !0; a.length; s = -1)
                for (n = a.shift(); ++s < o.length; )
                    !1 === o[s].apply(n[0], n[1]) && e.stopOnFalse && (s = o.length,
                    n = !1);
            e.memory || (n = !1),
            t = !1,
            i && (o = n ? [] : "")
        }, l = {
            add: function() {
                return o && (n && !t && (s = o.length - 1,
                a.push(n)),
                function t(n) {
                    w.each(n, function(n, r) {
                        h(r) ? e.unique && l.has(r) || o.push(r) : r && r.length && "string" !== x(r) && t(r)
                    })
                }(arguments),
                n && !t && u()),
                this
            },
            remove: function() {
                return w.each(arguments, function(e, t) {
                    for (var n; (n = w.inArray(t, o, n)) > -1; )
                        o.splice(n, 1),
                        n <= s && s--
                }),
                this
            },
            has: function(e) {
                return e ? w.inArray(e, o) > -1 : o.length > 0
            },
            empty: function() {
                return o && (o = []),
                this
            },
            disable: function() {
                return i = a = [],
                o = n = "",
                this
            },
            disabled: function() {
                return !o
            },
            lock: function() {
                return i = a = [],
                n || t || (o = n = ""),
                this
            },
            locked: function() {
                return !!i
            },
            fireWith: function(e, n) {
                return i || (n = [e, (n = n || []).slice ? n.slice() : n],
                a.push(n),
                t || u()),
                this
            },
            fire: function() {
                return l.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!r
            }
        };
        return l
    }
    ,
    w.extend({
        Deferred: function(t) {
            var n = [["notify", "progress", w.Callbacks("memory"), w.Callbacks("memory"), 2], ["resolve", "done", w.Callbacks("once memory"), w.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", w.Callbacks("once memory"), w.Callbacks("once memory"), 1, "rejected"]]
              , r = "pending"
              , i = {
                state: function() {
                    return r
                },
                always: function() {
                    return o.done(arguments).fail(arguments),
                    this
                },
                catch: function(e) {
                    return i.then(null, e)
                },
                pipe: function() {
                    var e = arguments;
                    return w.Deferred(function(t) {
                        w.each(n, function(n, r) {
                            var i = h(e[r[4]]) && e[r[4]];
                            o[r[1]](function() {
                                var e = i && i.apply(this, arguments);
                                e && h(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, i ? [e] : arguments)
                            })
                        }),
                        e = null
                    }).promise()
                },
                then: function(t, r, i) {
                    var o = 0;
                    function a(t, n, r, i) {
                        return function() {
                            var s = this
                              , u = arguments
                              , l = function() {
                                var e, l;
                                if (!(t < o)) {
                                    if ((e = r.apply(s, u)) === n.promise())
                                        throw new TypeError("Thenable self-resolution");
                                    l = e && ("object" == typeof e || "function" == typeof e) && e.then,
                                    h(l) ? i ? l.call(e, a(o, n, R, i), a(o, n, M, i)) : (o++,
                                    l.call(e, a(o, n, R, i), a(o, n, M, i), a(o, n, R, n.notifyWith))) : (r !== R && (s = void 0,
                                    u = [e]),
                                    (i || n.resolveWith)(s, u))
                                }
                            }
                              , c = i ? l : function() {
                                try {
                                    l()
                                } catch (e) {
                                    w.Deferred.exceptionHook && w.Deferred.exceptionHook(e, c.stackTrace),
                                    t + 1 >= o && (r !== M && (s = void 0,
                                    u = [e]),
                                    n.rejectWith(s, u))
                                }
                            }
                            ;
                            t ? c() : (w.Deferred.getStackHook && (c.stackTrace = w.Deferred.getStackHook()),
                            e.setTimeout(c))
                        }
                    }
                    return w.Deferred(function(e) {
                        n[0][3].add(a(0, e, h(i) ? i : R, e.notifyWith)),
                        n[1][3].add(a(0, e, h(t) ? t : R)),
                        n[2][3].add(a(0, e, h(r) ? r : M))
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? w.extend(e, i) : i
                }
            }
              , o = {};
            return w.each(n, function(e, t) {
                var a = t[2]
                  , s = t[5];
                i[t[1]] = a.add,
                s && a.add(function() {
                    r = s
                }, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock),
                a.add(t[3].fire),
                o[t[0]] = function() {
                    return o[t[0] + "With"](this === o ? void 0 : this, arguments),
                    this
                }
                ,
                o[t[0] + "With"] = a.fireWith
            }),
            i.promise(o),
            t && t.call(o, o),
            o
        },
        when: function(e) {
            var t = arguments.length
              , n = t
              , r = Array(n)
              , o = i.call(arguments)
              , a = w.Deferred()
              , s = function(e) {
                return function(n) {
                    r[e] = this,
                    o[e] = arguments.length > 1 ? i.call(arguments) : n,
                    --t || a.resolveWith(r, o)
                }
            };
            if (t <= 1 && (I(e, a.done(s(n)).resolve, a.reject, !t),
            "pending" === a.state() || h(o[n] && o[n].then)))
                return a.then();
            for (; n--; )
                I(o[n], s(n), a.reject);
            return a.promise()
        }
    });
    var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    w.Deferred.exceptionHook = function(t, n) {
        e.console && e.console.warn && t && W.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
    }
    ,
    w.readyException = function(t) {
        e.setTimeout(function() {
            throw t
        })
    }
    ;
    var F = w.Deferred();
    function B() {
        v.removeEventListener("DOMContentLoaded", B),
        e.removeEventListener("load", B),
        w.ready()
    }
    w.fn.ready = function(e) {
        return F.then(e).catch(function(e) {
            w.readyException(e)
        }),
        this
    }
    ,
    w.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --w.readyWait : w.isReady) || (w.isReady = !0,
            !0 !== e && --w.readyWait > 0 || F.resolveWith(v, [w]))
        }
    }),
    w.ready.then = F.then,
    "complete" === v.readyState || "loading" !== v.readyState && !v.documentElement.doScroll ? e.setTimeout(w.ready) : (v.addEventListener("DOMContentLoaded", B),
    e.addEventListener("load", B));
    var $ = function(e, t, n, r, i, o, a) {
        var s = 0
          , u = e.length
          , l = null == n;
        if ("object" === x(n))
            for (s in i = !0,
            n)
                $(e, t, s, n[s], !0, o, a);
        else if (void 0 !== r && (i = !0,
        h(r) || (a = !0),
        l && (a ? (t.call(e, r),
        t = null) : (l = t,
        t = function(e, t, n) {
            return l.call(w(e), n)
        }
        )),
        t))
            for (; s < u; s++)
                t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
        return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
    }
      , _ = /^-ms-/
      , z = /-([a-z])/g;
    function U(e, t) {
        return t.toUpperCase()
    }
    function X(e) {
        return e.replace(_, "ms-").replace(z, U)
    }
    var V = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };
    function G() {
        this.expando = w.expando + G.uid++
    }
    G.uid = 1,
    G.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {},
            V(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))),
            t
        },
        set: function(e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t)
                i[X(t)] = n;
            else
                for (r in t)
                    i[X(r)] = t[r];
            return i
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][X(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n),
            void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(X) : (t = X(t))in r ? [t] : t.match(P) || []).length;
                    for (; n--; )
                        delete r[t[n]]
                }
                (void 0 === t || w.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !w.isEmptyObject(t)
        }
    };
    var Y = new G
      , Q = new G
      , J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , K = /[A-Z]/g;
    function Z(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(K, "-$&").toLowerCase(),
            "string" == typeof (n = e.getAttribute(r))) {
                try {
                    n = function(e) {
                        return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : J.test(e) ? JSON.parse(e) : e)
                    }(n)
                } catch (e) {}
                Q.set(e, t, n)
            } else
                n = void 0;
        return n
    }
    w.extend({
        hasData: function(e) {
            return Q.hasData(e) || Y.hasData(e)
        },
        data: function(e, t, n) {
            return Q.access(e, t, n)
        },
        removeData: function(e, t) {
            Q.remove(e, t)
        },
        _data: function(e, t, n) {
            return Y.access(e, t, n)
        },
        _removeData: function(e, t) {
            Y.remove(e, t)
        }
    }),
    w.fn.extend({
        data: function(e, t) {
            var n, r, i, o = this[0], a = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (i = Q.get(o),
                1 === o.nodeType && !Y.get(o, "hasDataAttrs"))) {
                    for (n = a.length; n--; )
                        a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = X(r.slice(5)),
                        Z(o, r, i[r]));
                    Y.set(o, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function() {
                Q.set(this, e)
            }) : $(this, function(t) {
                var n;
                if (o && void 0 === t)
                    return void 0 !== (n = Q.get(o, e)) || void 0 !== (n = Z(o, e)) ? n : void 0;
                this.each(function() {
                    Q.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                Q.remove(this, e)
            })
        }
    }),
    w.extend({
        queue: function(e, t, n) {
            var r;
            if (e)
                return t = (t || "fx") + "queue",
                r = Y.get(e, t),
                n && (!r || Array.isArray(n) ? r = Y.access(e, t, w.makeArray(n)) : r.push(n)),
                r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = w.queue(e, t)
              , r = n.length
              , i = n.shift()
              , o = w._queueHooks(e, t);
            "inprogress" === i && (i = n.shift(),
            r--),
            i && ("fx" === t && n.unshift("inprogress"),
            delete o.stop,
            i.call(e, function() {
                w.dequeue(e, t)
            }, o)),
            !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return Y.get(e, n) || Y.access(e, n, {
                empty: w.Callbacks("once memory").add(function() {
                    Y.remove(e, [t + "queue", n])
                })
            })
        }
    }),
    w.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e,
            e = "fx",
            n--),
            arguments.length < n ? w.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = w.queue(this, e, t);
                w._queueHooks(this, e),
                "fx" === e && "inprogress" !== n[0] && w.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                w.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1, i = w.Deferred(), o = this, a = this.length, s = function() {
                --r || i.resolveWith(o, [o])
            };
            for ("string" != typeof e && (t = e,
            e = void 0),
            e = e || "fx"; a--; )
                (n = Y.get(o[a], e + "queueHooks")) && n.empty && (r++,
                n.empty.add(s));
            return s(),
            i.promise(t)
        }
    });
    var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$","i")
      , ne = ["Top", "Right", "Bottom", "Left"]
      , re = v.documentElement
      , ie = function(e) {
        return w.contains(e.ownerDocument, e)
    }
      , oe = {
        composed: !0
    };
    re.getRootNode && (ie = function(e) {
        return w.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument
    }
    );
    var ae = function(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && ie(e) && "none" === w.css(e, "display")
    };
    function se(e, t, n, r) {
        var i, o, a = 20, s = r ? function() {
            return r.cur()
        }
        : function() {
            return w.css(e, t, "")
        }
        , u = s(), l = n && n[3] || (w.cssNumber[t] ? "" : "px"), c = e.nodeType && (w.cssNumber[t] || "px" !== l && +u) && te.exec(w.css(e, t));
        if (c && c[3] !== l) {
            for (u /= 2,
            l = l || c[3],
            c = +u || 1; a--; )
                w.style(e, t, c + l),
                (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0),
                c /= o;
            c *= 2,
            w.style(e, t, c + l),
            n = n || []
        }
        return n && (c = +c || +u || 0,
        i = n[1] ? c + (n[1] + 1) * n[2] : +n[2],
        r && (r.unit = l,
        r.start = c,
        r.end = i)),
        i
    }
    var ue = {};
    function le(e) {
        var t, n = e.ownerDocument, r = e.nodeName, i = ue[r];
        return i || (t = n.body.appendChild(n.createElement(r)),
        i = w.css(t, "display"),
        t.parentNode.removeChild(t),
        "none" === i && (i = "block"),
        ue[r] = i,
        i)
    }
    function ce(e, t) {
        for (var n, r, i = [], o = 0, a = e.length; o < a; o++)
            (r = e[o]).style && (n = r.style.display,
            t ? ("none" === n && (i[o] = Y.get(r, "display") || null,
            i[o] || (r.style.display = "")),
            "" === r.style.display && ae(r) && (i[o] = le(r))) : "none" !== n && (i[o] = "none",
            Y.set(r, "display", n)));
        for (o = 0; o < a; o++)
            null != i[o] && (e[o].style.display = i[o]);
        return e
    }
    w.fn.extend({
        show: function() {
            return ce(this, !0)
        },
        hide: function() {
            return ce(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                ae(this) ? w(this).show() : w(this).hide()
            })
        }
    });
    var fe, pe, de = /^(?:checkbox|radio)$/i, he = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, ge = /^$|^module$|\/(?:java|ecma)script/i;
    fe = v.createDocumentFragment().appendChild(v.createElement("div")),
    (pe = v.createElement("input")).setAttribute("type", "radio"),
    pe.setAttribute("checked", "checked"),
    pe.setAttribute("name", "t"),
    fe.appendChild(pe),
    d.checkClone = fe.cloneNode(!0).cloneNode(!0).lastChild.checked,
    fe.innerHTML = "<textarea>x</textarea>",
    d.noCloneChecked = !!fe.cloneNode(!0).lastChild.defaultValue,
    fe.innerHTML = "<option></option>",
    d.option = !!fe.lastChild;
    var ve = {
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    function ye(e, t) {
        var n;
        return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [],
        void 0 === t || t && A(e, t) ? w.merge([e], n) : n
    }
    function me(e, t) {
        for (var n = 0, r = e.length; n < r; n++)
            Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval"))
    }
    ve.tbody = ve.tfoot = ve.colgroup = ve.caption = ve.thead,
    ve.th = ve.td,
    d.option || (ve.optgroup = ve.option = [1, "<select multiple='multiple'>", "</select>"]);
    var xe = /<|&#?\w+;/;
    function be(e, t, n, r, i) {
        for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)
            if ((o = e[d]) || 0 === o)
                if ("object" === x(o))
                    w.merge(p, o.nodeType ? [o] : o);
                else if (xe.test(o)) {
                    for (a = a || f.appendChild(t.createElement("div")),
                    s = (he.exec(o) || ["", ""])[1].toLowerCase(),
                    u = ve[s] || ve._default,
                    a.innerHTML = u[1] + w.htmlPrefilter(o) + u[2],
                    c = u[0]; c--; )
                        a = a.lastChild;
                    w.merge(p, a.childNodes),
                    (a = f.firstChild).textContent = ""
                } else
                    p.push(t.createTextNode(o));
        for (f.textContent = "",
        d = 0; o = p[d++]; )
            if (r && w.inArray(o, r) > -1)
                i && i.push(o);
            else if (l = ie(o),
            a = ye(f.appendChild(o), "script"),
            l && me(a),
            n)
                for (c = 0; o = a[c++]; )
                    ge.test(o.type || "") && n.push(o);
        return f
    }
    var we = /^([^.]*)(?:\.(.+)|)/;
    function Te() {
        return !0
    }
    function Ce() {
        return !1
    }
    function Ee(e, t) {
        return e === function() {
            try {
                return v.activeElement
            } catch (e) {}
        }() == ("focus" === t)
    }
    function Se(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            for (s in "string" != typeof n && (r = r || n,
            n = void 0),
            t)
                Se(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n,
        r = n = void 0) : null == i && ("string" == typeof n ? (i = r,
        r = void 0) : (i = r,
        r = n,
        n = void 0)),
        !1 === i)
            i = Ce;
        else if (!i)
            return e;
        return 1 === o && (a = i,
        (i = function(e) {
            return w().off(e),
            a.apply(this, arguments)
        }
        ).guid = a.guid || (a.guid = w.guid++)),
        e.each(function() {
            w.event.add(this, t, i, r, n)
        })
    }
    function ke(e, t, n) {
        n ? (Y.set(e, t, !1),
        w.event.add(e, t, {
            namespace: !1,
            handler: function(e) {
                var r, o, a = Y.get(this, t);
                if (1 & e.isTrigger && this[t]) {
                    if (a.length)
                        (w.event.special[t] || {}).delegateType && e.stopPropagation();
                    else if (a = i.call(arguments),
                    Y.set(this, t, a),
                    r = n(this, t),
                    this[t](),
                    a !== (o = Y.get(this, t)) || r ? Y.set(this, t, !1) : o = {},
                    a !== o)
                        return e.stopImmediatePropagation(),
                        e.preventDefault(),
                        o && o.value
                } else
                    a.length && (Y.set(this, t, {
                        value: w.event.trigger(w.extend(a[0], w.Event.prototype), a.slice(1), this)
                    }),
                    e.stopImmediatePropagation())
            }
        })) : void 0 === Y.get(e, t) && w.event.add(e, t, Te)
    }
    w.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, v = Y.get(e);
            if (V(e))
                for (n.handler && (n = (o = n).handler,
                i = o.selector),
                i && w.find.matchesSelector(re, i),
                n.guid || (n.guid = w.guid++),
                (u = v.events) || (u = v.events = Object.create(null)),
                (a = v.handle) || (a = v.handle = function(t) {
                    return void 0 !== w && w.event.triggered !== t.type ? w.event.dispatch.apply(e, arguments) : void 0
                }
                ),
                l = (t = (t || "").match(P) || [""]).length; l--; )
                    d = g = (s = we.exec(t[l]) || [])[1],
                    h = (s[2] || "").split(".").sort(),
                    d && (f = w.event.special[d] || {},
                    d = (i ? f.delegateType : f.bindType) || d,
                    f = w.event.special[d] || {},
                    c = w.extend({
                        type: d,
                        origType: g,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && w.expr.match.needsContext.test(i),
                        namespace: h.join(".")
                    }, o),
                    (p = u[d]) || ((p = u[d] = []).delegateCount = 0,
                    f.setup && !1 !== f.setup.call(e, r, h, a) || e.addEventListener && e.addEventListener(d, a)),
                    f.add && (f.add.call(e, c),
                    c.handler.guid || (c.handler.guid = n.guid)),
                    i ? p.splice(p.delegateCount++, 0, c) : p.push(c),
                    w.event.global[d] = !0)
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, v = Y.hasData(e) && Y.get(e);
            if (v && (u = v.events)) {
                for (l = (t = (t || "").match(P) || [""]).length; l--; )
                    if (d = g = (s = we.exec(t[l]) || [])[1],
                    h = (s[2] || "").split(".").sort(),
                    d) {
                        for (f = w.event.special[d] || {},
                        p = u[d = (r ? f.delegateType : f.bindType) || d] || [],
                        s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        a = o = p.length; o--; )
                            c = p[o],
                            !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1),
                            c.selector && p.delegateCount--,
                            f.remove && f.remove.call(e, c));
                        a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || w.removeEvent(e, d, v.handle),
                        delete u[d])
                    } else
                        for (d in u)
                            w.event.remove(e, d + t[l], n, r, !0);
                w.isEmptyObject(u) && Y.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, r, i, o, a, s = new Array(arguments.length), u = w.event.fix(e), l = (Y.get(this, "events") || Object.create(null))[u.type] || [], c = w.event.special[u.type] || {};
            for (s[0] = u,
            t = 1; t < arguments.length; t++)
                s[t] = arguments[t];
            if (u.delegateTarget = this,
            !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
                for (a = w.event.handlers.call(this, u, l),
                t = 0; (i = a[t++]) && !u.isPropagationStopped(); )
                    for (u.currentTarget = i.elem,
                    n = 0; (o = i.handlers[n++]) && !u.isImmediatePropagationStopped(); )
                        u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o,
                        u.data = o.data,
                        void 0 !== (r = ((w.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(),
                        u.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, u),
                u.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a, s = [], u = t.delegateCount, l = e.target;
            if (u && l.nodeType && !("click" === e.type && e.button >= 1))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                        for (o = [],
                        a = {},
                        n = 0; n < u; n++)
                            void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? w(i, this).index(l) > -1 : w.find(i, this, null, [l]).length),
                            a[i] && o.push(r);
                        o.length && s.push({
                            elem: l,
                            handlers: o
                        })
                    }
            return l = this,
            u < t.length && s.push({
                elem: l,
                handlers: t.slice(u)
            }),
            s
        },
        addProp: function(e, t) {
            Object.defineProperty(w.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: h(t) ? function() {
                    if (this.originalEvent)
                        return t(this.originalEvent)
                }
                : function() {
                    if (this.originalEvent)
                        return this.originalEvent[e]
                }
                ,
                set: function(t) {
                    Object.defineProperty(this, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            })
        },
        fix: function(e) {
            return e[w.expando] ? e : new w.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                setup: function(e) {
                    var t = this || e;
                    return de.test(t.type) && t.click && A(t, "input") && ke(t, "click", Te),
                    !1
                },
                trigger: function(e) {
                    var t = this || e;
                    return de.test(t.type) && t.click && A(t, "input") && ke(t, "click"),
                    !0
                },
                _default: function(e) {
                    var t = e.target;
                    return de.test(t.type) && t.click && A(t, "input") && Y.get(t, "click") || A(t, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    },
    w.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }
    ,
    w.Event = function(e, t) {
        if (!(this instanceof w.Event))
            return new w.Event(e,t);
        e && e.type ? (this.originalEvent = e,
        this.type = e.type,
        this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Te : Ce,
        this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target,
        this.currentTarget = e.currentTarget,
        this.relatedTarget = e.relatedTarget) : this.type = e,
        t && w.extend(this, t),
        this.timeStamp = e && e.timeStamp || Date.now(),
        this[w.expando] = !0
    }
    ,
    w.Event.prototype = {
        constructor: w.Event,
        isDefaultPrevented: Ce,
        isPropagationStopped: Ce,
        isImmediatePropagationStopped: Ce,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = Te,
            e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = Te,
            e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = Te,
            e && !this.isSimulated && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    w.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: !0
    }, w.event.addProp),
    w.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        w.event.special[e] = {
            setup: function() {
                return ke(this, e, Ee),
                !1
            },
            trigger: function() {
                return ke(this, e),
                !0
            },
            _default: function() {
                return !0
            },
            delegateType: t
        }
    }),
    w.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        w.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this, i = e.relatedTarget, o = e.handleObj;
                return i && (i === r || w.contains(r, i)) || (e.type = o.origType,
                n = o.handler.apply(this, arguments),
                e.type = t),
                n
            }
        }
    }),
    w.fn.extend({
        on: function(e, t, n, r) {
            return Se(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return Se(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj)
                return r = e.handleObj,
                w(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                this;
            if ("object" == typeof e) {
                for (i in e)
                    this.off(i, t, e[i]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t,
            t = void 0),
            !1 === n && (n = Ce),
            this.each(function() {
                w.event.remove(this, e, n, t)
            })
        }
    });
    var Ae = /<script|<style|<link/i
      , Ne = /checked\s*(?:[^=]|=\s*.checked.)/i
      , je = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function De(e, t) {
        return A(e, "table") && A(11 !== t.nodeType ? t : t.firstChild, "tr") && w(e).children("tbody")[0] || e
    }
    function qe(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type,
        e
    }
    function Le(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"),
        e
    }
    function He(e, t) {
        var n, r, i, o, a, s;
        if (1 === t.nodeType) {
            if (Y.hasData(e) && (s = Y.get(e).events))
                for (i in Y.remove(t, "handle events"),
                s)
                    for (n = 0,
                    r = s[i].length; n < r; n++)
                        w.event.add(t, i, s[i][n]);
            Q.hasData(e) && (o = Q.access(e),
            a = w.extend({}, o),
            Q.set(t, a))
        }
    }
    function Oe(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && de.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }
    function Pe(e, t, n, r) {
        t = o(t);
        var i, a, s, u, l, c, f = 0, p = e.length, g = p - 1, v = t[0], y = h(v);
        if (y || p > 1 && "string" == typeof v && !d.checkClone && Ne.test(v))
            return e.each(function(i) {
                var o = e.eq(i);
                y && (t[0] = v.call(this, i, o.html())),
                Pe(o, t, n, r)
            });
        if (p && (a = (i = be(t, e[0].ownerDocument, !1, e, r)).firstChild,
        1 === i.childNodes.length && (i = a),
        a || r)) {
            for (u = (s = w.map(ye(i, "script"), qe)).length; f < p; f++)
                l = i,
                f !== g && (l = w.clone(l, !0, !0),
                u && w.merge(s, ye(l, "script"))),
                n.call(e[f], l, f);
            if (u)
                for (c = s[s.length - 1].ownerDocument,
                w.map(s, Le),
                f = 0; f < u; f++)
                    l = s[f],
                    ge.test(l.type || "") && !Y.access(l, "globalEval") && w.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? w._evalUrl && !l.noModule && w._evalUrl(l.src, {
                        nonce: l.nonce || l.getAttribute("nonce")
                    }, c) : m(l.textContent.replace(je, ""), l, c))
        }
        return e
    }
    function Re(e, t, n) {
        for (var r, i = t ? w.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
            n || 1 !== r.nodeType || w.cleanData(ye(r)),
            r.parentNode && (n && ie(r) && me(ye(r, "script")),
            r.parentNode.removeChild(r));
        return e
    }
    w.extend({
        htmlPrefilter: function(e) {
            return e
        },
        clone: function(e, t, n) {
            var r, i, o, a, s = e.cloneNode(!0), u = ie(e);
            if (!(d.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || w.isXMLDoc(e)))
                for (a = ye(s),
                r = 0,
                i = (o = ye(e)).length; r < i; r++)
                    Oe(o[r], a[r]);
            if (t)
                if (n)
                    for (o = o || ye(e),
                    a = a || ye(s),
                    r = 0,
                    i = o.length; r < i; r++)
                        He(o[r], a[r]);
                else
                    He(e, s);
            return (a = ye(s, "script")).length > 0 && me(a, !u && ye(e, "script")),
            s
        },
        cleanData: function(e) {
            for (var t, n, r, i = w.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (V(n)) {
                    if (t = n[Y.expando]) {
                        if (t.events)
                            for (r in t.events)
                                i[r] ? w.event.remove(n, r) : w.removeEvent(n, r, t.handle);
                        n[Y.expando] = void 0
                    }
                    n[Q.expando] && (n[Q.expando] = void 0)
                }
        }
    }),
    w.fn.extend({
        detach: function(e) {
            return Re(this, e, !0)
        },
        remove: function(e) {
            return Re(this, e)
        },
        text: function(e) {
            return $(this, function(e) {
                return void 0 === e ? w.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return Pe(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || De(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return Pe(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = De(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return Pe(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return Pe(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++)
                1 === e.nodeType && (w.cleanData(ye(e, !1)),
                e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e,
            t = null == t ? e : t,
            this.map(function() {
                return w.clone(this, e, t)
            })
        },
        html: function(e) {
            return $(this, function(e) {
                var t = this[0] || {}
                  , n = 0
                  , r = this.length;
                if (void 0 === e && 1 === t.nodeType)
                    return t.innerHTML;
                if ("string" == typeof e && !Ae.test(e) && !ve[(he.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = w.htmlPrefilter(e);
                    try {
                        for (; n < r; n++)
                            1 === (t = this[n] || {}).nodeType && (w.cleanData(ye(t, !1)),
                            t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return Pe(this, arguments, function(t) {
                var n = this.parentNode;
                w.inArray(this, e) < 0 && (w.cleanData(ye(this)),
                n && n.replaceChild(t, this))
            }, e)
        }
    }),
    w.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        w.fn[e] = function(e) {
            for (var n, r = [], i = w(e), o = i.length - 1, s = 0; s <= o; s++)
                n = s === o ? this : this.clone(!0),
                w(i[s])[t](n),
                a.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var Me = new RegExp("^(" + ee + ")(?!px)[a-z%]+$","i")
      , Ie = function(t) {
        var n = t.ownerDocument.defaultView;
        return n && n.opener || (n = e),
        n.getComputedStyle(t)
    }
      , We = function(e, t, n) {
        var r, i, o = {};
        for (i in t)
            o[i] = e.style[i],
            e.style[i] = t[i];
        for (i in r = n.call(e),
        t)
            e.style[i] = o[i];
        return r
    }
      , Fe = new RegExp(ne.join("|"),"i");
    function Be(e, t, n) {
        var r, i, o, a, s = e.style;
        return (n = n || Ie(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || ie(e) || (a = w.style(e, t)),
        !d.pixelBoxStyles() && Me.test(a) && Fe.test(t) && (r = s.width,
        i = s.minWidth,
        o = s.maxWidth,
        s.minWidth = s.maxWidth = s.width = a,
        a = n.width,
        s.width = r,
        s.minWidth = i,
        s.maxWidth = o)),
        void 0 !== a ? a + "" : a
    }
    function $e(e, t) {
        return {
            get: function() {
                if (!e())
                    return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }
    !function() {
        function t() {
            if (c) {
                l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
                c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
                re.appendChild(l).appendChild(c);
                var t = e.getComputedStyle(c);
                r = "1%" !== t.top,
                u = 12 === n(t.marginLeft),
                c.style.right = "60%",
                a = 36 === n(t.right),
                i = 36 === n(t.width),
                c.style.position = "absolute",
                o = 12 === n(c.offsetWidth / 3),
                re.removeChild(l),
                c = null
            }
        }
        function n(e) {
            return Math.round(parseFloat(e))
        }
        var r, i, o, a, s, u, l = v.createElement("div"), c = v.createElement("div");
        c.style && (c.style.backgroundClip = "content-box",
        c.cloneNode(!0).style.backgroundClip = "",
        d.clearCloneStyle = "content-box" === c.style.backgroundClip,
        w.extend(d, {
            boxSizingReliable: function() {
                return t(),
                i
            },
            pixelBoxStyles: function() {
                return t(),
                a
            },
            pixelPosition: function() {
                return t(),
                r
            },
            reliableMarginLeft: function() {
                return t(),
                u
            },
            scrollboxSize: function() {
                return t(),
                o
            },
            reliableTrDimensions: function() {
                var t, n, r, i;
                return null == s && (t = v.createElement("table"),
                n = v.createElement("tr"),
                r = v.createElement("div"),
                t.style.cssText = "position:absolute;left:-11111px;border-collapse:separate",
                n.style.cssText = "border:1px solid",
                n.style.height = "1px",
                r.style.height = "9px",
                r.style.display = "block",
                re.appendChild(t).appendChild(n).appendChild(r),
                i = e.getComputedStyle(n),
                s = parseInt(i.height, 10) + parseInt(i.borderTopWidth, 10) + parseInt(i.borderBottomWidth, 10) === n.offsetHeight,
                re.removeChild(t)),
                s
            }
        }))
    }();
    var _e = ["Webkit", "Moz", "ms"]
      , ze = v.createElement("div").style
      , Ue = {};
    function Xe(e) {
        var t = w.cssProps[e] || Ue[e];
        return t || (e in ze ? e : Ue[e] = function(e) {
            for (var t = e[0].toUpperCase() + e.slice(1), n = _e.length; n--; )
                if ((e = _e[n] + t)in ze)
                    return e
        }(e) || e)
    }
    var Ve = /^(none|table(?!-c[ea]).+)/
      , Ge = /^--/
      , Ye = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , Qe = {
        letterSpacing: "0",
        fontWeight: "400"
    };
    function Je(e, t, n) {
        var r = te.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }
    function Ke(e, t, n, r, i, o) {
        var a = "width" === t ? 1 : 0
          , s = 0
          , u = 0;
        if (n === (r ? "border" : "content"))
            return 0;
        for (; a < 4; a += 2)
            "margin" === n && (u += w.css(e, n + ne[a], !0, i)),
            r ? ("content" === n && (u -= w.css(e, "padding" + ne[a], !0, i)),
            "margin" !== n && (u -= w.css(e, "border" + ne[a] + "Width", !0, i))) : (u += w.css(e, "padding" + ne[a], !0, i),
            "padding" !== n ? u += w.css(e, "border" + ne[a] + "Width", !0, i) : s += w.css(e, "border" + ne[a] + "Width", !0, i));
        return !r && o >= 0 && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0),
        u
    }
    function Ze(e, t, n) {
        var r = Ie(e)
          , i = (!d.boxSizingReliable() || n) && "border-box" === w.css(e, "boxSizing", !1, r)
          , o = i
          , a = Be(e, t, r)
          , s = "offset" + t[0].toUpperCase() + t.slice(1);
        if (Me.test(a)) {
            if (!n)
                return a;
            a = "auto"
        }
        return (!d.boxSizingReliable() && i || !d.reliableTrDimensions() && A(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === w.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === w.css(e, "boxSizing", !1, r),
        (o = s in e) && (a = e[s])),
        (a = parseFloat(a) || 0) + Ke(e, t, n || (i ? "border" : "content"), o, r, a) + "px"
    }
    function et(e, t, n, r, i) {
        return new et.prototype.init(e,t,n,r,i)
    }
    w.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Be(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = X(t), u = Ge.test(t), l = e.style;
                if (u || (t = Xe(s)),
                a = w.cssHooks[t] || w.cssHooks[s],
                void 0 === n)
                    return a && "get"in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                "string" === (o = typeof n) && (i = te.exec(n)) && i[1] && (n = se(e, t, i),
                o = "number"),
                null != n && n == n && ("number" !== o || u || (n += i && i[3] || (w.cssNumber[s] ? "" : "px")),
                d.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"),
                a && "set"in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n))
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = X(t);
            return Ge.test(t) || (t = Xe(s)),
            (a = w.cssHooks[t] || w.cssHooks[s]) && "get"in a && (i = a.get(e, !0, n)),
            void 0 === i && (i = Be(e, t, r)),
            "normal" === i && t in Qe && (i = Qe[t]),
            "" === n || n ? (o = parseFloat(i),
            !0 === n || isFinite(o) ? o || 0 : i) : i
        }
    }),
    w.each(["height", "width"], function(e, t) {
        w.cssHooks[t] = {
            get: function(e, n, r) {
                if (n)
                    return !Ve.test(w.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Ze(e, t, r) : We(e, Ye, function() {
                        return Ze(e, t, r)
                    })
            },
            set: function(e, n, r) {
                var i, o = Ie(e), a = !d.scrollboxSize() && "absolute" === o.position, s = (a || r) && "border-box" === w.css(e, "boxSizing", !1, o), u = r ? Ke(e, t, r, s, o) : 0;
                return s && a && (u -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - Ke(e, t, "border", !1, o) - .5)),
                u && (i = te.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n,
                n = w.css(e, t)),
                Je(0, n, u)
            }
        }
    }),
    w.cssHooks.marginLeft = $e(d.reliableMarginLeft, function(e, t) {
        if (t)
            return (parseFloat(Be(e, "marginLeft")) || e.getBoundingClientRect().left - We(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + "px"
    }),
    w.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        w.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++)
                    i[e + ne[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        },
        "margin" !== e && (w.cssHooks[e + t].set = Je)
    }),
    w.fn.extend({
        css: function(e, t) {
            return $(this, function(e, t, n) {
                var r, i, o = {}, a = 0;
                if (Array.isArray(t)) {
                    for (r = Ie(e),
                    i = t.length; a < i; a++)
                        o[t[a]] = w.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? w.style(e, t, n) : w.css(e, t)
            }, e, t, arguments.length > 1)
        }
    }),
    w.Tween = et,
    et.prototype = {
        constructor: et,
        init: function(e, t, n, r, i, o) {
            this.elem = e,
            this.prop = n,
            this.easing = i || w.easing._default,
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = r,
            this.unit = o || (w.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = et.propHooks[this.prop];
            return e && e.get ? e.get(this) : et.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = et.propHooks[this.prop];
            return this.options.duration ? this.pos = t = w.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : et.propHooks._default.set(this),
            this
        }
    },
    et.prototype.init.prototype = et.prototype,
    et.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = w.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                w.fx.step[e.prop] ? w.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !w.cssHooks[e.prop] && null == e.elem.style[Xe(e.prop)] ? e.elem[e.prop] = e.now : w.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    },
    et.propHooks.scrollTop = et.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    w.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    },
    w.fx = et.prototype.init,
    w.fx.step = {};
    var tt, nt, rt = /^(?:toggle|show|hide)$/, it = /queueHooks$/;
    function ot() {
        nt && (!1 === v.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(ot) : e.setTimeout(ot, w.fx.interval),
        w.fx.tick())
    }
    function at() {
        return e.setTimeout(function() {
            tt = void 0
        }),
        tt = Date.now()
    }
    function st(e, t) {
        var n, r = 0, i = {
            height: e
        };
        for (t = t ? 1 : 0; r < 4; r += 2 - t)
            i["margin" + (n = ne[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e),
        i
    }
    function ut(e, t, n) {
        for (var r, i = (lt.tweeners[t] || []).concat(lt.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e))
                return r
    }
    function lt(e, t, n) {
        var r, i, o = 0, a = lt.prefilters.length, s = w.Deferred().always(function() {
            delete u.elem
        }), u = function() {
            if (i)
                return !1;
            for (var t = tt || at(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), o = 0, a = l.tweens.length; o < a; o++)
                l.tweens[o].run(r);
            return s.notifyWith(e, [l, r, n]),
            r < 1 && a ? n : (a || s.notifyWith(e, [l, 1, 0]),
            s.resolveWith(e, [l]),
            !1)
        }, l = s.promise({
            elem: e,
            props: w.extend({}, t),
            opts: w.extend(!0, {
                specialEasing: {},
                easing: w.easing._default
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: tt || at(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var r = w.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                return l.tweens.push(r),
                r
            },
            stop: function(t) {
                var n = 0
                  , r = t ? l.tweens.length : 0;
                if (i)
                    return this;
                for (i = !0; n < r; n++)
                    l.tweens[n].run(1);
                return t ? (s.notifyWith(e, [l, 1, 0]),
                s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]),
                this
            }
        }), c = l.props;
        for (!function(e, t) {
            var n, r, i, o, a;
            for (n in e)
                if (i = t[r = X(n)],
                o = e[n],
                Array.isArray(o) && (i = o[1],
                o = e[n] = o[0]),
                n !== r && (e[r] = o,
                delete e[n]),
                (a = w.cssHooks[r]) && "expand"in a)
                    for (n in o = a.expand(o),
                    delete e[r],
                    o)
                        n in e || (e[n] = o[n],
                        t[n] = i);
                else
                    t[r] = i
        }(c, l.opts.specialEasing); o < a; o++)
            if (r = lt.prefilters[o].call(l, e, c, l.opts))
                return h(r.stop) && (w._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)),
                r;
        return w.map(c, ut, l),
        h(l.opts.start) && l.opts.start.call(e, l),
        l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always),
        w.fx.timer(w.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })),
        l
    }
    w.Animation = w.extend(lt, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return se(n.elem, e, te.exec(t), n),
                n
            }
            ]
        },
        tweener: function(e, t) {
            h(e) ? (t = e,
            e = ["*"]) : e = e.match(P);
            for (var n, r = 0, i = e.length; r < i; r++)
                n = e[r],
                lt.tweeners[n] = lt.tweeners[n] || [],
                lt.tweeners[n].unshift(t)
        },
        prefilters: [function(e, t, n) {
            var r, i, o, a, s, u, l, c, f = "width"in t || "height"in t, p = this, d = {}, h = e.style, g = e.nodeType && ae(e), v = Y.get(e, "fxshow");
            for (r in n.queue || (null == (a = w._queueHooks(e, "fx")).unqueued && (a.unqueued = 0,
            s = a.empty.fire,
            a.empty.fire = function() {
                a.unqueued || s()
            }
            ),
            a.unqueued++,
            p.always(function() {
                p.always(function() {
                    a.unqueued--,
                    w.queue(e, "fx").length || a.empty.fire()
                })
            })),
            t)
                if (i = t[r],
                rt.test(i)) {
                    if (delete t[r],
                    o = o || "toggle" === i,
                    i === (g ? "hide" : "show")) {
                        if ("show" !== i || !v || void 0 === v[r])
                            continue;
                        g = !0
                    }
                    d[r] = v && v[r] || w.style(e, r)
                }
            if ((u = !w.isEmptyObject(t)) || !w.isEmptyObject(d))
                for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY],
                null == (l = v && v.display) && (l = Y.get(e, "display")),
                "none" === (c = w.css(e, "display")) && (l ? c = l : (ce([e], !0),
                l = e.style.display || l,
                c = w.css(e, "display"),
                ce([e]))),
                ("inline" === c || "inline-block" === c && null != l) && "none" === w.css(e, "float") && (u || (p.done(function() {
                    h.display = l
                }),
                null == l && (c = h.display,
                l = "none" === c ? "" : c)),
                h.display = "inline-block")),
                n.overflow && (h.overflow = "hidden",
                p.always(function() {
                    h.overflow = n.overflow[0],
                    h.overflowX = n.overflow[1],
                    h.overflowY = n.overflow[2]
                })),
                u = !1,
                d)
                    u || (v ? "hidden"in v && (g = v.hidden) : v = Y.access(e, "fxshow", {
                        display: l
                    }),
                    o && (v.hidden = !g),
                    g && ce([e], !0),
                    p.done(function() {
                        for (r in g || ce([e]),
                        Y.remove(e, "fxshow"),
                        d)
                            w.style(e, r, d[r])
                    })),
                    u = ut(g ? v[r] : 0, r, p),
                    r in v || (v[r] = u.start,
                    g && (u.end = u.start,
                    u.start = 0))
        }
        ],
        prefilter: function(e, t) {
            t ? lt.prefilters.unshift(e) : lt.prefilters.push(e)
        }
    }),
    w.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? w.extend({}, e) : {
            complete: n || !n && t || h(e) && e,
            duration: e,
            easing: n && t || t && !h(t) && t
        };
        return w.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in w.fx.speeds ? r.duration = w.fx.speeds[r.duration] : r.duration = w.fx.speeds._default),
        null != r.queue && !0 !== r.queue || (r.queue = "fx"),
        r.old = r.complete,
        r.complete = function() {
            h(r.old) && r.old.call(this),
            r.queue && w.dequeue(this, r.queue)
        }
        ,
        r
    }
    ,
    w.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(ae).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = w.isEmptyObject(e)
              , o = w.speed(t, n, r)
              , a = function() {
                var t = lt(this, w.extend({}, e), o);
                (i || Y.get(this, "finish")) && t.stop(!0)
            };
            return a.finish = a,
            i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(e, t, n) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop,
                t(n)
            };
            return "string" != typeof e && (n = t,
            t = e,
            e = void 0),
            t && this.queue(e || "fx", []),
            this.each(function() {
                var t = !0
                  , i = null != e && e + "queueHooks"
                  , o = w.timers
                  , a = Y.get(this);
                if (i)
                    a[i] && a[i].stop && r(a[i]);
                else
                    for (i in a)
                        a[i] && a[i].stop && it.test(i) && r(a[i]);
                for (i = o.length; i--; )
                    o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n),
                    t = !1,
                    o.splice(i, 1));
                !t && n || w.dequeue(this, e)
            })
        },
        finish: function(e) {
            return !1 !== e && (e = e || "fx"),
            this.each(function() {
                var t, n = Y.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = w.timers, a = r ? r.length : 0;
                for (n.finish = !0,
                w.queue(this, e, []),
                i && i.stop && i.stop.call(this, !0),
                t = o.length; t--; )
                    o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0),
                    o.splice(t, 1));
                for (t = 0; t < a; t++)
                    r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }),
    w.each(["toggle", "show", "hide"], function(e, t) {
        var n = w.fn[t];
        w.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(st(t, !0), e, r, i)
        }
    }),
    w.each({
        slideDown: st("show"),
        slideUp: st("hide"),
        slideToggle: st("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        w.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }),
    w.timers = [],
    w.fx.tick = function() {
        var e, t = 0, n = w.timers;
        for (tt = Date.now(); t < n.length; t++)
            (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || w.fx.stop(),
        tt = void 0
    }
    ,
    w.fx.timer = function(e) {
        w.timers.push(e),
        w.fx.start()
    }
    ,
    w.fx.interval = 13,
    w.fx.start = function() {
        nt || (nt = !0,
        ot())
    }
    ,
    w.fx.stop = function() {
        nt = null
    }
    ,
    w.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    w.fn.delay = function(t, n) {
        return t = w.fx && w.fx.speeds[t] || t,
        n = n || "fx",
        this.queue(n, function(n, r) {
            var i = e.setTimeout(n, t);
            r.stop = function() {
                e.clearTimeout(i)
            }
        })
    }
    ,
    function() {
        var e = v.createElement("input")
          , t = v.createElement("select").appendChild(v.createElement("option"));
        e.type = "checkbox",
        d.checkOn = "" !== e.value,
        d.optSelected = t.selected,
        (e = v.createElement("input")).value = "t",
        e.type = "radio",
        d.radioValue = "t" === e.value
    }();
    var ct, ft = w.expr.attrHandle;
    w.fn.extend({
        attr: function(e, t) {
            return $(this, w.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                w.removeAttr(this, e)
            })
        }
    }),
    w.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
                return void 0 === e.getAttribute ? w.prop(e, t, n) : (1 === o && w.isXMLDoc(e) || (i = w.attrHooks[t.toLowerCase()] || (w.expr.match.bool.test(t) ? ct : void 0)),
                void 0 !== n ? null === n ? void w.removeAttr(e, t) : i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""),
                n) : i && "get"in i && null !== (r = i.get(e, t)) ? r : null == (r = w.find.attr(e, t)) ? void 0 : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!d.radioValue && "radio" === t && A(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r = 0, i = t && t.match(P);
            if (i && 1 === e.nodeType)
                for (; n = i[r++]; )
                    e.removeAttribute(n)
        }
    }),
    ct = {
        set: function(e, t, n) {
            return !1 === t ? w.removeAttr(e, n) : e.setAttribute(n, n),
            n
        }
    },
    w.each(w.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = ft[t] || w.find.attr;
        ft[t] = function(e, t, r) {
            var i, o, a = t.toLowerCase();
            return r || (o = ft[a],
            ft[a] = i,
            i = null != n(e, t, r) ? a : null,
            ft[a] = o),
            i
        }
    });
    var pt = /^(?:input|select|textarea|button)$/i
      , dt = /^(?:a|area)$/i;
    function ht(e) {
        return (e.match(P) || []).join(" ")
    }
    function gt(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }
    function vt(e) {
        return Array.isArray(e) ? e : "string" == typeof e && e.match(P) || []
    }
    w.fn.extend({
        prop: function(e, t) {
            return $(this, w.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[w.propFix[e] || e]
            })
        }
    }),
    w.extend({
        prop: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
                return 1 === o && w.isXMLDoc(e) || (t = w.propFix[t] || t,
                i = w.propHooks[t]),
                void 0 !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get"in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = w.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : pt.test(e.nodeName) || dt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }),
    d.optSelected || (w.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex,
            null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex)
        }
    }),
    w.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        w.propFix[this.toLowerCase()] = this
    }),
    w.fn.extend({
        addClass: function(e) {
            var t, n, r, i, o, a, s, u = 0;
            if (h(e))
                return this.each(function(t) {
                    w(this).addClass(e.call(this, t, gt(this)))
                });
            if ((t = vt(e)).length)
                for (; n = this[u++]; )
                    if (i = gt(n),
                    r = 1 === n.nodeType && " " + ht(i) + " ") {
                        for (a = 0; o = t[a++]; )
                            r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        i !== (s = ht(r)) && n.setAttribute("class", s)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, o, a, s, u = 0;
            if (h(e))
                return this.each(function(t) {
                    w(this).removeClass(e.call(this, t, gt(this)))
                });
            if (!arguments.length)
                return this.attr("class", "");
            if ((t = vt(e)).length)
                for (; n = this[u++]; )
                    if (i = gt(n),
                    r = 1 === n.nodeType && " " + ht(i) + " ") {
                        for (a = 0; o = t[a++]; )
                            for (; r.indexOf(" " + o + " ") > -1; )
                                r = r.replace(" " + o + " ", " ");
                        i !== (s = ht(r)) && n.setAttribute("class", s)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e
              , r = "string" === n || Array.isArray(e);
            return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : h(e) ? this.each(function(n) {
                w(this).toggleClass(e.call(this, n, gt(this), t), t)
            }) : this.each(function() {
                var t, i, o, a;
                if (r)
                    for (i = 0,
                    o = w(this),
                    a = vt(e); t = a[i++]; )
                        o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                else
                    void 0 !== e && "boolean" !== n || ((t = gt(this)) && Y.set(this, "__className__", t),
                    this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : Y.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, r = 0;
            for (t = " " + e + " "; n = this[r++]; )
                if (1 === n.nodeType && (" " + ht(gt(n)) + " ").indexOf(t) > -1)
                    return !0;
            return !1
        }
    });
    var yt = /\r/g;
    w.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0];
            return arguments.length ? (r = h(e),
            this.each(function(n) {
                var i;
                1 === this.nodeType && (null == (i = r ? e.call(this, n, w(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = w.map(i, function(e) {
                    return null == e ? "" : e + ""
                })),
                (t = w.valHooks[this.type] || w.valHooks[this.nodeName.toLowerCase()]) && "set"in t && void 0 !== t.set(this, i, "value") || (this.value = i))
            })) : i ? (t = w.valHooks[i.type] || w.valHooks[i.nodeName.toLowerCase()]) && "get"in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof (n = i.value) ? n.replace(yt, "") : null == n ? "" : n : void 0
        }
    }),
    w.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = w.find.attr(e, "value");
                    return null != t ? t : ht(w.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, i = e.options, o = e.selectedIndex, a = "select-one" === e.type, s = a ? null : [], u = a ? o + 1 : i.length;
                    for (r = o < 0 ? u : a ? o : 0; r < u; r++)
                        if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))) {
                            if (t = w(n).val(),
                            a)
                                return t;
                            s.push(t)
                        }
                    return s
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = w.makeArray(t), a = i.length; a--; )
                        ((r = i[a]).selected = w.inArray(w.valHooks.option.get(r), o) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1),
                    o
                }
            }
        }
    }),
    w.each(["radio", "checkbox"], function() {
        w.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t))
                    return e.checked = w.inArray(w(e).val(), t) > -1
            }
        },
        d.checkOn || (w.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        }
        )
    }),
    d.focusin = "onfocusin"in e;
    var mt = /^(?:focusinfocus|focusoutblur)$/
      , xt = function(e) {
        e.stopPropagation()
    };
    w.extend(w.event, {
        trigger: function(t, n, r, i) {
            var o, a, s, u, l, f, p, d, y = [r || v], m = c.call(t, "type") ? t.type : t, x = c.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = d = s = r = r || v,
            3 !== r.nodeType && 8 !== r.nodeType && !mt.test(m + w.event.triggered) && (m.indexOf(".") > -1 && (x = m.split("."),
            m = x.shift(),
            x.sort()),
            l = m.indexOf(":") < 0 && "on" + m,
            (t = t[w.expando] ? t : new w.Event(m,"object" == typeof t && t)).isTrigger = i ? 2 : 3,
            t.namespace = x.join("."),
            t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + x.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            t.result = void 0,
            t.target || (t.target = r),
            n = null == n ? [t] : w.makeArray(n, [t]),
            p = w.event.special[m] || {},
            i || !p.trigger || !1 !== p.trigger.apply(r, n))) {
                if (!i && !p.noBubble && !g(r)) {
                    for (u = p.delegateType || m,
                    mt.test(u + m) || (a = a.parentNode); a; a = a.parentNode)
                        y.push(a),
                        s = a;
                    s === (r.ownerDocument || v) && y.push(s.defaultView || s.parentWindow || e)
                }
                for (o = 0; (a = y[o++]) && !t.isPropagationStopped(); )
                    d = a,
                    t.type = o > 1 ? u : p.bindType || m,
                    (f = (Y.get(a, "events") || Object.create(null))[t.type] && Y.get(a, "handle")) && f.apply(a, n),
                    (f = l && a[l]) && f.apply && V(a) && (t.result = f.apply(a, n),
                    !1 === t.result && t.preventDefault());
                return t.type = m,
                i || t.isDefaultPrevented() || p._default && !1 !== p._default.apply(y.pop(), n) || !V(r) || l && h(r[m]) && !g(r) && ((s = r[l]) && (r[l] = null),
                w.event.triggered = m,
                t.isPropagationStopped() && d.addEventListener(m, xt),
                r[m](),
                t.isPropagationStopped() && d.removeEventListener(m, xt),
                w.event.triggered = void 0,
                s && (r[l] = s)),
                t.result
            }
        },
        simulate: function(e, t, n) {
            var r = w.extend(new w.Event, n, {
                type: e,
                isSimulated: !0
            });
            w.event.trigger(r, null, t)
        }
    }),
    w.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                w.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n)
                return w.event.trigger(e, t, n, !0)
        }
    }),
    d.focusin || w.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            w.event.simulate(t, e.target, w.event.fix(e))
        };
        w.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this.document || this
                  , i = Y.access(r, t);
                i || r.addEventListener(e, n, !0),
                Y.access(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this.document || this
                  , i = Y.access(r, t) - 1;
                i ? Y.access(r, t, i) : (r.removeEventListener(e, n, !0),
                Y.remove(r, t))
            }
        }
    });
    var bt = e.location
      , wt = {
        guid: Date.now()
    }
      , Tt = /\?/;
    w.parseXML = function(t) {
        var n, r;
        if (!t || "string" != typeof t)
            return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (e) {}
        return r = n && n.getElementsByTagName("parsererror")[0],
        n && !r || w.error("Invalid XML: " + (r ? w.map(r.childNodes, function(e) {
            return e.textContent
        }).join("\n") : t)),
        n
    }
    ;
    var Ct = /\[\]$/
      , Et = /\r?\n/g
      , St = /^(?:submit|button|image|reset|file)$/i
      , kt = /^(?:input|select|textarea|keygen)/i;
    function At(e, t, n, r) {
        var i;
        if (Array.isArray(t))
            w.each(t, function(t, i) {
                n || Ct.test(e) ? r(e, i) : At(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
            });
        else if (n || "object" !== x(t))
            r(e, t);
        else
            for (i in t)
                At(e + "[" + i + "]", t[i], n, r)
    }
    w.param = function(e, t) {
        var n, r = [], i = function(e, t) {
            var n = h(t) ? t() : t;
            r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
        };
        if (null == e)
            return "";
        if (Array.isArray(e) || e.jquery && !w.isPlainObject(e))
            w.each(e, function() {
                i(this.name, this.value)
            });
        else
            for (n in e)
                At(n, e[n], t, i);
        return r.join("&")
    }
    ,
    w.fn.extend({
        serialize: function() {
            return w.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = w.prop(this, "elements");
                return e ? w.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !w(this).is(":disabled") && kt.test(this.nodeName) && !St.test(e) && (this.checked || !de.test(e))
            }).map(function(e, t) {
                var n = w(this).val();
                return null == n ? null : Array.isArray(n) ? w.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Et, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Et, "\r\n")
                }
            }).get()
        }
    });
    var Nt = /%20/g
      , jt = /#.*$/
      , Dt = /([?&])_=[^&]*/
      , qt = /^(.*?):[ \t]*([^\r\n]*)$/gm
      , Lt = /^(?:GET|HEAD)$/
      , Ht = /^\/\//
      , Ot = {}
      , Pt = {}
      , Rt = "*/".concat("*")
      , Mt = v.createElement("a");
    function It(e) {
        return function(t, n) {
            "string" != typeof t && (n = t,
            t = "*");
            var r, i = 0, o = t.toLowerCase().match(P) || [];
            if (h(n))
                for (; r = o[i++]; )
                    "+" === r[0] ? (r = r.slice(1) || "*",
                    (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }
    function Wt(e, t, n, r) {
        var i = {}
          , o = e === Pt;
        function a(s) {
            var u;
            return i[s] = !0,
            w.each(e[s] || [], function(e, s) {
                var l = s(t, n, r);
                return "string" != typeof l || o || i[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l),
                a(l),
                !1)
            }),
            u
        }
        return a(t.dataTypes[0]) || !i["*"] && a("*")
    }
    function Ft(e, t) {
        var n, r, i = w.ajaxSettings.flatOptions || {};
        for (n in t)
            void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && w.extend(!0, e, r),
        e
    }
    Mt.href = bt.href,
    w.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: bt.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(bt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Rt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": w.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Ft(Ft(e, w.ajaxSettings), t) : Ft(w.ajaxSettings, e)
        },
        ajaxPrefilter: It(Ot),
        ajaxTransport: It(Pt),
        ajax: function(t, n) {
            "object" == typeof t && (n = t,
            t = void 0),
            n = n || {};
            var r, i, o, a, s, u, l, c, f, p, d = w.ajaxSetup({}, n), h = d.context || d, g = d.context && (h.nodeType || h.jquery) ? w(h) : w.event, y = w.Deferred(), m = w.Callbacks("once memory"), x = d.statusCode || {}, b = {}, T = {}, C = "canceled", E = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (l) {
                        if (!a)
                            for (a = {}; t = qt.exec(o); )
                                a[t[1].toLowerCase() + " "] = (a[t[1].toLowerCase() + " "] || []).concat(t[2]);
                        t = a[e.toLowerCase() + " "]
                    }
                    return null == t ? null : t.join(", ")
                },
                getAllResponseHeaders: function() {
                    return l ? o : null
                },
                setRequestHeader: function(e, t) {
                    return null == l && (e = T[e.toLowerCase()] = T[e.toLowerCase()] || e,
                    b[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return null == l && (d.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e)
                        if (l)
                            E.always(e[E.status]);
                        else
                            for (t in e)
                                x[t] = [x[t], e[t]];
                    return this
                },
                abort: function(e) {
                    var t = e || C;
                    return r && r.abort(t),
                    S(0, t),
                    this
                }
            };
            if (y.promise(E),
            d.url = ((t || d.url || bt.href) + "").replace(Ht, bt.protocol + "//"),
            d.type = n.method || n.type || d.method || d.type,
            d.dataTypes = (d.dataType || "*").toLowerCase().match(P) || [""],
            null == d.crossDomain) {
                u = v.createElement("a");
                try {
                    u.href = d.url,
                    u.href = u.href,
                    d.crossDomain = Mt.protocol + "//" + Mt.host != u.protocol + "//" + u.host
                } catch (e) {
                    d.crossDomain = !0
                }
            }
            if (d.data && d.processData && "string" != typeof d.data && (d.data = w.param(d.data, d.traditional)),
            Wt(Ot, d, n, E),
            l)
                return E;
            for (f in (c = w.event && d.global) && 0 == w.active++ && w.event.trigger("ajaxStart"),
            d.type = d.type.toUpperCase(),
            d.hasContent = !Lt.test(d.type),
            i = d.url.replace(jt, ""),
            d.hasContent ? d.data && d.processData && 0 === (d.contentType || "").indexOf("application/x-www-form-urlencoded") && (d.data = d.data.replace(Nt, "+")) : (p = d.url.slice(i.length),
            d.data && (d.processData || "string" == typeof d.data) && (i += (Tt.test(i) ? "&" : "?") + d.data,
            delete d.data),
            !1 === d.cache && (i = i.replace(Dt, "$1"),
            p = (Tt.test(i) ? "&" : "?") + "_=" + wt.guid++ + p),
            d.url = i + p),
            d.ifModified && (w.lastModified[i] && E.setRequestHeader("If-Modified-Since", w.lastModified[i]),
            w.etag[i] && E.setRequestHeader("If-None-Match", w.etag[i])),
            (d.data && d.hasContent && !1 !== d.contentType || n.contentType) && E.setRequestHeader("Content-Type", d.contentType),
            E.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Rt + "; q=0.01" : "") : d.accepts["*"]),
            d.headers)
                E.setRequestHeader(f, d.headers[f]);
            if (d.beforeSend && (!1 === d.beforeSend.call(h, E, d) || l))
                return E.abort();
            if (C = "abort",
            m.add(d.complete),
            E.done(d.success),
            E.fail(d.error),
            r = Wt(Pt, d, n, E)) {
                if (E.readyState = 1,
                c && g.trigger("ajaxSend", [E, d]),
                l)
                    return E;
                d.async && d.timeout > 0 && (s = e.setTimeout(function() {
                    E.abort("timeout")
                }, d.timeout));
                try {
                    l = !1,
                    r.send(b, S)
                } catch (e) {
                    if (l)
                        throw e;
                    S(-1, e)
                }
            } else
                S(-1, "No Transport");
            function S(t, n, a, u) {
                var f, p, v, b, T, C = n;
                l || (l = !0,
                s && e.clearTimeout(s),
                r = void 0,
                o = u || "",
                E.readyState = t > 0 ? 4 : 0,
                f = t >= 200 && t < 300 || 304 === t,
                a && (b = function(e, t, n) {
                    for (var r, i, o, a, s = e.contents, u = e.dataTypes; "*" === u[0]; )
                        u.shift(),
                        void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (r)
                        for (i in s)
                            if (s[i] && s[i].test(r)) {
                                u.unshift(i);
                                break
                            }
                    if (u[0]in n)
                        o = u[0];
                    else {
                        for (i in n) {
                            if (!u[0] || e.converters[i + " " + u[0]]) {
                                o = i;
                                break
                            }
                            a || (a = i)
                        }
                        o = o || a
                    }
                    if (o)
                        return o !== u[0] && u.unshift(o),
                        n[o]
                }(d, E, a)),
                !f && w.inArray("script", d.dataTypes) > -1 && w.inArray("json", d.dataTypes) < 0 && (d.converters["text script"] = function() {}
                ),
                b = function(e, t, n, r) {
                    var i, o, a, s, u, l = {}, c = e.dataTypes.slice();
                    if (c[1])
                        for (a in e.converters)
                            l[a.toLowerCase()] = e.converters[a];
                    for (o = c.shift(); o; )
                        if (e.responseFields[o] && (n[e.responseFields[o]] = t),
                        !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                        u = o,
                        o = c.shift())
                            if ("*" === o)
                                o = u;
                            else if ("*" !== u && u !== o) {
                                if (!(a = l[u + " " + o] || l["* " + o]))
                                    for (i in l)
                                        if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                            !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0],
                                            c.unshift(s[1]));
                                            break
                                        }
                                if (!0 !== a)
                                    if (a && e.throws)
                                        t = a(t);
                                    else
                                        try {
                                            t = a(t)
                                        } catch (e) {
                                            return {
                                                state: "parsererror",
                                                error: a ? e : "No conversion from " + u + " to " + o
                                            }
                                        }
                            }
                    return {
                        state: "success",
                        data: t
                    }
                }(d, b, E, f),
                f ? (d.ifModified && ((T = E.getResponseHeader("Last-Modified")) && (w.lastModified[i] = T),
                (T = E.getResponseHeader("etag")) && (w.etag[i] = T)),
                204 === t || "HEAD" === d.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = b.state,
                p = b.data,
                f = !(v = b.error))) : (v = C,
                !t && C || (C = "error",
                t < 0 && (t = 0))),
                E.status = t,
                E.statusText = (n || C) + "",
                f ? y.resolveWith(h, [p, C, E]) : y.rejectWith(h, [E, C, v]),
                E.statusCode(x),
                x = void 0,
                c && g.trigger(f ? "ajaxSuccess" : "ajaxError", [E, d, f ? p : v]),
                m.fireWith(h, [E, C]),
                c && (g.trigger("ajaxComplete", [E, d]),
                --w.active || w.event.trigger("ajaxStop")))
            }
            return E
        },
        getJSON: function(e, t, n) {
            return w.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return w.get(e, void 0, t, "script")
        }
    }),
    w.each(["get", "post"], function(e, t) {
        w[t] = function(e, n, r, i) {
            return h(n) && (i = i || r,
            r = n,
            n = void 0),
            w.ajax(w.extend({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            }, w.isPlainObject(e) && e))
        }
    }),
    w.ajaxPrefilter(function(e) {
        var t;
        for (t in e.headers)
            "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
    }),
    w._evalUrl = function(e, t, n) {
        return w.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: {
                "text script": function() {}
            },
            dataFilter: function(e) {
                w.globalEval(e, t, n)
            }
        })
    }
    ,
    w.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (h(e) && (e = e.call(this[0])),
            t = w(e, this[0].ownerDocument).eq(0).clone(!0),
            this[0].parentNode && t.insertBefore(this[0]),
            t.map(function() {
                for (var e = this; e.firstElementChild; )
                    e = e.firstElementChild;
                return e
            }).append(this)),
            this
        },
        wrapInner: function(e) {
            return h(e) ? this.each(function(t) {
                w(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = w(this)
                  , n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = h(e);
            return this.each(function(n) {
                w(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                w(this).replaceWith(this.childNodes)
            }),
            this
        }
    }),
    w.expr.pseudos.hidden = function(e) {
        return !w.expr.pseudos.visible(e)
    }
    ,
    w.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }
    ,
    w.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    }
    ;
    var Bt = {
        0: 200,
        1223: 204
    }
      , $t = w.ajaxSettings.xhr();
    d.cors = !!$t && "withCredentials"in $t,
    d.ajax = $t = !!$t,
    w.ajaxTransport(function(t) {
        var n, r;
        if (d.cors || $t && !t.crossDomain)
            return {
                send: function(i, o) {
                    var a, s = t.xhr();
                    if (s.open(t.type, t.url, t.async, t.username, t.password),
                    t.xhrFields)
                        for (a in t.xhrFields)
                            s[a] = t.xhrFields[a];
                    for (a in t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType),
                    t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"),
                    i)
                        s.setRequestHeader(a, i[a]);
                    n = function(e) {
                        return function() {
                            n && (n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null,
                            "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Bt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                binary: s.response
                            } : {
                                text: s.responseText
                            }, s.getAllResponseHeaders()))
                        }
                    }
                    ,
                    s.onload = n(),
                    r = s.onerror = s.ontimeout = n("error"),
                    void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                        4 === s.readyState && e.setTimeout(function() {
                            n && r()
                        })
                    }
                    ,
                    n = n("abort");
                    try {
                        s.send(t.hasContent && t.data || null)
                    } catch (e) {
                        if (n)
                            throw e
                    }
                },
                abort: function() {
                    n && n()
                }
            }
    }),
    w.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }),
    w.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return w.globalEval(e),
                e
            }
        }
    }),
    w.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1),
        e.crossDomain && (e.type = "GET")
    }),
    w.ajaxTransport("script", function(e) {
        var t, n;
        if (e.crossDomain || e.scriptAttrs)
            return {
                send: function(r, i) {
                    t = w("<script>").attr(e.scriptAttrs || {}).prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(),
                        n = null,
                        e && i("error" === e.type ? 404 : 200, e.type)
                    }
                    ),
                    v.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
    });
    var _t, zt = [], Ut = /(=)\?(?=&|$)|\?\?/;
    w.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = zt.pop() || w.expando + "_" + wt.guid++;
            return this[e] = !0,
            e
        }
    }),
    w.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, o, a, s = !1 !== t.jsonp && (Ut.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Ut.test(t.data) && "data");
        if (s || "jsonp" === t.dataTypes[0])
            return i = t.jsonpCallback = h(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
            s ? t[s] = t[s].replace(Ut, "$1" + i) : !1 !== t.jsonp && (t.url += (Tt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i),
            t.converters["script json"] = function() {
                return a || w.error(i + " was not called"),
                a[0]
            }
            ,
            t.dataTypes[0] = "json",
            o = e[i],
            e[i] = function() {
                a = arguments
            }
            ,
            r.always(function() {
                void 0 === o ? w(e).removeProp(i) : e[i] = o,
                t[i] && (t.jsonpCallback = n.jsonpCallback,
                zt.push(i)),
                a && h(o) && o(a[0]),
                a = o = void 0
            }),
            "script"
    }),
    d.createHTMLDocument = ((_t = v.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>",
    2 === _t.childNodes.length),
    w.parseHTML = function(e, t, n) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t,
        t = !1),
        t || (d.createHTMLDocument ? ((r = (t = v.implementation.createHTMLDocument("")).createElement("base")).href = v.location.href,
        t.head.appendChild(r)) : t = v),
        o = !n && [],
        (i = N.exec(e)) ? [t.createElement(i[1])] : (i = be([e], t, o),
        o && o.length && w(o).remove(),
        w.merge([], i.childNodes)));
        var r, i, o
    }
    ,
    w.fn.load = function(e, t, n) {
        var r, i, o, a = this, s = e.indexOf(" ");
        return s > -1 && (r = ht(e.slice(s)),
        e = e.slice(0, s)),
        h(t) ? (n = t,
        t = void 0) : t && "object" == typeof t && (i = "POST"),
        a.length > 0 && w.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments,
            a.html(r ? w("<div>").append(w.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }
        ),
        this
    }
    ,
    w.expr.pseudos.animated = function(e) {
        return w.grep(w.timers, function(t) {
            return e === t.elem
        }).length
    }
    ,
    w.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, u, l = w.css(e, "position"), c = w(e), f = {};
            "static" === l && (e.style.position = "relative"),
            s = c.offset(),
            o = w.css(e, "top"),
            u = w.css(e, "left"),
            ("absolute" === l || "fixed" === l) && (o + u).indexOf("auto") > -1 ? (a = (r = c.position()).top,
            i = r.left) : (a = parseFloat(o) || 0,
            i = parseFloat(u) || 0),
            h(t) && (t = t.call(e, n, w.extend({}, s))),
            null != t.top && (f.top = t.top - s.top + a),
            null != t.left && (f.left = t.left - s.left + i),
            "using"in t ? t.using.call(e, f) : c.css(f)
        }
    },
    w.fn.extend({
        offset: function(e) {
            if (arguments.length)
                return void 0 === e ? this : this.each(function(t) {
                    w.offset.setOffset(this, e, t)
                });
            var t, n, r = this[0];
            return r ? r.getClientRects().length ? (t = r.getBoundingClientRect(),
            n = r.ownerDocument.defaultView,
            {
                top: t.top + n.pageYOffset,
                left: t.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n, r = this[0], i = {
                    top: 0,
                    left: 0
                };
                if ("fixed" === w.css(r, "position"))
                    t = r.getBoundingClientRect();
                else {
                    for (t = this.offset(),
                    n = r.ownerDocument,
                    e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === w.css(e, "position"); )
                        e = e.parentNode;
                    e && e !== r && 1 === e.nodeType && ((i = w(e).offset()).top += w.css(e, "borderTopWidth", !0),
                    i.left += w.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - i.top - w.css(r, "marginTop", !0),
                    left: t.left - i.left - w.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === w.css(e, "position"); )
                    e = e.offsetParent;
                return e || re
            })
        }
    }),
    w.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        w.fn[e] = function(r) {
            return $(this, function(e, r, i) {
                var o;
                if (g(e) ? o = e : 9 === e.nodeType && (o = e.defaultView),
                void 0 === i)
                    return o ? o[t] : e[r];
                o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i
            }, e, r, arguments.length)
        }
    }),
    w.each(["top", "left"], function(e, t) {
        w.cssHooks[t] = $e(d.pixelPosition, function(e, n) {
            if (n)
                return n = Be(e, t),
                Me.test(n) ? w(e).position()[t] + "px" : n
        })
    }),
    w.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        w.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            w.fn[r] = function(i, o) {
                var a = arguments.length && (n || "boolean" != typeof i)
                  , s = n || (!0 === i || !0 === o ? "margin" : "border");
                return $(this, function(t, n, i) {
                    var o;
                    return g(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement,
                    Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? w.css(t, n, s) : w.style(t, n, i, s)
                }, t, a ? i : void 0, a)
            }
        })
    }),
    w.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        w.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    w.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }),
    w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
        w.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    });
    var Xt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    w.proxy = function(e, t) {
        var n, r, o;
        if ("string" == typeof t && (n = e[t],
        t = e,
        e = n),
        h(e))
            return r = i.call(arguments, 2),
            (o = function() {
                return e.apply(t || this, r.concat(i.call(arguments)))
            }
            ).guid = e.guid = e.guid || w.guid++,
            o
    }
    ,
    w.holdReady = function(e) {
        e ? w.readyWait++ : w.ready(!0)
    }
    ,
    w.isArray = Array.isArray,
    w.parseJSON = JSON.parse,
    w.nodeName = A,
    w.isFunction = h,
    w.isWindow = g,
    w.camelCase = X,
    w.type = x,
    w.now = Date.now,
    w.isNumeric = function(e) {
        var t = w.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }
    ,
    w.trim = function(e) {
        return null == e ? "" : (e + "").replace(Xt, "")
    }
    ,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return w
    });
    var Vt = e.jQuery
      , Gt = e.$;
    return w.noConflict = function(t) {
        return e.$ === w && (e.$ = Gt),
        t && e.jQuery === w && (e.jQuery = Vt),
        w
    }
    ,
    void 0 === t && (e.jQuery = e.$ = w),
    w
});
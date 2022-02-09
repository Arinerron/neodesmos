define('vendor/html-parse-stringify2', [], function() {
    return function(e) {
        var t = {};
        function n(r) {
            if (t[r])
                return t[r].exports;
            var o = t[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(o.exports, o, o.exports, n),
            o.l = !0,
            o.exports
        }
        return n.m = e,
        n.c = t,
        n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: r
            })
        }
        ,
        n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        n.t = function(e, t) {
            if (1 & t && (e = n(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var r = Object.create(null);
            if (n.r(r),
            Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var o in e)
                    n.d(r, o, function(t) {
                        return e[t]
                    }
                    .bind(null, o));
            return r
        }
        ,
        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return n.d(t, "a", t),
            t
        }
        ,
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        n.p = "",
        n(n.s = 0)
    }([function(e, t, n) {
        e.exports = {
            parse: n(1),
            stringify: n(4)
        }
    }
    , function(e, t, n) {
        var r = /(?:<!--[\S\s]*?-->|<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>)/g
          , o = n(2)
          , i = Object.create ? Object.create(null) : {};
        function c(e, t, n, r, o) {
            var i = t.indexOf("<", r)
              , c = t.slice(r, -1 === i ? void 0 : i);
            /^\s*$/.test(c) && (c = " "),
            (!o && i > -1 && n + e.length >= 0 || " " !== c) && e.push({
                type: "text",
                content: c
            })
        }
        e.exports = function(e, t) {
            t || (t = {}),
            t.components || (t.components = i);
            var n, u = [], a = -1, l = [], f = {}, p = !1;
            return e.replace(r, function(r, i) {
                if (p) {
                    if (r !== "</" + n.name + ">")
                        return;
                    p = !1
                }
                var s, d = "/" !== r.charAt(1), m = 0 === r.indexOf("\x3c!--"), g = i + r.length, v = e.charAt(g);
                d && !m && (a++,
                "tag" === (n = o(r)).type && t.components[n.name] && (n.type = "component",
                p = !0),
                n.voidElement || p || !v || "<" === v || c(n.children, e, a, g, t.ignoreWhitespace),
                f[n.tagName] = n,
                0 === a && u.push(n),
                (s = l[a - 1]) && s.children.push(n),
                l[a] = n),
                (m || !d || n.voidElement) && (m || a--,
                !p && "<" !== v && v && c(s = -1 === a ? u : l[a].children, e, a, g, t.ignoreWhitespace))
            }),
            !u.length && e.length && c(u, e, 0, 0, t.ignoreWhitespace),
            u
        }
    }
    , function(e, t, n) {
        var r = /([\w-]+)|=|(['"])([.\s\S]*?)\2/g
          , o = n(3);
        e.exports = function(e) {
            var t, n = 0, i = !0, c = {
                type: "tag",
                name: "",
                voidElement: !1,
                attrs: {},
                children: []
            };
            return e.replace(r, function(r) {
                if ("=" === r)
                    return i = !0,
                    void n++;
                i ? 0 === n ? ((o[r] || "/" === e.charAt(e.length - 2)) && (c.voidElement = !0),
                c.name = r) : (c.attrs[t] = r.replace(/^['"]|['"]$/g, ""),
                t = void 0) : (t && (c.attrs[t] = t),
                t = r),
                n++,
                i = !1
            }),
            c
        }
    }
    , function(e, t) {
        e.exports = {
            area: !0,
            base: !0,
            br: !0,
            col: !0,
            embed: !0,
            hr: !0,
            img: !0,
            input: !0,
            keygen: !0,
            link: !0,
            menuitem: !0,
            meta: !0,
            param: !0,
            source: !0,
            track: !0,
            wbr: !0
        }
    }
    , function(e, t) {
        function n(e, t) {
            switch (t.type) {
            case "text":
                return e + t.content;
            case "tag":
                return e += "<" + t.name + (t.attrs ? function(e) {
                    var t = [];
                    for (var n in e)
                        t.push(n + '="' + e[n] + '"');
                    return t.length ? " " + t.join(" ") : ""
                }(t.attrs) : "") + (t.voidElement ? "/>" : ">"),
                t.voidElement ? e : e + t.children.reduce(n, "") + "</" + t.name + ">"
            }
        }
        e.exports = function(e) {
            return e.reduce(function(e, t) {
                return e + n("", t)
            }, "")
        }
    }
    ])
});
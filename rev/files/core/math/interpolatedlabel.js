
define('core/math/interpolatedlabel', ["require", "exports", "parsenodes", "core/lib/label", "./policy", "core/math/types"], function(require, e, t, n, r, a) {
    "use strict";
    function u(e) {
        if (e.length < 2)
            return "text";
        var t = e.split("`").length - 1;
        return t < 2 ? "text" : 2 === t && "`" === e[0] && "`" === e[e.length - 1] ? "latex" : "mixed"
    }
    function i(e) {
        if (0 === e.length)
            return [""];
        for (var t = [], n = e.split(/(`)/), r = !1, a = "", u = 0; u < n.length; u++) {
            var i = n[u];
            i.length && ("`" === i ? (a += "`",
            (r = !r) || (t.push(a),
            a = "")) : (a += i,
            r || (t.push(a),
            a = "")))
        }
        return a.length && t.push(a),
        t
    }
    function l(e) {
        for (var t, n = "\\$({" + ["[a-zA-Z][0-9]*", "[a-zA-Z]_[a-zA-Z0-9]+", "[a-zA-Z]_\\{[a-zA-Z0-9]+\\}", "\\\\[a-zA-Z]+", "\\\\[a-zA-Z]+_{[a-zA-Z0-9]+}", "\\\\[a-zA-Z]+_[a-zA-Z0-9]+"].join("})|\\$({") + "})", r = new RegExp(n,"g"), a = [], u = 0, i = 0; t = r.exec(e); ) {
            (i = t.index) > u && a.push(e.substr(u, i - u));
            var l = t[0]
              , s = l.replace(/[{}\$]/g, "").replace(/^([a-zA-Z])([0-9]+)$/, "$1_$2");
            a.push({
                symbol: s,
                str: l
            }),
            u = t.index + l.length
        }
        return u < e.length && a.push(e.substr(u)),
        {
            raw: e,
            parts: a
        }
    }
    function s(e, t) {
        return t ? "{" + n.truncatedLatexLabel(e, {
            bigCutoff: 1e7,
            digits: 8
        }) + "}" : n.truncatedPlainmathLabel(e, {
            bigCutoff: 1e7,
            digits: 8
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.interpolate = e.parse = e.chunkLabel = e.classifyLabelText = void 0,
    e.classifyLabelText = u,
    e.chunkLabel = i,
    e.parse = function(e) {
        return i(e).map(l)
    }
    ,
    e.interpolate = function(e, n, i) {
        return e.map(function(e) {
            return function(e, n, i) {
                for (var l = [], o = "latex" === u(e.raw), p = 0, f = e.parts; p < f.length; p++) {
                    var c = f[p];
                    if ("string" == typeof c)
                        l.push(c);
                    else {
                        var h = t.Identifier(c.symbol).tryGetConcreteTree(r.defaultPolicy, n);
                        if (h.valueType === a.Number && 0 === h.getDependencies().length) {
                            if ("number" == typeof (g = h.asValue())) {
                                l.push(s(g, o));
                                continue
                            }
                        } else if (h.valueType === a.ListOfNumber && i < h.length && 0 === h.getDependencies().length) {
                            var g;
                            if ("number" == typeof (g = h.elementAt(i).asValue())) {
                                l.push(s(g, o));
                                continue
                            }
                        }
                        o ? l.push("{?}") : l.push("?")
                    }
                }
                return l.join("")
            }(e, n, i)
        }).join("")
    }
});

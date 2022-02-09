define('main/data_helpers', ["require", "exports", "vendor/papaparse", "underscore", "bugsnag", "geometry/math/isNumber"], function(require, e, r, t, a, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.parse = e.getExpressions = void 0,
    e.getExpressions = function(e) {
        var r = e.split(/\r?\n/)
          , a = []
          , s = !1;
        if (!(r.length < 2)) {
            for (var i = 0; i < r.length; i++) {
                var o = r[i];
                if (o.trim()) {
                    i > 0 && !n.isNumber(o.replace(/,(\d{3})/g, "$1")) && (s = !0);
                    var u = {
                        content: o
                    };
                    a.push(u)
                }
            }
            if (!s) {
                var p = t.pluck(a, "content").map(function(e) {
                    return e.replace(/,(\d{3})/g, "$1")
                });
                return n.isNumber(p[0]) || (p = p.slice(1)),
                [{
                    content: "\\left[" + p.join(",") + "\\right]",
                    numberList: !0
                }]
            }
            return a
        }
    }
    ,
    e.parse = function(e) {
        if (!/^\s*$/.test(e)) {
            var t = r.parse(e, {
                preview: 1e3
            })
              , n = [];
            if (!t.errors.length || t.data.length) {
                if (t.data.length && !(t.data.length < 2)) {
                    for (var s = t.data[0].length, i = 0; i < s; i++)
                        n.push([]);
                    for (var o = 0; o < t.data.length; o++)
                        if (0 !== o || !isNaN(parseFloat(t.data[o][0]))) {
                            if (t.data[o].length < 2)
                                return;
                            if (t.data[o][0] || t.data[o][1])
                                for (i = 0; i < s; i++) {
                                    var u = (t.data[o][i] || "").replace(/,(\d{3})/g, "$1");
                                    if (u && isNaN(parseFloat(u)))
                                        return;
                                    n[i].push(u)
                                }
                        }
                    if (!(n[0].length < 2))
                        return n
                }
            } else
                a.notify("PapaParse.parse returned errors.", {
                    metaData: {
                        input: e,
                        output: t.errors
                    }
                })
        }
    }
});


define('core/graphing-calc/diffs/apply-diff', ["require", "exports", "underscore", "../../lib/deepCopy"], function(require, e, r, n) {
    "use strict";
    function t(e, n) {
        for (var o = 0, i = r.keys(n); o < i.length; o++) {
            var h = i[o]
              , l = n[h];
            p(l) ? e[h] = l.s : a(l) ? delete e[h] : s(l) ? e[h] = u(e[h], l.l) : f(l) && (e[h] = t(e[h], l.e))
        }
        return e
    }
    function u(e, r) {
        for (var n = [], u = 0; u < e.length; u++) {
            var p = r[u];
            p && p.a && n.push.apply(n, o(e, p.a)),
            p && p.e ? n.push(t(e[u], p.e)) : p && p.d || n.push(e[u])
        }
        var a = r[e.length];
        return a && a.a && n.push.apply(n, o(e, a.a)),
        n
    }
    function o(e, r) {
        for (var n = [], u = 0, o = r; u < o.length; u++) {
            var p = o[u];
            if (p.hasOwnProperty("s"))
                n.push(p.s);
            else if (i(p)) {
                var a = e[p.m.f];
                p.m.e ? n.push(t(a, p.m.e)) : n.push(a)
            }
        }
        return n
    }
    function p(e) {
        return e.hasOwnProperty("s")
    }
    function a(e) {
        return e.hasOwnProperty("d")
    }
    function s(e) {
        return e.hasOwnProperty("l")
    }
    function f(e) {
        return e.hasOwnProperty("e")
    }
    function i(e) {
        return e.hasOwnProperty("m")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.applyDiff = void 0,
    e.applyDiff = function(e, r) {
        return t(n.default(e), r)
    }
});
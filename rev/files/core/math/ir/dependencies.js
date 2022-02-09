
define('core/math/ir/dependencies', ["require", "exports", "core/math/builtinframe"], function(require, e, n) {
    "use strict";
    function r(e, n) {
        return "FunctionDefinition" === n.type && (n = n._expression),
        i(e, n, {})
    }
    function t(e, n, r) {
        for (var i = [], p = [], f = 0, o = n.scopes; f < o.length; f++) {
            for (var d = t(e, o[f], r), u = 0, a = d.freeDependencies; u < a.length; u++) {
                var c = a[u];
                -1 === i.indexOf(c) && -1 === n.definitions.indexOf(c) && i.push(c)
            }
            for (var l = 0, y = d.updateSymbols; l < y.length; l++) {
                c = y[l];
                -1 === p.indexOf(c) && p.push(c)
            }
        }
        for (var h = 0, g = n.dependencies; h < g.length; h++) {
            for (var v = s(e, g[h], r), D = 0, S = v.freeDependencies; D < S.length; D++) {
                c = S[D];
                -1 === i.indexOf(c) && -1 === n.definitions.indexOf(c) && i.push(c)
            }
            for (var m = 0, b = v.updateSymbols; m < b.length; m++) {
                c = b[m];
                -1 === p.indexOf(c) && p.push(c)
            }
        }
        return {
            freeDependencies: i,
            updateSymbols: p
        }
    }
    function i(e, n, r) {
        if ("Slider" === n.type || "Assignment" === n.type)
            return i(e, n._expression, r);
        var s = t(e, n.getScope(), r)
          , p = s.freeDependencies
          , f = s.updateSymbols
          , o = n.getUpdateSymbols();
        if (o.length > 0) {
            f = f.slice();
            for (var d = 0, u = o; d < u.length; d++) {
                var a = u[d];
                -1 === f.indexOf(a) && f.push(a)
            }
        }
        return {
            freeDependencies: p,
            updateSymbols: f
        }
    }
    function s(e, r, t) {
        if (t[r])
            return t[r];
        if (n[r])
            return t[r] = {
                freeDependencies: [],
                updateSymbols: []
            },
            t[r];
        var s = e[r];
        return s ? (t[r] = {
            freeDependencies: [r],
            updateSymbols: []
        },
        t[r] = i(e, s, t),
        t[r]) : (t[r] = {
            freeDependencies: [r],
            updateSymbols: []
        },
        t[r])
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getCacheKeys = e.analyzeDependencies = e.getFreeDependencies = e.FRAME_SENTINEL = void 0,
    e.FRAME_SENTINEL = {},
    e.getFreeDependencies = function(e, n) {
        return r(e, n).freeDependencies
    }
    ,
    e.analyzeDependencies = r,
    e.getCacheKeys = function(n, r) {
        for (var t = {}, i = r.getDependencies().slice(); i.length; ) {
            var s = i.pop();
            if (!t.hasOwnProperty(s)) {
                var p = n[s];
                if (p === e.FRAME_SENTINEL)
                    return;
                t[s] = p,
                p && p.getDependencies && Array.prototype.push.apply(i, p.getDependencies())
            }
        }
        return function(e) {
            var n = [];
            for (var r in e)
                n.push([r, e[r]]);
            return n
        }(t)
    }
});
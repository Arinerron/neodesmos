define('core/math/findIntersections', ['require', 'core/types/graphmode', './plotter', 'parsenodes', 'core/math/distance'], function(require) {
    "use strict";
    var n = require("core/types/graphmode")
      , t = require("./plotter").default
      , e = require("parsenodes")
      , r = require("core/math/distance");
    function i(n) {
        for (var t = [], e = 0; e < n; e++)
            t[e] = {
                x: [],
                y: [],
                intersects: []
            };
        return t
    }
    function o(t, e, r, i) {
        return r === n.X && i === n.X || r === n.Y && i === n.Y ? function(n) {
            return e(n) - t(n)
        }
        : (r === n.X && i === n.Y || r === n.Y && i === n.X) && function(n) {
            return n - e(t(n))
        }
    }
    function s(n, t) {
        t instanceof e.SolvedEquation ? t = t._expression : t instanceof e.OptimizedRegression && (t = t.model);
        var r = []
          , i = [];
        return t instanceof e.DoubleInequality ? e.List.eachArgs(t._expressions, function(n) {
            r.push(n[0].getCompiledFunction()),
            i.push(n[0].isConstant && n[1].isNaN()),
            r.push(n[1].getCompiledFunction()),
            i.push(n[1].isConstant && n[1].isNaN())
        }) : e.List.wrap(t).eachElement(function(n) {
            r.push(n.getCompiledFunction()),
            i.push(n.isConstant && n.isNaN())
        }),
        {
            functions: r,
            skipIntersecting: i
        }
    }
    function p(n, t) {
        n.intersects = Array(n.x.length);
        for (var e = 0; e < n.x.length; e++)
            n.intersects[e] = t
    }
    function u(t, e) {
        if (e === n.X) {
            var r = t.y;
            t.y = t.x,
            t.x = r
        }
    }
    function c(n, t) {
        Array.prototype.push.apply(n.x, t.x),
        Array.prototype.push.apply(n.y, t.y),
        Array.prototype.push.apply(n.intersects, t.intersects)
    }
    function a(n, e, i) {
        var o = t.sampleXY(n, e)
          , s = o.poi.zeros
          , p = o.poi.extrema
          , u = []
          , c = 0
          , a = 0;
        for (c = 0; c < s.x.length; c++) {
            for (; a < p.x.length && p.x[a] < s.x[c]; a++)
                r.approx(p.y[a], 0) && u.push(p.x[a]);
            u.push(s.x[c])
        }
        for (; a < p.x.length; a++)
            r.approx(p.y[a], 0) && u.push(p.x[a]);
        return {
            x: u,
            y: u.map(i)
        }
    }
    return {
        findIntersections: function(n, e, r) {
            var f, h, g, l = n[r], y = l.getGraphInfo(), x = l.getGraphMode();
            try {
                h = i((f = s(l.policy, l.concreteTree)).functions.length),
                g = function(n, t) {
                    var e = [];
                    for (var r in n)
                        if (n.hasOwnProperty(r) && String(r) !== String(t) && n[r].shouldIntersect()) {
                            var i = n[r]
                              , o = s(i.policy, i.concreteTree);
                            e.push({
                                id: r,
                                graphMode: i.getGraphMode(),
                                functions: o.functions,
                                skipIntersecting: o.skipIntersecting
                            })
                        }
                    return e
                }(n, r)
            } catch (n) {
                return i(0)
            }
            if (!g)
                return h;
            for (var d = 0, v = 0; v < g.length; v++)
                for (var m = g[v], I = 0; I < f.functions.length; I++)
                    if (!f.skipIntersecting[I])
                        for (var C = f.functions[I].fn, N = t.computeDomain(e, y, C), X = 0; X < m.functions.length; X++)
                            if (!g[v].skipIntersecting[X]) {
                                var k = o(C, m.functions[X].fn, x, m.graphMode);
                                if (k) {
                                    var A = a(k, N, C);
                                    if ((d += A.x.length) > 100)
                                        return i(f.functions.length);
                                    p(A, m.id),
                                    u(A, x),
                                    c(h[I], A)
                                }
                            }
            return h
        },
        findIndicatorZeros: a
    }
});
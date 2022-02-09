
define('core/math/implicit-plotter', ["require", "exports", "core/math/distance", "./curve-accumulator"], function(require, e, r, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.displayTriangles = e.traceContours = e.triangulate = e.buildQuadTree = e.sampleImplicitDiagnostic = e.sampleImplicit = void 0;
    var n = Math.pow(2, 14);
    function t(e, r) {
        var i = Math.pow(2, -5)
          , n = u(r, i)
          , t = u(r, 2 * i)
          , c = v(e, n, t)
          , a = k(c.root, e, n);
        return {
            paddedDomain: n,
            rootDomain: t,
            quadTree: c,
            triangles: a,
            contours: I(a, e, n)
        }
    }
    function c(e, r, i) {
        return {
            x: e,
            y: r,
            z: i
        }
    }
    function a(e, r, i) {
        return {
            x: e,
            y: r,
            isZero: i
        }
    }
    function s(e, r, i) {
        return {
            vertices: [e, r, i],
            visited: !1,
            next: void 0
        }
    }
    function u(e, r) {
        var i = (1 + r) * e.xmin - r * e.xmax
          , n = (1 + r) * e.xmax - r * e.xmin;
        return {
            xmin: i,
            ymin: (1 + r) * e.ymin - r * e.ymax,
            xmax: n,
            ymax: (1 + r) * e.ymax - r * e.ymin,
            xtolerance: e.xtolerance,
            ytolerance: e.ytolerance
        }
    }
    function o(e, r) {
        return {
            depth: e,
            vertices: r,
            children: void 0,
            center: void 0
        }
    }
    function l(e, r, i) {
        e.center = p(e.vertices[0], e.vertices[1], e.vertices[2], e.vertices[3], r, i)
    }
    function v(e, r, i) {
        var t = function(e, r) {
            var i = r.xmin
              , n = r.xmax
              , t = r.ymin
              , c = r.ymax;
            return o(0, [m(i, c, e), m(n, c, e), m(n, t, e), m(i, t, e)])
        }(e, i)
          , c = []
          , a = [];
        a.push(t);
        var s = 1
          , u = !0;
        e: for (; a.length; ) {
            var v = c;
            c = a,
            a = v;
            for (var h = void 0; h = c.pop(); )
                if (d(h, e, r)) {
                    if (f(h, e),
                    !h.children) {
                        u = !1;
                        break e
                    }
                    if (a.push(h.children[0]),
                    a.push(h.children[1]),
                    a.push(h.children[2]),
                    a.push(h.children[3]),
                    (s += 3) >= n) {
                        u = !1;
                        break e
                    }
                } else
                    l(h, e, r)
        }
        for (var x = 0; x < c.length; x++)
            l(c[x], e, r);
        for (x = 0; x < a.length; x++)
            l(a[x], e, r);
        return {
            root: t,
            resolved: u
        }
    }
    function f(e, r) {
        var i = e.depth + 1
          , n = e.vertices[0]
          , t = e.vertices[1]
          , c = e.vertices[2]
          , a = e.vertices[3]
          , s = y(n, t, r)
          , u = y(t, c, r)
          , l = y(c, a, r)
          , v = y(a, n, r)
          , f = y(n, c, r);
        e.children = [o(i, [n, s, f, v]), o(i, [s, t, u, f]), o(i, [f, u, c, l]), o(i, [v, f, l, a])]
    }
    function d(e, r, i) {
        if (e.depth < 5)
            return !0;
        if (function(e, r) {
            return e.vertices[0].x < r.xmin || e.vertices[0].y > r.ymax || e.vertices[2].x > r.xmax || e.vertices[2].y < r.ymin
        }(e, i))
            return !1;
        if (function(e, r) {
            if (e.vertices[1].x - e.vertices[0].x < 10 * r.xtolerance)
                return !0;
            if (e.vertices[0].y - e.vertices[3].y < 10 * r.ytolerance)
                return !0;
            return !1
        }(e, i))
            return !1;
        var n = e.vertices[0]
          , t = e.vertices[1]
          , c = e.vertices[2]
          , a = e.vertices[3];
        if (isNaN(n.z) && isNaN(t.z) && isNaN(c.z) && isNaN(a.z))
            return !1;
        if (isNaN(n.z) || isNaN(t.z) || isNaN(c.z) || isNaN(a.z))
            return !0;
        var s = p(n, t, c, a, r, i)
          , u = N(n, t, r, i)
          , o = N(t, c, r, i)
          , l = N(c, a, r, i)
          , v = N(a, n, r, i);
        return x(n, u, r) || x(t, u, r) || x(t, o, r) || x(c, o, r) || x(c, l, r) || x(a, l, r) || x(a, v, r) || x(n, v, r) || h(n, u, s, r, i) || h(u, t, s, r, i) || h(t, o, s, r, i) || h(o, c, s, r, i) || h(c, l, s, r, i) || h(l, a, s, r, i) || h(a, v, s, r, i) || h(v, n, s, r, i)
    }
    function h(e, i, n, t, c) {
        if (e.z > 0 == i.z > 0 && i.z > 0 == n.z > 0)
            return !1;
        var a, s, u, o;
        if (e.z > 0 == i.z > 0) {
            if ((a = y(e, i, t)).z > 0 != e.z > 0)
                return !0;
            s = b(e, n, t, c),
            u = b(i, n, t, c),
            o = b(a, n, t, c)
        } else if (i.z > 0 == n.z > 0) {
            if ((a = y(i, n, t)).z > 0 != i.z > 0)
                return !0;
            s = b(i, e, t, c),
            u = b(n, e, t, c),
            o = b(a, e, t, c)
        } else {
            if ((a = y(n, e, t)).z > 0 != n.z > 0)
                return !0;
            s = b(n, i, t, c),
            u = b(e, i, t, c),
            o = b(a, i, t, c)
        }
        var l = c.xtolerance
          , v = c.ytolerance;
        return r.pointToSegment(v * o.x, l * o.y, v * s.x, l * s.y, v * u.x, l * u.y) > l * v
    }
    function x(e, r, i) {
        if (isNaN(e.z) && isNaN(r.z))
            return !1;
        if (isNaN(e.z) || isNaN(r.z))
            return e.z > 0 || r.z > 0;
        var n = 4 * y(e, r, i).z - r.z - 3 * e.z
          , t = 1e-4
          , c = (i(.9999 * e.x + t * r.x, .9999 * e.y + t * r.y) - e.z) / t
          , a = Math.max(Math.abs(e.z), Math.abs(r.z));
        return Math.abs(n - c) > .125 * a
    }
    function z(e, r) {
        return e.x < r.xmin || e.x > r.xmax || e.y < r.ymin || e.y > r.ymax
    }
    function m(e, r, i) {
        return c(e, r, i(e, r))
    }
    function y(e, r, i) {
        return m(.5 * (e.x + r.x), .5 * (e.y + r.y), i)
    }
    function N(e, r, i, n) {
        if (z(e, n) || z(r, n))
            return y(e, r, i);
        if (isNaN(e.z) || isNaN(r.z))
            return function(e, r, i, n) {
                if (isNaN(e.z) === isNaN(r.z))
                    return y(e, r, i);
                if (isNaN(e.z)) {
                    var t = e;
                    e = r,
                    r = t
                }
                var a = e.x
                  , s = r.x
                  , u = e.y
                  , o = r.y
                  , l = e.z
                  , v = n.xtolerance
                  , f = n.ytolerance;
                for (; Math.abs(a - s) > v || Math.abs(u - o) > f; ) {
                    var d = .5 * (a + s)
                      , h = .5 * (u + o)
                      , x = i(d, h);
                    isNaN(x) === isNaN(l) ? (a = d,
                    u = h,
                    l = x) : (s = d,
                    o = h)
                }
                return c(a, u, l)
            }(e, r, i, n);
        if (e.z > 0 != r.z > 0)
            return y(e, r, i);
        var t = .01
          , a = i(.99 * e.x + t * r.x, .99 * e.y + t * r.y) - e.z
          , s = r.z - i(t * e.x + .99 * r.x, t * e.y + .99 * r.y);
        return isNaN(a) || isNaN(s) || a > 0 == s > 0 ? y(e, r, i) : g(c(e.x, e.y, a), c(r.x, r.y, s), i)
    }
    function p(e, r, i, n, t, c) {
        var a = N(e, i, t, c);
        return e.z > 0 == i.z > 0 && a.z > 0 != e.z > 0 ? a : (a = N(r, n, t, c),
        r.z > 0 == n.z > 0 && a.z > 0 != r.z > 0 ? a : y(e, i, t))
    }
    function g(e, r, i) {
        if (isNaN(e.z))
            return r;
        if (isNaN(r.z))
            return e;
        if (isFinite(e.z) || isFinite(r.z)) {
            if (isFinite(e.z)) {
                if (isFinite(r.z)) {
                    var n = 1 - e.z / r.z
                      , t = 1 - r.z / e.z;
                    return m(e.x / n + r.x / t, e.y / n + r.y / t, i)
                }
                return e
            }
            return r
        }
        return y(e, r, i)
    }
    function b(e, r, i, n) {
        var t = e.x
          , s = r.x
          , u = e.y
          , o = r.y
          , l = e.z
          , v = r.z
          , f = n.xtolerance
          , d = n.ytolerance;
        if (z(e, n) || z(r, n)) {
            var h = y(e, r, i);
            return a(h.x, h.y, !1)
        }
        for (; Math.abs(t - s) > f || Math.abs(u - o) > d; ) {
            var x = .5 * (t + s)
              , m = .5 * (u + o)
              , N = i(x, m);
            N > 0 == l > 0 ? (t = x,
            u = m,
            l = N) : (s = x,
            o = m,
            v = N)
        }
        if (isNaN(l))
            return a(s, o, !1);
        if (isNaN(v))
            return a(t, u, !1);
        var p = g(c(t, u, l), c(s, o, v), i)
          , b = 0 === l || 0 === v || 0 === p.z || p.z >= l == v >= p.z && Math.abs(p.z) < 1e250;
        return a(p.x, p.y, b)
    }
    function k(e, r, i) {
        var n = {
            triangles: [],
            edgeCache: {},
            domain: i,
            fn: r
        };
        return M(e, n),
        n.triangles
    }
    function M(e, r) {
        e.children && (M(e.children[0], r),
        M(e.children[1], r),
        M(e.children[2], r),
        M(e.children[3], r),
        A(e.children[0], e.children[1], r),
        A(e.children[3], e.children[2], r),
        S(e.children[1], e.children[2], r),
        S(e.children[0], e.children[3], r))
    }
    function A(e, r, i) {
        e.children && r.children ? (A(e.children[1], r.children[0], i),
        A(e.children[2], r.children[3], i)) : e.children ? (A(e.children[1], r, i),
        A(e.children[2], r, i)) : r.children ? (A(e, r.children[0], i),
        A(e, r.children[3], i)) : function(e, r, i) {
            if (!e.center || !r.center)
                return;
            var n, t;
            e.depth >= r.depth ? (n = N(e.vertices[1], e.vertices[2], i.fn, i.domain),
            t = T(e.vertices[1], r.center, e.vertices[2], e.center, n)) : (n = N(r.vertices[0], r.vertices[3], i.fn, i.domain),
            t = T(r.vertices[0], r.center, r.vertices[3], e.center, n));
            D(t, i.edgeCache, i.domain);
            for (var c = 0; c < 4; c++)
                i.triangles.push(t[c])
        }(e, r, i)
    }
    function S(e, r, i) {
        e.children && r.children ? (S(e.children[2], r.children[1], i),
        S(e.children[3], r.children[0], i)) : e.children ? (S(e.children[2], r, i),
        S(e.children[3], r, i)) : r.children ? (S(e, r.children[1], i),
        S(e, r.children[0], i)) : function(e, r, i) {
            if (!e.center || !r.center)
                return;
            var n, t;
            e.depth >= r.depth ? (n = N(e.vertices[3], e.vertices[2], i.fn, i.domain),
            t = T(e.vertices[2], r.center, e.vertices[3], e.center, n)) : (n = N(r.vertices[1], r.vertices[0], i.fn, i.domain),
            t = T(r.vertices[1], r.center, r.vertices[0], e.center, n));
            D(t, i.edgeCache, i.domain);
            for (var c = 0; c < 4; c++)
                i.triangles.push(t[c])
        }(e, r, i)
    }
    function T(e, r, i, n, t) {
        return [s(e, t, r), s(r, t, i), s(i, t, n), s(n, t, e)]
    }
    function C(e, r, i) {
        return e.z > 0 && !z(e, i) && (!(r.z > 0) || z(r, i))
    }
    function w(e, r) {
        return e.x + "," + e.y + "," + r.x + "," + r.y
    }
    function D(e, r, i) {
        F(e[0], e[1], e[2], w(e[1].vertices[2], e[1].vertices[0]), r, i),
        F(e[1], e[2], e[3], w(e[2].vertices[0], e[2].vertices[2]), r, i),
        F(e[2], e[3], e[0], w(e[3].vertices[2], e[3].vertices[0]), r, i),
        F(e[3], e[0], e[1], w(e[0].vertices[0], e[0].vertices[2]), r, i)
    }
    function F(e, r, i, n, t, c) {
        var a = r.vertices[0]
          , s = r.vertices[1]
          , u = r.vertices[2];
        C(s, u, c) && (r.next = i),
        C(a, s, c) && (r.next = e),
        C(u, a, c) && function(e, r, i) {
            i[r] ? e.next = i[r] : i[r] = e
        }(r, n, t),
        C(a, u, c) && function(e, r, i) {
            i[r] ? i[r].next = e : i[r] = e
        }(r, n, t)
    }
    function I(e, r, n) {
        for (var t = {
            fillAccumulator: new i.Accumulator(n),
            strokeAccumulator: new i.Accumulator(n),
            fn: r,
            domain: n
        }, c = 0; c < e.length; c++) {
            var a = e[c];
            a.next && !a.visited && q(a, t)
        }
        return {
            strokeSegments: t.strokeAccumulator.finish().segments,
            fillSegments: t.fillAccumulator.finish().segments
        }
    }
    function q(e, r) {
        for (; ; ) {
            var i = e.vertices[0]
              , n = e.vertices[1]
              , t = e.vertices[2];
            if (P(i, n, r),
            P(n, t, r),
            P(t, i, r),
            e.visited)
                break;
            if (!e.next)
                break;
            e.visited = !0,
            e = e.next
        }
        r.strokeAccumulator.breakSegment(),
        r.fillAccumulator.breakSegment()
    }
    function P(e, r, i) {
        if (C(e, r, i.domain)) {
            var n = b(e, r, i.fn, i.domain);
            i.fillAccumulator.addPoint([n.x, n.y]),
            n.isZero ? i.strokeAccumulator.addPoint([n.x, n.y]) : i.strokeAccumulator.breakSegment()
        }
    }
    e.sampleImplicit = function(e, r) {
        var i = t(e, r);
        return {
            segments: i.contours.strokeSegments,
            fillSegments: i.contours.fillSegments,
            resolved: i.quadTree.resolved
        }
    }
    ,
    e.sampleImplicitDiagnostic = t,
    e.buildQuadTree = v,
    e.triangulate = k,
    e.traceContours = I,
    e.displayTriangles = function(e) {
        for (var r = [], i = 0; i < e.length; i++) {
            var n = e[i];
            r.push([n.vertices[0].x, n.vertices[0].y, n.vertices[1].x, n.vertices[1].y, n.vertices[2].x, n.vertices[2].y, n.vertices[0].x, n.vertices[0].y])
        }
        return r
    }
});
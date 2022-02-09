define('geometry/math/polygon-area-support', ["require", "exports", "lib/priority-queue", "bugsnag"], function(require, e, n, t) {
    "use strict";
    function i(e, n) {
        var t = e.pt2.y - e.pt1.y
          , i = e.pt1.x - e.pt2.x
          , r = n.pt2.y - n.pt1.y
          , a = n.pt1.x - n.pt2.x
          , s = t * e.pt1.x + i * e.pt1.y
          , o = r * n.pt1.x + a * n.pt1.y
          , u = t * a - r * i;
        if (0 !== u)
            return (t * o - r * s) / u
    }
    function r(e, n, r) {
        if (r.scanlineX < n.scanlineX && t.notify("PolygonArea: rightEdge should not be left of leftEdge!", {
            metaData: {
                scanlineY: e,
                leftEdge: n,
                rightEdge: r
            }
        }),
        !(r.xSlope >= n.xSlope)) {
            if (n.scanlineX === r.scanlineX)
                return e;
            var a = n.pt2.y > n.pt1.y ? n.pt2 : n.pt1
              , o = r.pt2.y > r.pt1.y ? r.pt2 : r.pt1
              , u = a.y;
            if (o.y < a.y) {
                if (s(u = o.y, n) < o.x)
                    return
            } else if (a.y < o.y) {
                var c = s(u, r);
                if (a.x < c)
                    return
            } else if (a.x < o.x)
                return;
            var d = i(n, r);
            if (void 0 !== d)
                return Math.max(Math.min(d, u), e)
        }
    }
    function a(e, n, t, i) {
        if (t && i) {
            if (t.id < i.id) {
                if (t.skipIntersectionWith[i.id])
                    return
            } else if (i.skipIntersectionWith[t.id])
                return;
            var a = r(e, t, i);
            void 0 !== a && (t.id < i.id ? t.skipIntersectionWith[i.id] = !0 : i.skipIntersectionWith[t.id] = !0,
            n.queue({
                type: "x",
                y: a,
                edge1: t,
                edge2: i
            }))
        }
    }
    function s(e, n) {
        var t = n.pt1.x
          , i = n.pt2.x
          , r = n.pt1.y
          , a = n.pt2.y;
        if (r === e)
            return t;
        if (a === e)
            return i;
        var s = (e - r) / (a - r)
          , o = (1 - s) * t + s * i;
        if (t < i) {
            if (o <= t)
                return t;
            if (i <= o)
                return i
        } else {
            if (o <= i)
                return i;
            if (t <= o)
                return t
        }
        return o
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.processEvent = e.setupEventQueueAndActiveEdges = e.measureUpwardNonZeroLength = e.measureUpwardEvenOddLength = e.measureDownwardNonZeroLength = e.measureDownwardEvenOddLength = e.computeScanlineX = e.checkForEdgeIntersection = e._stableYIntersectEdges = e._unstableYIntersectEdges = void 0,
    e._unstableYIntersectEdges = i,
    e._stableYIntersectEdges = r,
    e.checkForEdgeIntersection = a,
    e.computeScanlineX = s,
    e.measureDownwardEvenOddLength = function(e) {
        for (var n = 0, t = 0, i = !1, r = 0, a = e; r < a.length; r++) {
            var s = a[r].scanlineX;
            i ? (i = !1,
            n += s - t) : (i = !0,
            t = s)
        }
        return n
    }
    ,
    e.measureDownwardNonZeroLength = function(e) {
        for (var n = 0, t = 0, i = !1, r = 0, a = 0, s = e; a < s.length; a++) {
            var o = s[a]
              , u = o.scanlineX;
            o.isClockwise ? r += 1 : r -= 1,
            0 === r || i ? 0 === r && i && (i = !1,
            n += u - t) : (i = !0,
            t = u)
        }
        return n
    }
    ,
    e.measureUpwardEvenOddLength = function(e, n) {
        for (var i = 0, r = 0, a = !1, o = -1 / 0, u = 0, c = n; u < c.length; u++) {
            var d = c[u]
              , l = s(e, d);
            l < o ? (l - o < -1e-4 && t.notify("PolygonArea: scanlineX reversed!", {
                metaData: {
                    scanlineY: e,
                    edge: d,
                    minScanlineX: o,
                    scanlineX: l
                }
            }),
            l = o) : o = l,
            d.scanlineX = l,
            a ? (a = !1,
            i += l - r) : (a = !0,
            r = l)
        }
        return i
    }
    ,
    e.measureUpwardNonZeroLength = function(e, n) {
        for (var i = 0, r = 0, a = !1, o = 0, u = -1 / 0, c = 0, d = n; c < d.length; c++) {
            var l = d[c]
              , p = s(e, l);
            p < u ? (p - u < -1e-4 && t.notify("PolygonArea: scanlineX reversed!", {
                metaData: {
                    scanlineY: e,
                    edge: l,
                    minScanlineX: u,
                    scanlineX: p
                }
            }),
            p = u) : u = p,
            l.scanlineX = p,
            l.isClockwise ? o += 1 : o -= 1,
            0 === o || a ? 0 === o && a && (a = !1,
            i += p - r) : (a = !0,
            r = p)
        }
        return i
    }
    ,
    e.setupEventQueueAndActiveEdges = function(e) {
        for (var t = 1, i = new n.default(function(e, n) {
            return e.y - n.y
        }
        ), r = e.length - 1; r >= 1; r--) {
            var a = e[r]
              , s = e[r - 1]
              , o = {
                id: t++,
                pt1: a,
                pt2: s,
                scanlineX: 0,
                xSlope: 1 / 0,
                isClockwise: s.y > a.y,
                skipIntersectionWith: {}
            };
            s.y > a.y ? (i.queue({
                type: "+",
                y: a.y,
                edge: o
            }),
            i.queue({
                type: "-",
                y: s.y,
                edge: o
            }),
            o.xSlope = (s.x - a.x) / (s.y - a.y),
            o.scanlineX = a.x) : a.y > s.y && (i.queue({
                type: "+",
                y: s.y,
                edge: o
            }),
            i.queue({
                type: "-",
                y: a.y,
                edge: o
            }),
            o.xSlope = (a.x - s.x) / (a.y - s.y),
            o.scanlineX = s.x)
        }
        return {
            activeEdges: [],
            events: i
        }
    }
    ,
    e.processEvent = function(e, n, t) {
        "x" === e.type ? function(e, n, t) {
            var i = e.edge1
              , r = e.edge2
              , s = e.y
              , o = t.indexOf(i)
              , u = o + 1;
            -1 === o || t[u] !== r ? i.id < r.id ? delete i.skipIntersectionWith[r.id] : delete r.skipIntersectionWith[i.id] : (t[o] = r,
            t[u] = i,
            a(s, n, t[o - 1], r),
            a(s, n, i, t[u + 1]))
        }(e, n, t) : "+" === e.type ? function(e, n, t) {
            for (var i = e.edge, r = e.y, s = i.xSlope, o = i.scanlineX, u = 0; u < t.length; u++) {
                var c = t[u];
                if (o < c.scanlineX)
                    break;
                if (o === c.scanlineX && s <= c.xSlope)
                    break
            }
            t.splice(u, 0, i),
            a(r, n, t[u - 1], i),
            a(r, n, i, t[u + 1])
        }(e, n, t) : "-" === e.type && function(e, n, t) {
            var i = e.edge
              , r = e.y
              , s = t.indexOf(i);
            t.splice(s, 1),
            a(r, n, t[s - 1], t[s])
        }(e, n, t)
    }
});
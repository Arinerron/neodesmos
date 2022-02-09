
define('geometry/math/polygon', ["require", "exports", "tslib", "./hypot", "bugsnag", "./polygon-area-support"], function(require, e, n, r, t, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.calculatePaintedNonZeroArea = e.calculatePaintedEvenOddArea = e.calculateSimpleArea = e.calculatePerimeter = e.pointIsWithinNonZeroFill = e.pointIsWithinEvenOddFill = void 0,
    e.pointIsWithinEvenOddFill = function(e, n) {
        if (!e)
            return !1;
        for (var r = n.x, t = n.y, a = !1, i = e.length - 1; i >= 3; i -= 2) {
            var l = e[i - 3]
              , u = e[i - 2]
              , o = e[i - 1]
              , c = e[i];
            u > t != c > t && r < (o - l) * (t - u) / (c - u) + l && (a = !a)
        }
        return a
    }
    ,
    e.pointIsWithinNonZeroFill = function(e, r) {
        if (!e)
            return !1;
        for (var t = function(e) {
            var r = e.slice(0, 2)
              , t = e.slice(-2);
            return r[0] !== t[0] || r[1] !== t[1] ? n.__spreadArray(n.__spreadArray([], e), r) : e
        }(e), a = r.x, i = r.y, l = 0, u = t.length - 1; u >= 3; u -= 2) {
            var o = t[u - 3]
              , c = t[u - 2]
              , s = t[u - 1]
              , d = t[u];
            c > i != d > i && a < (s - o) * (i - c) / (d - c) + o && (c > d ? l += 1 : c < d && (l -= 1))
        }
        return 0 !== l
    }
    ,
    e.calculatePerimeter = function(e) {
        for (var n = 0, t = 0; t < e.length - 1; t++)
            n += r.default(e[t].x - e[t + 1].x, e[t].y - e[t + 1].y);
        return n
    }
    ,
    e.calculateSimpleArea = function(e) {
        for (var n = 0, r = 0; r < e.length - 1; r++)
            n += e[r].x * e[r + 1].y - e[r].y * e[r + 1].x;
        return Math.abs(n) / 2
    }
    ,
    e.calculatePaintedEvenOddArea = function(e) {
        if (e.length < 4)
            return 0;
        if (e[0].x !== e[e.length - 1].x || e[0].y !== e[e.length - 1].y)
            return 0;
        var n = a.setupEventQueueAndActiveEdges(e)
          , r = n.events
          , i = n.activeEdges
          , l = r.peek();
        if (!l)
            return 0;
        for (var u, o = 0, c = l.y, s = 0; u = r.dequeue(); ) {
            var d = u.y;
            d < c && t.notify("PolygonArea: scanlineY jumped up vertically", {
                metaData: {
                    points: e,
                    scanlineY: d,
                    lastScanlineY: c
                }
            }),
            s += .5 * (d - c) * (a.measureUpwardEvenOddLength(d, i) + o),
            a.processEvent(u, r, i),
            c = d,
            o = a.measureDownwardEvenOddLength(i)
        }
        return s
    }
    ,
    e.calculatePaintedNonZeroArea = function(e) {
        if (e.length < 4)
            return 0;
        if (e[0].x !== e[e.length - 1].x || e[0].y !== e[e.length - 1].y)
            return 0;
        var n = a.setupEventQueueAndActiveEdges(e)
          , r = n.events
          , i = n.activeEdges
          , l = r.peek();
        if (!l)
            return 0;
        for (var u, o = 0, c = l.y, s = 0; u = r.dequeue(); ) {
            var d = u.y;
            d < c && t.notify("PolygonArea: scanlineY jumped up vertically", {
                metaData: {
                    points: e,
                    scanlineY: d,
                    lastScanlineY: c
                }
            }),
            s += .5 * (d - c) * (a.measureUpwardNonZeroLength(d, i) + o),
            a.processEvent(u, r, i),
            c = d,
            o = a.measureDownwardNonZeroLength(i)
        }
        return s
    }
});
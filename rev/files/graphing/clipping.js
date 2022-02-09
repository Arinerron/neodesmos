define('graphing/clipping', ["require", "exports", "core/types/graphmode"], function(require, e, n) {
    "use strict";
    function r(e, n, r, t) {
        var i, A, u, l, E = [];
        t ? (i = 2,
        (l = n(A = e[0], u = e[1])) && E.push(A, u)) : (i = 0,
        l = n(A = e[e.length - 2], u = e[e.length - 1]));
        for (var s = i; s < e.length; s += 2) {
            var o = A
              , a = u
              , p = l;
            ((l = n(A = e[s], u = e[s + 1])) || p) && (l && p && E.push(A, u),
            l && !p && (Array.prototype.push.apply(E, r(A, u, o, a)),
            E.push(A, u)),
            !l && p && Array.prototype.push.apply(E, r(o, a, A, u)))
        }
        return E
    }
    function t(n, t, i, A) {
        var u = t.xmin
          , l = t.xmax
          , E = t.ymin
          , s = t.ymax
          , o = n;
        return i & e.LEFT && (o = r(n, function(e, n) {
            return e >= u
        }, function(e, n, r, t) {
            return [u, (n = n) + ((t = t) - n) * (u - (e = e)) / ((r = r) - e)]
        }, A)),
        i & e.BOTTOM && (o = r(o, function(e, n) {
            return n >= E
        }, function(e, n, r, t) {
            return [(e = e) + ((r = r) - e) * (E - (n = n)) / ((t = t) - n), E]
        }, A)),
        i & e.RIGHT && (o = r(o, function(e, n) {
            return e <= l
        }, function(e, n, r, t) {
            return [l, (n = n) + ((t = t) - n) * (l - (e = e)) / ((r = r) - e)]
        }, A)),
        i & e.TOP && (o = r(o, function(e, n) {
            return n <= s
        }, function(e, n, r, t) {
            return [(e = e) + ((r = r) - e) * (s - (n = n)) / ((t = t) - n), s]
        }, A)),
        o
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getClippingGraphType = e.computeCartesianFill = e.computePolarFill = e.clipAllFillEdges = e.clipFillEdges = e.clipFillEdge = e.clipStrokeEdges = e.mapSegmentToCanvas = e.X_EQUALS = e.Y_EQUALS = e.POLAR_DEGREE_INEQUALITY = e.POLAR_DEGREE_EQUALITY = e.POLAR_RADIAN_INEQUALITY = e.POLAR_RADIAN_EQUALITY = e.Y = e.X = e.ALL = e.RIGHT = e.LEFT = e.BOTTOM = e.TOP = void 0,
    e.TOP = 1,
    e.BOTTOM = 2,
    e.LEFT = 4,
    e.RIGHT = 8,
    e.ALL = 15,
    e.X = 12,
    e.Y = 3,
    e.POLAR_RADIAN_EQUALITY = 1,
    e.POLAR_RADIAN_INEQUALITY = 2,
    e.POLAR_DEGREE_EQUALITY = 3,
    e.POLAR_DEGREE_INEQUALITY = 4,
    e.Y_EQUALS = 5,
    e.X_EQUALS = 6,
    e.mapSegmentToCanvas = function(n, r, t, i) {
        var A = []
          , u = r.xmin
          , l = r.ymin
          , E = r.xmax - r.xmin
          , s = r.ymax - r.ymin
          , o = t.width
          , a = t.height
          , p = o / E
          , L = -a / s
          , h = n.length;
        if (i === e.Y_EQUALS)
            for (var c = 0; c < h; c += 2) {
                var _ = (n[c] - u) * p - .5
                  , I = (n[c + 1] - l) * L + a - .5;
                A.push(_, I)
            }
        else if (i === e.X_EQUALS)
            for (c = 0; c < h; c += 2) {
                _ = (n[c + 1] - u) * p - .5,
                I = (n[c] - l) * L + a - .5;
                A.push(_, I)
            }
        else if (i === e.POLAR_RADIAN_EQUALITY)
            for (c = 0; c < n.length; c += 2) {
                var f = n[c];
                _ = ((R = n[c + 1]) * Math.cos(f) - u) * p - .5,
                I = (R * Math.sin(f) - l) * L + a - .5;
                A.push(_, I)
            }
        else if (i === e.POLAR_RADIAN_INEQUALITY)
            for (c = 0; c < n.length; c += 2) {
                f = n[c];
                (R = n[c + 1]) < 0 && (R = 0);
                _ = (R * Math.cos(f) - u) * p - .5,
                I = (R * Math.sin(f) - l) * L + a - .5;
                A.push(_, I)
            }
        else if (i === e.POLAR_DEGREE_EQUALITY)
            for (c = 0; c < n.length; c += 2) {
                f = n[c] * Math.PI / 180,
                _ = ((R = n[c + 1]) * Math.cos(f) - u) * p - .5,
                I = (R * Math.sin(f) - l) * L + a - .5;
                A.push(_, I)
            }
        else if (i === e.POLAR_DEGREE_INEQUALITY)
            for (c = 0; c < n.length; c += 2) {
                var R;
                f = n[c] * Math.PI / 180;
                (R = n[c + 1]) < 0 && (R = 0);
                _ = (R * Math.cos(f) - u) * p - .5,
                I = (R * Math.sin(f) - l) * L + a - .5;
                A.push(_, I)
            }
        return A
    }
    ,
    e.clipStrokeEdges = function(n, r) {
        return t(n, r, e.ALL, !0)
    }
    ,
    e.clipFillEdge = r,
    e.clipFillEdges = t,
    e.clipAllFillEdges = function(n, r) {
        return t(n, r, e.ALL, !1)
    }
    ,
    e.computePolarFill = function(e, n, r) {
        var t = []
          , i = e[0]
          , A = i + r
          , u = [];
        t.push(u);
        for (var l = 0; l < e.length; l += 2) {
            var E = e[l]
              , s = e[l + 1];
            if (s < 0 && (s = 0),
            E >= A) {
                for (u = [],
                t.push(u),
                A = i = e[l - 2]; E >= A; )
                    A += r;
                l -= 4
            } else
                u.push(E, s)
        }
        if (0 === n)
            for (l = 0; l < t.length; l++)
                t[l].push(0, 0);
        else {
            var o = r / 16
              , a = n;
            for (l = 0; l < t.length; l++) {
                var p = t[l];
                i = p[0];
                for (E = A = p[p.length - 2]; E > i; E -= o)
                    p.push(E, a);
                p.push(i, a)
            }
        }
        return t
    }
    ,
    e.computeCartesianFill = function(e, n) {
        return (e = e.slice()).push(e[e.length - 2], n),
        e.push(e[0], n),
        [e]
    }
    ,
    e.getClippingGraphType = function(r, t, i) {
        switch (r) {
        case n.X:
            return e.X_EQUALS;
        case n.IMPLICIT:
        case n.PARAMETRIC:
        case n.Y:
            return e.Y_EQUALS;
        case n.POLAR:
            return i.degreeMode ? t ? e.POLAR_DEGREE_INEQUALITY : e.POLAR_DEGREE_EQUALITY : t ? e.POLAR_RADIAN_INEQUALITY : e.POLAR_RADIAN_EQUALITY
        }
    }
});

define('core/math/qr', ["require", "exports"], function(require, r) {
    "use strict";
    function t(r, t) {
        for (var n = r.length, e = t.length, a = 0, l = 0, h = e - n; h < e; h++)
            a += r[h + n - e] * t[h],
            l += r[h + n - e] * r[h + n - e];
        var o = a / l;
        for (h = e - n; h < e; h++)
            t[h] = 2 * o * r[h + n - e] - t[h]
    }
    function n(r, t, n) {
        for (var e = r.length, a = t.length, l = 0, h = 0, o = a - e; o < a; o++)
            l += r[o + e - a] * t[o][n],
            h += r[o + e - a] * r[o + e - a];
        var f = l / h;
        for (o = a - e; o < a; o++)
            t[o][n] = 2 * f * r[o + e - a] - t[o][n]
    }
    function e(r, t, n, e) {
        var a = Array(r.length - t);
        if (1 === a.length)
            return a[0] = 1,
            a;
        if (0 === e) {
            a[0] = 1;
            for (var l = 1; l < a.length; l++)
                a[l] = 0;
            return a
        }
        var h = r[t][n] < 0 ? -1 : 1;
        a[0] = r[t][n] + h * Math.sqrt(e);
        for (var o = t + 1; o < r.length; o++)
            a[o - t] = r[o][n];
        return a
    }
    function a(r, t, n) {
        for (var e = 0; t < r.length; t++)
            e += r[t][n] * r[t][n];
        return e
    }
    function l(r, n, e) {
        for (var a = r.reflectors, l = r.r, h = r.p, o = n.slice(), f = 0; f < a.length; f++)
            t(a[f], o);
        for (f = a.length; f < l[0].length; f++)
            o[f] = 0;
        o.length = l[0].length;
        var g = Math.pow(2, -52)
          , i = e.regularize ? g * Math.abs(l[0][0]) * Math.max(l.length, l[0].length) : 0;
        for (f = a.length - 1; f >= 0; f--) {
            var u = l[f];
            if (Math.abs(u[f]) <= i)
                o[f] = 0;
            else {
                for (var v = f + 1; v < a.length; v++)
                    o[f] -= o[v] * u[v];
                o[f] /= u[f]
            }
        }
        for (f = h.length - 1; f >= 0; f--)
            if (h[f] !== f) {
                var c = o[f];
                o[f] = o[h[f]],
                o[h[f]] = c
            }
        return o
    }
    function h(r) {
        var t = r.r
          , n = Math.min(t.length, t[0].length)
          , e = t[0][0]
          , a = t[n - 1][n - 1];
        return 0 === e ? 1 / 0 : Math.abs(e / a)
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.isNumericallyFullRank = r.conditionNumber = r.qrSolve = r.qr = void 0,
    r.qr = function(r, t) {
        if (!t || !t.mutateInput) {
            var l = r;
            r = Array(r.length);
            for (var h = 0; h < l.length; h++)
                r[h] = l[h].slice()
        }
        for (var o = Math.min(r.length, r[0].length), f = Array(o), g = [], i = 0; i < o; i++) {
            for (var u = -1 / 0, v = i, c = i; c < r[i].length; c++) {
                var s = a(r, i, c);
                s > u && (u = s,
                v = c)
            }
            if (f[i] = v,
            v !== i)
                for (h = 0; h < r.length; h++) {
                    var y = r[h][v];
                    r[h][v] = r[h][i],
                    r[h][i] = y
                }
            var M = e(r, i, i, u);
            for (c = i; c < r[i].length; c++)
                n(M, r, c);
            g.push(M)
        }
        return {
            reflectors: g,
            r: r,
            p: f
        }
    }
    ,
    r.qrSolve = function(r, t, n) {
        return Array.isArray(t[0]) ? function(r, t, n) {
            for (var e = Array(r.r[0].length), a = 0; a < e.length; a++)
                e[a] = Array(t[0].length);
            for (var h = Array(t.length), o = 0; o < t[0].length; o++) {
                for (a = 0; a < t.length; a++)
                    h[a] = t[a][o];
                var f = l(r, h, n);
                for (a = 0; a < f.length; a++)
                    e[a][o] = f[a]
            }
            return e
        }(r, t, n) : l(r, t, n)
    }
    ,
    r.conditionNumber = h,
    r.isNumericallyFullRank = function(r) {
        var t = Math.pow(2, -52);
        return Math.max(r.r.length, r.r[0].length) * t * h(r) < 1
    }
});

define('core/math/poi', ["require", "exports", "core/math/distance"], function(require, i, t) {
    "use strict";
    function r(i, r) {
        var n;
        i > r && (n = i,
        i = r,
        r = n);
        var e = i > 0
          , a = r > 0
          , s = Math.abs(i) > .01
          , f = Math.abs(r) > .01;
        if (s || f)
            return t.mean(i, r);
        if (0 === i)
            return r * Math.abs(r);
        if (0 === r)
            return i * Math.abs(i);
        if (e !== a)
            return 0;
        var u = e ? Math.sqrt(i * r) : -Math.sqrt(i * r);
        return u >= i && r >= u ? u : t.mean(i, r)
    }
    function n(i, t, n, s, f, u, o) {
        var c, F, v, b;
        if (isFinite(s))
            return isFinite(t) || (c = e(i, t, n, s, o)) && (i = c[0],
            t = c[1]),
            isFinite(u) || (c = e(n, s, f, u, o)) && (f = c[0],
            u = c[1]),
            F = t === s ? [i, t] : a(i, t, n, s, o, s),
            v = u === s ? [f, u] : a(n, s, f, u, o, s),
            F && v && (b = r(F[0], v[0])),
            void 0 !== b ? [b, o(b)] : void 0
    }
    function e(i, t, n, e, a) {
        if (isFinite(t) !== isFinite(e))
            for (; ; ) {
                var s = r(i, n)
                  , f = a(s);
                if (s === i || s === n)
                    return isFinite(t) ? [i, t] : [n, e];
                isFinite(f) !== isFinite(t) ? (n = s,
                e = f) : (i = s,
                t = f)
            }
    }
    function a(i, t, n, e, a, s) {
        if (t === s != (e === s))
            for (; ; ) {
                var f = r(i, n)
                  , u = a(f);
                if (f === i || f === n)
                    return t === s ? [i, t] : [n, e];
                u === s != (t === s) ? (n = f,
                e = u) : (i = f,
                t = u)
            }
    }
    function s(i, t) {
        var r = i[0]
          , n = i[1]
          , e = t[0]
          , a = t[1];
        return (e - r) * (e - r) + (a - n) * (a - n)
    }
    function f(i, t, n, e, a, f) {
        var u, o, c, F, v, b, M, h, d, m = f(i), l = f(t), P = f(n), C = s(m, e), O = s(l, e), p = s(P, e);
        if (!(t <= i || n <= t) && isFinite(C) && isFinite(O) && isFinite(p) && !(O >= C || O >= p))
            for (; ; ) {
                if (Math.abs(P[0] - m[0]) < a && Math.abs(P[1] - m[1]) < a)
                    return [i, n];
                var x = r(i, t)
                  , N = f(x)
                  , q = s(N, e)
                  , E = r(t, n)
                  , J = f(E)
                  , L = s(J, e);
                if (!isFinite(q) || !isFinite(L))
                    return;
                if (x === i || x === t || E === t || E === n)
                    return q < O && q < L ? [x, x] : L < q && L < O ? [E, E] : [t, t];
                if (!(q !== O && L !== O || q !== (O = s(l = f(t = .5 * (x + t)), e)) && L !== O))
                    return [i, n];
                q < O && q < L ? (n = (u = [t, x])[0],
                t = u[1],
                P = (o = [l, N])[0],
                l = o[1],
                p = (c = [O, q])[0],
                O = c[1]) : L < q && L < O ? (i = (F = [t, E])[0],
                t = F[1],
                m = (v = [l, J])[0],
                l = v[1],
                C = (b = [O, L])[0],
                O = b[1]) : (i = (M = [x, E])[0],
                n = M[1],
                m = (h = [N, J])[0],
                P = h[1],
                C = (d = [q, L])[0],
                p = d[1])
            }
    }
    function u(i, t, r) {
        return void 0 === t && (t = -1 / 0),
        void 0 === r && (r = 1 / 0),
        Math.min(r, Math.max(t, i))
    }
    function o(i, t, r, n, e, a) {
        var o, c, F, v, b;
        void 0 !== n && void 0 !== e ? b = r + .01 * (r < .5 * (n + e) ? e - n : n - e) : b = Math.abs(r) > 1 ? 1.00001 * r : r + 1e-5;
        var M = i(r)
          , h = i(b)
          , d = s(M, t)
          , m = s(h, t);
        if (isFinite(d) && isFinite(m)) {
            if (d === m)
                return [r, b];
            for (m > d && (r = (o = [b, r])[0],
            b = o[1],
            M = (c = [h, M])[0],
            h = c[1],
            d = (F = [m, d])[0],
            m = F[1]); isFinite(r) && isFinite(b) && r !== b; ) {
                if (void 0 !== e && b > e)
                    return [e, e];
                if (void 0 !== n && b < n)
                    return [n, n];
                var l = r + 3 * (b - r)
                  , P = s(i(l), t);
                if (!isFinite(P))
                    return [r, b];
                if (P === m)
                    return [r, b];
                if (P > m) {
                    var C = b > r ? f(r, b, l, t, a, i) : f(l, b, r, t, a, i);
                    return C ? [u(C[0], n, e), u(C[1], n, e)] : C
                }
                r = (v = [b, m, l, P])[0],
                d = v[1],
                b = v[2],
                m = v[3]
            }
            return [r, b]
        }
    }
    function c(i, t, r, n) {
        return !r || !!n && Math.min(s(i(n[0]), t), s(i(n[1]), t)) < Math.min(s(i(r[0]), t), s(i(r[1]), t))
    }
    function F(i, t, r, n, e, a, s, f) {
        var u = Math.abs(n - t)
          , o = Math.abs(a - n)
          , c = Math.abs(f - a);
        return u > o && u > c ? [[i, t], [r, n]] : c > o && c > u ? [[e, a], [s, f]] : [[r, n], [e, a]]
    }
    Object.defineProperty(i, "__esModule", {
        value: !0
    }),
    i.bisectJump = i.findLocalClosestPointOnParametric = i.bisectClosestPointOnParametric = i.bisectExtremum = i.bisectFinite = i.flatCenter = i.bisectZero = i.floatMiddle = void 0,
    i.floatMiddle = r,
    i.bisectZero = function(i, t, e, a, s) {
        if (!isNaN(t) && !isNaN(a) && t < 0 != a < 0)
            for (; ; ) {
                var f = r(i, e)
                  , u = s(f);
                if (!isFinite(u))
                    return;
                if (f === i || f === e)
                    return Math.abs(t) <= Math.abs(a) ? [i, t] : [e, a];
                if (0 === u)
                    return n(i, t, f, u, e, a, s);
                t < 0 != u < 0 ? (e = f,
                a = u) : (i = f,
                t = u)
            }
    }
    ,
    i.flatCenter = n,
    i.bisectFinite = e,
    i.bisectExtremum = function(i, t, e, a, s, f, u) {
        if (i < e && e < s && isFinite(t) && isFinite(a) && isFinite(f) && t !== a && a !== f && a > t == a > f)
            for (; ; ) {
                var o = r(i, e)
                  , c = u(o)
                  , F = r(e, s)
                  , v = u(F);
                if (!isFinite(c) || !isFinite(v))
                    return;
                if (o === i || o === e || F === e || F === s)
                    return c > a == a > t ? [o, c] : v > a == a > t ? [F, v] : [e, a];
                if (c === a || v === a)
                    return n(i, t, e, a, s, f, u);
                c > t == a > t && c > t == c > a ? (s = e,
                f = a,
                e = o,
                a = c) : v > f == a > f && v > a == v > f ? (i = e,
                t = a,
                e = F,
                a = v) : (i = o,
                t = c,
                s = F,
                f = v)
            }
    }
    ,
    i.bisectClosestPointOnParametric = f,
    i.findLocalClosestPointOnParametric = function(i, t, r, n, e, a) {
        var s = o(i, t, r, n, e, a);
        if (void 0 !== n) {
            var f = o(i, t, n, n, e, a);
            c(i, t, s, f) && (s = f)
        }
        if (void 0 !== e) {
            var u = o(i, t, e, n, e, a);
            c(i, t, s, u) && (s = u)
        }
        return s
    }
    ,
    i.bisectJump = function(i, n, a, s, f, u, o, c) {
        if (c || (c = 0),
        !((a - i) * (f - a) <= 0) && isFinite(i) && isFinite(a) && isFinite(f) && isFinite(n) && isFinite(u)) {
            if (!isFinite(s)) {
                var v = e(i, n, a, s, o)
                  , b = e(a, s, f, u, o);
                if (!v || !b)
                    return;
                return [v, b]
            }
            if (!(Math.abs(s - ((f - a) * n + (a - i) * u) / (f - i)) < c))
                for (; ; ) {
                    var M = r(i, a)
                      , h = o(M)
                      , d = r(a, f)
                      , m = o(d)
                      , l = Math.abs(h - t.mean(n, s))
                      , P = Math.abs(s - t.mean(h, m))
                      , C = Math.abs(m - t.mean(s, u));
                    if (l <= c && P <= c && C <= c)
                        return;
                    if (!isFinite(h)) {
                        v = e(i, n, M, h, o),
                        b = e(M, h, f, u, o);
                        if (!v || !b)
                            return;
                        return [v, b]
                    }
                    if (!isFinite(m)) {
                        v = e(i, n, d, m, o),
                        b = e(d, m, f, u, o);
                        if (!v || !b)
                            return;
                        return [v, b]
                    }
                    if (!(M !== i && M !== a || d !== a && d !== f))
                        return Math.abs(s - n) > Math.abs(u - s) ? [[i, n], [a, s]] : [[a, s], [f, u]];
                    if (M === i || M === a)
                        return F(i, n, a, s, d, m, f, u);
                    if (d === a || d === f)
                        return F(i, n, M, h, a, s, f, u);
                    l > C && l >= P ? (f = a,
                    u = s,
                    a = M,
                    s = h) : C > l && C >= P ? (i = a,
                    n = s,
                    a = d,
                    s = m) : (i = M,
                    n = h,
                    f = d,
                    u = m)
                }
        }
    }
});
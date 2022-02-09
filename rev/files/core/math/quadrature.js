
define('core/math/quadrature', ['require', 'core/math/mathshim', 'core/math/poi'], function(require) {
    "use strict";
    var a = require("core/math/mathshim")
      , r = require("core/math/poi")
      , t = r.bisectJump
      , i = r.bisectFinite
      , n = Math.pow(2, -13)
      , e = n * n
      , o = e * e
      , s = e
      , u = []
      , h = [];
    !function(r, t) {
        for (var i = 32; i > 0; i--) {
            var n = .09856311095410075 * i
              , e = a.sinh(n)
              , o = a.cosh(Math.PI / 2 * e)
              , s = 1 / (Math.exp(Math.PI / 2 * e) * o)
              , u = a.cosh(n) / (o * o);
            r.push(s),
            t.push(u)
        }
    }(u, h);
    for (var N = 0, f = 0; f < h.length; f++)
        N += h[f];
    var m = 1 / (1 + 2 * N);
    function x(a, r, t) {
        return .5 * (r * (2 - t) + a * t)
    }
    function M(a, r, i) {
        var n = .5 * (r + i)
          , e = t(r, a(r), n, a(n), i, a(i), a, 0);
        return e ? .5 * (e[0][0] + e[1][0]) : n
    }
    function v(a, r, t, i, n) {
        return {
            x1: a,
            x2: r,
            value: t,
            error: i,
            minerror: n
        }
    }
    function b(a, r, t) {
        var i = Math.abs(a(x(r, t, e)))
          , n = Math.abs(a(x(r, t, 2 * e)))
          , o = Math.abs(a(x(r, t, 4 * e)));
        return !(i < e || n < e) && (i > 1.95 * n && n > 1.95 * o)
    }
    function c(a, r, t) {
        var n, e, o = x(t, r, u[0]), N = x(r, t, u[0]), f = a(o), M = a(N), c = x(r, t, 1), l = a(c);
        if (isFinite(l) && !isFinite(f)) {
            if (n = i(o, f, c, l, a),
            Math.abs((n[0] - r) / (t - r)) > s)
                return v(r, t, NaN, NaN, NaN);
            r = n[0],
            f = n[1]
        }
        if (isFinite(l) && !isFinite(M)) {
            if (e = i(c, l, N, M, a),
            Math.abs((e[0] - t) / (t - r)) > s)
                return v(r, t, NaN, NaN, NaN);
            t = e[0],
            M = e[1]
        }
        if (isFinite(f) && isFinite(M) && !isFinite(l)) {
            if (n = i(o, f, c, l, a),
            e = i(c, l, N, M, a),
            Math.abs((e[0] - n[0]) / (t - r)) > s)
                return v(r, t, NaN, NaN, NaN);
            l = .5 * (n[1] + e[1])
        }
        if (b(a, r, t) || b(a, t, r))
            return v(r, t, NaN, NaN, NaN);
        for (var F = l, p = 0, d = 0, g = 0, I = 0, P = 0, q = 0, w = 0; w < 32; w += 4)
            P = a(x(r, t, u[w])),
            q = a(x(t, r, u[w])),
            I = Math.max(I, Math.abs(P), Math.abs(q)),
            p += h[w] * (P + q),
            P = a(x(r, t, u[w + 1])),
            q = a(x(t, r, u[w + 1])),
            I = Math.max(I, Math.abs(P), Math.abs(q)),
            g += h[w + 1] * (P + q),
            P = a(x(r, t, u[w + 2])),
            q = a(x(t, r, u[w + 2])),
            I = Math.max(I, Math.abs(P), Math.abs(q)),
            d += h[w + 2] * (P + q),
            P = a(x(r, t, u[w + 3])),
            q = a(x(t, r, u[w + 3])),
            I = Math.max(I, Math.abs(P), Math.abs(q)),
            g += h[w + 3] * (P + q);
        var J, j = F + p, k = j + d, y = k + g, z = Math.abs(d - j), A = Math.abs(g - k), B = m * (t - r) * y, C = m * Math.abs(t - r) * I * h[0];
        return J = 0 === z ? m * Math.abs(t - r) * A : m * Math.abs(t - r) * A * (A / z) * (A / z),
        v(r, t, B, J = Math.max(J, C), C)
    }
    function l(a) {
        for (var r = -1 / 0, t = -1 / 0, i = -1, n = 0, e = 0; e < a.length; e++) {
            var o = a[e];
            n += o.value,
            o.error > r && (r = o.error,
            i = e),
            o.minerror > t && (t = o.minerror)
        }
        return {
            maxerror: r,
            maxminerror: t,
            maxindex: i,
            totalvalue: n
        }
    }
    return {
        quad: function a(r, t, i, n) {
            if (void 0 === n && (n = 32),
            isNaN(t) || isNaN(i))
                return NaN;
            var e = 1;
            if (t > i) {
                var s = t;
                t = i,
                i = s,
                e = -1
            }
            if (t === 1 / 0 && i === 1 / 0)
                return NaN;
            if (t === -1 / 0 && i === -1 / 0)
                return NaN;
            if (t === -1 / 0 && i === 1 / 0)
                return e * a(function(a) {
                    return r(a / ((1 + a) * (1 - a))) * (1 + a * a) / ((1 + a) * (1 + a) * (1 - a) * (1 - a))
                }, -1, 1, n);
            if (t === -1 / 0)
                return e * a(function(a) {
                    return -r(i - a / (1 - a)) / ((1 - a) * (1 - a))
                }, 1, 0, n);
            if (i === 1 / 0)
                return e * a(function(a) {
                    return r(t + a / (1 - a)) / ((1 - a) * (1 - a))
                }, 0, 1, n);
            for (var u = [c(r, t, i)], h = l(u), N = 1; N < n && (!(Math.abs(h.maxerror / h.totalvalue) <= 32 * o || h.maxerror <= 32 * o || h.maxerror <= 32 * h.maxminerror) && isFinite(h.maxerror) && isFinite(h.maxminerror)); N++) {
                var f = u[u.length - 1];
                u[u.length - 1] = u[h.maxindex],
                u[h.maxindex] = f;
                var m = u.pop()
                  , v = M(r, x(m.x2, m.x1, .125), x(m.x1, m.x2, .125));
                u.push(c(r, m.x1, v)),
                u.push(c(r, v, m.x2)),
                h = l(u)
            }
            return isFinite(h.maxerror) && isFinite(h.maxminerror) ? Math.abs(h.totalvalue) <= 10 * h.maxminerror ? 0 : e * h.totalvalue : NaN
        }
    }
});
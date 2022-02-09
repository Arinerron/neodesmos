define('core/math/builtin-common', ["require", "exports", "./tofraction", "core/math/distance"], function(require, r, t, e) {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.pow = r.gcd = void 0,
    r.gcd = function(r, t) {
        if ((r = Math.round(r)) < 0 && (r = -r),
        (t = Math.round(t)) < 0 && (t = -t),
        t > r) {
            var e = t;
            t = r,
            r = e
        }
        if (0 === t)
            return r;
        for (var n = r % t; n > 0; )
            n = (r = t) % (t = n);
        return t
    }
    ,
    r.pow = function(r, n) {
        if (!isFinite(r) && 0 === n)
            return NaN;
        if (r >= 0 || n === Math.floor(n))
            return Math.pow(r, n);
        var o = t.default(n, 100);
        return e.approx(o.n / o.d, n, 2) && o.d % 2 == 1 ? (o.n % 2 == 0 ? 1 : -1) * Math.pow(-r, n) : NaN
    }
});
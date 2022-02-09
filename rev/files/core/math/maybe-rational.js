
define('core/math/maybe-rational', ["require", "exports", "./builtin-common"], function(require, n, t) {
    "use strict";
    function r(n, t) {
        return {
            n: n,
            d: t
        }
    }
    function a(n) {
        return "object" == typeof n && "number" == typeof n.n && "number" == typeof n.d
    }
    Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    n.total = n.mod = n.nthroot = n.sqrt = n.pow = n.div = n.sub = n.mul = n.add = n.reciprocal = n.abs = n.neg = n.maybeRational = n.isNanFloat = n.asFloat = n.fromDecimalString = n.isRational = void 0,
    n.isRational = a;
    var o = Math.pow(2, 53) - 1;
    function e(n) {
        return a(n) ? n.n / n.d : +n
    }
    function u(n, a) {
        if (!isFinite(n) || !isFinite(a) || 0 === a || Math.floor(n) !== n || Math.floor(a) !== a || Math.abs(n) > o || Math.abs(a) > o)
            return n / a;
        a < 0 && (n = -n,
        a = -a);
        var e = t.gcd(n, a);
        return r(n / e, a / e)
    }
    function i(n) {
        return a(n) ? r(-n.n, n.d) : -n
    }
    function d(n) {
        return a(n) ? 0 === n.n ? n.d / n.n : r(n.n < 0 ? -n.d : n.d, Math.abs(n.n)) : 1 / n
    }
    function f(n, r) {
        if (!a(n) || !a(r))
            return e(n) + e(r);
        var o = t.gcd(n.d, r.d);
        return u(n.n * (r.d / o) + r.n * (n.d / o), n.d / o * r.d)
    }
    function c(n, r) {
        if (!a(n) || !a(r))
            return e(n) * e(r);
        var o = t.gcd(n.n, r.d)
          , i = t.gcd(r.n, n.d);
        return u(n.n / o * (r.n / i), n.d / i * (r.d / o))
    }
    function s(n, t) {
        return f(n, i(t))
    }
    function h(n, t) {
        return a(n) && a(t) ? c(n, d(t)) : e(n) / e(t)
    }
    function M(n, r) {
        if (!a(n) || !a(r))
            return t.pow(e(n), e(r));
        var o = function(n, r) {
            var o = n
              , f = r;
            if (r.n < 0 && (f = i(r),
            o = d(n)),
            !a(o) || !a(f))
                return t.pow(e(n), e(r));
            if (n = o,
            1 === (r = f).d)
                return u(Math.pow(n.n, r.n), Math.pow(n.d, r.n));
            var c = n.n < 0;
            if (c && r.d % 2 != 1)
                return NaN;
            var s = (c ? -1 : 1) * Math.round(Math.pow(Math.abs(n.n), 1 / r.d))
              , h = Math.round(Math.pow(Math.abs(n.d), 1 / r.d));
            return Math.pow(s, r.d) !== n.n || Math.pow(h, r.d) !== n.d ? t.pow(e(n), e(r)) : u(Math.pow(s, r.n), Math.pow(h, r.n))
        }(n, r);
        return a(o) ? o : t.pow(e(n), e(r))
    }
    n.fromDecimalString = function(n) {
        var t = n.match(/^(-)?(\d*)?(?:\.(\d*))?$/);
        if (!t)
            return NaN;
        var r = t[1]
          , a = t[2]
          , e = t[3];
        if (!a && !e)
            return NaN;
        var i = !!r;
        if (e) {
            var d, f = e.replace(/0+$/, ""), c = f.length, s = Math.pow(10, c);
            return (d = parseInt(a || "0", 10) * s + parseInt(f || "0", 10)) > o || s > o ? parseFloat(n) : u(i ? -d : d, s)
        }
        return (d = parseInt(a, 10)) > o ? parseFloat(n) : u(i ? -d : d, 1)
    }
    ,
    n.asFloat = e,
    n.isNanFloat = function(n) {
        return !a(n) && isNaN(n)
    }
    ,
    n.maybeRational = u,
    n.neg = i,
    n.abs = function(n) {
        return a(n) ? r(Math.abs(n.n), Math.abs(n.d)) : Math.abs(n)
    }
    ,
    n.reciprocal = d,
    n.add = f,
    n.mul = c,
    n.sub = s,
    n.div = h,
    n.pow = M,
    n.sqrt = function(n) {
        if (!a(n))
            return Math.sqrt(n);
        var t = Math.round(Math.sqrt(n.n))
          , r = Math.round(Math.sqrt(n.d));
        return t * t !== n.n || r * r !== n.d ? Math.sqrt(e(n)) : u(t, r)
    }
    ,
    n.nthroot = function(n, t) {
        return M(n, d(t))
    }
    ,
    n.mod = function(n, t) {
        if (!a(n) || !a(t)) {
            var o = e(n)
              , u = e(t);
            return o - u * Math.floor(o / u)
        }
        return s(n, c(t, r(Math.floor(e(h(n, t))), 1)))
    }
    ,
    n.total = function(n) {
        for (var t = r(0, 1), a = 0, o = n; a < o.length; a++) {
            t = f(t, o[a])
        }
        return t
    }
});
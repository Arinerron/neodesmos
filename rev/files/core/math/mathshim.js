define('core/math/mathshim', ["require", "exports"], function(require, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    n.sign = n.sqrtxsqm1 = n.sqrtxsqp1 = n.log1p = n.expm1 = n.atanh = n.asinh = n.acosh = n.tanh = n.sinh = n.cosh = void 0;
    var t = Math;
    n.cosh = t.cosh || function(n) {
        return .5 * (Math.exp(n) + Math.exp(-n))
    }
    ,
    n.sinh = t.sinh && 0 !== t.sinh(1e-20) ? t.sinh : function(t) {
        var a = t > 0 ? 1 : -1;
        return t = t > 0 ? t : -t,
        .5 * -a * Math.exp(t) * n.expm1(-2 * t)
    }
    ,
    n.tanh = t.tanh && 0 !== t.tanh(1e-20) ? t.tanh : function(t) {
        var a = t > 0 ? 1 : -1;
        t = t > 0 ? t : -t;
        var r = n.expm1(-2 * t);
        return -a * r / (2 + r)
    }
    ,
    n.acosh = t.acosh || function(t) {
        return t < 1 ? NaN : Math.log(t + n.sqrtxsqm1(t))
    }
    ,
    n.asinh = t.asinh && 0 !== t.asinh(1e-20) ? t.asinh : function(t) {
        var a = t > 0 ? 1 : -1;
        return 1 + (t = t > 0 ? t : -t) * t == 1 ? a * n.log1p(t) : a * Math.log(t + n.sqrtxsqp1(t))
    }
    ,
    n.atanh = t.atanh && 0 !== t.atanh(1e-20) ? t.atanh : function(t) {
        return .5 * (n.log1p(t) - n.log1p(-t))
    }
    ,
    n.expm1 = t.expm1 || function(n) {
        return n + .5 * n * n === n ? n : Math.exp(n) - 1
    }
    ,
    n.log1p = t.log1p || function(n) {
        return n - .5 * n * n === n ? n : Math.log(1 + n)
    }
    ;
    n.sqrtxsqp1 = function(n) {
        var t = n * n;
        return 1 + t === 1 ? 1 : 1 + t === t ? Math.abs(n) : Math.sqrt(t + 1)
    }
    ;
    n.sqrtxsqm1 = function(n) {
        var t = n * n;
        return t < 1 ? NaN : t - 1 === t ? Math.abs(n) : Math.sqrt(t - 1)
    }
    ,
    n.sign = t.sign || function(n) {
        return 0 === n ? 0 : n > 0 ? 1 : n < 0 ? -1 : NaN
    }
});
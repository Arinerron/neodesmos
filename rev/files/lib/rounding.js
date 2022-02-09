
define('lib/rounding', ["require", "exports", "core/math/distance"], function(require, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.shortestDecimalBetween = void 0,
    e.shortestDecimalBetween = function(e, r) {
        if (!isFinite(e))
            return e;
        if (!isFinite(r))
            return r;
        var i = t.mean(e, r);
        if (e > 0 != r > 0)
            return 0;
        if (0 === e || 0 === r)
            return 0;
        var n = e > 0 ? 1 : -1
          , a = Math.abs(e).toExponential().split("e")
          , o = Math.abs(r).toExponential().split("e")
          , s = a[0]
          , l = o[0]
          , u = a[1]
          , f = o[1];
        if (f !== u)
            return n * Math.pow(10, Math.max(parseFloat(u), parseFloat(f)));
        if (s[0] !== l[0])
            return parseFloat(i.toPrecision(1));
        for (var p = 1, c = 2; c < Math.min(s.length, l.length) && (p++,
        s[c] === l[c]); c++)
            ;
        return parseFloat(i.toPrecision(p))
    }
});
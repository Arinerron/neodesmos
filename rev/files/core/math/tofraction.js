define('core/math/tofraction', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = function(e, r) {
        if (void 0 === r && (r = 1e6),
        e === 1 / 0)
            return {
                n: 1 / 0,
                d: 1
            };
        if (e === -1 / 0)
            return {
                n: -1 / 0,
                d: 1
            };
        if (!isFinite(e))
            return {
                n: NaN,
                d: 1
            };
        for (var n, t, i, u = 0, f = 1, d = 1, o = 0; !(t = (n = Math.floor(e)) * f + u,
        (i = n * o + d) > r || (u = f,
        d = o,
        f = t,
        o = i,
        e === n)); )
            e = 1 / (e - n);
        return {
            n: f,
            d: o
        }
    }
});
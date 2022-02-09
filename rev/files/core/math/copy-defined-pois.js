define('core/math/copy-defined-pois', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    e.default = function(e) {
        for (var r = [], t = [], u = e.length, n = 0; n < u; n++)
            r.push(e[n][0]),
            t.push(e[n][1]);
        return {
            defined: {
                x: r,
                y: t
            }
        }
    }
});
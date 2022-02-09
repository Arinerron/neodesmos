
define('geometry/math/hypot', ["require", "exports"], function(require, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = Math.hypot && Math.hypot(1 / 0, NaN) === 1 / 0;
    function a(t) {
        return t === 1 / 0 || t === -1 / 0
    }
    t.default = r ? Math.hypot : function(t, r) {
        if (a(t) || a(r))
            return 1 / 0;
        if (isNaN(t) || isNaN(r))
            return NaN;
        if (0 === t && 0 === r)
            return 0;
        if (Math.abs(t) > Math.abs(r)) {
            var e = r / t;
            return Math.abs(t) * Math.sqrt(e * e + 1)
        }
        e = t / r;
        return Math.abs(r) * Math.sqrt(e * e + 1)
    }
});
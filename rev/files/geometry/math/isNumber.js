define('geometry/math/isNumber', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.isNumber = void 0,
    e.isNumber = function(e) {
        var r;
        if ("number" == typeof e)
            r = e + "";
        else {
            if ("string" != typeof e)
                return !1;
            r = e
        }
        return r.trim().match(/^-?[0-9]*\.?[0-9]*$/)
    }
});
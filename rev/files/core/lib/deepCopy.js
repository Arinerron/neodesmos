
define('core/lib/deepCopy', ["require", "exports"], function(require, r) {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.default = function r(e) {
        var t = e;
        if (t && "function" == typeof t.toJSON && (t = t.toJSON()),
        !t)
            return t;
        if ("object" != typeof t)
            return t;
        if (Array.isArray(t))
            return t.map(r);
        var n = {};
        for (var o in t)
            t.hasOwnProperty(o) && (n[o] = r(t[o]));
        return n
    }
});
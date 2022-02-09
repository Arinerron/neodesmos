
define('lib/coerce-url', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.coerceURL = void 0,
    e.coerceURL = function(e) {
        var r = document.createElement("a");
        return r.href = e,
        r.href
    }
});

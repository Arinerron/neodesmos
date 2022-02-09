define('core/lib/random-seed', ["require", "exports", "core/lib/md5"], function(require, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = function() {
        var e = new Uint8Array(16);
        if ("undefined" != typeof crypto)
            crypto.getRandomValues(e);
        else {
            if ("undefined" == typeof msCrypto)
                return t(Date.now().toString() + Math.random().toString());
            msCrypto.getRandomValues(e)
        }
        return Array.prototype.slice.call(e).map(function(e) {
            return function(e) {
                return 1 === e.length ? "0" + e : e
            }(e.toString(16))
        }).join("")
    }
});
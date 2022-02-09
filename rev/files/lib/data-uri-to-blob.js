define('lib/data-uri-to-blob', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = function(e) {
        for (var t = e.split(","), n = t[0].match(/:(.*?);/), r = null !== n ? n[1] : "", l = null !== t[1] ? atob(t[1]) : "", u = l.length, o = new Uint8Array(u); u--; )
            o[u] = l.charCodeAt(u);
        return new Blob([o],{
            type: r
        })
    }
});
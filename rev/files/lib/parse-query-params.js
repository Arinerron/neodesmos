define('lib/parse-query-params', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getQueryParams = void 0;
    e.getQueryParams = function() {
        var e = "";
        try {
            "?" == (e = location.search)[0] && (e = e.slice(1))
        } catch (e) {}
        for (var r = {}, t = 0, n = e.split("&"); t < n.length; t++) {
            var o = n[t].split("=");
            2 == o.length ? r[o[0]] = decodeURIComponent(o[1]) : r[o[0]] = !0
        }
        return r
    }
});

define('main/shared-worker-pool', ["require", "exports", "worker/workerpool", "lib/urlparser"], function(require, e, r, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var t = o.getParameter(location.search, "nworkers")
      , a = 4;
    t && (a = parseInt(t, 10)),
    e.default = new r(a)
});
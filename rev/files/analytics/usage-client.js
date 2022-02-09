
define('analytics/usage-client', ["require", "exports", "./looker"], function(require, e, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.logUsageData = void 0,
    e.logUsageData = function(e, t) {
        o.logJSON(e, t)
    }
});
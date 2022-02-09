define('lib/conditional_blur', ["require", "exports", "touchtracking", "jquery"], function(require, e, t, u) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = function() {
        if (document.activeElement) {
            var e = u(document.activeElement);
            t.elIsFocusable(e) && u(document.activeElement).trigger("blur")
        }
    }
});
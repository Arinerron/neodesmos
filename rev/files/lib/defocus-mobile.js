define('lib/defocus-mobile', ["require", "exports", "jquery", "touchtracking"], function(require, e, t, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = function() {
        if (document.activeElement) {
            var e = t(document.activeElement);
            r.elIsFocusable(e) && t("<input />").prependTo("body").trigger("focus").attr({
                readonly: "readonly",
                disabled: "true"
            }).trigger("blur").remove()
        }
    }
});
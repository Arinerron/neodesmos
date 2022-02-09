
define('lib/get-clipboard-data', ["require", "exports"], function(require, a) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    }),
    a.default = function(a) {
        return window.clipboardData && window.clipboardData.getData ? window.clipboardData.getData("Text") : a && a.clipboardData && a.clipboardData.getData ? a.clipboardData.getData("text/plain") : void 0
    }
});

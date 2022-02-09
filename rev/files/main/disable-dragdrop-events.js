
define('main/disable-dragdrop-events', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = function(e) {
        e.on("drag dragend dragenter dragover dragleave drop", function(e) {
            e.preventDefault(),
            e.stopPropagation()
        })
    }
});
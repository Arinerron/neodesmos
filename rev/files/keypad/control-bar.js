define('keypad/control-bar', ["require", "exports", "tslib", "dcgview", "./dcgview-keypad", "loadcss!./control-bar"], function(require, e, t, r, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = function(e) {
        function n() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(n, e),
        n.prototype.template = function() {
            var e = this;
            return r.createElement("div", {
                class: r.const("dcg-keypad-control-bar dcg-do-not-blur"),
                role: r.const("group"),
                "aria-label": function() {
                    return e.controller.s("shared-calculator-narration-keypad-controlbar")
                }
            }, r.createElement("div", {
                class: r.const("dcg-keypad-control-bar-contents")
            }, this.children))
        }
        ,
        n
    }(n.default);
    e.default = o
});

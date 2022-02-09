define('keypad/row', ["require", "exports", "tslib", "dcgview", "loadcss!./row"], function(require, e, t, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.template = function() {
            return n.createElement("div", {
                class: n.const("dcg-keypad-row")
            }, this.children)
        }
        ,
        r
    }(n.Class);
    e.default = r
});
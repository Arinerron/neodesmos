define('keypad/keypad', ["require", "exports", "tslib", "dcgview", "./dcgview-keypad", "loadcss!./keypad"], function(require, e, t, n, d) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function(e) {
        function d() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(d, e),
        d.prototype.template = function() {
            return n.createElement("div", {
                class: n.const("dcg-basic-keypad dcg-do-not-blur")
            }, this.children)
        }
        ,
        d
    }(d.default);
    e.default = i
});

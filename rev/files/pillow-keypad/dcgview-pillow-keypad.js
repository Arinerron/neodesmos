define('pillow-keypad/dcgview-pillow-keypad', ["require", "exports", "tslib", "dcgview"], function(require, t, e, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.DCGViewPillowKeypad = void 0;
    var o = function(t) {
        function i() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(i, t),
        i.prototype.init = function() {
            this.controller = this.props.controller(),
            this.dispatch = this.controller.dispatch,
            this.s = this.controller.s
        }
        ,
        i
    }(i.Class);
    t.DCGViewPillowKeypad = o
});
define('keypad/dcgview-keypad', ["require", "exports", "tslib", "dcgview"], function(require, t, e, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function(t) {
        function n() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(n, t),
        n.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        n
    }(n.Class);
    t.default = r
});

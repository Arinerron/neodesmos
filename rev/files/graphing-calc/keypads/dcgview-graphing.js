
define('graphing-calc/keypads/dcgview-graphing', ["require", "exports", "tslib", "dcgview"], function(require, t, e, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function(t) {
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
    t.default = r
});

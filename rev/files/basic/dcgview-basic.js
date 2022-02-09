define('basic/dcgview-basic', ["require", "exports", "tslib", "dcgview"], function(require, t, i, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.DCGViewBasic = void 0;
    var s = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return i.__extends(e, t),
        e.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.controller.model,
            this.dispatch = this.controller.dispatch,
            this.s = this.controller.s
        }
        ,
        e
    }(e.Class);
    t.DCGViewBasic = s
});

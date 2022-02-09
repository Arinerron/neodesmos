define('expressions/drag_container_view', ["require", "exports", "tslib", "dcgview"], function(require, t, e, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = function(t) {
        function n() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(n, t),
        n.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        n.prototype.template = function() {
            var t = this;
            return r.createElement("div", {
                class: r.const("dcg-drag-container"),
                style: function() {
                    return {
                        top: t.getTopPx()
                    }
                }
            }, this.children)
        }
        ,
        n.prototype.getTopPx = function() {
            var t = this.controller.getRawDragState();
            if (t)
                return t.itemTop + "px"
        }
        ,
        n
    }(r.Class);
    t.default = n
});
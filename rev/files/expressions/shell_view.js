define('expressions/shell_view', ["require", "exports", "tslib", "dcgview", "./abstract-item-view"], function(require, e, t, n, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = function(e) {
        function i() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(i, e),
        i.prototype.didMount = function() {
            this.onItemViewMounted()
        }
        ,
        i.prototype.willUnmount = function() {
            this.onItemViewUnmounted()
        }
        ,
        i.prototype.template = function() {
            var e = "";
            return this.model.cachedRenderHeight && (e = "height:" + this.model.cachedRenderHeight + "px"),
            n.createElement("div", {
                class: n.const("dcg-do-not-blur dcg-expressionitem dcg-shell"),
                "expr-id": this.const(this.model.id),
                onTap: this.bindFn(this.onMouseSelect),
                style: n.const(e)
            })
        }
        ,
        i
    }(i.default);
    e.default = o
});
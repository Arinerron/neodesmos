
define('calculator-shell/modal', ["require", "exports", "tslib", "dcgview"], function(require, e, t, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.Modal = void 0;
    var o = function(e) {
        function o() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(o, e),
        o.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: function() {
                    return {
                        modal_section: !0,
                        "dcg-hotkeys-dialog": "hotkeys" === e.props.controller().getOpenModal()
                    }
                }
            }, this.children)
        }
        ,
        o
    }(n.Class);
    e.Modal = o
});
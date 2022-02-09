
define('main/reset-button-view', ["require", "exports", "tslib", "dcgview", "../shared-components/tooltip", "loadcss!pillboxes"], function(require, t, e, o, r) {
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
            return o.createElement("div", {
                class: o.const("dcg-reset-container")
            }, o.createElement(r.Tooltip, {
                tooltip: function() {
                    return t.controller.s("graphing-calculator-label-tooltip-reset")
                },
                gravity: this.const("w")
            }, o.createElement("div", {
                class: o.const("dcg-reset-pillbox dcg-action-reset dcg-btn-flat-gray"),
                role: o.const("button"),
                tabindex: o.const("0"),
                "aria-label": function() {
                    return t.controller.s("graphing-calculator-label-tooltip-reset")
                },
                onTap: this.bindFn(this.reset),
                style: function() {
                    return {
                        background: t.controller.getPillboxBackgroundColor()
                    }
                }
            }, o.createElement("i", {
                class: o.const("dcg-icon dcg-icon-reset"),
                "aria-hidden": o.const("true")
            }))))
        }
        ,
        n.prototype.reset = function() {
            this.controller.dispatch({
                type: "reset-graph"
            })
        }
        ,
        n
    }(o.Class);
    t.default = n
});
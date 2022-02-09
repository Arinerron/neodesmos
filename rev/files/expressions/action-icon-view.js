define('expressions/action-icon-view', ["require", "exports", "tslib", "dcgview", "./circular-icon-view", "main/manage-focus-helper", "jquery.handleevent", "loadcss!./action-icon-view"], function(require, n, t, i, e, o) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    n.ActionIconView = void 0;
    var c = function(n) {
        function c() {
            var t = null !== n && n.apply(this, arguments) || this;
            return t.isAnimating = !1,
            t.unmounted = !1,
            t
        }
        return t.__extends(c, n),
        c.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model()
        }
        ,
        c.prototype.template = function() {
            var n = this;
            return i.createElement("div", {
                class: function() {
                    return {
                        "dcg-action-icon-view": !0,
                        "dcg-action-icon-view-animating": n.isAnimating
                    }
                }
            }, i.createElement("div", {
                class: i.const("dcg-circular-icon-container"),
                "aria-label": function() {
                    return n.controller.s("graphing-calculator-narration-run-action-icon")
                },
                role: i.const("button"),
                tabindex: i.const("0"),
                onTap: function(t) {
                    t.wasHandled("dragdrop") || n.runActionOnce()
                },
                manageFocus: this.const(o.manageFocusHelper({
                    controller: this.props.controller(),
                    location: {
                        type: "action-icon",
                        id: this.model.id
                    }
                }))
            }, i.createElement(e.CircularIconView, {
                iconType: this.const("action"),
                whiteIcon: function() {
                    return !n.controller.isInEditListMode() && n.controller.isItemSelected(n.model.id) || n.controller.isItemBeingDragged(n.model.id)
                }
            })))
        }
        ,
        c.prototype.willUnmount = function() {
            this.unmounted = !0
        }
        ,
        c.prototype.runActionOnce = function() {
            var n = this;
            this.isAnimating = !0,
            this.controller.dispatch({
                type: "action-single-step",
                id: this.model.id
            }),
            setTimeout(function() {
                n.isAnimating = !1,
                n.unmounted || n.update()
            }, 150)
        }
        ,
        c
    }(i.Class);
    n.ActionIconView = c
});
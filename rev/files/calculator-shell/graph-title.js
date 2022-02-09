define('calculator-shell/graph-title', ["require", "exports", "tslib", "dcgview", "jquery", "./save-button"], function(require, t, o, e, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.GraphTitle = void 0;
    var l = e.Components.If
      , i = function(t) {
        function i() {
            return null !== t && t.apply(this, arguments) || this
        }
        return o.__extends(i, t),
        i.prototype.init = function() {
            this.controller = this.props.controller(),
            this.userController = this.controller.userController,
            this.graphsController = this.controller.graphsController
        }
        ,
        i.prototype.template = function() {
            var t = this;
            return e.createElement("span", {
                class: e.const("title-div")
            }, e.createElement("span", {
                role: e.const("button"),
                class: e.const("dcg-variable-title-container"),
                "dcg-menu-button": function() {
                    return t.shouldShowDropdown() ? "graph-actions" : void 0
                },
                tabindex: e.const(0),
                onTap: function(o) {
                    t.shouldShowDropdown() ? t.openGraphActionsDropdown(o) : t.shouldOpenSaveDialog() && t.controller.dispatch({
                        type: "edit-title"
                    })
                },
                "aria-haspopup": function() {
                    return t.shouldShowDropdown()
                },
                "aria-expanded": function() {
                    return "graph-actions" == t.props.controller().getOpenMenu()
                },
                "aria-label": function() {
                    return t.shouldShowDropdown() ? t.controller.s("account-shell-label-graph-actions") : void 0
                }
            }, e.createElement("span", {
                class: function() {
                    return {
                        "dcg-variable-title dcg-tooltip": !0,
                        "dcg-action-savedialog": t.shouldOpenSaveDialog()
                    }
                }
            }, function() {
                return t.graphsController.getCurrentGraphTitle() || t.graphsController.getUntitledString()
            }), e.createElement(l, {
                predicate: this.bindFn(this.shouldShowDropdown)
            }, function() {
                return e.createElement("span", {
                    class: e.const("dcg-graph-actions-dropdown-anchor")
                }, e.createElement("i", {
                    class: e.const("dcg-icon-caret-down")
                }))
            })), e.createElement(l, {
                predicate: function() {
                    return t.userController.isLoggedIn() && !t.controller.getPreviewParams() && !t.controller.isInMaintenanceMode()
                }
            }, function() {
                return e.createElement(n.SaveButton, {
                    controller: t.props.controller
                })
            }))
        }
        ,
        i.prototype.shouldOpenSaveDialog = function() {
            return "geometry" === this.controller.product
        }
        ,
        i.prototype.shouldShowDropdown = function() {
            return "geometry" !== this.controller.product && this.graphsController.wasCurrentGraphEverSaved()
        }
        ,
        i.prototype.openGraphActionsDropdown = function(t) {
            this.props.controller().dispatch({
                type: "toggle-menu",
                payload: "graph-actions"
            }),
            t && "keyboard" === t.device && "share" !== this.controller.getOpenMenu() && r(".dcg-graph-actions-container .dropdown-choice:not(.dropdown-choice-disabled):eq(0)").trigger("focus")
        }
        ,
        i
    }(e.Class);
    t.GraphTitle = i
});
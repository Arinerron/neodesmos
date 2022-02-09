
define('calculator-shell/delete-modal', ["require", "exports", "tslib", "dcgview", "../lib/fluent-bundle-sequence", "../shared-components/modal", "loadcss!./delete-modal"], function(require, e, t, n, r, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.DeleteModal = void 0;
    var l = n.Components.IfDefined
      , s = function(e) {
        function s() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(s, e),
        s.prototype.init = function() {
            this.controller = this.props.controller(),
            this.graphsController = this.controller.graphsController
        }
        ,
        s.prototype.template = function() {
            var e = this;
            return n.createElement(o.Modal, {
                size: this.const("narrow"),
                onClose: function() {
                    e.controller.dispatch({
                        type: "close-modal"
                    })
                },
                i18n: this.const(this.controller),
                title: function() {
                    return e.controller.s("account-shell-label-delete-graph-modal-title")
                },
                class: this.const("dcg-delete-modal")
            }, n.createElement("div", {
                class: n.const("dcg-delete-modal-contents")
            }, n.createElement("div", {
                class: n.const("dcg-delete-confirmation-message")
            }, this.bindFn(this.getConfirmationMessage)), l(function() {
                return e.errorMessage
            }, function(e) {
                return n.createElement("div", {
                    class: n.const("dcg-error-message")
                }, e)
            }), n.createElement("div", {
                class: n.const("dcg-action-buttons")
            }, n.createElement("span", {
                class: n.const("dcg-shared-dark-gray-link"),
                role: n.const("button"),
                tabindex: n.const("0"),
                "aria-label": function() {
                    return e.controller.s("account-shell-button-cancel")
                },
                onTap: function() {
                    return e.controller.dispatch({
                        type: "close-modal"
                    })
                }
            }, function() {
                return e.controller.s("account-shell-button-cancel")
            }), n.createElement("div", {
                class: function() {
                    return {
                        "dcg-shared-btn-red dcg-action-delete": !0,
                        "dcg-disabled": !!e.deleteInProgress
                    }
                },
                role: n.const("button"),
                tabindex: function() {
                    return e.deleteInProgress ? -1 : 0
                },
                "aria-label": this.bindFn(this.getButtonText),
                "aria-disabled": function() {
                    return !!e.deleteInProgress
                },
                onTap: this.bindFn(this.deleteGraph)
            }, this.bindFn(this.getButtonText)))))
        }
        ,
        s.prototype.deleteGraph = function() {
            var e = this;
            this.deleteInProgress = !0,
            this.graphsController._deleteGraph(this.graphsController.currentGraph).done(function() {
                e.graphsController.clearGraphByUserAction(),
                e.controller.dispatch({
                    type: "close-modal"
                })
            }).fail(function() {
                e.deleteInProgress = !1,
                e.errorMessage = e.controller.s("account-shell-error-deletion-error"),
                e.controller.dispatch({
                    type: "render"
                })
            })
        }
        ,
        s.prototype.getConfirmationMessage = function() {
            return this.controller.s("account-shell-text-delete-graphs-confirmation", {
                count: this.getGraphCount(),
                title: this.getTitle()
            })
        }
        ,
        s.prototype.getButtonText = function() {
            return this.controller.s("account-shell-button-confirm-delete", {
                count: this.getGraphCount()
            })
        }
        ,
        s.prototype.getGraphCount = function() {
            return new r.LocalizableNumericValue(1)
        }
        ,
        s.prototype.getTitle = function() {
            return this.graphsController.getCurrentGraphTitle() || this.graphsController.getUntitledString()
        }
        ,
        s
    }(n.Class);
    e.DeleteModal = s
});

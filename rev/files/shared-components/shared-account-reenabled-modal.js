
define('shared-components/shared-account-reenabled-modal', ["require", "exports", "tslib", "dcgview", "shared-components/modal", "loadcss!./shared-account-modal"], function(require, e, t, n, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.SharedAccountReenabledModal = void 0;
    var r = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.init = function() {
            this.controller = this.props.controller(),
            this.i18n = this.controller
        }
        ,
        r.prototype.template = function() {
            var e = this;
            return n.createElement(o.Modal, {
                title: function() {
                    return e.i18n.s("shared-title-account-reactivated")
                },
                size: this.const("narrow"),
                showX: this.const(!0),
                onClose: function() {
                    return e.controller.dispatch({
                        type: "close-modal"
                    })
                },
                i18n: this.props.controller
            }, n.createElement("div", {
                class: n.const("dcg-shared-recover-password-dialog dcg-shared-account-dialog")
            }, n.createElement("div", {
                class: n.const("dcg-shared-account-paragraph")
            }, function() {
                return e.i18n.s("shared-message-account-reactivated")
            }), n.createElement("div", {
                class: n.const("dcg-shared-modal-actions-container")
            }, n.createElement("button", {
                class: function() {
                    return {
                        "dcg-shared-btn-blue": !0
                    }
                },
                onTap: function() {
                    return e.controller.dispatch({
                        type: "close-modal"
                    })
                },
                didMount: function(t) {
                    e.controller.wasModalOpenedWithKeyboard() && t.focus()
                }
            }, function() {
                return e.i18n.s("shared-button-continue-to-desmos")
            }))))
        }
        ,
        r
    }(n.Class);
    e.SharedAccountReenabledModal = r
});

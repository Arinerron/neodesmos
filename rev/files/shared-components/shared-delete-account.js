
define('shared-components/shared-delete-account', ["require", "exports", "tslib", "dcgview", "shared/dcgviews/localize", "./shared-account-modal-errors", "loadcss!./shared-account-settings-modal", "loadcss!shared-components/btn-styles"], function(require, e, t, n, o, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.SharedDeleteAccount = void 0;
    var c = function(e) {
        function c() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(c, e),
        c.prototype.init = function() {
            this.controller = this.props.controller(),
            this.i18n = this.controller,
            this.formErrors = []
        }
        ,
        c.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("dcg-shared-delete-account dcg-shared-account-settings-section")
            }, n.createElement("h1", {
                class: n.const("dcg-shared-left-align-title")
            }, function() {
                return e.i18n.s("shared-title-delete-account")
            }), n.createElement("div", {
                class: n.const("dcg-shared-account-paragraph")
            }, n.createElement(o.Localize, {
                key: this.const("shared-message-delete-account-notice"),
                i18n: this.props.controller
            }, n.const("When you delete your account,"), n.const(" "), n.createElement("b", null, n.const("we will retain your data for 30 days.")), n.const(" "), n.const("You can reactivate your account at any time during those 30 days by logging back in."), n.const(" "), n.const("If there's something about Desmos we can improve, please"), n.const(" "), n.createElement("a", {
                href: n.const("mailto:support@desmos.com"),
                class: n.const("dcg-shared-blue-link")
            }, n.const("let us know.")))), n.createElement("div", {
                class: n.const("dcg-shared-account-paragraph")
            }, function() {
                return e.i18n.s("shared-message-delete-account-will-send-email", {
                    email: e.i18n.raw(e.controller.userController.getEmail())
                })
            }), n.createElement("form", {
                onSubmit: this.bindFn(this.onSubmit)
            }, n.createElement(r.SharedAccountModalErrors, {
                controller: this.props.controller,
                errors: function() {
                    return e.formErrors
                }
            }), n.createElement("div", {
                class: n.const("dcg-shared-modal-actions-container")
            }, n.createElement("div", {
                role: n.const("link"),
                tabindex: n.const(0),
                class: n.const("dcg-shared-dark-gray-link"),
                didMount: function(t) {
                    e.controller.wasModalOpenedWithKeyboard() && t.focus()
                },
                onTap: function() {
                    return e.controller.logJSON("shared-delete-account", {
                        action: "cancel-delete-account"
                    }),
                    e.props.hideForm()
                }
            }, function() {
                return e.i18n.s("shared-button-cancel")
            }), n.createElement("button", {
                class: function() {
                    return {
                        "dcg-shared-btn-red": !0,
                        "dcg-disabled": e.disabled
                    }
                },
                "aria-disabled": function() {
                    return e.disabled
                },
                tabindex: function() {
                    return e.disabled ? "-1" : "0"
                },
                type: n.const("submit")
            }, function() {
                return e.i18n.s("shared-button-send-delete-account-email")
            }))))
        }
        ,
        c.prototype.onAccountDeleted = function() {
            return this.props.submitForm()
        }
        ,
        c.prototype.onAccountDeletionFailed = function() {
            if (this.formErrors = [this.controller.getSomethingWentWrongText()],
            !this.unmounted)
                return this.update()
        }
        ,
        c.prototype.doDeleteAccount = function() {
            this.disabled || (this.controller.logJSON("shared-delete-account", {
                action: "send-delete-account-email"
            }),
            this.controller.userController.initiateAccountDeletion({
                lang: this.controller.getLanguage()
            }).done(this.bindFn(this.onAccountDeleted)).fail(this.bindFn(this.onAccountDeletionFailed)))
        }
        ,
        c.prototype.didUnmount = function() {
            return this.unmounted = !0
        }
        ,
        c.prototype.onSubmit = function(e) {
            e.preventDefault(),
            this.doDeleteAccount()
        }
        ,
        c
    }(n.Class);
    e.SharedDeleteAccount = c
});
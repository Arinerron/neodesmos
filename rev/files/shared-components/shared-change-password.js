
define('shared-components/shared-change-password', ["require", "exports", "tslib", "dcgview", "./shared-account-modal-errors", "loadcss!./shared-account-settings-modal", "loadcss!shared-components/btn-styles"], function(require, e, t, n, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.SharedChangePassword = void 0;
    var o = n.Components.If
      , s = function(e) {
        function s() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(s, e),
        s.prototype.init = function() {
            this.controller = this.props.controller(),
            this.i18n = this.controller,
            this.mode = 1,
            this.formErrors = []
        }
        ,
        s.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("dcg-shared-change-password dcg-shared-account-settings-section")
            }, n.createElement(o, {
                predicate: function() {
                    return 1 === e.mode
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-shared-reset-by-email")
                }, n.createElement("div", {
                    class: n.const("dcg-shared-account-paragraph")
                }, function() {
                    return e.i18n.s("shared-message-change-password-email-sent", {
                        emailAddress: e.i18n.raw(e.controller.userController.getEmail())
                    })
                }), n.createElement(r.SharedAccountModalErrors, {
                    controller: e.props.controller,
                    errors: function() {
                        return e.formErrors
                    }
                }), n.createElement("div", {
                    class: n.const("dcg-shared-modal-actions-container")
                }, n.createElement("div", {
                    role: n.const("button"),
                    "aria-disabled": function() {
                        return e.emailDisabled
                    },
                    tabindex: function() {
                        return e.emailDisabled ? "-1" : "0"
                    },
                    class: function() {
                        return {
                            "dcg-shared-btn-blue": !0,
                            "dcg-disabled": e.emailDisabled
                        }
                    },
                    didMount: function(t) {
                        e.controller.wasModalOpenedWithKeyboard() && t.focus()
                    },
                    onTap: function() {
                        return e.sendResetPasswordEmail()
                    }
                }, function() {
                    return e.i18n.s("shared-button-send-email")
                })))
            }), n.createElement(o, {
                predicate: function() {
                    return 2 === e.mode
                }
            }, function() {
                return n.createElement("div", {
                    "aria-live": n.const("assertive"),
                    "aria-atomic": n.const("true"),
                    class: n.const("dcg-shared-confirmation-message-container")
                }, n.createElement("div", {
                    class: n.const("dcg-shared-confirmation-message")
                }, n.createElement("i", {
                    class: function() {
                        return {
                            "dcg-shared-icon-check": !0,
                            "dcg-success-marker": !0
                        }
                    },
                    "aria-hidden": n.const("true")
                }), function() {
                    return e.i18n.s("shared-message-email-sent")
                }), n.createElement("div", null, function() {
                    return e.i18n.s("shared-message-check-email-for-password-link", {
                        emailAddress: e.i18n.raw(e.controller.userController.getEmail())
                    })
                }))
            }))
        }
        ,
        s.prototype.didUnmount = function() {
            this.unmounted = !0
        }
        ,
        s.prototype.onEmailSent = function() {
            var e = this;
            this.mode = 2,
            this.unmounted || this.update(),
            setTimeout(function() {
                e.mode = 0,
                e.unmounted || e.update()
            }, 5e3),
            setTimeout(function() {
                e.mode = 1,
                e.unmounted || e.update()
            }, 5200)
        }
        ,
        s.prototype.onEmailSendingFailed = function() {
            this.formErrors = [this.controller.getSomethingWentWrongText()],
            this.unmounted || this.update()
        }
        ,
        s.prototype.sendResetPasswordEmail = function() {
            this.controller.userController.recoverPassword({
                email: this.controller.userController.getEmail(),
                lang: this.controller.getLanguage()
            }).done(this.bindFn(this.onEmailSent)).fail(this.bindFn(this.onEmailSendingFailed))
        }
        ,
        s
    }(n.Class);
    e.SharedChangePassword = s
});
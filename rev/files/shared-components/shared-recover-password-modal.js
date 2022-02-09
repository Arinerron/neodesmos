
define('shared-components/shared-recover-password-modal', ["require", "exports", "tslib", "dcgview", "shared-components/modal", "./shared-account-modal-errors", "loadcss!./shared-account-modal"], function(require, e, t, r, n, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.SharedRecoverPasswordModal = void 0;
    var s = r.Components
      , i = s.If
      , c = s.Input
      , a = function(e) {
        function s() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(s, e),
        s.prototype.init = function() {
            this.controller = this.props.controller(),
            this.i18n = this.controller,
            this.email = this.controller.userController.getEmail(),
            this.formErrors = [],
            this.isSubmittingForm = !1,
            this.didSendRecoveryEmail = !1
        }
        ,
        s.prototype.template = function() {
            var e = this;
            return r.createElement(n.Modal, {
                title: function() {
                    return e.i18n.s("shared-title-recover-password")
                },
                size: this.const("narrow"),
                showX: this.const(!0),
                onClose: function() {
                    return e.controller.dispatch({
                        type: "close-modal"
                    })
                },
                i18n: this.props.controller
            }, r.createElement("div", {
                class: r.const("dcg-shared-recover-password-dialog dcg-shared-account-dialog")
            }, r.createElement(o.SharedAccountModalErrors, {
                controller: this.props.controller,
                errors: function() {
                    return e.formErrors
                }
            }), r.createElement(i, {
                predicate: function() {
                    return e.didSendRecoveryEmail
                }
            }, function() {
                return r.createElement("div", {
                    role: r.const("alert"),
                    class: r.const("dcg-shared-account-paragraph")
                }, function() {
                    return e.i18n.s("shared-message-check-email-for-password-recovery-link")
                }, r.const(" "), r.createElement("a", {
                    href: r.const("#"),
                    class: r.const("dcg-shared-blue-link"),
                    onTap: function(t) {
                        return e.didSendRecoveryEmail = !1,
                        e.controller.dispatch({
                            type: "show-modal",
                            modal: "recover-password",
                            device: t.device
                        })
                    }
                }, function() {
                    return e.i18n.s("shared-button-try-again")
                }))
            }), r.createElement(i, {
                predicate: function() {
                    return !e.didSendRecoveryEmail
                }
            }, function() {
                return r.createElement("form", {
                    class: r.const("dcg-shared-email-form-container"),
                    onSubmit: e.bindFn(e.onSubmit)
                }, r.createElement("div", {
                    class: r.const("dcg-shared-account-paragraph")
                }, function() {
                    return e.i18n.s("shared-prompt-enter-email-for-password-recovery-link")
                }), r.createElement("label", null, r.createElement("span", {
                    class: r.const("dcg-shared-input-title")
                }, function() {
                    return e.i18n.s("shared-label-email")
                }), r.createElement(c, {
                    type: r.const("email"),
                    name: r.const("email"),
                    class: r.const("dcg-shared-input-blue-outline"),
                    "aria-label": function() {
                        return e.i18n.s("shared-label-email")
                    },
                    "aria-required": r.const("true"),
                    required: r.const("required"),
                    didMount: function(t) {
                        e.controller.wasModalOpenedWithKeyboard() && t.focus()
                    },
                    value: function() {
                        return e.email
                    },
                    onInput: function(t) {
                        e.email = t,
                        e.unmounted || e.update()
                    }
                })), r.createElement("div", {
                    class: r.const("dcg-shared-sign-in-options")
                }, r.createElement(i, {
                    predicate: function() {
                        return e.isSubmittingForm
                    }
                }, function() {
                    return r.createElement("div", {
                        class: r.const("dcg-shared-progress-indicator dcg-shared-create-account-progress")
                    }, r.createElement("div", {
                        class: r.const("dcg-shared-spinner")
                    }))
                }), r.createElement(i, {
                    predicate: function() {
                        return !e.isSubmittingForm
                    }
                }, function() {
                    return r.createElement("button", {
                        class: function() {
                            return {
                                "dcg-shared-btn-blue": !0
                            }
                        },
                        type: r.const("submit")
                    }, function() {
                        return e.i18n.s("shared-button-recover-password")
                    })
                })))
            })))
        }
        ,
        s.prototype.didUnmount = function() {
            this.unmounted = !0
        }
        ,
        s.prototype.onSubmit = function(e) {
            e.preventDefault(),
            this.submitForm()
        }
        ,
        s.prototype.submitForm = function() {
            var e = this;
            this.formErrors = [],
            this.isSubmittingForm = !0,
            this.controller.userController.recoverPassword({
                email: this.email,
                lang: this.controller.getLanguage()
            }).done(function() {
                e.didSendRecoveryEmail = !0
            }).fail(function(t) {
                e.formErrors = e.controller.parseJSONErrors(t)
            }).always(function() {
                e.isSubmittingForm = !1,
                e.unmounted || e.update()
            })
        }
        ,
        s
    }(r.Class);
    e.SharedRecoverPasswordModal = a
});

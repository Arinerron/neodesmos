
define('shared-components/shared-change-email-modal', ["require", "exports", "tslib", "dcgview", "shared-components/modal", "./shared-account-modal-errors", "loadcss!./shared-account-modal"], function(require, e, t, n, r, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.SharedChangeEmailModal = void 0;
    var s = n.Components.Input
      , a = function(e) {
        function a() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(a, e),
        a.prototype.init = function() {
            this.controller = this.props.controller(),
            this.i18n = this.controller,
            this.formErrors = []
        }
        ,
        a.prototype.template = function() {
            var e = this;
            return n.createElement(r.Modal, {
                title: function() {
                    return e.i18n.s("shared-title-change-email-address")
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
                class: n.const("dcg-shared-change-email dcg-shared-account-dialog")
            }, n.createElement("div", {
                class: n.const("dcg-shared-account-paragraph")
            }, function() {
                return e.i18n.s("shared-message-set-new-email-address")
            }), n.createElement("form", {
                onSubmit: this.bindFn(this.onSubmit),
                method: n.const("post"),
                class: n.const("dcg-shared-email-form-container")
            }, n.createElement("label", null, n.createElement("span", {
                class: n.const("dcg-shared-input-title")
            }, function() {
                return e.i18n.s("shared-label-new-email-address")
            }), n.createElement(s, {
                type: n.const("email"),
                name: n.const("newEmail"),
                class: n.const("dcg-shared-input-blue-outline"),
                "aria-label": function() {
                    return e.i18n.s("shared-label-new-email-address")
                },
                "aria-required": n.const("true"),
                required: n.const("required"),
                didMount: function(t) {
                    e.controller.wasModalOpenedWithKeyboard() && t.focus()
                },
                value: function() {
                    return e.newEmail
                },
                onInput: function(t) {
                    e.newEmail = t,
                    e.unmounted || e.update()
                }
            })), n.createElement("label", {
                for: n.const("password")
            }, n.createElement("span", null, function() {
                return e.i18n.s("shared-label-password")
            }), n.createElement(s, {
                type: n.const("password"),
                class: n.const("dcg-shared-input-blue-outline"),
                "aria-label": function() {
                    return e.i18n.s("shared-label-password")
                },
                "aria-required": n.const("true"),
                required: n.const("required"),
                value: function() {
                    return e.password
                },
                name: this.const("password"),
                onInput: function(t) {
                    if (e.password = t,
                    !e.unmounted)
                        return e.update()
                }
            })), n.createElement(o.SharedAccountModalErrors, {
                controller: this.props.controller,
                errors: function() {
                    return e.formErrors
                }
            }), n.createElement("div", {
                class: n.const("dcg-shared-sign-in-options")
            }, n.createElement("button", {
                class: function() {
                    return {
                        "dcg-shared-btn-blue": !0,
                        "dcg-disabled": !e.submitEnabled()
                    }
                },
                "aria-disabled": function() {
                    return !e.submitEnabled()
                },
                tabindex: function() {
                    return e.submitEnabled() ? "0" : "-1"
                },
                type: n.const("submit")
            }, function() {
                return e.i18n.s("shared-button-change-email-and-password")
            })))))
        }
        ,
        a.prototype.submitEnabled = function() {
            return !(!this.password || !this.newEmail)
        }
        ,
        a.prototype.didUnmount = function() {
            this.unmounted = !0
        }
        ,
        a.prototype.onSubmit = function(e) {
            var t = this;
            e.preventDefault(),
            this.submitEnabled() && this.controller.userController.setEmail({
                changeToken: this.getChangeToken(),
                password: this.password,
                newEmail: this.newEmail,
                lang: this.controller.getLanguage()
            }).done(function() {
                t.controller.dispatch({
                    type: "close-modal"
                }),
                history.replaceState(null, null, document.location.pathname)
            }).fail(function(e) {
                409 === e.status ? t.formErrors = ["Sorry, someone has already registered with this email address."] : t.formErrors = [t.controller.getSomethingWentWrongText()],
                t.unmounted || t.update()
            })
        }
        ,
        a.prototype.getChangeToken = function() {
            return this.controller.userController.getEmailChangeToken() || ""
        }
        ,
        a
    }(n.Class);
    e.SharedChangeEmailModal = a
});
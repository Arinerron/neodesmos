
define('shared-components/shared-email-settings', ["require", "exports", "tslib", "dcgview", "./shared-account-modal-errors", "loadcss!./shared-account-settings-modal", "loadcss!shared-components/btn-styles"], function(require, e, t, n, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.SharedEmailSettings = void 0;
    var r = n.Components.If
      , i = function(e) {
        function i() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(i, e),
        i.prototype.init = function() {
            this.controller = this.props.controller(),
            this.i18n = this.controller,
            this.formStatus = 0,
            this.emailDisabled = null
        }
        ,
        i.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("dcg-shared-email-field-container")
            }, n.createElement(r, {
                predicate: function() {
                    return 0 === e.formStatus
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-shared-email-field")
                }, n.createElement("div", {
                    class: n.const("dcg-shared-profile-info-container")
                }, n.createElement("span", {
                    class: n.const("dcg-shared-profile-info-title"),
                    role: n.const("heading"),
                    "aria-level": n.const("1")
                }, function() {
                    return e.i18n.s("shared-title-email-settings")
                }), n.createElement("div", {
                    class: n.const("dcg-shared-profile-info-content")
                }, function() {
                    return e.i18n.raw(e.controller.userController.getEmail())
                }, n.createElement("div", {
                    class: n.const("dcg-shared-message-container")
                }, n.createElement("div", {
                    role: n.const("link"),
                    tabindex: n.const(0),
                    class: n.const("dcg-shared-blue-link"),
                    didMount: function(t) {
                        e.controller.wasModalOpenedWithKeyboard() && t.focus()
                    },
                    onTap: function() {
                        return e.setFormStatus(1)
                    }
                }, function() {
                    return e.i18n.s("shared-button-change-email-address")
                })))))
            }), n.createElement(r, {
                predicate: function() {
                    return 1 === e.formStatus
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-shared-change-email-container")
                }, n.createElement("div", {
                    class: n.const("dcg-shared-change-email-description")
                }, function() {
                    return e.i18n.s("shared-message-email-settings-will-send-email", {
                        emailAddress: e.i18n.raw(e.controller.userController.getEmail())
                    })
                }), n.createElement(s.SharedAccountModalErrors, {
                    controller: e.props.controller,
                    errors: function() {
                        return e.formErrors
                    }
                }), n.createElement("div", {
                    class: n.const("dcg-shared-modal-actions-container")
                }, n.createElement("span", {
                    role: n.const("link"),
                    tabindex: n.const(0),
                    class: n.const("dcg-shared-dark-gray-link"),
                    didMount: function(t) {
                        e.controller.wasModalOpenedWithKeyboard() && t.focus()
                    },
                    onTap: function() {
                        return e.setFormStatus(0)
                    }
                }, function() {
                    return e.i18n.s("shared-button-cancel")
                }), n.createElement("button", {
                    class: function() {
                        return {
                            "dcg-shared-btn-blue": !0,
                            "dcg-disabled": e.emailDisabled
                        }
                    },
                    "aria-disabled": function() {
                        return e.disabled
                    },
                    tabindex: function() {
                        return e.disabled ? "-1" : "0"
                    },
                    type: n.const("submit"),
                    onTap: function() {
                        return e.emailDisabled || e.sendChangeEmail()
                    }
                }, function() {
                    return e.i18n.s("shared-button-send-email")
                })))
            }), n.createElement(r, {
                predicate: function() {
                    return 3 === e.formStatus
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
                    return e.i18n.s("shared-message-check-email-for-link", {
                        emailAddress: e.i18n.raw(e.controller.userController.getEmail())
                    })
                }))
            }))
        }
        ,
        i.prototype.didUnmount = function() {
            this.unmounted = !0
        }
        ,
        i.prototype.setToast = function(e) {
            var t = this;
            this.toastMessage || (this.toastMessage = e,
            this.unmounted || this.update(),
            setTimeout(function() {
                t.toastMessage = null,
                t.unmounted || t.update()
            }, 5e3),
            2 === this.formStatus && setTimeout(function() {
                t.setFormStatus(0),
                t.unmounted || t.update()
            }, 5200))
        }
        ,
        i.prototype.setFormStatus = function(e) {
            this.formStatus = e,
            this.toastMessage = null,
            this.formErrors = [],
            this.update()
        }
        ,
        i.prototype.onEmailSent = function() {
            var e = this;
            this.formStatus = 3,
            this.emailDisabled = null,
            this.unmounted || this.update(),
            setTimeout(function() {
                e.formStatus = 0,
                e.unmounted || e.update()
            }, 5e3),
            setTimeout(function() {
                e.formStatus = 0,
                e.unmounted || e.update()
            }, 5200)
        }
        ,
        i.prototype.onEmailSendingFailed = function() {
            this.formErrors = [this.controller.getSomethingWentWrongText()],
            this.emailDisabled = null,
            this.unmounted || this.update()
        }
        ,
        i.prototype.sendChangeEmail = function() {
            this.emailDisabled = !0,
            this.unmounted || this.update(),
            this.controller.userController.initiateEmailChange({
                lang: this.controller.getLanguage()
            }).done(this.bindFn(this.onEmailSent)).fail(this.bindFn(this.onEmailSendingFailed))
        }
        ,
        i
    }(n.Class);
    e.SharedEmailSettings = i
});

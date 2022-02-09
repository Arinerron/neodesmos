define('shared-components/shared-login-modal', ["require", "exports", "tslib", "dcgview", "shared-components/modal", "./shared-cookie-notice", "shared/dcgviews/localize", "./shared-account-modal-errors", "loadcss!./shared-account-modal", "loadcss!./shared-login-modal"], function(require, e, t, n, o, r, s, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.SharedLoginModal = void 0;
    var c = n.Components
      , i = c.If
      , l = c.Input
      , d = c.IfElse
      , u = function(e) {
        function c() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(c, e),
        c.prototype.init = function() {
            this.controller = this.props.controller(),
            this.i18n = this.controller,
            this.email = "",
            this.password = "",
            this.isSubmittingForm = !1,
            this.formErrors = [],
            this.controller.getModalStartingError() && this.formErrors.push(this.controller.getModalStartingError())
        }
        ,
        c.prototype.template = function() {
            var e = this;
            return n.createElement(o.Modal, {
                title: function() {
                    return e.i18n.s("shared-title-login")
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
                class: n.const("dcg-shared-login-dialog dcg-shared-account-dialog")
            }, d(function() {
                return e.canChooseRole()
            }, {
                true: function() {
                    return n.createElement("div", {
                        class: n.const("dcg-shared-switch-account-message")
                    }, n.createElement(s.Localize, {
                        key: e.const("shared-prompt-new-to-desmos-teacher-or-student"),
                        i18n: e.props.controller
                    }, n.const("New to Desmos? Sign up as a"), n.const(" "), n.createElement("a", {
                        role: n.const("link"),
                        tabindex: n.const("0"),
                        class: n.const("dcg-shared-dark-gray-link"),
                        onTap: function(t) {
                            return e.controller.dispatch({
                                type: "show-modal",
                                modal: "teacher-signup",
                                device: t.device
                            })
                        }
                    }, n.const("teacher")), n.const(" "), n.const("or"), n.const(" "), n.createElement("a", {
                        role: n.const("link"),
                        tabindex: n.const("0"),
                        class: n.const("dcg-shared-dark-gray-link"),
                        onTap: function(t) {
                            return e.controller.dispatch({
                                type: "show-modal",
                                modal: "signup",
                                device: t.device
                            })
                        }
                    }, n.const("student."))))
                },
                false: function() {
                    return n.createElement("div", {
                        class: n.const("dcg-shared-switch-account-message")
                    }, n.createElement(s.Localize, {
                        key: e.const("shared-prompt-new-to-desmos-sign-up-here"),
                        i18n: e.props.controller
                    }, n.const("New to Desmos?"), n.const(" "), n.createElement("a", {
                        role: n.const("link"),
                        tabindex: n.const("0"),
                        class: n.const("dcg-shared-dark-gray-link"),
                        onTap: function(t) {
                            return e.controller.dispatch({
                                type: "show-modal",
                                modal: "teacher" === e.controller.getLimitedSignupRole() ? "teacher-signup" : "signup",
                                device: t.device
                            })
                        }
                    }, n.const("Sign up")), n.const(".")))
                }
            }), n.createElement("div", {
                class: n.const("dcg-shared-account-content-container")
            }, n.createElement(i, {
                predicate: function() {
                    return window.googleAuthConnectionFailed
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-shared-google-auth-unavailable")
                }, function() {
                    return e.i18n.s("shared-message-google-login-not-available")
                })
            }), n.createElement(i, {
                predicate: function() {
                    return !window.googleAuthConnectionFailed
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-shared-btn-gray-outline dcg-shared-google-login"),
                    role: n.const("button"),
                    tabindex: n.const("0"),
                    onTap: function() {
                        return e.googleLogin()
                    }
                }, n.createElement("div", {
                    class: n.const("dcg-shared-google-icon dcg-shared-external-login-logo")
                }), n.createElement("span", null, function() {
                    return e.i18n.s("shared-button-login-with-google")
                }))
            }), n.createElement(i, {
                predicate: function() {
                    return e.controller.allowSignInWithApple()
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-shared-btn-gray-outline dcg-shared-apple-login"),
                    role: n.const("button"),
                    tabindex: n.const("0"),
                    onTap: function() {
                        return e.appleLogin()
                    }
                }, n.createElement("div", {
                    class: n.const("dcg-shared-apple-icon dcg-shared-external-login-logo")
                }), n.createElement("span", null, function() {
                    return e.i18n.s("shared-button-login-with-apple")
                }))
            })), n.createElement("div", {
                class: n.const("dcg-shared-bg-line")
            }, n.createElement("span", null, function() {
                return e.i18n.s("shared-message-or-login-with-desmos")
            })), n.createElement(a.SharedAccountModalErrors, {
                controller: this.props.controller,
                errors: function() {
                    return e.formErrors
                }
            }), n.createElement("form", {
                class: n.const("dcg-shared-action-submit"),
                onSubmit: this.bindFn(this.onSubmit)
            }, n.createElement("div", {
                class: n.const("dcg-shared-email-form-container")
            }, n.createElement("label", null, n.createElement("span", {
                class: n.const("dcg-shared-input-title")
            }, function() {
                return e.i18n.s("shared-label-email")
            }), n.createElement(l, {
                type: n.const("email"),
                name: n.const("email"),
                class: n.const("dcg-shared-input-blue-outline"),
                "aria-label": function() {
                    return e.i18n.s("shared-label-email")
                },
                "aria-required": n.const("true"),
                required: n.const("required"),
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
            })), n.createElement("div", {
                class: n.const("dcg-shared-password-container")
            }, n.createElement("label", {
                for: n.const("password")
            }, n.createElement("span", null, function() {
                return e.i18n.s("shared-label-password")
            }), n.createElement(l, {
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
            }), n.createElement("span", {
                class: n.const("dcg-shared-password-recovery-link")
            }, n.createElement("a", {
                role: n.const("link"),
                tabindex: n.const(0),
                class: n.const("dcg-shared-action-password"),
                onTap: function(t) {
                    return e.controller.dispatch({
                        type: "show-modal",
                        modal: "recover-password",
                        device: t.device
                    })
                }
            }, function() {
                return e.i18n.s("shared-prompt-forgot-your-password")
            })))), n.createElement("div", {
                class: n.const("dcg-shared-sign-in-options")
            }, n.createElement(i, {
                predicate: function() {
                    return e.isSubmittingForm
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-shared-progress-indicator dcg-shared-create-account-progress")
                }, n.createElement("div", {
                    class: n.const("dcg-shared-spinner")
                }))
            }), n.createElement(i, {
                predicate: function() {
                    return !e.isSubmittingForm
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-shared-submit-container")
                }, n.createElement("button", {
                    type: n.const("submit"),
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
                    }
                }, function() {
                    return e.i18n.s("shared-button-login-capitalized")
                }))
            })), n.createElement(r.default, {
                i18n: this.const(this.i18n)
            })))))
        }
        ,
        c.prototype.canChooseRole = function() {
            return !this.controller.getLimitedSignupRole()
        }
        ,
        c.prototype.didUnmount = function() {
            this.unmounted = !0
        }
        ,
        c.prototype.onSubmit = function(e) {
            e.preventDefault(),
            this.submitForm()
        }
        ,
        c.prototype.googleLogin = function() {
            this.controller.dispatch({
                type: "close-modal"
            }),
            this.controller.userController.googleLogin({
                fromUI: "login"
            })
        }
        ,
        c.prototype.appleLogin = function() {
            this.controller.dispatch({
                type: "close-modal"
            }),
            this.controller.userController.appleLogin({
                fromUI: "login"
            })
        }
        ,
        c.prototype.submitEnabled = function() {
            return !(!this.email || !this.password)
        }
        ,
        c.prototype.submitForm = function() {
            var e = this;
            this.submitEnabled() && (this.isSubmittingForm = !0,
            this.formErrors = [],
            this.controller.userController.checkPendingDeletion({
                email: this.email,
                lang: this.controller.getLanguage()
            }).done(function(t) {
                e._pendingDeletion = t.pendingDeletion
            }).fail(function() {
                e._pendingDeletion = !1
            }).always(function() {
                e.unmounted || (e.unmounted || e.update(),
                e.controller.userController.desmosLogin({
                    email: e.email,
                    password: e.password,
                    lang: e.controller.getLanguage()
                }).done(function() {
                    e.unmounted || (e._pendingDeletion ? e.controller.dispatch({
                        type: "show-modal",
                        modal: "account-reenabled",
                        device: "mouse"
                    }) : e.controller.dispatch({
                        type: "close-modal"
                    }))
                }).fail(function(t) {
                    e.formErrors = e.controller.parseJSONErrors(t)
                }).always(function() {
                    e.unmounted || (e.isSubmittingForm = !1,
                    e.controller.dispatch({
                        type: "render"
                    }))
                }))
            }))
        }
        ,
        c
    }(n.Class);
    e.SharedLoginModal = u
});
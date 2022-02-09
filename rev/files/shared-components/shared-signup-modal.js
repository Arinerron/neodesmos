define('shared-components/shared-signup-modal', ["require", "exports", "tslib", "dcgview", "shared-components/modal", "jquery", "underscore", "shared/dcgviews/localize", "./shared-cookie-notice", "./shared-checkbox", "./shared-account-modal-errors", "loadcss!./shared-account-modal", "loadcss!./shared-signup-modal"], function(require, e, t, n, r, o, i, s, a, c, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.SharedSignupModal = void 0;
    var d = n.Components
      , u = d.If
      , h = d.Input
      , p = d.Switch
      , m = function(e) {
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
            return n.createElement(u, {
                predicate: this.bindFn(this.canChangeRole)
            }, function() {
                return n.createElement("span", {
                    class: n.const("dcg-shared-dark-gray-link"),
                    role: n.const("link"),
                    tabindex: n.const("0"),
                    onTap: function(t) {
                        return e.controller.dispatch({
                            type: "show-modal",
                            modal: e.props.teacher() ? "signup" : "teacher-signup",
                            device: t.device
                        })
                    }
                }, function() {
                    return e.props.teacher() ? e.i18n.s("shared-button-i-am-not-a-teacher") : e.i18n.s("shared-button-sign-up-as-a-teacher")
                })
            })
        }
        ,
        r.prototype.canChangeRole = function() {
            return !this.controller.getLimitedSignupRole()
        }
        ,
        r
    }(n.Class)
      , g = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.template = function() {
            return n.createElement("span", {
                class: n.const("dcg-shared-terms-notice")
            }, n.createElement(s.Localize, {
                key: this.const("shared-message-privacy-notice"),
                i18n: this.props.i18n
            }, n.const("I have read, understand, and accept the"), n.const(" "), n.createElement("a", {
                href: n.const("/terms"),
                target: n.const("_blank"),
                class: n.const("dcg-shared-blue-link")
            }, n.const("Terms of Service")), n.const(" "), n.const("and"), n.const(" "), n.createElement("a", {
                href: n.const("/privacy"),
                target: n.const("_blank"),
                class: n.const("dcg-shared-blue-link")
            }, n.const("Privacy Policy")), n.const(".")))
        }
        ,
        r
    }(n.Class)
      , f = function(e) {
        function s() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(s, e),
        s.prototype.init = function() {
            this.controller = this.props.controller(),
            this.i18n = this.controller,
            this.selectedView = 0,
            this.givenName = "",
            this.familyName = "",
            this.email = "",
            this.password = "",
            this.consentChecked = !1,
            this.isSubmittingForm = !1,
            this.formErrors = [],
            this.breakPoint = 660,
            this.measureWindow(),
            this.controller.getModalStartingError() && this.formErrors.push(this.controller.getModalStartingError())
        }
        ,
        s.prototype.template = function() {
            var e = this;
            return n.createElement(r.Modal, {
                title: this.bindFn(this.getModalTitle),
                size: this.const("narrow"),
                showX: this.const(!0),
                onClose: function() {
                    return e.controller.dispatch({
                        type: "close-modal"
                    })
                },
                i18n: this.props.controller
            }, n.createElement("div", {
                class: function() {
                    return {
                        "dcg-shared-signup-dialog": !0,
                        "dcg-shared-account-dialog": !0,
                        "dcg-shared-teacher-signup-dialog": e.props.teacher()
                    }
                }
            }, n.createElement("div", {
                class: n.const("dcg-shared-switch-account-message")
            }, function() {
                return e.i18n.s("shared-prompt-already-have-account")
            }, this.const(this.i18n.raw(" ")), n.createElement("a", {
                role: n.const("link"),
                tabindex: n.const("0"),
                class: n.const("dcg-shared-dark-gray-link"),
                onTap: function(t) {
                    return e.controller.dispatch({
                        type: "show-modal",
                        modal: "login",
                        device: t.device
                    })
                }
            }, function() {
                return e.i18n.s("shared-button-login")
            }), n.const(".")), n.createElement("div", {
                class: n.const("dcg-shared-navigation-tabs"),
                role: n.const("tablist")
            }, n.createElement("div", {
                role: n.const("tab"),
                tabindex: n.const("0"),
                "aria-selected": this.bindFn(this.isGoogleSelected),
                class: function() {
                    return {
                        "dcg-shared-tab-gray-underline": !0,
                        "dcg-shared-tab-always-underline": !0,
                        "dcg-shared-profile-view-button": !0,
                        "dcg-selected": e.isGoogleSelected()
                    }
                },
                onTap: function() {
                    return e.updateView(0)
                }
            }, this.bindFn(this.externalTitle)), n.createElement("div", {
                role: n.const("tab"),
                tabindex: n.const("0"),
                "aria-selected": this.bindFn(this.isDesmosSelected),
                class: function() {
                    return {
                        "dcg-shared-tab-gray-underline": !0,
                        "dcg-shared-tab-always-underline": !0,
                        "dcg-shared-password-view-button": !0,
                        "dcg-selected": e.isDesmosSelected()
                    }
                },
                onTap: function() {
                    return e.updateView(1)
                }
            }, this.bindFn(this.desmosTitle))), n.createElement("div", {
                class: n.const("dcg-shared-account-content-container")
            }, n.createElement(p, {
                key: function() {
                    return e.selectedView
                }
            }, function(t) {
                return 0 === t ? n.createElement("div", {
                    class: n.const("dcg-shared-notice-checkbox-google")
                }, n.createElement(c.SharedCheckbox, {
                    ariaLabel: e.bindFn(e.consentText),
                    checked: function() {
                        return e.consentChecked
                    },
                    disabled: e.const(!1),
                    onChange: function() {
                        if (e.consentChecked = !e.consentChecked,
                        !e.unmounted)
                            return e.update()
                    }
                }, e.bindFn(e.consentText)), n.createElement(c.SharedCheckbox, {
                    ariaLabel: function() {
                        return e.i18n.s("shared-narration-privacy-policy-agreement")
                    },
                    checked: function() {
                        return e.privacyChecked
                    },
                    disabled: e.const(!1),
                    onChange: function() {
                        if (e.privacyChecked = !e.privacyChecked,
                        !e.unmounted)
                            return e.update()
                    }
                }, n.createElement(g, {
                    i18n: e.const(e.i18n)
                })), n.createElement(u, {
                    predicate: function() {
                        return window.googleAuthConnectionFailed
                    }
                }, function() {
                    return n.createElement("div", {
                        class: n.const("dcg-shared-google-auth-unavailable")
                    }, function() {
                        return e.i18n.s("shared-message-google-login-not-available")
                    })
                }), n.createElement(u, {
                    predicate: function() {
                        return !window.googleAuthConnectionFailed
                    }
                }, function() {
                    return n.createElement("div", {
                        class: function() {
                            return {
                                "dcg-shared-btn-gray-outline": !0,
                                "dcg-shared-google-login": !0,
                                "dcg-disabled": e.hasNotConsented()
                            }
                        },
                        role: n.const("button"),
                        tabindex: function() {
                            return e.hasNotConsented() ? "-1" : "0"
                        },
                        "aria-disabled": e.bindFn(e.hasNotConsented),
                        onTap: function() {
                            return e.googleLogin()
                        }
                    }, n.createElement("div", {
                        class: n.const("dcg-shared-google-icon dcg-shared-external-login-logo")
                    }), n.createElement("span", null, e.bindFn(e.getGoogleLoginText)))
                }), n.createElement(u, {
                    predicate: function() {
                        return e.controller.allowSignInWithApple()
                    }
                }, function() {
                    return n.createElement("div", {
                        class: function() {
                            return {
                                "dcg-shared-btn-gray-outline": !0,
                                "dcg-shared-apple-login": !0,
                                "dcg-disabled": e.hasNotConsented()
                            }
                        },
                        role: n.const("button"),
                        tabindex: function() {
                            return e.hasNotConsented() ? "-1" : "0"
                        },
                        "aria-disabled": e.bindFn(e.hasNotConsented),
                        onTap: function() {
                            return e.appleLogin()
                        }
                    }, n.createElement("div", {
                        class: n.const("dcg-shared-apple-icon dcg-shared-external-login-logo")
                    }), n.createElement("span", null, e.bindFn(e.getAppleLoginText)))
                }), n.createElement("div", {
                    class: n.const("dcg-shared-switch-account-type")
                }, n.createElement(m, {
                    controller: e.props.controller,
                    teacher: e.props.teacher
                }))) : 1 === t ? n.createElement("div", null, n.createElement(l.SharedAccountModalErrors, {
                    controller: e.props.controller,
                    errors: function() {
                        return e.formErrors
                    }
                }), n.createElement("form", {
                    class: n.const("dcg-shared-action-submit"),
                    onSubmit: e.bindFn(e.onSubmit),
                    didMount: e.bindFn(e.didMountForm)
                }, n.createElement("div", {
                    class: n.const("dcg-shared-email-form-container")
                }, n.createElement("label", null, n.createElement("span", {
                    class: n.const("dcg-shared-input-title")
                }, function() {
                    return e.i18n.s("shared-label-email")
                }), n.createElement(h, {
                    type: n.const("email"),
                    name: n.const("email"),
                    class: n.const("dcg-shared-input-blue-outline"),
                    required: n.const("required"),
                    "aria-describedby": n.const("email-description"),
                    didMount: function(t) {
                        e.controller.wasModalOpenedWithKeyboard() && t.focus()
                    },
                    value: function() {
                        return e.email
                    },
                    onInput: function(t) {
                        if (e.email = t,
                        !e.unmounted)
                            return e.update()
                    }
                })), n.createElement("div", {
                    class: n.const("dcg-shared-name-container")
                }, n.createElement("div", {
                    class: n.const("dcg-shared-name-input")
                }, n.createElement("label", null, n.createElement("span", {
                    class: n.const("dcg-shared-input-title")
                }, function() {
                    return e.i18n.s("shared-label-given-name-or-nickname")
                }), n.createElement(h, {
                    type: n.const("text"),
                    name: n.const("given-name"),
                    class: n.const("dcg-shared-input-blue-outline"),
                    required: n.const("required"),
                    "aria-describedby": n.const("given-name-description"),
                    didMount: function(t) {
                        if (e.controller.wasModalOpenedWithKeyboard())
                            return t.focus()
                    },
                    value: function() {
                        return e.givenName
                    },
                    onInput: function(t) {
                        if (e.givenName = t,
                        !e.unmounted)
                            return e.update()
                    }
                }))), n.createElement("div", {
                    class: n.const("dcg-shared-name-input")
                }, n.createElement("label", null, n.createElement("span", {
                    class: n.const("dcg-shared-input-title")
                }, function() {
                    return e.i18n.s("shared-label-family-name")
                }), n.createElement(h, {
                    type: n.const("text"),
                    name: n.const("family-name"),
                    class: n.const("dcg-shared-input-blue-outline"),
                    "aria-describedby": n.const("family-name-description"),
                    value: function() {
                        return e.familyName
                    },
                    onInput: function(t) {
                        if (e.familyName = t,
                        !e.unmounted)
                            return e.update()
                    }
                })))), n.createElement("label", null, n.createElement("span", null, function() {
                    return e.i18n.s("shared-label-password")
                }), n.createElement(h, {
                    type: n.const("password"),
                    class: n.const("dcg-shared-input-blue-outline"),
                    name: n.const("password"),
                    required: n.const("required"),
                    value: function() {
                        return e.password
                    },
                    onInput: function(t) {
                        if (e.password = t,
                        !e.unmounted)
                            return e.update()
                    }
                })), n.createElement("div", {
                    class: n.const("dcg-shared-notice-checkbox-email")
                }, n.createElement(c.SharedCheckbox, {
                    ariaLabel: e.bindFn(e.consentText),
                    checked: function() {
                        return e.consentChecked
                    },
                    disabled: e.const(!1),
                    onChange: function() {
                        if (e.consentChecked = !e.consentChecked,
                        !e.unmounted)
                            return e.update()
                    }
                }, e.bindFn(e.consentText))), n.createElement(c.SharedCheckbox, {
                    ariaLabel: function() {
                        return e.i18n.s("shared-narration-privacy-policy-agreement")
                    },
                    checked: function() {
                        return e.privacyChecked
                    },
                    disabled: e.const(!1),
                    onChange: function() {
                        if (e.privacyChecked = !e.privacyChecked,
                        !e.unmounted)
                            return e.update()
                    }
                }, n.createElement(g, {
                    i18n: e.const(e.i18n)
                })), n.createElement("div", {
                    class: n.const("dcg-shared-sign-in-options")
                }, n.createElement(u, {
                    predicate: function() {
                        return e.isSubmittingForm
                    }
                }, function() {
                    return n.createElement("div", {
                        class: n.const("dcg-shared-progress-indicator dcg-shared-create-account-progress")
                    }, n.createElement("div", {
                        class: n.const("dcg-shared-spinner")
                    }))
                }), n.createElement(u, {
                    predicate: function() {
                        return !e.isSubmittingForm
                    }
                }, function() {
                    return n.createElement("div", {
                        class: n.const("dcg-shared-submit-container")
                    }, n.createElement(m, {
                        controller: e.props.controller,
                        teacher: e.props.teacher
                    }), n.createElement("button", {
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
                        return e.i18n.s("shared-button-create-account")
                    }))
                }))))) : n.createElement("span", null)
            }), n.createElement(a.default, {
                i18n: this.const(this.i18n)
            }))))
        }
        ,
        s.prototype.canSwitchRoles = function() {
            return !this.controller.getLimitedSignupRole()
        }
        ,
        s.prototype.getModalTitle = function() {
            return this.props.teacher() ? this.i18n.s("shared-title-teacher-signup") : this.i18n.s("shared-title-signup")
        }
        ,
        s.prototype.didMountForm = function(e) {
            this.$form = o(e)
        }
        ,
        s.prototype.submitEnabled = function() {
            if (!this.consentChecked || !this.privacyChecked)
                return !1;
            if (!this.$form)
                return !1;
            var e = this.$form.find('[name="password"]').val()
              , t = this.$form.find('[name="email"]').val()
              , n = this.$form.find('[name="given-name"]').val();
            return !!(e && t && n)
        }
        ,
        s.prototype.onSubmit = function(e) {
            e.preventDefault(),
            this.submitEnabled() && this.submitForm()
        }
        ,
        s.prototype.googleLogin = function() {
            this.controller.dispatch({
                type: "close-modal"
            }),
            this.controller.userController.googleLogin({
                fromUI: "create",
                teacher: this.props.teacher()
            })
        }
        ,
        s.prototype.appleLogin = function() {
            this.controller.dispatch({
                type: "close-modal"
            }),
            this.controller.userController.appleLogin({
                fromUI: "create",
                teacher: this.props.teacher()
            })
        }
        ,
        s.prototype.getGoogleLoginText = function() {
            return this.consentChecked && this.privacyChecked ? this.i18n.s("shared-prompt-sign-up-with-google") : this.i18n.s("shared-prompt-please-consent-to-sign-up-with-google")
        }
        ,
        s.prototype.getAppleLoginText = function() {
            return this.consentChecked && this.privacyChecked ? this.i18n.s("shared-prompt-sign-up-with-apple") : this.i18n.s("shared-prompt-please-consent-to-sign-up-with-apple")
        }
        ,
        s.prototype.submitForm = function() {
            var e = this;
            this.formErrors = [],
            this.isSubmittingForm = !0,
            this.unmounted || this.update(),
            this.controller.userController.createAccount({
                userProvidedName: {
                    given: this.givenName,
                    family: this.familyName.length ? this.familyName : void 0
                },
                email: this.email,
                password: this.password,
                teacher: this.props.teacher(),
                lang: this.controller.getLanguage()
            }).done(function() {
                if (!e.unmounted)
                    return e.controller.dispatch({
                        type: "close-modal"
                    })
            }).fail(function(t) {
                e.formErrors = e.controller.parseJSONErrors(t)
            }).always(function() {
                e.isSubmittingForm = !1,
                e.unmounted || e.update()
            })
        }
        ,
        s.prototype.updateView = function(e) {
            this.selectedView = e,
            this.unmounted || this.update()
        }
        ,
        s.prototype.externalTitle = function() {
            return this.controller.allowSignInWithApple() ? this.windowWidth > this.breakPoint ? this.i18n.s("shared-button-external-account-wide") : this.i18n.s("shared-button-external-account-narrow") : this.windowWidth > this.breakPoint ? this.i18n.s("shared-button-google-account-wide") : this.i18n.s("shared-button-google-account-narrow")
        }
        ,
        s.prototype.desmosTitle = function() {
            return this.windowWidth > this.breakPoint ? this.i18n.s("shared-button-email-address-wide") : this.i18n.s("shared-button-email-address-narrow")
        }
        ,
        s.prototype.measureWindow = function() {
            return this.windowWidth = o(window).width()
        }
        ,
        s.prototype.didMount = function() {
            var e = this;
            o(window).on("resize.create-account", i.throttle(function() {
                e.measureWindow(),
                e.update()
            }, 200))
        }
        ,
        s.prototype.didUnmount = function() {
            o(window).off("resize.create-account"),
            this.unmounted = !0
        }
        ,
        s.prototype.consentText = function() {
            return this.i18n.s("shared-message-consent-text")
        }
        ,
        s.prototype.isGoogleSelected = function() {
            return 0 === this.selectedView
        }
        ,
        s.prototype.isDesmosSelected = function() {
            return 1 === this.selectedView
        }
        ,
        s.prototype.hasNotConsented = function() {
            return !this.consentChecked || !this.privacyChecked
        }
        ,
        s
    }(n.Class);
    e.SharedSignupModal = f
});

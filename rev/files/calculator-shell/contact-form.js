define('calculator-shell/contact-form', ["require", "exports", "main/calculator_backend", "tslib", "dcgview", "jquery", "lib/parse-json-errors"], function(require, e, t, n, o, r, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.ContactForm = void 0;
    var c = o.Components
      , a = c.If
      , l = c.For
      , i = c.Input
      , u = c.Textarea
      , d = function(e) {
        function c() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(c, e),
        c.prototype.init = function() {
            this.controller = this.props.controller(),
            this.userController = this.controller.userController,
            this.formErrors = [],
            this.feedbackInProgress = !1,
            this.feedbackFromName = this.userController.getEmail(),
            this.didSendFeedbackEmail = !1
        }
        ,
        c.prototype.template = function() {
            var e = this;
            return o.createElement("div", {
                class: o.const("dcg-suggestions")
            }, o.createElement("div", {
                class: o.const("template-errors")
            }, o.createElement(a, {
                predicate: function() {
                    return !!e.formErrors.length
                }
            }, function() {
                return o.createElement(l, {
                    each: function() {
                        return e.formErrors
                    }
                }, o.createElement("span", null, function(e) {
                    return o.createElement("div", {
                        class: o.const("errors")
                    }, o.createElement("span", null, function() {
                        return e
                    }))
                }))
            })), o.createElement("form", {
                didMount: this.didMountContactForm.bind(this),
                class: o.const("dcg-action-submit")
            }, o.createElement("div", {
                class: o.const("dcg-feedback-message-label")
            }, function() {
                return e.controller.s("account-shell-label-feedback-message")
            }), o.createElement(u, {
                placeholder: function() {
                    return e.controller.s("account-shell-label-feedback-placeholder")
                },
                didMount: this.didMountTextArea.bind(this),
                disabled: function() {
                    return !e.shouldAllowSubmission()
                },
                class: o.const("dcg-shared-input-blue-outline"),
                name: o.const("message"),
                value: function() {
                    return e.controller.getFeedbackMessage()
                },
                onInput: function(t) {
                    if (e.controller.setFeedbackMessage(t),
                    !e.unmounted)
                        return e.update()
                }
            }), o.createElement("div", {
                class: o.const("dcg-suggestions-expansion")
            }, o.createElement("div", {
                class: o.const("dcg-feedback-email-label")
            }, function() {
                return e.controller.s("account-shell-label-feedback-email")
            }), o.createElement(i, {
                name: o.const("anonymous-email"),
                class: o.const("dcg-anonymous-email dcg-shared-input-blue-outline"),
                placeholder: function() {
                    return e.controller.s("account-shell-label-email-placeholder")
                },
                disabled: function() {
                    return !e.shouldAllowSubmission()
                },
                type: o.const("email"),
                value: function() {
                    return e.feedbackFromName
                },
                onInput: function(t) {
                    if (e.feedbackFromName = t,
                    !e.unmounted)
                        return e.update()
                }
            }), o.createElement("div", {
                class: o.const("dcg-feedback-action-container")
            }, o.createElement(a, {
                predicate: function() {
                    return e.feedbackInProgress
                }
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-template-processing")
                }, o.createElement("span", {
                    class: o.const("dcg-spinner")
                }), function() {
                    return e.controller.s("account-shell-label-feedback-sending")
                })
            }), o.createElement(a, {
                predicate: function() {
                    return e.didSendFeedbackEmail
                }
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-template-sent")
                }, o.createElement("i", {
                    class: o.const("dcg-icon-check")
                }), function() {
                    return e.controller.s("account-shell-text-feedback-sent")
                })
            }), o.createElement(a, {
                predicate: this.bindFn(this.shouldAllowSubmission)
            }, function() {
                return o.createElement("span", {
                    class: o.const("dcg-feedback-btns")
                }, o.createElement("a", {
                    role: o.const("link"),
                    tabindex: o.const(0),
                    class: o.const("dcg-action-closesuggestion"),
                    onTap: e.bindFn(e.onCancel)
                }, function() {
                    return e.controller.s("account-shell-button-cancel")
                }), o.createElement("button", {
                    class: o.const("dcg-shared-btn-blue"),
                    name: o.const("submit"),
                    type: o.const("submit")
                }, function() {
                    return e.controller.s("account-shell-button-contact-us")
                }))
            })))))
        }
        ,
        c.prototype.didMountContactForm = function(e) {
            var t = this;
            return r(e).on("submit", function(e) {
                return e.preventDefault(),
                t.submitForm()
            })
        }
        ,
        c.prototype.didMountTextArea = function(e) {
            this.unmounted || e.focus()
        }
        ,
        c.prototype.didUnmount = function() {
            this.unmounted = !0
        }
        ,
        c.prototype.shouldAllowSubmission = function() {
            return !this.feedbackInProgress && !this.didSendFeedbackEmail
        }
        ,
        c.prototype.onCancel = function() {
            this.controller.setFeedbackMessage(""),
            this.controller.dispatch({
                type: "show-contact-form",
                showForm: !1
            })
        }
        ,
        c.prototype.submitForm = function() {
            var e = this;
            this.didSendFeedbackEmail = !1,
            this.feedbackInProgress = !0,
            this.formErrors = [];
            var n = r.trim(r('textarea[name="message"]').val());
            if (n.length || (this.formErrors = [this.controller.s("account-shell-error-feedback-empty")]),
            this.formErrors.length)
                return this.feedbackInProgress = !1,
                void (this.unmounted || this.update());
            var o = {
                message: n,
                state: JSON.stringify(this.controller.api.getState()),
                userAgent: navigator.userAgent,
                "anonymous-email": r('input[name="anonymous-email"]').val()
            };
            t.emailFeedback(o).done(function() {
                e.didSendFeedbackEmail = !0,
                e.controller.setFeedbackMessage(""),
                e.feedbackFromName = e.userController.getEmail(),
                setTimeout(function() {
                    e.didSendFeedbackEmail = !1,
                    e.unmounted || e.update()
                }, 2e3)
            }).fail(function(t) {
                e.formErrors = s.parseJSONErrors(t).map(function(t) {
                    return e.controller.raw(t)
                })
            }).always(function() {
                e.feedbackInProgress = !1,
                e.unmounted || e.update()
            }),
            this.unmounted || this.update()
        }
        ,
        c
    }(o.Class);
    e.ContactForm = d
});
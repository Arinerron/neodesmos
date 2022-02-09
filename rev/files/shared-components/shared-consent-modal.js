define('shared-components/shared-consent-modal', ["require", "exports", "tslib", "dcgview", "shared-components/modal", "./shared-account-modal-errors", "loadcss!./shared-consent-modal", "loadcss!./shared-account-modal", "loadcss!shared-components/btn-styles"], function(require, t, n, o, e, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.SharedConsentModal = void 0;
    var s = function(t) {
        function s() {
            return null !== t && t.apply(this, arguments) || this
        }
        return n.__extends(s, t),
        s.prototype.init = function() {
            this.controller = this.props.controller(),
            this.i18n = this.controller,
            this.openTime = Date.now(),
            this.formErrors = [],
            this.controller.logJSON("shared-consent-modal", {
                action: "show-consent-modal"
            })
        }
        ,
        s.prototype.template = function() {
            var t = this;
            return o.createElement(e.Modal, {
                title: function() {
                    return t.i18n.s("shared-title-consent")
                },
                size: this.const("narrow"),
                onClose: function() {
                    return t.controller.dispatch({
                        type: "close-modal"
                    })
                },
                i18n: this.props.controller
            }, o.createElement("div", {
                class: o.const("dcg-shared-consent-modal-container dcg-shared-account-dialog")
            }, o.createElement("div", {
                class: o.const("dcg-shared-consent-contents")
            }, function() {
                return t.i18n.s("shared-message-consent-information")
            }), o.createElement("div", {
                class: o.const("dcg-shared-consent-contents")
            }, function() {
                return t.i18n.s("shared-message-consent-delete-information")
            }), o.createElement("div", {
                class: o.const("dcg-shared-modal-actions-container")
            }, o.createElement("span", {
                role: o.const("button"),
                tabindex: o.const("0"),
                class: o.const("dcg-shared-dark-gray-link"),
                didMount: function(n) {
                    t.controller.wasModalOpenedWithKeyboard() && n.focus()
                },
                onTap: function(n) {
                    return t.openAccountSettings(n.device)
                }
            }, function() {
                return t.i18n.s("shared-button-go-to-account-settings")
            }), o.createElement("div", {
                role: o.const("button"),
                tabindex: function() {
                    return t.isConsentingToCollection() ? -1 : 0
                },
                "aria-disabled": function() {
                    return t.isConsentingToCollection()
                },
                class: function() {
                    return {
                        "dcg-shared-btn-blue": !0,
                        "dcg-disabled": t.isConsentingToCollection()
                    }
                },
                onTap: this.bindFn(this.consentToCollection)
            }, function() {
                return t.i18n.s("shared-button-accept")
            }), o.createElement(r.SharedAccountModalErrors, {
                controller: this.props.controller,
                errors: function() {
                    return t.formErrors
                }
            }))))
        }
        ,
        s.prototype.willUpdate = function() {
            this.formErrors = [],
            this.controller.userController.didPrivacyConsentFail() && (this.formErrors = [this.controller.getSomethingWentWrongText()])
        }
        ,
        s.prototype.isConsentingToCollection = function() {
            return this.controller.userController.isConsentingToPrivacy()
        }
        ,
        s.prototype.didPrivacyConsentFail = function() {
            return this.controller.userController.didPrivacyConsentFail()
        }
        ,
        s.prototype.openAccountSettings = function(t) {
            this.controller.logJSON("shared-consent-modal", {
                action: "edit-account",
                ts: Date.now() - this.openTime
            }),
            this.controller.dispatch({
                type: "show-modal",
                modal: "account-settings",
                device: t
            })
        }
        ,
        s.prototype.consentToCollection = function() {
            this.controller.logJSON("shared-consent-modal", {
                action: "consent",
                ts: Date.now() - this.openTime
            }),
            this.controller.userController.setPrivacyConsent({
                lang: this.controller.getLanguage()
            }),
            this.controller.dispatch({
                type: "close-modal"
            })
        }
        ,
        s
    }(o.Class);
    t.SharedConsentModal = s
});

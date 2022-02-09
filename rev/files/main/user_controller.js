define('main/user_controller', ["require", "exports", "tslib", "jquery", "lib/urlparser", "./account_backend", "lib/underscore-shim"], function(require, t, e, i, n, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.computeFirstName = t.UserController = void 0;
    var s = function(t) {
        function o() {
            var e = t.call(this) || this;
            return e.loggedIn = !1,
            e.logoutFailed = !1,
            e.loggingOut = !1,
            e.consentingToPrivacy = !1,
            e.privacyConsentFailed = !1,
            e.userId = "",
            e.name = "",
            e.email = "",
            e.teacher = !1,
            e.featureFlags = [],
            e.verificationStatus = "",
            e.subscriptions = [],
            e.privacyConsent = null,
            i.ajaxSetup({
                statusCode: {
                    401: function() {
                        return e.logout()
                    }
                }
            }),
            e
        }
        return e.__extends(o, t),
        o.prototype.desmosLogin = function(t) {
            return r.fetchUser(t).done(this.completeLogin.bind(this))
        }
        ,
        o.prototype.googleLogin = function(t) {
            this.triggerEvent("googleLogin", t)
        }
        ,
        o.prototype.appleLogin = function(t) {
            this.triggerEvent("appleLogin", t)
        }
        ,
        o.prototype.askServerIfLoggedIn = function() {
            return r.askServerIfLoggedIn().then(this.completeLogin.bind(this), this.logout.bind(this))
        }
        ,
        o.prototype.driveCallback = function() {
            return this.askServerIfLoggedIn()
        }
        ,
        o.prototype.createAccount = function(t) {
            var i = e.__assign(e.__assign({}, t), {
                name: t.userProvidedName.given
            });
            return !1 === i.teacher && delete i.teacher,
            r.registerUser(i).done(this.completeLogin.bind(this))
        }
        ,
        o.prototype.checkPendingDeletion = function(t) {
            return r.checkPendingDeletion(t)
        }
        ,
        o.prototype.isTeacher = function() {
            return !!this.teacher
        }
        ,
        o.prototype.setNameLegacy = function(t) {
            var e = this;
            return r.setName(t).done(function(t) {
                e.name = t.name || "",
                e.triggerEvent("userUpdated", void 0),
                e.triggerEvent("triggerRender", void 0)
            })
        }
        ,
        o.prototype.setNameDetail = function(t) {
            var e = this;
            return r.setNameDetail(t).done(function(t) {
                e.name = t.name || "",
                e.nameDetail = t.nameDetail,
                e.triggerEvent("userUpdated", void 0),
                e.triggerEvent("triggerRender", void 0)
            })
        }
        ,
        o.prototype.recoverPassword = function(t) {
            return r.recoverPassword(t)
        }
        ,
        o.prototype.completeLogin = function(t) {
            this.loggedIn = !0,
            this.userId = t.userId || "",
            this.name = t.name || "",
            this.nameDetail = t.nameDetail,
            this.email = t.email || "",
            this.featureFlags = t.featureFlags || [],
            this.subscriptions = t.subscriptions || [],
            this.verificationStatus = t.verificationStatus || "",
            this.privacyConsent = t.privacyConsent,
            this.teacher = !!t.isTeacher,
            this.triggerEvent("loginChanged", void 0),
            this.triggerEvent("userUpdated", void 0),
            this.triggerEvent("triggerRender", void 0)
        }
        ,
        o.prototype.logout = function() {
            var t = this;
            return this.loggingOut = !0,
            this.triggerEvent("logout", void 0),
            this.triggerEvent("triggerRender", void 0),
            r.logout().done(this.completeLogout.bind(this)).fail(this._onLogoutFailure.bind(this)).always(function() {
                t.loggingOut = !1,
                t.triggerEvent("triggerRender", void 0)
            })
        }
        ,
        o.prototype.completeLogout = function() {
            this.loggedIn = !1,
            this.logoutFailed = !1,
            this.userId = "",
            this.email = "",
            this.name = "",
            this.subscriptions = [],
            this.featureFlags = [],
            this.verificationStatus = "",
            this.privacyConsent = null,
            this.teacher = !1,
            this.triggerEvent("loginChanged", void 0),
            this.triggerEvent("userUpdated", void 0),
            this.triggerEvent("triggerRender", void 0)
        }
        ,
        o.prototype._onLogoutFailure = function() {
            var t = this;
            this.logoutFailed = !0,
            this.triggerEvent("triggerRender", void 0),
            setTimeout(function() {
                t.logoutFailed = !1,
                t.triggerEvent("triggerRender", void 0)
            }, 2e3)
        }
        ,
        o.prototype.initiateAccountDeletion = function(t) {
            return r.initiateAccountDeletion(t)
        }
        ,
        o.prototype.getEmailChangeToken = function() {
            return n.getParameter(location.search, "changeToken")
        }
        ,
        o.prototype.initiateEmailChange = function(t) {
            return r.initiateEmailChange(t)
        }
        ,
        o.prototype.setEmail = function(t) {
            var e = this;
            return r.setEmail(t).done(function() {
                e.email = t.newEmail || "",
                e.verificationStatus = "VERIFYING",
                e.triggerEvent("userUpdated", void 0),
                e.triggerEvent("triggerRender", void 0)
            })
        }
        ,
        o.prototype.setPrivacyConsent = function(t) {
            var e = this;
            return this.consentingToPrivacy = !0,
            this.triggerEvent("triggerRender", void 0),
            r.setPrivacyConsent(t).done(this.completePrivacyConsent.bind(this)).fail(this.onPrivacyConsentFailure.bind(this)).always(function() {
                e.consentingToPrivacy = !1,
                e.triggerEvent("triggerRender", void 0)
            })
        }
        ,
        o.prototype.completePrivacyConsent = function(t) {
            this.privacyConsent = t.privacyConsent,
            this.triggerEvent("userUpdated", void 0),
            this.triggerEvent("triggerRender", void 0)
        }
        ,
        o.prototype.onPrivacyConsentFailure = function() {
            var t = this;
            this.privacyConsentFailed = !0,
            this.triggerEvent("triggerRender", void 0),
            setTimeout(function() {
                t.privacyConsentFailed = !1,
                t.triggerEvent("triggerRender", void 0)
            }, 2e3)
        }
        ,
        o.prototype.updateFeatureFlags = function(t) {
            var e = this;
            return r.updateFeatureFlags(t).then(function(t) {
                e.featureFlags = t.featureFlags,
                e.triggerEvent("userUpdated", void 0)
            })
        }
        ,
        o.prototype.getFeatureFlags = function() {
            return this.featureFlags
        }
        ,
        o.prototype.hasFeatureFlag = function(t) {
            return this.featureFlags.some(function(e) {
                return e === t
            })
        }
        ,
        o.prototype.didPrivacyConsentFail = function() {
            return !!this.privacyConsentFailed
        }
        ,
        o.prototype.isConsentingToPrivacy = function() {
            return !!this.consentingToPrivacy
        }
        ,
        o.prototype.isLoggedIn = function() {
            return !!this.loggedIn
        }
        ,
        o.prototype.isLoggingOut = function() {
            return !!this.loggingOut
        }
        ,
        o.prototype.didLogoutFail = function() {
            return !!this.logoutFailed
        }
        ,
        o.prototype.getEmail = function() {
            return this.email
        }
        ,
        o.prototype.getFirstName = function() {
            return a(this.name)
        }
        ,
        o.prototype.getFullName = function() {
            return this.name
        }
        ,
        o.prototype.getNameDetail = function() {
            return this.nameDetail || {
                given: this.name,
                source: "legacy"
            }
        }
        ,
        o.prototype.getUserId = function() {
            return this.userId
        }
        ,
        o.prototype.getSubscriptions = function() {
            return this.subscriptions
        }
        ,
        o.prototype.getVerificationStatus = function() {
            return this.verificationStatus
        }
        ,
        o.prototype.hasConsentedToCollection = function() {
            return !!this.privacyConsent
        }
        ,
        o.prototype.getUserAsJSON = function() {
            return this.isLoggedIn() ? {
                email: this.email,
                name: this.name,
                verificationStatus: this.verificationStatus,
                subscriptions: this.subscriptions,
                privacyConsent: this.privacyConsent
            } : void 0
        }
        ,
        o
    }(o.UnderscoreModelShim);
    function a(t) {
        if (!t)
            return "";
        if (t.match(/[\d@_&\.\']/))
            return t;
        var e = t.split(" ");
        return e[0].length >= 3 ? e[0] : t
    }
    t.UserController = s,
    t.computeFirstName = a
});
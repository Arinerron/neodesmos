define('main/account_backend', ["require", "exports", "jquery", "./backend"], function(require, n, t, e) {
    "use strict";
    function r() {
        return e.post("/account/logout_xhr")
    }
    function o(n) {
        return e.getJSON("/account/user_info", n)
    }
    Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    n.submitArtContestEntry = n.setPrivacyConsent = n.updateFeatureFlags = n.setEmail = n.initiateEmailChange = n.initiateAccountDeletion = n.recoverPassword = n.setNameDetail = n.setName = n.registerUser = n.checkPendingDeletion = n.askServerIfLoggedIn = n.getUserInfo = n.fetchUser = n.logout = void 0,
    n.logout = r,
    n.fetchUser = function(n) {
        var t = function() {
            return e.post("/account/login_xhr", n)
        };
        return r().then(t, t).then(function() {
            return o({
                lang: n.lang
            })
        })
    }
    ,
    n.getUserInfo = o,
    n.askServerIfLoggedIn = function() {
        var n = t.Deferred();
        return e.getJSON("/account/user_info?no401").then(function(t) {
            t && !1 === t.loggedIn ? n.reject(t) : n.resolve(t)
        }, function(t) {
            n.reject(t)
        }),
        n.promise()
    }
    ,
    n.checkPendingDeletion = function(n) {
        return e.post("/account/check_account_status", n)
    }
    ,
    n.registerUser = function(n) {
        return e.post("/account/register_xhr", n).then(function() {
            return o({
                lang: n.lang
            })
        })
    }
    ,
    n.setName = function(n) {
        return e.post("/account/change_name", n).then(function() {
            return o({
                lang: n.lang
            })
        })
    }
    ,
    n.setNameDetail = function(n) {
        return e.post("/account/change_name_detail", {
            lang: n.lang,
            userProvidedName: {
                given: n.given,
                family: n.family
            }
        }).then(function() {
            return o({
                lang: n.lang
            })
        })
    }
    ,
    n.recoverPassword = function(n) {
        return e.post("/account/recover_xhr", n)
    }
    ,
    n.initiateAccountDeletion = function(n) {
        return e.getJSON("/account/initiate_delete_account", n)
    }
    ,
    n.initiateEmailChange = function(n) {
        return e.getJSON("/account/initiate_email_change", n)
    }
    ,
    n.setEmail = function(n) {
        return e.post("/account/set_email", n).then(function() {
            return o({
                lang: n.lang
            })
        })
    }
    ,
    n.updateFeatureFlags = function(n) {
        return e.postJSON("/account/update_feature_flags", n).then(function() {
            return o({
                lang: n.lang
            })
        })
    }
    ,
    n.setPrivacyConsent = function(n) {
        return e.post("/account/set_privacy_consent", n).then(function() {
            return o({
                lang: n.lang
            })
        })
    }
    ,
    n.submitArtContestEntry = function(n) {
        return e.post("/account/submit_art_contest_entry", n)
    }
});

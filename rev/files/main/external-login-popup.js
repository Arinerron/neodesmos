define('main/external-login-popup', ["require", "exports", "./backend"], function(require, e, o) {
    "use strict";
    function n(e, o) {
        e.closed ? o.askServerIfLoggedIn() : setTimeout(function() {
            n(e, o)
        }, 1e3)
    }
    function l(e) {
        var o = window.open(e.url, "login_window", "width=650,height=530,resizable,scrollbars");
        o ? n(o, e.userController) : alert(e.blockedMessage)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.listenForLoginRequests = void 0,
    e.listenForLoginRequests = function(e, n) {
        window.userController = e,
        e.observeEvent("googleLogin", function(t, i) {
            l({
                url: o.getGoogleLoginURL(i),
                userController: e,
                blockedMessage: n("account-shell-text-login-window-blocked-google")
            })
        }),
        e.observeEvent("appleLogin", function(t, i) {
            l({
                url: o.getAppleLoginURL(i),
                userController: e,
                blockedMessage: n("account-shell-text-login-window-blocked-apple")
            })
        })
    }
});
define('shared-header/accounts', ["require", "exports", "tslib", "dcgview", "jquery"], function(require, n, e, t, c) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    n.Accounts = void 0;
    var o = t.Components.If
      , r = function(n) {
        function r() {
            return null !== n && n.apply(this, arguments) || this
        }
        return e.__extends(r, n),
        r.prototype.template = function() {
            var n = this
              , e = this.props.controller().userController;
            return t.createElement("span", null, t.createElement(o, {
                predicate: function() {
                    return e.isLoggedIn() && !n.props.disableAccounts()
                }
            }, function() {
                return t.createElement("span", null, t.createElement(o, {
                    predicate: function() {
                        return e.isLoggingOut()
                    }
                }, function() {
                    return t.createElement("span", {
                        class: t.const("logout-progress-notice")
                    }, t.createElement("span", {
                        class: t.const("dcg-spinner-dark")
                    }))
                }), t.createElement(o, {
                    predicate: function() {
                        return !e.isLoggingOut() && !n.props.disableAccounts()
                    }
                }, function() {
                    return t.createElement("span", {
                        class: t.const("dcg-account-link"),
                        "dcg-menu-button": t.const("account"),
                        role: t.const("button"),
                        tabindex: t.const(0),
                        "aria-haspopup": t.const("true"),
                        "aria-expanded": t.const("false"),
                        "aria-label": t.const("Account Information"),
                        onTap: function(e) {
                            if (n.props.controller().dispatch({
                                type: "toggle-menu",
                                payload: "account"
                            }),
                            "keyboard" == e.device) {
                                var t = "account" === n.props.controller().getOpenMenu();
                                c(t ? ".dcg-action-accountsettings" : ".dcg-account-link").trigger("focus")
                            }
                        }
                    }, t.createElement("span", {
                        class: t.const("email")
                    }, t.createElement("div", {
                        class: t.const("header-account-name dcg-variable-name")
                    }, function() {
                        return e.getFirstName()
                    }), t.createElement("i", {
                        class: t.const("dcg-icon-caret-down")
                    })))
                }))
            }), t.createElement(o, {
                predicate: function() {
                    return !e.isLoggedIn() && !n.props.disableAccounts()
                }
            }, function() {
                return t.createElement("span", {
                    class: t.const("dcg-login")
                }, t.createElement("a", {
                    role: t.const("link"),
                    tabindex: t.const(0),
                    class: t.const("dcg-sign-in dcg-action-login"),
                    onTap: function(e) {
                        n.props.controller().dispatch({
                            type: "show-modal",
                            modal: "login",
                            device: e.device
                        })
                    }
                }, function() {
                    return n.props.controller().s("account-shell-button-log-in")
                }), function() {
                    return n.props.controller().s("account-shell-text-or")
                }, t.createElement("a", {
                    role: t.const("link"),
                    tabindex: t.const(0),
                    class: t.const("dcg-create-account dcg-btn dcg-btn-green dcg-action-createaccount"),
                    onTap: function(e) {
                        n.props.controller().dispatch({
                            type: "show-modal",
                            modal: "signup",
                            device: e.device
                        })
                    }
                }, function() {
                    return n.props.controller().s("account-shell-button-sign-up")
                }))
            }))
        }
        ,
        r
    }(t.Class);
    n.Accounts = r
});
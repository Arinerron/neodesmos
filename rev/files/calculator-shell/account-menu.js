
define('calculator-shell/account-menu', ["require", "exports", "tslib", "dcgview", "./menu", "loadcss!./account-menu"], function(require, t, n, e, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.AccountMenu = void 0;
    var r = e.Components.If
      , c = function(t) {
        function c() {
            return null !== t && t.apply(this, arguments) || this
        }
        return n.__extends(c, t),
        c.prototype.init = function() {
            this.controller = this.props.controller(),
            this.userController = this.controller.userController
        }
        ,
        c.prototype.template = function() {
            var t = this;
            return e.createElement(r, {
                predicate: function() {
                    return t.userController.isLoggedIn()
                }
            }, function() {
                return e.createElement(o.Menu, {
                    type: function() {
                        return "account"
                    },
                    label: function() {
                        return t.controller.s("account-shell-label-account-information")
                    },
                    left: t.props.left,
                    arrowLeft: t.props.arrowLeft,
                    controller: t.props.controller
                }, e.createElement("div", {
                    class: e.const("user-info")
                }, e.createElement("span", {
                    class: e.const("account-name")
                }, function() {
                    return t.userController.getFullName()
                }), e.createElement("span", {
                    class: e.const("account-email")
                }, function() {
                    return t.userController.getEmail()
                }), e.createElement("a", {
                    class: e.const("dcg-action-accountsettings"),
                    role: e.const("link"),
                    tabindex: e.const(0),
                    onTap: function(n) {
                        return t.controller.dispatch({
                            type: "show-modal",
                            modal: "account-settings",
                            device: n.device
                        })
                    }
                }, function() {
                    return t.controller.s("account-shell-link-account-settings")
                })), e.createElement("a", {
                    class: e.const("dcg-action-logout"),
                    role: e.const("link"),
                    tabindex: e.const(0),
                    onTap: function() {
                        return t.logout()
                    }
                }, function() {
                    return t.controller.s("account-shell-link-sign-out")
                }))
            })
        }
        ,
        c.prototype.logout = function() {
            this.controller.dispatch({
                type: "toggle-menu",
                payload: "none"
            }),
            this.userController.logout()
        }
        ,
        c
    }(e.Class);
    t.AccountMenu = c
});

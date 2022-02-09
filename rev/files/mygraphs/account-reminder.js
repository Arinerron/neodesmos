
define('mygraphs/account-reminder', ["require", "exports", "tslib", "dcgview", "loadcss!./account-reminder"], function(require, t, n, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.AccountReminder = void 0;
    var o = function(t) {
        function o() {
            return null !== t && t.apply(this, arguments) || this
        }
        return n.__extends(o, t),
        o.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        o.prototype.template = function() {
            var t = this;
            return e.createElement("div", {
                class: e.const("dcg-account-reminder")
            }, e.createElement("a", {
                role: e.const("link"),
                tabindex: e.const("0"),
                class: e.const("dcg-btn-white-outline dcg-action-createaccount"),
                onTap: this.props.onCreateAccount
            }, function() {
                return t.controller.s("account-shell-link-mygraphs-sign-up")
            }), function() {
                return t.controller.s("account-shell-text-mygraphs-or")
            }, e.createElement("a", {
                role: e.const("link"),
                tabindex: e.const("0"),
                class: e.const("dcg-action-login"),
                onTap: this.props.onSignIn
            }, function() {
                return t.controller.s("account-shell-link-mygraphs-log-in")
            }), e.createElement("div", null, function() {
                return t.getToSaveYourText()
            }))
        }
        ,
        o.prototype.getToSaveYourText = function() {
            return "graphing" === this.controller.product ? this.controller.s("account-shell-text-mygraphs-to-save-graphs") : "geometry" === this.controller.product ? this.controller.s("account-shell-text-mygraphs-to-save-constructions") : ""
        }
        ,
        o
    }(e.Class);
    t.AccountReminder = o
});
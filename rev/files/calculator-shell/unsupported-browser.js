
define('calculator-shell/unsupported-browser', ["require", "exports", "tslib", "dcgview", "./modal"], function(require, e, t, n, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.UnsupportedBrowserDialog = void 0;
    var r = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        r.prototype.template = function() {
            var e = this;
            return n.createElement(o.Modal, {
                controller: this.props.controller
            }, n.createElement("div", {
                id: n.const("unsupported-browser")
            }, n.createElement("div", {
                id: n.const("unsupported-browser-title"),
                style: n.const("color:black; font-size:150%;")
            }, function() {
                return e.controller.s("account-shell-heading-unsupported-browser")
            }), n.createElement("div", {
                style: n.const("padding:20px 0px; color:#666")
            }, function() {
                return e.controller.s("account-shell-text-unsupported-browser-android")
            }, n.createElement("br", null), n.createElement("br", null), n.createElement("a", {
                href: n.const("https://play.google.com/store/apps/details?id=com.android.chrome")
            }, function() {
                return e.controller.s("account-shell-link-download-chrome")
            }, n.createElement("br", null), n.createElement("br", null)), n.createElement("div", {
                style: n.const("text-align: center; margin-top: 25px; margin-bottom:-16px")
            }, n.createElement("a", {
                role: n.const("link"),
                tabindex: n.const("0"),
                class: n.const("dcg-btn dcg-action-hide dcg-do-not-blur"),
                onTap: function() {
                    return e.controller.dispatch({
                        type: "close-modal"
                    })
                }
            }, function() {
                return e.controller.s("account-shell-button-hide-browser-warning")
            })))))
        }
        ,
        r
    }(n.Class);
    e.UnsupportedBrowserDialog = r
});

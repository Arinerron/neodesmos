
define('shared-components/shared-cookie-notice', ["require", "exports", "tslib", "dcgview", "shared/dcgviews/localize"], function(require, e, t, s, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = function(e) {
        function n() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(n, e),
        n.prototype.template = function() {
            return s.createElement("div", {
                class: s.const("dcg-shared-cookie-notice")
            }, s.createElement(o.Localize, {
                key: this.const("shared-message-cookie-notice"),
                i18n: this.props.i18n
            }, s.createElement("b", null, s.const("Note:")), s.const(" "), s.const("Desmos uses cookies to enable persistence when you are signed"), s.const(" "), s.const("in. If you do not wish to use cookies, please use Desmos without"), s.const(" "), s.const("logging in."), s.const(" "), s.createElement("a", {
                class: s.const("dcg-shared-cookie-notice-learn-more dcg-shared-blue-link"),
                href: s.const("/privacy"),
                target: s.const("_blank")
            }, s.const("Learn More."))))
        }
        ,
        n
    }(s.Class);
    e.default = n
});

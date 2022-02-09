define('expressions/unresolved_view', ["require", "exports", "tslib", "dcgview"], function(require, e, t, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.template = function() {
            var e = this;
            return this.controller = this.props.controller(),
            n.createElement("div", {
                class: n.const("dcg-unresolved")
            }, n.createElement("i", {
                class: n.const("dcg-icon-error")
            }), n.const(" "), function() {
                return e.controller.s("graphing-calculator-error-equation-contains-unresolved-details")
            }, n.createElement("a", {
                href: n.const("https://help.desmos.com/hc/en-us/articles/202529079-Unresolved-Detail-In-Plotted-Functions"),
                target: n.const("_blank")
            }, function() {
                return e.controller.s("graphing-calculator-link-learn-more")
            }))
        }
        ,
        r
    }(n.Class);
    e.default = r
});

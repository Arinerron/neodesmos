
define('mygraphs/heading', ["require", "exports", "tslib", "dcgview"], function(require, e, t, n) {
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
            return n.createElement("div", {
                class: n.const("dcg-mygraphs-section-title-container")
            }, n.createElement("span", {
                role: n.const("heading"),
                "aria-level": n.const("1"),
                class: n.const("dcg-mygraphs-section-title")
            }, function() {
                return e.props.title()
            }))
        }
        ,
        r
    }(n.Class);
    e.default = r
});

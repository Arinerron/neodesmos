
define('calculator-shell/help-menu', ["require", "exports", "tslib", "dcgview", "./menu", "./tour-links", "./resource-links", "./contact-us", "loadcss!./help"], function(require, e, t, r, n, o, l, c) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.HelpMenu = void 0;
    var s = function(e) {
        function s() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(s, e),
        s.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        s.prototype.template = function() {
            var e = this;
            return r.createElement(n.Menu, {
                title: function() {
                    return e.controller.s("account-shell-heading-tours")
                },
                type: function() {
                    return "help"
                },
                label: function() {
                    return e.controller.s("account-shell-label-help-menu")
                },
                controller: this.props.controller
            }, r.createElement(o.TourLinks, {
                controller: this.props.controller
            }), r.createElement("div", {
                class: r.const("dcg-popover-title"),
                "aria-hidden": r.const("true")
            }, function() {
                return e.controller.s("account-shell-heading-resources")
            }), r.createElement(l.ResourceLinks, {
                controller: this.props.controller
            }), r.createElement("div", {
                class: r.const("dcg-popover-title dcg-interior-title dcg-hide-on-mobile"),
                "aria-hidden": r.const("true")
            }, function() {
                return e.controller.s("account-shell-heading-contact-us")
            }), r.createElement(c.ContactUs, {
                controller: this.props.controller
            }))
        }
        ,
        s
    }(r.Class);
    e.HelpMenu = s
});

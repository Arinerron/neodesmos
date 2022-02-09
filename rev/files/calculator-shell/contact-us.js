define('calculator-shell/contact-us', ["require", "exports", "tslib", "dcgview", "./contact-form"], function(require, t, e, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ContactUs = void 0;
    var c = n.Components.IfElse
      , r = function(t) {
        function r() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(r, t),
        r.prototype.handleClick = function() {
            this.props.controller().dispatch({
                type: "show-contact-form",
                showForm: !0
            })
        }
        ,
        r.prototype.template = function() {
            var t = this;
            return n.createElement("div", {
                class: n.const("dcg-popover-content dcg-hide-on-mobile"),
                role: n.const("group"),
                "aria-label": n.const("Feedback")
            }, c(function() {
                return t.props.controller().requestedContactForm()
            }, {
                true: function() {
                    return n.createElement("div", {
                        class: n.const("dcg-resources-content dcg-feedback-content")
                    }, n.createElement(o.ContactForm, {
                        controller: t.props.controller
                    }))
                },
                false: function() {
                    return n.createElement("div", {
                        class: n.const("dcg-contact-us")
                    }, n.createElement("a", {
                        class: n.const("dcg-contact-link"),
                        onTap: t.bindFn(t.handleClick)
                    }, n.createElement("i", {
                        class: n.const("dcg-icon-mail"),
                        "aria-hidden": n.const("true")
                    }), n.createElement("span", null, function() {
                        return t.props.controller().s("account-shell-link-email-support")
                    })))
                }
            }))
        }
        ,
        r
    }(n.Class);
    t.ContactUs = r
});

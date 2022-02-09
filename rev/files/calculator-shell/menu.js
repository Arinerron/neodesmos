define('calculator-shell/menu', ["require", "exports", "tslib", "dcgview", "jquery"], function(require, t, e, o, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.Menu = void 0;
    var n = o.Components.If
      , i = function(t) {
        function i() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(i, t),
        i.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        i.prototype.template = function() {
            var t = this;
            return o.createElement("div", {
                class: function() {
                    var e;
                    return (e = {
                        "dcg-popover": !0,
                        "dcg-bottom": !0,
                        "dcg-constrained-height-popover": !0
                    })["dcg-" + t.props.type() + "-container"] = !0,
                    e["dcg-product-" + t.props.controller().getProduct()] = !0,
                    e
                },
                style: function() {
                    return t.props.left ? {
                        display: "block",
                        left: t.props.left(),
                        right: "auto"
                    } : {
                        display: "block"
                    }
                },
                role: o.const("complementary"),
                label: function() {
                    return t.props.label()
                }
            }, o.createElement("div", {
                class: o.const("dcg-popover-interior")
            }, o.createElement(n, {
                predicate: function() {
                    return !("function" != typeof t.props.title || !t.props.title())
                }
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-popover-title")
                }, function() {
                    return t.props.title()
                })
            }), this.children), o.createElement("div", {
                class: o.const("dcg-arrow"),
                style: function() {
                    return t.props.arrowLeft ? {
                        left: t.props.arrowLeft(),
                        right: "auto"
                    } : {}
                }
            }))
        }
        ,
        i.prototype.didMount = function() {
            var t = this
              , e = this.props.type();
            this.guid = "menu-" + e,
            r("body").on("dcg-tapstart." + this.guid, function(o) {
                var n = r(o.target)
                  , i = !!n.closest(".dcg-popover").length
                  , p = !!n.closest("[dcg-menu-button=" + e + "]").length;
                i || p || t.controller.dispatch({
                    type: "toggle-menu",
                    payload: "none"
                })
            })
        }
        ,
        i.prototype.didUnmount = function() {
            r("body").off("dcg-tapstart." + this.guid)
        }
        ,
        i
    }(o.Class);
    t.Menu = i
});


define('calculator-shell/tour-links', ["require", "exports", "tours/all_tours", "tslib", "dcgview", "underscore"], function(require, t, e, r, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TourLinks = void 0;
    var l = n.Components
      , u = l.For
      , c = l.If
      , i = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return r.__extends(e, t),
        e.prototype.init = function() {
            this.controller = this.props.controller(),
            this.tourController = this.controller.tourController
        }
        ,
        e.prototype.template = function() {
            var t = this;
            return n.createElement("a", {
                class: n.const("dcg-feature"),
                href: function() {
                    return "/calculator?tour=" + t.props.name()
                },
                target: n.const("_blank"),
                ignoreRealClick: function() {
                    return !t.tourController.shouldPopupTour(t.props.name())
                },
                onTap: function(e) {
                    if (!t.tourController.shouldPopupTour(t.props.name()))
                        return e.originalEvent.preventDefault(),
                        t.controller.dispatch({
                            type: "toggle-menu",
                            payload: "none"
                        }),
                        t.controller.tourController.startTour(t.props.name(), "help")
                }
            }, n.createElement("span", {
                class: function() {
                    return "dcg-thumb dcg-" + t.props.name()
                }
            }), function() {
                return t.controller.s(t.props.titleKey())
            })
        }
        ,
        e
    }(n.Class)
      , s = function(t) {
        function l() {
            return null !== t && t.apply(this, arguments) || this
        }
        return r.__extends(l, t),
        l.prototype.template = function() {
            var t = this;
            return n.createElement(u, {
                each: function() {
                    return o.keys(e)
                }
            }, n.createElement("div", {
                class: n.const("dcg-popover-content dcg-tours-content"),
                role: n.const("group"),
                "aria-label": n.const("Tours")
            }, function(r) {
                return n.createElement(c, {
                    predicate: function() {
                        return !e[r].hideInHelp
                    }
                }, function() {
                    return n.createElement(i, {
                        name: function() {
                            return null != e[r] ? e[r].name : void 0
                        },
                        titleKey: function() {
                            return null != e[r] ? e[r].titleKey : void 0
                        },
                        controller: t.props.controller
                    })
                })
            }))
        }
        ,
        l
    }(n.Class);
    t.TourLinks = s
});
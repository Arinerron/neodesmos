define('expressions/slider_speed_view', ["require", "exports", "tslib", "underscore", "lib/aria", "dcgview", "core/graphing-calc/json/expression", "loadcss!./slider-speed-view"], function(require, e, t, r, n, i, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = [.05, .1, .15, .2, .35, .5, .75, 1, 1.5, 2, 3.5, 5, 7.5, 10, 15, 20]
      , s = r.min(a)
      , l = r.max(a)
      , c = function(e) {
        function c() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(c, e),
        c.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model()
        }
        ,
        c.prototype.template = function() {
            var e = this;
            return i.createElement("div", {
                class: i.const("dcg-slider-speed-container dcg-do-not-blur"),
                handleEvent: i.const("true")
            }, i.createElement("span", {
                class: function() {
                    return {
                        "dcg-action-slower": !0,
                        "dcg-disabled": e.isSlowerDisabled()
                    }
                },
                onTap: function() {
                    return e.animateSlower()
                },
                role: i.const("button"),
                "aria-label": function() {
                    return e.getSlowerAriaLabel()
                },
                tabindex: function() {
                    return e.isSlowerDisabled() ? -1 : 0
                },
                "aria-disabled": function() {
                    return e.isSlowerDisabled()
                }
            }, i.createElement("i", {
                class: i.const("dcg-icon-show")
            })), i.createElement("span", {
                class: i.const("dcg-variable-speed")
            }, this.bindFn(this.computeSpeed), i.const("x")), i.createElement("span", {
                class: function() {
                    return {
                        "dcg-action-faster": !0,
                        "dcg-disabled": e.isFasterDisabled()
                    }
                },
                onTap: function() {
                    return e.animateFaster()
                },
                role: i.const("button"),
                "aria-label": function() {
                    return e.getFasterAriaLabel()
                },
                tabindex: function() {
                    return e.isFasterDisabled() ? -1 : 0
                },
                "aria-disabled": function() {
                    return e.isFasterDisabled()
                }
            }, i.createElement("i", {
                class: i.const("dcg-icon-show")
            })))
        }
        ,
        c.prototype.computeSpeed = function() {
            var e = o.DEFAULT_SLIDER_PERIOD / this.model.slider.animationPeriod;
            return e = Number(e.toFixed(3))
        }
        ,
        c.prototype.isSlowerDisabled = function() {
            return s >= this.computeSpeed()
        }
        ,
        c.prototype.isFasterDisabled = function() {
            return l <= this.computeSpeed()
        }
        ,
        c.prototype.animateSlower = function() {
            var e = this.computeSpeed()
              , t = r.filter(a, function(t) {
                return t < e
            });
            0 !== t.length && this.setPeriodFromSpeed(r.max(t))
        }
        ,
        c.prototype.animateFaster = function() {
            var e = this.computeSpeed()
              , t = r.filter(a, function(t) {
                return t > e
            });
            0 !== t.length && this.setPeriodFromSpeed(r.min(t))
        }
        ,
        c.prototype.setPeriodFromSpeed = function(e) {
            var t = o.DEFAULT_SLIDER_PERIOD / e;
            this.controller.dispatch({
                type: "set-slider-animationperiod",
                id: this.model.id,
                animationPeriod: t
            }),
            n.alert(this.controller.s("graphing-calculator-narration-slider-animating-at-speed", {
                speed: e + ""
            }))
        }
        ,
        c.prototype.getSlowerAriaLabel = function() {
            return this.controller.s("graphing-calculator-narration-slider-animate-slower")
        }
        ,
        c.prototype.getFasterAriaLabel = function() {
            return this.controller.s("graphing-calculator-narration-slider-animate-faster")
        }
        ,
        c
    }(i.Class);
    e.default = c
});

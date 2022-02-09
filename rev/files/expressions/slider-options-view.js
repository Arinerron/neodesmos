define('expressions/slider-options-view', ["require", "exports", "tslib", "dcgview", "core/types/slider-loop-modes", "../shared-components/tooltip", "./slider_speed_view", "loadcss!toggle", "loadcss!./slider-options-view"], function(require, e, t, o, n, i, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.SliderOptionsView = void 0;
    var l = o.Components.For
      , s = function(e) {
        function s() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(s, e),
        s.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id
        }
        ,
        s.prototype.template = function() {
            var e = this;
            return o.createElement("div", {
                class: o.const("dcg-slider-options-view dcg-options-menu")
            }, o.createElement("div", {
                class: o.const("dcg-triangle")
            }), o.createElement("div", {
                class: o.const("dcg-slider-menu")
            }, o.createElement("div", {
                role: o.const("group"),
                "aria-label": function() {
                    return e.controller.s("graphing-calculator-heading-slider-animation-mode")
                }
            }, o.createElement("div", {
                role: o.const("heading"),
                "aria-level": o.const("2"),
                class: o.const("dcg-title")
            }, function() {
                return e.controller.s("graphing-calculator-heading-slider-animation-mode")
            }), o.createElement(l, {
                each: this.bindFn(this.getAnimationOptions),
                key: function(e) {
                    return e.key
                }
            }, o.createElement("div", {
                class: o.const("dcg-toggle")
            }, function(t) {
                return o.createElement("div", {
                    class: function() {
                        return {
                            "dcg-toggle-option": !0,
                            "dcg-selected-toggle": e.isSelected(t.key)
                        }
                    },
                    role: o.const("button"),
                    tabindex: o.const(0),
                    "aria-label": function() {
                        return t.aria
                    },
                    "aria-pressed": function() {
                        return e.isSelected(t.key)
                    },
                    onTap: function() {
                        return e.props.controller().dispatch({
                            type: "set-slider-loopmode",
                            id: e.props.model().id,
                            loopMode: t.key
                        })
                    }
                }, o.createElement(i.Tooltip, {
                    tooltip: function() {
                        return t.aria
                    },
                    offset: function() {
                        return {
                            top: 5
                        }
                    },
                    gravity: e.getAnimationOptionTooltipGravity(t)
                }, o.createElement("i", {
                    class: function() {
                        return n.getSliderIcon(t.key)
                    }
                })))
            })))), o.createElement("div", {
                class: o.const("dcg-slider-menu dcg-slider-speed-menu"),
                role: o.const("group"),
                "aria-label": function() {
                    return e.controller.s("graphing-calculator-heading-slider-speed")
                }
            }, o.createElement("div", {
                role: o.const("heading"),
                "aria-level": o.const("2"),
                class: o.const("dcg-title")
            }, function() {
                return e.controller.s("graphing-calculator-heading-slider-speed")
            }), o.createElement("div", {
                class: o.const("dcg-slider-speed-container")
            }, o.createElement(r.default, t.__assign({}, this.props)))))
        }
        ,
        s.prototype.getAnimationOptionTooltipGravity = function(e) {
            return this.getAnimationOptions()[0].key === e.key ? this.const("se") : this.const("s")
        }
        ,
        s.prototype.getAnimationOptions = function() {
            return [{
                key: n.SliderLoopMode.LOOP_FORWARD_REVERSE,
                aria: this.controller.s("graphing-calculator-narration-slider-loop-forwards-and-backwards")
            }, {
                key: n.SliderLoopMode.LOOP_FORWARD,
                aria: this.controller.s("graphing-calculator-narration-slider-repeat-one-direction")
            }, {
                key: n.SliderLoopMode.PLAY_ONCE,
                aria: this.controller.s("graphing-calculator-narration-slider-play-once")
            }, {
                key: n.SliderLoopMode.PLAY_INDEFINITELY,
                aria: this.controller.s("graphing-calculator-narration-slider-play-indefinitely")
            }]
        }
        ,
        s.prototype.isSelected = function(e) {
            return this.model.slider.loopMode === e
        }
        ,
        s
    }(o.Class);
    e.SliderOptionsView = s
});

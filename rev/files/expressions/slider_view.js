
define('expressions/slider_view', ["require", "exports", "tslib", "jquery", "keys", "dcgview", "dcgview-helpers/slider", "./slider_limits_view", "dcgview-helpers/static-mathquill-view", "graphing-calc/models/expression", "core/types/slider-loop-modes", "loadcss!./slider-view"], function(require, t, e, i, o, n, r, l, s, d, c) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = n.Components.If
      , p = function(t) {
        function p() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(p, t),
        p.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id
        }
        ,
        p.prototype.template = function() {
            var t = this;
            return n.createElement("span", {
                class: n.const("dcg-slider-container"),
                tapboundary: n.const("true"),
                onKeydown: function(e) {
                    "Tab" !== o.lookup(e) || e.altKey || e.metaKey || e.ctrlKey || (e.shiftKey ? t.isSliderMinFocused() && t.controller.isInEditListMode() ? (null !== e.target && i(e.target).closest(".dcg-expressionitem").find('[tabindex="0"]:visible:first').trigger("focus"),
                    e.preventDefault(),
                    e.stopPropagation()) : t.isSliderThumbFocused() && (t.controller.dispatch({
                        type: "set-focus-location",
                        location: {
                            type: "slider-limit",
                            id: t.id,
                            location: "step"
                        }
                    }),
                    e.preventDefault(),
                    e.stopPropagation()) : !e.shiftKey && t.isSliderStepFocused() && (t.controller.isInEditListMode() ? t.controller.dispatch({
                        type: "set-focus-location",
                        location: {
                            type: "slider-icon",
                            id: t.id
                        }
                    }) : t.controller.dispatch({
                        type: "set-focus-location",
                        location: {
                            type: "slider-thumb",
                            id: t.id
                        }
                    }),
                    e.preventDefault(),
                    e.stopPropagation()))
                }
            }, n.createElement(a, {
                predicate: function() {
                    return t.shouldShowSlider()
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-do-blur dcg-slider"),
                    handleEvent: n.const("true")
                }, n.createElement("div", {
                    class: n.const("dcg-minLabel dcg-template-minlabelhtml"),
                    role: n.const("button"),
                    tabindex: n.const("0"),
                    "aria-label": function() {
                        return t.controller.s("graphing-calculator-narration-edit-slider-variable-limits", {
                            variable: "none" === t.controller.getBrailleMode() ? '"' + d.getAssignment(t.model) + '"' : "" + d.getAssignment(t.model)
                        })
                    },
                    onTap: function() {
                        return t.onEditLimit("min")
                    }
                }, n.createElement(s.default, {
                    latex: function() {
                        return d.getDisplaySliderMin(t.model)
                    },
                    config: t.const({})
                })), n.createElement(r.default, {
                    min: function() {
                        return d.getSliderMin(t.model)
                    },
                    max: function() {
                        return d.getSliderMax(t.model)
                    },
                    step: function() {
                        return d.getSliderStep(t.model)
                    },
                    value: function() {
                        return d.getSliderValue(t.model)
                    },
                    ariaLabel: function() {
                        return "none" === t.controller.getBrailleMode() ? '"' + d.getAssignment(t.model) + '"' : "" + d.getAssignment(t.model)
                    },
                    onGrab: t.bindFn(t.onGrab),
                    onDrop: t.bindFn(t.onDrop),
                    onDragUpdate: t.bindFn(t.onDragUpdate),
                    onKeyboardUpdate: t.bindFn(t.onKeyboardUpdate),
                    onUpPress: function() {
                        return t.controller.dispatch({
                            type: "on-special-key-pressed",
                            key: "Up"
                        })
                    },
                    onDownPress: function() {
                        return t.controller.dispatch({
                            type: "on-special-key-pressed",
                            key: "Down"
                        })
                    },
                    onEnterPress: function() {
                        return t.controller.dispatch({
                            type: "on-special-key-pressed",
                            key: "Enter"
                        })
                    },
                    isFocused: t.bindFn(t.isSliderThumbFocused),
                    onFocusedChanged: function(e) {
                        e ? t.controller.dispatch({
                            type: "set-focus-location",
                            location: {
                                type: "slider-thumb",
                                id: t.id
                            }
                        }) : t.controller.dispatch({
                            type: "blur-focus-location",
                            location: {
                                type: "slider-thumb",
                                id: t.id
                            }
                        })
                    }
                }), n.createElement("div", {
                    class: n.const("dcg-maxLabel dcg-template-maxlabelhtml"),
                    onTap: function() {
                        return t.onEditLimit("max")
                    }
                }, n.createElement(s.default, {
                    latex: function() {
                        return d.getDisplaySliderMax(t.model)
                    },
                    config: t.const({})
                })))
            }), n.createElement(a, {
                predicate: function() {
                    return t.shouldShowLimitInputs()
                }
            }, function() {
                return n.createElement(l.default, {
                    model: t.props.model,
                    controller: t.props.controller
                })
            }))
        }
        ,
        p.prototype.onGrab = function() {
            this.dispatchIsDraggingIfChanged(!0)
        }
        ,
        p.prototype.onDrop = function() {
            this.controller.dispatch({
                type: "set-none-selected"
            }),
            this.dispatchIsPlayingIfChanged(!1),
            this.dispatchIsDraggingIfChanged(!1)
        }
        ,
        p.prototype.onKeyboardUpdate = function(t) {
            this.controller.dispatch({
                type: "adjust-slider-by-keyboard",
                id: this.id,
                adjustment: t
            })
        }
        ,
        p.prototype.onDragUpdate = function(t) {
            this.controller.dispatch({
                type: "adjust-slider-by-dragging-thumb",
                id: this.model.id,
                target: t
            })
        }
        ,
        p.prototype.onEditLimit = function(t) {
            this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "slider-limit",
                    id: this.id,
                    location: t
                }
            })
        }
        ,
        p.prototype.dispatchIsPlayingIfChanged = function(t) {
            this.model.slider.isPlaying !== t && this.controller.dispatch({
                type: "set-slider-isplaying",
                id: this.id,
                isPlaying: t
            })
        }
        ,
        p.prototype.dispatchIsDraggingIfChanged = function(t) {
            this.model.sliderDragging !== t && this.controller.dispatch({
                type: "set-slider-dragging",
                id: this.id,
                dragging: t
            })
        }
        ,
        p.prototype.shouldShowLimitInputs = function() {
            if (this.controller.isInEditListMode())
                return !0;
            if (!d.isSliderMinValid(this.model))
                return !0;
            if (!d.isSliderMaxValid(this.model))
                return !0;
            if (!d.isSliderStepValid(this.model))
                return !0;
            if (this.model.slider.loopMode === c.SliderLoopMode.PLAY_INDEFINITELY)
                return !0;
            var t = this.controller.getFocusLocation();
            return !(!t || "slider-limit" !== t.type && "expression" !== t.type || t.id !== this.id)
        }
        ,
        p.prototype.shouldShowSlider = function() {
            return !this.shouldShowLimitInputs()
        }
        ,
        p.prototype.isSliderThumbFocused = function() {
            var t = this.controller.getFocusLocation();
            return !(!t || "slider-thumb" !== t.type || t.id !== this.id)
        }
        ,
        p.prototype.isSliderMinFocused = function() {
            var t = this.controller.getFocusLocation();
            return !(!t || "slider-limit" !== t.type || t.id !== this.id || "min" !== t.location)
        }
        ,
        p.prototype.isSliderStepFocused = function() {
            var t = this.controller.getFocusLocation();
            return !(!t || "slider-limit" !== t.type || t.id !== this.id || "step" !== t.location)
        }
        ,
        p
    }(n.Class);
    t.default = p
});

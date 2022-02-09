
define('expressions/slider_limits_view', ["require", "exports", "tslib", "jquery", "dcgview", "dcgview-helpers/static-mathquill-view", "dcgview-helpers/mathquill-view", "keys", "graphing-calc/models/expression", "core/lib/label", "core/types/slider-loop-modes", "main/mathquill-operators", "../shared-components/mathquill-braille-wrapper", "./expression_view"], function(require, e, t, n, i, o, r, l, s, a, d, c, u, p) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var h = i.Components.If
      , m = function(e) {
        function m() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(m, e),
        m.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id
        }
        ,
        m.prototype.template = function() {
            var e = this;
            return i.createElement("div", {
                class: i.const("dcg-slider_menu dcg-mq-underline-container dcg-do-blur"),
                handleEvent: i.const("true"),
                didMount: function(t) {
                    return e.node = t
                }
            }, i.createElement("div", {
                class: i.const("dcg-editable-mathquill-container")
            }, i.createElement(h, {
                predicate: function() {
                    return !e.shouldOnlyShowStep()
                }
            }, function() {
                return i.createElement("span", null, i.createElement(u.default, t.__assign({
                    latex: function() {
                        return e.model.slider.hardMin ? e.model.slider.min : ""
                    },
                    ariaLabel: function() {
                        return e.controller.raw("sldrmin")
                    },
                    brailleShouldFocus: function() {
                        return "min" === e.getFocusedInput()
                    },
                    onBrailleInput: function(t) {
                        return e.handleLatexChanged("min", t)
                    },
                    hasError: function() {
                        return !s.isSliderMinValid(e.model)
                    },
                    onBrailleFocusedChanged: function(t, n) {
                        return e.handleFocusedChanged("min", t, n)
                    },
                    onBrailleKeydown: function(t) {
                        return e.handleBrailleKeydown("min", t)
                    },
                    selectOnFocus: e.const(!0),
                    dataDCGLimit: e.const("slidermin")
                }, p.getBrailleWrapperProps(e.props.controller())), i.createElement(r.default, {
                    latex: function() {
                        return e.model.slider.hardMin ? e.model.slider.min : ""
                    },
                    isFocused: function() {
                        return "min" === e.getFocusedInput()
                    },
                    capExpressionSize: function() {
                        return e.controller.getCapExpressionSize()
                    },
                    selectOnFocus: e.const(!0),
                    config: e.bindFn(e.getMQConfig),
                    getAriaLabel: function() {
                        return e.controller.s("graphing-calculator-narration-slider-minimum")
                    },
                    getAriaPostLabel: e.const(""),
                    hasError: e.const(!1),
                    onUserPressedKey: function(t, n) {
                        return e.handlePressedKey("min", t, n)
                    },
                    onUserChangedLatex: function(t) {
                        return e.handleLatexChanged("min", t)
                    },
                    onExpressionSizeExceeded: function() {
                        return e.controller.dispatch({
                            type: "expression-size-exceeded"
                        })
                    },
                    onFocusedChanged: function(t, n) {
                        return e.handleFocusedChanged("min", t, n)
                    },
                    needsSystemKeypad: function() {
                        return !e.controller.isKeypadEnabled()
                    }
                }, i.createElement("span", {
                    class: function() {
                        return {
                            "dcg-math-field": !0,
                            "dcg-focus": "min" === e.getFocusedInput(),
                            "dcg-invalid": !s.isSliderMinValid(e.model)
                        }
                    },
                    "data-dcg-limit": i.const("slidermin")
                }))), i.createElement("span", {
                    class: i.const("dcg-interval-interior")
                }, i.createElement(o.default, {
                    latex: e.bindFn(e.getDependentLatex),
                    config: e.const({})
                }, i.createElement("span", null))), i.createElement(u.default, t.__assign({
                    latex: function() {
                        return e.model.slider.hardMax ? e.model.slider.max : ""
                    },
                    ariaLabel: function() {
                        return e.controller.raw("sldrmax")
                    },
                    brailleShouldFocus: function() {
                        return "max" === e.getFocusedInput()
                    },
                    onBrailleInput: function(t) {
                        return e.handleLatexChanged("max", t)
                    },
                    hasError: function() {
                        return !s.isSliderMaxValid(e.model)
                    },
                    onBrailleFocusedChanged: function(t, n) {
                        return e.handleFocusedChanged("max", t, n)
                    },
                    onBrailleKeydown: function(t) {
                        return e.handleBrailleKeydown("max", t)
                    },
                    selectOnFocus: e.const(!0),
                    dataDCGLimit: e.const("slidermax")
                }, p.getBrailleWrapperProps(e.props.controller())), i.createElement(r.default, {
                    latex: function() {
                        return e.model.slider.hardMax ? e.model.slider.max : ""
                    },
                    isFocused: function() {
                        return "max" === e.getFocusedInput()
                    },
                    capExpressionSize: function() {
                        return e.controller.getCapExpressionSize()
                    },
                    selectOnFocus: e.const(!0),
                    config: e.bindFn(e.getMQConfig),
                    getAriaLabel: function() {
                        return e.controller.s("graphing-calculator-narration-slider-maximum")
                    },
                    getAriaPostLabel: e.const(""),
                    hasError: e.const(!1),
                    onUserPressedKey: function(t, n) {
                        return e.handlePressedKey("max", t, n)
                    },
                    onUserChangedLatex: function(t) {
                        return e.handleLatexChanged("max", t)
                    },
                    onExpressionSizeExceeded: function() {
                        return e.controller.dispatch({
                            type: "expression-size-exceeded"
                        })
                    },
                    onFocusedChanged: function(t, n) {
                        return e.handleFocusedChanged("max", t, n)
                    },
                    needsSystemKeypad: function() {
                        return !e.controller.isKeypadEnabled()
                    }
                }, i.createElement("span", {
                    class: function() {
                        return {
                            "dcg-math-field": !0,
                            "dcg-focus": "max" === e.getFocusedInput(),
                            "dcg-invalid": !s.isSliderMaxValid(e.model)
                        }
                    },
                    "data-dcg-limit": i.const("slidermax")
                }))))
            }), i.createElement("span", {
                class: function() {
                    return {
                        "dcg-slider-step-container": !e.shouldOnlyShowStep()
                    }
                }
            }, i.createElement("span", {
                class: i.const("dcg-slider-step-label"),
                "aria-hidden": i.const("true")
            }, function() {
                return e.controller.s("graphing-calculator-label-slider-step")
            }), i.createElement(u.default, t.__assign({
                latex: function() {
                    return e.model.slider.step
                },
                ariaLabel: function() {
                    return e.controller.raw("sldrstp")
                },
                brailleShouldFocus: function() {
                    return "step" === e.getFocusedInput()
                },
                onBrailleInput: function(t) {
                    return e.handleLatexChanged("step", t)
                },
                hasError: function() {
                    return !s.isSliderStepValid(e.model)
                },
                onBrailleFocusedChanged: function(t, n) {
                    return e.handleFocusedChanged("step", t, n)
                },
                onBrailleKeydown: function(t) {
                    return e.handleBrailleKeydown("step", t)
                },
                selectOnFocus: this.const(!0),
                dataDCGLimit: this.const("sliderstep")
            }, p.getBrailleWrapperProps(this.props.controller())), i.createElement(r.default, {
                latex: function() {
                    return e.model.slider.step
                },
                isFocused: function() {
                    return "step" === e.getFocusedInput()
                },
                capExpressionSize: function() {
                    return e.controller.getCapExpressionSize()
                },
                selectOnFocus: this.const(!0),
                config: this.bindFn(this.getMQConfig),
                getAriaLabel: function() {
                    return e.controller.s("graphing-calculator-narration-slider-step")
                },
                getAriaPostLabel: this.const(""),
                hasError: this.const(!1),
                onUserPressedKey: function(t, n) {
                    return e.handlePressedKey("step", t, n)
                },
                onUserChangedLatex: function(t) {
                    return e.handleLatexChanged("step", t)
                },
                onExpressionSizeExceeded: function() {
                    return e.controller.dispatch({
                        type: "expression-size-exceeded"
                    })
                },
                onFocusedChanged: function(t, n) {
                    return e.handleFocusedChanged("step", t, n)
                },
                needsSystemKeypad: function() {
                    return !e.controller.isKeypadEnabled()
                }
            }, i.createElement("span", {
                class: function() {
                    return {
                        "dcg-math-field": !0,
                        "dcg-focus": "step" === e.getFocusedInput(),
                        "dcg-invalid": !s.isSliderStepValid(e.model)
                    }
                },
                "data-dcg-limit": i.const("sliderstep")
            }))))))
        }
        ,
        m.prototype.handleBrailleKeydown = function(e, t) {
            var i = l.lookup(t);
            i && this.handlePressedKey(e, i, n.Event(t))
        }
        ,
        m.prototype.handlePressedKey = function(e, t, i) {
            if (this.controller.isInEditListMode() || this.shouldOnlyShowStep() || "Esc" !== t && "Enter" !== t) {
                var o = r.default.getFocusedMathquill()
                  , l = u.getFocusedBrailleElement();
                if ("Left" !== t && "Right" !== t && "Down" !== t && "Up" !== t)
                    o && (o.keystroke(t, i),
                    this.handleLatexChanged(e, o.latex()));
                else
                    (o ? r.default.applyArrowKeyAndReturnIfWasAtBounds(o, t, i) : !(!l || !(0 === l.selectionStart && "Left" === t || l.selectionStart === n(l).val().length && "Right" === t || "Up" === t || "Down" === t))) && (i && i.preventDefault(),
                    "Left" !== t || this.shouldOnlyShowStep() ? "Right" !== t || this.shouldOnlyShowStep() ? "Down" === t ? this.controller.dispatch({
                        type: "on-special-key-pressed",
                        key: "Down"
                    }) : "Up" === t && this.controller.dispatch({
                        type: "set-focus-location",
                        location: {
                            type: "expression",
                            id: this.model.id
                        }
                    }) : "min" === e ? this.controller.dispatch({
                        type: "set-focus-location",
                        location: {
                            type: "slider-limit",
                            id: this.model.id,
                            location: "max"
                        }
                    }) : "max" === e && this.controller.dispatch({
                        type: "set-focus-location",
                        location: {
                            type: "slider-limit",
                            id: this.model.id,
                            location: "step"
                        }
                    }) : "max" === e ? this.controller.dispatch({
                        type: "set-focus-location",
                        location: {
                            type: "slider-limit",
                            id: this.model.id,
                            location: "min"
                        }
                    }) : "step" === e && this.controller.dispatch({
                        type: "set-focus-location",
                        location: {
                            type: "slider-limit",
                            id: this.model.id,
                            location: "max"
                        }
                    }))
            } else
                this.controller.dispatch({
                    type: "set-focus-location",
                    location: {
                        type: "slider-thumb",
                        id: this.id
                    }
                })
        }
        ,
        m.prototype.shouldOnlyShowStep = function() {
            return this.model.slider.loopMode === d.SliderLoopMode.PLAY_INDEFINITELY
        }
        ,
        m.prototype.handleLatexChanged = function(e, t) {
            "min" === e ? this.dispatchMinLatexIfChanged(t) : "max" === e ? this.dispatchMaxLatexIfChanged(t) : "step" === e && this.dispatchStepLatexIfChanged(t)
        }
        ,
        m.prototype.handleFocusedChanged = function(e, t, n) {
            t && this.getFocusedInput() !== e ? this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "slider-limit",
                    id: this.id,
                    location: e
                }
            }) : this.getFocusedInput() !== e || "none" !== this.controller.getBrailleMode() || n.relatedTarget && this.node.contains(n.relatedTarget) || this.controller.dispatch({
                type: "blur-focus-location",
                location: {
                    type: "slider-limit",
                    id: this.id,
                    location: e
                }
            })
        }
        ,
        m.prototype.dispatchMinLatexIfChanged = function(e) {
            this.model.slider.min !== e && this.controller.dispatch({
                type: "set-slider-minlatex",
                id: this.id,
                latex: e
            })
        }
        ,
        m.prototype.dispatchMaxLatexIfChanged = function(e) {
            this.model.slider.max !== e && this.controller.dispatch({
                type: "set-slider-maxlatex",
                id: this.id,
                latex: e
            })
        }
        ,
        m.prototype.dispatchStepLatexIfChanged = function(e) {
            this.model.slider.step !== e && this.controller.dispatch({
                type: "set-slider-steplatex",
                id: this.id,
                latex: e
            })
        }
        ,
        m.prototype.getDependentLatex = function() {
            var e = s.getAssignment(this.model) || "";
            return " \\le " + a.identifierToLatex(e) + " \\le "
        }
        ,
        m.prototype.getFocusedInput = function() {
            var e = this.controller.getFocusLocation();
            if (e && "slider-limit" === e.type && e.id === this.id)
                return e.location
        }
        ,
        m.prototype.getMQConfig = function() {
            return {
                autoOperatorNames: c.getAutoOperators()
            }
        }
        ,
        m
    }(i.Class);
    e.default = m
});


define('expressions/cdf-footer-view', ["require", "exports", "tslib", "dcgview", "jquery", "keys", "graphing-calc/models/expression", "dcgview-helpers/mathquill-view", "./evaluation-view", "main/mathquill-operators", "dcgview-helpers/checkbox", "../shared-components/mathquill-braille-wrapper", "./expression_view", "loadcss!./cdf-footer-view"], function(require, e, n, t, o, r, i, l, a, c, d, s, u) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var p = t.Components.If
      , f = function(e) {
        function f() {
            var n = null !== e && e.apply(this, arguments) || this;
            return n.focusedValues = {},
            n
        }
        return n.__extends(f, e),
        f.prototype.template = function() {
            var e = this;
            return this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id,
            t.createElement("div", {
                class: t.const("dcg-cdf-footer-container dcg-mq-underline-container dcg-do-blur"),
                tapboundary: t.const("true"),
                handleEvent: t.const("true")
            }, t.createElement(d.Checkbox, {
                checked: function() {
                    return i.shouldShowCDFFooter(e.model)
                },
                disabled: function() {
                    return i.isListValuedDistribution(e.model)
                },
                onChange: function(n) {
                    e.controller.dispatch({
                        type: "set-show-cdf",
                        id: e.model.id,
                        showCDF: n
                    })
                },
                ariaLabel: function() {
                    return e.controller.s("graphing-calculator-button-find-cdf")
                }
            }, function() {
                return e.controller.s("graphing-calculator-button-find-cdf")
            }), t.createElement(p, {
                predicate: function() {
                    return i.shouldShowCDFFooter(e.model)
                }
            }, function() {
                return t.createElement("div", null, t.createElement("span", {
                    class: t.const("dcg-cdf-limit-name")
                }, function() {
                    return e.controller.s("graphing-calculator-label-cdf-minimum")
                }), t.createElement(s.default, n.__assign({
                    latex: function() {
                        return i.getCDFMin(e.model)
                    },
                    hasError: function() {
                        return !i.isCDFMinValid(e.model)
                    },
                    brailleShouldFocus: function() {
                        return e.isInputFocused("min")
                    },
                    onBrailleFocusedChanged: function(n) {
                        return e.handleFocusedChanged("min", n)
                    },
                    ariaLabel: function() {
                        return e.controller.s("graphing-calculator-narration-cdf-minimum")
                    },
                    placeholder: function() {
                        return i.getCDFMinPlaceholder(e.model)
                    },
                    onBrailleInput: e.bindFn(e.updateCDFMin),
                    onBrailleKeydown: function(n) {
                        return e.handleBraillePressedKey(n, "min")
                    }
                }, u.getBrailleWrapperProps(e.props.controller())), t.createElement(l.default, {
                    latex: function() {
                        return i.getCDFMin(e.model)
                    },
                    hasError: function() {
                        return !i.isCDFMinValid(e.model)
                    },
                    isFocused: function() {
                        return e.isInputFocused("min")
                    },
                    onFocusedChanged: function(n) {
                        return e.handleFocusedChanged("min", n)
                    },
                    config: e.bindFn(e.getMQConfig),
                    getAriaLabel: function() {
                        return e.controller.s("graphing-calculator-narration-cdf-minimum")
                    },
                    getAriaPostLabel: function() {
                        return ""
                    },
                    placeholder: function() {
                        return i.getCDFMinPlaceholder(e.model)
                    },
                    onUserPressedKey: function(n, t) {
                        return e.handlePressedKey(n, t, "min")
                    },
                    onUserChangedLatex: e.bindFn(e.updateCDFMin),
                    onExpressionSizeExceeded: function() {
                        return e.controller.dispatch({
                            type: "expression-size-exceeded"
                        })
                    },
                    capExpressionSize: function() {
                        return e.model.controller.getCapExpressionSize()
                    },
                    needsSystemKeypad: function() {
                        return !e.controller.isKeypadEnabled()
                    }
                })), t.createElement("span", {
                    class: t.const("dcg-cdf-limit-name")
                }, function() {
                    return e.controller.s("graphing-calculator-label-cdf-maximum")
                }), t.createElement(s.default, n.__assign({
                    latex: function() {
                        return i.getCDFMax(e.model)
                    },
                    hasError: function() {
                        return !i.isCDFMaxValid(e.model)
                    },
                    brailleShouldFocus: function() {
                        return e.isInputFocused("max")
                    },
                    onBrailleFocusedChanged: function(n) {
                        return e.handleFocusedChanged("max", n)
                    },
                    ariaLabel: function() {
                        return e.controller.s("graphing-calculator-narration-cdf-maximum")
                    },
                    placeholder: function() {
                        return i.getCDFMaxPlaceholder(e.model)
                    },
                    onBrailleInput: e.bindFn(e.updateCDFMax),
                    onBrailleKeydown: function(n) {
                        return e.handleBraillePressedKey(n, "max")
                    }
                }, u.getBrailleWrapperProps(e.props.controller())), t.createElement(l.default, {
                    latex: function() {
                        return i.getCDFMax(e.model)
                    },
                    hasError: function() {
                        return !i.isCDFMaxValid(e.model)
                    },
                    isFocused: function() {
                        return e.isInputFocused("max")
                    },
                    onFocusedChanged: function(n) {
                        return e.handleFocusedChanged("max", n)
                    },
                    config: e.bindFn(e.getMQConfig),
                    getAriaLabel: function() {
                        return e.controller.s("graphing-calculator-narration-cdf-maximum")
                    },
                    getAriaPostLabel: function() {
                        return ""
                    },
                    placeholder: function() {
                        return i.getCDFMaxPlaceholder(e.model)
                    },
                    onUserPressedKey: function(n, t) {
                        return e.handlePressedKey(n, t, "max")
                    },
                    onUserChangedLatex: e.bindFn(e.updateCDFMax),
                    onExpressionSizeExceeded: function() {
                        return e.controller.dispatch({
                            type: "expression-size-exceeded"
                        })
                    },
                    capExpressionSize: function() {
                        return e.model.controller.getCapExpressionSize()
                    },
                    needsSystemKeypad: function() {
                        return !e.controller.isKeypadEnabled()
                    }
                })), t.createElement(p, {
                    predicate: e.bindFn(e.showEvaluation)
                }, function() {
                    return t.createElement("div", {
                        class: t.const("dcg-cdf-evaluation-container")
                    }, t.createElement(a.default, {
                        val: function() {
                            return i.getCDFEvaluation(e.model)
                        },
                        controller: e.props.controller,
                        dependent: e.const(""),
                        id: function() {
                            return e.model.id
                        },
                        focusable: e.const(!0)
                    }))
                }))
            }))
        }
        ,
        f.prototype.handleBraillePressedKey = function(e, n) {
            var t = r.lookup(e);
            t && this.handlePressedKey(t, o.Event(e), n)
        }
        ,
        f.prototype.handlePressedKey = function(e, n, t) {
            if ("Esc" !== e) {
                if ("Enter" === e)
                    return this.controller.dispatch({
                        type: "on-special-key-pressed",
                        key: "Enter"
                    });
                var o = l.default.getFocusedMathquill();
                o && (o.keystroke(e, n),
                "min" === t && i.getCDFMin(this.model) !== o.latex() && this.updateCDFMin(o.latex()),
                "max" === t && i.getCDFMax(this.model) !== o.latex() && this.updateCDFMax(o.latex()))
            } else
                this.controller.dispatch({
                    type: "set-focus-location",
                    location: void 0
                })
        }
        ,
        f.prototype.updateCDFMax = function(e) {
            this.controller.dispatch({
                type: "set-cdf-max",
                id: this.model.id,
                latex: e
            })
        }
        ,
        f.prototype.updateCDFMin = function(e) {
            this.controller.dispatch({
                type: "set-cdf-min",
                id: this.model.id,
                latex: e
            })
        }
        ,
        f.prototype.showEvaluation = function() {
            return !!i.isCDFMaxValid(this.model) && !!i.isCDFMinValid(this.model)
        }
        ,
        f.prototype.isInputFocused = function(e) {
            var n = this.controller.getFocusLocation();
            return !(!n || "cdf-limit" !== n.type || n.id !== this.id) && n.location === e
        }
        ,
        f.prototype.handleFocusedChanged = function(e, n) {
            n ? this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "cdf-limit",
                    id: this.id,
                    location: e
                }
            }) : this.controller.dispatch({
                type: "blur-focus-location",
                location: {
                    type: "cdf-limit",
                    id: this.id,
                    location: e
                }
            })
        }
        ,
        f.prototype.getMQConfig = function() {
            return {
                autoOperatorNames: c.getAutoOperators({})
            }
        }
        ,
        f
    }(t.Class);
    e.default = f
});


define('expressions/domain_view', ["require", "exports", "tslib", "dcgview", "jquery", "keys", "dcgview-helpers/static-mathquill-view", "dcgview-helpers/mathquill-view", "graphing-calc/models/expression", "core/lib/label", "bugsnag", "main/mathquill-operators", "../shared-components/mathquill-braille-wrapper", "./expression_view", "loadcss!domain"], function(require, e, t, n, i, o, a, r, s, l, c, d, u, p) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var h = function(e) {
        function h() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(h, e),
        h.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id
        }
        ,
        h.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("dcg-domain dcg-do-blur"),
                handleEvent: n.const("true")
            }, n.createElement("div", {
                class: n.const("dcg-display-domain dcg-mq-underline-container dcg-do-blur"),
                handleEvent: n.const("true")
            }, n.createElement("div", {
                class: n.const("dcg-editable-mathquill-container")
            }, n.createElement(u.default, t.__assign({
                latex: function() {
                    return e.getMinLatex()
                },
                ariaLabel: function() {
                    return e.controller.raw("dmin")
                },
                placeholder: function() {
                    return l.value(s.getDomainMin(e.model)).string
                },
                brailleShouldFocus: function() {
                    return "min" === e.getFocusedInput()
                },
                selectOnFocus: this.const(!0),
                onBrailleInput: function(t) {
                    return e.dispatchMinLatexIfChanged(t)
                },
                hasError: function() {
                    return !s.isDomainMinValid(e.model)
                },
                onBrailleFocusedChanged: function(t) {
                    return e.handleFocusedChanged("min", t)
                },
                onBrailleKeydown: function(t) {
                    return e.handleBrailleKeydown("min", t)
                },
                dataLabelAttributeValue: this.const("domain-min")
            }, p.getBrailleWrapperProps(this.props.controller())), n.createElement(r.default, {
                latex: function() {
                    return e.getMinLatex()
                },
                placeholder: function() {
                    return l.value(s.getDomainMin(e.model)).string
                },
                isFocused: function() {
                    return "min" === e.getFocusedInput()
                },
                capExpressionSize: function() {
                    return e.controller.getCapExpressionSize()
                },
                selectOnFocus: this.const(!0),
                config: this.bindFn(this.getMQConfig),
                getAriaLabel: function() {
                    return e.controller.s("graphing-calculator-narration-domain-minimum")
                },
                getAriaPostLabel: this.const(""),
                hasError: function() {
                    return !s.isDomainMinValid(e.model)
                },
                onUserPressedKey: function(t, n) {
                    e.handlePressedKey("min", t, n)
                },
                onUserChangedLatex: function(t) {
                    return e.dispatchMinLatexIfChanged(t)
                },
                onExpressionSizeExceeded: function() {
                    return e.controller.dispatch({
                        type: "expression-size-exceeded"
                    })
                },
                onFocusedChanged: function(t) {
                    return e.handleFocusedChanged("min", t)
                },
                dataLabelAttributeValue: this.const("domain-min"),
                needsSystemKeypad: function() {
                    return !e.controller.isKeypadEnabled()
                }
            })), n.createElement("span", {
                class: n.const("dcg-interval-interior")
            }, n.createElement(a.default, {
                latex: function() {
                    return e.getDomainVariableLatex()
                },
                config: this.const({})
            }, n.createElement("span", null))), n.createElement(u.default, t.__assign({
                latex: function() {
                    return e.getMaxLatex()
                },
                ariaLabel: function() {
                    return e.controller.raw("dmax")
                },
                placeholder: function() {
                    return l.value(s.getDomainMax(e.model)).string
                },
                brailleShouldFocus: function() {
                    return "max" === e.getFocusedInput()
                },
                selectOnFocus: this.const(!0),
                onBrailleInput: function(t) {
                    return e.dispatchMaxLatexIfChanged(t)
                },
                hasError: function() {
                    return !s.isDomainMaxValid(e.model)
                },
                onBrailleFocusedChanged: function(t) {
                    return e.handleFocusedChanged("max", t)
                },
                onBrailleKeydown: function(t) {
                    return e.handleBrailleKeydown("max", t)
                },
                dataLabelAttributeValue: this.const("domain-max")
            }, p.getBrailleWrapperProps(this.props.controller())), n.createElement(r.default, {
                latex: function() {
                    return e.getMaxLatex()
                },
                placeholder: function() {
                    return l.value(s.getDomainMax(e.model)).string
                },
                isFocused: function() {
                    return "max" === e.getFocusedInput()
                },
                capExpressionSize: function() {
                    return e.controller.getCapExpressionSize()
                },
                selectOnFocus: this.const(!0),
                config: this.bindFn(this.getMQConfig),
                getAriaLabel: function() {
                    return e.controller.s("graphing-calculator-narration-domain-maximum")
                },
                getAriaPostLabel: this.const(""),
                hasError: function() {
                    return !s.isDomainMaxValid(e.model)
                },
                onUserPressedKey: function(t, n) {
                    e.handlePressedKey("max", t, n)
                },
                onUserChangedLatex: function(t) {
                    return e.dispatchMaxLatexIfChanged(t)
                },
                onExpressionSizeExceeded: function() {
                    return e.controller.dispatch({
                        type: "expression-size-exceeded"
                    })
                },
                onFocusedChanged: function(t) {
                    return e.handleFocusedChanged("max", t)
                },
                dataLabelAttributeValue: this.const("domain-max"),
                needsSystemKeypad: function() {
                    return !e.controller.isKeypadEnabled()
                }
            })))))
        }
        ,
        h.prototype.handleBrailleKeydown = function(e, t) {
            var n = o.lookup(t);
            n && this.handlePressedKey(e, n, i.Event(t))
        }
        ,
        h.prototype.handlePressedKey = function(e, t, n) {
            if (!this.controller.isInEditListMode()) {
                if ("Esc" === t)
                    return void this.controller.dispatch({
                        type: "set-focus-location",
                        location: void 0
                    });
                if ("Enter" === t)
                    return this.controller.dispatch({
                        type: "on-special-key-pressed",
                        key: "Enter"
                    })
            }
            var o = r.default.getFocusedMathquill()
              , a = u.getFocusedBrailleElement();
            "Left" !== t && "Right" !== t && "Down" !== t && "Up" !== t ? o && (o.keystroke(t, n),
            "min" === e ? this.dispatchMinLatexIfChanged(o.latex()) : "max" === e && this.dispatchMaxLatexIfChanged(o.latex())) : (o ? r.default.applyArrowKeyAndReturnIfWasAtBounds(o, t, n) : !(!a || !(0 === a.selectionStart && "Left" === t || a.selectionStart === i(a).val().length && "Right" === t || "Up" === t || "Down" === t))) && (n && n.preventDefault(),
            "Left" === t ? "max" === e && this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "domain-limit",
                    id: this.model.id,
                    location: "min"
                }
            }) : "Right" === t ? "min" === e && this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "domain-limit",
                    id: this.model.id,
                    location: "max"
                }
            }) : "Down" === t ? this.controller.dispatch({
                type: "on-special-key-pressed",
                key: "Down"
            }) : "Up" === t && this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "expression",
                    id: this.model.id
                }
            }))
        }
        ,
        h.prototype.handleFocusedChanged = function(e, t) {
            t ? this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "domain-limit",
                    id: this.id,
                    location: e
                }
            }) : this.controller.dispatch({
                type: "blur-focus-location",
                location: {
                    type: "domain-limit",
                    id: this.id,
                    location: e
                }
            })
        }
        ,
        h.prototype.dispatchMinLatexIfChanged = function(e) {
            if (this.getMinLatex() !== e) {
                var t = this.getDomainType();
                if ("unknown" === t)
                    return void c.notify("DomainView is in use for a non-parametric, non-polar expression", {
                        severity: "error",
                        metaData: {
                            expression: s.getState(this.model, {
                                stripDefaults: !0
                            })
                        }
                    });
                this.controller.dispatch("polar" === t ? {
                    type: "set-polar-domain-minlatex",
                    id: this.id,
                    latex: e
                } : {
                    type: "set-parametric-domain-minlatex",
                    id: this.id,
                    latex: e
                })
            }
        }
        ,
        h.prototype.dispatchMaxLatexIfChanged = function(e) {
            if (this.getMaxLatex() !== e) {
                var t = this.getDomainType();
                if ("unknown" === t)
                    return void c.notify("DomainView is in use for a non-parametric, non-polar expression", {
                        severity: "error",
                        metaData: {
                            expression: s.getState(this.model, {
                                stripDefaults: !0
                            })
                        }
                    });
                this.controller.dispatch("polar" === t ? {
                    type: "set-polar-domain-maxlatex",
                    id: this.id,
                    latex: e
                } : {
                    type: "set-parametric-domain-maxlatex",
                    id: this.id,
                    latex: e
                })
            }
        }
        ,
        h.prototype.getFocusedInput = function() {
            var e = this.controller.getFocusLocation();
            if (e && "domain-limit" === e.type && e.id === this.id)
                return e.location
        }
        ,
        h.prototype.getMinLatex = function() {
            switch (this.getDomainType()) {
            case "parametric":
                return s.getParametricDomainMin(this.model);
            case "polar":
                return s.getPolarDomainMin(this.model);
            default:
                return ""
            }
        }
        ,
        h.prototype.getMaxLatex = function() {
            switch (this.getDomainType()) {
            case "parametric":
                return s.getParametricDomainMax(this.model);
            case "polar":
                return s.getPolarDomainMax(this.model);
            default:
                return ""
            }
        }
        ,
        h.prototype.getDomainVariableLatex = function() {
            switch (this.getDomainType()) {
            case "parametric":
                return "\\le t \\le";
            case "polar":
                return "\\le \\theta \\le";
            default:
                return ""
            }
        }
        ,
        h.prototype.getDomainType = function() {
            return s.isPolar(this.model) ? "polar" : s.isParametric(this.model) ? "parametric" : "unknown"
        }
        ,
        h.prototype.getMQConfig = function() {
            return {
                autoOperatorNames: d.getAutoOperators({})
            }
        }
        ,
        h
    }(n.Class);
    e.default = h
});

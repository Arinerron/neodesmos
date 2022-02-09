define('basic/expression-view', ["require", "exports", "tslib", "keys", "core/lib/label", "dcgview", "lib/i18n", "jquery", "dcgview-helpers/static-mathquill-view", "dcgview-helpers/mathquill-view", "./dcgview-basic", "abraham", "../shared-components/tooltip", "../lib/abraham-helpers", "main/mathquill-operators", "../shared-components/braille-input", "../core/lib/count-latex-tokens", "loadcss!Abraham", "loadcss!./expression-view"], function(require, t, e, n, i, o, r, a, s, l, c, u, d, p, h, g, f) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var y = o.Components
      , E = y.If
      , v = y.Input
      , b = y.Textarea
      , m = function(t) {
        function c() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(c, t),
        c.prototype.getAriaLabel = function() {
            var t = this.getIndex() + 1 + "";
            return this.s("shared-calculator-narration-expression-index", {
                index: t
            })
        }
        ,
        c.prototype.didUpdate = function() {
            this.renderAnsValue()
        }
        ,
        c.prototype.didMountMQ = function(t) {
            this.$mq = a(t)
        }
        ,
        c.prototype.getExp = function() {
            return this.model.getExpressionById(this.props.id())
        }
        ,
        c.prototype.getAns = function() {
            return this.model.getExpressionAns(this.props.id())
        }
        ,
        c.prototype.getAnsId = function() {
            return this.model.getExpressionAnsId(this.props.id())
        }
        ,
        c.prototype.getLatex = function() {
            return this.getExp().latex
        }
        ,
        c.prototype.getValue = function() {
            return this.model.getExpressionValue(this.props.id())
        }
        ,
        c.prototype.getBraille = function() {
            var t = this.getExp().braille;
            if ("" !== t)
                return t;
            var e = p.latexToBraille(this.getLatex(), this.controller.getBrailleMode());
            return e.isError ? "" : u.UnicodeBraille.toExpandedBrailleAscii(e.value)
        }
        ,
        c.prototype.getIndex = function() {
            return this.model.getExpressionIndex(this.props.id())
        }
        ,
        c.prototype.getShowEvaluation = function() {
            return this.model.shouldShowEvaluationForExpression(this.props.id())
        }
        ,
        c.prototype.isFractionEvaluation = function() {
            return this.getExp().displayAsFraction
        }
        ,
        c.prototype.canDisplayEvaluationAsFraction = function() {
            return this.controller.getDecimalToFraction() && this.model.canDisplayEvaluationAsFraction(this.props.id())
        }
        ,
        c.prototype.shouldDisplayEvaluationAsFraction = function() {
            return this.canDisplayEvaluationAsFraction() && this.getExp().displayAsFraction
        }
        ,
        c.prototype.toggleFractionEvaluation = function() {
            this.dispatch({
                type: "toggle-fraction-evaluation",
                id: this.props.id()
            })
        }
        ,
        c.prototype.getFractionDisplayAriaLabel = function() {
            return this.shouldDisplayEvaluationAsFraction() ? this.controller.s("basic-calculator-narration-convert-to-decimal") : this.controller.s("basic-calculator-narration-convert-to-fraction")
        }
        ,
        c.prototype.getError = function() {
            var t = this.model.getExpressionError(this.props.id());
            return t && this.getLatex().length > 0 ? r.unpack(t, this.controller.getLanguage()) : ""
        }
        ,
        c.prototype.showError = function() {
            return !!this.getError()
        }
        ,
        c.prototype.getFractionMessage = function() {
            return this.shouldDisplayEvaluationAsFraction() ? this.s("basic-calculator-label-convert-to-decimal") : this.s("basic-calculator-label-convert-to-fraction")
        }
        ,
        c.prototype.getIsFocused = function() {
            return !this.controller.isSettingsMenuOpen() && this.model.isExpressionFocused(this.props.id())
        }
        ,
        c.prototype.onFocusedChanged = function(t) {
            this.getExp() && (t ? this.dispatch({
                type: "focusin",
                id: this.props.id()
            }) : this.dispatch({
                type: "focusout",
                id: this.props.id()
            }))
        }
        ,
        c.prototype.onMQReflow = function() {
            this.renderedAnsData = void 0,
            this.renderAnsValue()
        }
        ,
        c.prototype.renderAnsValue = function() {
            var t = this;
            if (this.$mq) {
                var e = this.getAns()
                  , n = !1
                  , o = this.getAnsId();
                if (o) {
                    var r = this.model.getExpressionById(o);
                    n = r && r.displayAsFraction
                }
                this.renderedAnsData && this.renderedAnsData.value == e && this.renderedAnsData.displayAsFraction === n || (this.renderedAnsData = {
                    value: e,
                    displayAsFraction: n
                },
                this.$mq.find(".dcg-mq-ans").each(function(o, r) {
                    var s, l = a(r);
                    "number" == typeof e ? s = i.truncatedHTMLLabel(e, {
                        digits: t.getEvaluationDigits(),
                        bigCutoff: 1e9,
                        displayAsFraction: n
                    }) : "string" == typeof e && (s = e),
                    s ? l.removeClass("dcg-invalid").html(s) : l.addClass("dcg-invalid").html('<i class="dcg-icon-error"></i>')
                }))
            }
        }
        ,
        c.prototype.getEvaluationLatex = function() {
            var t = this.getValue();
            if (void 0 === t && (t = NaN),
            this.model.isRationalizableConstant(this.props.id()) && !this.shouldDisplayEvaluationAsFraction())
                return "";
            if (!Array.isArray(t)) {
                var e = i.truncatedLatexLabel(t, {
                    digits: this.getEvaluationDigits(),
                    bigCutoff: 1e9,
                    displayAsFraction: this.shouldDisplayEvaluationAsFraction()
                });
                return "undefined" === e ? "=\\mathrm{undefined}" : "=" + e
            }
            return "\\mathrm{" + t.length + "\\ element\\ list}"
        }
        ,
        c.prototype.getEvaluationBraille = function() {
            var t = this.getEvaluationLatex()
              , e = p.latexToBraille(t, this.controller.getBrailleMode());
            return e.isError ? "" : u.UnicodeBraille.toExpandedBrailleAscii(e.value)
        }
        ,
        c.prototype.didMountBrailleInput = function(t) {
            this.brailleInputNode = t
        }
        ,
        c.prototype.didUnmountBrailleInput = function() {
            this.brailleInputNode = void 0
        }
        ,
        c.prototype.handleBrailleFocus = function(t) {
            var e = t.target;
            e && setTimeout(function() {
                e.setSelectionRange(0, 0)
            })
        }
        ,
        c.prototype.handleBrailleKeydown = function(t) {
            t.altKey || t.ctrlKey || t.metaKey || t.shiftKey || (n.lookup(t) === n.UP ? (this.forceModelFocus(),
            this.dispatch({
                type: "focus-prev-expression"
            }),
            t.preventDefault()) : n.lookup(t) === n.DOWN ? (this.forceModelFocus(),
            this.dispatch({
                type: "focus-next-expression"
            }),
            t.preventDefault()) : n.lookup(t) === n.ENTER ? (this.forceModelFocus(),
            this.dispatch({
                type: "insert-blank-expression"
            }),
            t.preventDefault()) : n.lookup(t) === n.BACKSPACE && document.activeElement === this.brailleInputNode && "" === this.getBraille() && (this.dispatch({
                type: "backspace-from-braille"
            }),
            t.preventDefault()))
        }
        ,
        c.prototype.forceModelFocus = function() {
            document.activeElement !== this.brailleInputNode && this.onFocusedChanged(!0)
        }
        ,
        c.prototype.focusBrailleInput = function() {
            this.brailleInputNode && document.activeElement !== this.brailleInputNode && this.brailleInputNode.focus()
        }
        ,
        c.prototype.getPostLabel = function() {
            if (this.showError())
                return this.getError();
            if (this.getShowEvaluation()) {
                var t = this.getValue();
                return void 0 === t && (t = NaN),
                Array.isArray(t) ? t.length + " element list" : "equals " + i.truncatedAriaLabel(t, {
                    digits: this.getEvaluationDigits(),
                    bigCutoff: 1e9,
                    displayAsFraction: this.shouldDisplayEvaluationAsFraction()
                })
            }
            return ""
        }
        ,
        c.prototype.onBrailleInput = function(t) {
            this.controller.isSettingsMenuOpen() && this.controller.dispatch({
                type: "close-settings-menu"
            });
            var e = p.brailleToLatex(u.UnicodeBraille.coerceToSixDotCells(t), this.controller.getBrailleMode())
              , n = e.isError ? "" : e.value;
            (!this.controller.getCapExpressionSize() || f.countLatexTokens(n) <= l.EXPRESSION_TOKEN_LIMIT) && this.controller.dispatch({
                type: "update-latex-from-braille",
                latex: n,
                braille: t,
                id: this.props.id()
            })
        }
        ,
        c.prototype.getIndexSubscript = function() {
            return "_{" + (this.getIndex() + 1) + "}"
        }
        ,
        c.prototype.getEvaluationDigits = function() {
            return this.controller.isScientificCalc() ? 10 : 7
        }
        ,
        c.prototype.onMountContainer = function(t) {
            this.containerNode = t
        }
        ,
        c.prototype.onTapContainer = function(t) {
            t.target !== this.containerNode || this.getShowEvaluation() || this.showError() || this.forceModelFocus()
        }
        ,
        c.prototype.template = function() {
            var t = this;
            return o.createElement("div", {
                class: function() {
                    return {
                        "dcg-basic-expression": !0,
                        "dcg-focused": t.getIsFocused(),
                        "dcg-braille-io": t.controller.renderAsBraille()
                    }
                },
                onTap: this.bindFn(this.onTapContainer),
                onMount: this.bindFn(this.onMountContainer)
            }, o.createElement(E, {
                predicate: function() {
                    return t.controller.renderAsBraille()
                }
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-braille-input")
                }, o.createElement(g.default, {
                    ariaLabel: function() {
                        var e = p.latexToBraille("eq" + t.getIndexSubscript(), t.controller.getBrailleMode());
                        return e.isError ? "" : u.UnicodeBraille.toExpandedBrailleAscii(e.value)
                    },
                    didMount: t.bindFn(t.didMountBrailleInput),
                    didUnmount: t.bindFn(t.didUnmountBrailleInput),
                    onFocusedChanged: t.bindFn(t.onFocusedChanged),
                    shouldFocus: t.bindFn(t.getIsFocused),
                    onKeydown: t.bindFn(t.handleBrailleKeydown),
                    onInput: t.bindFn(t.onBrailleInput),
                    sixKeyInput: function() {
                        return t.controller.getSixKeyInput()
                    },
                    value: function() {
                        return t.getBraille()
                    },
                    isStatic: t.const(!1)
                }))
            }), o.createElement(E, {
                predicate: function() {
                    return t.controller.renderAsBraille()
                }
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-braille-evaluation-container")
                }, o.createElement(E, {
                    predicate: function() {
                        return t.getShowEvaluation()
                    }
                }, function() {
                    return o.createElement("div", {
                        class: o.const("dcg-braille-evaluation")
                    }, o.createElement(v, {
                        readonly: t.const("true"),
                        class: t.const("dcg-braille-evaluation-inner"),
                        value: function() {
                            return t.getEvaluationBraille()
                        },
                        onFocus: t.bindFn(t.handleBrailleFocus),
                        onKeydown: t.bindFn(t.handleBrailleKeydown),
                        onInput: function() {}
                    }))
                }), o.createElement(E, {
                    predicate: function() {
                        return t.showError()
                    }
                }, function() {
                    return o.createElement("div", {
                        class: o.const("dcg-braille-error")
                    }, o.createElement("div", {
                        class: o.const("dcg-basic-expression-error")
                    }, o.createElement("i", {
                        class: o.const("dcg-icon-error")
                    })), o.createElement(b, {
                        readonly: t.const("true"),
                        class: t.const("dcg-braille-error-inner"),
                        value: function() {
                            return t.getError()
                        },
                        onFocus: t.bindFn(t.handleBrailleFocus),
                        onKeydown: t.bindFn(t.handleBrailleKeydown),
                        onInput: function() {}
                    }))
                }))
            }), o.createElement(E, {
                predicate: function() {
                    return t.controller.renderAsBraille()
                }
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-exp-mathquill-container"),
                    didMount: t.bindFn(t.didMountMQ),
                    onTap: t.bindFn(t.forceModelFocus)
                }, o.createElement(s.default, {
                    latex: function() {
                        return t.getLatex()
                    },
                    config: t.const({}),
                    onReflow: t.bindFn(t.onMQReflow)
                }))
            }), o.createElement(E, {
                predicate: function() {
                    return !t.controller.renderAsBraille()
                }
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-exp-mathquill-container"),
                    didMount: t.bindFn(t.didMountMQ)
                }, o.createElement(l.default, {
                    latex: function() {
                        return t.getLatex()
                    },
                    onReflow: t.bindFn(t.onMQReflow),
                    isFocused: t.bindFn(t.getIsFocused),
                    capExpressionSize: function() {
                        return t.controller.getCapExpressionSize()
                    },
                    config: t.bindFn(t.getMQConfig),
                    getAriaLabel: function() {
                        return t.getAriaLabel()
                    },
                    getAriaPostLabel: function() {
                        return t.getPostLabel()
                    },
                    hasError: function() {
                        return !1
                    },
                    onUserPressedKey: function(e, n) {
                        t.controller.isSettingsMenuOpen() && t.controller.dispatch({
                            type: "close-settings-menu"
                        }),
                        t.dispatch({
                            type: "keypad/press-key",
                            key: e,
                            evt: n
                        })
                    },
                    onUserTypedText: function(e) {
                        return t.dispatch({
                            type: "keypad/type-text",
                            text: e
                        })
                    },
                    onUserChangedLatex: function(e) {
                        t.dispatch({
                            type: "update-latex",
                            id: t.props.id(),
                            latex: e
                        })
                    },
                    onFocusedChanged: t.bindFn(t.onFocusedChanged),
                    disableSpace: function() {
                        return t.controller.getRestrictedEditing()
                    }
                }))
            }), o.createElement("div", {
                class: o.const("dcg-exp-output-container")
            }, o.createElement(E, {
                predicate: function() {
                    return t.showError() && !t.controller.renderAsBraille()
                }
            }, function() {
                return o.createElement(d.Tooltip, {
                    tooltip: t.bindFn(t.getError),
                    gravity: t.const("w"),
                    sticky: t.const(!0)
                }, o.createElement("div", {
                    class: o.const("dcg-basic-expression-error")
                }, o.createElement("i", {
                    class: o.const("dcg-icon-error")
                })))
            }), o.createElement(E, {
                predicate: function() {
                    return t.getShowEvaluation()
                }
            }, function() {
                return o.createElement("div", {
                    class: function() {
                        return {
                            "dcg-basic-expression-value": !0,
                            "dcg-basic-evaluation-gray": Array.isArray(t.getValue())
                        }
                    }
                }, o.createElement(s.default, {
                    config: t.const({}),
                    latex: function() {
                        return t.getEvaluationLatex()
                    }
                }), o.createElement(E, {
                    predicate: t.bindFn(t.canDisplayEvaluationAsFraction)
                }, function() {
                    return o.createElement(d.Tooltip, {
                        tooltip: t.bindFn(t.getFractionMessage),
                        gravity: t.const("sw")
                    }, o.createElement("span", {
                        role: o.const("button"),
                        tabindex: o.const("0"),
                        "aria-label": t.bindFn(t.getFractionDisplayAriaLabel),
                        class: function() {
                            return {
                                "dcg-basic-fraction-toggle": !0,
                                "dcg-selected": t.isFractionEvaluation()
                            }
                        },
                        onTap: t.bindFn(t.toggleFractionEvaluation)
                    }, o.createElement("i", {
                        class: o.const("dcg-icon-fraction")
                    })))
                }))
            })))
        }
        ,
        c.prototype.getMQConfig = function() {
            var t = this.controller
              , e = t.getAdditionalFunctions()
              , n = t.isFourFunctionCalc() && (!e || -1 === e.indexOf("fraction"));
            return {
                typingAsteriskWritesTimesSymbol: t.getTypingAsteriskWritesTimesSymbol(),
                typingSlashWritesDivisionSymbol: t.getTypingSlashWritesDivisionSymbol(),
                disableCopyPaste: t.getRestrictedEditing(),
                autoCommands: h.getAutoCommands({
                    disallowFrac: n
                })
            }
        }
        ,
        c
    }(c.DCGViewBasic);
    t.default = m
});

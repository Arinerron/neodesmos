define('expressions/expression_view', ["require", "exports", "config", "tslib", "browser", "keys", "jquery", "./abstract-item-view", "dcgview-helpers/mathquill-view", "dcgview-helpers/static-mathquill-view", "lib/conditional_blur", "./expression-icon-view", "./evaluation-view", "expressions/unresolved_view", "expressions/domain_view", "expressions/regression_view", "expressions/slider_view", "expressions/promptslider_view", "expressions/label_view", "expressions/distribution_parameters_view", "expressions/visualization_parameters_view", "expressions/ttest_footer_view", "expressions/stats_footer_view", "expressions/action-info-view", "graphing-calc/models/expression", "core/lib/label", "./expression-edit-actions", "./suggested-zoom-view", "dcgview", "main/manage-focus-helper", "main/mathquill-operators", "../shared-components/mathquill-braille-wrapper", "jquery.handleevent", "loadcss!./expression-footer"], function(require, e, t, o, r, n, i, l, s, a, c, d, u, p, h, m, f, g, y, b, v, x, E, w, S, F, _, L, M, I, B, T) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getBrailleWrapperProps = void 0;
    var A = M.Components
      , D = A.If
      , k = A.SwitchUnion
      , C = function(e) {
        function l() {
            return null !== e && e.apply(this, arguments) || this
        }
        return o.__extends(l, e),
        l.prototype.didMount = function() {
            this.onItemViewMounted(),
            this.lastBrailleMode = this.controller.getBrailleMode()
        }
        ,
        l.prototype.didMountRootNode = function(e) {
            this.rootNode = e
        }
        ,
        l.prototype.willUnmount = function() {
            this.onItemViewUnmounted()
        }
        ,
        l.prototype.template = function() {
            var e = this;
            return M.createElement("div", {
                class: function() {
                    return {
                        "dcg-do-not-blur": !0,
                        "dcg-expressionitem": !0,
                        "dcg-mathitem": !0,
                        "dcg-inFolder": !!e.model.folderId,
                        "dcg-selected": e.controller.isItemSelected(e.id) && !e.controller.isInEditListMode(),
                        "dcg-dragging": !!e.controller.isItemBeingDragged(e.id),
                        "dcg-hasSlider": e.hasSlider(),
                        "dcg-hasEvaluation": e.controller.shouldShowEvaluationForItem(e.id),
                        "dcg-hasRegression": e.hasRegression(),
                        "dcg-hasDomain": e.hasDomain()
                    }
                },
                "expr-id": function() {
                    return e.model.id
                },
                didMount: this.bindFn(this.didMountRootNode)
            }, M.createElement("div", {
                class: M.const("dcg-fade-container"),
                onTapStart: this.bindFn(this.onMouseSelect),
                onTap: this.bindFn(this.onMouseSelect)
            }, M.createElement("div", {
                class: M.const("dcg-main")
            }, M.createElement(D, {
                predicate: function() {
                    return !e.controller.isInEditListMode()
                }
            }, function() {
                return M.createElement(T.default, o.__assign({
                    latex: function() {
                        return S.getDisplayLatex(e.model)
                    },
                    ariaLabel: function() {
                        return e.getAriaLabel("braille")
                    },
                    brailleShouldFocus: function() {
                        return e.isFocused()
                    },
                    onBrailleInput: function(t) {
                        return e.handleLatexChanged(t)
                    },
                    onBrailleFocusedChanged: function(t, o) {
                        return e.handleMQFocusedChanged(t, o)
                    },
                    onBrailleKeydown: e.bindFn(e.handleBraillePressedKey)
                }, P(e.controller)), M.createElement(s.default, {
                    latex: function() {
                        return S.getDisplayLatex(e.model)
                    },
                    getAriaLabel: function() {
                        return e.getAriaLabel("speech")
                    },
                    getAriaPostLabel: e.bindFn(e.getFormulaAria),
                    isFocused: function() {
                        return e.isFocused()
                    },
                    capExpressionSize: function() {
                        return e.controller.getCapExpressionSize()
                    },
                    config: e.bindFn(e.getMQConfig),
                    hasError: e.const(!1),
                    onUserPressedKey: function(t, o) {
                        return e.handlePressedKey(t, o)
                    },
                    onUserChangedLatex: function(t) {
                        return e.handleLatexChanged(t)
                    },
                    onExpressionSizeExceeded: function() {
                        return e.controller.dispatch({
                            type: "expression-size-exceeded"
                        })
                    },
                    onFocusedChanged: function(t, o) {
                        return e.handleMQFocusedChanged(t, o)
                    },
                    needsSystemKeypad: function() {
                        return !e.controller.isKeypadEnabled()
                    }
                }, M.createElement("div", {
                    class: M.const("dcg-expression-mathquill")
                })))
            }), M.createElement(D, {
                predicate: function() {
                    return e.controller.isInEditListMode()
                }
            }, function() {
                return M.createElement("div", {
                    class: M.const("dcg-edit-list-mathquill"),
                    tabindex: function() {
                        return "none" === e.controller.getBrailleMode() ? "0" : "-1"
                    },
                    onTap: e.bindFn(e.exitEditListMode),
                    manageFocus: e.const({
                        shouldBeFocused: function() {
                            return "none" === e.controller.getBrailleMode() && I.defaultShouldBeFocused({
                                controller: e.controller,
                                location: {
                                    type: "readonly-expression",
                                    id: e.model.id
                                }
                            })
                        },
                        onFocusedChanged: function(t) {
                            "none" === e.controller.getBrailleMode() && (t ? e.controller.dispatch({
                                type: "set-focus-location",
                                location: {
                                    type: "readonly-expression",
                                    id: e.model.id
                                }
                            }) : e.controller.dispatch({
                                type: "blur-focus-location",
                                location: {
                                    type: "readonly-expression",
                                    id: e.model.id
                                }
                            }))
                        }
                    })
                }, M.createElement(T.default, o.__assign({
                    latex: function() {
                        return S.getDisplayLatex(e.model)
                    },
                    ariaLabel: function() {
                        return e.getAriaLabel("braille")
                    },
                    isStatic: e.const(!0),
                    brailleShouldFocus: function() {
                        var t = e.controller.getFocusLocation();
                        return !!t && ("readonly-expression" === t.type && t.id === e.id)
                    },
                    onBrailleFocusedChanged: function(t) {
                        t ? e.controller.dispatch({
                            type: "set-focus-location",
                            location: {
                                type: "readonly-expression",
                                id: e.model.id
                            }
                        }) : e.controller.dispatch({
                            type: "blur-focus-location",
                            location: {
                                type: "readonly-expression",
                                id: e.model.id
                            }
                        })
                    }
                }, P(e.controller)), M.createElement(a.default, {
                    latex: function() {
                        return S.getDisplayLatex(e.model)
                    },
                    config: e.bindFn(e.getMQConfig),
                    getAriaLabel: function() {
                        return e.getAriaLabel("speech")
                    }
                })))
            })), M.createElement("i", {
                class: M.const("dcg-icon-remove dcg-top-level-delete"),
                handleEvent: M.const("true"),
                onTap: this.bindFn(this.onDelete)
            }), M.createElement(D, {
                predicate: this.bindFn(this.shouldShowFooter)
            }, function() {
                return M.createElement("div", {
                    class: e.getFooterClass()
                }, k(function() {
                    return e.getFooterType()
                }, {
                    none: function() {},
                    regression: function() {
                        return M.createElement(m.default, {
                            model: e.props.model,
                            controller: e.props.controller
                        })
                    },
                    label: function() {
                        return M.createElement(y.default, {
                            model: e.props.model,
                            controller: e.props.controller
                        })
                    },
                    slider: function() {
                        return M.createElement(f.default, {
                            model: e.props.model,
                            controller: e.props.controller
                        })
                    },
                    domain: function() {
                        return M.createElement(h.default, {
                            model: e.props.model,
                            controller: e.props.controller
                        })
                    },
                    evaluation: function() {
                        return M.createElement(u.default, {
                            id: function() {
                                return e.props.model().id
                            },
                            dependent: function() {
                                return S.getAssignment(e.model) || ""
                            },
                            val: function() {
                                return e.controller.getEvaluationValueForItem(e.id)
                            },
                            controller: e.props.controller,
                            focusable: e.const(!1)
                        })
                    },
                    distribution: function() {
                        return M.createElement(b.default, {
                            model: e.props.model,
                            controller: e.props.controller
                        })
                    },
                    visualization: function() {
                        return M.createElement(v.default, {
                            model: e.props.model,
                            controller: e.props.controller
                        })
                    },
                    ttest: function() {
                        return M.createElement(x.default, {
                            model: e.props.model,
                            controller: e.props.controller
                        })
                    },
                    stats: function() {
                        return M.createElement(E.default, {
                            model: e.props.model,
                            controller: e.props.controller
                        })
                    },
                    unresolved: function() {
                        return M.createElement(p.default, {
                            controller: e.props.controller
                        })
                    }
                }), M.createElement(D, {
                    predicate: e.bindFn(e.shouldShowBrailleError)
                }, function() {
                    return M.createElement("div", {
                        tabindex: M.const(0),
                        class: M.const("dcg-expression-braille-error"),
                        role: M.const("button"),
                        "aria-roledescription": M.const("error"),
                        "aria-label": function() {
                            return e.controller.unpack(e.model.error)
                        }
                    }, M.createElement("i", {
                        class: M.const("dcg-icon-error")
                    }), function() {
                        return e.controller.unpack(e.model.error)
                    })
                }), M.createElement(D, {
                    predicate: e.bindFn(e.shouldShowSliderPrompt)
                }, function() {
                    return M.createElement(g.default, {
                        model: e.props.model,
                        controller: e.props.controller
                    })
                }))
            }), M.createElement(D, {
                predicate: this.bindFn(this.shouldShowActionInfo)
            }, function() {
                return M.createElement("div", {
                    class: e.getFooterClass()
                }, M.createElement(w.default, {
                    model: e.props.model,
                    controller: e.props.controller
                }))
            })), M.createElement("span", {
                class: M.const("dcg-tab dcg-action-drag dcg-action-icon-touch"),
                handleevent: M.const("true"),
                tapboundary: M.const("true"),
                disablescroll: M.const("true"),
                style: M.const("touch-action:none"),
                onTapStart: this.bindFn(this.onDragPending)
            }, M.createElement("span", {
                class: M.const("dcg-num")
            }, function() {
                return e.model.displayIndex
            }), M.createElement("div", {
                class: M.const("dcg-tab-interior dcg-action-icon-mouse")
            }, M.createElement(d.default, {
                model: this.props.model,
                controller: this.props.controller
            })), M.createElement(L.SuggestedZoomView, {
                model: this.props.model,
                controller: this.props.controller
            })), M.createElement(_.ExpressionEditActions, {
                controller: this.props.controller,
                id: function() {
                    return e.model.id
                }
            }))
        }
        ,
        l.prototype.didUpdate = function() {
            this.lastBrailleMode = this.controller.getBrailleMode()
        }
        ,
        l.prototype.shouldShowFooter = function() {
            return !!this.shouldShowBrailleError() || (!!this.shouldShowSliderPrompt() || "none" !== this.getFooterType())
        }
        ,
        l.prototype.getFooterType = function() {
            return this.hasRegression() ? "regression" : this.shouldShowLabelView() ? "label" : this.hasSlider() ? "slider" : this.hasDomain() ? "domain" : this.isTTest() ? "ttest" : this.isStats() ? "stats" : this.controller.shouldShowEvaluationForItem(this.id) ? "evaluation" : this.isToplevelDistribution() ? "distribution" : this.isVisualization() ? "visualization" : this.model.unresolved ? "unresolved" : "none"
        }
        ,
        l.prototype.getFooterClass = function() {
            return this.isFirstRender() ? this.const("dcg-expression-bottom dcg-indent-in-folder") : this.const("dcg-expression-bottom dcg-indent-in-folder dcg-fadein-bottom")
        }
        ,
        l.prototype.onCreateSliders = function(e) {
            this.controller.dispatch({
                type: "create-sliders-for-item",
                id: this.id,
                variables: e
            })
        }
        ,
        l.prototype.shouldShowLabelView = function() {
            return t.get("labels") && S.isPointOrPointList(this.model)
        }
        ,
        l.prototype.shouldShowSliderPrompt = function() {
            return !!this.controller.areSlidersEnabled() && S.getMissingVariables(this.model).length > 0
        }
        ,
        l.prototype.shouldShowActionInfo = function() {
            return !!(this.controller.areActionsEnabled() && this.model.clickableInfo && this.model.clickableInfo.enabled && this.model.clickableInfo.latex)
        }
        ,
        l.prototype.shouldShowBrailleError = function() {
            return "none" !== this.controller.getBrailleMode() && this.hasError()
        }
        ,
        l.prototype.hasRegression = function() {
            return !(!this.model.formula || !this.model.formula.is_regression)
        }
        ,
        l.prototype.hasDomain = function() {
            return S.hasDomain(this.model)
        }
        ,
        l.prototype.isToplevelDistribution = function() {
            return S.isToplevelDistribution(this.model)
        }
        ,
        l.prototype.isVisualization = function() {
            return S.isVisualization(this.model)
        }
        ,
        l.prototype.isTTest = function() {
            return S.isTTest(this.model)
        }
        ,
        l.prototype.isStats = function() {
            return S.isStats(this.model)
        }
        ,
        l.prototype.hasSlider = function() {
            return !!this.model.sliderExists
        }
        ,
        l.prototype.getLabelOptions = function() {
            return this.controller.getEvaluationLabelOptionsForItem(this.model.id)
        }
        ,
        l.prototype.getAriaLabel = function(e) {
            var t;
            return this.shouldShowLabelView() ? (t = this.model.label && "" !== this.model.label ? this.model.label : "speech" === e ? this.controller.s("graphing-calculator-narration-expression-label") : this.controller.raw("lbl"),
            this.model.showLabel ? t : "speech" === e ? this.controller.s("graphing-calculator-narration-expression-hidden-label", {
                label: t
            }) : this.controller.raw("h __label__", {
                label: t
            })) : "speech" === e ? this.controller.s("shared-calculator-narration-expression-index", {
                index: this.model.displayIndex
            }) : this.controller.raw("eq__index__", {
                index: this.model.displayIndex
            })
        }
        ,
        l.prototype.getFormulaAria = function() {
            var e = this.model.formula
              , t = "";
            if (!e)
                return t;
            if (S.isEmpty(this.model))
                return t;
            if (this.controller.shouldShowEvaluationForItem(this.id)) {
                t = "equals ";
                var o = e.zero_values && e.zero_values.length ? e.zero_values[0].val : e.constant_value;
                Array.isArray(o) ? t += o.length + " element list." : void 0 !== o && (t += F.truncatedAriaLabel(+o, this.getLabelOptions()))
            } else
                e.error && !this.shouldShowSliderPrompt() ? t = this.controller.unpack(e.error) : S.isToplevelDistribution(this.model) ? t = this.controller.s("graphing-calculator-narration-expression-evaluation-is-distribution") : this.isTTest() && (t = this.controller.s("graphing-calculator-narration-expression-evaluation-is-t-test"));
            if (this.model.shouldGraph && (e.is_graphable || e.is_regression)) {
                e.is_graphable && e.is_regression ? t += " " + this.controller.s("graphing-calculator-narration-expression-evaluation-has-graph-and-regression") : e.is_regression ? t += " " + this.controller.s("graphing-calculator-narration-expression-evaluation-has-regression") : t += " " + this.controller.s("graphing-calculator-narration-expression-evaluation-has-graph");
                var n = this.controller.getAudioGraph();
                n && n.agNavigator.canTrace(this.model) && (r.IS_APPLE ? t += " " + this.controller.s("graphing-calculator-narration-expression-audio-trace-mac") : t += " " + this.controller.s("graphing-calculator-narration-expression-audio-trace-windows"))
            }
            return t
        }
        ,
        l.prototype.handleBraillePressedKey = function(e) {
            var t = n.lookup(e);
            if (t)
                if ("Esc" === t)
                    c.default(),
                    this.hasSlider() && this.controller.dispatch({
                        type: "set-focus-location",
                        location: {
                            type: "slider-thumb",
                            id: this.model.id
                        }
                    });
                else if ("Up" === t || "Down" === t || "Enter" === t)
                    this.controller.dispatch({
                        type: "on-special-key-pressed",
                        key: t
                    });
                else if ("Del" === t || "Backspace" === t) {
                    var o = T.getFocusedBrailleElement();
                    S.isEmpty(this.model) && T.brailleInputIsEmpty(o) && (this.controller.dispatch({
                        type: "on-special-key-pressed",
                        key: "Del" === t ? "Delete" : t
                    }),
                    e.preventDefault(),
                    e.stopPropagation())
                }
        }
        ,
        l.prototype.handlePressedKey = function(e, t) {
            var o = s.default.getFocusedMathquill();
            if (o) {
                if ("Esc" === e)
                    return c.default(),
                    void (this.hasSlider() && this.controller.dispatch({
                        type: "set-focus-location",
                        location: {
                            type: "slider-thumb",
                            id: this.model.id
                        }
                    }));
                if ("Up" === e || "Down" === e)
                    return s.default.applyArrowKeyAndReturnIfWasAtBounds(o, e, t) ? this.controller.dispatch({
                        type: "on-special-key-pressed",
                        key: e
                    }) : void 0;
                if ("Delete" === e || "Backspace" === e) {
                    if (S.isEmpty(this.model))
                        return this.controller.dispatch({
                            type: "on-special-key-pressed",
                            key: e
                        })
                } else if ("Enter" === e)
                    return t && (t.preventDefault(),
                    t.stopPropagation()),
                    this.controller.dispatch({
                        type: "on-special-key-pressed",
                        key: "Enter"
                    });
                o.keystroke(e, t),
                this.handleLatexChanged(o.latex())
            }
        }
        ,
        l.prototype.handleLatexChanged = function(e) {
            e !== this.model.latex && this.controller.dispatch({
                type: "set-item-latex",
                id: this.id,
                latex: e
            })
        }
        ,
        l.prototype.doesNodeBelongToSliderLimit = function(e) {
            return !!e && (!!this.rootNode.contains(e) && !!i(e).closest("[data-dcg-limit]").length)
        }
        ,
        l.prototype.handleMQFocusedChanged = function(e, t) {
            e ? this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "expression",
                    id: this.id
                }
            }) : this.doesNodeBelongToSliderLimit(t.relatedTarget) || this.lastBrailleMode !== this.controller.getBrailleMode() || this.controller.dispatch({
                type: "blur-focus-location",
                location: {
                    type: "expression",
                    id: this.id
                }
            })
        }
        ,
        l.prototype.onMouseSelect = function(e) {
            "keyboard" !== e.device && ("dcg-tap" === e.type && "mouse" === e.device || "dcg-tapstart" === e.type && "touch" === e.device || e.wasHandled() || (e.handle(),
            this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "expression",
                    id: this.id
                }
            })))
        }
        ,
        l.prototype.isFocused = function() {
            var e = this.controller.getFocusLocation();
            return !!e && ("expression" === e.type && e.id === this.id)
        }
        ,
        l.prototype.isSliderThumbFocused = function() {
            var e = this.controller.getFocusLocation();
            return !!e && ("slider-thumb" === e.type && e.id === this.id)
        }
        ,
        l.prototype.hasError = function() {
            return !!this.model.error && !S.isEmpty(this.model)
        }
        ,
        l.prototype.getMQConfig = function() {
            return {
                autoOperatorNames: B.getAutoOperators({})
            }
        }
        ,
        l
    }(l.default);
    function P(e, t) {
        var r = function(e) {
            return M.createElement(a.default, {
                config: function() {
                    return {}
                },
                latex: function() {
                    return e
                }
            })
        };
        return {
            tooltipOptions: function() {
                return o.__assign({
                    latexView: r
                }, t || {})
            },
            sixKeyInput: function() {
                return e.getSixKeyInput()
            },
            mode: function() {
                return e.getBrailleMode()
            },
            capExpressionSize: function() {
                return e.getCapExpressionSize() ? {
                    exceedsLimit: function(e) {
                        return e.length > s.EXPRESSION_TOKEN_LIMIT
                    },
                    onExpressionSizeExceeded: function() {
                        return e.dispatch({
                            type: "expression-size-exceeded"
                        })
                    }
                } : void 0
            }
        }
    }
    e.default = C,
    e.getBrailleWrapperProps = P
});


define('expressions/visualization_parameters_view', ["require", "exports", "tslib", "dcgview", "jquery", "keys", "graphing-calc/models/expression", "dcgview-helpers/checkbox", "dcgview-helpers/mathquill-view", "./parameters_suggestions_view", "main/mathquill-operators", "../shared-components/mathquill-braille-wrapper", "./expression_view", "loadcss!./visualization_parameters_view", "loadcss!toggle"], function(require, e, t, n, r, o, a, i, l, s, c, p, u) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var d = n.Components.For
      , g = n.Components
      , h = g.SwitchUnion
      , m = g.If
      , f = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("dcg-toggle-container")
            }, n.createElement("div", {
                class: n.const("dcg-expression-footer-title")
            }, this.props.title, n.createElement(m, {
                predicate: function() {
                    return !!e.props.helpLink
                }
            }, function() {
                return n.createElement("a", {
                    "aria-label": function() {
                        return e.props.controller().s("account-shell-link-help")
                    },
                    class: n.const("dcg-expression-footer-title-help"),
                    target: n.const("_blank"),
                    href: e.props.helpLink
                }, n.createElement("i", {
                    class: n.const("dcg-icon-question-sign")
                }))
            })), n.createElement(d, {
                each: this.props.options,
                key: function(e) {
                    return e.name
                }
            }, n.createElement("div", {
                class: n.const("dcg-toggle")
            }, function(t) {
                return n.createElement("div", {
                    class: function() {
                        return {
                            "dcg-toggle-option": !0,
                            "dcg-selected-toggle": e.isSelected(t.name)
                        }
                    },
                    role: n.const("button"),
                    tabindex: n.const(0),
                    "aria-label": function() {
                        return e.props.title() + ": " + t.displayName
                    },
                    "aria-pressed": function() {
                        return e.isSelected(t.name)
                    },
                    onTap: function() {
                        return e.props.controller().dispatch({
                            type: "set-visualization-prop",
                            id: e.props.model().id,
                            prop: e.props.vizProp(),
                            value: t.name
                        })
                    }
                }, function() {
                    return t.displayName
                })
            })))
        }
        ,
        r.prototype.isSelected = function(e) {
            return a.getVizProp(this.props.model(), this.props.vizProp()) === e
        }
        ,
        r
    }(n.Class)
      , v = function(e) {
        function d() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(d, e),
        d.prototype.template = function() {
            var e = this;
            return this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id,
            n.createElement("div", {
                class: n.const("dcg-visualization-parameters-container dcg-mq-underline-container dcg-do-blur"),
                tapboundary: n.const("true"),
                handleEvent: n.const("true")
            }, n.createElement(s.ParametersSuggestionsView, t.__assign({}, this.props)), n.createElement("div", {
                class: n.const("dcg-smaller-font")
            }, h(function() {
                return e.getVisualizationType()
            }, {
                boxplot: function() {
                    return n.createElement("div", null, n.createElement("div", {
                        class: n.const("dcg-expression-footer-title")
                    }, function() {
                        return e.controller.s("graphing-calculator-heading-visual-parameters-display-properties")
                    }), e.makeMQInput({
                        prop: "axisOffset",
                        siblingProps: ["breadth"],
                        default: "1",
                        name: function() {
                            return e.controller.s("graphing-calculator-narration-visual-parameters-offset")
                        }
                    }), e.makeMQInput({
                        prop: "breadth",
                        siblingProps: ["axisOffset"],
                        default: "1",
                        name: function() {
                            return "y" === a.getVizProp(e.model, "alignedAxis") ? e.controller.s("graphing-calculator-narration-visual-parameters-width") : e.controller.s("graphing-calculator-narration-visual-parameters-height")
                        }
                    }), n.createElement(i.Checkbox, {
                        checked: function() {
                            return !!a.getVizProp(e.model, "showBoxplotOutliers")
                        },
                        onChange: e.bindFn(e.onToggleOutliers),
                        ariaLabel: function() {
                            return e.controller.s("graphing-calculator-button-visual-parameters-exclude-outliers")
                        }
                    }, n.createElement("span", {
                        class: n.const("dcg-parameter-name")
                    }, function() {
                        return e.controller.s("graphing-calculator-button-visual-parameters-exclude-outliers")
                    })))
                },
                dotplot: function() {
                    return n.createElement(m, {
                        predicate: function() {
                            return a.needsDotplotXMode(e.model)
                        }
                    }, function() {
                        return n.createElement("div", {
                            class: n.const("dcg-toggles-container")
                        }, n.createElement(f, t.__assign({}, e.props, {
                            vizProp: function() {
                                return "dotplotXMode"
                            },
                            options: function() {
                                return [{
                                    name: "exact",
                                    displayName: e.controller.s("graphing-calculator-button-visual-parameters-exact")
                                }, {
                                    name: "bin",
                                    displayName: e.controller.s("graphing-calculator-button-visual-parameters-binned")
                                }]
                            },
                            title: function() {
                                return e.controller.s("graphing-calculator-heading-visual-parameters-x-values")
                            }
                        })), n.createElement(f, t.__assign({}, e.props, {
                            vizProp: function() {
                                return "binAlignment"
                            },
                            options: function() {
                                return [{
                                    name: "center",
                                    displayName: e.controller.s("graphing-calculator-button-visual-parameters-center")
                                }, {
                                    name: "left",
                                    displayName: e.controller.s("graphing-calculator-button-visual-parameters-left")
                                }]
                            },
                            title: function() {
                                return e.controller.s("graphing-calculator-heading-visual-parameters-bin-alignment")
                            }
                        })))
                    })
                },
                histogram: function() {
                    return n.createElement("div", {
                        class: n.const("dcg-toggles-container")
                    }, n.createElement(f, t.__assign({}, e.props, {
                        vizProp: function() {
                            return "histogramMode"
                        },
                        options: function() {
                            return [{
                                name: "",
                                displayName: e.controller.s("graphing-calculator-button-visual-parameters-count")
                            }, {
                                name: "relative",
                                displayName: e.controller.s("graphing-calculator-button-visual-parameters-relative")
                            }, {
                                name: "density",
                                displayName: e.controller.s("graphing-calculator-button-visual-parameters-density")
                            }]
                        },
                        title: function() {
                            return e.controller.s("graphing-calculator-heading-visual-parameters-bar-heights")
                        },
                        helpLink: e.const("https://help.desmos.com/hc/en-us/articles/360022405991")
                    })), n.createElement(f, t.__assign({}, e.props, {
                        vizProp: function() {
                            return "binAlignment"
                        },
                        options: function() {
                            return [{
                                name: "center",
                                displayName: e.controller.s("graphing-calculator-button-visual-parameters-center")
                            }, {
                                name: "left",
                                displayName: e.controller.s("graphing-calculator-button-visual-parameters-left")
                            }]
                        },
                        title: function() {
                            return e.controller.s("graphing-calculator-heading-visual-parameters-bin-alignment")
                        }
                    })))
                },
                none: function() {
                    return n.createElement("span", null)
                }
            })))
        }
        ,
        d.prototype.makeMQInput = function(e) {
            var r = this;
            return n.createElement("span", null, n.createElement("span", {
                class: n.const("dcg-parameter-name")
            }, e.name, n.const(":")), n.createElement(p.default, t.__assign({
                latex: function() {
                    return r.getPropLatex(e)
                },
                ariaLabel: e.name,
                placeholder: function() {
                    return e.default
                },
                brailleShouldFocus: function() {
                    return r.isInputFocused(e.prop)
                },
                onBrailleInput: function(t) {
                    return r.handleLatexChanged(e.prop, t)
                },
                hasError: function() {
                    return !a.isVizPropValid(r.model, e.prop)
                },
                onBrailleFocusedChanged: function(t) {
                    return r.handleFocusedChanged(e.prop, t)
                },
                onBrailleKeydown: function(t) {
                    return r.handleBraillePressedKey(t, e.prop)
                }
            }, u.getBrailleWrapperProps(this.props.controller())), n.createElement(l.default, {
                latex: function() {
                    return r.getPropLatex(e)
                },
                hasError: function() {
                    return !a.isVizPropValid(r.model, e.prop)
                },
                isFocused: function() {
                    return r.isInputFocused(e.prop)
                },
                onFocusedChanged: function(t) {
                    return r.handleFocusedChanged(e.prop, t)
                },
                placeholder: function() {
                    return e.default
                },
                config: this.bindFn(this.getMQConfig),
                getAriaLabel: e.name,
                onUserPressedKey: function(t, n) {
                    return r.handlePressedKey(t, n, e.prop)
                },
                getAriaPostLabel: function() {
                    return ""
                },
                onUserChangedLatex: function(t) {
                    return r.handleLatexChanged(e.prop, t)
                },
                onExpressionSizeExceeded: function() {
                    return r.controller.dispatch({
                        type: "expression-size-exceeded"
                    })
                },
                capExpressionSize: function() {
                    return r.model.controller.getCapExpressionSize()
                },
                needsSystemKeypad: function() {
                    return !r.controller.isKeypadEnabled()
                }
            })))
        }
        ,
        d.prototype.handleBraillePressedKey = function(e, t) {
            var n = o.lookup(e);
            n && this.handlePressedKey(n, r.Event(e), t)
        }
        ,
        d.prototype.handlePressedKey = function(e, t, n) {
            if ("Esc" !== e) {
                if ("Enter" === e)
                    return this.controller.dispatch({
                        type: "on-special-key-pressed",
                        key: "Enter"
                    });
                var r = l.default.getFocusedMathquill();
                r && (r.keystroke(e, t),
                this.handleLatexChanged(n, r.latex()))
            } else
                this.controller.dispatch({
                    type: "set-focus-location",
                    location: void 0
                })
        }
        ,
        d.prototype.isInputFocused = function(e) {
            var t = this.controller.getFocusLocation();
            return !(!t || "visualization-prop" !== t.type || t.id !== this.id) && t.location === e
        }
        ,
        d.prototype.handleFocusedChanged = function(e, t) {
            t ? this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "visualization-prop",
                    id: this.id,
                    location: e
                }
            }) : this.controller.dispatch({
                type: "blur-focus-location",
                location: {
                    type: "visualization-prop",
                    id: this.id,
                    location: e
                }
            })
        }
        ,
        d.prototype.getPropLatex = function(e) {
            var t = e.prop
              , n = a.getVizProp(this.model, t);
            return "string" == typeof n ? n : ""
        }
        ,
        d.prototype.handleLatexChanged = function(e, t) {
            a.getVizProp(this.model, e) !== t && this.controller.dispatch({
                type: "set-visualization-prop",
                id: this.id,
                prop: e,
                value: t
            })
        }
        ,
        d.prototype.onToggleOutliers = function() {
            var e = a.getVizProp(this.model, "showBoxplotOutliers");
            this.controller.dispatch({
                type: "set-visualization-prop",
                id: this.id,
                prop: "showBoxplotOutliers",
                value: !e
            })
        }
        ,
        d.prototype.getVisualizationType = function() {
            return a.isPrimaryLatexValid(this.model) ? a.isBoxPlot(this.model) ? "boxplot" : a.isDotPlot(this.model) ? "dotplot" : a.isHistogram(this.model) ? "histogram" : "none" : "none"
        }
        ,
        d.prototype.getMQConfig = function() {
            return {
                autoOperatorNames: c.getAutoOperators()
            }
        }
        ,
        d
    }(n.Class);
    e.default = v
});

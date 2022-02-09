define('expressions/expression-menus/label', ["require", "exports", "tslib", "./base-menu-section", "dcgview", "expressions/toggle-view", "dcgview-helpers/mathquill-view", "graphing-calc/models/expression", "core/types/label-sizes", "./label-orientation-view", "./color-picker", "dcgview-helpers/checkbox", "core/lib/dragmode", "core/graphing-calc/json/expression", "core/math/interpolatedlabel", "../../shared-components/tooltip"], function(require, e, t, n, l, o, i, r, a, c, s, d, u, p, b, g) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.LabelMenu = void 0;
    var h = l.Components.If
      , f = function(e) {
        function n() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(n, e),
        n.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id
        }
        ,
        n.prototype.template = function() {
            var e = this;
            return l.createElement("div", {
                class: l.const("dcg-options-menu-section")
            }, l.createElement("div", {
                class: l.const("dcg-options-menu-section-title")
            }, function() {
                return e.controller.s("graphing-calculator-heading-label")
            }, l.createElement(o.ToggleView, {
                ariaLabel: function() {
                    return e.controller.s("graphing-calculator-narration-label-visible")
                },
                toggled: this.props.isOpen,
                onChange: this.bindFn(this.toggleLabelVisible)
            })), l.createElement(h, {
                predicate: this.props.isOpen
            }, function() {
                return l.createElement("div", {
                    class: l.const("dcg-options-menu-content")
                }, l.createElement("div", {
                    class: l.const("dcg-options-flex-container")
                }, l.createElement("div", {
                    class: l.const("dcg-options-left-side")
                }, l.createElement("div", {
                    class: l.const("dcg-iconed-mathquill-row dcg-label-size-row")
                }, l.createElement(g.Tooltip, {
                    tooltip: function() {
                        return e.controller.s("graphing-calculator-label-label-size-tooltip")
                    },
                    sticky: e.const(!0),
                    gravity: e.const("se")
                }, l.createElement("span", {
                    class: l.const("dcg-font-size")
                }, l.const("A"))), l.createElement(i.default, {
                    latex: e.bindFn(e.getLabelSizeLatex),
                    placeholder: e.bindFn(e.getLabelSizePlaceholder),
                    isFocused: function() {
                        return "labelsize" === e.getFocusedInput()
                    },
                    capExpressionSize: function() {
                        return !!e.controller.getGraphSettings().config.capExpressionSize
                    },
                    selectOnFocus: e.const(!0),
                    config: e.bindFn(e.getMQConfig),
                    getAriaLabel: function() {
                        return e.controller.s("graphing-calculator-narration-label-size")
                    },
                    getAriaPostLabel: function() {
                        return r.isLabelSizeValid(e.model) ? e.controller.raw("") : e.controller.s("shared-calculator-narration-input-error")
                    },
                    hasError: function() {
                        return !r.isLabelSizeValid(e.model)
                    },
                    onUserChangedLatex: function(t) {
                        return e.dispatchLabelSizeIfChanged(t)
                    },
                    onExpressionSizeExceeded: function() {
                        return e.controller.dispatch({
                            type: "expression-size-exceeded"
                        })
                    },
                    onFocusedChanged: function(t) {
                        return e.handleFocusedChanged(t, "labelsize")
                    },
                    dataLabelAttributeValue: e.const("label-size")
                })), l.createElement("div", {
                    class: function() {
                        return {
                            "dcg-iconed-mathquill-row": !0,
                            "dcg-label-angle-row": !0,
                            "dcg-suffix-degree": e.props.controller().getGraphSettings().degreeMode,
                            "dcg-suffix-radian": !e.props.controller().getGraphSettings().degreeMode
                        }
                    }
                }, l.createElement(g.Tooltip, {
                    tooltip: function() {
                        return e.controller.s("graphing-calculator-label-angle-tooltip")
                    },
                    sticky: e.const(!0)
                }, l.createElement("i", {
                    class: l.const("dcg-icon-angle")
                })), l.createElement(i.default, {
                    latex: function() {
                        return e.model.labelAngle
                    },
                    placeholder: function() {
                        return "0"
                    },
                    isFocused: function() {
                        return "labelangle" === e.getFocusedInput()
                    },
                    capExpressionSize: function() {
                        return !!e.controller.getGraphSettings().config.capExpressionSize
                    },
                    selectOnFocus: e.const(!0),
                    config: e.bindFn(e.getMQConfig),
                    getAriaLabel: function() {
                        return e.controller.s("graphing-calculator-narration-label-angle")
                    },
                    getAriaPostLabel: function() {
                        return r.isLabelAngleValid(e.model) ? e.controller.raw("") : e.controller.s("shared-calculator-narration-input-error")
                    },
                    hasError: function() {
                        return !r.isLabelAngleValid(e.model)
                    },
                    onUserChangedLatex: function(t) {
                        return e.dispatchLabelAngleIfChanged(t)
                    },
                    onExpressionSizeExceeded: function() {
                        return e.controller.dispatch({
                            type: "expression-size-exceeded"
                        })
                    },
                    onFocusedChanged: function(t) {
                        return e.handleFocusedChanged(t, "labelangle")
                    },
                    dataLabelAttributeValue: e.const("label-angle")
                }))), l.createElement("div", {
                    class: l.const("dcg-options-right-side")
                }, l.createElement(c.LabelOrientationView, {
                    controller: function() {
                        return e.controller
                    },
                    model: function() {
                        return e.model
                    }
                }))), l.createElement(h, {
                    predicate: e.props.isFirstOpenSection
                }, function() {
                    return l.createElement(s.ColorPicker, t.__assign({}, e.props, {
                        model: function() {
                            return e.model
                        },
                        selectedColor: e.bindFn(e.getModelColor),
                        onColorSelected: e.bindFn(e.onColorSelected),
                        onCustomColorSelected: e.bindFn(e.onCustomColorSelected)
                    }))
                }), l.createElement(h, {
                    predicate: function() {
                        return e.controller.canUseAdvancedStyling()
                    }
                }, function() {
                    return l.createElement("div", {
                        class: l.const("dcg-label-advanced")
                    }, l.createElement(d.Checkbox, {
                        checked: e.bindFn(e.getWhiteTextOutline),
                        onChange: e.bindFn(e.setWhiteTextOutline),
                        ariaLabel: function() {
                            return e.controller.s("graphing-calculator-button-label-text-outline")
                        },
                        disabled: function() {
                            return e.getEditable()
                        }
                    }, function() {
                        return e.controller.s("graphing-calculator-button-label-text-outline")
                    }), l.createElement("div", {
                        role: l.const("group"),
                        "aria-label": function() {
                            return e.controller.s("graphing-calculator-heading-advanced")
                        }
                    }, l.createElement(h, {
                        predicate: function() {
                            return e.shouldShowHoverLabelCheckbox()
                        }
                    }, function() {
                        return l.createElement(d.Checkbox, {
                            checked: e.bindFn(e.getInteractiveLabel),
                            onChange: e.bindFn(e.setInteractiveLabel),
                            ariaLabel: function() {
                                return e.controller.s("graphing-calculator-button-label-show-on-hover")
                            }
                        }, function() {
                            return e.controller.s("graphing-calculator-button-label-show-on-hover")
                        })
                    }), l.createElement(h, {
                        predicate: e.bindFn(e.shouldShowEditableLabelToggle)
                    }, function() {
                        return l.createElement(d.Checkbox, {
                            checked: e.bindFn(e.getEditable),
                            onChange: e.bindFn(e.setEditable),
                            ariaLabel: function() {
                                return e.controller.s("graphing-calculator-button-label-editable")
                            }
                        }, function() {
                            return e.controller.s("graphing-calculator-button-label-editable")
                        })
                    })))
                }))
            }))
        }
        ,
        n.prototype.getWhiteTextOutline = function() {
            return !this.getEditable() && !this.model.suppressTextOutline
        }
        ,
        n.prototype.setWhiteTextOutline = function(e) {
            this.controller.dispatch({
                type: "set-suppress-text-outline",
                id: this.id,
                suppressTextOutline: !e
            })
        }
        ,
        n.prototype.setInteractiveLabel = function(e) {
            this.controller.dispatch({
                type: "set-item-interactive-label",
                id: this.id,
                interactiveLabel: e
            })
        }
        ,
        n.prototype.getInteractiveLabel = function() {
            return !!this.model.interactiveLabel
        }
        ,
        n.prototype.setEditable = function(e) {
            if (e) {
                var t = "latex" === b.classifyLabelText(this.model.label) ? p.EditableLabelMode.Math : p.EditableLabelMode.Text;
                this.controller.dispatch({
                    type: "set-item-editable-label-mode",
                    id: this.id,
                    editableLabelMode: t
                })
            } else
                this.controller.dispatch({
                    type: "set-item-editable-label-mode",
                    id: this.id,
                    editableLabelMode: p.EditableLabelMode.None
                })
        }
        ,
        n.prototype.getEditable = function() {
            return this.model.editableLabelMode !== p.EditableLabelMode.None
        }
        ,
        n.prototype.shouldShowEditableLabelToggle = function() {
            return r.isSinglePoint(this.model)
        }
        ,
        n.prototype.shouldShowHoverLabelCheckbox = function() {
            return this.model.reconciledDragMode === u.DragMode.NONE
        }
        ,
        n.prototype.dispatchLabelAngleIfChanged = function(e) {
            this.model.labelAngle !== e && this.controller.dispatch({
                type: "set-item-labelangle",
                id: this.id,
                labelAngle: e
            })
        }
        ,
        n.prototype.dispatchLabelSizeIfChanged = function(e) {
            if (this.model.labelSize !== e) {
                var t = a.maybeMigrateLabelSizeEnumToLatex(e);
                t && (e = t),
                this.controller.dispatch({
                    type: "set-item-labelSize",
                    id: this.id,
                    labelSize: e
                })
            }
        }
        ,
        n.prototype.getLabelSizePlaceholder = function() {
            var e = a.maybeMigrateLabelSizeEnumToLatex(this.model.labelSize);
            return e || "1"
        }
        ,
        n.prototype.getLabelSizeLatex = function() {
            return a.maybeMigrateLabelSizeEnumToLatex(this.model.labelSize) ? "" : this.model.labelSize
        }
        ,
        n.prototype.toggleLabelVisible = function() {
            this.controller.dispatch({
                type: "set-item-showlabel",
                id: this.id,
                showLabel: !this.props.isOpen()
            })
        }
        ,
        n
    }(n.BaseMenuSection);
    e.LabelMenu = f
});
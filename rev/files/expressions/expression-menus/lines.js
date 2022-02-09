
define('expressions/expression-menus/lines', ["require", "exports", "tslib", "./base-menu-section", "dcgview", "expressions/toggle-view", "core/types/line-opacity", "dcgview-helpers/mathquill-view", "graphing-calc/models/expression", "graphing-calc/models/table", "core/types/line-width", "core/types/styles", "./color-picker", "../../shared-components/tooltip", "loadcss!toggle"], function(require, e, t, n, i, o, l, r, c, s, a, d, p, u) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.LineMenu = void 0;
    var h = i.Components
      , g = h.If
      , y = h.For
      , m = function(e) {
        function n() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(n, e),
        n.prototype.template = function() {
            var e = this;
            return i.createElement("div", {
                class: i.const("dcg-options-menu-section")
            }, i.createElement("div", {
                class: i.const("dcg-options-menu-section-title")
            }, function() {
                return e.controller.s("graphing-calculator-heading-lines")
            }, i.createElement(o.ToggleView, {
                ariaLabel: function() {
                    return e.controller.s("graphing-calculator-narration-lines-visible")
                },
                toggled: this.props.isOpen,
                onChange: this.bindFn(this.toggleLinesVisible)
            })), i.createElement(g, {
                predicate: function() {
                    return e.props.isOpen()
                }
            }, function() {
                return i.createElement("div", {
                    class: i.const("dcg-options-menu-content")
                }, i.createElement("div", {
                    class: i.const("dcg-options-flex-container")
                }, i.createElement("div", {
                    class: i.const("dcg-options-left-side")
                }, i.createElement("div", {
                    class: i.const("dcg-iconed-mathquill-row dcg-line-opacity-row")
                }, i.createElement(u.Tooltip, {
                    tooltip: function() {
                        return e.controller.s("graphing-calculator-label-opacity-tooltip")
                    },
                    sticky: e.const(!0),
                    gravity: e.const("se")
                }, i.createElement("i", {
                    class: i.const("dcg-icon-opacity")
                })), i.createElement(r.default, {
                    latex: function() {
                        return e.model.lineOpacity
                    },
                    placeholder: function() {
                        return "" + l.DEFAULT
                    },
                    isFocused: function() {
                        return "lineopacity" === e.getFocusedInput()
                    },
                    capExpressionSize: function() {
                        return !!e.controller.getGraphSettings().config.capExpressionSize
                    },
                    selectOnFocus: e.const(!0),
                    config: e.bindFn(e.getMQConfig),
                    getAriaLabel: function() {
                        return e.controller.s("graphing-calculator-narration-line-opacity")
                    },
                    getAriaPostLabel: function() {
                        return e.isLineOpacityValid() ? e.controller.raw("") : e.controller.s("shared-calculator-narration-input-error")
                    },
                    hasError: function() {
                        return !e.isLineOpacityValid()
                    },
                    onUserChangedLatex: function(t) {
                        return e.dispatchLineOpacityLatexIfChanged(t)
                    },
                    onExpressionSizeExceeded: function() {
                        return e.controller.dispatch({
                            type: "expression-size-exceeded"
                        })
                    },
                    onFocusedChanged: function(t) {
                        return e.handleFocusedChanged(t, "lineopacity")
                    },
                    dataLabelAttributeValue: e.const("line-opacity")
                })), i.createElement("div", {
                    class: i.const("dcg-iconed-mathquill-row dcg-line-thickness-row")
                }, i.createElement(u.Tooltip, {
                    tooltip: function() {
                        return e.controller.s("graphing-calculator-label-line-thickness-tooltip")
                    },
                    sticky: e.const(!0),
                    gravity: e.const("se")
                }, i.createElement("i", {
                    class: i.const("dcg-icon-line-thickness")
                })), i.createElement(r.default, {
                    latex: function() {
                        return e.model.lineWidth
                    },
                    placeholder: function() {
                        return "" + a.DEFAULT
                    },
                    isFocused: function() {
                        return "linewidth" === e.getFocusedInput()
                    },
                    capExpressionSize: function() {
                        return !!e.controller.getGraphSettings().config.capExpressionSize
                    },
                    selectOnFocus: e.const(!0),
                    config: e.bindFn(e.getMQConfig),
                    getAriaLabel: function() {
                        return e.controller.s("graphing-calculator-label-line-thickness-tooltip")
                    },
                    getAriaPostLabel: function() {
                        return e.isLineWidthValid() ? e.controller.raw("") : e.controller.s("shared-calculator-narration-input-error")
                    },
                    hasError: function() {
                        return !e.isLineWidthValid()
                    },
                    onUserChangedLatex: function(t) {
                        return e.dispatchLineWidthLatexIfChanged(t)
                    },
                    onExpressionSizeExceeded: function() {
                        return e.controller.dispatch({
                            type: "expression-size-exceeded"
                        })
                    },
                    onFocusedChanged: function(t) {
                        return e.handleFocusedChanged(t, "linewidth")
                    },
                    dataLabelAttributeValue: e.const("line-width")
                }))), i.createElement("div", {
                    class: i.const("dcg-options-right-side")
                }, i.createElement(y, {
                    each: function() {
                        return e.getValidLineStyles()
                    }
                }, i.createElement("div", {
                    class: i.const("dcg-toggle dcg-line-style-toggle"),
                    role: i.const("radiogroup")
                }, function(t) {
                    return i.createElement("div", {
                        class: function() {
                            return {
                                "dcg-toggle-option": !0,
                                "dcg-selected-toggle": e.model.lineStyle === t
                            }
                        },
                        onTap: function() {
                            return e.onLineStyleSelected(t)
                        },
                        role: i.const("radio"),
                        tabindex: i.const("0"),
                        "aria-label": function() {
                            return t === d.LineStyle.SOLID ? e.controller.s("graphing-calculator-narration-line-style-solid") : t === d.LineStyle.DASHED ? e.controller.s("graphing-calculator-narration-line-style-dashed") : t === d.LineStyle.DOTTED ? e.controller.s("graphing-calculator-narration-line-style-dotted") : e.controller.raw("")
                        },
                        "aria-checked": function() {
                            return e.model.lineStyle === t
                        }
                    }, i.createElement("i", {
                        class: function() {
                            return {
                                "dcg-icon-line-solid": t === d.LineStyle.SOLID,
                                "dcg-icon-line-dashed": t === d.LineStyle.DASHED,
                                "dcg-icon-line-dotted": t === d.LineStyle.DOTTED
                            }
                        }
                    }))
                })))), i.createElement(g, {
                    predicate: e.props.isFirstOpenSection
                }, function() {
                    return i.createElement(p.ColorPicker, t.__assign({}, e.props, {
                        model: function() {
                            return e.model
                        },
                        selectedColor: e.bindFn(e.getModelColor),
                        onColorSelected: e.bindFn(e.onColorSelected),
                        onCustomColorSelected: e.bindFn(e.onCustomColorSelected)
                    }))
                }))
            }))
        }
        ,
        n.prototype.isLineOpacityValid = function() {
            return "expression" === this.model.type ? c.isLineOpacityValid(this.model) : "header" === this.model.type && s.isLineOpacityValid(this.model)
        }
        ,
        n.prototype.isLineWidthValid = function() {
            return "expression" === this.model.type ? c.isLineWidthValid(this.model) : "header" === this.model.type && s.isLineWidthValid(this.model)
        }
        ,
        n.prototype.dispatchLineOpacityLatexIfChanged = function(e) {
            this.model.lineOpacity !== e && ("expression" === this.model.type ? this.controller.dispatch({
                type: "set-item-lineopacity",
                id: this.id,
                lineOpacity: e
            }) : this.controller.dispatch({
                type: "set-tablecolumn-lineopacity",
                tableId: this.model.table.id,
                columnId: this.model.id,
                lineOpacity: e
            }))
        }
        ,
        n.prototype.getValidLineStyles = function() {
            return "expression" === this.model.type && c.isInequality(this.model) ? [] : [d.LineStyle.SOLID, d.LineStyle.DASHED, d.LineStyle.DOTTED]
        }
        ,
        n.prototype.onLineStyleSelected = function(e) {
            this.model.lineStyle !== e && ("expression" === this.model.type ? this.controller.dispatch({
                type: "set-item-linestyle",
                id: this.id,
                lineStyle: e
            }) : this.controller.dispatch({
                type: "set-tablecolumn-linestyle",
                tableId: this.model.table.id,
                columnId: this.model.id,
                lineStyle: e
            }))
        }
        ,
        n.prototype.dispatchLineWidthLatexIfChanged = function(e) {
            this.model.lineWidth !== e && ("expression" === this.model.type ? this.controller.dispatch({
                type: "set-item-linewidth",
                id: this.id,
                lineWidth: e
            }) : this.controller.dispatch({
                type: "set-tablecolumn-linewidth",
                tableId: this.model.table.id,
                columnId: this.model.id,
                lineWidth: e
            }))
        }
        ,
        n.prototype.toggleLinesVisible = function() {
            "expression" === this.model.type ? this.controller.dispatch({
                type: "set-item-lines",
                id: this.id,
                lines: !this.props.isOpen()
            }) : this.controller.dispatch({
                type: "set-tablecolumn-lines",
                tableId: this.model.table.id,
                columnId: this.model.id,
                bool: !this.props.isOpen()
            })
        }
        ,
        n
    }(n.BaseMenuSection);
    e.LineMenu = m
});
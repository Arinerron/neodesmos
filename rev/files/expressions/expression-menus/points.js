define('expressions/expression-menus/points', ["require", "exports", "tslib", "./base-menu-section", "dcgview", "expressions/toggle-view", "dcgview-helpers/mathquill-view", "graphing-calc/models/expression", "graphing-calc/models/table", "core/types/point-opacity", "core/lib/dragmode", "core/types/point-size", "core/types/styles", "./color-picker", "../../shared-components/tooltip"], function(require, t, e, o, n, i, r, l, c, s, a, p, d, u, g) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.PointsMenu = void 0;
    var h = n.Components
      , m = h.If
      , y = h.For
      , f = function(t) {
        function o() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(o, t),
        o.prototype.template = function() {
            var t = this;
            return n.createElement("div", {
                class: n.const("dcg-options-menu-section")
            }, n.createElement("div", {
                class: n.const("dcg-options-menu-section-title")
            }, function() {
                return t.controller.s("graphing-calculator-heading-points")
            }, n.createElement(i.ToggleView, {
                ariaLabel: function() {
                    return t.controller.s("graphing-calculator-narration-points-visible")
                },
                toggled: this.props.isOpen,
                onChange: this.bindFn(this.togglePointsVisible)
            })), n.createElement(m, {
                predicate: this.props.isOpen
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-options-menu-content")
                }, n.createElement("div", {
                    class: n.const("dcg-options-flex-container")
                }, n.createElement("div", {
                    class: n.const("dcg-options-left-side")
                }, n.createElement("div", {
                    class: n.const("dcg-iconed-mathquill-row dcg-point-opacity-row")
                }, n.createElement(g.Tooltip, {
                    tooltip: function() {
                        return t.controller.s("graphing-calculator-label-opacity-tooltip")
                    },
                    sticky: t.const(!0),
                    gravity: t.const("se")
                }, n.createElement("i", {
                    class: n.const("dcg-icon-opacity")
                })), n.createElement(r.default, {
                    latex: function() {
                        return t.model.pointOpacity
                    },
                    placeholder: t.bindFn(t.getPointOpacityPlaceholder),
                    isFocused: function() {
                        return "pointopacity" === t.getFocusedInput()
                    },
                    capExpressionSize: function() {
                        return !!t.controller.getGraphSettings().config.capExpressionSize
                    },
                    selectOnFocus: t.const(!0),
                    config: t.bindFn(t.getMQConfig),
                    getAriaLabel: function() {
                        return t.controller.s("graphing-calculator-narration-point-opacity")
                    },
                    getAriaPostLabel: function() {
                        return t.isPointOpacityValid() ? t.controller.raw("") : t.controller.s("shared-calculator-narration-input-error")
                    },
                    hasError: function() {
                        return !t.isPointOpacityValid()
                    },
                    onUserChangedLatex: function(e) {
                        return t.dispatchPointOpacityLatexIfChanged(e)
                    },
                    onExpressionSizeExceeded: function() {
                        return t.controller.dispatch({
                            type: "expression-size-exceeded"
                        })
                    },
                    onFocusedChanged: function(e) {
                        return t.handleFocusedChanged(e, "pointopacity")
                    },
                    dataLabelAttributeValue: t.const("point-opacity")
                })), n.createElement(m, {
                    predicate: function() {
                        return !t.isDraggable()
                    }
                }, function() {
                    return n.createElement("div", {
                        class: n.const("dcg-iconed-mathquill-row")
                    }, n.createElement(g.Tooltip, {
                        tooltip: function() {
                            return t.controller.s("graphing-calculator-label-point-size-tooltip")
                        },
                        gravity: t.const("se"),
                        sticky: t.const(!0)
                    }, n.createElement("i", {
                        class: n.const("dcg-icon-line-thickness")
                    })), n.createElement(r.default, {
                        latex: function() {
                            return t.model.pointSize
                        },
                        placeholder: t.bindFn(t.getDefaultPointSize),
                        isFocused: function() {
                            return "pointsize" === t.getFocusedInput()
                        },
                        capExpressionSize: function() {
                            return !!t.controller.getGraphSettings().config.capExpressionSize
                        },
                        selectOnFocus: t.const(!0),
                        config: t.bindFn(t.getMQConfig),
                        getAriaLabel: function() {
                            return t.controller.s("graphing-calculator-narration-point-size")
                        },
                        getAriaPostLabel: function() {
                            return t.isPointSizeValid() ? t.controller.raw("") : t.controller.s("shared-calculator-narration-input-error")
                        },
                        hasError: function() {
                            return !t.isPointSizeValid()
                        },
                        onUserChangedLatex: function(e) {
                            return t.dispatchPointSizeLatexIfChanged(e)
                        },
                        onExpressionSizeExceeded: function() {
                            return t.controller.dispatch({
                                type: "expression-size-exceeded"
                            })
                        },
                        onFocusedChanged: function(e) {
                            return t.handleFocusedChanged(e, "pointsize")
                        },
                        dataLabelAttributeValue: t.const("point-size")
                    }))
                })), n.createElement("div", {
                    class: n.const("dcg-options-right-side")
                }, n.createElement(m, {
                    predicate: function() {
                        return !t.isDraggable()
                    }
                }, function() {
                    return n.createElement(y, {
                        each: function() {
                            return [d.PointStyle.POINT, d.PointStyle.OPEN, d.PointStyle.CROSS]
                        }
                    }, n.createElement("div", {
                        class: n.const("dcg-toggle dcg-point-style-toggle"),
                        role: n.const("radiogroup")
                    }, function(e) {
                        return n.createElement("div", {
                            class: function() {
                                return {
                                    "dcg-toggle-option": !0,
                                    "dcg-selected-toggle": t.model.pointStyle === e
                                }
                            },
                            onTap: function() {
                                return t.onPointStyleSelected(e)
                            },
                            role: n.const("radio"),
                            tabindex: n.const("0"),
                            "aria-label": function() {
                                return e === d.PointStyle.POINT ? t.controller.s("graphing-calculator-narration-point-style-point") : e === d.PointStyle.OPEN ? t.controller.s("graphing-calculator-narration-point-style-open") : e === d.PointStyle.CROSS ? t.controller.s("graphing-calculator-narration-point-style-cross") : t.controller.raw("")
                            },
                            "aria-checked": function() {
                                return t.model.pointStyle === e
                            }
                        }, n.createElement("i", {
                            class: function() {
                                return {
                                    "dcg-icon-point": e === d.PointStyle.POINT,
                                    "dcg-icon-open": e === d.PointStyle.OPEN,
                                    "dcg-icon-cross": e === d.PointStyle.CROSS
                                }
                            }
                        }))
                    }))
                }))), n.createElement(m, {
                    predicate: t.props.isFirstOpenSection
                }, function() {
                    return n.createElement(u.ColorPicker, e.__assign({}, t.props, {
                        model: function() {
                            return t.model
                        },
                        selectedColor: t.bindFn(t.getModelColor),
                        onColorSelected: t.bindFn(t.onColorSelected),
                        onCustomColorSelected: t.bindFn(t.onCustomColorSelected)
                    }))
                }))
            }))
        }
        ,
        o.prototype.isPointOpacityValid = function() {
            return "expression" === this.model.type ? l.isPointOpacityValid(this.model) : "header" === this.model.type && c.isPointOpacityValid(this.model)
        }
        ,
        o.prototype.isPointSizeValid = function() {
            return "expression" === this.model.type ? l.isPointSizeValid(this.model) : "header" === this.model.type && c.isPointSizeValid(this.model)
        }
        ,
        o.prototype.onPointStyleSelected = function(t) {
            this.model.pointStyle !== t && ("expression" === this.model.type ? this.controller.dispatch({
                type: "set-item-pointstyle",
                id: this.id,
                pointStyle: t
            }) : this.controller.dispatch({
                type: "set-tablecolumn-pointstyle",
                columnId: this.model.id,
                tableId: this.model.table.id,
                pointStyle: t
            }))
        }
        ,
        o.prototype.dispatchPointSizeLatexIfChanged = function(t) {
            this.model.pointSize !== t && ("expression" === this.model.type ? this.controller.dispatch({
                type: "set-item-pointsize",
                id: this.id,
                pointSize: t
            }) : this.controller.dispatch({
                type: "set-tablecolumn-pointsize",
                columnId: this.model.id,
                tableId: this.model.table.id,
                pointSize: t
            }))
        }
        ,
        o.prototype.isDraggable = function() {
            return this.getDragMode() !== a.DragMode.NONE
        }
        ,
        o.prototype.togglePointsVisible = function() {
            "expression" === this.model.type && l.isSinglePoint(this.model) ? this.controller.dispatch({
                type: "toggle-item-hidden",
                id: this.model.id
            }) : "expression" === this.model.type ? this.controller.dispatch({
                type: "set-item-points",
                id: this.id,
                points: !this.props.isOpen()
            }) : this.controller.dispatch({
                type: "set-tablecolumn-points",
                columnId: this.model.id,
                tableId: this.model.table.id,
                bool: !this.props.isOpen()
            })
        }
        ,
        o.prototype.dispatchPointOpacityLatexIfChanged = function(t) {
            this.model.pointOpacity !== t && ("expression" === this.model.type ? this.controller.dispatch({
                type: "set-item-pointopacity",
                id: this.id,
                pointOpacity: t
            }) : this.controller.dispatch({
                type: "set-tablecolumn-pointopacity",
                columnId: this.model.id,
                tableId: this.model.table.id,
                pointOpacity: t
            }))
        }
        ,
        o.prototype.getPointOpacityPlaceholder = function() {
            return this.getDragMode() === a.DragMode.NONE ? "" + s.DEFAULT : "1"
        }
        ,
        o.prototype.getDragMode = function() {
            return "expression" === this.model.type && this.model.reconciledDragMode || this.model.dragMode
        }
        ,
        o.prototype.getDefaultPointSize = function() {
            return "expression" === this.model.type && l.isDotPlot(this.model) ? "" + p.DOTPLOT_DEFAULT : "" + p.DEFAULT
        }
        ,
        o
    }(o.BaseMenuSection);
    t.PointsMenu = f
});

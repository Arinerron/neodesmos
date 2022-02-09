define('expressions/expression-menus/fill', ["require", "exports", "tslib", "./base-menu-section", "dcgview", "expressions/toggle-view", "dcgview-helpers/mathquill-view", "graphing-calc/models/expression", "core/types/opacity", "./color-picker", "../../shared-components/tooltip"], function(require, e, t, n, o, i, r, l, c, s, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.FillMenu = void 0;
    var p = o.Components.If
      , u = function(e) {
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
            return o.createElement("div", {
                class: o.const("dcg-options-menu-section")
            }, o.createElement("div", {
                class: o.const("dcg-options-menu-section-title")
            }, function() {
                return e.controller.s("graphing-calculator-heading-fill")
            }, o.createElement(p, {
                predicate: function() {
                    return !e.isInequality()
                }
            }, function() {
                return o.createElement(i.ToggleView, {
                    ariaLabel: function() {
                        return e.controller.s("graphing-calculator-narration-fill-visible")
                    },
                    toggled: e.props.isOpen,
                    onChange: e.bindFn(e.toggleFillVisible)
                })
            })), o.createElement(p, {
                predicate: this.props.isOpen
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-options-menu-content")
                }, o.createElement("div", {
                    class: o.const("dcg-iconed-mathquill-row dcg-fill-opacity-row")
                }, o.createElement(a.Tooltip, {
                    tooltip: function() {
                        return e.controller.s("graphing-calculator-label-opacity-tooltip")
                    },
                    sticky: e.const(!0),
                    gravity: e.const("se")
                }, o.createElement("i", {
                    class: o.const("dcg-icon-opacity")
                })), o.createElement(r.default, {
                    latex: function() {
                        return e.model.fillOpacity
                    },
                    placeholder: function() {
                        return "" + c.DEFAULT
                    },
                    isFocused: function() {
                        return "opacity" === e.getFocusedInput()
                    },
                    capExpressionSize: function() {
                        return !!e.controller.getGraphSettings().config.capExpressionSize
                    },
                    selectOnFocus: e.const(!0),
                    config: e.bindFn(e.getMQConfig),
                    getAriaLabel: function() {
                        return e.controller.s("graphing-calculator-narration-fill-opacity")
                    },
                    getAriaPostLabel: function() {
                        return l.isFillOpacityValid(e.model) ? e.controller.raw("") : e.controller.s("shared-calculator-narration-input-error")
                    },
                    hasError: function() {
                        return !l.isFillOpacityValid(e.model)
                    },
                    onUserChangedLatex: function(t) {
                        return e.dispatchOpacityLatexIfChanged(t)
                    },
                    onExpressionSizeExceeded: function() {
                        return e.controller.dispatch({
                            type: "expression-size-exceeded"
                        })
                    },
                    onFocusedChanged: function(t) {
                        return e.handleFocusedChanged(t, "opacity")
                    },
                    dataLabelAttributeValue: e.const("fill-opacity"),
                    needsSystemKeypad: function() {
                        return !e.controller.isKeypadEnabled()
                    }
                })), o.createElement(p, {
                    predicate: e.props.isFirstOpenSection
                }, function() {
                    return o.createElement(s.ColorPicker, t.__assign({}, e.props, {
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
        n.prototype.isInequality = function() {
            return l.isInequality(this.model)
        }
        ,
        n.prototype.toggleFillVisible = function() {
            this.controller.dispatch({
                type: "set-item-fill",
                id: this.id,
                fill: !this.props.isOpen()
            })
        }
        ,
        n.prototype.dispatchOpacityLatexIfChanged = function(e) {
            this.model.fillOpacity !== e && this.controller.dispatch({
                type: "set-item-fillopacity",
                id: this.id,
                fillOpacity: e
            })
        }
        ,
        n
    }(n.BaseMenuSection);
    e.FillMenu = u
});

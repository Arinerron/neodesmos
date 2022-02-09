define('expressions/expression-menus/clickable', ["require", "exports", "tslib", "./base-menu-section", "dcgview", "expressions/toggle-view", "dcgview-helpers/mathquill-view", "main/mathquill-operators", "expressions/clickable_image_states_view", "../../dcgview-helpers/tooltipped-error", "../../shared/dcgviews/localize", "loadcss!./clickable"], function(require, e, t, n, r, o, c, l, i, a, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.ClickableMenu = void 0;
    var d = r.Components
      , u = d.If
      , p = d.IfDefined
      , h = d.Textarea
      , g = function(e) {
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
            return r.createElement("div", {
                class: r.const("dcg-options-menu-section dcg-clickable-section")
            }, r.createElement("div", {
                class: r.const("dcg-options-menu-section-title")
            }, function() {
                return e.controller.s("graphing-calculator-heading-clickable")
            }, r.createElement(o.ToggleView, {
                ariaLabel: function() {
                    return e.controller.s("graphing-calculator-narration-make-clickable")
                },
                toggled: this.props.isOpen,
                onChange: this.bindFn(this.toggleClickable)
            })), r.createElement(u, {
                predicate: this.props.isOpen
            }, function() {
                return r.createElement("div", {
                    class: r.const("dcg-options-menu-content")
                }, r.createElement("div", {
                    class: r.const("dcg-clickable-menu-row")
                }, r.createElement("span", {
                    class: r.const("dcg-input-label")
                }, function() {
                    return e.controller.s("graphing-calculator-label-update-on-click")
                }), r.createElement(c.default, {
                    latex: function() {
                        return e.model.clickableInfo.latex
                    },
                    placeholder: e.const(""),
                    isFocused: function() {
                        return "updaterule" === e.getFocusedInput()
                    },
                    capExpressionSize: function() {
                        return !!e.controller.getGraphSettings().config.capExpressionSize
                    },
                    selectOnFocus: e.const(!0),
                    config: e.bindFn(e.getMQConfig),
                    getAriaLabel: function() {
                        return e.controller.s("graphing-calculator-narration-click-action")
                    },
                    getAriaPostLabel: e.const(""),
                    hasError: function() {
                        return e.hasError()
                    },
                    onUserChangedLatex: function(t) {
                        return e.dispatchUpdateRuleLatexIfChanged(t)
                    },
                    onExpressionSizeExceeded: function() {
                        return e.controller.dispatch({
                            type: "expression-size-exceeded"
                        })
                    },
                    onFocusedChanged: function(t) {
                        return e.handleFocusedChanged(t, "updaterule")
                    },
                    dataLabelAttributeValue: e.const("click-handler"),
                    needsSystemKeypad: function() {
                        return !e.controller.isKeypadEnabled()
                    }
                }), p(function() {
                    return e.packedError()
                }, function(t) {
                    return r.createElement("span", {
                        class: r.const("dcg-clickable-info-error-container")
                    }, r.createElement(a.TooltippedError, {
                        error: function() {
                            return e.controller.unpack(t())
                        },
                        gravity: e.const("s"),
                        size: e.const("small")
                    }))
                })), r.createElement(u, {
                    predicate: e.bindFn(e.isList)
                }, function() {
                    return r.createElement("div", {
                        class: r.const("dcg-clickable-list-index-notice")
                    }, r.createElement(s.Localize, {
                        i18n: e.const(e.controller),
                        key: e.const("graphing-calculator-label-list-index")
                    }, r.const("Use"), r.const(" "), r.createElement("span", {
                        class: function() {
                            return {
                                "dcg-index-variable-marker": !0,
                                "dcg-btn": !0,
                                "dcg-btn-light-gray": !0,
                                "dcg-mathquill-has-focus": "updaterule" === e.getFocusedInput(),
                                "dcg-do-not-blur": !0
                            }
                        },
                        onTap: e.bindFn(e.insertIndex)
                    }, r.const("index")), r.const(" "), r.const("to reference the clicked index in the list.")))
                }), r.createElement(h, {
                    placeholder: function() {
                        return e.controller.s("graphing-calculator-text-add-screen-reader-label-placeholder")
                    },
                    value: function() {
                        return e.model.clickableInfo.description
                    },
                    onInput: function(t) {
                        return e.controller.dispatch({
                            type: "set-clickableinfo-prop",
                            id: e.model.id,
                            prop: "description",
                            value: t
                        })
                    }
                }), r.createElement(u, {
                    predicate: function() {
                        return "image" === e.model.type
                    }
                }, function() {
                    return r.createElement("div", {
                        class: r.const("dcg-clickable-menu-row")
                    }, r.createElement(i.ClickableImageStatesView, {
                        controller: function() {
                            return e.controller
                        },
                        model: function() {
                            return e.model
                        }
                    }))
                }))
            }))
        }
        ,
        n.prototype.insertIndex = function() {
            this.controller.dispatch({
                type: "keypad/type-text",
                text: "index"
            })
        }
        ,
        n.prototype.isList = function() {
            return !!this.model.formula && !!this.model.formula.is_concrete_list
        }
        ,
        n.prototype.hasError = function() {
            return void 0 !== this.packedError()
        }
        ,
        n.prototype.packedError = function() {
            if (this.model.formula.click_handler && "error" === this.model.formula.click_handler.status)
                return this.model.formula.click_handler.error
        }
        ,
        n.prototype.toggleClickable = function() {
            this.controller.dispatch({
                type: "set-clickableinfo-prop",
                id: this.model.id,
                prop: "enabled",
                value: !this.model.clickableInfo.enabled
            }),
            this.model.clickableInfo.enabled && this.handleFocusedChanged(!0, "updaterule")
        }
        ,
        n.prototype.dispatchUpdateRuleLatexIfChanged = function(e) {
            this.model.clickableInfo.latex !== e && this.controller.dispatch({
                type: "set-clickableinfo-rule-latex",
                id: this.id,
                latex: e
            })
        }
        ,
        n.prototype.getMQConfig = function() {
            return {
                autoOperatorNames: l.getAutoOperators({
                    additionalOperators: ["index"]
                }),
                autoCommands: l.getAutoCommands()
            }
        }
        ,
        n
    }(n.BaseMenuSection);
    e.ClickableMenu = g
});
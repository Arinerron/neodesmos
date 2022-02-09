
define('expressions/tables/cell-view', ["require", "exports", "tslib", "keys", "dcgview", "jquery", "dcgview-helpers/mathquill-view", "dcgview-helpers/static-mathquill-view", "underscore", "graphing-calc/models/table", "../../dcgview-helpers/tooltipped-error", "lib/conditional_blur", "main/mathquill-operators", "../../shared-components/mathquill-braille-wrapper", "../expression_view"], function(require, e, t, n, o, l, r, i, a, s, c, d, u, h, p) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var g = o.Components.If
      , b = function(e) {
        function b() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(b, e),
        b.prototype.init = function() {
            this.model = this.props.model(),
            this.controller = this.props.controller(),
            this.table = this.model.column.table
        }
        ,
        b.prototype.template = function() {
            var e = this;
            return o.createElement("div", {
                class: function() {
                    return {
                        "dcg-cell": !0,
                        "dcg-do-not-blur": !0,
                        "dcg-empty": e.isEmpty(),
                        "dcg-non-editable": !!e.model.column.disabled,
                        "dcg-error": !!e.hasError(),
                        "dcg-selected": e.shouldFocus()
                    }
                },
                onTapStart: this.bindFn(this.focusThisCell)
            }, o.createElement("div", {
                class: o.const("dcg-inner-border")
            }), o.createElement("div", {
                role: o.const("gridcell")
            }, o.createElement(g, {
                predicate: this.bindFn(this.hasError)
            }, function() {
                return o.createElement("span", {
                    class: o.const("dcg-table-icon-error-container")
                }, o.createElement(c.TooltippedError, {
                    error: e.bindFn(e.getErrorMessage),
                    gravity: e.const("se"),
                    size: e.const("small")
                }))
            }), o.createElement(g, {
                predicate: function() {
                    return !!e.model.column.disabled || e.controller.isInEditListMode()
                }
            }, function() {
                return o.createElement(h.default, t.__assign({
                    latex: function() {
                        return e.getValue()
                    },
                    brailleShouldFocus: e.bindFn(e.shouldFocusReadonlyCell),
                    ariaLabel: function() {
                        return e.getAriaLabel("braille")
                    },
                    tabindex: function() {
                        return e.controller.isInEditListMode() ? -1 : 0
                    },
                    isStatic: e.const(!0),
                    onBrailleFocusedChanged: e.bindFn(e.handleFocusedChanged),
                    onBrailleKeydown: function(t) {
                        return e.handleKeydownOnReadonlyCell(t),
                        !0
                    }
                }, p.getBrailleWrapperProps(e.props.controller(), {
                    gravity: "s"
                })), o.createElement(i.default, {
                    getAriaLabel: function() {
                        return e.getAriaLabel("speech")
                    },
                    latex: function() {
                        return e.getValue()
                    },
                    config: e.bindFn(e.getMQConfig)
                }, o.createElement("span", {
                    class: o.const("dcg-math-field dcg-cell-math-content dcg-mathquill-input-span"),
                    role: o.const("textbox"),
                    "aria-roledescription": o.const("computed cell"),
                    "aria-readonly": o.const("true"),
                    tabindex: function() {
                        return e.controller.isInEditListMode() || e.isEmpty() ? -1 : 0
                    },
                    onKeyDown: e.bindFn(e.handleKeydownOnReadonlyCell),
                    manageFocus: e.const({
                        shouldBeFocused: e.bindFn(e.shouldFocusReadonlyCell),
                        onFocusedChanged: e.bindFn(e.handleFocusedChanged)
                    })
                })))
            }), o.createElement(g, {
                predicate: function() {
                    return !e.model.column.disabled && !e.controller.isInEditListMode()
                }
            }, function() {
                return o.createElement(h.default, t.__assign({
                    latex: function() {
                        return e.getValue()
                    },
                    brailleShouldFocus: e.bindFn(e.shouldFocusEditableCell),
                    ariaLabel: function() {
                        return e.getAriaLabel("braille")
                    },
                    onBrailleInput: function(t) {
                        return e.handleLatexChanged(t)
                    },
                    onBrailleFocusedChanged: e.bindFn(e.handleFocusedChanged),
                    onBrailleKeydown: e.bindFn(e.handleKeydownOnBrailleInput),
                    selectOnFocus: e.const(!0)
                }, p.getBrailleWrapperProps(e.props.controller(), {
                    gravity: "s"
                })), o.createElement(r.default, {
                    latex: function() {
                        return e.getValue()
                    },
                    isFocused: e.bindFn(e.shouldFocusEditableCell),
                    capExpressionSize: function() {
                        return e.controller.getCapExpressionSize()
                    },
                    config: e.bindFn(e.getMQConfig),
                    getAriaLabel: function() {
                        return e.getAriaLabel("speech")
                    },
                    getAriaPostLabel: e.bindFn(e.getErrorMessage),
                    hasError: e.const(!1),
                    onUserPressedKey: function(t, n) {
                        return e.handlePressedKey(t, n)
                    },
                    onUserChangedLatex: function(t) {
                        return e.handleLatexChanged(t)
                    },
                    onExpressionSizeExceeded: function() {
                        return e.controller.dispatch({
                            type: "expression-size-exceeded"
                        })
                    },
                    onFocusedChanged: e.bindFn(e.handleFocusedChanged),
                    selectOnFocus: e.const(!0),
                    needsSystemKeypad: function() {
                        return !e.controller.isKeypadEnabled()
                    }
                }, o.createElement("span", {
                    class: o.const("dcg-math-field dcg-cell-math-content")
                })))
            })), o.createElement("div", {
                class: o.const("dcg-empty-line")
            }))
        }
        ,
        b.prototype.focusThisCell = function(e) {
            e.wasHandled() || (e.handle(),
            this.shouldFocus() || this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "table",
                    id: this.table.id,
                    location: this.lookupCellPosition()
                }
            }))
        }
        ,
        b.prototype.handlePressedKey = function(e, t) {
            var o = r.default.getFocusedMathquill();
            if (o) {
                var l = r.default.handleKeystrokeAndDecideIfSpecialEvent(o, e, t);
                e === n.ESCAPE && d.default(),
                l ? this.controller.dispatch({
                    type: "navigate-table-by-key",
                    id: this.table.id,
                    key: e
                }) : this.handleLatexChanged(o.latex())
            }
        }
        ,
        b.prototype.handleKeydownOnBrailleInput = function(e) {
            var t = n.lookup(e);
            if (t) {
                t === n.ESCAPE && d.default();
                var o = "Enter" === t || "Up" === t || "Down" === t
                  , r = h.getFocusedBrailleElement()
                  , i = r && "Left" === t && 0 === r.selectionStart || "Right" === t && r.selectionStart === l(r).val().length;
                (o || i || ("Del" === t || "Backspace" === t) && 0 === this.getValue().length) && (this.controller.dispatch({
                    type: "navigate-table-by-key",
                    id: this.table.id,
                    key: "Del" === t ? "Delete" : t
                }),
                e.preventDefault())
            }
        }
        ,
        b.prototype.handleKeydownOnReadonlyCell = function(e) {
            var t = n.lookup(e);
            "Tab" !== t && (e.preventDefault(),
            "Esc" === t && d.default(),
            t && this.controller.dispatch({
                type: "navigate-table-by-key",
                id: this.table.id,
                key: t
            }))
        }
        ,
        b.prototype.handleLatexChanged = function(e) {
            this.getValue() !== e && this.controller.dispatch({
                type: "set-tablecell-latex",
                tableId: this.table.id,
                cell: this.lookupCellPosition(),
                latex: e
            })
        }
        ,
        b.prototype.shouldFocus = function() {
            return a.isEqual(this.lookupCellPosition(), s.getSelectedCell(this.table))
        }
        ,
        b.prototype.shouldFocusReadonlyCell = function() {
            return !this.controller.isInEditListMode() && !!this.model.column.disabled && this.shouldFocus()
        }
        ,
        b.prototype.shouldFocusEditableCell = function() {
            return !this.model.column.disabled && this.shouldFocus()
        }
        ,
        b.prototype.isNodeWithinTableCell = function(e) {
            if (!e)
                return !1;
            if (0 === l(e).closest(".dcg-cell").length)
                return !1;
            var t = this.controller.getItemRootNodeById(this.table.id);
            return !!t && l.contains(t, e)
        }
        ,
        b.prototype.handleFocusedChanged = function(e, t) {
            e ? this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "table",
                    id: this.table.id,
                    location: this.lookupCellPosition()
                }
            }) : this.isNodeWithinTableCell(t.relatedTarget) || this.controller.dispatch({
                type: "blur-focus-location",
                location: {
                    type: "table",
                    id: this.table.id,
                    location: this.lookupCellPosition()
                }
            })
        }
        ,
        b.prototype.lookupCellPosition = function() {
            return {
                row: this.model.row.index,
                column: this.model.column.index
            }
        }
        ,
        b.prototype.getPackedError = function() {
            return this.model.column.packedErrors[this.model.row.index - 1]
        }
        ,
        b.prototype.hasError = function() {
            return !!this.getPackedError()
        }
        ,
        b.prototype.getErrorMessage = function() {
            var e = this.getPackedError();
            return e ? this.controller.unpack(e) : ""
        }
        ,
        b.prototype.getValue = function() {
            var e = this.model.column.index
              , t = this.model.row.index - 1;
            return this.model.column.disabled ? this.model.column.computedValues[t] || "" : this.table.columns[e].values[t] || ""
        }
        ,
        b.prototype.isEmpty = function() {
            var e = h.getFocusedBrailleElement();
            return "" === this.getValue() && h.brailleInputIsEmpty(e)
        }
        ,
        b.prototype.getAriaLabel = function(e) {
            var t = this.lookupCellPosition()
              , n = t.row
              , o = t.column + 1;
            return "speech" === e ? this.controller.s("graphing-calculator-narration-table-row-column", {
                row: n.toString(),
                column: o.toString()
            }) : this.controller.raw("r__row__c__column__", {
                row: n.toString(),
                column: o.toString()
            })
        }
        ,
        b.prototype.getMQConfig = function() {
            return {
                autoOperatorNames: u.getAutoOperators()
            }
        }
        ,
        b
    }(o.Class);
    e.default = b
});


define('expressions/tables/header-view', ["require", "exports", "tslib", "keys", "jquery", "browser", "dcgview", "./table_icon_view", "dcgview-helpers/mathquill-view", "dcgview-helpers/static-mathquill-view", "underscore", "graphing-calc/models/table", "core/lib/dragmode", "main/mathquill-operators", "../../shared-components/mathquill-braille-wrapper", "../expression_view"], function(require, e, t, n, o, l, r, i, a, c, s, d, u, h, p, g) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var f = r.Components.If
      , m = function(e) {
        function m() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(m, e),
        m.prototype.init = function() {
            this.model = this.props.model(),
            this.controller = this.props.controller(),
            this.table = this.model.table
        }
        ,
        m.prototype.isRightSide = function() {
            return this.lookupCellPosition().column >= this.table.columnModels.length - 1
        }
        ,
        m.prototype.template = function() {
            var e = this;
            return r.createElement("div", {
                class: function() {
                    return {
                        "dcg-cell": !0,
                        "dcg-table-header": !0,
                        "dcg-do-not-blur": !0,
                        "dcg-left": 0 === e.model.index,
                        "dcg-right": e.isRightSide(),
                        "dcg-selected": e.shouldFocus(),
                        "dcg-error": !!e.model.error
                    }
                },
                index: function() {
                    return e.model.index
                },
                onTapStart: this.bindFn(this.focusThisCell)
            }, r.createElement("div", {
                class: r.const("dcg-inner-border")
            }), r.createElement(f, {
                predicate: function() {
                    return !e.isRightSide()
                }
            }, function() {
                return r.createElement(i.default, {
                    model: e.props.model,
                    controller: e.props.controller
                })
            }), r.createElement("div", {
                role: r.const("columnheader")
            }, r.createElement(f, {
                predicate: function() {
                    return !e.controller.isInEditListMode()
                }
            }, function() {
                return r.createElement(p.default, t.__assign({
                    latex: function() {
                        return e.model.latex || ""
                    },
                    brailleShouldFocus: e.bindFn(e.shouldFocus),
                    ariaLabel: function() {
                        return e.getAriaLabel("braille")
                    },
                    onBrailleInput: function(t) {
                        return e.handleLatexChanged(t)
                    },
                    onBrailleFocusedChanged: e.bindFn(e.handleMQFocusedChanged),
                    selectOnFocus: e.const(!0),
                    onBrailleKeydown: e.bindFn(e.handleKeydownOnBrailleInput)
                }, g.getBrailleWrapperProps(e.props.controller(), {
                    gravity: "s"
                })), r.createElement(a.default, {
                    latex: function() {
                        return e.model.latex || ""
                    },
                    isFocused: e.bindFn(e.shouldFocus),
                    capExpressionSize: function() {
                        return e.controller.getCapExpressionSize()
                    },
                    config: e.bindFn(e.getMQConfig),
                    getAriaLabel: function() {
                        return e.getAriaLabel("speech")
                    },
                    getAriaPostLabel: e.bindFn(e.getAriaPostLabel),
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
                    onFocusedChanged: e.bindFn(e.handleMQFocusedChanged),
                    selectOnFocus: e.const(!0),
                    needsSystemKeypad: function() {
                        return !e.controller.isKeypadEnabled()
                    }
                }, r.createElement("span", {
                    class: r.const("dcg-math-field dcg-cell-math-content")
                })))
            }), r.createElement(f, {
                predicate: function() {
                    return e.controller.isInEditListMode()
                }
            }, function() {
                return r.createElement(p.default, t.__assign({
                    latex: function() {
                        return e.model.latex || ""
                    },
                    ariaLabel: function() {
                        return e.getAriaLabel("braille")
                    },
                    onBrailleInput: function(t) {
                        return e.handleLatexChanged(t)
                    },
                    tabindex: e.const(-1),
                    isStatic: e.const(!0),
                    brailleShouldFocus: e.bindFn(e.shouldFocusNonEditCell),
                    onBrailleFocusedChanged: e.bindFn(e.handleMQFocusedChanged)
                }, g.getBrailleWrapperProps(e.props.controller(), {
                    gravity: "s"
                })), r.createElement(c.default, {
                    latex: function() {
                        return e.model.latex || ""
                    },
                    config: e.bindFn(e.getMQConfig),
                    getAriaLabel: function() {
                        return e.getAriaLabel("speech")
                    }
                }, r.createElement("span", {
                    class: r.const("dcg-math-field dcg-cell-math-content"),
                    role: r.const("textbox"),
                    "aria-roledescription": r.const("cell"),
                    "aria-readonly": r.const("true"),
                    tabindex: r.const("-1")
                })))
            }), r.createElement(f, {
                predicate: function() {
                    return e.model.dragMode !== u.DragMode.NONE && !e.model.error
                }
            }, function() {
                return r.createElement("span", {
                    class: r.const("dcg-drag-icon"),
                    "dcg-drag-mode": function() {
                        return e.model.dragMode
                    },
                    style: function() {
                        return {
                            color: e.model.color
                        }
                    }
                }, r.createElement("i", {
                    class: function() {
                        return {
                            "dcg-icon-move": e.model.dragMode === u.DragMode.XY,
                            "dcg-icon-move-horizontal": e.model.dragMode === u.DragMode.X,
                            "dcg-icon-move-vertical": e.model.dragMode === u.DragMode.Y
                        }
                    }
                }))
            })), r.createElement("div", {
                class: r.const("dcg-empty-line")
            }), r.createElement(f, {
                predicate: function() {
                    return e.isRightSide()
                }
            }, function() {
                return r.createElement("span", {
                    class: r.const("dcg-fade-right")
                })
            }))
        }
        ,
        m.prototype.focusThisCell = function(e) {
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
        m.prototype.lookupCellPosition = function() {
            return {
                row: 0,
                column: this.model.index
            }
        }
        ,
        m.prototype.getAriaLabel = function(e) {
            var t = this.lookupCellPosition();
            return "speech" === e ? this.controller.s("graphing-calculator-narration-table-column-header", {
                column: t.column + 1
            }) : this.controller.raw("h__column__", {
                column: t.column + 1
            })
        }
        ,
        m.prototype.getAriaPostLabel = function() {
            var e = ""
              , t = this.model;
            return t.shouldGraph && (t.points || t.lines) && !d.isColumnEmpty(t) && (e = this.controller.s("graphing-calculator-narration-expression-evaluation-has-graph"),
            l.IS_APPLE ? e += " " + this.controller.s("graphing-calculator-narration-expression-audio-trace-mac") : e += " " + this.controller.s("graphing-calculator-narration-expression-audio-trace-windows")),
            e
        }
        ,
        m.prototype.handlePressedKey = function(e, t) {
            var n = a.default.getFocusedMathquill();
            n && (a.default.handleKeystrokeAndDecideIfSpecialEvent(n, e, t) ? this.controller.dispatch({
                type: "navigate-table-by-key",
                id: this.table.id,
                key: e
            }) : this.handleLatexChanged(n.latex()))
        }
        ,
        m.prototype.handleKeydownOnBrailleInput = function(e) {
            var t = n.lookup(e);
            if (t) {
                var l = "Enter" === t || "Up" === t || "Down" === t
                  , r = p.getFocusedBrailleElement()
                  , i = r && "Left" === t && 0 === r.selectionStart || "Right" === t && r.selectionStart === o(r).val().length
                  , a = 0 === this.model.latex.length && p.brailleInputIsEmpty(r);
                (l || i || ("Del" === t || "Backspace" === t) && a) && (this.controller.dispatch({
                    type: "navigate-table-by-key",
                    id: this.table.id,
                    key: "Del" === t ? "Delete" : t
                }),
                e.preventDefault())
            }
        }
        ,
        m.prototype.handleLatexChanged = function(e) {
            this.model.latex !== e && this.controller.dispatch({
                type: "set-tablecell-latex",
                tableId: this.table.id,
                cell: this.lookupCellPosition(),
                latex: e
            })
        }
        ,
        m.prototype.shouldFocus = function() {
            return !this.controller.isInEditListMode() && s.isEqual(this.lookupCellPosition(), d.getSelectedCell(this.table))
        }
        ,
        m.prototype.shouldFocusNonEditCell = function() {
            return s.isEqual(this.lookupCellPosition(), d.getSelectedCell(this.table))
        }
        ,
        m.prototype.isNodeWithinTableCell = function(e) {
            if (!e)
                return !1;
            if (0 === o(e).closest(".dcg-cell").length)
                return !1;
            var t = this.controller.getItemRootNodeById(this.table.id);
            return !!t && o.contains(t, e)
        }
        ,
        m.prototype.handleMQFocusedChanged = function(e, t) {
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
        m.prototype.getMQConfig = function() {
            return {
                autoOperatorNames: h.getAutoOperators()
            }
        }
        ,
        m
    }(r.Class);
    e.default = m
});
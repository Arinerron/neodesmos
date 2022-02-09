define('main/instancehotkeys', ["require", "exports", "keys", "lib/aria", "jquery", "graphing-calc/models/expression", "browser", "touchtracking"], function(require, t, e, r, o, l, i, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = function() {
        function t(t) {
            this.controller = t
        }
        return t.prototype.handleKeydown = function(t) {
            var a = this
              , n = e.lookupChar(t);
            if (e.isUndo(t))
                t.stopPropagation(),
                t.preventDefault(),
                this.controller.hasVisibleAndUndoableToast() ? this.controller.toastUndo() : this.controller.dispatch({
                    type: "undo"
                });
            else if (e.isRedo(t))
                t.stopPropagation(),
                t.preventDefault(),
                this.controller.dispatch({
                    type: "redo"
                });
            else if (!t.ctrlKey && !t.metaKey || t.ctrlKey && t.metaKey || t.altKey || "F" !== n)
                if (!t.altKey && !t.metaKey || t.ctrlKey || t.shiftKey || void 0 !== n)
                    if (t.shiftKey && (t.altKey || t.metaKey) && !t.ctrlKey) {
                        if (e.lookup(t) === e.UP)
                            t.preventDefault(),
                            t.stopPropagation(),
                            this.controller.dispatch({
                                type: "set-all-folders-collapsed",
                                isCollapsed: !0
                            }),
                            r.alert(this.controller.s("graphing-calculator-narration-all-folders-collapsed"));
                        else if (e.lookup(t) === e.DOWN)
                            t.preventDefault(),
                            t.stopPropagation(),
                            this.controller.dispatch({
                                type: "set-all-folders-collapsed",
                                isCollapsed: !1
                            }),
                            r.alert(this.controller.s("graphing-calculator-narration-all-folders-expanded"));
                        else if ("E" === n) {
                            if (!this.controller.isListEnabled())
                                return;
                            this.controller.isListVisible() ? (this.controller.dispatch({
                                type: "hide-expressions-list",
                                focusShowIcon: !1
                            }),
                            r.alert(this.controller.s("graphing-calculator-narration-hide-expression-list"))) : (this.controller.dispatch({
                                type: "show-expressions-list",
                                focusHideIcon: !1
                            }),
                            this.focusExpressionList(this.controller.s("graphing-calculator-narration-show-expression-list"))),
                            t.preventDefault(),
                            t.stopPropagation()
                        }
                    } else if (t.ctrlKey && (t.altKey || t.metaKey) && !t.shiftKey) {
                        if ("E" === n) {
                            if (!this.controller.isListEnabled())
                                return;
                            t.preventDefault(),
                            t.stopPropagation(),
                            this.focusExpressionList(this.controller.s("graphing-calculator-narration-expression-list"))
                        } else if ("X" === n) {
                            if (!this.controller.isListEnabled())
                                return;
                            t.preventDefault(),
                            t.stopPropagation(),
                            this.controller.canUserAddExpressions() ? (r.alert(this.controller.s("graphing-calculator-narration-add-expression")),
                            this.controller.dispatch({
                                type: "new-expression"
                            })) : r.alert(this.controller.s("graphing-calculator-narration-unable-to-add-expression"))
                        } else if ("O" === n) {
                            if (!this.controller.isListEnabled())
                                return;
                            t.preventDefault(),
                            t.stopPropagation(),
                            this.controller.canUserAddExpressions() && this.controller.areNotesEnabled() ? (r.alert(this.controller.s("graphing-calculator-narration-add-note")),
                            this.controller.dispatch({
                                type: "new-text"
                            })) : r.alert(this.controller.s("graphing-calculator-narration-unable-to-add-note"))
                        } else if ("F" === n && this.controller.canUserAddExpressions() && this.controller.areFoldersEnabled())
                            t.preventDefault(),
                            t.stopPropagation(),
                            r.alert(this.controller.s("graphing-calculator-narration-add-folder")),
                            this.controller.dispatch({
                                type: "new-folder"
                            });
                        else if ("I" === n && this.controller.canUserAddExpressions() && this.controller.areImagesEnabled())
                            t.preventDefault(),
                            t.stopPropagation(),
                            this.controller.dispatch({
                                type: "toggle-add-expression",
                                focusOnOpen: !1
                            }),
                            this.controller.runAfterDispatch(function() {
                                a.controller.find$(".dcg-add-expression-container input[type=file]").trigger("click"),
                                r.alert(a.controller.s("graphing-calculator-narration-add-image"))
                            });
                        else if ("T" === n)
                            t.preventDefault(),
                            t.stopPropagation(),
                            this.controller.canUserAddExpressions() ? (r.alert(this.controller.s("graphing-calculator-narration-add-table")),
                            this.controller.dispatch({
                                type: "new-table"
                            })) : r.alert(this.controller.s("graphing-calculator-narration-unable-to-add-table"));
                        else if ("G" === n)
                            t.preventDefault(),
                            t.stopPropagation(),
                            this.controller.dispatch({
                                type: "toggle-graph-settings",
                                focusOnOpen: !0
                            });
                        else if ("P" === n) {
                            t.preventDefault(),
                            t.stopPropagation();
                            var c = this.controller.find$(".dcg-tabbable-point, .dcg-tabbable-draggableimage").filter("[tabindex=0]");
                            0 === c.length && (c = this.controller.find$(".dcg-editable-label-border").find('input, textarea, [role="textbox"]')),
                            this.focusElement(c.first(), this.controller.s("graphing-calculator-narration-no-interactive-points"))
                        } else if ("Z" === n) {
                            (f = this.controller.getSelectedItem()) && f.id && this.controller.dispatch({
                                type: "expression-zoom-fit",
                                id: f.id
                            })
                        } else if ("D" === n && this.controller.canUserAddExpressions()) {
                            t.preventDefault(),
                            t.stopPropagation();
                            var p = !this.controller.isInEditListMode();
                            this.controller.dispatch({
                                type: "set-edit-list-mode",
                                isEditListMode: p,
                                focusExpressionList: !0
                            })
                        }
                    } else if ((t.altKey || t.metaKey) && !t.ctrlKey && t.shiftKey && "F" === n && this.controller.isDecimalToFractionEnabled()) {
                        var d = this.controller.getSelectedItem();
                        d && "expression" === d.type && (t.preventDefault(),
                        t.stopPropagation(),
                        this.controller.dispatch({
                            type: "toggle-fraction-evaluation",
                            id: d.id
                        }),
                        this.controller.runAfterDispatch(function() {
                            l.shouldEvaluationDisplayAsFraction(d) ? r.alert(a.controller.s("graphing-calculator-narration-show-as-fraction")) : r.alert(a.controller.s("graphing-calculator-narration-show-as-decimal"))
                        }))
                    } else if (t.altKey || t.ctrlKey || t.metaKey || t.shiftKey) {
                        if (!t.metaKey && !t.shiftKey && t.ctrlKey === i.IS_APPLE && t.altKey === !i.IS_APPLE)
                            if ("N" === n) {
                                if (!this.controller.getBrailleControls())
                                    return;
                                t.preventDefault(),
                                t.stopPropagation(),
                                this.controller.dispatch({
                                    type: "set-braille-mode",
                                    mode: "nemeth"
                                }),
                                r.alert(this.controller.s("shared-calculator-narration-braille-mode-nemeth"))
                            } else if ("U" === n) {
                                if (!this.controller.getBrailleControls())
                                    return;
                                t.preventDefault(),
                                t.stopPropagation(),
                                this.controller.dispatch({
                                    type: "set-braille-mode",
                                    mode: "ueb"
                                }),
                                r.alert(this.controller.s("shared-calculator-narration-braille-mode-ueb"))
                            } else if ("Q" === n || "X" === n) {
                                if (!this.controller.getBrailleControls())
                                    return;
                                t.preventDefault(),
                                t.stopPropagation(),
                                this.controller.dispatch({
                                    type: "set-braille-mode",
                                    mode: "none"
                                }),
                                r.alert(this.controller.s("shared-calculator-narration-braille-mode-off"))
                            } else if ("6" === n) {
                                if (!this.controller.getBrailleControls())
                                    return;
                                t.preventDefault(),
                                t.stopPropagation();
                                var h = !this.controller.getSixKeyInput();
                                this.controller.dispatch({
                                    type: "set-six-key-input",
                                    useSixKeyInput: h
                                }),
                                r.alert(h ? this.controller.s("shared-calculator-narration-six-key-mode-on") : this.controller.s("shared-calculator-narration-six-key-mode-off"))
                            }
                    } else
                        e.lookup(t) === e.BACKSPACE ? document.activeElement && s.elIsFocusable(o(document.activeElement)) || t.preventDefault() : e.lookup(t) === e.ESCAPE && this.controller.isInEditListMode() && 0 === this.controller.find$(".dcg-options-menu").length && (t.preventDefault(),
                        t.stopPropagation(),
                        this.controller.dispatch({
                            type: "set-edit-list-mode",
                            isEditListMode: !1,
                            focusExpressionList: !0
                        }));
                else {
                    if (e.lookup(t) === e.UP)
                        (f = this.controller.getSelectedItem()) && "folder" === f.type && (t.preventDefault(),
                        t.stopPropagation(),
                        this.controller.dispatch({
                            type: "set-folder-collapsed",
                            id: f.id,
                            isCollapsed: !0
                        }),
                        r.alert(this.controller.s("graphing-calculator-narration-folder-collapsed")));
                    else if (e.lookup(t) === e.DOWN) {
                        var f;
                        (f = this.controller.getSelectedItem()) && "folder" === f.type && (t.preventDefault(),
                        t.stopPropagation(),
                        this.controller.dispatch({
                            type: "set-folder-collapsed",
                            id: f.id,
                            isCollapsed: !1
                        }),
                        r.alert(this.controller.s("graphing-calculator-narration-folder-expanded")))
                    }
                }
            else
                this.controller.isExpressionListFocused() && (this.controller.dispatch({
                    type: "open-expression-search"
                }),
                t.preventDefault(),
                t.stopPropagation())
        }
        ,
        t.prototype.focusExpressionList = function(t) {
            var e = this.controller.getSelectedItem();
            e || (e = this.controller.getItemModelByIndex(0)),
            e ? (r.alert(t),
            this.controller.dispatch({
                type: "move-focus-to-item",
                id: e.id
            })) : r.alert(this.controller.s("graphing-calculator-narration-unable-to-focus-expression-list"))
        }
        ,
        t.prototype.focusElement = function(t, e) {
            t.length ? t.trigger("focus") : e && r.alert(e)
        }
        ,
        t
    }();
    t.default = a
});

define('graphing-calc/actions/keyboard', ["require", "exports", "browser", "lib/conditional_blur", "../models/table", "../models/focus", "../models/list", "../models/abstract-item"], function(require, e, t, o, l, i, d, r) {
    "use strict";
    function s(e) {
        var t = e.getSelectedItem();
        t && (e.inAudioTraceMode() || (!d.selectPrevItem(e.getListModel()) && e.getTickerOpen() && i.setFocusLocation(e, {
            type: "ticker",
            location: "handler"
        }),
        (t = e.getSelectedItem()) && i.moveFocusToItem(e, t.id, "end")))
    }
    function n(e) {
        var t;
        if (!e.inAudioTraceMode()) {
            if ("ticker" === (null === (t = e.getFocusLocation()) || void 0 === t ? void 0 : t.type)) {
                var o = d.getFirstSelectableItem(e.getListModel());
                if (o)
                    return i.moveFocusToItem(e, o.id, "start")
            }
            if (!d.selectNextItem(e.getListModel()) && !e.isInEditListMode()) {
                var l = e.createItemModel({
                    type: "expression",
                    id: e.generateId(),
                    color: e.getNextColor()
                });
                d.insertItemAtEnd(e.getListModel(), l),
                d.setSelected(e.getListModel(), l)
            }
            var r = e.getSelectedItem();
            r && i.moveFocusToItem(e, r.id, "start")
        }
    }
    function c(e) {
        if (!e.isInEditListMode()) {
            var o = e.getSelectedItem();
            if (o && (1 !== e.getItemCount() || "expression" !== o.type)) {
                var l = "text" === o.type
                  , s = d.getParentFolderModel(o);
                if (s) {
                    var n = e.getNumberOfItemsInFolder(s.id);
                    if (o.index === s.index + n)
                        return void r.setFolderId(o, "")
                }
                u(e, {
                    moveSelection: !0
                }),
                l && t.IS_IPAD && t.IS_IN_IFRAME ? d.setSelected(e.getListModel(), void 0) : (o = e.getSelectedItem()) && i.moveFocusToItem(e, o.id, "end")
            }
        }
    }
    function a(e) {
        if (!e.isInEditListMode()) {
            var t = e.getSelectedItem();
            t && (1 === e.getItemCount() && "expression" === t.type || (I(e, {
                moveSelection: !0
            }),
            (t = e.getSelectedItem()) && i.moveFocusToItem(e, t.id, "start")))
        }
    }
    function m(e) {
        if (!e.isInEditListMode()) {
            var l = e.getSelectedItem();
            if (l) {
                if ("text" === l.type && t.IS_IPAD && t.IS_IN_IFRAME)
                    return o.default(),
                    void d.setSelected(e.getListModel(), void 0);
                if (d.getMissingVariablesForItem(l).length && e.areSlidersEnabled())
                    return e.createSlidersForItem(l.id, d.getMissingVariablesForItem(l).concat(""));
                var s = e.createItemModel({
                    type: "expression",
                    id: e.generateId(),
                    color: e.getNextColor()
                })
                  , n = l.index + 1;
                "folder" === l.type && l.collapsed && (n += e.getNumberOfItemsInFolder(l.id)),
                d.insertItemAtIndex(e.getListModel(), s, n),
                d.setSelected(e.getListModel(), s),
                "folder" !== l.type || l.collapsed ? "folder" !== l.type && l.folderId && r.setFolderId(s, l.folderId) : r.setFolderId(s, l.id),
                (l = e.getSelectedItem()) && i.moveFocusToItem(e, l.id)
            }
        }
    }
    function u(e, t) {
        var o = t.moveSelection
          , l = f(e)
          , i = e.getListModel();
        if (l) {
            var r = d.findPrevSelectableItem(i, l.index);
            if (e._removeExpressionSynchronously(l),
            o) {
                if (!r) {
                    var s = d.getFirstSelectableItem(i);
                    s && (r = s)
                }
                d.setSelected(i, r)
            } else
                d.setSelected(i, void 0)
        }
    }
    function I(e, t) {
        var o = t.moveSelection
          , l = f(e)
          , i = e.getListModel();
        if (l) {
            var r = d.findNextSelectableItem(i, l.index);
            if (e._removeExpressionSynchronously(l),
            o) {
                if (!r) {
                    var s = d.getLastSelectableItem(i);
                    s && (r = s)
                }
                d.setSelected(i, r)
            } else
                d.setSelected(i, void 0)
        }
    }
    function f(e) {
        var t = e.getSelectedItem();
        return "folder" == (null == t ? void 0 : t.type) && t.collapsed && t.selectedHiddenChild ? t.selectedHiddenChild : t
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.downwardDeleteSelectedExpression = e.upwardDeleteSelectedExpression = e.onEnterPressed = e.onDeletePressed = e.onBackspacePressed = e.onDownPressed = e.onUpPressed = e.navigateTableByKey = void 0,
    e.navigateTableByKey = function(e, t, o) {
        var d = e.getItemModel(t);
        if (d && "table" === d.type) {
            var r = d
              , u = l.getSelectedCell(r)
              , I = u ? u.row : -1
              , f = u ? u.column : -1
              , v = r.columnModels
              , g = v[0].cells.length
              , S = v.length
              , p = function(o, l) {
                -1 === o ? s(e) : o > g ? n(e) : (-1 === l ? (l = S - 1,
                o--) : l === S && (o++,
                l = 0),
                i.focusTableCell(e, t, {
                    row: o,
                    column: l
                }))
            }
              , b = function(o) {
                g > 2 && l.removeRow(r, I - 1),
                i.focusTableCell(e, t, {
                    row: o,
                    column: f
                })
            }
              , M = function(o) {
                0 === f || S <= 2 || (l.removeColumn(r, f),
                i.focusTableCell(e, t, {
                    row: I,
                    column: o
                }))
            };
            switch (o) {
            case "Left":
                p(I, f - 1);
                break;
            case "Right":
                p(I, f + 1);
                break;
            case "Up":
                p(I - 1, f);
                break;
            case "Down":
                p(I + 1, f);
                break;
            case "Enter":
                if (I >= g)
                    return m(e);
                if (f > 0)
                    return p(I + 1, f);
                if (I === g - 1) {
                    var x = l.getRowAutoFillValues(r, I);
                    l.insertBlankRow(r, I);
                    for (var w = 0; w < x.length; w++)
                        l.setCellLatex(r, {
                            row: I + 1,
                            column: w
                        }, x[w]);
                    return void i.focusTableCell(e, t, {
                        row: I + 1,
                        column: f
                    })
                }
                l.insertBlankRow(r, I),
                i.focusTableCell(e, t, {
                    row: I + 1,
                    column: f
                });
                break;
            case "Backspace":
                0 === I ? 0 === f ? c(e) : f === S - 1 || 1 === f && 3 === S ? p(0, f - 1) : M(f - 1) : 0 !== f ? p(I, f - 1) : I === g ? p(I - 1, f) : b(I - 1);
                break;
            case "Delete":
                0 === I ? 0 === f ? a(e) : f < S - 1 && M(f) : I >= g || b(I)
            }
        }
    }
    ,
    e.onUpPressed = s,
    e.onDownPressed = n,
    e.onBackspacePressed = c,
    e.onDeletePressed = a,
    e.onEnterPressed = m,
    e.upwardDeleteSelectedExpression = u,
    e.downwardDeleteSelectedExpression = I
});
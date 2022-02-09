define('graphing-calc/models/focus', ["require", "exports", "./expression", "./list"], function(require, e, t, o) {
    "use strict";
    function i(e, t, o) {
        s(e, n(e, t, o))
    }
    function s(e, i) {
        if (e.focusLocation = i,
        i && ("ticker" === i.type && (e.getListModel().ticker.playing = !1,
        o.setSelected(e.getListModel(), void 0)),
        "settings" !== i.type && "editable-label" !== i.type && "add-item-btn" !== i.type && "add-expression-btn" !== i.type && "add-note-btn" !== i.type && "add-table-btn" !== i.type && "add-folder-btn" !== i.type && "add-ticker-btn" !== i.type && "add-image-btn" !== i.type && "edit-list-toggle" !== i.type && "hide-expression-list-btn" !== i.type && "show-expression-list-btn" !== i.type && "search-expressions" !== i.type && "ticker" !== i.type)) {
            var s = e.getItemModel(i.id);
            "expression-menu" !== i.type ? (o.setSelected(e.getListModel(), s),
            s && "expression" === s.type && t.setSliderIsPlaying(s, !1)) : o.setSelected(e.getListModel(), void 0)
        }
    }
    function n(e, t, o) {
        var i = e.getItemModel(t);
        if (i)
            switch (i.type) {
            case "expression":
                return {
                    type: e.isInEditListMode() ? "readonly-expression" : i.type,
                    id: t
                };
            case "folder":
            case "text":
                return {
                    type: i.type,
                    id: t
                };
            case "table":
                var s = {
                    row: 1,
                    column: 0
                }
                  , n = !1;
                return o && ("cell" === o.location ? s = {
                    row: o.row,
                    column: o.column
                } : "end" === o ? s = {
                    row: i.columnModels[0].cells.length,
                    column: 0
                } : "start" === o ? s = {
                    row: 0,
                    column: 0
                } : "container" === o && (n = !0)),
                n ? {
                    type: "table-container",
                    id: t
                } : {
                    type: i.type,
                    id: t,
                    location: s
                };
            case "image":
                return {
                    type: i.type,
                    id: t,
                    location: "name"
                };
            default:
                return i
            }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.focusTableCell = e.getFocusedItem = e.addFocusForKeypad = e.computeFocusLocationForItem = e.setFocusLocation = e.moveFocusToItem = void 0,
    e.moveFocusToItem = i,
    e.setFocusLocation = s,
    e.computeFocusLocationForItem = n,
    e.addFocusForKeypad = function(e) {
        var t = e.getSelectedItem();
        if (t && "expression" === t.type)
            i(e, t.id);
        else if (!t || "table" !== t.type || !e.focusLocation) {
            for (var s = e.getFirstFullyVisibleItem(), n = e.getListModel(); s && "expression" !== s.type; )
                s = o.findNextSelectableItem(n, s.index);
            if (s)
                i(e, s.id);
            else {
                var d = e.createItemModel({
                    type: "expression",
                    id: e.generateId(),
                    color: e.getNextColor()
                });
                o.insertItemAtEnd(e.getListModel(), d),
                i(e, d.id)
            }
        }
    }
    ,
    e.getFocusedItem = function(e) {
        var t = e.focusLocation;
        if (t && "settings" !== t.type && "editable-label" !== t.type && "add-item-btn" !== t.type && "add-expression-btn" !== t.type && "add-note-btn" !== t.type && "add-table-btn" !== t.type && "add-ticker-btn" !== t.type && "add-folder-btn" !== t.type && "add-image-btn" !== t.type && "edit-list-toggle" !== t.type && "hide-expression-list-btn" !== t.type && "show-expression-list-btn" !== t.type && "search-expressions" !== t.type && "ticker" !== t.type)
            return e.getItemModel(t.id)
    }
    ,
    e.focusTableCell = function(e, t, o) {
        s(e, {
            type: "table",
            id: t,
            location: o
        })
    }
});
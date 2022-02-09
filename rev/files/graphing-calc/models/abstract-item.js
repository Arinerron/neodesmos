
define('graphing-calc/models/abstract-item', ["require", "exports", "./list", "graphing-calc/models/expression", "graphing-calc/models/table"], function(require, e, r, t, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getMaybeGradientDisplayColor = e.getDisplayColor = e.getDisplayState = e.updateIsHiddenFromUI = e.setFolderId = e.setSecret = e.DEFAULTS = e.getGUID = void 0;
    var i = 0;
    function n() {
        return "abstract_item_" + i++
    }
    function l(e) {
        return e.colorLatex ? ("expression" === e.type ? (r = t.getColorLatexValue(e),
        i = t.isColorLatexValid(e)) : "header" === e.type && (r = o.getColorLatexValue(e),
        i = o.isColorLatexValid(e)),
        i && r ? r : e.color) : e.color;
        var r, i
    }
    e.getGUID = n,
    e.DEFAULTS = function(e) {
        return {
            guid: n(),
            controller: e,
            index: -1,
            displayIndex: -1,
            secretIndex: -1,
            isHiddenFromUI: !0,
            renderShell: !0
        }
    }
    ,
    e.setSecret = function(e, r) {
        e.secret = r
    }
    ,
    e.setFolderId = function(e, r) {
        "folder" !== e.type && (e.folderId = r)
    }
    ,
    e.updateIsHiddenFromUI = function(e) {
        e.isHiddenFromUI = r.isItemHiddenFromUI(e)
    }
    ,
    e.getDisplayState = function(e) {
        return e.isHiddenFromUI || e.filteredBySearch ? "none" : e.renderShell ? "shell" : "render"
    }
    ,
    e.getDisplayColor = function(e) {
        var r = l(e);
        return Array.isArray(r) ? r[0] : r
    }
    ,
    e.getMaybeGradientDisplayColor = l
});
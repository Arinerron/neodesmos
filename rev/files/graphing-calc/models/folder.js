define('graphing-calc/models/folder', ["require", "exports", "tslib", "core/lib/deepCopy", "core/lib/copy-properties", "./abstract-item", "./list", "core/graphing-calc/json/folder"], function(require, e, t, d, i, l, o, a) {
    "use strict";
    function c(e) {
        e.cachedViewState = {
            type: e.type,
            id: e.id,
            title: e.title,
            hidden: e.hidden,
            collapsed: e.collapsed,
            secret: e.secret
        }
    }
    function n(e) {
        e.cachedUndoRedoDiffState = e.cachedViewState,
        e.cachedUndoRedoFullState = e.cachedViewState
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.setHidden = e.setTitle = e.setCollapsed = e.updateSelectedHiddenChild = e.restoreState = e.onControllerUpdate = e.initModel = e.updateCachedUndoRedoState = e.updateCachedViewState = e.getState = void 0,
    e.getState = function(e, t) {
        var d = e.cachedViewState;
        return t.stripDefaults ? a.stripDefaults(d) : d
    }
    ,
    e.updateCachedViewState = c,
    e.updateCachedUndoRedoState = n,
    e.initModel = function(e, i) {
        var o = d.default(a.inflateDefaults(e));
        return t.__assign(t.__assign(t.__assign({}, o), l.DEFAULTS(i)), {
            cachedUndoRedoDiffState: {},
            cachedUndoRedoFullState: {},
            cachedViewState: {}
        })
    }
    ,
    e.onControllerUpdate = function(e) {
        r(e),
        l.updateIsHiddenFromUI(e),
        c(e),
        n(e)
    }
    ;
    var s = {
        id: !1,
        type: !1,
        hidden: !0,
        secret: !0,
        collapsed: !0,
        title: !0
    };
    function r(e) {
        var t = e.controller
          , d = t.getSelectedItem();
        e.collapsed ? d && "folder" !== d.type && d.folderId === e.id && "none" === l.getDisplayState(d) ? (e.selectedHiddenChild = d,
        o.setSelected(t.getListModel(), e)) : d !== e && (e.selectedHiddenChild = void 0) : (d === e && e.selectedHiddenChild && o.setSelected(t.getListModel(), e.selectedHiddenChild),
        e.selectedHiddenChild = void 0)
    }
    e.restoreState = function(e, t) {
        i.copyProperties({
            from: t,
            to: e,
            props: s
        })
    }
    ,
    e.updateSelectedHiddenChild = r,
    e.setCollapsed = function(e, t) {
        e.collapsed = t
    }
    ,
    e.setTitle = function(e, t) {
        e.title = t
    }
    ,
    e.setHidden = function(e, t) {
        e.hidden = t
    }
});
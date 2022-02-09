
define('graphing-calc/models/text', ["require", "exports", "tslib", "./abstract-item", "core/lib/deepCopy", "core/lib/copy-properties", "core/graphing-calc/json/text"], function(require, e, t, a, d, o, c) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.updateCachedUndoRedoState = e.updateCachedViewState = e.getState = e.restoreState = e.onControllerUpdate = e.initModel = e.setText = void 0,
    e.setText = function(e, t) {
        e.text = t
    }
    ,
    e.initModel = function(e, o) {
        var i = d.default(c.inflateDefaults(e));
        return t.__assign(t.__assign(t.__assign({}, i), a.DEFAULTS(o)), {
            cachedUndoRedoDiffState: {},
            cachedUndoRedoFullState: {},
            cachedViewState: {}
        })
    }
    ,
    e.onControllerUpdate = function(e) {
        a.updateIsHiddenFromUI(e),
        r(e),
        n(e)
    }
    ;
    var i = {
        id: !1,
        type: !1,
        folderId: !0,
        text: !0,
        secret: !0
    };
    function r(e) {
        e.cachedViewState = {
            type: e.type,
            id: e.id,
            folderId: e.folderId,
            text: e.text,
            secret: e.secret
        }
    }
    function n(e) {
        e.cachedUndoRedoDiffState = e.cachedViewState,
        e.cachedUndoRedoFullState = e.cachedViewState
    }
    e.restoreState = function(e, t) {
        o.copyProperties({
            from: t,
            to: e,
            props: i
        })
    }
    ,
    e.getState = function(e, t) {
        var a = e.cachedViewState;
        return t.stripDefaults ? c.stripDefaults(a) : a
    }
    ,
    e.updateCachedViewState = r,
    e.updateCachedUndoRedoState = n
});
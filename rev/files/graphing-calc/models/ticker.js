define('graphing-calc/models/ticker', ["require", "exports", "tslib", "../../core/graphing-calc/json/ticker", "../../core/lib/copy-properties"], function(require, e, t, a, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.eachLatex = e.getMissingVariables = e.getMinStepPackedError = e.getHandlerPackedError = e.updateLastTickTime = e.shouldTick = e.onControllerUpdate = e.onFormulaUpdate = e.restoreState = e.initModel = e.updateCachedUndoRedoState = e.updateCachedViewState = e.getUndoRedoFullState = e.getUndoRedoDiffState = e.getState = e.defaultTicker = void 0;
    var i = "dcg_ticker_guid_internal";
    function n(e) {
        e.cachedViewState = {
            handlerLatex: e.handlerLatex,
            minStepLatex: e.minStepLatex,
            playing: e.playing,
            open: e.open
        }
    }
    function o(e) {
        var t = e.cachedViewState;
        e.cachedUndoRedoDiffState = t,
        e.cachedUndoRedoFullState = t
    }
    function d(e) {
        var r = a.inflateDefaults(e);
        return t.__assign(t.__assign({}, r), {
            type: "ticker",
            guid: i,
            id: "dcg_ticker_guid_internal",
            avgDelta: 0,
            lastTickTime: void 0,
            cachedViewState: {},
            cachedParsableState: {},
            cachedUndoRedoDiffState: {},
            cachedUndoRedoFullState: {}
        })
    }
    e.defaultTicker = function() {
        return d(a.DEFAULTS)
    }
    ,
    e.getState = function(e, t) {
        return t.stripDefaults ? a.stripDefaults(e.cachedViewState) : e.cachedViewState
    }
    ,
    e.getUndoRedoDiffState = function(e) {
        return e.cachedUndoRedoDiffState
    }
    ,
    e.getUndoRedoFullState = function(e) {
        return e.cachedUndoRedoFullState
    }
    ,
    e.updateCachedViewState = n,
    e.updateCachedUndoRedoState = o,
    e.initModel = d,
    e.restoreState = function(e, t) {
        r.copyAllProperties(t, e)
    }
    ,
    e.onFormulaUpdate = function(e, t) {
        e.formula = t
    }
    ,
    e.onControllerUpdate = function(e) {
        n(e),
        o(e),
        function(e) {
            e.cachedParsableState = {
                type: "ticker",
                id: e.id,
                handlerLatex: e.handlerLatex,
                minStepLatex: e.minStepLatex,
                shouldGraph: !1
            }
        }(e)
    }
    ,
    e.shouldTick = function(e, t) {
        var a, r, i = t.currentFrameTime, n = t.previousFrameTime;
        if (!e.playing || "maybe-valid" !== (null === (a = e.formula) || void 0 === a ? void 0 : a.handler.status))
            return !1;
        if (null == e.lastTickTime || null == n)
            return !0;
        if ("valid" !== (null === (r = e.formula) || void 0 === r ? void 0 : r.minStep.status))
            return !1;
        var o = e.formula.minStep.value
          , d = e.lastTickTime + o;
        return i >= d || d - i < (i - n) / 2
    }
    ,
    e.updateLastTickTime = function(e, t) {
        e.lastTickTime = t
    }
    ,
    e.getHandlerPackedError = function(e) {
        if (e.formula)
            return "error" === e.formula.handler.status ? e.formula.handler.error : void 0
    }
    ,
    e.getMinStepPackedError = function(e) {
        if (e.formula)
            return "error" === e.formula.minStep.status ? e.formula.minStep.error : void 0
    }
    ,
    e.getMissingVariables = function(e) {
        var t;
        return (null === (t = e.formula) || void 0 === t ? void 0 : t.variables) || []
    }
    ,
    e.eachLatex = function(e, t) {
        t(e.handlerLatex, "tickerHandler"),
        t(e.minStepLatex, "tickerMinStep")
    }
});
define('analytics/queries/graph-feature', ["require", "exports", "graphing-calc/models/expression"], function(require, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.expressionErrors = e.hasAction = e.hasRegression = e.hasSlider = void 0,
    e.hasSlider = function(e) {
        return e.getAllModelsWithSliders().length > 0
    }
    ,
    e.hasRegression = function(e) {
        for (var n = 0, o = e.getAllItemModels(); n < o.length; n++) {
            var s = o[n];
            if ("expression" === s.type && r.isRegression(s))
                return !0
        }
        return !1
    }
    ,
    e.hasAction = function(e) {
        if (e.getListModel().ticker.open)
            return !0;
        for (var r = 0, n = e.getAllItemModels(); r < n.length; r++) {
            var o = n[r];
            if (o && "formula"in o && o.formula) {
                if ("expression" !== o.type && "image" !== o.type)
                    continue;
                var s = o.formula;
                if (s.hasOwnProperty("action_value") || s.hasOwnProperty("click_handler"))
                    return !0
            }
        }
        return !1
    }
    ,
    e.expressionErrors = function(e) {
        for (var r = [], n = 0, o = e.getAllItemModels(); n < o.length; n++) {
            var s = o[n];
            if ("expression" === s.type && s.error) {
                var t = s.error.key;
                "shared-calculator-error-blank-expression" !== t && r.push(t)
            }
        }
        return r
    }
});
define('graphing-calc/models/helper-expression', ["require", "exports", "core/math/evaluationstate", "tslib", "underscore", "core/math/evaluationstate"], function(require, e, t, a, u, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.onFormulaUpdate = e.init = e.getGUID = void 0;
    var r = 0;
    function l() {
        return "helper_item_" + r++
    }
    e.getGUID = l,
    e.init = function(e) {
        return a.__assign(a.__assign({}, e), {
            formula: i.defaultEvaluationState(),
            guid: l(),
            cachedParsableState: {
                type: "statement",
                id: e.id,
                latex: e.latex,
                shouldGraph: !1
            }
        })
    }
    ,
    e.onFormulaUpdate = function(e, t, a) {
        t.formula = a;
        var i, r = t.proxy, l = {
            numericValue: r.numericValue,
            listValue: r.listValue
        };
        a.zero_values && 1 === a.zero_values.length && (i = a.zero_values[0].val),
        r.numericValue = u.isNumber(i) ? i : NaN,
        r.listValue = u.isArray(i) ? i.slice(0) : void 0,
        u.isEqual(r.numericValue, l.numericValue) || e.runAfterDispatch(function() {
            r.notifyPropertyChange("numericValue")
        }),
        u.isEqual(r.listValue, l.listValue) || e.runAfterDispatch(function() {
            r.notifyPropertyChange("listValue")
        })
    }
});
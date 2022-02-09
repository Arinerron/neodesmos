
define('core/graphing-calc/extract-slider-value-from-latex', ["require", "exports", "parser", "core/math/builtinframe", "core/math/policyGraphing"], function(require, e, r, t, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.extractSliderValueFromLatex = void 0,
    e.extractSliderValueFromLatex = function(e) {
        var i = r.parse(e);
        if ("Assignment" !== i.type)
            return NaN;
        if ("Constant" !== i._expression.type)
            return NaN;
        if (!a.PolicyGraphing.validLHS(i._symbol))
            return NaN;
        if (t[i._symbol])
            return NaN;
        var n = i._expression.asValue();
        return "number" == typeof n ? n : NaN
    }
});
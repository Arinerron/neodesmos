
define('core/math/parsenode/optimizedregression', ['require', 'pjs', './base'], function(require) {
    "use strict";
    return require("pjs")(require("./base"), function(i, e) {
        i.init = function(i, t, s, r, a) {
            for (var n in e.init.call(this),
            this.parameters = i,
            this.residuals = t,
            this.statistics = s,
            this.model = r,
            this.isModelValid = a.isModelValid,
            this.residualVariable = a.residualVariable,
            this.residualSuggestionId = a.residualSuggestionId,
            this.shouldSuggestLogMode = a.shouldSuggestLogMode,
            this.isLinear = a.isLinear,
            this.parameterWarning = a.parameterWarning,
            this._exports = [this.residualVariable],
            i)
                i.hasOwnProperty(n) && this._exports.push(n);
            this.mergeDependencies(r)
        }
        ,
        i.getCompiledFunction = function() {
            return this.model.getCompiledFunction.apply(this.model, arguments)
        }
        ,
        i.getCompiledDerivative = function() {
            return this.model.getCompiledDerivative.apply(this.model, arguments)
        }
    })
});
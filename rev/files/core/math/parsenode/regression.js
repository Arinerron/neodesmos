define('core/math/parsenode/regression', ['require', 'pjs', './base', 'core/math/errormsg', './functioncall', './identifier', './expressionTypes'], function(require) {
    "use strict";
    var e = require("pjs")
      , i = require("./base")
      , r = require("core/math/errormsg")
      , s = require("./functioncall")
      , n = require("./identifier")
      , t = require("./expressionTypes").Subtract;
    return e(i, function(e, i, a) {
        e.init = function(e, r) {
            i.init.call(this),
            this._lhs = e,
            this.isLhsSimple = e instanceof n,
            this._logLhs = s("ln", [e]),
            this._rhs = r,
            this._difference = t([e, r]),
            this._logDifference = t([s("ln", [e]), s("ln", [r])]),
            this.mergeDependencies(e, r)
        }
        ,
        e.isRegression = !0,
        e.exportTo = function(e, i, s) {
            if (!i.isError) {
                for (var n in i.parameters)
                    i.parameters.hasOwnProperty(n) && (e.assignmentForbidden(n) || (s[n] = s[n] ? r.multiplyDefined(n) : i.parameters[n]));
                e.assignmentForbidden(i.residualVariable) || (s[i.residualVariable] = i.residuals)
            }
        }
        ,
        e.getSliderVariables = function() {
            return []
        }
    })
});
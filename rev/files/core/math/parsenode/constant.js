
define('core/math/parsenode/constant', ['require', 'pjs', './expression', 'core/math/maybe-rational'], function(require) {
    "use strict";
    var t = require("pjs")
      , n = require("./expression")
      , a = require("core/math/maybe-rational");
    return t(n, function(t, n) {
        t.init = function(t) {
            "number" == typeof t && (t = a.maybeRational(t, 1)),
            this._constantValue = t,
            n.init.call(this, [])
        }
        ,
        t.isConstant = !0,
        t.asValue = function() {
            return "boolean" == typeof this._constantValue ? this._constantValue : a.asFloat(this._constantValue)
        }
        ,
        t.asCompilerValue = function() {
            return this._constantValue
        }
        ,
        t.scalarExprString = function() {
            return this.asValue() > 0 ? String(this.asValue()) : "(" + String(this.asValue()) + ")"
        }
        ,
        t.getEvaluationInfo = function() {
            return [{
                val: this.asValue()
            }]
        }
        ,
        t.isNaN = function() {
            return "number" == typeof this.asValue() && isNaN(this.asValue())
        }
    })
});

define('core/math/parsenode/assignment', ['require', './base', './equation', './identifier', 'pjs'], function(require) {
    "use strict";
    var e = require("./base")
      , t = require("./equation")
      , i = require("./identifier");
    return require("pjs")(e, function(e, s) {
        e.init = function(e, t) {
            s.init.call(this),
            e = e._symbol,
            this.mergeDependencies(t),
            this._expression = t,
            this._symbol = e,
            this._exports = this.computeExports()
        }
        ,
        e.shouldExportAns = function() {
            return !0
        }
        ,
        e.computeExports = function() {
            for (var e = this._symbol, t = this.getDependencies(), i = 0; i < t.length; i++)
                if (t[i] === e)
                    return [];
            return [e]
        }
        ,
        e.isEquation = function(e) {
            return -1 !== e.getDependencies().indexOf(this._symbol)
        }
        ,
        e.asEquation = function() {
            var e = t(i(this._symbol), this._expression);
            return e.userData = this.userData,
            e.metaData = this.metaData,
            e
        }
        ,
        e.shouldPromoteToSlider = function(e) {
            return !!this._expression.isConstant && (!this._expression.is_mixed_number && ("number" == typeof this._expression.asValue() && (!!isFinite(this._expression.asValue()) && e.isValidSlider(this._symbol))))
        }
    })
});
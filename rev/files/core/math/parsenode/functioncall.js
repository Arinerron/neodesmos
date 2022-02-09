define('core/math/parsenode/functioncall', ['require', 'pjs', './expression', './identifier', 'core/math/ir/builtin-table'], function(require) {
    "use strict";
    var i = require("pjs")
      , e = require("./expression")
      , t = require("./identifier")
      , r = require("core/math/ir/builtin-table").BuiltInTable;
    return i(e, function(i, e) {
        i.init = function(i, r) {
            "string" == typeof i && (i = t(i)),
            this._identifier = i,
            this._symbol = i._symbol,
            this._errorSymbol = "logbase" === i._errorSymbol ? "log" : i._errorSymbol,
            e.init.call(this, r)
        }
        ,
        i.registerDependencies = function() {
            this.addDependency(this._symbol),
            e.registerDependencies.call(this);
            var i = r[this._symbol];
            !i || "trig" !== i.tag && "inverseTrig" !== i.tag || this.addDependency("trigAngleMultiplier")
        }
        ,
        i.copyWithArgs = function(i) {
            return new this.constructor(t(this._symbol),i)
        }
    })
});
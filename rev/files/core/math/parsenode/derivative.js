
define('core/math/parsenode/derivative', ['require', 'pjs', './expression', './identifier'], function(require) {
    "use strict";
    var i = require("pjs")
      , n = require("./expression")
      , s = require("./identifier");
    return i(n, function(i, n) {
        i.init = function(i, t) {
            this._symbol = i instanceof s ? i._symbol : s(i)._symbol,
            n.init.call(this, t),
            this.addDependency(this._symbol)
        }
    })
});
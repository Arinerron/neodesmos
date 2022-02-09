
define('core/math/parsenode/solvedequation', ['require', 'pjs', './base'], function(require) {
    "use strict";
    return require("pjs")(require("./base"), function(i, e) {
        i.init = function(i, n, t) {
            e.init.call(this),
            this._symbol = i,
            this._expression = n,
            this.mergeDependencies(n),
            this.branchMultiplier = t
        }
    })
});
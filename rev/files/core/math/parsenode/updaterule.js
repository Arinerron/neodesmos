define('core/math/parsenode/updaterule', ['require', './expression', 'pjs'], function(require) {
    "use strict";
    var e = require("./expression");
    return require("pjs")(e, function(e, i) {
        e.init = function(e) {
            this._symbol = e[0]._symbol,
            this._expression = e[1],
            i.init.call(this, e)
        }
        ,
        e.registerDependencies = function() {
            this.addUpdateSymbol(this._symbol),
            this.mergeDependencies(this._expression)
        }
    })
});
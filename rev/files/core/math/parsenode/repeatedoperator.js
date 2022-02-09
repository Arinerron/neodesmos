define('core/math/parsenode/repeatedoperator', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), function(e, i) {
        e.init = function(e) {
            this._index = e[0],
            i.init.call(this, e)
        }
        ,
        e.registerDependencies = function() {
            this.addDummyDependency(this._index._symbol),
            this.mergeDependencies(this.args[1]),
            this.mergeDependencies(this.args[2]),
            this.mergeDependenciesInScope([this._index._symbol], this.args[3])
        }
    })
});
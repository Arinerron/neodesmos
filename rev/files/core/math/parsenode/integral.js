define('core/math/parsenode/integral', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), function(e, i) {
        e.init = function(e) {
            this._differential = e[0],
            i.init.call(this, e)
        }
        ,
        e.registerDependencies = function() {
            this.mergeDependencies(this.args[1]),
            this.mergeDependencies(this.args[2]),
            this.mergeDependenciesInScope([this._differential._symbol], this.args[3])
        }
    })
});
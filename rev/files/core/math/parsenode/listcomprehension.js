
define('core/math/parsenode/listcomprehension', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), function(i, e) {
        i.init = function(i, s, n) {
            this._index = i,
            this._body = s,
            this._inputLists = n,
            e.init.call(this, [i, s].concat(n))
        }
        ,
        i.registerDependencies = function() {
            for (var i = [], e = 0; e < this._inputLists.length; e++) {
                var s = this._inputLists[e]
                  , n = s._symbol;
                this.addDummyDependency(n),
                i.push(n),
                this.mergeDependencies(s.args[1])
            }
            this.addDummyDependency(this._index._symbol),
            i.push(this._index._symbol),
            this.mergeDependenciesInScope(i, this._body)
        }
    })
});
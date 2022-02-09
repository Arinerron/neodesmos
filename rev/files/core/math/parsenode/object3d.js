define('core/math/parsenode/object3d', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), function(i, n) {
        i.init = function(i, t) {
            n.init.call(this, i),
            this._symbol = t
        }
    })
});
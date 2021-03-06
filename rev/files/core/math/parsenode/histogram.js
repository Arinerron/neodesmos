define('core/math/parsenode/histogram', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), function(i, n) {
        i.init = function(i) {
            n.init.call(this, i),
            this._symbol = "histogram"
        }
    })
});
define('core/math/parsenode/dotplot', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), function(i, t) {
        i.init = function(i) {
            t.init.call(this, i),
            this._symbol = "dotplot"
        }
    })
});
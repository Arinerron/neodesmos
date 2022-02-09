
define('core/math/parsenode/stats', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), function(i, t) {
        i.init = function() {
            t.init.apply(this, arguments),
            this._symbol = "stats"
        }
    })
});
define('core/math/parsenode/ttest', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), function(t, i) {
        t.init = function() {
            i.init.apply(this, arguments),
            this._symbol = "ttest"
        }
    })
});
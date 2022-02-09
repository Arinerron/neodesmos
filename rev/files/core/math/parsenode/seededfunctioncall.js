
define('core/math/parsenode/seededfunctioncall', ['require', 'pjs', './functioncall'], function(require) {
    "use strict";
    return require("pjs")(require("./functioncall"), function(i, n) {
        i.init = function(i, t) {
            n.init.call(this, i, t),
            this.seed = t[0]
        }
    })
});
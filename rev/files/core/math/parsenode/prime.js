
define('core/math/parsenode/prime', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), function(t, i) {
        t.init = function(t, n) {
            i.init.call(this, n),
            this.order = t
        }
        ,
        t.copyWithArgs = function(t) {
            return new this.constructor(this.order,t)
        }
    })
});
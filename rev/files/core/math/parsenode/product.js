define('core/math/parsenode/product', ['require', 'pjs', './repeatedoperator'], function(require) {
    "use strict";
    return require("pjs")(require("./repeatedoperator"), function(t, n) {
        t.in_place_operator = "*=",
        t.starting_value = 1,
        t.evaluateConstant = function(t) {
            var n = 1 + Math.round(t[1]) - Math.round(t[0]);
            return n <= 0 ? this.starting_value : Math.pow(t[2], n)
        }
        ,
        t.update = function(t, n) {
            return t * n
        }
    })
});
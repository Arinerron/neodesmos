
define('core/math/parsenode/sum', ['require', 'pjs', './repeatedoperator'], function(require) {
    "use strict";
    return require("pjs")(require("./repeatedoperator"), function(t, n) {
        t.in_place_operator = "+=",
        t.starting_value = 0,
        t.evaluateConstant = function(t) {
            var n = 1 + Math.round(t[1]) - Math.round(t[0]);
            return n <= 0 ? this.starting_value : n * t[2]
        }
        ,
        t.update = function(t, n) {
            return t + n
        }
    })
});
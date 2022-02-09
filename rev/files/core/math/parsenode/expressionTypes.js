
define('core/math/parsenode/expressionTypes', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    var n = require("pjs")
      , t = require("./expression")
      , e = {
        Add: n(t, {}),
        Subtract: n(t, {}),
        Multiply: n(t, {}),
        Divide: n(t, {}),
        Exponent: n(t, {}),
        Negative: n(t, {}),
        And: n(t, {
            isInequality: function() {
                return this.args[0].isInequality() && this.args[1].isInequality()
            }
        }),
        PercentOf: n(t, {})
    };
    return e.RawExponent = n(e.Exponent, {}),
    e
});
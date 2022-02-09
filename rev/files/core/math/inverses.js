
define('core/math/inverses', [], function() {
    "use strict";
    var c = {};
    return ["sin", "cos", "tan", "cot", "sec", "csc", "sinh", "cosh", "tanh", "coth", "sech", "csch"].forEach(function(n) {
        c[n] = "arc" + n,
        c["arc" + n] = n
    }),
    c
});
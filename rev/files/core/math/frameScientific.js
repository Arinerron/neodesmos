
define('core/math/frameScientific', ['require', 'core/math/builtinframe'], function(require) {
    "use strict";
    var r = require("core/math/builtinframe")
      , n = ["pi", "e", "trigAngleMultiplier"]
      , t = ["sqrt", "nthroot", "abs", "ln", "sin", "cos", "tan", "log", "arcsin", "arccos", "arctan", "mean", "round", "stdev", "stdevp", "nCr", "nPr", "exp", "factorial"];
    function e(r, n) {
        for (var t = 0; t < r.length; t++) {
            var e = r[t];
            if (!n.hasOwnProperty(e))
                throw new Error("Programming Error: key '" + e + "' does not exist in table. Must be one of:\n" + Object.keys(n).join("\n"))
        }
    }
    return e(n, r),
    e(t, r),
    {
        getFrame: function(e) {
            var i = {};
            return n.forEach(function(n) {
                i[n] = r[n]
            }),
            t.forEach(function(n) {
                e.replaceRoundWithReciprocal && "round" === n || (i[n] = r[n])
            }),
            e.trigAngleMultiplier && (i.trigAngleMultiplier = e.trigAngleMultiplier),
            i
        }
    }
});
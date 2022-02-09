
define('core/math/frameGraphing', ['require', 'core/math/builtinframe'], function(require) {
    "use strict";
    var t = require("core/math/builtinframe")
      , e = ["csc", "sec", "cot", "arccsc", "arcsec", "arccot", "csch", "sech", "coth", "arccsch", "arcsech", "arccoth", "mad", "cov", "distance", "midpoint"]
      , i = ["erf", "ttest", "tscore", "ittest", "normaldist", "tdist", "poissondist", "binomialdist", "pdf", "cdf", "random", "histogram", "dotplot", "boxplot"]
      , n = ["distance", "midpoint"]
      , o = ["det", "inv", "transpose", "rref", "trace"];
    function r(t, e) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            if (!e.hasOwnProperty(n))
                throw new Error("Programming Error: key '" + n + "' does not exist in table. Must be one of:\n" + Object.keys(e).join("\n"))
        }
    }
    return r(e, t),
    r(i, t),
    {
        getFrame: function(r) {
            var a, c = {};
            for (a in t)
                t.hasOwnProperty(a) && (!0 !== r.restrictedFunctions || -1 === e.indexOf(a) || !0 === r.forceEnableGeometryFunctions && -1 !== n.indexOf(a)) && (!1 === r.distributions && -1 !== i.indexOf(a) || -1 === o.indexOf(a) && (c[a] = t[a]));
            return r.trigAngleMultiplier && (c.trigAngleMultiplier = r.trigAngleMultiplier),
            r.globalRandomSeed && (c.globalRandomSeed = r.globalRandomSeed),
            r.initialEvaluation && (c.initialEvaluation = r.initialEvaluation),
            r.globalEventCount && (c.globalEventCount = r.globalEventCount),
            c
        }
    }
});
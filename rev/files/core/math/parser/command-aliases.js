define('core/math/parser/command-aliases', ["require", "exports", "./char-codes"], function(require, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.translateCmd = void 0;
    var s = {
        mcd: "gcd",
        gcf: "gcd",
        mcm: "lcm",
        signum: "sign",
        sgn: "sign",
        stdDevP: "stdevp",
        stddevp: "stdevp",
        stdDev: "stdev",
        stddev: "stdev",
        variance: "var",
        TTest: "ttest",
        TScore: "tscore",
        IndependentTTest: "ittest",
        iTTest: "ittest",
        inverseCdf: "quantile",
        inversecdf: "quantile",
        arsinh: "arcsinh",
        arcosh: "arccosh",
        artanh: "arctanh",
        arcsch: "arccsch",
        arsech: "arcsech",
        arcoth: "arccoth"
    };
    e.translateCmd = function(e) {
        for (var c = 0; t.isBackslash(e.charCodeAt(c)); )
            c += 1;
        return c > 0 && (e = e.slice(c)),
        s[e] || e
    }
});
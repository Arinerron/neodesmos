
define('main/mathquill-operators', ["require", "exports", "config"], function(require, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.getAutoOperators = t.getAutoCommands = void 0;
    var n = ["exp|exponent ln|natural-log log", "total length mean median quantile quartile nCr nPr stats", "stdev|standard-deviation stddev|standard-deviation", "stdDev|standard-deviation stdevp|standard-deviation-population", "stddevp|standard-deviation-population stdDevP|standard-deviation-population mad var|variance", "varp|variance-population variance cov|co-variance covp|co-variance-population corr|correlation spearman", "lcm mcm gcd mcd gcf mod ceil|ceiling floor round abs|absolute-value min max sign|signum signum sgn", "sin|sine cos|cosine tan|tangent csc|co-secant sec|secant cot|co-tangent", "sinh|hyperbolic-sine cosh|hyperbolic-cosine tanh|hyperbolic-tangent csch|hyperbolic-co-secant", "sech|hyperbolic-secant coth|hyperbolic-co-tangent", "arcsin|arc-sine arccos|arc-cosine arctan|arc-tangent arccsc|arc-co-secant arcsec|arc-secant", "arccot|arc-co-tangent", "arcsinh|hyperbolic-arc-sine arccosh|hyperbolic-arc-cosine arctanh|hyperbolic-arc-co-tangent", "arccsch|hyperbolic-arc-co-secant arcsech|hyperbolic-arc-secant", "arccoth|hyperbolic-arc-co-tangent", "arsinh|hyperbolic-ar-sine arcosh|hyperbolic-ar-cosine artanh|hyperbolic-ar-co-tangent", "arcsch|hyperbolic-ar-co-secant arsech|hyperbolic-ar-secant", "arcoth|hyperbolic-ar-co-tangent", "polygon", "distance midpoint", "sort shuffle join unique", "erf|error-function", "TTest|t-test ttest|t-test TScore|t-score tscore|t-score", "iTTest|independent-t-test ittest|independent-t-test IndependentTTest", "TScore|t-score Tscore|t-score tscore|t-score", "normaldist|normal-distribution tdist|t-distribution poissondist|poisson-distribution", "binomialdist|binomial-distribution", "uniformdist|uniform-distribution", "pdf cdf random inverseCdf inversecdf", "histogram dotplot boxplot", "pdf cdf", "rgb hsv", "for"].join(" ")
      , o = ["det|determinant", "inv|inverse", "transpose", "rref|reduced-row-echelon-form", "trace"].join(" ");
    n += " " + o,
    e.get("3d") && (n += " cube sphere cone dodecahedron octahedron tetrahedron");
    t.getAutoCommands = function(t) {
        t || (t = {});
        var e = "alpha beta sqrt theta phi pi tau nthroot cbrt sum prod int ans percent infinity infty";
        return t.additionalCommands && t.additionalCommands.length && (e = e + " " + t.additionalCommands.join(" ")),
        t.disallowFrac ? e : e + " frac"
    }
    ,
    t.getAutoOperators = function(t) {
        t || (t = {});
        var e = n;
        return t.additionalOperators && t.additionalOperators.length && (e = e + " " + t.additionalOperators.join(" ")),
        e
    }
});
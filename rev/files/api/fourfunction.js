define('api/fourfunction', ["require", "exports", "tslib", "./basic", "core/lib/deepCopy", "lib/console", "./util"], function(require, n, t, i, e, o, a) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
        value: !0
    });
    var s = function(n) {
        function i(t, s) {
            var r = n.call(this, t) || this;
            return r instanceof i ? (r.init(function(n) {
                (n = e.default(n)).hasOwnProperty("typingSlashWritesDivisionSymbol") || (n.typingSlashWritesDivisionSymbol = !0);
                n.hasOwnProperty("typingAsteriskWritesTimesSymbol") || (n.typingAsteriskWritesTimesSymbol = !0);
                n.exponentButtonForSquareRoot && (o.warn("As of API version 1.0, the 'exponentButtonForSquareRoot' option is deprecated.Use 'additionalFunctions: \"exponent\"' instead."),
                n.additionalFunctions = ["exponent"]);
                if (n.additionalFunctions) {
                    var t = n.additionalFunctions;
                    "string" == typeof t && (t = [t]),
                    t.length > 2 && (o.warn("additionalFunctions can only take up to 2 new functions. Using the first two."),
                    t = t.slice(0, 2));
                    for (var i = !0, s = 0; s < t.length; s++)
                        -1 === ["sqrt", "exponent", "percent", "fraction"].indexOf(t[s]) && (o.warn("Unrecognized value: '" + t[s] + "' for 'additionalFunction'. Valid values are 'sqrt', 'percent', 'exponent', or 'fraction'. Using default (\"sqrt\")"),
                        i = !1);
                    n.additionalFunctions = i ? t : ["sqrt"]
                }
                n.additionalFunctions && n.additionalFunctions.length || (n.additionalFunctions = ["sqrt"]);
                n.singleExpression ? n.evaluationMode = "singleExpressionFourFunction" : n.evaluationMode = "fourFunction";
                delete n.singleExpression,
                n.hasOwnProperty("decimalToFraction") || (n.decimalToFraction = !1);
                n.language && (n.language = a.validateLanguage(n.language));
                return n
            }(s || {})),
            r) : new i(t,s)
        }
        return t.__extends(i, n),
        i
    }(i.BasicCalculator);
    n.default = s
});
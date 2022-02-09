
define('api/scientific', ["require", "exports", "tslib", "./basic", "core/lib/deepCopy", "./util"], function(require, e, i, n, t, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = function(e) {
        function n(i, l) {
            var s = e.call(this, i) || this;
            return s instanceof n ? (s.init(function(e) {
                (e = t.default(e)).singleExpression ? e.evaluationMode = "singleExpressionScientific" : e.evaluationMode = "scientific";
                delete e.singleExpression,
                e.language && (e.language = a.validateLanguage(e.language));
                return e
            }(l || {})),
            s) : new n(i,l)
        }
        return i.__extends(n, e),
        n
    }(n.BasicCalculator);
    e.default = l
});
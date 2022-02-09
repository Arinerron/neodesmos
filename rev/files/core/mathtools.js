
define('core/mathtools', ["require", "exports", "parser", "core/math/builtinframe", "parsenodes", "tslib", "core/math/context", "core/cl-calculator", "core/math/parser/latex-parser", "core/math/parser/expression-parser", "core/math/tree-queries/count-numbers", "core/lib/color-helpers", "core/math/policyGraphing", "core/math/policyScientific", "core/math/policyFourFunction", "./math/parser/surface-node-error", "core/lib/label", "core/graphing-calc/diffs/calculate-diff", "core/graphing-calc/diffs/apply-diff", "core/graphing-calc/migrate-state", "core/math/types", "core/graphing-calc/translation/translator", "./math/parser/input-span", "core/lib/number-to-latex", "core/lib/number-to-latex"], function(require, e, r, t, a, n, o, i, c, l, p, u, s, f, m, b, g, y, d, h, x, L, P, D, j) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.numberToLatex = e.numberToDecimalString = e.applyLocalizationMap = e.extractLocalizationMap = e.migrateToLatest = e.applyDiff = e.calculateDiff = e.CLCalculator = e.colorHelpers = e.policies = e.parseNodes = e.types = e.builtInFrame = e.context = e.treeQueries = e.expressionParser = e.parser = e.Label = void 0,
    Object.defineProperty(e, "CLCalculator", {
        enumerable: !0,
        get: function() {
            return i.CLCalculator
        }
    }),
    e.colorHelpers = u,
    e.Label = g,
    Object.defineProperty(e, "calculateDiff", {
        enumerable: !0,
        get: function() {
            return y.calculateDiff
        }
    }),
    Object.defineProperty(e, "applyDiff", {
        enumerable: !0,
        get: function() {
            return d.applyDiff
        }
    }),
    Object.defineProperty(e, "migrateToLatest", {
        enumerable: !0,
        get: function() {
            return h.migrateToLatest
        }
    }),
    Object.defineProperty(e, "extractLocalizationMap", {
        enumerable: !0,
        get: function() {
            return L.extractLocalizationMap
        }
    }),
    Object.defineProperty(e, "applyLocalizationMap", {
        enumerable: !0,
        get: function() {
            return L.applyLocalizationMap
        }
    }),
    Object.defineProperty(e, "numberToDecimalString", {
        enumerable: !0,
        get: function() {
            return D.numberToDecimalString
        }
    }),
    e.numberToLatex = j.default,
    e.parser = {
        parse: function(e, t) {
            return null == e && (e = ""),
            r.parse(e, t)
        }
    },
    e.expressionParser = {
        parse: function(r) {
            if (null != r)
                try {
                    var t = c.parse(r);
                    return l.parse(t)
                } catch (t) {
                    var a = t instanceof e.parseNodes.Base ? t.getInputSpan() : P.Span(r, 0, r.length)
                      , o = n.__assign(n.__assign({}, b.UnexpectedParseError()), {
                        originalError: t
                    });
                    return b.Err(a, o)
                }
        }
    },
    e.treeQueries = {
        countNumbers: p.countNumbers
    },
    e.context = o.Context,
    e.builtInFrame = t,
    e.types = x,
    e.parseNodes = a,
    e.policies = {
        graphing: s.PolicyGraphing,
        scientific: f.PolicyScientific,
        fourFunction: m.PolicyFourFunction
    }
});
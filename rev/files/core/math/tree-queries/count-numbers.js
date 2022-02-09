
define('core/math/tree-queries/count-numbers', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.countNumbers = void 0,
    e.countNumbers = function e(a, s) {
        switch (a.type) {
        case "Mul":
        case "Div":
        case "Prime":
        case "Call":
        case "ImplicitCall":
        case "Dot":
        case "Pipes":
        case "Sqrt":
        case "Nthroot":
        case "Frac":
        case "Derivative":
        case "Integral":
        case "EmptyIntegral":
        case "Sum":
        case "Product":
        case "Piecewise":
        case "Paren":
        case "Juxt":
        case "Superscript":
        case "Bang":
        case "Index":
        case "Equals":
        case "Inequality":
        case "Tilde":
        case "Pos":
        case "Neg":
        case "Add":
        case "Sub":
        case "List":
        case "Seq":
        case "Colon":
        case "Ellipsis":
        case "PercentOf":
        case "RightArrow":
        case "For":
            for (var c = 0, r = 0, t = a.args; r < t.length; r++) {
                c += e(t[r], s)
            }
            return c;
        case "Decimal":
            return void 0 === s || parseFloat(a.val) === s ? 1 : 0;
        case "MixedNumber":
            if (void 0 === s)
                return 3;
            c = 0;
            return parseFloat(a.whole) === s && (c += 1),
            parseFloat(a.num) === s && (c += 1),
            parseFloat(a.den) === s && (c += 1),
            c;
        case "Letter":
        case "EmptyPiecewise":
        case "Cmd":
        case "EmptyRangeEnd":
            return 0;
        case "Subscript":
            return e(a.args[0], s);
        case "InequalityChain":
            c = 0;
            c += e(a.first, s);
            for (var i = 0, n = a.chain; i < n.length; i++) {
                c += e(n[i].args[0], s)
            }
            return c;
        default:
            throw "Unexpected surface node " + a.type + "."
        }
    }
});
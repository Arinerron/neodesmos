
define('core/math/ir/features/value-to-latex', ["require", "exports", "core/math/types", "../../../lib/number-to-latex"], function(require, e, t, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.valueToLatex = void 0,
    e.valueToLatex = function e(a, i) {
        if (t.isList(a)) {
            for (var u = [], n = 0; n < i.length; n++)
                u.push(e(t.elementType(a), i[n]));
            return "\\left[" + u.join(",") + "\\right]"
        }
        switch (a) {
        case t.Number:
            return r.default(i);
        case t.Point:
            var o = i
              , l = o[0]
              , f = o[1];
            return "\\left(" + r.default(l) + "," + r.default(f) + "\\right)";
        default:
            throw new Error("Cannot serialize a value of type " + t.prettyPrint(a) + ".")
        }
    }
});
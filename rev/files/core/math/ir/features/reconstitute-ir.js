define('core/math/ir/features/reconstitute-ir', ["require", "exports", "core/math/types"], function(require, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.reconstituteIR = void 0,
    e.reconstituteIR = function e(r, n, o) {
        if (t.isList(n)) {
            for (var s = [], i = 0; i < o.length; i++)
                s.push(e(r, t.elementType(n), o[i]));
            return r.ConstantOfType(n, s)
        }
        switch (n) {
        case t.Number:
            return r.Constant(o);
        case t.Bool:
        case t.Point:
        case t.RGBColor:
            return r.ConstantOfType(n, o);
        default:
            throw new Error("Cannot reconstitute value of a " + t.prettyPrint(n) + ".")
        }
    }
});
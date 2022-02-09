
define('core/math/parsenode-from-value', ["require", "exports", "parsenodes", "core/math/types"], function(require, e, r, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.parseNodeFromValue = void 0,
    e.parseNodeFromValue = function e(t, s) {
        switch (t) {
        case o.Number:
        case o.Bool:
            return r.Constant(s);
        case o.SeedType:
            return r.Seed(s);
        case o.Point:
            return r.ParenSeq([e(o.Number, s[0]), e(o.Number, s[1])]);
        case o.RGBColor:
            return r.FunctionCall("rgb", [e(o.Number, s[0]), e(o.Number, s[1]), e(o.Number, s[2])]);
        case o.EmptyList:
        case o.ListOfNumber:
        case o.ListOfBool:
        case o.ListOfPoint:
        case o.ListOfColor:
        case o.ListOfPolygon:
        case o.ErrorType:
            for (var n = [], a = o.elementType(t), i = 0, c = s; i < c.length; i++) {
                var u = c[i];
                n.push(e(a, u))
            }
            return r.List(n);
        case o.Polygon:
            return r.FunctionCall("\\polygon", [e(o.ListOfPoint, s)]);
        case o.Any:
        case o.Distribution:
        case o.ListOfAny:
        case o.ListOfDistribution:
        case o.Action:
            throw new Error("Programming error: cannot create parse node from valueType: " + o.repr(t));
        default:
            var l = t;
            throw new Error("Programming error: unexpected valueType: " + o.repr(l))
        }
    }
});
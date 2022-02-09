
define('core/math/types', ["require", "exports", "core/lib/worker-i18n"], function(require, e, t) {
    "use strict";
    var r;
    function s(t) {
        switch (t) {
        case e.Any:
            return "Any";
        case e.Number:
            return "Number";
        case e.Bool:
            return "Bool";
        case e.Point:
            return "Point";
        case e.Distribution:
            return "Distribution";
        case e.Action:
            return "Action";
        case e.ListOfAny:
            return "ListOfAny";
        case e.ListOfNumber:
            return "ListOfNumber";
        case e.ListOfBool:
            return "ListOfBool";
        case e.ListOfPoint:
            return "ListOfPoint";
        case e.ListOfDistribution:
            return "ListOfDistribution";
        case e.EmptyList:
            return "EmptyList";
        case e.ErrorType:
            return "ErrorType";
        case e.SeedType:
            return "SeedType";
        case e.RGBColor:
            return "RGBColor";
        case e.ListOfColor:
            return "ListOfColor";
        case e.Polygon:
            return "Polygon";
        case e.ListOfPolygon:
            return "ListOfPolygon";
        default:
            throw new Error("Invalid type: " + t)
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.isTypeOrListOfType = e.typesMatch = e.isSubType = e.isOneOf = e.hasListType = e.listType = e.elementType = e.isList = e.prettyPrint = e.repr = e.ListOfPolygon = e.Polygon = e.ListOfColor = e.RGBColor = e.SeedType = e.ErrorType = e.EmptyList = e.ListOfDistribution = e.ListOfPoint = e.ListOfBool = e.ListOfNumber = e.ListOfAny = e.Action = e.Distribution = e.Point = e.Bool = e.Number = e.Any = void 0,
    e.Any = 0,
    e.Number = 1,
    e.Bool = 2,
    e.Point = 3,
    e.Distribution = 4,
    e.Action = 5,
    e.ListOfAny = 6,
    e.ListOfNumber = 7,
    e.ListOfBool = 8,
    e.ListOfPoint = 9,
    e.ListOfDistribution = 10,
    e.EmptyList = 11,
    e.ErrorType = 12,
    e.SeedType = 13,
    e.RGBColor = 14,
    e.ListOfColor = 15,
    e.Polygon = 16,
    e.ListOfPolygon = 17,
    e.repr = s,
    e.prettyPrint = function(r) {
        switch (r) {
        case e.Any:
            return t.s("shared-calculator-label-value-type-any");
        case e.Number:
            return t.s("shared-calculator-label-value-type-number");
        case e.Bool:
            return t.s("shared-calculator-label-value-type-bool");
        case e.Point:
            return t.s("shared-calculator-label-value-type-point");
        case e.Distribution:
            return t.s("shared-calculator-label-value-type-distribution");
        case e.Action:
            return t.s("shared-calculator-label-value-type-action");
        case e.ListOfAny:
            return t.s("shared-calculator-label-value-type-list-of-any");
        case e.ListOfNumber:
            return t.s("shared-calculator-label-value-type-list-of-numbers");
        case e.ListOfBool:
            return t.s("shared-calculator-label-value-type-list-of-bool");
        case e.ListOfPoint:
            return t.s("shared-calculator-label-value-type-list-of-points");
        case e.ListOfDistribution:
            return t.s("shared-calculator-label-value-type-list-of-distributions");
        case e.EmptyList:
            return t.s("shared-calculator-label-value-type-empty-list");
        case e.ErrorType:
            return t.s("shared-calculator-label-value-type-error");
        case e.SeedType:
            return t.s("shared-calculator-label-value-type-seed");
        case e.RGBColor:
            return t.s("shared-calculator-label-value-type-color");
        case e.ListOfColor:
            return t.s("shared-calculator-label-value-type-list-of-colors");
        case e.Polygon:
            return t.s("shared-calculator-label-value-type-polygon");
        case e.ListOfPolygon:
            return t.s("shared-calculator-label-value-type-list-of-polygons");
        default:
            throw new Error("Invalid type: " + r)
        }
    }
    ;
    (r = {})[e.ListOfAny] = e.Any,
    r[e.EmptyList] = e.Number,
    r[e.ListOfNumber] = e.Number,
    r[e.ListOfBool] = e.Bool,
    r[e.ListOfPoint] = e.Point,
    r[e.ListOfDistribution] = e.Distribution,
    r[e.ListOfColor] = e.RGBColor,
    r[e.ListOfPolygon] = e.Polygon;
    function o(t) {
        switch (t) {
        case e.ListOfAny:
        case e.ListOfNumber:
        case e.ListOfBool:
        case e.ListOfPoint:
        case e.ListOfDistribution:
        case e.ListOfColor:
        case e.ListOfPolygon:
        case e.EmptyList:
            return !0;
        case e.Any:
        case e.Number:
        case e.Bool:
        case e.Point:
        case e.Distribution:
        case e.ErrorType:
        case e.SeedType:
        case e.RGBColor:
        case e.Action:
        case e.Polygon:
            return !1;
        default:
            throw new Error("Invalid type: " + t)
        }
    }
    function i(t) {
        switch (t) {
        case e.EmptyList:
        case e.ListOfNumber:
            return e.Number;
        case e.ListOfBool:
            return e.Bool;
        case e.ListOfPoint:
            return e.Point;
        case e.ListOfDistribution:
            return e.Distribution;
        case e.ListOfColor:
            return e.RGBColor;
        case e.ListOfPolygon:
            return e.Polygon;
        case e.ListOfAny:
            return e.Any;
        case e.Any:
        case e.Number:
        case e.Bool:
        case e.Point:
        case e.Distribution:
        case e.ErrorType:
        case e.SeedType:
        case e.RGBColor:
        case e.Action:
        case e.Polygon:
            return e.Any;
        default:
            throw new Error("Invalid type: " + t)
        }
    }
    function a(t, r) {
        return !(t !== e.EmptyList || !o(r)) || (!(r !== e.ListOfAny || !o(t)) || t === r)
    }
    e.isList = o,
    e.elementType = i,
    e.listType = function(t) {
        switch (t) {
        case e.Any:
            return e.ListOfAny;
        case e.Number:
            return e.ListOfNumber;
        case e.Bool:
            return e.ListOfBool;
        case e.Point:
            return e.ListOfPoint;
        case e.Distribution:
            return e.ListOfDistribution;
        case e.RGBColor:
            return e.ListOfColor;
        case e.Polygon:
            return e.ListOfPolygon;
        case e.EmptyList:
        case e.ListOfNumber:
        case e.ListOfBool:
        case e.ListOfPoint:
        case e.ListOfDistribution:
        case e.ListOfColor:
        case e.ListOfPolygon:
        case e.ListOfAny:
        case e.ErrorType:
        case e.SeedType:
        case e.Action:
            throw new Error("Type " + s(t) + " does not implement listType.");
        default:
            throw new Error("Invalid type: " + t)
        }
    }
    ,
    e.hasListType = function(t) {
        switch (t) {
        case e.Any:
        case e.Number:
        case e.Bool:
        case e.Point:
        case e.Distribution:
        case e.RGBColor:
        case e.Polygon:
            return !0;
        case e.EmptyList:
        case e.ListOfNumber:
        case e.ListOfBool:
        case e.ListOfPoint:
        case e.ListOfDistribution:
        case e.ListOfColor:
        case e.ListOfPolygon:
        case e.ListOfAny:
        case e.ErrorType:
        case e.SeedType:
        case e.Action:
            return !1;
        default:
            throw new Error("Invalid type: " + t)
        }
    }
    ,
    e.isOneOf = function(e, t) {
        for (var r = 0, s = t; r < s.length; r++) {
            if (e === s[r])
                return !0
        }
        return !1
    }
    ,
    e.isSubType = a,
    e.typesMatch = function(e, t) {
        return a(e, t) || a(t, e)
    }
    ,
    e.isTypeOrListOfType = function(t, r) {
        return t === r || !!o(t) && (t === e.EmptyList || i(t) === r)
    }
});
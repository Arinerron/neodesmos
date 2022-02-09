define('core/math/ir/features/nan-of-type', ["require", "exports", "core/math/types"], function(require, e, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.nanOfType = e.isNanableValueType = void 0,
    e.isNanableValueType = function(e) {
        switch (e) {
        case a.Bool:
        case a.Number:
        case a.Point:
        case a.Action:
        case a.RGBColor:
        case a.Polygon:
            return !0;
        default:
            return !1
        }
    }
    ,
    e.nanOfType = function(e) {
        switch (e) {
        case a.Number:
            return NaN;
        case a.Point:
            return [NaN, NaN];
        case a.RGBColor:
            return [NaN, NaN, NaN];
        case a.Action:
            return {
                type: "Action",
                updateRules: {}
            };
        case a.Bool:
            return !1;
        case a.Polygon:
            return [];
        default:
            throw new Error(e + " does not have a NaN type.")
        }
    }
});
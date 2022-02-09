
define('core/math/ir/features/contains-nan-value', ["require", "exports", "core/math/types", "core/math/maybe-rational"], function(require, e, t, n) {
    "use strict";
    function a(e, a) {
        switch (e) {
        case t.Number:
            return n.isNanFloat(a);
        case t.Point:
            var r = a
              , o = r[0]
              , i = r[1];
            return n.isNanFloat(o) || n.isNanFloat(i);
        case t.RGBColor:
            var s = a
              , u = s[0]
              , c = s[1]
              , l = s[2];
            return n.isNanFloat(u) || n.isNanFloat(c) || n.isNanFloat(l);
        case t.Action:
            return 0 === Object.keys(a.updateRules).length;
        case t.Bool:
            return !1;
        default:
            throw new Error("Type cannot contain a NaN value: " + t.prettyPrint(e) + ".")
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.containsNanValue = void 0,
    e.containsNanValue = function(e, n) {
        if (t.isList(e)) {
            for (var r = t.elementType(e), o = 0; o < n.length; o++)
                if (a(r, n[o]))
                    return !0;
            return !1
        }
        return a(e, n)
    }
});
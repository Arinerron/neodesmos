
define('core/graphing-calc/translation/common', ["require", "exports"], function(require, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.mutateString = t.deserializeTranslationKey = t.serializeTranslationKey = void 0,
    t.serializeTranslationKey = function(t) {
        return "expression" === t.location || "object" === t.location ? t.location + ":" + t.id + ":" + t.path : t.location + ":" + t.path
    }
    ,
    t.deserializeTranslationKey = function(t) {
        var e = function() {
            return new Error("Invalid key: " + t)
        }
          , i = t.split(":")
          , n = i[0];
        if (!n)
            throw e();
        if ("expression" != n && "settings" != n && "object" != n)
            throw e();
        if ("settings" == n) {
            if (2 != i.length)
                throw e();
            return {
                location: n,
                path: i[1]
            }
        }
        if (3 != i.length)
            throw e();
        return {
            location: n,
            id: i[1],
            path: i[2]
        }
    }
    ,
    t.mutateString = function(t, e, i) {
        if (t)
            for (var n = e.split("."), r = t, o = 0; o < n.length; o++) {
                var a = n[o];
                if (!r[a])
                    break;
                o == n.length - 1 && "string" == typeof r[a] ? r[a] = i : r = r[a]
            }
    }
});
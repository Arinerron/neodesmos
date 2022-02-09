define('core/cl-calculator', ["require", "exports", "core/graphing-calc/migrate-state", "core/graphing-calc/json/expression", "core/graphing-calc/json/table"], function(require, e, t, a, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.CLCalculator = void 0,
    e.CLCalculator = function(e) {
        var s = t.migrateToLatest(e)
          , o = {}
          , n = s.graph.degreeMode
          , i = s.randomSeed;
        function c(e) {
            switch (e.type) {
            case void 0:
            case "expression":
                var t = a.computeParsableState(a.inflateDefaults(e));
                o[t.id] = t;
                break;
            case "table":
                t = r.computeParsableState(r.inflateDefaults(e));
                o[t.id] = t;
                break;
            case "folder":
            case "text":
            case "image":
                break;
            default:
                return e
            }
        }
        for (var l = 0, u = s.expressions.list; l < u.length; l++) {
            c(u[l])
        }
        return {
            setExpression: function(e) {
                c(e)
            },
            getChangeSet: function() {
                return {
                    statements: o,
                    isCompleteState: !0,
                    degreeMode: n,
                    globalRandomSeed: i
                }
            }
        }
    }
});
define('core/graphing-calc/migrations/7', ["require", "exports", "tslib"], function(require, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = function(e) {
        if (6 !== e.version)
            throw new Error("Unexpected version: " + e.version);
        var r = e.expressions.list.map(function(e) {
            if ("expression" === e.type && e.domain) {
                var r = n.__assign(n.__assign({}, e), {
                    parametricDomain: {
                        min: e.domain.min,
                        max: e.domain.max
                    }
                });
                return delete r.domain,
                r
            }
            return e
        });
        return {
            version: 7,
            randomSeed: e.randomSeed,
            graph: e.graph,
            expressions: {
                list: r
            }
        }
    }
});
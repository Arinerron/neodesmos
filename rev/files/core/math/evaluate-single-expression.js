
define('core/math/evaluate-single-expression', ["require", "exports", "parser", "core/math/builtinframe", "core/math/parsenode/constant", "core/math/policy"], function(require, e, t, r, a, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = function(e, n) {
        if (/^\s*(\-|\+)?([0-9]+(\.[0-9]+)?)\s*$/.test(e))
            return parseFloat(e);
        var o = Object.create(r);
        return o.trigAngleMultiplier = a(n ? Math.PI / 180 : 1),
        +t.parse(e).tryGetConcreteTree(i.defaultPolicy, o).asValue()
    }
});
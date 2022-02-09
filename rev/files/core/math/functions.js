define('core/math/functions', ["require", "exports", "core/math/builtin"], function(require, e, t) {
    "use strict";
    function n(e) {
        delete e.fn
    }
    function r(e) {
        e.fn = i(e.args, e.source, e.constants)
    }
    function i(e, n, r) {
        var i = e.join(",");
        return new Function("BuiltIn","_C","return (function(" + i + '){"use strict"; ' + n + "})")(t, r)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.closureFunctionWithBuiltIn = e.rehydrateCompiledFunction = e.dehydrateCompiledFunction = e.rehydrateGraphData = e.dehydrateGraphData = void 0,
    e.dehydrateGraphData = function(e) {
        for (var t = 0, r = e; t < r.length; t++) {
            var i = r[t].compiled;
            i && n(i)
        }
    }
    ,
    e.rehydrateGraphData = function(e) {
        for (var t = 0, n = e; t < n.length; t++) {
            var i = n[t].compiled;
            i && r(i)
        }
    }
    ,
    e.dehydrateCompiledFunction = n,
    e.rehydrateCompiledFunction = r,
    e.closureFunctionWithBuiltIn = i
});
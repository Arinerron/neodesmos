define('core/math/builtinframe', ['require', 'core/math/builtinconstants', 'core/math/ir/builtin-table'], function(require) {
    "use strict";
    var n, i = require("core/math/builtinconstants"), t = require("core/math/ir/builtin-table"), r = {};
    for (n in i)
        i.hasOwnProperty(n) && (r[n] = i[n]);
    for (n in t.BuiltInTable)
        t.BuiltInTable.hasOwnProperty(n) && (r[n] = {
            isFunction: !0
        });
    for (n in t.CompilerFunctionTable)
        t.CompilerFunctionTable.hasOwnProperty(n) && (r[n] = {
            isFunction: !0
        });
    return r
});
define('core/math/parsenode/functionexponent', ['require', 'pjs', './expression', 'core/math/ir/builtin-table'], function(require) {
    "use strict";
    var e = require("pjs")
      , i = require("./expression")
      , t = require("core/math/ir/builtin-table").BuiltInTable;
    return e(i, function(e, i) {
        e.registerDependencies = function() {
            if (i.registerDependencies.call(this),
            "Identifier" === this.args[0].type) {
                var e = this.args[0]._symbol
                  , n = t[e];
                !n || "trig" !== n.tag && "inverseTrig" !== n.tag || this.addDependency("trigAngleMultiplier")
            }
        }
    })
});
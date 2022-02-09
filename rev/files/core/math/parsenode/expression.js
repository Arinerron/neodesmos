
define('core/math/parsenode/expression', ['require', 'pjs', './base', 'core/math/errormsg'], function(require) {
    "use strict";
    var e = require("pjs")
      , r = require("./base")
      , t = require("core/math/errormsg");
    return e(r, function(e, r) {
        e.init = function(e) {
            if (!Array.isArray(e))
                throw new TypeError("Argument to expression constructor must be an Array.");
            r.init.call(this),
            this.args = e,
            this.registerDependencies(),
            this.computeTreeSize()
        }
        ,
        e.shouldExportAns = function() {
            return !0
        }
        ,
        e.registerDependencies = function() {
            for (var e = 0; e < this.args.length; e++)
                this.mergeDependencies(this.args[e])
        }
        ,
        e.computeTreeSize = function() {
            for (var e = 0, r = 0; r < this.args.length; r++)
                this.args[r].treeSize && (e += this.args[r].treeSize);
            if (this.treeSize = e + 1,
            e > 1e4)
                throw t.deeplyNested()
        }
        ,
        e.copyWithArgs = function(e) {
            return new this.constructor(e)
        }
    })
});
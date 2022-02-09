define('core/math/features/buildIRExpression', ['require', 'core/math/ir/build-ir', 'core/math/parsenode/base', 'core/math/parsenode/irexpression', 'core/math/errormsg', 'core/math/parsenode/error'], function(require) {
    "use strict";
    var r = require("core/math/ir/build-ir").buildIR
      , e = require("core/math/parsenode/base")
      , t = require("core/math/parsenode/irexpression")
      , o = require("core/math/errormsg")
      , i = require("core/math/parsenode/error");
    e.prototype.buildIRExpression = function(i, n, s) {
        try {
            var a = r({
                policy: i,
                frame: n,
                wrapInList: s && s.wrapInList
            }, this);
            return new t(a)
        } catch (r) {
            return r instanceof e ? r : o.parseError()
        }
    }
    ,
    i.prototype.buildIRExpression = function() {
        return this
    }
});
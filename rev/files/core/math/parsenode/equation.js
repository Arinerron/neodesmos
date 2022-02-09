define('core/math/parsenode/equation', ['require', './base', 'pjs', './expressionTypes', 'core/math/parsenode/comparator'], function(require) {
    "use strict";
    var s = require("./base")
      , t = require("pjs")
      , i = require("./expressionTypes").Subtract
      , e = require("core/math/parsenode/comparator");
    return t(s, function(s, t) {
        s.init = function(s, e) {
            t.init.call(this),
            this.mergeDependencies(s, e),
            this._lhs = s,
            this._rhs = e,
            this._difference = i([this._lhs, this._rhs])
        }
        ,
        s.asComparator = function() {
            return e["="]([this._lhs, this._rhs])
        }
    })
});

define('core/math/parsenode/basecomparator', ['require', 'pjs', './expression', './expressionTypes', 'core/math/comparators'], function(require) {
    "use strict";
    var t = require("pjs")
      , n = require("./expression")
      , i = require("./expressionTypes").Subtract
      , r = require("core/math/comparators").table;
    return t(n, function(n, e, o) {
        o.create = function(n) {
            return t(o, function(t, i) {
                t.operator = n,
                t.isInequality = function() {
                    return 0 !== r[n].direction
                }
            })
        }
        ,
        n.init = function(t) {
            e.init.call(this, t),
            this._difference = -1 === r[this.operator].direction ? i([t[1], t[0]]) : i([t[0], t[1]])
        }
        ,
        n.asComparator = function() {
            return this
        }
    })
});
define('core/math/parsenode/doubleinequality', ['require', 'pjs', './base', 'core/math/comparators', './comparator'], function(require) {
    "use strict";
    var i = require("pjs")
      , e = require("./base")
      , s = require("core/math/comparators")
      , t = require("./comparator");
    return i(e, function(i, e) {
        i.init = function(i) {
            e.init.call(this),
            this.args = i,
            this._symbol = i[2]._symbol,
            this._operators = [i[1], i[3]],
            this._expressions = [i[0], i[4]];
            var n = s.get(s.table[i[1]].inclusive && s.table[i[3]].inclusive, s.table[i[1]].direction);
            this._indicator = t[n]([i[0], i[4]]),
            this.addDependency(this._symbol),
            this.mergeDependencies(this._expressions[0], this._expressions[1])
        }
        ,
        i.isInequality = function() {
            return !0
        }
        ,
        i.isShadeBetween = function() {
            return !0
        }
    })
});
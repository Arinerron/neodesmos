define('core/math/parsenode/list', ['require', 'pjs', './expression', 'core/math/types'], function(require) {
    "use strict";
    var t = require("pjs")
      , i = require("./expression")
      , n = require("core/math/types");
    return t(i, function(t, i, s) {
        t.init = function(t) {
            i.init.call(this, t),
            this.length = t.length
        }
        ,
        t.isList = !0,
        t.asValue = function() {
            for (var t = [], i = 0; i < this.args.length; i++)
                t.push(this.args[i].asValue());
            return t
        }
        ,
        t.asCompilerValue = function() {
            for (var t = [], i = 0; i < this.args.length; i++)
                t.push(this.args[i].asCompilerValue());
            return t
        }
        ,
        t.getEvaluationInfo = function() {
            if (this.args.every(function(t) {
                return t.isConstant
            }))
                return [{
                    val: this.args.map(function(t) {
                        return t.asValue()
                    })
                }]
        }
        ,
        s.eachArgs = function(t, i) {
            var s = function(t) {
                for (var i = 1 / 0, n = 0; n < t.length; n++)
                    (t[n].isList || t[n].isBroadcast) && (i = Math.min(i, t[n].length));
                return i
            }(t);
            if (isFinite(s))
                for (var e = 0; e < s; e++) {
                    for (var r = [], a = 0; a < t.length; a++)
                        r.push(t[a].isList || n.isList(t[a].valueType) ? t[a].elementAt(e) : t[a]);
                    i(r, e)
                }
            else
                i(t)
        }
        ,
        s.wrap = function(t) {
            return t.isList || n.isList(t.valueType) ? t : s([t])
        }
    })
});

define('core/math/parsenode/movablepoint', ['require', 'pjs', './parenseq', 'core/math/types'], function(require) {
    "use strict";
    var t = require("pjs")
      , e = require("./parenseq")
      , a = require("core/math/types");
    return t(e, function(t, e) {
        t.asValue = function() {
            return [+this.args[0].asValue(), +this.args[1].asValue()]
        }
        ,
        t.asCompilerValue = function() {
            return [this.args[0].asCompilerValue(), this.args[1].asCompilerValue()]
        }
        ,
        t.init = function(t, i, s) {
            e.init.call(this, t),
            this.moveStrategy = i,
            this.defaultDragMode = s,
            this.valueType = a.Point
        }
        ,
        t.isMovablePoint = !0
    })
});
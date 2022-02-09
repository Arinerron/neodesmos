
define('core/math/parsenode/error', ['require', 'pjs', './base'], function(require) {
    "use strict";
    return require("pjs")(require("./base"), function(t, n) {
        t.init = function(t) {
            n.init.call(this),
            this._msg = t,
            this.blocksExport = !0
        }
        ,
        t.evaluateOnce = function(t) {
            return this._msg
        }
        ,
        t.isError = !0,
        t.getError = function() {
            return this._msg
        }
        ,
        t.setDependencies = function(t) {
            return this.addDependencies(t),
            this
        }
        ,
        t.setActionValue = function(t) {
            this.actionValue = t
        }
        ,
        t.allowExport = function() {
            return this.blocksExport = !1,
            this
        }
    })
});
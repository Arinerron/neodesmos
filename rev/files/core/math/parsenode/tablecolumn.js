
define('core/math/parsenode/tablecolumn', ['require', 'pjs', './base', './list', './constant', './identifier'], function(require) {
    "use strict";
    var e = require("pjs")
      , t = require("./base")
      , n = require("./list")
      , i = require("./constant")
      , s = require("./identifier");
    return e(t, function(e, o) {
        function r(e) {
            return e.isConstant ? i(e.asCompilerValue()) : i(NaN)
        }
        e.init = function(e, t, n) {
            o.init.call(this),
            this.header = e,
            this.length = t,
            this.values = n,
            this.isIndependent = !1,
            this.registerDependencies(),
            this._exports = this.computeExports()
        }
        ,
        e.registerDependencies = function() {
            this.mergeDependencies(this.header),
            this.mergeDependencies.apply(this, this.values)
        }
        ,
        e.computeExports = function() {
            return this.header instanceof s ? [this.header._symbol] : []
        }
        ,
        e.isDiscrete = function(e) {
            return !this.continuousConcreteTree || 1 !== this.continuousConcreteTree.getDependencies().length || 1 !== e.header.getDependencies().length || this.continuousConcreteTree.getDependencies()[0] !== e.header.getDependencies()[0]
        }
        ,
        e._exportSymbolsTo = function(e, i, s) {
            if (e.length) {
                var o = e[0];
                if (i.isError)
                    s[o] = i;
                else
                    try {
                        s[o] = n(i.values.map(r))
                    } catch (e) {
                        if (!(e instanceof t))
                            throw e;
                        s[o] = e
                    }
            }
        }
        ,
        e.exportTo = function(e, t, n) {
            var i = this.getLegalExports(e);
            this._exportSymbolsTo(i, t, n)
        }
        ,
        e.exportToLocal = function(e, t) {
            this._exportSymbolsTo(this.getExports(), e, t)
        }
    })
});
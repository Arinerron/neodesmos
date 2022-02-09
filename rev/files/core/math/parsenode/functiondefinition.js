define('core/math/parsenode/functiondefinition', ['require', 'pjs', './base', 'core/math/errormsg', './equation', './identifier', './functioncall'], function(require) {
    "use strict";
    var t = require("pjs")
      , e = require("./base")
      , i = require("core/math/errormsg")
      , r = require("./equation")
      , n = require("./identifier")
      , s = require("./functioncall");
    return t(e, function(t, e) {
        t.init = function(t, i, r) {
            e.init.call(this),
            t = t._symbol,
            this._argSymbols = i.map(function(t) {
                return t._symbol
            }),
            this._symbol = t,
            this._exports = [t],
            this._expression = r,
            this.mergeDependenciesInScope(this._argSymbols, this._expression)
        }
        ,
        t.isFunction = !0,
        t.getConcreteInvocationTree = function(t, e, r, n) {
            if (r.length !== this._argSymbols.length)
                throw i.wrongArity(n, this._argSymbols.length, r.length);
            for (var s = Object.create(e), o = 0; o < this._argSymbols.length; o++)
                s[this._argSymbols[o]] = r[o];
            return this._expression.getConcreteTree(t, s)
        }
        ,
        t.getSliderVariables = function(t, i) {
            var r = this._argSymbols;
            return e.getSliderVariables.call(this, t, i).filter(function(t) {
                return -1 === r.indexOf(t)
            })
        }
        ,
        t.asEquation = function() {
            var t = this._argSymbols.map(function(t) {
                return n(t)
            })
              , e = r(s(n(this._symbol), t), this._expression);
            return e.userData = this.userData,
            e.metaData = this.metaData,
            e
        }
    })
});
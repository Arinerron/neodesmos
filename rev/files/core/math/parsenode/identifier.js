
define('core/math/parsenode/identifier', ['require', 'pjs', './expression', 'core/lib/label', 'core/math/parser/input-span'], function(require) {
    "use strict";
    var t = require("pjs")
      , n = require("./expression")
      , i = require("core/lib/label")
      , e = require("core/math/parser/input-span");
    return t(n, function(t, n, s) {
        t.init = function(t) {
            n.init.call(this, []),
            this._symbol = i.latexToIdentifier(t),
            this._errorSymbol = this._symbol,
            this.addDependency(this._symbol)
        }
        ,
        t.setInputSpan = function(t) {
            n.setInputSpan.call(this, t),
            this._errorSymbol = i.latexToIdentifier(this.getInputString())
        }
        ,
        t.getInputSpan = function() {
            return void 0 === this._inputSpan ? new e.Span(this._symbol,0,this._symbol.length) : this._inputSpan
        }
    })
});
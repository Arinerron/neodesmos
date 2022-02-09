define('core/math/features/substitute', ['require', 'parsenodes'], function(require) {
    "use strict";
    var t = require("parsenodes")
      , i = function(t, i) {
        return t.map(function(t) {
            return t.substitute(i)
        })
    }
      , r = {
        Identifier: function(t) {
            return t[this._symbol] ? t[this._symbol] : this
        },
        FunctionCall: function(r) {
            var n = r[this._symbol];
            if (n) {
                if ("Identifier" === n.type)
                    return t.FunctionCall(n, i(this.args, r));
                if ("Constant" === n.type)
                    return t.Multiply([n, 1 === this.args.length ? this.args[0].substitute(r) : t.Constant(NaN)])
            }
            return t.Expression.prototype.substitute.call(this, r)
        },
        Constant: function(t) {
            return this
        },
        Expression: function(t) {
            return this.copyWithArgs(i(this.args, t))
        },
        Derivative: function(r) {
            var n = r[this._symbol];
            if (n) {
                if ("Identifier" === n.type)
                    return t.Derivative(n, i(this.args, r));
                throw new Error("Cannot substitute for a derivative variable with a non-Identifier")
            }
            return t.Derivative(this._symbol, i(this.args, r))
        }
    };
    for (var n in r)
        t[n].prototype.substitute = r[n]
});
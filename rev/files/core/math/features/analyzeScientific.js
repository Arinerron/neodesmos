define('core/math/features/analyzeScientific', ['require', 'parsenodes', 'core/math/statementanalysis', 'core/math/errormsg', 'core/math/builtinframe'], function(require) {
    "use strict";
    var t = require("parsenodes")
      , e = require("core/math/statementanalysis")
      , i = require("core/math/errormsg")
      , n = require("core/math/builtinframe");
    function r(t, n) {
        return e(t, this, i.inequalitiesUnsupported())
    }
    t.Base.prototype.analyzeScientific = function(t, n) {
        var r = this.tryGetConcreteTree(t, n);
        return r.isError ? e(t, this, r) : e(t, this, i.parseError())
    }
    ,
    t.Expression.prototype.analyzeScientific = function(t, n) {
        var r = this.tryGetConcreteTree(t, n);
        if (r.isError)
            return e(t, this, r);
        var s = r.getDependencies();
        return s.length > 0 ? e(t, this, i.tooManyVariables(s)) : e(t, this, r)
    }
    ,
    t.Assignment.prototype.analyzeScientific = function(t, r) {
        var s = this._symbol;
        if (n[s])
            return e(t, this, i.cannotRedefine(s));
        var o = Object.create(r);
        o[s] = i.equationsUnsupported();
        var a = this.tryGetConcreteTree(t, o);
        if (a.isError)
            return e(t, this, a);
        var c = a.getDependencies();
        return this.isEquation(a) ? e(t, this, i.equationsUnsupported()) : c.length > 0 ? e(t, this, i.tooManyVariables(c)) : e(t, this, a)
    }
    ,
    t.FunctionDefinition.prototype.analyzeScientific = function(t, r) {
        if (n[this._symbol])
            return e(t, this, i.cannotRedefine(this._symbol));
        var s = this.tryGetConcreteTree(t, r);
        if (s.isError)
            return e(t, this, s);
        var o = this._argSymbols
          , a = s.getDependencies();
        if (-1 !== a.indexOf(this._symbol))
            return e(t, this, i.selfReferentialFunction(this._symbol));
        var c = a.filter(function(t) {
            return -1 === o.indexOf(t)
        });
        return c.length ? e(t, this, i.addArgumentsToDefinition(c, this._symbol, o)) : e(t, this, s)
    }
    ,
    t.Equation.prototype.analyzeScientific = function(t, n) {
        return e(t, this, i.equationsUnsupported())
    }
    ,
    t.And.prototype.analyzeScientific = r,
    t.DoubleInequality.prototype.analyzeScientific = r,
    t.BaseComparator.prototype.analyzeScientific = r,
    t.Regression.prototype.analyzeScientific = function(t, n) {
        return e(t, this, i.regressionsUnsupported())
    }
    ,
    t.ParenSeq.prototype.analyzeScientific = function(t, n) {
        return e(t, this, i.pointsUnsupported())
    }
});
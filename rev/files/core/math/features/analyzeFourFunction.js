
define('core/math/features/analyzeFourFunction', ['require', 'parsenodes', 'core/math/statementanalysis', 'core/math/errormsg', 'core/math/builtinframe'], function(require) {
    "use strict";
    var n = require("parsenodes")
      , t = require("core/math/statementanalysis")
      , e = require("core/math/errormsg")
      , r = require("core/math/builtinframe");
    function o(n, r) {
        return t(n, this, e.inequalitiesUnsupported())
    }
    n.Base.prototype.analyzeFourFunction = function(n, r) {
        var o = this.tryGetConcreteTree(n, r);
        return o.isError ? t(n, this, o) : t(n, this, e.parseError())
    }
    ,
    n.Expression.prototype.analyzeFourFunction = function(n, o) {
        var i = this.tryGetConcreteTree(n, o);
        if (i.isError)
            return t(n, this, i);
        var u = i.getDependencies();
        if (u.length > 0) {
            var s, a = u[0], p = r[a];
            return s = p ? p.isFunction ? e.functionUnsupported(a) : e.constantUnsupported(a) : e.variablesUnsupported(a),
            t(n, this, s)
        }
        return t(n, this, i)
    }
    ,
    n.Assignment.prototype.analyzeFourFunction = function(n, r) {
        return t(n, this, e.assignmentsUnsupported())
    }
    ,
    n.FunctionDefinition.prototype.analyzeFourFunction = function(n, r) {
        return t(n, this, e.functionDefinitionsUnsupported())
    }
    ,
    n.Equation.prototype.analyzeFourFunction = function(n, r) {
        return t(n, this, e.equationsUnsupported())
    }
    ,
    n.And.prototype.analyzeFourFunction = o,
    n.DoubleInequality.prototype.analyzeFourFunction = o,
    n.BaseComparator.prototype.analyzeFourFunction = o,
    n.Regression.prototype.analyzeFourFunction = function(n, r) {
        return t(n, this, e.regressionsUnsupported())
    }
    ,
    n.ParenSeq.prototype.analyzeFourFunction = function(n, r) {
        return t(n, this, e.pointsUnsupported())
    }
});
define('core/math/features/analyzeSingleExpressionScientific', ['require', 'parsenodes', 'core/math/statementanalysis', 'core/math/errormsg', 'core/math/builtinframe'], function(require) {
    "use strict";
    var e = require("parsenodes")
      , n = require("core/math/statementanalysis")
      , i = require("core/math/errormsg")
      , t = require("core/math/builtinframe");
    function r(e, t) {
        return n(e, this, i.inequalitiesUnsupported())
    }
    e.Base.prototype.analyzeSingleExpressionScientific = function(e, t) {
        var r = this.tryGetConcreteTree(e, t);
        return r.isError ? n(e, this, r) : n(e, this, i.parseError())
    }
    ,
    e.Expression.prototype.analyzeSingleExpressionScientific = function(e, r) {
        var s = this.tryGetConcreteTree(e, r);
        if (s.isError)
            return n(e, this, s);
        var o = s.getDependencies();
        if (o.length > 0) {
            var p, a = o[0], c = t[a];
            return p = c ? c.isFunction ? i.functionUnsupported(a) : i.constantUnsupported(a) : i.variablesUnsupported(a),
            n(e, this, p)
        }
        return n(e, this, s)
    }
    ,
    e.Assignment.prototype.analyzeSingleExpressionScientific = function(e, t) {
        return n(e, this, i.assignmentsUnsupported())
    }
    ,
    e.FunctionDefinition.prototype.analyzeSingleExpressionScientific = function(e, t) {
        return n(e, this, i.functionDefinitionsUnsupported())
    }
    ,
    e.Equation.prototype.analyzeSingleExpressionScientific = function(e, t) {
        return n(e, this, i.equationsUnsupported())
    }
    ,
    e.And.prototype.analyzeSingleExpressionScientific = r,
    e.DoubleInequality.prototype.analyzeSingleExpressionScientific = r,
    e.BaseComparator.prototype.analyzeSingleExpressionScientific = r,
    e.Regression.prototype.analyzeSingleExpressionScientific = function(e, t) {
        return n(e, this, i.regressionsUnsupported())
    }
    ,
    e.ParenSeq.prototype.analyzeSingleExpressionScientific = function(e, t) {
        return n(e, this, i.pointsUnsupported())
    }
});
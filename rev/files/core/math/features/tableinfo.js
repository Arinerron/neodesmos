
define('core/math/features/tableinfo', ['require', 'parsenodes', 'core/math/types', 'core/lib/label', 'core/math/distribution-spec'], function(require) {
    "use strict";
    var e = require("parsenodes")
      , t = e.List
      , n = require("core/math/types")
      , i = require("core/lib/label")
      , r = require("core/math/distribution-spec").getFunctionSpecFromTree;
    e.Base.prototype.tableInfo = function(e, t) {
        return !1
    }
    ,
    e.Identifier.prototype.tableInfo = function(e, t) {
        return !!e.validFirstColumnVariable(this._symbol) && {
            independent_variable: this._symbol,
            dependent_column: this.getInputString(),
            by_reference: !1
        }
    }
    ,
    e.Expression.prototype.tableInfo = function(e, i) {
        var o = i.getDependencies();
        if (r(this))
            return !1;
        switch (i.valueType) {
        case n.Point:
        case n.ListOfPoint:
            return 0 === o.length && ((!i.isMovablePoint || "updateSlider" !== i.moveStrategy[0].type && "updateSlider" !== i.moveStrategy[1].type) && {
                independent_variable: "x",
                dependent_column: "y",
                by_reference: !1,
                values: t.wrap(i).asValue()
            });
        case n.Number:
            if (1 !== o.length)
                return !1;
            var a = o[0];
            return !!e.validFirstColumnVariable(a) && {
                independent_variable: a,
                dependent_column: this.getInputString(),
                by_reference: !1
            };
        default:
            return !1
        }
    }
    ,
    e.Assignment.prototype.tableInfo = function(t, n) {
        if (n instanceof e.SolvedEquation)
            return !1;
        if (!this.getInputString().length)
            return !1;
        if (r(this))
            return !1;
        var o, a = n.getDependencies();
        if (a.length > 1)
            return !1;
        if (0 === a.length) {
            if (!t.tableableAsConstant(this._symbol))
                return !1;
            o = t.implicitIndependent(this._symbol)
        } else
            o = a[0];
        return !!t.validFirstColumnVariable(o) && {
            independent_variable: o,
            dependent_column: t.assignmentForbidden(this._symbol) ? i.trimLatex(this.getInputString().replace(/[^=]*=/, "")) : i.trimLatex(this.getInputString().split("=")[0]),
            by_reference: !t.assignmentForbidden(this._symbol)
        }
    }
    ,
    e.FunctionDefinition.prototype.tableInfo = function(e, t) {
        if (1 !== this._argSymbols.length)
            return !1;
        if (!this.getInputString().length)
            return !1;
        if (t.getDependencies().length > 1)
            return !1;
        var n = this._argSymbols[0];
        if (!e.validFirstColumnVariable(n))
            return !1;
        var r = e.assignmentForbidden(this._symbol);
        return {
            independent_variable: n,
            dependent_column: r ? i.trimLatex(this.getInputString().replace(/[^=]*=/, "")) : i.trimLatex(this.getInputString().split("=")[0]),
            by_reference: !r
        }
    }
    ,
    e.BaseComparator.prototype.tableInfo = function(e, t) {
        return !1
    }
    ,
    e.DoubleInequality.prototype.tableInfo = function(e, t) {
        return !1
    }
    ,
    e.Equation.prototype.tableInfo = function(e, t) {
        return !1
    }
});
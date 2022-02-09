define('core/math/features/printLatex', ['require', 'parsenodes', 'core/lib/label', 'core/lib/number-to-latex'], function(require) {
    "use strict";
    var t = require("parsenodes")
      , r = require("core/lib/label")
      , i = require("core/lib/number-to-latex").default;
    function e(t) {
        switch (t) {
        case ">":
            return ">";
        case "<":
            return "<";
        case ">=":
            return "\\ge ";
        case "<=":
            return "\\le ";
        case "=":
            return "="
        }
    }
    function n(t) {
        return t.printLatex()
    }
    function a(t) {
        return t.isConstant && !0 === t.asValue()
    }
    t.Identifier.prototype.printLatex = function() {
        return r.identifierToLatex(this._symbol) + " "
    }
    ,
    t.Constant.prototype.printLatex = function() {
        return i(this.asValue())
    }
    ,
    t.Ticker.prototype.printLatex = function() {
        return "\\ticker\\left(" + this.args.map(n).join(", ") + "\\right)"
    }
    ,
    t.Negative.prototype.printLatex = function() {
        return "-\\left(" + this.args[0].printLatex() + "\\right)"
    }
    ,
    t.Add.prototype.printLatex = function() {
        return "\\left(" + this.args[0].printLatex() + "\\right)+\\left(" + this.args[1].printLatex() + "\\right)"
    }
    ,
    t.PercentOf.prototype.printLatex = function() {
        return this.args[0].printLatex() + " \\% \\operatorname{of} " + this.args[1].printLatex()
    }
    ,
    t.Subtract.prototype.printLatex = function() {
        return "\\left(" + this.args[0].printLatex() + "\\right)-\\left(" + this.args[1].printLatex() + "\\right)"
    }
    ,
    t.Multiply.prototype.printLatex = function() {
        return "\\left(" + this.args[0].printLatex() + "\\right)*\\left(" + this.args[1].printLatex() + "\\right)"
    }
    ,
    t.Divide.prototype.printLatex = function() {
        return "\\frac{" + this.args[0].printLatex() + "}{" + this.args[1].printLatex() + "}"
    }
    ,
    t.Exponent.prototype.printLatex = function() {
        return "\\left(" + this.args[0].printLatex() + "\\right)^{" + this.args[1].printLatex() + "}"
    }
    ,
    t.Assignment.prototype.printLatex = function() {
        return r.identifierToLatex(this._symbol) + "=" + this._expression.printLatex()
    }
    ,
    t.Equation.prototype.printLatex = function() {
        return this._lhs.printLatex() + "=" + this._rhs.printLatex()
    }
    ,
    t.BaseComparator.prototype.printLatex = function() {
        return "\\left(" + this.args[0].printLatex() + "\\right)" + e(this.operator) + "\\left(" + this.args[1].printLatex() + "\\right)"
    }
    ,
    t.DoubleInequality.prototype.printLatex = function() {
        return "\\left(" + this.args[0].printLatex() + "\\right)" + e(this.args[1]) + this.args[2].printLatex() + e(this.args[3]) + "\\left(" + this.args[4].printLatex() + "\\right)"
    }
    ,
    t.And.prototype.printLatex = function() {
        if (!(this.args[0]instanceof t.BaseComparator && this.args[1]instanceof t.BaseComparator))
            throw new Error("Not implemented");
        if (this.args[0].args[1].printLatex() !== this.args[1].args[0].printLatex())
            throw new Error("Not implemented");
        return "\\left(" + this.args[0].args[0].printLatex() + "\\right)" + e(this.args[0].operator) + "\\left(" + this.args[0].args[1].printLatex() + "\\right)" + e(this.args[1].operator) + "\\left(" + this.args[1].args[1].printLatex() + "\\right)"
    }
    ,
    t.FunctionCall.prototype.printLatex = function() {
        switch (this._symbol) {
        case "sqrt":
            return "\\sqrt{" + this.args[0].printLatex() + "}";
        case "nthroot":
            return "\\sqrt[" + this.args[1].printLatex() + "]{" + this.args[0].printLatex() + "}";
        case "logbase":
            return "\\log_{" + this.args[1].printLatex() + "}\\left(" + this.args[0].printLatex() + "\\right)";
        default:
            return r.identifierToLatex(this._symbol) + "\\left(" + this.args.map(n).join(", ") + "\\right)"
        }
    }
    ,
    t.SeededFunctionCall.prototype.printLatex = function() {
        return r.identifierToLatex(this._symbol) + "\\left(" + this.args.slice(1).map(n).join(", ") + "\\right)"
    }
    ,
    t.DotAccess.prototype.printLatex = function() {
        return "(" + this.args[0].printLatex() + ").(" + this.args[1].printLatex() + ")"
    }
    ,
    t.Prime.prototype.printLatex = function() {
        switch (this.args[0]._symbol) {
        case "logbase":
            return "\\log_{" + this.args[0].args[1].printLatex() + "}" + Array(this.order + 1).join("'") + "\\left(" + this.args[0].args[0].printLatex() + "\\right)";
        default:
            return r.identifierToLatex(this.args[0]._symbol) + Array(this.order + 1).join("'") + "\\left(" + this.args[0].args.map(n).join(", ") + "\\right)"
        }
    }
    ,
    t.List.prototype.printLatex = function() {
        return "\\left[" + this.args.map(n).join(", ") + "\\right]"
    }
    ,
    t.Range.prototype.printLatex = function() {
        return "\\left[" + this.args[0].args.map(n).join(", ") + " ... " + this.args[1].args.map(n).join(", ") + "\\right]"
    }
    ,
    t.UpdateRule.prototype.printLatex = function() {
        return this.args[0].printLatex() + "\\to(" + this.args[1].printLatex() + ")"
    }
    ,
    t.ListAccess.prototype.printLatex = function() {
        return "\\left(" + this.args[0].printLatex() + "\\right)\\left[" + this.args[1].printLatex() + "\\right]"
    }
    ,
    t.ParenSeq.prototype.printLatex = function() {
        return "\\left(" + this.args.map(n).join(", ") + "\\right)"
    }
    ,
    t.BareSeq.prototype.printLatex = function() {
        return this.args.map(n).join(", ")
    }
    ,
    t.Sum.prototype.printLatex = function() {
        return "\\sum_{" + this.args[0].printLatex() + "=" + this.args[1].printLatex() + "}^{" + this.args[2].printLatex() + "}\\left(" + this.args[3].printLatex() + "\\right)"
    }
    ,
    t.Product.prototype.printLatex = function() {
        return "\\prod_{" + this.args[0].printLatex() + "=" + this.args[1].printLatex() + "}^{" + this.args[2].printLatex() + "}\\left(" + this.args[3].printLatex() + "\\right)"
    }
    ,
    t.Integral.prototype.printLatex = function() {
        return "\\int_{" + this.args[1].printLatex() + "}^{" + this.args[2].printLatex() + "}\\left(" + this.args[3].printLatex() + "\\right)d" + this.args[0].printLatex()
    }
    ,
    t.FunctionExponent.prototype.printLatex = function() {
        return this.args[0].printLatex() + "\\left(" + this.args[1].printLatex() + "\\right)^{" + this.args[2].printLatex() + "}"
    }
    ,
    t.FunctionFactorial.prototype.printLatex = function() {
        return this.args[0].printLatex() + "\\left(" + this.args[1].printLatex() + "\\right)!"
    }
    ,
    t.Piecewise.prototype.printLatex = function() {
        var r = this;
        if (a(r.args[0]))
            return r.args[1].printLatex();
        for (var i, e = ["\\left\\{"]; ; ) {
            if (a(r.args[0])) {
                e.push(r.args[1].printLatex());
                break
            }
            if (e.push(r.args[0].printLatex(), ": "),
            (i = r.args[2]).isConstant && i.isNaN()) {
                e.push(r.args[1].printLatex());
                break
            }
            if (e.push(r.args[1].printLatex(), ", "),
            !(r.args[2]instanceof t.Piecewise)) {
                e.push(r.args[2].printLatex());
                break
            }
            r = r.args[2]
        }
        return e.push("\\right\\}"),
        e.join("")
    }
    ,
    t.FunctionDefinition.prototype.printLatex = function() {
        return r.identifierToLatex(this._symbol) + "\\left(" + this._argSymbols.map(r.identifierToLatex).join(", ") + "\\right) = " + this._expression.printLatex()
    }
    ,
    t.Derivative.prototype.printLatex = function() {
        return "\\frac{d}{d" + r.identifierToLatex(this._symbol) + "}\\left(" + this.args[0].printLatex() + "\\right)"
    }
    ,
    t.Regression.prototype.printLatex = function() {
        return "\\left(" + this._lhs.printLatex() + "\\right)\\sim\\left(" + this._rhs.printLatex() + "\\right)"
    }
    ,
    t.Histogram.prototype.printLatex = function() {
        return "\\histogram\\left(" + this.args.map(n).join(", ") + "\\right)"
    }
    ,
    t.Object3D.prototype.printLatex = function() {
        return "\\" + this._symbol + "\\left(" + this.args.map(n).join(", ") + "\\right)"
    }
    ,
    t.DotPlot.prototype.printLatex = function() {
        return "\\dotplot\\left(" + this.args.map(n).join(", ") + "\\right)"
    }
    ,
    t.BoxPlot.prototype.printLatex = function() {
        return "\\boxplot\\left(" + this.args.map(n).join(", ") + "\\right)"
    }
    ,
    t.TTest.prototype.printLatex = function() {
        return "\\TTest\\left(" + this.args.map(n).join(", ") + "\\right)"
    }
    ,
    t.IndependentTTest.prototype.printLatex = function() {
        return "\\IndependentTTest\\left(" + this.args.map(n).join(", ") + "\\right)"
    }
    ,
    t.Stats.prototype.printLatex = function() {
        return "\\Stats\\left(" + this.args.map(n).join(", ") + "\\right)"
    }
    ,
    t.AssignmentExpression.prototype.printLatex = function() {
        return r.identifierToLatex(this._symbol) + "=" + this.args[1].printLatex()
    }
    ,
    t.ListComprehension.prototype.printLatex = function() {
        return "\\left[" + this._body.printLatex() + "\\operatorname{for}" + this._inputLists.map(n).join(", ") + "\\right]"
    }
});
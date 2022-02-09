define('core/math/features/repr', ['require', 'parsenodes'], function(require) {
    "use strict";
    var r = require("parsenodes")
      , t = function(r, t, e) {
        e = e || 0;
        var i = Array(e + 1).join("  ")
          , n = i + "  ";
        return "[\n" + n + r.map(function(r) {
            return r.repr(t, e + 1)
        }).join(",\n" + n) + "\n" + i + "]"
    }
      , e = function(r, t) {
        return "" + (t = t || "") + r
    };
    r.Expression.prototype.repr = function(r, i) {
        return e(this.type, r) + "(" + t(this.args, r, i) + ")"
    }
    ,
    r.IRExpression.prototype.repr = function(r, t) {
        t = t || 0;
        var i = Array(t + 1).join("  ")
          , n = i + "  "
          , s = this._chunk.print().split("\n");
        return s.pop(),
        e(this.type, r) + "(`\n" + n + s.join("\n" + n) + "\n" + i + "`)"
    }
    ,
    r.DoubleInequality.prototype.repr = function(r, t) {
        t = t || 0;
        var i = Array(t + 1).join("  ")
          , n = i + "  ";
        return e(this.type, r) + "([\n" + n + this.args[0].repr(r, t + 1) + ",\n" + n + "'" + this.args[1] + "',\n" + n + this.args[2].repr(r, t + 1) + ",\n" + n + "'" + this.args[3] + "',\n" + n + this.args[4].repr(r, t + 1) + "\n" + i + "])"
    }
    ,
    r.Identifier.prototype.repr = function(r) {
        return e(this.type, r) + "('" + this._symbol + "')"
    }
    ,
    r.Constant.prototype.repr = function(r) {
        return e(this.type, r) + "(" + this.asValue() + ")"
    }
    ,
    r.ExtendSeed.prototype.repr = function(r, i) {
        return e(this.type, r) + "('" + this.tag + "', " + t(this.args, r, i) + ")"
    }
    ,
    r.Seed.prototype.repr = function(r) {
        return e(this.type, r) + "(" + this.asValue() + ")"
    }
    ,
    r.FunctionCall.prototype.repr = function(r, i) {
        return e(this.type, r) + "('" + this._symbol + "', " + t(this.args, r, i) + ")"
    }
    ,
    r.Assignment.prototype.repr = function(t, i) {
        return e(this.type, t) + "(" + r.Identifier(this._symbol).repr(t, i) + ", " + this._expression.repr(t, i) + ")"
    }
    ,
    r.Regression.prototype.repr = r.Equation.prototype.repr = function(r, t) {
        return e(this.type, r) + "(" + this._lhs.repr(r, t) + ", " + this._rhs.repr(r, t) + ")"
    }
    ,
    r.FunctionDefinition.prototype.repr = function(i, n) {
        return e(this.type, i) + "(" + r.Identifier(this._symbol).repr(i, n) + ", " + t(this._argSymbols.map(function(t) {
            return r.Identifier(t)
        }), i, n) + ", " + this._expression.repr(i, n) + ")"
    }
    ,
    r.Error.prototype.repr = function(r, t) {
        return e(this.type, r) + "('" + this._msg + "')"
    }
    ,
    r.Derivative.prototype.repr = function(r, i) {
        return e(this.type, r) + "('" + this._symbol + "', " + t(this.args, r, i) + ")"
    }
    ,
    r.SolvedEquation.prototype.repr = function(r, t) {
        return e(this.type, r) + "('" + this._symbol + "', " + this._expression.repr(r, t) + ")"
    }
    ,
    r.OptimizedRegression.prototype.repr = function(r, t) {
        return e(this.type, r) + "(" + JSON.stringify(this.parameters) + ", " + JSON.stringify(this.residuals) + ", " + JSON.stringify(this.statistics) + ", " + this.model.repr(r, t + 1) + ", " + JSON.stringify({
            isModelValid: this.isModelValid,
            residualVariable: this.residualVariable,
            residualSuggestionId: this.residualSuggestionId,
            shouldSuggestLogMode: this.shouldSuggestLogMode,
            isLinear: this.isLinear,
            parameterWarning: this.parameterWarning
        }) + ")"
    }
    ,
    r.Table.prototype.repr = function(r, i) {
        return e(this.type, r) + "(" + t(this.columns, r, i) + ")"
    }
    ,
    r.TableColumn.prototype.repr = function(r, i) {
        return e(this.type, r) + "(" + this.header.repr(r, i) + ", " + this.length + ", " + t(this.values, r, i) + ")"
    }
    ,
    r.Image.prototype.repr = function(r, t) {
        var i = Array(t + 1).join("  ")
          , n = i + "  ";
        return e(this.type, r) + "({\n" + n + "center: " + this.center.repr(r, t + 1) + ",\n" + n + "radianAngle: " + this.radianAngle.repr(r, t + 1) + ",\n" + n + "width: " + this.width.repr(r, t + 1) + ",\n" + n + "height: " + this.height.repr(r, t + 1) + "},\n" + n + "opacity: " + this.opacity.repr(r, t + 1) + ",\n" + n + JSON.stringify(this.moveStrategy) + "\n" + i + "})"
    }
    ,
    r.Ticker.prototype.repr = function(r, t) {
        var i = Array(t + 1).join("  ")
          , n = i + "  ";
        return e(this.type, r) + "({\n" + n + "handler: " + this.handler.repr(r, t + 1) + ",\n" + n + "minStep: " + this.minStep.repr(r, t + 1) + "\n" + i + "})"
    }
    ,
    r.Slider.prototype.repr = function(r, t) {
        var i = Array(t + 1).join("  ")
          , n = i + "  ";
        return e(this.type, r) + "({\n" + n + "sliderAssignment: " + this.sliderAssignment.repr(r, t + 1) + ",\n" + n + "sliderMin: " + (this.sliderMin && this.sliderMin.repr(r, t + 1)) + ",\n" + n + "sliderMax: " + (this.sliderMax && this.sliderMax.repr(r, t + 1)) + ",\n" + n + "sliderStep: " + (this.sliderStep && this.sliderStep.repr(r, t + 1)) + "},\n" + i + ")"
    }
});
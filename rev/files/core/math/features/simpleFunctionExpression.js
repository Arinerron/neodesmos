define('core/math/features/simpleFunctionExpression', ['require', 'parsenodes'], function(require) {
    "use strict";
    var n = require("parsenodes");
    n.Expression.prototype.simpleFunctionExpression = function() {
        return this
    }
    ,
    n.Assignment.prototype.simpleFunctionExpression = function() {
        return this._expression
    }
    ,
    n.FunctionDefinition.prototype.simpleFunctionExpression = function() {
        return this._expression
    }
    ,
    n.Equation.prototype.simpleFunctionExpression = function() {
        return this.asComparator().simpleFunctionExpression()
    }
});
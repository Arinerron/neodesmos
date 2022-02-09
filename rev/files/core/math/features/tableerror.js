
define('core/math/features/tableerror', ['require', 'parsenodes', 'core/lib/worker-i18n'], function(require) {
    "use strict";
    var r = require("parsenodes")
      , e = require("core/lib/worker-i18n");
    r.Base.prototype.tableError = function() {
        return this.isInequality() ? e.s("shared-calculator-error-table-inequality-supplement") : !(this instanceof r.Expression || this instanceof r.IRExpression) && e.s("shared-calculator-error-table-generic-supplement")
    }
    ,
    r.List.prototype.tableError = function() {
        return e.s("shared-calculator-error-table-list-supplement")
    }
    ,
    r.Equation.prototype.tableError = r.Assignment.prototype.tableError = function() {
        return e.s("shared-calculator-error-table-equation-supplement")
    }
    ,
    r.FunctionDefinition.prototype.tableError = function() {
        return e.s("shared-calculator-error-table-function-definition-supplement")
    }
    ,
    r.Regression.prototype.tableError = function() {
        return e.s("shared-calculator-error-table-regression-supplement")
    }
});
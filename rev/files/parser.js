define('parser', ['require', 'core/math/baseparser', 'core/math/features/getConcreteTree', 'core/math/features/buildIRExpression', 'core/math/features/typeCheck', 'core/math/features/repr', 'core/math/features/substitute', 'core/math/features/simpleFunctionExpression', 'core/math/features/analyze', 'core/math/features/analyzeFourFunction', 'core/math/features/analyzeScientific', 'core/math/features/analyzeSingleExpressionScientific', 'core/math/features/getgraphmode', 'core/math/features/getgraphinfo', 'core/math/features/getMoveStrategy', 'core/math/features/getDefaultDragMode', 'core/math/features/tableinfo', 'core/math/features/tableerror', 'core/math/features/graph', 'core/math/features/elementAt', 'core/math/features/printLatex', 'core/math/features/getExpressionType'], function(require) {
    "use strict";
    var e = require("core/math/baseparser");
    return require("core/math/features/getConcreteTree"),
    require("core/math/features/buildIRExpression"),
    require("core/math/features/typeCheck"),
    require("core/math/features/repr"),
    require("core/math/features/substitute"),
    require("core/math/features/simpleFunctionExpression"),
    require("core/math/features/analyze"),
    require("core/math/features/analyzeFourFunction"),
    require("core/math/features/analyzeScientific"),
    require("core/math/features/analyzeSingleExpressionScientific"),
    require("core/math/features/getgraphmode"),
    require("core/math/features/getgraphinfo"),
    require("core/math/features/getMoveStrategy"),
    require("core/math/features/getDefaultDragMode"),
    require("core/math/features/tableinfo"),
    require("core/math/features/tableerror"),
    require("core/math/features/graph"),
    require("core/math/features/elementAt"),
    require("core/math/features/printLatex"),
    require("core/math/features/getExpressionType"),
    e
});
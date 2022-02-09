
define('parsenodes', ['require', 'core/math/parsenode/expressionTypes', 'core/math/parsenode/base', 'core/math/parsenode/expression', 'core/math/parsenode/error', 'core/math/parsenode/constant', 'core/math/parsenode/mixednumber', 'core/math/parsenode/identifier', 'core/math/parsenode/ans', 'core/math/parsenode/list', 'core/math/parsenode/range', 'core/math/parsenode/listaccess', 'core/math/parsenode/dotaccess', 'core/math/parsenode/parenseq', 'core/math/parsenode/movablepoint', 'core/math/parsenode/orderedpairaccess', 'core/math/parsenode/bareseq', 'core/math/parsenode/basecomparator', 'core/math/parsenode/comparator', 'core/math/parsenode/doubleinequality', 'core/math/parsenode/repeatedoperator', 'core/math/parsenode/sum', 'core/math/parsenode/product', 'core/math/parsenode/integral', 'core/math/parsenode/assignmentexpression', 'core/math/parsenode/listcomprehension', 'core/math/parsenode/functioncall', 'core/math/parsenode/seededfunctioncall', 'core/math/parsenode/functionexponent', 'core/math/parsenode/functionfactorial', 'core/math/parsenode/prime', 'core/math/parsenode/piecewise', 'core/math/parsenode/derivative', 'core/math/parsenode/updaterule', 'core/math/parsenode/histogram', 'core/math/parsenode/object3d', 'core/math/parsenode/dotplot', 'core/math/parsenode/boxplot', 'core/math/parsenode/ttest', 'core/math/parsenode/independent-ttest', 'core/math/parsenode/stats', 'core/math/parsenode/assignment', 'core/math/parsenode/functiondefinition', 'core/math/parsenode/equation', 'core/math/parsenode/regression', 'core/math/parsenode/image', 'core/math/parsenode/ticker', 'core/math/parsenode/slider', 'core/math/parsenode/table', 'core/math/parsenode/tablecolumn', 'core/math/parsenode/solvedequation', 'core/math/parsenode/optimizedregression', 'core/math/parsenode/seed', 'core/math/parsenode/extendseed', 'core/math/parsenode/irexpression'], function(require) {
    "use strict";
    var e = require("core/math/parsenode/expressionTypes")
      , o = {
        Base: require("core/math/parsenode/base"),
        Expression: require("core/math/parsenode/expression"),
        Error: require("core/math/parsenode/error"),
        Constant: require("core/math/parsenode/constant"),
        MixedNumber: require("core/math/parsenode/mixednumber"),
        Identifier: require("core/math/parsenode/identifier"),
        Ans: require("core/math/parsenode/ans"),
        List: require("core/math/parsenode/list"),
        Range: require("core/math/parsenode/range"),
        ListAccess: require("core/math/parsenode/listaccess"),
        DotAccess: require("core/math/parsenode/dotaccess"),
        ParenSeq: require("core/math/parsenode/parenseq"),
        MovablePoint: require("core/math/parsenode/movablepoint"),
        OrderedPairAccess: require("core/math/parsenode/orderedpairaccess"),
        BareSeq: require("core/math/parsenode/bareseq"),
        BaseComparator: require("core/math/parsenode/basecomparator"),
        Comparator: require("core/math/parsenode/comparator"),
        DoubleInequality: require("core/math/parsenode/doubleinequality"),
        RepeatedOperator: require("core/math/parsenode/repeatedoperator"),
        Sum: require("core/math/parsenode/sum"),
        Product: require("core/math/parsenode/product"),
        Integral: require("core/math/parsenode/integral"),
        AssignmentExpression: require("core/math/parsenode/assignmentexpression"),
        ListComprehension: require("core/math/parsenode/listcomprehension"),
        FunctionCall: require("core/math/parsenode/functioncall"),
        SeededFunctionCall: require("core/math/parsenode/seededfunctioncall"),
        FunctionExponent: require("core/math/parsenode/functionexponent"),
        FunctionFactorial: require("core/math/parsenode/functionfactorial"),
        Prime: require("core/math/parsenode/prime"),
        Piecewise: require("core/math/parsenode/piecewise"),
        Derivative: require("core/math/parsenode/derivative"),
        UpdateRule: require("core/math/parsenode/updaterule"),
        Histogram: require("core/math/parsenode/histogram"),
        Object3D: require("core/math/parsenode/object3d"),
        DotPlot: require("core/math/parsenode/dotplot"),
        BoxPlot: require("core/math/parsenode/boxplot"),
        TTest: require("core/math/parsenode/ttest"),
        IndependentTTest: require("core/math/parsenode/independent-ttest"),
        Stats: require("core/math/parsenode/stats"),
        Assignment: require("core/math/parsenode/assignment"),
        FunctionDefinition: require("core/math/parsenode/functiondefinition"),
        Equation: require("core/math/parsenode/equation"),
        Regression: require("core/math/parsenode/regression"),
        Image: require("core/math/parsenode/image"),
        Ticker: require("core/math/parsenode/ticker"),
        Slider: require("core/math/parsenode/slider"),
        Table: require("core/math/parsenode/table"),
        TableColumn: require("core/math/parsenode/tablecolumn"),
        SolvedEquation: require("core/math/parsenode/solvedequation"),
        OptimizedRegression: require("core/math/parsenode/optimizedregression"),
        Seed: require("core/math/parsenode/seed"),
        ExtendSeed: require("core/math/parsenode/extendseed"),
        IRExpression: require("core/math/parsenode/irexpression")
    };
    for (var r in e)
        o[r] = e[r];
    for (var a in o)
        o.hasOwnProperty(a) && "Comparator" !== a && (o[a].prototype.type = a);
    for (var t in o.Comparator)
        o.Comparator.hasOwnProperty(t) && (o.Comparator[t].prototype.type = "Comparator['" + t + "']");
    return o
});
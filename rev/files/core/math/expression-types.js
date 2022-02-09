define('core/math/expression-types', ["require", "exports"], function(require, i) {
    "use strict";
    var s;
    Object.defineProperty(i, "__esModule", {
        value: !0
    }),
    i.isClickableExpressionType = i.getReconciledExpressionProps = i.EXPRESSION_PROP_DEFAULTS = i.ExpressionType = void 0,
    function(i) {
        i.X_OR_Y = "X_OR_Y",
        i.SINGLE_POINT = "SINGLE_POINT",
        i.POINT_LIST = "POINT_LIST",
        i.PARAMETRIC = "PARAMETRIC",
        i.POLAR = "POLAR",
        i.IMPLICIT = "IMPLICIT",
        i.POLYGON = "POLYGON",
        i.HISTOGRAM = "HISTOGRAM",
        i.DOTPLOT = "DOTPLOT",
        i.BOXPLOT = "BOXPLOT",
        i.TTEST = "TTEST",
        i.STATS = "STATS",
        i.CUBE = "CUBE",
        i.SPHERE = "SPHERE"
    }(s = i.ExpressionType || (i.ExpressionType = {})),
    i.EXPRESSION_PROP_DEFAULTS = {
        X_OR_Y: {
            points: !1,
            lines: !0,
            fill: !1
        },
        SINGLE_POINT: {
            points: !0,
            lines: !1,
            fill: !1
        },
        POINT_LIST: {
            points: !0,
            lines: !1,
            fill: !1
        },
        PARAMETRIC: {
            points: !1,
            lines: !0,
            fill: !1
        },
        POLAR: {
            points: !1,
            lines: !0,
            fill: !1
        },
        IMPLICIT: {
            points: !1,
            lines: !0,
            fill: !1
        },
        POLYGON: {
            points: !1,
            lines: !0,
            fill: !0
        },
        HISTOGRAM: {
            points: !1,
            lines: !0,
            fill: !0
        },
        DOTPLOT: {
            points: !0,
            lines: !1,
            fill: !1
        },
        BOXPLOT: {
            points: !1,
            lines: !0,
            fill: !1
        },
        TTEST: {
            points: !1,
            lines: !1,
            fill: !1
        },
        STATS: {
            points: !1,
            lines: !1,
            fill: !1
        },
        CUBE: {
            points: !1,
            lines: !1,
            fill: !0
        },
        SPHERE: {
            points: !1,
            lines: !1,
            fill: !0
        }
    },
    i.getReconciledExpressionProps = function(e, T) {
        if (void 0 === e)
            return {
                points: !1,
                lines: !1,
                fill: !1
            };
        var l = i.EXPRESSION_PROP_DEFAULTS[e];
        switch (e) {
        case s.SINGLE_POINT:
            return {
                points: !0,
                lines: !1,
                fill: !1
            };
        case s.POINT_LIST:
        case s.DOTPLOT:
            return {
                points: void 0 === T.points ? l.points : T.points,
                lines: void 0 === T.lines ? l.lines : T.lines,
                fill: !1
            };
        case s.PARAMETRIC:
        case s.POLYGON:
        case s.X_OR_Y:
        case s.POLAR:
        case s.IMPLICIT:
        case s.HISTOGRAM:
        case s.BOXPLOT:
        case s.TTEST:
        case s.STATS:
        case s.CUBE:
        case s.SPHERE:
            return {
                points: !1,
                lines: void 0 === T.lines ? l.lines : T.lines,
                fill: void 0 === T.fill ? l.fill : T.fill
            };
        default:
            return e
        }
    }
    ,
    i.isClickableExpressionType = function(i) {
        if (void 0 === i)
            return !1;
        switch (i) {
        case s.SINGLE_POINT:
        case s.POINT_LIST:
        case s.PARAMETRIC:
        case s.POLYGON:
        case s.X_OR_Y:
        case s.POLAR:
        case s.IMPLICIT:
            return !0;
        case s.HISTOGRAM:
        case s.BOXPLOT:
        case s.DOTPLOT:
        case s.TTEST:
        case s.STATS:
        case s.CUBE:
        case s.SPHERE:
            return !1;
        default:
            return i
        }
    }
});
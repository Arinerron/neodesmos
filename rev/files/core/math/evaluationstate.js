define('core/math/evaluationstate', ["require", "exports", "core/vendor/d3-color", "parsenodes", "tslib", "core/math/errormsg", "core/types/graphmode", "core/lib/label", "core/math/distribution-spec", "./types", "./ir/features/action-to-latex"], function(require, e, r, i, a, t, n, s, o, l, u) {
    "use strict";
    function d(e) {
        return e.isError ? e.getError() : void 0 === e.asValue() ? "" : +e.asValue()
    }
    function c() {
        return {
            operator: "=",
            variables: []
        }
    }
    function p(e, r, i) {
        var a = e.variables;
        if (a && a.length) {
            for (var t = {}, n = 0, s = a; n < s.length; n++) {
                t[o = s[n]] = !0
            }
            for (var o in i)
                t[o] = !0;
            i = t
        }
        e.variables = r.sliderVariables(Object.keys(i))
    }
    function g(e, r) {
        if (r.blocksExport)
            return !1;
        var i = r.getDependencies();
        if (0 === i.length)
            return !1;
        for (var a = 0, t = i; a < t.length; a++) {
            var n = t[a];
            if (!e.validActionVariable(n))
                return !1
        }
        return !0
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.isErrorExportableActionDefinition = e.addSliderPrompts = e.EvaluationState = e.defaultEvaluationState = void 0,
    e.defaultEvaluationState = c,
    e.EvaluationState = function(e, c, v) {
        if (c.isTable)
            return function(e, r, i) {
                for (var a = [], t = 0; t < r.columns.length; t++) {
                    var n = i.columns[t]
                      , s = n.isError ? [] : n.values.map(d)
                      , o = {
                        dependent: !n.isIndependent,
                        discrete: !!n.isIndependent,
                        values: s
                    };
                    n.isError && (o.error = n.getError()),
                    a.push(o)
                }
                return {
                    column_data: a
                }
            }(0, c, v);
        if (c.isImage)
            return function(e, r, a) {
                var t = {
                    variables: [],
                    errorMap: {},
                    dimensions: {}
                };
                if (a.center.isError && (t.errorMap.center = !0),
                a.radianAngle.isError && (t.errorMap.angle = !0),
                a.width.isError && (t.errorMap.width = !0),
                a.height.isError && (t.errorMap.height = !0),
                a.opacity.isError && (t.errorMap.opacity = !0),
                a.center.isError || a.radianAngle.isError || a.width.isError || a.height.isError || a.opacity.isError)
                    return t.variables = r.getSliderVariables(e, a),
                    t;
                t.dimensions.x = [],
                t.dimensions.y = [],
                t.dimensions.radianAngle = [],
                t.dimensions.width = [],
                t.dimensions.height = [],
                t.dimensions.opacity = [];
                var s = [a.center, a.radianAngle, a.width, a.height, a.opacity];
                return s.some(function(e) {
                    return e && e.valueType && l.isList(e.valueType)
                }) && (t.is_concrete_list = !0),
                i.List.eachArgs(s, function(e) {
                    var r = e[0].asValue()
                      , i = +e[1].asValue()
                      , a = Math.atan2(Math.sin(i), Math.cos(i));
                    t.dimensions.x.push(+r[0]),
                    t.dimensions.y.push(+r[1]),
                    t.dimensions.radianAngle.push(a),
                    t.dimensions.width.push(+e[2].asValue()),
                    t.dimensions.height.push(+e[3].asValue()),
                    t.dimensions.opacity.push(Math.max(0, Math.min(1, +e[4].asValue())))
                }),
                (e.graphingEnabled() ? r.getGraphMode(e, a) : n.NONE) !== n.NONE && (t.is_graphable = !0),
                a.moveStrategy && (t.move_strategy = a.moveStrategy),
                r.center && ("Identifier" === r.center.type ? (t.center_reference_id = r.center.referencedStatementId,
                t.center_reference_symbol = r.center._symbol) : "ParenSeq" === r.center.type && a.center.valueType === l.Point && (t.center_is_point_literal = !0)),
                t
            }(e, c, v);
        if (c instanceof i.Ticker)
            return function(e, r, i) {
                for (var n, s = i.handler, o = i.minStep, l = {}, u = {}, d = 0, c = s.getDependencies(); d < c.length; d++) {
                    var v = c[d];
                    e.validActionVariable(v) || (l[v] = !0)
                }
                for (var f = 0, m = o.getDependencies(); f < m.length; f++)
                    u[v = m[f]] = !0;
                if (o.isError)
                    n = {
                        status: "error",
                        error: o.getError()
                    };
                else {
                    var h = o.asValue();
                    n = "number" == typeof h && !isNaN(h) && h >= 0 ? {
                        status: "valid",
                        value: h
                    } : {
                        status: "error",
                        error: t.tickerMinStepNonNegativeNumber().getError()
                    }
                }
                var b = Object.keys(l);
                b.length > 0 && (s = t.tooManyVariables(b).setDependencies(s.getDependencies()));
                var _ = {
                    handler: s.isError && !g(e, s) ? {
                        status: "error",
                        error: s.getError()
                    } : s.isEmptyAction ? {
                        status: "empty"
                    } : {
                        status: "maybe-valid"
                    },
                    minStep: n,
                    variables: []
                };
                return p(_, e, a.__assign(a.__assign({}, l), u)),
                _
            }(e, 0, v);
        var f = {
            operator: "=",
            variables: []
        };
        if (v.isError && (!(c instanceof i.FunctionDefinition) || v.blocksExport))
            return f.error = v.getError(),
            f.variables = c.getSliderVariables(e, v),
            f.is_single_identifier = c instanceof i.Identifier,
            v.actionValue && (f.action_value = u.actionToLatex(v.actionValue)),
            f;
        if (v.valueType === l.RGBColor && 0 === v.getDependencies().length) {
            var m = v.asValue();
            f.rgb_value = r.rgb(m[0], m[1], m[2]).formatHex()
        }
        v.valueType === l.Action && 0 === v.getDependencies().length && (f.action_value = u.actionToLatex(v.asValue())),
        v.moveStrategy && (f.move_strategy = v.moveStrategy,
        f.default_drag_mode = v.defaultDragMode),
        c.isInequality() && (f.is_inequality = !0),
        f.operator = c.getOperator(),
        v instanceof i.SolvedEquation ? !0 !== v._expression.asValue() && !1 !== v._expression.asValue() && (f.assignment = v._symbol) : c instanceof i.Assignment && (f.assignment = c._symbol);
        var h = e.graphingEnabled() ? c.getGraphMode(e, v) : n.NONE;
        if (h !== n.NONE) {
            f.is_graphable = !0,
            f.expression_type = c.getExpressionType(h, v.valueType),
            v.isShadeBetween() && (f.is_shade_between = !0);
            var b = c.tableInfo(e, v);
            b && (f.is_tableable = !0,
            f.table_info = b)
        }
        if (void 0 !== v.valueType && l.isList(v.valueType) && (f.is_concrete_list = !0,
        v.valueType === l.ListOfColor && 0 === v.getDependencies().length)) {
            var _ = v.asValue();
            _ && (f.rgb_value = _.map(function(e) {
                return r.rgb(e[0], e[1], e[2]).formatHex()
            }))
        }
        f.variables = f.is_graphable ? [] : c.getSliderVariables(e, v),
        f.is_single_identifier = c instanceof i.Identifier,
        v.isConstant && (f.constant_value = v.asValue());
        var y = v.getEvaluationInfo();
        if (!y || "=" !== f.operator || c.isConstant || c.isFunction || v.valueType === l.Bool || v.valueType === l.ListOfBool || c instanceof i.Equation || c instanceof i.And || (f.is_evaluable = !0,
        f.zero_values = y),
        v instanceof i.OptimizedRegression) {
            var E = v
              , V = {};
            for (var S in E.parameters)
                E.parameters.hasOwnProperty(S) && (V[s.identifierToLatex(S)] = +E.parameters[S].asValue());
            f.is_regression = !0,
            f.regression = {
                parameters: V,
                residualVariable: s.identifierToLatex(E.residualVariable),
                residualSuggestionId: E.residualSuggestionId,
                shouldSuggestLogMode: E.shouldSuggestLogMode,
                isLinear: E.isLinear,
                statistics: E.statistics,
                parameterWarning: E.parameterWarning
            }
        }
        var x = o.getFunctionSpecFromTree(c);
        return x && x.discrete && (f.is_discrete_distribution = !0),
        f
    }
    ,
    e.addSliderPrompts = p,
    e.isErrorExportableActionDefinition = g
});
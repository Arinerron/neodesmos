
define('core/math/features/analyze', ['require', 'underscore', 'parsenodes', 'core/math/statementanalysis', 'core/math/builtin', 'core/math/builtinframe', 'core/math/errormsg', 'core/math/comparators', 'core/math/types', 'core/types/graphmode', 'core/math/expression-types', 'core/math/distribution-spec', 'core/math/workerconfig', 'core/math/ir/features/solve', 'core/math/ir/features/optimize-regression', 'core/math/ir/dependencies'], function(require) {
    "use strict";
    var e = require("underscore")
      , t = require("parsenodes")
      , i = require("core/math/statementanalysis")
      , r = require("core/math/builtin")
      , n = require("core/math/builtinframe")
      , a = require("core/math/errormsg")
      , s = require("core/math/comparators")
      , o = require("core/math/types")
      , l = require("core/types/graphmode")
      , c = require("core/math/expression-types").ExpressionType
      , u = require("core/math/distribution-spec").DistributionParameterDefaultsMap
      , h = require("core/math/workerconfig")
      , p = require("core/math/ir/features/solve").trySolve
      , d = require("core/math/ir/features/optimize-regression").tryOptimize
      , y = require("core/math/ir/dependencies").getFreeDependencies;
    function v(e, t, r, n) {
        if (n.isError)
            return i(e, r, n);
        var s = n.getDependencies();
        switch (n.valueType) {
        case o.Distribution:
        case o.ListOfDistribution:
        case o.EmptyList:
            return i(e, r, n);
        case o.RGBColor:
        case o.ListOfColor:
        case o.Action:
        case o.Polygon:
        case o.ListOfPolygon:
            return s.length ? i(e, r, a.tooManyVariables(r.getSliderVariables(e, n)).setDependencies(s)) : i(e, r, n);
        case o.Point:
        case o.ListOfPoint:
            if (s.length) {
                if (!e.validParametricVariables(s)) {
                    var l = r.getSliderVariables(e, n);
                    return i(e, r, a.tooManyVariables(l).setDependencies(l))
                }
                return i(e, r, n)
            }
            return i(e, r, n);
        case o.Number:
        case o.ListOfNumber:
            return 0 === s.length ? i(e, r, n) : s.length <= e.dimensions() - 1 ? e.validExpressionVariables(s) ? i(e, r, n) : i(e, r, a.equationRequired(e.implicitDependency(s)).setDependencies(s)) : e.validImplicitVariables(s) ? i(e, r, a.equationRequired().setDependencies(s)) : i(e, r, a.tooManyVariables(r.getSliderVariables(e, n)).setDependencies(s));
        default:
            return i(e, r, a.parseError())
        }
    }
    function f(e) {
        return t.FunctionCall("pdf", [e, t.Identifier("x")])
    }
    function g(e, t) {
        var r = this.tryGetConcreteTree(e, t)
          , n = r.getDependencies();
        return n.length ? i(e, this, a.tooManyVariables(this.getSliderVariables(e, r)).setDependencies(n)) : i(e, this, this.tryGetConcreteTree(e, t))
    }
    function b(e) {
        return function(t, r) {
            var n = this.tryGetConcreteTree(t, r)
              , s = n.getDependencies();
            if (s.length)
                return i(t, this, a.tooManyVariables(this.getSliderVariables(t, n)).setDependencies(s));
            var o = i(t, this, this.tryGetConcreteTree(t, r));
            if (!n.isError) {
                o.evaluationState.expression_type = c.TTEST;
                var l = n.args.map(function(e) {
                    return e.asValue()
                });
                o.evaluationState.ttest_results = e.apply(null, l)
            }
            return o
        }
    }
    function m(e, t) {
        return e.filter(function(e) {
            return !t[e]
        })
    }
    t.Base.prototype.analyze = function(e, t) {
        return i(e, this, this.tryGetConcreteTree(e, t))
    }
    ,
    t.FunctionCall.prototype.analyze = function(e, t) {
        return v(e, 0, this, u[this._symbol] && 0 === y(t, this).length ? f(this).tryGetConcreteTree(e, t) : this.tryGetConcreteTree(e, t))
    }
    ,
    t.Expression.prototype.analyze = function(e, t) {
        return v(e, 0, this, this.tryGetConcreteTree(e, t))
    }
    ,
    t.FunctionDefinition.prototype.analyze = function(e, t) {
        if (n[this._symbol])
            return this.asEquation().analyze(e, t);
        var r = this._symbol.split("_")[0];
        if (n[r] && n[r].isFunction)
            return i(e, this, a.cannotRedefine(this._symbol, r));
        var s = this.tryGetConcreteTree(e, t);
        if (s.isError)
            return i(e, this, s);
        var o = this._argSymbols
          , l = s.getDependencies();
        if (-1 !== l.indexOf(this._symbol))
            return i(e, this, a.selfReferentialFunction(this._symbol));
        var c = l.filter(function(e) {
            return -1 === o.indexOf(e)
        });
        if (e.unplottablePolarFunction(this._symbol, l))
            return i(e, this, a.unplottablePolarFunction());
        if (c.some(e.assignmentForbidden))
            return i(e, this, a.addArgumentsToDefinition(c, this._symbol, o).setDependencies(l));
        if (c.length) {
            var u = this.getSliderVariables(e, s);
            return i(e, this, a.tooManyVariables(u).setDependencies(u))
        }
        return i(e, this, s)
    }
    ,
    t.Assignment.prototype.analyze = function(e, r, s) {
        var l, c = this._symbol;
        if (!e.validLHS(c))
            return i(e, this, a.invalidLHS(c));
        if (n[c])
            return this.asEquation().analyze(e, r);
        if (this._expression instanceof t.FunctionCall && u[this._expression._symbol] && 0 === y(r, this).length)
            l = f(this._expression).tryGetConcreteTree(e, r);
        else {
            var h = Object.create(r);
            h[c] = e.validSolvedVariable(c) ? void 0 : a.invalidImplicitVariables(),
            l = this.tryGetConcreteTree(e, h)
        }
        if (l.isError)
            return i(e, this, l);
        var p = l.getDependencies();
        if (this.isEquation(l))
            return this.asEquation().analyze(e, r);
        var d = l.valueType === o.RGBColor || l.valueType === o.ListOfColor;
        if (p.length > 1 || d && p.length) {
            var v = this.getSliderVariables(e, l);
            return d || v.length ? i(e, this, a.tooManyVariables(v).allowExport().setDependencies(v)) : i(e, this, l)
        }
        var g = this.getMoveStrategy(e, r, l, s, this.userData);
        if (g) {
            var b = this.getDefaultDragMode(g);
            return i(e, this, t.MovablePoint([l.elementAt(0), l.elementAt(1)], g, b))
        }
        return i(e, this, l)
    }
    ,
    t.Regression.prototype.analyze = function(e, t, r, n, a) {
        return i(e, this, d({
            policy: e,
            frame: t,
            exportFrame: r,
            lastExportFrame: n,
            priorAnalysis: a
        }, this))
    }
    ,
    t.Histogram.prototype.analyze = g,
    t.Object3D.prototype.analyze = g,
    t.DotPlot.prototype.analyze = g,
    t.BoxPlot.prototype.analyze = g,
    t.TTest.prototype.analyze = b(r.ttest),
    t.IndependentTTest.prototype.analyze = b(r.ittest),
    t.Stats.prototype.analyze = function(e, t) {
        var n = this.tryGetConcreteTree(e, t)
          , s = n.getDependencies();
        if (s.length)
            return i(e, this, a.tooManyVariables(this.getSliderVariables(e, n)).setDependencies(s));
        var o = i(e, this, this.tryGetConcreteTree(e, t));
        if (!n.isError) {
            o.evaluationState.expression_type = c.STATS;
            var l = n.args.map(function(e) {
                return e.asValue()
            });
            o.evaluationState.stats_results = r.stats.apply(null, l)
        }
        return o
    }
    ,
    t.Equation.prototype.analyze = t.BaseComparator.prototype.analyze = function(e, r) {
        var n = "=" !== this.getOperator();
        if (!h.plotInequalities && n)
            return i(e, this, a.inequalitiesDisabled());
        var s = p({
            policy: e,
            frame: r
        }, this.asComparator());
        if (s.isError)
            return i(e, this, s);
        if (s instanceof t.SolvedEquation && s.getDependencies().length) {
            var o = s.getDependencies().concat(s._symbol);
            if (!e.validImplicitVariables(o))
                return i(e, this, a.invalidImplicitVariables().setDependencies(o))
        }
        return this.getGraphMode(e, s) !== l.IMPLICIT || e.validImplicitVariables(s.getDependencies()) ? i(e, this, s) : i(e, this, a.invalidImplicitVariables().setDependencies(s.getDependencies()))
    }
    ,
    t.DoubleInequality.prototype.analyze = function(e, t) {
        if (!h.plotInequalities)
            return i(e, this, a.inequalitiesDisabled());
        var r = this.tryGetConcreteTree(e, t);
        if (r.isError)
            return i(e, this, r);
        var n = r.getDependencies();
        return s.table[this._operators[0]].direction !== s.table[this._operators[1]].direction ? i(e, this, a.mismatchedDoubleInequality()) : e.validDoubleInequalitySymbol(r._symbol) && e.validDoubleInequalityVariables(n) ? n.length > 2 ? i(e, this, a.tooManyVariables(this.getSliderVariables(e, r)).setDependencies(n)) : -1 !== r._expressions[0].getDependencies().indexOf(r._symbol) || -1 !== r._expressions[1].getDependencies().indexOf(r._symbol) ? i(e, this, a.complicatedDoubleInequality().setDependencies(n)) : i(e, this, r) : i(e, this, a.invalidDoubleInequalityVariables().setDependencies(n))
    }
    ,
    t.And.prototype.analyze = function(e, t) {
        var r = this.tryGetConcreteTree(e, t);
        if (r.isError)
            return i(e, this, r);
        var n = r.getDependencies();
        return n.length ? e.validDoubleInequalityVariables(n) ? i(e, this, a.complicatedDoubleInequality().setDependencies(n)) : i(e, this, a.tooManyVariables(this.getSliderVariables(e, r)).setDependencies(n)) : i(e, this, r)
    }
    ,
    t.ParenSeq.prototype.analyze = function(e, r, n) {
        var a = this.tryGetConcreteTree(e, r);
        if (a.isError)
            return i(e, this, a);
        var s = this.getMoveStrategy(e, r, a, n, this.userData);
        if (s) {
            var o = this.getDefaultDragMode(s)
              , l = a.asCompilerValue()
              , c = [t.Constant(l[0]), t.Constant(l[1])];
            return i(e, this, t.MovablePoint(c, s, o))
        }
        return v(e, 0, this, a)
    }
    ,
    t.Table.prototype.analyze = function(e, r) {
        for (var n = Object.create(r), s = Object.create(n), o = [], l = function(e) {
            for (var i = {}, r = 0; r < e.length; r++) {
                var n = e[r];
                if (n.header instanceof t.Identifier) {
                    var a = n.header._symbol;
                    void 0 === i[a] && (i[a] = 0),
                    i[a] += 1
                }
            }
            return i
        }(this.columns), c = 0; c < this.columns.length; c++) {
            var u = this.columns[c];
            if (u.header instanceof t.Identifier) {
                var h = u.header._symbol
                  , p = n[h]
                  , d = l[h] > 1;
                p && p.isError && p.isMultiplyDefinedByTables && !d && (n[h] = void 0)
            }
            var y = u.analyze(e, n, s);
            if (0 === c)
                if (y.concreteTree.isIndependent) {
                    var v = y.concreteTree.getDependencies()[0];
                    e.validFirstColumnVariable(v) ? s[v] = void 0 : y = i(e, u, a.invalidFirstTableColumn())
                } else
                    y = i(e, u, a.invalidDependentFirstTableColumn());
            if (y.concreteTree.isIndependent)
                y.rawTree.exportToLocal(y.concreteTree, n);
            else if (!y.concreteTree.isError) {
                var f = m(y.concreteTree.header.getDependencies(), n);
                f.length && (y = i(e, u, a.tooManyVariables(f).setDependencies(f)))
            }
            o.push(y.concreteTree)
        }
        var g = t.Table(o)
          , b = i(e, this, g);
        return b.evaluationState.is_graphable = !0,
        b
    }
    ,
    t.TableColumn.prototype.analyze = function(e, t, r) {
        var n = this.header.tableError();
        if (n)
            return i(e, this, a.invalidTableHeader(n));
        var s = this.tryGetConcreteTree(e, t, r);
        if (s.isError)
            return i(e, this, s);
        if (s.header.isError)
            return i(e, this, s.header);
        if (s.values.isError)
            return i(e, this, s.values);
        for (var o = 0; o < s.values.length; o++)
            if (!s.values[o].isError) {
                var l = this.values[o] && this.values[o].tableError();
                if (l)
                    s.values[o] = a.invalidTableEntry(l);
                else {
                    var c = s.values[o].getDependencies();
                    c.length && (s.values[o] = a.tooManyVariables(c).setDependencies(c))
                }
            }
        return i(e, this, s)
    }
    ,
    t.Image.prototype.analyze = function(e, r, n) {
        var s = this.tryGetConcreteTree(e, r);
        if (s.radianAngle.isError || s.center.isError || s.width.isError || s.height.isError || s.opacity.isError)
            return i(e, this, s);
        var o = s.center.getDependencies()
          , l = s.radianAngle.getDependencies()
          , c = s.width.getDependencies()
          , u = s.height.getDependencies()
          , h = s.opacity.getDependencies();
        return o.length || l.length || c.length || u.length || h.length ? i(e, this, t.Image({
            center: o.length ? a.tooManyVariables(l).setDependencies(o) : s.center,
            radianAngle: l.length ? a.tooManyVariables(l).setDependencies(l) : s.radianAngle,
            width: c.length ? a.tooManyVariables(c).setDependencies(c) : s.width,
            height: u.length ? a.tooManyVariables(u).setDependencies(u) : s.height,
            opacity: h.length ? a.tooManyVariables(h).setDependencies(h) : s.opacity
        })) : (s.moveStrategy = this.getMoveStrategy(e, r, s, n, this.userData),
        i(e, this, s))
    }
    ,
    t.Slider.prototype.analyze = function(t, r) {
        var n, s = this.tryGetConcreteTree(t, r), o = s.sliderInfo;
        if (o.missingVars.length) {
            var l = e.unique(o.missingVars);
            n = i(t, this, a.tooManyVariables(t.sliderVariables(l)).setDependencies(l).allowExport())
        } else
            n = i(t, this, s);
        var c = n.evaluationState;
        if (h.sliders) {
            c.assignment = o.exportedSymbol,
            c.slider_min_number = o.values.min,
            c.slider_max_number = o.values.max,
            c.slider_step_number = o.values.step,
            c.slider_min_valid = o.valids.min,
            c.slider_max_valid = o.valids.max,
            c.slider_step_valid = o.valids.step;
            var u = c.slider_min_valid && c.slider_max_valid && c.slider_step_valid;
            c.is_slider = !0,
            c.raw_slider_latex = this.getInputString(),
            c.is_slidable = u,
            c.is_animatable = c.is_slidable && !c.is_graphable,
            o.errMsg && (c.error = o.errMsg.getError())
        }
        return delete c.is_evaluable,
        delete c.zero_values,
        n
    }
});
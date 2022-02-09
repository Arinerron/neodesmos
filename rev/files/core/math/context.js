
define('core/math/context', ["require", "exports", "parser", "parsenodes", "./finddependencyorder", "./workerconfig", "./findIntersections", "core/vendor/d3-color", "./policyFourFunction", "./policyScientific", "./policyGraphing", "./frameFourFunction", "./frameScientific", "./frameSingleExpressionScientific", "./frameGraphing", "tslib", "core/math/errormsg", "core/math/finddependencyorder", "underscore", "./plotter", "core/types/graphmode", "./interpolatedlabel", "./expression-types", "./getCLSymbolMap", "./distribution-spec", "./maybe-rational", "core/lib/label", "./functions", "core/types/line-width", "core/types/point-opacity", "core/types/point-size", "./evaluationstate", "core/math/types", "./cache-stats", "./parsenode-from-value", "./ir/features/action-to-latex"], function(require, e, t, i, a, s, r, n, o, l, p, c, d, u, h, f, m, v, y, g, _, x, b, D, S, P, O, E, T, F, R, w, M, I, A, C) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.Context = void 0;
    var N = "undefined" != typeof performance ? function() {
        return performance.now()
    }
    : function() {
        return Date.now()
    }
      , k = i.Constant
      , L = i.Seed
      , G = i.FunctionCall
      , V = i.Image
      , z = i.Slider
      , W = i.Table
      , j = i.TableColumn
      , B = r.findIntersections
      , q = {
        fourFunction: o.PolicyFourFunction,
        scientific: l.PolicyScientific,
        singleExpressionScientific: l.PolicySingleExpressionScientific,
        singleExpressionFourFunction: o.PolicySingleExpressionFourFunction,
        graphing: p.PolicyGraphing,
        graphing_3d: p.PolicyGraphing3D
    }
      , H = {
        fourFunction: c,
        singleExpressionFourFunction: c,
        scientific: d,
        singleExpressionScientific: u,
        graphing: h,
        graphing_3d: h
    };
    function U(e, a) {
        var s = t.parse(e, a);
        return s.isError || s instanceof i.Expression ? s : m.parseError()
    }
    function X(e) {
        var t = e.rawTree.userData
          , i = e.rawTree.metaData;
        return !!(t.cdf && t.cdf.show && i.distributionSpec)
    }
    function Y(e) {
        var t = e.evaluationState.expression_type
          , i = e.rawTree.userData;
        return !(!i.clickableInfo || !i.clickableInfo.enabled) && (!!e.rawTree.isImage || e.getGraphMode() !== _.XYPOINT_MOVABLE && b.isClickableExpressionType(t))
    }
    function J(e, t) {
        for (var i = "id" + e, a = 0, s = t || []; a < s.length; a++) {
            var r = s[a];
            i += "::" + r[0] + r[1]
        }
        return i
    }
    var K = k(P.maybeRational(0, 1))
      , Q = k(P.maybeRational(1, 1))
      , Z = k(NaN);
    function $(e, t) {
        return e ? "0" === e ? K : "1" === e ? Q : U(e, t) : Z
    }
    function ee(e, t) {
        if (e)
            return U(e, t)
    }
    function te(e) {
        return "ans" !== e.slice(0, 3)
    }
    function ie(e, t) {
        var i = e.multiplyDefined
          , a = e.multiplyDefinedByTables
          , s = e.cyclicallyDefined;
        for (var r in i)
            i.hasOwnProperty(r) && (t[r] = a[r] ? m.multiplyDefinedByTables(r) : m.multiplyDefined(r));
        for (var r in s)
            s.hasOwnProperty(r) && (t[r] = m.cycle(s[r].filter(te)))
    }
    function ae(e, t, i) {
        for (var a = 0, s = i; a < s.length; a++) {
            var r = s[a];
            e[r] || (e[r] = []),
            e[r].push(t)
        }
    }
    function se(e, t, i) {
        if (i.extraDepNodes)
            for (var a = 0, s = i.extraDepNodes; a < s.length; a++) {
                var r = s[a];
                r && ae(e, t, r.getDependencies())
            }
        i.clickHandler && ae(e, t, i.clickHandler.getDependencies())
    }
    function re(e, t, i) {
        var a = e.evaluationState
          , s = e.rawTree
          , r = s.metaData.cdfMin
          , n = s.metaData.cdfMax
          , o = {}
          , l = NaN
          , p = NaN
          , c = "Assignment" === s.type ? s._expression : s
          , d = c && c.metaData && c.metaData.distributionSpec;
        if (r) {
            var u = r.tryGetConcreteTree(t, i);
            u.isConstant && (l = +u.asValue());
            for (var h = 0, f = u.getDependencies(); h < f.length; h++) {
                o[f[h]] = !0
            }
        } else
            l = -1 / 0;
        if (n) {
            var v = n.tryGetConcreteTree(t, i);
            v.isConstant && (p = +v.asValue());
            for (var y = 0, g = v.getDependencies(); y < g.length; y++) {
                o[g[y]] = !0
            }
        } else
            p = 1 / 0;
        var _ = !0
          , x = !0;
        if (isNaN(l) && (_ = !1,
        l = NaN),
        isNaN(p) && (x = !1,
        p = NaN),
        _ ? x ? l > p && (_ = !1,
        x = !1,
        a.error = m.cdfMaxLessThanMin().getError()) : a.error = m.cdfMaxInvalid().getError() : a.error = m.cdfMinInvalid().getError(),
        _ && x) {
            var b = G("cdf", [c, k(l), k(p)]);
            a.cdf_evaluation = +b.tryGetConcreteTree(t, i).asValue()
        }
        var D = -1 / 0
          , S = 1 / 0;
        if (d && (d.discrete && (D = 0),
        "binomialdist" === d.symbol && c.args && c.args[0])) {
            var P = +c.args[0].asValue();
            isFinite(P) && (S = P)
        }
        s.metaData.evaluatedCDFMin = l,
        s.metaData.evaluatedCDFMax = p,
        a.cdf_min_valid = _,
        a.cdf_max_valid = x,
        a.cdf_min_default = D,
        a.cdf_max_default = S,
        a.is_single_identifier = !1,
        w.addSliderPrompts(a, t, o)
    }
    var ne = {
        lineWidth: {
            parseNode: "lineWidth",
            valueOutputProp: "computedLineWidth",
            formulaOutputProp: "",
            validOutputProp: "line_width_valid",
            default: function() {
                return T.DEFAULT
            },
            transform: void 0,
            shouldEvaluate: void 0,
            seed: "lw"
        },
        lineOpacity: {
            parseNode: "lineOpacity",
            valueOutputProp: "computedLineOpacity",
            formulaOutputProp: "",
            validOutputProp: "line_opacity_valid",
            default: void 0,
            transform: void 0,
            shouldEvaluate: void 0,
            seed: "lo"
        },
        pointOpacity: {
            parseNode: "pointOpacity",
            valueOutputProp: "computedPointOpacity",
            formulaOutputProp: "",
            validOutputProp: "point_opacity_valid",
            default: function(e, t, i) {
                return e && t && e.getGraphMode(i, t) === _.XYPOINT_MOVABLE ? 1 : F.DEFAULT
            },
            transform: void 0,
            shouldEvaluate: void 0,
            seed: "po"
        },
        pointSize: {
            parseNode: "pointSize",
            valueOutputProp: "computedPointSize",
            formulaOutputProp: "",
            validOutputProp: "point_size_valid",
            default: function() {
                return R.DEFAULT
            },
            shouldEvaluate: void 0,
            transform: void 0,
            seed: "ps"
        },
        fillOpacity: {
            parseNode: "fillOpacity",
            valueOutputProp: "computedFillOpacity",
            formulaOutputProp: "",
            validOutputProp: "fill_opacity_valid",
            default: void 0,
            transform: void 0,
            shouldEvaluate: function(e) {
                if (!e)
                    return !1;
                var t = e.evaluationState
                  , i = t.expression_type
                  , a = t.is_inequality;
                return !(i !== b.ExpressionType.POLYGON && i !== b.ExpressionType.PARAMETRIC && !a)
            },
            seed: "fo"
        },
        labelSize: {
            parseNode: "labelSize",
            valueOutputProp: "computedLabelSize",
            formulaOutputProp: "",
            validOutputProp: "label_size_valid",
            transform: void 0,
            default: function() {
                return 1
            },
            shouldEvaluate: void 0,
            seed: "ls"
        },
        labelAngle: {
            parseNode: "labelAngle",
            valueOutputProp: "computedLabelAngle",
            formulaOutputProp: "label_angle_value",
            validOutputProp: "label_angle_valid",
            default: function() {
                return 0
            },
            transform: function(e) {
                return "-\\trigAngleMultiplier*(" + e + ")"
            },
            shouldEvaluate: void 0,
            seed: "la"
        }
    };
    function oe(e, t, i, a, s, r) {
        var n, o = ne[r];
        e && (n = e.tryGetConcreteTree(a, s));
        var l = o.default && o.default(e, n, a)
          , p = function(e, t, i, a) {
            var s, r = {}, n = !0, o = NaN, l = !1;
            if (i) {
                var p = i.tryGetConcreteTree(e, t);
                s = 0 === p.getDependencies().length ? p.asValue() : NaN,
                o = (l = Array.isArray(s)) ? s : +s;
                for (var c = 0, d = p.getDependencies(); c < d.length; c++)
                    r[d[c]] = !0
            }
            if (l)
                for (var u = 0, h = o; u < h.length; u++) {
                    var f = h[u];
                    if (!isFinite(+f)) {
                        n = !1,
                        o = NaN;
                        break
                    }
                }
            else
                isFinite(+o) || (n = !1,
                o = NaN);
            return i || (n = !0,
            void 0 !== a && (o = a)),
            {
                value: o,
                valid: n,
                missingVarsMap: r
            }
        }(a, s, i[o.parseNode], l);
        i[o.valueOutputProp] = p.value,
        o.formulaOutputProp && (t[o.formulaOutputProp] = p.value),
        t[o.validOutputProp] = p.valid,
        w.addSliderPrompts(t, a, p.missingVarsMap)
    }
    function le(e, t, i, a) {
        var s, r;
        if (e.rawTree.isTable && e.evaluationState.column_data && e.rawTree.columns)
            for (var n = 0; n < e.evaluationState.column_data.length; n++)
                s = e.evaluationState.column_data[n],
                oe((r = e.rawTree.columns[n].header.metaData)[a], s, r, t, i, a);
        else
            s = e.evaluationState,
            oe((r = e.rawTree.metaData)[a], s, r, t, i, a)
    }
    function pe(e) {
        return n.rgb(e[0], e[1], e[2]).formatHex()
    }
    function ce(e, t, i, a, s) {
        var r;
        if (e) {
            var n = e.tryGetConcreteTree(a, s)
              , o = n.getDependencies().length > 0 ? void 0 : n.asValue()
              , l = n.valueType;
            if (r = !(!o || l !== M.RGBColor && l !== M.ListOfColor)) {
                var p = n && n.valueType === M.RGBColor ? pe(o) : o.map(pe);
                t.colorLatexValue = p,
                i.color_latex_value = p
            }
        } else
            r = !0;
        i.color_latex_valid = r
    }
    function de(e, t, i) {
        var a, s;
        if (e.rawTree.isTable && e.evaluationState.column_data && e.rawTree.columns)
            for (var r = 0; r < e.evaluationState.column_data.length; r++)
                a = e.evaluationState.column_data[r],
                ce((s = e.rawTree.columns[r].header.metaData).colorLatex, s, a, t, i);
        else
            a = e.evaluationState,
            ce((s = e.rawTree.metaData).colorLatex, s, a, t, i)
    }
    function ue(e, t, i) {
        var a = e.evaluationState
          , s = e.rawTree
          , r = s.userData
          , n = {}
          , o = s.metaData.clickHandler;
        if (o) {
            var l = o.tryGetConcreteTree(t, i);
            l.isError || l.valueType === M.Action || (l = m.eventHandlerTypeError(M.prettyPrint(l.valueType)));
            for (var p = 0, c = l.getDependencies(); p < c.length; p++) {
                var d = c[p];
                t.validActionVariable(d) || (n[d] = !0)
            }
            var u = Object.keys(n);
            if (u.length > 0 && (l = m.tooManyVariables(u).setDependencies(l.getDependencies())),
            l.isError && !w.isErrorExportableActionDefinition(t, l) ? a.click_handler = {
                status: "error",
                error: l.getError()
            } : l.isEmptyAction ? a.click_handler = {
                status: "empty"
            } : a.click_handler = {
                status: "maybe-valid"
            },
            w.addSliderPrompts(a, t, n),
            r.clickableInfo.description && "" !== r.clickableInfo.description) {
                a.computed_description = [];
                var h = 1;
                e.concreteTree.isList ? h = e.concreteTree.length : a.dimensions && a.dimensions.x && Array.isArray(a.dimensions.x) && (h = a.dimensions.x.length);
                for (var f = 0; f < h; f++)
                    a.computed_description.push(x.interpolate(x.parse(r.clickableInfo.description), i, f))
            }
        }
    }
    function he(e, t, i) {
        var a = e.evaluationState
          , s = e.rawTree
          , r = a.expression_type === b.ExpressionType.POLAR ? s.metaData.polarDomainMin : s.metaData.parametricDomainMin
          , n = a.expression_type === b.ExpressionType.POLAR ? s.metaData.polarDomainMax : s.metaData.parametricDomainMax
          , o = {}
          , l = NaN
          , p = NaN
          , c = !1;
        if (r) {
            c = !0;
            var d = r.tryGetConcreteTree(t, i);
            d.isConstant && (l = +d.asValue());
            for (var u = 0, h = d.getDependencies(); u < h.length; u++) {
                o[h[u]] = !0
            }
        } else
            l = 0;
        if (n) {
            c = !0;
            var f = n.tryGetConcreteTree(t, i);
            f.isConstant && (p = +f.asValue());
            for (var v = 0, y = f.getDependencies(); v < y.length; v++) {
                o[y[v]] = !0
            }
        } else
            a.expression_type === b.ExpressionType.PARAMETRIC ? p = 1 : a.expression_type === b.ExpressionType.POLAR && (p = 12 * Math.PI / +i.trigAngleMultiplier.asValue());
        var g = !0
          , _ = !0;
        isFinite(l) || (g = !1,
        l = NaN),
        isFinite(p) || (_ = !1,
        p = NaN),
        g ? _ ? l > p && (g = !1,
        _ = !1,
        a.error = m.domainMaxLessThanMin().getError()) : a.error = m.domainMaxInvalid().getError() : a.error = m.domainMinInvalid().getError(),
        s.metaData.evaluatedDomainMin = l,
        s.metaData.evaluatedDomainMax = p,
        a.expression_type === b.ExpressionType.POLAR && (s.metaData.isExplicitDomain = c),
        a.domain_min_number = l,
        a.domain_max_number = p,
        a.domain_min_valid = g,
        a.domain_max_valid = _,
        a.expression_type === b.ExpressionType.PARAMETRIC && (delete o.t,
        w.addSliderPrompts(a, t, o))
    }
    function fe(e, t, i) {
        var a = e.evaluationState
          , s = e.rawTree
          , r = s.metaData.vizAxisOffset
          , n = s.metaData.vizBreadth
          , o = {}
          , l = NaN
          , p = NaN;
        if (r) {
            var c = r.tryGetConcreteTree(t, i);
            c.isConstant && (l = +c.asValue());
            for (var d = 0, u = c.getDependencies(); d < u.length; d++) {
                o[u[d]] = !0
            }
        } else
            l = 1;
        if (n) {
            var h = n.tryGetConcreteTree(t, i);
            h.isConstant && (p = +h.asValue());
            for (var f = 0, v = h.getDependencies(); f < v.length; f++) {
                o[v[f]] = !0
            }
        } else
            p = 1;
        var y = !0
          , g = !0;
        isFinite(l) || (y = !1,
        l = NaN),
        isFinite(p) || (g = !1,
        p = NaN),
        y ? g || (a.error = m.boxplotBreadthInvalid().getError()) : a.error = m.boxplotOffsetInvalid().getError(),
        s.metaData.evaluatedAxisOffset = l,
        s.metaData.evaluatedBreadth = p,
        a.viz_values = {
            axisOffset: l,
            breadth: p
        },
        a.viz_valids = {
            axisOffset: y,
            breadth: g
        },
        w.addSliderPrompts(a, t, o)
    }
    function me(e, t, a) {
        if (!e.isError && !e.getDependencies().length && e.valueType === M.Action) {
            var s = e.asValue();
            if (s)
                for (var r in s.updateRules) {
                    t[r] = C.actionLatexForSymbol(s, r);
                    var n = s.updateRules[r]
                      , o = n.value
                      , l = n.valueType;
                    a[r] = i.Assignment(r, A.parseNodeFromValue(l, o))
                }
        }
    }
    var ve = function() {
        function e() {
            this.getCLSymbolMap = D.getCLSymbolMap,
            this.statements = {},
            this.analysis = {},
            this.currentStatus = {},
            this.currentLabel = {},
            this.unpublishedIds = {},
            this.intersectId = void 0,
            this.dirtyExportedSymbolRoots = {},
            this.dirtyStatementRoots = {},
            this.markedRegressionDirty = !1,
            this.use_degrees = !1,
            this.initialEvaluation = !1,
            this.globalEventCount = 0,
            this.actions = !0,
            this.setEvaluationMode("graphing"),
            this.setRestrictedFunctions(!1),
            this.setForceEnableGeometryFunctions(!1),
            this.setFunctionDefinition(!0),
            this.setReplaceRoundWithReciprocal(!1),
            this.setDistributions(!0),
            this.invalidate()
        }
        return e.prototype.invalidate = function() {
            for (var e in this.statements)
                this.statements.hasOwnProperty(e) && this.markAsDirtyRoot(e);
            this.currentStatus = {},
            this.analysis = {},
            this.parent_frame = H[this.evaluationMode].getFrame({
                restrictedFunctions: this.restrictedFunctions,
                forceEnableGeometryFunctions: this.forceEnableGeometryFunctions,
                replaceRoundWithReciprocal: this.replaceRoundWithReciprocal,
                distributions: this.distributions,
                additionalFunctions: this.additionalFunctions,
                trigAngleMultiplier: k(this.use_degrees ? Math.PI / 180 : P.maybeRational(1, 1)),
                initialEvaluation: k(this.initialEvaluation ? 1 : 0),
                globalEventCount: k(0),
                globalRandomSeed: L(this.globalRandomSeedString || "")
            }),
            this.frame = Object.create(this.parent_frame),
            this.lastFrame = Object.create(this.parent_frame),
            this.regressionFrame = Object.create(this.parent_frame),
            this.lastClockTickTime = void 0
        }
        ,
        e.prototype.processChangeSet = function(e) {
            var t = N()
              , i = {
                cacheWrites: 0,
                cacheReads: 0,
                cacheHits: 0,
                cacheMisses: 0
            };
            I.setCacheStatStore(i);
            var a = {
                intersections: {},
                graphs: {}
            };
            e.isCompleteState && (this.invalidate(),
            this.statements = {},
            this.currentLabel = {});
            var s = !!e.isCompleteState && !e.isUndoRedoState;
            s !== this.initialEvaluation && (this.initialEvaluation = s,
            this.invalidate()),
            e.viewState && this.setViewState(e.viewState),
            e.hasOwnProperty("degreeMode") && this.setDegreeMode(e.degreeMode),
            e.hasOwnProperty("globalRandomSeed") && this.setGlobalRandomSeed(e.globalRandomSeed),
            e.hasOwnProperty("evaluationMode") && this.setEvaluationMode(e.evaluationMode),
            e.hasOwnProperty("additionalFunctions") && this.setAdditionalFunctions(e.additionalFunctions),
            e.hasOwnProperty("restrictedFunctions") && this.setRestrictedFunctions(e.restrictedFunctions),
            e.hasOwnProperty("forceEnableGeometryFunctions") && this.setForceEnableGeometryFunctions(e.forceEnableGeometryFunctions),
            e.hasOwnProperty("distributions") && this.setDistributions(e.distributions),
            e.hasOwnProperty("functionDefinition") && this.setFunctionDefinition(e.functionDefinition),
            e.hasOwnProperty("replaceRoundWithReciprocal") && this.setReplaceRoundWithReciprocal(e.replaceRoundWithReciprocal),
            e.hasOwnProperty("pointsOfInterest") && this.setWorkerConfigProperty("pointsOfInterest", e.pointsOfInterest),
            e.hasOwnProperty("plotSingleVariableImplicitEquations") && this.setWorkerConfigProperty("plotSingleVariableImplicitEquations", e.plotSingleVariableImplicitEquations),
            e.hasOwnProperty("plotImplicits") && this.setWorkerConfigProperty("plotImplicits", e.plotImplicits),
            e.hasOwnProperty("plotInequalities") && this.setWorkerConfigProperty("plotInequalities", e.plotInequalities),
            e.hasOwnProperty("sliders") && this.setWorkerConfigProperty("sliders", e.sliders),
            e.hasOwnProperty("actions") && this.setActions(!!e.actions),
            e.hasOwnProperty("intersectId") && (this.intersectId = e.intersectId);
            var r = N();
            this.processStatements(e, a);
            var n = N();
            i.processStatements = n - r,
            r = n,
            this.updateAnalysis(),
            n = N(),
            i.updateAnalysis = n - r,
            r = n,
            e.hasOwnProperty("intersectId") && this._updateIntersections(e.intersectId, a),
            n = N(),
            i.updateIntersections = n - r,
            r = n;
            var o = this._publishAllStatuses();
            n = N(),
            i.publishAllStatuses = n - r,
            r = n,
            this._computeAllLabels(),
            n = N(),
            i.computeAllLabels = n - r,
            r = n,
            this._graphAllChanged(a),
            n = N(),
            i.graphAllChanges = n - r;
            var l = this.processEvents(e.events);
            return this.unpublishedIds = {},
            i.timeInWorker = n - t,
            {
                syncId: e.syncId,
                isCompleteState: e.isCompleteState,
                intersectionChanges: a.intersections,
                statusChanges: o,
                graphChanges: a.graphs,
                timingData: i,
                eventUpdates: l
            }
        }
        ,
        e.prototype.processStatements = function(e, t) {
            if (e.removes)
                for (var i in e.removes) {
                    var a = void 0;
                    if (!e.isCompleteState && this.statements.hasOwnProperty(i) && (a = this.statements[i].getAllIds()),
                    this.removeStatement(i, t),
                    !e.isCompleteState && a)
                        for (var s = 0, r = a; s < r.length; s++) {
                            var n = r[s];
                            t.graphs[n] = void 0
                        }
                }
            if (e.statements)
                for (var i in e.statements) {
                    var o = e.statements[i];
                    null === o || this.addStatement(o, t)
                }
        }
        ,
        e.prototype.setViewState = function(e) {
            if (!y.isEqual(e, this.viewState))
                for (var t in this.viewState = e,
                this.statements)
                    this.statements.hasOwnProperty(t) && (this.unpublishedIds[t] = !0)
        }
        ,
        e.prototype.getViewState = function() {
            if (this.viewState) {
                var e = Object.create(this.viewState);
                return this.parent_frame && this.parent_frame.trigAngleMultiplier ? e.trigAngleMultiplier = this.parent_frame.trigAngleMultiplier.asValue() : e.trigAngleMultiplier = 1,
                e
            }
        }
        ,
        e.prototype.setDegreeMode = function(e) {
            this.use_degrees = e,
            this.invalidate()
        }
        ,
        e.prototype.setGlobalRandomSeed = function(e) {
            this.globalRandomSeedString = e,
            this.parent_frame.globalRandomSeed = L(e),
            this.dirtyExportedSymbolRoots.globalRandomSeed = !0
        }
        ,
        e.prototype.setEvaluationMode = function(e) {
            this.evaluationMode = e,
            this.policy = q[e],
            this.invalidate()
        }
        ,
        e.prototype.setAdditionalFunctions = function(e) {
            this.additionalFunctions = e,
            this.invalidate()
        }
        ,
        e.prototype.setRestrictedFunctions = function(e) {
            this.restrictedFunctions = e,
            this.invalidate()
        }
        ,
        e.prototype.setForceEnableGeometryFunctions = function(e) {
            this.forceEnableGeometryFunctions = e,
            this.invalidate()
        }
        ,
        e.prototype.setDistributions = function(e) {
            this.distributions = e,
            this.invalidate()
        }
        ,
        e.prototype.setFunctionDefinition = function(e) {
            this.functionDefinition = e,
            this.invalidate()
        }
        ,
        e.prototype.setReplaceRoundWithReciprocal = function(e) {
            this.replaceRoundWithReciprocal = e,
            this.invalidate()
        }
        ,
        e.prototype.setActions = function(e) {
            e !== this.actions && (this.actions = e,
            this.invalidate())
        }
        ,
        e.prototype.setWorkerConfigProperty = function(e, t) {
            t !== s[e] && (s[e] = t,
            this.invalidate())
        }
        ,
        e.prototype._publishAllStatuses = function() {
            var e = {}
              , t = this.currentStatus;
            for (var i in this.currentStatus = {},
            this.unpublishedIds)
                if (this.analysis.hasOwnProperty(i)) {
                    var a = this.analysis[i].evaluationState;
                    y.isEqual(a, t[i]) || (e[i] = a),
                    this.currentStatus[i] = a
                }
            return e
        }
        ,
        e.prototype._computeAllLabels = function() {
            for (var e in this.currentLabel) {
                var t = this.statements[e];
                if (t) {
                    var i = t.tryGetConcreteTree(this.policy, this.frame)
                      , a = 1;
                    i.valueType === M.ListOfPoint && (a = i.length);
                    for (var s = [], r = 0; r < a; r++)
                        s.push(x.interpolate(this.currentLabel[e], this.frame, r));
                    y.isEqual(s, t.computedLabels) || (t.computedLabels = s,
                    this.unpublishedIds[e] = !0)
                }
            }
        }
        ,
        e.prototype._graphAllChanged = function(e) {
            var t = this.getViewState()
              , i = !1;
            if (g.default.validateViewState(t)) {
                for (var a in this.unpublishedIds)
                    if (this.analysis.hasOwnProperty(a)) {
                        var s = this.analysis[a]
                          , r = s.evaluationState.expression_type
                          , n = r === b.ExpressionType.SINGLE_POINT || r === b.ExpressionType.POINT_LIST;
                        if (s.rawTree.isTable)
                            for (var o = s.graph(t), l = 0, p = s.rawTree.getAllIds(); l < p.length; l++) {
                                var c = p[l];
                                o[c] ? this._notifyGraphComputed(c, o[c], e) : this._notifyGraphRemoved(c, e)
                            }
                        else
                            s.evaluationState.is_graphable && (s.rawTree.userData.shouldGraph || s.rawTree.userData.showLabel && n) ? (this._notifyGraphComputed(a, s.graph(t), e),
                            this.intersectId === a && (i = !0)) : this._notifyGraphRemoved(a, e)
                    }
                y.keys(this.unpublishedIds).length && void 0 !== this.intersectId && (this.unpublishedIds.hasOwnProperty(this.intersectId) || (i = !0)),
                i && this._updateIntersections(this.intersectId, e)
            }
        }
        ,
        e.prototype._notifyGraphRemoved = function(e, t) {
            t.graphs[e] = void 0
        }
        ,
        e.prototype._notifyGraphComputed = function(e, t, i) {
            E.dehydrateGraphData(t),
            i.graphs[e] = t
        }
        ,
        e.prototype._updateIntersections = function(e, t) {
            if (this.viewState)
                if (this.analysis[e] && this.analysis[e].shouldIntersect()) {
                    var i = B(this.analysis, this.viewState, e);
                    t.intersections[e] = i
                } else
                    t.intersections[e] = []
        }
        ,
        e.prototype.getDisabledFeatures = function() {
            var e = this.policy.disabledFeatures();
            !1 === this.functionDefinition && (e = e.concat("FunctionDefinition")),
            !1 === this.actions && (e = e.concat("UpdateRule"));
            var t = this.additionalFunctions || [];
            return e = e.filter(function(e) {
                return ("Exponent" !== e || -1 === t.indexOf("exponent")) && ("PercentOf" !== e || -1 === t.indexOf("percent"))
            })
        }
        ,
        e.prototype.areFractionsDisallowed = function() {
            var e = this.evaluationMode;
            return ("fourFunction" === e || "singleExpressionFourFunction" === e) && (!this.additionalFunctions || -1 === this.additionalFunctions.indexOf("fraction"))
        }
        ,
        e.prototype.addStatement = function(e, a) {
            var s = this;
            if (e) {
                var r = e.id;
                this.markExportsDirty(r),
                this.markAsDirtyRoot(r);
                var n = {
                    index: this.policy.ansEnabled() ? e.index : void 0,
                    disabledFeatures: this.getDisabledFeatures(),
                    disallowFrac: this.areFractionsDisallowed(),
                    seedPrefix: J(r)
                }
                  , o = {
                    extraDepNodes: []
                };
                switch (e.type) {
                case "table":
                    var l = [];
                    this.statements.hasOwnProperty(r) && (l = this.statements[r].getAllIds()),
                    e.shouldGraph = !0;
                    for (var p = e.columns, c = [], d = 0, u = 0, h = p; u < h.length; u++) {
                        var m = h[u];
                        d = Math.max(m.values.length, d)
                    }
                    for (var v = 0; v < p.length; v++) {
                        var y, g = void 0, _ = void 0;
                        m = p[v];
                        y = t.parse(m.latex, f.__assign(f.__assign({}, n), {
                            seedPrefix: J(r, [["tr", 0], ["tc", v]])
                        })),
                        g = [];
                        for (var b = -1, D = 0; D < p[v].values.length; D++)
                            m.values[D].replace(/\\space/g, "").match(/\S/) ? (g.push(t.parse(m.values[D], f.__assign(f.__assign({}, n), {
                                seedPrefix: J(r, [["tr", D + 1], ["tc", v]])
                            }))),
                            b = D) : g.push(k(NaN));
                        if (g = g.slice(0, b + 1),
                        (_ = j(y, d, g)).id = m.id,
                        _.header) {
                            if (_.header.userData = m,
                            _.header.metaData = {
                                extraDepNodes: []
                            },
                            m.colorLatex) {
                                var P = U(m.colorLatex, f.__assign(f.__assign({}, n), {
                                    seedPrefix: J(r, [["tr", 0], ["tc", v], ["cl", v]])
                                }));
                                _.header.metaData.colorLatex = P,
                                _.header.metaData.extraDepNodes.push(P)
                            }
                            if (m.pointSize) {
                                var O = U(m.pointSize, f.__assign(f.__assign({}, n), {
                                    seedPrefix: J(r, [["tr", 0], ["tc", v], ["ps", v]])
                                }));
                                _.header.metaData.pointSize = O,
                                _.header.metaData.extraDepNodes.push(O)
                            }
                            if (m.pointOpacity) {
                                var E = U(m.pointOpacity, f.__assign(f.__assign({}, n), {
                                    seedPrefix: J(r, [["tr", 0], ["tc", v], ["po", v]])
                                }));
                                _.header.metaData.pointOpacity = E,
                                _.header.metaData.extraDepNodes.push(E)
                            }
                            if (m.lineWidth) {
                                var T = U(m.lineWidth, f.__assign(f.__assign({}, n), {
                                    seedPrefix: J(r, [["tr", 0], ["tc", v], ["lw", v]])
                                }));
                                _.header.metaData.lineWidth = T,
                                _.header.metaData.extraDepNodes.push(T)
                            }
                            if (m.lineOpacity) {
                                var F = U(m.lineOpacity, f.__assign(f.__assign({}, n), {
                                    seedPrefix: J(r, [["tr", 0], ["tc", v], ["lo", v]])
                                }));
                                _.header.metaData.lineOpacity = F,
                                _.header.metaData.extraDepNodes.push(F)
                            }
                        }
                        c.push(_)
                    }
                    this.statements[r] = W(c);
                    var R = this.statements[r].getAllIds();
                    l.forEach(function(e) {
                        -1 === R.indexOf(e) && s._notifyGraphRemoved(e, a)
                    });
                    break;
                case "image":
                    var w = "-\\trigAngleMultiplier*(" + e.angle + ")"
                      , M = U(e.center, f.__assign(f.__assign({}, n), {
                        seedPrefix: J(r, [["ic", r]])
                    }))
                      , I = U(w, f.__assign(f.__assign({}, n), {
                        seedPrefix: J(r, [["ia", r]])
                    }))
                      , A = U(e.width, f.__assign(f.__assign({}, n), {
                        seedPrefix: J(r, [["iw", r]])
                    }))
                      , C = U(e.height, f.__assign(f.__assign({}, n), {
                        seedPrefix: J(r, [["ih", r]])
                    }))
                      , N = U(e.opacity, f.__assign(f.__assign({}, n), {
                        seedPrefix: J(r, [["io", r]])
                    }));
                    this.statements[r] = V({
                        center: M,
                        radianAngle: I,
                        width: A,
                        height: C,
                        opacity: N
                    });
                    break;
                case "ticker":
                    this.statements[r] = i.Ticker({
                        handler: U(e.handlerLatex, f.__assign(f.__assign({}, n), {
                            allowDt: !0
                        })),
                        minStep: U(e.minStepLatex || "0", n)
                    });
                    break;
                default:
                    for (var L in e = e,
                    this.statements[r] = t.parse(e.latex, n),
                    ne) {
                        var G = L;
                        if (e[G]) {
                            var B = ne[G]
                              , q = e[G];
                            B.transform && (q = B.transform(q));
                            var H = $(q, f.__assign(f.__assign({}, n), {
                                seedPrefix: J(r, [[B.seed, r]])
                            }));
                            o[G] = H,
                            o.extraDepNodes.push(H)
                        }
                    }
                    if (e.colorLatex) {
                        H = ee(e.colorLatex, f.__assign(f.__assign({}, n), {
                            seedPrefix: J(r, [["ac", r]])
                        }));
                        o.colorLatex = H,
                        o.extraDepNodes.push(H)
                    }
                    if (e.polarDomain && e.polarDomain.min && (o.polarDomainMin = $(e.polarDomain.min, f.__assign(f.__assign({}, n), {
                        seedPrefix: J(r, [["lm", r]])
                    })),
                    o.extraDepNodes.push(o.polarDomainMin)),
                    e.polarDomain && e.polarDomain.max && (o.polarDomainMax = $(e.polarDomain.max, f.__assign(f.__assign({}, n), {
                        seedPrefix: J(r, [["lM", r]])
                    })),
                    o.extraDepNodes.push(o.polarDomainMax)),
                    e.parametricDomain && e.parametricDomain.min && (o.parametricDomainMin = $(e.parametricDomain.min, f.__assign(f.__assign({}, n), {
                        seedPrefix: J(r, [["lm", r]])
                    })),
                    o.extraDepNodes.push(o.parametricDomainMin)),
                    e.parametricDomain && e.parametricDomain.max && (o.parametricDomainMax = $(e.parametricDomain.max, f.__assign(f.__assign({}, n), {
                        seedPrefix: J(r, [["lM", r]])
                    })),
                    o.extraDepNodes.push(o.parametricDomainMax)),
                    e.vizProps && (e.vizProps.axisOffset && (o.vizAxisOffset = $(e.vizProps.axisOffset, f.__assign(f.__assign({}, n), {
                        seedPrefix: J(r, [["vo", r]])
                    })),
                    o.extraDepNodes.push(o.vizAxisOffset)),
                    e.vizProps.breadth && (o.vizBreadth = $(e.vizProps.breadth, f.__assign(f.__assign({}, n), {
                        seedPrefix: J(r, [["vb", r]])
                    })),
                    o.extraDepNodes.push(o.vizBreadth))),
                    e.cdf && e.cdf.show) {
                        var X = S.parseToplevelFunction(e.latex);
                        X && "distribution" === X.type && (o.distributionSpec = X,
                        o.cdfMin = ee(e.cdf.min, f.__assign(f.__assign({}, n), {
                            seedPrefix: J(r, [["lm", r]])
                        })),
                        o.extraDepNodes.push(o.cdfMin),
                        o.cdfMax = ee(e.cdf.max, f.__assign(f.__assign({}, n), {
                            seedPrefix: J(r, [["lM", r]])
                        })),
                        o.extraDepNodes.push(o.cdfMax))
                    }
                    if (this.statements[r].shouldPromoteToSlider(this.policy)) {
                        var Y = e.slider
                          , K = !(!Y || !Y.isPlayingOnce)
                          , Q = ee(Y && Y.softMin, n)
                          , Z = ee(Y && Y.softMax, n)
                          , te = ee(Y && Y.min, f.__assign(f.__assign({}, n), {
                            seedPrefix: J(r, [["lm", r]])
                        }))
                          , ie = ee(Y && Y.max, f.__assign(f.__assign({}, n), {
                            seedPrefix: J(r, [["lM", r]])
                        }))
                          , ae = ee(Y && Y.step, f.__assign(f.__assign({}, n), {
                            seedPrefix: J(r, [["ls", r]])
                        }));
                        this.statements[r] = z(this.statements[r], {
                            sliderMin: te,
                            sliderMax: ie,
                            sliderStep: ae,
                            sliderIsPlayingOnce: K,
                            sliderSoftMin: Q,
                            sliderSoftMax: Z
                        })
                    }
                }
                var se = e.clickableInfo;
                se && se.enabled && se.latex && (o.clickHandler = U(se.latex, f.__assign(f.__assign({}, n), {
                    allowIndex: !0
                }))),
                this.statements[r].userData = e,
                this.statements[r].metaData = o;
                var re = e.label;
                if (re) {
                    var oe = this.currentLabel[r];
                    oe && oe.raw === re || (this.currentLabel[r] = x.parse(re))
                } else
                    delete this.currentLabel[r]
            }
        }
        ,
        e.prototype.removeStatement = function(e, t) {
            var i = this.statements[e];
            if (i) {
                if (this.markExportsDirty(e),
                i.isTable) {
                    var a = this;
                    i.getAllIds().forEach(function(e) {
                        a._notifyGraphRemoved(e, t)
                    })
                } else
                    this._notifyGraphRemoved(e, t);
                delete this.currentLabel[e],
                delete this.statements[e],
                delete this.analysis[e],
                delete this.currentStatus[e]
            }
        }
        ,
        e.prototype.markExportsDirty = function(e) {
            if (this.statements[e]) {
                this.statements[e].isRegression && (this.markedRegressionDirty = !0);
                for (var t = 0, i = this.statements[e].getLegalExports(this.policy); t < i.length; t++) {
                    var a = i[t];
                    this.dirtyExportedSymbolRoots[a] = !0
                }
            }
        }
        ,
        e.prototype.markAsDirtyRoot = function(e) {
            this.dirtyStatementRoots[e] = !0
        }
        ,
        e.prototype.getFrame = function() {
            return this.updateAnalysis(),
            this.frame
        }
        ,
        e.prototype.getAnalysis = function() {
            return this.updateAnalysis(),
            this.analysis
        }
        ,
        e.prototype.getEvaluationState = function(e) {
            if (this.updateAnalysis(),
            this.analysis[e])
                return this.analysis[e].evaluationState
        }
        ,
        e.prototype._updateRegressions = function(e) {
            var t = this.frame
              , i = this.lastFrame
              , a = this.regressionFrame
              , s = [];
            for (var r in e)
                e.hasOwnProperty(r) && e[r].isRegression && s.push(r);
            var n = this;
            s.sort(function(e, t) {
                var i = n.statements[e].userData && n.statements[e].userData.residualVariable
                  , a = n.statements[t].userData && n.statements[t].userData.residualVariable;
                return i && !a ? -1 : a && !i ? 1 : 0
            });
            var o = v.findDependencyOrder(this.policy, e, s);
            ie(o, a);
            for (var l = {}, p = 0, c = o.resolved; p < c.length; p++) {
                r = c[p];
                if (this.statements[r].isRegression)
                    this.analysis[r] = e[r].analyze(this.policy, a, t, i, l),
                    this.analysis[r].exportTo(this.policy, t),
                    delete e[r];
                else {
                    var d = e[r].tryGetConcreteTree(this.policy, a);
                    e[r].exportTo(this.policy, d, a),
                    l[r] = {
                        rawTree: e[r],
                        concreteTree: d
                    }
                }
            }
        }
        ,
        e.prototype.buildSymbolToExpressionDirtyMap = function() {
            var e = {};
            for (var t in this.statements)
                if (this.statements.hasOwnProperty(t)) {
                    var i = this.statements[t]
                      , a = i.metaData;
                    if (ae(e, t, i.getDependencies()),
                    ae(e, t, i.getLegalExports(this.policy)),
                    i.isRegression && i.userData && i.userData.residualVariable && ae(e, t, [O.latexToIdentifier(i.userData.residualVariable)]),
                    se(e, t, a),
                    i.isTable && i.columns)
                        for (var s = 0; s < i.columns.length; s++) {
                            var r = i.columns[s];
                            r.header && r.header.metaData && se(e, t, r.header.metaData)
                        }
                }
            return e
        }
        ,
        e.prototype.getDirtyIdsAndSymbols = function(e) {
            var t = {}
              , i = {}
              , a = this.markedRegressionDirty
              , s = []
              , r = [];
            for (var n in this.dirtyStatementRoots)
                this.dirtyStatementRoots[n] && (i[n] = !0,
                s.push(n));
            for (var o in this.dirtyExportedSymbolRoots)
                this.dirtyExportedSymbolRoots[o] && (t[o] = !0,
                r.push(o));
            for (; s.length || r.length; ) {
                for (; s.length; ) {
                    n = s.pop();
                    var l = this.statements[n];
                    if (l) {
                        l.isRegression && (a = !0);
                        for (var p = 0, c = l.getLegalExports(this.policy); p < c.length; p++) {
                            t[o = c[p]] || (t[o] = !0,
                            r.push(o))
                        }
                    }
                }
                for (; r.length; ) {
                    var d = e[o = r.pop()];
                    if (d)
                        for (var u = 0, h = d; u < h.length; u++) {
                            i[n = h[u]] || (i[n] = !0,
                            s.push(n))
                        }
                }
            }
            return {
                ids: i,
                symbols: t,
                hasDirtyRegression: a
            }
        }
        ,
        e.prototype.updateAnalysis = function() {
            var e = this.buildSymbolToExpressionDirtyMap()
              , t = this.getDirtyIdsAndSymbols(e)
              , i = {};
            if (t.hasDirtyRegression) {
                for (var a in this.statements)
                    this.statements[a] && (i[a] = this.statements[a]);
                this.frame = Object.create(this.parent_frame),
                this.regressionFrame = Object.create(this.parent_frame)
            } else {
                var s = t.ids;
                for (var a in s)
                    this.statements[a] && (i[a] = this.statements[a]);
                var r = t.symbols;
                for (var n in r)
                    r[n] && (delete this.frame[n],
                    delete this.regressionFrame[n])
            }
            for (var a in i)
                i[a] && (this.unpublishedIds[a] = !0);
            this.markedRegressionDirty = !1,
            this.dirtyExportedSymbolRoots = {},
            this.dirtyStatementRoots = {};
            var o = this.analysis
              , l = this.frame;
            "graphing" === this.evaluationMode && this._updateRegressions(i);
            var p = v.findDependencyOrder(this.policy, i);
            ie(p, l);
            for (var c = p.resolved, d = 0, u = c; d < u.length; d++) {
                a = u[d];
                switch (this.evaluationMode) {
                case "fourFunction":
                case "singleExpressionFourFunction":
                    o[a] = this.statements[a].analyzeFourFunction(this.policy, l, o),
                    o[a].exportTo(this.policy, l);
                    break;
                case "scientific":
                    o[a] = this.statements[a].analyzeScientific(this.policy, l, o),
                    o[a].exportTo(this.policy, l);
                    break;
                case "singleExpressionScientific":
                    o[a] = this.statements[a].analyzeSingleExpressionScientific(this.policy, l, o),
                    o[a].exportTo(this.policy, l);
                    break;
                case "graphing":
                case "graphing_3d":
                    if (l.r) {
                        var h = Object.create(l);
                        if (h.r = void 0,
                        o[a] = this.statements[a].analyze(this.policy, h, o),
                        o[a].getGraphMode() === _.POLAR) {
                            o[a].exportTo(this.policy, l);
                            continue
                        }
                    }
                    o[a] = this.statements[a].analyze(this.policy, l, o),
                    o[a].exportTo(this.policy, l)
                }
            }
            if ("graphing" === this.evaluationMode || "graphing_3d" === this.evaluationMode)
                for (var f = 0, m = c; f < m.length; f++) {
                    a = m[f];
                    var y = o[a]
                      , g = y.evaluationState.expression_type;
                    for (var x in ne) {
                        var D = x
                          , S = ne[D];
                        S.shouldEvaluate && !S.shouldEvaluate(y) || le(y, this.policy, l, D)
                    }
                    de(y, this.policy, l),
                    this.actions && Y(y) && ue(y, this.policy, l),
                    g === b.ExpressionType.PARAMETRIC || g === b.ExpressionType.POLAR ? he(y, this.policy, l) : g === b.ExpressionType.BOXPLOT ? fe(y, this.policy, l) : X(y) && re(y, this.policy, l)
                }
            for (var n in function(e) {
                return e.globalRandomSeed || []
            }(e).forEach(function(e) {
                o[e].evaluationState.depends_on_random_seed = !0
            }),
            this.lastFrame = Object.create(this.parent_frame),
            l)
                l.hasOwnProperty(n) && (this.lastFrame[n] = l[n])
        }
        ,
        e.prototype.processEvents = function(e) {
            if (e && this.actions) {
                for (var t, a = Object.create(this.frame), s = {}, r = !1, n = !1, o = 0, l = e; o < l.length; o++) {
                    var p = l[o];
                    switch (this.globalEventCount += 1,
                    a.globalEventCount = i.Constant(this.globalEventCount),
                    p.type) {
                    case "step":
                        if (!(c = this.statements[p.expressionId]))
                            continue;
                        n = !0,
                        me(c.tryGetConcreteTree(this.policy, a), s, a);
                        break;
                    case "click":
                        var c;
                        if (!(c = this.statements[p.expressionId]) || !c.metaData.clickHandler)
                            continue;
                        a.index = i.Constant(p.indexVar + 1),
                        n = !0,
                        r = !0,
                        me(c.metaData.clickHandler.tryGetConcreteTree(this.policy, a), s, a);
                        break;
                    case "clock-tick":
                        (void 0 === t || p.isFirstTick && !t.isFirstTick) && (t = p);
                        break;
                    default:
                        return p
                    }
                }
                if (t)
                    if ((c = this.statements[t.id]) && c instanceof i.Ticker) {
                        var d = c.minStep.tryGetConcreteTree(this.policy, a).asValue();
                        if ("number" == typeof d && d >= 0 && isFinite(d)) {
                            var u = this.lastClockTickTime;
                            if (this.lastClockTickTime = Date.now(),
                            !t.isFirstTick && void 0 !== u)
                                a.dt = i.Constant(this.lastClockTickTime - u),
                                me(c.handler.tryGetConcreteTree(this.policy, a), s, a)
                        }
                    }
                return {
                    objectClicked: r,
                    userAction: n,
                    updates: s
                }
            }
        }
        ,
        e
    }();
    e.Context = ve
});
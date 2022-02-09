define('core/math/features/graph', ["require", "exports", "parsenodes", "core/math/comparators", "core/math/parsenode/irexpression", "tslib", "core/math/errormsg", "core/math/builtin", "core/math/plotter", "core/types/graphmode", "core/lib/dragmode", "core/math/expression-types", "core/math/cdf-branches", "core/math/copy-defined-pois", "core/math/distribution-spec", "core/graphing-calc/json/expression", "core/types/opacity", "core/lib/color-helpers", "core/types/styles", "core/math/types", "../ir/opcodes", "core/math/ir/features/as-value", "./getListIdx", "core/types/point-size"], function(require, e, t, a, i, o, r, s, n, l, p, u, h, c, d, m, g, f, y, v, D, x, L, b) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var O = t.List;
    function I(e, t, a) {
        for (var i = 1 / 0, o = 0, r = t; o < r.length; o++) {
            var s = e[r[o]];
            Array.isArray(s) && s.length < i && (i = s.length)
        }
        var n = 1;
        return "solvedEquation" === a ? n = 2 : "baseComparator" === a && (n = 4),
        n * i
    }
    function M(e, t, a) {
        return Array.isArray(e) ? e[L.getListIdxFromBranchIdx(t, a)] : e
    }
    function P(e, t) {
        for (var a = 1 / 0, i = -1 / 0, o = 1 / 0, r = -1 / 0, s = 0, n = t; s < n.length; s++)
            for (var l = n[s], p = 0; p < l.length; p += 2) {
                var u = l[p]
                  , h = l[p + 1];
                u < a && (a = u),
                u > i && (i = u),
                h < o && (o = h),
                h > r && (r = h)
            }
        if (isFinite(a) && isFinite(o))
            return {
                type: e,
                xmin: a,
                ymin: o,
                xmax: i,
                ymax: r
            }
    }
    function V(e, t) {
        if (void 0 !== e && "binomialdist" === e.symbol && t instanceof i) {
            var a = t._chunk
              , o = a.getInstruction(a.returnIndex);
            if (o.type === D.NativeFunction && "binompdf" === o.symbol)
                return x.asValue(a, o.args[1])
        }
    }
    function A(e, t, a) {
        var i = {};
        a -= .5 * t;
        for (var o = e.length - 1; o >= 0; o--) {
            var r = e[o]
              , s = Math.floor((r - a) / t);
            i[s] ? i[s].data.push(r) : i[s] = {
                id: s,
                data: [r],
                min: s * t + a,
                max: s * t + a + t,
                center: s * t + a + t / 2
            }
        }
        return i
    }
    t.Base.prototype._graph = function(e, a, r, p, g) {
        var y = this;
        if (a instanceof t.SolvedEquation)
            return this._graph(e, a._expression, r, p, 2 === a.branchMultiplier ? "solvedEquation" : void 0);
        function b(e) {
            var t = e.editableLabelMode;
            return t === m.EditableLabelMode.Text || t === m.EditableLabelMode.Math
        }
        var P = a.getExpressionType(p.graphMode, a.valueType)
          , A = u.getReconciledExpressionProps(P, {
            points: this.userData.points,
            lines: this.userData.lines,
            fill: this.userData.fill
        });
        switch (p.graphMode) {
        case l.XYPOINT_MOVABLE:
            var E = n.default.dropUndefinedPoints([a.asValue()])
              , F = E.points
              , S = E.droppedIndices
              , N = this.userData.shouldGraph && A.points
              , C = this.userData.showLabel && !N;
            return N ? [{
                segments: [F],
                graphMode: p.graphMode,
                droppedIndices: S,
                color: f.getDisplayColor(this.userData, this.metaData),
                style: this.userData.pointStyle,
                showLabel: !!this.userData.showLabel,
                labelSize: this.metaData.computedLabelSize,
                labelAngle: this.metaData.computedLabelAngle,
                labelOrientation: this.userData.labelOrientation,
                pointOpacity: this.metaData.computedPointOpacity,
                suppressTextOutline: this.userData.suppressTextOutline,
                editableLabel: b(this.userData),
                labels: this.computedLabels || [],
                poi: c.default(F),
                movablePointInfo: []
            }] : C ? [{
                segments: [F],
                graphMode: l.XYPOINT,
                color: f.getDisplayColor(this.userData, this.metaData),
                style: this.userData.pointStyle,
                showLabel: !!this.userData.showLabel,
                nakedLabel: !0,
                labelSize: this.metaData.computedLabelSize,
                labelAngle: this.metaData.computedLabelAngle,
                labelOrientation: this.userData.labelOrientation,
                pointOpacity: this.metaData.computedPointOpacity,
                suppressTextOutline: this.userData.suppressTextOutline,
                editableLabel: b(this.userData),
                labels: this.computedLabels || [],
                poi: c.default(F),
                showPoint: !1
            }] : [];
        case l.XYPOINT:
            var B = []
              , w = this.userData.shouldGraph && A.points
              , _ = this.userData.shouldGraph && A.lines
              , z = ["colorLatexValue"];
            w && z.push("computedPointOpacity", "computedPointSize"),
            (this.userData.showLabel || w) && z.push("computedLabelSize", "computedLabelAngle");
            var G = I(this.metaData, z, g)
              , W = O.wrap(a).asValue();
            W.length > G && (W.length = G);
            var Y = this.userData.showLabel && !w && !_
              , R = n.default.dropUndefinedPoints(W);
            return (this.userData.showLabel || w) && B.push({
                segments: [R.points],
                graphMode: p.graphMode,
                droppedIndices: R.droppedIndices,
                color: this.metaData.colorLatexValue || this.userData.color,
                style: this.userData.pointStyle,
                showLabel: !!this.userData.showLabel,
                showPoint: w,
                labelSize: this.metaData.computedLabelSize,
                labelAngle: this.metaData.computedLabelAngle,
                labelOrientation: this.userData.labelOrientation,
                pointSize: this.metaData.computedPointSize,
                pointOpacity: this.metaData.computedPointOpacity,
                suppressTextOutline: this.userData.suppressTextOutline,
                interactiveLabel: !!this.userData.interactiveLabel,
                editableLabel: b(this.userData),
                nakedLabel: Y,
                labels: this.computedLabels || [],
                poi: c.default(W)
            }),
            _ && B.push({
                segments: T(W),
                graphMode: l.PARAMETRIC,
                color: f.getDisplayColor(this.userData, this.metaData),
                style: this.userData.lineStyle,
                lineWidth: this.metaData.computedLineWidth,
                lineOpacity: this.metaData.computedLineOpacity,
                poi: {}
            }),
            B;
        case l.PARAMETRIC:
        case l.PARAMETRIC_CURVE_3D:
            var X = this.userData
              , q = this.metaData
              , k = [];
            z = ["colorLatexValue"];
            A.lines && z.push("computedLineOpacity", "computedLineWidth"),
            A.fill && z.push("computedFillOpacity");
            var U = I(this.metaData, z, g);
            B = O.wrap(a).mapElements(function(t, a) {
                if (a >= U)
                    return {
                        segments: [],
                        poi: {},
                        graphMode: l.X,
                        color: ""
                    };
                var i = L.getListIdxFromBranchIdx(a, g)
                  , o = M(y.metaData.computedLineWidth, a, g)
                  , s = M(y.metaData.computedLineOpacity, a, g)
                  , u = y.metaData.colorLatexValue ? M(y.metaData.colorLatexValue, a, g) : y.userData.color;
                if (0 === t.getDependencies().length) {
                    var h = n.default.dropUndefinedPoints([t.asValue()])
                      , d = h.points
                      , m = h.droppedIndices;
                    return {
                        segments: [d],
                        graphMode: l.XYPOINT,
                        droppedIndices: m,
                        color: f.getDisplayColor(X, q),
                        style: X.lineStyle,
                        lineWidth: o,
                        lineOpacity: s,
                        poi: c.default(d)
                    }
                }
                var v = t.getCompiledFunction()
                  , D = y.getGraphInfo(e, t);
                return D.graphMode = p.graphMode,
                D.domain = {
                    min: y.metaData.evaluatedDomainMin,
                    max: y.metaData.evaluatedDomainMax
                },
                D.style = y.userData.lineStyle,
                D.lineWidth = o,
                D.lineOpacity = s,
                D.color = u,
                D.listIndex = i,
                n.default.computeGraphData({
                    viewState: r,
                    graphInfo: D,
                    compiled: v
                })
            });
            if (A.fill) {
                if (B.forEach(function(e, t) {
                    t >= U || k.push({
                        segments: e.segments,
                        color: y.metaData.colorLatexValue ? M(y.metaData.colorLatexValue, t, g) : y.userData.color,
                        fillOpacity: M(y.metaData.computedFillOpacity, t, g),
                        listIndex: L.getListIdxFromBranchIdx(t, g),
                        graphMode: l.POLYGONFILL,
                        poi: {}
                    })
                }),
                !A.lines)
                    return k;
                B = B.concat(k)
            }
            return B;
        case l.X:
        case l.Y:
        case l.IMPLICIT:
        case l.POLAR:
        case l.Z_3D:
            var j = []
              , Z = a.valueType === v.Number
              , J = I(this.metaData, ["computedLineOpacity", "computedLineWidth", "colorLatexValue", "fillOpacity"], g);
            return O.wrap(a).eachElement(function(t, a) {
                if (!(a >= J)) {
                    var u, c = p.graphMode === l.IMPLICIT || p.graphMode === l.Z_3D ? t.getCompiledFunction(["x", "y"]) : t.getCompiledFunction(), m = d.getFunctionSpecFromTree(y), f = m && m.discrete, v = function(e, t) {
                        if (!e)
                            return;
                        if (!(t instanceof i))
                            return;
                        var a = t._chunk
                          , o = a.getInstruction(a.returnIndex);
                        if (o.type !== D.NativeFunction)
                            return;
                        var r = e.discrete ? "discreteDistribution" : "continuousDistribution";
                        if ("binomialdist" === e.symbol && "binompdf" === o.symbol) {
                            var n = x.asValue(a, o.args[1])
                              , l = x.asValue(a, o.args[2]);
                            return {
                                type: r,
                                xmin: 0,
                                xmax: n,
                                ymin: 0,
                                ymax: h = s.binompdf(l * n, n, l)
                            }
                        }
                        if ("poissondist" === e.symbol && "poissonpdf" === o.symbol) {
                            return {
                                type: r,
                                xmin: 0,
                                xmax: 2.5 * (p = x.asValue(a, o.args[1])),
                                ymin: 0,
                                ymax: h = Math.max(s.poissonpdf(Math.floor(p), p), s.poissonpdf(Math.ceil(p), p))
                            }
                        }
                        if ("normaldist" === e.symbol && "normalpdf" === o.symbol) {
                            var p = x.asValue(a, o.args[1])
                              , u = x.asValue(a, o.args[2])
                              , h = s.normalpdf(p, p, u);
                            return {
                                type: r,
                                xmin: p - 2 * Math.abs(u),
                                xmax: p + 2 * Math.abs(u),
                                ymin: 0,
                                ymax: h
                            }
                        }
                        if ("uniformdist" === e.symbol && "uniformpdf" === o.symbol) {
                            var c = x.asValue(a, o.args[1])
                              , d = x.asValue(a, o.args[2])
                              , m = (p = (c + d) / 2,
                            d - c);
                            return {
                                type: r,
                                xmin: c - m / 3,
                                xmax: d + m / 3,
                                ymin: 0,
                                ymax: h = s.uniformpdf(p, c, d)
                            }
                        }
                        if ("tdist" === e.symbol && "tpdf" === o.symbol) {
                            var g = x.asValue(a, o.args[1]);
                            return {
                                type: r,
                                xmin: -3,
                                xmax: 3,
                                ymin: 0,
                                ymax: h = s.tpdf(0, g)
                            }
                        }
                        return
                    }(m, t);
                    try {
                        u = t.getCompiledDerivative()
                    } catch (e) {}
                    var b = y.getGraphInfo(e, t);
                    b.listIndex = L.getListIdxFromBranchIdx(a, g),
                    b.graphMode = p.graphMode,
                    b.style = y.userData.lineStyle,
                    b.lineWidth = M(y.metaData.computedLineWidth, a, g),
                    b.lineOpacity = M(y.metaData.computedLineOpacity, a, g);
                    var O = M(y.metaData.computedFillOpacity, a, g);
                    b.fillOpacity = O,
                    p.graphMode === l.POLAR && (b.domain = {
                        min: y.metaData.evaluatedDomainMin,
                        max: y.metaData.evaluatedDomainMax,
                        isExplicit: y.metaData.isExplicitDomain
                    });
                    var I = y.metaData.colorLatexValue ? M(y.metaData.colorLatexValue, a, g) : y.userData.color;
                    b.color = I;
                    var P = y.metaData.evaluatedCDFMin
                      , A = y.metaData.evaluatedCDFMax;
                    if (isNaN(P) || isNaN(A) || !Z)
                        if (f) {
                            var E = n.default.computeDiscreteGraphData({
                                viewState: r,
                                graphInfo: b,
                                compiled: c,
                                showPoint: y.userData.shouldGraph,
                                maxOverride: V(m, t)
                            });
                            v && (E.boundingBox = v),
                            j.push(E)
                        } else {
                            var F = void 0 === y.userData.lines || y.userData.lines
                              , S = {
                                viewState: r,
                                graphInfo: b,
                                compiled: c,
                                derivative: u
                            };
                            E = n.default.computeGraphData(S);
                            if (v && (E.boundingBox = v),
                            E.fillSegments) {
                                E.fillSegments;
                                var T = o.__rest(E, ["fillSegments"]);
                                F || (T.lineWidth = 0),
                                j.push(T)
                            } else
                                F || (E.lineWidth = 0),
                                j.push(E);
                            b.graphMode === l.IMPLICIT && "=" !== b.operator && j.push({
                                graphMode: l.POLYGONFILL,
                                segments: E.fillSegments,
                                poi: {},
                                listIndex: b.listIndex,
                                color: I,
                                fillOpacity: O
                            })
                        }
                    else if (f) {
                        var N = {
                            viewState: r,
                            graphInfo: b,
                            compiled: c,
                            bounds: [P, A],
                            maxOverride: V(m, t),
                            showPoint: y.userData.shouldGraph
                        }
                          , C = (w = h.makeDiscreteCDFTopBranches(N)).cdfTopBranch;
                        if ((_ = w.topBranches).forEach(function(e) {
                            e && v && (e.boundingBox = v)
                        }),
                        _.every(function(e) {
                            return void 0 !== e
                        }) && (j = _,
                        C && C.segments[0].length)) {
                            var B = [];
                            C.segments[0].forEach(function(e) {
                                isNaN(e[0]) || isNaN(e[1]) || B.push([e[0], 0, e[0], e[1]])
                            }),
                            j.push({
                                graphMode: l.PARAMETRIC,
                                segments: B,
                                boundingBox: v,
                                poi: {},
                                color: I
                            })
                        }
                    } else {
                        var w, _;
                        N = {
                            viewState: r,
                            graphInfo: b,
                            compiled: c,
                            derivative: u,
                            bounds: [P, A]
                        },
                        C = (w = h.makeContinuousCDFTopBranches(N)).cdfTopBranch;
                        if ((_ = w.topBranches).forEach(function(e) {
                            e && v && (e.boundingBox = v)
                        }),
                        j = _,
                        C && C.segments.length) {
                            for (var z = void 0, G = void 0, W = 0; W < C.segments.length; W++) {
                                if ((Y = C.segments[W]).length >= 4) {
                                    z = Y[0];
                                    break
                                }
                            }
                            for (W = C.segments.length - 1; W >= 0; W--) {
                                var Y;
                                if ((Y = C.segments[W]).length >= 4) {
                                    G = Y[Y.length - 2];
                                    break
                                }
                            }
                            if (void 0 !== z && void 0 !== G && isFinite(z) && isFinite(G)) {
                                var R = n.default.polygonsFromSegments(C.segments, [[z, 0, G, 0]], C.graphMode);
                                j.push({
                                    graphMode: l.POLYGONFILL,
                                    segments: R,
                                    poi: {},
                                    color: I
                                })
                            }
                        }
                    }
                }
            }),
            j;
        case l.POLYGON:
            B = [];
            var H = void 0 === this.userData.lines || this.userData.lines
              , K = void 0 === this.userData.fill || this.userData.fill;
            if (!K && !H)
                return B;
            G = I(this.metaData, ["computedLineOpacity", "computedLineWidth", "colorLatexValue", "fillOpacity"], g);
            var Q = a.asValue();
            v.isList(a.valueType) || (Q = [Q]);
            for (var $ = 0; $ < Q.length; $++)
                if (!($ > G - 1)) {
                    var ee = Q[$];
                    if (ee.length) {
                        var te = this.getGraphInfo(e, a)
                          , ae = L.getListIdxFromBranchIdx($, g)
                          , ie = M(this.metaData.computedLineWidth, $, g)
                          , oe = M(this.metaData.computedLineOpacity, $, g)
                          , re = M(this.metaData.computedFillOpacity, $, g)
                          , se = this.metaData.colorLatexValue ? M(this.metaData.colorLatexValue, $, g) : this.userData.color
                          , ne = T(ee = o.__spreadArray(o.__spreadArray([], ee), [ee[0]]));
                        ne.length && (K && B.push({
                            segments: ne,
                            graphMode: l.POLYGONFILL,
                            poi: {},
                            color: se,
                            fillOpacity: re,
                            style: te.style,
                            listIndex: ae
                        }),
                        H && B.push({
                            segments: ne,
                            graphMode: l.PARAMETRIC,
                            poi: {},
                            color: se,
                            style: this.userData.lineStyle,
                            lineWidth: ie,
                            lineOpacity: oe,
                            listIndex: ae
                        }))
                    }
                }
            return B;
        case l.POLYGONFILL:
        case l.VISUALIZATION:
        case l.OBJECT3D:
        case l.NONE:
        case l.ERROR:
            return !1;
        default:
            var le = p.graphMode;
            throw new Error("Unexpected graphMode: " + le)
        }
    }
    ,
    t.Base.prototype.tryGraph = function(e, a, i) {
        try {
            return this.graph(e, a, i)
        } catch (e) {
            var o = e instanceof t.Error ? e.getError() : r.parseError().getError();
            return [n.errorBranch(o)]
        }
    }
    ,
    t.Base.prototype.graph = function(e, t, a) {
        var i = this.getGraphInfo(e, t);
        return this._graph(e, t, a, i)
    }
    ,
    t.BaseComparator.prototype.graph = function(e, i, o) {
        var r = this.getGraphInfo(e, i)
          , s = r.graphMode
          , p = "baseComparator"
          , u = void 0 === this.userData.lines || this.userData.lines;
        if (s === l.IMPLICIT)
            return this._graph(e, i, o, r);
        if (s === l.NONE)
            return !1;
        if (!(i instanceof t.SolvedEquation))
            return !1;
        var h = this.getOperator()
          , c = []
          , d = []
          , m = !0;
        i._expression.eachElement(function(e) {
            c.push(e.getCompiledFunction());
            try {
                d.push(e.getCompiledDerivative())
            } catch (e) {
                m = !1
            }
        }),
        m || (d = void 0);
        for (var g = [], f = [-1, 0, 0, 1], y = I(this.metaData, ["computedLineWidth", "computedLineOpacity", "computedFillOpacity", "colorLatexValue"], p), v = Math.min(c.length, y), D = 0; D < v; D++) {
            var x = this.getGraphInfo(e, i._expression.args[D]);
            x.graphMode = s,
            x.listIndex = L.getListIdxFromBranchIdx(D, p),
            x.style = this.userData.lineStyle,
            x.color = this.metaData.colorLatexValue ? M(this.metaData.colorLatexValue, D, p) : this.userData.color,
            r.graphMode === l.POLAR && (x.domain = {
                min: this.metaData.evaluatedDomainMin,
                max: this.metaData.evaluatedDomainMax,
                isExplicit: this.metaData.isExplicitDomain
            });
            var b = n.default.computeGraphData({
                viewState: o,
                graphInfo: x,
                compiled: c[D],
                derivative: d ? d[D] : void 0
            });
            b.lineWidth = M(this.metaData.computedLineWidth, D, p),
            b.lineOpacity = M(this.metaData.computedLineOpacity, D, p),
            b.fillOpacity = M(this.metaData.computedFillOpacity, D, p),
            b.operator = a.get(a.table[h].inclusive, f[D % 4]),
            u || (b.lineWidth = 0),
            g.push(b)
        }
        for (D = 0; D < v; D += 4) {
            var O = n.default.polygonsFromSegments(g[D + 1].segments, g[D + 2].segments, s);
            g.push({
                graphMode: l.POLYGONFILL,
                listIndex: g[D].listIndex,
                segments: O,
                poi: {},
                fillOpacity: g[D].fillOpacity,
                color: g[D].color
            })
        }
        return g
    }
    ,
    t.DoubleInequality.prototype.graph = function(e, t, i) {
        var o = this
          , r = this.getGraphInfo(e, t);
        if (r.graphMode === l.NONE)
            return !1;
        var s = []
          , p = a.get(a.table[this._operators[0]].inclusive, 0)
          , u = a.get(a.table[this._operators[1]].inclusive, 0)
          , h = this.userData
          , c = this.metaData
          , d = void 0 === h.lines || h.lines
          , m = ["colorLatexValue", "computedFillOpacity"];
        d && m.push("computedLineWidth", "computedLineOpacity");
        var g = I(c, m);
        return O.eachArgs(t._expressions, function(t, a) {
            if (!(a >= g)) {
                t[0].userData = t[1].userData = h,
                t[0].metaData = t[1].metaData = c;
                var m = o.metaData.colorLatexValue ? M(c.colorLatexValue, a) : h.color
                  , f = M(c.computedLineWidth, a)
                  , y = M(c.computedLineOpacity, a)
                  , v = M(c.computedFillOpacity, a)
                  , D = o._graph(e, t[0], i, r)[0];
                D.listIndex = a,
                D.operator = p,
                D.color = m,
                D.lineWidth = f,
                D.lineOpacity = y,
                s.push(D);
                var x = o._graph(e, t[1], i, r)[0];
                x.listIndex = a,
                x.operator = u,
                x.color = m,
                x.lineWidth = f,
                x.lineOpacity = y,
                s.push(x);
                var L = n.default.polygonsFromSegments(D.segments, x.segments, D.graphMode);
                d || (D.lineWidth = 0,
                x.lineWidth = 0),
                s.push({
                    graphMode: l.POLYGONFILL,
                    listIndex: D.listIndex,
                    segments: L,
                    lineOpacity: y,
                    fillOpacity: v,
                    poi: {},
                    color: m
                })
            }
        }),
        s
    }
    ,
    t.Regression.prototype.graph = function(e, t, a) {
        var i = this.getGraphInfo(e, t);
        return this._graph(e, t.model, a, i)
    }
    ;
    var E = function(e) {
        var t = [];
        return O.wrap(e).eachElement(function(e) {
            t.push(e.args.map(function(e) {
                return e.asValue()
            }))
        }),
        t
    };
    function F(e) {
        return Array.prototype.concat.apply([], e)
    }
    function S(e, t, a) {
        return !!e && (0 === t && 0 === a ? "none" !== e[2].type || "none" !== e[3].type : 0 !== t && 0 !== a ? "none" !== e[0].type && "none" !== e[1].type : 0 !== t ? "none" !== e[0].type : 0 !== a && "none" !== e[1].type)
    }
    function T(e) {
        for (var t = [], a = [], i = 0, o = e; i < o.length; i++) {
            var r = o[i]
              , s = r[0]
              , n = r[1];
            isNaN(s) || isNaN(n) ? (t.length >= 4 && a.push(t),
            t = []) : t.push(s, n)
        }
        return t.length >= 4 && a.push(t),
        a
    }
    t.Object3D.prototype.graph = function(e, t, a) {
        var i = this.getGraphInfo(e, t);
        return [{
            segments: [E(t)],
            color: i.color,
            objectName: this._symbol,
            graphMode: l.OBJECT3D
        }]
    }
    ,
    t.Histogram.prototype.graph = function(e, t, a) {
        var i = this.getGraphInfo(e, t)
          , o = t.args[0].asValue()
          , r = t.args[1].asValue()
          , s = A(o, r, this.userData.vizProps && "left" === this.userData.vizProps.binAlignment ? r / 2 : 0)
          , n = 1;
        this.userData.vizProps && "density" === this.userData.vizProps.histogramMode ? n = 1 / (o.length * r) : this.userData.vizProps && "relative" === this.userData.vizProps.histogramMode && (n = 1 / o.length);
        var p = []
          , u = [];
        for (var h in s) {
            var c = s[h]
              , d = c.data.length;
            u.push([c.min, 0 * n, c.min, d * n, c.max, d * n, c.max, 0 * n]);
            var m = 0;
            s[c.id + 1] && (m = s[c.id + 1].data.length);
            var f = [c.min, 0 * n, c.min, d * n, c.max, d * n];
            m < d && f.push(c.max, m * n),
            p.push(f)
        }
        var y = P("histogram", u);
        return y && r && (y.binWidth = r),
        [{
            segments: u,
            graphMode: l.POLYGONFILL,
            boundingBox: y,
            poi: {},
            color: i.color,
            fillOpacity: g.DEFAULT
        }, {
            segments: p,
            graphMode: l.Y,
            poi: {
                zeros: {
                    x: [],
                    y: []
                },
                extrema: {
                    x: [],
                    y: []
                },
                intercept: {
                    x: [],
                    y: []
                }
            },
            color: i.color
        }]
    }
    ,
    t.DotPlot.prototype.graph = function(e, t, a) {
        var i, o = this.getGraphInfo(e, t), r = t.args[1].asValue(), s = this.userData.vizProps && "left" === this.userData.vizProps.binAlignment ? r / 2 : 0, n = A(t.args[0].asValue(), r, s), p = !1, u = [];
        for (var h in n)
            for (var d = (g = n[h]).data.length - 1; d >= 0; d--)
                g.center !== g.data[d] && (p = !0);
        if (this.userData.vizProps && "exact" === this.userData.vizProps.dotplotXMode)
            for (var h in n) {
                (i = (g = n[h]).data).reverse();
                for (var m = 0; m < i.length; m++)
                    u.push([i[m], m + 1])
            }
        else
            for (var h in n) {
                var g;
                i = (g = n[h]).data;
                for (m = 0; m < i.length; m++)
                    u.push([g.center, m + 1])
            }
        var f = P("dotplot", u);
        f && r && (f.ymin = 0,
        f.xmin -= .5 * r,
        f.xmax += .5 * r,
        f.binWidth = r);
        var y = this.metaData
          , v = y.computedPointOpacity
          , D = y.computedPointSize
          , x = M(v, 0)
          , L = this.userData.pointSize ? M(D, 0) : b.DOTPLOT_DEFAULT;
        return [{
            segments: [u],
            graphMode: l.XYPOINT,
            boundingBox: f,
            poi: c.default(u),
            color: o.color,
            style: this.userData.pointStyle,
            pointSize: L,
            pointOpacity: x,
            showPoint: !0,
            needsDotplotXMode: p
        }]
    }
    ,
    t.BoxPlot.prototype.graph = function(e, t, a) {
        var i = this.getGraphInfo(e, t)
          , o = this.metaData.evaluatedAxisOffset
          , r = this.metaData.evaluatedBreadth
          , n = t.args[0].asValue();
        if (isNaN(r) || isNaN(o))
            return !1;
        var p = Math.min.apply(null, n)
          , u = Math.max.apply(null, n)
          , h = s.quartile(n, 1)
          , d = s.quartile(n, 2)
          , m = s.quartile(n, 3)
          , g = o
          , f = g - r / 2
          , v = g + r / 2
          , D = r / 10
          , x = [];
        if (this.userData.vizProps.showBoxplotOutliers) {
            var L = m - h
              , b = h - 1.5 * L
              , O = m + 1.5 * L;
            p = 1 / 0,
            u = -1 / 0,
            n.forEach(function(e) {
                b <= e && e < p && (p = e),
                u < e && e <= O && (u = e),
                (e < b || e > O) && x.push([e, g])
            })
        }
        var I = [[h, f, m, f, m, v, h, v, h, f], [d, f, d, v], [h, g, p, g], [m, g, u, g], [p, g - D, p, g + D], [u, g - D, u, g + D]];
        if (this.userData.vizProps && "y" === this.userData.vizProps.alignedAxis) {
            for (var M = 0, V = I; M < V.length; M++)
                for (var A = V[M], E = 0; E < A.length; E += 2) {
                    var F = A[E];
                    A[E] = A[E + 1],
                    A[E + 1] = F
                }
            for (var S = 0, T = x; S < T.length; S++) {
                var N = T[S];
                F = N[0];
                N[0] = N[1],
                N[1] = F
            }
        }
        var C = [{
            segments: I,
            graphMode: l.PARAMETRIC,
            boundingBox: P("boxplot", I.concat(x)),
            poi: {},
            color: i.color
        }];
        return x.length && C.push({
            segments: [x],
            graphMode: l.XYPOINT,
            color: i.color,
            style: y.PointStyle.OPEN,
            showPoint: !0,
            poi: c.default(x)
        }),
        C
    }
    ,
    t.Table.prototype.isValueDraggable = function(e, t, a) {
        if (!e.columns[t].isIndependent)
            return !1;
        var i = this.columns[t].values
          , o = i && i[a];
        return !(!o || !isFinite(o.asValue()) || 0 !== o.getDependencies().length)
    }
    ,
    t.Table.prototype.graph = function(e, t, a) {
        var i = {};
        if (t.columns[0].isError)
            return i;
        for (var o = t.columns[0], r = o.values, s = 1; s < this.columns.length; s++) {
            var n = t.columns[s];
            if (!n.isError) {
                var u = this.columns[s].header.userData
                  , h = this.columns[s].header.metaData;
                if (!u.hidden) {
                    for (var d = I(h, ["colorLatexValue", "computedPointSize", "computedPointOpacity"]), m = u.dragMode, g = m === p.DragMode.X || m === p.DragMode.XY, y = m === p.DragMode.Y || m === p.DragMode.XY, v = !!u.points, D = !!u.lines, x = n.isDiscrete(o), L = D && x, b = D && !x, O = [], M = [], P = [], V = [], A = [], E = [], S = 1 / 0, T = -1 / 0, N = 1 / 0, C = -1 / 0, B = {}, w = 0; w < r.length; w++) {
                        var _ = r[w]
                          , z = n.values[w];
                        if (_ && z && isFinite(_.asValue()) && isFinite(z.asValue())) {
                            var G = _.asValue()
                              , W = z.asValue();
                            if (v) {
                                if (w >= d)
                                    continue;
                                var Y = g && this.isValueDraggable(t, 0, w)
                                  , R = y && this.isValueDraggable(t, s, w);
                                Y || R ? (P.push([G, W]),
                                V.push({
                                    index: w,
                                    dragX: Y,
                                    dragY: R
                                })) : M.push([G, W])
                            }
                            L && E.push([G, W]),
                            G < S && (S = G),
                            G > T && (T = G),
                            W < N && (N = W),
                            W > C && (C = W)
                        } else
                            B[w] = !0,
                            L && (E.length > 1 && A.push(E),
                            E = [])
                    }
                    var X = {
                        type: "table",
                        xmin: S,
                        xmax: T,
                        ymin: N,
                        ymax: C
                    };
                    if (P.length && O.push({
                        graphMode: l.XYPOINT_MOVABLE,
                        segments: [P],
                        color: h.colorLatexValue || u.color,
                        tableId: u.tableId,
                        poi: c.default(P),
                        movablePointInfo: V,
                        boundingBox: X,
                        pointOpacity: h.computedPointOpacity
                    }),
                    M.length && O.push({
                        segments: [M],
                        droppedIndices: B,
                        graphMode: l.XYPOINT,
                        showPoint: !0,
                        poi: c.default(M),
                        color: h.colorLatexValue || u.color,
                        pointSize: h.computedPointSize,
                        pointOpacity: h.computedPointOpacity,
                        style: u.pointStyle,
                        tableId: u.tableId,
                        boundingBox: X
                    }),
                    (A.length || E.length) && (A.push(E),
                    O.push({
                        segments: A.map(F),
                        graphMode: l.PARAMETRIC,
                        poi: {},
                        color: f.getDisplayColor(u, h),
                        style: u.lineStyle,
                        lineWidth: Array.isArray(h.computedLineWidth) ? h.computedLineWidth[0] : h.computedLineWidth,
                        lineOpacity: Array.isArray(h.computedLineOpacity) ? h.computedLineOpacity[0] : h.computedLineOpacity,
                        tableId: u.tableId,
                        boundingBox: X
                    })),
                    b) {
                        var q = this.columns[s].header.graph(e, t.columns[s].continuousConcreteTree, a);
                        q.length && Array.prototype.push.apply(O, q)
                    }
                    O.length && (i[u.id] = O)
                }
            }
        }
        return i
    }
    ,
    t.Image.prototype.graph = function(e, t, a) {
        var i = [];
        if (!(t.center.valueType === v.Point && 0 === t.center.getDependencies().length && t.radianAngle.isConstant && t.width.isConstant && t.height.isConstant && t.opacity.isConstant))
            return i;
        for (var o = [], r = [], s = t.width.asValue() / 2, n = t.height.asValue() / 2, p = t.radianAngle.asValue(), u = -1; u <= 1; u++)
            for (var h = -1; h <= 1; h++) {
                var d = t.center.asValue()
                  , m = d[0]
                  , g = d[1]
                  , y = [m + u * s * Math.cos(p) + h * n * Math.sin(p), g - u * s * Math.sin(p) + h * n * Math.cos(p)];
                S(t.moveStrategy, u, h) && (o.push(y),
                r.push([u, h]))
            }
        return i.push({
            segments: [o],
            scaleFactors: [r],
            graphMode: l.XYPOINT_MOVABLE,
            color: f.getDisplayColor(this.userData, this.metaData),
            style: this.userData.style,
            poi: c.default(o),
            movablePointInfo: [],
            pointOpacity: 1
        }),
        i
    }
});
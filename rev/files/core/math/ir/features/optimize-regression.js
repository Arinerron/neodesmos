define('core/math/ir/features/optimize-regression', ["require", "exports", "parsenodes", "core/math/builtin", "core/math/parsenode/irexpression", "tslib", "core/math/errormsg", "core/math/distance", "core/lib/label", "core/math/types", "core/math/least-squares", "./reparameterize-regression", "core/math/ir/build-ir", "../../parsenode-from-value"], function(require, e, r, i, n, t, a, s, o, u, l, f, p, d) {
    "use strict";
    function v(e, r, i) {
        for (var n, t, a = e.policy, s = e.frame, o = 0, l = r._rhs.getDependencies(); o < l.length; o++) {
            var f = l[o];
            if (!i.hasOwnProperty(f)) {
                var p = s[f];
                if (p && ("Assignment" === p.type && (p = p._expression),
                p.buildIRExpression)) {
                    var d = p.buildIRExpression(a, s);
                    if (!d.isError && d.valueType === u.ListOfNumber) {
                        if (void 0 !== n) {
                            n = void 0,
                            t = void 0;
                            break
                        }
                        0 === d.getDependencies().length && (n = f,
                        t = d)
                    }
                }
            }
        }
        var v = Object.create(s);
        void 0 !== n && (v[n] = void 0);
        var c = r._rhs.buildIRExpression(a, v)
          , g = Object.create(v);
        for (var m in i)
            g[m] = i[m];
        var h = r._rhs.buildIRExpression(a, g);
        return t ? {
            node: c,
            substituted: h,
            listNode: t,
            isValid: !0
        } : {
            node: c,
            substituted: h,
            listNode: t,
            isValid: !1
        }
    }
    function c(e, r) {
        var i = r.getDependencies()
          , n = r.getCompiledFunction(i).fn;
        if (i.length) {
            for (var a = r.findLinearSubset(i), s = a.every(function(e) {
                return e
            }), o = [], u = 0, f = i; u < f.length; u++) {
                var p = f[u];
                o.push(r.takeDerivative(p).getCompiledFunction(i).fn)
            }
            if (s)
                return t.__assign(t.__assign({}, l.tryRoundingSmallParametersToZero(n, l.optimizeLinear(n, o))), {
                    isLinear: s
                });
            for (var d = [], v = 0, c = i; v < c.length; v++) {
                p = c[v];
                d.push(r.boundDomain(p))
            }
            var g = {
                linearSubset: a,
                bounds: d,
                preferredInitialGuess: e
            };
            return t.__assign(t.__assign({}, l.tryRoundingSmallParametersToZero(n, l.optimizeNonLinear(n, o, g))), {
                isLinear: s
            })
        }
        return {
            solution: [],
            MSE: l.evaluateMeanSquare(n, []),
            isLinear: !0
        }
    }
    function g(e, i) {
        for (var n = {}, t = i.getDependencies(), a = 0; a < t.length; a++)
            n[t[a]] = r.Constant(e[a]);
        return n
    }
    function m(e, n, t, o, f, p) {
        if (o.getDependencies().length)
            throw a.optimizationError();
        var d = function(e) {
            var r = 0;
            return e.eachElement(function(e) {
                var i = +e.asValue();
                r += i * i
            }),
            r / e.length
        }(o);
        if (!isFinite(d))
            throw a.optimizationError();
        if (n.getDependencies().length > 0)
            return {
                RMSE: Math.sqrt(d)
            };
        var v = u.isList(n.valueType) ? i.varp(n.asValue()) : 0;
        if (n.getDependencies().length || !isFinite(v) || v <= 0 || !e.isLhsSimple)
            return {
                RMSE: Math.sqrt(d)
            };
        var c = 1 - d / v;
        if (t.isValid) {
            var g = []
              , m = []
              , h = f && (p === L.LINLOG || p === L.LOGLOG);
            r.List.eachArgs([t.listNode, n], function(e) {
                g.push(h ? Math.log(+e[0].asValue()) : +e[0].asValue()),
                m.push(+e[1].asValue())
            });
            var E = i.corr(g, m);
            if (s.approx(function(e, r) {
                function i(i, n) {
                    for (var t = [], a = 0; a < e.length; a++)
                        t.push(r[a] - (i * e[a] + n));
                    return t
                }
                var n = [function() {
                    return e.map(function(e) {
                        return -e
                    })
                }
                , function() {
                    return e.map(function() {
                        return -1
                    })
                }
                ];
                return l.optimizeLinear(i, n)
            }(g, m).MSE, d, 8))
                return {
                    r: E,
                    rsquared: E * E
                }
        }
        return {
            Rsquared: c
        }
    }
    function h(e, r) {
        var i = e.length
          , n = e[0]
          , t = r[0]
          , a = e[i - 1]
          , o = r[i - 1];
        if (!(isFinite(n) && isFinite(a) && isFinite(t) && isFinite(o)))
            return !1;
        if (o - t == 0)
            return !1;
        var u = a - n;
        if (0 === u)
            return !1;
        for (var l = 1; l < i - 1; l++) {
            var f = e[l]
              , p = r[l]
              , d = (o * (f - n) + t * (a - f)) / u;
            if (!s.approx(p, d, 5))
                return !1
        }
        return !0
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.tryOptimize = void 0,
    e.tryOptimize = function(e, i) {
        try {
            return function(e, i) {
                var n, t = e.policy, s = e.frame, l = e.exportFrame, f = e.lastExportFrame, p = e.priorAnalysis, d = i._lhs.buildIRExpression(t, s), c = i._rhs.buildIRExpression(t, s);
                if (d.isError)
                    throw d;
                if (c.isError)
                    throw c;
                if (d.valueType !== u.Number && d.valueType !== u.ListOfNumber || c.valueType !== u.Number && c.valueType !== u.ListOfNumber)
                    throw a.regressionTypeError([u.prettyPrint(d.valueType), u.prettyPrint(c.valueType)]);
                var g = i._difference.buildIRExpression(t, s, {
                    wrapInList: !0
                });
                if (g.isError)
                    throw g;
                for (var N = 0, b = g.getDependencies(); N < b.length; N++) {
                    var y = b[N];
                    if (!t.validRegressionParameter(y))
                        throw a.invalidRegressionParameter(y)
                }
                var R, _ = function(e, r, i) {
                    var n = [];
                    r || (r = {});
                    i || (i = {});
                    for (var t = 0, a = e; t < a.length; t++) {
                        var s = a[t]
                          , u = o.identifierToLatex(s);
                        i[s] && isFinite(i[s].asValue()) ? n.push(+i[s].asValue()) : r.hasOwnProperty(u) && isFinite(+r[u]) ? n.push(+r[u]) : n.push(1)
                    }
                    return n
                }(g.getDependencies(), i.userData.regressionParameters, f), D = O(_, g), I = D.parameters, x = D.isLinear, M = D.parameterWarning, w = {
                    policy: t,
                    frame: s
                }, V = v(w, i, I), T = E(w, i._difference, I), F = function(e, i, n) {
                    if (!e.isLhsSimple)
                        return L.NONE;
                    if (!n.isValid)
                        return L.NONE;
                    var t = n.substituted;
                    if (t.isError)
                        return L.NONE;
                    if (t.valueType !== u.Number)
                        return L.NONE;
                    var a = t.getDependencies();
                    if (1 !== a.length)
                        return L.NONE;
                    if (isFinite(n.node.polynomialOrder(a[0])))
                        return L.NONE;
                    var s = t.getCompiledFunction(a).fn
                      , o = n.listNode;
                    if (t.valueType !== u.Number)
                        return L.NONE;
                    var l = o.mapElements(function(e) {
                        return +e.asValue()
                    });
                    if (l.length < 3)
                        return L.NONE;
                    l.sort(function(e, r) {
                        return e - r
                    });
                    var f = l.map(s)
                      , p = f.map(Math.log)
                      , d = l.map(Math.log)
                      , v = !0;
                    return r.List.wrap(i).eachElement(function(e) {
                        isFinite(Math.log(+e.asValue())) || (v = !1)
                    }),
                    h(l, p) && v ? L.LOGLIN : h(d, p) && v ? L.LOGLOG : h(d, f) ? L.LINLOG : L.NONE
                }(i, d, V);
                if (!i.userData.isLogModeRegression || F !== L.LOGLIN && F !== L.LOGLOG)
                    R = m(i, d, V, T, i.userData.isLogModeRegression, F);
                else {
                    var S = i._logDifference.buildIRExpression(t, s, {
                        wrapInList: !0
                    });
                    if (S.isError)
                        throw S;
                    var G = i._logLhs.buildIRExpression(t, s, {
                        wrapInList: !0
                    });
                    if (G.isError)
                        throw G;
                    I = (n = O(_, S)).parameters,
                    x = n.isLinear,
                    M = n.parameterWarning,
                    V = v(w, i, I),
                    T = E(w, i._difference, I),
                    R = m(i, G, V, E(w, i._logDifference, I), i.userData.isLogModeRegression, F)
                }
                var P = function(e, r) {
                    if (e.userData && e.userData.residualVariable) {
                        var i = o.latexToIdentifier(e.userData.residualVariable);
                        if (!r[i])
                            return i
                    }
                    for (var n, t = e.getDependencies(), a = 0, s = t; a < s.length; a++) {
                        var u = s[a].match(/_(.*)/);
                        if (u && !r[n = "e_" + u[1]])
                            return n
                    }
                    var l = 1;
                    for (; ; ) {
                        if (!r[n = "e_" + l])
                            return n;
                        l++
                    }
                }(i, l)
                  , z = function(e, r, i) {
                    var n, t = e._rhs.getDependencies();
                    for (var a in i)
                        if (i.hasOwnProperty(a)) {
                            var s = i[a].concreteTree;
                            if (s.isTable && s.columns[0]) {
                                var o = i[a].rawTree.columns;
                                if (o && o.length) {
                                    var u = o[0].getExports();
                                    if (1 === u.length && -1 !== t.indexOf(u[0])) {
                                        for (var l = 1; l < o.length; l++)
                                            if (-1 !== o[l].getDependencies().indexOf(r))
                                                return;
                                        n = n || a
                                    }
                                }
                            }
                        }
                    return n || void 0
                }(i, P, p);
                return i.userData.residualVariable = o.identifierToLatex(P),
                r.OptimizedRegression(I, T, R, V.substituted, {
                    isModelValid: V.isValid,
                    residualVariable: P,
                    residualSuggestionId: z,
                    shouldSuggestLogMode: F !== L.NONE,
                    isLinear: x,
                    parameterWarning: M
                })
            }(e, i)
        } catch (e) {
            return e instanceof r.Error ? e : a.parseError()
        }
    }
    ;
    var L = {
        NONE: 0,
        LOGLIN: 1,
        LOGLOG: 2,
        LINLOG: 3
    };
    function E(e, r, i) {
        var n = e.policy
          , t = e.frame
          , a = Object.create(t);
        for (var s in i)
            i.hasOwnProperty(s) && (a[s] = i[s]);
        var o = p.buildIR({
            policy: n,
            frame: a,
            wrapInList: !0
        }, r);
        return d.parseNodeFromValue(o.getReturnType(), o.asCompilerValue())
    }
    function O(e, r) {
        var i, t, a = r._chunk;
        if (a && (t = f.reparameterizeRegression(a)),
        !t || 0 === t.length)
            return {
                parameters: g((i = c(e, r = r.deriveRegressionRestrictions())).solution, r),
                isLinear: i.isLinear,
                parameterWarning: !1
            };
        for (var s = r.getDependencies(), o = r.getCompiledFunction(s).fn, u = 1 / 0, p = {}, d = !1, v = 0, m = t; v < m.length; v++) {
            var h = m[v]
              , L = new n(h.chunk);
            if (L = L.deriveRegressionRestrictions(),
            (i = c(h.forwardParameterMap(e), L)).MSE < u) {
                var E = h.reverseParameterMap(i.solution)
                  , O = l.evaluateMeanSquare(o, E);
                if (p && (!isFinite(O) || O >= u)) {
                    isFinite(O) || (d = !0);
                    continue
                }
                u = i.MSE,
                p = g(E, r)
            }
        }
        return {
            parameters: p,
            isLinear: !1,
            parameterWarning: d
        }
    }
});
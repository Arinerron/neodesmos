
define('core/math/ir/features/reparameterize-regression', ["require", "exports", "core/math/builtin", "../opcodes", "core/math/types", "../instructions", "./is-constant", "./as-value", "./polynomial-order", "./get-polynomial-coefficients", "./copy-instruction", "core/math/maybe-rational", "./list-length"], function(require, e, r, t, a, n, i, s, o, u, c, l, v) {
    "use strict";
    function p(e) {
        return {
            chunk: e,
            isLazy: !0
        }
    }
    function f(e) {
        return e.slice()
    }
    function h(e) {
        if (!e.isLazy)
            return e;
        var r = e.chunk.copy();
        return r.reopenFinalBlock(),
        {
            chunk: r,
            forwardParameterMap: f,
            reverseParameterMap: f,
            isLazy: !1,
            valueMap: F(e.chunk.instructionsLength()),
            replacementMask: N(e.chunk.argNames.length)
        }
    }
    function d(e) {
        var r = e.chunk
          , t = e.forwardParameterMap
          , a = e.reverseParameterMap
          , n = e.isLazy
          , i = e.valueMap
          , s = e.replacementMask
          , o = e.didShiftScale;
        return {
            chunk: r.copy(),
            forwardParameterMap: t,
            reverseParameterMap: a,
            isLazy: n,
            valueMap: i.slice(),
            replacementMask: s.slice(),
            didShiftScale: o
        }
    }
    function g(e) {
        for (var r = 1 / 0, t = -1 / 0, a = e.length, n = 0, i = e; n < i.length; n++) {
            var s = i[n];
            r = Math.min(r, s),
            t = Math.max(t, s)
        }
        return {
            min: r,
            max: t,
            length: a
        }
    }
    function m(e, r, t, a) {
        if (void 0 !== t) {
            var i = e.getInstruction(a);
            if (n.isLeafInstruction(i))
                for (var s = 0, o = t; s < o.length; s++) {
                    (v = o[s]).valueMap[a] = a
                }
            else
                for (var u = 0, l = t; u < l.length; u++) {
                    for (var v, p = (v = l[u]).chunk, f = v.valueMap, h = [], d = 0, g = 0, m = i.args; g < m.length; g++) {
                        var M = m[g];
                        if (f[M] !== M) {
                            if ((d += 1) > 1)
                                return void (t.length = 0)
                        } else
                            for (var y = r[M], k = 0; k < y.length; k++)
                                if (y[k] && v.replacementMask[k])
                                    return void (t.length = 0);
                        h.push(f[M])
                    }
                    f[a] = d > 0 ? c.copyInstructionWithArgs(p, i, h) : a
                }
        }
    }
    function M(e, r) {
        for (var t, a = e.listAccessDependencyTable, n = e.listAccesses, i = e.listStatisticsTable, s = a[r], o = 0; o < s.length; o++)
            if (s[o]) {
                if (t)
                    return;
                t = {
                    listAccessIndex: n[o],
                    listStatistics: i[o]
                }
            }
        return t
    }
    function y(e, r) {
        for (var t = 0, a = e.listAccessDependencyTable[r]; t < a.length; t++) {
            if (a[t])
                return !0
        }
        return !1
    }
    function k(e, r) {
        for (var a, n = [], i = 0; i <= r; i++) {
            if (e.getInstruction(i).type === t.LoadArg) {
                var s = N(e.argNames.length);
                s[i] = !0,
                n.push(s)
            } else
                n.push(L(e, n, e.argNames.length, i))
        }
        var o = n[r];
        for (i = 0; i < o.length; i++)
            if (o[i]) {
                if (void 0 !== a)
                    return;
                a = i
            }
        return a
    }
    function x(e, a, n, i, s) {
        var o = e.chunk
          , u = k(o, n);
        if (void 0 !== u) {
            var c = w(e, n, u);
            if (void 0 !== c) {
                var l = o.getInstruction(i)
                  , v = l.args[0];
                if (void 0 !== (c = b(c, v, s))) {
                    var p = c.chunk
                      , f = c.valueMap
                      , h = p.getInstruction(f[v]);
                    if (h.type === t.Add) {
                        var d = h.args[1]
                          , g = p.getInstruction(h.args[0]);
                        if (g.type === t.Multiply) {
                            var m = g.args
                              , M = m[0]
                              , y = m[1]
                              , x = u
                              , P = d
                              , C = M
                              , I = y
                              , L = p.Multiply([C, I])
                              , N = p.SyntheticNativeFunction("cos", [L])
                              , F = p.SyntheticNativeFunction("sin", [L])
                              , S = "sin" === l.symbol ? p.Add([p.Multiply([x, F]), p.Multiply([P, N])]) : p.Subtract([p.Multiply([x, N]), p.Multiply([P, F])]);
                            f[a] = S;
                            var A = c.replacementMask.slice();
                            return A[u] = !0,
                            A[M] = !0,
                            A[d] = !0,
                            {
                                chunk: p,
                                forwardParameterMap: function(e) {
                                    var r = c.forwardParameterMap(e)
                                      , t = r[u]
                                      , a = r[d]
                                      , n = t * Math.cos(a)
                                      , i = t * Math.sin(a);
                                    return r[u] = n,
                                    r[d] = i,
                                    r
                                },
                                reverseParameterMap: function(e) {
                                    var t = e.slice()
                                      , a = e[u]
                                      , n = e[d]
                                      , i = r.hypot(a, n)
                                      , s = Math.atan2(n, a);
                                    return t[u] = i,
                                    t[d] = s,
                                    c.reverseParameterMap(t)
                                },
                                valueMap: f,
                                replacementMask: A,
                                isLazy: !1
                            }
                        }
                    }
                }
            }
        }
    }
    function P(e, r, n, i) {
        var s = e.chunk
          , o = s.getInstruction(r).args
          , u = o[0]
          , c = o[1]
          , v = s.getInstruction(u);
        if (v.type === t.Constant && v.valueType === a.Number && l.asFloat(v.value) > 0) {
            var p = h(e)
              , f = p.chunk
              , d = p.valueMap
              , g = f.Multiply([f.SyntheticNativeFunction("ln", [d[u]]), d[c]]);
            return d[c] = g,
            d[r] = f.SyntheticNativeFunction("exp", [g]),
            I(p, r, c, n, i) || p
        }
        var m = k(s, u);
        if (void 0 !== m) {
            var M = w(e, u, m);
            if (void 0 !== M) {
                var y = M.chunk
                  , x = M.valueMap
                  , P = y.Multiply([x[u], x[c]]);
                x[c] = P,
                x[r] = y.SyntheticNativeFunction("exp", [P]);
                var C = M.replacementMask.slice();
                C[m] = !0;
                var b = {
                    chunk: y,
                    forwardParameterMap: function(e) {
                        var r = M.forwardParameterMap(e)
                          , t = r[m]
                          , a = Math.log(t);
                        return r[m] = a,
                        r
                    },
                    reverseParameterMap: function(e) {
                        var r = e.slice()
                          , t = r[m]
                          , a = Math.exp(t);
                        return r[m] = a,
                        M.reverseParameterMap(r)
                    },
                    isLazy: !1,
                    valueMap: x,
                    replacementMask: C
                };
                return I(b, r, c, n, i) || b
            }
        }
    }
    function C(e, r, t, a, n, i) {
        if (e.isLazy || !e.didShiftScale) {
            var s = e.isLazy ? e : d(e)
              , o = k(e.chunk, t);
            if (void 0 !== o) {
                var u = w(e, t, o);
                if (void 0 !== u) {
                    var c = u.chunk
                      , l = u.valueMap
                      , v = c.getInstruction(l[a]).args[0]
                      , p = c.Add([v, l[t]]);
                    l[t] = p,
                    l[r] = c.SyntheticNativeFunction("exp", [p]);
                    var f = u.replacementMask.slice();
                    f[o] = !0;
                    var g = h(s);
                    g.valueMap[r] = g.chunk.Multiply([g.valueMap[t], g.valueMap[a]]);
                    var m = {
                        chunk: c,
                        forwardParameterMap: function(e) {
                            var r = u.forwardParameterMap(e)
                              , t = r[o]
                              , a = Math.log(t);
                            return r[o] = a,
                            r
                        },
                        reverseParameterMap: function(e) {
                            var r = e.slice()
                              , t = r[o]
                              , a = Math.exp(t);
                            return r[o] = a,
                            u.reverseParameterMap(r)
                        },
                        isLazy: !1,
                        valueMap: l,
                        replacementMask: f
                    }
                      , M = d(m);
                    return M.forwardParameterMap = function(e) {
                        var r = u.forwardParameterMap(e)
                          , t = r[o]
                          , a = Math.log(-t);
                        return r[o] = a,
                        r
                    }
                    ,
                    M.reverseParameterMap = function(e) {
                        var r = e.slice()
                          , t = r[o]
                          , a = -Math.exp(t);
                        return r[o] = a,
                        u.reverseParameterMap(r)
                    }
                    ,
                    m = I(m, r, t, n, i) || m,
                    (M = I(M, r, t, n, i) || M).valueMap[r] = M.chunk.Negative([M.valueMap[r]]),
                    [g, m, M]
                }
            }
        }
    }
    function I(e, r, a, n, i) {
        var s = function(e, r, a, n) {
            var i = b(e, r, a);
            if (void 0 === i)
                return;
            var s = i.chunk
              , o = i.valueMap
              , u = s.getInstruction(o[r]);
            if (u.type !== t.Add)
                return;
            var c = u.args[1]
              , l = s.getInstruction(u.args[0]);
            if (l.type !== t.Multiply)
                return;
            var v = l.args
              , p = v[0]
              , f = v[1]
              , h = n.min
              , d = n.max
              , g = d - h
              , m = .5 * (d + h)
              , M = s.Divide([s.Subtract([f, s.Constant(m)]), s.Constant(g)])
              , y = s.Add([s.Multiply([p, M]), c]);
            function k(e) {
                var r = i.forwardParameterMap(e)
                  , t = r[p]
                  , a = r[c]
                  , n = t * g
                  , s = a + m * t;
                return r[p] = n,
                r[c] = s,
                r
            }
            function x(e) {
                var r = e.slice()
                  , t = e[p]
                  , a = e[c]
                  , n = t / g
                  , s = a - n * m;
                return r[p] = n,
                r[c] = s,
                i.reverseParameterMap(r)
            }
            return o[r] = y,
            {
                chunk: s,
                forwardParameterMap: k,
                reverseParameterMap: x,
                isLazy: !1,
                valueMap: o,
                replacementMask: i.replacementMask,
                didShiftScale: !0
            }
        }(e, a, n, i);
        if (void 0 !== s)
            return s.valueMap[r] = s.chunk.SyntheticNativeFunction("exp", [s.valueMap[a]]),
            s
    }
    function w(e, r, n) {
        var i = e.chunk
          , s = o.polynomialOrderContext(i, n, {
            allowRestriction: !1,
            allowClosedBlockReferences: !1
        });
        if (1 === o.instructionOrder(s, r)) {
            var c = u.polynomialCoefficientContext(s)
              , v = u.instructionCoefficients(c, r)
              , p = v[0]
              , f = v[1];
            if (void 0 !== f) {
                var d = c.newChunk.getInstruction(p);
                if (d.type === t.Constant && d.valueType === a.Number) {
                    var g = c.newChunk.getInstruction(f);
                    if (g.type === t.Constant && g.valueType === a.Number) {
                        var m = h(e)
                          , M = m.chunk
                          , y = m.valueMap
                          , k = l.asFloat(d.value)
                          , x = l.asFloat(g.value);
                        y[r] = n;
                        var P = m.replacementMask.slice();
                        return P[n] = !0,
                        {
                            chunk: M,
                            forwardParameterMap: function(e) {
                                var r = m.forwardParameterMap(e)
                                  , t = r[n]
                                  , a = k + x * t;
                                return r[n] = a,
                                r
                            },
                            reverseParameterMap: function(e) {
                                var r = e.slice()
                                  , t = (r[n] - k) / x;
                                return r[n] = t,
                                m.reverseParameterMap(r)
                            },
                            isLazy: !1,
                            valueMap: y,
                            replacementMask: P
                        }
                    }
                }
            }
        }
    }
    function b(e, r, n) {
        var i = e.chunk
          , s = e.isLazy ? r : e.valueMap[r]
          , c = o.polynomialOrderContext(i, n, {
            allowRestriction: !1,
            allowClosedBlockReferences: !0
        });
        if (1 === o.instructionOrder(c, s)) {
            e.isLazy && (c = o.polynomialOrderContext(i.copy().reopenFinalBlock(), n, {
                allowRestriction: !1,
                allowClosedBlockReferences: !1
            }));
            var v = u.polynomialCoefficientContext(c)
              , p = u.instructionCoefficients(v, s)
              , f = p[0]
              , d = p[1];
            if (void 0 !== d) {
                for (var g, m, M = v.newChunk, y = Math.max(d, f), k = [], x = 0; x <= y; x++) {
                    if (M.getInstruction(x).type === t.LoadArg) {
                        var P = N(M.argNames.length);
                        P[x] = !0,
                        k.push(P)
                    } else
                        k.push(L(M, k, M.argNames.length, x))
                }
                for (x = 0; x < i.argNames.length; x++)
                    if (k[d][x]) {
                        if (void 0 !== g)
                            return;
                        g = x
                    } else if (k[f][x]) {
                        if (void 0 !== m)
                            return;
                        m = x
                    }
                if (void 0 !== g && void 0 !== m) {
                    var C = o.polynomialOrderContext(M, g, {
                        allowRestriction: !1,
                        allowClosedBlockReferences: !1
                    });
                    if (1 === o.instructionOrder(C, d)) {
                        var I = o.polynomialOrderContext(M, m, {
                            allowRestriction: !1,
                            allowClosedBlockReferences: !1
                        });
                        if (1 === o.instructionOrder(I, f)) {
                            var w = u.polynomialCoefficientContext(C)
                              , b = u.polynomialCoefficientContext(I)
                              , F = u.instructionCoefficients(w, d)
                              , S = F[0]
                              , A = F[1]
                              , z = w.newChunk.getInstruction(S);
                            if (z.type === t.Constant && z.valueType === a.Number) {
                                var R = w.newChunk.getInstruction(A);
                                if (R.type === t.Constant && R.valueType === a.Number) {
                                    var O = h(e)
                                      , T = O.chunk
                                      , B = O.valueMap
                                      , D = T.Add([T.Multiply([g, n]), m]);
                                    B[r] = D;
                                    var E = M.copy();
                                    E.List([d, f]);
                                    var _ = E.close().getCompiledFunction().fn
                                      , j = l.asFloat(z.value)
                                      , q = l.asFloat(R.value)
                                      , V = u.instructionCoefficients(b, f)
                                      , W = V[0]
                                      , G = V[1]
                                      , H = b.newChunk.copy();
                                    H.List([W, G]);
                                    var J = H.close().getCompiledFunction().fn
                                      , K = O.replacementMask.slice();
                                    return K[g] = !0,
                                    K[m] = !0,
                                    {
                                        chunk: T,
                                        forwardParameterMap: function(e) {
                                            var r = O.forwardParameterMap(e)
                                              , t = _.apply(null, r)
                                              , a = t[0]
                                              , n = t[1];
                                            return r[g] = a,
                                            r[m] = n,
                                            r
                                        },
                                        reverseParameterMap: function(e) {
                                            var r = e.slice()
                                              , t = e[g]
                                              , a = e[m]
                                              , n = (t - j) / q
                                              , i = e.slice();
                                            i[g] = n,
                                            i.splice(m, 1);
                                            var s = J.apply(null, i)
                                              , o = (a - s[0]) / s[1];
                                            return r[g] = n,
                                            r[m] = o,
                                            O.reverseParameterMap(r)
                                        },
                                        isLazy: !1,
                                        valueMap: B,
                                        replacementMask: K
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    function L(e, r, t, a) {
        var i = e.getInstruction(a)
          , s = N(t);
        if (n.isLeafInstruction(i))
            return s;
        for (var o = 0, u = i.args; o < u.length; o++)
            for (var c = r[u[o]], l = 0; l < c.length; l++)
                s[l] = s[l] || c[l];
        return s
    }
    function N(e) {
        for (var r = [], t = 0; t < e; t++)
            r.push(!1);
        return r
    }
    function F(e) {
        for (var r = [], t = 0; t < e; t++)
            r.push(t);
        return r
    }
    function S(e) {
        return e.type === t.NativeFunction && ("sin" === e.symbol || "cos" === e.symbol)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.reparameterizeRegression = void 0,
    e.reparameterizeRegression = function(e) {
        var r = e.getInstruction(e.returnIndex);
        if (r.type === t.BroadcastResult) {
            var o = r.args[0]
              , u = e.returnIndex - o
              , c = e.getInstruction(o);
            if (2 === c.args.length) {
                var l = c.args[0]
                  , f = c.args[u]
                  , h = []
                  , d = [];
                h.push(l),
                d.push({
                    min: 1,
                    max: v.assertConstantListLength(e, e.returnIndex, "Programming error: cannot optimize regression on non-constant-length list"),
                    length: v.assertConstantListLength(e, e.returnIndex, "Programming error: cannot optimize regression on non-constant-length list")
                });
                for (var k = !1, w = !1, b = l + 1; b <= f; b++) {
                    if ((D = e.getInstruction(b)).type === t.ListAccess || D.type === t.InboundsListAccess || D.type === t.DeferredListAccess) {
                        if (D.args[1] !== l)
                            continue;
                        var F = D.args[0];
                        if (e.getInstruction(F).valueType !== a.ListOfNumber)
                            continue;
                        if (!i.isConstant(e.getInstruction(F)))
                            continue;
                        var A = g(s.asValue(e, F));
                        if (!isFinite(A.min) || !isFinite(A.max))
                            continue;
                        h.push(b),
                        d.push(A)
                    } else if (D.type === t.NativeFunction)
                        "exp" === D.symbol ? w = !0 : S(D) && (k = !0);
                    else if (D.type === t.Exponent || D.type === t.RawExponent)
                        w = !0;
                    else if (n.beginsBlock(D) || n.endsBlock(D))
                        return
                }
                if (0 !== h.length && (w || k)) {
                    var z = [];
                    for (b = 0; b <= f; b++) {
                        if (-1 !== (ie = h.indexOf(b)))
                            (O = N(h.length))[ie] = !0,
                            z.push(O);
                        else
                            z.push(L(e, z, h.length, b))
                    }
                    var R = [];
                    for (b = 0; b <= e.returnIndex; b++) {
                        var O;
                        if ((D = e.getInstruction(b)).type === t.LoadArg)
                            (O = N(e.argNames.length))[b] = !0,
                            R.push(O);
                        else
                            R.push(L(e, R, e.argNames.length, b))
                    }
                    var T = {
                        listAccessDependencyTable: z,
                        listAccesses: h,
                        listStatisticsTable: d
                    }
                      , B = void 0;
                    for (b = l + 1; b <= e.returnIndex; b++) {
                        var D;
                        switch ((D = e.getInstruction(b)).type) {
                        case t.NativeFunction:
                            if ("exp" === D.symbol) {
                                var E = D.args[0]
                                  , _ = M(T, E);
                                if (void 0 === _) {
                                    m(e, R, B, b);
                                    break
                                }
                                var j = _.listStatistics
                                  , q = _.listAccessIndex;
                                (ve = I(p(e), b, E, q, j)) ? B = [ve] : m(e, R, B, b)
                            }
                            break;
                        case t.Exponent:
                        case t.RawExponent:
                            var V = D.args
                              , W = V[0]
                              , G = M(T, V[1]);
                            if (void 0 === G || y(T, W)) {
                                m(e, R, B, b);
                                break
                            }
                            var H = G.listStatistics
                              , J = G.listAccessIndex;
                            (ve = P(p(e), b, J, H)) ? B = [ve] : m(e, R, B, b);
                            break;
                        case t.Multiply:
                            if (B && B.length > 1) {
                                m(e, R, B, b);
                                break
                            }
                            var K = B && B.length > 0 ? B[0] : p(e)
                              , Q = D.args
                              , U = Q[0]
                              , X = Q[1]
                              , Y = K.isLazy ? U : K.valueMap[U]
                              , Z = K.isLazy ? X : K.valueMap[X]
                              , $ = K.chunk.getInstruction(Y)
                              , ee = K.chunk.getInstruction(Z)
                              , re = void 0
                              , te = void 0
                              , ae = void 0;
                            if ($.type === t.NativeFunction)
                                re = U,
                                ae = $,
                                te = X;
                            else {
                                if (ee.type !== t.NativeFunction) {
                                    m(e, R, B, b);
                                    break
                                }
                                re = X,
                                ae = ee,
                                te = U
                            }
                            var ne = M(T, re);
                            if (void 0 === ne || y(T, te)) {
                                m(e, R, B, b);
                                break
                            }
                            var ie = ne.listAccessIndex
                              , se = ne.listStatistics;
                            if ("exp" === ae.symbol) {
                                var oe = C(K, b, te, re, ie, se);
                                if (oe) {
                                    B = oe;
                                    break
                                }
                            } else if (S(ae)) {
                                if (ve = x(K, b, te, re, ie)) {
                                    B = [ve];
                                    break
                                }
                            }
                            m(e, R, B, b);
                            break;
                        default:
                            m(e, R, B, b)
                        }
                    }
                    if (void 0 !== B && 0 !== B.length) {
                        for (var ue = [], ce = 0, le = B; ce < le.length; ce++) {
                            var ve = le[ce];
                            ue.push({
                                chunk: ve.chunk.close(),
                                forwardParameterMap: ve.forwardParameterMap,
                                reverseParameterMap: ve.reverseParameterMap
                            })
                        }
                        return ue
                    }
                }
            }
        }
    }
});
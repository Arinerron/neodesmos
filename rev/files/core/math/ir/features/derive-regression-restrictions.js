
define('core/math/ir/features/derive-regression-restrictions', ["require", "exports", "../opcodes", "core/math/types", "../instructions", "./is-constant", "./as-value", "./polynomial-order", "./get-polynomial-coefficients", "core/math/domaintypes", "./list-length"], function(require, n, e, t, i, o, r, s, a, u, c) {
    "use strict";
    function l(n, e, t, i, o, r) {
        if ("known" !== e.type)
            return t;
        if (e.bounds[0] === -1 / 0 && e.bounds[1] === 1 / 0)
            return t;
        var s = n.And([n.LessEqual([n.Constant(e.bounds[0]), i]), n.LessEqual([i, n.Constant(e.bounds[1])])]);
        return n.Multiply([t, n.Piecewise([s, o, r])])
    }
    function f(n, e) {
        for (var t = [], i = 0; i < n.argNames.length; i++)
            t.push(i);
        var o = [];
        for (i = 0; i <= e; i++)
            o.push(p(n, t, o, i));
        return o[e]
    }
    function g(n) {
        return n.type === e.NativeFunction && ("sin" === n.symbol || "cos" === n.symbol)
    }
    function v(n) {
        for (var e = 1 / 0, t = -1 / 0, i = n.length, o = 0, r = n; o < r.length; o++) {
            var s = r[o];
            e = Math.min(e, s),
            t = Math.max(t, s)
        }
        return {
            min: e,
            max: t,
            length: i
        }
    }
    function p(n, e, t, o) {
        for (var r = n.getInstruction(o), s = function(n) {
            for (var e = [], t = 0; t < n; t++)
                e.push(!1);
            return e
        }(e.length), a = 0; a < e.length; a++)
            if (e[a] === o)
                return s[a] = !0,
                s;
        if (i.isLeafInstruction(r))
            return s;
        for (var u = 0, c = r.args; u < c.length; u++)
            for (var l = t[c[u]], f = 0; f < l.length; f++)
                s[f] = s[f] || l[f];
        return s
    }
    Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    n.deriveRegressionRestrictions = void 0,
    n.deriveRegressionRestrictions = function(n) {
        var i = n.getInstruction(n.returnIndex);
        if (i.type !== e.BroadcastResult)
            return n;
        var h = i.args[0]
          , d = n.returnIndex - h
          , m = n.getInstruction(h)
          , C = m.args[0]
          , y = m.args[d]
          , w = []
          , x = [];
        w.push(C);
        var I = c.assertConstantListLength(n, n.returnIndex, "Programming error: cannot optimize regression on non-constant-length list");
        x.push({
            min: 1,
            max: I,
            length: I
        });
        for (var k = !1, R = !1, b = C + 1; b <= y; b++) {
            if ((W = n.getInstruction(b)).type === e.ListAccess || W.type === e.InboundsListAccess || W.type === e.DeferredListAccess) {
                if (W.args[1] !== C)
                    continue;
                var L = W.args[0];
                if (n.getInstruction(L).valueType !== t.ListOfNumber)
                    continue;
                if (!o.isConstant(n.getInstruction(L)))
                    continue;
                var D = v(r.asValue(n, L));
                if (!isFinite(D.min) || !isFinite(D.max))
                    continue;
                w.push(b),
                x.push(D)
            } else
                g(W) ? k = !0 : W.type !== e.Exponent && W.type !== e.RawExponent || (R = !0)
        }
        if (0 === w.length)
            return n;
        if (!R && !k)
            return n;
        var O = []
          , P = [];
        for (b = 0; b < n.argNames.length; b++)
            P.push(b),
            O.push(u.allReals());
        var N = []
          , B = [];
        for (b = 0; b <= y; b++)
            N.push(p(n, P, N, b)),
            B.push(p(n, w, B, b));
        for (b = 0; b <= y; b++) {
            if ((W = n.getInstruction(b)).type === e.Piecewise)
                for (var E = N[b], F = 0; F < E.length; F++)
                    E[F] && (O[F] = u.unknownDomain());
            else if (W.type === e.Exponent || W.type === e.RawExponent) {
                var M = !1
                  , V = !1;
                for (F = 0; F < w.length; F++)
                    B[W.args[0]][F] && (M = !0),
                    B[W.args[1]][F] && (V = !0);
                if (M)
                    continue;
                if (!V)
                    continue;
                E = N[W.args[0]];
                var A = 0
                  , q = void 0;
                for (F = 0; F < E.length; F++)
                    E[F] && (q = F,
                    A += 1);
                if (1 !== A)
                    continue;
                if (void 0 === q)
                    continue;
                var _ = P[q]
                  , j = s.polynomialOrderContext(n.copy().reopenFinalBlock(), _, {
                    allowRestriction: !1,
                    allowClosedBlockReferences: !1
                });
                if (1 !== s.instructionOrder(j, W.args[0]))
                    continue;
                var z = a.polynomialCoefficientContext(j)
                  , T = a.instructionCoefficients(z, W.args[0])
                  , G = T[0];
                if (void 0 === (en = T[1]))
                    continue;
                var H = r.asValue(z.newChunk, en)
                  , J = r.asValue(z.newChunk, G);
                O[q] = u.intersectDomains(O[q], u.linearPositiveDomain(J, H))
            }
        }
        if (k)
            for (var K = n.copy().reopenFinalBlock(), Q = 0; Q < w.length; Q++) {
                var S = s.polynomialOrderContext(K, w[Q], {
                    allowRestriction: !1,
                    allowClosedBlockReferences: !1
                })
                  , U = a.polynomialCoefficientContext(S);
                for (b = C + 1; b <= y; b++) {
                    var W;
                    if (g(W = K.getInstruction(b))) {
                        var X = W.args[0];
                        if (1 !== s.instructionOrder(S, X))
                            continue;
                        var Y = a.instructionCoefficients(U, X)[1];
                        if (void 0 === Y)
                            continue;
                        var Z = f(U.newChunk, Y)
                          , $ = (q = void 0,
                        0);
                        for (F = 0; F < Z.length; F++)
                            Z[F] && (q = F,
                            $ += 1);
                        if (1 !== $)
                            continue;
                        if (void 0 === q)
                            continue;
                        var nn = s.polynomialOrderContext(U.newChunk, q, {
                            allowRestriction: !1,
                            allowClosedBlockReferences: !1
                        });
                        if (1 !== s.instructionOrder(nn, Y))
                            continue;
                        var en, tn = a.polynomialCoefficientContext(nn), on = a.instructionCoefficients(tn, Y);
                        G = on[0];
                        if (void 0 === (en = on[1]) || !o.isConstant(tn.newChunk.getInstruction(G)) || !o.isConstant(tn.newChunk.getInstruction(en)))
                            continue;
                        J = r.asValue(tn.newChunk, G),
                        H = r.asValue(tn.newChunk, en);
                        var rn = (x[Q].max - x[Q].min) / Math.min(x[Q].length - 1, 31)
                          , sn = Math.PI / rn;
                        if (!isFinite(sn))
                            continue;
                        if (sn <= 0)
                            continue;
                        O[q] = u.intersectDomains(O[q], u.linearPositiveDomain(J, H)),
                        O[q] = u.intersectDomains(O[q], u.linearPositiveDomain(sn - J, -H))
                    }
                }
            }
        for (var an = !1, un = 0, cn = O; un < cn.length; un++) {
            var ln = cn[un];
            if ("known" !== ln.type)
                return n;
            ln.bounds[0] === -1 / 0 && ln.bounds[1] === 1 / 0 || (an = !0)
        }
        if (!an)
            return n;
        var fn = n.copy()
          , gn = n.returnIndex
          , vn = fn.Constant(1)
          , pn = fn.Constant(NaN);
        for (F = 0; F < fn.argNames.length; F++)
            gn = l(fn, O[F], gn, F, vn, pn);
        return fn.close(),
        fn
    }
});
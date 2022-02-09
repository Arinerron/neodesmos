
define('core/math/ir/features/solve', ["require", "exports", "parsenodes", "core/math/workerconfig", "core/math/parsenode/irexpression", "core/math/errormsg", "../build-ir", "../dependencies", "core/math/comparators", "../opcodes", "./fuse-broadcast", "./reapply-restrictions", "core/math/types", "core/math/maybe-rational"], function(require, e, i, r, t, a, n, s, c, l, o, u, d, v) {
    "use strict";
    function f(e, i) {
        return i ? function(e) {
            var i = e.chunk
              , r = e.coefficients
              , t = r[0]
              , a = r[1]
              , n = r[2]
              , s = i.Constant(v.maybeRational(0, 1));
            void 0 === n && (n = s);
            void 0 === a && (a = s);
            void 0 === t && (t = s);
            var c = i.Constant(v.maybeRational(2, 1))
              , l = i.Constant(NaN)
              , o = i.Constant(v.maybeRational(1e305, 1))
              , u = i.Negative([o])
              , d = i.Multiply([c, n])
              , f = i.Negative([a])
              , p = i.Subtract([i.Multiply([a, a]), i.Multiply([c, i.Multiply([d, t])])])
              , g = i.SyntheticNativeFunction("sqrt", [p])
              , m = i.Divide([i.Add([f, g]), d])
              , y = i.Divide([i.Subtract([f, g]), d])
              , b = i.Negative([i.Divide([t, a])])
              , h = i.Equal([n, s])
              , w = i.Greater([n, s])
              , P = i.Equal([a, s])
              , I = i.Greater([a, s])
              , N = i.Less([a, s])
              , O = i.Greater([t, s])
              , q = i.Less([p, s]);
            return [i.Piecewise([h, i.Piecewise([N, b, l]), i.Piecewise([w, y, l])]), i.Piecewise([h, i.Piecewise([P, i.Piecewise([O, u, l]), l]), i.Piecewise([w, i.Piecewise([q, u, l]), m])]), i.Piecewise([h, i.Piecewise([P, i.Piecewise([O, o, l]), l]), i.Piecewise([w, i.Piecewise([q, o, l]), y])]), i.Piecewise([h, i.Piecewise([I, b, l]), i.Piecewise([w, m, l])])]
        }(e) : function(e) {
            var i = e.chunk
              , r = e.coefficients
              , t = r[0]
              , a = r[1]
              , n = r[2]
              , s = i.Constant(v.maybeRational(0, 1))
              , c = i.Constant(NaN);
            if (void 0 === n) {
                void 0 === a && (a = s);
                var o = i.Negative([i.Divide([t, a])])
                  , u = i.Equal([a, s]);
                return [i.Piecewise([u, c, o])]
            }
            var d = i.Constant(v.maybeRational(2, 1))
              , f = i.Multiply([d, n])
              , p = i.Negative([a])
              , g = i.Subtract([i.Multiply([a, a]), i.Multiply([d, i.Multiply([f, t])])])
              , m = i.Equal([n, s])
              , y = i.getInstruction(g);
            if (y.type === l.Constant && 0 === v.asFloat(y.value))
                return [i.Piecewise([m, c, i.Divide([p, f])])];
            var b = i.SyntheticNativeFunction("sqrt", [g])
              , h = i.Less([a, s])
              , w = i.Greater([a, s])
              , P = i.Divide([i.Add([p, b]), f])
              , I = i.Divide([i.Subtract([p, b]), f]);
            o = i.Negative([i.Divide([t, a])]);
            return [i.Piecewise([m, i.Piecewise([h, o, c]), I]), i.Piecewise([m, i.Piecewise([w, o, c]), P])]
        }(e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.trySolve = void 0,
    e.trySolve = function(e, v) {
        try {
            return function(e, v) {
                for (var p = e.policy, g = e.frame, m = s.getFreeDependencies(g, v), y = [], b = 0; b < m.length; b++)
                    y.push(d.Number);
                var h = n.buildIRContext({
                    policy: p,
                    frame: g,
                    argNames: m,
                    argTypes: y
                })
                  , w = h.chunk
                  , P = n.addToIR(h, v.args[0])
                  , I = n.addToIR(h, v.args[1])
                  , N = v.getOperator()
                  , O = "=" !== N;
                switch (N) {
                case "<":
                    w.Less([P, I]);
                    break;
                case ">":
                    w.Greater([P, I]);
                    break;
                case "<=":
                    w.LessEqual([P, I]);
                    break;
                case ">=":
                    w.GreaterEqual([P, I]);
                    break;
                case "=":
                    w.Equal([P, I])
                }
                if (w.returnIndex = o.fuseBroadcast(w, w.returnIndex),
                w.isConstant())
                    return new t(w.close());
                var q = w.getInstruction(P).type !== l.LoadArg || -1 !== s.getFreeDependencies(g, v.args[1]).indexOf(w.argNames[P]);
                if (!r.plotImplicits && q)
                    throw a.implicitsDisabled();
                -1 === c.table[N].direction ? w.Subtract([I, P]) : w.Subtract([P, I]);
                w.close();
                var D = w.getLiveArgNames();
                if (0 === D.length)
                    throw a.parseError();
                if (1 === D.length && !O && !r.plotSingleVariableImplicitEquations)
                    return a.singleVariableImplicitEquationsDisabled();
                if (D.length > 2)
                    return a.tooManyVariables(p.sliderVariables(D)).setDependencies(D);
                if (O && !p.validInequalityVariables(D))
                    return a.invalidInequalityVariables().setDependencies(D);
                var C = function(e, i) {
                    var r = e.chunk
                      , t = e.policy
                      , a = r.argNames
                      , n = d.isList(r.getReturnType())
                      , s = [];
                    e: for (var c = 0; c < a.length; c++) {
                        var l = a[c]
                          , o = a.length > 1 && !t.validSolvedVariable(l);
                        s[c] = {
                            localFrames: [],
                            effectiveOrder: 0,
                            variableOfInterest: l
                        };
                        var u = !i;
                        if (o)
                            s[c].effectiveOrder = 1 / 0;
                        else {
                            var v = n ? r.getConstantListLength() : 1;
                            if (null == v)
                                throw new Error("Programming error: cannot solve a variable-length list expression");
                            for (var f = 0; f < v; f++) {
                                var p = n ? r.elementAt(f) : r;
                                if (p.polynomialOrder(l, {
                                    allowRestriction: u,
                                    allowClosedBlockReferences: !1
                                }) > 2) {
                                    s[c].effectiveOrder = 1 / 0;
                                    continue e
                                }
                                var g = p.getPolynomialCoefficients(l);
                                s[c].localFrames.push(g),
                                s[c].effectiveOrder = Math.max(s[c].effectiveOrder, g.coefficients.length - 1)
                            }
                        }
                    }
                    return 1 === a.length ? s[0] : ("y" === a[0] && (s = [s[1], s[0]]),
                    0 === s[0].effectiveOrder ? s[1] : 0 === s[1].effectiveOrder ? s[0] : s[s[0].effectiveOrder < s[1].effectiveOrder ? 0 : 1])
                }(h, O)
                  , E = C.localFrames
                  , R = C.effectiveOrder
                  , S = C.variableOfInterest;
                if (p.complicatedPolarImplicit(S, R))
                    return a.complicatedPolarImplicit().setDependencies(D);
                if (!p.validImplicitVariables(D))
                    return a.invalidImplicitVariables();
                if (R > 2)
                    return new t(w.close());
                for (var k = [], L = 1, M = 0, x = E; M < x.length; M++) {
                    var V = x[M]
                      , F = f(V, O);
                    L = F.length;
                    for (var G = 0, A = F; G < A.length; G++) {
                        var T = A[G]
                          , B = V.chunk.copy();
                        B.returnIndex = T,
                        V.isRestrictedPolynomial && (B.returnIndex = u.reapplyRestrictions(B, V)),
                        B.close(),
                        k.push(new t(B))
                    }
                }
                return i.SolvedEquation(S, i.List(k), L)
            }(e, v)
        } catch (e) {
            return e instanceof i.Base ? e : a.parseError()
        }
    }
});
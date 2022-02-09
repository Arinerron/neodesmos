define('core/math/ir/build-ir', ["require", "exports", "parsenodes", "core/math/builtinframe", "core/math/errormsg", "./scope", "./chunk", "core/math/types", "core/math/maybe-rational", "./opcodes", "./builtin-table", "./features/list-length", "./features/is-constant", "./features/type-check", "./distribution-table", "./features/fuse-broadcast", "./features/find-dependency-symbols", "./features/element-at", "./features/take-derivative", "./features/substitute", "./features/convert-to-broadcast", "./features/copy-instruction", "./features/depends-on-instruction", "./dependencies", "../cache-stats", "./features/nan-of-type"], function(require, e, t, r, n, i, a, s, o, u, c, l, d, p, y, f, g, v, m, h, b, T, L, S, I, w) {
    "use strict";
    function A(e, t, r, n, i) {
        return {
            policy: e,
            frame: t,
            chunk: r,
            scope: n,
            parentNode: i
        }
    }
    function E(e) {
        var t = e.policy
          , r = e.frame
          , n = e.argNames
          , s = e.argTypes
          , o = new a.Chunk({
            argNames: n,
            argTypes: s
        });
        return A(t, r, o, function(e) {
            for (var t = i.Scope({}, -1), r = 0; r < e.argNames.length; r++)
                i.setSymbol(t, e.argNames[r], r);
            return t
        }(o), void 0)
    }
    function x(e, t, r) {
        if ("FunctionDefinition" === t.type)
            for (var i = 0, a = r; i < a.length; i++) {
                var o = a[i];
                if (-1 !== t._argSymbols.indexOf(o) || t._symbol === o)
                    throw n.updateRuleLocalLHS(o);
                if (t._sybmol === o)
                    throw n.updateRuleFunctionLHS(o)
            }
        for (var u = [], c = 0, l = r; c < l.length; c++) {
            o = l[c];
            e.frame[o] || u.push(o)
        }
        if (u.length) {
            var d = U(e, u[0]).setDependencies(e.chunk.argNames.concat(u));
            throw e.chunk.isConstant() && e.chunk.getReturnType() === s.Action && d.setActionValue(e.chunk.asValue()),
            d
        }
    }
    function C(e, a) {
        var c;
        if (I.markCacheRead(),
        _(e.frame, a))
            I.markCacheHit(),
            c = e.chunk.copyInstruction(a.__IRCache.instruction);
        else {
            I.markCacheMiss();
            var y = e.chunk.instructionsLength()
              , g = e.policy
              , v = e.frame
              , T = e.chunk
              , E = e.scope
              , x = e.parentNode;
            if (c = function(e, a) {
                var c = e.policy
                  , y = e.frame
                  , g = e.chunk
                  , v = e.scope
                  , T = e.parentNode;
                switch (a.type) {
                case "Constant":
                    var I = a._constantValue
                      , E = "boolean" == typeof I ? s.Bool : s.Number;
                    return g.ConstantOfType(E, I);
                case "MixedNumber":
                    return g.Constant(a._constantValue);
                case "Negative":
                    return g.Negative(function(e, t) {
                        return [C(e, t[0])]
                    }(e, a.args));
                case "Add":
                    return g.Add(D(e, a.args));
                case "Subtract":
                    return g.Subtract(D(e, a.args));
                case "Multiply":
                    return g.Multiply(D(e, a.args));
                case "Divide":
                    return g.Divide(D(e, a.args));
                case "Exponent":
                    return g.Exponent(D(e, a.args));
                case "Comparator['=']":
                    return g.Equal(D(e, a.args));
                case "Comparator['>']":
                    return g.Greater(D(e, a.args));
                case "Comparator['<']":
                    return g.Less(D(e, a.args));
                case "Comparator['>=']":
                    return g.GreaterEqual(D(e, a.args));
                case "Comparator['<=']":
                    return g.LessEqual(D(e, a.args));
                case "And":
                    return g.And(D(e, a.args));
                case "PercentOf":
                    return g.Divide([g.Multiply(D(e, a.args)), g.Constant(100)]);
                case "ParenSeq":
                    return function(e, t) {
                        for (var r, i, a, o, u = e.chunk, c = e.policy, l = B(e, t.args), d = !1, p = 0; p < l.length; p++) {
                            var y = u.getInstruction(l[p]).valueType;
                            if (y === s.Action) {
                                if (d = !0,
                                void 0 !== o)
                                    throw n.combineTypeError([s.prettyPrint(o), s.prettyPrint(s.Action)])
                            } else {
                                if (d)
                                    throw n.combineTypeError([s.prettyPrint(s.Action), s.prettyPrint(y)]);
                                o = y
                            }
                        }
                        if (d)
                            return V(e, l);
                        var f = null !== (a = null === (i = (r = c).dimensions) || void 0 === i ? void 0 : i.call(r)) && void 0 !== a ? a : 2;
                        if (2 !== f)
                            throw new Error("3D points not implemented.");
                        if (l.length !== f)
                            throw n.badTupleDimensions(f);
                        return u.OrderedPair(l)
                    }(e, a);
                case "BareSeq":
                    return function(e, t) {
                        var r = e.chunk
                          , i = B(e, t.args);
                        if (i.length < 2)
                            throw n.unexpectedSymbol(",");
                        for (var a = r.getInstruction(i[0]).valueType, o = 1; o < i.length; o++) {
                            var u = r.getInstruction(i[o]).valueType;
                            if (a !== u)
                                throw n.combineTypeError([s.prettyPrint(a), s.prettyPrint(u)])
                        }
                        if (a === s.Number)
                            throw 2 === i.length ? n.malformedPoint() : n.malformedList();
                        return a === s.Action ? V(e, i) : r.List(i)
                    }(e, a);
                case "OrderedPairAccess":
                    return g.OrderedPairAccess(D(e, a.args));
                case "UpdateRule":
                    var x = y[ne = a._symbol];
                    if (x) {
                        if (x.isError)
                            throw x;
                        if ("Assignment" !== x.type && "Slider" !== x.type)
                            throw U(e, ne)
                    }
                    return g.Action([ne], [C(e, a.args[1])]);
                case "List":
                    if (a.getDependencies().length > 0)
                        return g.List(B(e, a.args));
                    if (0 === a.args.length)
                        return g.ConstantOfType(s.EmptyList, []);
                    for (var N = g.instructionsLength(), F = [], O = void 0, _ = void 0, R = 0, k = a.args; R < k.length; R++) {
                        var M = C(e, k[R])
                          , H = g.getInstruction(M);
                        if (void 0 === O) {
                            if (O = H.valueType,
                            !s.hasListType(O))
                                throw n.listTypeError([s.prettyPrint(O)]);
                            _ = s.listType(O)
                        } else if (H.valueType !== O)
                            throw n.heterogeneousList();
                        if (H.type !== u.Constant)
                            throw new Error("Programming error: expected list with no dependencies to constant collapse.");
                        F.push(H.value),
                        g.truncate(N)
                    }
                    return g.ConstantOfType(_, F);
                case "ListAccess":
                    var j = C(e, a.args[0])
                      , z = g.getInstruction(j);
                    if ("Range" === a.args[1].type && 0 === a.args[1].args[1].length) {
                        if (!s.isList(z.valueType))
                            throw n.indexTypeError([s.prettyPrint(z.valueType), s.prettyPrint(s.Number)]);
                        var W = l.listLengthIndex(g, j)
                          , G = q(e, C(e, a.args[1].args[0]), g.List([W]), {
                            stepMustBePositive: !0
                        });
                        return g.ListAccess([j, G])
                    }
                    G = C(e, a.args[1]);
                    var K = g.getInstruction(G);
                    if (!s.isList(z.valueType))
                        throw n.indexTypeError([s.prettyPrint(z.valueType), s.prettyPrint(K.valueType)]);
                    return K.valueType === s.ListOfBool ? g.SyntheticNativeFunction("select", [j, G]) : g.ListAccess([j, G]);
                case "Range":
                    var J = D(e, a.args);
                    return q(e, J[0], J[1], {
                        stepMustBePositive: !1
                    });
                case "ListComprehension":
                    return function(e, t) {
                        for (var r = e.policy, a = e.frame, o = e.chunk, c = e.scope, d = e.parentNode, p = t._body, y = [], f = o.Constant(1), g = Object.create(a), v = 0, m = t._inputLists; v < m.length; v++) {
                            var h = m[v]._symbol;
                            g[h] = n.badListComprehensionInputDependency(h)
                        }
                        for (var b = i.childScope(c), T = t._inputLists.length - 1; T >= 0; T--) {
                            var L = t._inputLists[T]
                              , I = L._symbol
                              , w = C(A(r, g, o, b, d), L.args[1])
                              , E = o.getInstruction(w);
                            if (!s.isList(E.valueType))
                                throw n.listComprehensionInputListTypeError(I, s.prettyPrint(E.valueType));
                            var x = l.listLengthIndex(o, w);
                            y.push({
                                symbol: I,
                                assignedList: w,
                                lengthIndex: x
                            }),
                            f = o.Multiply([f, x])
                        }
                        var N = o.Constant(1)
                          , F = o.BeginBroadcast([f], {
                            inputListSymbols: y.map(function(e) {
                                return e.symbol
                            })
                        })
                          , O = i.childScope(c);
                        i.setSymbol(O, t._index._symbol, F);
                        var _ = N;
                        for (T = y.length - 1; T >= 0; T--) {
                            var D = y[T]
                              , B = (I = D.symbol,
                            w = D.assignedList,
                            x = D.lengthIndex,
                            void 0);
                            if (1 === y.length)
                                B = F;
                            else {
                                var P = o.SyntheticNativeFunction("floor", [o.Divide([o.Subtract([F, N]), _])]);
                                B = o.Add([o.SyntheticNativeFunction("mod", [P, x]), N]),
                                T > 0 && (_ = o.Multiply([_, x]))
                            }
                            var R = i.getSymbol(O, I);
                            if (void 0 !== a[I] || void 0 !== R && o.getInstruction(R).type !== u.LoadArg)
                                throw n.shadowedListComprehensionInput(I);
                            i.setSymbol(O, I, o.ListAccess([w, B]))
                        }
                        for (var k = Object.create(a), M = 0, V = y; M < V.length; M++) {
                            k[V[M].symbol] = S.FRAME_SENTINEL
                        }
                        var U = C(A(r, k, o, O, d), p)
                          , q = o.getInstruction(U);
                        if (!s.hasListType(q.valueType))
                            throw n.listTypeError([s.prettyPrint(q.valueType)]);
                        var H = o.EndBroadcast([F, U]);
                        return o.BroadcastResult(s.listType(q.valueType), [H])
                    }(e, a);
                case "Piecewise":
                    var Q = function(e, t) {
                        return [C(e, t[0]), C(e, t[1]), C(e, t[2])]
                    }(e, a.args)
                      , X = g.getInstruction(Q[0])
                      , Y = g.getInstruction(Q[1])
                      , Z = g.getInstruction(Q[2]);
                    if (X.type === u.Constant && X.valueType === s.Bool && s.typesMatch(Y.valueType, Z.valueType)) {
                        var $ = Q[X.value ? 1 : 2]
                          , ee = g.getInstruction($)
                          , te = Y.valueType !== s.EmptyList ? Y.valueType : Z.valueType;
                        return ee.valueType === s.EmptyList && te !== s.EmptyList ? g.ConstantOfType(te, []) : $
                    }
                    if (!s.typesMatch(Y.valueType, Z.valueType) && d.isConstant(Z) && Z.valueType === s.Number && o.isNanFloat(Z.value) && w.isNanableValueType(Y.valueType)) {
                        var re = g.NanOfType(Y.valueType);
                        Q = [Q[0], Q[1], re]
                    }
                    return g.Piecewise(Q);
                case "Ans":
                case "Identifier":
                    var ne = a._symbol
                      , ie = a._errorSymbol;
                    if ("Ans" === a.type && -1 !== g.argNames.indexOf(ne))
                        throw n.ansUndefined();
                    G = i.getSymbol(v, ne);
                    var ae = y[ne];
                    if (void 0 !== G) {
                        if (v.symbolMap.hasOwnProperty(ne))
                            return G;
                        if (void 0 === ae || ae === S.FRAME_SENTINEL)
                            return G
                    }
                    if (void 0 === ae) {
                        if (r[a._symbol])
                            throw r[a._symbol].isFunction ? n.functionUnsupported(ie) : n.constantUnsupported(ie);
                        throw new Error("Programming Error: reached undefined symbol " + ne)
                    }
                    if (ae.isError)
                        throw ae;
                    if (ae.isFunction)
                        throw n.identifierAsFunction(ie);
                    var se = C(A(c, y, g, v, void 0), ae);
                    return i.setSymbol(v, ne, se),
                    se;
                case "FunctionCall":
                case "SeededFunctionCall":
                    Q = B(e, a.args);
                    return P(e, a._symbol, a._errorSymbol, Q);
                case "FunctionExponent":
                    return y[tt = a.args[0]._symbol] && y[tt].isFunction ? C(e, t.Exponent([t.FunctionCall(tt, [a.args[1]]), a.args[2]])) : C(e, t.Multiply([a.args[0], t.Exponent([a.args[1], a.args[2]])]));
                case "FunctionFactorial":
                    return y[tt = a.args[0]._symbol] && y[tt].isFunction ? C(e, t.FunctionCall("\\factorial", [t.FunctionCall(tt, [a.args[1]])])) : C(e, t.Multiply([a.args[0], t.FunctionCall("\\factorial", [a.args[1]])]));
                case "DotAccess":
                    var oe = a.args[0]
                      , ue = a.args[1];
                    if (("Identifier" === ue.type || "FunctionCall" === ue.type) && y[ue._symbol] && y[ue._symbol].isFunction)
                        return P(e, ne = ue._symbol, ie = ue._errorSymbol, Q = B(e, "Identifier" === ue.type ? [oe] : [oe].concat(ue.args)), {
                            dotLHSIndex: Q[0]
                        });
                    if ("SeededFunctionCall" === ue.type)
                        return P(e, ne = ue._symbol, ie = ue._errorSymbol, Q = B(e, [ue.seed, oe].concat(ue.args.slice(1))), {
                            dotLHSIndex: Q[1]
                        });
                    throw n.unexpectedSymbol(".");
                case "Seed":
                    return g.ConstantOfType(s.SeedType, a._stringValue);
                case "ExtendSeed":
                    return g.ExtendSeed(a.tag, D(e, a.args));
                case "Integral":
                    var ce = a._differential._symbol
                      , le = i.getSymbol(v, ce);
                    if (void 0 !== y[ce] || void 0 !== le && g.getInstruction(le).type !== u.LoadArg)
                        throw n.shadowedIntegrationVariable(ce);
                    (xe = Object.create(y))[ce] = n.badIntegralBoundDependency(ce);
                    var de = C(Ne = A(c, xe, g, i.childScope(v), T), a.args[1])
                      , pe = C(Ne, a.args[2])
                      , ye = g.getInstruction(de)
                      , fe = g.getInstruction(pe)
                      , ge = g.SymbolicVar(s.Number, ce)
                      , ve = i.childScope(v);
                    i.setSymbol(ve, ce, ge);
                    var me = Object.create(y);
                    me[ce] = S.FRAME_SENTINEL;
                    var he = C(A(c, me, g, ve, T), a.args[3]);
                    if (!L.dependsOnInstruction(g, he, ge))
                        return g.Multiply([he, g.Subtract([pe, de])]);
                    var be = de;
                    void 0 !== (Ue = void 0 !== (Re = l.minListLengthIndex(g, [de, pe, he])) ? g.BeginBroadcast([Re]) : void 0) && s.isList(ye.valueType) && (be = b.deferredOrInboundsAccess(g, de, Ue));
                    var Te = pe;
                    void 0 !== Ue && s.isList(fe.valueType) && (Te = b.deferredOrInboundsAccess(g, pe, Ue));
                    var Le = g.BeginIntegral({
                        indexSymbol: ce
                    }, [be, Te])
                      , Se = h.substitute(g, Le, ge, he)
                      , Ie = g.getInstruction(Se);
                    void 0 !== Ue && s.isList(Ie.valueType) && (Se = b.deferredOrInboundsAccess(g, Se, Ue));
                    var we = g.EndIntegral([Le, Se])
                      , Ae = g.BlockVar(s.Number, [we]);
                    if (void 0 !== Ue) {
                        var Ee = g.EndBroadcast([Ue, Ae]);
                        return g.BroadcastResult(s.ListOfNumber, [Ee])
                    }
                    return Ae;
                case "Sum":
                case "Product":
                    ce = a._index._symbol,
                    le = i.getSymbol(v, ce);
                    if (void 0 !== y[ce] || void 0 !== le && g.getInstruction(le).type !== u.LoadArg)
                        throw n.shadowedIndex(ce);
                    var xe, Ce = "Sum" === a.type;
                    (xe = Object.create(y))[ce] = Ce ? n.badSumBoundDependency(ce) : n.badProductBoundDependency(ce);
                    var Ne, Fe = C(Ne = A(c, xe, g, i.childScope(v), T), a.args[1]), Oe = C(Ne, a.args[2]);
                    if (!p.argIsTypeOrListOfType(g, Fe, s.Number)) {
                        var _e = p.extractScalarValueTypes(g, [Fe]);
                        throw Ce ? n.sumLowerBoundTypeError(_e) : n.productLowerBoundTypeError(_e)
                    }
                    if (!p.argIsTypeOrListOfType(g, Oe, s.Number)) {
                        _e = p.extractScalarValueTypes(g, [Oe]);
                        throw Ce ? n.sumUpperBoundTypeError(_e) : n.productUpperBoundTypeError(_e)
                    }
                    de = g.SyntheticNativeFunction("round", [Fe]),
                    pe = g.SyntheticNativeFunction("round", [Oe]),
                    ye = g.getInstruction(de),
                    fe = g.getInstruction(pe);
                    if (ye.type === u.Constant && ye.valueType === s.Number && !isFinite(o.asFloat(ye.value)))
                        throw Ce ? n.sumInfiniteBoundError() : n.productInfiniteBoundError();
                    if (fe.type === u.Constant && fe.valueType === s.Number && !isFinite(o.asFloat(fe.value)))
                        throw Ce ? n.sumInfiniteBoundError() : n.productInfiniteBoundError();
                    var De = g.SymbolicVar(s.Number, ce)
                      , Be = i.childScope(v);
                    i.setSymbol(Be, ce, De);
                    var Pe = Object.create(y);
                    Pe[ce] = S.FRAME_SENTINEL;
                    var Re, ke = C(A(c, Pe, g, Be, T), a.args[3]);
                    if (!L.dependsOnInstruction(g, ke, De)) {
                        var Me = g.Add([g.Subtract([pe, de]), g.Constant(1)]);
                        Me = g.SyntheticNativeFunction("max", [Me, g.Constant(0)]);
                        var Ve = Ce ? g.Multiply([ke, Me]) : g.Exponent([ke, Me]);
                        return g.Piecewise([g.Less([Me, g.Constant(1 / 0)]), Ve, g.Constant(NaN)])
                    }
                    if (!p.argIsTypeOrListOfType(g, ke, s.Number)) {
                        _e = p.extractScalarValueTypes(g, [ke]);
                        throw Ce ? n.sumArgumentTypeError(_e) : n.productArgumentTypeError(_e)
                    }
                    if (void 0 !== (Re = l.minListLengthIndex(g, [de, pe, ke])) && L.dependsOnInstruction(g, Re, De))
                        throw Ce ? n.variableLengthSumBodyDependsOnIndex(ce) : n.variableLengthProductBodyDependsOnIndex(ce);
                    var Ue;
                    be = de;
                    void 0 !== (Ue = void 0 !== Re ? g.BeginBroadcast([Re]) : void 0) && s.isList(ye.valueType) && (be = b.deferredOrInboundsAccess(g, de, Ue));
                    Te = pe;
                    null != Ue && s.isList(fe.valueType) && (Te = b.deferredOrInboundsAccess(g, pe, Ue));
                    var qe = g.Constant(Ce ? 0 : 1)
                      , He = (Le = g.BeginLoop({
                        type: Ce ? "sum" : "product",
                        indexSymbol: ce
                    }, [be, Te, qe]),
                    g.BlockVar(s.Number, [Le]))
                      , je = h.substitute(g, Le, De, ke)
                      , ze = g.getInstruction(je);
                    void 0 !== Ue && s.isList(ze.valueType) && (je = b.deferredOrInboundsAccess(g, je, Ue));
                    var We = Ce ? g.Add([He, je]) : g.Multiply([He, je])
                      , Ge = (we = g.EndLoop([Le, We]),
                    g.BlockVar(s.Number, [we]));
                    if (void 0 !== Ue) {
                        Ee = g.EndBroadcast([Ue, Ge]);
                        return g.BroadcastResult(s.ListOfNumber, [Ee])
                    }
                    return Ge;
                case "Derivative":
                    var Ke = C(e, t.Identifier(a._symbol));
                    if (!p.argIsTypeOrListOfType(g, Ke, s.Number))
                        throw n.derivativeVariableTypeError(a._symbol, p.extractScalarValueTypes(g, [Ke]));
                    var Je = void 0
                      , Qe = void 0;
                    if ((rt = g.getInstruction(Ke)).type === u.LoadArg && rt.valueType === s.Number)
                        Je = e,
                        Qe = Ke;
                    else {
                        var Xe = i.childScope(v);
                        Qe = g.SymbolicVar(rt.valueType),
                        i.setSymbol(Xe, a._symbol, Qe);
                        var Ye = Object.create(y);
                        Ye[a._symbol] = S.FRAME_SENTINEL,
                        Je = A(c, Ye, g, Xe, T)
                    }
                    for (var Ze = 1; "Derivative" === a.args[0].type && a.args[0]._symbol === a._symbol; )
                        Ze += 1,
                        a = a.args[0];
                    for (var $e = f.fuseBroadcast(g, C(Je, a.args[0])), et = 0; et < Ze; et++)
                        $e = m.takeDerivative(g, $e, Qe);
                    return Qe === Ke ? $e : h.substitute(g, Ke, Qe, $e);
                case "Prime":
                    var tt;
                    if (!y[(tt = a.args[0])._symbol])
                        throw n.functionNotDefined(tt._symbol);
                    var rt;
                    Ke = C(e, tt.args[0]),
                    Qe = void 0;
                    Qe = (rt = g.getInstruction(Ke)).type === u.LoadArg && rt.valueType === s.Number ? Ke : g.SymbolicVar(rt.valueType);
                    Q = void 0;
                    if ("logbase" === tt._symbol) {
                        if (2 !== tt.args.length)
                            throw n.primedFunctionArity();
                        Q = [Qe, C(e, tt.args[1])]
                    } else {
                        if (1 !== tt.args.length)
                            throw n.primedFunctionArity();
                        Q = [Qe]
                    }
                    $e = f.fuseBroadcast(g, P(e, tt._symbol, tt._errorSymbol, Q));
                    for (var nt = 0; nt < a.order; nt++)
                        $e = m.takeDerivative(g, $e, Qe);
                    return Qe === Ke ? $e : h.substitute(g, Ke, Qe, $e);
                case "Slider":
                    return e.chunk.Constant(a.getConcreteTree(c, y).asCompilerValue());
                case "Assignment":
                    return C(e, a._expression);
                case "FunctionDefinition":
                    for (var it = 0; it < a._argSymbols.length; it++) {
                        if (y[a._argSymbols[it]])
                            throw n.parameterAlreadyDefined(a._argSymbols[it]);
                        if (a._argSymbols[it] === a._symbol)
                            throw n.parameterAlreadyDefined(a._argSymbols[it])
                    }
                    return C(e, a._expression);
                default:
                    throw new Error("Programming error, unimplemented node type " + a.type)
                }
            }(A(g, v, T, E, a), a),
            !F(a, x)) {
                var R = T.getInstruction(c);
                R.type === u.BroadcastResult && R.isConstantBroadcast && (c = f.fuseBroadcast(T, c))
            }
            O(e, a, c = N(e, y, c))
        }
        return e.chunk.returnIndex = c,
        c
    }
    function N(e, t, r) {
        var n = e.chunk
          , i = e.scope;
        if (r <= t)
            return r;
        var a = n.getInstruction(r);
        return d.isConstant(a) ? (n.truncate(Math.max(t, i.maxIndex + 1)),
        T.copyInstruction(n, a)) : r
    }
    function F(e, t) {
        if (!t)
            return !1;
        if (!e.getScope || !t.getScope)
            return !1;
        var n = t.getScope().dependencies
          , i = e.getScope().dependencies;
        if (i.length === n.length)
            return !0;
        for (var a = 0, s = 0, o = i; s < o.length; s++) {
            var u = o[s];
            r[u] || (a += 1)
        }
        for (var c = 0, l = 0, d = n; l < d.length; l++) {
            u = d[l];
            r[u] || (c += 1)
        }
        return a === c
    }
    function O(e, t, r) {
        var n = e.frame
          , i = e.chunk
          , a = e.parentNode
          , s = i.getInstruction(r);
        if (d.isConstant(s) && !F(t, a)) {
            var o = S.getCacheKeys(n, t);
            o && (I.markCacheWrite(),
            t.__IRCache = {
                keys: o,
                instruction: s
            })
        }
    }
    function _(e, t) {
        if (!t.__IRCache)
            return !1;
        for (var r = 0, n = t.__IRCache.keys; r < n.length; r++) {
            var i = n[r]
              , a = i[0]
              , s = i[1];
            if (e[a] !== s)
                return !1
        }
        return !0
    }
    function D(e, t) {
        return [C(e, t[0]), C(e, t[1])]
    }
    function B(e, t) {
        for (var r = [], n = 0, i = t; n < i.length; n++) {
            var a = i[n];
            r.push(C(e, a))
        }
        return r
    }
    function P(e, a, m, h, b) {
        var T = e.policy
          , L = e.frame
          , I = e.chunk
          , w = e.scope
          , E = e.parentNode
          , x = i.getSymbol(w, a);
        if (void 0 !== x) {
            if (1 == h.length)
                return I.Multiply([x, h[0]]);
            throw I.getInstruction(x).type === u.LoadArg ? n.functionNotDefined(m) : I.getInstruction(x).valueType === s.Distribution ? n.distributionAsFunction(m) : n.variableAsFunction(m)
        }
        var N = L[a];
        if (N && N.isError)
            throw N;
        if (void 0 === N || !N.isFunction) {
            if (r[a] && r[a].isFunction) {
                if ("logbase" === a && L.ln && L.log)
                    throw n.logbaseUnsupported();
                throw n.functionUnsupported(m)
            }
            if (N) {
                var F = C(e, N);
                if (I.getInstruction(F).valueType === s.Distribution)
                    throw n.distributionAsFunction(m)
            }
            if (1 == h.length)
                return I.Multiply([C(e, t.Identifier(a)), h[0]]);
            throw N ? n.variableAsFunction(m) : new Error("Programming Error: reached undefined symbol " + a)
        }
        if ("FunctionDefinition" === N.type) {
            if (b && void 0 !== b.dotLHSIndex)
                throw n.illegalDotCall(m);
            if (h.length !== N._argSymbols.length)
                throw n.wrongArity(m, N._argSymbols.length, h.length);
            for (var O = i.childScope(w), _ = Object.create(L), D = 0; D < N._argSymbols.length; D++)
                i.setSymbol(O, N._argSymbols[D], h[D]),
                _[N._argSymbols[D]] = S.FRAME_SENTINEL;
            return C(A(T, _, I, O, E), N._expression)
        }
        if (c.CompilerFunctionTable.hasOwnProperty(a))
            return function(e, t, r, i, a) {
                var m = e.chunk
                  , h = !(!a || void 0 === a.dotLHSIndex)
                  , b = c.CompilerFunctionTable[t];
                if (b.fallthroughUnlessDistribution && (0 === i.length || m.getInstruction(i[0]).valueType === s.EmptyList || !s.isTypeOrListOfType(m.getInstruction(i[0]).valueType, s.Distribution)))
                    return k(e, t, r, i, a);
                var T = b.minArity
                  , L = b.maxArity
                  , S = b.allowDotCall;
                if (a && void 0 !== a.dotLHSIndex) {
                    if (!S)
                        throw n.illegalDotCall(r);
                    R(m, a.dotLHSIndex, "." + r)
                }
                var I, w = i.length;
                if (w < T)
                    throw function(e, t, r, i, a) {
                        var s = a.isDotCall;
                        s && (r -= 1,
                        i -= 1,
                        t = "." + t);
                        var o = c.CompilerFunctionTable[e];
                        o.isSeeded && (r -= 1,
                        i -= 1);
                        var u = void 0;
                        s && o.dotMinArityExampleArgs ? u = t + o.dotMinArityExampleArgs : o.minArityExampleArgs && (u = t + o.minArityExampleArgs);
                        switch (e) {
                        case "pdf":
                            return s ? n.wrongArity(t, r, i, u) : n.pdfWrongArity();
                        case "cdf":
                            return s ? n.wrongArity(t, r, i, u) : n.cdfRequiresArguments();
                        case "tdist":
                            return n.tdistWrongArity();
                        case "random":
                            return n.randomArity();
                        case "round":
                        case "midpoint":
                        case "normaldist":
                        case "poissondist":
                        case "binomialdist":
                        case "uniformdist":
                        case "mean":
                        case "median":
                        case "stdev":
                        case "var":
                        case "quantile":
                        case "sort":
                        case "shuffle":
                        case "join":
                        case "unique":
                        case "polygon":
                            return n.wrongArity(t, r, i, u);
                        case "histogram":
                        case "dotplot":
                        case "boxplot":
                        case "ttest":
                        case "ittest":
                        case "stats":
                        case "det":
                        case "inv":
                        case "transpose":
                        case "rref":
                        case "trace":
                            throw n.parseError();
                        default:
                            throw new Error("Unexpected compiler function " + e)
                        }
                    }(t, r, T, w, {
                        isDotCall: h
                    });
                if (w > L)
                    throw function(e, t, r, i, a) {
                        var s = a.isDotCall;
                        s && (r -= 1,
                        i -= 1,
                        t = "." + t);
                        var o = c.CompilerFunctionTable[e];
                        o.isSeeded && (r -= 1,
                        i -= 1);
                        var u = void 0;
                        s && o.dotMaxArityExampleArgs ? u = t + o.dotMaxArityExampleArgs : o.maxArityExampleArgs && (u = t + o.maxArityExampleArgs);
                        switch (e) {
                        case "pdf":
                            return s ? n.wrongArity(t, r, i, u) : n.pdfWrongArity();
                        case "cdf":
                            return s ? n.wrongArity(t, r, i, u) : n.cdfTooManyArguments();
                        case "tdist":
                            return n.tdistWrongArity();
                        case "random":
                            return n.randomArity();
                        case "round":
                        case "midpoint":
                        case "normaldist":
                        case "poissondist":
                        case "binomialdist":
                        case "uniformdist":
                        case "mean":
                        case "median":
                        case "stdev":
                        case "var":
                        case "quantile":
                        case "sort":
                        case "shuffle":
                        case "join":
                        case "unique":
                        case "polygon":
                            return n.wrongArity(t, r, i, u);
                        case "histogram":
                        case "dotplot":
                        case "boxplot":
                        case "ttest":
                        case "ittest":
                        case "stats":
                        case "det":
                        case "inv":
                        case "transpose":
                        case "rref":
                        case "trace":
                            throw n.parseError();
                        default:
                            throw new Error("Unexpected compiler function " + e)
                        }
                    }(t, r, L, w, {
                        isDotCall: h
                    });
                if ("cdf" === t)
                    I = 2 === w ? [i[0], m.Constant(-1 / 0), i[1]] : i;
                else if ("random" === t)
                    if (1 === w || w < 4 && !s.isList(m.getInstruction(i[1]).valueType) && m.getInstruction(i[1]).valueType !== s.Distribution) {
                        var A = m.Distribution("uniformdist", [m.Constant(0), m.Constant(1)]);
                        I = [i[0], A].concat(i.slice(1))
                    } else
                        I = i;
                else
                    I = M(m, i, b);
                switch (t) {
                case "round":
                    if (1 === I.length)
                        return m.SyntheticNativeFunction("round", I);
                    if (!p.argIsTypeOrListOfType(m, I[0], s.Number) || !p.argIsTypeOrListOfType(m, I[1], s.Number))
                        throw n.functionTypeError(r, p.extractScalarValueTypes(m, I));
                    var E = m.SyntheticNativeFunction("round", [I[1]])
                      , x = m.RawExponent([m.Constant(10), E]);
                    return m.Divide([m.SyntheticNativeFunction("round", [m.Multiply([I[0], x])]), x]);
                case "midpoint":
                    if (!p.argIsTypeOrListOfType(m, I[0], s.Point) || !p.argIsTypeOrListOfType(m, I[1], s.Point))
                        throw n.functionTypeError(r, p.extractScalarValueTypes(m, I));
                    var C = m.Constant(o.maybeRational(1, 2));
                    return m.Multiply([C, m.Add(I)]);
                case "normaldist":
                case "tdist":
                case "poissondist":
                case "binomialdist":
                case "uniformdist":
                    for (var N = 0, F = I; N < F.length; N++) {
                        var O = F[N];
                        if (!p.argIsTypeOrListOfType(m, O, s.Number))
                            throw n.functionTypeError(r, p.extractScalarValueTypes(m, i))
                    }
                    return m.Distribution(t, I);
                case "pdf":
                case "cdf":
                case "mean":
                case "median":
                case "stdev":
                case "var":
                case "quantile":
                    var _ = I[0]
                      , D = m.getInstruction(_);
                    if (!s.isTypeOrListOfType(D.valueType, s.Distribution))
                        throw n.functionTypeError(r, p.extractScalarValueTypes(m, i));
                    for (var B = I.slice(1), P = 0, V = B; P < V.length; P++) {
                        O = V[P];
                        if (!s.isTypeOrListOfType(m.getInstruction(O).valueType, s.Number))
                            throw n.functionTypeError(r, p.extractScalarValueTypes(m, i))
                    }
                    if (s.isList(D.valueType)) {
                        for (var U = [], H = 1 / 0, j = 0, z = I; j < z.length; j++) {
                            O = z[j];
                            var W = f.fuseBroadcast(m, O);
                            U.push(W);
                            var G = m.getInstruction(W);
                            if (s.isList(G.valueType)) {
                                if (void 0 === (se = l.getConstantListLength(m, W)))
                                    throw n.variableLengthDistributionList(g.findDependencySymbols(m, W));
                                H = Math.min(H, se)
                            }
                        }
                        for (var K = [], J = 0; J < H; J++) {
                            var Q = v.elementAt(m, U[0], J)
                              , X = m.getInstruction(Q);
                            if (X.type !== u.Distribution)
                                throw n.parseError();
                            for (var Y = [], Z = 0, $ = U.slice(1); Z < $.length; Z++) {
                                O = $[Z];
                                s.isList(m.getInstruction(O).valueType) ? Y.push(v.elementAt(m, O, J)) : Y.push(O)
                            }
                            K.push(y.DistributionTable[X.symbol][t](m, Q, Y))
                        }
                        return m.List(K)
                    }
                    if (D.type !== u.Distribution)
                        throw n.parseError();
                    return y.DistributionTable[D.symbol][t](m, _, B);
                case "random":
                    var ee = I[0]
                      , te = (_ = I[1],
                    m.getInstruction(I[0]));
                    D = m.getInstruction(_);
                    if (te.valueType !== s.SeedType)
                        throw n.parseError();
                    if (D.valueType === s.ListOfDistribution)
                        throw n.randomFromBroadcastDistribution();
                    var re = void 0;
                    if (s.isList(D.valueType))
                        re = y.randomSampleFromList;
                    else {
                        if (D.valueType !== s.Distribution)
                            throw n.randomArity();
                        if (D.type !== u.Distribution)
                            throw n.parseError();
                        re = y.DistributionTable[D.symbol][t]
                    }
                    if (I.length > 2) {
                        var ne = I[2];
                        if (m.getInstruction(ne).valueType !== s.Number)
                            throw n.randomArity();
                        if (4 === I.length) {
                            var ie = m.getInstruction(I[3]);
                            if (ie.valueType !== s.Number)
                                throw n.randomArity();
                            if (!d.isConstant(ie))
                                throw n.variableSeed(g.findDependencySymbols(m, I[3]));
                            ee = m.ExtendSeed("us", [ee, I[3]])
                        }
                        var ae = m.Constant(1)
                          , se = m.SyntheticNativeFunction("round", [m.SyntheticNativeFunction("validateSampleCount", [ne])])
                          , oe = m.BeginBroadcast([se]);
                        ee = m.ExtendSeed("lc", [ee, m.Subtract([oe, ae])]);
                        var ue = re(m, _, [ee])
                          , ce = m.EndBroadcast([oe, ue]);
                        return m.BroadcastResult(s.listType(m.getInstruction(ue).valueType), [ce])
                    }
                    return re(m, _, [ee]);
                case "shuffle":
                    ee = I[0];
                    var le = I[1]
                      , de = I[2];
                    if (!s.isList(m.getInstruction(le).valueType) || void 0 !== de && m.getInstruction(de).valueType !== s.Number)
                        throw n.functionTypeError(r, p.extractValueTypes(m, i.slice(1)));
                    if (void 0 !== de) {
                        if (!d.isConstant(m.getInstruction(de)))
                            throw n.variableSeed(g.findDependencySymbols(m, de));
                        ee = m.ExtendSeed("us", [ee, de])
                    }
                    return m.SyntheticNativeFunction("shuffle", [ee, le]);
                case "sort":
                    var pe = 2 === I.length ? I[1] : I[0]
                      , ye = m.getInstruction(pe);
                    if (!s.isList(m.getInstruction(I[0]).valueType) || ye.valueType !== s.ListOfNumber && ye.valueType !== s.EmptyList)
                        throw n.functionTypeError(r, p.extractValueTypes(m, i));
                    if (0 === l.getConstantListLength(m, pe))
                        return pe;
                    var fe = m.SyntheticNativeFunction("min", [l.listLengthIndex(m, I[0]), l.listLengthIndex(m, pe)]);
                    return pe = m.ListAccess([pe, q(e, m.List([m.Constant(1)]), m.List([fe]), {
                        stepMustBePositive: !0
                    })]),
                    m.SyntheticNativeFunction("elementsAt", [I[0], m.SyntheticNativeFunction("sortPerm", [pe])]);
                case "join":
                    for (var ge = [], ve = !0, me = 0, he = I; me < he.length; me++) {
                        O = he[me];
                        var be = m.getInstruction(O);
                        d.isConstantOrConstantBroadcast(be) || (ve = !1);
                        var Te = be.valueType;
                        if (Te !== s.EmptyList)
                            if (s.isList(Te))
                                ge.push({
                                    isList: !0,
                                    index: O,
                                    elementType: s.elementType(Te)
                                });
                            else {
                                if (!s.hasListType(Te))
                                    throw n.functionTypeError(r, p.extractValueTypes(m, i));
                                ge.push({
                                    isList: !1,
                                    index: O,
                                    elementType: Te
                                })
                            }
                    }
                    if (0 === ge.length)
                        return m.ConstantOfType(s.EmptyList, []);
                    for (var Le = 0, Se = ge; Le < Se.length; Le++) {
                        if ((Ee = Se[Le]).elementType !== ge[0].elementType)
                            throw n.functionTypeError(r, p.extractValueTypes(m, i))
                    }
                    if (ve) {
                        for (var Ie = [], we = 0, Ae = ge; we < Ae.length; we++) {
                            var Ee = Ae[we]
                              , xe = m.getInstruction(f.fuseBroadcast(m, Ee.index));
                            d.assertConstant(xe),
                            Ee.isList ? Ie.push.apply(Ie, xe.value) : Ie.push(xe.value)
                        }
                        return m.ConstantOfType(s.listType(ge[0].elementType), Ie)
                    }
                    for (var Ce = m.Constant(0), Ne = m.Constant(1), Fe = {}, Oe = 0, _e = ge; Oe < _e.length; Oe++) {
                        (Ee = _e[Oe]).isList && void 0 === Fe[Ee.index] && (Fe[Ee.index] = l.listLengthIndex(m, Ee.index))
                    }
                    for (var De = m.SyntheticNativeFunction("total", ge.map(function(e) {
                        return e.isList ? Fe[e.index] : Ne
                    })), Be = (oe = m.BeginBroadcast([De]),
                    Ce), Pe = [], Re = [], ke = 0, Me = ge; ke < Me.length; ke++) {
                        var Ve = (Ee = Me[ke]).isList ? m.ListAccess([Ee.index, m.Subtract([oe, Be])]) : Ee.index;
                        if (Re.push(Ve),
                        Ee !== ge[ge.length - 1]) {
                            se = Ee.isList ? Fe[Ee.index] : Ne;
                            Be = m.Add([Be, se]),
                            Pe.push(m.LessEqual([oe, Be]))
                        }
                    }
                    var Ue = Re[Re.length - 1];
                    for (J = Re.length - 2; J >= 0; J--)
                        Ue = m.Piecewise([Pe[J], Re[J], Ue]);
                    ce = m.EndBroadcast([oe, Ue]);
                    return m.BroadcastResult(s.listType(ge[0].elementType), [ce]);
                case "unique":
                    var qe = I[0]
                      , He = m.getInstruction(qe);
                    if (!s.isList(He.valueType) || He.valueType === s.ListOfDistribution)
                        throw n.functionTypeError("unique", [s.prettyPrint(He.valueType)]);
                    return m.SyntheticNativeFunction("elementsAt", [qe, m.SyntheticNativeFunction("uniquePerm", [qe])]);
                case "polygon":
                    var je = void 0
                      , ze = I.map(function(e) {
                        return m.getInstruction(e)
                    });
                    if (1 === ze.length) {
                        if ((He = ze[0]).valueType !== s.ListOfPoint)
                            throw n.polygonListTypeError([s.prettyPrint(He.valueType)]);
                        je = I[0]
                    } else if (2 === ze.length && s.isTypeOrListOfType(ze[0].valueType, s.Number) && s.isTypeOrListOfType(ze[1].valueType, s.Number)) {
                        if (ze[0].valueType === s.Number && ze[1].valueType === s.Number)
                            throw n.polygonTwoNumbersError();
                        je = m.OrderedPair(I)
                    } else {
                        if (!ze.every(function(e) {
                            return e.valueType === s.Point
                        }))
                            throw n.polygonPointArgsError();
                        je = m.List(I)
                    }
                    return m.SyntheticNativeFunction("polygon", [je]);
                case "histogram":
                case "dotplot":
                case "boxplot":
                case "ttest":
                case "ittest":
                case "stats":
                case "det":
                case "inv":
                case "transpose":
                case "rref":
                case "trace":
                    throw n.unexpectedSymbol(r);
                default:
                    throw new Error("Programming Error: unexpected compiler function " + t)
                }
            }(e, a, m, h, b);
        if (c.BuiltInTable.hasOwnProperty(a))
            return k(e, a, m, h, b);
        throw n.functionUnsupported(m)
    }
    function R(e, t, r) {
        var i = e.getInstruction(t).valueType;
        if (!s.isList(i) && i !== s.Distribution)
            throw n.dotLHSTypeError(r, s.prettyPrint(i))
    }
    function k(e, r, i, a, s) {
        var o = e.chunk
          , u = c.BuiltInTable[r]
          , l = !(!s || void 0 === s.dotLHSIndex)
          , d = a.length
          , p = u.minArity
          , y = u.maxArity
          , f = u.allowDotCall;
        if (s && void 0 !== s.dotLHSIndex) {
            if (!f)
                throw n.illegalDotCall(i);
            R(o, s.dotLHSIndex, "." + i)
        }
        if ("logbase" === r && 2 !== d)
            throw n.wrongArity(i, 1, d - 1);
        if (d > y)
            throw l && (p -= 1,
            y -= 1,
            d -= 1,
            i = "." + i),
            "doubleReducer" === u.tag ? n.wrongDoubleReducerArity(i) : "parameterizedReducer" === u.tag ? n.wrongParameterizedReducerArity(i) : "color" === u.tag ? n.colorArity(i) : n.wrongArity(i, y, d);
        if (d < p)
            throw l && (p -= 1,
            y -= 1,
            d -= 1,
            i = "." + i),
            "reducer" === u.tag && 0 === d ? n.zeroArgReducer(i) : "doubleReducer" === u.tag ? n.wrongDoubleReducerArity(i) : "parameterizedReducer" === u.tag ? n.wrongParameterizedReducerArity(i) : "color" === u.tag ? n.colorArity(i) : n.wrongArity(i, p, d);
        var g = M(o, a, u)
          , v = {
            errorSymbol: i,
            providedArity: d,
            isDotCall: l
        };
        switch (u.tag) {
        case "default":
        case "reducer":
        case "doubleReducer":
        case "parameterizedReducer":
        case "color":
        case "never-broadcast":
            return o.NativeFunction(r, v, g);
        case "trig":
            var m = C(e, t.Identifier("trigAngleMultiplier"))
              , h = o.Multiply([g[0], m]);
            return o.NativeFunction(r, v, [h]);
        case "inverseTrig":
            m = C(e, t.Identifier("trigAngleMultiplier"));
            var b = o.NativeFunction(r, v, g);
            return o.Divide([b, m]);
        default:
            var T = u.tag;
            throw new Error("Programming Error: unexpected tag " + T)
        }
    }
    function M(e, t, r) {
        var n = r.minArity
          , i = r.defaultArguments;
        if (!i)
            return t;
        if (!(t.length - n < i.length))
            return t;
        for (var a = t.slice(); a.length - n < i.length; )
            a.push(e.copyInstruction(i[a.length - n]));
        return a
    }
    function V(e, t) {
        for (var r = e.chunk, i = [], a = [], s = 0, o = t; s < o.length; s++) {
            var c = o[s]
              , l = r.getInstruction(c);
            switch (l.type) {
            case u.Action:
                Array.prototype.push.apply(i, l.symbols),
                Array.prototype.push.apply(a, l.args);
                break;
            case u.Constant:
                var d = l.value.updateRules;
                for (var p in d)
                    i.push(p),
                    a.push(r.ConstantOfType(d[p].valueType, d[p].value));
                break;
            default:
                var y = g.findDependencySymbols(r, c);
                throw y.length > 0 ? n.actionMergeFreeVariable(y) : n.parseError()
            }
        }
        return r.Action(i, a)
    }
    function U(e, t) {
        var r = e.frame[t];
        return e.policy.assignmentForbidden(t) ? n.updateRuleIllegalLHS(t) : r === S.FRAME_SENTINEL ? n.updateRuleLocalLHS(t) : r && "FunctionDefinition" === r.type ? n.updateRuleFunctionLHS(t) : n.updateRuleUndefinedLHS(t).allowExport()
    }
    function q(e, t, r, i) {
        var a, o = i.stepMustBePositive, u = e.chunk, c = u.getInstruction(t), d = u.getInstruction(r), p = l.assertConstantListLength(u, t, "Programming error: expected range start list to have constant length."), y = l.assertConstantListLength(u, r, "Programming error: expected range start list to have constant length.");
        if (c.valueType !== s.ListOfNumber || d.valueType !== s.ListOfNumber)
            throw n.nonArithmeticRange();
        var f = u.Constant(1)
          , g = u.Constant(0)
          , v = u.ListAccess([t, f])
          , m = u.ListAccess([t, u.Constant(2)])
          , h = u.ListAccess([r, u.Constant(y)])
          , b = u.Subtract([h, v])
          , T = p > 1 ? u.Subtract([m, v]) : u.Piecewise([u.GreaterEqual([b, g]), f, u.Constant(-1)])
          , L = u.Add([f, u.SyntheticNativeFunction("round", [u.Divide([b, T])])])
          , S = u.SyntheticNativeFunction("validateRangeLength", [t, r, T, L]);
        o && (S = u.Piecewise([u.GreaterEqual([T, g]), S, g]));
        var I = u.BeginBroadcast([S])
          , w = u.Add([v, u.Multiply([T, u.Subtract([I, f])])])
          , A = u.EndBroadcast([I, w]);
        return u.addComments(((a = {})[v] = "start",
        a[m] = "second",
        a[h] = "last",
        a[L] = "proposedLength",
        a[T] = "step",
        a[w] = "body",
        a)),
        u.BroadcastResult(s.listType(u.getInstruction(w).valueType), [A])
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.isCacheValid = e.maybeCacheIR = e.hasSameUserDependenciesAsParent = e.maybeDropIntermediates = e.addToIR = e.checkForUndefinedUpdateSymbols = e.buildIR = e.buildIRContext = e.Ctx = void 0,
    e.Ctx = A,
    e.buildIRContext = E,
    e.buildIR = function(e, t) {
        var r = e.policy
          , n = e.frame
          , i = e.argNames
          , a = e.argTypes
          , o = S.analyzeDependencies(n, t)
          , u = o.freeDependencies
          , c = o.updateSymbols;
        if (i || (i = u),
        !a) {
            a = [];
            for (var l = 0; l < i.length; l++)
                a.push(s.Number)
        }
        var d = E({
            policy: r,
            frame: n,
            argNames: i,
            argTypes: a
        });
        return C(d, t),
        e.wrapInList && !s.isList(d.chunk.getReturnType()) && d.chunk.List([d.chunk.returnIndex]),
        d.chunk.close(),
        x(d, t, c),
        d.chunk
    }
    ,
    e.checkForUndefinedUpdateSymbols = x,
    e.addToIR = C,
    e.maybeDropIntermediates = N,
    e.hasSameUserDependenciesAsParent = F,
    e.maybeCacheIR = O,
    e.isCacheValid = _
});
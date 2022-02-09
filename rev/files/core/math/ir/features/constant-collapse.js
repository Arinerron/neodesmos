define('core/math/ir/features/constant-collapse', ["require", "exports", "../opcodes", "../instructions", "core/math/types", "core/math/maybe-rational", "./depends-on-outer-variable", "./is-constant", "./as-value", "./reconstitute-ir", "./list-length", "./contains-nan-value", "./interpret", "./fuse-broadcast", "./element-at", "../../builtin"], function(require, t, n, e, r, s, a, o, u, i, c, p, l, g, I, v) {
    "use strict";
    function y(t, n) {
        for (var e = [], r = 0, s = n; r < s.length; r++) {
            var a = s[r]
              , u = t.getInstruction(a);
            if (!o.isConstant(u))
                return;
            e.push(u.value)
        }
        return e
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.constantCollapse = void 0,
    t.constantCollapse = function(t) {
        if (t.instructionsLength() - 1 !== t.returnIndex)
            throw new Error("Programming Error: only the final instruction in a chunk can be constant collapsed");
        var d = t.getInstruction(t.returnIndex);
        if (e.isLeafInstruction(d))
            return t.returnIndex;
        switch (d.type) {
        case n.Add:
            var C = t.getInstruction(d.args[0])
              , f = t.getInstruction(d.args[1]);
            return C.type === n.Constant && f.type === n.Constant ? (t.popInstruction(),
            t.Constant(l.Add(C.value, f.value))) : C.type === n.Constant && 0 === s.asFloat(C.value) ? (t.popInstruction(),
            d.args[1]) : f.type === n.Constant && 0 === s.asFloat(f.value) ? (t.popInstruction(),
            d.args[0]) : t.returnIndex;
        case n.Subtract:
            C = t.getInstruction(d.args[0]),
            f = t.getInstruction(d.args[1]);
            return C.type === n.Constant && f.type === n.Constant ? (t.popInstruction(),
            t.Constant(l.Subtract(C.value, f.value))) : C.type === n.Constant && 0 === s.asFloat(C.value) ? (t.popInstruction(),
            t.Negative([d.args[1]])) : f.type === n.Constant && 0 === s.asFloat(f.value) ? (t.popInstruction(),
            d.args[0]) : t.returnIndex;
        case n.Multiply:
            C = t.getInstruction(d.args[0]),
            f = t.getInstruction(d.args[1]);
            return C.type === n.Constant && f.type === n.Constant ? (t.popInstruction(),
            t.Constant(l.Multiply(C.value, f.value))) : C.type === n.Constant && 1 === s.asFloat(C.value) ? (t.popInstruction(),
            d.args[1]) : f.type === n.Constant && 1 === s.asFloat(f.value) ? (t.popInstruction(),
            d.args[0]) : t.returnIndex;
        case n.Divide:
            C = t.getInstruction(d.args[0]),
            f = t.getInstruction(d.args[1]);
            return C.type === n.Constant && f.type === n.Constant ? (t.popInstruction(),
            t.Constant(l.Divide(C.value, f.value))) : f.type === n.Constant && 1 === s.asFloat(f.value) ? (t.popInstruction(),
            d.args[0]) : t.returnIndex;
        case n.Exponent:
            C = t.getInstruction(d.args[0]),
            f = t.getInstruction(d.args[1]);
            if (C.type === n.Constant && f.type === n.Constant)
                return t.popInstruction(),
                t.Constant(l.Exponent(C.value, f.value));
            if (C.type === n.Constant && C.valueType === r.Number) {
                if ((x = s.asFloat(C.value)) === Math.E)
                    return t.popInstruction(),
                    t.SyntheticNativeFunction("exp", [d.args[1]]);
                if (x > 0)
                    return t.popInstruction(),
                    t.RawExponent(d.args)
            }
            if (f.type === n.Constant && f.valueType === r.Number) {
                var x;
                if (1 === (x = s.asFloat(f.value)))
                    return t.popInstruction(),
                    d.args[0];
                if (x === Math.floor(x))
                    return t.popInstruction(),
                    t.RawExponent(d.args);
                if (s.isRational(f.value)) {
                    var h = f.value
                      , T = h.n;
                    if (h.d % 2 == 1) {
                        t.popInstruction();
                        var L = t.RawExponent([t.SyntheticNativeFunction("abs", [d.args[0]]), d.args[1]]);
                        return T % 2 == 0 ? L : t.Multiply([t.SyntheticNativeFunction("sign", [d.args[0]]), L])
                    }
                }
            }
            return t.returnIndex;
        case n.RawExponent:
            C = t.getInstruction(d.args[0]),
            f = t.getInstruction(d.args[1]);
            return C.type === n.Constant && f.type === n.Constant ? (t.popInstruction(),
            t.Constant(l.Exponent(C.value, f.value))) : f.type === n.Constant && 1 === s.asFloat(f.value) ? (t.popInstruction(),
            d.args[0]) : t.returnIndex;
        case n.Negative:
            return (C = t.getInstruction(d.args[0])).type === n.Constant ? (t.popInstruction(),
            t.Constant(l.Negative(C.value))) : t.returnIndex;
        case n.Equal:
            C = t.getInstruction(d.args[0]),
            f = t.getInstruction(d.args[1]);
            return C.type === n.Constant && f.type === n.Constant ? (t.popInstruction(),
            t.ConstantOfType(r.Bool, l.Equal(C.value, f.value))) : t.returnIndex;
        case n.Less:
            C = t.getInstruction(d.args[0]),
            f = t.getInstruction(d.args[1]);
            return C.type === n.Constant && f.type === n.Constant ? (t.popInstruction(),
            t.ConstantOfType(r.Bool, l.Less(C.value, f.value))) : t.returnIndex;
        case n.Greater:
            C = t.getInstruction(d.args[0]),
            f = t.getInstruction(d.args[1]);
            return C.type === n.Constant && f.type === n.Constant ? (t.popInstruction(),
            t.ConstantOfType(r.Bool, l.Greater(C.value, f.value))) : t.returnIndex;
        case n.LessEqual:
            C = t.getInstruction(d.args[0]),
            f = t.getInstruction(d.args[1]);
            return C.type === n.Constant && f.type === n.Constant ? (t.popInstruction(),
            t.ConstantOfType(r.Bool, l.LessEqual(C.value, f.value))) : t.returnIndex;
        case n.GreaterEqual:
            C = t.getInstruction(d.args[0]),
            f = t.getInstruction(d.args[1]);
            return C.type === n.Constant && f.type === n.Constant ? (t.popInstruction(),
            t.ConstantOfType(r.Bool, l.GreaterEqual(C.value, f.value))) : t.returnIndex;
        case n.And:
            C = t.getInstruction(d.args[0]),
            f = t.getInstruction(d.args[1]);
            return C.type === n.Constant && f.type === n.Constant ? (t.popInstruction(),
            t.ConstantOfType(r.Bool, l.And(C.value, f.value))) : t.returnIndex;
        case n.Piecewise:
            return (C = t.getInstruction(d.args[0])).type === n.Constant ? (t.popInstruction(),
            C.value ? d.args[1] : d.args[2]) : t.returnIndex;
        case n.OrderedPairAccess:
            C = t.getInstruction(d.args[0]),
            f = t.getInstruction(d.args[1]);
            return C.type === n.OrderedPair && f.type === n.Constant ? (t.popInstruction(),
            C.args[s.asFloat(f.value) - 1]) : C.type === n.Constant && C.valueType === r.Point && f.type === n.Constant ? (t.popInstruction(),
            t.Constant(C.value[s.asFloat(f.value) - 1])) : t.returnIndex;
        case n.List:
            if (function(t, n) {
                for (var e = 0, r = n; e < r.length; e++) {
                    var s = r[e]
                      , a = t.getInstruction(s);
                    if (!o.isConstant(a))
                        return !1
                }
                return !0
            }(t, d.args)) {
                t.popInstruction();
                for (var E = [], b = 0, A = d.args; b < A.length; b++) {
                    var m = A[b];
                    E.push(t.getInstruction(m).value)
                }
                return t.ConstantOfType(d.valueType, E)
            }
            return t.returnIndex;
        case n.ListAccess:
        case n.InboundsListAccess:
            var O = d.args[0]
              , N = t.getInstruction(O)
              , F = t.getInstruction(d.args[1]);
            if (N.type === n.Piecewise && F.type === n.Constant) {
                var B = d.type === n.ListAccess ? t.ListAccess([N.args[1], d.args[1]]) : t.InboundsListAccess([N.args[1], d.args[1]])
                  , w = d.type === n.ListAccess ? t.ListAccess([N.args[2], d.args[1]]) : t.InboundsListAccess([N.args[2], d.args[1]]);
                return t.Piecewise([N.args[0], B, w])
            }
            if (N.type === n.BroadcastResult) {
                if (F.type === n.Constant && N.isConstantBroadcast && N.valueType !== r.ListOfDistribution)
                    return t.ConstantOfType(d.valueType, l.interpret(t, t.returnIndex));
                t.popInstruction();
                var q = N.args[0]
                  , P = O - q
                  , R = (et = t.getInstruction(q)).args[0]
                  , M = void 0
                  , S = void 0;
                if (d.type === n.InboundsListAccess)
                    M = d.args[1];
                else {
                    var V = c.getConstantListLength(t, O);
                    if (F.type === n.Constant && F.valueType === r.Number && void 0 !== V) {
                        var D = s.asFloat(F.value)
                          , G = Math.floor(D);
                        if (G < 1 || G > V)
                            return t.NanOfType(d.valueType);
                        M = D === G ? d.args[1] : t.Constant(G)
                    } else {
                        var k = t.Constant(1)
                          , _ = t.getInstruction(R).args[0]
                          , j = t.SyntheticNativeFunction("floor", [d.args[1]])
                          , U = t.GreaterEqual([j, k])
                          , W = t.LessEqual([j, _]);
                        M = t.Piecewise([U, t.Piecewise([W, j, _]), k]),
                        S = {
                            one: k,
                            lengthIndex: _,
                            roundedIndex: j,
                            greaterEqualIndex: U,
                            lessEqualIndex: W
                        }
                    }
                }
                if (et.args[P] < R)
                    return et.args[P];
                for (var z = [M], H = R + 1; H <= et.args[P]; H++) {
                    var J = t.getInstruction(H);
                    if (e.isLeafInstruction(J))
                        z.push(t.copyInstruction(J));
                    else {
                        for (var K = [], Q = 0, X = J.args; Q < X.length; Q++) {
                            m = X[Q];
                            K.push(m >= R ? z[m - R] : m)
                        }
                        J.type === n.DeferredListAccess ? z.push(t.InboundsListAccess(K)) : z.push(t.copyInstructionWithArgs(J, K))
                    }
                }
                if (S) {
                    U = S.greaterEqualIndex,
                    W = S.lessEqualIndex,
                    _ = S.lengthIndex,
                    k = S.one;
                    var Y = r.elementType(N.valueType)
                      , Z = t.NanOfType(Y)
                      , $ = z[z.length - 1]
                      , tt = t.And([t.And([U, W]), t.GreaterEqual([_, k])]);
                    return t.Piecewise([tt, $, Z])
                }
                return z[z.length - 1]
            }
            if (F.type === n.Constant && F.valueType === r.Number) {
                if (N.type === n.List) {
                    t.popInstruction();
                    var nt = Math.floor(s.asFloat(F.value)) - 1;
                    return isNaN(nt) || nt < 0 || nt >= N.args.length ? t.NanOfType(d.valueType) : N.args[nt]
                }
                if (N.type === n.Constant) {
                    t.popInstruction();
                    nt = Math.floor(s.asFloat(F.value)) - 1;
                    return isNaN(nt) || nt < 0 || nt >= N.value.length ? t.NanOfType(d.valueType) : t.ConstantOfType(r.elementType(N.valueType), N.value[nt])
                }
                return t.returnIndex
            }
            return t.returnIndex;
        case n.BlockVar:
            var et = t.getInstruction(d.args[0]);
            if (!e.endsBlock(et))
                return t.returnIndex;
            P = t.returnIndex - d.args[0];
            if (a.dependsOnOuterVariable(t, et.args[P], et.args[0]))
                return t.returnIndex;
            var rt = t.copy();
            rt.close();
            E = rt.getCompiledFunction().fn();
            return t.popInstruction(),
            i.reconstituteIR(t, d.valueType, E);
        case n.NativeFunction:
            switch (d.symbol) {
            case "nthroot":
                if (void 0 !== (gt = y(t, d.args)))
                    return t.Constant(s.nthroot(gt[0], gt[1]));
                var st = t.getInstruction(d.args[1]);
                return st.type === n.Constant && st.valueType === r.Number ? t.Exponent([d.args[0], t.Constant(s.reciprocal(st.value))]) : t.returnIndex;
            case "length":
                return void 0 !== (V = c.getConstantListLength(t, d.args[0])) ? (t.popInstruction(),
                t.Constant(V)) : t.returnIndex;
            case "select":
                if (o.isConstant(t.getInstruction(d.args[1]))) {
                    t.popInstruction();
                    var at = u.asValue(t, d.args[1])
                      , ot = [];
                    for (H = 0; H < at.length; H++)
                        at[H] && ot.push(H);
                    return I.elementsAt(t, d.args[0], ot)
                }
                return t.returnIndex;
            case "shuffle":
                var ut = d.args[0];
                N = d.args[1];
                if (void 0 !== (V = c.getConstantListLength(t, N)) && o.isConstant(t.getInstruction(ut))) {
                    t.popInstruction();
                    var it = v.randomPerm(u.asValue(t, ut), V);
                    return I.elementsAt(t, N, it)
                }
                return t.returnIndex;
            case "elementsAt":
                var ct = d.args[0]
                  , pt = d.args[1];
                if (o.isConstant(t.getInstruction(pt))) {
                    t.popInstruction();
                    var lt = u.asValue(t, pt);
                    return I.elementsAt(t, ct, lt)
                }
                return t.returnIndex;
            default:
                var gt;
                return void 0 === (gt = y(t, d.args)) ? t.returnIndex : (t.popInstruction(),
                t.ConstantOfType(d.valueType, l.NativeFunction(d.symbol, gt)))
            }
        case n.ExtendSeed:
            var It = t.getInstruction(d.args[0])
              , vt = t.getInstruction(d.args[1]);
            return o.isConstant(It) && o.isConstant(vt) ? t.ConstantOfType(r.SeedType, l.ExtendSeed(d.tag, u.asValue(t, d.args[0]), u.asValue(t, d.args[1]))) : t.returnIndex;
        case n.OrderedPair:
            C = t.getInstruction(d.args[0]),
            f = t.getInstruction(d.args[1]);
            return C.type === n.Constant && C.valueType === r.Number && f.type === n.Constant && f.valueType === r.Number ? t.ConstantOfType(r.Point, [C.value, f.value]) : t.returnIndex;
        case n.BroadcastResult:
            return void 0 !== (V = c.getConstantListLength(t, t.returnIndex)) && 0 === V ? (t.popInstruction(),
            t.ConstantOfType(d.valueType, [])) : t.returnIndex;
        case n.Action:
            for (var yt = 0, dt = d.args; yt < dt.length; yt++) {
                m = dt[yt];
                if (!o.isConstantOrConstantBroadcast(t.getInstruction(m)))
                    return t.returnIndex
            }
            t.popInstruction();
            var Ct = {};
            for (H = 0; H < d.symbols.length; H++) {
                var ft = d.symbols[H]
                  , xt = t.getInstruction(d.args[H]);
                if (xt.type === n.BroadcastResult && (xt = t.getInstruction(g.fuseBroadcast(t, d.args[H]))),
                xt.type !== n.Constant)
                    throw new Error("Expected instruction to be constant");
                var ht = xt.valueType;
                E = xt.value;
                p.containsNanValue(ht, E) || (Ct[ft] = {
                    value: E,
                    valueType: ht
                })
            }
            return t.ConstantOfType(r.Action, {
                type: "Action",
                updateRules: Ct
            });
        case n.EndLoop:
        case n.EndIntegral:
        case n.BeginBroadcast:
        case n.EndBroadcast:
        case n.DeferredListAccess:
        case n.Distribution:
        case n.BeginIntegral:
        case n.BeginLoop:
            return t.returnIndex;
        default:
            throw new Error("Unexpected opcode " + d.type)
        }
    }
});
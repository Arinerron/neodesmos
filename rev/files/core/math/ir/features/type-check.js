define('core/math/ir/features/type-check', ["require", "exports", "core/math/errormsg", "../opcodes", "core/math/types", "../builtin-table", "../instructions"], function(require, e, r, t, a, s, n) {
    "use strict";
    function i(e, r) {
        for (var t = [], s = 0, n = r; s < n.length; s++) {
            var i = n[s];
            t.push(a.prettyPrint(e.getInstruction(i).valueType))
        }
        return t
    }
    function u(e, r, t) {
        for (var s = 0; s < r.length; s++) {
            var n = e.getInstruction(r[s]).valueType
              , i = t[s];
            if (!a.isSubType(n, i))
                return !1
        }
        return !0
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.typeCheck = e.argIsTypeOrListOfType = e.argTypesMatch = e.extractScalarValueTypes = e.extractValueTypes = void 0,
    e.extractValueTypes = i,
    e.extractScalarValueTypes = function(e, r) {
        for (var t = [], s = 0, n = r; s < n.length; s++) {
            var i = n[s]
              , u = e.getInstruction(i).valueType
              , o = a.isList(u) ? a.elementType(u) : u;
            t.push(a.prettyPrint(o))
        }
        return t
    }
    ,
    e.argTypesMatch = u,
    e.argIsTypeOrListOfType = function(e, r, t) {
        return a.isTypeOrListOfType(e.getInstruction(r).valueType, t)
    }
    ,
    e.typeCheck = function(e, o) {
        var c = e.getInstruction(o);
        if (!n.isLeafInstruction(c))
            switch (c.type) {
            case t.Add:
                var p = [a.Number, a.Number];
                if (!u(e, c.args, p))
                    throw r.addTypeError(i(e, c.args));
                return;
            case t.Subtract:
                p = [a.Number, a.Number];
                if (!u(e, c.args, p))
                    throw r.subtractTypeError(i(e, c.args));
                return;
            case t.Multiply:
                p = [a.Number, a.Number];
                if (!u(e, c.args, p))
                    throw r.multiplyTypeError(i(e, c.args));
                return;
            case t.Divide:
                p = [a.Number, a.Number];
                if (!u(e, c.args, p))
                    throw r.divideTypeError(i(e, c.args));
                return;
            case t.Exponent:
            case t.RawExponent:
                p = [a.Number, a.Number];
                if (!u(e, c.args, p))
                    throw r.exponentTypeError(i(e, c.args));
                return;
            case t.Negative:
                p = [a.Number];
                if (!u(e, c.args, p))
                    throw r.negativeTypeError(i(e, c.args));
                return;
            case t.Equal:
            case t.Less:
            case t.Greater:
            case t.LessEqual:
            case t.GreaterEqual:
                p = [a.Number, a.Number];
                if (!u(e, c.args, p))
                    throw r.comparatorTypeError(i(e, c.args));
                return;
            case t.And:
                p = [a.Bool, a.Bool];
                if (!u(e, c.args, p))
                    throw r.andTypeError(i(e, c.args));
                return;
            case t.Piecewise:
                if (e.getInstruction(c.args[0]).valueType !== a.Bool)
                    throw r.piecewiseConditionTypeError(i(e, c.args));
                if (!a.isSubType(e.getInstruction(c.args[1]).valueType, c.valueType) || !a.isSubType(e.getInstruction(c.args[2]).valueType, c.valueType))
                    throw r.piecewiseBranchTypeError([a.prettyPrint(e.getInstruction(c.args[1]).valueType), a.prettyPrint(e.getInstruction(c.args[2]).valueType)]);
                return;
            case t.OrderedPair:
                for (var g = 0, y = c.args; g < y.length; g++) {
                    var l = y[g];
                    if ((m = e.getInstruction(l).valueType) !== a.Number)
                        throw r.pointTypeError(a.prettyPrint(m))
                }
                return;
            case t.OrderedPairAccess:
                p = [a.Point, a.Number];
                if (!u(e, c.args, p))
                    throw r.orderedPairAccessTypeError(i(e, c.args));
                return;
            case t.BeginIntegral:
                var T = e.getInstruction(c.args[0]).valueType
                  , v = e.getInstruction(c.args[1]).valueType;
                if (T !== a.Number)
                    throw r.integralLowerBoundTypeError([a.prettyPrint(T)]);
                if (v !== a.Number)
                    throw r.integralUpperBoundTypeError([a.prettyPrint(v)]);
                return;
            case t.EndIntegral:
                var f = e.getInstruction(c.args[1]).valueType;
                if (f !== a.Number)
                    throw r.integralArgumentTypeError([a.prettyPrint(f)]);
                return;
            case t.List:
                if (0 === c.args.length)
                    return;
                var d = e.getInstruction(c.args[0]).valueType;
                if (!a.hasListType(d))
                    throw r.listTypeError([a.prettyPrint(d)]);
                for (var h = 0, b = c.args; h < b.length; h++) {
                    l = b[h];
                    var m = e.getInstruction(l).valueType;
                    if (!a.hasListType(m))
                        throw r.listTypeError([a.prettyPrint(m)]);
                    if (m !== d)
                        throw r.heterogeneousList()
                }
                return;
            case t.ListAccess:
            case t.DeferredListAccess:
            case t.InboundsListAccess:
                var w = e.getInstruction(c.args[0]).valueType
                  , I = a.isList(w)
                  , E = e.getInstruction(c.args[1]).valueType === a.Number;
                if (!I || !E)
                    throw r.indexTypeError(i(e, c.args));
                return;
            case t.NativeFunction:
                var L = c.args
                  , N = c.symbol
                  , P = s.BuiltInTable[N]
                  , B = (p = P.argumentTypes,
                c.callData.errorSymbol);
                if (!u(e, c.args, p)) {
                    if ("doubleReducer" === P.tag) {
                        if (!a.isList(e.getInstruction(L[0]).valueType) || !a.isList(e.getInstruction(L[1]).valueType))
                            throw r.nonListDoubleReducer(B)
                    } else if ("parameterizedReducer" === P.tag && !a.isList(e.getInstruction(L[0]).valueType))
                        throw r.nonListParameterizedReducer(B);
                    var O = L;
                    throw r.functionTypeError(B, i(e, O))
                }
                return;
            case t.ExtendSeed:
                if (e.getInstruction(c.args[0]).valueType !== a.SeedType || e.getInstruction(c.args[1]).valueType !== a.SeedType && e.getInstruction(c.args[1]).valueType !== a.Number)
                    throw r.parseError();
                return;
            case t.Action:
                for (var x = 0, S = c.args; x < S.length; x++) {
                    l = S[x];
                    var A = e.getInstruction(l).valueType;
                    if (!a.isTypeOrListOfType(A, a.Number) && !a.isTypeOrListOfType(A, a.Point))
                        throw r.updateRuleTypeError(a.prettyPrint(A))
                }
                for (var R = {}, D = 0, V = c.symbols; D < V.length; D++) {
                    if (R[N = V[D]])
                        throw r.duplicateUpdateRules(N);
                    R[N] = !0
                }
                return;
            case t.BroadcastResult:
            case t.BlockVar:
            case t.BeginBroadcast:
            case t.EndBroadcast:
            case t.BeginLoop:
            case t.EndLoop:
            case t.Distribution:
                return;
            default:
                throw new Error("Unexpected opcode: " + c.type)
            }
    }
});
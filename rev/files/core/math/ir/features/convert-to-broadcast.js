define('core/math/ir/features/convert-to-broadcast', ["require", "exports", "core/math/errormsg", "../opcodes", "core/math/types", "./list-length", "../instructions", "../builtin-table", "./fuse-broadcast", "./is-constant", "./as-value", "./copy-instruction"], function(require, r, e, t, s, n, a, c, o, i, u, d) {
    "use strict";
    function g(r, e, a) {
        for (var c = e.args, g = !1, l = [], p = 0; p < c.length; p++)
            if (!a || a[p]) {
                var h = c[p]
                  , v = r.getInstruction(h).valueType;
                s.isList(v) && -1 === l.indexOf(h) && l.push(h),
                v === s.EmptyList && (g = !0)
            }
        if (0 === l.length)
            return r.returnIndex;
        if (e.type === t.Piecewise && -1 == l.indexOf(e.args[0]) && l.indexOf(e.args[1]) >= 0 && l.indexOf(e.args[2]) >= 0) {
            var I = o.fuseBroadcast(r, e.args[1])
              , y = o.fuseBroadcast(r, e.args[2]);
            return I !== e.args[1] || y !== e.args[2] ? d.copyInstructionWithArgs(r, e, [e.args[0], I, y]) : r.returnIndex
        }
        r.popInstruction();
        var m = n.minListLengthIndex(r, l);
        if (void 0 === m)
            throw new Error("Programming Error: expected minListLength to be defined for " + l.length + " lists");
        var L = m;
        if (i.isConstant(r.getInstruction(L)) && 0 === u.asValue(r, L) && g)
            return r.ConstantOfType(s.EmptyList, []);
        for (var x = r.BeginBroadcast([L]), B = [], E = 0, b = l; E < b.length; E++) {
            var w = b[E];
            B.push(f(r, w, x))
        }
        var A = [];
        for (p = 0; p < c.length; p++) {
            h = c[p];
            if (a && !a[p])
                A.push(h);
            else {
                var T = l.indexOf(h);
                A.push(-1 === T ? h : B[T])
            }
        }
        var O = r.copyInstructionWithArgs(e, A)
          , P = r.EndBroadcast([x, O]);
        return r.BroadcastResult(s.listType(r.getInstruction(O).valueType), [P])
    }
    function f(r, e, s) {
        return r.getInstruction(e).type == t.BroadcastResult ? r.DeferredListAccess([e, s]) : r.InboundsListAccess([e, s])
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.deferredOrInboundsAccess = r.convertToBroadcast = void 0,
    r.convertToBroadcast = function(r) {
        if (r.instructionsLength() - 1 !== r.returnIndex)
            throw new Error("Programming Error: only the final instruction in a chunk can be converted to broadcast");
        var n = r.getInstruction(r.returnIndex);
        if (a.isLeafInstruction(n))
            return r.returnIndex;
        switch (n.type) {
        case t.Add:
        case t.Subtract:
        case t.Multiply:
        case t.Divide:
        case t.Exponent:
        case t.RawExponent:
        case t.Equal:
        case t.Less:
        case t.Greater:
        case t.LessEqual:
        case t.GreaterEqual:
        case t.And:
        case t.OrderedPair:
        case t.Negative:
        case t.Piecewise:
        case t.OrderedPairAccess:
            return g(r, n);
        case t.Distribution:
            return o.fuseBroadcast(r, g(r, n));
        case t.NativeFunction:
            var i = c.BuiltInTable[n.symbol];
            switch (i.tag) {
            case "default":
            case "trig":
            case "inverseTrig":
            case "color":
                return g(r, n);
            case "never-broadcast":
                for (var u = [], d = !1, f = 0, l = n.args; f < l.length; f++) {
                    var p = l[f]
                      , h = o.fuseBroadcast(r, p);
                    h !== p ? (d = !0,
                    u.push(h)) : u.push(p)
                }
                return d ? r.copyInstructionWithArgs(n, u) : r.returnIndex;
            case "reducer":
                if (function(r, e) {
                    for (var t = 0, n = e; t < n.length; t++) {
                        var a = n[t];
                        if (s.isList(r.getInstruction(a).valueType))
                            return !0
                    }
                    return !1
                }(r, n.args)) {
                    if (1 === n.args.length) {
                        var v = n.args[0]
                          , I = o.fuseBroadcast(r, v);
                        return I !== v ? r.copyInstructionWithArgs(n, [I]) : r.returnIndex
                    }
                    return g(r, n)
                }
                r.popInstruction();
                var y = function(r, e) {
                    var t = r.getInstruction(e[0]).valueType;
                    if (!s.hasListType(t))
                        return s.ListOfAny;
                    for (var n = 0, a = e; n < a.length; n++) {
                        var c = a[n];
                        if (r.getInstruction(c).valueType !== t)
                            return s.ListOfAny
                    }
                    return s.listType(t)
                }(r, n.args);
                if (!s.isSubType(y, i.argumentTypes[0]))
                    throw e.functionTypeError(n.callData.errorSymbol, [s.prettyPrint(y)]);
                var m = r.List(n.args);
                return r.copyInstructionWithArgs(n, [m]);
            case "doubleReducer":
                if (2 !== n.args.length)
                    throw new Error("Programming error: double reducers must have two arguments");
                var L = o.fuseBroadcast(r, n.args[0])
                  , x = o.fuseBroadcast(r, n.args[1]);
                return L !== n.args[0] && x !== n.args[1] ? r.copyInstructionWithArgs(n, [L, x]) : r.returnIndex;
            case "parameterizedReducer":
                if (2 !== n.args.length)
                    throw new Error("Programming error: double reducers must have two arguments");
                return (L = o.fuseBroadcast(r, n.args[0])) === n.args[0] ? g(r, n, [!1, !0]) : r.copyInstructionWithArgs(n, [L, n.args[1]]);
            default:
                var B = i.tag;
                throw new Error("Programming Error: unexpected tag " + B)
            }
        case t.ListAccess:
        case t.DeferredListAccess:
        case t.InboundsListAccess:
            return g(r, n, [!1, !0]);
        case t.BeginIntegral:
        case t.EndIntegral:
        case t.BeginLoop:
        case t.EndLoop:
            return r.returnIndex;
        case t.List:
        case t.BlockVar:
        case t.BeginBroadcast:
        case t.EndBroadcast:
        case t.BroadcastResult:
        case t.ExtendSeed:
        case t.Action:
            return r.returnIndex;
        default:
            throw new Error("Unexpected opcode " + n.type)
        }
    }
    ,
    r.deferredOrInboundsAccess = f
});
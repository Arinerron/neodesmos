
define('core/math/ir/features/lift-point-operations', ["require", "exports", "../opcodes", "core/math/types", "../instructions"], function(require, e, r, s, a) {
    "use strict";
    function t(e, r) {
        return e.getInstruction(r).valueType === s.Point
    }
    function n(e, r) {
        return e.getInstruction(r).valueType === s.Number
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.liftPointOperations = void 0,
    e.liftPointOperations = function(e) {
        if (e.instructionsLength() - 1 !== e.returnIndex)
            throw new Error("Programming Error: only the final instruction in a chunk can be converted to broadcast");
        var s = e.getInstruction(e.returnIndex);
        if (a.isLeafInstruction(s))
            return e.returnIndex;
        switch (s.type) {
        case r.Add:
            if (t(e, s.args[0]) && t(e, s.args[1])) {
                var c = e.Constant(1)
                  , i = e.Constant(2);
                return e.OrderedPair([e.Add([e.OrderedPairAccess([s.args[0], c]), e.OrderedPairAccess([s.args[1], c])]), e.Add([e.OrderedPairAccess([s.args[0], i]), e.OrderedPairAccess([s.args[1], i])])])
            }
            return e.returnIndex;
        case r.Subtract:
            if (t(e, s.args[0]) && t(e, s.args[1])) {
                c = e.Constant(1),
                i = e.Constant(2);
                return e.OrderedPair([e.Subtract([e.OrderedPairAccess([s.args[0], c]), e.OrderedPairAccess([s.args[1], c])]), e.Subtract([e.OrderedPairAccess([s.args[0], i]), e.OrderedPairAccess([s.args[1], i])])])
            }
            return e.returnIndex;
        case r.Negative:
            if (t(e, s.args[0])) {
                c = e.Constant(1),
                i = e.Constant(2);
                return e.OrderedPair([e.Negative([e.OrderedPairAccess([s.args[0], c])]), e.Negative([e.OrderedPairAccess([s.args[0], i])])])
            }
            return e.returnIndex;
        case r.Multiply:
            if (t(e, s.args[0]) && n(e, s.args[1])) {
                c = e.Constant(1),
                i = e.Constant(2);
                return e.OrderedPair([e.Multiply([e.OrderedPairAccess([s.args[0], c]), s.args[1]]), e.Multiply([e.OrderedPairAccess([s.args[0], i]), s.args[1]])])
            }
            if (n(e, s.args[0]) && t(e, s.args[1])) {
                c = e.Constant(1),
                i = e.Constant(2);
                return e.OrderedPair([e.Multiply([s.args[0], e.OrderedPairAccess([s.args[1], c])]), e.Multiply([s.args[0], e.OrderedPairAccess([s.args[1], i])])])
            }
            return e.returnIndex;
        case r.Divide:
            if (t(e, s.args[0]) && n(e, s.args[1])) {
                c = e.Constant(1),
                i = e.Constant(2);
                return e.OrderedPair([e.Divide([e.OrderedPairAccess([s.args[0], c]), s.args[1]]), e.Divide([e.OrderedPairAccess([s.args[0], i]), s.args[1]])])
            }
            return e.returnIndex;
        case r.Exponent:
        case r.RawExponent:
        case r.Equal:
        case r.Less:
        case r.Greater:
        case r.LessEqual:
        case r.GreaterEqual:
        case r.And:
        case r.OrderedPair:
        case r.Piecewise:
        case r.OrderedPairAccess:
        case r.NativeFunction:
        case r.Distribution:
        case r.ListAccess:
        case r.DeferredListAccess:
        case r.InboundsListAccess:
        case r.BeginIntegral:
        case r.EndIntegral:
        case r.BeginLoop:
        case r.EndLoop:
        case r.List:
        case r.BlockVar:
        case r.BeginBroadcast:
        case r.EndBroadcast:
        case r.BroadcastResult:
        case r.ExtendSeed:
        case r.Action:
            return e.returnIndex;
        default:
            throw new Error("Unexpected opcode " + s.type)
        }
    }
});
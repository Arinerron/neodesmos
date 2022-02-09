
define('core/math/ir/features/copy-instruction', ["require", "exports", "../opcodes"], function(require, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.copyInstructionWithArgs = e.copyInstruction = void 0,
    e.copyInstruction = function(e, r) {
        return e.pushLeafInstruction(r)
    }
    ,
    e.copyInstructionWithArgs = function(e, t, s) {
        switch (t.type) {
        case r.Add:
            return e.Add(s);
        case r.Subtract:
            return e.Subtract(s);
        case r.Multiply:
            return e.Multiply(s);
        case r.Divide:
            return e.Divide(s);
        case r.Exponent:
            return e.Exponent(s);
        case r.RawExponent:
            return e.RawExponent(s);
        case r.Negative:
            return e.Negative(s);
        case r.Equal:
            return e.Equal(s);
        case r.Less:
            return e.Less(s);
        case r.Greater:
            return e.Greater(s);
        case r.LessEqual:
            return e.LessEqual(s);
        case r.GreaterEqual:
            return e.GreaterEqual(s);
        case r.And:
            return e.And(s);
        case r.Piecewise:
            return e.Piecewise(s);
        case r.BlockVar:
            return e.BlockVar(t.valueType, s);
        case r.BroadcastResult:
            return e.BroadcastResult(t.valueType, s);
        case r.OrderedPair:
            return e.OrderedPair(s);
        case r.OrderedPairAccess:
            return e.OrderedPairAccess(s);
        case r.NativeFunction:
            return e.NativeFunction(t.symbol, t.callData, s);
        case r.Distribution:
            return e.Distribution(t.symbol, s);
        case r.BeginIntegral:
            return e.BeginIntegral(t.callData, s);
        case r.EndIntegral:
            return e.EndIntegral(s);
        case r.BeginBroadcast:
            return e.BeginBroadcast(s);
        case r.EndBroadcast:
            return e.EndBroadcast(s);
        case r.BeginLoop:
            return e.BeginLoop(t.callData, s);
        case r.EndLoop:
            return e.EndLoop(s);
        case r.List:
            return e.List(s);
        case r.ListAccess:
            return e.ListAccess(s);
        case r.DeferredListAccess:
            return e.DeferredListAccess(s);
        case r.InboundsListAccess:
            return e.InboundsListAccess(s);
        case r.ExtendSeed:
            return e.ExtendSeed(t.tag, s);
        case r.Action:
            return e.Action(t.symbols, s);
        default:
            throw new Error("Unexpected opcode " + t.type)
        }
    }
});
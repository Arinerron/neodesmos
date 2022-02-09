
define('core/math/ir/features/get-value-type', ["require", "exports", "../opcodes", "core/math/types"], function(require, e, s, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getValueType = void 0,
    e.getValueType = function(e, a, c) {
        switch (a) {
        case s.Add:
        case s.Subtract:
        case s.Multiply:
        case s.Divide:
        case s.Exponent:
        case s.RawExponent:
        case s.Negative:
        case s.OrderedPairAccess:
        case s.BeginIntegral:
        case s.BeginLoop:
        case s.BeginBroadcast:
            return t.Number;
        case s.Equal:
        case s.Less:
        case s.Greater:
        case s.LessEqual:
        case s.GreaterEqual:
        case s.And:
            return t.Bool;
        case s.Piecewise:
            var r = e.getInstruction(c[1]).valueType
              , n = e.getInstruction(c[2]).valueType;
            return r === t.EmptyList && t.isList(n) ? n : r;
        case s.OrderedPair:
            return t.Point;
        case s.List:
            if (0 === c.length)
                return t.EmptyList;
            var i = e.getInstruction(c[0]).valueType;
            return t.hasListType(i) ? t.listType(i) : t.ListOfAny;
        case s.ListAccess:
        case s.DeferredListAccess:
        case s.InboundsListAccess:
            var o = e.getInstruction(c[0]).valueType;
            return t.isList(o) ? t.elementType(o) : t.Any;
        case s.ExtendSeed:
            return t.SeedType;
        case s.Action:
            return t.Action;
        case s.Constant:
        case s.LoadArg:
        case s.NativeFunction:
        case s.Distribution:
        case s.BlockVar:
        case s.BroadcastResult:
        case s.SymbolicVar:
        case s.Noop:
        case s.EndIntegral:
        case s.EndBroadcast:
        case s.EndLoop:
            return t.Any;
        default:
            throw new Error("Unexpected opcode " + a)
        }
    }
});
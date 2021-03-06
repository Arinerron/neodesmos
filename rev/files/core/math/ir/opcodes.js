define('core/math/ir/opcodes', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.Action = e.BroadcastResult = e.BlockVar = e.ExtendSeed = e.Distribution = e.InboundsListAccess = e.DeferredListAccess = e.ListAccess = e.List = e.NativeFunction = e.Piecewise = e.And = e.GreaterEqual = e.LessEqual = e.Greater = e.Less = e.Equal = e.EndBroadcast = e.BeginBroadcast = e.EndIntegral = e.BeginIntegral = e.EndLoop = e.BeginLoop = e.OrderedPairAccess = e.OrderedPair = e.Negative = e.RawExponent = e.Exponent = e.Divide = e.Multiply = e.Subtract = e.Add = e.MAX_LEAF_OPCODE = e.SymbolicVar = e.LoadArg = e.Constant = e.Noop = void 0,
    e.Noop = 0,
    e.Constant = 1,
    e.LoadArg = 2,
    e.SymbolicVar = 3,
    e.MAX_LEAF_OPCODE = 3,
    e.Add = 8,
    e.Subtract = 9,
    e.Multiply = 10,
    e.Divide = 11,
    e.Exponent = 12,
    e.RawExponent = 13,
    e.Negative = 14,
    e.OrderedPair = 15,
    e.OrderedPairAccess = 16,
    e.BeginLoop = 17,
    e.EndLoop = 18,
    e.BeginIntegral = 19,
    e.EndIntegral = 20,
    e.BeginBroadcast = 21,
    e.EndBroadcast = 22,
    e.Equal = 23,
    e.Less = 24,
    e.Greater = 25,
    e.LessEqual = 26,
    e.GreaterEqual = 27,
    e.And = 30,
    e.Piecewise = 31,
    e.NativeFunction = 37,
    e.List = 38,
    e.ListAccess = 39,
    e.DeferredListAccess = 40,
    e.InboundsListAccess = 41,
    e.Distribution = 42,
    e.ExtendSeed = 44,
    e.BlockVar = 47,
    e.BroadcastResult = 48,
    e.Action = 49
});
define('core/math/ir/features/is-constant', ["require", "exports", "../opcodes", "./print"], function(require, t, n, s) {
    "use strict";
    function o(t) {
        return t.type === n.Constant
    }
    function r(t) {
        return t.type === n.BroadcastResult && t.isConstantBroadcast
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.isConstantOrConstantBroadcast = t.isConstantBroadcast = t.assertConstant = t.isConstant = void 0,
    t.isConstant = o,
    t.assertConstant = function(t) {
        if (!o(t))
            throw new Error("Programming error: expected constant instruction but found " + s.printOp(t.type) + " instead.")
    }
    ,
    t.isConstantBroadcast = r,
    t.isConstantOrConstantBroadcast = function(t) {
        return o(t) || r(t)
    }
});
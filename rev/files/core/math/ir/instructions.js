define('core/math/ir/instructions', ["require", "exports", "./opcodes"], function(require, e, n) {
    "use strict";
    function t(e) {
        return e.type <= n.MAX_LEAF_OPCODE
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.endsBlock = e.beginsBlock = e.isInternalInstruction = e.isLeafInstruction = void 0,
    e.isLeafInstruction = t,
    e.isInternalInstruction = function(e) {
        return !t(e)
    }
    ,
    e.beginsBlock = function(e) {
        switch (e.type) {
        case n.BeginIntegral:
        case n.BeginBroadcast:
        case n.BeginLoop:
            return !0;
        default:
            return !1
        }
    }
    ,
    e.endsBlock = function(e) {
        switch (e.type) {
        case n.EndLoop:
        case n.EndIntegral:
        case n.EndBroadcast:
            return !0;
        default:
            return !1
        }
    }
});
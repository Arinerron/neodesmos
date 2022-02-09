define('core/math/ir/features/as-value', ["require", "exports", "../opcodes", "core/math/context-types", "core/math/maybe-rational"], function(require, e, t, a, r) {
    "use strict";
    function u(e) {
        if (Array.isArray(e))
            return e.map(u);
        switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
            return e;
        case "object":
            if (a.isActionCompilerValue(e)) {
                var t = {};
                for (var o in e.updateRules) {
                    var n = e.updateRules[o];
                    t[o] = {
                        value: u(n.value),
                        valueType: n.valueType
                    }
                }
                return {
                    type: "Action",
                    updateRules: t
                }
            }
            return r.asFloat(e);
        default:
            throw new Error("Unexpected value: " + e)
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.compilerValueToRuntimeValue = e.asValue = void 0,
    e.asValue = function(e, a) {
        var r = e.getInstruction(a);
        switch (r.type) {
        case t.Constant:
            return u(r.value);
        default:
            throw new Error("Unexpected opcode " + r.type + ".")
        }
    }
    ,
    e.compilerValueToRuntimeValue = u
});
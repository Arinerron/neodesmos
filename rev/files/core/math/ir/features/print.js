
define('core/math/ir/features/print', ["require", "exports", "../instructions", "../opcodes", "core/math/types", "../../context-types"], function(require, e, r, t, n, s) {
    "use strict";
    function a(e, r) {
        var s = e.getInstruction(r);
        switch (s.type === t.Noop && s.removedInstructionForDebuggingOnly && (s = s.removedInstructionForDebuggingOnly),
        s.type) {
        case t.Noop:
            return c(s.type);
        case t.LoadArg:
            return c(s.type) + " " + n.repr(s.valueType) + " " + e.argNames[r];
        case t.SymbolicVar:
            return c(s.type) + " " + n.repr(s.valueType);
        case t.Constant:
            return c(s.type) + " " + n.repr(s.valueType) + " " + o(s.value);
        case t.NativeFunction:
        case t.Distribution:
            return c(s.type) + " " + n.repr(s.valueType) + " " + s.symbol + " " + s.args.join(" ");
        case t.ExtendSeed:
            return c(s.type) + " " + n.repr(s.valueType) + " " + s.tag + " " + s.args.join(" ");
        case t.BroadcastResult:
            return c(s.type) + " " + n.repr(s.valueType) + " " + s.args.join(" ") + (s.isConstantBroadcast ? " (constant)" : "");
        case t.Add:
        case t.Subtract:
        case t.Multiply:
        case t.Divide:
        case t.RawExponent:
        case t.Exponent:
        case t.Negative:
        case t.OrderedPair:
        case t.OrderedPairAccess:
        case t.BeginLoop:
        case t.EndLoop:
        case t.BeginIntegral:
        case t.EndIntegral:
        case t.BeginBroadcast:
        case t.EndBroadcast:
        case t.Equal:
        case t.Less:
        case t.Greater:
        case t.LessEqual:
        case t.GreaterEqual:
        case t.And:
        case t.Piecewise:
        case t.List:
        case t.ListAccess:
        case t.DeferredListAccess:
        case t.InboundsListAccess:
        case t.BlockVar:
        case t.Action:
            return c(s.type) + " " + n.repr(s.valueType) + " " + s.args.join(" ");
        default:
            throw new Error("Unexpected opcode " + s.type)
        }
    }
    function c(e) {
        switch (e) {
        case t.Noop:
            return "Noop";
        case t.Constant:
            return "Constant";
        case t.Add:
            return "Add";
        case t.Subtract:
            return "Subtract";
        case t.Multiply:
            return "Multiply";
        case t.Divide:
            return "Divide";
        case t.Exponent:
            return "Exponent";
        case t.RawExponent:
            return "RawExponent";
        case t.Negative:
            return "Negative";
        case t.OrderedPair:
            return "OrderedPair";
        case t.OrderedPairAccess:
            return "OrderedPairAccess";
        case t.BeginLoop:
            return "BeginLoop";
        case t.EndLoop:
            return "EndLoop";
        case t.BeginIntegral:
            return "BeginIntegral";
        case t.EndIntegral:
            return "EndIntegral";
        case t.BeginBroadcast:
            return "BeginBroadcast";
        case t.EndBroadcast:
            return "EndBroadcast";
        case t.Equal:
            return "Equal";
        case t.Less:
            return "Less";
        case t.Greater:
            return "Greater";
        case t.LessEqual:
            return "LessEqual";
        case t.GreaterEqual:
            return "GreaterEqual";
        case t.And:
            return "And";
        case t.Piecewise:
            return "Piecewise";
        case t.List:
            return "List";
        case t.ListAccess:
            return "ListAccess";
        case t.DeferredListAccess:
            return "DeferredListAccess";
        case t.InboundsListAccess:
            return "InboundsListAccess";
        case t.NativeFunction:
            return "NativeFunction";
        case t.Distribution:
            return "Distribution";
        case t.LoadArg:
            return "LoadArg";
        case t.BlockVar:
            return "BlockVar";
        case t.BroadcastResult:
            return "BroadcastResult";
        case t.SymbolicVar:
            return "SymbolicVar";
        case t.ExtendSeed:
            return "ExtendSeed";
        case t.Action:
            return "Action";
        default:
            throw new Error("Unexpected opcode " + e.type)
        }
    }
    function o(e) {
        if (Array.isArray(e))
            return "[" + e.map(o).join(",") + "]";
        switch (typeof e) {
        case "string":
            return e;
        case "boolean":
        case "number":
            return e.toString();
        case "object":
            if (s.isActionCompilerValue(e)) {
                var r = [];
                for (var t in e.updateRules)
                    r.push('"' + t + '": ' + o(e.updateRules[t].value));
                return "{" + r.join(", ") + "}"
            }
            return e.n + "/" + e.d;
        default:
            throw new Error("Unexpected value: " + e)
        }
    }
    function i(e, r) {
        var t = e.toString();
        return u(r - t.length) + t
    }
    function u(e) {
        for (var r = "", t = 0; t < e; t++)
            r += " ";
        return r
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.printValue = e.printOp = e.printInstruction = e.print = void 0,
    e.print = function(e) {
        for (var n = "", s = (e.instructionsLength() - 1).toString().length, c = 0, o = !1, d = 0; d < e.instructionsLength(); d++) {
            var p = e.getInstruction(d)
              , l = e.comments[d] || ""
              , g = p.type === t.Noop && p.removedInstructionForDebuggingOnly;
            if ((r.endsBlock(p) || g && r.endsBlock(g)) && (c -= 1),
            p.type !== t.Noop || g) {
                o = !1;
                var y = g ? " [X]" : "    ";
                n += i(d, s) + ":" + y + " " + u(2 * c) + a(e, d) + (l ? "\t\t# " + l : "") + "\n"
            } else
                o || (n += i(d, s) + ": " + u(2 * c) + "...\n"),
                o = !0;
            (r.beginsBlock(p) || g && r.beginsBlock(g)) && (c += 1)
        }
        return n
    }
    ,
    e.printInstruction = a,
    e.printOp = c,
    e.printValue = o
});

define('core/math/ir/features/emit-js', ["require", "exports", "../opcodes", "./print", "../instructions", "core/math/maybe-rational", "core/math/types", "../builtin-table", "./count-references", "core/math/context-types", "./as-value", "./nan-of-type"], function(require, e, r, n, t, a, s, o, c, u, i, g) {
    "use strict";
    function d(e) {
        return "_" + e
    }
    function l(e, r) {
        var n = r[e];
        return void 0 !== n ? n : d(e)
    }
    function p(e, t, a, c, u, p) {
        var v = a + 1;
        switch (t.type) {
        case r.Noop:
        case r.BlockVar:
        case r.BroadcastResult:
        case r.EndIntegral:
        case r.Action:
            return {
                source: "",
                nextIdx: v
            };
        case r.BeginIntegral:
            return {
                source: f(e, t, a, c, u, p),
                nextIdx: t.endIndex
            };
        case r.LoadArg:
            return u[a] = e.argNames[a],
            {
                source: "",
                nextIdx: v
            };
        case r.BeginBroadcast:
            return {
                source: x(e, t, a, u),
                nextIdx: v
            };
        case r.EndBroadcast:
            return {
                source: I(e, t, a, u),
                nextIdx: v
            };
        case r.BeginLoop:
            return {
                source: y(e, t, a, u),
                nextIdx: v
            };
        case r.EndLoop:
            return {
                source: h(e, t, a, u),
                nextIdx: v
            };
        default:
            var m = function(e, t, a) {
                switch (e.type) {
                case r.Constant:
                    return e.valueType === s.Number || e.valueType === s.Bool || e.valueType === s.Point ? B(e.value) : (a.push(i.compilerValueToRuntimeValue(e.value)),
                    "_C[" + (a.length - 1) + "]");
                case r.Add:
                    return l(e.args[0], t) + "+" + l(e.args[1], t);
                case r.Subtract:
                    return l(e.args[0], t) + "-" + l(e.args[1], t);
                case r.Multiply:
                    return l(e.args[0], t) + "*" + l(e.args[1], t);
                case r.Divide:
                    return l(e.args[0], t) + "/" + l(e.args[1], t);
                case r.Exponent:
                    return "BuiltIn.pow(" + l(e.args[0], t) + "," + l(e.args[1], t) + ")";
                case r.RawExponent:
                    return "Math.pow(" + l(e.args[0], t) + "," + l(e.args[1], t) + ")";
                case r.Negative:
                    return "-" + l(e.args[0], t);
                case r.Equal:
                    return l(e.args[0], t) + "===" + l(e.args[1], t);
                case r.Less:
                    return l(e.args[0], t) + "<" + l(e.args[1], t);
                case r.Greater:
                    return l(e.args[0], t) + ">" + l(e.args[1], t);
                case r.LessEqual:
                    return l(e.args[0], t) + "<=" + l(e.args[1], t);
                case r.GreaterEqual:
                    return l(e.args[0], t) + ">=" + l(e.args[1], t);
                case r.And:
                    return l(e.args[0], t) + "&&" + l(e.args[1], t);
                case r.Piecewise:
                    return l(e.args[0], t) + "?" + l(e.args[1], t) + ":" + l(e.args[2], t);
                case r.OrderedPair:
                    return "[" + l(e.args[0], t) + "," + l(e.args[1], t) + "]";
                case r.OrderedPairAccess:
                    return l(e.args[0], t) + "[" + l(e.args[1], t) + "-1]";
                case r.List:
                    return "[" + e.args.map(function(e) {
                        return l(e, t)
                    }).join(",") + "]";
                case r.DeferredListAccess:
                case r.Distribution:
                case r.SymbolicVar:
                    throw new Error("Programming Error: expect " + n.printOp(e.type) + " to be removed before emitting code.");
                case r.ListAccess:
                    var c = l(e.args[0], t);
                    return "(Math.floor(" + (u = l(e.args[1], t)) + ")>=1&&Math.floor(" + u + ")<=" + c + ".length)?" + c + "[Math.floor(" + u + ")-1]:" + B(g.nanOfType(e.valueType));
                case r.InboundsListAccess:
                    var u;
                    return (c = l(e.args[0], t)) + "[" + (u = l(e.args[1], t)) + "-1]";
                case r.NativeFunction:
                    var d = o.BuiltInTable[e.symbol]
                      , p = e.args.map(function(e) {
                        return l(e, t)
                    }).join(",");
                    return d.module + "." + d.symbol + "(" + p + ")";
                case r.ExtendSeed:
                    return l(e.args[0], t) + "+'::" + e.tag + "'+" + l(e.args[1], t);
                case r.LoadArg:
                case r.Noop:
                case r.BeginIntegral:
                case r.EndIntegral:
                case r.BeginLoop:
                case r.EndLoop:
                case r.BeginBroadcast:
                case r.EndBroadcast:
                case r.BlockVar:
                case r.BroadcastResult:
                case r.Action:
                    throw new Error("Unexpected opcode " + e.type);
                default:
                    throw new Error("Unexpected opcode " + e.type)
                }
            }(t, u, p);
            return c[a] <= 1 ? (u[a] = "(" + m + ")",
            {
                source: "",
                nextIdx: v
            }) : {
                source: d(a) + "=" + m + ";\n",
                nextIdx: v
            }
        }
    }
    function f(e, r, n, t, a, s) {
        var o = "BuiltIn.quad(";
        o += function(e, r, n, t, a, s) {
            var o = r.endIndex
              , c = "function(" + d(n) + ") {\n";
            c += v(e, n + 1, o - 1, t);
            for (var u = n + 1; u < o; ) {
                var i = e.getInstruction(u)
                  , g = p(e, i, u, t, a, s);
                c += g.source,
                u = g.nextIdx
            }
            return c + "return " + l(e.getInstruction(o).args[1], a) + ";\n}"
        }(e, r, n, t, a, s),
        o += "," + l(r.args[0], a) + "," + l(r.args[1], a) + ")";
        var c = r.endIndex;
        return t[c + 1] <= 1 ? (a[c + 1] = o,
        "") : d(c + 1) + "=" + o + ";"
    }
    function v(e, n, a, s) {
        for (var o = "", c = !1, u = n; u <= a; u++) {
            var i = e.getInstruction(u);
            if (i.type !== r.Noop && i.type !== r.EndBroadcast && i.type !== r.EndLoop)
                if (i.type !== r.BeginIntegral)
                    s[u] <= 1 && !t.beginsBlock(i) && !t.endsBlock(i) && i.type !== r.BlockVar && i.type !== r.BroadcastResult || (c ? o += "," : (o += "var ",
                    c = !0),
                    o += d(u));
                else {
                    var g = i.endIndex;
                    u = s[g + 1] <= 1 ? g + 1 : g
                }
        }
        return c && (o += ";\n"),
        o
    }
    function x(e, n, t, a) {
        for (var s = d(t), o = e.getInstruction(n.endIndex), c = l(n.args[0], a), u = "", i = 1; i < o.args.length; i++) {
            var g = n.endIndex + i;
            if (e.getInstruction(g).type === r.BroadcastResult)
                u += d(g) + "=[];\n"
        }
        return u += "for(" + s + "=1;" + s + "<=" + c + ";" + s + "++){\n"
    }
    function I(e, n, t, a) {
        for (var s = "", o = 1; o < n.args.length; o++) {
            var c = t + o;
            if (!(c >= e.instructionsLength()))
                if (e.getInstruction(c).type === r.BroadcastResult)
                    s += d(t + o) + ".push(" + l(n.args[o], a) + ");\n"
        }
        return s += "}\n"
    }
    function y(e, n, t, a) {
        for (var s = d(t), o = "" + l(n.args[0], a), c = "" + l(n.args[1], a), u = "if(!isFinite(" + c + "-" + o + ")){\n", i = 2; i < n.args.length; i++) {
            var p = n.endIndex + i - 1;
            if (!(p >= e.instructionsLength())) {
                var f = e.getInstruction(p);
                if (f.type === r.BlockVar)
                    u += d(p) + "=" + B(g.nanOfType(f.valueType)) + ";\n"
            }
        }
        u += "}else{\n";
        for (i = 2; i < n.args.length; i++) {
            var v = t + i - 1;
            if (e.getInstruction(v).type === r.BlockVar)
                u += d(v) + "=" + l(n.args[i], a) + ";\n"
        }
        return u += "for(" + s + "=" + o + ";" + s + "<=" + c + ";" + s + "++){\n"
    }
    function h(e, n, t, a) {
        for (var s = "", o = 1; o < n.args.length; o++) {
            var c = n.args[0] + o;
            if (e.getInstruction(c).type === r.BlockVar)
                s += d(c) + "=" + l(n.args[o], a) + ";\n"
        }
        s += "}\n";
        for (o = 1; o < n.args.length; o++) {
            var u = t + o;
            if (!(u >= e.instructionsLength()))
                if (e.getInstruction(u).type === r.BlockVar)
                    s += d(u) + "=" + l(n.args[0] + o, a) + ";\n"
        }
        return s += "}\n"
    }
    function B(e) {
        if (Array.isArray(e))
            return "[" + e.map(B).join(",") + "]";
        switch (typeof e) {
        case "boolean":
        case "number":
            return e.toString();
        case "string":
            return "" + JSON.stringify(e);
        case "object":
            if (u.isActionCompilerValue(e))
                throw new Error("Action values cannot be compiled");
            return a.asFloat(e).toString();
        default:
            throw new Error("Unexpected value: " + e)
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.emitJS = void 0,
    e.emitJS = function(e) {
        for (var r = c.countReferences(e), n = [], t = [], a = v(e, e.argNames.length, e.instructionsLength() - 1, r), s = 0; s < e.instructionsLength(); ) {
            var o = e.getInstruction(s)
              , u = p(e, o, s, r, n, t);
            a += u.source,
            s = u.nextIdx
        }
        return {
            source: a += "return " + l(e.returnIndex, n) + ";",
            constants: t
        }
    }
});
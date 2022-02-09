
define('core/math/ir/features/get-polynomial-coefficients', ["require", "exports", "../chunk", "../opcodes", "core/math/maybe-rational", "./polynomial-order", "../instructions", "./copy-instruction"], function(require, e, n, r, t, a, s, o) {
    "use strict";
    function i(e) {
        var t, a, i = e.chunk, c = e.argIndex;
        if (i.isInClosedBlock(c))
            throw new Error("Programming Error: cannot find polynomial coefficients of an instruction in a closed block");
        c >= 0 && c < i.argNames.length ? (t = i.argNames.slice(),
        a = i.argTypes.slice(),
        t.splice(c, 1),
        a.splice(c, 1)) : (t = i.argNames,
        a = i.argTypes);
        for (var u = new n.Chunk({
            argNames: t,
            argTypes: a
        }), l = [], p = 0; p < i.instructionsLength(); p++) {
            var d = i.getInstruction(p);
            if (d.type === r.LoadArg)
                p < c || c < 0 ? l.push(p) : p === c ? l.push(u.SymbolicVar(i.argTypes[p])) : l.push(p - 1);
            else if (s.isLeafInstruction(d))
                l.push(o.copyInstruction(u, d));
            else {
                for (var f = [], g = 0, h = d.args; g < h.length; g++) {
                    var y = h[g];
                    f.push(l[y])
                }
                l.push(o.copyInstructionWithArgs(u, d, f))
            }
        }
        var m = u.Constant(0)
          , v = u.Constant(1)
          , C = u.Constant(NaN);
        return {
            chunk: i,
            newChunk: u,
            orderCtx: e,
            coefficientTable: [],
            mask: e.mask,
            valueMap: l,
            argIndex: c,
            zero: m,
            one: v,
            nan: C
        }
    }
    function c(e, n) {
        var s, o = e.newChunk, i = e.orderCtx, u = e.coefficientTable, l = e.mask, p = e.valueMap, d = e.argIndex, f = e.zero, g = e.one, h = e.nan, y = u[n];
        if (void 0 !== y)
            return y;
        for (s = l[n] ? n === d ? [f, g] : a.instructionOrder(i, n) > 2 ? [h] : function(e, n) {
            var a, s = e.chunk.getInstruction(n), o = e.newChunk;
            switch (s.type) {
            case r.Add:
                for (var i = s.args, u = i[0], l = i[1], p = c(e, u), d = c(e, l), f = p.length - 1, g = d.length - 1, h = [], y = 0; y <= Math.max(f, g); y++)
                    f >= y && g >= y ? h.push(o.Add([p[y], d[y]])) : h.push(f > g ? p[y] : d[y]);
                return h;
            case r.Subtract:
            case r.Less:
            case r.LessEqual:
            case r.Greater:
            case r.GreaterEqual:
                var m = s.args;
                u = m[0],
                l = m[1];
                s.type !== r.Less && s.type != r.LessEqual || (u = (a = [l, u])[0],
                l = a[1]);
                p = c(e, u),
                d = c(e, l),
                f = p.length - 1,
                g = d.length - 1,
                h = [];
                for (var v = 0; v <= Math.max(f, g); v++)
                    f >= v && g >= v ? h.push(o.Subtract([p[v], d[v]])) : h.push(f > g ? p[v] : o.Negative([d[v]]));
                return h;
            case r.Negative:
                p = c(e, u = s.args[0]),
                h = [];
                for (var C = 0; C < p.length; C++)
                    h.push(o.Negative([p[C]]));
                return h;
            case r.Multiply:
                for (var w = s.args, x = (u = w[0],
                l = w[1],
                p = c(e, u),
                d = c(e, l),
                f = p.length - 1,
                g = d.length - 1,
                h = [],
                0); x <= f; x++)
                    for (var I = 0; I <= g; I++)
                        if (!(x + I > 2)) {
                            var k = o.Multiply([p[x], d[I]])
                              , E = h[x + I];
                            h[x + I] = void 0 === E ? k : o.Add([E, k])
                        }
                return h;
            case r.Divide:
                for (var L = s.args, b = (u = L[0],
                l = L[1],
                p = c(e, u),
                d = c(e, l),
                h = [],
                0); b < p.length; b++)
                    h.push(o.Divide([p[b], d[0]]));
                return h;
            case r.Exponent:
            case r.RawExponent:
                var A = s.args;
                u = A[0],
                l = A[1],
                p = c(e, u),
                d = c(e, l);
                if (0 === (f = p.length - 1))
                    return [o.RawExponent([p[0], d[0]])];
                var M = o.getInstruction(d[0]);
                switch (t.asFloat(M.value)) {
                case 0:
                    return [o.Constant(0)];
                case 1:
                    return p;
                case 2:
                    return [o.Multiply([p[0], p[0]]), o.Multiply([o.Constant(2), o.Multiply([p[0], p[1]])]), o.Multiply([p[1], p[1]])]
                }
            case r.Piecewise:
                return c(e, s.args[1]);
            case r.Noop:
            case r.BeginBroadcast:
            case r.LoadArg:
            case r.Constant:
            case r.Equal:
            case r.And:
            case r.OrderedPair:
            case r.OrderedPairAccess:
            case r.List:
            case r.ListAccess:
            case r.DeferredListAccess:
            case r.InboundsListAccess:
            case r.NativeFunction:
            case r.Distribution:
            case r.BeginIntegral:
            case r.EndIntegral:
            case r.BeginLoop:
            case r.EndLoop:
            case r.EndBroadcast:
            case r.BroadcastResult:
            case r.BlockVar:
            case r.SymbolicVar:
            case r.ExtendSeed:
            case r.Action:
                throw new Error("Cannot find polynomial coefficients of opcode " + s.type + " that depends on symbol.");
            default:
                throw new Error("Unexpected opcode " + s.type)
            }
        }(e, n) : [p[n]]; s.length > 1; ) {
            var m = o.getInstruction(s[s.length - 1]);
            if (m.type !== r.Constant || 0 !== t.asFloat(m.value))
                break;
            s.pop()
        }
        if (0 === s.length)
            throw new Error("Programming Error: coefficients cannot be empty");
        return u[n] = s,
        s
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.instructionCoefficients = e.polynomialCoefficientContext = e.getPolynomialCoefficients = void 0,
    e.getPolynomialCoefficients = function(e, n) {
        var t = e.argNames.indexOf(n)
          , s = i(a.polynomialOrderContext(e, t, {
            allowRestriction: !0,
            allowClosedBlockReferences: !1
        }));
        if (a.instructionOrder(s.orderCtx, e.returnIndex) > 2)
            throw new Error("Programming Error: cannot compute polynomial coefficients for polynomials of order greater than 2");
        for (var o = c(s, e.returnIndex), u = !1, l = 0; l < e.instructionsLength(); l++)
            e.getInstruction(l).type === r.Piecewise && s.mask[l] && (u = !0);
        return {
            chunk: s.newChunk,
            coefficients: o,
            mappedArgIndex: s.valueMap[t],
            mappedReturnIndex: s.valueMap[e.returnIndex],
            isRestrictedPolynomial: u
        }
    }
    ,
    e.polynomialCoefficientContext = i,
    e.instructionCoefficients = c
});
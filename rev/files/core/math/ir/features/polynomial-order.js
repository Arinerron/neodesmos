define('core/math/ir/features/polynomial-order', ["require", "exports", "../opcodes", "core/math/maybe-rational", "./get-dependency-mask", "../instructions"], function(require, e, r, a, s, t) {
    "use strict";
    function n(e, r, a) {
        var t = a.allowRestriction
          , n = a.allowClosedBlockReferences;
        return {
            chunk: e,
            argIndex: r,
            orderTable: [],
            mask: s.getDependencyMask(e, r),
            allowRestriction: t,
            allowClosedBlockReferences: n
        }
    }
    function c(e, s) {
        var n = e.orderTable[s];
        if (void 0 !== n)
            return n;
        var o = function(e, s) {
            var n = e.chunk
              , o = e.mask
              , i = e.argIndex
              , l = e.allowRestriction;
            if (!e.allowClosedBlockReferences && n.isInClosedBlock(s))
                return 1 / 0;
            if (s === i)
                return 1;
            var u = n.getInstruction(s);
            if (t.beginsBlock(u) || t.endsBlock(u))
                return 1 / 0;
            switch (u.type) {
            case r.Add:
            case r.Subtract:
            case r.Less:
            case r.LessEqual:
            case r.Greater:
            case r.GreaterEqual:
                var d = u.args
                  , f = d[0]
                  , v = d[1];
                return Math.max(c(e, f), c(e, v));
            case r.Multiply:
                var p = u.args;
                f = p[0],
                v = p[1];
                return c(e, f) + c(e, v);
            case r.Negative:
                return c(e, u.args[0]);
            case r.Divide:
                var g = u.args;
                f = g[0];
                return c(e, v = g[1]) > 0 ? 1 / 0 : c(e, f);
            case r.Exponent:
            case r.RawExponent:
                var y = u.args
                  , k = (f = y[0],
                v = y[1],
                n.getInstruction(v));
                if (0 === c(e, f) && 0 === c(e, v))
                    return 0;
                if (k.type === r.Constant) {
                    var m = a.asFloat(k.value);
                    return m === Math.round(m) && m > 0 ? c(e, f) * m : 1 / 0
                }
                return 1 / 0;
            case r.Piecewise:
                if (!o[s])
                    return 0;
                var x = n.getInstruction(u.args[2]);
                return l && x.type === r.Constant && isNaN(a.asFloat(x.value)) ? c(e, u.args[1]) : 1 / 0;
            case r.LoadArg:
            case r.Noop:
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
            case r.BroadcastResult:
            case r.BlockVar:
            case r.SymbolicVar:
            case r.ExtendSeed:
            case r.Action:
                return o[s] ? 1 / 0 : 0;
            default:
                throw new Error("Unexpected opcode " + u.type)
            }
        }(e, s);
        return e.orderTable[s] = o,
        o
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.instructionOrder = e.polynomialOrderContext = e.polynomialOrder = void 0,
    e.polynomialOrder = function(e, r, a) {
        var s = e.argNames.indexOf(r);
        return -1 === s ? 0 : c(n(e, s, a), e.returnIndex)
    }
    ,
    e.polynomialOrderContext = n,
    e.instructionOrder = c
});
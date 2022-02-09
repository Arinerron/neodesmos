define('core/math/ir/features/bound-domain', ["require", "exports", "core/math/domaintypes", "core/math/types", "core/math/maybe-rational", "../opcodes", "./polynomial-order", "./get-polynomial-coefficients", "../instructions", "./is-constant", "./as-value"], function(require, e, a, n, t, r, s, i, o, c, u) {
    "use strict";
    function l(e, m) {
        var f = e.domainTable
          , d = f[m];
        if (void 0 !== d)
            return d;
        var v = function(e, m) {
            var f = e.chunk
              , d = e.mask
              , v = e.orderCtx
              , p = f.getInstruction(m);
            if (o.isLeafInstruction(p)) {
                if (p.type === r.Constant)
                    if (p.valueType == n.Number) {
                        if (isNaN(t.asFloat(p.value)))
                            return a.emptyDomain()
                    } else if (p.valueType === n.ListOfNumber)
                        for (var y = 0, g = p.value; y < g.length; y++) {
                            var D = g[y];
                            if (isNaN(t.asFloat(D)))
                                return a.unknownDomain()
                        }
                return a.allReals()
            }
            switch (p.type) {
            case r.And:
            case r.Add:
            case r.Subtract:
            case r.Multiply:
            case r.Divide:
            case r.Exponent:
            case r.RawExponent:
            case r.Negative:
            case r.BlockVar:
            case r.BroadcastResult:
            case r.OrderedPair:
            case r.OrderedPairAccess:
            case r.NativeFunction:
            case r.Distribution:
            case r.BeginIntegral:
            case r.EndIntegral:
            case r.BeginBroadcast:
            case r.EndBroadcast:
            case r.BeginLoop:
            case r.EndLoop:
            case r.ListAccess:
            case r.DeferredListAccess:
            case r.InboundsListAccess:
            case r.ExtendSeed:
            case r.Action:
                for (var k = a.allReals(), b = 0, N = p.args; b < N.length; b++) {
                    var w = N[b];
                    k = a.intersectDomains(k, l(e, w))
                }
                return k;
            case r.List:
                if (!d[m])
                    return a.allReals();
                var C = l(e, p.args[0]);
                if ("known" !== C.type)
                    return a.unknownDomain();
                for (var h = 1; h < p.args.length; h++) {
                    if ("known" !== (k = l(e, p.args[h])).type)
                        return a.unknownDomain();
                    if (k.bounds[0] !== C.bounds[0] || k.bounds[1] !== C.bounds[1])
                        return a.unknownDomain()
                }
                return C;
            case r.Equal:
                return d[m] ? a.unknownDomain() : a.allReals();
            case r.Piecewise:
                var x = f.getInstruction(p.args[2]);
                return x.type === r.Constant && x.valueType === n.Number && isNaN(t.asFloat(x.value)) ? a.intersectDomains(l(e, p.args[0]), l(e, p.args[1])) : a.unknownDomain();
            case r.Less:
            case r.Greater:
            case r.LessEqual:
            case r.GreaterEqual:
                if (!d[m])
                    return a.allReals();
                if (s.instructionOrder(v, m) > 1)
                    return a.unknownDomain();
                var E = e.coefficientCtx;
                void 0 === E && (E = i.polynomialCoefficientContext(v),
                e.coefficientCtx = E);
                var L = E.newChunk
                  , R = i.instructionCoefficients(E, m)
                  , B = R[0]
                  , I = R[1];
                if (!c.isConstant(L.getInstruction(B)))
                    return a.unknownDomain();
                var A = u.asValue(L, B);
                if (isNaN(A))
                    return a.emptyDomain();
                for (var O = a.allReals(), q = 0, T = p.args; q < T.length; q++) {
                    w = T[q];
                    O = a.intersectDomains(O, l(e, w))
                }
                if (void 0 === I)
                    return p.type === r.LessEqual || p.type === r.GreaterEqual ? A >= 0 ? O : a.emptyDomain() : A > 0 ? O : a.emptyDomain();
                var F = u.asValue(L, I);
                return a.intersectDomains(O, a.linearPositiveDomain(A, F))
            }
        }(e, m);
        return f[m] = v,
        v
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.boundDomain = void 0,
    e.boundDomain = function(e, i, o) {
        var c = e.argNames.indexOf(i);
        if (-1 === c) {
            var u = e.getInstruction(o);
            return u.type === r.Constant && u.valueType === n.Number && isNaN(t.asFloat(u.value)) ? a.emptyDomain() : a.allReals()
        }
        return l(function(e) {
            var a = e.chunk
              , n = e.mask;
            return {
                chunk: a,
                mask: n,
                orderCtx: e,
                domainTable: []
            }
        }(s.polynomialOrderContext(e, c, {
            allowRestriction: !0,
            allowClosedBlockReferences: !1
        })), o)
    }
});
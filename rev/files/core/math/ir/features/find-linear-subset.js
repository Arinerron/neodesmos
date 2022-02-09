define('core/math/ir/features/find-linear-subset', ["require", "exports", "../opcodes", "core/math/types", "../instructions"], function(require, e, r, s, a) {
    "use strict";
    function t(e, r, s) {
        var t = e.getInstruction(s)
          , n = function(e) {
            for (var r = [], s = 0; s < e; s++)
                r.push(!1);
            return r
        }(e.argNames.length);
        if (a.isLeafInstruction(t))
            return n;
        for (var c = 0, u = t.args; c < u.length; c++)
            for (var o = r[u[c]], i = 0; i < o.length; i++)
                n[i] = n[i] || o[i];
        return n
    }
    function n(e, s, t, n) {
        var u = e.getInstruction(n);
        if (a.isLeafInstruction(u))
            return c(e.argNames.length);
        switch (u.type) {
        case r.Add:
        case r.Subtract:
        case r.Negative:
        case r.List:
            for (var o = c(e.argNames.length), i = 0; i < u.args.length; i++)
                for (var g = t[u.args[i]], d = 0; d < g.length; d++)
                    o[d] = o[d] && g[d];
            return o;
        case r.Divide:
            for (var f = [], h = t[u.args[0]], l = s[u.args[1]], p = 0; p < h.length; p++)
                f.push(h[p] && !l[p]);
            return f;
        case r.Multiply:
            for (var v = t[u.args[0]].slice(), L = t[u.args[1]].slice(), E = s[u.args[0]], I = s[u.args[1]], N = 0, m = 0, b = 0; b < v.length; b++) {
                var x = v[b] && !I[b]
                  , A = L[b] && !E[b];
                v[b] = x,
                L[b] = A,
                x && (N += 1),
                A && (m += 1)
            }
            return N >= m ? v : L;
        case r.Piecewise:
            var B = s[u.args[0]]
              , y = t[u.args[1]]
              , w = t[u.args[2]]
              , q = [];
            for (n = 0; n < B.length; n++)
                q.push(!B[n] && y[n] && w[n]);
            return q;
        case r.ListAccess:
        case r.DeferredListAccess:
        case r.InboundsListAccess:
            var P = t[u.args[0]]
              , S = s[u.args[1]]
              , D = [];
            for (n = 0; n < S.length; n++)
                D.push(P[n] && !S[n]);
            return D;
        case r.BroadcastResult:
            var O = u.args[0]
              , G = n - O;
            return t[e.getInstruction(O).args[G]];
        case r.OrderedPair:
        case r.OrderedPairAccess:
        case r.Exponent:
        case r.RawExponent:
        case r.Less:
        case r.LessEqual:
        case r.Greater:
        case r.GreaterEqual:
        case r.Equal:
        case r.And:
        case r.NativeFunction:
        case r.Distribution:
        case r.BeginIntegral:
        case r.EndIntegral:
        case r.BeginLoop:
        case r.EndLoop:
        case r.BeginBroadcast:
        case r.EndBroadcast:
        case r.BlockVar:
        case r.ExtendSeed:
        case r.Action:
            for (var M = [], R = 0, _ = s[n]; R < _.length; R++) {
                var j = _[R];
                M.push(!j)
            }
            return M;
        default:
            throw new Error("Unexpected opcode " + u.type)
        }
    }
    function c(e) {
        for (var r = [], s = 0; s < e; s++)
            r.push(!0);
        return r
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.findLinearSubset = void 0,
    e.findLinearSubset = function(e) {
        for (var r = [], a = [], c = 0; c < e.argNames.length; c++) {
            for (var u = [], o = [], i = 0; i < e.argNames.length; i++)
                u.push(e.argTypes[i] === s.Number),
                o.push(c === i);
            a.push(o),
            r.push(u)
        }
        for (c = e.argNames.length; c <= e.returnIndex; c++)
            a.push(t(e, a, c)),
            r.push(n(e, a, r, c));
        return r[e.returnIndex]
    }
});
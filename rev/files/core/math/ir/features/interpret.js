define('core/math/ir/features/interpret', ["require", "exports", "tslib", "core/math/maybe-rational", "../opcodes", "core/math/types", "../instructions", "../builtin-table", "./as-value", "./nan-of-type", "../../builtin", "../../errormsg"], function(require, r, e, t, a, n, s, u, o, c, i, l) {
    "use strict";
    function g(r, e) {
        return t.add(r, e)
    }
    function d(r, e) {
        return t.sub(r, e)
    }
    function p(r, e) {
        return t.mul(r, e)
    }
    function f(r, e) {
        return t.div(r, e)
    }
    function v(r, e) {
        return t.pow(r, e)
    }
    function h(r, e) {
        return v(r, e)
    }
    function y(r) {
        return t.neg(r)
    }
    function m(r, e) {
        return [r, e]
    }
    function E(r, e) {
        return r[t.asFloat(e) - 1]
    }
    function L(r, e) {
        return t.asFloat(r) === t.asFloat(e)
    }
    function A(r, e) {
        return t.asFloat(r) < t.asFloat(e)
    }
    function I(r, e) {
        return t.asFloat(r) > t.asFloat(e)
    }
    function b(r, e) {
        return t.asFloat(r) <= t.asFloat(e)
    }
    function F(r, e) {
        return t.asFloat(r) >= t.asFloat(e)
    }
    function B(r) {
        return r
    }
    function w(r, e, a) {
        var n = Math.floor(t.asFloat(a)) - 1;
        return !isFinite(n) || n < 0 || n >= e.length ? c.nanOfType(r) : e[n]
    }
    function R(r, e) {
        return r[Math.floor(t.asFloat(e)) - 1]
    }
    function q(r, e, a) {
        return t.isRational(a) && (a = t.asFloat(a)),
        e + "::" + r + a
    }
    function P(r, e) {
        switch (r) {
        case "mod":
            return t.mod(e[0], e[1]);
        case "abs":
            return t.abs(e[0]);
        case "sqrt":
            return t.sqrt(e[0]);
        case "nthroot":
            return t.nthroot(e[0], e[1]);
        case "total":
            return t.total(e[0]);
        case "length":
            return e[0].length;
        case "validateRangeLength":
            var a = e[0]
              , n = e[1]
              , s = e[2]
              , c = e[3];
            if (0 === (g = i.validateRangeLength(a, n, s, c)))
                throw l.nonArithmeticRange();
            return g;
        case "validateSampleCount":
            var g;
            c = o.compilerValueToRuntimeValue(e[0]);
            if (0 === (g = i.validateSampleCount(c)) && 0 !== c)
                throw l.badSampleSize();
            return g;
        case "select":
        case "elementsAt":
        case "uniquePerm":
        case "sortPerm":
            var d = u.BuiltInTable[r];
            return i[d.symbol].apply(null, e);
        default:
            return ("Math" === (d = u.BuiltInTable[r]).module ? Math : i)[d.symbol].apply(null, o.compilerValueToRuntimeValue(e))
        }
    }
    function T(r, e, a) {
        if (e.constantLength)
            return e.constantLength;
        var n = e.args[0]
          , s = r.getInstruction(n).args[0]
          , u = r.getInstruction(s);
        return t.asFloat(M(r, u.args[0], a))
    }
    function x(r, e, t, a) {
        var s = r.getInstruction(e)
          , u = T(r, s, a);
        if (!isFinite(t) || t < 0 || t >= u)
            return c.nanOfType(n.elementType(s.valueType));
        var o = s.args[0]
          , i = e - o
          , l = r.getInstruction(o)
          , g = l.args[0]
          , d = l.args[i];
        a[g] = t + 1;
        for (var p = M(r, d, a), f = g; f <= o; f++)
            a[f] = void 0;
        return p
    }
    function S(r, n, s) {
        var u = M(r, n.args[1], s)
          , o = n.args[0]
          , c = r.getInstruction(o);
        if (c.type === a.BroadcastResult)
            return x(r, o, t.asFloat(u) - 1, s);
        if (c.type === a.Piecewise) {
            var i = M(r, c.args[0], s);
            return S(r, e.__assign(e.__assign({}, n), {
                args: [i ? c.args[1] : c.args[2], n.args[1]]
            }), s)
        }
        var l = M(r, n.args[0], s);
        return w(n.valueType, l, u)
    }
    function M(r, e, a) {
        var n = a[e];
        if (void 0 !== n)
            return n;
        var s = O(r, e, a);
        return "number" == typeof s && s === Math.floor(s) && (s = t.maybeRational(s, 1)),
        a[e] = s,
        s
    }
    function O(r, e, t) {
        var n = r.getInstruction(e);
        switch (n.type) {
        case a.Constant:
            return n.value;
        case a.Add:
            return g(M(r, n.args[0], t), M(r, n.args[1], t));
        case a.Subtract:
            return d(M(r, n.args[0], t), M(r, n.args[1], t));
        case a.Multiply:
            return p(M(r, n.args[0], t), M(r, n.args[1], t));
        case a.Divide:
            return f(M(r, n.args[0], t), M(r, n.args[1], t));
        case a.Exponent:
            return v(M(r, n.args[0], t), M(r, n.args[1], t));
        case a.RawExponent:
            return h(M(r, n.args[0], t), M(r, n.args[1], t));
        case a.Negative:
            return y(M(r, n.args[0], t));
        case a.OrderedPair:
            return m(M(r, n.args[0], t), M(r, n.args[1], t));
        case a.OrderedPairAccess:
            return E(M(r, n.args[0], t), M(r, n.args[1], t));
        case a.Equal:
            return L(M(r, n.args[0], t), M(r, n.args[1], t));
        case a.Less:
            return A(M(r, n.args[0], t), M(r, n.args[1], t));
        case a.Greater:
            return I(M(r, n.args[0], t), M(r, n.args[1], t));
        case a.LessEqual:
            return b(M(r, n.args[0], t), M(r, n.args[1], t));
        case a.GreaterEqual:
            return F(M(r, n.args[0], t), M(r, n.args[1], t));
        case a.And:
            return M(r, n.args[0], t) && M(r, n.args[1], t);
        case a.ExtendSeed:
            return q(n.tag, M(r, n.args[0], t), M(r, n.args[1], t));
        case a.Piecewise:
            var u = M(r, n.args[0], t);
            return M(r, u ? n.args[1] : n.args[2], t);
        case a.NativeFunction:
            for (var o = [], c = 0, i = n.args; c < i.length; c++) {
                var l = i[c];
                o.push(M(r, l, t))
            }
            return P(n.symbol, o);
        case a.List:
            o = [];
            for (var B = 0, w = n.args; B < w.length; B++) {
                l = w[B];
                o.push(M(r, l, t))
            }
            return o;
        case a.ListAccess:
        case a.DeferredListAccess:
        case a.InboundsListAccess:
            return S(r, n, t);
        case a.BroadcastResult:
            return function(r, e, t) {
                for (var a = r.getInstruction(e), n = T(r, a, t), s = [], u = 0; u < n; u++)
                    s.push(x(r, e, u, t));
                return s
            }(r, e, t);
        case a.BlockVar:
            var R = n.args[0]
              , O = r.getInstruction(R).args[0]
              , D = e - R
              , N = r.getInstruction(R).args[D]
              , V = [];
            V[N] = !0;
            for (var _ = N; _ >= O; _--)
                if (V[_]) {
                    var C = r.getInstruction(_);
                    if (!s.isLeafInstruction(C))
                        for (var G = 0, k = C.args; G < k.length; G++) {
                            (l = k[G]) < O ? M(r, l, t) : V[l] = !0
                        }
                }
            var W = r.copy();
            W.truncate(O);
            for (_ = 0; _ < O; _++) {
                var j = t[_]
                  , z = r.getInstruction(_);
                if (void 0 !== j) {
                    var H = z.valueType;
                    W.replaceInstructionWithConstant(_, {
                        type: a.Constant,
                        valueType: H,
                        value: j
                    })
                }
            }
            var J = [];
            for (_ = O; _ < e; _++) {
                var K = r.getInstruction(_);
                if (s.isLeafInstruction(K))
                    J.push(W.copyInstruction(K));
                else {
                    for (var Q = [], U = 0, X = K.args; U < X.length; U++) {
                        l = X[U];
                        Q.push(l < O ? l : J[l - O])
                    }
                    K.type === a.DeferredListAccess ? J.push(W.InboundsListAccess(Q)) : J.push(W.copyInstructionWithArgs(K, Q))
                }
            }
            return W.Noop(),
            W.replaceInstructionWithBlockVar(W.returnIndex, {
                type: a.BlockVar,
                valueType: n.valueType,
                args: [R < O ? R : J[R - O]]
            }),
            W.close().getCompiledFunction().fn();
        case a.BeginLoop:
        case a.EndLoop:
        case a.BeginIntegral:
        case a.EndIntegral:
        case a.BeginBroadcast:
        case a.EndBroadcast:
        case a.Distribution:
        case a.Noop:
        case a.LoadArg:
        case a.SymbolicVar:
        case a.Action:
            throw new Error("Programming Error: cannot interpret opcode " + n.type);
        default:
            throw new Error("Programming Error: unexpected opcode " + n.type)
        }
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r._interpretRecursive = r.interpretBroadcastElements = r.interpretBroadcastElement = r.interpret = r.NativeFunction = r.ExtendSeed = r.InboundsListAccess = r.DeferredListAccess = r.ListAccess = r.List = r.And = r.GreaterEqual = r.LessEqual = r.Greater = r.Less = r.Equal = r.OrderedPairAccess = r.OrderedPair = r.Negative = r.RawExponent = r.Exponent = r.Divide = r.Multiply = r.Subtract = r.Add = void 0,
    r.Add = g,
    r.Subtract = d,
    r.Multiply = p,
    r.Divide = f,
    r.Exponent = v,
    r.RawExponent = h,
    r.Negative = y,
    r.OrderedPair = m,
    r.OrderedPairAccess = E,
    r.Equal = L,
    r.Less = A,
    r.Greater = I,
    r.LessEqual = b,
    r.GreaterEqual = F,
    r.And = function(r, e) {
        return r && e
    }
    ,
    r.List = B,
    r.ListAccess = w,
    r.DeferredListAccess = function(r, e) {
        return R(r, e)
    }
    ,
    r.InboundsListAccess = R,
    r.ExtendSeed = q,
    r.NativeFunction = P,
    r.interpret = function(r, e) {
        return M(r, e, Array(e + 1))
    }
    ,
    r.interpretBroadcastElement = function(r, e, t) {
        return x(r, e, t, Array(e + 1))
    }
    ,
    r.interpretBroadcastElements = function(r, e, t) {
        for (var a = Array(e + 1), n = [], s = 0, u = t; s < u.length; s++) {
            var o = u[s];
            n.push(x(r, e, o, a))
        }
        return n
    }
    ,
    r._interpretRecursive = O
});
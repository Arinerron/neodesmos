define('core/math/ir/features/substitute', ["require", "exports", "../instructions", "./copy-instruction", "../opcodes"], function(require, r, t, n, e) {
    "use strict";
    function s(r, n) {
        var o = r.chunk
          , a = r.argMap
          , u = r.start;
        if (n < u)
            return n;
        var c = a[n - u];
        if (void 0 !== c)
            return c;
        var g = i(r, n);
        r.argMap[n - u] = g;
        var f = o.getInstruction(n);
        if (t.beginsBlock(f))
            switch (f.type) {
            case e.BeginBroadcast:
            case e.BeginIntegral:
                break;
            case e.BeginLoop:
                for (var p = f.args.length - 2, v = 0; v < p; v++)
                    s(r, n + 1 + v);
                break;
            default:
                throw new Error("Programming Error. Unexpected OpCode: " + f.type)
            }
        else if (t.endsBlock(f))
            for (p = f.args.length - 1,
            v = 0; v < p; v++)
                s(r, n + 1 + v);
        return g
    }
    function i(r, e) {
        var i = r.chunk
          , o = r.start
          , a = i.getInstruction(e);
        if (t.endsBlock(a))
            for (var u = a.args[0], c = u; c <= e; c++) {
                var g = i.getInstruction(c);
                if (!t.isLeafInstruction(g))
                    for (var f = 0, p = g.args; f < p.length; f++) {
                        (h = p[f]) < u && s(r, h)
                    }
            }
        if (t.isLeafInstruction(a))
            return n.copyInstruction(i, a);
        for (var v = [], d = 0, l = a.args; d < l.length; d++) {
            var h = l[d];
            v.push(s(r, h))
        }
        var I = r.argMap[e - o];
        return void 0 !== I ? I : n.copyInstructionWithArgs(i, a, v)
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r._substituteInstruction = r.substitute = void 0,
    r.substitute = function(r, t, n, e) {
        return s(function(r, t, n) {
            return {
                chunk: r,
                argMap: t,
                start: n
            }
        }(r, [t], n), e)
    }
    ,
    r._substituteInstruction = i
});
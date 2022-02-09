
define('core/math/ir/features/list-length', ["require", "exports", "../opcodes", "core/math/types", "./print"], function(require, t, n, e, r) {
    "use strict";
    function s(t, n) {
        var e = i(t, n);
        if (!(e < 0))
            return e
    }
    function i(t, s, a) {
        var o, u = a && a[s];
        if (u)
            return u;
        var c, g = t.getInstruction(s);
        switch (g.type) {
        case n.List:
            c = g.args.length;
            break;
        case n.Constant:
            c = g.value.length;
            break;
        case n.BroadcastResult:
            c = null !== (o = g.constantLength) && void 0 !== o ? o : -1
        }
        return void 0 === c && (c = function(t, s, a) {
            switch (s.type) {
            case n.Piecewise:
                var o = i(t, s.args[1], a);
                return o === i(t, s.args[2], a) ? o : -1;
            case n.NativeFunction:
                switch (s.symbol) {
                case "elementsAt":
                    return i(t, s.args[1], a);
                case "sortPerm":
                    return i(t, s.args[0], a);
                case "shuffle":
                    return i(t, s.args[1], a);
                default:
                    return -1
                }
            default:
                if (e.isList(s.valueType))
                    return -1;
                throw new Error("Programming Error: cannot find the list length of " + r.printOp(s.type) + " " + e.prettyPrint(s.valueType) + ".")
            }
        }(t, g, a = a || {})),
        a && (a[s] = c),
        c
    }
    function a(t, r) {
        var s = t.getInstruction(r);
        if (!e.isList(s.valueType))
            throw new Error("Programming Error: cannot find the list length of " + t.printInstruction(r));
        switch (s.type) {
        case n.List:
            return t.Constant(s.args.length);
        case n.Constant:
            return t.Constant(s.value.length);
        case n.BroadcastResult:
            var i = t.getInstruction(s.args[0]);
            return t.getInstruction(i.args[0]).args[0];
        case n.NativeFunction:
            switch (s.symbol) {
            case "elementsAt":
                return a(t, s.args[1]);
            case "sortPerm":
                return a(t, s.args[0]);
            case "shuffle":
                return a(t, s.args[1])
            }
        }
        return t.SyntheticNativeFunction("length", [r])
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.minListLengthIndex = t.listLengthIndex = t.getConstantListLength = t.assertConstantListLength = void 0,
    t.assertConstantListLength = function(t, n, e) {
        var i = s(t, n);
        if (void 0 === i)
            throw new Error(e + '\nNon-constant instruction: "' + r.printInstruction(t, a(t, n)) + '"');
        return i
    }
    ,
    t.getConstantListLength = s,
    t.listLengthIndex = a,
    t.minListLengthIndex = function(t, n) {
        for (var r = [], i = 0, o = n; i < o.length; i++) {
            var u = o[i];
            e.isList(t.getInstruction(u).valueType) && r.push(u)
        }
        if (0 !== r.length) {
            if (1 === r.length)
                return a(t, r[0]);
            for (var c, g = [], h = 0, l = r; h < l.length; h++) {
                var f = l[h];
                g.push(s(t, f))
            }
            for (var v = 1 / 0, p = 0; p < g.length; p++) {
                var L = r[p]
                  , d = g[p];
                if (void 0 === d)
                    return t.SyntheticNativeFunction("min", [t.List(r.map(function(n) {
                        return a(t, n)
                    }))]);
                d < v && (c = L,
                v = d)
            }
            return void 0 !== c ? a(t, c) : t.Constant(v)
        }
    }
});
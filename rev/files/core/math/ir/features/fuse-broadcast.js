
define('core/math/ir/features/fuse-broadcast', ["require", "exports", "../opcodes", "core/math/types", "../instructions", "./interpret", "./list-length", "../../errormsg", "./find-dependency-symbols"], function(require, t, r, e, n, s, i, o, u) {
    "use strict";
    function a(t, r, n) {
        if (n.valueType === e.ListOfDistribution) {
            var a = i.getConstantListLength(t, r);
            if (null == a)
                throw o.variableLengthDistributionList(u.findDependencySymbols(t, r));
            for (var c = [], f = 0; f < a; f++) {
                var d = t.InboundsListAccess([r, t.Constant(f + 1)]);
                c.push(d)
            }
            return t.List(c)
        }
        var p = s.interpret(t, r);
        return r === t.returnIndex && t.popInstruction(),
        t.ConstantOfType(n.valueType, p)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.fuseBroadcast = void 0,
    t.fuseBroadcast = function(t, e) {
        var s = t.getInstruction(e);
        if (s.type !== r.BroadcastResult)
            return e;
        if (s.isConstantBroadcast)
            return a(t, e, s);
        for (var i = s.args[0], o = t.getInstruction(i), u = o.args[0], c = !1, f = u + 1; f < i; f++) {
            var d = t.getInstruction(f);
            if (d.type === r.DeferredListAccess && d.args[1] === u) {
                c = !0;
                break
            }
        }
        if (!c)
            return e;
        for (var p = [], g = u; g <= i + o.args.length - 1; g++) {
            var v = t.getInstruction(g);
            if (n.isLeafInstruction(v))
                p.push(t.copyInstruction(v));
            else {
                for (var l = [], y = 0, I = v.args; y < I.length; y++) {
                    var h = I[y];
                    l.push(h >= u ? p[h - u] : h)
                }
                v.type === r.DeferredListAccess ? p.push(t.InboundsListAccess(l)) : p.push(t.copyInstructionWithArgs(v, l))
            }
        }
        var L = t.getInstruction(t.returnIndex);
        return L.type === r.BroadcastResult && L.isConstantBroadcast ? a(t, t.returnIndex, L) : t.returnIndex
    }
});
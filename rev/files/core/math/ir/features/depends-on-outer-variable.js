define('core/math/ir/features/depends-on-outer-variable', ["require", "exports", "../instructions", "./is-constant"], function(require, t, n, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.dependsOnOuterVariable = void 0,
    t.dependsOnOuterVariable = function(t, e, s) {
        var i = t.getInstruction(s);
        if (!n.isLeafInstruction(i))
            for (var a = 0, o = i.args; a < o.length; a++) {
                var u = o[a];
                if (!r.isConstantOrConstantBroadcast(t.getInstruction(u)))
                    return !0
            }
        if (e < s)
            return !r.isConstantOrConstantBroadcast(t.getInstruction(e));
        for (var f = [!0], c = s + 1; c <= e; c++)
            f.push(!1);
        for (var d = [e]; d.length; ) {
            if (!f[(c = d.pop()) - s]) {
                f[c - s] = !0;
                var g = t.getInstruction(c);
                if (!n.isLeafInstruction(g))
                    for (var v = 0, l = g.args; v < l.length; v++) {
                        if ((u = l[v]) < s) {
                            if (!r.isConstantOrConstantBroadcast(t.getInstruction(u)))
                                return !0
                        } else
                            f[u - s] || d.push(u)
                    }
            }
        }
        return !1
    }
});
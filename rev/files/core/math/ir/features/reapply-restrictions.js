define('core/math/ir/features/reapply-restrictions', ["require", "exports", "../instructions", "../opcodes", "./get-dependency-mask"], function(require, e, r, n, t) {
    "use strict";
    function s(e, r) {
        for (var n = [], t = 0, s = r; t < s.length; t++) {
            var i = s[t];
            n.push(e[i])
        }
        return n
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.reapplyRestrictions = void 0,
    e.reapplyRestrictions = function(e, i) {
        for (var p = [], o = e.returnIndex, u = t.getDependencyMask(e, i.mappedArgIndex), c = function(e, t, s) {
            for (var i = [], p = 0; p < s; p++)
                i.push(!1);
            i[s] = t[s];
            for (p = s; p >= 0; p--)
                if (i[p] && t[p]) {
                    var o = e.getInstruction(p);
                    if (o.type === n.Piecewise)
                        i[o.args[1]] = !0;
                    else if (!r.isLeafInstruction(o))
                        for (var u = 0, c = o.args; u < c.length; u++) {
                            i[c[u]] = !0
                        }
                }
            return i
        }(e, u, i.mappedReturnIndex), a = o, f = e.NanOfType(e.getReturnType()), d = 0; d < i.mappedReturnIndex; d++) {
            var g = e.getInstruction(d);
            if (d !== i.mappedArgIndex)
                if (u[d] || e.isInClosedBlock(d))
                    if (r.isLeafInstruction(g))
                        p.push(e.copyInstruction(g));
                    else {
                        var l = s(p, g.args);
                        p.push(e.copyInstructionWithArgs(g, l)),
                        g.type === n.Piecewise && c[d] && (a = e.Piecewise([l[0], a, f]))
                    }
                else
                    p.push(d);
            else
                p.push(o)
        }
        return a
    }
});
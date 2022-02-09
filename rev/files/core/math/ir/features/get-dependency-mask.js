
define('core/math/ir/features/get-dependency-mask', ["require", "exports", "../instructions"], function(require, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getDependencyMask = void 0,
    e.getDependencyMask = function(e, n) {
        for (var t = [], s = 0; s < e.instructionsLength(); s++)
            t.push(!1);
        t[n] = !0;
        for (var i = 0; i <= 1; i++) {
            var o = !1;
            for (s = n + 1; s < e.instructionsLength(); s++) {
                var a = e.getInstruction(s);
                if (!r.isLeafInstruction(a) && !t[s]) {
                    for (var u = !1, c = 0, f = a.args; c < f.length; c++) {
                        if (t[f[c]]) {
                            u = !0;
                            break
                        }
                    }
                    t[s] = u,
                    u && r.endsBlock(a) && !t[a.args[0]] && (t[a.args[0]] = !0,
                    o = !0)
                }
            }
            if (!o)
                break
        }
        return t
    }
});
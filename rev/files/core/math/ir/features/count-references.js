
define('core/math/ir/features/count-references', ["require", "exports", "../opcodes", "../instructions"], function(require, e, n, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.countReferences = void 0,
    e.countReferences = function(e) {
        for (var t = [], s = 0; s < e.instructionsLength(); s++) {
            t.push(0);
            var o = e.getInstruction(s);
            if (!r.isLeafInstruction(o))
                if (r.endsBlock(o) && o.type !== n.EndIntegral)
                    for (var i = 0, c = o.args; i < c.length; i++) {
                        t[c[i]] = 1 / 0
                    }
                else
                    for (var u = 0, f = o.args; u < f.length; u++) {
                        t[f[u]] += 1
                    }
        }
        return t
    }
});
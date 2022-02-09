
define('core/math/ir/features/depends-on-instruction', ["require", "exports", "../instructions"], function(require, r, n) {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.dependsOnInstruction = void 0,
    r.dependsOnInstruction = function(r, e, t) {
        if (e === t)
            return !0;
        if (e < t)
            return !1;
        for (var i = [!0], u = t + 1; u <= e; u++)
            i.push(!1);
        for (var s = [e]; s.length; ) {
            if (!i[(u = s.pop()) - t]) {
                i[u - t] = !0;
                var o = r.getInstruction(u);
                if (!n.isLeafInstruction(o))
                    for (var f = 0, c = o.args; f < c.length; f++) {
                        var a = c[f];
                        if (a === t)
                            return !0;
                        a < t || (i[a - t] || s.push(a))
                    }
            }
        }
        return !1
    }
});
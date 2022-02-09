define('core/math/ir/features/drop-unreferenced-instructions', ["require", "exports", "../instructions"], function(require, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.dropUnreferencedInstructions = void 0,
    e.dropUnreferencedInstructions = function(e) {
        for (var r = [], t = 0; t < e.instructionsLength(); t++)
            r.push(!1);
        for (r[e.returnIndex] = !0,
        t = e.instructionsLength() - 1; t >= 0; t--)
            if (r[t]) {
                var i = e.getInstruction(t);
                if (!n.isLeafInstruction(i))
                    for (var o = 0, s = i.args; o < s.length; o++) {
                        r[s[o]] = !0
                    }
            } else
                e.replaceInstructionWithNoop(t)
    }
});
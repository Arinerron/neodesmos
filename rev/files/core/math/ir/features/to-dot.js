define('core/math/ir/features/to-dot', ["require", "exports", "../instructions", "./print", "../opcodes"], function(require, t, n, r, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.default = function(t) {
        var i = [];
        i.push("digraph {");
        for (var s = 0; s < t.instructionsLength(); s++) {
            (o = t.getInstruction(s)).type !== e.Noop && i.push(s + ' [label="' + s + ": " + r.printInstruction(t, s) + '"];')
        }
        for (s = 0; s < t.instructionsLength(); s++) {
            var o = t.getInstruction(s);
            if (n.isInternalInstruction(o))
                for (var u = 0, c = o.args; u < c.length; u++) {
                    var p = c[u];
                    i.push(s + " -> " + p + ";")
                }
        }
        return i.push("}"),
        i.join("\n")
    }
});
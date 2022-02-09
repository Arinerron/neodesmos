define('core/math/baseparser', ["require", "exports", "parsenodes", "core/math/errormsg", "core/math/parser/latex-parser", "core/math/parser/expression-parser", "core/math/parser/lower"], function(require, r, e, a, t, o, n) {
    "use strict";
    function i() {
        throw a.featureUnavailable()
    }
    function s(r, e) {
        return r.setInputSpan(e),
        r
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.parse = void 0,
    r.parse = function(r, l) {
        var d = typeof r;
        if ("string" !== d)
            throw new Error("Type Error: parse can only be called with strings, got " + JSON.stringify(r) + " of type " + d);
        var c = e;
        if ((l = l || {}).disabledFeatures) {
            c = Object.create(c);
            for (var p = 0, u = l.disabledFeatures; p < u.length; p++) {
                var f = u[p];
                if (!c[f])
                    throw new Error("Programming Error: " + f + " cannot be disabled because it is not a parsenode.");
                c[f] = i
            }
        }
        var w = void 0 === l.seedPrefix ? "" : l.seedPrefix
          , m = 0
          , v = {
            nodes: c,
            currentIndex: l.index,
            setInput: s,
            nextSeed: function() {
                var r = w + "::vc" + m;
                return m += 1,
                r
            },
            allowDt: !!l.allowDt,
            allowIndex: !!l.allowIndex
        }
          , g = {};
        void 0 !== l.trailingComma && (g.trailingComma = l.trailingComma),
        l.disallowFrac && (g.disallowFrac = !0);
        try {
            var h = t.parse(r)
              , x = o.parse(h, g);
            return n.lower(v, x)
        } catch (r) {
            return r instanceof e.Error ? r : "string" == typeof r ? e.Error(r) : a.parseError()
        }
    }
});
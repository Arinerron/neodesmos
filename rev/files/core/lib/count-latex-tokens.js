define('core/lib/count-latex-tokens', ["require", "exports", "core/math/parser/latex-lexer"], function(require, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.countLatexTokens = void 0,
    e.countLatexTokens = function(e) {
        for (var t = r.lex(e), n = 0; !r.isDone(t); )
            n += 1,
            t = r.advance(t);
        return n
    }
});

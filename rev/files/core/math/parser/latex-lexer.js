define('core/math/parser/latex-lexer', ["require", "exports", "./char-codes", "./input-span"], function(require, e, t, n) {
    "use strict";
    function r(e, t, n) {
        return {
            type: e,
            span: t,
            val: n
        }
    }
    function a(e, a, i) {
        for (; t.isWhitespace(e.charCodeAt(a)); )
            a += 1;
        var o = function(e, a) {
            var i = a;
            if (a >= e.length)
                return r("End", n.emptySpanAt(e, a), "");
            var o = e.charCodeAt(a);
            if (t.isDigit(o))
                return r("Digit", u = n.Span(e, i, a + 1), e.charAt(i));
            if (t.isLetter(o))
                return r("Letter", u = n.Span(e, i, a + 1), e.charAt(i));
            if (t.isBackslash(o)) {
                if (a += 1,
                t.isLetter(e.charCodeAt(a))) {
                    for (; t.isLetter(e.charCodeAt(a)); )
                        a += 1;
                    var u = n.Span(e, i, a)
                      , c = n.slice(u);
                    return r(p[c] || "Cmd", u, c)
                }
                return a += 1,
                r("EscapedSymbol", u = n.Span(e, i, a), c = n.slice(u))
            }
            if (t.isSingleQuote(o)) {
                for (a += 1; t.isSingleQuote(e.charCodeAt(a)); )
                    a += 1;
                return "^" === e.charAt(a) ? (a += 1,
                r("Primes^", u = n.Span(e, i, a), c = n.slice(u))) : r("Primes", u = n.Span(e, i, a), c = n.slice(u))
            }
            u = n.Span(e, i, a + 1),
            c = e.charAt(i);
            return r(s[c] || "Symbol", u, c)
        }(e, a);
        return function(e, t, n, r) {
            return {
                input: e,
                prevSpan: t,
                pos: n,
                token: r
            }
        }(e, i, a, o)
    }
    function i(e) {
        return a(e.input, e.token.span.end, e.token.span)
    }
    function o(e) {
        return e.token
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.isDone = e.isAt = e.eat = e.peek = e.advance = e.lex = e.LatexToken = e.spanStates = void 0,
    e.spanStates = function(e, t) {
        return n.joinSpans(e.token.span, t.prevSpan)
    }
    ,
    e.LatexToken = r,
    e.lex = function(e) {
        return a(e, 0, n.emptySpanAt(e, 0))
    }
    ,
    e.advance = i,
    e.peek = o,
    e.eat = function(e, t) {
        if (o(e).type !== t)
            throw "Parse Error: expected " + t + ".";
        return i(e)
    }
    ,
    e.isAt = function(e, t) {
        return o(e).type === t
    }
    ,
    e.isDone = function(e) {
        return e.pos >= e.input.length
    }
    ;
    var p = {
        "\\left": "Left",
        "\\right": "Right",
        "\\sqrt": "Sqrt",
        "\\frac": "Frac",
        "\\operatorname": "OperatorName"
    }
      , s = {
        "[": "[",
        "]": "]",
        "{": "{",
        "}": "}",
        "^": "^",
        _: "_"
    }
});
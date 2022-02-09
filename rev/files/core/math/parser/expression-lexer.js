
define('core/math/parser/expression-lexer', ["require", "exports", "./expression-token-tables", "./input-span", "./input-span", "./surface-node"], function(require, e, n, r, t, a) {
    "use strict";
    function s(e, n, r, t, a, s, i, p) {
        return {
            opts: e,
            input: n,
            prevSpan: r,
            startIndex: t,
            endIndex: a,
            token: s,
            mode: i,
            parent: p
        }
    }
    function i(e, n, r) {
        return {
            type: e,
            span: n,
            val: r
        }
    }
    function p(e, r, t, a, p, o) {
        var f = r.args;
        if (t > f.length && o)
            return u(o, a);
        var v = g(r, t = m(f, t), p)
          , d = v.token
          , y = v.endIndex;
        if ("End" === d.type && o) {
            var S = o.input.args[o.startIndex];
            if ("LeftRight" === S.type) {
                var h = S.right;
                return s(e, r, a, t, y, i(n.rightTable[h.val] || "Err", h.span, h.val), p, o)
            }
        } else
            "Int" === d.type ? p = l(p) : "Differential" === d.type && (p = c(p));
        return s(e, r, a, t, y, d, p, o)
    }
    function u(e, n) {
        var r = e.input
          , t = e.endIndex
          , a = e.mode
          , s = e.parent;
        return p(e.opts, r, t + 1, n, a, s)
    }
    function o(e) {
        return e.token
    }
    function l(e) {
        return {
            type: "integral",
            parent: e
        }
    }
    function c(e) {
        if (!e || "integral" !== e.type)
            throw new Error("Programming Error: expected lexer to be in integral mode.");
        return e.parent
    }
    function f(e, n) {
        return {
            token: n,
            endIndex: e
        }
    }
    function g(e, t, a) {
        if (t >= e.args.length)
            return f(t, i("End", r.emptySpanAt(e.span.input, e.span.end), ""));
        var s = e.args[t];
        switch (s.type) {
        case "Sqrt":
        case "Frac":
        case "SupSub":
            return f(t, s);
        case "Letter":
            if (!a || "integral" !== a.type)
                return f(t, s);
            if ("d" != s.val)
                return f(t, s);
            var p = g(e, t + 1, a)
              , u = p.endIndex
              , o = p.token;
            return "Letter" === o.type || "Cmd" === o.type ? f(u, function(e, n) {
                return {
                    type: "Differential",
                    span: e,
                    val: n
                }
            }(r.joinSpans(s.span, o.span), o.val)) : f(t, s);
        case "LeftRight":
            var l = s.left;
            return f(t, i(n.leftTable[l.val] || "Err", r.joinSpans(s.span, l.span), l.val));
        case "OperatorName":
            for (var c = [], d = 0, h = s.arg.args; d < h.length; d++) {
                var b = h[d];
                if ("Letter" !== b.type)
                    return f(t, i("Err", s.span, r.slice(s.arg.span)));
                c.push(b.val)
            }
            var k = "\\" + c.join("");
            return f(t, i(n.commandTable[k] || "Cmd", s.span, k));
        case "Cmd":
            return f(t, i(n.commandTable[s.val] || "Cmd", s.span, s.val));
        case "EscapedSymbol":
            return f(t, i(n.escapedSymbolTable[s.val] || "Err", s.span, s.val));
        case "Symbol":
            return function(e, t, a) {
                switch (a.val) {
                case ".":
                    return function(e, t) {
                        var a = e.args[t];
                        if ("Symbol" !== a.type || "." !== a.val)
                            throw new Error("Programming Error: expected '.'");
                        if (t + 2 < e.args.length && y(e.args[t + 1]) && y(e.args[t + 2])) {
                            var s = r.joinSpans(a.span, e.args[t + 2].span);
                            return f(t + 2, i("...", s, r.slice(s)))
                        }
                        var p = m(e.args, t + 1);
                        if (p < e.args.length && "Digit" === e.args[p].type)
                            return v(e, t);
                        var u = n.symbolTable[a.val] || "Err";
                        return f(t, i(u, a.span, a.val))
                    }(e, t);
                case "-":
                    if ((s = e.args[t + 1]) && S(s, ">"))
                        return f(t + 1, i("->", r.joinSpans(a.span, s.span), "->"));
                    break;
                case "<":
                    if ((s = e.args[t + 1]) && S(s, "="))
                        return f(t + 1, i("<=", r.joinSpans(a.span, s.span), "<="));
                    break;
                case ">":
                    var s;
                    if ((s = e.args[t + 1]) && S(s, "="))
                        return f(t + 1, i(">=", r.joinSpans(a.span, s.span), ">="))
                }
                var p = n.symbolTable[a.val] || "Err";
                return f(t, i(p, a.span, a.val))
            }(e, t, s);
        case "Digit":
            return v(e, t);
        default:
            throw "Unexpected atom " + s.type + "."
        }
    }
    function v(e, n) {
        var t = function(e, n) {
            for (var t = e.args, s = t[n].span, i = []; n < t.length; n++) {
                var p = m(t, n);
                if (p >= t.length)
                    break;
                if ("Digit" !== (S = t[p]).type)
                    break;
                n = p,
                i.push(S.val)
            }
            if ((n = m(t, n)) >= t.length)
                return;
            var u = t[n];
            if ("Frac" !== u.type)
                return;
            for (var o = [], l = [], c = 0, g = u.num.args; c < g.length; c++) {
                if (!d(S = g[c])) {
                    if ("Digit" !== S.type)
                        return;
                    o.push(S.val)
                }
            }
            for (var v = 0, y = u.den.args; v < y.length; v++) {
                var S;
                if (!d(S = y[v])) {
                    if ("Digit" !== S.type)
                        return;
                    l.push(S.val)
                }
            }
            var h = r.joinSpans(s, u.span);
            return f(n, a.MixedNumber(h, i.join(""), o.join(""), l.join("")))
        }(e, n);
        if (t)
            return t;
        for (var s = e.args, p = e.args[n].span, u = [], o = !1, l = !1; n < s.length; n++) {
            var c = m(s, n);
            if (c >= s.length)
                break;
            var g = s[c];
            if ("Digit" === g.type)
                n = c,
                o = !0,
                u.push(g.val);
            else {
                if (l || !y(g))
                    break;
                if (c + 1 < s.length && y(e.args[c + 1]))
                    break;
                n = c,
                l = !0,
                u.push(".")
            }
        }
        if (!o)
            throw new Error("Programming Error: decimals must have at least one digit.");
        return f(n - 1, i("Decimal", r.joinSpans(p, e.args[n - 1].span), u.join("")))
    }
    function d(e) {
        switch (e.type) {
        case "Sqrt":
        case "Frac":
        case "SupSub":
        case "LeftRight":
        case "OperatorName":
        case "Symbol":
        case "Letter":
        case "Digit":
            return !1;
        case "Cmd":
            return "\\space" === e.val;
        case "EscapedSymbol":
            return "\\ " === e.val || "\\:" === e.val || "\\," === e.val || "\\;" === e.val;
        default:
            throw "Unexpected atom " + e.type + "."
        }
    }
    function m(e, n) {
        for (; n < e.length && d(e[n]); )
            n += 1;
        return n
    }
    function y(e) {
        return S(e, ".")
    }
    function S(e, n) {
        return "Symbol" === e.type && e.val === n
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.didAdvance = e.isDone = e.isAt = e.endIntegral = e.beginIntegral = e.peek = e.advance = e.lexAt = e.lex = e.emptySpanAtState = e.joinState = e.spanStates = e.Span = void 0,
    Object.defineProperty(e, "Span", {
        enumerable: !0,
        get: function() {
            return t.Span
        }
    }),
    e.spanStates = function(e, n) {
        return r.joinSpans(e.token.span, n.prevSpan)
    }
    ,
    e.joinState = function(e, n) {
        return r.joinSpans(e, n.prevSpan)
    }
    ,
    e.emptySpanAtState = function(e) {
        return r.emptySpanAt(e.token.span.input, e.token.span.start)
    }
    ,
    e.lex = function(e, n) {
        return p(n, e, 0, r.emptySpanAt(e.span.input, e.span.start), undefined, undefined)
    }
    ,
    e.lexAt = p,
    e.advance = function(e) {
        var n = e.input.args[e.startIndex]
          , r = e.token.span;
        return n && "LeftRight" === n.type ? p(e.opts, n.arg, 0, r, e.mode, e) : u(e, r)
    }
    ,
    e.peek = o,
    e.beginIntegral = l,
    e.endIntegral = c,
    e.isAt = function(e, n) {
        return o(e).type === n
    }
    ,
    e.isDone = function(e) {
        return e.startIndex >= e.input.args.length
    }
    ,
    e.didAdvance = function(e, n) {
        return n.token.span.start > e.token.span.start
    }
});
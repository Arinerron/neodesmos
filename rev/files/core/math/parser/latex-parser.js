define('core/math/parser/latex-parser', ["require", "exports", "./latex-lexer", "./input-span", "./latex-node"], function(require, e, r, a, t) {
    "use strict";
    function s(e) {
        switch (e) {
        case "Frac":
            return 2;
        case "^":
        case "_":
        case "Primes^":
        case "Left":
        case "Sqrt":
        case "OperatorName":
            return 1;
        default:
            return 0
        }
    }
    function c(e, r) {
        return {
            state: e,
            tree: r
        }
    }
    function n(e, a) {
        var s, n = e, p = [];
        e: for (; !r.isDone(e); ) {
            var u = r.peek(e);
            switch (u.type) {
            case "Cmd":
            case "EscapedSymbol":
            case "Letter":
            case "Digit":
            case "Symbol":
            case "[":
            case "{":
            case "^":
            case "_":
            case "Primes":
            case "Primes^":
            case "Left":
            case "Frac":
            case "Sqrt":
            case "OperatorName":
            case "]":
                if ("]" === u.type && a)
                    break e;
                var i;
                if (e = (s = o(e)).state,
                "Group" === (i = s.tree).type)
                    for (var v = 0, f = i.args; v < f.length; v++) {
                        var d = f[v];
                        p.push(d)
                    }
                else
                    p.push(i);
                break;
            case "}":
            case "Right":
            case "End":
                break e;
            default:
                throw "Unexpected token type " + u.type + "."
            }
        }
        var l = r.spanStates(n, e);
        return c(e, t.Group(l, p))
    }
    function o(e) {
        var a, s = r.peek(e);
        switch (s.type) {
        case "Cmd":
        case "EscapedSymbol":
        case "Letter":
        case "Digit":
        case "Symbol":
            return c(e = r.advance(e), s);
        case "[":
        case "]":
            return c(e = r.advance(e), t.Symbol(s.span, s.val));
        case "{":
            var o;
            return e = (a = n(e = r.advance(e), !1)).state,
            o = a.tree,
            c(e = r.eat(e, "}"), o);
        case "^":
        case "_":
        case "Primes":
        case "Primes^":
            return function(e) {
                var a, s, n, o, u, i = e, v = 0;
                e: for (; !r.isDone(e); ) {
                    var f = r.peek(e);
                    switch (f.type) {
                    case "^":
                        if (e = r.advance(e),
                        o)
                            throw "Parse Error: double superscript.";
                        e = (a = p(e, f)).state,
                        o = a.tree;
                        break;
                    case "_":
                        if (e = r.advance(e),
                        u)
                            throw "Parse Error: double subscript.";
                        e = (s = p(e, f)).state,
                        u = s.tree;
                        break;
                    case "Primes":
                        if (e = r.advance(e),
                        v > 0)
                            throw "Parse Error: double primes.";
                        v = f.val.length;
                        break;
                    case "Primes^":
                        if (e = r.advance(e),
                        v > 0)
                            throw "Parse Error: double primes.";
                        if (o)
                            throw "Parse Error: double superscript";
                        v = f.val.length - 1,
                        e = (n = p(e, f)).state,
                        o = n.tree;
                        break;
                    default:
                        break e
                    }
                }
                var d = r.spanStates(i, e);
                return c(e, t.SupSub(d, o, u, v))
            }(e);
        case "Left":
            return function(e) {
                var a, s = e;
                e = r.eat(e, "Left");
                var o, p = r.peek(e);
                e = r.advance(e),
                a = n(e, !1),
                e = a.state,
                o = a.tree,
                e = r.eat(e, "Right");
                var u = r.peek(e);
                e = r.advance(e);
                var i = r.spanStates(s, e);
                return c(e, t.LeftRight(i, p, u, o))
            }(e);
        case "Frac":
            return function(e) {
                var a, s, n, o, u = e, i = r.peek(e);
                e = r.eat(e, "Frac"),
                a = p(e, i),
                e = a.state,
                n = a.tree,
                s = p(e, i),
                e = s.state,
                o = s.tree;
                var v = r.spanStates(u, e);
                return c(e, t.Frac(v, n, o))
            }(e);
        case "Sqrt":
            return function(e) {
                var a, s, o, u, i = e, v = r.peek(e);
                e = r.eat(e, "Sqrt"),
                r.isAt(e, "[") && (a = function(e) {
                    var a, t;
                    return e = r.eat(e, "["),
                    a = n(e, !0),
                    e = a.state,
                    t = a.tree,
                    c(e = r.eat(e, "]"), t)
                }(e),
                e = a.state,
                o = a.tree);
                s = p(e, v),
                e = s.state,
                u = s.tree;
                var f = r.spanStates(i, e);
                return c(e, t.Sqrt(f, o, u))
            }(e);
        case "OperatorName":
            return function(e) {
                var a, s, n = e, o = r.peek(e);
                e = r.eat(e, "OperatorName"),
                a = p(e, o),
                e = a.state,
                s = a.tree;
                var u = r.spanStates(n, e);
                return c(e, t.OperatorName(u, s))
            }(e);
        case "}":
        case "Right":
            throw "Parse Error: unexpected " + s.val + ".";
        case "End":
            throw "Parse Error: unexpected end.";
        default:
            throw "Unexpected token type " + s.type + "."
        }
    }
    function p(e, n) {
        var p, u, i = s(n.type);
        if (i <= 0)
            throw new Error("Programming Error: greediness must be greater than 0.");
        var v = s(r.peek(e).type);
        if (v > 0 && v <= i) {
            var f = a.slice(n.span);
            throw "Parse Error: can't use " + a.slice(r.peek(e).span) + " as argument of " + f + ". Use {}."
        }
        return e = (p = o(e)).state,
        "Group" !== (u = p.tree).type && (u = t.Group(u.span, [u])),
        c(e, u)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.parse = void 0,
    e.parse = function(e) {
        var t = n(r.lex(e), !1)
          , s = t.state
          , c = t.tree;
        if (!r.isDone(s))
            throw "Parse error: unexpected " + a.slice(r.peek(s).span) + ".";
        return c
    }
});
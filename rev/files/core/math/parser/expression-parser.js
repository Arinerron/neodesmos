
define('core/math/parser/expression-parser', ["require", "exports", "tslib", "core/math/errormsg", "./surface-node", "./surface-node-error", "./input-span", "./expression-lexer", "./precspec", "./lower"], function(require, e, r, t, a, n, s, i, p, u) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.parse = void 0;
    var c = [[p.initial("("), p.la(")"), p.initial("\\{"), p.la("\\}"), p.r("["), p.la("]"), p.initial("(|"), p.la("|)"), p.la("Differential"), p.la("End")], [p.r("for")], [p.ra("...")], [p.la(",")], [p.ra(":")], [p.r("->")], [p.la("="), p.la(">"), p.la("<"), p.la(">="), p.la("<="), p.la("~")], [p.l("->")], [p.l("for")], [p.la("+"), p.la("-")], [p.la("*"), p.la("/"), p.la("Decimal"), p.la("MixedNumber"), p.la("Letter"), p.la("Cmd"), p.la("%"), p.r("("), p.la("\\{"), p.la("(|"), p.la("Frac"), p.la("Sqrt"), p.la("Trig"), p.la("Ln"), p.la("Log"), p.ra("Int"), p.ra("Sum"), p.ra("Prod")], [p.initial("+"), p.initial("-")], [p.la("!")], [p.la("SupSub")], [p.l("["), p.la(".")], [p.l("(")], [p.la("Err")]]
      , o = p.precSpec(c)
      , l = o.leftPrec
      , d = o.rightPrec
      , E = o.initialPrec
      , f = {
        trailingComma: !1
    };
    function y(e, r) {
        var t = (void 0 === r ? {
            isToplevel: !1
        } : r).isToplevel;
        if (i.isDone(e))
            return n.Err(i.spanStates(e, e), n.EmptyGroup());
        var a = S(e, 0, {
            isToplevel: t
        })
          , s = a.state
          , p = a.tree;
        return "Err" === p.type || i.isDone(s) ? p : C(s).tree
    }
    function v(e, r) {
        return {
            state: e,
            tree: r
        }
    }
    function S(e, r, s) {
        var p, u, c, o = (void 0 === s ? {
            isToplevel: !1
        } : s).isToplevel, f = e;
        if (p = function(e) {
            var r, s, p, u, c, o, d, f, g, x, b, P, k, w, B, I, L, O, q, F = e, R = i.peek(e), N = E(R.type);
            switch (R.type) {
            case "+":
                if (e = (r = S(e = i.advance(e), N)).state,
                "Err" === (q = r.tree).type) {
                    if (!m(q.error))
                        return v(e, q);
                    var G = i.spanStates(F, e);
                    return v(e, n.Err(G, n.UnaryOperatorMissingRight(R.val)))
                }
                return v(e, a.Pos(i.spanStates(F, e), [q]));
            case "-":
                if (e = (s = S(e = i.advance(e), N)).state,
                "Err" === (q = s.tree).type) {
                    if (!m(q.error))
                        return v(e, q);
                    G = i.spanStates(F, e);
                    return v(e, n.Err(G, n.UnaryOperatorMissingRight(R.val)))
                }
                return v(e, a.Neg(i.spanStates(F, e), [q]));
            case "(":
                return A(e);
            case "\\{":
                return e = i.advance(e),
                i.isAt(e, "\\}") ? v(e = i.advance(e), a.EmptyPiecewise(i.spanStates(F, e))) : (e = (u = j(F, e = (p = S(e, N)).state, q = p.tree, "\\{", "\\}")).state,
                "Err" === (q = u.tree).type ? v(e, q) : v(e, a.Piecewise(i.spanStates(F, e), [q])));
            case "[":
                return e = i.advance(e),
                i.isAt(e, "]") ? v(e = i.advance(e), a.List(i.spanStates(F, e), [])) : (e = (o = j(F, e = (c = S(e, N)).state, q = c.tree, "[", "]")).state,
                "Err" === (q = o.tree).type ? v(e, q) : v(e, a.List(i.spanStates(F, e), [q])));
            case "(|":
                if (e = i.advance(e),
                i.isAt(e, "|)")) {
                    e = i.advance(e);
                    G = i.spanStates(F, e);
                    return v(e, n.Err(G, n.EmptyPipe()))
                }
                return e = (f = j(F, e = (d = S(e, N)).state, q = d.tree, "(|", "|)")).state,
                "Err" === (q = f.tree).type ? v(e, q) : v(e, a.Pipes(i.spanStates(F, e), [q]));
            case "Frac":
                if (e.opts.disallowFrac)
                    throw t.fractionsUnavailable();
                e = i.advance(e);
                var T = y(i.lex(R.num, e.opts))
                  , _ = y(i.lex(R.den, e.opts));
                if ("Err" === T.type && "EmptyGroup" === T.error.type && "Err" === _.type && "EmptyGroup" === _.error.type) {
                    G = i.spanStates(F, e);
                    return v(e, n.Err(G, n.FractionEmpty()))
                }
                if ("Err" === T.type && "EmptyGroup" === T.error.type) {
                    G = i.spanStates(F, e);
                    return v(e, n.Err(G, n.FractionMissingNumerator()))
                }
                if ("Err" === _.type && "EmptyGroup" === _.error.type) {
                    G = i.spanStates(F, e);
                    return v(e, n.Err(G, n.FractionMissingDenominator()))
                }
                if ("Err" === T.type)
                    return v(e, T);
                if ("Err" === _.type)
                    return v(e, _);
                if (a.isDerivative(T, _) && "Juxt" === _.type) {
                    var W = _.args[1]
                      , J = void 0;
                    if (e = (g = S(e, l("*") - 1)).state,
                    "Err" === (J = g.tree).type) {
                        if (m(J.error)) {
                            G = i.spanStates(F, e);
                            return v(e, n.Err(G, n.DerivativeMissingBody()))
                        }
                        return v(e, J)
                    }
                    return v(e, a.Derivative(i.spanStates(F, e), [W, J]))
                }
                return v(e, a.Frac(i.spanStates(F, e), [T, _]));
            case "Sqrt":
                if (e = i.advance(e),
                R.optArg) {
                    var z = y(i.lex(R.optArg, e.opts));
                    return "Err" === z.type ? "EmptyGroup" === z.error.type ? v(e, n.Err(z.span, n.EmptyRadicalIndex())) : v(e, z) : "Err" === (H = y(i.lex(R.arg, e.opts))).type ? "EmptyGroup" === H.error.type ? v(e, n.Err(H.span, n.EmptyRadical())) : v(e, H) : v(e, a.Nthroot(i.spanStates(F, e), [z, H]))
                }
                var H;
                return "Err" === (H = y(i.lex(R.arg, e.opts))).type ? "EmptyGroup" === H.error.type ? v(e, n.Err(H.span, n.EmptyRadical())) : v(e, H) : v(e, a.Sqrt(i.spanStates(F, e), [H]));
            case "Trig":
            case "Ln":
                e = i.advance(e);
                var K = a.Cmd(i.spanStates(F, e), R.val)
                  , Q = 0;
                if ("SupSub" === (ie = i.peek(e)).type) {
                    if (e = i.advance(e),
                    ie.sub) {
                        G = i.spanStates(F, e);
                        return v(e, n.Err(G, n.UnexpectedSubscript(K.val)))
                    }
                    if (Z = h(ie, e.opts)) {
                        if ("Err" === Z.type)
                            return v(e, Z);
                        K = a.Superscript(i.spanStates(F, e), [K, Z])
                    }
                    Q = ie.nprimes
                }
                if (V = i.isAt(e, "(")) {
                    if (e = (x = A(e)).state,
                    "Err" === (q = x.tree).type)
                        return v(e, q);
                    q = a.Call(i.spanStates(F, e), [K, q.args[0]])
                } else {
                    if (e = (b = S(e, N - 1)).state,
                    "Err" === (q = b.tree).type)
                        return m(q.error) ? v(e, n.Err(i.spanStates(F, e), n.FunctionMissingArgument(R.val))) : v(e, q);
                    q = a.ImplicitCall(i.spanStates(F, e), [K, q])
                }
                if (Q > 0) {
                    G = i.spanStates(F, e);
                    if (!V)
                        return v(e, n.Err(G, n.PrimeWithoutParen()));
                    q = a.Prime(G, Q, [q])
                }
                return v(e, q);
            case "Log":
                e = i.advance(e);
                var V, X = i.spanStates(F, e), Y = (K = a.Cmd(X, R.val),
                Q = 0,
                void 0), Z = void 0;
                if ("SupSub" === (ie = i.peek(e)).type && (Y = M(ie, (e = i.advance(e)).opts),
                Z = h(ie, e.opts),
                Q = ie.nprimes),
                Y && "Err" === Y.type)
                    return v(e, Y);
                if (Z && "Err" === Z.type)
                    return v(e, Z);
                if (V = i.isAt(e, "(")) {
                    if (e = (P = A(e)).state,
                    "Err" === (q = P.tree).type)
                        return v(e, q);
                    q = q.args[0]
                } else if (e = (k = S(e, N - 1)).state,
                "Err" === (q = k.tree).type)
                    return m(q.error) ? v(e, n.Err(i.spanStates(F, e), n.FunctionMissingArgument(R.val))) : v(e, q);
                var $ = Y ? a.Cmd(X, "\\logbase") : K
                  , ee = Y ? a.Seq(i.spanStates(F, e), a.unwrapSeq(q).concat(Y)) : q;
                if (Z && ($ = a.Superscript(i.spanStates(F, e), [$, Z])),
                q = V ? a.Call(i.spanStates(F, e), [$, ee]) : a.ImplicitCall(i.spanStates(F, e), [$, ee]),
                Q > 0) {
                    G = i.spanStates(F, e);
                    if (!V)
                        return v(e, n.Err(G, n.PrimeWithoutParen()));
                    q = a.Prime(G, Q, [q])
                }
                return v(e, q);
            case "Int":
                if (e = i.advance(e),
                "Err" === (te = D(ie = i.peek(e), F, e = i.advance(e))).type)
                    return "MissingBound" === te.error.type ? v(e, n.Err(te.span, n.IntegralMissingBound())) : v(e, te);
                Z = te.sup,
                Y = te.sub,
                W = void 0;
                if (i.isAt(e, "Differential"))
                    return e = (w = U(e)).state,
                    "Err" === (W = w.tree).type ? v(e, W) : v(e, a.EmptyIntegral(i.spanStates(F, e), [W, Y, Z]));
                if (e = (B = S(e, N)).state,
                "Err" === (q = B.tree).type)
                    return m(q.error) ? v(e, n.Err(q.span, n.IntegralMissingBody())) : v(e, q);
                var re = q;
                return i.isAt(e, "Differential") ? (e = (I = U(e)).state,
                "Err" === (W = I.tree).type ? v(e, W) : v(e, a.Integral(i.spanStates(F, e), [W, Y, Z, re]))) : v(e, n.Err(i.spanStates(F, e), n.IntegralMissingDifferential()));
            case "Sum":
                if (e = i.advance(e),
                "Err" === (te = D(ie = i.peek(e), F, e = i.advance(e))).type)
                    return "MissingBound" === te.error.type ? v(e, n.Err(te.span, n.SumMissingBound())) : v(e, te);
                Z = te.sup,
                Y = te.sub;
                return e = (L = S(e, N)).state,
                "Err" === (q = L.tree).type ? m(q.error) ? v(e, n.Err(q.span, n.SumMissingBody())) : v(e, q) : v(e, a.Sum(i.spanStates(F, e), [q, Y, Z]));
            case "Prod":
                var te;
                if (e = i.advance(e),
                "Err" === (te = D(ie = i.peek(e), F, e = i.advance(e))).type)
                    return "MissingBound" === te.error.type ? v(e, n.Err(te.span, n.ProductMissingBound())) : v(e, te);
                Z = te.sup,
                Y = te.sub;
                return e = (O = S(e, N)).state,
                "Err" === (q = O.tree).type ? m(q.error) ? v(e, n.Err(q.span, n.ProductMissingBody())) : v(e, q) : v(e, a.Product(i.spanStates(F, e), [q, Y, Z]));
            case "Cmd":
                return v(e = i.advance(e), q = a.Cmd(i.spanStates(F, e), R.val));
            case "Letter":
                return v(e = i.advance(e), q = a.Letter(i.spanStates(F, e), R.val));
            case "Decimal":
                e = i.advance(e);
                var ae = a.Decimal(i.spanStates(F, e), R.val);
                if ("Decimal" === (ie = e.token).type || "MixedNumber" === ie.type) {
                    var ne = e;
                    e = i.advance(e);
                    G = i.spanStates(F, e);
                    var se = "MixedNumber" === ie.type ? ie : a.Decimal(i.spanStates(ne, e), ie.val);
                    return v(e, n.Err(G, n.AdjacentNumbers([ae, se])))
                }
                return v(e, ae);
            case "MixedNumber":
                if (e.opts.disallowFrac)
                    throw t.fractionsUnavailable();
                var ie;
                if ("Decimal" === (ie = (e = i.advance(e)).token).type || "MixedNumber" === ie.type) {
                    ne = e;
                    e = i.advance(e);
                    G = i.spanStates(F, e),
                    se = "MixedNumber" === ie.type ? ie : a.Decimal(i.spanStates(ne, e), ie.val);
                    return v(e, n.Err(G, n.AdjacentNumbers([R, se])))
                }
                return v(e, R);
            case "*":
            case "/":
            case ",":
            case "=":
            case ">":
            case "<":
            case ">=":
            case "<=":
            case "->":
            case "~":
            case ":":
            case "...":
            case "%":
            case ".":
                e = i.advance(e);
                G = i.spanStates(F, e);
                return v(e, n.Err(G, n.BinaryOperatorMissingLeft(R.val)));
            case "for":
                e = i.advance(e);
                G = i.spanStates(F, e);
                return v(e, n.Err(G, n.UnexpectedFor()));
            case "!":
                e = i.advance(e);
                G = i.spanStates(F, e);
                return v(e, n.Err(G, n.UnaryOperatorMissingLeft(R.val)));
            case "SupSub":
                e = i.advance(e);
                var pe = "supsub";
                R.sub ? pe = "subscript" : R.sup ? pe = "superscript" : R.nprimes > 0 && (pe = "prime");
                G = i.spanStates(F, e);
                return v(e, n.Err(G, n.UnaryOperatorMissingLeft(pe)));
            case ")":
            case "\\}":
            case "]":
            case "|)":
            case "Differential":
                return C(e);
            case "Err":
                e = i.advance(e);
                G = i.spanStates(F, e);
                return v(e, n.Err(G, n.UnrecognizedSymbol(R.val)));
            case "End":
                G = i.spanStates(F, e);
                return v(e, n.Err(G, n.UnexpectedEnd()));
            default:
                throw "Unexpected token type " + R.type + "."
            }
        }(f),
        f = p.state,
        "Err" === (c = p.tree).type)
            return v(f, c);
        if (!i.didAdvance(e, f))
            throw new Error("Programming Error: parseInitial did not advance state.");
        for (; !i.isDone(f); ) {
            if (r >= (i.isAt(f, "(") && !b(c) ? d("(") : l(i.peek(f).type)))
                break;
            var P = f;
            if (f = (u = x(f, c, g(f, c, o) ? l(",") - 1 : d(i.peek(f).type))).state,
            "Err" === (c = u.tree).type)
                return v(f, c);
            if (!i.didAdvance(P, f))
                throw new Error("Programming Error: parseSuccessor did not advance state.")
        }
        return v(f, c)
    }
    function m(e) {
        return "UnexpectedDifferential" === e.type || "UnexpectedCloseDelimiter" === e.type || "UnexpectedEnd" === e.type || "BinaryOperatorMissingLeft" === e.type
    }
    function g(e, r, t) {
        return i.isAt(e, "=") && t && (u.isFunctionSignature(r) || u.isLegalAssignmentLhs(r))
    }
    function x(e, r, t) {
        var s, p, u, c, o, d, E, f, y, g, x, b, M, D = i.peek(e);
        switch (D.type) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
        case "~":
        case ":":
        case ".":
        case "->":
        case "for":
            if (e = (s = S(e = i.advance(e), t)).state,
            "Err" === (M = s.tree).type) {
                if (m(M.error)) {
                    var U = i.joinState(r.span, e);
                    return v(e, n.Err(U, n.BinaryOperatorMissingRight(D.val)))
                }
                return v(e, M)
            }
            return v(e, function(e, r, t) {
                switch (e) {
                case "+":
                    return a.Add(r, t);
                case "-":
                    return a.Sub(r, t);
                case "*":
                    return a.Mul(r, t);
                case "/":
                    return a.Div(r, t);
                case "=":
                    return a.Equals(r, t);
                case "~":
                    return a.Tilde(r, t);
                case ":":
                    return a.Colon(r, t);
                case ".":
                    return a.Dot(r, t);
                case "->":
                    return a.RightArrow(r, t);
                case "for":
                    return a.For(r, t);
                default:
                    throw "Unexpected token type " + e + "."
                }
            }(D.type, i.joinState(r.span, e), [r, M]));
        case "%":
            e = i.advance(e);
            var w = i.peek(e);
            if ("Cmd" !== w.type || "of" !== w.val && "\\of" !== w.val)
                return v(e, n.Err(D.span, n.PercentMissingOf()));
            if (e = (p = S(e = i.advance(e), t)).state,
            "Err" === (M = p.tree).type) {
                if (m(M.error)) {
                    U = i.joinState(r.span, e);
                    return v(e, n.Err(U, n.BinaryOperatorMissingRight(D.val)))
                }
                return v(e, M)
            }
            return v(e, a.PercentOf(i.joinState(r.span, e), [r, M]));
        case ">=":
        case "<=":
        case ">":
        case "<":
            var B = D.type;
            if (e = (u = S(e = i.advance(e), t)).state,
            "Err" === (M = u.tree).type) {
                if (m(M.error)) {
                    U = i.joinState(r.span, e);
                    return v(e, n.Err(U, n.BinaryOperatorMissingRight(D.val)))
                }
                return v(e, M)
            }
            for (var I = a.Inequality(i.joinState(r.span, e), B, [r, M]), L = [], O = i.peek(e).type; ">=" === O || "<=" === O || ">" === O || "<" === O; ) {
                var q = e;
                if (B = O,
                e = (c = S(e = i.advance(e), t)).state,
                "Err" === (M = c.tree).type) {
                    if (m(M.error)) {
                        U = i.joinState(r.span, e);
                        return v(e, n.Err(U, n.BinaryOperatorMissingRight(D.val)))
                    }
                    return v(e, M)
                }
                L.push(a.TrailingInequalityPiece(i.spanStates(q, e), B, [M])),
                O = i.peek(e).type
            }
            return L.length ? v(e, a.InequalityChain(i.joinState(r.span, e), I, L)) : v(e, I);
        case "!":
            return v(e = i.advance(e), a.Bang(i.joinState(r.span, e), [r]));
        case "[":
            q = e;
            if (e = i.advance(e),
            i.isAt(e, "]")) {
                e = i.advance(e);
                U = i.spanStates(q, e);
                return v(e, n.Err(U, n.EmptySquareBracket()))
            }
            return e = (d = j(q, e = (o = S(e, t)).state, M = o.tree, "[", "]")).state,
            "Err" === (M = d.tree).type ? v(e, M) : v(e, a.Index(i.joinState(r.span, e), [r, M]));
        case "Sqrt":
        case "Frac":
        case "Letter":
        case "Cmd":
        case "Trig":
        case "Ln":
        case "Log":
        case "Sum":
        case "Int":
        case "Prod":
        case "Decimal":
        case "MixedNumber":
        case "\\{":
        case "(|":
            return e = (E = S(e, t)).state,
            "Err" === (M = E.tree).type ? v(e, M) : v(e, a.Juxt(i.joinState(r.span, e), [r, M]));
        case "(":
            if (a.isIdentifier(r)) {
                if (e = (f = A(e)).state,
                "Err" === (M = f.tree).type)
                    return v(e, M);
                U = i.joinState(r.span, e);
                return v(e, a.Call(U, [r, M.args[0]]))
            }
            if ("Prime" === r.type && a.isIdentifier(r.args[0])) {
                if (e = (y = A(e)).state,
                "Err" === (M = y.tree).type)
                    return v(e, M);
                U = i.joinState(r.span, e);
                return v(e, a.Prime(U, r.nprimes, [a.Call(U, [r.args[0], M.args[0]])]))
            }
            return e = (g = S(e, t)).state,
            "Err" === (M = g.tree).type ? v(e, M) : v(e, a.Juxt(i.joinState(r.span, e), [r, M]));
        case "SupSub":
            e = i.advance(e);
            var F = P(D)
              , R = h(D, e.opts);
            if (F && "Err" === F.type)
                return v(e, F);
            if (R && "Err" === R.type)
                return v(e, R);
            if (F && (r = a.Subscript(i.joinState(r.span, e), [r, F])),
            R && (r = a.Superscript(i.joinState(r.span, e), [r, R])),
            D.nprimes > 0) {
                U = i.joinState(r.span, e);
                if (!a.isIdentifier(r))
                    return v(e, n.Err(U, n.UnexpectedPrime()));
                r = a.Prime(U, D.nprimes, [r])
            }
            return v(e, r);
        case ",":
            for (var N = [r]; i.isAt(e, ",") && (e = i.advance(e),
            !i.isAt(e, "...")) && (!e.opts.trailingComma || !k(e)); ) {
                if (e = (x = S(e, t)).state,
                "Err" === (M = x.tree).type) {
                    if (m(M.error)) {
                        U = i.joinState(r.span, e);
                        return v(e, n.Err(U, n.BinaryOperatorMissingRight(D.val)))
                    }
                    return v(e, M)
                }
                N.push(M)
            }
            return v(e, a.Seq(i.joinState(r.span, e), N));
        case "...":
            if (e = i.advance(e),
            i.isAt(e, ",") && (e = i.advance(e)),
            t >= l(i.peek(e).type))
                return v(e, a.Ellipsis(i.joinState(r.span, e), [r, a.EmptyRangeEnd(i.emptySpanAtState(e))]));
            if (e = (b = S(e, t)).state,
            "Err" === (M = b.tree).type) {
                if (m(M.error)) {
                    U = i.joinState(r.span, e);
                    return v(e, n.Err(U, n.BinaryOperatorMissingRight(D.val)))
                }
                return v(e, M)
            }
            return v(e, a.Ellipsis(i.joinState(r.span, e), [r, M]));
        case "]":
        case ")":
        case "\\}":
        case "|)":
        case "Differential":
            return C(e);
        case "Err":
            return S(e, t);
        case "End":
            U = i.spanStates(e, e);
            return v(e, n.Err(U, n.UnexpectedEnd()));
        default:
            throw "Unexpected token type " + D.type + "."
        }
    }
    function b(e) {
        return !!a.isIdentifier(e) || !("Prime" !== e.type || !a.isIdentifier(e.args[0]))
    }
    function M(e, r) {
        if (e.sub) {
            var t = e.sub
              , a = y(i.lex(t, r));
            return "Err" === a.type && "EmptyGroup" === a.error.type ? n.Err(a.span, n.EmptySubscript()) : a
        }
    }
    function P(e) {
        if (e.sub) {
            var r = e.sub;
            if (0 === r.args.length)
                return n.Err(r.span, n.EmptySubscript());
            for (var t = [], i = 0, p = r.args; i < p.length; i++) {
                var u = p[i];
                if ("Digit" !== u.type && "Letter" !== u.type) {
                    var c = u.span;
                    return n.Err(c, n.InvalidSubscript(s.slice(c)))
                }
                t.push(u.val)
            }
            return a.Alphanumeric(r.span, t.join(""))
        }
    }
    function h(e, r) {
        if (e.sup) {
            var t = y(i.lex(e.sup, r));
            return "Err" === t.type ? "EmptyGroup" === t.error.type ? n.Err(t.span, n.EmptySuperscript()) : t : e.nprimes > 0 ? n.Err(e.span, n.SuperscriptWithPrime()) : t
        }
    }
    function D(e, r, t) {
        if ("SupSub" !== e.type) {
            var a = i.spanStates(r, t);
            return n.Err(a, n.MissingBound())
        }
        if (e.nprimes > 0) {
            a = i.spanStates(r, t);
            return n.Err(a, n.UnexpectedPrime())
        }
        var s = M(e, t.opts)
          , p = h(e, t.opts);
        if (!s || "Err" === s.type && "EmptySubscript" === s.error.type || !p || "Err" === p.type && "EmptySuperscript" === p.error.type) {
            a = i.spanStates(r, t);
            return n.Err(a, n.MissingBound())
        }
        return "Err" === s.type ? s : "Err" === p.type ? p : {
            type: "Bounds",
            sup: p,
            sub: s
        }
    }
    function A(e) {
        var r, t, n, s = e, p = i.peek(e), u = E(p.type);
        if (!i.isAt(e, "("))
            throw new Error("Programming Error: expected '(' at start of parseParen.");
        if (e = i.advance(e),
        i.isAt(e, ")")) {
            var c = a.Seq(i.emptySpanAtState(e), []);
            e = i.advance(e);
            var o = i.spanStates(s, e);
            return v(e, a.Paren(o, [c]))
        }
        return e = (t = j(s, e = (r = S(e, u)).state, n = r.tree, "(", ")")).state,
        "Err" === (n = t.tree).type ? v(e, n) : v(e, a.Paren(i.spanStates(s, e), [n]))
    }
    function U(e) {
        var r = e
          , t = i.peek(e);
        if ("Differential" !== t.type)
            throw new Error("Programming Error: expected differential");
        e = i.advance(e);
        var s = a.Cmd(t.span, t.val)
          , p = i.peek(e);
        if ("SupSub" === p.type) {
            e = i.advance(e);
            var u = i.spanStates(r, e)
              , c = P(p);
            if (c) {
                if ("Err" === c.type)
                    return v(e, c);
                s = a.Subscript(u, [s, c])
            }
            if (p.sup)
                return v(e, n.Err(u, n.DifferentialWithSuperscript()));
            if (p.nprimes > 0)
                return v(e, n.Err(u, n.UnexpectedPrime()))
        }
        return v(e, s)
    }
    function j(e, r, t, a, s) {
        if ("Err" === t.type && "UnexpectedEnd" !== t.error.type)
            return v(r, t);
        if ("Err" === t.type || !i.isAt(r, s)) {
            var p = i.spanStates(e, r);
            return v(r, n.Err(p, n.MissingCloseDelimiter(a, s)))
        }
        return v(r = i.advance(r), t)
    }
    function C(e) {
        var r = e;
        switch (i.peek(e).type) {
        case ")":
            e = i.advance(e);
            var t = i.spanStates(r, e);
            return v(e, n.Err(t, n.UnexpectedCloseDelimiter("(", ")")));
        case "]":
            e = i.advance(e);
            t = i.spanStates(r, e);
            return v(e, n.Err(t, n.UnexpectedCloseDelimiter("[", "]")));
        case "\\}":
            e = i.advance(e);
            t = i.spanStates(r, e);
            return v(e, n.Err(t, n.UnexpectedCloseDelimiter("\\{", "\\}")));
        case "|)":
            e = i.advance(e);
            t = i.spanStates(r, e);
            return v(e, n.Err(t, n.UnexpectedCloseDelimiter("|", "|")));
        case "Differential":
            e = i.advance(e);
            t = i.spanStates(r, e);
            return v(e, n.Err(t, n.UnexpectedDifferential()));
        default:
            e = i.advance(e);
            t = i.spanStates(r, e);
            return v(e, n.Err(t, n.UnexpectedParseError()))
        }
    }
    function k(e) {
        return i.isAt(e, ")") || i.isAt(e, "]") || i.isAt(e, "\\}")
    }
    e.parse = function(e, t) {
        var a = t ? r.__assign(r.__assign({}, f), t) : f
          , s = y(i.lex(e, a), {
            isToplevel: !0
        });
        return "Err" === s.type && "EmptyGroup" === s.error.type ? n.Err(s.span, n.EmptyInput()) : s
    }
});
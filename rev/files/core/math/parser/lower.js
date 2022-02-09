define('core/math/parser/lower', ["require", "exports", "core/math/inverses", "tslib", "core/math/errormsg", "./input-span", "./surface-node", "../maybe-rational"], function(require, e, r, t, a, n, s, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.isLegalAssignmentLhs = e.isFunctionSignature = e.lower = void 0;
    var c = 0;
    function u(e, r) {
        for (var t = [], a = 0; a < r.length; a++)
            t.push(d(e, r[a]));
        return t
    }
    function o(e) {
        if ("Call" === e.type) {
            var r = e.args
              , t = r[0]
              , a = r[1]
              , n = s.unwrapSeq(a);
            return s.isIdentifier(t) && n.every(s.isIdentifier) ? {
                base: t,
                args: n
            } : void 0
        }
    }
    function p(e) {
        return s.isIdentifier(e)
    }
    function l(e) {
        if ("Paren" !== e.type)
            return !1;
        var r = e.args[0];
        return "Seq" === r.type && 2 === r.args.length
    }
    function d(e, r) {
        return e.setInput(g(e, r), r.span)
    }
    function g(e, r) {
        var t = e.nodes;
        switch (r.type) {
        case "Pos":
            return g(e, r.args[0]);
        case "Neg":
            for (var o = -1, p = r.args[0]; ; )
                if ("Pos" === p.type || "Paren" === p.type && !l(p))
                    p = p.args[0];
                else {
                    if ("Neg" !== p.type)
                        break;
                    p = p.args[0],
                    o *= -1
                }
            switch (p.type) {
            case "Decimal":
                var P = w(p);
                return t.Constant(-1 === o ? i.neg(P) : P);
            case "MixedNumber":
                P = S(p);
                return t.MixedNumber(-1 === o ? i.neg(P) : P);
            default:
                return -1 === o ? t.Negative([d(e, p)]) : g(e, p)
            }
        case "Add":
            return t.Add(u(e, r.args));
        case "Sub":
            return t.Subtract(u(e, r.args));
        case "Mul":
            return t.Multiply(u(e, r.args));
        case "Div":
            return t.Divide(u(e, r.args));
        case "Bang":
            var M = r.args[0];
            return "Call" === M.type ? t.FunctionFactorial(u(e, M.args)) : t.FunctionCall("\\factorial", u(e, r.args));
        case "PercentOf":
            return t.PercentOf(u(e, r.args));
        case "Call":
            return m(e, r);
        case "ImplicitCall":
            return function(e) {
                var r = e.args
                  , t = r[0]
                  , n = r[1];
                "Superscript" === t.type && (t = t.args[0]);
                if ("Cmd" === t.type && "logbase" === t.val && "Seq" === n.type && 2 === n.args.length) {
                    if (!I(n.args[0]))
                        throw a.badImplicitCall("log")
                } else if (!I(n)) {
                    if ("Cmd" === t.type)
                        throw a.badImplicitCall(t.val);
                    throw a.parseError()
                }
            }(r),
            m(e, r);
        case "Dot":
            var D = r.args[1]
              , A = u(e, r.args)
              , L = A[0]
              , F = A[1];
            if (C(D)) {
                var B = n.emptySpanAt(D.span.input, D.span.end)
                  , O = e.setInput(q(e), B);
                F = e.setInput(t.SeededFunctionCall(F, [O]), D.span)
            } else if ("Letter" === D.type)
                switch (D.val) {
                case "x":
                    return t.OrderedPairAccess([L, t.Constant(1)]);
                case "y":
                    return t.OrderedPairAccess([L, t.Constant(2)])
                }
            else if ("Call" === D.type) {
                if ("Letter" === (U = D.args[0]).type)
                    switch (U.val) {
                    case "x":
                        return t.Multiply([t.OrderedPairAccess([L, t.Constant(1)]), d(e, D.args[1])]);
                    case "y":
                        return t.Multiply([t.OrderedPairAccess([L, t.Constant(2)]), d(e, D.args[1])])
                    }
            }
            return t.DotAccess([L, F]);
        case "Prime":
            var N = r.args[0];
            if ("Call" === N.type) {
                var R = N.args
                  , U = R[0]
                  , _ = R[1]
                  , T = s.unwrapSeq(_).length;
                if ("Cmd" === U.type && "logbase" === U.val) {
                    if (2 !== T)
                        throw a.primedFunctionArity()
                } else if (1 !== T)
                    throw a.primedFunctionArity();
                return t.Prime(r.nprimes, u(e, r.args))
            }
            throw "ImplicitCall" === N.type ? a.primeWithoutParen() : a.unexpectedPrime();
        case "Index":
            var k = r.args
              , W = k[0]
              , j = k[1];
            if ("Seq" === j.type)
                return t.ListAccess([g(e, W), t.List(u(e, j.args))]);
            if ("Ellipsis" === j.type) {
                var z = j.args
                  , H = z[0]
                  , J = z[1];
                return t.ListAccess([g(e, W), t.Range([t.List(u(e, s.unwrapSeq(H))), t.List("EmptyRangeEnd" === J.type ? [] : u(e, s.unwrapSeq(J)))])])
            }
            return v(j) ? t.ListAccess([g(e, W), h(e, j)]) : t.ListAccess(u(e, r.args));
        case "Paren":
            var K = r.args[0];
            if ("Seq" === K.type) {
                if (0 === K.args.length)
                    throw a.emptyParen();
                return t.ParenSeq(u(e, K.args))
            }
            return g(e, K);
        case "List":
            if (0 === r.args.length)
                return t.List([]);
            var G = r.args[0];
            if ("Ellipsis" === G.type) {
                var Q = G.args;
                H = Q[0],
                J = Q[1];
                return t.Range([t.List(u(e, s.unwrapSeq(H))), t.List(u(e, s.unwrapSeq(J)))])
            }
            if ("For" === G.type) {
                for (var V = G.args, X = V[0], Y = V[1], Z = e.setInput(t.Identifier("_comprehensionIndex_" + c++), X.span), $ = d(E(e, {
                    prefix: "li",
                    expr: Z
                }), X), ee = [], re = 0, te = s.unwrapSeq(Y); re < te.length; re++) {
                    var ae = te[re];
                    if (!x(ae))
                        throw a.listComprehensionIncorrectInput();
                    ee.push(e.setInput(t.AssignmentExpression(u(e, ae.args)), ae.span))
                }
                return t.ListComprehension(Z, $, ee)
            }
            return t.List(u(e, s.unwrapSeq(G)));
        case "Pipes":
            return t.FunctionCall("\\abs", u(e, r.args));
        case "Subscript":
            var ne = r.args
              , se = ne[0]
              , ie = ne[1];
            if (0 === ie.val.length)
                throw a.emptySubscript();
            var ce = void 0;
            switch (se.type) {
            case "Letter":
            case "Cmd":
                ce = se.val;
                break;
            default:
                throw a.unexpectedSubscript()
            }
            return t.Identifier(ce + "_" + ie.val);
        case "Superscript":
            var ue = r.args
              , oe = (se = ue[0],
            ue[1]);
            if ("Call" !== se.type || "Seq" === se.args[1].type || function(e) {
                if ("Call" !== e.type)
                    return !1;
                var r = e.args[0];
                for (; "Superscript" === r.type || "Subscript" === r.type || "Prime" === r.type; )
                    r = r.args[0];
                return "Cmd" === r.type && (f(r.val) || y(r.val))
            }(se)) {
                if ("Dot" === se.type) {
                    D = se.args[1];
                    var pe = u(e, se.args)
                      , le = (L = pe[0],
                    F = pe[1],
                    d(e, oe));
                    if ("Letter" === D.type)
                        switch (D.val) {
                        case "x":
                            return t.Exponent([t.OrderedPairAccess([L, t.Constant(1)]), le]);
                        case "y":
                            return t.Exponent([t.OrderedPairAccess([L, t.Constant(2)]), le])
                        }
                    else if ("Call" === D.type) {
                        if ("Letter" === (U = D.args[0]).type)
                            switch (U.val) {
                            case "x":
                                return t.Multiply([t.OrderedPairAccess([L, t.Constant(1)]), t.Exponent([d(e, D.args[1]), le])]);
                            case "y":
                                return t.Multiply([t.OrderedPairAccess([L, t.Constant(2)]), t.Exponent([d(e, D.args[1]), le])])
                            }
                    }
                    return t.Exponent([t.DotAccess([L, F]), le])
                }
                return t.Exponent(u(e, r.args))
            }
            return t.FunctionExponent(u(e, [se.args[0], se.args[1], oe]));
        case "Sqrt":
            return t.FunctionCall("sqrt", u(e, r.args));
        case "Nthroot":
            return t.FunctionCall("nthroot", u(e, [r.args[1], r.args[0]]));
        case "Frac":
            return t.Divide(u(e, r.args));
        case "Derivative":
            var de = u(e, r.args);
            if (!s.isIdentifier(r.args[0]))
                throw a.parseError();
            return t.Derivative(de[0], [de[1]]);
        case "Integral":
            var ge = r.args;
            de = u(e, [ye = ge[0], ge[1], ve = ge[2], he = ge[3]]);
            return t.Integral(de);
        case "EmptyIntegral":
            var fe = u(e, r.args)
              , ye = fe[0]
              , me = fe[1]
              , ve = fe[2]
              , he = t.Constant(i.maybeRational(1, 1));
            return t.Integral([ye, me, ve, he]);
        case "Sum":
            var we = r.args
              , Se = (X = we[0],
            we[1]);
            ve = we[2];
            if (!x(Se))
                throw a.incorrectSumLowerBound();
            var xe = d(E(e, {
                prefix: "ro",
                expr: (de = u(e, [Se.args[0], Se.args[1], ve]))[0]
            }), X);
            return t.Sum(de.concat(xe));
        case "Product":
            var be = r.args
              , Ie = (X = be[0],
            be[1]);
            ve = be[2];
            if (!x(Ie))
                throw a.incorrectProductLowerBound();
            xe = d(E(e, {
                prefix: "ro",
                expr: (de = u(e, [Ie.args[0], Ie.args[1], ve]))[0]
            }), X);
            return t.Product(de.concat(xe));
        case "Juxt":
            return t.Multiply(u(e, r.args));
        case "Letter":
            return t.Identifier(r.val);
        case "Cmd":
            var Ce = r.val;
            switch (Ce) {
            case "ans":
                if (void 0 === e.currentIndex)
                    throw a.badSymbolContext("ans");
                return t.Ans("ans_{" + (e.currentIndex - 1) + "}");
            case "approx":
                throw a.unrecognizedSymbol(Ce);
            case "dt":
                if (!e.allowDt)
                    throw a.badSymbolContext(Ce);
                return t.Identifier(Ce);
            case "index":
                if (!e.allowIndex)
                    throw a.badSymbolContext(Ce);
                return t.Identifier(Ce);
            default:
                return t.Identifier(Ce)
            }
        case "Decimal":
            return t.Constant(w(r));
        case "MixedNumber":
            return t.MixedNumber(S(r));
        case "Piecewise":
            return function(e, r) {
                var t, n = e.nodes, c = r.args[0], u = s.unwrapSeq(c), o = [];
                e: for (t = 0; t < u.length; t++) {
                    var p = u[t];
                    switch (p.type) {
                    case "Colon":
                        var l = p.args
                          , g = l[0]
                          , f = l[1];
                        if (!v(g))
                            throw a.colonMissingCondition();
                        o.push({
                            condition: h(e, g),
                            if_expr: d(e, f)
                        });
                        break;
                    case "Equals":
                    case "Inequality":
                    case "InequalityChain":
                        o.push({
                            condition: h(e, p),
                            if_expr: n.Constant(i.maybeRational(1, 1))
                        });
                        break;
                    default:
                        break e
                    }
                }
                if (0 === t)
                    throw a.piecewiseMissingCondition();
                if (t < u.length - 1)
                    throw a.piecewisePartMissingCondition();
                var y = t === u.length - 1 ? d(e, u[t]) : n.Constant(NaN);
                if (!n.Piecewise.chain)
                    throw a.featureUnavailable();
                return n.Piecewise.chain(o, y)
            }(e, r);
        case "RightArrow":
            return function(e, r) {
                var t = e.nodes;
                if (!s.isIdentifier(r.args[0]))
                    throw a.updateRuleNonIdentifierLHS();
                return e = E(e, {
                    prefix: "ec",
                    expr: e.setInput(t.Identifier("globalEventCount"), n.emptySpanAt(r.span.input, r.span.start))
                }),
                t.UpdateRule(u(e, r.args))
            }(e, r);
        case "Seq":
            return t.BareSeq(u(e, r.args));
        case "EmptyPiecewise":
            if (!t.Piecewise.empty)
                throw a.featureUnavailable();
            return t.Piecewise.empty();
        case "Equals":
            throw a.unexpectedSymbol("=");
        case "Inequality":
        case "InequalityChain":
            throw a.unexpectedInequality();
        case "Tilde":
            throw a.unexpectedSymbol("~");
        case "Colon":
            throw a.unexpectedSymbol(":");
        case "Ellipsis":
            throw a.unexpectedSymbol("...");
        case "For":
            throw a.unexpectedForKeyword();
        case "EmptyRangeEnd":
            throw a.invalidHalfEmptyRange();
        case "Err":
            throw function(e) {
                switch (e.type) {
                case "UnexpectedParseError":
                case "MissingBound":
                case "EmptyGroup":
                case "UnexpectedDifferential":
                case "UnexpectedEnd":
                    return a.parseError();
                case "InvalidOperatorName":
                    return a.invalidOperatorName();
                case "UnexpectedCloseDelimiter":
                case "MissingCloseDelimiter":
                    return a.mismatchedBraces(e.open, e.close);
                case "UnrecognizedSymbol":
                    return "." === e.val ? a.unexpectedSymbol(e.val) : a.unrecognizedSymbol(e.val);
                case "EmptyInput":
                    return a.blankExpression();
                case "BinaryOperatorMissingRight":
                case "BinaryOperatorMissingLeft":
                    return a.binaryOperatorMissingOperand("%" === e.val ? "% of" : e.val);
                case "UnaryOperatorMissingLeft":
                    return a.unaryOperatorMissingLeft(e.val);
                case "UnaryOperatorMissingRight":
                    return a.unaryOperatorMissingRight(e.val);
                case "UnexpectedSubscript":
                    return a.cannotSubscript(e.base);
                case "PercentMissingOf":
                    return a.percentMissingOf();
                case "SumMissingBound":
                    return a.sumMissingBound();
                case "ProductMissingBound":
                    return a.productMissingBound();
                case "IntegralMissingBound":
                    return a.integralMissingBound();
                case "SumMissingBody":
                    return a.sumMissingBody();
                case "ProductMissingBody":
                    return a.productMissingBody();
                case "IntegralMissingBody":
                    return a.integralMissingBody();
                case "DerivativeMissingBody":
                    return a.derivativeMissingBody();
                case "IntegralMissingDifferential":
                    return a.integralMissingDifferential();
                case "DifferentialWithSuperscript":
                    return a.differentialWithSuperscript();
                case "FractionMissingNumerator":
                    return a.fractionMissingNumerator();
                case "FractionMissingDenominator":
                    return a.fractionMissingDenominator();
                case "FractionEmpty":
                    return a.fractionEmpty();
                case "EmptySuperscript":
                    return a.emptySuperscript();
                case "EmptySubscript":
                    return a.emptySubscript();
                case "InvalidSubscript":
                    return a.invalidSubscript(e.val);
                case "SuperscriptWithPrime":
                    return a.superscriptWithPrime();
                case "PrimeWithoutParen":
                    return a.primeWithoutParen();
                case "UnexpectedPrime":
                    return a.unexpectedPrime();
                case "EmptyRadical":
                    return a.emptyRadical();
                case "EmptyRadicalIndex":
                    return a.emptyRadicalIndex();
                case "EmptySquareBracket":
                    return a.emptySquareBracket();
                case "EmptyPipe":
                    return a.emptyPipe();
                case "FunctionMissingArgument":
                    return a.wrongArity(e.val, 1, 0);
                case "AdjacentNumbers":
                    return a.adjacentNumbers(b(e.args[0]), b(e.args[1]));
                case "UnexpectedFor":
                    return a.unexpectedForKeyword();
                default:
                    throw "Unexpected surface node " + e.type + "."
                }
            }(r.error);
        default:
            throw "Unexpected surface node " + r.type + "."
        }
    }
    function f(e) {
        return r.hasOwnProperty(e)
    }
    function y(e) {
        return "ln" === e || "log" === e || "logbase" === e
    }
    function m(e, t) {
        var i = e.nodes
          , c = t.args
          , o = c[0]
          , p = c[1]
          , l = d(e, o)
          , g = u(e, s.unwrapSeq(p));
        if (C(o)) {
            var m = n.emptySpanAt(p.span.input, p.span.start)
              , v = e.setInput(q(e), m);
            return i.SeededFunctionCall(l, [v].concat(g))
        }
        if (s.isIdentifier(o))
            return i.FunctionCall(l, g);
        if ("Superscript" === o.type) {
            var h = o.args
              , w = h[0]
              , S = h[1];
            if ("Cmd" === w.type) {
                var x = w.val;
                if (f(x) || y(x)) {
                    if (function(e) {
                        return "Decimal" === e.type && "2" === e.val
                    }(S))
                        return i.Exponent([i.FunctionCall(x, g), d(e, S)]);
                    if (function(e) {
                        return "Neg" === e.type && "Decimal" === (e = e.args[0]).type && "1" === e.val
                    }(S) && void 0 !== r[x])
                        return i.FunctionCall(r[x], g);
                    throw f(x) ? a.badTrigExponent(x) : a.badLogExponent("logbase" === x ? "log" : x)
                }
            }
        }
        return i.Multiply([l, d(e, p)])
    }
    function v(e) {
        return "Equals" === e.type || "Inequality" === e.type || "InequalityChain" === e.type
    }
    function h(e, r) {
        var t = e.nodes;
        switch (r.type) {
        case "Equals":
            return t.Comparator["="](u(e, r.args));
        case "Inequality":
            return t.Comparator[r.symbol](u(e, r.args));
        case "InequalityChain":
            if (r.chain.length > 1)
                throw a.inequalityChainTooLong();
            var i = r.first
              , c = i.symbol
              , o = i.args
              , p = o[0]
              , l = o[1]
              , d = r.chain[0]
              , g = d.symbol
              , f = d.args[0]
              , y = n.emptySpanAt(r.span.input, r.span.start);
            return t.And([h(e, s.Inequality(y, c, [p, l])), h(e, s.Inequality(y, g, [l, f]))]);
        default:
            throw a.parseError()
        }
    }
    function w(e) {
        return i.fromDecimalString(e.val)
    }
    function S(e) {
        var r = i.fromDecimalString(e.whole)
          , t = i.fromDecimalString(e.num)
          , a = i.fromDecimalString(e.den);
        return i.add(r, i.div(t, a))
    }
    function x(e) {
        return "Equals" === e.type && s.isIdentifier(e.args[0])
    }
    function b(e) {
        switch (e.type) {
        case "Decimal":
            return e.val;
        case "MixedNumber":
            return e.whole + " " + e.num + "/" + e.den;
        default:
            throw new Error("Unexpected node type " + e.type)
        }
    }
    function I(e) {
        switch (e.type) {
        case "Letter":
        case "Decimal":
        case "MixedNumber":
        case "Cmd":
        case "EmptyPiecewise":
            return !0;
        case "Neg":
            for (var r = e.args[0]; ; )
                if ("Pos" === r.type || "Paren" === r.type && !l(r))
                    r = r.args[0];
                else {
                    if ("Neg" !== r.type)
                        break;
                    r = r.args[0]
                }
            return "Decimal" === r.type || "MixedNumber" === r.type;
        case "Pos":
        case "Paren":
            return I(e.args[0]);
        case "Juxt":
        case "Mul":
        case "Div":
            return I(e.args[0]) && I(e.args[1]);
        case "Subscript":
            return I(e.args[0]);
        case "Superscript":
        case "Frac":
        case "Add":
        case "Sub":
            return I(e.args[0]) && I(e.args[1]);
        case "Piecewise":
            return "Equals" === (r = e.args[0]).type || "Inequality" === r.type || "InequalityChain" === r.type;
        case "Call":
            var t = e.args
              , a = t[0]
              , n = t[1];
            return !s.isIdentifier(a) && !s.isSuperscriptedIdentifier(a) && (I(a) && I(n));
        case "Derivative":
        case "Sqrt":
        case "Nthroot":
        case "Pipes":
        case "Bang":
            return !1;
        case "Equals":
        case "Inequality":
        case "InequalityChain":
        case "Tilde":
        case "ImplicitCall":
        case "Index":
        case "List":
        case "Seq":
        case "Integral":
        case "EmptyIntegral":
        case "Sum":
        case "Product":
        case "Colon":
        case "Ellipsis":
        case "For":
        case "Dot":
        case "PercentOf":
        case "Prime":
        case "EmptyRangeEnd":
        case "RightArrow":
            return !1;
        default:
            throw "Unexpected surface node " + e.type + "."
        }
    }
    function C(e) {
        return "Cmd" === e.type && ("random" === e.val || "shuffle" === e.val)
    }
    function q(e) {
        var r = e.nodes.ExtendSeed("", [e.nodes.Identifier("globalRandomSeed"), e.nodes.Seed(e.nextSeed())]);
        if (!e.seedExtensions)
            return r;
        for (var t = 0, a = e.seedExtensions; t < a.length; t++) {
            var n = a[t]
              , s = n.prefix
              , i = n.expr;
            r = e.nodes.ExtendSeed(s, [r, i])
        }
        return r
    }
    function E(e, r) {
        var a = e.seedExtensions || [];
        return t.__assign(t.__assign({}, e), {
            seedExtensions: a.concat(r)
        })
    }
    e.lower = function(e, r) {
        return function(e, r) {
            return e.setInput(function(e, r) {
                var t = e.nodes;
                switch (r.type) {
                case "Equals":
                    var n = r.args
                      , i = n[0]
                      , c = n[1]
                      , l = o(i);
                    if (l) {
                        var f = l.base
                          , y = l.args;
                        return t.FunctionDefinition(d(e, f), u(e, y), d(e, c))
                    }
                    return p(i) ? t.Assignment(d(e, i), d(e, c)) : t.Equation(d(e, i), d(e, c));
                case "Tilde":
                    var m = u(e, r.args);
                    i = m[0],
                    c = m[1];
                    return t.Regression(i, c);
                case "Inequality":
                    return h(e, r);
                case "InequalityChain":
                    if (r.chain.length > 1)
                        throw a.inequalityChainTooLong();
                    var v = r.first
                      , w = v.symbol
                      , S = v.args
                      , x = S[0]
                      , b = S[1]
                      , I = r.chain[0]
                      , C = I.symbol
                      , q = I.args[0];
                    return s.isIdentifier(b) ? t.DoubleInequality([d(e, x), w, d(e, b), C, d(e, q)]) : h(e, r);
                case "Call":
                    var E = r.args
                      , P = E[0]
                      , M = E[1];
                    if ("Cmd" === P.type)
                        switch (P.val) {
                        case "histogram":
                            return t.Histogram(u(e, s.unwrapSeq(M)));
                        case "cube":
                        case "sphere":
                        case "cone":
                        case "dodecahedron":
                        case "octahedron":
                        case "tetrahedron":
                            return t.Object3D(u(e, s.unwrapSeq(M)), P.val);
                        case "dotplot":
                            return t.DotPlot(u(e, s.unwrapSeq(M)));
                        case "boxplot":
                            return t.BoxPlot(u(e, s.unwrapSeq(M)));
                        case "ttest":
                            return t.TTest(u(e, s.unwrapSeq(M)));
                        case "ittest":
                            return t.IndependentTTest(u(e, s.unwrapSeq(M)));
                        case "stats":
                            return t.Stats(u(e, s.unwrapSeq(M)));
                        default:
                            return g(e, r)
                        }
                    return g(e, r);
                default:
                    return g(e, r)
                }
            }(e, r), r.span)
        }(e, r)
    }
    ,
    e.isFunctionSignature = function(e) {
        return void 0 !== o(e)
    }
    ,
    e.isLegalAssignmentLhs = p
});
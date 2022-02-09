
define('core/math/parser/surface-node', ["require", "exports", "./command-aliases"], function(require, n, t) {
    "use strict";
    function e(n) {
        if ("Subscript" === n.type) {
            if ("Alphanumeric" !== n.args[1].type)
                return !1;
            n = n.args[0]
        }
        switch (n.type) {
        case "Cmd":
        case "Letter":
            return !0;
        default:
            return !1
        }
    }
    Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    n.unwrapSeq = n.isDerivative = n.isSuperscriptedIdentifier = n.isIdentifier = n.MixedNumber = n.Alphanumeric = n.Cmd = n.Decimal = n.Letter = n.Juxt = n.RightArrow = n.PercentOf = n.Dot = n.For = n.Ellipsis = n.Colon = n.EmptyRangeEnd = n.EmptyPiecewise = n.Piecewise = n.Product = n.Sum = n.EmptyIntegral = n.Integral = n.Derivative = n.Frac = n.Nthroot = n.Sqrt = n.Seq = n.Prime = n.Superscript = n.Subscript = n.Pipes = n.List = n.Paren = n.Index = n.ImplicitCall = n.Call = n.Bang = n.Div = n.Mul = n.Sub = n.Add = n.Neg = n.Pos = n.Tilde = n.InequalityChain = n.TrailingInequalityPiece = n.Inequality = n.Equals = void 0,
    n.Equals = function(n, t) {
        return {
            type: "Equals",
            span: n,
            args: t
        }
    }
    ,
    n.Inequality = function(n, t, e) {
        return {
            type: "Inequality",
            span: n,
            symbol: t,
            args: e
        }
    }
    ,
    n.TrailingInequalityPiece = function(n, t, e) {
        return {
            type: "TrailingInequalityPiece",
            span: n,
            symbol: t,
            args: e
        }
    }
    ,
    n.InequalityChain = function(n, t, e) {
        return {
            type: "InequalityChain",
            span: n,
            first: t,
            chain: e
        }
    }
    ,
    n.Tilde = function(n, t) {
        return {
            type: "Tilde",
            span: n,
            args: t
        }
    }
    ,
    n.Pos = function(n, t) {
        return {
            type: "Pos",
            span: n,
            args: t
        }
    }
    ,
    n.Neg = function(n, t) {
        return {
            type: "Neg",
            span: n,
            args: t
        }
    }
    ,
    n.Add = function(n, t) {
        return {
            type: "Add",
            span: n,
            args: t
        }
    }
    ,
    n.Sub = function(n, t) {
        return {
            type: "Sub",
            span: n,
            args: t
        }
    }
    ,
    n.Mul = function(n, t) {
        return {
            type: "Mul",
            span: n,
            args: t
        }
    }
    ,
    n.Div = function(n, t) {
        return {
            type: "Div",
            span: n,
            args: t
        }
    }
    ,
    n.Bang = function(n, t) {
        return {
            type: "Bang",
            span: n,
            args: t
        }
    }
    ,
    n.Call = function(n, t) {
        return {
            type: "Call",
            span: n,
            args: t
        }
    }
    ,
    n.ImplicitCall = function(n, t) {
        return {
            type: "ImplicitCall",
            span: n,
            args: t
        }
    }
    ,
    n.Index = function(n, t) {
        return {
            type: "Index",
            span: n,
            args: t
        }
    }
    ,
    n.Paren = function(n, t) {
        return {
            type: "Paren",
            span: n,
            args: t
        }
    }
    ,
    n.List = function(n, t) {
        return {
            type: "List",
            span: n,
            args: t
        }
    }
    ,
    n.Pipes = function(n, t) {
        return {
            type: "Pipes",
            span: n,
            args: t
        }
    }
    ,
    n.Subscript = function(n, t) {
        return {
            type: "Subscript",
            span: n,
            args: t
        }
    }
    ,
    n.Superscript = function(n, t) {
        return {
            type: "Superscript",
            span: n,
            args: t
        }
    }
    ,
    n.Prime = function(n, t, e) {
        return {
            type: "Prime",
            span: n,
            nprimes: t,
            args: e
        }
    }
    ,
    n.Seq = function(n, t) {
        return {
            type: "Seq",
            span: n,
            args: t
        }
    }
    ,
    n.Sqrt = function(n, t) {
        return {
            type: "Sqrt",
            span: n,
            args: t
        }
    }
    ,
    n.Nthroot = function(n, t) {
        return {
            type: "Nthroot",
            span: n,
            args: t
        }
    }
    ,
    n.Frac = function(n, t) {
        return {
            type: "Frac",
            span: n,
            args: t
        }
    }
    ,
    n.Derivative = function(n, t) {
        return {
            type: "Derivative",
            span: n,
            args: t
        }
    }
    ,
    n.Integral = function(n, t) {
        return {
            type: "Integral",
            span: n,
            args: t
        }
    }
    ,
    n.EmptyIntegral = function(n, t) {
        return {
            type: "EmptyIntegral",
            span: n,
            args: t
        }
    }
    ,
    n.Sum = function(n, t) {
        return {
            type: "Sum",
            span: n,
            args: t
        }
    }
    ,
    n.Product = function(n, t) {
        return {
            type: "Product",
            span: n,
            args: t
        }
    }
    ,
    n.Piecewise = function(n, t) {
        return {
            type: "Piecewise",
            span: n,
            args: t
        }
    }
    ,
    n.EmptyPiecewise = function(n) {
        return {
            type: "EmptyPiecewise",
            span: n
        }
    }
    ,
    n.EmptyRangeEnd = function(n) {
        return {
            type: "EmptyRangeEnd",
            span: n
        }
    }
    ,
    n.Colon = function(n, t) {
        return {
            type: "Colon",
            span: n,
            args: t
        }
    }
    ,
    n.Ellipsis = function(n, t) {
        return {
            type: "Ellipsis",
            span: n,
            args: t
        }
    }
    ,
    n.For = function(n, t) {
        return {
            type: "For",
            span: n,
            args: t
        }
    }
    ,
    n.Dot = function(n, t) {
        return {
            type: "Dot",
            span: n,
            args: t
        }
    }
    ,
    n.PercentOf = function(n, t) {
        return {
            type: "PercentOf",
            span: n,
            args: t
        }
    }
    ,
    n.RightArrow = function(n, t) {
        return {
            type: "RightArrow",
            span: n,
            args: t
        }
    }
    ,
    n.Juxt = function(n, t) {
        return {
            type: "Juxt",
            span: n,
            args: t
        }
    }
    ,
    n.Letter = function(n, t) {
        return {
            type: "Letter",
            span: n,
            val: t
        }
    }
    ,
    n.Decimal = function(n, t) {
        return {
            type: "Decimal",
            span: n,
            val: t
        }
    }
    ,
    n.Cmd = function(n, e) {
        return {
            type: "Cmd",
            span: n,
            val: t.translateCmd(e)
        }
    }
    ,
    n.Alphanumeric = function(n, t) {
        return {
            type: "Alphanumeric",
            span: n,
            val: t
        }
    }
    ,
    n.MixedNumber = function(n, t, e, r) {
        return {
            type: "MixedNumber",
            span: n,
            whole: t,
            num: e,
            den: r
        }
    }
    ,
    n.isIdentifier = e,
    n.isSuperscriptedIdentifier = function(n) {
        return "Superscript" === n.type && e(n.args[0])
    }
    ,
    n.isDerivative = function(n, t) {
        if ("Letter" !== n.type || "d" !== n.val)
            return !1;
        if ("Juxt" !== t.type)
            return !1;
        var r = t.args
          , i = r[0]
          , a = r[1];
        return "Letter" === i.type && "d" === i.val && e(a)
    }
    ,
    n.unwrapSeq = function(n) {
        return "Seq" === n.type ? n.args : [n]
    }
});
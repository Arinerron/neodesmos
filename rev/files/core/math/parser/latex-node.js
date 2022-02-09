define('core/math/parser/latex-node', ["require", "exports"], function(require, r) {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.Symbol = r.OperatorName = r.LeftRight = r.SupSub = r.Frac = r.Sqrt = r.Group = void 0,
    r.Group = function(r, t) {
        return {
            type: "Group",
            span: r,
            args: t
        }
    }
    ,
    r.Sqrt = function(r, t, e) {
        return {
            type: "Sqrt",
            span: r,
            optArg: t,
            arg: e
        }
    }
    ,
    r.Frac = function(r, t, e) {
        return {
            type: "Frac",
            span: r,
            num: t,
            den: e
        }
    }
    ,
    r.SupSub = function(r, t, e, n) {
        return {
            type: "SupSub",
            span: r,
            sup: t,
            sub: e,
            nprimes: n
        }
    }
    ,
    r.LeftRight = function(r, t, e, n) {
        return {
            type: "LeftRight",
            span: r,
            left: t,
            right: e,
            arg: n
        }
    }
    ,
    r.OperatorName = function(r, t) {
        return {
            type: "OperatorName",
            span: r,
            arg: t
        }
    }
    ,
    r.Symbol = function(r, t) {
        return {
            type: "Symbol",
            span: r,
            val: t
        }
    }
});
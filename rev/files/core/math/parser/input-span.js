define('core/math/parser/input-span', ["require", "exports"], function(require, n) {
    "use strict";
    function t(n, t, e) {
        return {
            input: n,
            start: t,
            end: e
        }
    }
    Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    n.slice = n.joinSpans = n.emptySpanAt = n.Span = void 0,
    n.Span = t,
    n.emptySpanAt = function(n, e) {
        return t(n, e, e)
    }
    ,
    n.joinSpans = function(n, e) {
        if (n.input !== e.input)
            throw new Error("Programming Error: cannot form a span on different inputs");
        return t(n.input, n.start, e.end)
    }
    ,
    n.slice = function(n) {
        return n.input.slice(n.start, n.end)
    }
});
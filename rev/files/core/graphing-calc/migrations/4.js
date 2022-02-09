
define('core/graphing-calc/migrations/4', ['require'], function(require) {
    "use strict";
    function e(e) {
        switch (e) {
        case "point":
            return "POINT";
        case "cross":
            return "CROSS";
        case "open":
            return "OPEN";
        case "normal":
            return "SOLID";
        case "dashed":
            return "DASHED";
        case "dotted":
            return "DOTTED";
        default:
            return e
        }
    }
    function r(r) {
        var n = {};
        for (var t in r)
            r.hasOwnProperty(t) && (n[t] = "style" === t ? e(r[t]) : r[t]);
        return n
    }
    function n(n) {
        var t, s = n.type, o = {};
        switch (s) {
        case "expression":
            for (t in n)
                n.hasOwnProperty(t) && (o[t] = "style" === t ? e(n[t]) : n[t]);
            return o;
        case "table":
            for (t in n)
                n.hasOwnProperty(t) && (o[t] = "columns" === t ? n[t].map(r) : n[t]);
            return o;
        case "image":
        case "text":
        case "folder":
            for (t in n)
                n.hasOwnProperty(t) && (o[t] = n[t]);
            return o;
        default:
            throw new Error("Unexpected expression type: " + s)
        }
    }
    return function(e) {
        if (3 !== e.version)
            throw new Error("Unexpected version: " + e.version);
        var r = {};
        return r.graph = e.graph,
        r.expressions = {
            list: e.expressions.list.map(n)
        },
        r.version = 4,
        r
    }
});

define('core/graphing-calc/migrations/1', ['require'], function(require) {
    "use strict";
    function r(r) {
        return r.replace(/\\(sech|csch)/g, "\\operatorname{$1}")
    }
    function e(e) {
        var n = {};
        for (var t in e)
            e.hasOwnProperty(t) && (n[t] = "latex" === t ? r(e[t]) : "values" === t ? e[t].map(r) : e[t]);
        return n
    }
    function n(n) {
        var t, s = n.type, o = {};
        switch (s) {
        case "expression":
            for (t in n)
                n.hasOwnProperty(t) && (o[t] = "latex" === t ? r(n[t]) : n[t]);
            return o;
        case "table":
            for (t in n)
                n.hasOwnProperty(t) && (o[t] = "columns" === t ? n[t].map(e) : n[t]);
            return o;
        case "image":
            for (t in n)
                n.hasOwnProperty(t) && (o[t] = "width" === t || "height" === t || "x" === t || "y" === t ? r(n[t]) : n[t]);
            return o;
        case "text":
        case "folder":
            for (t in n)
                n.hasOwnProperty(t) && (o[t] = n[t]);
            return o;
        default:
            throw new Error("Unexpected expression type: " + s)
        }
    }
    return function(r) {
        if (r.version)
            throw new Error("Unexpected version: " + r.version);
        var e = {};
        return e.graph = r.graph,
        e.expressions = {
            list: r.expressions.list.map(n)
        },
        e.version = 1,
        e
    }
});
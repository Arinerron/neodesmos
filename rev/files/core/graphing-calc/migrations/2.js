define('core/graphing-calc/migrations/2', ['require', 'core/lib/color-helpers'], function(require) {
    "use strict";
    var r = require("core/lib/color-helpers").colors;
    function e(e) {
        switch (e) {
        case "#C0504D":
            return r.RED;
        case "#4F81BD":
            return r.BLUE;
        case "#9BBB59":
            return r.GREEN;
        case "#8064A2":
            return r.PURPLE;
        case "#F79646":
            return r.ORANGE;
        case "#000000":
            return r.BLACK;
        default:
            return e
        }
    }
    function n(r) {
        var n = {};
        for (var t in r)
            r.hasOwnProperty(t) && (n[t] = "color" === t ? e(r[t]) : r[t]);
        return n
    }
    function t(r) {
        var t, s = r.type, o = {};
        switch (s) {
        case "expression":
            for (t in r)
                r.hasOwnProperty(t) && (o[t] = "color" === t ? e(r[t]) : r[t]);
            return o;
        case "table":
            for (t in r)
                r.hasOwnProperty(t) && (o[t] = "columns" === t ? r[t].map(n) : r[t]);
            return o;
        case "image":
        case "text":
        case "folder":
            for (t in r)
                r.hasOwnProperty(t) && (o[t] = r[t]);
            return o;
        default:
            throw new Error("Unexpected expression type: " + s)
        }
    }
    return function(r) {
        if (r.version > 1)
            throw new Error("Unexpected version: " + r.version);
        var e = {};
        return e.graph = r.graph,
        e.expressions = {
            list: r.expressions.list.map(t)
        },
        e.version = 2,
        e
    }
});
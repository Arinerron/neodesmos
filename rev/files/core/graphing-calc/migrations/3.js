
define('core/graphing-calc/migrations/3', ['require'], function(require) {
    "use strict";
    function e(e) {
        if ("string" == typeof e)
            return e;
        if (void 0 === e)
            return "";
        var r = e + "";
        return r = (r = r.replace(/1e\+?([-\d]+)/, "10^{$1}")).replace(/([-\d\.]+)e\+?([-\d]+)/, "$1\\cdot 10^{$2}")
    }
    function r(r) {
        var n, i = r.type, t = {};
        switch (i) {
        case "expression":
            for (n in r)
                r.hasOwnProperty(n) && (t[n] = "sliderMax" === n || "sliderMin" === n || "sliderInterval" === n ? e(r[n]) : "domain" === n ? {
                    max: e(r[n].max),
                    min: e(r[n].min)
                } : r[n]);
            return t.hasOwnProperty("sliderMin") && void 0 === t.sliderInterval && (t.sliderInterval = ""),
            t;
        case "image":
        case "table":
        case "text":
        case "folder":
            for (n in r)
                r.hasOwnProperty(n) && (t[n] = r[n]);
            return t;
        default:
            throw new Error("Unexpected expression type: " + i)
        }
    }
    return function(e) {
        if (e.version > 2)
            throw new Error("Unexpected version: " + e.version);
        var n = {};
        return n.graph = e.graph,
        n.expressions = {
            list: e.expressions.list.map(r)
        },
        n.version = 3,
        n
    }
});
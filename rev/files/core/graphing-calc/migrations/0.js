define('core/graphing-calc/migrations/0', ['require'], function(require) {
    "use strict";
    var r = {
        expression: !0,
        table: !0,
        image: !0,
        folder: !0,
        text: !0
    };
    function e(r) {
        return r.replace(/\\(total|length|mean|median|quantile|stdev|stddev|stdDev|stdevp|stddevp|stdDevP|var|variance|cov|corr|ceil|floor|round|abs|mod|lcm|mcm|mcd|nCr|nPr|signum|sign|arcsinh|arccosh|arctanh|arccsch|arcsech|arccoth|arccsc|arcsec|arccot)/g, "\\operatorname{$1}")
    }
    function n(r) {
        var n = {};
        for (var t in r)
            r.hasOwnProperty(t) && (n[t] = "latex" === t ? e(r[t]) : "values" === t ? r[t].map(e) : r[t]);
        return n
    }
    function t(t) {
        var o, s = function(e) {
            if (e.type) {
                if (r.hasOwnProperty(e.type))
                    return e.type;
                throw new Error("Invalid item type: '" + e.type + "'.")
            }
            return void 0 !== e.text ? "text" : void 0 !== e.columns || void 0 !== e.headings ? "table" : "expression"
        }(t), a = {};
        switch (s) {
        case "expression":
            for (o in t)
                t.hasOwnProperty(o) && (a[o] = "latex" === o ? e(t[o]) : t[o]);
            return a.type = s,
            a;
        case "table":
            for (o in t)
                t.hasOwnProperty(o) && (a[o] = "columns" === o ? t[o].map(n) : t[o]);
            return a.type = s,
            a;
        case "image":
            for (o in t)
                t.hasOwnProperty(o) && (a[o] = "width" === o || "height" === o || "x" === o || "y" === o ? e(t[o]) : t[o]);
            return a.type = s,
            a;
        case "text":
        case "folder":
            for (o in t)
                t.hasOwnProperty(o) && (a[o] = t[o]);
            return a.type = s,
            a
        }
    }
    var o = {
        none: "NONE",
        both: "BOTH",
        positive: "POSITIVE"
    };
    return function(r) {
        if (r.version)
            throw new Error("Unexpected version: " + r.version);
        var e = {};
        return e.graph = function(r) {
            var e = {};
            for (var n in r)
                r.hasOwnProperty(n) && "xAxisArrows" !== n && "yAxisArrows" !== n && (e[n] = r[n]);
            return e.xAxisArrowMode = o[r.xAxisArrows || "none"],
            e.yAxisArrowMode = o[r.yAxisArrows || "none"],
            e
        }(r.graph),
        e.expressions = {
            list: r.expressions.list.map(t)
        },
        e.version = 0,
        e
    }
});

define('core/graphing-calc/migrations/8', ["require", "exports", "tslib", "core/lib/random-seed", "core/lib/deepCopy"], function(require, e, r, t, i) {
    "use strict";
    function a(e) {
        var r = e.split("_");
        return 2 === r.length && r[1] && 1 === r[1].length ? r[0] + "_{" + r[1] + "}" : e
    }
    function n(e) {
        return (e = i.default(e)).rules || !e.assignment && !e.expression || (e.rules = [{
            id: "1",
            assignment: e.assignment || "",
            expression: e.expression || ""
        }]),
        delete e.assignment,
        delete e.expression,
        e
    }
    function s(e) {
        return e.replace(/\\operatorname(?:\{stdev\}p|\{stddev\}p|\{stdDev\}P|\{var\}iance)/g, function(e) {
            switch (e) {
            case "\\operatorname{stdev}p":
                return "\\operatorname{stdevp}";
            case "\\operatorname{stddev}p":
                return "\\operatorname{stddevp}";
            case "\\operatorname{stdDev}P":
                return "\\operatorname{stdDevP}";
            case "\\operatorname{var}iance":
                return "\\operatorname{variance}";
            default:
                return ""
            }
        })
    }
    function l(e) {
        var t = e.latex
          , i = e.values
          , n = r.__assign({}, e);
        return t && (n.latex = s(t),
        n.latex = a(n.latex)),
        i && (n.values = i.map(function(e) {
            return e ? s(e) : ""
        })),
        n
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = function(e) {
        if (7 !== e.version)
            throw new Error("Unexpected version: " + e.version);
        var o = e.expressions.list.map(function(e) {
            if ("image" === e.type) {
                var t = r.__assign(r.__assign({}, e), {
                    opacity: ""
                });
                for (var o in e.hasOwnProperty("stringOpacity") ? t.opacity = e.stringOpacity : e.hasOwnProperty("opacity") ? t.opacity = e.opacity + "" : delete t.opacity,
                e.clickableInfo && (t.clickableInfo = n(e.clickableInfo)),
                delete t.stringOpacity,
                e)
                    if ("x" === o || "y" === o || "width" === o || "height" === o) {
                        var p = e[o];
                        p && (t[o] = s(p))
                    }
                return t
            }
            if ("expression" === e.type) {
                t = r.__assign(r.__assign({}, e), {
                    fillOpacity: "",
                    lineStyle: "SOLID"
                });
                if ("SINGLE_PIXEL" === e.lineStyle ? t.lineWidth = "1" : e.hasOwnProperty("lineStyle") ? t.lineStyle = e.lineStyle : delete t.lineStyle,
                t.hasOwnProperty("lineWidth") || (t.lineWidth = ""),
                t.hasOwnProperty("lineOpacity") || (t.lineOpacity = ""),
                t.hasOwnProperty("pointOpacity") || (t.pointOpacity = ""),
                t.hasOwnProperty("pointSize") || (t.pointSize = ""),
                t.hasOwnProperty("colorLatex") || (t.colorLatex = ""),
                "string" == typeof e.latex && (t.latex = s(e.latex)),
                e.latex && (t.latex = s(e.latex)),
                e.hasOwnProperty("stringFillOpacity") ? t.fillOpacity = e.stringFillOpacity : e.hasOwnProperty("fillOpacity") ? t.fillOpacity = e.fillOpacity + "" : delete t.fillOpacity,
                t.slider && e.slider && e.slider.newLoopMode && (t.slider = i.default(t.slider),
                t.slider.loopMode = e.slider.newLoopMode,
                delete t.slider.newLoopMode),
                t.residualVariable && (t.residualVariable = a(t.residualVariable)),
                t.regressionParameters)
                    for (var c in t.regressionParameters = {},
                    e.regressionParameters) {
                        var d = a(c)
                          , y = e.regressionParameters[c];
                        t.regressionParameters[d] = y
                    }
                return e.clickableInfo && (t.clickableInfo = n(e.clickableInfo)),
                t
            }
            return "table" === e.type ? (u = e).columns ? r.__assign(r.__assign({}, u), {
                columns: u.columns.map(l)
            }) : u : e;
            var u
        });
        return {
            version: 8,
            randomSeed: e.randomSeed || t.default(),
            graph: e.graph,
            expressions: {
                list: o
            }
        }
    }
});
define('core/math/distribution-spec', ["require", "exports", "core/math/baseparser", "tslib"], function(require, t, i, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.getFunctionSpecFromTree = t.parseToplevelFunction = t.DistributionParameterDefaultsMap = void 0,
    t.DistributionParameterDefaultsMap = {
        normaldist: {
            type: "distribution",
            symbol: "normaldist",
            params: ["mean", "stdev"],
            defaults: ["0", "1"],
            discrete: !1
        },
        tdist: {
            type: "distribution",
            symbol: "tdist",
            params: ["dof"],
            defaults: [void 0],
            discrete: !1
        },
        binomialdist: {
            type: "distribution",
            symbol: "binomialdist",
            params: ["trials", "probsuccess"],
            defaults: [void 0, "0.5"],
            discrete: !0
        },
        poissondist: {
            type: "distribution",
            symbol: "poissondist",
            params: ["mean"],
            defaults: [void 0],
            discrete: !0
        },
        uniformdist: {
            type: "distribution",
            symbol: "uniformdist",
            params: ["min", "max"],
            defaults: ["0", "1"],
            discrete: !1
        }
    };
    var e = {
        Histogram: {
            type: "visualization",
            symbol: "histogram",
            params: ["data", "binwidth"],
            defaults: [void 0, "1"]
        },
        DotPlot: {
            type: "visualization",
            symbol: "dotplot",
            params: ["data", "binwidth"],
            defaults: [void 0, "1"]
        },
        BoxPlot: {
            type: "visualization",
            symbol: "boxplot",
            params: ["data"],
            defaults: [void 0]
        }
    };
    function a(i) {
        var a = i
          , o = e[a.type];
        if (!o)
            switch ("Assignment" === a.type && (a = a._expression),
            a.type) {
            case "FunctionCall":
                o = t.DistributionParameterDefaultsMap[a._symbol];
                break;
            default:
                return
            }
        if (o) {
            for (var r = {}, n = o.params, d = a.args, l = 0; l < n.length; l++) {
                var u = d[l];
                r[n[l]] = u && u.getInputString() || ""
            }
            return s.__assign(s.__assign({}, o), {
                span: a.getInputSpan(),
                values: r
            })
        }
    }
    t.parseToplevelFunction = function(t) {
        return a(i.parse(t, {
            trailingComma: !0
        }))
    }
    ,
    t.getFunctionSpecFromTree = a
});

define('core/graphing-calc/migrations/5', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.migrateState = void 0;
    function r(e) {
        var r, s = {};
        for (var o in e)
            if (e.hasOwnProperty(o))
                switch (r = e[o],
                o) {
                case "showAxes":
                    s.showXAxis = r,
                    s.showYAxis = r;
                    break;
                case "showLabels":
                    s.xAxisNumbers = r,
                    s.yAxisNumbers = r,
                    s.polarNumbers = r;
                    break;
                case "labelXMode":
                    s.xAxisStep = "pi" === r ? Math.PI : 0;
                    break;
                case "labelYMode":
                    s.yAxisStep = "pi" === r ? Math.PI : 0;
                    break;
                default:
                    s[o] = r
                }
        return s
    }
    function s(e) {
        var r = {};
        for (var s in e)
            e.hasOwnProperty(s) && "showPoints" !== s && "showLine" !== s && (r[s] = e[s]);
        return void 0 === e.showPoints && void 0 === e.showLine || (e.showPoints && e.showLine ? r.columnMode = "POINTS_AND_LINES" : e.showPoints ? r.columnMode = "POINTS" : e.showLine ? r.columnMode = "LINES" : (r.hidden = !0,
        r.columnMode = "POINTS")),
        r
    }
    function o(e) {
        var r, o = e.type, n = {};
        switch (o) {
        case "expression":
            for (r in void 0 === e.hidden ? e.hasOwnProperty("graphed") ? n.hidden = !e.graphed : e.hasOwnProperty("userRequestedGraphing") ? n.hidden = "never" === e.userRequestedGraphing : n.hidden = !1 : n.hidden = e.hidden,
            e)
                e.hasOwnProperty(r) && "graphed" !== r && "userRequestedGraphing" !== r && "hidden" !== r && "slider" !== r && ("color" !== r ? "style" !== r ? "sliderInterval" !== r ? n[r] = e[r] : n.sliderInterval = "undefined" === e.sliderInterval ? "" : e.sliderInterval : n.style = "normal" === e.style ? "SOLID" : e.style : "object" == typeof e.color ? n.color = e.color.value : n.color = e.color);
            return n;
        case "table":
            if (e.headings || e.columns) {
                var i = e.headings ? e.headings : e.columns;
                if (n.columns = i.map(s),
                e.rows)
                    for (var t = 0; t < n.columns.length; t++) {
                        var a = n.columns[t];
                        a.values = [];
                        for (var d = 0; d < e.rows.length; d++)
                            a.values.push(e.rows[d][t])
                    }
            }
            for (r in e)
                e.hasOwnProperty(r) && "rows" !== r && "headings" !== r && "columns" !== r && (n[r] = e[r]);
            return n;
        case "image":
        case "text":
        case "folder":
            for (r in e)
                e.hasOwnProperty(r) && (n[r] = e[r]);
            return n;
        default:
            throw new Error("Unexpected expression type: " + o)
        }
    }
    e.migrateState = function(e) {
        if (4 !== e.version)
            throw new Error("Unexpected version: " + e.version);
        return {
            version: 5,
            graph: r(e.graph),
            expressions: {
                list: e.expressions.list.map(o)
            }
        }
    }
});

define('core/graphing-calc/json/table', ["require", "exports", "tslib", "core/lib/default-spec", "core/types/styles", "core/lib/dragmode"], function(require, e, t, n, s, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.computeParsableState = e.stripDefaults = e.inflateDefaults = e.COLUMN_DEFAULTS = e.DEFAULTS = void 0,
    e.DEFAULTS = {
        folderId: "",
        secret: !1,
        columns: []
    },
    e.COLUMN_DEFAULTS = {
        latex: "",
        color: "",
        hidden: !1,
        values: [],
        points: !0,
        lines: !1,
        dragMode: i.DragMode.NONE,
        pointStyle: s.PointStyle.POINT,
        lineStyle: s.LineStyle.SOLID,
        colorLatex: "",
        lineOpacity: "",
        lineWidth: "",
        pointOpacity: "",
        pointSize: ""
    },
    e.inflateDefaults = function(n) {
        var s = t.__assign(t.__assign({}, e.DEFAULTS), n);
        return s.columns = s.columns.map(function(n) {
            return t.__assign(t.__assign({}, e.COLUMN_DEFAULTS), n)
        }),
        s
    }
    ,
    e.stripDefaults = function(s) {
        return s = t.__assign(t.__assign({}, s), {
            columns: s.columns.map(function(t) {
                return n.stripDefaults(e.COLUMN_DEFAULTS, t)
            })
        }),
        n.stripDefaults(e.DEFAULTS, s)
    }
    ,
    e.computeParsableState = function(e) {
        return {
            type: "table",
            id: e.id,
            columns: e.columns.map(function(n) {
                return t.__assign(t.__assign({}, n), {
                    tableId: e.id
                })
            })
        }
    }
});
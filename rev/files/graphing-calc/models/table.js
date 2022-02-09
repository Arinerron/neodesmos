
define('graphing-calc/models/table', ["require", "exports", "core/math/rational-arithmetic-sequence", "tslib", "core/types/styles", "core/lib/dragmode", "./abstract-item", "underscore", "core/lib/label", "core/math/evaluate-single-expression", "core/math/distance", "core/lib/deepCopy", "core/lib/copy-properties", "graphing-calc/models/list", "core/graphing-calc/json/table", "core/graphing-calc/json/table", "core/graphing-calc/json/table", "core/lib/validate-color"], function(require, e, o, n, l, t, r, a, i, u, s, d, c, m, p, f, v, g) {
    "use strict";
    function h(e, o, n, l) {
        l.row = e.rowModels[o],
        l.row.cells.splice(n, 0, l)
    }
    function C(e, o, n) {
        e.rowModels[o].cells.splice(n, 1)
    }
    function M(e) {
        return isFinite(e) ? i.truncatedLatexLabel(e, {
            digits: 8,
            bigCutoff: 1e6,
            smallCutoff: .001
        }) : "\\mathrm{undefined}"
    }
    function y(e, o, n) {
        var l = e.columnModels[o];
        l.error = n.error,
        l.discrete = n.discrete,
        l.disabled = n.dependent,
        l.draggable = !n.error && !n.dependent,
        l.packedErrors = [],
        l.computedValues = [];
        for (var t = n.values, r = t.length - 1; r >= 0; r--) {
            var a = t[r];
            l.computedValues[r] = "number" == typeof a ? M(a) : "",
            l.packedErrors[r] = a && a.key ? a : void 0
        }
    }
    function x(e) {
        if (!e.isExpanded) {
            var o = e.rowModels.length;
            if (!(o < 30))
                return {
                    min: 8,
                    max: o - 5
                }
        }
    }
    function S(e, o) {
        var n = e.columnModels[o];
        return {
            values: e.columns[o].values.slice(),
            dragMode: n.dragMode,
            hidden: n.hidden,
            id: n.id,
            color: n.color,
            points: n.points,
            lines: n.lines,
            pointStyle: n.pointStyle,
            lineStyle: n.lineStyle,
            latex: n.latex,
            colorLatex: n.colorLatex,
            lineOpacity: n.lineOpacity,
            lineWidth: n.lineWidth,
            pointSize: n.pointSize,
            pointOpacity: n.pointOpacity
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.isColumnEmpty = e.doesCellExist = e.setCellLatex = e.shouldHideColumn = e.mergeBoundingBoxes = e.setColumnBoundingBoxes = e.setColumnHidden = e.setExpanded = e.setColumnColorLatex = e.setColumnColor = e.setColumnDragMode = e.setColumnPointOpacity = e.setColumnPointSize = e.setColumnLineOpacity = e.setColumnLineWidth = e.setColumnLineStyle = e.setColumnLines = e.setColumnPointStyle = e.setColumnPoints = e.getColumnModel = e.getSelectedCell = e.cloneTableAndExtendWithProperties = e.makeTableState = e.buildEntireColumnStructure = e.initModel = e.restoreState = e.computeTableStructureMutation = e.updateCachedUndoRedoState = e.setIsDraggingOnGrapher = e.updateCachedViewState = e.getState = e.stripBlankRowAndColumn = e.addBlankRowAndColumn = e.updateCachedParsableState = e.eachLatex = e.getRowAutoFillValues = e.removeColumn = e.insertBlankColumn = e.removeRow = e.insertBlankRow = e.onFormulaUpdate = e.onControllerUpdate = e.getColorLatexValue = e.isPointOpacityValid = e.isPointSizeValid = e.isLineWidthValid = e.isLineOpacityValid = e.isColorLatexValid = e.isDynamicPropValid = e.makeColumn = e.removeCellFromColumn = e.insertCellToColumn = e.makeRow = e.makeCell = e.getGUID = e.getColumnState = e.getCollapsedRange = e.updateIsCollapsedByFocusLocation = e.setColumnComputedValues = e.formatValueForDisplay = e.removeCellFromRow = e.insertCellToRow = void 0,
    e.insertCellToRow = h,
    e.removeCellFromRow = C,
    e.formatValueForDisplay = M,
    e.setColumnComputedValues = y,
    e.updateIsCollapsedByFocusLocation = function(e) {
        var o = H(e);
        if (o) {
            var n = x(e);
            n ? o.row >= n.min && o.row < n.max && q(e, !0) : e.isExpanded || q(e, !0)
        }
    }
    ,
    e.getCollapsedRange = x,
    e.getColumnState = S;
    var w = 0;
    function _() {
        return "table_guid_" + w++
    }
    function b() {
        return {
            guid: _(),
            type: "cell",
            row: void 0,
            column: void 0
        }
    }
    function L(e) {
        return {
            type: "row",
            index: e,
            guid: _(),
            cells: []
        }
    }
    function V(e, o, n, l) {
        var t = e.columnModels[o];
        t.cells.splice(n, 0, l),
        l.column = t,
        e.columns[t.index].values.splice(n, 0, "")
    }
    function O(e, o, n) {
        var l = e.columnModels[o];
        l.cells.splice(n, 1),
        e.columns[l.index].values.splice(n, 1)
    }
    function P(e, o, l) {
        var t = l.color;
        t && g.default(t) || (t = e.controller.getNextColor());
        var r = n.__assign(n.__assign({}, l), {
            type: "header",
            guid: _(),
            index: o,
            error: void 0,
            table: e,
            color: t,
            packedErrors: [],
            computedValues: [],
            cells: void 0,
            row: void 0,
            discrete: void 0,
            shouldGraph: void 0,
            disabled: void 0,
            draggable: void 0
        });
        return r.cells = r.values.map(function() {
            var e = b();
            return e.column = r,
            e
        }),
        delete r.values,
        0 === o && (r.hidden = !0),
        r
    }
    function E(e, o) {
        var n = e.table.formula;
        if (!n)
            return !1;
        var l = n.column_data[e.index];
        return !!l && !!l[o]
    }
    function D(e, o) {
        var n = L(o + 1);
        e.rowModels.splice(o + 1, 0, n);
        for (var l = o + 1; l < e.rowModels.length; l++)
            e.rowModels[l].index = l;
        for (l = 0; l < e.columnModels.length; l++) {
            var t = b();
            V(e, l, o, t),
            h(e, o + 1, l, t)
        }
    }
    function I(e, o, l) {
        var t = n.__assign(n.__assign(n.__assign({}, p.COLUMN_DEFAULTS), l), {
            values: e.columns[0].values.map(function() {
                return ""
            })
        })
          , r = P(e, o, t);
        e.columnModels.splice(o, 0, r),
        e.columns.splice(o, 0, t);
        for (var a = o + 1; a < e.columnModels.length; a++)
            e.columnModels[a].index = a;
        for (h(e, 0, o, r),
        a = 1; a < e.rowModels.length; a++)
            h(e, a, o, r.cells[a - 1])
    }
    function R(e) {
        for (var o = v.computeParsableState({
            type: "table",
            id: e.id,
            secret: e.secret,
            folderId: e.folderId,
            columns: e.columnModels.map(function(o) {
                return S(e, o.index)
            })
        }), n = 0; n < o.columns.length; n++)
            o.columns[n].hidden = !e.columnModels[n].shouldGraph;
        e.cachedParsableState = o
    }
    function F(e, o) {
        return (e = d.default(e)).push(n.__assign(n.__assign({}, p.COLUMN_DEFAULTS), {
            id: o,
            values: e[0].values.map(function() {
                return ""
            })
        })),
        e.forEach(function(e) {
            e.values.push("")
        }),
        e
    }
    function k(e) {
        return (e = d.default(e)).pop(),
        e.forEach(function(e) {
            e.values.pop()
        }),
        e
    }
    function B(e, o) {
        var l = n.__assign(n.__assign({}, e.cachedViewState), {
            columns: k(e.cachedViewState.columns)
        });
        return o.stripDefaults ? f.stripDefaults(l) : l
    }
    function T(e) {
        var o = e.columnModels.map(function(o, n) {
            return S(e, n)
        });
        e.cachedViewState = {
            id: e.id,
            type: e.type,
            folderId: e.folderId,
            columns: o,
            secret: e.secret
        }
    }
    function U(e) {
        var o = n.__assign(n.__assign({}, e.cachedViewState), {
            columns: k(e.cachedViewState.columns)
        });
        e.cachedUndoRedoFullState = o,
        e.preTransientState && (o = n.__assign(n.__assign({}, o), e.preTransientState)),
        e.cachedUndoRedoDiffState = o
    }
    function N(e, o) {
        if (e.columnModels.length - 1 !== o.length)
            return {
                type: "start-fresh"
            };
        if (e.columnModels[0].cells.length - 1 !== o[0].values.length)
            return {
                type: "start-fresh"
            };
        for (var n = -1, l = o.length - 1; l >= 0; l--) {
            var t = e.columns[l]
              , r = o[l];
            if (t.id !== r.id)
                return {
                    type: "start-fresh"
                };
            for (var a = t.values, i = r.values, u = i.length - 1; u >= 0; u--)
                if (a[u] !== i[u] && (-1 === n && (n = u),
                n !== u))
                    return {
                        type: "start-fresh"
                    }
        }
        return -1 === n ? {
            type: "none"
        } : {
            type: "edit-row",
            rowIndex: n
        }
    }
    e.getGUID = _,
    e.makeCell = b,
    e.makeRow = L,
    e.insertCellToColumn = V,
    e.removeCellFromColumn = O,
    e.makeColumn = P,
    e.isDynamicPropValid = E,
    e.isColorLatexValid = function(e) {
        return E(e, "color_latex_valid")
    }
    ,
    e.isLineOpacityValid = function(e) {
        return E(e, "line_opacity_valid")
    }
    ,
    e.isLineWidthValid = function(e) {
        return E(e, "line_width_valid")
    }
    ,
    e.isPointSizeValid = function(e) {
        return E(e, "point_size_valid")
    }
    ,
    e.isPointOpacityValid = function(e) {
        return E(e, "point_opacity_valid")
    }
    ,
    e.getColorLatexValue = function(e) {
        var o = e.table.formula;
        if (o) {
            var n = o.column_data[e.index];
            if (n)
                return n.color_latex_value
        }
    }
    ,
    e.onControllerUpdate = function(e) {
        e.draggingOnGraphpaper ? e.preTransientState || (e.preTransientState = {
            columns: B(e, {
                stripDefaults: !1
            }).columns
        }) : delete e.preTransientState,
        r.updateIsHiddenFromUI(e);
        var o = m.getParentFolderModel(e)
          , n = o && o.hidden;
        a.each(e.columnModels, function(e) {
            e.shouldGraph = !n && !e.hidden
        }),
        T(e),
        U(e),
        R(e)
    }
    ,
    e.onFormulaUpdate = function(e, o) {
        e.formula = o;
        var n, l = e.formula.column_data, t = e.columnModels[0].cells.length, r = e.columnModels.length, a = 0;
        for (n = 0; n < l.length; n++) {
            var i = l[n].values.length;
            i > a && (a = i)
        }
        for (n = a - t; n > 0; n--)
            D(e, t),
            t++;
        for (n = 0; n < l.length && n < r; n++) {
            y(e, n, l[n])
        }
        var u = e.columnModels[e.columnModels.length - 1];
        u.disabled = !0,
        u.error = void 0
    }
    ,
    e.insertBlankRow = D,
    e.removeRow = function(e, o) {
        var n = x(e);
        n && o === n.max - 1 && q(e, !0);
        for (var l = 0; l < e.columnModels.length; l++)
            O(e, l, o);
        for (e.rowModels.splice(o + 1, 1),
        l = o + 1; l < e.rowModels.length; l++)
            e.rowModels[l].index = l
    }
    ,
    e.insertBlankColumn = I,
    e.removeColumn = function(e, o) {
        e.columns.splice(o, 1),
        e.columnModels.splice(o, 1);
        for (var n = o; n < e.columnModels.length; n++)
            e.columnModels[n].index = n;
        for (n = 0; n < e.rowModels.length; n++)
            C(e, n, o)
    }
    ,
    e.getRowAutoFillValues = function(e, n) {
        var l, t = e.columnModels.length, r = [];
        for (l = 0; l < t; l++)
            r.push("");
        var a = e.columns[0].values;
        if (n > 1) {
            var i = e.controller.isDegreeMode()
              , d = u.default(a[0], i)
              , c = u.default(a[1], i);
            if (isFinite(d) && isFinite(c)) {
                var m = o(d, c);
                if (m) {
                    var p = m.nstart
                      , f = p / m.lcm;
                    for (l = 0; l < n; l++) {
                        var v = u.default(a[l], i);
                        if (!s.approx(v, f))
                            return r;
                        f = (p += m.nstep) / m.lcm
                    }
                    r[0] = ("" + d).length < 8 && ("" + c).length < 8 ? "" + f : "\\frac{" + p + "}{" + m.lcm + "}"
                }
            }
        }
        return r
    }
    ,
    e.eachLatex = function(e, o) {
        for (var n = 0; n < e.columnModels.length; n++) {
            o(e.columnModels[n].latex, "tableHeader");
            for (var l = e.columns[n], t = 0; t < l.values.length; t++)
                l.values[t] && o(l.values[t], "tableCellValue")
        }
    }
    ,
    e.updateCachedParsableState = R,
    e.addBlankRowAndColumn = F,
    e.stripBlankRowAndColumn = k,
    e.getState = B,
    e.updateCachedViewState = T,
    e.setIsDraggingOnGrapher = function(e, o) {
        e.draggingOnGraphpaper = o
    }
    ,
    e.updateCachedUndoRedoState = U,
    e.computeTableStructureMutation = N;
    var z = {
        id: !1,
        type: !1,
        columns: !1,
        folderId: !0,
        secret: !0
    }
      , A = {
        id: !1,
        values: !1,
        color: !0,
        latex: !0,
        hidden: !0,
        points: !0,
        lines: !0,
        dragMode: !0,
        lineStyle: !0,
        pointStyle: !0,
        colorLatex: !0,
        lineOpacity: !0,
        lineWidth: !0,
        pointSize: !0,
        pointOpacity: !0
    };
    function W(e) {
        e.columnModels = e.columns.map(function(o, n) {
            return P(e, n, o)
        }),
        e.rowModels = [L(0)];
        for (var o = 0; o < e.columnModels.length; o++)
            h(e, 0, o, e.columnModels[o]);
        for (o = 0; o < e.columnModels[0].cells.length; o++) {
            var n = L(o + 1);
            e.rowModels.push(n);
            for (var l = 0; l < e.columnModels.length; l++)
                h(e, o + 1, l, e.columnModels[l].cells[o])
        }
    }
    e.restoreState = function(e, o) {
        var n = N(e, o.columns);
        if (c.copyProperties({
            from: o,
            to: e,
            props: z
        }),
        "start-fresh" === n.type)
            e.columns = F(o.columns, e.controller.generateId()),
            W(e);
        else {
            switch (n.type) {
            case "none":
                break;
            case "edit-row":
                for (var l = o.columns.length - 1; l >= 0; l--) {
                    K(e, {
                        column: l,
                        row: n.rowIndex + 1
                    }, o.columns[l].values[n.rowIndex])
                }
                break;
            default:
                return n
            }
            for (var t = 0; t < o.columns.length; t++)
                c.copyProperties({
                    from: o.columns[t],
                    to: e.columnModels[t],
                    props: A
                })
        }
    }
    ,
    e.initModel = function(e, o) {
        var l = d.default(f.inflateDefaults(e))
          , t = n.__assign(n.__assign(n.__assign({}, l), r.DEFAULTS(o)), {
            columnModels: void 0,
            rowModels: void 0,
            formula: void 0,
            draggingOnGraphpaper: !1,
            cachedViewState: {},
            cachedParsableState: {},
            cachedUndoRedoDiffState: {},
            cachedUndoRedoFullState: {},
            isExpanded: !1
        });
        t.columns = F(t.columns, o.generateId());
        var a, i = 0;
        for (a = 0; a < t.columns.length; a++)
            t.columns[a].values || (t.columns[a].values = []),
            t.columns[a].values.length > i && (i = t.columns[a].values.length);
        for (a = 0; a < t.columns.length; a++)
            for (var u = i - t.columns[a].values.length; u > 0; u--)
                t.columns[a].values.push("");
        return W(t),
        t
    }
    ,
    e.buildEntireColumnStructure = W;
    var G = ["x", "y", "z", "u", "v", "w"];
    function H(e) {
        var o = e.controller.getFocusLocation();
        return o && "table" === o.type && o.id === e.id ? o.location : void 0
    }
    function j(e, o) {
        for (var n = 0; n < e.columnModels.length; n++) {
            var l = e.columnModels[n];
            if (l.id === o)
                return l
        }
    }
    function q(e, o) {
        e.isExpanded = o
    }
    function J(e) {
        var o = [];
        e.columnModels.forEach(function(e) {
            e.boundingBoxes && !e.hidden && (o = o.concat(e.boundingBoxes))
        }),
        e.boundingBoxes = o
    }
    function K(e, o, n) {
        if (0 === o.row) {
            var l = j(e, e.columnModels[o.column].id);
            if (!l)
                return;
            return l.latex = n,
            void (o.column >= e.columnModels.length - 1 && I(e, o.column + 1, {
                id: e.controller.generateId(),
                latex: "",
                color: e.controller.getNextColor()
            }))
        }
        var t = e.columnModels[o.column];
        e.columns[t.index].values[o.row - 1] = n,
        "" !== n && o.row >= e.columnModels[0].cells.length && D(e, o.row)
    }
    e.makeTableState = function(e, o, n) {
        for (var r = [], a = Math.min(o.length, G.length), u = 0; u < a; u++)
            r.push({
                id: n.generateId(),
                latex: i.identifierToLatex(G[u] + "_" + e),
                values: o[u],
                color: n.getNextColor(),
                hidden: !1,
                points: !0,
                lines: !1,
                dragMode: t.DragMode.NONE,
                pointStyle: l.PointStyle.POINT,
                lineStyle: l.LineStyle.SOLID,
                colorLatex: "",
                lineWidth: "",
                lineOpacity: "",
                pointOpacity: "",
                pointSize: ""
            });
        return {
            id: n.generateId(),
            type: "table",
            folderId: "",
            secret: !1,
            columns: r
        }
    }
    ,
    e.cloneTableAndExtendWithProperties = function(e, o) {
        var n = B(e, {
            stripDefaults: !1
        });
        if (!n.columns || !o.columns)
            return o;
        for (var l = 0; l < o.columns.length; l++) {
            var t = n.columns[l]
              , r = o.columns[l];
            if (t)
                for (var a in t)
                    t.hasOwnProperty(a) && (r.hasOwnProperty(a) || (r[a] = t[a]))
        }
        return o
    }
    ,
    e.getSelectedCell = H,
    e.getColumnModel = j,
    e.setColumnPoints = function(e, o, n) {
        var l = j(e, o);
        l && (l.points = n,
        n || (l.dragMode = t.DragMode.NONE))
    }
    ,
    e.setColumnPointStyle = function(e, o, n) {
        var l = j(e, o);
        l && (l.pointStyle = n)
    }
    ,
    e.setColumnLines = function(e, o, n) {
        var l = j(e, o);
        l && (l.lines = n)
    }
    ,
    e.setColumnLineStyle = function(e, o, n) {
        var l = j(e, o);
        l && (l.lineStyle = n)
    }
    ,
    e.setColumnLineWidth = function(e, o, n) {
        var l = j(e, o);
        l && (l.lineWidth = n)
    }
    ,
    e.setColumnLineOpacity = function(e, o, n) {
        var l = j(e, o);
        l && (l.lineOpacity = n)
    }
    ,
    e.setColumnPointSize = function(e, o, n) {
        var l = j(e, o);
        l && (l.pointSize = n)
    }
    ,
    e.setColumnPointOpacity = function(e, o, n) {
        var l = j(e, o);
        l && (l.pointOpacity = n)
    }
    ,
    e.setColumnDragMode = function(e, o, n) {
        var l = j(e, o);
        l && (l.dragMode = n,
        n === t.DragMode.NONE || l.points || (l.points = !0))
    }
    ,
    e.setColumnColor = function(e, o, n) {
        var l = j(e, o);
        l && g.default(n) && (l.color = n,
        l.colorLatex = "")
    }
    ,
    e.setColumnColorLatex = function(e, o, n) {
        var l = j(e, o);
        l && (l.colorLatex = n)
    }
    ,
    e.setExpanded = q,
    e.setColumnHidden = function(e, o, n) {
        var l = j(e, o);
        l && (l.hidden = n,
        n && J(e))
    }
    ,
    e.setColumnBoundingBoxes = function(e, o, n) {
        var l = j(e, o);
        l && (l.boundingBoxes = n,
        J(e))
    }
    ,
    e.mergeBoundingBoxes = J,
    e.shouldHideColumn = function(e, o) {
        var n = j(e, o);
        return !n || !n.points && !n.lines
    }
    ,
    e.setCellLatex = K,
    e.doesCellExist = function(e, o) {
        return o.row < e.rowModels.length && o.column < e.columnModels.length
    }
    ,
    e.isColumnEmpty = function(e) {
        if (e.values)
            for (var o = 0, n = e.values; o < n.length; o++)
                if ("" !== n[o])
                    return !1;
        if (e.computedValues)
            for (var l = 0, t = e.computedValues; l < t.length; l++)
                if ("" !== t[l])
                    return !1;
        return !0
    }
});
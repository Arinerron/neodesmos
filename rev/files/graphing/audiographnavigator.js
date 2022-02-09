
define('graphing/audiographnavigator', ["require", "exports", "main/propagate_selection", "tslib", "underscore", "core/types/graphmode", "core/lib/label", "core/math/poi-type", "graphing/tonegenerator", "underscore", "lib/aria"], function(require, e, t, r, n, i, o, a, s, h, p) {
    "use strict";
    function c(e, t, r) {
        return {
            x: e.x,
            y: e.y,
            branch: e.branch,
            reportedBranch: r,
            type: e.type,
            graphMode: t,
            intersects: e.intersects
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t, r) {
            this.grapher = r,
            this.controller = e,
            this.audiograph = t,
            this.reset()
        }
        return e.prototype.reset = function() {
            this.currentPoint = void 0,
            this.resetToFirstBranch(),
            this.sampledPoints = [],
            this.pois = [],
            this.independent = 0,
            this.xstep = 0,
            this.ystep = 0
        }
        ,
        e.prototype.resetToFirstBranch = function() {
            var e = this.getCurrentSketch();
            this.branch = e ? s.getFirstPlayableBranchIndex(e) : 0
        }
        ,
        e.prototype.getBranchPoints = function(e) {
            var t = [];
            if (e >= 0)
                for (var r = 0, n = this.getSampledPoints(); r < n.length; r++) {
                    var i = n[r];
                    i.branch === e && t.push(i)
                }
            return t
        }
        ,
        e.prototype.resetTracePoint = function() {
            this.drawTrace(this.getCurrentPoint())
        }
        ,
        e.prototype.drawTrace = function(e) {
            var t = this.getCurrentSketch();
            if (e && t) {
                var r = t.branches[this.branch];
                if (r)
                    if (r.graphMode !== i.XYPOINT) {
                        var n = {
                            x: e.x,
                            y: e.y
                        }
                          , o = {
                            branchInfo: {
                                branch: e.branch,
                                id: t.id,
                                sketch: t
                            },
                            pt: n
                        };
                        h.isEqual(o, this.grapher.traceLayer.getTraceInfo()) || (this.grapher.traceLayer.setTraceInfo(o),
                        this.grapher.redrawAllLayers())
                    }
            }
        }
        ,
        e.prototype.moveToOrigin = function() {
            var e = this.getCurrentSketch();
            if (e && s.canPlaySketch(e)) {
                var t = e.branches[this.branch];
                if (s.canPlayBranch(t)) {
                    var r = t.graphMode;
                    if (r === i.Y)
                        this.setIndependent("x", 0);
                    else if (r === i.X)
                        this.setIndependent("y", 0);
                    else if (r === i.XYPOINT) {
                        var n = this.getSortedPOI()[0];
                        this.setIndependent("x", n ? n.x : 0)
                    }
                }
            }
        }
        ,
        e.prototype.getCurrentSketch = function() {
            var e, t = this.getSelectedItem();
            if (t) {
                var r = this.audiograph.getFocusedCell();
                if ("table" === t.type) {
                    if (r && (e = this.getGraphSketchForTableCell(t, r)),
                    !e)
                        for (var n = 0, i = t.columnModels; n < i.length; n++) {
                            var o = i[n];
                            if (void 0 !== (e = this.grapher.getGraphSketch(o.id)))
                                break
                        }
                } else
                    e = this.grapher.getGraphSketch(t.id)
            }
            return e
        }
        ,
        e.prototype.getFirstTraceableSketch = function(e) {
            for (var t, r = this.controller.getItemCount(), n = this.controller.shouldAudioTraceReverseExpressions(), i = 0; i < r; i++) {
                var o = n ? r - 1 - i : i
                  , a = this.controller.getItemModelByIndex(o);
                if (a && this.canTrace(a)) {
                    var s = n ? this.prevTableColumn(a) : this.nextTableColumn(a);
                    if (s ? (this.audiograph.setFocusedCell(s),
                    t = this.getGraphSketchForTableCell(a, s)) : t = this.grapher.getGraphSketch(a.id),
                    t) {
                        e && e.selectAssociatedExpression && this.controller.dispatch({
                            type: "set-selected-index",
                            index: o
                        });
                        break
                    }
                }
            }
            return t
        }
        ,
        e.prototype.canTrace = function(e) {
            if ("image" === e.type)
                return !1;
            if ("shouldGraph"in e) {
                var t = this.grapher.getGraphSketch(e.id);
                return !!t && s.canPlaySketch(t)
            }
            return !1
        }
        ,
        e.prototype.getTraceableExpressionCount = function() {
            for (var e = 0, t = this.controller.getItemCount(), r = 0; r < t; r++) {
                var n = this.controller.getItemModelByIndex(r);
                n && (this.canTrace(n) && e++)
            }
            return e
        }
        ,
        e.prototype.computeStepSizes = function() {
            var e = this.grapher.getProjection().viewport;
            if (e) {
                this.viewport = e;
                var t = e.xmin
                  , r = e.xmax;
                this.xstep = Math.abs(r - t) / 100,
                this.xscale = r - t;
                var n = e.ymin
                  , o = e.ymax;
                this.ystep = Math.abs(o - n) / 100,
                this.yscale = o - n;
                var a = this.getCurrentSketch();
                if (a && s.canPlaySketch(a)) {
                    var h = a.branches[this.branch];
                    if (s.canPlayBranch(h)) {
                        var p = h.graphMode;
                        if (p === i.Y)
                            this.independent < t ? this.independent = t : this.independent > r && (this.independent = r);
                        else if (p === i.X)
                            this.independent < n ? this.independent = n : this.independent > o && (this.independent = o);
                        else if (p === i.XYPOINT) {
                            var c = void 0
                              , l = void 0;
                            this.independent < t ? (l = this.getSortedPOI()[0],
                            this.independent = l && void 0 !== l.x ? l.x : 0) : this.independent > r && (l = (c = this.getSortedPOI())[c.length - 1],
                            this.independent = l && void 0 !== l.x ? l.x : 0)
                        }
                    }
                }
            }
        }
        ,
        e.prototype.getPoint = function(e, t) {
            var r, n, o, a, h = this.getCurrentSketch();
            if (!h || !s.canPlaySketch(h))
                return r;
            var p = 0
              , c = h.branches[e];
            if (c) {
                var l = s.getReportedBranch(h, e);
                return "compiled"in c && c.compiled && (a = c.compiled.fn),
                (o = c.graphMode) === i.Y ? ((n = this.getInterveningPOIs(t, t + this.xstep, e, o)[0]) && n.x === t && n.branch === e || (n = void 0,
                p = a ? a(t) : 0),
                n ? r = {
                    x: n.x,
                    y: n.y,
                    type: n.type,
                    typeChain: n.typeChain,
                    branch: n.branch,
                    reportedBranch: l,
                    graphMode: o,
                    intersects: n.intersects
                } : a && (r = {
                    x: t,
                    y: p,
                    branch: e,
                    reportedBranch: l,
                    graphMode: o
                })) : o === i.X ? ((n = this.getInterveningPOIs(t, t + this.ystep, e, o)[0]) && n.y === t && n.branch === e || (n = void 0,
                p = a ? a(t) : 0),
                n ? r = {
                    x: n.x,
                    y: n.y,
                    type: n.type,
                    typeChain: n.typeChain,
                    branch: n.branch,
                    reportedBranch: l,
                    graphMode: o,
                    intersects: n.intersects
                } : a && (r = {
                    y: t,
                    x: p,
                    branch: e,
                    reportedBranch: l,
                    graphMode: o
                })) : o === i.XYPOINT && (r = (n = this.getInterveningPOIs(t, t + this.xstep, e, o)[0]) && n.x === t && n.branch === e ? {
                    x: n.x,
                    y: n.y,
                    type: n.type,
                    typeChain: n.typeChain,
                    branch: n.branch,
                    reportedBranch: l,
                    graphMode: o,
                    intersects: n.intersects
                } : {
                    x: t,
                    y: NaN,
                    branch: e,
                    reportedBranch: l,
                    graphMode: o
                }),
                r
            }
        }
        ,
        e.prototype.getSampledPoints = function() {
            return 0 === this.sampledPoints.length && this.updateSampledPoints(),
            this.sampledPoints
        }
        ,
        e.prototype.updateSampledPoints = function() {
            var e = this.getCurrentSketch();
            if (e && s.canPlaySketch(e)) {
                for (var t = [], r = 0; r < e.branches.length; r++) {
                    var n = e.branches[r];
                    if (s.canPlayBranch(n)) {
                        var a = n.graphMode
                          , h = 0
                          , p = 0
                          , c = 0
                          , l = [];
                        if (a === i.Y || a === i.XYPOINT ? (h = this.viewport.xmin,
                        p = this.viewport.xmax,
                        c = this.xstep) : a === i.X && (h = this.viewport.ymin,
                        p = this.viewport.ymax,
                        c = this.ystep),
                        0 !== h || 0 !== p || 0 !== c) {
                            for (var d = 0; o.value(h + d * c).value <= p; d++) {
                                var u = o.value(h + d * c).value
                                  , v = this.getInterveningPOIs(u, u + c, r, a);
                                if (v.length > 0)
                                    l.push.apply(l, v);
                                else {
                                    var g = this.getPoint(r, u);
                                    g && l.push(g)
                                }
                            }
                            t.push.apply(t, this.removeDuplicates(l, a))
                        }
                    }
                }
                this.sampledPoints = t
            }
        }
        ,
        e.prototype.getCurrentPoint = function() {
            return this.currentPoint || this.updateCurrentPoint(),
            this.currentPoint
        }
        ,
        e.prototype.updateCurrentPoint = function(e) {
            if (e) {
                this.currentPoint = e;
                var t = e.graphMode;
                t === i.Y || t === i.XYPOINT ? this.independent = void 0 !== e.x ? e.x : 0 : t === i.X && (this.independent = void 0 !== e.y ? e.y : 0),
                this.branch = e.branch
            } else
                this.currentPoint = this.getPoint(this.branch, this.independent)
        }
        ,
        e.prototype.prevPoint = function() {
            this.moveToPoint(-1)
        }
        ,
        e.prototype.nextPoint = function() {
            this.moveToPoint(1)
        }
        ,
        e.prototype.firstPoint = function() {
            var e = this.getSampledPoints();
            e.length > 0 && this.updateCurrentPoint(e[0])
        }
        ,
        e.prototype.lastPoint = function() {
            var e = this.getSampledPoints();
            e.length > 0 && this.updateCurrentPoint(e[e.length - 1])
        }
        ,
        e.prototype.moveToPoint = function(e) {
            var t = this.getCurrentPoint();
            if (t)
                if (t.graphMode !== i.XYPOINT) {
                    var r = this.getSampledPoints()
                      , n = this.getPointIndex(r, t);
                    if (-1 !== n) {
                        var o = n + e;
                        o <= 0 ? (o = 0,
                        p.queue(this.controller.s("graphing-calculator-narration-audio-trace-first-point"))) : o >= r.length - 1 && (o = r.length - 1,
                        p.queue(this.controller.s("graphing-calculator-narration-audio-trace-last-point")));
                        var a = r[o];
                        this.updateCurrentPoint(a)
                    }
                } else
                    this.moveToPOI(e)
        }
        ,
        e.prototype.canMoveToPrevPoint = function() {
            var e = this.getCurrentPoint();
            if (!e)
                return !1;
            if (e.graphMode === i.XYPOINT)
                return this.canMoveToPrevPOI();
            var t = this.getSampledPoints();
            return this.getPointIndex(t, e) > 0
        }
        ,
        e.prototype.canMoveToNextPoint = function() {
            var e = this.getCurrentPoint();
            if (!e)
                return !1;
            if (e.graphMode === i.XYPOINT)
                return this.canMoveToNextPOI();
            var t = this.getSampledPoints();
            return this.getPointIndex(t, e) < t.length - 1
        }
        ,
        e.prototype.prevPOI = function() {
            this.moveToPOI(-1)
        }
        ,
        e.prototype.nextPOI = function() {
            this.moveToPOI(1)
        }
        ,
        e.prototype.getSortedPOI = function() {
            return this.pois && 0 !== this.pois.length || this.updatePOI(),
            this.pois
        }
        ,
        e.prototype.updatePOI = function() {
            var e, t = [], r = [], o = this.getCurrentSketch();
            if (o && s.canPlaySketch(o)) {
                for (var a = 0; a < o.branches.length; a++) {
                    var h = o.branches[a];
                    if (h) {
                        var p = s.getReportedBranch(o, a)
                          , l = h.graphMode;
                        if (r = [],
                        (e = o.getBranchPOI(a)).length > 0) {
                            l === i.Y || l === i.XYPOINT ? r = n.sortBy(e, "x") : l === i.X && (r = n.sortBy(e, "y"));
                            for (var d = [], u = 0, v = r; u < v.length; u++) {
                                var g = v[u];
                                d.push(c(g, l, p))
                            }
                            t.push.apply(t, this.removeDuplicates(d, l))
                        }
                    }
                }
                this.pois = t
            }
        }
        ,
        e.prototype.removeDuplicates = function(e, t) {
            for (var n = [], i = 0, s = e; i < s.length; i++) {
                var h = s[i];
                if ((h = r.__assign({}, h)).graphMode = t,
                0 !== n.length) {
                    var p = n[n.length - 1];
                    o.value(p.x).value === o.value(h.x).value && o.value(p.y).value === o.value(h.y).value && p.branch === h.branch ? (p.typeChain || (p.typeChain = void 0 !== p.type ? [p.type] : []),
                    void 0 !== h.type && -1 === p.typeChain.indexOf(h.type) && p.typeChain.push(h.type),
                    h.type === a.INTERSECTION && h.intersects && void 0 === p.intersects && (p.intersects = h.intersects)) : n.push(h)
                } else
                    n.push(h)
            }
            return n
        }
        ,
        e.prototype.getInterveningPOIs = function(e, t, r, n) {
            for (var o = [], a = NaN, s = 0, h = this.getSortedPOI(); s < h.length; s++) {
                var p = h[s];
                p && (n !== i.Y && n !== i.XYPOINT || isNaN(p.x) ? n !== i.X || isNaN(p.y) || (a = p.y) : a = p.x,
                p.branch === r && !isNaN(a) && (e <= a && a < t || t <= a && a < e) && o.push(p))
            }
            return e > t ? o.reverse() : o
        }
        ,
        e.prototype.setIndependent = function(e, t) {
            for (var r = this.getSampledPoints(), n = 0, i = r; n < i.length; n++) {
                var o = i[n];
                if (o && o.hasOwnProperty(e) && o[e] === t) {
                    if ("x" === e)
                        return this.independent = void 0 !== o.x ? o.x : 0,
                        void this.updateCurrentPoint();
                    if ("y" === e)
                        return this.independent = void 0 !== o.y ? o.y : 0,
                        void this.updateCurrentPoint()
                }
            }
            var a = !0;
            if (r.length > 0) {
                var s = r[Math.floor((r.length - 1) / 2)];
                s && ("x" === e ? (this.independent = void 0 !== s.x ? s.x : 0,
                a = !1) : "y" === e && (this.independent = void 0 !== s.y ? s.y : 0,
                a = !1))
            }
            a && (this.independent = 0),
            this.resetToFirstBranch(),
            this.updateCurrentPoint()
        }
        ,
        e.prototype.moveToPOI = function(e) {
            if (this.getCurrentPoint()) {
                var t = this.getSampledPoints()
                  , r = this.getPOIIndexByDirection(e);
                -1 === r ? p.queue(this.controller.s("graphing-calculator-narration-audio-trace-no-more-pois")) : this.updateCurrentPoint(t[r])
            }
        }
        ,
        e.prototype.getPOIIndexByDirection = function(e) {
            var t = this.getCurrentPoint();
            if (!t)
                return -1;
            var r = this.getSampledPoints()
              , n = this.getPointIndex(r, t)
              , o = -1;
            if (-1 !== n)
                for (var a = t.graphMode, s = 1 === e ? r.length - 1 : 0, h = n; h !== s + e; h += e) {
                    var p = r[h];
                    if (((a === i.Y || a === i.XYPOINT) && t.x !== p.x || a === i.X && t.y !== p.y) && void 0 !== p.type) {
                        o = h;
                        break
                    }
                }
            return o
        }
        ,
        e.prototype.canMoveToPrevPOI = function() {
            return -1 !== this.getPOIIndexByDirection(-1)
        }
        ,
        e.prototype.canMoveToNextPOI = function() {
            return -1 !== this.getPOIIndexByDirection(1)
        }
        ,
        e.prototype.getPointIndex = function(e, t) {
            var r = -1;
            if (e.length > 0 && t)
                for (var n = t.graphMode, o = 0; o < e.length; o++) {
                    var a = e[o];
                    if (((n === i.Y || n === i.XYPOINT) && a.x === t.x || n === i.X && a.y === t.y) && a.branch === t.branch) {
                        r = o;
                        break
                    }
                }
            return r
        }
        ,
        e.prototype.prevCurve = function() {
            this.controller.shouldAudioTraceReverseExpressions() ? this.curveDown() : this.curveUp()
        }
        ,
        e.prototype.nextCurve = function() {
            this.controller.shouldAudioTraceReverseExpressions() ? this.curveUp() : this.curveDown()
        }
        ,
        e.prototype.curveUp = function() {
            var e = this.getSelectedItem();
            if (e) {
                var t = this.prevTableColumn(e);
                if (t)
                    this.audiograph.setFocusedCell(t);
                else {
                    var r = e.index
                      , n = this.findPrevTraceableIndex({
                        index: r,
                        focusTableCell: !0
                    });
                    if (-1 !== n) {
                        var i = this.controller.getItemModelByIndex(n);
                        i && this.controller.dispatch({
                            type: "set-selected-id",
                            id: i.id
                        })
                    }
                }
                (t || this.getSelectedItem() !== e) && this.audiograph.enterAudioTrace()
            }
        }
        ,
        e.prototype.curveDown = function() {
            var e = this.getSelectedItem();
            if (e) {
                var t = this.nextTableColumn(e);
                if (t)
                    this.audiograph.setFocusedCell(t);
                else {
                    var r = e.index
                      , n = this.findNextTraceableIndex({
                        index: r,
                        focusTableCell: !0
                    });
                    if (-1 !== n) {
                        var i = this.controller.getItemModelByIndex(n);
                        i && this.controller.dispatch({
                            type: "set-selected-id",
                            id: i.id
                        })
                    }
                }
                (t || this.getSelectedItem() !== e) && this.audiograph.enterAudioTrace()
            }
        }
        ,
        e.prototype.canMoveToPrevCurve = function() {
            var e = this.getSelectedItem();
            return !!e && (this.controller.shouldAudioTraceReverseExpressions() ? -1 !== this.findNextTraceableIndex({
                index: e.index,
                focusTableCell: !1
            }) : -1 !== this.findPrevTraceableIndex({
                index: e.index,
                focusTableCell: !1
            }))
        }
        ,
        e.prototype.canMoveToNextCurve = function() {
            var e = this.getSelectedItem();
            return !!e && (this.controller.shouldAudioTraceReverseExpressions() ? -1 !== this.findPrevTraceableIndex({
                index: e.index,
                focusTableCell: !1
            }) : -1 !== this.findNextTraceableIndex({
                index: e.index,
                focusTableCell: !1
            }))
        }
        ,
        e.prototype.findPrevTraceableIndex = function(e) {
            var t, r = e.index;
            do {
                r--;
                var n = (t = this.controller.getItemModelByIndex(r)) && this.prevTableColumn(t);
                if (n)
                    return e.focusTableCell && this.audiograph.setFocusedCell(n),
                    r
            } while (t && !this.canTrace(t));
            return t ? r : -1
        }
        ,
        e.prototype.findNextTraceableIndex = function(e) {
            var t, r = e.index;
            do {
                r++;
                var n = (t = this.controller.getItemModelByIndex(r)) && this.nextTableColumn(t);
                if (n)
                    return e.focusTableCell && this.audiograph.setFocusedCell(n),
                    r
            } while (t && !this.canTrace(t));
            return t ? r : -1
        }
        ,
        e.prototype.prevTableColumn = function(e) {
            return this.tableColumn(e, -1)
        }
        ,
        e.prototype.nextTableColumn = function(e) {
            return this.tableColumn(e, 1)
        }
        ,
        e.prototype.tableColumn = function(e, t) {
            var r;
            if (e && "table" === e.type) {
                var n = this.audiograph.getFocusedCell()
                  , i = void 0
                  , o = void 0
                  , a = void 0;
                -1 === t ? (i = n ? Math.max(n.location.column - 1, 0) : NaN,
                o = n && n.tableId === e.id && !isNaN(i) ? i : e.columnModels.length - 1,
                a = 0) : (i = n ? Math.min(n.location.column + 1, e.columnModels.length - 1) : NaN,
                o = n && n.tableId === e.id && !isNaN(i) ? i : 0,
                a = e.columnModels.length - 1);
                var s = (a - o) / t;
                if (isFinite(s) && s >= 0)
                    for (var h = o; h !== a; h += t) {
                        var p = e.columnModels[h];
                        if (p)
                            if (this.grapher.getGraphSketch(p.id)) {
                                r = {
                                    tableId: e.id,
                                    location: {
                                        column: h,
                                        row: 0
                                    }
                                };
                                break
                            }
                    }
            }
            return r
        }
        ,
        e.prototype.getGraphSketchForTableCell = function(e, t) {
            if (e && "table" === e.type && t) {
                var r = e.columnModels[t.location.column];
                return r ? this.grapher.getGraphSketch(r.id) : void 0
            }
        }
        ,
        e.prototype.getXScale = function() {
            return this.xscale
        }
        ,
        e.prototype.getYScale = function() {
            return this.yscale
        }
        ,
        e.prototype.getSelectedItem = function() {
            var e = this.controller.getSelectedItem();
            return e && "folder" === e.type ? this.controller.getItemModel(t.getSelectedId(e)) : e
        }
        ,
        e
    }();
    e.default = l
});
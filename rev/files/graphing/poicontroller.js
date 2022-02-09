define('graphing/poicontroller', ['require', 'jquery', 'core/math/distance', 'lib/rounding', 'core/types/graphmode', 'lib/conditional_blur', 'keys', 'lib/aria', 'core/lib/label', 'expressions/colors', 'graphing-calc/models/image', 'graphing-calc/models/expression', '../geometry/math/polygon'], function(require) {
    "use strict";
    var e = require("jquery")
      , t = require("core/math/distance")
      , i = require("lib/rounding")
      , a = require("core/types/graphmode")
      , r = require("lib/conditional_blur").default
      , n = require("keys")
      , o = require("lib/aria")
      , s = require("core/lib/label")
      , l = require("expressions/colors").getColorName
      , c = require("graphing-calc/models/image")
      , h = require("graphing-calc/models/expression")
      , d = require("../geometry/math/polygon");
    function p(e) {
        if (e) {
            if ("image" === e.type && e.listIndex)
                return e.listIndex;
            if (e.poi)
                return e.poi.pointIdxOnBranch;
            if (e.branchInfo && e.branchInfo.sketch) {
                var t = e.branchInfo.branch;
                return e.branchInfo.sketch.branches[t].listIndex
            }
            return 0
        }
    }
    var g = 0;
    function v(e, t) {
        this.manager = e,
        this.controller = e.controller,
        this.graphSettings = t,
        this.$ = this.manager.$,
        this.__id = g++,
        this.graphSettings.config.graphpaper && !this.graphSettings.config.disableMouseInteractions && (this.addTouchEventHandlers(),
        this.addHoverEventHandler(),
        this.addKeydownEventHandler(),
        this.addManualUnhoverListener())
    }
    return v.prototype.getExpressionModel = function(e) {
        return this.controller.getItemModel(e)
    }
    ,
    v.prototype.remove = function() {
        this.removeAllGlobalMouseListeners(),
        this.removeManualUnhoverListener()
    }
    ,
    v.prototype.addGlobalMouseListener = function(t, i) {
        for (var a = t.split(" "), r = 0; r < a.length; r++)
            e(document).on(a[r] + ".dcg-poiController-" + this.__id, i)
    }
    ,
    v.prototype.removeAllGlobalMouseListeners = function() {
        e(document).off(".dcg-poiController-" + this.__id)
    }
    ,
    v.prototype.getToleranceByDevice = function(e) {
        return "touch" === e ? 20 : 10
    }
    ,
    v.prototype.addHoverEventHandler = function() {
        this.$.on("dcg-tapmove", function(t) {
            if ("touch" !== t.device) {
                var i, a, r, n, o, s = e(document.elementFromPoint(t.clientX, t.clientY)).closest(".dcg-grapher").length, l = this.manager.poiLabelsLayer, h = this.getMouseRelativeToGrapher(t), d = this.getToleranceByDevice(t.device);
                s && (i = this.getFeatureUnderPoint(h, d)),
                i && "movable-point" === i.type && (a = i.poi.getMovablePoint().id),
                i && i.isClickable && (this.manager.movablePointsLayer.isMovingPoint() || this.manager.traceLayer.isTracing() || (r = i.model,
                n = p(i))),
                this.manager.clickableObjectsLayer.setHoveredObject(r && {
                    id: r.id,
                    listIndex: n
                }),
                i && "poi" === i.type && (i.poi.isAttachedToPlottedPoint() && !i.poi.hasInteractiveLabel() || (o = i.poi)),
                o !== l.getHoveredPOI() && (this.controller.isTraceEnabled() ? l.setHoveredPOI(o) : l.setHoveredPOI(void 0),
                this.manager.redrawAllLayers());
                var g = !1;
                if (i && "image" === i.type) {
                    var v = c.isActuallyDraggable(i.model)
                      , m = i.isClickable;
                    g = v && !m
                }
                var u = !1;
                i && "draggable-label" === i.type && (u = !0),
                g || u ? this.manager.setLayerClass("extraMoveCursor", "dcg-mouse-over-movable-point") : this.manager.setLayerClass("extraMoveCursor", ""),
                this.manager.movablePointsLayer.setHoveredPointId(a)
            }
        }
        .bind(this))
    }
    ,
    v.prototype.addManualUnhoverListener = function() {
        var t = function() {
            var e = this.manager;
            e.poiLabelsLayer.setHoveredPOI(void 0),
            e.clickableObjectsLayer.setHoveredObject(void 0),
            e.redrawAllLayers()
        }
        .bind(this);
        e(window).on("blur.dcg-poiController-" + this.__id, t),
        this.$.on("mouseleave", t)
    }
    ,
    v.prototype.removeManualUnhoverListener = function() {
        e(window).off(".dcg-poiController-" + this.__id)
    }
    ,
    v.prototype.addTouchEventHandlers = function() {
        this.$.on("dblclick", function(e) {
            var t = this.getMouseRelativeToGrapher(e)
              , i = this.getToleranceByDevice(e.device);
            this.getFeatureUnderPoint(t, i) && (e.preventDefault(),
            e.handle())
        }
        .bind(this)),
        this.$.on("touchstart", function(t) {
            if (this.graphSettings.config.lockViewport) {
                var i = this.getMouseRelativeToGrapher(t)
                  , a = this.getToleranceByDevice(t.device)
                  , r = this.getFeatureUnderPoint(i, a);
                r && ("image" !== r.type || r.model.selected || c.isActuallyDraggable(r.model)) && ("sketch-branch" === r.type && this.graphSettings.config.onlyTraceSelected && !r.sketch.selected || t.preventDefault())
            } else
                e(t.target).is(":not(input, textarea)") && t.preventDefault()
        }
        .bind(this)),
        this.$.on("dcg-tapstart", function(e) {
            var t = this.getMouseRelativeToGrapher(e)
              , i = this.getToleranceByDevice(e.device)
              , a = this.getFeatureUnderPoint(t, i);
            if (a && a.isClickable ? this.manager.clickableObjectsLayer.setPressedObject({
                id: a.model.id,
                listIndex: p(a)
            }) : this.manager.clickableObjectsLayer.setPressedObject(void 0),
            a && "editable-label" === a.type)
                e.handle();
            else {
                if (r(),
                a && "draggable-label" === a.type)
                    return this.startMovingPoint({
                        type: "draggable-label",
                        label: a.label,
                        startScreenPt: t
                    }),
                    void e.handle();
                if (a && "clickable-label" === a.type && e.handle(),
                a && "image" === a.type && c.isActuallyDraggable(a.model)) {
                    var n = !1;
                    if (a.isClickable && (n = !0),
                    this.startMovingPoint({
                        type: "image",
                        image: a.model,
                        startScreenPt: t,
                        shouldDelayUntilRealMove: n
                    }),
                    !n)
                        return void e.handle()
                }
                if (a && "movable-point" === a.type)
                    return this.startMovingPoint({
                        type: "poi",
                        poi: a.poi,
                        startScreenPt: t
                    }),
                    e.handle(),
                    void e.handle("do-not-clear-poi-labels");
                if (this._togglePOIUnderPoint(t, i))
                    return e.handle(),
                    void e.handle("do-not-clear-poi-labels");
                if (a && "sketch-branch" === a.type && !a.isClickable) {
                    if (!this.graphSettings.config.onlyTraceSelected) {
                        var o = !this.controller.isTraceEnabled()
                          , s = !this.controller.isListEnabled();
                        if (o && s)
                            return;
                        if (this.selectItemIfNotSecret(a.sketch.id),
                        o)
                            return;
                        return this.startTracingBranch(a.branchInfo, t),
                        e.handle(),
                        void e.handle("do-not-clear-poi-labels")
                    }
                    if (a.sketch.selected)
                        return this.startTracingBranch(a.branchInfo, t),
                        e.handle(),
                        void e.handle("do-not-clear-poi-labels")
                }
                a && "image" === a.type || this.controller.dispatch({
                    type: "set-none-selected"
                });
                var l = this;
                this.addGlobalMouseListener("dcg-tapmove", function(e) {
                    this.manager.clickableObjectsLayer.isAnObjectPressed() ? t = this.getMouseRelativeToGrapher(e) : l.removeAllGlobalMouseListeners()
                }
                .bind(this)),
                this.addGlobalMouseListener("dcg-tapend dcg-tapcancel", function(e) {
                    l.removeAllGlobalMouseListeners();
                    var a = this.manager.clickableObjectsLayer.getPressedObject()
                      , r = a && a.id;
                    this.manager.clickableObjectsLayer.setPressedObject(void 0);
                    var n = this.getFeatureUnderPoint(t, i);
                    n && n.isClickable ? n.model.id !== r || e.wasHandled("dragged-clickable-object") || this.controller.dispatch({
                        type: "clickable-item-clicked",
                        id: n.model.id,
                        listIndex: p(n)
                    }) : !n || "sketch-branch" !== n.type || n.sketch.selected ? n && "image" === n.type && this.selectItemIfNotSecret(n.model.id) : this.selectItemIfNotSecret(n.model.id)
                }
                .bind(this))
            }
        }
        .bind(this))
    }
    ,
    v.prototype.addKeydownEventHandler = function() {
        this.$.on("keydown", function(e) {
            var t = this.manager.movablePointsLayer.getFocusedPoint();
            if (t) {
                var i = n.lookup(e)
                  , a = n.lookupChar(e);
                "Up" === i || "Down" === i || "Left" === i || "Right" === i ? (e.stopPropagation(),
                e.preventDefault(),
                this.movePointFromKeyboard(t, e)) : "X" !== a && "Y" !== a && "L" !== a && "C" !== a || this.speakPoint(t, a)
            }
        }
        .bind(this))
    }
    ,
    v.prototype.getMouseRelativeToGrapher = function(e) {
        var t = this.$[0].getBoundingClientRect()
          , i = e.touches ? e.touches[0] : e;
        return {
            x: i.clientX - t.left,
            y: i.clientY - t.top
        }
    }
    ,
    v.prototype._getClosestPoint = function(e, i, a) {
        for (var r = a, n = null, o = this.manager.getProjection(), s = 0; s < e.length; s++) {
            var l = e[s]
              , c = o.map_pt(l)
              , h = t.hypot(c.x - i.x, c.y - i.y);
            h < r && (r = h,
            n = l)
        }
        return n
    }
    ,
    v.prototype.getFeatureUnderPoint = function(e, t) {
        var i = this.manager.poiLabelsLayer
          , a = this.manager.getProjection()
          , r = a.reverse_map_pt(e);
        if (!this.manager.scaleAxis) {
            var n = i.getInteractiveLabelUnderPoint(e);
            if (n) {
                if ("editable" === n.type)
                    return {
                        type: "editable-label",
                        model: n.model
                    };
                if ("draggable" === n.type)
                    return {
                        type: "draggable-label",
                        label: n.label
                    };
                if ("clickable" === n.type)
                    return {
                        type: "clickable-label",
                        model: n.model,
                        poi: n.poi,
                        isClickable: !0
                    }
            }
            for (var o, s = this.manager.__sketchOrder, l = {}, d = 1, p = s.length - 1; p >= 0; p--) {
                var g = s[p]
                  , m = this.controller.getItemModel(g)
                  , u = d;
                if (l[g] = u,
                m)
                    if ("expression" === m.type) {
                        var b = this.manager.getGraphSketch(g);
                        if (!b || !b.visible)
                            continue;
                        var f = b.branches;
                        if (!f || !f.length)
                            continue;
                        if (b.showHighlight && (u = -1 / 0,
                        l[g] = u),
                        !o || o.stackingContext >= u)
                            for (var y = h.isClickableObject(m), P = 0; P < f.length; P++) {
                                var k = v.calculateDistanceFromBranch(f[P], r, a, y);
                                if (k < t) {
                                    var L = !1;
                                    o ? (u < o.stackingContext || u === o.stackingContext && k < o.distance) && (L = !0) : L = !0,
                                    L && (o = {
                                        type: "sketch-branch",
                                        model: m,
                                        sketch: b,
                                        distance: k,
                                        stackingContext: u,
                                        branchInfo: {
                                            id: b.id,
                                            branch: P,
                                            sketch: b
                                        }
                                    })
                                }
                            }
                    } else if ("image" === m.type) {
                        var I = this.manager.getGraphImage(g);
                        if (!I)
                            continue;
                        var M = this.getImageInfoUnderMouse(I, r, t);
                        if (!M)
                            continue;
                        I.foreground ? (u = d += 1,
                        l[g] = u,
                        d += 1) : (u = 1 / 0,
                        l[g] = u),
                        (!o || o.stackingContext > u) && (o = {
                            type: "image",
                            model: I,
                            distance: 0,
                            stackingContext: u,
                            listIndex: M.listIndex
                        })
                    }
            }
            var x = []
              , _ = []
              , C = []
              , O = o ? o.stackingContext : 1 / 0;
            this.manager.poiDotsLayer.getDrawnPOI().forEach(function(e) {
                e.isBareLabel() || (e.isMovable() ? x.push(e) : e.isAttachedToPlottedPoint() ? l[e.sketch.id] <= O && _.push(e) : C.push(e))
            });
            var T = this._getClosestPoint(x, e, t);
            if (T)
                return {
                    type: "movable-point",
                    poi: T
                };
            var w = this._getClosestPoint(C, e, t);
            if (w)
                return {
                    type: "poi",
                    poi: w
                };
            var D = this._getClosestPoint(_, e, t);
            if (D) {
                var j = this.controller.getItemModel(D.sketch.id);
                if (j && "expression" === j.type)
                    if (h.isClickableObject(j))
                        return {
                            type: "poi",
                            poi: D,
                            isClickable: !0,
                            model: j
                        };
                return {
                    type: "poi",
                    poi: D
                }
            }
            return o ? "sketch-branch" === o.type ? {
                type: "sketch-branch",
                branchInfo: o.branchInfo,
                sketch: o.sketch,
                model: o.model,
                isClickable: h.isClickableObject(o.model)
            } : {
                type: "image",
                model: o.model,
                isClickable: c.isClickableObject(o.model),
                listIndex: o.listIndex
            } : void 0
        }
    }
    ,
    v.prototype._togglePOIUnderPoint = function(e, t) {
        if (this.controller.isTraceEnabled()) {
            var i = this.getFeatureUnderPoint(e, t);
            if (!i)
                return !1;
            if (i.isClickable)
                return !1;
            var a = i.poi;
            return !!a && (!a.isBareLabel() && (this.manager.poiLabelsLayer.isOpenPOI(a) ? (this.manager.poiLabelsLayer.closePOI(a),
            this.manager.poiLabelsLayer.setHoveredPOI(void 0)) : (this.manager.poiLabelsLayer.openPOI(a),
            this.speakPoint(a)),
            this.manager.redrawAllLayers(),
            !0))
        }
    }
    ,
    v.prototype.getImageInfoUnderMouse = function(e, t, i) {
        if (e) {
            var a = e.formula;
            if (a) {
                var r = a.dimensions;
                if (r.x && r.y && r.width && r.height && e.shouldGraph)
                    for (var n = r.x.length - 1; n >= 0; n--) {
                        var o = r.x[n]
                          , s = r.y[n]
                          , l = r.radianAngle[n]
                          , c = o + Math.cos(l) * (t.x - o) - Math.sin(l) * (t.y - s)
                          , h = s + Math.sin(l) * (t.x - o) + Math.cos(l) * (t.y - s)
                          , d = .5 * Math.abs(r.width[n])
                          , p = .5 * Math.abs(r.height[n]);
                        if (c > o - d && c < o + d && h > s - p && h < s + p)
                            return {
                                listIndex: n
                            }
                    }
            }
        }
    }
    ,
    v.calculateDistanceFromBranch = function(e, t, i, r) {
        if (e && e.graphMode === a.POLYGONFILL && r) {
            for (var n = e.segments, o = 0; o < n.length; o++)
                if (d.pointIsWithinNonZeroFill(n[o], t))
                    return 0;
            return 1 / 0
        }
        var s = v.getBranchesDistanceInfo(e, t, i, r);
        return s ? s.minDistance : 1 / 0
    }
    ,
    v.getBranchesDistanceInfo = function(e, i, r, n) {
        var o = r.screen.width / (r.viewport.xmax - r.viewport.xmin)
          , s = r.screen.height / (r.viewport.ymax - r.viewport.ymin)
          , l = i.x
          , c = i.y
          , h = !1
          , d = !1;
        switch (e.graphMode) {
        case a.PARAMETRIC:
        case a.IMPLICIT:
            if (!n)
                return null;
            break;
        case a.POLAR:
            if (!n)
                return null;
            d = !0;
            break;
        case a.Y:
            break;
        case a.X:
            h = !0;
            var p = l;
            l = c,
            c = p,
            p = o,
            o = s,
            s = p;
            break;
        default:
            return null
        }
        for (var g, v, m = 1 / 0, u = 1 / 0, b = 0; b < e.segments.length; b++)
            for (var f = e.segments[b], y = 0; y < f.length - 3; y += 2) {
                var P = f[y]
                  , k = f[y + 1]
                  , L = f[y + 2]
                  , I = f[y + 3];
                if (d) {
                    var M = k
                      , x = P;
                    P = M * Math.cos(x),
                    k = M * Math.sin(x);
                    var _ = I
                      , C = L;
                    L = _ * Math.cos(C),
                    I = _ * Math.sin(C)
                }
                var O = t.closestPointOnSegment(0, 0, (P - l) * o, (k - c) * s, (L - l) * o, (I - c) * s)
                  , T = t.hypot(O[0], O[1]);
                O[0] < 0 ? T < m && (m = T,
                g = O) : T < u && (u = T,
                v = O)
            }
        var w = m < u ? g : v;
        if (!w)
            return null;
        var D = w[0] / o + l
          , j = w[1] / s + c;
        return {
            closestPoint: {
                x: h ? j : D,
                y: h ? D : j
            },
            minDistance: Math.min(m, u),
            secondDistance: Math.max(m, u)
        }
    }
    ,
    v.getBranchesTracePoint = function(e, t, r) {
        if (e && e.compiled && e.compiled.fn) {
            var n = e.compiled.fn
              , o = r.screen.width / (r.viewport.xmax - r.viewport.xmin)
              , s = r.screen.height / (r.viewport.ymax - r.viewport.ymin)
              , l = this.getBranchesDistanceInfo(e, t, r, !1);
            if (!l)
                return null;
            var c = l.minDistance / l.secondDistance;
            c *= c;
            var h = e.graphMode === a.Y ? "x" : "y"
              , d = l.closestPoint[h] * (1 - c) + t[h] * c
              , p = 1 / (2 * o)
              , g = 1 / (2 * s)
              , m = n(d - p)
              , u = n(d)
              , b = n(d + p)
              , f = p * Math.min(1, g / Math.abs(m - u))
              , y = p * Math.min(1, g / Math.abs(b - u));
            isFinite(f) || (f = p),
            isFinite(y) || (y = p),
            d = i.shortestDecimalBetween(d - f, d + y);
            var P = v.fillHole(n, d, o, s, t.x, t.y);
            return {
                x: e.graphMode === a.Y ? d : P,
                y: e.graphMode === a.Y ? P : d
            }
        }
    }
    ,
    v.prototype.startMovingPoint = function(e) {
        var t = !1
          , i = !1;
        function a() {
            return "poi" === e.type ? e.poi.getMovablePoint() : "image" === e.type ? {
                sketch: {
                    id: e.image.formula.center_reference_id
                }
            } : "draggable-label" === e.type ? {
                sketch: {
                    id: e.label.model.id
                }
            } : void 0
        }
        var r, n = a(), o = this.controller;
        function s() {
            i = !0,
            o.dispatch({
                type: "start-moving-point",
                pointInfo: n
            })
        }
        e.shouldDelayUntilRealMove || s(),
        "poi" === e.type ? r = e.poi : "image" === e.type ? r = {
            x: e.image.formula.dimensions.x[0],
            y: e.image.formula.dimensions.y[0]
        } : "draggable-label" === e.type && (r = {
            x: e.label.x,
            y: e.label.y
        });
        var l = this.manager.getProjection().map_pt(r)
          , c = e.startScreenPt.x - l.x
          , h = e.startScreenPt.y - l.y
          , d = e.poi;
        "poi" === e.type && this.manager.movablePointsLayer.setPressedPointId(d.isMovable() ? d.getMovablePoint().id : void 0);
        var p = null
          , g = function() {
            if (p) {
                i || s(),
                t = !0;
                var e = this.manager.getProjection()
                  , r = this.getMouseRelativeToGrapher(p);
                p = null,
                this.controller.dispatch({
                    type: "on-move-point",
                    pointInfo: a(),
                    screenPt: {
                        x: r.x - c,
                        y: r.y - h
                    },
                    projection: e
                })
            }
        }
        .bind(this);
        this.manager.registerMovablePointListener(g),
        this.addGlobalMouseListener("dcg-tapmove", function(e) {
            p = e
        }),
        this.addGlobalMouseListener("dcg-tapend dcg-tapcancel", function(r) {
            if (g(),
            this.manager.deregisterMovablePointListener(),
            this.removeAllGlobalMouseListeners(),
            this.manager.movablePointsLayer.setPressedPointId(void 0),
            i && (r.handle("dragged-clickable-object"),
            this.controller.dispatch({
                type: "stop-moving-point",
                pointInfo: a()
            })),
            "poi" === e.type && !t) {
                var n = this.manager.getProjection()
                  , o = this.getToleranceByDevice(r.device)
                  , s = n.map_pt(d);
                this._togglePOIUnderPoint(s, o)
            }
        }
        .bind(this))
    }
    ,
    v.prototype.startTracingBranch = function(e, t) {
        this.manager.markLabelsDirty(),
        this.last_screen_pt = t;
        var i = this.manager.getProjection()
          , a = i.reverse_map_pt(t)
          , r = e.sketch.branches[e.branch]
          , n = v.getBranchesTracePoint(r, a, i);
        n && this.speakPoint(n),
        this.manager.traceLayer.setTraceInfo({
            pt: n,
            branchInfo: e
        }),
        this.manager.redrawAllLayers(),
        this.addGlobalMouseListener("dcg-tapmove", this.handleTraceUpdate.bind(this)),
        this.addGlobalMouseListener("dcg-tapend dcg-tapcancel", this.stopTracingBranch.bind(this))
    }
    ,
    v.prototype.stopTracingBranch = function(e) {
        this.manager.markLabelsDirty();
        var t = this.manager.poiLabelsLayer.getHoveredPOI();
        t && !this.manager.poiLabelsLayer.isOpenPOI(t) && (this.manager.poiLabelsLayer.openPOI(t),
        this.speakPoint(t),
        this.manager.redrawAllLayers()),
        this.last_screen_pt = null,
        this.manager.traceLayer.setTraceInfo(void 0),
        this.manager.redrawAllLayers(),
        this.removeAllGlobalMouseListeners()
    }
    ,
    v.prototype.handleTraceUpdate = function(e) {
        if (this.manager.traceLayer.traceInfo) {
            var t, i = this.manager.getProjection();
            if (e)
                t = this.getMouseRelativeToGrapher(e),
                this.last_screen_pt = t,
                this.manager.markLabelsDirty();
            else {
                if (!this.last_screen_pt)
                    return;
                t = this.last_screen_pt
            }
            var a = i.reverse_map_pt(t)
              , r = 1 / 0
              , n = -1
              , o = this.manager.traceLayer.traceInfo
              , s = this.manager.graphSketches[o.branchInfo.sketch.id];
            if (s) {
                o.branchInfo.sketch = s;
                for (var l = o.branchInfo.sketch.branches, c = 0; c < l.length; c++) {
                    var h = v.calculateDistanceFromBranch(l[c], a, i, !1);
                    h < r && (n = c,
                    r = h)
                }
                var d = l[n]
                  , p = d ? v.getBranchesTracePoint(d, a, i) : null;
                p && this.speakPoint(p),
                this.manager.traceLayer.traceInfo.branchInfo.branch = n,
                this.manager.traceLayer.traceInfo.pt = p,
                this.manager.redrawAllLayers()
            }
        }
    }
    ,
    v.prototype.speakPoint = function(e) {
        var t = this.manager.getAudioTrace();
        t && e && t.queueCoordinates(e, void 0, !0)
    }
    ,
    v.fillHole = function(e, i, a, r, n, o) {
        var s = e(i);
        if (isFinite(s))
            return s;
        var l = i - 1e-11
          , c = i + 1e-11
          , h = e(l)
          , d = e(c);
        if (isNaN(h) && isNaN(d))
            return NaN;
        if (isNaN(h))
            return d;
        if (isNaN(d))
            return h;
        var p = (n - l) * a
          , g = (n - c) * a
          , v = (o - h) * r
          , m = (o - d) * r;
        return t.hypot(p, v) < t.hypot(g, m) ? h : d
    }
    ,
    v.prototype.hasNonlinearMoveStrategy = function(e) {
        if (!e || !e.sketch)
            return !1;
        var t = this.getExpressionModel(e.sketch.id);
        if (!t || !t.formula)
            return !1;
        var i = t.formula.move_strategy;
        return !(!i || !i[0]) && "updateSliderNonlinear" === i[0].type
    }
    ,
    v.prototype.movePointFromKeyboard = function(e, t) {
        if (e && t && "movable-point" === e.type) {
            var i, a = this.manager.getProjection(), r = a.map_pt({
                x: e.x,
                y: e.y
            }), o = 0, s = 0, l = t.shiftKey ? 10 : 2, c = t.shiftKey ? "big" : "", h = n.lookup(t);
            if ("Up" === h ? (i = "y",
            s -= l,
            c += "up") : "Down" === h ? (i = "y",
            s += l,
            c += "down") : "Left" === h ? (i = "x",
            o -= l,
            c += "down") : "Right" === h && (i = "x",
            o += l,
            c += "up"),
            0 !== o || 0 !== s) {
                var d, p = {
                    x: r.x + o,
                    y: r.y + s
                };
                "x" === i || this.hasNonlinearMoveStrategy(e) ? d = {
                    x: c
                } : "y" === i && (d = {
                    y: c
                }),
                this.controller.dispatch({
                    type: "on-move-point",
                    pointInfo: e,
                    screenPt: p,
                    projection: a,
                    keyboardDirection: d
                })
            }
        }
    }
    ,
    v.prototype.speakPoint = function(e, t) {
        if (e && this.manager.getAudioTrace()) {
            var i = this.manager.getProjection();
            if (i) {
                var a = i.viewport;
                switch (t) {
                case "X":
                    o.alert("X: " + s.value(e.x, a.xmax - a.xmin).ariaString);
                    break;
                case "Y":
                    o.alert("Y: " + s.value(e.y, a.ymax - a.ymin).ariaString);
                    break;
                case "L":
                    o.alert(e.ariaLabel || this.controller.s("graphing-calculator-narration-poi-graph-point"));
                    break;
                case "C":
                    o.alert(l(this.controller, e.sketch.color))
                }
            }
        }
    }
    ,
    v.prototype.selectItemIfNotSecret = function(e) {
        this.controller.isItemSecret(e) || this.controller.dispatch({
            type: "set-selected-id",
            id: e
        })
    }
    ,
    v
});
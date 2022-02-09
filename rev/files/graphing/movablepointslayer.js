define('graphing/movablepointslayer', ["require", "exports", "tslib", "dcgview", "browser", "graphing-calc/models/expression", "core/lib/label", "core/graphing-calc/json/expression", "core/types/graphmode", "lib/aria", "./constants", "jquery", "underscore"], function(require, e, t, r, o, i, n, a, s, c, p, d, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getCoordsString = void 0;
    var h = r.Components.For;
    function u(e, t) {
        var r = e[t];
        return Array.isArray(r) && e.tableInfo ? r[e.tableInfo.rowIndex] : r
    }
    var g = function(e) {
        function n() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(n, e),
        n.prototype.init = function() {
            this.grapher = this.props.grapher(),
            this.renderedPointsIdOrder = [],
            this.renderedPoints = {}
        }
        ,
        n.prototype.template = function() {
            var e = this;
            return r.createElement(h, {
                each: function() {
                    return e.renderedPointsIdOrder
                }
            }, r.createElement("div", {
                class: r.const("dcg-graph-outer"),
                style: this.const({
                    "z-index": 0
                }),
                onFocusin: function() {
                    return e.requestRedrawNextFrame()
                },
                onFocusout: function() {
                    return e.requestRedrawNextFrame()
                },
                didMount: this.didMountRoot.bind(this)
            }, function(t) {
                return r.createElement("div", {
                    class: e.const({
                        "dcg-tabbable-point": !0,
                        "dcg-movable-point": "movable" === e.renderedPoints[t].type
                    }),
                    style: function() {
                        return {
                            transform: e.getTransform(t)
                        }
                    },
                    role: r.const("button"),
                    "aria-roledescription": function() {
                        return "movable" === e.renderedPoints[t].type ? e.grapher.controller.s("graphing-calculator-narration-movable-point-description") : e.grapher.controller.s("graphing-calculator-narration-point-description")
                    },
                    "dcg-mp-id": e.const(t),
                    tabindex: function() {
                        return e.getTabIndex(t)
                    },
                    "aria-label": function() {
                        return e.getAriaLabel(t)
                    },
                    "aria-hidden": e.bindFn(e.getAriaHidden)
                })
            }))
        }
        ,
        n.prototype.redraw = function(e, t, r) {
            var o = this
              , i = this.grapher.graphSketches
              , n = this.renderedPoints;
            this.renderedPoints = {},
            this.renderedPointsIdOrder = [];
            var a = this.getFocusedPointId()
              , s = function(i) {
                var s = o.processPOI(e, t, i, n[i.id], r, a);
                s && (o.renderedPoints[i.id] = s,
                o.renderedPointsIdOrder.push(i.id))
            };
            this.grapher.getSketchOrder().forEach(function(e) {
                var t = i[e];
                t && t.visible && (t.getMovablePoints().forEach(s),
                t.getStaticLabeledPoints().forEach(s))
            });
            var c = this.renderedPoints[this.hoveredPointId]
              , p = this.renderedPoints[this.pressedPointId]
              , d = c && c.poi
              , l = p && p.poi;
            d || this.setHoveredPointId(void 0),
            l || this.setPressedPointId(void 0);
            var h, u, g = l || d;
            g ? (h = "movable-point" === g.type && g.tableInfo && g.tableInfo.dragX,
            u = "movable-point" === g.type && g.tableInfo && g.tableInfo.dragY,
            h && u || !h && !u ? this.grapher.setLayerClass("movablePoints", "dcg-mouse-over-movable-point") : h ? this.grapher.setLayerClass("movablePoints", "dcg-mouse-over-movable-point-ew") : this.grapher.setLayerClass("movablePoints", "dcg-mouse-over-movable-point-ns")) : this.grapher.setLayerClass("movablePoints", void 0),
            this.update(),
            this.speakAriaAlert()
        }
        ,
        n.prototype._clampedOpacity = function(e) {
            return e < 0 ? 0 : e > 1 ? 1 : l.isFinite(e) ? e : 1
        }
        ,
        n.prototype.drawForScreenshot = function(e, t, r, o) {
            var i = this
              , n = this.grapher.graphSketches;
            for (var a in n) {
                var c = n[a];
                if (c.visible) {
                    var p, d = c.branches[0];
                    d.graphMode === s.XYPOINT_MOVABLE && (p = d.pointOpacity),
                    c.getMovablePoints().forEach(function(n) {
                        var a = {
                            screenX: t.mapx(n.x),
                            screenY: t.mapy(n.y),
                            color: n.color,
                            pointOpacity: p,
                            animationPercent: 0
                        };
                        i.drawMovablePointOnCtx(e, a, r, o)
                    })
                }
            }
        }
        ,
        n.prototype.processPOI = function(e, t, r, o, i, n) {
            var a = r.id
              , s = r.x
              , c = r.y
              , d = t.mapx(s)
              , l = t.mapy(c)
              , h = n === a
              , g = t.coordsAreOnscreen(d, l, p.OFFSCREEN_RENDER_MARGIN);
            if (g || h)
                return o || (o = "movable-point" === r.type ? {
                    type: "movable",
                    id: a,
                    pointOnScreen: g,
                    poi: r,
                    projection: t,
                    screenX: screenX,
                    screenY: screenY,
                    color: u(r, "color"),
                    pointOpacity: u(r, "pointOpacity"),
                    pointIsHovered: !1,
                    pointIsPressed: !1,
                    lastHoverActionTime: 0,
                    animationPercent: 0
                } : {
                    type: "static",
                    id: a,
                    pointOnScreen: g,
                    poi: r,
                    projection: t,
                    screenX: screenX,
                    screenY: screenY
                }),
                o.pointOnScreen = g,
                o.poi = r,
                o.projection = t,
                o.screenX = d,
                o.screenY = l,
                "movable" === o.type && (o.color = u(o.poi, "color"),
                o.pointOpacity = u(o.poi, "pointOpacity"),
                this.updateMovablePointAnimation(o),
                this.drawMovablePointOnCtx(e, o, i)),
                o
        }
        ,
        n.prototype.drawMovablePointOnCtx = function(e, t, r, o) {
            var i;
            i = o || (this.grapher.settings.config.projectorMode ? 13.5 : 10.5);
            var n = Array.isArray(t.color) ? t.color[0] : t.color
              , a = t.screenX
              , s = t.screenY
              , c = t.animationPercent || 0;
            r.push({
                left: a - i,
                right: a + i,
                top: s - i,
                bottom: s + i
            }),
            e.save();
            var p = e.globalAlpha
              , d = this._clampedOpacity(t.pointOpacity);
            e.fillStyle = n,
            e.globalAlpha = .35 * d,
            e.beginPath(),
            e.moveTo(a + i, s),
            e.arc(a, s, i, 0, 2 * Math.PI, !0),
            e.closePath(),
            e.fill(),
            e.globalAlpha = d,
            i *= .3 + .7 * c,
            e.beginPath(),
            e.moveTo(a + i, s),
            e.arc(a, s, i, 0, 2 * Math.PI, !0),
            e.closePath(),
            e.fill(),
            e.globalAlpha = p,
            e.restore()
        }
        ,
        n.prototype.updateMovablePointAnimation = function(e) {
            var t = Date.now()
              , r = e.id
              , o = this.hoveredPointId === r
              , i = this.pressedPointId === r;
            e.pointIsPressed = i,
            o !== e.pointIsHovered && (e.pointIsHovered = o,
            e.lastHoverActionTime = t);
            var n = e.animationPercent || 0
              , a = .004 * (t - e.lastHoverActionTime);
            i ? n = 1 : o ? (n += a) >= 1 ? n = 1 : this.requestRedrawNextFrame() : (n -= a) <= 0 ? n = 0 : this.requestRedrawNextFrame(),
            e.animationPercent = n
        }
        ,
        n.prototype.getTransform = function(e) {
            var t = this.renderedPoints[e];
            if (t)
                return o.translateRule(t.screenX, t.screenY)
        }
        ,
        n.prototype.getTabIndex = function(e) {
            var t = this.renderedPoints[e];
            if (!t)
                return -1;
            var r = t.poi
              , o = this.grapher.controller.getItemEditableLabelMode(r.sketch.id)
              , n = this.grapher.controller.getItemModel(r.sketch.id)
              , s = n && "expression" === n.type && !i.isClickableObject(n) && ("movable" === t.type || void 0 === o || o === a.EditableLabelMode.None)
              , c = this.grapher.settings
              , p = c.config.graphpaper && c.config.enableTabindex;
            return s && p ? 0 : -1
        }
        ,
        n.prototype.getAriaHidden = function() {
            return !this.grapher.settings.config.graphpaper
        }
        ,
        n.prototype.getAriaLabel = function(e) {
            var t = this.getAriaAlert({
                id: e,
                includeUsageInstructions: !1
            });
            return t && t.completeMessage
        }
        ,
        n.prototype.speakAriaAlert = function() {
            var e = this.getFocusedPointId();
            if (e) {
                var t = this.renderedPoints[e];
                if (!t || "static" === t.type)
                    return
            }
            var r = this.getAriaAlert({
                id: e,
                lastAriaAlert: this.lastAriaAlert,
                includeUsageInstructions: !0
            });
            this.lastAriaAlert = r,
            r && r.completeMessage && c.alert(r.completeMessage)
        }
        ,
        n.prototype.getAriaAlert = function(e) {
            var t = e.id
              , r = e.lastAriaAlert
              , o = e.includeUsageInstructions;
            if (t) {
                var i = this.renderedPoints[t];
                if (i) {
                    r && r.id !== t && (r = void 0);
                    var n = i.poi
                      , a = i.pointOnScreen
                      , s = i.projection;
                    if (n && s) {
                        var c = s.viewport;
                        if (c) {
                            var p = r && r.label
                              , d = n.ariaLabel
                              , l = p !== d
                              , h = r && r.coordX
                              , u = r && r.coordY
                              , g = n.x
                              , f = n.y
                              , m = g !== h || f !== u
                              , b = v(g, f, c) + "."
                              , P = this.grapher.controller
                              , y = d || P.s("graphing-calculator-narration-movable-point-prefix")
                              , I = "movable-point" === n.type && o ? P.s("graphing-calculator-narration-movable-point-suffix-usage-instructions") : ""
                              , A = a ? "" : P.s("graphing-calculator-narration-movable-point-off-screen-prompt");
                            return {
                                id: t,
                                coordX: g,
                                coordY: f,
                                label: d,
                                completeMessage: r ? l ? y + A : m ? b + A : "" : y + ". " + b + I + A
                            }
                        }
                    }
                }
            }
        }
        ,
        n.prototype.setHoveredPointId = function(e) {
            e !== this.hoveredPointId && (this.hoveredPointId = e,
            this.requestRedrawNextFrame())
        }
        ,
        n.prototype.isMovingPoint = function() {
            return !!this.pressedPointId
        }
        ,
        n.prototype.setPressedPointId = function(e) {
            e !== this.pressedPointId && (this.pressedPointId = e,
            this.requestRedrawNextFrame())
        }
        ,
        n.prototype.getFocusedPointId = function() {
            if (document.activeElement && d.contains(this.rootNode, document.activeElement))
                return d(document.activeElement).attr("dcg-mp-id")
        }
        ,
        n.prototype.getFocusedPoint = function() {
            var e = this.getFocusedPointId();
            if (e) {
                var t = this.renderedPoints[e];
                if (t)
                    return t.poi
            }
        }
        ,
        n.prototype.didMountRoot = function(e) {
            this.rootNode = e
        }
        ,
        n.prototype.requestRedrawNextFrame = function() {
            this.grapher.redrawAllLayers()
        }
        ,
        n
    }(r.Class);
    function v(e, t, r) {
        return "X: " + n.value(e, r.xmax - r.xmin).ariaString + ". Y: " + n.value(t, r.ymax - r.ymin).ariaString
    }
    e.default = g,
    e.getCoordsString = v
});
define('graphing/imagelayer', ["require", "exports", "tslib", "jquery", "dcgview", "underscore", "./draw-image-to-ctx", "./svg-groups", "graphing-calc/models/image", "core/lib/label", "keys", "lib/aria", "./movablepointslayer"], function(require, e, t, r, i, a, n, o, s, d, l, c, g) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var h = i.Components.For
      , p = function(e) {
        function p() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(p, e),
        p.prototype.init = function() {
            this.grapher = this.props.grapher(),
            this.controller = this.grapher.controller,
            this.renderedTabTargetOrder = [],
            this.renderedTabTargets = {}
        }
        ,
        p.prototype.template = function() {
            var e = this;
            return i.createElement(h, {
                each: function() {
                    return e.renderedTabTargetOrder
                }
            }, i.createElement("div", {
                class: i.const("dcg-graph-outer"),
                style: this.const({
                    "z-index": 0
                }),
                onFocusin: this.bindFn(this.handleFocusChange),
                onFocusout: this.bindFn(this.handleFocusChange),
                onKeydown: this.bindFn(this.handleKeydown),
                didMount: function(t) {
                    return e.rootNode = t
                }
            }, function(t) {
                return i.createElement("div", {
                    class: i.const("dcg-tabbable-draggableimage"),
                    style: function() {
                        return e.getStyle(t)
                    },
                    role: i.const("button"),
                    "aria-roledescription": function() {
                        return e.controller.s("graphing-calculator-narration-draggable-image-description")
                    },
                    "dcg-draggableimage-id": e.const(t),
                    tabindex: function() {
                        return e.getTabIndex()
                    },
                    "aria-hidden": e.bindFn(e.getAriaHidden),
                    "aria-label": function() {
                        return e.getAriaLabel(t)
                    }
                })
            }))
        }
        ,
        p.prototype.redrawToCtx = function(e, t, r, i) {
            this.renderedTabTargets = {},
            this.renderedTabTargetOrder = [],
            o.save(e, "background-images"),
            (void 0 === i || i.length < a.size(r)) && (i = a.keys(r));
            for (var d = 0, l = i; d < l.length; d++) {
                var c = l[d]
                  , g = r[c];
                g && g.shouldGraph && !g.foreground && n.drawImageToCtx(g, e, t);
                var h = this.controller.getItemModel(c);
                if (h && "image" === h.type && !h.hidden && s.isActuallyDraggable(h)) {
                    var p = h.formula.dimensions;
                    if (!(p && p.x && p.y && p.width && p.height && p.radianAngle))
                        continue;
                    for (var u = 0; u < p.x.length; u++)
                        if (isFinite(p.x[u]) && isFinite(p.y[u]) && isFinite(p.width[u]) && isFinite(p.height[u]) && isFinite(p.radianAngle[u])) {
                            this.renderedTabTargetOrder.push(c),
                            this.renderedTabTargets[c] = {
                                id: c,
                                description: this.grapher.getAudioTrace().getExpressionAriaLabel(h.formula.center_reference_id || h.id),
                                x: p.x[u],
                                y: p.y[u],
                                radianAngle: p.radianAngle[u],
                                width: p.width[u],
                                height: p.height[u],
                                widthScale: Math.abs(t.mapx(1) - t.mapx(0)),
                                heightScale: Math.abs(t.mapy(1) - t.mapy(0)),
                                screenX: t.mapx(p.x[u]),
                                screenY: t.mapy(p.y[u]),
                                centerId: h.formula.center_reference_id
                            };
                            break
                        }
                }
            }
            o.restore(e),
            this.update(),
            this.speakAriaAlert()
        }
        ,
        p.prototype.getStyle = function(e) {
            var t = this.renderedTabTargets[e];
            if (t) {
                var r = t.screenX
                  , i = t.screenY
                  , a = t.radianAngle
                  , n = t.width
                  , o = t.height
                  , s = t.widthScale
                  , d = t.heightScale
                  , l = d / s
                  , c = n * s
                  , g = o * d / l;
                return {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transform: "translate(" + (r - c / 2) + "px, " + (i - g / 2) + "px)" + (1 === l ? "" : " scale(1," + l + ")") + (a ? " rotate(" + a + "rad)" : ""),
                    width: c + "px",
                    height: g + "px"
                }
            }
        }
        ,
        p.prototype.getTabIndex = function() {
            var e = this.grapher.settings;
            return e.config.graphpaper && e.config.enableTabindex ? 0 : -1
        }
        ,
        p.prototype.getAriaHidden = function() {
            return !this.grapher.settings.config.graphpaper
        }
        ,
        p.prototype.getAriaLabel = function(e) {
            var t = this.getAriaAlert({
                id: e,
                includeUsageInstructions: !1
            });
            return t && t.completeMessage
        }
        ,
        p.prototype.speakAriaAlert = function() {
            var e = this.focusedId;
            if (e && !this.renderedTabTargets[e])
                return;
            var t = this.getAriaAlert({
                id: e,
                lastAriaAlert: this.lastAriaAlert,
                includeUsageInstructions: !0
            });
            this.lastAriaAlert = t,
            t && t.completeMessage && c.alert(t.completeMessage)
        }
        ,
        p.prototype.getAriaAlert = function(e) {
            var t = e.id
              , r = e.lastAriaAlert
              , i = e.includeUsageInstructions;
            if (t) {
                var a = this.controller.getItemModel(t);
                if (a && "image" === a.type) {
                    var n = this.renderedTabTargets[t];
                    if (n) {
                        r && r.id !== t && (r = void 0);
                        var o = r && r.coordX
                          , s = r && r.coordY
                          , d = n.x
                          , l = n.y
                          , c = d !== o || l !== s
                          , h = this.grapher.getProjection()
                          , p = g.getCoordsString(d, l, h.viewport) + "."
                          , u = n.description
                          , f = i ? this.controller.s("graphing-calculator-narration-movable-point-suffix-usage-instructions") : ""
                          , m = this.isImageFullyVisible(a, h) ? "" : this.controller.s("graphing-calculator-narration-draggable-image-off-screen-prompt");
                        return {
                            id: t,
                            coordX: d,
                            coordY: l,
                            completeMessage: r ? c ? p + m : "" : u + ". " + p + f + m
                        }
                    }
                }
            }
        }
        ,
        p.prototype.handleFocusChange = function() {
            var e = void 0;
            document.activeElement && r.contains(this.rootNode, document.activeElement) && (e = r(document.activeElement).attr("dcg-draggableimage-id"));
            this.focusedId !== e && (this.focusedId = e,
            this.lastAriaAlert = void 0,
            this.requestRedrawNextFrame())
        }
        ,
        p.prototype.requestRedrawNextFrame = function() {
            this.grapher.redrawAllLayers()
        }
        ,
        p.prototype.handleKeydown = function(e) {
            if (this.focusedId) {
                var t = this.renderedTabTargets[this.focusedId];
                if (t) {
                    var r = l.lookup(e)
                      , i = l.lookupChar(e);
                    "Up" === r || "Down" === r || "Left" === r || "Right" === r ? (e.stopPropagation(),
                    e.preventDefault(),
                    this.moveImageFromKeyboard(t, e)) : "X" !== i && "Y" !== i && "L" !== i || this.speakImageAttribute(t, i)
                }
            }
        }
        ,
        p.prototype.moveImageFromKeyboard = function(e, t) {
            if (void 0 !== e && void 0 !== e.centerId) {
                var r, i = this.grapher.getProjection(), a = i.map_pt({
                    x: e.x,
                    y: e.y
                }), n = 0, o = 0, s = t.shiftKey ? 10 : 2, d = t.shiftKey ? "big" : "", c = l.lookup(t);
                if ("Up" === c ? (r = "y",
                o -= s,
                d += "up") : "Down" === c ? (r = "y",
                o += s,
                d += "down") : "Left" === c ? (r = "x",
                n -= s,
                d += "down") : "Right" === c && (r = "x",
                n += s,
                d += "up"),
                (0 !== n || 0 !== o) && "" !== d) {
                    var g = {
                        x: a.x + n,
                        y: a.y + o
                    }
                      , h = {};
                    "x" === r || this.hasNonlinearMoveStrategy(e.centerId) ? h = {
                        x: d
                    } : "y" === r && (h = {
                        y: d
                    }),
                    this.controller.dispatch({
                        type: "on-move-point",
                        pointInfo: {
                            sketch: {
                                id: e.centerId
                            }
                        },
                        screenPt: g,
                        projection: i,
                        keyboardDirection: h
                    })
                }
            }
        }
        ,
        p.prototype.speakImageAttribute = function(e, t) {
            if (e && this.grapher.getAudioTrace()) {
                var r = this.grapher.getProjection();
                if (r) {
                    var i = r.viewport;
                    switch (t) {
                    case "X":
                        c.alert("X: " + d.value(e.x, i.xmax - i.xmin).ariaString);
                        break;
                    case "Y":
                        c.alert("Y: " + d.value(e.y, i.ymax - i.ymin).ariaString);
                        break;
                    case "L":
                        c.alert(e.description)
                    }
                }
            }
        }
        ,
        p.prototype.hasNonlinearMoveStrategy = function(e) {
            if (!e)
                return !1;
            var t = this.controller.getItemModel(e);
            if (!t || "expression" !== t.type || !t.formula)
                return !1;
            var r = t.formula.move_strategy;
            return !(!r || !r[0]) && "updateSliderNonlinear" === r[0].type
        }
        ,
        p.prototype.isImageFullyVisible = function(e, t) {
            var r = e.formula.dimensions;
            if (!r || !r.x || !r.y)
                return !1;
            for (var i = 0; i < r.x.length; i++)
                if (!t.coordsAreOnscreen(t.mapx(r.x[i]), t.mapy(r.y[i])))
                    return !1;
            return !0
        }
        ,
        p
    }(i.Class);
    e.default = p
});
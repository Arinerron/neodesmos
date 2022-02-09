define('graphing/viewportcontroller', ['require', 'jquery', 'pjs', 'lib/aria', 'lib/i18n', 'core/math/recttransformation', './viewport', 'core/math/distance', './constants', './projection', 'keys', 'jquery.handleevent', 'vendor/jquery.mousewheel'], function(require) {
    "use strict";
    var t = require("jquery")
      , e = require("pjs")
      , i = require("lib/aria")
      , o = require("lib/i18n")
      , r = require("core/math/recttransformation").RT
      , n = require("./viewport").Viewport
      , a = require("core/math/distance")
      , s = require("./constants")
      , h = require("./projection").Projection
      , c = require("keys");
    return require("jquery.handleevent"),
    require("vendor/jquery.mousewheel"),
    e(function(e) {
        var l = 0;
        function g(t, e) {
            var i = e.x - t.x
              , o = e.y - t.y
              , r = .5 * (t.x + e.x)
              , n = .5 * (t.y + e.y)
              , s = .5 * a.hypot(i, o);
            return {
                center: m(r, n),
                radius: s
            }
        }
        function u(t, e) {
            return g(e, {
                x: 2 * t.x - e.x,
                y: 2 * t.y - e.y
            })
        }
        function p(t, e) {
            for (var i = [], o = 0; o < t.length; o++)
                i.push(m(t[o].x - e.left, t[o].y - e.top));
            return i
        }
        function m(t, e) {
            return {
                x: t,
                y: e
            }
        }
        function f(t) {
            return m(.5 * (t.left + t.right), .5 * (t.bottom + t.top))
        }
        e.init = function(t, e) {
            this.grapher = t,
            this.$ = this.grapher.$,
            this.__id = l++,
            this.controller = e,
            this.isScalingEnabled = !1,
            this.mousePt = m(0, 0),
            this.lastScrollZoom = Date.now(),
            this.preventScrollZoom = !1,
            this.addMouseWheelEventHandler(),
            this.addTouchEventHandler()
        }
        ,
        e.remove = function() {
            t(window).off(".viewportcontroller-" + this.__id)
        }
        ,
        e.s = function(t, e) {
            return o.s(t, e, this.grapher.settings.language)
        }
        ,
        e.getViewport = function() {
            return this.grapher.getProjection().viewport
        }
        ,
        e.getProjection = function() {
            return this.grapher.getProjection()
        }
        ,
        e.updateMouse = function(t) {
            var e = this.$[0].getBoundingClientRect();
            this.mousePt = m(t.clientX - e.left, t.clientY - e.top)
        }
        ,
        e.updateScaleAxis = function() {
            this.isMouseInViewport() && (this.isMouseNearYAxis() ? this.grapher.scaleAxis = "y" : this.isMouseNearXAxis() ? this.grapher.scaleAxis = "x" : this.grapher.scaleAxis = "both"),
            this.updateCursor(),
            this.grapher.redrawAllLayers()
        }
        ,
        e.updateCursor = function() {
            this.$.toggleClass("dcg-scale-horizontal", "x" === this.grapher.scaleAxis),
            this.$.toggleClass("dcg-scale-vertical", "y" === this.grapher.scaleAxis),
            this.$.toggleClass("dcg-scale-both", "both" === this.grapher.scaleAxis)
        }
        ,
        e.isMouseNearOrigin = function() {
            var t = this.getProjection().mathToPixels.mapPoint(m(0, 0));
            return Math.abs(this.mousePt.x - t.x) < 50 && Math.abs(this.mousePt.y - t.y) < 50
        }
        ,
        e.isMouseNearXAxis = function() {
            var t = this.getProjection()
              , e = t.pixelCoordinates
              , i = t.mathToPixels.mapY(0);
            return i = Math.min(Math.max(e.top, i), e.bottom),
            Math.abs(this.mousePt.y - i) < 40 && t.settings.showXAxis
        }
        ,
        e.isMouseNearYAxis = function() {
            var t = this.getProjection()
              , e = t.pixelCoordinates
              , i = t.mathToPixels.mapX(0);
            return i = Math.min(Math.max(e.left, i), e.right),
            Math.abs(this.mousePt.x - i) < 40 && t.settings.showYAxis
        }
        ,
        e.isMouseInViewport = function() {
            var t = this.getProjection()
              , e = t.mathCoordinates
              , i = t.pixelsToMath.mapPoint(this.mousePt);
            return i.x >= e.left && i.x <= e.right && i.y >= e.bottom && i.y <= e.top
        }
        ,
        e.getDefaultViewport = function() {
            return this.controller.getDefaultStateViewport() || this.grapher.getDefaultViewport()
        }
        ,
        e._setViewportWithoutCancellingAnimation = function(t) {
            if (t.isValid() && !t.equals(this.getViewport())) {
                var e = this.getProjection();
                this.grapher._setProjection(new h(e.screen,t,e.settings))
            }
        }
        ,
        e.setViewport = function(t) {
            this.cancelAnimation(),
            this._setViewportWithoutCancellingAnimation(t)
        }
        ,
        e.setScreen = function(t) {
            var e = this.getProjection()
              , i = e.settings.squareAxes
              , o = new h(t,this.getViewportForScreen(e.viewport, t, i),e.settings);
            this.grapher._setProjection(o)
        }
        ,
        e.getTransformedViewport = function(t) {
            var e = this.getProjection()
              , i = e.pixelsToMath.div(t).mapRect(e.pixelCoordinates);
            return new n(i.left,i.right,i.bottom,i.top)
        }
        ,
        e.transformViewport = function(t) {
            this.setViewport(this.getTransformedViewport(t))
        }
        ,
        e.animateTransformation = function(t) {
            var e = this;
            this.cancelAnimation();
            var i, o = this.getTransformedViewport(t), r = 0;
            this.__animationTimeout = requestAnimationFrame(function n(a) {
                i || (i = a);
                var h = (a - i) / s.ANIMATE_ZOOM_DURATION;
                (r += h) < 1 ? (e.__animationTimeout = requestAnimationFrame(n),
                e._setViewportWithoutCancellingAnimation(e.getTransformedViewport(t.pow(h))),
                e.grapher.debounceUserRequestedViewportChange()) : (e.setViewport(o),
                e.grapher.debounceUserRequestedViewportChange())
            })
        }
        ,
        e.cancelAnimation = function() {
            cancelAnimationFrame(this.__animationTimeout)
        }
        ,
        e.addMouseWheelEventHandler = function() {
            var e, i, o = this, n = !1;
            t(window).on("scroll.viewportcontroller-" + this.__id, function(t) {
                n = !0
            }),
            t(window).on("mousewheel.viewportcontroller-" + this.__id, function(t) {
                e = t.clientX,
                i = t.clientY
            }),
            t(window).on("mousemove.viewportcontroller-" + this.__id, function(t) {
                if (n) {
                    var o = t.clientX - e
                      , r = t.clientY - i;
                    o * o + r * r < 100 || (n = !1)
                }
            });
            var a = 0;
            this.$.mousewheel(function(t, e) {
                var i = Date.now();
                if (o.preventScrollZoom && i - o.lastScrollZoom > 50 && (o.preventScrollZoom = !1),
                o.lastScrollZoom = i,
                !o.preventScrollZoom) {
                    var h = this.getProjection();
                    if (!h.settings.config.lockViewport) {
                        var c = h.mathToPixels;
                        if (!n) {
                            t.preventDefault(),
                            o.updateMouse(t);
                            var l = c.mapPoint(m(0, 0))
                              , g = o.isMouseNearOrigin() && e > 0 ? l : o.mousePt;
                            if (!(a > 0)) {
                                a += 1,
                                requestAnimationFrame(function() {
                                    a--
                                });
                                var u = (e = e > 0 ? 1 : -1) > 0 ? s.ZOOM_FACTOR : 1 / s.ZOOM_FACTOR
                                  , p = o.grapher.scaleAxis
                                  , f = "x" !== p && "both" !== p && p ? 1 : u
                                  , d = "y" !== p && "both" !== p && p ? 1 : u;
                                this.transformViewport(r.scaleAtPoint(g, f, d)),
                                this.grapher.debounceUserRequestedViewportChange()
                            }
                        }
                    }
                }
            }
            .bind(this))
        }
        ,
        e.handleDoubleClick = function(t) {
            var e = this.getProjection();
            if (!e.settings.config.lockViewport && !e.settings.config.disable_dblclick_zooming && !t.wasHandled()) {
                t.preventDefault();
                var i = this.$[0].getBoundingClientRect()
                  , o = m(t.clientX - i.left, t.clientY - i.top);
                this.animateTransformation(r.scaleAtPoint(o, s.DOUBLETAP_ZOOM))
            }
        }
        ,
        e.applyPanTouchChanges = function(t, e) {
            if (!this.getProjection().settings.config.lockViewport && !this.isScalingEnabled) {
                var i = m(e[0].x - t[0].x, e[0].y - t[0].y);
                this.transformViewport(r.translate(i)),
                this.grapher.debounceUserRequestedViewportChange()
            }
        }
        ,
        e.chooseDragScaleCenter = function() {
            var t = this.getProjection()
              , e = t.pixelCoordinates
              , i = t.mathToPixels.mapX(0)
              , o = t.mathToPixels.mapY(0);
            return m(i = Math.min(Math.max(e.left, i), e.right), o = Math.min(Math.max(e.top, o), e.bottom))
        }
        ,
        e.applyScaleTouchChanges = function(t, e) {
            if (!this.getProjection().settings.config.lockViewport) {
                var i, o, n = this.grapher.scaleAxis;
                if (2 === t.length && 2 === e.length)
                    i = g(t[0], t[1]),
                    o = g(e[0], e[1]);
                else {
                    if (1 !== e.length)
                        return;
                    var a = this.chooseDragScaleCenter();
                    i = u(a, t[0]),
                    o = u(a, e[0])
                }
                var s = o.radius / i.radius
                  , h = "y" === n ? 1 : s
                  , c = "x" === n ? 1 : s
                  , l = r.scaleAtPoint(i.center, h, c).translate(i.center, o.center);
                this.transformViewport(l),
                this.grapher.debounceUserRequestedViewportChange()
            }
        }
        ,
        e.addTouchEventHandler = function() {
            var e = this
              , i = []
              , o = !1
              , r = !0
              , n = !0;
            t(window).on("mousemove.viewportcontroller-" + this.__id, function(t) {
                var i = e.grapher.getProjection();
                o || i.settings.config.lockViewport || (e.updateMouse(t),
                e.isScalingEnabled && e.updateScaleAxis())
            });
            var a = function(t) {
                return e.grapher.scaleAxis || (e.grapher.scaleAxis = function(t) {
                    if (!(t.length < 2)) {
                        var i = e.grapher.getProjection()
                          , o = i.pixelCoordinates
                          , r = i.mathToPixels.mapX(0)
                          , n = i.mathToPixels.mapY(0);
                        r = Math.min(Math.max(o.left, r), o.right),
                        n = Math.min(Math.max(o.top, n), o.bottom);
                        var a = t[1].x - t[0].x
                          , s = t[1].y - t[0].y;
                        return Math.abs(t[0].x - r) < 40 && Math.abs(t[1].x - r) < 40 && Math.abs(s) > 3 * Math.abs(a) && i.settings.showYAxis ? "y" : Math.abs(t[0].y - n) < 40 && Math.abs(t[1].y - n) < 40 && Math.abs(a) > 3 * Math.abs(s) && i.settings.showXAxis ? "x" : "both"
                    }
                }(t)),
                e.grapher.scaleAxis
            }
              , s = function() {
                e.grapher.scaleAxis && (e.grapher.scaleAxis = void 0,
                e.grapher.redrawAllLayers(),
                e.updateCursor())
            }
              , h = function() {
                e.isScalingEnabled = !1,
                e.preventScrollZoom = !0,
                s()
            }
              , l = function(t) {
                if (o && !e.getProjection().settings.config.lockViewport && e.grapher && e.grapher.clickableObjectsLayer && !e.grapher.clickableObjectsLayer.isAnObjectPressed()) {
                    var h = p(t.touches, e.$.offset());
                    if (2 === i.length && 2 === h.length)
                        a(h),
                        e.applyScaleTouchChanges(i, h);
                    else if (1 === i.length && e.isScalingEnabled) {
                        e.updateMouse(t);
                        var c, l, g = e.grapher.scaleAxis, u = e.getProjection().mathToPixels.mapPoint(m(0, 0)), f = r ? 1 : -1, d = n ? 1 : -1;
                        if ("x" !== g && "both" !== g || (c = e.mousePt.x > u.x + 5 * f),
                        "y" !== g && "both" !== g || (l = e.mousePt.y > u.y + 5 * d),
                        "x" === g && r !== c)
                            return;
                        if ("y" === g && n !== l)
                            return;
                        if ("both" === g && r !== c && n !== l)
                            return;
                        e.applyScaleTouchChanges(i, h)
                    } else
                        s();
                    1 === i.length && e.applyPanTouchChanges(i, h),
                    e.controller.dispatch({
                        type: "grapher/drag-move"
                    }),
                    i = h
                }
            }
              , g = function(r) {
                o && (e.cancelAnimation(),
                i = p(r.touches, e.$.offset()),
                0 === r.touches.length && (o = !1,
                e.grapher.isDragging = !1,
                t(document).off(".graphdrag"),
                e.grapher.debounceUserRequestedViewportChange(),
                e.controller.dispatch({
                    type: "grapher/drag-end"
                })),
                (0 === r.touches.length || 1 === r.touches.length && !e.isScalingEnabled) && s())
            };
            this.$.on("dcg-tapstart", function(i) {
                var a = e.getProjection();
                if (!a.settings.config.lockViewport && !i.wasHandled() && !o && i.touches.length === i.changedTouches.length) {
                    o = !0,
                    e.grapher.isDragging = !0,
                    e.updateMouse(i);
                    var s = a.mathToPixels.mapPoint(m(0, 0))
                      , h = e.grapher.scaleAxis;
                    "x" !== h && "both" !== h || (r = e.mousePt.x > s.x),
                    "y" !== h && "both" !== h || (n = e.mousePt.y > s.y),
                    e.controller.dispatch({
                        type: "grapher/drag-start"
                    }),
                    t(document).on("dcg-tapmove.graphdrag", l),
                    t(document).on("dcg-tapstart.graphdrag dcg-tapend.graphdrag dcg-tapcancel.graphdrag", g)
                }
            }),
            this.$.on("dblclick", this.handleDoubleClick.bind(this)),
            t(window).on("keydown.viewportcontroller-" + this.__id, function(t) {
                this.getProjection().settings.config.lockViewport || (c.lookup(t) !== c.SHIFT || function(t) {
                    return t.altKey || t.ctrlKey || t.metaKey
                }(t) ? h() : (this.isScalingEnabled = !0,
                this.grapher.scaleAxis || this.updateScaleAxis()))
            }
            .bind(this)),
            t(window).on("keyup.viewportcontroller-" + this.__id + " blur.viewportcontroller-" + this.__id, h)
        }
        ,
        e.zoom = function(t) {
            var e = this.getProjection().pixelCoordinates;
            if ("in" === t)
                this.animateTransformation(r.scaleAtPoint(f(e), 2)),
                i.alert(this.s("graphing-calculator-narration-viewport-zoom-in"));
            else if ("out" === t)
                this.animateTransformation(r.scaleAtPoint(f(e), .5)),
                i.alert(this.s("graphing-calculator-narration-viewport-zoom-out"));
            else if ("default" === t) {
                var o = this.getDefaultViewport();
                this.animateTransformation(this.getCustomZoomTransformation(o)),
                i.alert(this.s("graphing-calculator-narration-viewport-zoom-default"))
            } else if ("square" === t) {
                var n = this.getSquareViewport();
                this.animateTransformation(this.getCustomZoomTransformation(n)),
                i.alert(this.s("graphing-calculator-narration-viewport-zoom-square"))
            }
        }
        ,
        e.zoomCustom = function(t) {
            this.animateTransformation(this.getCustomZoomTransformation(t)),
            i.alert(this.s("graphing-calculator-narration-viewport-updated"))
        }
        ,
        e.getCustomZoomTransformation = function(t) {
            var e = this.getProjection().viewport
              , i = this.getProjection().pixelCoordinates
              , o = this.getProjection().mathCoordinates
              , n = (e.xmax - e.xmin) / (t.xmax - t.xmin)
              , a = (e.ymax - e.ymin) / (t.ymax - t.ymin)
              , s = r.fromRects(o, i)
              , h = new r.translate(s.mapPoint({
                x: 0,
                y: 0
            }),{
                x: 0,
                y: 0
            })
              , c = new r.scale(n,a)
              , l = r.fromRects({
                left: t.xmin,
                right: t.xmax,
                bottom: t.ymin,
                top: t.ymax
            }, i);
            return new r.translate({
                x: 0,
                y: 0
            },l.mapPoint({
                x: 0,
                y: 0
            })).compose(c.compose(h))
        }
        ,
        e.isZoomRestored = function() {
            var t = this.getProjection()
              , e = t.viewport
              , i = this.getDefaultViewport()
              , o = .05;
            return t.settings.squareAxes && Math.abs((e.xmin - i.xmin) / e.xmin) < o && Math.abs((e.xmax - i.xmax) / e.xmax) < o && Math.abs((e.ymin - i.ymin) / e.ymin) < o && Math.abs((e.ymax - i.ymax) / e.ymax) < o
        }
        ,
        e.getViewportForScreen = function(t, e, i) {
            return i ? "y" == this.getProjection().settings.lastChangedAxis ? t.squareXAxis(e) : t.squareYAxis(e) : t
        }
        ,
        e.getSquareViewport = function() {
            var t = this.getProjection();
            return this.getViewportForScreen(t.viewport, t.screen, !0)
        }
        ,
        e.enforceSquareAxes = function() {
            var t = this.getProjection();
            t.settings.squareAxes && (t.viewport.isSquare(t.screen) || this.setViewport(this.getViewportForScreen(t.viewport, t.screen, !0)))
        }
    })
});
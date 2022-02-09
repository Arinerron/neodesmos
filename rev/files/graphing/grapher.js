define('graphing/grapher', ["require", "exports", "main/graph_settings", "./canvaslayer", "./poidotslayer", "./gridlayer", "./viewportcontroller", "./poicontroller", "vendor/canvas2svg", "dcgview", "jquery", "underscore", "./viewport", "./screen", "./graphsketch", "./projection", "underscore_model", "./audiograph", "./canvas-braille", "./braille-size-options", "core/lib/deepCopy", "core/lib/default-spec", "core/graphing-calc/json/graph-settings", "graphing/tonegenerator", "./movablepointslayer", "./poilabelslayer", "./imagelayer", "./clickableobject-layer", "./svg-classes", "./svg-groups", "core/types/graphmode", "./graphslayer"], function(require, e, t, r, i, s, a, o, n, h, c, p, l, d, g, u, y, w, v, f, _, b, m, L, S, k, R, P, x, C, j, O) {
    "use strict";
    function I() {
        return new l.Viewport(-10,10,-10,10)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.Grapher = void 0;
    var A = function() {
        function e(e, t, n, l) {
            var g = this;
            this.type = "2d",
            this._layerClasses = {},
            this.$ = e,
            this.evaluator = l,
            this.controller = n,
            this.settings = t;
            var v = new d.Screen(1024,768)
              , f = I().squareYAxis(v);
            this.setUserRequestedViewport(f),
            this.__projection = new u.Projection(v,f,t),
            this.markLabelsDirty = p.debounce(function() {
                g.evaluator.notifyWhenSynced(function() {
                    g.__isRedrawingSlowly ? g.notifyAfterRedraw(function() {
                        g.poiLabelsLayer.markLabelsDirty(),
                        g.redrawAllLayers()
                    }) : (g.poiLabelsLayer.markLabelsDirty(),
                    g.redrawAllLayers())
                })
            }, 300),
            this.poiController = new o(this,t),
            this.viewportController = a(this, this.controller),
            this.showPOIDots = !0,
            this.$.css("overflow", "hidden"),
            this.graphSketches = {},
            this.graphImages = {},
            this.audioGraph = new w.default(n,this),
            this.canvasLayer = r(this),
            this.$.append(this.canvasLayer.$);
            var _ = c("<div></div>");
            this.$.append(_);
            var b = this;
            this.imageLayer = h.mountToNode(R.default, _[0], {
                grapher: function() {
                    return b
                }
            }),
            this.gridLayer = s(),
            this.poiDotsLayer = i(),
            this.graphsLayer = new O.GraphsLayer(this.settings,function(e) {
                return g.audioGraph.getExpressionAriaLabel(e)
            }
            );
            var m = c("<div></div>");
            this.$.append(m);
            b = this;
            this.clickableObjectsLayer = h.mountToNode(P.default, m[0], {
                grapher: function() {
                    return b
                }
            });
            var L = c("<div></div>");
            this.$.append(L);
            b = this;
            this.movablePointsLayer = h.mountToNode(S.default, L[0], {
                grapher: function() {
                    return b
                }
            });
            var x = c("<div></div>");
            this.$.append(x),
            this.poiLabelsLayer = h.mountToNode(k.default, x[0], {
                grapher: function() {
                    return b
                }
            }),
            this.traceLayer = this.poiLabelsLayer,
            this.scaleAxis = void 0,
            this.__sketchOrder = [],
            this.selectedId = void 0,
            this.__redrawRequested = !1,
            this.__redrawSlowlyIndex = 0,
            this.__isRedrawingSlowly = !1,
            this.events = new y.UnderscoreModel
        }
        return e.copyGraphProperties = function(e, t) {
            for (var r in e = b.populateDefaults(m.DefaultGraphSettings, e),
            m.DefaultGraphSettings)
                m.DefaultGraphSettings.hasOwnProperty(r) && t.setProperty(r, e[r]);
            return e
        }
        ,
        e.prototype.remove = function() {
            this.$.remove(),
            this.poiController.remove(),
            this.viewportController.remove(),
            this.audioGraph.remove()
        }
        ,
        e.prototype.tick = function(e) {
            this.__isRedrawingSlowly ? this._redrawSlowly() : this.__redrawRequested && this._redrawAllLayers(),
            this.__movablePointListener && this.__movablePointListener()
        }
        ,
        e.prototype.registerMovablePointListener = function(e) {
            this.__movablePointListener = e
        }
        ,
        e.prototype.deregisterMovablePointListener = function() {
            this.__movablePointListener = void 0
        }
        ,
        e.prototype.setSketchOrder = function(e) {
            p.isEqual(this.__sketchOrder, e) || (this.__sketchOrder = e,
            this.redrawAllLayers())
        }
        ,
        e.prototype.clear = function() {
            this.graphSketches = {},
            this.graphImages = {}
        }
        ,
        e.prototype.getSketchOrder = function() {
            return this.__sketchOrder
        }
        ,
        e.prototype.getGraphSketch = function(e) {
            return this.graphSketches[e]
        }
        ,
        e.prototype.getGraphImage = function(e) {
            return this.graphImages[e]
        }
        ,
        e.prototype.addGraphSketch = function(e) {
            this.graphSketches[e.id] = e
        }
        ,
        e.prototype.removeGraphSketch = function(e) {
            delete this.graphSketches[e]
        }
        ,
        e.prototype.addGraphImage = function(e) {
            var t = this;
            e.imageObj.width && e.imageObj.height ? (this.graphImages[e.id] = e,
            this.redrawAllLayers()) : c(e.imageObj).on("load.calc_load", function() {
                return t.addGraphImage(e)
            })
        }
        ,
        e.prototype.removeGraphImage = function(e) {
            var t = this.graphImages[e];
            t && c(t.imageObj).off("load.calc_load"),
            delete this.graphImages[e],
            this.redrawAllLayers()
        }
        ,
        e.prototype.getProjection = function() {
            return this.__projection
        }
        ,
        e.prototype._setProjection = function(e) {
            this.__projection = e,
            this.redrawAllLayers()
        }
        ,
        e.prototype.getAudioTrace = function() {
            return this.audioGraph
        }
        ,
        e.prototype.getDefaultViewport = function() {
            var e = this.getProjection();
            return I().squareYAxis(e.screen)
        }
        ,
        e.prototype._updateScreenSize = function(e, t) {
            if (!(e <= 0 || t <= 0)) {
                var r = this.getProjection().screen;
                if (r.width !== e || r.height !== t) {
                    this.$.width(e);
                    var i = new d.Screen(e,t);
                    this.viewportController.setScreen(i)
                }
            }
        }
        ,
        e.prototype._setIsVisible = function(e) {
            e !== this.isVisible && (this.isVisible = e,
            e ? this.redrawAllLayers() : this.canvasLayer.resize(0, 0))
        }
        ,
        e.prototype.update = function() {
            var e = this.controller.computeMajorLayout().grapher;
            e.width > 0 && e.height > 0 ? (this._setIsVisible(!0),
            this._updateScreenSize(e.width, e.height),
            this.$.css({
                position: "absolute",
                left: e.left + "px",
                top: e.top + "px",
                width: e.width + "px",
                height: e.height + "px"
            })) : this._setIsVisible(!1)
        }
        ,
        e.prototype.hide = function(e) {
            var t = this.getGraphSketch(e);
            t && (t.visible = !1)
        }
        ,
        e.prototype.select = function(e) {
            if (this.selectedId) {
                var t = this.getGraphSketch(this.selectedId);
                t && (t.selected = !1,
                t.showPOI = !1,
                t.showHighlight = !1)
            }
            var r = this.getGraphSketch(e);
            r && (r.selected = !0,
            r.showPOI = this.controller.isTraceEnabled(),
            r.showHighlight = !0),
            this.selectedId = e
        }
        ,
        e.prototype.updateSketch = function(e, t) {
            var r = this.getGraphSketch(e);
            if (!t.length)
                return this.hide(e);
            var i = new g.GraphSketch(e,t);
            t[0].graphMode !== j.ERROR && (i.color = t[0].color,
            t[0].style && (i.style = t[0].style)),
            r && i.updateFrom(r);
            var s = String(e) === String(this.selectedId);
            i.selected = s,
            i.showPOI = s && this.controller.isTraceEnabled(),
            i.showHighlight = s,
            this.addGraphSketch(i)
        }
        ,
        e.prototype.updateIntersections = function(e, t) {
            var r = this.getGraphSketch(e);
            r && r.updateIntersections(t)
        }
        ,
        e.prototype.redrawAllLayers = function() {
            this.cancelRedrawSlowly(),
            this.__redrawRequested = !0
        }
        ,
        e.prototype._clear = function() {
            var e = this.getProjection()
              , t = e.screen;
            this.canvasLayer.resize(e.screen.width, e.screen.height),
            this.canvasLayer.ctx.clearRect(0, 0, t.width, t.height)
        }
        ,
        e.prototype._redrawAllLayers = function() {
            this.isVisible && (this.__redrawRequested = !1,
            this._clear(),
            this.audioGraph.recomputePoints(),
            this._recomputeClickableObjects(),
            this._redrawImageLayer(),
            this._redrawGridLayer(),
            this._redrawGraphsLayer(),
            this._redrawPointsAndLabels(),
            this._updateCanvasLayerAria(),
            this.events.triggerEvent("redraw", void 0))
        }
        ,
        e.prototype.cancelRedrawSlowly = function() {
            this.__isRedrawingSlowly && (this.__redrawSlowlyIndex = 0,
            this.__isRedrawingSlowly = !1,
            this.redrawAllLayers())
        }
        ,
        e.prototype.redrawSlowly = function() {
            this.__isRedrawingSlowly || (this.__redrawSlowlyIndex = 0,
            this.__isRedrawingSlowly = !0,
            this.audioGraph.recomputePoints())
        }
        ,
        e.prototype._redrawSlowly = function() {
            var e, t, r = this.__redrawSlowlyIndex;
            if (0 === r && (this._clear(),
            this._redrawGridLayer()),
            r >= this.__sketchOrder.length)
                this.cancelRedrawSlowly();
            else {
                var i = this.__sketchOrder[r]
                  , s = ((e = {})[i] = this.graphSketches[i],
                e)
                  , a = ((t = {})[i] = this.graphImages[i],
                t);
                (a[i] || s[i]) && this.graphsLayer.redrawToCtx(this.canvasLayer.ctx, this.getProjection(), s, a, [i], this.poiLabelsLayer, this.clickableObjectsLayer),
                this.__redrawSlowlyIndex += 1
            }
        }
        ,
        e.prototype._redrawGridLayer = function() {
            this.gridLayer.redrawToCtx(this.canvasLayer.ctx, this.getProjection(), this.scaleAxis)
        }
        ,
        e.prototype._recomputeClickableObjects = function() {
            this.clickableObjectsLayer.redraw()
        }
        ,
        e.prototype._redrawGraphsLayer = function() {
            this.graphsLayer.redrawToCtx(this.canvasLayer.ctx, this.getProjection(), this.graphSketches, this.graphImages, this.__sketchOrder, this.poiLabelsLayer, this.clickableObjectsLayer)
        }
        ,
        e.prototype._updateCanvasLayerAria = function() {
            var e = 0;
            for (var t in this.graphSketches)
                L.canPlaySketch(this.graphSketches[t]) && (e += 1);
            this.canvasLayer.updateAria(this.isVisible, e)
        }
        ,
        e.prototype._redrawPointsAndLabels = function() {
            var e = this.getProjection()
              , t = [];
            this.movablePointsLayer.redraw(this.canvasLayer.ctx, e, t),
            this.showPOIDots && this.poiDotsLayer.redrawToCtx(this.canvasLayer.ctx, e, this.graphSketches, this.poiLabelsLayer, this.clickableObjectsLayer);
            var r = this.$[0].getBoundingClientRect();
            p.each([this.controller.find$(".dcg-overgraph-pillbox-elements")[0], this.controller.find$(".dcg-graphpaper-branding")[0]], function(e) {
                if (e) {
                    var i = e.getBoundingClientRect();
                    t.push({
                        left: i.left - r.left,
                        top: i.top - r.top,
                        right: i.right - r.left,
                        bottom: i.bottom - r.top
                    })
                }
            });
            var i = this.canvasLayer.ctx.canvas.getBoundingClientRect();
            this.poiLabelsLayer.redraw(e, this.canvasLayer.ctx, {
                width: i.width,
                height: i.height
            }, t)
        }
        ,
        e.prototype._redrawImageLayer = function() {
            this.imageLayer.redrawToCtx(this.canvasLayer.ctx, this.getProjection(), this.graphImages, this.__sketchOrder)
        }
        ,
        e.prototype._parseScreenshotOpts = function(e) {
            var r, i, s, a, o, n, h = this.getProjection();
            return e ? (r = e.width || e.height || h.screen.width,
            i = e.height || e.width || h.screen.height,
            (s = e.targetPixelRatio || 1) < 1 && (s = 1),
            a = (r < 256 || i < 256) && !e.preserveAxisNumbers,
            o = t.fromObject(e.settings || this.settings),
            n = !!e.transparentBackground) : (r = h.screen.width,
            i = h.screen.height,
            s = 1,
            a = !1,
            o = t.fromObject(this.settings),
            n = !1),
            a && (o.setProperty("xAxisNumbers", !1),
            o.setProperty("yAxisNumbers", !1),
            o.setProperty("polarNumbers", !1)),
            {
                width: r,
                height: i,
                targetPixelRatio: s,
                settings: o,
                transparentBackground: n
            }
        }
        ,
        e.prototype._syncScreenshotReturnCanvas = function(e) {
            var t = document.createElement("canvas");
            if (e && e.braille) {
                var r = e.braille
                  , i = r.embosserModel
                  , s = r.brailleMode
                  , a = f.brailleSizes[i];
                t.width = a.width,
                t.height = a.height,
                v.createBrailleImage(t, this, a, i, s)
            } else {
                var o = this._parseScreenshotOpts(e);
                t.width = o.width * o.targetPixelRatio,
                t.height = o.height * o.targetPixelRatio,
                this.screenshotToCanvas(t, e)
            }
            return t
        }
        ,
        e.prototype.screenshot = function(e) {
            return this._syncScreenshotReturnCanvas(e).toDataURL("image/png")
        }
        ,
        e.prototype.asyncScreenshot = function(e, t) {
            var r = this
              , i = !1;
            !e.transparentBackground && e.showLabels && ((e = _.default(e)).transparentBackground = !0,
            i = !0);
            var s = this._syncScreenshotReturnCanvas(e)
              , a = s.getContext("2d")
              , o = s
              , p = a;
            e && "svg" === e.format && (i = !1,
            e.transparentBackground && ((e = _.default(e)).transparentBackground = !1),
            p = new n(s.width,s.height),
            o = {
                getContext: function() {
                    return p
                },
                width: s.width,
                height: s.height
            },
            this.screenshotToCanvas(o, e));
            var l = this.makeScreenshotProjection(e)
              , d = [];
            if (e.showMovablePoints && this.movablePointsLayer.drawForScreenshot(p, l, d),
            e.showLabels) {
                var g = l.screen.width
                  , u = l.screen.height
                  , y = l.settings.labelSize || 15
                  , w = 1;
                (g < 200 || u < 200) && (w = .9);
                var v = c('<div class="dcg-calculator-api-container">\n          <div class="dcg-container">\n            <div class="dcg-grapher" style="font-size:' + (y * w + "px") + '"></div>\n          </div>\n        </div>').css({
                    width: l.screen.width,
                    height: l.screen.height,
                    position: "fixed",
                    left: "0px",
                    top: "0px"
                }).appendTo("body")
                  , f = v.find(".dcg-grapher")
                  , b = h.mountToNode(k.default, f[0], {
                    grapher: function() {
                        return r
                    }
                })
                  , m = {
                    width: l.screen.width,
                    height: l.screen.height
                };
                b.drawForScreenshot(l, a, p, m, d),
                v.remove()
            }
            i && (p.globalCompositeOperation = "destination-over",
            p.fillStyle = "#FFF",
            p.fillRect(0, 0, o.width, o.height)),
            e && "svg" === e.format ? t(p.getSerializedSvg()) : t(o.toDataURL("image/png"))
        }
        ,
        e.prototype.makeScreenshotProjection = function(e) {
            var t = this._parseScreenshotOpts(e)
              , r = t.width
              , i = t.height
              , s = t.settings
              , a = new d.Screen(r,i)
              , o = this.getProjection().viewport;
            return this.getSetting("squareAxes") && (o = o.squareCrop(a)),
            new u.Projection(a,o,s)
        }
        ,
        e.prototype.screenshotToCanvas = function(e, t) {
            var r = this._parseScreenshotOpts(t)
              , i = r.targetPixelRatio
              , s = r.transparentBackground
              , a = e.getContext("2d");
            a.scale(i, i);
            var o = this.makeScreenshotProjection(t);
            o.settings.takingScreenshot = !0,
            C.save(a, "background"),
            x.save(a, "dcg-svg-background"),
            s ? a.clearRect(0, 0, o.screen.width, o.screen.height) : (a.fillStyle = "white",
            a.fillRect(0, 0, o.screen.width, o.screen.height)),
            x.restore(a),
            C.restore(a),
            this.imageLayer.redrawToCtx(a, o, this.graphImages, this.__sketchOrder),
            this.gridLayer.redrawToCtx(a, o),
            this.graphsLayer.redrawToCtx(a, o, this.graphSketches, this.graphImages, this.__sketchOrder, this.poiLabelsLayer, this.clickableObjectsLayer, t)
        }
        ,
        e.prototype.getImageData = function(e, t, r, i) {
            return this.canvasLayer.ctx.getImageData(e, t, r, i)
        }
        ,
        e.prototype.getSetting = function(e, t) {
            var r = this.settings.getProperty(e);
            return void 0 !== r ? r : t
        }
        ,
        e.prototype.getState = function(e) {
            var t = this
              , r = {
                viewport: this.getCurrentViewport()
            };
            return this.settings.stateProperties.forEach(function(e) {
                "randomSeed" !== e && (r[e] = t.getSetting(e))
            }),
            e.stripDefaults && (r = b.stripDefaults(m.DefaultGraphSettings, r)),
            r
        }
        ,
        e.prototype.getUndoRedoState = function() {
            var e = this
              , t = {};
            return this.settings.stateProperties.forEach(function(r) {
                t[r] = e.getSetting(r)
            }),
            t.viewport = this.getUserRequestedViewport(),
            t
        }
        ,
        e.prototype.notifyAfterRedraw = function(e) {
            var t = this;
            if (this.__isRedrawingSlowly)
                requestAnimationFrame(this.notifyAfterRedraw.bind(this, e));
            else if (this.__redrawRequested) {
                this.notifyAfterRedraw_i ? this.notifyAfterRedraw_i++ : this.notifyAfterRedraw_i = 1;
                var r = "redraw.notifyAfterRedraw" + this.notifyAfterRedraw_i;
                this.events.observeEvent(r, function() {
                    t.events.unobserveEvent(r),
                    e()
                })
            } else
                e()
        }
        ,
        e.prototype.getCurrentViewport = function() {
            return this.viewportController.getViewport().toObject()
        }
        ,
        e.prototype.getUserRequestedViewport = function() {
            return this._lastUserRequestedViewport
        }
        ,
        e.prototype.setUserRequestedViewport = function(e) {
            this._lastUserRequestedViewportUpdateToken || (this._lastUserRequestedViewportUpdateToken = 0),
            this._lastUserRequestedViewportUpdateToken += 1,
            this._lastUserRequestedViewport = _.default(e)
        }
        ,
        e.prototype.debounceUserRequestedViewportChange = function() {
            var e = this;
            if (!this.__debouncedViewportCommit) {
                this.__debouncedViewportCommit = p.debounce(function(t, r) {
                    if (!e.isDragging && e._lastUserRequestedViewportUpdateToken === r) {
                        if (e._lastUserRequestedViewport) {
                            var i = l.Viewport.fromObject(e._lastUserRequestedViewport);
                            if (e.computeConcreteViewport(i).equals(t))
                                return
                        }
                        e.controller.dispatch({
                            type: "commit-user-requested-viewport",
                            viewport: t
                        })
                    }
                }, 1e3)
            }
            var t = this.getCurrentViewport();
            this.__debouncedViewportCommit(t, this._lastUserRequestedViewportUpdateToken)
        }
        ,
        e.prototype.setGrapherState = function(t, r) {
            if (r && r.doNotClear || this.clear(),
            "viewport"in (t = e.copyGraphProperties(t, this.settings))) {
                var i = l.Viewport.fromObject(t.viewport);
                this.setUserRequestedViewport(i);
                var s = this.computeConcreteViewport(i);
                this.viewportController.setViewport(s)
            }
            this.redrawAllLayers()
        }
        ,
        e.prototype.computeConcreteViewport = function(e) {
            var t = this.getProjection().screen;
            return this.getSetting("squareAxes") && !e.isSquare(t) ? e.squareYAxis(t) : e
        }
        ,
        e.prototype.setLayerClass = function(e, t) {
            var r = this._layerClasses[e];
            this._layerClasses[e] = t,
            r !== t && (r && this.$.removeClass(r),
            t && this.$.addClass(t))
        }
        ,
        e
    }();
    e.Grapher = A
});
!function(t, i) {
    "object" == typeof exports && "object" == typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define('flux', [], i) : "object" == typeof exports ? exports.Flux = i() : t.Flux = i()
}(this, function() {
    return function(t) {
        var i = {};
        function e(n) {
            if (i[n])
                return i[n].exports;
            var s = i[n] = {
                exports: {},
                id: n,
                loaded: !1
            };
            return t[n].call(s.exports, s, s.exports, e),
            s.loaded = !0,
            s.exports
        }
        return e.m = t,
        e.c = i,
        e.p = "",
        e(0)
    }([function(t, i, e) {
        "use strict";
        t.exports.Dispatcher = e(1)
    }
    , function(t, i, e) {
        "use strict";
        i.__esModule = !0;
        var n = e(2)
          , s = function() {
            function t() {
                !function(t, i) {
                    if (!(t instanceof i))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                this._callbacks = {},
                this._isDispatching = !1,
                this._isHandled = {},
                this._isPending = {},
                this._lastID = 1
            }
            return t.prototype.register = function(t) {
                var i = "ID_" + this._lastID++;
                return this._callbacks[i] = t,
                i
            }
            ,
            t.prototype.unregister = function(t) {
                this._callbacks[t] || n(!1, "Dispatcher.unregister(...): `%s` does not map to a registered callback.", t),
                delete this._callbacks[t]
            }
            ,
            t.prototype.waitFor = function(t) {
                this._isDispatching || n(!1, "Dispatcher.waitFor(...): Must be invoked while dispatching.");
                for (var i = 0; i < t.length; i++) {
                    var e = t[i];
                    this._isPending[e] ? this._isHandled[e] || n(!1, "Dispatcher.waitFor(...): Circular dependency detected while waiting for `%s`.", e) : (this._callbacks[e] || n(!1, "Dispatcher.waitFor(...): `%s` does not map to a registered callback.", e),
                    this._invokeCallback(e))
                }
            }
            ,
            t.prototype.dispatch = function(t) {
                this._isDispatching && n(!1, "Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch."),
                this._startDispatching(t);
                try {
                    for (var i in this._callbacks)
                        this._isPending[i] || this._invokeCallback(i)
                } finally {
                    this._stopDispatching()
                }
            }
            ,
            t.prototype.isDispatching = function() {
                return this._isDispatching
            }
            ,
            t.prototype._invokeCallback = function(t) {
                this._isPending[t] = !0,
                this._callbacks[t](this._pendingPayload),
                this._isHandled[t] = !0
            }
            ,
            t.prototype._startDispatching = function(t) {
                for (var i in this._callbacks)
                    this._isPending[i] = !1,
                    this._isHandled[i] = !1;
                this._pendingPayload = t,
                this._isDispatching = !0
            }
            ,
            t.prototype._stopDispatching = function() {
                delete this._pendingPayload,
                this._isDispatching = !1
            }
            ,
            t
        }();
        t.exports = s
    }
    , function(t, i, e) {
        "use strict";
        t.exports = function(t, i, e, n, s, a, o, r) {
            if (void 0 === i)
                throw new Error("invariant requires an error message argument");
            if (!t) {
                var c;
                if (void 0 === i)
                    c = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                else {
                    var p = [e, n, s, a, o, r]
                      , h = 0;
                    (c = new Error(i.replace(/%s/g, function() {
                        return p[h++]
                    }))).name = "Invariant Violation"
                }
                throw c.framesToPop = 1,
                c
            }
        }
    }
    ])
});
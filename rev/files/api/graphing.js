define('api/graphing', ["require", "exports", "tslib", "lib/i18n", "main/calc_embed", "core/lib/deepCopy", "underscore_model", "core/math/recttransformation", "lib/dom-change-detector", "graphing/compute-async-screenshot-bounds", "graphing-calc/api/sanitize-expression", "dcgview-helpers/mathquill-view", "dcgview-helpers/mathquill-proxy", "lib/console", "underscore", "main/shared-clock-bus", "main/shared-worker-pool", "core/graphing-calc/json/graph-settings", "graphing-calc/json/config-options", "core/lib/random-seed", "../lib/underscore-shim"], function(require, e, t, o, r, n, i, s, a, p, c, l, h, d, u, g, f, y, m, v, b) {
    "use strict";
    function x(e, t) {
        var o = {}
          , r = {};
        for (var n in e)
            m.isConfigOption(n) ? o[n] = e[n] : y.isGraphSetting(n) ? r[n] = e[n] : t || d.warn("Unrecognized setting: " + n + ". Ignoring.");
        return {
            configOptions: o,
            settingsOptions: r
        }
    }
    function _(e, t) {
        var o = {};
        return t.hasOwnProperty("x") && (o.x = e.mapX(t.x)),
        t.hasOwnProperty("y") && (o.y = e.mapY(t.y)),
        o
    }
    var w;
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var S = []
      , C = !1;
    function O() {
        if (!C) {
            for (var e; (e = S.shift()) && e.api._destroyed; )
                ;
            if (e) {
                var t = e;
                C = !0;
                var o = t.options
                  , r = t.mathBounds
                  , n = t.state
                  , i = t.callback;
                w || (w = new B);
                var s = w;
                s.setState(n),
                s.setMathBounds(r);
                ["majorAxisOpacity", "minorAxisOpacity", "axisLineOffset", "axisLineWidth", "labelSize", "graphLineWidth", "pointLineWidth"].forEach(function(e) {
                    "axisLineWidth" === e ? s._calc.grapher.settings.setProperty(e, t.api._calc.grapher.settings[e]) : s._calc.grapher.settings[e] = t.api._calc.grapher.settings[e]
                });
                var a = s._calc.evaluator
                  , p = function() {
                    s._calc.grapher.asyncScreenshot(o, function(e) {
                        C = !1,
                        O(),
                        i(e)
                    })
                }
                  , c = t.api._calc.controller
                  , l = g.subscribe(function() {
                    c.areAnyImagesLoading() || (g.unsubscribe(l),
                    a.notifyWhenSynced(p))
                })
            }
        }
    }
    var B = function(e) {
        function b(t, o, n) {
            var i = e.call(this) || this;
            if (i._destroyed = !1,
            i.isOffscreen = !1,
            !(i instanceof b))
                return new b(t,o,n);
            var s = x(o || {}, !0)
              , p = m.validateConfigOptions(s.configOptions)
              , c = s.settingsOptions;
            return i._calc = new r.default(t,f.default,p),
            i._calc.interceptTouch(),
            i.controller = i._calc.controller,
            i.controller.onEventsEmitted = function(e) {
                var t = i.controller.getSelectedItem();
                i.setProperty("isAnyExpressionSelected", !!t),
                i.setProperty("selectedExpressionId", t ? t.id : void 0),
                i.setProperty("expressionAnalysis", i.controller.getExpressionAnalysis());
                var o = l.default.getFocusedMathquill();
                for (var r in i.setProperty("focusedMathQuill", o ? new h.MathQuillProxy(o) : void 0),
                e)
                    e.hasOwnProperty(r) && e[r] && i.triggerEvent(r, void 0)
            }
            ,
            i._calc.graphpaperBounds.observeAndSync("mathCoordinates", i._syncGraphpaperBounds.bind(i)),
            i._calc.graphpaperBounds.observeAndSync("pixelCoordinates", i._syncGraphpaperBounds.bind(i)),
            i.colors = i.controller.getColors(),
            i._initGraphSettings(),
            i.updateSettings(c),
            i._sharedClockBusToken = g.subscribe(function(e) {
                var t = i._calc.grapher.settings.config.pauseWhenOffscreen && i.isOffscreen;
                i._calc.tick(e, t)
            }),
            i.domChangeDetector = new a.default(t,function(e) {
                switch (i.isOffscreen = e.isOffscreen,
                e.type) {
                case "offscreen-noop":
                    break;
                case "added":
                    i._calc.resize(e.size);
                    break;
                case "removed":
                    break;
                case "resized":
                    i._calc.resize(e.size)
                }
            }
            ),
            p.autosize ? i.domChangeDetector.startWatching() : i.domChangeDetector.checkForChanges(),
            "function" == typeof n && n(i),
            i
        }
        return t.__extends(b, e),
        b.prototype.destroy = function() {
            function e(e) {
                d.warn("You've destroyed this API instance. You can no longer call ." + e + "()")
            }
            for (var t in this._calc.destroy(),
            this.controller.onEventsEmitted = function() {}
            ,
            g.unsubscribe(this._sharedClockBusToken),
            this.domChangeDetector.destroy(),
            this)
                "function" == typeof this[t] ? this[t] = e.bind(this, t) : this.hasOwnProperty(t) && delete this[t];
            this.destroy = function() {}
            ,
            this._destroyed = !0
        }
        ,
        b.prototype._syncGraphpaperBounds = function() {
            var e = this;
            this.controller.runAfterDispatch(function() {
                e.setProperty("graphpaperBounds", {
                    mathCoordinates: e._calc.graphpaperBounds.mathCoordinates,
                    pixelCoordinates: e._calc.graphpaperBounds.pixelCoordinates
                })
            })
        }
        ,
        b.prototype._initGraphSettings = function() {
            var e = this
              , t = new i.UnderscoreModel;
            this.settings = this.graphSettings = t,
            y.publicGraphSettings.forEach(function(o) {
                e._calc.grapher.settings.observeAndSync(o, function() {
                    e.controller.runAfterDispatch(function() {
                        t.setProperty(o, e._calc.grapher.settings[o])
                    })
                })
            }),
            m.publicConfigOptions.forEach(function(o) {
                e._calc.grapher.settings.config.observeAndSync(o, function() {
                    e.controller.runAfterDispatch(function() {
                        t.setProperty(o, e._calc.grapher.settings.config[o])
                    })
                })
            })
        }
        ,
        b.prototype.updateSettings = function(e) {
            var t = x(e, !1)
              , o = t.configOptions
              , r = t.settingsOptions;
            u.isEmpty(o) || this._calc.setOptions(o),
            u.isEmpty(r) || this._calc.grapher.settings.setGraphSettings(r),
            this.notifyControllerOfAPICall()
        }
        ,
        b.prototype.setGraphSettings = function(e) {
            d.warn("As of API v0.8 the 'setGraphSettings' method is deprecated and has been renamed 'updateSettings.'"),
            this.updateSettings(e),
            this.setGraphSettings = this.updateSettings,
            this.notifyControllerOfAPICall()
        }
        ,
        b.prototype.fetchLanguage = function(e) {
            return o.fetchLanguage(e)
        }
        ,
        b.prototype.setDefaultState = function(e) {
            this._calc.grapher.settings.setProperty("defaultState", e),
            this.notifyControllerOfAPICall()
        }
        ,
        b.prototype.mathToPixels = function(e) {
            return _(s.RT.fromRects(this.graphpaperBounds.mathCoordinates, this.graphpaperBounds.pixelCoordinates), e)
        }
        ,
        b.prototype.pixelsToMath = function(e) {
            return _(s.RT.fromRects(this.graphpaperBounds.pixelCoordinates, this.graphpaperBounds.mathCoordinates), e)
        }
        ,
        b.prototype.notifyControllerOfAPICall = function() {
            this.controller.dispatch({
                type: "render"
            })
        }
        ,
        b.prototype.setExpression = function(e) {
            var t = this.controller.getItemModel(e.id)
              , o = t && t.type
              , r = c.validateItem(e, o, this.controller);
            if (r)
                if (o)
                    this.controller.dispatch({
                        type: "set-expression-properties-from-api",
                        id: r.id,
                        properties: r
                    });
                else {
                    if ("image" === r.type)
                        return;
                    this.controller.dispatch({
                        type: "add-item-to-end-from-api",
                        state: r
                    })
                }
        }
        ,
        b.prototype.setExpressions = function(e) {
            e.forEach(this.setExpression.bind(this))
        }
        ,
        b.prototype.removeExpression = function(e) {
            var t = e.id.toString();
            this.controller.dispatch({
                type: "remove-item-by-id",
                id: t
            })
        }
        ,
        b.prototype.removeExpressions = function(e) {
            e.forEach(this.removeExpression.bind(this))
        }
        ,
        b.prototype.removeSelected = function() {
            var e = this.controller.getSelectedItem();
            if (e) {
                var t = e.id;
                return this.controller.dispatch({
                    type: "remove-item-by-id",
                    id: t
                }),
                t
            }
        }
        ,
        b.prototype.setMathBounds = function(e) {
            e && e.left < e.right && e.bottom < e.top ? this._calc.setViewport([e.left, e.right, e.bottom, e.top]) : d.warn("Invalid bounds argument. Expected a bounds object with bounds.bottom < bounds.top, and bounds.left < bounds.right. Got " + JSON.stringify(e)),
            this.notifyControllerOfAPICall()
        }
        ,
        b.prototype.setViewport = function(e) {
            4 == e.length && e[1] > e[0] && e[3] > e[2] ? this._calc.setViewport(e) : d.warn("Invalid viewport.  Expected [xmin, xmax, ymin, ymax].  Got " + e),
            this.notifyControllerOfAPICall()
        }
        ,
        b.prototype.resize = function() {
            this.domChangeDetector.checkForChanges()
        }
        ,
        b.prototype.getState = function(e) {
            return this.controller.getState(e)
        }
        ,
        b.prototype.getExpressions = function() {
            return this.getState({
                stripDefaults: !1
            }).expressions.list.map(c.sanitizeItem)
        }
        ,
        b.prototype.setBlank = function(e) {
            this.controller.dispatch({
                type: "set-blank",
                opts: e || {}
            })
        }
        ,
        b.prototype.setState = function(e, t) {
            this.controller.dispatch({
                type: "set-state",
                state: e,
                opts: t || {}
            })
        }
        ,
        b.prototype.undo = function() {
            this.controller.dispatch({
                type: "undo"
            })
        }
        ,
        b.prototype.redo = function() {
            this.controller.dispatch({
                type: "redo"
            })
        }
        ,
        b.prototype.clearHistory = function() {
            this.controller.dispatch({
                type: "clear-undoredo-history"
            })
        }
        ,
        b.prototype.newRandomSeed = function() {
            this.updateSettings({
                randomSeed: v.default()
            })
        }
        ,
        b.prototype.screenshot = function(e) {
            return e || (e = {}),
            e = this._validateBrailleScreenshotOptions(e),
            this._calc.grapher.screenshot(e)
        }
        ,
        b.prototype._getMathAspectRatio = function() {
            var e = this.graphpaperBounds.mathCoordinates
              , t = this._calc.grapher.getProjection().pixelCoordinates
              , o = t.right - t.left
              , r = t.bottom - t.top;
            return e.width / o / (e.height / r)
        }
        ,
        b.prototype.isProjectionUniform = function() {
            return !!this._calc.grapher.getProjection().settings.squareAxes
        }
        ,
        b.prototype._validateBrailleScreenshotOptions = function(e) {
            var t = (e = n.default(e)).braille;
            if (t) {
                var o = t.embosserModel;
                if (!o)
                    return d.warn("Screenshot braille options requires an embosser model to be specified. "),
                    d.warn("Continuing with non-braille screenshot."),
                    delete e.braille,
                    e;
                if ("etc" === o && (t.embosserModel = "etc11"),
                "vpmax" === o && (t.embosserModel = "vpmax11"),
                "etc8" !== t.embosserModel && "etc11" !== t.embosserModel && "vpmax8" !== t.embosserModel && "vpmax11" !== t.embosserModel)
                    return d.warn('Unknown screenshot braille embosser model. Valid models are "etc" and "vpmax".'),
                    d.warn("Continuing with non-braille screenshot."),
                    delete e.braille,
                    e;
                "nemeth" !== t.brailleMode && "ueb" !== t.brailleMode && (d.warn("Screenshot options braille.brailleMode must be nemeth or ueb. Proceeding with nemeth."),
                t.brailleMode = "nemeth"),
                e.width && (d.warn("Screenshot width option is ignored when exporting Braille."),
                delete e.width),
                e.height && (d.warn("Screenshot height option is ignored when exporting Braille."),
                delete e.height),
                e.targetPixelRatio && (d.warn("Screenshot targetPixelRatio option is ignored when exporting Braille."),
                delete e.targetPixelRatio),
                e.preserveAxisNumbers && (d.warn("Screenshot preserveAxisNumbers option is ignored when exporting Braille."),
                delete e.preserveAxisNumbers)
            }
            return e
        }
        ,
        b.prototype._validateAsyncScreenshotOpts = function(e) {
            var o = (e = n.default(e)).mode || "contain"
              , r = e.width || e.height || this.graphpaperBounds.pixelCoordinates.width
              , i = e.height || e.width || this.graphpaperBounds.pixelCoordinates.height
              , s = e.targetPixelRatio || 1;
            s < 1 && (s = 1);
            var a = e.preserveAxisNumbers;
            e.hasOwnProperty("format") || (e.svg ? (e.format = "svg",
            delete e.svg) : e.format = "png");
            var c = e.mathBounds || {}
              , l = this._getMathAspectRatio()
              , h = this.graphpaperBounds.pixelCoordinates.width / this.graphpaperBounds.pixelCoordinates.height
              , d = p.computeBoundsFromScreenshotOpts({
                mode: o,
                width: r,
                height: i,
                currentBounds: this.graphpaperBounds.mathCoordinates,
                graphpaperAspectRatio: h,
                mathAspectRatio: l,
                mathBounds: c
            });
            return {
                opts: t.__assign(t.__assign({}, e), {
                    width: r,
                    height: i,
                    targetPixelRatio: s,
                    preserveAxisNumbers: a
                }),
                mathBounds: d
            }
        }
        ,
        b.prototype.asyncScreenshot = function(e, t) {
            if (arguments.length) {
                if (1 === arguments.length) {
                    if ("function" != typeof e)
                        return void d.warn("asyncScreenshot expects a callback");
                    t = e,
                    e = {}
                }
                e || (e = {}),
                e = this._validateBrailleScreenshotOptions(e);
                var o = this._validateAsyncScreenshotOpts(e)
                  , r = o.opts
                  , n = o.mathBounds;
                S.push({
                    api: this,
                    options: r,
                    mathBounds: n,
                    state: this.getState(),
                    callback: t
                }),
                O()
            } else
                d.warn("asyncScreenshot expects a callback")
        }
        ,
        b.prototype.setOptions = function(e) {
            var t = this._calc.setOptions(e);
            return this.notifyControllerOfAPICall(),
            t
        }
        ,
        b.prototype.focusFirstExpression = function() {
            var e = this.controller.getItemModelByIndex(0);
            e && this.controller.dispatch({
                type: "move-focus-to-item",
                id: e.id,
                where: "end"
            })
        }
        ,
        b.prototype.HelperExpression = function(e) {
            var t = e && e.latex || ""
              , o = new i.UnderscoreModel;
            return o.latex = t,
            this.controller.dispatch({
                type: "add-helper-expression",
                state: {
                    type: "helper-expression",
                    id: this.controller.generateId(),
                    latex: t,
                    proxy: o
                }
            }),
            o
        }
        ,
        b
    }(b.UnderscoreModelShim);
    e.default = B
});
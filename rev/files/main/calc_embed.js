
define('main/calc_embed', ["require", "exports", "main/graph_settings", "tours/tour_manager", "tslib", "jquery", "main/controller", "dcgview", "main/instancehotkeys", "lib/console", "underscore", "lib/defocus-mobile", "graphing-calc/views/main", "underscore_model", "graphing/viewport", "main/evaluator", "graphing/grapher", "core/lib/color-helpers", "api/util", "lib/parse-query-params", "loadcss!tour", "loadcss!calculator_embed", "loadcss!buttons", "loadcss!dcg-normalize", "loadcss!projector_mode", "loadcss!desmos-icons", "loadcss!popovers"], function(require, e, t, o, s, r, a, n, i, l, p, c, d, h, g, u, f, w, m, b) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var v = 0
      , y = function() {
        function e(e, s, l, c) {
            var g = this;
            e || (e = document.createElement("div"));
            var w = document.createElement("div");
            w.className = "dcg-wrapper",
            w.style.width = "100%",
            w.style.height = "100%",
            e.appendChild(w),
            this.__id = v++;
            var m = new t;
            for (var b in this.graphSettings = m,
            l)
                m.config.setProperty(b, l[b]);
            var y = new a.default(m);
            this.controller = y,
            c && y.dispatch({
                type: "ui/container-resized",
                size: c
            }),
            this.rootElt = w,
            this.view = n.mountToNode(d.default, this.rootElt, {
                controller: n.const(y)
            });
            var x = new u.Evaluator(s);
            this.controller.setEvaluator(x),
            this.controller.setRootElt(this.rootElt);
            var C = y.find$(".dcg-grapher")
              , k = new f.Grapher(C,m,this.controller,x);
            this.controller.setGrapher(k),
            m.registerCallbacks(k, x),
            this.controller.initStateStack(),
            m.config.redrawSlowly || (k.redrawSlowly = k.redrawAllLayers),
            x.readEvaluatorConfig = function() {
                return {
                    evaluationMode: "graphing",
                    globalRandomSeed: m.randomSeed,
                    degreeMode: m.degreeMode,
                    viewState: y.getViewState(),
                    intersectId: y.getIntersectId(),
                    restrictedFunctions: m.config.restrictedFunctions,
                    forceEnableGeometryFunctions: m.config.forceEnableGeometryFunctions,
                    distributions: m.config.distributions,
                    pointsOfInterest: m.config.pointsOfInterest,
                    plotSingleVariableImplicitEquations: m.config.plotSingleVariableImplicitEquations,
                    plotImplicits: m.config.plotImplicits,
                    plotInequalities: m.config.plotInequalities,
                    sliders: m.config.sliders,
                    actions: !!m.config.actions
                }
            }
            ,
            x.onEvaluatorResults = function(e) {
                g.controller.dispatch({
                    type: "on-evaluator-changes",
                    changes: e.evaluationStates,
                    timingData: e.timingData,
                    graphData: e.graphData,
                    eventUpdates: e.eventUpdates
                }),
                e.renderSlowly ? k.redrawSlowly() : k.redrawAllLayers()
            }
            ,
            this.unsubFunc = this.controller.subToChanges(function() {
                g.controller.doesDOMHaveSize() && (g.view.update(),
                k.update());
                var e = !1;
                (function() {
                    var e = !1
                      , t = y.computeMajorLayout()
                      , o = {
                        left: t.grapher.left,
                        right: t.grapher.left + t.grapher.width,
                        width: t.grapher.width,
                        top: t.grapher.top,
                        bottom: t.grapher.top + t.grapher.height,
                        height: t.grapher.height
                    }
                      , s = k.getCurrentViewport()
                      , r = {
                        top: s.ymax,
                        bottom: s.ymin,
                        left: s.xmin,
                        right: s.xmax,
                        width: s.xmax - s.xmin,
                        height: s.ymax - s.ymin
                    };
                    p.isEqual(r, S.mathCoordinates) || (S.setProperty("mathCoordinates", r),
                    e = !0);
                    o.height > 0 && o.width > 0 && !p.isEqual(o, S.pixelCoordinates) && (S.setProperty("pixelCoordinates", o),
                    e = !0);
                    return e
                }
                )() && (e = !0),
                function() {
                    var e = !1
                      , t = k.getProjection()
                      , o = k.viewportController.isZoomRestored();
                    o !== m.zoomedDefault && (m.setProperty("zoomedDefault", o),
                    e = !0);
                    var s = t.viewport.isSquare(t.screen);
                    s !== m.squareAxes && (m.setProperty("squareAxes", s),
                    e = !0);
                    return e
                }() && (e = !0),
                e && g.controller.doesDOMHaveSize() && (g.view.update(),
                k.update())
            });
            var S = new h.UnderscoreModel;
            S.setProperties({
                pixelCoordinates: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: 0,
                    height: 0
                },
                mathCoordinates: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: 0,
                    height: 0
                }
            }),
            this.graphpaperBounds = S,
            r(this.rootElt).on("keydown.calculator-" + this.__id, function(e) {
                g.grapher && g.grapher.audioGraph.handleKeydown(e),
                g.instanceHotkeys.handleKeydown(e)
            }),
            r(window).on("dcg-tapstart.calculator-" + this.__id, function(e) {
                var t = r(e.target)
                  , o = !!t.closest(g.rootElt).length
                  , s = e.wasHandled("create-expression-with-keyboard")
                  , a = !!t.closest(".dcg-api-shared-keypad-root").length
                  , n = !!t.hasClass("dcg-shell");
                if (o || a || n || s || y.dispatch({
                    type: "set-none-selected"
                }),
                e.wasHandled("do-not-clear-poi-labels") || (k.traceLayer.clearOpenedPOI(),
                k.redrawAllLayers()),
                y.isInEditListMode()) {
                    var i = 0 === t.closest(".dcg-exppanel").length && 0 === t.closest(".dcg-options-menu").length && 0 === t.closest(".dcg-expression-top-bar").length && 0 === t.closest(".dcg-keypad").length;
                    o && !i || y.dispatch({
                        type: "set-edit-list-mode",
                        isEditListMode: !1,
                        focusExpressionList: !1
                    })
                }
            }),
            this.grapher = k,
            this.evaluator = x,
            this.tourManager = o({
                evaluator: x
            }),
            this.controller.dispatch({
                type: "set-blank"
            });
            var O = {};
            ["degreeMode"].forEach(function(e) {
                void 0 !== l[e] && (O[e] = l[e])
            }),
            m.setGraphSettings(O),
            m.config.expressionsCollapsed && this.setOptions({
                expressionsCollapsed: !0
            }),
            m.config.capExpressionSize && this.setOptions({
                capExpressionSize: !0
            }),
            m.config.hasOwnProperty("pointsOfInterest") && this.setOptions({
                pointsOfInterest: m.config.pointsOfInterest
            }),
            m.config.hasOwnProperty("backgroundColor") && this.setOptions({
                backgroundColor: m.config.backgroundColor
            }),
            m.config.hasOwnProperty("textColor") && this.setOptions({
                textColor: m.config.textColor
            }),
            m.config.observe("language", function() {
                var e = g.controller.getState();
                g.controller.dispatch({
                    type: "set-state",
                    state: e
                }),
                g.tourManager && (g.tourManager.closingMsg = function(e, t) {
                    return "<b>" + e + "</b><br>" + g.controller.s("graphing-tours-label-self-destruct", {
                        seconds: t
                    })
                }
                )
            }),
            m.config.observe("forceLogModeRegressions", function() {
                m.config.forceLogModeRegressions && g.controller.setAllRegressionsToLogMode()
            }),
            this.instanceHotkeys = new i.default(y)
        }
        return e.prototype.setOption = function(e, t) {
            this.controller.getGraphSettings().config.setProperty(e, t)
        }
        ,
        e.prototype.setOptions = function(e) {
            var t, o = this.controller.getGraphSettings().config, r = s.__assign({}, e);
            function a(e) {
                var t = e.notes
                  , o = e.folders
                  , s = e.images;
                return !1 === t || !1 === o || !1 === s
            }
            e.hasOwnProperty("backgroundColor") && (w.isValidHexColor(e.backgroundColor) || (l.warn("Invalid backgroundColor. Background color must be a 3- or 6-character hex color (e.g. #cde or #ffaaaa)"),
            delete r.backgroundColor)),
            e.hasOwnProperty("textColor") && (w.isValidHexColor(e.textColor) || (l.warn("Invalid textColor. Text color must be a 3- or 6-character hex color (e.g. #000 or #001111)"),
            delete r.textColor)),
            e.hasOwnProperty("menus") && (l.warn("Deprecated option: menus. Setting settingsMenu and expressionsTopbar instead."),
            e.hasOwnProperty("settingsMenu") || (r.settingsMenu = !!e.menus),
            e.hasOwnProperty("expressionsTopbar") || (r.expressionsTopbar = !!e.menus)),
            e.hasOwnProperty("solutions") && (l.warn("Deprecated option: solutions. Setting pointsOfInterest instead."),
            e.hasOwnProperty("pointsOfInterest") || (r.pointsOfInterest = !!e.solutions)),
            e.hasOwnProperty("singleVariableSolutions") && l.warn("Deprecated option: singleVariableSolutions has been removed."),
            !1 === e.graphpaper && (e.expressionsCollapsed && (r.expressionsCollapsed = !1,
            l.warn("Cannot set graphpaper: false with expressionsCollapsed: true. Proceeding with expressionsCollapsed: false.")),
            o.expressionsCollapsed && (r.expressionsCollapsed = !1,
            l.warn("Disabling the graphpaper with the expressions list collapsed is not supported.Setting expressionsCollapsed: false.")),
            e.zoomButtons && (r.zoomButtons = !1,
            l.warn("Cannot set graphpaper: false with zoomButtons: true. Proceeding with zoomButtons: false.")),
            e.showResetButtonOnGraphpaper && (r.showResetButtonOnGraphpaper = !1,
            l.warn("Cannot set graphpaper: false with showResetButtonOnGraphpaper: true. Proceeding with showResetButtonOnGraphpaper: false.")),
            o.zoomButtons && (r.zoomButtons = !1,
            l.warn("Disabling the graphpaper with the zoomButtons visible is not supported. Setting zoomButtons: false.")),
            o.showResetButtonOnGraphpaper && (r.showResetButtonOnGraphpaper = !1,
            l.warn("Disabling the graphpaper with the reset button visible is not supported. Setting showResetButtonOnGraphpaper: false."))),
            !1 === o.graphpaper && (e.expressionsCollapsed || e.zoomButtons || e.showResetButtonOnGraphpaper) && (r.graphpaper = !0,
            l.warn("Must have visible graphpaper to proceed. Setting graphpaper: true.")),
            e.lockViewport && e.zoomButtons && (r.zoomButtons = !1,
            l.warn("Cannot set zoomButtons: true and lockViewport: true. Proceeding with zoomButtons: false.")),
            o.lockViewport && e.zoomButtons && (r.lockViewport = !1,
            l.warn("Cannot set zoomButtons: true while the viewport is locked. Setting lockViewport: false.")),
            o.zoomButtons && e.lockViewport && (r.zoomButtons = !1,
            l.warn("Cannot lock the viewport without hiding the zoom buttons. Setting zoomButtons: false."));
            var n = a(e)
              , i = a(s.__assign(s.__assign({}, o), e))
              , p = o.pasteGraphLink
              , c = e.pasteGraphLink;
            for (t in n ? (c || p) && (r.pasteGraphLink = !1,
            l.warn("Cannot disable creating note, folder, or image expressions without disabling graph link pasting. Setting pasteGraphLink: false.")) : c && i && (r.notes = !0,
            r.folders = !0,
            r.images = !0,
            l.warn("Cannot enable graph link pasting while the creation of notes, folders, or images is disable. Setting notes: true, folders: true, images: true.")),
            e.language && (r.language = m.validateLanguage(e.language)),
            r)
                if (r.hasOwnProperty(t))
                    switch (t) {
                    case "expressionsCollapsed":
                        this.setOption("expressionsCollapsed", !!r.expressionsCollapsed),
                        r.expressionsCollapsed ? this.controller.dispatch({
                            type: "hide-expressions-list",
                            focusShowIcon: !1
                        }) : this.controller.dispatch({
                            type: "show-expressions-list",
                            focusHideIcon: !1
                        });
                        break;
                    case "qwertyKeyboard":
                        this.setOption("qwertyKeyboard", !!r.qwertyKeyboard),
                        this.controller.isLetterKeypadOpen() && this.controller.dispatch({
                            type: "keypad/abc"
                        });
                        break;
                    case "degreeMode":
                        this.setOption("degreeMode", !!r.degreeMode),
                        this.controller.getGraphSettings().setGraphSettings({
                            degreeMode: !!r.degreeMode
                        });
                        break;
                    case "actions":
                        if (void 0 === (d = r[t]) || d === this.controller.getGraphSettings().config.actions)
                            break;
                        this.setOption(t, d),
                        this.setState(this.getState(), {
                            allowUndo: !0
                        });
                        break;
                    case "keypad":
                    case "graphpaper":
                    case "expressions":
                    case "settingsMenu":
                    case "zoomButtons":
                    case "showResetButtonOnGraphpaper":
                    case "expressionsTopbar":
                    case "pointsOfInterest":
                    case "trace":
                    case "border":
                    case "lockViewport":
                    case "administerSecretFolders":
                    case "advancedStyling":
                    case "images":
                    case "imageUploadCallback":
                    case "folders":
                    case "notes":
                    case "sliders":
                    case "links":
                    case "restrictedFunctions":
                    case "forceEnableGeometryFunctions":
                    case "distributions":
                    case "pasteGraphLink":
                    case "pasteTableData":
                    case "clearIntoDegreeMode":
                    case "autosize":
                    case "plotSingleVariableImplicitEquations":
                    case "plotImplicits":
                    case "plotInequalities":
                    case "colors":
                    case "branding":
                    case "disableScrollFix":
                    case "invertedColors":
                    case "fontSize":
                    case "projectorMode":
                    case "language":
                    case "redrawSlowly":
                    case "onlyTraceSelected":
                    case "disableMouseInteractions":
                    case "nativeOnscreenKeypad":
                    case "functionDefinition":
                    case "plaidMode":
                    case "pasteGraphLinkCallback":
                    case "editOnWeb":
                    case "crossOriginSaveTest":
                    case "backgroundColor":
                    case "textColor":
                    case "enableTabindex":
                    case "audioTraceReverseExpressions":
                    case "showHamburger":
                    case "decimalToFraction":
                    case "capExpressionSize":
                    case "transparentBackground":
                    case "pauseWhenOffscreen":
                    case "brailleMode":
                    case "sixKeyInput":
                    case "brailleControls":
                    case "zoomFit":
                    case "forceLogModeRegressions":
                        var d;
                        void 0 !== (d = r[t]) && this.setOption(t, d);
                        break;
                    default:
                        return t
                    }
        }
        ,
        e.prototype.setViewport = function(e) {
            this.grapher.viewportController.setViewport(new g.Viewport(e[0],e[1],e[2],e[3]))
        }
        ,
        e.prototype.resize = function(e) {
            e && this.controller.dispatch({
                type: "ui/container-resized",
                size: e
            })
        }
        ,
        e.prototype.interceptTouch = function() {
            var e = r(this.rootElt)
              , t = e.find(".dcg-expression-top-bar");
            t.add(e.find(".dcg-keypad")),
            t.length && (t.on("touchstart", function(e) {
                r(e.target).is("input, textarea") || e.preventDefault()
            }),
            t.on("touchend", function(e) {
                r(e.target).closest(".dcg-do-not-blur").length > 0 || c.default()
            }))
        }
        ,
        e.prototype.destroy = function() {
            r(window).off(".calculator-" + this.__id);
            var e = r(this.rootElt);
            e.off(".calculator-" + this.__id),
            this.unsubFunc(),
            this.graphSettings.unobserveAll(),
            this.evaluator && this.evaluator.destroy(),
            this.grapher && this.grapher.remove(),
            n.unmountFromNode(this.rootElt),
            e.remove()
        }
        ,
        e.prototype.tick = function(e, t) {
            t || (this.controller.handleTick(e),
            this.controller.updateRenderShellsAfterDispatch()),
            this.evaluator.tick(),
            this.grapher && this.grapher.tick(e)
        }
        ,
        e.prototype.getState = function(e) {
            return this.controller.getState(e)
        }
        ,
        e.prototype.setBlank = function(e) {
            this.controller.dispatch({
                type: "set-blank",
                opts: e || {}
            })
        }
        ,
        e.prototype.setState = function(e, t) {
            this.controller.dispatch({
                type: "set-state",
                state: e,
                opts: t || {}
            })
        }
        ,
        e
    }();
    function x() {
        var e = r('<div style="z-index:99999; position: absolute; left: 0; top: 0;background:#FFF">waiting...</div>').appendTo("body")
          , t = window
          , o = [];
        t.Calc.controller.onEvaluatorChangesSpy = function() {
            o.push(Date.now())
        }
        ,
        setInterval(function() {
            for (var t = Date.now(); t - o[0] > 1e3; )
                o.shift();
            e.text(o.length + " fps")
        }, 100)
    }
    function C() {
        var e, t = r('<div style="z-index:99999; position: absolute; left: 0; top: 0;background:#FFF">waiting...</div>').appendTo("body"), o = window, s = [], a = 0;
        o.Calc.controller.onEvaluatorChangesSpy = function(e, t) {
            var o = t.timeInWorker;
            s[a % 100] = o,
            a += 1
        }
        ,
        function o() {
            cancelAnimationFrame(e),
            e = requestAnimationFrame(o),
            function() {
                for (var e = 0, o = 0, r = s; o < r.length; o++)
                    e += r[o];
                var a = e / s.length;
                t.text(a.toFixed(1) + " ms")
            }()
        }()
    }
    if (e.default = y,
    !!b.getQueryParams().simulationFPS)
        var k = setInterval(function() {
            window.Calc && (clearInterval(k),
            setTimeout(x, 1e3))
        }, 1);
    if (!!b.getQueryParams().timeInWorker)
        k = setInterval(function() {
            window.Calc && (clearInterval(k),
            setTimeout(C, 1e3))
        }, 1)
});
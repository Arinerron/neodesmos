
define('graphing/audiograph', ["require", "exports", "tslib", "browser", "keys", "lib/aria", "graphing/audiographnavigator", "graphing/tonegenerator", "core/types/graphmode", "core/lib/label", "core/math/poi-type", "graphing-calc/models/expression", "graphing-calc/models/table", "expressions/colors", "lib/mathspeak"], function(require, t, e, r, o, i, a, n, s, l, c, p, u, h, d) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.audioSpeedOptions = void 0,
    t.audioSpeedOptions = [{
        speed: 150,
        displayedSpeed: "1/4 x"
    }, {
        speed: 100,
        displayedSpeed: "1/2 x"
    }, {
        speed: 50,
        displayedSpeed: "1 x"
    }, {
        speed: 30,
        displayedSpeed: "2 x"
    }, {
        speed: 16,
        displayedSpeed: "4 x"
    }];
    var g = function() {
        function g(t, e) {
            var r = this;
            this.grapher = e,
            this.controller = t,
            this.audioTraceActive = !1,
            this.isTracing = !1,
            this.wasFocusInExpressionsView = !1,
            this.focusedCell = void 0,
            this.sliderTraceActive = !1,
            this.sliderIndex = 0,
            this.sliderArray = [],
            this.lastSpokenBranch = 1,
            this.agNavigator = new a.default(t,this,this.grapher),
            this.tonegen = new n.default({
                audioPointMove: function(t, e) {
                    r.agNavigator.drawTrace(r.agNavigator.getPoint(t, e))
                },
                animationFinished: function() {
                    r.recomputePoints(),
                    r.isTracing && (r.isTracing = !1,
                    r.controller.dispatch({
                        type: "render"
                    }))
                }
            }),
            this.audioSpeedIndex = 2,
            this.tonegen.suspend()
        }
        return g.prototype.remove = function() {}
        ,
        g.prototype.handleKeydown = function(t) {
            var e = t.altKey || t.metaKey
              , i = t.altKey && !t.metaKey && !t.ctrlKey && !t.shiftKey
              , a = t.ctrlKey && !t.metaKey && !t.altKey
              , n = r.IS_APPLE ? a : e
              , s = n && (61 === t.which || 187 === t.which)
              , l = n && !t.shiftKey && (173 === t.which || 189 === t.which)
              , c = n && !t.shiftKey && "0" === o.lookupChar(t);
            i && "S" === o.lookupChar(t) ? this.agNavigator.getSelectedItem() && (this.audioTraceActive || this.isFocusInExpressionsView()) && (t.preventDefault(),
            t.stopPropagation(),
            this.describeCurve()) : i && "T" === o.lookupChar(t) ? (t.preventDefault(),
            t.stopPropagation(),
            this.toggleAudioTrace()) : s ? (t.preventDefault(),
            t.stopPropagation(),
            this.zoom("in")) : l ? (t.preventDefault(),
            t.stopPropagation(),
            this.zoom("out")) : c ? (t.preventDefault(),
            t.stopPropagation(),
            this.zoom("default")) : this.audioTraceActive && (this.sliderTraceActive ? this.sliderTraceKeydown(t) : this.audioTraceKeydown(t))
        }
        ,
        g.prototype.sliderTraceKeydown = function(t) {
            var e = t.altKey || t.metaKey
              , r = !e && !t.ctrlKey && !t.shiftKey;
            r && o.lookup(t) === o.LEFT || "J" === o.lookupChar(t) ? (t.preventDefault(),
            t.stopPropagation(),
            this.decrementSliderValue()) : r && o.lookup(t) === o.RIGHT || "L" === o.lookupChar(t) ? (t.preventDefault(),
            t.stopPropagation(),
            this.incrementSliderValue()) : r && o.lookup(t) === o.PAGEDOWN ? (t.preventDefault(),
            t.stopPropagation(),
            this.decrementBigSliderValue()) : r && o.lookup(t) === o.PAGEUP ? (t.preventDefault(),
            t.stopPropagation(),
            this.incrementBigSliderValue()) : e || o.lookup(t) !== o.DOWN && (t.shiftKey || o.lookup(t) !== o.TAB) && "K" !== o.lookupChar(t) ? !e && (o.lookup(t) === o.UP || t.shiftKey && o.lookup(t) === o.TAB || "I" === o.lookupChar(t)) ? (t.preventDefault(),
            t.stopPropagation(),
            this.prevSlider()) : r && o.lookup(t) === o.HOME || "U" === o.lookupChar(t) ? (t.preventDefault(),
            t.stopPropagation(),
            this.sliderMin()) : r && o.lookup(t) === o.END || "N" === o.lookupChar(t) ? (t.preventDefault(),
            t.stopPropagation(),
            this.sliderMax()) : (this.stopAnimations(),
            this.audioTraceKeydown(t)) : (t.preventDefault(),
            t.stopPropagation(),
            this.nextSlider())
        }
        ,
        g.prototype.audioTraceKeydown = function(t) {
            var e = t.altKey || t.metaKey
              , r = e && !t.ctrlKey && !t.shiftKey
              , a = !e && !t.ctrlKey && !t.shiftKey
              , s = o.lookupChar(t);
            if (o.lookup(t) === o.UP && r)
                t.preventDefault(),
                t.stopPropagation(),
                i.clear(),
                this.agNavigator.prevCurve();
            else if (o.lookup(t) === o.DOWN && r)
                t.preventDefault(),
                t.stopPropagation(),
                i.clear(),
                this.agNavigator.nextCurve();
            else if (a && o.lookup(t) === o.LEFT || o.lookup(t) === o.UP || "J" === s)
                t.preventDefault(),
                t.stopPropagation(),
                this.controller.dispatch({
                    type: "keypad/audio-trace",
                    command: "previous-point"
                });
            else if (a && o.lookup(t) === o.RIGHT || o.lookup(t) === o.DOWN || "L" === s)
                t.preventDefault(),
                t.stopPropagation(),
                this.controller.dispatch({
                    type: "keypad/audio-trace",
                    command: "next-point"
                });
            else if (e || o.lookup(t) !== o.PAGEDOWN && (t.shiftKey || o.lookup(t) !== o.TAB) && "I" !== s)
                if (!e && (o.lookup(t) === o.PAGEUP || t.shiftKey && o.lookup(t) === o.TAB || "K" === s))
                    t.preventDefault(),
                    t.stopPropagation(),
                    this.reportAndMoveToPrevPOI();
                else if (a && o.lookup(t) === o.HOME || "U" === s)
                    t.preventDefault(),
                    t.stopPropagation(),
                    this.reportAndMoveToFirstPoint();
                else if (a && o.lookup(t) === o.END || "N" === s)
                    t.preventDefault(),
                    t.stopPropagation(),
                    this.reportAndMoveToLastPoint();
                else if (a && "X" === s)
                    t.preventDefault(),
                    t.stopPropagation(),
                    this.reportX();
                else if (a && "P" === s)
                    t.preventDefault(),
                    t.stopPropagation(),
                    this.reportPOICount();
                else if (a && "Y" === s)
                    t.preventDefault(),
                    t.stopPropagation(),
                    this.reportY();
                else if (a && "T" === s)
                    t.preventDefault(),
                    t.stopPropagation(),
                    this.reportType();
                else if (a && "B" === s)
                    t.preventDefault(),
                    t.stopPropagation(),
                    this.reportBranch();
                else if (a && "O" === s)
                    t.preventDefault(),
                    t.stopPropagation(),
                    this.reportAndMoveToOrigin();
                else if (a && "H" === s)
                    t.preventDefault(),
                    t.stopPropagation(),
                    this.hearGraph();
                else if (a && "string" == typeof s && s >= "0" && s <= "9") {
                    t.preventDefault(),
                    t.stopPropagation(),
                    i.clear(),
                    this.tonegen.stop();
                    var l = this.agNavigator.getCurrentSketch();
                    if (l) {
                        for (var c = void 0, p = c = 48 === t.which ? 9 : t.which - 49, u = -1, h = 0; h < l.branches.length; h++)
                            if (n.canPlayBranch(l.branches[h]) && (p -= 1),
                            p < 0) {
                                u = h;
                                break
                            }
                        u >= 0 ? this.tonegen.getPlaybackSupported() ? this.tonegen.playBranchByIndex(l, u, this.grapher.getCurrentViewport()) : i.alert(this.controller.s("graphing-calculator-narration-audio-trace-unable-to-play")) : i.alert(this.controller.s("graphing-calculator-narration-audio-trace-branch-not-found", {
                            branch: c + 1
                        }))
                    } else
                        i.alert(this.controller.s("graphing-calculator-narration-audio-trace-no-graph-selected"))
                } else
                    e && "string" == typeof s && s >= "1" && s <= "5" ? (t.preventDefault(),
                    t.stopPropagation(),
                    this.controller.dispatch({
                        type: "set-audio-trace-speed",
                        speed: parseInt(s, 10) - 1
                    })) : t.altKey || t.ctrlKey || t.metaKey || "V" !== s ? a && "A" === s ? (t.preventDefault(),
                    t.stopPropagation(),
                    i.clear(),
                    this.queueAnimatingPoints(!0),
                    i.alert()) : a && "S" === s && this.controller.isListEnabled() ? (t.preventDefault(),
                    t.stopPropagation(),
                    this.toggleSliderTrace()) : a && "C" === s ? (t.preventDefault(),
                    t.stopPropagation(),
                    this.reportColor()) : a && this.exitAudioTrace() : (t.preventDefault(),
                    t.stopPropagation(),
                    t.shiftKey ? this.controller.dispatch({
                        type: "keypad/audio-trace",
                        command: "volume-down"
                    }) : this.controller.dispatch({
                        type: "keypad/audio-trace",
                        command: "volume-up"
                    }));
            else
                t.preventDefault(),
                t.stopPropagation(),
                this.reportAndMoveToNextPOI();
            this.controller.dispatch({
                type: "render"
            })
        }
        ,
        g.prototype.describeCurve = function() {
            var t = this;
            i.clear();
            var e = this.agNavigator.getCurrentSketch();
            if (e) {
                i.queue(this.controller.s("graphing-calculator-narration-audio-trace-description-color", {
                    color: h.getColorName(this.controller, e.color)
                }));
                var r = n.getReportedBranch(e, e.branches.length - 1);
                r > 1 && i.queue(this.controller.s("graphing-calculator-narration-audio-trace-description-branch-count", {
                    branches: r
                }));
                for (var o = !1, a = !1, l = 0, p = e.branches; l < p.length; l++) {
                    var u = p[l];
                    if (1 === r && u.segments.length > 0 && u.hasOwnProperty("operator")) {
                        if (u.graphMode === s.Y) {
                            if (">" === u.operator || ">=" === u.operator) {
                                i.queue(this.controller.s("graphing-calculator-narration-audio-trace-description-shading-above"));
                                break
                            }
                            if ("<" === u.operator || "<=" === u.operator) {
                                i.queue(this.controller.s("graphing-calculator-narration-audio-trace-description-shading-below"));
                                break
                            }
                        } else if (u.graphMode === s.X) {
                            if (">" === u.operator || ">=" === u.operator) {
                                i.queue(this.controller.s("graphing-calculator-narration-audio-trace-description-shading-right"));
                                break
                            }
                            if ("<" === u.operator || "<=" === u.operator) {
                                i.queue(this.controller.s("graphing-calculator-narration-audio-trace-description-shading-left"));
                                break
                            }
                        }
                    } else
                        r > 1 && (u.graphMode === s.Y || u.graphMode === s.X ? "<" !== u.operator && "<=" !== u.operator && ">" !== u.operator && ">=" !== u.operator || (o = !0) : u.graphMode === s.POLYGONFILL && (a = !0))
                }
                o && a && i.queue(this.controller.s("graphing-calculator-narration-audio-trace-description-shading-in-regions"));
                var d = e.getPOI();
                if (d.length > 0) {
                    for (var g = [], y = 0, f = d; y < f.length; y++) {
                        var v = f[y];
                        void 0 === g[v.type] ? g[v.type] = 1 : g[v.type] += 1
                    }
                    g.forEach(function(e, r) {
                        r === c.INTERSECTION ? i.queue(1 === e ? t.controller.s("graphing-calculator-narration-audio-trace-description-one-intersection") : t.controller.s("graphing-calculator-narration-audio-trace-description-multiple-intersections", {
                            count: e
                        })) : r === c.ZERO ? i.queue(1 === e ? t.controller.s("graphing-calculator-narration-audio-trace-description-one-root") : t.controller.s("graphing-calculator-narration-audio-trace-description-multiple-roots", {
                            count: e
                        })) : r === c.INTERCEPT ? i.queue(1 === e ? t.controller.s("graphing-calculator-narration-audio-trace-description-one-intercept") : t.controller.s("graphing-calculator-narration-audio-trace-description-multiple-intercepts", {
                            count: e
                        })) : r === c.EXTREMUM ? i.queue(1 === e ? t.controller.s("graphing-calculator-narration-audio-trace-description-one-extremum") : t.controller.s("graphing-calculator-narration-audio-trace-description-multiple-extrema", {
                            count: e
                        })) : r === c.LABEL && i.queue(1 === e ? t.controller.s("graphing-calculator-narration-audio-trace-description-one-label") : t.controller.s("graphing-calculator-narration-audio-trace-description-multiple-labels", {
                            count: e
                        }))
                    })
                }
                i.alert()
            } else
                i.alert(this.controller.s("graphing-calculator-narration-audio-trace-description-unavailable"))
        }
        ,
        g.prototype.queueCoordinates = function(t, e, r) {
            if (void 0 === r && (r = !1),
            t) {
                var o = this.agNavigator.getCurrentSketch();
                (t.hasOwnProperty("branch") && o && o.branches.length > 1 && this.lastSpokenBranch !== t.reportedBranch || "branch" === e) && "number" == typeof t.reportedBranch && i.queue(this.controller.s("graphing-calculator-narration-audio-trace-property-branch-number", {
                    branch: t.reportedBranch
                })),
                this.lastSpokenBranch = t.reportedBranch ? t.reportedBranch : t.branch + 1,
                t.hasOwnProperty("type") && !e ? i.queue(this.controller.s("graphing-calculator-narration-audio-trace-property-type-before-coordinates", {
                    type: this.describePOI(t)
                })) : "type" === e && i.queue(this.describePOI(t)),
                e && "x" !== e || i.queue(this.controller.s("graphing-calculator-narration-audio-trace-property-x", {
                    x: l.value(t.x, this.agNavigator.getXScale()).ariaString
                })),
                e && "y" !== e || i.queue(this.controller.s("graphing-calculator-narration-audio-trace-property-y", {
                    y: l.value(t.y, this.agNavigator.getYScale()).ariaString
                })),
                r && i.alert()
            }
        }
        ,
        g.prototype.describePOI = function(t) {
            if (t.typeChain) {
                for (var e = [], r = 0; r < t.typeChain.length; r++)
                    e.push(this.poiTypeToText(t, r));
                return e.join(", ")
            }
            return this.poiTypeToText(t)
        }
        ,
        g.prototype.poiTypeToText = function(t, e) {
            switch (e && t.typeChain ? t.typeChain[e] : t.type) {
            case c.INTERSECTION:
                var r = this.getIntersectingCurves(t);
                return "" !== r ? this.controller.s("graphing-calculator-narration-audio-trace-point-type-intersection-with-curves", {
                    curves: r
                }) : this.controller.s("graphing-calculator-narration-audio-trace-point-type-intersection");
            case c.ZERO:
                return this.controller.s("graphing-calculator-narration-audio-trace-point-type-root");
            case c.INTERCEPT:
                return this.controller.s("graphing-calculator-narration-audio-trace-point-type-intercept");
            case c.EXTREMUM:
                return this.controller.s("graphing-calculator-narration-audio-trace-point-type-extremum");
            case c.DEFINITION:
                return this.controller.s("graphing-calculator-narration-audio-trace-point-type-definition");
            case c.TRACE:
                return this.controller.s("graphing-calculator-narration-audio-trace-point-type-trace");
            case c.LABEL:
                return this.controller.s("graphing-calculator-narration-audio-trace-point-type-label");
            default:
                return this.controller.s("graphing-calculator-narration-audio-trace-point-type-not-a-poi")
            }
        }
        ,
        g.prototype.getIntersectingCurves = function(t) {
            return t && t.intersects ? this.getExpressionAriaLabel(t.intersects) : ""
        }
        ,
        g.prototype.getExpressionAriaLabel = function(t) {
            var e = this.controller.getItemModel(t);
            return e ? "expression" === e.type && e.label ? d.getMathspeakFromText(e.label) : this.controller.isItemSecret(e.id) ? this.controller.s("graphing-calculator-narration-audio-trace-secret-expression", {
                index: e.secretIndex
            }) : "table" === e.type && this.focusedCell ? this.controller.s("graphing-calculator-narration-audio-trace-expression-with-column", {
                index: e.displayIndex,
                column: this.focusedCell.location.column + 1
            }) : this.controller.s("shared-calculator-narration-expression-index", {
                index: e.displayIndex
            }) : ""
        }
        ,
        g.prototype.exitAudioTrace = function(t) {
            if (this.audioTraceActive) {
                if (this.audioTraceActive = !1,
                this.controller.isKeypadEnabled() && this.controller.dispatch({
                    type: "keypad/123"
                }),
                t || (t = this.controller.s("graphing-calculator-text-audio-trace-off")),
                this.controller.dispatch({
                    type: "toast/close"
                }),
                this.wasFocusInExpressionsView) {
                    var r = this.agNavigator.getSelectedItem();
                    r && this.controller.isItemSelectable(r.id) || (r = this.controller.getFirstFullyVisibleItem()),
                    r && this.controller.isItemSelectable(r.id) && this.controller.dispatch({
                        type: "move-focus-to-item",
                        id: r.id,
                        where: "table" === r.type && void 0 !== this.focusedCell ? e.__assign({
                            location: "cell"
                        }, this.focusedCell.location) : "end"
                    })
                }
                this.wasFocusInExpressionsView = !1,
                this.focusedCell = void 0,
                this.stopAnimations(),
                this.sliderTraceActive = !1,
                this.sliderIndex = 0,
                this.tonegen.stop(),
                this.tonegen.suspend(),
                this.agNavigator.reset(),
                this.lastSpokenBranch = 1,
                this.grapher.traceLayer.setTraceInfo(void 0),
                this.grapher.redrawAllLayers(),
                i.alert(t),
                this.resumeAnimations()
            }
        }
        ,
        g.prototype.isFocusInExpressionsView = function() {
            return !!this.controller.getFocusedItem()
        }
        ,
        g.prototype.canAudioTraceCurrentExp = function() {
            var t = this.agNavigator.getSelectedItem();
            return !!t && ("table" === t.type ? !!this.agNavigator.getCurrentSketch() : this.agNavigator.canTrace(t))
        }
        ,
        g.prototype.enterAudioTrace = function(t) {
            var e, o = this, a = this.agNavigator.getSelectedItem(), n = a && "table" !== a.type && !this.agNavigator.canTrace(a) ? this.getExpressionAriaLabel(a.id) : void 0, l = !1;
            if (this.audioTraceActive || (this.wasFocusInExpressionsView = this.isFocusInExpressionsView(),
            a && n && i.queue(this.controller.s("graphing-calculator-narration-audio-trace-unsupported-expression", {
                expression: n
            })),
            l = !!n || !this.wasFocusInExpressionsView),
            l)
                e = this.agNavigator.getFirstTraceableSketch({
                    selectAssociatedExpression: !0
                });
            else if (!n) {
                if (a && "expression" === a.type && a.formula && a.formula.error)
                    return this.exitAudioTrace(),
                    this.controller.dispatch({
                        type: "toast/show",
                        toast: {
                            message: this.controller.s("graphing-calculator-text-audio-trace-no-graph-to-trace")
                        }
                    });
                if (a && "table" === a.type) {
                    var c = u.getSelectedCell(a);
                    this.focusedCell && this.focusedCell.tableId === a.id && (!c || c.column === this.focusedCell.location.column && c.row === this.focusedCell.location.row) || (this.focusedCell = void 0 !== c ? {
                        tableId: a.id,
                        location: c
                    } : void 0)
                } else
                    this.focusedCell = void 0;
                e = this.agNavigator.getCurrentSketch()
            }
            if (!e)
                return this.agNavigator.reset(),
                this.lastSpokenBranch = 1,
                this.exitAudioTrace(),
                this.controller.dispatch({
                    type: "toast/show",
                    toast: {
                        message: this.controller.s("graphing-calculator-text-audio-trace-no-graph-to-trace")
                    }
                });
            var p = e.branches[0].graphMode;
            return p === s.IMPLICIT ? (this.exitAudioTrace(),
            this.controller.dispatch({
                type: "toast/show",
                toast: {
                    message: this.controller.s("graphing-calculator-text-audio-trace-no-implicit-support")
                }
            })) : p === s.PARAMETRIC ? (this.exitAudioTrace(),
            this.controller.dispatch({
                type: "toast/show",
                toast: {
                    message: this.controller.s("graphing-calculator-text-audio-trace-no-parametric-support")
                }
            })) : p === s.POLAR ? (this.exitAudioTrace(),
            this.controller.dispatch({
                type: "toast/show",
                toast: {
                    message: this.controller.s("graphing-calculator-text-audio-trace-no-polar-support")
                }
            })) : (this.agNavigator.reset(),
            this.agNavigator.computeStepSizes(),
            this.lastSpokenBranch = 1,
            this.grapher.traceLayer.clearOpenedPOI(),
            this.grapher.redrawAllLayers(),
            this.audioTraceActive || (this.controller.isKeypadEnabled() || this.controller.dispatch({
                type: "toast/show",
                toast: {
                    message: this.controller.s("graphing-calculator-text-audio-trace-on"),
                    noAria: !0,
                    onHide: function() {
                        return o.exitAudioTrace()
                    },
                    hideAfter: 0
                }
            }),
            n && e && i.queue(this.controller.s("graphing-calculator-narration-audio-trace-tracing-different-expression", {
                expression: this.getExpressionAriaLabel(e.id)
            })),
            i.queue(this.controller.s("graphing-calculator-text-audio-trace-on")),
            this.pauseAnimations(),
            this.queueAnimatingPoints(!1),
            this.tonegen.resume(),
            t && t.fromKeypad || (i.queue(this.controller.s("graphing-calculator-narration-audio-trace-instructions-use-arrow-keys")),
            this.tonegen.getPlaybackSupported() && i.queue(this.controller.s("graphing-calculator-narration-audio-trace-instructions-hear-graph")),
            this.agNavigator.getTraceableExpressionCount() > 1 && (r.IS_APPLE ? i.queue(this.controller.s("graphing-calculator-narration-audio-trace-instructions-expression-navigation-mac")) : i.queue(this.controller.s("graphing-calculator-narration-audio-trace-instructions-expression-navigation-windows"))),
            r.IS_APPLE ? i.queue(this.controller.s("graphing-calculator-narration-audio-trace-instructions-disable-mac")) : i.queue(this.controller.s("graphing-calculator-narration-audio-trace-instructions-disable-windows"))),
            this.wasFocusInExpressionsView && (this.controller.find$(".dcg-graph-outer").one("focusin", function() {
                setTimeout(function() {
                    i.alert()
                }, 0)
            }),
            this.controller.focusGraphPaper())),
            this.agNavigator.moveToOrigin(),
            i.queue(this.getExpressionAriaLabel(e.id)),
            this.reportAudioTrace({
                playSound: !1
            }),
            this.wasFocusInExpressionsView || i.alert(),
            this.audioTraceActive = !0,
            void (this.controller.isKeypadEnabled() && this.controller.dispatch({
                type: "keypad/audio"
            })))
        }
        ,
        g.prototype.checkIfSelectedItemChanged = function(t) {
            this.lastSelectedId !== t && (this.lastSelectedId = t,
            this.audioTraceActive && (t ? (i.queue(this.getExpressionAriaLabel(t)),
            this.exitSliderTrace(),
            this.agNavigator.updatePOI(),
            this.agNavigator.moveToOrigin(),
            this.reportAudioTrace(),
            i.alert()) : this.exitAudioTrace()))
        }
        ,
        g.prototype.pauseAnimations = function() {
            var t = this;
            this.sliderArray.length = 0,
            this.controller.getAllModelsWithSliders().forEach(function(e) {
                e.slider.isPlaying && (t.controller.dispatch({
                    type: "set-slider-isplaying",
                    id: e.id,
                    isPlaying: !1
                }),
                t.sliderArray.push(e))
            })
        }
        ,
        g.prototype.resumeAnimations = function() {
            if (0 !== this.sliderArray.length) {
                for (var t = 0; t < this.sliderArray.length; t++) {
                    var e = this.sliderArray[t];
                    !0 !== e.slider.isPlaying && this.controller.dispatch({
                        type: "set-slider-isplaying",
                        id: e.id,
                        isPlaying: !0
                    })
                }
                this.sliderArray.length = 0
            }
        }
        ,
        g.prototype.stopAnimations = function() {
            var t = this;
            this.controller.getAllModelsWithSliders().forEach(function(e) {
                e.slider.isPlaying && t.controller.dispatch({
                    type: "set-slider-isplaying",
                    id: e.id,
                    isPlaying: !1
                })
            })
        }
        ,
        g.prototype.getAnimatingVars = function() {
            for (var t = [], e = 0; e < this.sliderArray.length; e++)
                t.push('"' + p.getAssignment(this.sliderArray[e]) + '"');
            return t
        }
        ,
        g.prototype.hasActiveSliders = function() {
            for (var t = this.controller.getAllModelsWithSliders(), e = 0; e < t.length; e++)
                if (t[e].slider.isPlaying)
                    return !0;
            return !1
        }
        ,
        g.prototype.queueAnimatingPoints = function(t) {
            1 === this.sliderArray.length ? i.queue(this.controller.s("graphing-calculator-narration-audio-trace-one-slider-paused")) : this.sliderArray.length > 1 ? i.queue(this.controller.s("graphing-calculator-narration-audio-trace-multiple-sliders-paused", {
                sliders: this.sliderArray.length
            })) : t && i.queue(this.controller.s("graphing-calculator-narration-audio-trace-no-sliders-paused"))
        }
        ,
        g.prototype.queueSliderLatex = function() {
            this.hasActiveSliders() || this.tonegen.stop();
            var t = this.getSelectedSlider();
            t ? i.queue(t.latex) : i.queue(this.controller.s("graphing-calculator-narration-audio-trace-slider-value-unknown"))
        }
        ,
        g.prototype.getSelectedSlider = function() {
            var t = this.controller.getAllModelsWithSliders();
            return this.sliderIndex <= t.length - 1 ? t[this.sliderIndex] : null
        }
        ,
        g.prototype.incrementSliderValue = function() {
            this.adjustSlider("up")
        }
        ,
        g.prototype.decrementSliderValue = function() {
            this.adjustSlider("down")
        }
        ,
        g.prototype.incrementBigSliderValue = function() {
            this.adjustSlider("bigup")
        }
        ,
        g.prototype.decrementBigSliderValue = function() {
            this.adjustSlider("bigdown")
        }
        ,
        g.prototype.nextSlider = function() {
            this.adjustSlider("next")
        }
        ,
        g.prototype.prevSlider = function() {
            this.adjustSlider("prev")
        }
        ,
        g.prototype.sliderMin = function() {
            this.adjustSlider("min")
        }
        ,
        g.prototype.sliderMax = function() {
            this.adjustSlider("max")
        }
        ,
        g.prototype.adjustSlider = function(t) {
            var e = this.getSelectedSlider();
            if (e) {
                var r = e.latex
                  , o = this.controller.getAllModelsWithSliders().length;
                switch (t) {
                case "up":
                case "down":
                case "bigup":
                case "bigdown":
                case "min":
                case "max":
                    this.controller.dispatch({
                        type: "adjust-slider-by-keyboard",
                        id: e.id,
                        adjustment: t
                    }),
                    this.queueSliderLatex(),
                    i.alert();
                    break;
                case "next":
                    return this.sliderIndex++,
                    this.sliderIndex >= o && (i.queue(this.controller.s("graphing-calculator-narration-audio-trace-last-slider")),
                    this.sliderIndex = o - 1),
                    this.queueSliderLatex(),
                    void i.alert();
                case "prev":
                    return this.sliderIndex--,
                    this.sliderIndex < 0 && (i.queue(this.controller.s("graphing-calculator-narration-audio-trace-first-slider")),
                    this.sliderIndex = 0),
                    this.queueSliderLatex(),
                    void i.alert()
                }
                e.slider.isPlaying || r === e.latex || (this.queueSliderLatex(),
                i.alert())
            } else
                i.queue(this.controller.s("graphing-calculator-narration-audio-trace-cannot-change-slider-value"))
        }
        ,
        g.prototype.toggleAudioTrace = function() {
            this.audioTraceActive ? this.exitAudioTrace() : this.enterAudioTrace()
        }
        ,
        g.prototype.toggleSliderTrace = function() {
            this.sliderTraceActive ? this.exitSliderTrace() : this.enterSliderTrace()
        }
        ,
        g.prototype.enterSliderTrace = function() {
            this.sliderTraceActive || (this.sliderIndex = 0,
            0 !== this.controller.getAllModelsWithSliders().length ? (i.queue(this.controller.s("graphing-calculator-narration-slider-trace-on")),
            this.queueSliderLatex(),
            this.sliderTraceActive = !0) : (i.queue(this.controller.s("graphing-calculator-narration-slider-trace-no-sliders")),
            this.sliderTraceActive = !1),
            i.alert())
        }
        ,
        g.prototype.exitSliderTrace = function() {
            this.sliderTraceActive && (i.queue(this.controller.s("graphing-calculator-narration-slider-trace-off")),
            this.sliderTraceActive = !1,
            this.sliderIndex = 0,
            i.alert())
        }
        ,
        g.prototype.recomputePoints = function() {
            this.audioTraceActive && (this.tonegen.isAnimating() || (this.agNavigator.updatePOI(),
            this.agNavigator.updateSampledPoints(),
            this.agNavigator.updateCurrentPoint(),
            this.agNavigator.resetTracePoint(),
            this.agNavigator.computeStepSizes()))
        }
        ,
        g.prototype.reportAndMoveToPrevPoint = function() {
            i.clear(),
            this.agNavigator.prevPoint(),
            this.reportAudioTrace(),
            this.controller.dispatch({
                type: "render"
            })
        }
        ,
        g.prototype.reportAndMoveToNextPoint = function() {
            i.clear(),
            this.agNavigator.nextPoint(),
            this.reportAudioTrace(),
            this.controller.dispatch({
                type: "render"
            })
        }
        ,
        g.prototype.reportAndMoveToOrigin = function() {
            i.clear(),
            this.agNavigator.moveToOrigin(),
            this.reportAudioTrace(),
            this.controller.dispatch({
                type: "render"
            })
        }
        ,
        g.prototype.reportAndMoveToPrevPOI = function() {
            i.clear(),
            this.agNavigator.prevPOI(),
            this.reportAudioTrace(),
            this.controller.dispatch({
                type: "render"
            })
        }
        ,
        g.prototype.reportAndMoveToNextPOI = function() {
            i.clear(),
            this.agNavigator.nextPOI(),
            this.reportAudioTrace(),
            this.controller.dispatch({
                type: "render"
            })
        }
        ,
        g.prototype.reportAndMoveToFirstPoint = function() {
            i.clear(),
            this.agNavigator.firstPoint(),
            this.reportAudioTrace(),
            this.controller.dispatch({
                type: "render"
            })
        }
        ,
        g.prototype.reportAndMoveToLastPoint = function() {
            i.clear(),
            this.agNavigator.lastPoint(),
            this.reportAudioTrace(),
            this.controller.dispatch({
                type: "render"
            })
        }
        ,
        g.prototype.reportX = function() {
            i.clear(),
            this.reportAudioTrace({
                propToSpeak: "x",
                playSound: !1
            })
        }
        ,
        g.prototype.reportY = function() {
            i.clear(),
            this.reportAudioTrace({
                propToSpeak: "y",
                playSound: !1
            })
        }
        ,
        g.prototype.reportColor = function() {
            i.clear();
            var t = this.agNavigator.getCurrentSketch();
            t ? i.queue(h.getColorName(this.controller, t.color)) : i.queue(this.controller.s("graphing-calculator-narration-color-unknown")),
            i.alert()
        }
        ,
        g.prototype.reportPOICount = function() {
            i.clear();
            var t = this.agNavigator.getCurrentSketch()
              , e = t ? t.getPOI().length : 0;
            i.alert(this.controller.s("graphing-calculator-narration-audio-trace-poi-count", {
                x: e
            }))
        }
        ,
        g.prototype.reportType = function() {
            i.clear(),
            this.reportAudioTrace({
                propToSpeak: "type",
                playSound: !1
            })
        }
        ,
        g.prototype.reportBranch = function() {
            i.clear(),
            this.reportAudioTrace({
                propToSpeak: "branch",
                playSound: !1
            })
        }
        ,
        g.prototype.describePoint = function() {
            i.clear(),
            this.reportAudioTrace({
                playSound: !1
            }),
            i.alert()
        }
        ,
        g.prototype.playCurrentPoint = function() {
            var t = this.agNavigator.getCurrentPoint();
            t && this.tonegen.playPoint(t, this.grapher.getCurrentViewport())
        }
        ,
        g.prototype.reportAudioTrace = function(t) {
            var e = this.agNavigator.getCurrentPoint();
            if (e) {
                var r = t && t.propToSpeak
                  , o = !t || void 0 === t.playSound || t.playSound
                  , a = !t || void 0 === t.speakCoordinates || t.speakCoordinates;
                if (this.tonegen.stop(),
                o && this.playCurrentPoint(),
                a)
                    this.queueCoordinates(e, r),
                    setTimeout(function() {
                        i.alert()
                    }, r ? 0 : 100)
            }
        }
        ,
        g.prototype.adjustPlaybackSpeed = function(e) {
            if (!(e < 0 || e >= t.audioSpeedOptions.length)) {
                this.audioSpeedIndex = e;
                var r = t.audioSpeedOptions[e];
                return this.tonegen.setAudioSpeed(r.speed),
                i.alert(this.controller.s("graphing-calculator-narration-audio-trace-playback-speed", {
                    speed: r.displayedSpeed
                }))
            }
        }
        ,
        g.prototype.speedUp = function() {
            this.adjustPlaybackSpeed(this.audioSpeedIndex + 1)
        }
        ,
        g.prototype.speedDown = function() {
            this.adjustPlaybackSpeed(this.audioSpeedIndex - 1)
        }
        ,
        g.prototype.adjustVolume = function(t) {
            i.clear();
            var e = this.tonegen.getAudioVolume()
              , r = "up" === t ? Math.min(100, Math.round(100 * (e + .1))) : Math.max(0, Math.round(100 * (e - .1)));
            this.tonegen.setAudioVolume(r / 100),
            this.playCurrentPoint(),
            i.alert(this.controller.s("graphing-calculator-narration-audio-trace-volume", {
                volume: r
            }))
        }
        ,
        g.prototype.zoom = function(t) {
            this.grapher.viewportController.zoom(t)
        }
        ,
        g.prototype.getFocusedCell = function() {
            return this.focusedCell
        }
        ,
        g.prototype.setFocusedCell = function(t) {
            this.focusedCell = t
        }
        ,
        g.prototype.getAudioTraceActive = function() {
            return this.audioTraceActive
        }
        ,
        g.prototype.hearGraph = function() {
            if (i.clear(),
            this.tonegen.getPlaybackSupported()) {
                this.tonegen.stop();
                var t = this.agNavigator.getCurrentSketch();
                t && n.canPlaySketch(t) ? (this.isTracing = !0,
                this.tonegen.playSketch(t, this.grapher.getCurrentViewport())) : i.alert(this.controller.s("graphing-calculator-narration-audio-trace-unable-to-trace-this-expression"))
            } else
                i.alert(this.controller.s("graphing-calculator-narration-audio-trace-unable-to-play-audio"))
        }
        ,
        g.prototype.stopGraph = function() {
            this.tonegen.getPlaybackSupported() && this.tonegen.stop()
        }
        ,
        g.prototype.getIsTracing = function() {
            return this.isTracing
        }
        ,
        g.prototype.getAudioSpeedIndex = function() {
            return this.audioSpeedIndex
        }
        ,
        g
    }();
    t.default = g
});
!function(e, t) {
    if ("object" == typeof exports && "object" == typeof module)
        module.exports = t();
    else if ("function" == typeof define && define.amd)
        define('abraham', [], t);
    else {
        var r = t();
        for (var i in r)
            ("object" == typeof exports ? exports : e)[i] = r[i]
    }
}(this, function() {
    return function(e) {
        var t = {};
        function r(i) {
            if (t[i])
                return t[i].exports;
            var n = t[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(n.exports, n, n.exports, r),
            n.l = !0,
            n.exports
        }
        return r.m = e,
        r.c = t,
        r.i = function(e) {
            return e
        }
        ,
        r.d = function(e, t, i) {
            r.o(e, t) || Object.defineProperty(e, t, {
                configurable: !1,
                enumerable: !0,
                get: i
            })
        }
        ,
        r.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return r.d(t, "a", t),
            t
        }
        ,
        r.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        r.p = "",
        r(r.s = 26)
    }([function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = r(22);
        t.map = function(e, t) {
            var r = i.map(e, t);
            return e.warnings && (r.warnings = e.warnings),
            r
        }
    }
    , function(e, t) {
        var r, i, n = e.exports = {};
        function s() {
            throw new Error("setTimeout has not been defined")
        }
        function a() {
            throw new Error("clearTimeout has not been defined")
        }
        function o(e) {
            if (r === setTimeout)
                return setTimeout(e, 0);
            if ((r === s || !r) && setTimeout)
                return r = setTimeout,
                setTimeout(e, 0);
            try {
                return r(e, 0)
            } catch (t) {
                try {
                    return r.call(null, e, 0)
                } catch (t) {
                    return r.call(this, e, 0)
                }
            }
        }
        !function() {
            try {
                r = "function" == typeof setTimeout ? setTimeout : s
            } catch (e) {
                r = s
            }
            try {
                i = "function" == typeof clearTimeout ? clearTimeout : a
            } catch (e) {
                i = a
            }
        }();
        var c, l = [], u = !1, h = -1;
        function p() {
            u && c && (u = !1,
            c.length ? l = c.concat(l) : h = -1,
            l.length && f())
        }
        function f() {
            if (!u) {
                var e = o(p);
                u = !0;
                for (var t = l.length; t; ) {
                    for (c = l,
                    l = []; ++h < t; )
                        c && c[h].run();
                    h = -1,
                    t = l.length
                }
                c = null,
                u = !1,
                function(e) {
                    if (i === clearTimeout)
                        return clearTimeout(e);
                    if ((i === a || !i) && clearTimeout)
                        return i = clearTimeout,
                        clearTimeout(e);
                    try {
                        i(e)
                    } catch (t) {
                        try {
                            return i.call(null, e)
                        } catch (t) {
                            return i.call(this, e)
                        }
                    }
                }(e)
            }
        }
        function m(e, t) {
            this.fun = e,
            this.array = t
        }
        function y() {}
        n.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var r = 1; r < arguments.length; r++)
                    t[r - 1] = arguments[r];
            l.push(new m(e,t)),
            1 !== l.length || u || o(f)
        }
        ,
        m.prototype.run = function() {
            this.fun.apply(null, this.array)
        }
        ,
        n.title = "browser",
        n.browser = !0,
        n.env = {},
        n.argv = [],
        n.version = "",
        n.versions = {},
        n.on = y,
        n.addListener = y,
        n.once = y,
        n.off = y,
        n.removeListener = y,
        n.removeAllListeners = y,
        n.emit = y,
        n.prependListener = y,
        n.prependOnceListener = y,
        n.listeners = function(e) {
            return []
        }
        ,
        n.binding = function(e) {
            throw new Error("process.binding is not supported")
        }
        ,
        n.cwd = function() {
            return "/"
        }
        ,
        n.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }
        ,
        n.umask = function() {
            return 0
        }
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i, n = ["abs", "ans", "arccosh", "arccot", "arccoth", "arccsc", "arccsch", "arcsec", "arcsech", "arcsinh", "arctanh", "binomialdist", "boxplot", "cdf", "ceil", "corr", "cov", "csch", "distance", "dotplot", "erf", "floor", "gcf", "histogram", "IndependentTTest", "iTTest", "ittest", "lcm", "length", "mad", "mcd", "mcm", "mean", "median", "midpoint", "mod", "nCr", "normaldist", "nPr", "pdf", "poissondist", "polygon", "quantile", "quartile", "random", "round", "sech", "sign", "signum", "sgn", "stdDev", "stddev", "stdDevP", "stddevp", "stdev", "stdevp", "tdist", "total", "TScore", "TScore", "Tscore", "tscore", "tscore", "TTest", "ttest", "var", "variance", "varp"], s = n, a = o(n);
        function o(e) {
            var t = e.sort(function(e, t) {
                return t.length - e.length || t.localeCompare(e)
            }).join("|");
            return new RegExp("(" + t + ")","g")
        }
        t.getAutoOperator = function(e) {
            for (var t, r = 0, n = "", s = 0, a = e; s < a.length; s++) {
                var o = a[s];
                if ("terminal" !== o.type || !/[A-Za-z]/.test(o.value))
                    break;
                n += o.value,
                r++
            }
            return t = n.replace(i, "\\operatorname{$1}"),
            {
                modified: r > 0 && t !== n,
                terminalCount: r,
                value: t
            }
        }
        ,
        t.containsValue = function(e) {
            return -1 !== s.indexOf(e.toLowerCase())
        }
        ,
        t.setOperatorNames = function(e) {
            if (!Array.isArray(e))
                throw new Error("Operator names must be an array, got " + typeof e);
            for (var t = 0, r = e; t < r.length; t++) {
                var n = r[t];
                if ("string" != typeof n)
                    throw new Error("Operator names must be strings, found " + typeof n)
            }
            i = o(s = e)
        }
        ,
        t.resetOperatorNames = function() {
            s = n,
            i = a
        }
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = r(2)
          , n = r(14)
          , s = r(15)
          , a = r(16)
          , o = r(0)
          , c = r(23)
          , l = r(25);
        function u(e) {
            if (!l.isSixDotCells(e))
                throw new Error("EncodingError: Expected input to be six-dot unicode braille characters.")
        }
        t.nemethToLatex = function(e, r) {
            return u(e),
            a.default(t.UnicodeBraille.toBrailleAscii(e), r)
        }
        ,
        t.latexToNemeth = function(e, r) {
            return r && r.operatorNames ? i.setOperatorNames(r.operatorNames) : i.resetOperatorNames(),
            o.map(n.default(e), t.UnicodeBraille.coerceToSixDotCells)
        }
        ,
        t.uebToLatex = function(e, r) {
            return u(e),
            c.default(t.UnicodeBraille.toBrailleAscii(e), r)
        }
        ,
        t.latexToUeb = function(e, r) {
            return r && r.operatorNames ? i.setOperatorNames(r.operatorNames) : i.resetOperatorNames(),
            o.map(s.default(e), t.UnicodeBraille.coerceToSixDotCells)
        }
        ,
        t.UnicodeBraille = {
            coerceToSixDotCells: l.coerceToSixDotCells,
            toBrailleAscii: l.toBrailleAscii,
            toExpandedBrailleAscii: l.toExpandedBrailleAscii
        },
        t.version = "1.0.3"
    }
    , function(e, t) {}
    , function(e, t, r) {
        (function(e) {
            function r(e, t) {
                for (var r = 0, i = e.length - 1; i >= 0; i--) {
                    var n = e[i];
                    "." === n ? e.splice(i, 1) : ".." === n ? (e.splice(i, 1),
                    r++) : r && (e.splice(i, 1),
                    r--)
                }
                if (t)
                    for (; r--; r)
                        e.unshift("..");
                return e
            }
            var i = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
              , n = function(e) {
                return i.exec(e).slice(1)
            };
            function s(e, t) {
                if (e.filter)
                    return e.filter(t);
                for (var r = [], i = 0; i < e.length; i++)
                    t(e[i], i, e) && r.push(e[i]);
                return r
            }
            t.resolve = function() {
                for (var t = "", i = !1, n = arguments.length - 1; n >= -1 && !i; n--) {
                    var a = n >= 0 ? arguments[n] : e.cwd();
                    if ("string" != typeof a)
                        throw new TypeError("Arguments to path.resolve must be strings");
                    a && (t = a + "/" + t,
                    i = "/" === a.charAt(0))
                }
                return (i ? "/" : "") + (t = r(s(t.split("/"), function(e) {
                    return !!e
                }), !i).join("/")) || "."
            }
            ,
            t.normalize = function(e) {
                var i = t.isAbsolute(e)
                  , n = "/" === a(e, -1);
                return (e = r(s(e.split("/"), function(e) {
                    return !!e
                }), !i).join("/")) || i || (e = "."),
                e && n && (e += "/"),
                (i ? "/" : "") + e
            }
            ,
            t.isAbsolute = function(e) {
                return "/" === e.charAt(0)
            }
            ,
            t.join = function() {
                var e = Array.prototype.slice.call(arguments, 0);
                return t.normalize(s(e, function(e, t) {
                    if ("string" != typeof e)
                        throw new TypeError("Arguments to path.join must be strings");
                    return e
                }).join("/"))
            }
            ,
            t.relative = function(e, r) {
                function i(e) {
                    for (var t = 0; t < e.length && "" === e[t]; t++)
                        ;
                    for (var r = e.length - 1; r >= 0 && "" === e[r]; r--)
                        ;
                    return t > r ? [] : e.slice(t, r - t + 1)
                }
                e = t.resolve(e).substr(1),
                r = t.resolve(r).substr(1);
                for (var n = i(e.split("/")), s = i(r.split("/")), a = Math.min(n.length, s.length), o = a, c = 0; c < a; c++)
                    if (n[c] !== s[c]) {
                        o = c;
                        break
                    }
                var l = [];
                for (c = o; c < n.length; c++)
                    l.push("..");
                return (l = l.concat(s.slice(o))).join("/")
            }
            ,
            t.sep = "/",
            t.delimiter = ":",
            t.dirname = function(e) {
                var t = n(e)
                  , r = t[0]
                  , i = t[1];
                return r || i ? (i && (i = i.substr(0, i.length - 1)),
                r + i) : "."
            }
            ,
            t.basename = function(e, t) {
                var r = n(e)[2];
                return t && r.substr(-1 * t.length) === t && (r = r.substr(0, r.length - t.length)),
                r
            }
            ,
            t.extname = function(e) {
                return n(e)[3]
            }
            ;
            var a = "b" === "ab".substr(-1) ? function(e, t, r) {
                return e.substr(t, r)
            }
            : function(e, t, r) {
                return t < 0 && (t = e.length + t),
                e.substr(t, r)
            }
        }
        ).call(t, r(1))
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = function(e) {
            if (!e.hash)
                throw e;
            return {
                _diagnostic: {
                    expected: e.hash.expected,
                    message: e.message,
                    text: e.hash.text,
                    token: e.hash.token
                },
                location: e.hash.loc
            }
        }
    }
    , function(e, t, r) {
        "use strict";
        function i(e) {
            return {
                type: "command",
                value: e
            }
        }
        function n() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            return Array.prototype.concat.apply([], e)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.terminal = function(e) {
            return {
                type: "terminal",
                value: e
            }
        }
        ,
        t.command = i,
        t.greek = function(e) {
            return {
                type: "greek",
                value: e
            }
        }
        ,
        t.level = function(e) {
            return {
                subscript: e._,
                superscript: e["^"],
                type: "level"
            }
        }
        ,
        t.processPrimes = function(e, t) {
            var r = []
              , s = e.match(/'+/);
            if (null !== s)
                for (var a = s[0].length, o = 0; o < a; o++)
                    r.push(i("\\prime"));
            return n(r, t)
        }
        ,
        t.fraction = function(e, t) {
            return {
                type: "fraction",
                numerator: e,
                denominator: t
            }
        }
        ,
        t.typeform = function(e, t) {
            return {
                name: e,
                type: "typeform",
                value: t
            }
        }
        ,
        t.radical = function(e, t) {
            return {
                type: "radical",
                index: t,
                radicand: e
            }
        }
        ,
        t.group = n
    }
    , function(e, t) {
        e.exports = function(e) {
            return e.webpackPolyfill || (e.deprecate = function() {}
            ,
            e.paths = [],
            e.children || (e.children = []),
            Object.defineProperty(e, "loaded", {
                enumerable: !0,
                get: function() {
                    return e.l
                }
            }),
            Object.defineProperty(e, "id", {
                enumerable: !0,
                get: function() {
                    return e.i
                }
            }),
            e.webpackPolyfill = 1),
            e
        }
    }
    , function(e, t, r) {
        (function(e, i) {
            var n = function() {
                var e = function(e, t, r, i) {
                    for (r = r || {},
                    i = e.length; i--; r[e[i]] = t)
                        ;
                    return r
                }
                  , t = [1, 11]
                  , r = [1, 12]
                  , i = [1, 13]
                  , n = [1, 70]
                  , s = [1, 71]
                  , a = [1, 69]
                  , o = [1, 38]
                  , c = [1, 39]
                  , l = [1, 59]
                  , u = [1, 60]
                  , h = [1, 61]
                  , p = [1, 62]
                  , f = [1, 63]
                  , m = [1, 64]
                  , y = [1, 65]
                  , d = [1, 66]
                  , g = [1, 67]
                  , v = [1, 68]
                  , _ = [1, 40]
                  , k = [1, 34]
                  , b = [1, 35]
                  , E = [1, 36]
                  , O = [1, 37]
                  , A = [1, 41]
                  , x = [1, 42]
                  , I = [1, 43]
                  , S = [1, 44]
                  , L = [1, 45]
                  , P = [1, 46]
                  , C = [1, 47]
                  , $ = [1, 48]
                  , R = [1, 49]
                  , T = [1, 50]
                  , N = [1, 51]
                  , w = [1, 52]
                  , M = [1, 53]
                  , D = [1, 17]
                  , F = [1, 54]
                  , U = [1, 55]
                  , j = [1, 56]
                  , G = [1, 57]
                  , X = [1, 58]
                  , B = [5, 12, 13, 14, 18, 24, 25]
                  , K = [5, 11, 12, 13, 14, 15, 17, 18, 20, 21, 23, 24, 25, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 82]
                  , Z = [1, 75]
                  , V = [5, 11, 12, 13, 14, 15, 17, 18, 20, 21, 23, 24, 25, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 77, 78, 79, 80, 82]
                  , H = [5, 11, 12, 13, 14, 15, 17, 18, 20, 21, 23, 24, 25, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82]
                  , W = {
                    trace: function() {},
                    yy: {},
                    symbols_: {
                        error: 2,
                        sentence: 3,
                        group: 4,
                        EOF: 5,
                        element: 6,
                        index_element: 7,
                        modified_expression: 8,
                        radical: 9,
                        primes: 10,
                        OPEN_MODEXP: 11,
                        MODEXP_UNDER: 12,
                        MODEXP_OVER: 13,
                        CLOSE_MODEXP: 14,
                        RADICAL_INDEX: 15,
                        index_group: 16,
                        OPEN_RADICAL: 17,
                        CLOSE_RADICAL: 18,
                        level: 19,
                        LEVEL: 20,
                        BASELINE: 21,
                        frac: 22,
                        OPEN_FRAC: 23,
                        SLASH: 24,
                        CLOSE_FRAC: 25,
                        subscript_head: 26,
                        number: 27,
                        atom: 28,
                        command: 29,
                        greek: 30,
                        letter: 31,
                        comma: 32,
                        period: 33,
                        space: 34,
                        operation: 35,
                        comparison: 36,
                        level_with_comparison: 37,
                        ellipsis: 38,
                        colon: 39,
                        infinity: 40,
                        integral: 41,
                        factorial: 42,
                        ampersand: 43,
                        question_mark: 44,
                        bracket: 45,
                        ",": 46,
                        ".": 47,
                        "[": 48,
                        "{": 49,
                        "(": 50,
                        "]": 51,
                        "}": 52,
                        ")": 53,
                        LANGLE: 54,
                        RANGLE: 55,
                        PIPE: 56,
                        DOUBLE_PIPE: 57,
                        SPACE: 58,
                        COMMAND: 59,
                        GREEK: 60,
                        LETTER: 61,
                        CAPITAL_LETTER: 62,
                        "+": 63,
                        "-": 64,
                        CDOT: 65,
                        TIMES: 66,
                        "*": 67,
                        "/": 68,
                        DIV: 69,
                        PERCENT: 70,
                        TO: 71,
                        COMPARISON: 72,
                        LEVEL_WITH_COMPARISON: 73,
                        ELLIPSIS: 74,
                        COLON: 75,
                        NUMBER: 76,
                        INFINITY: 77,
                        INTEGRAL: 78,
                        FACTORIAL: 79,
                        "&": 80,
                        PRIMES: 81,
                        "?": 82,
                        unknown: 83,
                        UNKNOWN: 84,
                        $accept: 0,
                        $end: 1
                    },
                    terminals_: {
                        2: "error",
                        5: "EOF",
                        11: "OPEN_MODEXP",
                        12: "MODEXP_UNDER",
                        13: "MODEXP_OVER",
                        14: "CLOSE_MODEXP",
                        15: "RADICAL_INDEX",
                        17: "OPEN_RADICAL",
                        18: "CLOSE_RADICAL",
                        20: "LEVEL",
                        21: "BASELINE",
                        23: "OPEN_FRAC",
                        24: "SLASH",
                        25: "CLOSE_FRAC",
                        46: ",",
                        47: ".",
                        48: "[",
                        49: "{",
                        50: "(",
                        51: "]",
                        52: "}",
                        53: ")",
                        54: "LANGLE",
                        55: "RANGLE",
                        56: "PIPE",
                        57: "DOUBLE_PIPE",
                        58: "SPACE",
                        59: "COMMAND",
                        60: "GREEK",
                        61: "LETTER",
                        62: "CAPITAL_LETTER",
                        63: "+",
                        64: "-",
                        65: "CDOT",
                        66: "TIMES",
                        67: "*",
                        68: "/",
                        69: "DIV",
                        70: "PERCENT",
                        71: "TO",
                        72: "COMPARISON",
                        73: "LEVEL_WITH_COMPARISON",
                        74: "ELLIPSIS",
                        75: "COLON",
                        76: "NUMBER",
                        77: "INFINITY",
                        78: "INTEGRAL",
                        79: "FACTORIAL",
                        80: "&",
                        81: "PRIMES",
                        82: "?",
                        84: "UNKNOWN"
                    },
                    productions_: [0, [3, 2], [3, 1], [4, 2], [4, 1], [6, 1], [6, 1], [6, 2], [6, 1], [8, 7], [8, 6], [8, 5], [8, 6], [8, 5], [8, 5], [8, 4], [8, 4], [8, 3], [8, 4], [8, 4], [8, 4], [8, 4], [8, 3], [8, 3], [8, 2], [9, 5], [9, 4], [9, 4], [9, 3], [9, 3], [9, 2], [19, 1], [19, 1], [22, 5], [22, 4], [22, 4], [22, 3], [16, 2], [16, 1], [7, 3], [7, 2], [7, 2], [7, 3], [7, 2], [7, 2], [7, 1], [7, 1], [7, 1], [26, 1], [26, 1], [26, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [32, 1], [33, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [34, 1], [29, 1], [30, 1], [31, 1], [31, 1], [35, 1], [35, 1], [35, 1], [35, 1], [35, 1], [35, 1], [35, 1], [35, 1], [35, 1], [36, 1], [37, 1], [38, 1], [39, 1], [27, 1], [40, 1], [41, 1], [42, 1], [43, 1], [10, 1], [44, 1], [83, 1]],
                    performAction: function(e, t, r, i, n, s, a) {
                        var o = s.length - 1;
                        switch (n) {
                        case 1:
                            return s[o - 1];
                        case 2:
                            return i.group();
                        case 3:
                        case 37:
                        case 41:
                        case 43:
                        case 44:
                            this.$ = i.group(s[o - 1], s[o]);
                            break;
                        case 4:
                        case 38:
                            this.$ = i.group(s[o]);
                            break;
                        case 7:
                            this.$ = i.group(s[o - 1], s[o]);
                            break;
                        case 9:
                            this.$ = i.modified_expression(s[o - 5], s[o - 3], s[o - 1]);
                            break;
                        case 10:
                            this.$ = i.modified_expression(s[o - 4], s[o - 2]);
                            break;
                        case 11:
                            this.$ = i.modified_expression(s[o - 3], s[o - 1]);
                            break;
                        case 12:
                            this.$ = i.modified_expression(s[o - 4], i.group(), s[o - 1]);
                            break;
                        case 13:
                            this.$ = i.modified_expression(s[o - 3], i.group(), s[o - 1]);
                            break;
                        case 14:
                            this.$ = i.modified_expression(s[o - 3], i.group(), i.group());
                            break;
                        case 15:
                        case 16:
                            this.$ = i.modified_expression(s[o - 2], i.group());
                            break;
                        case 17:
                            this.$ = i.modified_expression(s[o - 1]);
                            break;
                        case 18:
                        case 19:
                        case 22:
                        case 23:
                        case 24:
                            this.$ = i.modified_expression(i.group());
                            break;
                        case 20:
                        case 21:
                            i.warnOrError("Multi-level modified expressions are not supported."),
                            this.$ = i.modified_expression(i.group());
                            break;
                        case 25:
                            this.$ = i.radical(s[o - 1], s[o - 3]);
                            break;
                        case 26:
                            this.$ = i.radical(s[o - 1], i.group());
                            break;
                        case 27:
                            this.$ = i.radical(i.group(), s[o - 2]);
                            break;
                        case 28:
                            this.$ = i.radical(i.group(), i.group());
                            break;
                        case 29:
                            this.$ = i.radical(s[o - 1]);
                            break;
                        case 30:
                            this.$ = i.radical(i.group());
                            break;
                        case 31:
                            this.$ = i.level(s[o]);
                            break;
                        case 32:
                            this.$ = i.baseline();
                            break;
                        case 33:
                            this.$ = i.fraction(s[o - 3], s[o - 1]);
                            break;
                        case 34:
                            this.$ = i.fraction(s[o - 2], i.group());
                            break;
                        case 35:
                            this.$ = i.fraction(i.group(), s[o - 1]);
                            break;
                        case 36:
                            this.$ = i.fraction(i.group(), i.group());
                            break;
                        case 39:
                            this.$ = i.group(i.simple_subscript(s[o - 2], s[o]), s[o - 1]);
                            break;
                        case 40:
                            this.$ = i.simple_subscript(s[o - 1], s[o]);
                            break;
                        case 42:
                            i.warnOrError("Illegal use of Nemeth primes"),
                            this.$ = i.group(i.simple_subscript(s[o - 2], s[o - 1]), s[o]);
                            break;
                        case 67:
                            this.$ = i.terminal(",");
                            break;
                        case 68:
                            this.$ = i.terminal(".");
                            break;
                        case 69:
                            this.$ = i.terminal("[");
                            break;
                        case 70:
                            this.$ = i.terminal("\\{");
                            break;
                        case 71:
                            this.$ = i.terminal("(");
                            break;
                        case 72:
                            this.$ = i.terminal("]");
                            break;
                        case 73:
                            this.$ = i.terminal("\\}");
                            break;
                        case 74:
                            this.$ = i.terminal(")");
                            break;
                        case 75:
                            this.$ = i.terminal("\\langle ");
                            break;
                        case 76:
                            this.$ = i.terminal("\\rangle ");
                            break;
                        case 77:
                            this.$ = i.terminal("|");
                            break;
                        case 78:
                            this.$ = i.terminal("\\|");
                            break;
                        case 79:
                            this.$ = i.terminal(" ");
                            break;
                        case 80:
                            this.$ = i.command(s[o].toLowerCase());
                            break;
                        case 81:
                            this.$ = i.terminal(i.greek(s[o]));
                            break;
                        case 82:
                            this.$ = i.terminal(s[o].toLowerCase());
                            break;
                        case 83:
                            this.$ = i.terminal(s[o].toUpperCase());
                            break;
                        case 84:
                            this.$ = i.terminal("+");
                            break;
                        case 85:
                            this.$ = i.terminal("-");
                            break;
                        case 86:
                            this.$ = i.terminal("\\cdot ");
                            break;
                        case 87:
                            this.$ = i.terminal("\\times ");
                            break;
                        case 88:
                            this.$ = i.terminal("*");
                            break;
                        case 89:
                            this.$ = i.terminal("/");
                            break;
                        case 90:
                            this.$ = i.terminal("\\div ");
                            break;
                        case 91:
                            this.$ = i.terminal("\\%");
                            break;
                        case 92:
                            this.$ = i.terminal("\\to ");
                            break;
                        case 93:
                            this.$ = i.comparison(s[o].trim());
                            break;
                        case 94:
                            this.$ = i.level_with_comparison(s[o].trim());
                            break;
                        case 95:
                            this.$ = i.terminal("\\ldots ");
                            break;
                        case 96:
                            this.$ = i.terminal(":");
                            break;
                        case 97:
                            this.$ = i.terminal(s[o]);
                            break;
                        case 98:
                            this.$ = i.terminal("\\infty ");
                            break;
                        case 99:
                            this.$ = i.terminal("\\int ");
                            break;
                        case 100:
                            this.$ = i.terminal("!");
                            break;
                        case 101:
                            this.$ = i.terminal("\\&");
                            break;
                        case 102:
                            this.$ = i.primes(s[o]);
                            break;
                        case 103:
                            this.$ = i.terminal("?")
                        }
                    },
                    table: [{
                        3: 1,
                        4: 2,
                        5: [1, 3],
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        11: t,
                        15: r,
                        17: i,
                        19: 33,
                        20: n,
                        21: s,
                        22: 32,
                        23: a,
                        26: 8,
                        27: 9,
                        28: 10,
                        29: 14,
                        30: 15,
                        31: 16,
                        32: 18,
                        33: 19,
                        34: 20,
                        35: 21,
                        36: 22,
                        37: 23,
                        38: 24,
                        39: 25,
                        40: 26,
                        41: 27,
                        42: 28,
                        43: 29,
                        44: 30,
                        45: 31,
                        46: o,
                        47: c,
                        48: l,
                        49: u,
                        50: h,
                        51: p,
                        52: f,
                        53: m,
                        54: y,
                        55: d,
                        56: g,
                        57: v,
                        58: _,
                        59: k,
                        60: b,
                        61: E,
                        62: O,
                        63: A,
                        64: x,
                        65: I,
                        66: S,
                        67: L,
                        68: P,
                        69: C,
                        70: $,
                        71: R,
                        72: T,
                        73: N,
                        74: w,
                        75: M,
                        76: D,
                        77: F,
                        78: U,
                        79: j,
                        80: G,
                        82: X
                    }, {
                        1: [3]
                    }, {
                        5: [1, 72]
                    }, {
                        1: [2, 2]
                    }, e(B, [2, 4], {
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        26: 8,
                        27: 9,
                        28: 10,
                        29: 14,
                        30: 15,
                        31: 16,
                        32: 18,
                        33: 19,
                        34: 20,
                        35: 21,
                        36: 22,
                        37: 23,
                        38: 24,
                        39: 25,
                        40: 26,
                        41: 27,
                        42: 28,
                        43: 29,
                        44: 30,
                        45: 31,
                        22: 32,
                        19: 33,
                        4: 73,
                        11: t,
                        15: r,
                        17: i,
                        20: n,
                        21: s,
                        23: a,
                        46: o,
                        47: c,
                        48: l,
                        49: u,
                        50: h,
                        51: p,
                        52: f,
                        53: m,
                        54: y,
                        55: d,
                        56: g,
                        57: v,
                        58: _,
                        59: k,
                        60: b,
                        61: E,
                        62: O,
                        63: A,
                        64: x,
                        65: I,
                        66: S,
                        67: L,
                        68: P,
                        69: C,
                        70: $,
                        71: R,
                        72: T,
                        73: N,
                        74: w,
                        75: M,
                        76: D,
                        77: F,
                        78: U,
                        79: j,
                        80: G,
                        82: X
                    }), e(K, [2, 5]), e(K, [2, 6]), e(K, [2, 8], {
                        10: 74,
                        81: Z
                    }), e(V, [2, 45], {
                        10: 76,
                        27: 77,
                        76: D,
                        81: Z
                    }), e(K, [2, 46], {
                        10: 78,
                        81: Z
                    }), e(K, [2, 47], {
                        10: 79,
                        81: Z
                    }), {
                        4: 80,
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        11: t,
                        12: [1, 82],
                        13: [1, 81],
                        14: [1, 83],
                        15: r,
                        17: i,
                        19: 33,
                        20: n,
                        21: s,
                        22: 32,
                        23: a,
                        26: 8,
                        27: 9,
                        28: 10,
                        29: 14,
                        30: 15,
                        31: 16,
                        32: 18,
                        33: 19,
                        34: 20,
                        35: 21,
                        36: 22,
                        37: 23,
                        38: 24,
                        39: 25,
                        40: 26,
                        41: 27,
                        42: 28,
                        43: 29,
                        44: 30,
                        45: 31,
                        46: o,
                        47: c,
                        48: l,
                        49: u,
                        50: h,
                        51: p,
                        52: f,
                        53: m,
                        54: y,
                        55: d,
                        56: g,
                        57: v,
                        58: _,
                        59: k,
                        60: b,
                        61: E,
                        62: O,
                        63: A,
                        64: x,
                        65: I,
                        66: S,
                        67: L,
                        68: P,
                        69: C,
                        70: $,
                        71: R,
                        72: T,
                        73: N,
                        74: w,
                        75: M,
                        76: D,
                        77: F,
                        78: U,
                        79: j,
                        80: G,
                        82: X
                    }, {
                        7: 86,
                        16: 84,
                        17: [1, 85],
                        19: 33,
                        20: n,
                        21: s,
                        22: 32,
                        23: a,
                        26: 8,
                        27: 9,
                        28: 10,
                        29: 14,
                        30: 15,
                        31: 16,
                        32: 18,
                        33: 19,
                        34: 20,
                        35: 21,
                        36: 22,
                        37: 23,
                        38: 24,
                        39: 25,
                        40: 26,
                        41: 27,
                        42: 28,
                        43: 29,
                        44: 30,
                        45: 31,
                        46: o,
                        47: c,
                        48: l,
                        49: u,
                        50: h,
                        51: p,
                        52: f,
                        53: m,
                        54: y,
                        55: d,
                        56: g,
                        57: v,
                        58: _,
                        59: k,
                        60: b,
                        61: E,
                        62: O,
                        63: A,
                        64: x,
                        65: I,
                        66: S,
                        67: L,
                        68: P,
                        69: C,
                        70: $,
                        71: R,
                        72: T,
                        73: N,
                        74: w,
                        75: M,
                        76: D,
                        77: F,
                        78: U,
                        79: j,
                        80: G,
                        82: X
                    }, {
                        4: 87,
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        11: t,
                        15: r,
                        17: i,
                        18: [1, 88],
                        19: 33,
                        20: n,
                        21: s,
                        22: 32,
                        23: a,
                        26: 8,
                        27: 9,
                        28: 10,
                        29: 14,
                        30: 15,
                        31: 16,
                        32: 18,
                        33: 19,
                        34: 20,
                        35: 21,
                        36: 22,
                        37: 23,
                        38: 24,
                        39: 25,
                        40: 26,
                        41: 27,
                        42: 28,
                        43: 29,
                        44: 30,
                        45: 31,
                        46: o,
                        47: c,
                        48: l,
                        49: u,
                        50: h,
                        51: p,
                        52: f,
                        53: m,
                        54: y,
                        55: d,
                        56: g,
                        57: v,
                        58: _,
                        59: k,
                        60: b,
                        61: E,
                        62: O,
                        63: A,
                        64: x,
                        65: I,
                        66: S,
                        67: L,
                        68: P,
                        69: C,
                        70: $,
                        71: R,
                        72: T,
                        73: N,
                        74: w,
                        75: M,
                        76: D,
                        77: F,
                        78: U,
                        79: j,
                        80: G,
                        82: X
                    }, e(H, [2, 48]), e(H, [2, 49]), e(H, [2, 50]), e(H, [2, 97]), e(H, [2, 51]), e(H, [2, 52]), e(H, [2, 53]), e(H, [2, 54]), e(H, [2, 55]), e(H, [2, 56]), e(H, [2, 57]), e(H, [2, 58]), e(H, [2, 59]), e(H, [2, 60]), e(H, [2, 61]), e(H, [2, 62]), e(H, [2, 63]), e(H, [2, 64]), e(H, [2, 65]), e(H, [2, 66]), e(H, [2, 80]), e(H, [2, 81]), e(H, [2, 82]), e(H, [2, 83]), e(H, [2, 67]), e(H, [2, 68]), e(H, [2, 79]), e(H, [2, 84]), e(H, [2, 85]), e(H, [2, 86]), e(H, [2, 87]), e(H, [2, 88]), e(H, [2, 89]), e(H, [2, 90]), e(H, [2, 91]), e(H, [2, 92]), e(H, [2, 93]), e(H, [2, 94]), e(H, [2, 95]), e(H, [2, 96]), e(H, [2, 98]), e(H, [2, 99]), e(H, [2, 100]), e(H, [2, 101]), e(H, [2, 103]), e(H, [2, 69]), e(H, [2, 70]), e(H, [2, 71]), e(H, [2, 72]), e(H, [2, 73]), e(H, [2, 74]), e(H, [2, 75]), e(H, [2, 76]), e(H, [2, 77]), e(H, [2, 78]), {
                        4: 89,
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        11: t,
                        15: r,
                        17: i,
                        19: 33,
                        20: n,
                        21: s,
                        22: 32,
                        23: a,
                        24: [1, 90],
                        26: 8,
                        27: 9,
                        28: 10,
                        29: 14,
                        30: 15,
                        31: 16,
                        32: 18,
                        33: 19,
                        34: 20,
                        35: 21,
                        36: 22,
                        37: 23,
                        38: 24,
                        39: 25,
                        40: 26,
                        41: 27,
                        42: 28,
                        43: 29,
                        44: 30,
                        45: 31,
                        46: o,
                        47: c,
                        48: l,
                        49: u,
                        50: h,
                        51: p,
                        52: f,
                        53: m,
                        54: y,
                        55: d,
                        56: g,
                        57: v,
                        58: _,
                        59: k,
                        60: b,
                        61: E,
                        62: O,
                        63: A,
                        64: x,
                        65: I,
                        66: S,
                        67: L,
                        68: P,
                        69: C,
                        70: $,
                        71: R,
                        72: T,
                        73: N,
                        74: w,
                        75: M,
                        76: D,
                        77: F,
                        78: U,
                        79: j,
                        80: G,
                        82: X
                    }, e(H, [2, 31]), e(H, [2, 32]), {
                        1: [2, 1]
                    }, e(B, [2, 3]), e(K, [2, 7]), e(K, [2, 102]), e(V, [2, 41], {
                        27: 91,
                        76: D
                    }), e(K, [2, 40], {
                        10: 92,
                        81: Z
                    }), e(K, [2, 43]), e(K, [2, 44]), {
                        12: [1, 93],
                        13: [1, 94],
                        14: [1, 95]
                    }, {
                        12: [1, 96],
                        13: [1, 97],
                        14: [1, 98]
                    }, {
                        12: [1, 100],
                        13: [1, 99],
                        14: [1, 101]
                    }, e(K, [2, 24]), {
                        17: [1, 102]
                    }, {
                        4: 103,
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        11: t,
                        15: r,
                        17: i,
                        18: [1, 104],
                        19: 33,
                        20: n,
                        21: s,
                        22: 32,
                        23: a,
                        26: 8,
                        27: 9,
                        28: 10,
                        29: 14,
                        30: 15,
                        31: 16,
                        32: 18,
                        33: 19,
                        34: 20,
                        35: 21,
                        36: 22,
                        37: 23,
                        38: 24,
                        39: 25,
                        40: 26,
                        41: 27,
                        42: 28,
                        43: 29,
                        44: 30,
                        45: 31,
                        46: o,
                        47: c,
                        48: l,
                        49: u,
                        50: h,
                        51: p,
                        52: f,
                        53: m,
                        54: y,
                        55: d,
                        56: g,
                        57: v,
                        58: _,
                        59: k,
                        60: b,
                        61: E,
                        62: O,
                        63: A,
                        64: x,
                        65: I,
                        66: S,
                        67: L,
                        68: P,
                        69: C,
                        70: $,
                        71: R,
                        72: T,
                        73: N,
                        74: w,
                        75: M,
                        76: D,
                        77: F,
                        78: U,
                        79: j,
                        80: G,
                        82: X
                    }, {
                        7: 86,
                        16: 105,
                        17: [2, 38],
                        19: 33,
                        20: n,
                        21: s,
                        22: 32,
                        23: a,
                        26: 8,
                        27: 9,
                        28: 10,
                        29: 14,
                        30: 15,
                        31: 16,
                        32: 18,
                        33: 19,
                        34: 20,
                        35: 21,
                        36: 22,
                        37: 23,
                        38: 24,
                        39: 25,
                        40: 26,
                        41: 27,
                        42: 28,
                        43: 29,
                        44: 30,
                        45: 31,
                        46: o,
                        47: c,
                        48: l,
                        49: u,
                        50: h,
                        51: p,
                        52: f,
                        53: m,
                        54: y,
                        55: d,
                        56: g,
                        57: v,
                        58: _,
                        59: k,
                        60: b,
                        61: E,
                        62: O,
                        63: A,
                        64: x,
                        65: I,
                        66: S,
                        67: L,
                        68: P,
                        69: C,
                        70: $,
                        71: R,
                        72: T,
                        73: N,
                        74: w,
                        75: M,
                        76: D,
                        77: F,
                        78: U,
                        79: j,
                        80: G,
                        82: X
                    }, {
                        18: [1, 106]
                    }, e(H, [2, 30]), {
                        24: [1, 107]
                    }, {
                        4: 108,
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        11: t,
                        15: r,
                        17: i,
                        19: 33,
                        20: n,
                        21: s,
                        22: 32,
                        23: a,
                        25: [1, 109],
                        26: 8,
                        27: 9,
                        28: 10,
                        29: 14,
                        30: 15,
                        31: 16,
                        32: 18,
                        33: 19,
                        34: 20,
                        35: 21,
                        36: 22,
                        37: 23,
                        38: 24,
                        39: 25,
                        40: 26,
                        41: 27,
                        42: 28,
                        43: 29,
                        44: 30,
                        45: 31,
                        46: o,
                        47: c,
                        48: l,
                        49: u,
                        50: h,
                        51: p,
                        52: f,
                        53: m,
                        54: y,
                        55: d,
                        56: g,
                        57: v,
                        58: _,
                        59: k,
                        60: b,
                        61: E,
                        62: O,
                        63: A,
                        64: x,
                        65: I,
                        66: S,
                        67: L,
                        68: P,
                        69: C,
                        70: $,
                        71: R,
                        72: T,
                        73: N,
                        74: w,
                        75: M,
                        76: D,
                        77: F,
                        78: U,
                        79: j,
                        80: G,
                        82: X
                    }, e(K, [2, 39]), e(K, [2, 42]), {
                        4: 110,
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        11: t,
                        13: [1, 111],
                        14: [1, 112],
                        15: r,
                        17: i,
                        19: 33,
                        20: n,
                        21: s,
                        22: 32,
                        23: a,
                        26: 8,
                        27: 9,
                        28: 10,
                        29: 14,
                        30: 15,
                        31: 16,
                        32: 18,
                        33: 19,
                        34: 20,
                        35: 21,
                        36: 22,
                        37: 23,
                        38: 24,
                        39: 25,
                        40: 26,
                        41: 27,
                        42: 28,
                        43: 29,
                        44: 30,
                        45: 31,
                        46: o,
                        47: c,
                        48: l,
                        49: u,
                        50: h,
                        51: p,
                        52: f,
                        53: m,
                        54: y,
                        55: d,
                        56: g,
                        57: v,
                        58: _,
                        59: k,
                        60: b,
                        61: E,
                        62: O,
                        63: A,
                        64: x,
                        65: I,
                        66: S,
                        67: L,
                        68: P,
                        69: C,
                        70: $,
                        71: R,
                        72: T,
                        73: N,
                        74: w,
                        75: M,
                        76: D,
                        77: F,
                        78: U,
                        79: j,
                        80: G,
                        82: X
                    }, {
                        4: 113,
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        11: t,
                        14: [1, 114],
                        15: r,
                        17: i,
                        19: 33,
                        20: n,
                        21: s,
                        22: 32,
                        23: a,
                        26: 8,
                        27: 9,
                        28: 10,
                        29: 14,
                        30: 15,
                        31: 16,
                        32: 18,
                        33: 19,
                        34: 20,
                        35: 21,
                        36: 22,
                        37: 23,
                        38: 24,
                        39: 25,
                        40: 26,
                        41: 27,
                        42: 28,
                        43: 29,
                        44: 30,
                        45: 31,
                        46: o,
                        47: c,
                        48: l,
                        49: u,
                        50: h,
                        51: p,
                        52: f,
                        53: m,
                        54: y,
                        55: d,
                        56: g,
                        57: v,
                        58: _,
                        59: k,
                        60: b,
                        61: E,
                        62: O,
                        63: A,
                        64: x,
                        65: I,
                        66: S,
                        67: L,
                        68: P,
                        69: C,
                        70: $,
                        71: R,
                        72: T,
                        73: N,
                        74: w,
                        75: M,
                        76: D,
                        77: F,
                        78: U,
                        79: j,
                        80: G,
                        82: X
                    }, e(K, [2, 17]), {
                        14: [1, 115]
                    }, {
                        14: [1, 116]
                    }, e(K, [2, 22]), {
                        14: [1, 117]
                    }, {
                        14: [1, 118]
                    }, e(K, [2, 23]), {
                        4: 119,
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        11: t,
                        15: r,
                        17: i,
                        18: [1, 120],
                        19: 33,
                        20: n,
                        21: s,
                        22: 32,
                        23: a,
                        26: 8,
                        27: 9,
                        28: 10,
                        29: 14,
                        30: 15,
                        31: 16,
                        32: 18,
                        33: 19,
                        34: 20,
                        35: 21,
                        36: 22,
                        37: 23,
                        38: 24,
                        39: 25,
                        40: 26,
                        41: 27,
                        42: 28,
                        43: 29,
                        44: 30,
                        45: 31,
                        46: o,
                        47: c,
                        48: l,
                        49: u,
                        50: h,
                        51: p,
                        52: f,
                        53: m,
                        54: y,
                        55: d,
                        56: g,
                        57: v,
                        58: _,
                        59: k,
                        60: b,
                        61: E,
                        62: O,
                        63: A,
                        64: x,
                        65: I,
                        66: S,
                        67: L,
                        68: P,
                        69: C,
                        70: $,
                        71: R,
                        72: T,
                        73: N,
                        74: w,
                        75: M,
                        76: D,
                        77: F,
                        78: U,
                        79: j,
                        80: G,
                        82: X
                    }, {
                        18: [1, 121]
                    }, e(H, [2, 28]), {
                        17: [2, 37]
                    }, e(H, [2, 29]), {
                        4: 122,
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        11: t,
                        15: r,
                        17: i,
                        19: 33,
                        20: n,
                        21: s,
                        22: 32,
                        23: a,
                        25: [1, 123],
                        26: 8,
                        27: 9,
                        28: 10,
                        29: 14,
                        30: 15,
                        31: 16,
                        32: 18,
                        33: 19,
                        34: 20,
                        35: 21,
                        36: 22,
                        37: 23,
                        38: 24,
                        39: 25,
                        40: 26,
                        41: 27,
                        42: 28,
                        43: 29,
                        44: 30,
                        45: 31,
                        46: o,
                        47: c,
                        48: l,
                        49: u,
                        50: h,
                        51: p,
                        52: f,
                        53: m,
                        54: y,
                        55: d,
                        56: g,
                        57: v,
                        58: _,
                        59: k,
                        60: b,
                        61: E,
                        62: O,
                        63: A,
                        64: x,
                        65: I,
                        66: S,
                        67: L,
                        68: P,
                        69: C,
                        70: $,
                        71: R,
                        72: T,
                        73: N,
                        74: w,
                        75: M,
                        76: D,
                        77: F,
                        78: U,
                        79: j,
                        80: G,
                        82: X
                    }, {
                        25: [1, 124]
                    }, e(H, [2, 36]), {
                        13: [1, 125],
                        14: [1, 126]
                    }, {
                        4: 127,
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        11: t,
                        14: [1, 128],
                        15: r,
                        17: i,
                        19: 33,
                        20: n,
                        21: s,
                        22: 32,
                        23: a,
                        26: 8,
                        27: 9,
                        28: 10,
                        29: 14,
                        30: 15,
                        31: 16,
                        32: 18,
                        33: 19,
                        34: 20,
                        35: 21,
                        36: 22,
                        37: 23,
                        38: 24,
                        39: 25,
                        40: 26,
                        41: 27,
                        42: 28,
                        43: 29,
                        44: 30,
                        45: 31,
                        46: o,
                        47: c,
                        48: l,
                        49: u,
                        50: h,
                        51: p,
                        52: f,
                        53: m,
                        54: y,
                        55: d,
                        56: g,
                        57: v,
                        58: _,
                        59: k,
                        60: b,
                        61: E,
                        62: O,
                        63: A,
                        64: x,
                        65: I,
                        66: S,
                        67: L,
                        68: P,
                        69: C,
                        70: $,
                        71: R,
                        72: T,
                        73: N,
                        74: w,
                        75: M,
                        76: D,
                        77: F,
                        78: U,
                        79: j,
                        80: G,
                        82: X
                    }, e(K, [2, 16]), {
                        14: [1, 129]
                    }, e(K, [2, 15]), e(K, [2, 18]), e(K, [2, 20]), e(K, [2, 19]), e(K, [2, 21]), {
                        18: [1, 130]
                    }, e(H, [2, 27]), e(H, [2, 26]), {
                        25: [1, 131]
                    }, e(H, [2, 34]), e(H, [2, 35]), {
                        4: 132,
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        11: t,
                        14: [1, 133],
                        15: r,
                        17: i,
                        19: 33,
                        20: n,
                        21: s,
                        22: 32,
                        23: a,
                        26: 8,
                        27: 9,
                        28: 10,
                        29: 14,
                        30: 15,
                        31: 16,
                        32: 18,
                        33: 19,
                        34: 20,
                        35: 21,
                        36: 22,
                        37: 23,
                        38: 24,
                        39: 25,
                        40: 26,
                        41: 27,
                        42: 28,
                        43: 29,
                        44: 30,
                        45: 31,
                        46: o,
                        47: c,
                        48: l,
                        49: u,
                        50: h,
                        51: p,
                        52: f,
                        53: m,
                        54: y,
                        55: d,
                        56: g,
                        57: v,
                        58: _,
                        59: k,
                        60: b,
                        61: E,
                        62: O,
                        63: A,
                        64: x,
                        65: I,
                        66: S,
                        67: L,
                        68: P,
                        69: C,
                        70: $,
                        71: R,
                        72: T,
                        73: N,
                        74: w,
                        75: M,
                        76: D,
                        77: F,
                        78: U,
                        79: j,
                        80: G,
                        82: X
                    }, e(K, [2, 11]), {
                        14: [1, 134]
                    }, e(K, [2, 14]), e(K, [2, 13]), e(H, [2, 25]), e(H, [2, 33]), {
                        14: [1, 135]
                    }, e(K, [2, 10]), e(K, [2, 12]), e(K, [2, 9])],
                    defaultActions: {
                        3: [2, 2],
                        72: [2, 1],
                        105: [2, 37]
                    },
                    parseError: function(e, t) {
                        if (!t.recoverable) {
                            var r = new Error(e);
                            throw r.hash = t,
                            r
                        }
                        this.trace(e)
                    },
                    parse: function(e) {
                        var t = this
                          , r = [0]
                          , i = [null]
                          , n = []
                          , s = this.table
                          , a = ""
                          , o = 0
                          , c = 0
                          , l = 0
                          , u = 2
                          , h = 1
                          , p = n.slice.call(arguments, 1)
                          , f = Object.create(this.lexer)
                          , m = {
                            yy: {}
                        };
                        for (var y in this.yy)
                            Object.prototype.hasOwnProperty.call(this.yy, y) && (m.yy[y] = this.yy[y]);
                        f.setInput(e, m.yy),
                        m.yy.lexer = f,
                        m.yy.parser = this,
                        void 0 === f.yylloc && (f.yylloc = {});
                        var d = f.yylloc;
                        n.push(d);
                        var g = f.options && f.options.ranges;
                        "function" == typeof m.yy.parseError ? this.parseError = m.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
                        for (var v, _, k, b, E, O, A, x, I, S = function() {
                            var e;
                            return "number" != typeof (e = f.lex() || h) && (e = t.symbols_[e] || e),
                            e
                        }, L = {}; ; ) {
                            if (k = r[r.length - 1],
                            this.defaultActions[k] ? b = this.defaultActions[k] : (null == v && (v = S()),
                            b = s[k] && s[k][v]),
                            void 0 === b || !b.length || !b[0]) {
                                var P = "";
                                for (O in I = [],
                                s[k])
                                    this.terminals_[O] && O > u && I.push("'" + this.terminals_[O] + "'");
                                P = f.showPosition ? "Parse error on line " + (o + 1) + ":\n" + f.showPosition() + "\nExpecting " + I.join(", ") + ", got '" + (this.terminals_[v] || v) + "'" : "Parse error on line " + (o + 1) + ": Unexpected " + (v == h ? "end of input" : "'" + (this.terminals_[v] || v) + "'"),
                                this.parseError(P, {
                                    text: f.match,
                                    token: this.terminals_[v] || v,
                                    line: f.yylineno,
                                    loc: d,
                                    expected: I
                                })
                            }
                            if (b[0]instanceof Array && b.length > 1)
                                throw new Error("Parse Error: multiple actions possible at state: " + k + ", token: " + v);
                            switch (b[0]) {
                            case 1:
                                r.push(v),
                                i.push(f.yytext),
                                n.push(f.yylloc),
                                r.push(b[1]),
                                v = null,
                                _ ? (v = _,
                                _ = null) : (c = f.yyleng,
                                a = f.yytext,
                                o = f.yylineno,
                                d = f.yylloc,
                                l > 0 && l--);
                                break;
                            case 2:
                                if (A = this.productions_[b[1]][1],
                                L.$ = i[i.length - A],
                                L._$ = {
                                    first_line: n[n.length - (A || 1)].first_line,
                                    last_line: n[n.length - 1].last_line,
                                    first_column: n[n.length - (A || 1)].first_column,
                                    last_column: n[n.length - 1].last_column
                                },
                                g && (L._$.range = [n[n.length - (A || 1)].range[0], n[n.length - 1].range[1]]),
                                void 0 !== (E = this.performAction.apply(L, [a, c, o, m.yy, b[1], i, n].concat(p))))
                                    return E;
                                A && (r = r.slice(0, -1 * A * 2),
                                i = i.slice(0, -1 * A),
                                n = n.slice(0, -1 * A)),
                                r.push(this.productions_[b[1]][0]),
                                i.push(L.$),
                                n.push(L._$),
                                x = s[r[r.length - 2]][r[r.length - 1]],
                                r.push(x);
                                break;
                            case 3:
                                return !0
                            }
                        }
                        return !0
                    }
                }
                  , q = {
                    EOF: 1,
                    parseError: function(e, t) {
                        if (!this.yy.parser)
                            throw new Error(e);
                        this.yy.parser.parseError(e, t)
                    },
                    setInput: function(e, t) {
                        return this.yy = t || this.yy || {},
                        this._input = e,
                        this._more = this._backtrack = this.done = !1,
                        this.yylineno = this.yyleng = 0,
                        this.yytext = this.matched = this.match = "",
                        this.conditionStack = ["INITIAL"],
                        this.yylloc = {
                            first_line: 1,
                            first_column: 0,
                            last_line: 1,
                            last_column: 0
                        },
                        this.options.ranges && (this.yylloc.range = [0, 0]),
                        this.offset = 0,
                        this
                    },
                    input: function() {
                        var e = this._input[0];
                        return this.yytext += e,
                        this.yyleng++,
                        this.offset++,
                        this.match += e,
                        this.matched += e,
                        e.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++,
                        this.yylloc.last_line++) : this.yylloc.last_column++,
                        this.options.ranges && this.yylloc.range[1]++,
                        this._input = this._input.slice(1),
                        e
                    },
                    unput: function(e) {
                        var t = e.length
                          , r = e.split(/(?:\r\n?|\n)/g);
                        this._input = e + this._input,
                        this.yytext = this.yytext.substr(0, this.yytext.length - t),
                        this.offset -= t;
                        var i = this.match.split(/(?:\r\n?|\n)/g);
                        this.match = this.match.substr(0, this.match.length - 1),
                        this.matched = this.matched.substr(0, this.matched.length - 1),
                        r.length - 1 && (this.yylineno -= r.length - 1);
                        var n = this.yylloc.range;
                        return this.yylloc = {
                            first_line: this.yylloc.first_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.first_column,
                            last_column: r ? (r.length === i.length ? this.yylloc.first_column : 0) + i[i.length - r.length].length - r[0].length : this.yylloc.first_column - t
                        },
                        this.options.ranges && (this.yylloc.range = [n[0], n[0] + this.yyleng - t]),
                        this.yyleng = this.yytext.length,
                        this
                    },
                    more: function() {
                        return this._more = !0,
                        this
                    },
                    reject: function() {
                        return this.options.backtrack_lexer ? (this._backtrack = !0,
                        this) : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
                            text: "",
                            token: null,
                            line: this.yylineno
                        })
                    },
                    less: function(e) {
                        this.unput(this.match.slice(e))
                    },
                    pastInput: function() {
                        var e = this.matched.substr(0, this.matched.length - this.match.length);
                        return (e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "")
                    },
                    upcomingInput: function() {
                        var e = this.match;
                        return e.length < 20 && (e += this._input.substr(0, 20 - e.length)),
                        (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "")
                    },
                    showPosition: function() {
                        var e = this.pastInput()
                          , t = new Array(e.length + 1).join("-");
                        return e + this.upcomingInput() + "\n" + t + "^"
                    },
                    test_match: function(e, t) {
                        var r, i, n;
                        if (this.options.backtrack_lexer && (n = {
                            yylineno: this.yylineno,
                            yylloc: {
                                first_line: this.yylloc.first_line,
                                last_line: this.last_line,
                                first_column: this.yylloc.first_column,
                                last_column: this.yylloc.last_column
                            },
                            yytext: this.yytext,
                            match: this.match,
                            matches: this.matches,
                            matched: this.matched,
                            yyleng: this.yyleng,
                            offset: this.offset,
                            _more: this._more,
                            _input: this._input,
                            yy: this.yy,
                            conditionStack: this.conditionStack.slice(0),
                            done: this.done
                        },
                        this.options.ranges && (n.yylloc.range = this.yylloc.range.slice(0))),
                        (i = e[0].match(/(?:\r\n?|\n).*/g)) && (this.yylineno += i.length),
                        this.yylloc = {
                            first_line: this.yylloc.last_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.last_column,
                            last_column: i ? i[i.length - 1].length - i[i.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + e[0].length
                        },
                        this.yytext += e[0],
                        this.match += e[0],
                        this.matches = e,
                        this.yyleng = this.yytext.length,
                        this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]),
                        this._more = !1,
                        this._backtrack = !1,
                        this._input = this._input.slice(e[0].length),
                        this.matched += e[0],
                        r = this.performAction.call(this, this.yy, this, t, this.conditionStack[this.conditionStack.length - 1]),
                        this.done && this._input && (this.done = !1),
                        r)
                            return r;
                        if (this._backtrack) {
                            for (var s in n)
                                this[s] = n[s];
                            return !1
                        }
                        return !1
                    },
                    next: function() {
                        if (this.done)
                            return this.EOF;
                        var e, t, r, i;
                        this._input || (this.done = !0),
                        this._more || (this.yytext = "",
                        this.match = "");
                        for (var n = this._currentRules(), s = 0; s < n.length; s++)
                            if ((r = this._input.match(this.rules[n[s]])) && (!t || r[0].length > t[0].length)) {
                                if (t = r,
                                i = s,
                                this.options.backtrack_lexer) {
                                    if (!1 !== (e = this.test_match(r, n[s])))
                                        return e;
                                    if (this._backtrack) {
                                        t = !1;
                                        continue
                                    }
                                    return !1
                                }
                                if (!this.options.flex)
                                    break
                            }
                        return t ? !1 !== (e = this.test_match(t, n[i])) && e : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                            text: "",
                            token: null,
                            line: this.yylineno
                        })
                    },
                    lex: function() {
                        var e = this.next();
                        return e || this.lex()
                    },
                    begin: function(e) {
                        this.conditionStack.push(e)
                    },
                    popState: function() {
                        return this.conditionStack.length - 1 > 0 ? this.conditionStack.pop() : this.conditionStack[0]
                    },
                    _currentRules: function() {
                        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules
                    },
                    topState: function(e) {
                        return (e = this.conditionStack.length - 1 - Math.abs(e || 0)) >= 0 ? this.conditionStack[e] : "INITIAL"
                    },
                    pushState: function(e) {
                        this.begin(e)
                    },
                    stateStackSize: function() {
                        return this.conditionStack.length
                    },
                    options: {},
                    performAction: function(e, t, r, i) {
                        switch (r) {
                        case 0:
                            return this.begin("modexp"),
                            11;
                        case 1:
                            return 21;
                        case 2:
                            return this.begin("modexp"),
                            11;
                        case 3:
                            return 12;
                        case 4:
                            return 13;
                        case 5:
                            return this.popState(),
                            14;
                        case 6:
                            return 63;
                        case 7:
                            return 64;
                        case 8:
                            return 65;
                        case 9:
                            return 66;
                        case 10:
                            return 67;
                        case 11:
                            return 68;
                        case 12:
                            return 69;
                        case 13:
                            return 54;
                        case 14:
                            return 48;
                        case 15:
                            return 49;
                        case 16:
                            return 50;
                        case 17:
                            return 55;
                        case 18:
                            return 51;
                        case 19:
                            return 52;
                        case 20:
                            return 53;
                        case 21:
                            return 57;
                        case 22:
                            return 56;
                        case 23:
                            return 75;
                        case 24:
                            return 70;
                        case 25:
                            return 71;
                        case 26:
                        case 27:
                        case 28:
                        case 29:
                        case 30:
                        case 31:
                        case 32:
                        case 33:
                        case 34:
                            return 73;
                        case 35:
                            return 72;
                        case 36:
                        case 37:
                            return 73;
                        case 38:
                        case 39:
                        case 40:
                        case 41:
                        case 42:
                        case 43:
                        case 44:
                        case 45:
                        case 46:
                        case 47:
                            return 72;
                        case 48:
                            return 74;
                        case 49:
                            return 20;
                        case 50:
                            return 47;
                        case 51:
                            return 21;
                        case 52:
                            return 81;
                        case 53:
                            return 60;
                        case 54:
                            return 15;
                        case 55:
                            return this.begin("radical"),
                            17;
                        case 56:
                            return this.popState(),
                            18;
                        case 57:
                            return 18;
                        case 58:
                            return 78;
                        case 59:
                            return 80;
                        case 60:
                            return 79;
                        case 61:
                        case 62:
                            return 59;
                        case 63:
                            return t.yytext = this.matches[1],
                            76;
                        case 64:
                            return 23;
                        case 65:
                            return 24;
                        case 66:
                            return 25;
                        case 67:
                            return t.yytext = this.matches[1],
                            62;
                        case 68:
                            return 61;
                        case 69:
                            return 77;
                        case 70:
                            return 82;
                        case 71:
                            return 46;
                        case 72:
                            return 47;
                        case 73:
                            return 58;
                        case 74:
                            return 5;
                        case 75:
                            return 84
                        }
                    },
                    rules: [/^(?:"(?=[^>\]]+%))/, /^(?:")/, /^(?:"(?=[^>\]]+\]|[^>\]]+%))/, /^(?:%)/, /^(?:<)/, /^(?:\])/, /^(?:[+])/, /^(?:[-])/, /^(?:[*])/, /^(?:[@][*])/, /^(?:[@][\#])/, /^(?:[_][/])/, /^(?:[.][/])/, /^(?:[.][.][(])/, /^(?:[@][(])/, /^(?:[.][(])/, /^(?:[(])/, /^(?:[.][.][)])/, /^(?:[@][)])/, /^(?:[.][)])/, /^(?:[)])/, /^(?:[\\][\\])/, /^(?:[\\])/, /^(?:[_][3])/, /^(?:[@][0])/, /^(?:[ ][$]O[ ])/, /^(?:[ ][\^;]+[.]K[ ])/, /^(?:[\^;]+[=])/, /^(?:[ ][\^;]+[/][.]K[ ])/, /^(?:[ ][\^;]+[@][:][@][:][ ])/, /^(?:[ ][\^;]+["]K[:][ ])/, /^(?:[ ][\^;]+[.]1[:][ ])/, /^(?:[ ][\^;]+["]K[ ])/, /^(?:[ ][\^;]+[.]1[ ])/, /^(?:[ ][\^;]+[/][$][L][ ])/, /^(?:[ ][.]K[ ])/, /^(?:[ ][\^;]+[/]?[$][L][ ])/, /^(?:[ ][\^;]+[$]P[ ])/, /^(?:[=])/, /^(?:[ ][/][.]K[ ])/, /^(?:[ ][@][:][@][:][ ])/, /^(?:[ ]["]K[:][ ])/, /^(?:[ ][.]1[:][ ])/, /^(?:[ ]["]K[ ])/, /^(?:[ ][.]1[ ])/, /^(?:[@][:])/, /^(?:[ ][/]?[$][L][ ])/, /^(?:[ ][$]P[ ])/, /^(?:[ ]['][']['][ ])/, /^(?:[\^;]+)/, /^(?:[.]["])/, /^(?:["])/, /^(?:[']+)/, /^(?:[.][,]?[ABGDEZ\?\:IKLMNXOPRSTUYF\&W])/, /^(?:[.]*[<])/, /^(?:[.]*[>])/, /^(?:[.]*\])/, /^(?:[.]*\])/, /^(?:!)/, /^(?:[_]&)/, /^(?:&)/, /^(?:(ARC)?(SIN|COS|TAN|CSC|SEC|COT)(H)?)/, /^(?:(ARG|DET|EXP|IM|INF|LIM|LN|LOG|MAX|MIN|MOD|RE|SUP))/, /^(?:#?(\d*\.?\d+))/, /^(?:[,]*[?])/, /^(?:[,]*[/])/, /^(?:[,]*#)/, /^(?:[,]([A-Z]))/, /^(?:[A-Z])/, /^(?:[,][=])/, /^(?:[_][8])/, /^(?:[,][ ]?)/, /^(?:[.])/, /^(?:[ ])/, /^(?:$)/, /^(?:.)/],
                    conditions: {
                        radical: {
                            rules: [0, 1, 2, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
                            inclusive: !0
                        },
                        modexp: {
                            rules: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
                            inclusive: !0
                        },
                        INITIAL: {
                            rules: [2, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
                            inclusive: !0
                        }
                    }
                };
                function z() {
                    this.yy = {}
                }
                return W.lexer = q,
                z.prototype = W,
                W.Parser = z,
                new z
            }();
            t.parser = n,
            t.Parser = n.Parser,
            t.parse = function() {
                return n.parse.apply(n, arguments)
            }
            ,
            t.main = function(i) {
                i[1] || (console.log("Usage: " + i[0] + " FILE"),
                e.exit(1));
                var n = r(4).readFileSync(r(5).normalize(i[1]), "utf8");
                return t.parser.parse(n)
            }
            ,
            void 0 !== i && r.c[r.s] === i && t.main(e.argv.slice(1))
        }
        ).call(t, r(1), r(8)(e))
    }
    , function(e, t, r) {
        (function(e, i) {
            var n = function() {
                var e = function(e, t, r, i) {
                    for (r = r || {},
                    i = e.length; i--; r[e[i]] = t)
                        ;
                    return r
                }
                  , t = [1, 15]
                  , r = [1, 16]
                  , i = [1, 17]
                  , n = [1, 36]
                  , s = [1, 18]
                  , a = [1, 37]
                  , o = [1, 38]
                  , c = [1, 14]
                  , l = [1, 46]
                  , u = [1, 47]
                  , h = [1, 39]
                  , p = [1, 40]
                  , f = [1, 41]
                  , m = [1, 56]
                  , y = [1, 42]
                  , d = [1, 43]
                  , g = [1, 44]
                  , v = [1, 45]
                  , _ = [1, 54]
                  , k = [1, 55]
                  , b = [1, 57]
                  , E = [1, 58]
                  , O = [1, 59]
                  , A = [1, 60]
                  , x = [1, 61]
                  , I = [1, 62]
                  , S = [1, 63]
                  , L = [1, 64]
                  , P = [1, 65]
                  , C = [1, 66]
                  , $ = [1, 67]
                  , R = [1, 68]
                  , T = [1, 69]
                  , N = [1, 70]
                  , w = [1, 71]
                  , M = [1, 72]
                  , D = [1, 73]
                  , F = [1, 74]
                  , U = [1, 75]
                  , j = [1, 76]
                  , G = [1, 48]
                  , X = [1, 49]
                  , B = [1, 50]
                  , K = [1, 51]
                  , Z = [1, 52]
                  , V = [1, 77]
                  , H = [1, 53]
                  , W = [5, 14, 18, 19, 29, 52, 53, 54]
                  , q = [5, 10, 13, 14, 15, 18, 19, 29, 52, 53, 54]
                  , z = [5, 10, 13, 14, 15, 17, 18, 19, 21, 23, 24, 28, 29, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88]
                  , Q = [1, 85]
                  , Y = [1, 86]
                  , J = [1, 87]
                  , ee = [10, 13, 15, 17, 21, 23, 24, 28, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88]
                  , te = {
                    trace: function() {},
                    yy: {},
                    symbols_: {
                        error: 2,
                        sentence: 3,
                        group: 4,
                        EOF: 5,
                        expression_group: 6,
                        delimited_expression: 7,
                        level: 8,
                        radical: 9,
                        LEVEL: 10,
                        basic_token: 11,
                        bracketed_expression: 12,
                        RADICAL_WITH_INDEX: 13,
                        CLOSE_RADICAL: 14,
                        RADICAL: 15,
                        frac: 16,
                        OPEN_FRAC: 17,
                        OVER: 18,
                        CLOSE_FRAC: 19,
                        simple_frac: 20,
                        NUMBER: 21,
                        NUMBER_FRAC_DENOMINATOR: 22,
                        NUMBER_FRAC_NUMERATOR_BAD: 23,
                        NUMBER_FRAC_DENOMINATOR_BAD: 24,
                        atom: 25,
                        lbracket: 26,
                        rbracket: 27,
                        OPEN_GROUP: 28,
                        CLOSE_GROUP: 29,
                        command: 30,
                        greek: 31,
                        letter: 32,
                        comma: 33,
                        period: 34,
                        colon: 35,
                        infinity: 36,
                        integral: 37,
                        factorial: 38,
                        ampersand: 39,
                        question_mark: 40,
                        bracket: 41,
                        space: 42,
                        operation: 43,
                        comparison: 44,
                        ellipsis: 45,
                        primes: 46,
                        ",": 47,
                        ".": 48,
                        "[": 49,
                        "{": 50,
                        "(": 51,
                        "]": 52,
                        "}": 53,
                        ")": 54,
                        SPACE: 55,
                        COMMAND: 56,
                        GREEK: 57,
                        CAPITAL_LETTER: 58,
                        LETTER: 59,
                        PIPE: 60,
                        DOUBLE_PIPE: 61,
                        "+": 62,
                        "-": 63,
                        CDOT: 64,
                        TIMES: 65,
                        "*": 66,
                        DIV: 67,
                        SLASH: 68,
                        PERCENT: 69,
                        TO: 70,
                        "=": 71,
                        NEQ: 72,
                        "<": 73,
                        ">": 74,
                        LEQ: 75,
                        APPROX: 76,
                        GEQ: 77,
                        TILDE: 78,
                        PARALLEL: 79,
                        PERPENDICULAR: 80,
                        ELLIPSIS: 81,
                        COLON: 82,
                        INFINITY: 83,
                        INTEGRAL: 84,
                        FACTORIAL: 85,
                        "&": 86,
                        PRIMES: 87,
                        "?": 88,
                        unknown: 89,
                        UNKNOWN: 90,
                        $accept: 0,
                        $end: 1
                    },
                    terminals_: {
                        2: "error",
                        5: "EOF",
                        10: "LEVEL",
                        13: "RADICAL_WITH_INDEX",
                        14: "CLOSE_RADICAL",
                        15: "RADICAL",
                        17: "OPEN_FRAC",
                        18: "OVER",
                        19: "CLOSE_FRAC",
                        21: "NUMBER",
                        22: "NUMBER_FRAC_DENOMINATOR",
                        23: "NUMBER_FRAC_NUMERATOR_BAD",
                        24: "NUMBER_FRAC_DENOMINATOR_BAD",
                        28: "OPEN_GROUP",
                        29: "CLOSE_GROUP",
                        47: ",",
                        48: ".",
                        49: "[",
                        50: "{",
                        51: "(",
                        52: "]",
                        53: "}",
                        54: ")",
                        55: "SPACE",
                        56: "COMMAND",
                        57: "GREEK",
                        58: "CAPITAL_LETTER",
                        59: "LETTER",
                        60: "PIPE",
                        61: "DOUBLE_PIPE",
                        62: "+",
                        63: "-",
                        64: "CDOT",
                        65: "TIMES",
                        66: "*",
                        67: "DIV",
                        68: "SLASH",
                        69: "PERCENT",
                        70: "TO",
                        71: "=",
                        72: "NEQ",
                        73: "<",
                        74: ">",
                        75: "LEQ",
                        76: "APPROX",
                        77: "GEQ",
                        78: "TILDE",
                        79: "PARALLEL",
                        80: "PERPENDICULAR",
                        81: "ELLIPSIS",
                        82: "COLON",
                        83: "INFINITY",
                        84: "INTEGRAL",
                        85: "FACTORIAL",
                        86: "&",
                        87: "PRIMES",
                        88: "?",
                        90: "UNKNOWN"
                    },
                    productions_: [0, [3, 2], [3, 1], [4, 3], [4, 2], [4, 1], [4, 2], [4, 1], [7, 1], [7, 1], [8, 2], [8, 2], [8, 2], [9, 4], [9, 3], [9, 3], [9, 2], [9, 4], [9, 3], [9, 2], [16, 5], [16, 4], [16, 4], [16, 3], [16, 2], [20, 2], [20, 1], [20, 1], [11, 1], [11, 1], [11, 1], [6, 2], [6, 2], [6, 1], [6, 1], [12, 3], [12, 2], [12, 3], [12, 2], [25, 1], [25, 1], [25, 1], [25, 1], [25, 1], [25, 1], [25, 1], [25, 1], [25, 1], [25, 1], [25, 1], [25, 1], [25, 1], [25, 1], [25, 1], [25, 1], [25, 1], [25, 1], [33, 1], [34, 1], [26, 1], [26, 1], [26, 1], [27, 1], [27, 1], [27, 1], [42, 1], [30, 1], [31, 1], [32, 1], [32, 1], [41, 1], [41, 1], [43, 1], [43, 1], [43, 1], [43, 1], [43, 1], [43, 1], [43, 1], [43, 1], [43, 1], [44, 1], [44, 1], [44, 1], [44, 1], [44, 1], [44, 1], [44, 1], [44, 1], [44, 1], [44, 1], [45, 1], [35, 1], [36, 1], [37, 1], [38, 1], [39, 1], [46, 1], [40, 1], [89, 1]],
                    performAction: function(e, t, r, i, n, s, a) {
                        var o = s.length - 1;
                        switch (n) {
                        case 1:
                            return s[o - 1];
                        case 2:
                            return i.group();
                        case 3:
                        case 35:
                            this.$ = i.group(s[o - 2], s[o - 1], s[o]);
                            break;
                        case 4:
                        case 6:
                        case 31:
                        case 32:
                        case 36:
                            this.$ = i.group(s[o - 1], s[o]);
                            break;
                        case 5:
                        case 7:
                        case 33:
                        case 34:
                            this.$ = i.group(s[o]);
                            break;
                        case 10:
                        case 11:
                        case 12:
                            this.$ = i.basic_level(s[o - 1], i.group(s[o]));
                            break;
                        case 13:
                        case 17:
                            this.$ = i.radical(s[o - 1], i.group(s[o - 2]));
                            break;
                        case 14:
                        case 15:
                            this.$ = i.radical(i.group(), i.group(s[o - 1]));
                            break;
                        case 16:
                            this.$ = i.radical(i.group(), i.group());
                            break;
                        case 18:
                            this.$ = i.radical(s[o - 1]);
                            break;
                        case 19:
                            this.$ = i.radical(i.group());
                            break;
                        case 20:
                            this.$ = i.fraction(s[o - 3], s[o - 1]);
                            break;
                        case 21:
                            this.$ = i.fraction(s[o - 2], i.group());
                            break;
                        case 22:
                            this.$ = i.fraction(i.group(), s[o - 1]);
                            break;
                        case 23:
                        case 24:
                            this.$ = i.fraction(i.group(), i.group());
                            break;
                        case 25:
                            this.$ = i.fraction(i.group(i.terminal(i.to_number(s[o - 1]))), i.group(i.terminal(i.to_number(s[o]))));
                            break;
                        case 26:
                            this.$ = i.fraction(i.group(i.terminal(i.to_number(s[o]))), i.group());
                            break;
                        case 27:
                            this.$ = i.fraction(i.group(), i.group(i.terminal(i.to_number(s[$01]))));
                            break;
                        case 37:
                            this.$ = i.group(s[o - 1]);
                            break;
                        case 38:
                            this.$ = i.group();
                            break;
                        case 39:
                            this.$ = i.terminal(i.to_number(s[o]));
                            break;
                        case 57:
                            this.$ = i.terminal(",");
                            break;
                        case 58:
                            this.$ = i.terminal(".");
                            break;
                        case 59:
                            this.$ = i.terminal("[");
                            break;
                        case 60:
                            this.$ = i.terminal("\\{");
                            break;
                        case 61:
                            this.$ = i.terminal("(");
                            break;
                        case 62:
                            this.$ = i.terminal("]");
                            break;
                        case 63:
                            this.$ = i.terminal("\\}");
                            break;
                        case 64:
                            this.$ = i.terminal(")");
                            break;
                        case 65:
                            this.$ = i.terminal(" ");
                            break;
                        case 66:
                            this.$ = i.command("\\" + s[o].trim().toLowerCase());
                            break;
                        case 67:
                            this.$ = i.terminal(i.greek(s[o]));
                            break;
                        case 68:
                            this.$ = i.terminal(s[o].toUpperCase());
                            break;
                        case 69:
                            this.$ = i.terminal(s[o].toLowerCase());
                            break;
                        case 70:
                            this.$ = i.terminal("|");
                            break;
                        case 71:
                            this.$ = i.terminal("\\|");
                            break;
                        case 72:
                            this.$ = i.terminal("+");
                            break;
                        case 73:
                            this.$ = i.terminal("-");
                            break;
                        case 74:
                            this.$ = i.terminal("\\cdot ");
                            break;
                        case 75:
                            this.$ = i.terminal("\\times ");
                            break;
                        case 76:
                            this.$ = i.terminal("*");
                            break;
                        case 77:
                            this.$ = i.terminal("\\div ");
                            break;
                        case 78:
                            this.$ = i.terminal("/");
                            break;
                        case 79:
                            this.$ = i.terminal("\\%");
                            break;
                        case 80:
                            this.$ = i.terminal("\\to ");
                            break;
                        case 81:
                            this.$ = i.terminal("=");
                            break;
                        case 82:
                            this.$ = i.terminal("\\neq ");
                            break;
                        case 83:
                            this.$ = i.terminal("<");
                            break;
                        case 84:
                            this.$ = i.terminal(">");
                            break;
                        case 85:
                            this.$ = i.terminal("\\leq ");
                            break;
                        case 86:
                            this.$ = i.terminal("\\approx ");
                            break;
                        case 87:
                            this.$ = i.terminal("\\geq ");
                            break;
                        case 88:
                            this.$ = i.terminal("\\sim ");
                            break;
                        case 89:
                            this.$ = i.terminal("\\parallel ");
                            break;
                        case 90:
                            this.$ = i.terminal("\\perp ");
                            break;
                        case 91:
                            this.$ = i.terminal("\\ldots ");
                            break;
                        case 92:
                            this.$ = i.terminal(":");
                            break;
                        case 93:
                            this.$ = i.terminal("\\infty ");
                            break;
                        case 94:
                            this.$ = i.terminal("\\int ");
                            break;
                        case 95:
                            this.$ = i.terminal("!");
                            break;
                        case 96:
                            this.$ = i.terminal("\\&");
                            break;
                        case 97:
                            this.$ = i.primes(s[o]);
                            break;
                        case 98:
                            this.$ = i.terminal("?")
                        }
                    },
                    table: [{
                        3: 1,
                        4: 2,
                        5: [1, 3],
                        6: 4,
                        7: 5,
                        8: 8,
                        9: 9,
                        10: t,
                        11: 6,
                        12: 7,
                        13: r,
                        15: i,
                        16: 11,
                        17: n,
                        20: 12,
                        21: s,
                        23: a,
                        24: o,
                        25: 10,
                        26: 13,
                        28: c,
                        30: 19,
                        31: 20,
                        32: 21,
                        33: 22,
                        34: 23,
                        35: 24,
                        36: 25,
                        37: 26,
                        38: 27,
                        39: 28,
                        40: 29,
                        41: 30,
                        42: 31,
                        43: 32,
                        44: 33,
                        45: 34,
                        46: 35,
                        47: l,
                        48: u,
                        49: h,
                        50: p,
                        51: f,
                        55: m,
                        56: y,
                        57: d,
                        58: g,
                        59: v,
                        60: _,
                        61: k,
                        62: b,
                        63: E,
                        64: O,
                        65: A,
                        66: x,
                        67: I,
                        68: S,
                        69: L,
                        70: P,
                        71: C,
                        72: $,
                        73: R,
                        74: T,
                        75: N,
                        76: w,
                        77: M,
                        78: D,
                        79: F,
                        80: U,
                        81: j,
                        82: G,
                        83: X,
                        84: B,
                        85: K,
                        86: Z,
                        87: V,
                        88: H
                    }, {
                        1: [3]
                    }, {
                        5: [1, 78]
                    }, {
                        1: [2, 2]
                    }, e(W, [2, 5], {
                        8: 8,
                        9: 9,
                        7: 79,
                        10: t,
                        13: r,
                        15: i
                    }), e(W, [2, 7], {
                        6: 4,
                        7: 5,
                        11: 6,
                        12: 7,
                        8: 8,
                        9: 9,
                        25: 10,
                        16: 11,
                        20: 12,
                        26: 13,
                        30: 19,
                        31: 20,
                        32: 21,
                        33: 22,
                        34: 23,
                        35: 24,
                        36: 25,
                        37: 26,
                        38: 27,
                        39: 28,
                        40: 29,
                        41: 30,
                        42: 31,
                        43: 32,
                        44: 33,
                        45: 34,
                        46: 35,
                        4: 80,
                        10: t,
                        13: r,
                        15: i,
                        17: n,
                        21: s,
                        23: a,
                        24: o,
                        28: c,
                        47: l,
                        48: u,
                        49: h,
                        50: p,
                        51: f,
                        55: m,
                        56: y,
                        57: d,
                        58: g,
                        59: v,
                        60: _,
                        61: k,
                        62: b,
                        63: E,
                        64: O,
                        65: A,
                        66: x,
                        67: I,
                        68: S,
                        69: L,
                        70: P,
                        71: C,
                        72: $,
                        73: R,
                        74: T,
                        75: N,
                        76: w,
                        77: M,
                        78: D,
                        79: F,
                        80: U,
                        81: j,
                        82: G,
                        83: X,
                        84: B,
                        85: K,
                        86: Z,
                        87: V,
                        88: H
                    }), e(q, [2, 33], {
                        11: 6,
                        12: 7,
                        25: 10,
                        16: 11,
                        20: 12,
                        26: 13,
                        30: 19,
                        31: 20,
                        32: 21,
                        33: 22,
                        34: 23,
                        35: 24,
                        36: 25,
                        37: 26,
                        38: 27,
                        39: 28,
                        40: 29,
                        41: 30,
                        42: 31,
                        43: 32,
                        44: 33,
                        45: 34,
                        46: 35,
                        6: 81,
                        17: n,
                        21: s,
                        23: a,
                        24: o,
                        28: c,
                        47: l,
                        48: u,
                        49: h,
                        50: p,
                        51: f,
                        55: m,
                        56: y,
                        57: d,
                        58: g,
                        59: v,
                        60: _,
                        61: k,
                        62: b,
                        63: E,
                        64: O,
                        65: A,
                        66: x,
                        67: I,
                        68: S,
                        69: L,
                        70: P,
                        71: C,
                        72: $,
                        73: R,
                        74: T,
                        75: N,
                        76: w,
                        77: M,
                        78: D,
                        79: F,
                        80: U,
                        81: j,
                        82: G,
                        83: X,
                        84: B,
                        85: K,
                        86: Z,
                        87: V,
                        88: H
                    }), e(q, [2, 34], {
                        11: 6,
                        12: 7,
                        25: 10,
                        16: 11,
                        20: 12,
                        26: 13,
                        30: 19,
                        31: 20,
                        32: 21,
                        33: 22,
                        34: 23,
                        35: 24,
                        36: 25,
                        37: 26,
                        38: 27,
                        39: 28,
                        40: 29,
                        41: 30,
                        42: 31,
                        43: 32,
                        44: 33,
                        45: 34,
                        46: 35,
                        6: 82,
                        17: n,
                        21: s,
                        23: a,
                        24: o,
                        28: c,
                        47: l,
                        48: u,
                        49: h,
                        50: p,
                        51: f,
                        55: m,
                        56: y,
                        57: d,
                        58: g,
                        59: v,
                        60: _,
                        61: k,
                        62: b,
                        63: E,
                        64: O,
                        65: A,
                        66: x,
                        67: I,
                        68: S,
                        69: L,
                        70: P,
                        71: C,
                        72: $,
                        73: R,
                        74: T,
                        75: N,
                        76: w,
                        77: M,
                        78: D,
                        79: F,
                        80: U,
                        81: j,
                        82: G,
                        83: X,
                        84: B,
                        85: K,
                        86: Z,
                        87: V,
                        88: H
                    }), e(z, [2, 8]), e(z, [2, 9]), e(z, [2, 28]), e(z, [2, 29]), e(z, [2, 30]), {
                        4: 83,
                        6: 4,
                        7: 5,
                        8: 8,
                        9: 9,
                        10: t,
                        11: 6,
                        12: 7,
                        13: r,
                        15: i,
                        16: 11,
                        17: n,
                        20: 12,
                        21: s,
                        23: a,
                        24: o,
                        25: 10,
                        26: 13,
                        27: 84,
                        28: c,
                        30: 19,
                        31: 20,
                        32: 21,
                        33: 22,
                        34: 23,
                        35: 24,
                        36: 25,
                        37: 26,
                        38: 27,
                        39: 28,
                        40: 29,
                        41: 30,
                        42: 31,
                        43: 32,
                        44: 33,
                        45: 34,
                        46: 35,
                        47: l,
                        48: u,
                        49: h,
                        50: p,
                        51: f,
                        52: Q,
                        53: Y,
                        54: J,
                        55: m,
                        56: y,
                        57: d,
                        58: g,
                        59: v,
                        60: _,
                        61: k,
                        62: b,
                        63: E,
                        64: O,
                        65: A,
                        66: x,
                        67: I,
                        68: S,
                        69: L,
                        70: P,
                        71: C,
                        72: $,
                        73: R,
                        74: T,
                        75: N,
                        76: w,
                        77: M,
                        78: D,
                        79: F,
                        80: U,
                        81: j,
                        82: G,
                        83: X,
                        84: B,
                        85: K,
                        86: Z,
                        87: V,
                        88: H
                    }, {
                        4: 88,
                        6: 4,
                        7: 5,
                        8: 8,
                        9: 9,
                        10: t,
                        11: 6,
                        12: 7,
                        13: r,
                        15: i,
                        16: 11,
                        17: n,
                        20: 12,
                        21: s,
                        23: a,
                        24: o,
                        25: 10,
                        26: 13,
                        28: c,
                        29: [1, 89],
                        30: 19,
                        31: 20,
                        32: 21,
                        33: 22,
                        34: 23,
                        35: 24,
                        36: 25,
                        37: 26,
                        38: 27,
                        39: 28,
                        40: 29,
                        41: 30,
                        42: 31,
                        43: 32,
                        44: 33,
                        45: 34,
                        46: 35,
                        47: l,
                        48: u,
                        49: h,
                        50: p,
                        51: f,
                        55: m,
                        56: y,
                        57: d,
                        58: g,
                        59: v,
                        60: _,
                        61: k,
                        62: b,
                        63: E,
                        64: O,
                        65: A,
                        66: x,
                        67: I,
                        68: S,
                        69: L,
                        70: P,
                        71: C,
                        72: $,
                        73: R,
                        74: T,
                        75: N,
                        76: w,
                        77: M,
                        78: D,
                        79: F,
                        80: U,
                        81: j,
                        82: G,
                        83: X,
                        84: B,
                        85: K,
                        86: Z,
                        87: V,
                        88: H
                    }, {
                        9: 92,
                        11: 90,
                        12: 91,
                        13: r,
                        15: i,
                        16: 11,
                        17: n,
                        20: 12,
                        21: s,
                        23: a,
                        24: o,
                        25: 10,
                        26: 13,
                        28: c,
                        30: 19,
                        31: 20,
                        32: 21,
                        33: 22,
                        34: 23,
                        35: 24,
                        36: 25,
                        37: 26,
                        38: 27,
                        39: 28,
                        40: 29,
                        41: 30,
                        42: 31,
                        43: 32,
                        44: 33,
                        45: 34,
                        46: 35,
                        47: l,
                        48: u,
                        49: h,
                        50: p,
                        51: f,
                        55: m,
                        56: y,
                        57: d,
                        58: g,
                        59: v,
                        60: _,
                        61: k,
                        62: b,
                        63: E,
                        64: O,
                        65: A,
                        66: x,
                        67: I,
                        68: S,
                        69: L,
                        70: P,
                        71: C,
                        72: $,
                        73: R,
                        74: T,
                        75: N,
                        76: w,
                        77: M,
                        78: D,
                        79: F,
                        80: U,
                        81: j,
                        82: G,
                        83: X,
                        84: B,
                        85: K,
                        86: Z,
                        87: V,
                        88: H
                    }, {
                        11: 93,
                        12: 94,
                        14: [1, 95],
                        16: 11,
                        17: n,
                        20: 12,
                        21: s,
                        23: a,
                        24: o,
                        25: 10,
                        26: 13,
                        28: c,
                        30: 19,
                        31: 20,
                        32: 21,
                        33: 22,
                        34: 23,
                        35: 24,
                        36: 25,
                        37: 26,
                        38: 27,
                        39: 28,
                        40: 29,
                        41: 30,
                        42: 31,
                        43: 32,
                        44: 33,
                        45: 34,
                        46: 35,
                        47: l,
                        48: u,
                        49: h,
                        50: p,
                        51: f,
                        55: m,
                        56: y,
                        57: d,
                        58: g,
                        59: v,
                        60: _,
                        61: k,
                        62: b,
                        63: E,
                        64: O,
                        65: A,
                        66: x,
                        67: I,
                        68: S,
                        69: L,
                        70: P,
                        71: C,
                        72: $,
                        73: R,
                        74: T,
                        75: N,
                        76: w,
                        77: M,
                        78: D,
                        79: F,
                        80: U,
                        81: j,
                        82: G,
                        83: X,
                        84: B,
                        85: K,
                        86: Z,
                        87: V,
                        88: H
                    }, {
                        4: 96,
                        6: 4,
                        7: 5,
                        8: 8,
                        9: 9,
                        10: t,
                        11: 6,
                        12: 7,
                        13: r,
                        14: [1, 97],
                        15: i,
                        16: 11,
                        17: n,
                        20: 12,
                        21: s,
                        23: a,
                        24: o,
                        25: 10,
                        26: 13,
                        28: c,
                        30: 19,
                        31: 20,
                        32: 21,
                        33: 22,
                        34: 23,
                        35: 24,
                        36: 25,
                        37: 26,
                        38: 27,
                        39: 28,
                        40: 29,
                        41: 30,
                        42: 31,
                        43: 32,
                        44: 33,
                        45: 34,
                        46: 35,
                        47: l,
                        48: u,
                        49: h,
                        50: p,
                        51: f,
                        55: m,
                        56: y,
                        57: d,
                        58: g,
                        59: v,
                        60: _,
                        61: k,
                        62: b,
                        63: E,
                        64: O,
                        65: A,
                        66: x,
                        67: I,
                        68: S,
                        69: L,
                        70: P,
                        71: C,
                        72: $,
                        73: R,
                        74: T,
                        75: N,
                        76: w,
                        77: M,
                        78: D,
                        79: F,
                        80: U,
                        81: j,
                        82: G,
                        83: X,
                        84: B,
                        85: K,
                        86: Z,
                        87: V,
                        88: H
                    }, e(z, [2, 39], {
                        22: [1, 98]
                    }), e(z, [2, 40]), e(z, [2, 41]), e(z, [2, 42]), e(z, [2, 43]), e(z, [2, 44]), e(z, [2, 45]), e(z, [2, 46]), e(z, [2, 47]), e(z, [2, 48]), e(z, [2, 49]), e(z, [2, 50]), e(z, [2, 51]), e(z, [2, 52]), e(z, [2, 53]), e(z, [2, 54]), e(z, [2, 55]), e(z, [2, 56]), {
                        4: 99,
                        6: 4,
                        7: 5,
                        8: 8,
                        9: 9,
                        10: t,
                        11: 6,
                        12: 7,
                        13: r,
                        15: i,
                        16: 11,
                        17: n,
                        18: [1, 100],
                        19: [1, 101],
                        20: 12,
                        21: s,
                        23: a,
                        24: o,
                        25: 10,
                        26: 13,
                        28: c,
                        30: 19,
                        31: 20,
                        32: 21,
                        33: 22,
                        34: 23,
                        35: 24,
                        36: 25,
                        37: 26,
                        38: 27,
                        39: 28,
                        40: 29,
                        41: 30,
                        42: 31,
                        43: 32,
                        44: 33,
                        45: 34,
                        46: 35,
                        47: l,
                        48: u,
                        49: h,
                        50: p,
                        51: f,
                        55: m,
                        56: y,
                        57: d,
                        58: g,
                        59: v,
                        60: _,
                        61: k,
                        62: b,
                        63: E,
                        64: O,
                        65: A,
                        66: x,
                        67: I,
                        68: S,
                        69: L,
                        70: P,
                        71: C,
                        72: $,
                        73: R,
                        74: T,
                        75: N,
                        76: w,
                        77: M,
                        78: D,
                        79: F,
                        80: U,
                        81: j,
                        82: G,
                        83: X,
                        84: B,
                        85: K,
                        86: Z,
                        87: V,
                        88: H
                    }, e(z, [2, 26]), e(z, [2, 27]), e(ee, [2, 59]), e(ee, [2, 60]), e(ee, [2, 61]), e(z, [2, 66]), e(z, [2, 67]), e(z, [2, 68]), e(z, [2, 69]), e(z, [2, 57]), e(z, [2, 58]), e(z, [2, 92]), e(z, [2, 93]), e(z, [2, 94]), e(z, [2, 95]), e(z, [2, 96]), e(z, [2, 98]), e(z, [2, 70]), e(z, [2, 71]), e(z, [2, 65]), e(z, [2, 72]), e(z, [2, 73]), e(z, [2, 74]), e(z, [2, 75]), e(z, [2, 76]), e(z, [2, 77]), e(z, [2, 78]), e(z, [2, 79]), e(z, [2, 80]), e(z, [2, 81]), e(z, [2, 82]), e(z, [2, 83]), e(z, [2, 84]), e(z, [2, 85]), e(z, [2, 86]), e(z, [2, 87]), e(z, [2, 88]), e(z, [2, 89]), e(z, [2, 90]), e(z, [2, 91]), e(z, [2, 97]), {
                        1: [2, 1]
                    }, e(W, [2, 4], {
                        6: 4,
                        7: 5,
                        11: 6,
                        12: 7,
                        8: 8,
                        9: 9,
                        25: 10,
                        16: 11,
                        20: 12,
                        26: 13,
                        30: 19,
                        31: 20,
                        32: 21,
                        33: 22,
                        34: 23,
                        35: 24,
                        36: 25,
                        37: 26,
                        38: 27,
                        39: 28,
                        40: 29,
                        41: 30,
                        42: 31,
                        43: 32,
                        44: 33,
                        45: 34,
                        46: 35,
                        4: 102,
                        10: t,
                        13: r,
                        15: i,
                        17: n,
                        21: s,
                        23: a,
                        24: o,
                        28: c,
                        47: l,
                        48: u,
                        49: h,
                        50: p,
                        51: f,
                        55: m,
                        56: y,
                        57: d,
                        58: g,
                        59: v,
                        60: _,
                        61: k,
                        62: b,
                        63: E,
                        64: O,
                        65: A,
                        66: x,
                        67: I,
                        68: S,
                        69: L,
                        70: P,
                        71: C,
                        72: $,
                        73: R,
                        74: T,
                        75: N,
                        76: w,
                        77: M,
                        78: D,
                        79: F,
                        80: U,
                        81: j,
                        82: G,
                        83: X,
                        84: B,
                        85: K,
                        86: Z,
                        87: V,
                        88: H
                    }), e(W, [2, 6]), e(q, [2, 31]), e(q, [2, 32]), {
                        27: 103,
                        52: Q,
                        53: Y,
                        54: J
                    }, e(z, [2, 36]), e(z, [2, 62]), e(z, [2, 63]), e(z, [2, 64]), {
                        29: [1, 104]
                    }, e(z, [2, 38]), e(z, [2, 10]), e(z, [2, 11]), e(z, [2, 12]), {
                        4: 105,
                        6: 4,
                        7: 5,
                        8: 8,
                        9: 9,
                        10: t,
                        11: 6,
                        12: 7,
                        13: r,
                        14: [1, 106],
                        15: i,
                        16: 11,
                        17: n,
                        20: 12,
                        21: s,
                        23: a,
                        24: o,
                        25: 10,
                        26: 13,
                        28: c,
                        30: 19,
                        31: 20,
                        32: 21,
                        33: 22,
                        34: 23,
                        35: 24,
                        36: 25,
                        37: 26,
                        38: 27,
                        39: 28,
                        40: 29,
                        41: 30,
                        42: 31,
                        43: 32,
                        44: 33,
                        45: 34,
                        46: 35,
                        47: l,
                        48: u,
                        49: h,
                        50: p,
                        51: f,
                        55: m,
                        56: y,
                        57: d,
                        58: g,
                        59: v,
                        60: _,
                        61: k,
                        62: b,
                        63: E,
                        64: O,
                        65: A,
                        66: x,
                        67: I,
                        68: S,
                        69: L,
                        70: P,
                        71: C,
                        72: $,
                        73: R,
                        74: T,
                        75: N,
                        76: w,
                        77: M,
                        78: D,
                        79: F,
                        80: U,
                        81: j,
                        82: G,
                        83: X,
                        84: B,
                        85: K,
                        86: Z,
                        87: V,
                        88: H
                    }, {
                        4: 108,
                        6: 4,
                        7: 5,
                        8: 8,
                        9: 9,
                        10: t,
                        11: 6,
                        12: 7,
                        13: r,
                        14: [1, 107],
                        15: i,
                        16: 11,
                        17: n,
                        20: 12,
                        21: s,
                        23: a,
                        24: o,
                        25: 10,
                        26: 13,
                        28: c,
                        30: 19,
                        31: 20,
                        32: 21,
                        33: 22,
                        34: 23,
                        35: 24,
                        36: 25,
                        37: 26,
                        38: 27,
                        39: 28,
                        40: 29,
                        41: 30,
                        42: 31,
                        43: 32,
                        44: 33,
                        45: 34,
                        46: 35,
                        47: l,
                        48: u,
                        49: h,
                        50: p,
                        51: f,
                        55: m,
                        56: y,
                        57: d,
                        58: g,
                        59: v,
                        60: _,
                        61: k,
                        62: b,
                        63: E,
                        64: O,
                        65: A,
                        66: x,
                        67: I,
                        68: S,
                        69: L,
                        70: P,
                        71: C,
                        72: $,
                        73: R,
                        74: T,
                        75: N,
                        76: w,
                        77: M,
                        78: D,
                        79: F,
                        80: U,
                        81: j,
                        82: G,
                        83: X,
                        84: B,
                        85: K,
                        86: Z,
                        87: V,
                        88: H
                    }, e(z, [2, 16]), {
                        14: [1, 109]
                    }, e(z, [2, 19]), e(z, [2, 25]), {
                        18: [1, 110]
                    }, {
                        4: 111,
                        6: 4,
                        7: 5,
                        8: 8,
                        9: 9,
                        10: t,
                        11: 6,
                        12: 7,
                        13: r,
                        15: i,
                        16: 11,
                        17: n,
                        19: [1, 112],
                        20: 12,
                        21: s,
                        23: a,
                        24: o,
                        25: 10,
                        26: 13,
                        28: c,
                        30: 19,
                        31: 20,
                        32: 21,
                        33: 22,
                        34: 23,
                        35: 24,
                        36: 25,
                        37: 26,
                        38: 27,
                        39: 28,
                        40: 29,
                        41: 30,
                        42: 31,
                        43: 32,
                        44: 33,
                        45: 34,
                        46: 35,
                        47: l,
                        48: u,
                        49: h,
                        50: p,
                        51: f,
                        55: m,
                        56: y,
                        57: d,
                        58: g,
                        59: v,
                        60: _,
                        61: k,
                        62: b,
                        63: E,
                        64: O,
                        65: A,
                        66: x,
                        67: I,
                        68: S,
                        69: L,
                        70: P,
                        71: C,
                        72: $,
                        73: R,
                        74: T,
                        75: N,
                        76: w,
                        77: M,
                        78: D,
                        79: F,
                        80: U,
                        81: j,
                        82: G,
                        83: X,
                        84: B,
                        85: K,
                        86: Z,
                        87: V,
                        88: H
                    }, e(z, [2, 24]), e(W, [2, 3]), e(z, [2, 35]), e(z, [2, 37]), {
                        14: [1, 113]
                    }, e(z, [2, 15]), e(z, [2, 14]), {
                        14: [1, 114]
                    }, e(z, [2, 18]), {
                        4: 115,
                        6: 4,
                        7: 5,
                        8: 8,
                        9: 9,
                        10: t,
                        11: 6,
                        12: 7,
                        13: r,
                        15: i,
                        16: 11,
                        17: n,
                        19: [1, 116],
                        20: 12,
                        21: s,
                        23: a,
                        24: o,
                        25: 10,
                        26: 13,
                        28: c,
                        30: 19,
                        31: 20,
                        32: 21,
                        33: 22,
                        34: 23,
                        35: 24,
                        36: 25,
                        37: 26,
                        38: 27,
                        39: 28,
                        40: 29,
                        41: 30,
                        42: 31,
                        43: 32,
                        44: 33,
                        45: 34,
                        46: 35,
                        47: l,
                        48: u,
                        49: h,
                        50: p,
                        51: f,
                        55: m,
                        56: y,
                        57: d,
                        58: g,
                        59: v,
                        60: _,
                        61: k,
                        62: b,
                        63: E,
                        64: O,
                        65: A,
                        66: x,
                        67: I,
                        68: S,
                        69: L,
                        70: P,
                        71: C,
                        72: $,
                        73: R,
                        74: T,
                        75: N,
                        76: w,
                        77: M,
                        78: D,
                        79: F,
                        80: U,
                        81: j,
                        82: G,
                        83: X,
                        84: B,
                        85: K,
                        86: Z,
                        87: V,
                        88: H
                    }, {
                        19: [1, 117]
                    }, e(z, [2, 23]), e(z, [2, 13]), e(z, [2, 17]), {
                        19: [1, 118]
                    }, e(z, [2, 21]), e(z, [2, 22]), e(z, [2, 20])],
                    defaultActions: {
                        3: [2, 2],
                        78: [2, 1]
                    },
                    parseError: function(e, t) {
                        if (!t.recoverable) {
                            var r = new Error(e);
                            throw r.hash = t,
                            r
                        }
                        this.trace(e)
                    },
                    parse: function(e) {
                        var t = this
                          , r = [0]
                          , i = [null]
                          , n = []
                          , s = this.table
                          , a = ""
                          , o = 0
                          , c = 0
                          , l = 0
                          , u = 2
                          , h = 1
                          , p = n.slice.call(arguments, 1)
                          , f = Object.create(this.lexer)
                          , m = {
                            yy: {}
                        };
                        for (var y in this.yy)
                            Object.prototype.hasOwnProperty.call(this.yy, y) && (m.yy[y] = this.yy[y]);
                        f.setInput(e, m.yy),
                        m.yy.lexer = f,
                        m.yy.parser = this,
                        void 0 === f.yylloc && (f.yylloc = {});
                        var d = f.yylloc;
                        n.push(d);
                        var g = f.options && f.options.ranges;
                        "function" == typeof m.yy.parseError ? this.parseError = m.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
                        for (var v, _, k, b, E, O, A, x, I, S = function() {
                            var e;
                            return "number" != typeof (e = f.lex() || h) && (e = t.symbols_[e] || e),
                            e
                        }, L = {}; ; ) {
                            if (k = r[r.length - 1],
                            this.defaultActions[k] ? b = this.defaultActions[k] : (null == v && (v = S()),
                            b = s[k] && s[k][v]),
                            void 0 === b || !b.length || !b[0]) {
                                var P = "";
                                for (O in I = [],
                                s[k])
                                    this.terminals_[O] && O > u && I.push("'" + this.terminals_[O] + "'");
                                P = f.showPosition ? "Parse error on line " + (o + 1) + ":\n" + f.showPosition() + "\nExpecting " + I.join(", ") + ", got '" + (this.terminals_[v] || v) + "'" : "Parse error on line " + (o + 1) + ": Unexpected " + (v == h ? "end of input" : "'" + (this.terminals_[v] || v) + "'"),
                                this.parseError(P, {
                                    text: f.match,
                                    token: this.terminals_[v] || v,
                                    line: f.yylineno,
                                    loc: d,
                                    expected: I
                                })
                            }
                            if (b[0]instanceof Array && b.length > 1)
                                throw new Error("Parse Error: multiple actions possible at state: " + k + ", token: " + v);
                            switch (b[0]) {
                            case 1:
                                r.push(v),
                                i.push(f.yytext),
                                n.push(f.yylloc),
                                r.push(b[1]),
                                v = null,
                                _ ? (v = _,
                                _ = null) : (c = f.yyleng,
                                a = f.yytext,
                                o = f.yylineno,
                                d = f.yylloc,
                                l > 0 && l--);
                                break;
                            case 2:
                                if (A = this.productions_[b[1]][1],
                                L.$ = i[i.length - A],
                                L._$ = {
                                    first_line: n[n.length - (A || 1)].first_line,
                                    last_line: n[n.length - 1].last_line,
                                    first_column: n[n.length - (A || 1)].first_column,
                                    last_column: n[n.length - 1].last_column
                                },
                                g && (L._$.range = [n[n.length - (A || 1)].range[0], n[n.length - 1].range[1]]),
                                void 0 !== (E = this.performAction.apply(L, [a, c, o, m.yy, b[1], i, n].concat(p))))
                                    return E;
                                A && (r = r.slice(0, -1 * A * 2),
                                i = i.slice(0, -1 * A),
                                n = n.slice(0, -1 * A)),
                                r.push(this.productions_[b[1]][0]),
                                i.push(L.$),
                                n.push(L._$),
                                x = s[r[r.length - 2]][r[r.length - 1]],
                                r.push(x);
                                break;
                            case 3:
                                return !0
                            }
                        }
                        return !0
                    }
                }
                  , re = {
                    EOF: 1,
                    parseError: function(e, t) {
                        if (!this.yy.parser)
                            throw new Error(e);
                        this.yy.parser.parseError(e, t)
                    },
                    setInput: function(e, t) {
                        return this.yy = t || this.yy || {},
                        this._input = e,
                        this._more = this._backtrack = this.done = !1,
                        this.yylineno = this.yyleng = 0,
                        this.yytext = this.matched = this.match = "",
                        this.conditionStack = ["INITIAL"],
                        this.yylloc = {
                            first_line: 1,
                            first_column: 0,
                            last_line: 1,
                            last_column: 0
                        },
                        this.options.ranges && (this.yylloc.range = [0, 0]),
                        this.offset = 0,
                        this
                    },
                    input: function() {
                        var e = this._input[0];
                        return this.yytext += e,
                        this.yyleng++,
                        this.offset++,
                        this.match += e,
                        this.matched += e,
                        e.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++,
                        this.yylloc.last_line++) : this.yylloc.last_column++,
                        this.options.ranges && this.yylloc.range[1]++,
                        this._input = this._input.slice(1),
                        e
                    },
                    unput: function(e) {
                        var t = e.length
                          , r = e.split(/(?:\r\n?|\n)/g);
                        this._input = e + this._input,
                        this.yytext = this.yytext.substr(0, this.yytext.length - t),
                        this.offset -= t;
                        var i = this.match.split(/(?:\r\n?|\n)/g);
                        this.match = this.match.substr(0, this.match.length - 1),
                        this.matched = this.matched.substr(0, this.matched.length - 1),
                        r.length - 1 && (this.yylineno -= r.length - 1);
                        var n = this.yylloc.range;
                        return this.yylloc = {
                            first_line: this.yylloc.first_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.first_column,
                            last_column: r ? (r.length === i.length ? this.yylloc.first_column : 0) + i[i.length - r.length].length - r[0].length : this.yylloc.first_column - t
                        },
                        this.options.ranges && (this.yylloc.range = [n[0], n[0] + this.yyleng - t]),
                        this.yyleng = this.yytext.length,
                        this
                    },
                    more: function() {
                        return this._more = !0,
                        this
                    },
                    reject: function() {
                        return this.options.backtrack_lexer ? (this._backtrack = !0,
                        this) : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
                            text: "",
                            token: null,
                            line: this.yylineno
                        })
                    },
                    less: function(e) {
                        this.unput(this.match.slice(e))
                    },
                    pastInput: function() {
                        var e = this.matched.substr(0, this.matched.length - this.match.length);
                        return (e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "")
                    },
                    upcomingInput: function() {
                        var e = this.match;
                        return e.length < 20 && (e += this._input.substr(0, 20 - e.length)),
                        (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "")
                    },
                    showPosition: function() {
                        var e = this.pastInput()
                          , t = new Array(e.length + 1).join("-");
                        return e + this.upcomingInput() + "\n" + t + "^"
                    },
                    test_match: function(e, t) {
                        var r, i, n;
                        if (this.options.backtrack_lexer && (n = {
                            yylineno: this.yylineno,
                            yylloc: {
                                first_line: this.yylloc.first_line,
                                last_line: this.last_line,
                                first_column: this.yylloc.first_column,
                                last_column: this.yylloc.last_column
                            },
                            yytext: this.yytext,
                            match: this.match,
                            matches: this.matches,
                            matched: this.matched,
                            yyleng: this.yyleng,
                            offset: this.offset,
                            _more: this._more,
                            _input: this._input,
                            yy: this.yy,
                            conditionStack: this.conditionStack.slice(0),
                            done: this.done
                        },
                        this.options.ranges && (n.yylloc.range = this.yylloc.range.slice(0))),
                        (i = e[0].match(/(?:\r\n?|\n).*/g)) && (this.yylineno += i.length),
                        this.yylloc = {
                            first_line: this.yylloc.last_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.last_column,
                            last_column: i ? i[i.length - 1].length - i[i.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + e[0].length
                        },
                        this.yytext += e[0],
                        this.match += e[0],
                        this.matches = e,
                        this.yyleng = this.yytext.length,
                        this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]),
                        this._more = !1,
                        this._backtrack = !1,
                        this._input = this._input.slice(e[0].length),
                        this.matched += e[0],
                        r = this.performAction.call(this, this.yy, this, t, this.conditionStack[this.conditionStack.length - 1]),
                        this.done && this._input && (this.done = !1),
                        r)
                            return r;
                        if (this._backtrack) {
                            for (var s in n)
                                this[s] = n[s];
                            return !1
                        }
                        return !1
                    },
                    next: function() {
                        if (this.done)
                            return this.EOF;
                        var e, t, r, i;
                        this._input || (this.done = !0),
                        this._more || (this.yytext = "",
                        this.match = "");
                        for (var n = this._currentRules(), s = 0; s < n.length; s++)
                            if ((r = this._input.match(this.rules[n[s]])) && (!t || r[0].length > t[0].length)) {
                                if (t = r,
                                i = s,
                                this.options.backtrack_lexer) {
                                    if (!1 !== (e = this.test_match(r, n[s])))
                                        return e;
                                    if (this._backtrack) {
                                        t = !1;
                                        continue
                                    }
                                    return !1
                                }
                                if (!this.options.flex)
                                    break
                            }
                        return t ? !1 !== (e = this.test_match(t, n[i])) && e : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                            text: "",
                            token: null,
                            line: this.yylineno
                        })
                    },
                    lex: function() {
                        var e = this.next();
                        return e || this.lex()
                    },
                    begin: function(e) {
                        this.conditionStack.push(e)
                    },
                    popState: function() {
                        return this.conditionStack.length - 1 > 0 ? this.conditionStack.pop() : this.conditionStack[0]
                    },
                    _currentRules: function() {
                        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules
                    },
                    topState: function(e) {
                        return (e = this.conditionStack.length - 1 - Math.abs(e || 0)) >= 0 ? this.conditionStack[e] : "INITIAL"
                    },
                    pushState: function(e) {
                        this.begin(e)
                    },
                    stateStackSize: function() {
                        return this.conditionStack.length
                    },
                    options: {},
                    performAction: function(e, t, r, i) {
                        switch (r) {
                        case 0:
                            return void this.begin("captext");
                        case 1:
                            return 58;
                        case 2:
                            return this.popState(),
                            58;
                        case 3:
                            return 62;
                        case 4:
                            return 63;
                        case 5:
                            return 64;
                        case 6:
                            return 65;
                        case 7:
                            return 66;
                        case 8:
                            return 67;
                        case 9:
                            return 49;
                        case 10:
                            return 50;
                        case 11:
                            return 51;
                        case 12:
                            return 52;
                        case 13:
                            return 53;
                        case 14:
                            return 54;
                        case 15:
                            return 72;
                        case 16:
                            return 75;
                        case 17:
                            return 76;
                        case 18:
                            return 77;
                        case 19:
                            return 71;
                        case 20:
                            return 73;
                        case 21:
                            return 74;
                        case 22:
                            return 78;
                        case 23:
                            return 69;
                        case 24:
                            return 70;
                        case 25:
                            return 81;
                        case 26:
                            return 13;
                        case 27:
                            return 15;
                        case 28:
                            return 14;
                        case 29:
                            return 10;
                        case 30:
                            return 28;
                        case 31:
                            return 29;
                        case 32:
                            return 84;
                        case 33:
                            return 85;
                        case 34:
                            return 86;
                        case 35:
                            return 17;
                        case 36:
                            return 18;
                        case 37:
                            return 19;
                        case 38:
                            return 79;
                        case 39:
                            return 80;
                        case 40:
                            return 83;
                        case 41:
                            return t.yytext = this.matches[1],
                            21;
                        case 42:
                            return t.yytext = this.matches[1],
                            22;
                        case 43:
                            return t.yytext = this.matches[1],
                            24;
                        case 44:
                            return 68;
                        case 45:
                            return 47;
                        case 46:
                            return 48;
                        case 47:
                            return 87;
                        case 48:
                            return 61;
                        case 49:
                            return 60;
                        case 50:
                            return 82;
                        case 51:
                        case 52:
                            return 56;
                        case 53:
                            return 57;
                        case 54:
                            return t.yytext = this.matches[1],
                            58;
                        case 55:
                            return 59;
                        case 56:
                            return;
                        case 57:
                            return 88;
                        case 58:
                            return;
                        case 59:
                            return 55;
                        case 60:
                            return 5;
                        case 61:
                            return 90
                        }
                    },
                    rules: [/^(?:([,][,])(?=[A-Z]))/, /^(?:[A-Z](?=[A-Z]))/, /^(?:[A-Z])/, /^(?:["][6])/, /^(?:["][-])/, /^(?:["][4])/, /^(?:["][8])/, /^(?:["][9])/, /^(?:["][/])/, /^(?:[.][<])/, /^(?:[_][<])/, /^(?:["][<])/, /^(?:[.][>])/, /^(?:[_][>])/, /^(?:["][>])/, /^(?:["][7][@][:])/, /^(?:[_][@][<])/, /^(?:[\^][9])/, /^(?:[_][@][>])/, /^(?:["][7])/, /^(?:[@][<])/, /^(?:[@][>])/, /^(?:[@][9])/, /^(?:[.][0])/, /^(?:[:][O])/, /^(?:[4][4][4])/, /^(?:[%][9])/, /^(?:[%])/, /^(?:[\+])/, /^(?:[95]+(?=.))/, /^(?:[<])/, /^(?:[>])/, /^(?:!)/, /^(?:[6])/, /^(?:[@]&)/, /^(?:[(])/, /^(?:[.][/])/, /^(?:[)])/, /^(?:#[L])/, /^(?:#-)/, /^(?:#=)/, /^(?:#([A-J4]+))/, /^(?:[/]([A-J4]+))/, /^(?:[#][/]([A-J4]+))/, /^(?:[_]?[/])/, /^(?:[1])/, /^(?:[4])/, /^(?:[7]+)/, /^(?:[_][\\][_][\\])/, /^(?:[_][\\])/, /^(?:[3])/, /^(?:(ARC)?(SIN|COS|TAN|CSC|SEC|COT)(H)?)/, /^(?:(ARG|DET|EXP|IM|INF|LIM|LN|LOG|MAX|MIN|MOD|RE|SUP))/, /^(?:[,]?[.][ABGDEZ\?\:IKLMNXOPRSTUYF\&W])/, /^(?:[,]([A-Z]))/, /^(?:[A-Z])/, /^(?:[,]['])/, /^(?:[8])/, /^(?:[;])/, /^(?:[ ])/, /^(?:$)/, /^(?:.)/],
                    conditions: {
                        captext: {
                            rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61],
                            inclusive: !0
                        },
                        INITIAL: {
                            rules: [0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61],
                            inclusive: !0
                        }
                    }
                };
                function ie() {
                    this.yy = {}
                }
                return te.lexer = re,
                ie.prototype = te,
                te.Parser = ie,
                new ie
            }();
            t.parser = n,
            t.Parser = n.Parser,
            t.parse = function() {
                return n.parse.apply(n, arguments)
            }
            ,
            t.main = function(i) {
                i[1] || (console.log("Usage: " + i[0] + " FILE"),
                e.exit(1));
                var n = r(4).readFileSync(r(5).normalize(i[1]), "utf8");
                return t.parser.parse(n)
            }
            ,
            void 0 !== i && r.c[r.s] === i && t.main(e.argv.slice(1))
        }
        ).call(t, r(1), r(8)(e))
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = r(2)
          , n = r(7)
          , s = {
            "~": "\\ ",
            "\\,": "\\ ",
            "\\:": "\\ ",
            "\\;": "\\ ",
            "\\!": "\\ "
        }
          , a = {
            "\\Vert": "\\|",
            "\\ge": "\\geq",
            "\\le": "\\leq",
            "\\vert": "|"
        }
          , o = {
            "\\space": !0
        };
        function c(e) {
            for (var t = [], r = 0, i = e; r < i.length; r++) {
                var s = i[r];
                t.push(n.terminal(s))
            }
            return t
        }
        function l(e) {
            for (var t = 0, r = 0; r < Math.min(3, e.length); r++) {
                var i = e[r];
                "terminal" === i.type && "." === i.value && t++
            }
            return 3 === t
        }
        t.default = function e(t) {
            for (var r = [], u = 0; u < t.length; u++) {
                var h = t[u];
                switch (h.type) {
                case "command":
                    var p = h.value.slice(1).trim();
                    a.hasOwnProperty(h.value) ? r.push(n.command(a[h.value])) : i.containsValue(p) ? r.push(n.typeform("operator_name", c(p))) : o[h.value] || r.push(h);
                    break;
                case "level":
                    var f = {
                        subscript: h.subscript && h.subscript.length > 0 ? e(h.subscript) : void 0,
                        superscript: h.superscript && h.superscript.length > 0 ? e(h.superscript) : void 0,
                        type: h.type
                    };
                    (f.subscript || f.superscript) && r.push(f);
                    break;
                case "fraction":
                    r.push({
                        denominator: e(h.denominator),
                        numerator: e(h.numerator),
                        type: h.type
                    });
                    break;
                case "radical":
                    r.push({
                        index: h.index ? e(h.index) : void 0,
                        radicand: e(h.radicand),
                        type: h.type
                    });
                    break;
                case "terminal":
                    l(t.slice(u)) ? (r.push({
                        type: "command",
                        value: "\\ldots"
                    }),
                    u += 2) : r.push({
                        type: h.type,
                        value: s.hasOwnProperty(h.value) ? s[h.value] : h.value
                    });
                    break;
                case "typeform":
                    r.push(h);
                    break;
                case "greek":
                    r.push({
                        type: h.type,
                        value: s.hasOwnProperty(h.value) ? s[h.value] : h.value
                    });
                    break;
                default:
                    throw new Error("Unexpected item:\n" + JSON.stringify({
                        group: t,
                        item: h
                    }))
                }
            }
            return r
        }
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = r(6)
          , n = r(13)
          , s = r(7);
        n.parser.yy = s,
        t.default = function(e) {
            try {
                return {
                    isError: !1,
                    value: n.parser.parse(e)
                }
            } catch (e) {
                return {
                    isError: !0,
                    error: i.default(e)
                }
            }
        }
    }
    , function(e, t, r) {
        (function(e, i) {
            var n = function() {
                var e = function(e, t, r, i) {
                    for (r = r || {},
                    i = e.length; i--; r[e[i]] = t)
                        ;
                    return r
                }
                  , t = [1, 13]
                  , r = [1, 14]
                  , i = [1, 15]
                  , n = [1, 16]
                  , s = [1, 17]
                  , a = [1, 21]
                  , o = [1, 18]
                  , c = [1, 19]
                  , l = [1, 20]
                  , u = [1, 22]
                  , h = [1, 23]
                  , p = [1, 28]
                  , f = [1, 30]
                  , m = [1, 31]
                  , y = [1, 32]
                  , d = [1, 33]
                  , g = [1, 29]
                  , v = [5, 21, 27, 38]
                  , _ = [5, 19, 21, 22, 23, 24, 25, 26, 27, 28, 32, 33, 34, 35, 36, 37, 38]
                  , k = [5, 10, 12, 13, 14, 19, 21, 22, 23, 24, 25, 26, 27, 28, 32, 33, 34, 35, 36, 37, 38]
                  , b = [5, 10, 19, 21, 22, 23, 24, 25, 26, 27, 28, 32, 33, 34, 35, 36, 37, 38]
                  , E = {
                    trace: function() {},
                    yy: {},
                    symbols_: {
                        error: 2,
                        sentence: 3,
                        group: 4,
                        EOF: 5,
                        level: 6,
                        expression: 7,
                        subscript: 8,
                        superscript: 9,
                        _: 10,
                        atom: 11,
                        "^": 12,
                        "PRIMES^": 13,
                        PRIMES: 14,
                        delimited_group: 15,
                        typeform: 16,
                        frac: 17,
                        radical: 18,
                        LEFT: 19,
                        delimiter: 20,
                        RIGHT: 21,
                        FRAC: 22,
                        OPERATOR_NAME: 23,
                        MATHRM: 24,
                        TEXT: 25,
                        RADICAL_OPTARG: 26,
                        CLOSE_OPTARG: 27,
                        RADICAL: 28,
                        curly_group: 29,
                        greek: 30,
                        command: 31,
                        SYMBOL: 32,
                        DELIMITER: 33,
                        DELIMITER_COMMAND: 34,
                        GREEK: 35,
                        COMMAND: 36,
                        "{": 37,
                        "}": 38,
                        $accept: 0,
                        $end: 1
                    },
                    terminals_: {
                        2: "error",
                        5: "EOF",
                        10: "_",
                        12: "^",
                        13: "PRIMES^",
                        14: "PRIMES",
                        19: "LEFT",
                        21: "RIGHT",
                        22: "FRAC",
                        23: "OPERATOR_NAME",
                        24: "MATHRM",
                        25: "TEXT",
                        26: "RADICAL_OPTARG",
                        27: "CLOSE_OPTARG",
                        28: "RADICAL",
                        32: "SYMBOL",
                        33: "DELIMITER",
                        34: "DELIMITER_COMMAND",
                        35: "GREEK",
                        36: "COMMAND",
                        37: "{",
                        38: "}"
                    },
                    productions_: [0, [3, 2], [3, 1], [4, 3], [4, 2], [4, 1], [4, 2], [4, 1], [6, 2], [6, 2], [6, 1], [6, 1], [8, 2], [9, 2], [9, 2], [9, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [15, 5], [15, 4], [17, 3], [16, 2], [16, 2], [16, 2], [18, 4], [18, 3], [18, 2], [18, 2], [11, 1], [11, 1], [11, 1], [11, 1], [11, 1], [20, 1], [20, 1], [30, 1], [31, 1], [29, 3], [29, 2]],
                    performAction: function(e, t, r, i, n, s, a) {
                        var o = s.length - 1;
                        switch (n) {
                        case 1:
                            return s[o - 1];
                        case 2:
                            return i.group();
                        case 3:
                            this.$ = i.group(s[o - 2], s[o - 1], s[o]);
                            break;
                        case 4:
                        case 6:
                            this.$ = i.group(s[o - 1], s[o]);
                            break;
                        case 5:
                        case 7:
                            this.$ = i.group(s[o]);
                            break;
                        case 8:
                            this.$ = i.level({
                                _: i.group(s[o - 1]),
                                "^": i.group(s[o])
                            });
                            break;
                        case 9:
                            this.$ = i.level({
                                _: i.group(s[o]),
                                "^": i.group(s[o - 1])
                            });
                            break;
                        case 10:
                            this.$ = i.level({
                                "^": i.group(s[o])
                            });
                            break;
                        case 11:
                            this.$ = i.level({
                                _: i.group(s[o])
                            });
                            break;
                        case 12:
                        case 13:
                            this.$ = s[o];
                            break;
                        case 14:
                            this.$ = i.processPrimes(s[o - 1], s[o]);
                            break;
                        case 15:
                            this.$ = i.processPrimes(s[o], i.group());
                            break;
                        case 21:
                            this.$ = i.group(s[o - 3], s[o - 2], s[o]);
                            break;
                        case 22:
                            this.$ = i.group(s[o - 2], s[o]);
                            break;
                        case 23:
                            this.$ = i.fraction(i.group(s[o - 1]), i.group(s[o]));
                            break;
                        case 24:
                            this.$ = i.typeform("operator_name", i.group(s[o]));
                            break;
                        case 25:
                            this.$ = i.typeform("mathrm", i.group(s[o]));
                            break;
                        case 26:
                            this.$ = i.typeform("text", i.group(s[o]));
                            break;
                        case 27:
                            this.$ = i.radical(s[o], i.group(s[o - 2]));
                            break;
                        case 28:
                            this.$ = i.radical(i.group(s[o]), i.group());
                            break;
                        case 29:
                        case 30:
                            this.$ = i.radical(i.group(s[o]));
                            break;
                        case 35:
                        case 36:
                            this.$ = i.terminal(s[o]);
                            break;
                        case 37:
                        case 39:
                            this.$ = i.command(s[o]);
                            break;
                        case 38:
                            this.$ = i.greek(s[o]);
                            break;
                        case 40:
                            this.$ = s[o - 1];
                            break;
                        case 41:
                            this.$ = i.group()
                        }
                    },
                    table: [{
                        3: 1,
                        4: 2,
                        5: [1, 3],
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        10: t,
                        11: 12,
                        12: r,
                        13: i,
                        14: n,
                        15: 8,
                        16: 9,
                        17: 10,
                        18: 11,
                        19: s,
                        20: 25,
                        22: a,
                        23: o,
                        24: c,
                        25: l,
                        26: u,
                        28: h,
                        29: 24,
                        30: 26,
                        31: 27,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }, {
                        1: [3]
                    }, {
                        5: [1, 34]
                    }, {
                        1: [2, 2]
                    }, e(v, [2, 5], {
                        15: 8,
                        16: 9,
                        17: 10,
                        18: 11,
                        11: 12,
                        29: 24,
                        20: 25,
                        30: 26,
                        31: 27,
                        7: 35,
                        19: s,
                        22: a,
                        23: o,
                        24: c,
                        25: l,
                        26: u,
                        28: h,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }), e(v, [2, 7], {
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        15: 8,
                        16: 9,
                        17: 10,
                        18: 11,
                        11: 12,
                        29: 24,
                        20: 25,
                        30: 26,
                        31: 27,
                        4: 36,
                        10: t,
                        12: r,
                        13: i,
                        14: n,
                        19: s,
                        22: a,
                        23: o,
                        24: c,
                        25: l,
                        26: u,
                        28: h,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }), e(_, [2, 11], {
                        9: 37,
                        12: r,
                        13: i,
                        14: n
                    }), e(_, [2, 10], {
                        8: 38,
                        10: t
                    }), e(k, [2, 16]), e(k, [2, 17]), e(k, [2, 18]), e(k, [2, 19]), e(k, [2, 20]), {
                        11: 39,
                        20: 25,
                        29: 24,
                        30: 26,
                        31: 27,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }, {
                        11: 40,
                        20: 25,
                        29: 24,
                        30: 26,
                        31: 27,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }, {
                        11: 41,
                        20: 25,
                        29: 24,
                        30: 26,
                        31: 27,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }, e(b, [2, 15]), {
                        20: 42,
                        33: f,
                        34: m
                    }, {
                        11: 43,
                        20: 25,
                        29: 24,
                        30: 26,
                        31: 27,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }, {
                        11: 44,
                        20: 25,
                        29: 24,
                        30: 26,
                        31: 27,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }, {
                        11: 45,
                        20: 25,
                        29: 24,
                        30: 26,
                        31: 27,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }, {
                        11: 46,
                        20: 25,
                        29: 24,
                        30: 26,
                        31: 27,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }, {
                        4: 47,
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        10: t,
                        11: 12,
                        12: r,
                        13: i,
                        14: n,
                        15: 8,
                        16: 9,
                        17: 10,
                        18: 11,
                        19: s,
                        20: 25,
                        22: a,
                        23: o,
                        24: c,
                        25: l,
                        26: u,
                        27: [1, 48],
                        28: h,
                        29: 24,
                        30: 26,
                        31: 27,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }, {
                        11: 49,
                        17: 50,
                        20: 25,
                        22: a,
                        29: 24,
                        30: 26,
                        31: 27,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }, e(k, [2, 31]), e(k, [2, 32]), e(k, [2, 33]), e(k, [2, 34]), e(k, [2, 35]), {
                        4: 51,
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        10: t,
                        11: 12,
                        12: r,
                        13: i,
                        14: n,
                        15: 8,
                        16: 9,
                        17: 10,
                        18: 11,
                        19: s,
                        20: 25,
                        22: a,
                        23: o,
                        24: c,
                        25: l,
                        26: u,
                        28: h,
                        29: 24,
                        30: 26,
                        31: 27,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g,
                        38: [1, 52]
                    }, e(k, [2, 36]), e(k, [2, 37]), e(k, [2, 38]), e(k, [2, 39]), {
                        1: [2, 1]
                    }, e(v, [2, 4], {
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        15: 8,
                        16: 9,
                        17: 10,
                        18: 11,
                        11: 12,
                        29: 24,
                        20: 25,
                        30: 26,
                        31: 27,
                        4: 53,
                        10: t,
                        12: r,
                        13: i,
                        14: n,
                        19: s,
                        22: a,
                        23: o,
                        24: c,
                        25: l,
                        26: u,
                        28: h,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }), e(v, [2, 6]), e(_, [2, 8]), e(_, [2, 9]), e([5, 12, 13, 14, 19, 21, 22, 23, 24, 25, 26, 27, 28, 32, 33, 34, 35, 36, 37, 38], [2, 12]), e(b, [2, 13]), e(b, [2, 14]), {
                        4: 54,
                        6: 4,
                        7: 5,
                        8: 6,
                        9: 7,
                        10: t,
                        11: 12,
                        12: r,
                        13: i,
                        14: n,
                        15: 8,
                        16: 9,
                        17: 10,
                        18: 11,
                        19: s,
                        20: 25,
                        21: [1, 55],
                        22: a,
                        23: o,
                        24: c,
                        25: l,
                        26: u,
                        28: h,
                        29: 24,
                        30: 26,
                        31: 27,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }, e(k, [2, 24]), e(k, [2, 25]), e(k, [2, 26]), {
                        11: 56,
                        20: 25,
                        29: 24,
                        30: 26,
                        31: 27,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }, {
                        27: [1, 57]
                    }, {
                        11: 58,
                        20: 25,
                        29: 24,
                        30: 26,
                        31: 27,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }, e(k, [2, 29]), e(k, [2, 30]), {
                        38: [1, 59]
                    }, e(k, [2, 41]), e(v, [2, 3]), {
                        21: [1, 60]
                    }, {
                        20: 61,
                        33: f,
                        34: m
                    }, e(k, [2, 23]), {
                        11: 62,
                        20: 25,
                        29: 24,
                        30: 26,
                        31: 27,
                        32: p,
                        33: f,
                        34: m,
                        35: y,
                        36: d,
                        37: g
                    }, e(k, [2, 28]), e(k, [2, 40]), {
                        20: 63,
                        33: f,
                        34: m
                    }, e(k, [2, 22]), e(k, [2, 27]), e(k, [2, 21])],
                    defaultActions: {
                        3: [2, 2],
                        34: [2, 1]
                    },
                    parseError: function(e, t) {
                        if (!t.recoverable) {
                            var r = new Error(e);
                            throw r.hash = t,
                            r
                        }
                        this.trace(e)
                    },
                    parse: function(e) {
                        var t = this
                          , r = [0]
                          , i = [null]
                          , n = []
                          , s = this.table
                          , a = ""
                          , o = 0
                          , c = 0
                          , l = 0
                          , u = 2
                          , h = 1
                          , p = n.slice.call(arguments, 1)
                          , f = Object.create(this.lexer)
                          , m = {
                            yy: {}
                        };
                        for (var y in this.yy)
                            Object.prototype.hasOwnProperty.call(this.yy, y) && (m.yy[y] = this.yy[y]);
                        f.setInput(e, m.yy),
                        m.yy.lexer = f,
                        m.yy.parser = this,
                        void 0 === f.yylloc && (f.yylloc = {});
                        var d = f.yylloc;
                        n.push(d);
                        var g = f.options && f.options.ranges;
                        "function" == typeof m.yy.parseError ? this.parseError = m.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
                        for (var v, _, k, b, E, O, A, x, I, S = function() {
                            var e;
                            return "number" != typeof (e = f.lex() || h) && (e = t.symbols_[e] || e),
                            e
                        }, L = {}; ; ) {
                            if (k = r[r.length - 1],
                            this.defaultActions[k] ? b = this.defaultActions[k] : (null == v && (v = S()),
                            b = s[k] && s[k][v]),
                            void 0 === b || !b.length || !b[0]) {
                                var P = "";
                                for (O in I = [],
                                s[k])
                                    this.terminals_[O] && O > u && I.push("'" + this.terminals_[O] + "'");
                                P = f.showPosition ? "Parse error on line " + (o + 1) + ":\n" + f.showPosition() + "\nExpecting " + I.join(", ") + ", got '" + (this.terminals_[v] || v) + "'" : "Parse error on line " + (o + 1) + ": Unexpected " + (v == h ? "end of input" : "'" + (this.terminals_[v] || v) + "'"),
                                this.parseError(P, {
                                    text: f.match,
                                    token: this.terminals_[v] || v,
                                    line: f.yylineno,
                                    loc: d,
                                    expected: I
                                })
                            }
                            if (b[0]instanceof Array && b.length > 1)
                                throw new Error("Parse Error: multiple actions possible at state: " + k + ", token: " + v);
                            switch (b[0]) {
                            case 1:
                                r.push(v),
                                i.push(f.yytext),
                                n.push(f.yylloc),
                                r.push(b[1]),
                                v = null,
                                _ ? (v = _,
                                _ = null) : (c = f.yyleng,
                                a = f.yytext,
                                o = f.yylineno,
                                d = f.yylloc,
                                l > 0 && l--);
                                break;
                            case 2:
                                if (A = this.productions_[b[1]][1],
                                L.$ = i[i.length - A],
                                L._$ = {
                                    first_line: n[n.length - (A || 1)].first_line,
                                    last_line: n[n.length - 1].last_line,
                                    first_column: n[n.length - (A || 1)].first_column,
                                    last_column: n[n.length - 1].last_column
                                },
                                g && (L._$.range = [n[n.length - (A || 1)].range[0], n[n.length - 1].range[1]]),
                                void 0 !== (E = this.performAction.apply(L, [a, c, o, m.yy, b[1], i, n].concat(p))))
                                    return E;
                                A && (r = r.slice(0, -1 * A * 2),
                                i = i.slice(0, -1 * A),
                                n = n.slice(0, -1 * A)),
                                r.push(this.productions_[b[1]][0]),
                                i.push(L.$),
                                n.push(L._$),
                                x = s[r[r.length - 2]][r[r.length - 1]],
                                r.push(x);
                                break;
                            case 3:
                                return !0
                            }
                        }
                        return !0
                    }
                }
                  , O = {
                    EOF: 1,
                    parseError: function(e, t) {
                        if (!this.yy.parser)
                            throw new Error(e);
                        this.yy.parser.parseError(e, t)
                    },
                    setInput: function(e, t) {
                        return this.yy = t || this.yy || {},
                        this._input = e,
                        this._more = this._backtrack = this.done = !1,
                        this.yylineno = this.yyleng = 0,
                        this.yytext = this.matched = this.match = "",
                        this.conditionStack = ["INITIAL"],
                        this.yylloc = {
                            first_line: 1,
                            first_column: 0,
                            last_line: 1,
                            last_column: 0
                        },
                        this.options.ranges && (this.yylloc.range = [0, 0]),
                        this.offset = 0,
                        this
                    },
                    input: function() {
                        var e = this._input[0];
                        return this.yytext += e,
                        this.yyleng++,
                        this.offset++,
                        this.match += e,
                        this.matched += e,
                        e.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++,
                        this.yylloc.last_line++) : this.yylloc.last_column++,
                        this.options.ranges && this.yylloc.range[1]++,
                        this._input = this._input.slice(1),
                        e
                    },
                    unput: function(e) {
                        var t = e.length
                          , r = e.split(/(?:\r\n?|\n)/g);
                        this._input = e + this._input,
                        this.yytext = this.yytext.substr(0, this.yytext.length - t),
                        this.offset -= t;
                        var i = this.match.split(/(?:\r\n?|\n)/g);
                        this.match = this.match.substr(0, this.match.length - 1),
                        this.matched = this.matched.substr(0, this.matched.length - 1),
                        r.length - 1 && (this.yylineno -= r.length - 1);
                        var n = this.yylloc.range;
                        return this.yylloc = {
                            first_line: this.yylloc.first_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.first_column,
                            last_column: r ? (r.length === i.length ? this.yylloc.first_column : 0) + i[i.length - r.length].length - r[0].length : this.yylloc.first_column - t
                        },
                        this.options.ranges && (this.yylloc.range = [n[0], n[0] + this.yyleng - t]),
                        this.yyleng = this.yytext.length,
                        this
                    },
                    more: function() {
                        return this._more = !0,
                        this
                    },
                    reject: function() {
                        return this.options.backtrack_lexer ? (this._backtrack = !0,
                        this) : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
                            text: "",
                            token: null,
                            line: this.yylineno
                        })
                    },
                    less: function(e) {
                        this.unput(this.match.slice(e))
                    },
                    pastInput: function() {
                        var e = this.matched.substr(0, this.matched.length - this.match.length);
                        return (e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "")
                    },
                    upcomingInput: function() {
                        var e = this.match;
                        return e.length < 20 && (e += this._input.substr(0, 20 - e.length)),
                        (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "")
                    },
                    showPosition: function() {
                        var e = this.pastInput()
                          , t = new Array(e.length + 1).join("-");
                        return e + this.upcomingInput() + "\n" + t + "^"
                    },
                    test_match: function(e, t) {
                        var r, i, n;
                        if (this.options.backtrack_lexer && (n = {
                            yylineno: this.yylineno,
                            yylloc: {
                                first_line: this.yylloc.first_line,
                                last_line: this.last_line,
                                first_column: this.yylloc.first_column,
                                last_column: this.yylloc.last_column
                            },
                            yytext: this.yytext,
                            match: this.match,
                            matches: this.matches,
                            matched: this.matched,
                            yyleng: this.yyleng,
                            offset: this.offset,
                            _more: this._more,
                            _input: this._input,
                            yy: this.yy,
                            conditionStack: this.conditionStack.slice(0),
                            done: this.done
                        },
                        this.options.ranges && (n.yylloc.range = this.yylloc.range.slice(0))),
                        (i = e[0].match(/(?:\r\n?|\n).*/g)) && (this.yylineno += i.length),
                        this.yylloc = {
                            first_line: this.yylloc.last_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.last_column,
                            last_column: i ? i[i.length - 1].length - i[i.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + e[0].length
                        },
                        this.yytext += e[0],
                        this.match += e[0],
                        this.matches = e,
                        this.yyleng = this.yytext.length,
                        this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]),
                        this._more = !1,
                        this._backtrack = !1,
                        this._input = this._input.slice(e[0].length),
                        this.matched += e[0],
                        r = this.performAction.call(this, this.yy, this, t, this.conditionStack[this.conditionStack.length - 1]),
                        this.done && this._input && (this.done = !1),
                        r)
                            return r;
                        if (this._backtrack) {
                            for (var s in n)
                                this[s] = n[s];
                            return !1
                        }
                        return !1
                    },
                    next: function() {
                        if (this.done)
                            return this.EOF;
                        var e, t, r, i;
                        this._input || (this.done = !0),
                        this._more || (this.yytext = "",
                        this.match = "");
                        for (var n = this._currentRules(), s = 0; s < n.length; s++)
                            if ((r = this._input.match(this.rules[n[s]])) && (!t || r[0].length > t[0].length)) {
                                if (t = r,
                                i = s,
                                this.options.backtrack_lexer) {
                                    if (!1 !== (e = this.test_match(r, n[s])))
                                        return e;
                                    if (this._backtrack) {
                                        t = !1;
                                        continue
                                    }
                                    return !1
                                }
                                if (!this.options.flex)
                                    break
                            }
                        return t ? !1 !== (e = this.test_match(t, n[i])) && e : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                            text: "",
                            token: null,
                            line: this.yylineno
                        })
                    },
                    lex: function() {
                        var e = this.next();
                        return e || this.lex()
                    },
                    begin: function(e) {
                        this.conditionStack.push(e)
                    },
                    popState: function() {
                        return this.conditionStack.length - 1 > 0 ? this.conditionStack.pop() : this.conditionStack[0]
                    },
                    _currentRules: function() {
                        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules
                    },
                    topState: function(e) {
                        return (e = this.conditionStack.length - 1 - Math.abs(e || 0)) >= 0 ? this.conditionStack[e] : "INITIAL"
                    },
                    pushState: function(e) {
                        this.begin(e)
                    },
                    stateStackSize: function() {
                        return this.conditionStack.length
                    },
                    options: {},
                    performAction: function(e, t, r, i) {
                        switch (r) {
                        case 0:
                            break;
                        case 1:
                            return this.begin("optarg"),
                            26;
                        case 2:
                            return this.popState(),
                            27;
                        case 3:
                            return 23;
                        case 4:
                            return 24;
                        case 5:
                            return 25;
                        case 6:
                            return 28;
                        case 7:
                            return 22;
                        case 8:
                            return 13;
                        case 9:
                            return 14;
                        case 10:
                            return 12;
                        case 11:
                            return 10;
                        case 12:
                            return 19;
                        case 13:
                            return 21;
                        case 14:
                            return 34;
                        case 15:
                            return 33;
                        case 16:
                            return 37;
                        case 17:
                            return 38;
                        case 18:
                        case 19:
                        case 20:
                            return 32;
                        case 21:
                        case 22:
                            return 35;
                        case 23:
                            return 36;
                        case 24:
                            return 32;
                        case 25:
                            return 5
                        }
                    },
                    rules: [/^(?:\s+)/, /^(?:(\\sqrt)\s*\[)/, /^(?:\])/, /^(?:(\\operatorname))/, /^(?:(\\mathrm))/, /^(?:(\\text))/, /^(?:(\\sqrt))/, /^(?:(\\frac))/, /^(?:'+\^)/, /^(?:'+)/, /^(?:\^)/, /^(?:[_])/, /^(?:(\\left))/, /^(?:(\\right))/, /^(?:(\\langle|\\rangle|\\vert|\\Vert))/, /^(?:\[|\]|\\\{|\\\}|\(|\)|\||\\\|)/, /^(?:\{)/, /^(?:\})/, /^(?:\\(infty))/, /^(?:\\(int))/, /^(?:!)/, /^(?:\\(alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|omicron|pi|rho|sigma|tau|xi|upsilon|phi|chi|psi|omega))/, /^(?:\\(Alpha|Beta|Gamma|Delta|Epsilon|Zeta|Eta|Theta|Iota|Kappa|Lambda|Mu|Nu|Omicron|Pi|Rho|Sigma|Tau|Xi|Upsilon|Phi|Chi|Psi|Omega))/, /^(?:\\[A-Za-z]+)/, /^(?:\\.|.)/, /^(?:$)/],
                    conditions: {
                        optarg: {
                            rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
                            inclusive: !0
                        },
                        INITIAL: {
                            rules: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
                            inclusive: !0
                        }
                    }
                };
                function A() {
                    this.yy = {}
                }
                return E.lexer = O,
                A.prototype = E,
                E.Parser = A,
                new A
            }();
            t.parser = n,
            t.Parser = n.Parser,
            t.parse = function() {
                return n.parse.apply(n, arguments)
            }
            ,
            t.main = function(i) {
                i[1] || (console.log("Usage: " + i[0] + " FILE"),
                e.exit(1));
                var n = r(4).readFileSync(r(5).normalize(i[1]), "utf8");
                return t.parser.parse(n)
            }
            ,
            void 0 !== i && r.c[r.s] === i && t.main(e.argv.slice(1))
        }
        ).call(t, r(1), r(8)(e))
    }
    , function(e, t, r) {
        "use strict";
        var i = this && this.__assign || function() {
            return (i = Object.assign || function(e) {
                for (var t, r = 1, i = arguments.length; r < i; r++)
                    for (var n in t = arguments[r])
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                return e
            }
            ).apply(this, arguments)
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = r(11)
          , s = r(12)
          , a = r(0);
        t.default = function(e) {
            return a.map(s.default(e), function(e) {
                return function(e) {
                    return y({
                        isStartOfLine: !0,
                        levelIndicator: "",
                        radicalLevel: 0,
                        wasFraction: !1,
                        wasModifiedExpression: !1,
                        wasRomanCommand: !1
                    }, e).value
                }(n.default(e))
            })
        }
        ;
        var o = {
            "!": "&",
            "*": "@#",
            ",": ", ",
            "/": "_/",
            ":": "_3",
            "<": ' "K ',
            "=": " .K ",
            ">": " .1 ",
            "?": "_8",
            "[": "@(",
            "\\ ": " ",
            "\\%": "@0",
            "\\&": "_&",
            "\\,": " ",
            "\\infty": ",=",
            "\\int": "!",
            "\\{": ".(",
            "\\|": "\\\\",
            "\\}": ".)",
            "]": "@)",
            "|": "\\"
        };
        function c(e) {
            return /^[a-z]$/.test(e.value) ? e.value.toUpperCase() : /^[A-Z]$/.test(e.value) ? "," + e.value : /^[0-9.]$/.test(e.value) || /^[+\-()]$/.test(e.value) ? e.value : o.hasOwnProperty(e.value) ? o[e.value] : "[terminal: " + e.value + "]"
        }
        var l = {
            "\\Vert": "\\\\",
            "\\cdot": "*",
            "\\div": "./",
            "\\ge": " .1: ",
            "\\geq": " .1: ",
            "\\langle": "..(",
            "\\ldots": " ''' ",
            "\\le": ' "K: ',
            "\\leq": ' "K: ',
            "\\ne": " /.K ",
            "\\neq": " /.K ",
            "\\approx": " @:@: ",
            "\\nparallel": " /$L ",
            "\\parallel": " $L ",
            "\\perp": " $P ",
            "\\prime": "'",
            "\\prod": ".,P",
            "\\rangle": "..)",
            "\\sim": "@:",
            "\\sum": ".,S",
            "\\times": "@*",
            "\\to": " $O ",
            "\\vert": "\\"
        }
          , u = {
            "\\Alpha": ".,A",
            "\\Beta": ".,B",
            "\\Chi": ".,&",
            "\\Delta": ".,D",
            "\\Epsilon": ".,E",
            "\\Eta": ".,:",
            "\\Gamma": ".,G",
            "\\Iota": ".,I",
            "\\Kappa": ".,K",
            "\\Lambda": ".,L",
            "\\Mu": ".,M",
            "\\Nu": ".,N",
            "\\Omega": ".,W",
            "\\Omicron": ".,O",
            "\\Phi": ".,F",
            "\\Pi": ".,P",
            "\\Psi": ".,Y",
            "\\Rho": ".,R",
            "\\Sigma": ".,S",
            "\\Tau": ".,T",
            "\\Theta": ".,?",
            "\\Upsilon": ".,U",
            "\\Xi": ".,X",
            "\\Zeta": ".,Z",
            "\\alpha": ".A",
            "\\beta": ".B",
            "\\chi": ".&",
            "\\delta": ".D",
            "\\epsilon": ".E",
            "\\eta": ".:",
            "\\gamma": ".G",
            "\\iota": ".I",
            "\\kappa": ".K",
            "\\lambda": ".L",
            "\\mu": ".M",
            "\\nu": ".N",
            "\\omega": ".W",
            "\\omicron": ".O",
            "\\phi": ".F",
            "\\pi": ".P",
            "\\psi": ".Y",
            "\\rho": ".R",
            "\\sigma": ".S",
            "\\tau": ".T",
            "\\theta": ".?",
            "\\upsilon": ".U",
            "\\xi": ".X",
            "\\zeta": ".Z"
        };
        function h(e) {
            return l.hasOwnProperty(e.value) ? l[e.value] : e.value.slice(1).toUpperCase() + " "
        }
        function p(e, t) {
            return e.isStartOfLine && /^-?$/.test(t) || /\s-?$/.test(t) || e.wasFraction
        }
        function f(e) {
            return "\\sum" === e.value || "\\prod" === e.value
        }
        function m(e, t) {
            if (t >= e.length)
                return !1;
            var r = e[t];
            if ("terminal" === r.type) {
                if (/^[0-9]$/.test(r.value))
                    return !0;
                if ("." !== r.value)
                    return !1;
                if (t + 1 >= e.length)
                    return !1;
                if ("terminal" === (r = e[t + 1]).type)
                    return /^[0-9]$/.test(r.value)
            }
            return !1
        }
        function y(e, t) {
            for (var r, i = "", n = e.levelIndicator, s = 0, a = !1, o = 0; o < t.length; o++) {
                m(t, o) && ("" === n && /[A-Z]$/.test(i) ? i += _(n) : p(e, i) && (i += "#"));
                var l = t[o]
                  , E = o < t.length - 1 ? t[o + 1] : null;
                switch ("level" !== l.type && n !== e.levelIndicator && (b(l) ? n = "" : (e.wasModifiedExpression && "" === e.levelIndicator ? e = k(e, {
                    wasModifiedExpression: !1
                }) : i += _(e.levelIndicator),
                n = e.levelIndicator)),
                l.type) {
                case "terminal":
                    !e.wasModifiedExpression && "" !== n && b(l) ? i += " " + _(n) + c(l).trim() + " " : i += c(l),
                    "." === l.value && E && ("terminal" === E.type && /^[^_\d,]/.test(c(E)) || "greek" === E.type) && (i += '"'),
                    e = k(e, {
                        wasFraction: !1,
                        wasRomanCommand: !1
                    });
                    break;
                case "command":
                    if ("\\space" !== l.value) {
                        var O = f(l);
                        O && (i += '"'),
                        !O && "" !== n && b(l) ? i += " " + _(n) + h(l).trim() + " " : i += h(l),
                        e = k(e, {
                            wasFraction: !1,
                            wasModifiedExpression: O,
                            wasRomanCommand: !0
                        })
                    }
                    break;
                case "greek":
                    i += (r = l,
                    u.hasOwnProperty(r.value) ? u[r.value] : r.value.slice(1).toUpperCase() + " "),
                    e = k(e, {
                        wasFraction: !1
                    });
                    break;
                case "fraction":
                    var A = d(e, l);
                    i += A.value,
                    s = Math.max(s, A.fractionLevel),
                    e = k(e, {
                        wasFraction: !0,
                        wasRomanCommand: !1
                    });
                    break;
                case "radical":
                    var x = g(e, l);
                    i += x.value,
                    s = Math.max(s, x.fractionLevel),
                    e = k(e, {
                        wasFraction: !1,
                        wasRomanCommand: !1
                    });
                    break;
                case "level":
                    !e.wasModifiedExpression && e.wasRomanCommand ? (a = /\s$/.test(i)) && (i = i.replace(/\s$/, "")) : a = !1;
                    var I = v(e, i.length > 0 && !0 === /[A-Za-z]/.test(i[i.length - 1]), a, l);
                    i += I.value,
                    n = I.levelIndicator,
                    e = k(e, {
                        wasFraction: !1,
                        wasRomanCommand: !1
                    });
                    break;
                case "typeform":
                    i += y(e, l.value).value,
                    "operator_name" === l.name && (i += " "),
                    e = k(e, {
                        wasFraction: !1,
                        wasModifiedExpression: !1,
                        wasRomanCommand: !1
                    })
                }
            }
            return {
                fractionLevel: s,
                levelIndicator: n,
                value: i
            }
        }
        function d(e, t) {
            for (var r = y(e = k(e, {
                isStartOfLine: !1
            }), t.numerator), i = y(e, t.denominator), n = Math.max(r.fractionLevel, i.fractionLevel), s = "", a = 0; a < n; a++)
                s += ",";
            var o = s + "?" + r.value;
            return r.levelIndicator !== e.levelIndicator && (o += _(e.levelIndicator)),
            /\.$/.test(r.value) && (o += '"'),
            o += s + "/" + i.value,
            i.levelIndicator !== e.levelIndicator && (o += _(e.levelIndicator)),
            /\.$/.test(i.value) && (o += '"'),
            {
                fractionLevel: n + 1,
                value: o += s + "#"
            }
        }
        function g(e, t) {
            for (var r = e.radicalLevel, i = "", n = "", s = 0; s < r; s++)
                n += ".";
            if (t.index) {
                i += n + "<";
                var a = y(k(e, {
                    isStartOfLine: !1
                }), t.index);
                i += a.value,
                /\.$/.test(a.value) && (i += '"'),
                a.levelIndicator !== e.levelIndicator && (i += _(e.levelIndicator)),
                i += ">"
            } else
                i += n + ">";
            var o = y(k(e, {
                isStartOfLine: !1,
                radicalLevel: r + 1
            }), t.radicand);
            return i += o.value,
            /\.$/.test(o.value) && (i += '"'),
            o.levelIndicator !== e.levelIndicator && (i += _(e.levelIndicator)),
            i += n + "]",
            {
                fractionLevel: o.fractionLevel,
                value: i
            }
        }
        function v(e, t, r, i) {
            var n = e.levelIndicator
              , s = ""
              , a = function(e) {
                var t = "";
                if (e)
                    for (var r = 0, i = e; r < i.length; r++) {
                        var n = i[r];
                        if ("command" !== n.type || "\\prime" !== n.value)
                            break;
                        t += "'"
                    }
                return t
            }(i.superscript);
            if (s += a,
            i.subscript) {
                e.wasModifiedExpression && (s += "%");
                var o = y(k(e, {
                    isStartOfLine: !1,
                    levelIndicator: n = e.levelIndicator + ";"
                }), i.subscript);
                t && /^[0-9]*(\.|\,)?[0-9]+$/.test(o.value) && n.length <= 1 ? n = e.levelIndicator : !e.wasModifiedExpression && i.subscript[0] && "level" !== i.subscript[0].type && (s += _(n)),
                s += o.value,
                /\.$/.test(o.value) && (s += '"')
            }
            if (i.superscript) {
                e.wasModifiedExpression && (s += "<");
                var c = y(k(e, {
                    isStartOfLine: !1,
                    levelIndicator: n = e.levelIndicator + "^"
                }), i.superscript.slice(a.length));
                !e.wasModifiedExpression && i.superscript[0] && "level" !== i.superscript[0].type && "" !== c.value && (s += _(n)),
                s += c.value,
                /\.$/.test(c.value) && (s += '"')
            }
            return e.wasModifiedExpression ? s += "]" : e.wasRomanCommand && r && (s += " ",
            n = n.slice(0, n.length - 1)),
            {
                levelIndicator: n,
                value: s
            }
        }
        function _(e) {
            return e || '"'
        }
        function k(e, t) {
            return i(i({}, e), t)
        }
        function b(e) {
            return ("terminal" === e.type || "command" === e.type) && /^<|>|\=|\\leq?|\\geq?|\\neq?$/.test(e.value)
        }
    }
    , function(e, t, r) {
        "use strict";
        var i = this && this.__assign || function() {
            return (i = Object.assign || function(e) {
                for (var t, r = 1, i = arguments.length; r < i; r++)
                    for (var n in t = arguments[r])
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                return e
            }
            ).apply(this, arguments)
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = r(7)
          , s = r(11)
          , a = r(12)
          , o = r(0);
        t.default = function(e) {
            return o.map(a.default(e), function(e) {
                return function(e) {
                    return m({
                        capsLock: !1,
                        wasNumber: !1
                    }, e).value
                }(s.default(e))
            })
        }
        ;
        var c = {
            "!": "6",
            "(": '"<',
            ")": '">',
            "*": '"9',
            "+": '"6',
            ",": "1",
            "-": '"-',
            ".": "4",
            "/": "_/",
            ":": "3",
            "<": "@<",
            "=": '"7',
            ">": "@>",
            "?": "8",
            "[": ".<",
            "\\ ": " ",
            "\\%": ".0",
            "\\&": "@&",
            "\\,": " ",
            "\\infty": "#=",
            "\\int": "!",
            "\\{": "_<",
            "\\|": "_\\_\\",
            "\\}": "_>",
            "]": ".>",
            "|": "_\\"
        };
        function l(e, t, r) {
            var i = ""
              , n = t.value
              , s = r && "terminal" === r.type ? r.value : "";
            return y(n, e) && (i += ";"),
            /^[\D]/.test(n) && (e = E(e, {
                wasNumber: !1
            })),
            /^[a-z]$/.test(n) ? e.capsLock ? (e = E(e, {
                capsLock: !1
            }),
            i += ",'" + n.toUpperCase()) : i += n.toUpperCase() : /^[A-Z]$/.test(n) ? e.capsLock ? i += n : /[A-Z]/.test(s) ? (e = E(e, {
                capsLock: !0
            }),
            i += ",," + n) : i += "," + n : (e = E(e, {
                capsLock: !1
            }),
            /^[0-9.]$/.test(n) ? i += function(e) {
                for (var t = "", r = "A".charCodeAt(0) - 1, i = 0, n = e; i < n.length; i++) {
                    var s = n[i];
                    t += "," === s ? "1" : "." === s ? "4" : "0" === s ? "J" : String.fromCharCode(r + Number(s))
                }
                return t
            }(n) : c.hasOwnProperty(n) ? i += c[n] : i += "[terminal: " + n + "]"),
            {
                value: i,
                ctx: e
            }
        }
        var u = {
            "\\Vert": "_\\_\\",
            "\\cdot": '"4',
            "\\div": '"/',
            "\\ge": "_@>",
            "\\geq": "_@>",
            "\\langle": "@<",
            "\\ldots": "444",
            "\\le": "_@<",
            "\\leq": "_@<",
            "\\ne": '"7@:',
            "\\neq": '"7@:',
            "\\approx": "^9",
            "\\parallel": "#L",
            "\\perp": "#-",
            "\\prime": "7",
            "\\prod": ",.P",
            "\\rangle": "@>",
            "\\sim": "@9",
            "\\sum": ",.S",
            "\\times": '"8',
            "\\to": ":O",
            "\\vert": "_\\"
        }
          , h = {
            "\\Alpha": ",.A",
            "\\Beta": ",.B",
            "\\Chi": ",.&",
            "\\Delta": ",.D",
            "\\Epsilon": ",.E",
            "\\Eta": ",.:",
            "\\Gamma": ",.G",
            "\\Iota": ",.I",
            "\\Kappa": ",.K",
            "\\Lambda": ",.L",
            "\\Mu": ",.M",
            "\\Nu": ",.N",
            "\\Omega": ",.W",
            "\\Omicron": ",.O",
            "\\Phi": ",.F",
            "\\Pi": ",.P",
            "\\Psi": ",.Y",
            "\\Rho": ",.R",
            "\\Sigma": ",.S",
            "\\Tau": ",.T",
            "\\Theta": ",.?",
            "\\Upsilon": ",.U",
            "\\Xi": ",.X",
            "\\Zeta": ",.Z",
            "\\alpha": ".A",
            "\\beta": ".B",
            "\\chi": ".&",
            "\\delta": ".D",
            "\\epsilon": ".E",
            "\\eta": ".:",
            "\\gamma": ".G",
            "\\iota": ".I",
            "\\kappa": ".K",
            "\\lambda": ".L",
            "\\mu": ".M",
            "\\nu": ".N",
            "\\omega": ".W",
            "\\omicron": ".O",
            "\\phi": ".F",
            "\\pi": ".P",
            "\\psi": ".Y",
            "\\rho": ".R",
            "\\sigma": ".S",
            "\\tau": ".T",
            "\\theta": ".?",
            "\\upsilon": ".U",
            "\\xi": ".X",
            "\\zeta": ".Z"
        };
        function p(e, t) {
            var r;
            return y(r = u.hasOwnProperty(e.value) ? u[e.value] : e.value.slice(1).toUpperCase() + " ", t) && (r = ";" + r),
            /^[\D]/.test(r) && (t = E(t, {
                wasNumber: !1
            })),
            {
                value: r,
                ctx: t
            }
        }
        function f(e, t) {
            if (t < e.length) {
                var r = e[t];
                if ("terminal" === r.type) {
                    if (/^\d$/.test(r.value))
                        return !0;
                    if ("." !== r.value)
                        return !1;
                    if (t + 1 >= e.length)
                        return !1;
                    if ("terminal" === (r = e[t + 1]).type)
                        return /^\d$/.test(r.value)
                }
            }
            return !1
        }
        function m(e, t) {
            for (var r, i, n, s = "", a = !0, o = 0; o < t.length; o++) {
                f(t, o) ? (e = E(e, {
                    wasNumber: !0
                }),
                a && (s += "#",
                a = !1)) : a = !0;
                var c = t[o];
                switch (c.type) {
                case "terminal":
                    e = (r = l(e, c, o < t.length - 1 ? t[o + 1] : void 0)).ctx,
                    " " === (s += r.value)[s.length - 1] && (a = !0);
                    break;
                case "command":
                    "\\space" !== c.value && (e = (i = p(c, e)).ctx,
                    " " === (s += i.value)[s.length - 1] && (a = !0));
                    break;
                case "greek":
                    " " === (s += (n = c,
                    h.hasOwnProperty(n.value) ? h[n.value] : n.value.slice(1).toUpperCase() + " "))[s.length - 1] && (a = !0);
                    break;
                case "fraction":
                    var u = d(e, c);
                    s += u.value,
                    e = u.ctx,
                    a = !1;
                    break;
                case "radical":
                    s += v(e, c).value,
                    a = !0;
                    break;
                case "level":
                    var y = _(e, c);
                    s += y.value,
                    e = y.ctx,
                    a = !0;
                    break;
                case "typeform":
                    var g = m(e, c.value).value;
                    s += g,
                    /(ARC)?(SIN|COS|TAN|CSC|SEC|COT)(H)?/.test(g) && (s += " ")
                }
            }
            return {
                ctx: e,
                value: s
            }
        }
        function y(e, t) {
            return t.wasNumber && /^[A-Ja-j]/.test(e)
        }
        function d(e, t) {
            var r, i = m(e, t.numerator), n = m(e, t.denominator);
            return g(i.value) && g(n.value) ? (e = E(e, {
                wasNumber: !0
            }),
            r = i.value + "/" + n.value.slice(1)) : (e = E(e, {
                wasNumber: !1
            }),
            r = "(" + i.value + "./" + n.value + ")"),
            {
                ctx: e,
                value: r
            }
        }
        function g(e) {
            return /^\#[A-J41]+$/.test(e)
        }
        function v(e, t) {
            var r = "%"
              , i = m(e, t.radicand);
            if (t.index) {
                var s = m(e, n.group(n.level({
                    "^": t.index
                })));
                r += s.value,
                /\#[A-J]$/.test(s.value) && /^[A-J]/.test(i.value) && (r += ";")
            }
            return {
                ctx: e,
                value: r += i.value + "+"
            }
        }
        function _(e, t) {
            var r, i = "", n = function(e) {
                var t = "";
                if (e)
                    for (var r = 0, i = e; r < i.length; r++) {
                        var n = i[r];
                        if ("command" !== n.type || "\\prime" !== n.value)
                            break;
                        t += "7"
                    }
                return t
            }(t.superscript);
            if (i += n,
            t.subscript) {
                var s = m(e, t.subscript);
                r = b(t.subscript, s.value, 0) ? "<" + k(s.value) + ">" : s.value,
                e = E(e, {
                    wasNumber: s.ctx.wasNumber
                }),
                "" !== r && (i += "5" + r)
            }
            if (t.superscript) {
                var a = m(e, t.superscript.slice(n.length));
                r = b(t.superscript, a.value, n.length) ? "<" + k(a.value) + ">" : a.value,
                e = E(e, {
                    wasNumber: a.ctx.wasNumber
                }),
                "" !== n && "" === r || (i += "9" + r)
            }
            return {
                ctx: e,
                value: i
            }
        }
        function k(e) {
            return /^;/.test(e) ? e.slice(1) : e
        }
        function b(e, t, r) {
            var i = e[0]
              , n = (t.match(/\</g) || []).length
              , s = /^["|\.|_]?\</.test(t)
              , a = (t.match(/\>/g) || []).length
              , o = /["|\.|_]?\>$/.test(t);
            return !g(t) && e.length - r > 1 && 0 === n && 0 === a || n > 0 && a > 0 && (!s || !o) || n > 1 || a > 1 || i && "typeform" === i.type
        }
        function E(e, t) {
            return i(i({}, e), t)
        }
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = r(2)
          , n = r(18)
          , s = r(0);
        function a(e, t) {
            for (var r = "", n = t, s = "", m = !1, y = "", d = "", g = function(e) {
                for (var t = [], r = [], i = 0; i < e.length; i++) {
                    var n = e[i];
                    if (l(n))
                        t.push({
                            direction: o,
                            index: i
                        }),
                        r.push(0);
                    else if (u(n)) {
                        for (; t.length && 2 === t[t.length - 1].direction; )
                            t.pop();
                        if (t.length) {
                            if (s = t.pop())
                                r[s.index] = o,
                                r.push(c)
                        } else
                            r.push(0)
                    } else if (h(n)) {
                        var s;
                        if (t.length && 2 === t[t.length - 1].direction) {
                            if (s = t.pop())
                                r[s.index] = o,
                                r.push(c)
                        } else
                            t.push({
                                direction: 2,
                                index: i
                            }),
                            r.push(0)
                    } else
                        r.push(0)
                }
                return r
            }(e), v = 0; v < e.length; v++) {
                var _ = e[v]
                  , k = v + 1 < e.length ? e[v + 1] : null;
                switch (_.type) {
                case "terminal":
                    var b = i.getAutoOperator(e.slice(v));
                    "" !== b.value ? (r += b.value,
                    v += b.terminalCount - 1,
                    m = m || b.modified) : " " === _.value ? (m ? (r += f(n, s = y),
                    n = s) : r += "\\ ",
                    m = !1) : (g[v] === o ? r += "\\left" : g[v] === c && (r += "\\right"),
                    r += _.value);
                    break;
                case "comparison":
                    r += f(n, s = ""),
                    n = s,
                    m = !1,
                    r += _.value;
                    break;
                case "level_with_comparison":
                    r += f(n, _.level),
                    n = _.level,
                    m = !1,
                    r += _.value;
                    break;
                case "command":
                    var E = _.value.slice(1).trim();
                    k && "terminal" === k.type && /[a-z]/.test(k.value) ? (r += E,
                    m = !1) : i.containsValue(E) ? (r += "\\operatorname{" + E + "}",
                    m = !0) : (r += _.value,
                    m = !0),
                    y = n;
                    break;
                case "expression":
                    r += _.value;
                    break;
                case "fraction":
                    r += p(_.numerator, _.denominator, n);
                    break;
                case "modified_expression":
                    r += a(_.expression, n) + " ",
                    _.under && (r += "_{" + a(_.under, n) + "}"),
                    _.over && (r += "^{" + a(_.over, n) + "}");
                    break;
                case "radical":
                    r += "\\sqrt",
                    _.index && (r += "[" + a(_.index, n) + "]"),
                    r += "{" + a(_.value, n) + "}";
                    break;
                case "simple_subscript":
                    "" === n ? (r += _.base.value + "_{" + _.subscript.value + "}",
                    "command" === _.base.type && (m = !0,
                    y = n)) : r += _.base.value + _.subscript.value;
                    break;
                case "level":
                    r += f(n, _.value, d),
                    n = _.value,
                    "^" === _.value && "" !== d && (d = "");
                    break;
                case "primes":
                    k && "level" === k.type && ";" === k.value ? d = _.value : "" !== n ? (r += Array(_.value.length + 1).join("\\prime "),
                    d = "") : (r += _.value,
                    d = "")
                }
            }
            return (r += f(n, t) + d).replace(/([^\\])( )$/, "$1")
        }
        var o = 1
          , c = -1;
        function l(e) {
            return "terminal" === e.type && /^(\\langle |\[|\(|\\{)$/.test(e.value)
        }
        function u(e) {
            return "terminal" === e.type && /^(\\rangle |\]|\)|\\})$/.test(e.value)
        }
        function h(e) {
            return "terminal" === e.type && /^(\\\||\|)$/.test(e.value)
        }
        function p(e, t, r) {
            return "\\frac{" + a(e, r) + "}{" + a(t, r) + "}"
        }
        function f(e, t, r) {
            var i, n, s, a = "", o = Math.max(e.length, t.length);
            for (i = 0; i < o && e[i] === t[i]; i++)
                ;
            for (n = e.length - 1; n >= i; n--)
                a += "}";
            for (s = i; s < t.length; s++)
                "^" === t[s] && (r && (a += r),
                a += "^{"),
                ";" === t[s] && (a += "_{");
            return a
        }
        function m(e) {
            return a(e, "")
        }
        t.default = function(e, t) {
            return t && t.operatorNames ? i.setOperatorNames(t.operatorNames) : i.resetOperatorNames(),
            s.map(n.default(e, t), m)
        }
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.terminal = function(e) {
            return {
                type: "terminal",
                value: e
            }
        }
        ,
        t.command = function(e) {
            return {
                type: "command",
                value: "\\" + e.trim() + " "
            }
        }
        ;
        var i = {
            '"K': "<",
            '"K:': "\\leq ",
            $L: "\\parallel ",
            $O: "\\to ",
            $P: "\\perp ",
            ".1": ">",
            ".1:": "\\geq ",
            ".K": "=",
            "@:@:": "\\approx",
            "/$L": "\\nparallel ",
            "/.K": "\\neq ",
            "=": "=",
            "@:": "\\sim "
        };
        function n(e) {
            return {
                type: "level",
                value: e
            }
        }
        t.level_with_comparison = function(e) {
            var t = /[\^;]+/.exec(e)
              , r = t ? t.toString() : ""
              , s = e.slice(n.length);
            return {
                type: "level_with_comparison",
                level: r,
                value: i[s]
            }
        }
        ,
        t.comparison = function(e) {
            return {
                type: "comparison",
                value: i[e]
            }
        }
        ,
        t.level = n,
        t.baseline = function() {
            return n("")
        }
        ,
        t.primes = function(e) {
            return {
                type: "primes",
                value: e
            }
        }
        ,
        t.fraction = function(e, t) {
            return {
                type: "fraction",
                numerator: e,
                denominator: t
            }
        }
        ,
        t.modified_expression = function(e, t, r) {
            return {
                type: "modified_expression",
                expression: e,
                under: t,
                over: r
            }
        }
        ,
        t.radical = function(e, t) {
            return {
                type: "radical",
                value: e,
                index: t
            }
        }
        ,
        t.expression = function(e) {
            return {
                type: "expression",
                value: e
            }
        }
        ,
        t.simple_subscript = function(e, t) {
            return {
                type: "simple_subscript",
                base: e,
                subscript: t
            }
        }
        ;
        var s = {
            ".&": "\\chi",
            ".,&": "\\Chi",
            ".,:": "\\Eta",
            ".,?": "\\Theta",
            ".,A": "\\Alpha",
            ".,B": "\\Beta",
            ".,D": "\\Delta",
            ".,E": "\\Epsilon",
            ".,F": "\\Phi",
            ".,G": "\\Gamma",
            ".,I": "\\Iota",
            ".,K": "\\Kappa",
            ".,L": "\\Lambda",
            ".,M": "\\Mu",
            ".,N": "\\Nu",
            ".,O": "\\Omicron",
            ".,P": "\\prod",
            ".,R": "\\Rho",
            ".,S": "\\sum",
            ".,T": "\\Tau",
            ".,U": "\\Upsilon",
            ".,W": "\\Omega",
            ".,X": "\\Xi",
            ".,Y": "\\Psi",
            ".,Z": "\\Zeta",
            ".:": "\\eta",
            ".?": "\\theta",
            ".A": "\\alpha",
            ".B": "\\beta",
            ".D": "\\delta",
            ".E": "\\epsilon",
            ".F": "\\phi",
            ".G": "\\gamma",
            ".I": "\\iota",
            ".K": "\\kappa",
            ".L": "\\lambda",
            ".M": "\\mu",
            ".N": "\\nu",
            ".O": "\\omicron",
            ".P": "\\pi",
            ".R": "\\rho",
            ".S": "\\sigma",
            ".T": "\\tau",
            ".U": "\\upsilon",
            ".W": "\\omega",
            ".X": "\\xi",
            ".Y": "\\psi",
            ".Z": "\\zeta"
        };
        t.greek = function(e) {
            if (s.hasOwnProperty(e))
                return s[e] + " ";
            throw new Error("Unknown Greek letter")
        }
        ,
        t.group = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            return Array.prototype.concat.apply([], e)
        }
    }
    , function(e, t, r) {
        "use strict";
        var i = this && this.__assign || function() {
            return (i = Object.assign || function(e) {
                for (var t, r = 1, i = arguments.length; r < i; r++)
                    for (var n in t = arguments[r])
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                return e
            }
            ).apply(this, arguments)
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = r(6)
          , s = r(9)
          , a = r(17)
          , o = r(20);
        t.default = function(e, t) {
            t || (t = {});
            var r = s.parser
              , c = Object.create(r);
            c.yy = a,
            c.yy.warnOrError = function(e) {
                c.parseError(e, {
                    recoverable: !1
                })
            }
            ;
            var l = Object.create(r);
            l.yy = i({
                warnings: []
            }, a),
            l.yy.warnOrError = function(e) {
                l.yy.warnings.push(e)
            }
            ,
            l.lexer = o.default,
            r = t.strict ? c : l;
            try {
                return {
                    isError: !1,
                    value: r.parse(e),
                    warnings: r.yy.warnings || []
                }
            } catch (e) {
                return {
                    error: n.default(e),
                    isError: !0
                }
            }
        }
    }
    , function(e, t, r) {
        "use strict";
        var i = this && this.__assign || function() {
            return (i = Object.assign || function(e) {
                for (var t, r = 1, i = arguments.length; r < i; r++)
                    for (var n in t = arguments[r])
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                return e
            }
            ).apply(this, arguments)
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = r(6)
          , s = r(21)
          , a = r(10)
          , o = r(24);
        t.default = function(e, t) {
            t || (t = {});
            var r = a.parser
              , c = Object.create(r);
            c.yy = o;
            var l = Object.create(r);
            l.yy = i({
                warnings: []
            }, o),
            l.lexer = s.default,
            r = t.strict ? c : l;
            try {
                return {
                    isError: !1,
                    value: r.parse(e),
                    warnings: r.yy.warnings || []
                }
            } catch (e) {
                return {
                    error: n.default(e),
                    isError: !0
                }
            }
        }
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = r(9)
          , n = i.parser.lexer
          , s = Object.create(n);
        t.default = s;
        var a = i.parser.terminals_
          , o = i.parser.symbols_;
        s.setInput = function(e, t) {
            this.delimiterStack = [],
            this.outputQueue = [],
            this.canAcceptPrimes = !1,
            n.setInput.call(this, e, t)
        }
        ,
        s.lex = function() {
            var e = -1;
            if (!this)
                return e;
            if (this.outputQueue.length)
                return this.outputQueue.shift();
            for (var t, r, i = n.lex.call(this); "UNKNOWN" === a[i] || !this.canAcceptPrimes && "PRIMES" === a[i]; )
                this.warn(),
                i = n.lex.call(this);
            this.canAcceptPrimes = !0;
            var s = this.delimiterStack ? this.delimiterStack[this.delimiterStack.length - 1] : -1;
            switch (a[i]) {
            case "OPEN_FRAC":
            case "OPEN_MODEXP":
                this.delimiterStack.push(i),
                this.canAcceptPrimes = !1;
                break;
            case "RADICAL_INDEX":
                s === o.RADICAL_INDEX && (this.delimiterStack.pop(),
                this.pushCloseTokens(s)),
                this.delimiterStack.push(i),
                this.canAcceptPrimes = !1;
                break;
            case "OPEN_RADICAL":
                s === o.RADICAL_INDEX && this.delimiterStack.pop(),
                this.delimiterStack.push(i),
                this.canAcceptPrimes = !1;
                break;
            case "SLASH":
                for (t = !1; this.delimiterStack.length; ) {
                    if ((r = this.delimiterStack.pop() || -1) === o.OPEN_FRAC) {
                        t = !0;
                        break
                    }
                    this.pushCloseTokens(r)
                }
                t || this.pushOpenTokens(i),
                this.delimiterStack.push(i),
                this.canAcceptPrimes = !1;
                break;
            case "CLOSE_FRAC":
                for (t = !1; this.delimiterStack.length; ) {
                    if ((r = this.delimiterStack.pop() || -1) === o.SLASH) {
                        t = !0;
                        break
                    }
                    if (r === o.OPEN_FRAC) {
                        this.addMissingToken(o.SLASH),
                        t = !0;
                        break
                    }
                    this.pushCloseTokens(r)
                }
                if (!t)
                    return this.warn(),
                    this.canAcceptPrimes = !1,
                    this.lex();
                break;
            case "CLOSE_RADICAL":
                for (t = !1; this.delimiterStack.length; ) {
                    if ((r = this.delimiterStack.pop() || -1) === o.OPEN_RADICAL) {
                        t = !0;
                        break
                    }
                    if (r === o.RADICAL_INDEX) {
                        t = !0,
                        this.addMissingToken(o.OPEN_RADICAL);
                        break
                    }
                    this.pushCloseTokens(r)
                }
                t || this.pushOpenTokens(i);
                break;
            case "CLOSE_MODEXP":
                for (t = !1; this.delimiterStack.length; ) {
                    if ((r = this.delimiterStack.pop() || -1) === o.OPEN_MODEXP) {
                        t = !0;
                        break
                    }
                    this.pushCloseTokens(r)
                }
                t || this.pushOpenTokens(i);
                break;
            case "EOF":
                for (; this.delimiterStack.length; )
                    r = this.delimiterStack.pop() || -1,
                    this.pushCloseTokens(r)
            }
            return this.outputQueue.push(i),
            e = this.outputQueue.shift() || -1
        }
        ,
        s.warn = function() {
            this.yylloc && this.yy.warnings.push({
                location: this.yylloc
            })
        }
        ,
        s.addMissingToken = function(e) {
            this.outputQueue.push(e),
            this.warn()
        }
        ,
        s.pushCloseTokens = function(e) {
            switch (a[e]) {
            case "OPEN_FRAC":
                this.addMissingToken(o.SLASH),
                this.addMissingToken(o.CLOSE_FRAC);
                break;
            case "SLASH":
                this.addMissingToken(o.CLOSE_FRAC);
                break;
            case "RADICAL_INDEX":
                this.addMissingToken(o.OPEN_RADICAL),
                this.addMissingToken(o.CLOSE_RADICAL);
                break;
            case "OPEN_RADICAL":
                this.addMissingToken(o.CLOSE_RADICAL);
                break;
            case "OPEN_MODEXP":
                this.addMissingToken(o.CLOSE_MODEXP)
            }
        }
        ,
        s.pushOpenTokens = function(e) {
            switch (a[e]) {
            case "SLASH":
                this.addMissingToken(o.OPEN_FRAC);
                break;
            case "CLOSE_FRAC":
                this.addMissingToken(o.OPEN_FRAC),
                this.addMissingToken(o.SLASH);
                break;
            case "CLOSE_RADICAL":
                this.addMissingToken(o.OPEN_RADICAL);
                break;
            case "CLOSE_MODEXP":
                this.addMissingToken(o.OPEN_MODEXP)
            }
        }
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = r(10)
          , n = i.parser.lexer
          , s = Object.create(n);
        t.default = s;
        var a = i.parser.terminals_
          , o = i.parser.symbols_;
        s.setInput = function(e, t) {
            this.delimiterStack = [],
            this.outputQueue = [],
            n.setInput.call(this, e, t)
        }
        ,
        s.lex = function() {
            if (this.outputQueue.length)
                return this.outputQueue.shift();
            for (var e, t, r = n.lex.call(this); "UNKNOWN" === a[r]; )
                this.warn(),
                r = n.lex.call(this);
            var i = this.delimiterStack ? this.delimiterStack[this.delimiterStack.length - 1] : -1;
            switch (a[r]) {
            case "OPEN_FRAC":
            case "OPEN_GROUP":
                this.delimiterStack.push(r);
                break;
            case "RADICAL_WITH_INDEX":
                i === o.RADICAL_WITH_INDEX && (this.delimiterStack.pop(),
                this.pushCloseTokens(i)),
                this.delimiterStack.push(r);
                break;
            case "RADICAL":
                i === o.RADICAL_WITH_INDEX && this.delimiterStack.pop(),
                this.delimiterStack.push(r);
                break;
            case "OVER":
                for (e = !1; this.delimiterStack.length; ) {
                    if ((t = this.delimiterStack.pop() || -1) === o.OPEN_FRAC) {
                        e = !0;
                        break
                    }
                    this.pushCloseTokens(t)
                }
                e || this.pushOpenTokens(r),
                this.delimiterStack.push(r);
                break;
            case "CLOSE_FRAC":
                for (e = !1; this.delimiterStack.length; ) {
                    if ((t = this.delimiterStack.pop() || -1) === o.OVER) {
                        e = !0;
                        break
                    }
                    if (t === o.OPEN_FRAC) {
                        this.outputQueue.push(o.OVER),
                        e = !0;
                        break
                    }
                    this.pushCloseTokens(t)
                }
                e || this.pushOpenTokens(r);
                break;
            case "CLOSE_GROUP":
                for (e = !1; this.delimiterStack.length; ) {
                    if ((t = this.delimiterStack.pop() || -1) === o.OPEN_GROUP) {
                        e = !0;
                        break
                    }
                    this.pushCloseTokens(t)
                }
                e || this.pushOpenTokens(r);
                break;
            case "CLOSE_RADICAL":
                for (e = !1; this.delimiterStack.length; ) {
                    if ((t = this.delimiterStack.pop() || -1) === o.RADICAL || t === o.RADICAL_WITH_INDEX) {
                        e = !0;
                        break
                    }
                    this.pushCloseTokens(t)
                }
                e || this.pushOpenTokens(r);
                break;
            case "EOF":
                for (; this.delimiterStack.length; )
                    t = this.delimiterStack.pop() || -1,
                    this.pushCloseTokens(t)
            }
            return this.outputQueue.push(r),
            this.outputQueue.shift() || -1
        }
        ,
        s.warn = function() {
            this.yylloc && this.yy.warnings.push({
                location: this.yylloc
            })
        }
        ,
        s.addMissingToken = function(e) {
            this.outputQueue.push(e),
            this.warn()
        }
        ,
        s.pushCloseTokens = function(e) {
            switch (a[e]) {
            case "OPEN_FRAC":
                this.addMissingToken(o.OVER),
                this.addMissingToken(o.CLOSE_FRAC);
                break;
            case "OVER":
                this.addMissingToken(o.CLOSE_FRAC);
                break;
            case "OPEN_GROUP":
                this.addMissingToken(o.CLOSE_GROUP);
                break;
            case "RADICAL_WITH_INDEX":
            case "RADICAL":
                this.addMissingToken(o.CLOSE_RADICAL)
            }
        }
        ,
        s.pushOpenTokens = function(e) {
            switch (a[e]) {
            case "OVER":
                this.addMissingToken(o.OPEN_FRAC);
                break;
            case "CLOSE_FRAC":
                this.addMissingToken(o.OPEN_FRAC),
                this.addMissingToken(o.OVER);
                break;
            case "CLOSE_GROUP":
                this.addMissingToken(o.OPEN_GROUP);
                break;
            case "CLOSE_RADICAL":
                this.addMissingToken(o.RADICAL)
            }
        }
    }
    , function(e, t, r) {
        "use strict";
        function i(e) {
            return e.isError
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.isErr = i,
        t.isOk = function(e) {
            return !e.isError
        }
        ,
        t.map = function(e, t) {
            return i(e) ? e : {
                isError: !1,
                value: t(e.value)
            }
        }
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = r(2)
          , n = r(19)
          , s = r(0);
        function a(e, t) {
            for (var r, n, s = "", m = !1, y = "", d = function(e) {
                for (var t = [], r = [], i = 0; i < e.length; i++) {
                    var n = e[i];
                    if (l(n))
                        t.push({
                            direction: o,
                            index: i
                        }),
                        r.push(0);
                    else if (u(n)) {
                        for (; t.length && 2 === t[t.length - 1].direction; )
                            t.pop();
                        if (t.length) {
                            if (s = t.pop())
                                r[s.index] = o,
                                r.push(c)
                        } else
                            r.push(0)
                    } else if (h(n)) {
                        var s;
                        if (t.length && 2 === t[t.length - 1].direction) {
                            if (s = t.pop())
                                r[s.index] = o,
                                r.push(c)
                        } else
                            t.push({
                                direction: 2,
                                index: i
                            }),
                            r.push(0)
                    } else
                        r.push(0)
                }
                return r
            }(e), g = 0; g < e.length; g++) {
                var v = e[g]
                  , _ = g + 1 < e.length ? e[g + 1] : null;
                switch (v.type) {
                case "terminal":
                    var k = i.getAutoOperator(e.slice(g));
                    "" !== k.value ? (s += k.value,
                    g += k.terminalCount - 1) : " " !== v.value || m ? (d[g] === o ? s += "\\left" : d[g] === c && (s += "\\right"),
                    s += v.value) : s += "\\ ",
                    m = !1;
                    break;
                case "command":
                    var b = v.value.slice(1).trim();
                    _ && "terminal" === _.type && /[a-z]/.test(_.value) ? (s += b,
                    m = !1) : i.containsValue(b) ? (s += "\\operatorname{" + b + "}",
                    m = !0) : (s += v.value,
                    m = !0);
                    break;
                case "expression":
                    s += v.value;
                    break;
                case "fraction":
                    s += (r = v.numerator,
                    n = v.denominator,
                    "\\frac{" + a(r) + "}{" + a(n) + "}");
                    break;
                case "radical":
                    s += "\\sqrt",
                    v.index && (s += "[" + a(v.index) + "]"),
                    s += "{" + a(v.value) + "}";
                    break;
                case "basic_level":
                    s += p(v.level, v.value, y),
                    "9" === v.level && (y = "");
                    break;
                case "bracketed_level":
                    s += f(v.level, v.lbrack, v.value, v.rbrack, y),
                    "9" === v.level && (y = "");
                    break;
                case "primes":
                    !_ || "basic_level" !== _.type && "bracketed_level" !== _.type || "5" !== _.level ? t && "" !== t ? (s += Array(v.value.length + 1).join("\\prime "),
                    y = "") : (s += v.value,
                    y = "") : y = v.value
                }
            }
            return (s += y).replace(/([^\\])( )$/, "$1")
        }
        var o = 1
          , c = -1;
        function l(e) {
            return "terminal" === e.type && /^(\\langle |\[|\(|\\{)$/.test(e.value)
        }
        function u(e) {
            return "terminal" === e.type && /^(\\rangle |\]|\)|\\})$/.test(e.value)
        }
        function h(e) {
            return "terminal" === e.type && /^(\\\||\|)$/.test(e.value)
        }
        function p(e, t, r) {
            var i = ""
              , n = "{" + a(t, e) + "}";
            return "9" === e ? i += r + "^" + n : "5" === e && (i += "_" + n),
            i
        }
        function f(e, t, r, i, n) {
            var s = ""
              , o = "{" + t + a(r, e) + i + "}";
            return "9" === e ? s += n + "^" + o : "5" === e && (s += "_" + o),
            s
        }
        var m = a;
        t.default = function(e, t) {
            return t && t.operatorNames ? i.setOperatorNames(t.operatorNames) : i.resetOperatorNames(),
            s.map(n.default(e, t), function(e) {
                return m(e, "")
            })
        }
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.terminal = function(e) {
            return {
                type: "terminal",
                value: e
            }
        }
        ,
        t.command = function(e) {
            return {
                type: "command",
                value: e
            }
        }
        ,
        t.basic_level = function(e, t) {
            return {
                type: "basic_level",
                level: e,
                value: t
            }
        }
        ,
        t.bracketed_level = function(e, t, r, i) {
            return {
                type: "bracketed_level",
                level: e,
                lbrack: t,
                value: r,
                rbrack: i
            }
        }
        ,
        t.primes = function(e) {
            return {
                type: "primes",
                value: e.length > 0 ? Array(e.length + 1).join("'") : ""
            }
        }
        ,
        t.fraction = function(e, t) {
            return {
                type: "fraction",
                numerator: e,
                denominator: t
            }
        }
        ,
        t.radical = function(e, t) {
            return {
                type: "radical",
                value: e,
                index: t
            }
        }
        ,
        t.expression = function(e) {
            return {
                type: "expression",
                value: e
            }
        }
        ,
        t.group = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            return Array.prototype.concat.apply([], e)
        }
        ;
        var i = {
            ",.&": "\\Chi",
            ",.:": "\\Eta",
            ",.?": "\\Theta",
            ",.A": "\\Alpha",
            ",.B": "\\Beta",
            ",.D": "\\Delta",
            ",.E": "\\Epsilon",
            ",.F": "\\Phi",
            ",.G": "\\Gamma",
            ",.I": "\\Iota",
            ",.K": "\\Kappa",
            ",.L": "\\Lambda",
            ",.M": "\\Mu",
            ",.N": "\\Nu",
            ",.O": "\\Omicron",
            ",.P": "\\prod",
            ",.R": "\\Rho",
            ",.S": "\\sum",
            ",.T": "\\Tau",
            ",.U": "\\Upsilon",
            ",.W": "\\Omega",
            ",.X": "\\Xi",
            ",.Y": "\\Psi",
            ",.Z": "\\Zeta",
            ".&": "\\chi",
            ".:": "\\eta",
            ".?": "\\theta",
            ".A": "\\alpha",
            ".B": "\\beta",
            ".D": "\\delta",
            ".E": "\\epsilon",
            ".F": "\\phi",
            ".G": "\\gamma",
            ".I": "\\iota",
            ".K": "\\kappa",
            ".L": "\\lambda",
            ".M": "\\mu",
            ".N": "\\nu",
            ".O": "\\omicron",
            ".P": "\\pi",
            ".R": "\\rho",
            ".S": "\\sigma",
            ".T": "\\tau",
            ".U": "\\upsilon",
            ".W": "\\omega",
            ".X": "\\xi",
            ".Y": "\\psi",
            ".Z": "\\zeta"
        };
        t.greek = function(e) {
            if (i.hasOwnProperty(e))
                return i[e] + " ";
            throw new Error("Unknown Greek letter")
        }
        ,
        t.to_number = function(e) {
            for (var t = "", r = "A".charCodeAt(0) - 1, i = 0, n = e; i < n.length; i++) {
                var s = n[i];
                t += "4" === s ? "." : "J" === s ? "0" : s.charCodeAt(0) - r
            }
            return t
        }
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = " A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=";
        function n(e) {
            for (var t, r = "", n = 0, s = e; n < s.length; n++) {
                var a = s[n];
                r += (t = i.indexOf(a),
                String.fromCharCode(10240 + t))
            }
            return r
        }
        function s(e) {
            for (var t, r = "", n = 0, s = e; n < s.length; n++) {
                var a = s[n];
                r += (t = a.charCodeAt(0) - 10240,
                i[t])
            }
            return r
        }
        t.toBrailleAscii = s,
        t.toExpandedBrailleAscii = function(e) {
            return s(e).replace(/[@-^]/g, function(e) {
                return String.fromCharCode(e.charCodeAt(0) + 32)
            })
        }
        ,
        t.coerceToSixDotCells = function(e) {
            var t = "";
            if (e)
                for (var r = 0, i = e; r < i.length; r++) {
                    var s = i[r]
                      , a = s.charCodeAt(0);
                    96 <= a && a <= 127 && (a -= 32,
                    s = String.fromCharCode(a)),
                    32 <= a && a <= 95 && (a = (s = n(s)).charCodeAt(0)),
                    10305 <= a && a <= 10495 && (a = 10240 + (a - 1024) % 64,
                    s = String.fromCharCode(a)),
                    t += 10240 <= a && a <= 10304 ? s : String.fromCharCode(10240)
                }
            return t
        }
        ,
        t.isSixDotCells = function(e) {
            for (var t = 0; t < e.length; t++) {
                var r = e.charCodeAt(t);
                if (r < 10240 || r > 10304)
                    return !1
            }
            return !0
        }
    }
    , function(e, t, r) {
        r(3),
        e.exports = r(3)
    }
    ])
});
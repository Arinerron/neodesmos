define('graphing/poilabelslayer', ["require", "exports", "core/vendor/d3-color", "tslib", "dcgview", "jquery", "core/lib/label", "core/types/graphmode", "core/types/point-size", "core/math/poi-type", "./constants", "./poi", "./automatic-label-placer", "core/lib/color-helpers", "core/math/interpolatedlabel", "../dcgview-helpers/static-mathquill-view", "../dcgview-helpers/mathquill-view", "core/graphing-calc/json/expression", "graphing-calc/models/expression", "graphing-calc/models/abstract-item", "graphing/canvas-labels", "graphing/movablepointslayer", "./svg-groups", "main/mathquill-operators", "core/types/point-opacity"], function(require, e, t, r, o, a, n, i, l, c, s, d, h, p, u, b, g, f, v, y, L, m, x, I, O) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var E = o.Components.Input
      , C = o.Components
      , k = C.For
      , S = C.Switch
      , P = C.IfElse;
    function M(e, t, r) {
        var o = e.s("graphing-calculator-label-poi-unknown")
          , a = t.getProjection();
        if (!a)
            return o;
        var n = a.viewport;
        return n ? (r && (o = m.getCoordsString(r.x, r.y, n)),
        o) : o
    }
    var D = function(e) {
        function m() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.labelsDirty = !1,
            t
        }
        return r.__extends(m, e),
        m.prototype.init = function() {
            this.grapher = this.props.grapher(),
            this.controller = this.grapher.controller,
            this.cachedLabelDict = {},
            this.cachedLabelOrder = [],
            this.hoveredPOI = void 0,
            this.openedPOI2Sketch = {},
            this.takingScreenshot = !1
        }
        ,
        m.prototype.template = function() {
            var e = this;
            return o.createElement(k, {
                each: function() {
                    return e.cachedLabelOrder
                }
            }, o.createElement("div", {
                class: o.const("dcg-graph-outer"),
                style: this.const({
                    "z-index": 0
                }),
                didMount: this.didMountRoot.bind(this)
            }, function(t) {
                return o.createElement("div", {
                    class: function() {
                        return e.getLabelClasses(t)
                    },
                    style: function() {
                        return e.getLabelStyles(t)
                    }
                }, o.createElement("div", {
                    class: o.const("dcg-pt"),
                    style: function() {
                        return e.getDotStyles(t)
                    }
                }), o.createElement("div", {
                    class: o.const("dcg-label"),
                    didMount: function(r) {
                        return e.linkLabelNode(t, r)
                    }
                }, e.renderLabelContent(t)))
            }))
        }
        ,
        m.prototype.renderLabelContent = function(e) {
            var t = this;
            return o.createElement(S, {
                key: function() {
                    return t.getLabelContent(e).type
                }
            }, function(r) {
                return "text" === r ? o.createElement("span", {
                    class: o.const("dcg-label-raw-text")
                }, function() {
                    return t.getLabelContent(e).text
                }) : "latex" === r ? o.createElement(b.default, {
                    latex: function() {
                        return t.getLabelContent(e).text
                    },
                    config: t.bindFn(t.getMQConfig)
                }) : "mixed" === r ? o.createElement(k, {
                    each: function() {
                        return u.chunkLabel(t.getLabelContent(e).text)
                    },
                    key: function(e, t) {
                        return "" + e + t
                    }
                }, o.createElement("span", null, function(e) {
                    return P(function() {
                        return "latex" === u.classifyLabelText(e)
                    }, {
                        true: function() {
                            return o.createElement(b.default, {
                                latex: function() {
                                    return e.substr(1, e.length - 2)
                                },
                                config: t.bindFn(t.getMQConfig)
                            })
                        },
                        false: function() {
                            return o.createElement("span", {
                                class: o.const("dcg-label-raw-text")
                            }, function() {
                                return e
                            })
                        }
                    })
                })) : r === f.EditableLabelMode.Math ? o.createElement("div", {
                    class: function() {
                        return {
                            "dcg-editable-label-border": !0,
                            "dcg-do-not-blur": !0,
                            "dcg-focus": t.shouldEditableLabelBeFocused(e),
                            "dcg-empty-label": 0 === t.getEditableLabelText(e).trim().length
                        }
                    },
                    style: function() {
                        return {
                            "border-color": p.shadeColor(t.getEditableLabelTextColor(e), .3)
                        }
                    }
                }, o.createElement(g.default, {
                    latex: function() {
                        return t.getEditableLabelText(e)
                    },
                    placeholder: function() {
                        return ""
                    },
                    isFocused: function() {
                        return t.shouldEditableLabelBeFocused(e)
                    },
                    capExpressionSize: function() {
                        return !!t.controller.getGraphSettings().config.capExpressionSize
                    },
                    selectOnFocus: o.const(!1),
                    config: t.bindFn(t.getMQConfig),
                    getAriaLabel: function() {
                        return t.controller.s("graphing-calculator-narration-editable-point-label-at-coordinates", {
                            coordinates: M(t.controller, t.grapher, t.cachedLabelDict[e])
                        })
                    },
                    getAriaPostLabel: t.const(""),
                    onUserChangedLatex: function(r) {
                        return t.onLabelInput(r, e)
                    },
                    onExpressionSizeExceeded: function() {
                        return t.controller.dispatch({
                            type: "expression-size-exceeded"
                        })
                    },
                    onFocusedChanged: function(r) {
                        return t.onEditableLabelFocusChange(r, e)
                    },
                    hasError: t.const(!1),
                    noFadeout: t.const(!0),
                    needsSystemKeypad: function() {
                        return !t.controller.isKeypadEnabled()
                    }
                })) : o.createElement("div", {
                    class: function() {
                        return {
                            "dcg-resizing-text-input-container": !0,
                            "dcg-editable-label-border": !0,
                            "dcg-focus": t.shouldEditableLabelBeFocused(e),
                            "dcg-empty-label": 0 === t.getEditableLabelText(e).trim().length
                        }
                    },
                    style: function() {
                        return {
                            "border-color": p.shadeColor(t.getEditableLabelTextColor(e), .3)
                        }
                    },
                    onScroll: function(e) {
                        e.target && (e.target.scrollLeft = 0)
                    }
                }, o.createElement(E, {
                    "aria-label": function() {
                        return t.controller.s("graphing-calculator-narration-editable-point-label-at-coordinates", {
                            coordinates: M(t.controller, t.grapher, t.cachedLabelDict[e])
                        })
                    },
                    onInput: function(r) {
                        return t.onLabelInput(r, e)
                    },
                    value: function() {
                        return t.getEditableLabelText(e)
                    },
                    onFocus: function() {
                        return t.onEditableLabelFocusChange(!0, e)
                    },
                    onBlur: function() {
                        return t.onEditableLabelFocusChange(!1, e)
                    }
                }), o.createElement("span", {
                    class: o.const("dcg-text-input-content")
                }, function() {
                    return t.getEditableLabelText(e) || " "
                }))
            })
        }
        ,
        m.prototype.getSketchIdFromLabelId = function(e) {
            var t = this.cachedLabelDict[e];
            if (t)
                return t.sketchId
        }
        ,
        m.prototype.getEditableLabelTextColor = function(e) {
            var t = this.getSketchIdFromLabelId(e);
            if (!t)
                return "#000";
            var r = this.controller.getItemModel(t);
            return r && "expression" === r.type ? y.getDisplayColor(r) : "#000"
        }
        ,
        m.prototype.onEditableLabelFocusChange = function(e, t) {
            var r = this.getSketchIdFromLabelId(t);
            r && (e ? this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "editable-label",
                    id: r
                }
            }) : this.controller.dispatch({
                type: "blur-focus-location",
                location: {
                    type: "editable-label",
                    id: r
                }
            }),
            this.update())
        }
        ,
        m.prototype.shouldEditableLabelBeFocused = function(e) {
            var t = this.getSketchIdFromLabelId(e)
              , r = this.controller.getFocusLocation();
            return !(!r || "editable-label" !== r.type || !t || r.id !== t)
        }
        ,
        m.prototype.onLabelInput = function(e, t) {
            var r = this.getSketchIdFromLabelId(t);
            if (r && this.grapher.poiController.getExpressionModel(r)) {
                var o = e;
                this.controller.getItemEditableLabelMode(r) === f.EditableLabelMode.Math && o.length > 0 && (o = "`" + o + "`"),
                this.controller.dispatch({
                    type: "set-item-label",
                    id: r,
                    label: o
                })
            }
        }
        ,
        m.prototype.getEditableLabelText = function(e) {
            var t = this.getSketchIdFromLabelId(e);
            if (t) {
                var r = this.grapher.poiController.getExpressionModel(t);
                return r ? this.controller.getItemEditableLabelMode(t) === f.EditableLabelMode.Math ? r.label.substr(1, r.label.length - 2) : r.label : ""
            }
        }
        ,
        m.prototype.linkLabelNode = function(e, t) {
            var r = this.cachedLabelDict[e];
            r && (r.labelDOM = t)
        }
        ,
        m.prototype.getLabelClasses = function(e) {
            var t = this.cachedLabelDict[e];
            return t ? t.classes : {}
        }
        ,
        m.prototype.getLabelStyles = function(e) {
            var t = this.cachedLabelDict[e];
            return t ? t.styles : {}
        }
        ,
        m.prototype.getDotStyles = function(e) {
            var t = this.cachedLabelDict[e];
            return t ? t.dotStyles : {}
        }
        ,
        m.prototype.getLabelContent = function(e) {
            var t = this.cachedLabelDict[e];
            if (t) {
                var r = this.getSketchIdFromLabelId(e);
                if (!r)
                    return {
                        is_hole: !1,
                        type: "text",
                        text: ""
                    };
                var o = this.controller.getItemEditableLabelMode(r);
                return t.classes["dcg-editable-label"] && void 0 !== o && o !== f.EditableLabelMode.None ? {
                    is_hole: !1,
                    type: o,
                    text: ""
                } : t.content
            }
            return {
                is_hole: !1,
                type: "text",
                text: ""
            }
        }
        ,
        m.prototype.didMountRoot = function(e) {
            this.node = e
        }
        ,
        m.prototype.computeHoveredLabel = function(e, t) {
            var r;
            this.hoveredPOI ? this.isOpenPOI(this.hoveredPOI) ? this.grapher.setLayerClass("hoveredPOI", "dcg-mouse-over-opened-poi") : (r = this.computeLabel(this.hoveredPOI, e, t, "hovered"),
            this.grapher.setLayerClass("hoveredPOI", "dcg-mouse-over-closed-poi")) : this.grapher.setLayerClass("hoveredPOI", void 0);
            var o = this.getHoveredInteractiveLabel();
            o && !o.bareLabel ? this.grapher.setLayerClass("interactiveLabel", "dcg-mouse-over-opened-poi") : this.grapher.setLayerClass("interactiveLabel", void 0),
            r && this.saveLabelToCache(r)
        }
        ,
        m.prototype.computeTraceLabel = function(e, t) {
            if (this.traceInfo) {
                var r = this.traceInfo.pt;
                if (r) {
                    var o = new d.POI(r.x,r.y,c.TRACE,this.traceInfo.branchInfo.sketch,this.traceInfo.branchInfo.branch,0)
                      , a = this.computeLabel(o, e, t, "trace");
                    a && this.saveLabelToCache(a)
                }
            }
        }
        ,
        m.prototype.computeLabel = function(e, r, o, a) {
            var l = e.id + "";
            "trace" === a && (l = "*trace*");
            var d = r.mapx(e.x)
              , h = r.mapy(e.y)
              , p = d
              , b = h;
            if (r.coordsAreOnscreen(d, h, s.OFFSCREEN_RENDER_MARGIN)) {
                if (this.isHiddenInteractiveLabel(e))
                    return;
                var g = !1
                  , f = void 0
                  , y = e.sketch
                  , L = y && y.branches[0];
                L && (g = !(!("nakedLabel"in L) || !L.nakedLabel),
                f = "labelOrientation"in L ? L.labelOrientation : void 0);
                var m = y.id
                  , x = this.controller.getItemModel(m);
                if (e.hasEditableLabel() && x && "expression" === x.type && !v.isSinglePoint(x))
                    return;
                var I = function(e, t) {
                    var r, o = t.xmax - t.xmin, a = t.ymax - t.ymin, l = e.getGraphMode();
                    if (e.type === c.TRACE) {
                        var s = l === i.X
                          , d = s ? e.y : e.x
                          , h = e.getCompiledFunction();
                        if (r = n.point(d, o, a, h),
                        s) {
                            var p = r[0];
                            r[0] = r[1],
                            r[1] = p
                        }
                    } else
                        r = [n.value(e.x, o), n.value(e.y, a)];
                    var b = !isFinite(r[1].value)
                      , g = e.getLabel()
                      , f = g && u.classifyLabelText(g);
                    if (g)
                        return "latex" === f ? {
                            is_hole: b,
                            type: "latex",
                            text: g.substr(1, g.length - 2)
                        } : "text" === f ? {
                            is_hole: b,
                            type: "text",
                            text: g
                        } : {
                            is_hole: b,
                            type: "mixed",
                            text: g
                        };
                    if (e.hasEditableLabel())
                        return {
                            is_hole: b,
                            type: "text",
                            text: ""
                        };
                    var v = r[0].superscript ? r[0].mantissa + "^{" + r[0].superscript + "}" : r[0].string
                      , y = r[1].superscript ? r[1].mantissa + "^{" + r[1].superscript + "}" : r[1].string;
                    return "undefined" === v && (v = "\\mathrm{undefined}"),
                    "undefined" === y && (y = "\\mathrm{undefined}"),
                    {
                        is_hole: b,
                        type: "latex",
                        text: "\\left(" + v + ",\\space " + y + "\\right)"
                    }
                }(e, r.viewport)
                  , E = e.pointIdxOnBranch
                  , C = e.getLabelSize();
                Array.isArray(C) && (C = C[E]);
                var k = e.getLabelRotation();
                Array.isArray(k) && (k = k[E]);
                var S = e.getPointOpacity();
                S = Array.isArray(S) ? S[E] : S,
                S = isFinite(S) ? Math.max(0, Math.min(1, S)) : O.DEFAULT;
                var P = !!e.getTextOutline()
                  , M = e.isPersistent()
                  , D = e.isAttachedToPlottedPoint()
                  , F = e.hasInteractiveLabel()
                  , T = e.hasEditableLabel() && !this.takingScreenshot
                  , w = !(!x || "expression" !== x.type || !v.isClickableObject(x))
                  , A = y.color;
                if (w) {
                    var _ = this.grapher.clickableObjectsLayer.getHoveredObject()
                      , B = this.grapher.clickableObjectsLayer.getPressedObject();
                    if (B && B.id === m && B.listIndex === e.pointIdxOnBranch)
                        (H = t.hsl(A)).l > .2 ? H.l -= .2 : H.l += .1,
                        A = H.toString();
                    else if (_ && _.id === m && _.listIndex === e.pointIdxOnBranch) {
                        var H;
                        (H = t.hsl(A)).l > .2 ? H.l -= .1 : H.l += .2,
                        A = H.toString()
                    }
                }
                var R = !M
                  , j = !!D;
                F && (j = !0,
                R = !0),
                "trace" === a && (j = !1,
                R = !0);
                var z = o[l]
                  , N = z && z.labelDOM
                  , X = z && z.width
                  , Y = z && z.height
                  , q = z && z.orientation
                  , G = {
                    "dcg-poi-label": !0,
                    "dcg-tracept": "trace" === a,
                    "dcg-opened": "opened" === a,
                    "dcg-hole": I.is_hole,
                    "dcg-show-border": R,
                    "dcg-hide-dot": j,
                    "dcg-editable-label": T,
                    "dcg-has-outline": P,
                    "dcg-underlined-label": !!(w && x && "expression" === x.type && x.hidden)
                };
                isFinite(C) || (C = 1);
                var U = {
                    left: d + "px",
                    top: h + "px",
                    "font-size": Math.round(1100 * C) / 10 + "%"
                };
                k && !this.takingScreenshot && (U.transform = "rotate(" + k + "rad)"),
                M && A && (U.color = A),
                U.opacity = "" + Math.min(.99, S);
                var Q = {};
                return "trace" === a && (Q["background-color"] = A,
                Q["border-color"] = A),
                {
                    id: l,
                    sketchId: m,
                    poi: e,
                    x: e.x,
                    y: e.y,
                    screenX: d,
                    screenY: h,
                    top: b,
                    left: p,
                    width: X,
                    height: Y,
                    labelDOM: N,
                    forcedOrientation: f,
                    isNakedLabel: g,
                    isClickable: w,
                    orientation: q,
                    rotation: k,
                    classes: G,
                    styles: U,
                    dotStyles: Q,
                    content: I,
                    hasBorder: e.hasEditableLabel(),
                    opacity: S,
                    hasOutline: P || e.hasEditableLabel()
                }
            }
        }
        ,
        m.prototype.computeAllLabels = function(e, t) {
            var r, o, a = this, n = this.grapher.graphSketches;
            this.grapher.getSketchOrder().forEach(function(r) {
                var i = n[r];
                if (i && i.visible) {
                    var l = i.labels;
                    if (l.length)
                        for (var c = 0; c < l.length; c++)
                            (o = a.computeLabel(l[c], e, t, "opened")) && (Array.isArray(i.color) && (o.styles.color = i.color[c]),
                            a.saveLabelToCache(o))
                }
            });
            var i, l, c = {};
            for (r in this.openedPOI2Sketch) {
                var s = (i = r,
                (l = n[this.openedPOI2Sketch[r]]) && l.visible ? l.getPOIById(i) : null);
                s && (c[r] = s.sketch.id,
                (o = this.computeLabel(s, e, t, "opened")) && this.saveLabelToCache(o))
            }
            return this.openedPOI2Sketch = c,
            {}
        }
        ,
        m.prototype.saveLabelToCache = function(e) {
            var t = e.id;
            this.cachedLabelDict[t] || this.cachedLabelOrder.push(t),
            this.cachedLabelDict[t] = e
        }
        ,
        m.prototype.markLabelsDirty = function() {
            this.labelsDirty = !0
        }
        ,
        m.prototype.getInteractiveLabelUnderPoint = function(e) {
            for (var t, r = this.cachedLabelOrder.length - 1; r >= 0; r--) {
                var o = this.cachedLabelOrder[r]
                  , a = this.cachedLabelDict[o];
                if (a && a.width && a.height) {
                    var n = a.screenX
                      , i = a.screenY
                      , l = a.left
                      , c = a.top
                      , s = a.width
                      , d = a.height;
                    if (s > 0 && d > 0 && e.x > n + l && e.x < n + l + s && e.y > i + c && e.y < i + c + d) {
                        var h = this.getSketchIdFromLabelId(o);
                        if (void 0 === h)
                            continue;
                        var p = this.controller.getItemModel(h);
                        if (!p || "expression" !== p.type)
                            continue;
                        if (v.hasEditableLabel(p))
                            return {
                                type: "editable",
                                model: p
                            };
                        !t && v.isDraggableAndHidden(p) ? t = {
                            type: "draggable",
                            label: {
                                model: p,
                                x: a.x,
                                y: a.y
                            }
                        } : !t && a.isClickable && (t = {
                            type: "clickable",
                            model: p,
                            poi: a.poi
                        })
                    }
                }
            }
            return t
        }
        ,
        m.prototype.positionLabels = function(e, t, r, o, n) {
            var i = this
              , c = !this.labelsDirty;
            this.labelsDirty = !1;
            var s = [];
            t.forEach(function(e) {
                var t = r[e];
                if (t && t.labelDOM) {
                    var o, a = i.getSketchIdFromLabelId(e);
                    if (void 0 !== a) {
                        var n = i.grapher.getGraphSketch(a);
                        n && n.branches && (o = n.branches[0].pointSize)
                    }
                    (void 0 === o || "number" != typeof o || o < 0) && (o = l.DEFAULT);
                    var d = (i.grapher.settings.config.projectorMode ? 14 : 10) * o / l.DEFAULT
                      , h = t.screenX
                      , p = t.screenY
                      , u = t.labelDOM.clientWidth
                      , b = t.labelDOM.clientHeight;
                    if (u > 0 && b > 0) {
                        var g = 0;
                        i.takingScreenshot && t.hasBorder && (g = 5),
                        s.push({
                            renderedLabel: t,
                            pt_x: h,
                            pt_y: p,
                            pt_radius: d + g,
                            rotation: t.rotation,
                            nakedLabel: t.isNakedLabel,
                            width: u,
                            height: b,
                            keepOrientation: c,
                            priorOrientation: t.orientation,
                            enforceOrientation: t.forcedOrientation
                        })
                    }
                }
            });
            var d = h.buildStaticEnvGetter(e, o, n)
              , p = s.map(function(e) {
                return h.generateCandidatesForPoint(d, e)
            });
            h.computePositions(p).forEach(function(e, t) {
                var r = s[t].renderedLabel;
                r.orientation = e.orientation;
                var o = e.left - e.pt_x
                  , n = e.top - e.pt_y;
                r.left = o,
                r.top = n,
                r.width = e.width,
                r.height = e.height;
                var i = r.labelDOM;
                i && (i.style.transform = e.transform,
                a(i).data("orientation", e.orientation),
                setTimeout(function() {
                    return i.classList.add("dcg-enable-transition")
                }, 1))
            })
        }
        ,
        m.prototype.copyToCtx = function(e) {
            var t = this;
            x.save(e, "labels");
            var r = this.node.getBoundingClientRect();
            this.cachedLabelOrder.forEach(function(o) {
                var a = t.cachedLabelDict[o];
                if (a) {
                    var n = a.labelDOM;
                    if (n) {
                        var i = {
                            pointCenterX: a.screenX - r.left,
                            pointCenterY: a.screenY - r.top,
                            hasOutline: !!a.hasOutline,
                            hasBorder: !!a.hasBorder
                        }
                          , l = t.computeRotatedCenter(i.pointCenterX, i.pointCenterY, a.rotation)
                          , c = L.computeDrawingCommandsForDOMLabel(n, i);
                        e.save(),
                        e.globalAlpha = a.opacity,
                        e.rotate(a.rotation),
                        e.translate(l.x, l.y),
                        L.drawCommandsToCtx(c, e),
                        e.restore()
                    }
                }
            }),
            x.restore(e)
        }
        ,
        m.prototype.computeRotatedCenter = function(e, t, r) {
            var o = Math.cos(-r)
              , a = Math.sin(-r);
            return {
                x: e * o - t * a,
                y: t * o + e * a
            }
        }
        ,
        m.prototype.drawForScreenshot = function(e, t, r, o, a) {
            this.takingScreenshot = !0,
            this.redraw(e, t, o, a),
            this.takingScreenshot = !1,
            this.copyToCtx(r)
        }
        ,
        m.prototype.redraw = function(e, t, r, o) {
            var a = this.cachedLabelDict;
            this.cachedLabelDict = {},
            this.cachedLabelOrder = [],
            this.computeAllLabels(e, a),
            this.computeHoveredLabel(e, a),
            this.computeTraceLabel(e, a),
            this.update(),
            this.positionLabels(t, this.cachedLabelOrder, this.cachedLabelDict, r, o)
        }
        ,
        m.prototype.clearOpenedPOI = function() {
            this.openedPOI2Sketch = {}
        }
        ,
        m.prototype.closePOI = function(e) {
            delete this.openedPOI2Sketch[e.id]
        }
        ,
        m.prototype.openPOI = function(e) {
            this.openedPOI2Sketch[e.id] = e.sketch.id
        }
        ,
        m.prototype.isOpenPOI = function(e) {
            return this.openedPOI2Sketch.hasOwnProperty(e.id)
        }
        ,
        m.prototype.isOpenInteractiveLabel = function(e) {
            return !!this.isOpenPOI(e) && e.hasInteractiveLabel()
        }
        ,
        m.prototype.isHiddenInteractiveLabel = function(e) {
            return !!e && (!!e.hasInteractiveLabel() && (!this.isOpenPOI(e) && this.getHoveredPOI() !== e))
        }
        ,
        m.prototype.setHoveredPOI = function(e) {
            this.hoveredPOI = e
        }
        ,
        m.prototype.getHoveredPOI = function() {
            return this.hoveredPOI
        }
        ,
        m.prototype.getHoveredInteractiveLabel = function() {
            var e = this.getHoveredPOI();
            return e && e.hasInteractiveLabel() ? e : void 0
        }
        ,
        m.prototype.setTraceInfo = function(e) {
            this.traceInfo = e
        }
        ,
        m.prototype.isTracing = function() {
            return !!this.traceInfo
        }
        ,
        m.prototype.getTraceInfo = function() {
            return this.traceInfo
        }
        ,
        m.prototype.getMQConfig = function() {
            return {
                autoOperatorNames: I.getAutoOperators()
            }
        }
        ,
        m
    }(o.Class);
    e.default = D
});
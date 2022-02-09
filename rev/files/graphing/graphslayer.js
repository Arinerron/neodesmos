define('graphing/graphslayer', ["require", "exports", "./clipping", "./dasheddrawer", "./constants", "./viewport", "core/types/graphmode", "core/lib/color-helpers", "core/types/styles", "core/types/line-opacity", "core/types/point-opacity", "core/types/point-size", "./draw-image-to-ctx", "./svg-groups", "./svg-classes"], function(require, e, t, i, r, o, a, n, l, s, d, c, g, h, p) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.GraphsLayer = void 0;
    var v = {};
    function y(e) {
        return void 0 === e && (e = {}),
        Object.keys(e).length
    }
    function f(e, t) {
        return void 0 === t && (t = {}),
        0 === y(t) ? e : e.filter(function(e, i) {
            return !t[i]
        })
    }
    function u(e, t) {
        for (var i = [], r = 0; r < e; r++)
            i.push(t);
        return i
    }
    var A = function(e, t) {
        var i = 3;
        return t && (i += t),
        new o.Viewport(-i,e.width + i,-i,e.height + i)
    }
      , O = function(e) {
        return Math.round(e - .5) + .5
    }
      , T = function() {
        function e(e, t) {
            if (this.getExpressionAriaLabel = t,
            e.config.plaidMode)
                for (var i = 0, r = ["RED", "BLUE", "GREEN", "PURPLE", "ORANGE", "BLACK"]; i < r.length; i++) {
                    var o = r[i];
                    v[n.colors[o]] = document.createElement("img"),
                    v[n.colors[o]].setAttribute("src", "/assets/img/april-fools/" + o.toLowerCase() + ".png")
                }
        }
        return e.prototype.redrawToCtx = function(t, i, r, o, a, n, l, s) {
            var d = this;
            h.save(t, "expressions"),
            a.forEach(function(a) {
                var c = r[a]
                  , p = o[a];
                void 0 !== c && c.visible && (h.save(t, "sketch"),
                i.settings.takingScreenshot && h.setTitle(t, d.getExpressionAriaLabel(a)),
                e.drawSketchToCtx(r[a], t, i, n, l, s),
                h.restore(t)),
                p && p.shouldGraph && p.foreground && g.drawImageToCtx(p, t, i)
            }),
            h.restore(t)
        }
        ,
        e.eachSegment = function(e, t) {
            for (var i = 0, r = e.branches; i < r.length; i++) {
                var o = r[i];
                if (o.graphMode !== a.ERROR)
                    for (var n = 0, l = o.segments; n < l.length; n++) {
                        t(o, l[n])
                    }
            }
        }
        ,
        e.drawSketchToCtx = function(t, i, o, n, g, h) {
            var p;
            if (h || (h = {}),
            t.branches && t.branches.length) {
                var f = i.lineWidth
                  , A = i.globalAlpha
                  , O = o.settings.globalCurveColor ? o.settings.globalCurveColor : t.color
                  , T = v[O];
                if (T && T.complete && T.naturalWidth > 0) {
                    var m = i.createPattern(T, "repeat");
                    i.fillStyle = m
                } else
                    i.fillStyle = O;
                i.strokeStyle = O,
                i.lineJoin = "round",
                i.lineCap = "round";
                for (var b = !!o.settings.takingScreenshot, L = !!h.showMovablePoints, P = g.getHoveredObject(), S = g.getPressedObject(), x = 0, I = t.branches; x < I.length; x++) {
                    var D = I[x];
                    if (D.graphMode !== a.XYPOINT && D.graphMode !== a.XYPOINT_MOVABLE && D.graphMode !== a.ERROR) {
                        var w = 1;
                        g.shouldDrawHovered(t.id) && P && P.listIndex === D.listIndex && (w = 1.2),
                        g.shouldDrawPressed(t.id) && S && S.listIndex === D.listIndex && (w = 1.4),
                        !D.color || o.settings.globalCurveColor || Object.keys(v).length || (i.fillStyle = D.color),
                        D.graphMode !== a.POLAR && (i.desmos_batching = !0,
                        i.beginPath());
                        for (var E = 0, _ = D.segments; E < _.length; E++) {
                            var C = _[E]
                              , M = null !== (p = D.graphMode) && void 0 !== p ? p : a.Y;
                            if (M !== a.POLYGONFILL || o.settings.disableFill) {
                                if (M !== a.IMPLICIT) {
                                    var F = D.operator
                                      , H = "<=" == F || "<" == F;
                                    !o.settings.disableFill && ("<" == F || ">" == F || "<=" == F || ">=" == F) && e.fillGraphStrokeToCtx(i, o, C, H, M)
                                }
                            } else
                                e.fillPolygonToCtx(i, o, C, void 0 === D.fillOpacity ? NaN : D.fillOpacity * w)
                        }
                        i.globalAlpha = e._clampedOpacity(void 0 === D.fillOpacity ? NaN : D.fillOpacity * w, r.FILL_ALPHA),
                        D.graphMode !== a.POLAR && (i.fill(),
                        i.desmos_batching = !1),
                        i.globalAlpha = 1
                    }
                }
                e.eachSegment(t, function(n, d) {
                    if (n.graphMode !== a.XYPOINT && n.graphMode !== a.XYPOINT_MOVABLE && n.graphMode !== a.ERROR) {
                        var c = a.Y;
                        n.graphMode && (c = n.graphMode);
                        var h = d
                          , p = void 0 !== n.lineWidth
                          , v = n.lineWidth
                          , y = r.LINE_WIDTH;
                        if (i.strokeStyle = n.color,
                        i.fillStyle = n.color,
                        !p || !(v <= 0) && isFinite(v)) {
                            i.lineWidth = p ? v : y;
                            var f = o.settings.graphLineWidth / y;
                            i.lineWidth *= f,
                            i.globalAlpha *= o.settings.curveOpacity,
                            i.globalAlpha = e._clampedOpacity(1 === o.settings.curveOpacity ? 1 : n.lineOpacity, s.DEFAULT);
                            var u = n.operator
                              , A = "default";
                            "<" === u || ">" === u || "!=" === u ? A = l.LineStyle.DASHED : "<=" === u || ">=" === u ? A = l.LineStyle.SOLID : t.style === l.LineStyle.DASHED || n.style === l.LineStyle.DASHED ? A = l.LineStyle.DASHED : t.style !== l.LineStyle.DOTTED && n.style !== l.LineStyle.DOTTED || (A = l.LineStyle.DOTTED,
                            p && (i.lineWidth *= 2));
                            var O = g.getHoveredObject()
                              , T = g.shouldDrawHovered(t.id) && O && O.listIndex === n.listIndex
                              , m = g.getPressedObject()
                              , b = g.shouldDrawPressed(t.id) && m && m.listIndex === n.listIndex;
                            (b || T) && (i.save(),
                            i.lineWidth += 4.5,
                            i.globalAlpha *= b ? .5 : .3,
                            e.drawGraphStrokeToCtx(i, o, h, A, c, u),
                            i.restore()),
                            e.drawGraphStrokeToCtx(i, o, h, A, c, u)
                        }
                    }
                }
                .bind(this)),
                i.lineWidth = f,
                i.globalAlpha = A,
                e.eachSegment(t, function(r, l) {
                    if (r.graphMode === a.XYPOINT && r.showPoint || r.graphMode === a.XYPOINT_MOVABLE && b) {
                        var s = l
                          , h = []
                          , p = void 0;
                        if (r.interactiveLabel && t.labels)
                            for (var v = 0, f = t.labels.length; v < f; v++) {
                                var A = t.labels[v]
                                  , O = n.isOpenPOI(A)
                                  , T = n.getHoveredPOI() === A;
                                h.push(O || T),
                                !O && T && (p = v)
                            }
                        var m = r.graphMode === a.XYPOINT_MOVABLE && b && !L && 1 === r.pointOpacity
                          , P = 1;
                        "number" == typeof r.pointSize ? P = r.pointSize / c.DEFAULT : Array.isArray(r.pointSize) && (P = r.pointSize.map(function(e) {
                            return e / c.DEFAULT
                        }));
                        var S = void 0;
                        Array.isArray(r.color) && (S = r.color);
                        var x = g.getHoveredObject()
                          , I = g.shouldDrawHovered(t.id)
                          , D = g.getPressedObject()
                          , w = g.shouldDrawPressed(t.id)
                          , E = r.droppedIndices;
                        if (I || w) {
                            var _ = s.length;
                            E && (_ += y(E));
                            var C = u(_, 0)
                              , M = Array.isArray(P) ? P.slice() : u(_, P);
                            w && D ? (C[D.listIndex] = .5,
                            M[D.listIndex] *= 1.5) : I && x && (C[x.listIndex] = .3,
                            M[x.listIndex] *= 1.5),
                            e.drawPointsToCtx({
                                ctx: i,
                                projection: o,
                                segment: s,
                                style: r.style,
                                sizeOverrideIdxs: h,
                                opacityOverrideIdx: p,
                                sizeFactor: M,
                                opacityFactor: C,
                                colorOverrides: S,
                                baseOpacity: r.pointOpacity,
                                droppedIndices: E
                            }),
                            i.restore()
                        }
                        e.drawPointsToCtx({
                            ctx: i,
                            projection: o,
                            segment: s,
                            style: r.style,
                            sizeOverrideIdxs: h,
                            opacityOverrideIdx: p,
                            sizeFactor: P,
                            opacityFactor: 1,
                            colorOverrides: S,
                            baseOpacity: m ? d.DEFAULT : r.pointOpacity,
                            droppedIndices: E
                        })
                    }
                }
                .bind(this))
            }
        }
        ,
        e.drawGraphStrokeToCtx = function(e, r, o, a, n, s) {
            var d = t.getClippingGraphType(n, "=" !== s, r.settings)
              , c = t.mapSegmentToCanvas(o, r.viewport, r.screen, d)
              , g = t.clipStrokeEdges(c, A(r.screen, e.lineWidth));
            if (0 !== g.length) {
                if (e.save(),
                p.save(e, "dcg-svg-curve"),
                a == l.LineStyle.DASHED)
                    new i.DashedDrawer(e,i.DashedDrawer.getTotalSegmentLength(g),i.DashedDrawer.getDashedPattern(e, !!r.settings.highlight)).drawSegment(g);
                else if (a == l.LineStyle.DOTTED)
                    new i.DashedDrawer(e,i.DashedDrawer.getTotalSegmentLength(g),i.DashedDrawer.getDottedPattern(e, !!r.settings.config.projectorMode, !!r.settings.highlight)).drawSegment(g);
                else if (a !== l.LineStyle.SOLID && "default" !== a || 1 !== e.lineWidth) {
                    e.desmos_batching || e.beginPath(),
                    e.moveTo(g[0], g[1]);
                    for (h = 0; h < g.length; h += 2)
                        e.lineTo(g[h], g[h + 1]);
                    e.desmos_batching || e.stroke()
                } else {
                    if (e.desmos_batching || e.beginPath(),
                    g.length > 4 || g[0] !== g[2] && g[1] !== g[3]) {
                        e.moveTo(g[0], g[1]);
                        for (var h = 0; h < g.length; h += 2)
                            e.lineTo(g[h], g[h + 1])
                    } else {
                        e.moveTo(O(g[0]), O(g[1]));
                        for (var h = 0; h < g.length; h += 2)
                            e.lineTo(O(g[h]), O(g[h + 1]))
                    }
                    e.desmos_batching || e.stroke()
                }
                p.restore(e),
                e.restore()
            }
        }
        ,
        e.mapPointToScreen = function(e, t, i) {
            var r = e.mapx(t) - .5;
            if (r < -20 || r > e.screen.width + 20)
                return null;
            var o = e.mapy(i) - .5;
            return o < -20 || o > e.screen.height + 20 ? null : {
                x: r,
                y: o
            }
        }
        ,
        e.drawPointToCtx = function(t, i, o, a, n, s, d, c, g, h) {
            var v = t.lineWidth
              , y = t.fillStyle
              , f = t.strokeStyle
              , u = e.mapPointToScreen(i, o, a);
            if (!u)
                return !1;
            p.save(t, "dcg-svg-point"),
            t.globalAlpha = void 0 !== n ? n : r.POINT_ALPHA,
            void 0 !== g && (t.globalAlpha *= g),
            t.desmos_batching || t.beginPath();
            var A = i.settings.pointLineWidth;
            if (d && (A = i.settings.config.projectorMode ? 17 : 11,
            t.lineWidth = A),
            void 0 !== c) {
                if (c <= 0 || !isFinite(c))
                    return !1;
                A *= c,
                t.lineWidth = A
            }
            if (h && (t.fillStyle = h,
            t.strokeStyle = h),
            s === l.PointStyle.CROSS) {
                var O = .4 * A;
                t.moveTo(u.x - O, u.y - O),
                t.lineTo(u.x + O, u.y + O),
                t.moveTo(u.x + O, u.y - O),
                t.lineTo(u.x - O, u.y + O),
                t.lineWidth = .3 * A
            } else if (s === l.PointStyle.OPEN) {
                O = .42 * A;
                t.moveTo(u.x + O, u.y),
                t.arc(u.x, u.y, O, 0, 2 * Math.PI, !0),
                t.closePath(),
                t.fillStyle = "white",
                t.lineWidth = .25 * A,
                t.fill()
            } else
                t.moveTo(u.x - .1, u.y - .1),
                t.lineTo(u.x - .1, u.y + .1),
                t.lineTo(u.x + .1, u.y + .1),
                t.lineTo(u.x + .1, u.y - .1);
            return t.desmos_batching || t.stroke(),
            t.globalAlpha = 1,
            t.lineWidth = v,
            t.fillStyle = y,
            t.strokeStyle = f,
            p.restore(t),
            !0
        }
        ,
        e.drawPointsToCtx = function(t) {
            var i, o = t.ctx, a = t.projection, n = t.segment, l = t.style, s = t.sizeOverrideIdxs, d = t.opacityOverrideIdx, c = t.sizeFactor, g = t.opacityFactor, h = t.colorOverrides, p = t.baseOpacity, v = t.droppedIndices, y = o.lineWidth;
            o.lineWidth = a.settings.pointLineWidth,
            i = Array.isArray(p) ? f(i = p.map(function(t) {
                return e._clampedOpacity(t, r.POINT_ALPHA)
            }
            .bind(this)), v) : e._clampedOpacity(p, r.POINT_ALPHA),
            Array.isArray(c) && (c = f(c, v)),
            Array.isArray(g) && (g = f(g, v)),
            h && (h = f(h, v));
            for (var u = 0; u < n.length; u++)
                e.drawPointToCtx(o, a, n[u][0], n[u][1], d === u ? r.HIGHLIGHTED_POINT_ALPHA : Array.isArray(i) ? i[u] : i, l, s[u], Array.isArray(c) ? c[u] : c, Array.isArray(g) ? g[u] : g, h && h[u]);
            o.lineWidth = y
        }
        ,
        e.fillGraphStrokeToCtx = function(e, i, o, n, l) {
            e.globalAlpha = l === a.POLAR ? r.POLAR_ALPHA : r.FILL_ALPHA;
            var s, d = null, c = null;
            if (l === a.POLAR) {
                c = t.ALL;
                var g = n ? 0 : i.viewport.polarDiameter()
                  , h = i.settings.degreeMode ? 180 : 2 * Math.PI;
                d = t.computePolarFill(o, g, h)
            } else
                l === a.Y ? (c = t.Y,
                s = n ? i.viewport.ymin : i.viewport.ymax,
                d = t.computeCartesianFill(o, s)) : l === a.X && (c = t.X,
                s = n ? i.viewport.xmin : i.viewport.xmax,
                d = t.computeCartesianFill(o, s));
            if (null !== d && null !== c) {
                for (var v = A(i.screen), y = 0, f = d; y < f.length; y++) {
                    var u = f[y]
                      , O = t.getClippingGraphType(l, !0, i.settings)
                      , T = t.mapSegmentToCanvas(u, i.viewport, i.screen, O)
                      , m = t.clipFillEdges(T, v, c, !1);
                    if (m.length >= 6) {
                        p.save(e, "dcg-svg-region"),
                        e.desmos_batching || e.beginPath(),
                        e.moveTo(m[0], m[1]);
                        for (var b = 2; b < m.length; b += 2)
                            e.lineTo(m[b], m[b + 1]);
                        e.lineTo(m[0], m[1]),
                        e.desmos_batching || e.fill(),
                        p.restore(e)
                    }
                }
                e.globalAlpha = 1
            }
        }
        ,
        e._clampedOpacity = function(e, t) {
            return "number" != typeof e ? t : e < 0 ? 0 : e > 1 ? 1 : isFinite(e) ? e : t
        }
        ,
        e.fillPolygonToCtx = function(i, o, a, n) {
            var l = A(o.screen);
            i.globalAlpha = e._clampedOpacity(n, r.FILL_ALPHA);
            var s = t.mapSegmentToCanvas(a, o.viewport, o.screen, t.Y_EQUALS)
              , d = t.clipFillEdges(s, l, t.ALL, !1);
            if (d.length >= 6) {
                p.save(i, "dcg-svg-region"),
                i.desmos_batching || i.beginPath(),
                i.moveTo(d[0], d[1]);
                for (var c = 2; c < d.length; c += 2)
                    i.lineTo(d[c], d[c + 1]);
                i.desmos_batching || i.fill(),
                p.restore(i)
            }
            i.globalAlpha = 1
        }
        ,
        e
    }();
    e.GraphsLayer = T
});
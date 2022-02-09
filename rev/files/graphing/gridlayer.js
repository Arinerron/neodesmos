
define('graphing/gridlayer', ['require', 'pjs', './stepnumber', 'core/lib/label', './computestepsizes', 'core/graphing-calc/json/graph-settings', './svg-classes', './svg-groups'], function(require) {
    "use strict";
    var t = require("pjs")
      , e = require("./stepnumber")
      , s = require("core/lib/label")
      , i = require("./computestepsizes")
      , a = require("core/graphing-calc/json/graph-settings").AxisArrowModes
      , r = require("./svg-classes")
      , o = require("./svg-groups")
      , n = t(function(t) {
        t.redrawToCtx = function(t, e, s) {
            var a, r;
            o.save(t, "graphpaper");
            var n = e.settings.showGrid;
            if (e.settings.polarMode && n)
                a = i.polar(e),
                o.save(t, "grid"),
                this.drawPolarGrid(t, e, a),
                o.restore(t),
                o.save(t, "axis"),
                this.drawAxes(t, e, s),
                r = this.drawPolarStepNumbers(t, e, a),
                this.drawLabels(t, e, r),
                o.restore(t);
            else {
                a = i.cartesian(e),
                n && (o.save(t, "grid"),
                this.drawCartesianGrid(t, e, a),
                o.restore(t));
                var h = !n;
                o.save(t, "axis"),
                this.drawAxes(t, e, s),
                r = this.drawCartesianStepNumbers(t, e, a, h),
                this.drawLabels(t, e, r),
                o.restore(t)
            }
            o.restore(t)
        }
        ,
        t.addTextShadow = function(t, e) {
            t.strokeStyle = e.settings.getBackgroundColor(),
            t.lineWidth = 3,
            t.miterLimit = 2
        }
        ,
        t.drawPolarGrid = function(t, e, s) {
            t.save();
            var i = e.settings.minorAxisOpacity
              , a = 1 - (1 - e.settings.majorAxisOpacity) / (1 - i)
              , o = Math.round(e.mapx(0)) - .5
              , n = Math.round(e.mapy(0)) - .5
              , l = e.screen.height / (e.viewport.ymax - e.viewport.ymin)
              , g = e.screen.width / (e.viewport.xmax - e.viewport.xmin)
              , x = l / g
              , v = g / l
              , c = n / x
              , m = e.viewport.smallestR()
              , d = e.viewport.largestR()
              , p = s.minorStepR * Math.max(1, Math.floor(m / s.minorStepR))
              , f = s.majorStepR * Math.max(1, Math.floor(m / s.majorStepR));
            t.lineWidth = 1,
            t.strokeStyle = "rgba(0, 0 , 0, " + i + ")",
            h(p, d, s.minorStepR, function(s) {
                r.save(t, "dcg-svg-minor-gridline"),
                t.beginPath(),
                r.restore(t),
                t.scale(1, x);
                var i = e.mapx(s) - o;
                t.moveTo(o + i, c),
                t.arc(o, c, i, 0, 2 * Math.PI),
                t.scale(1, v),
                t.stroke()
            }),
            h(0, 359, m > 0 ? 5 : 15, function(s) {
                if ((0 !== s && 180 !== s || !e.settings.showXAxis) && (90 !== s && 270 !== s || !e.settings.showYAxis)) {
                    r.save(t, "dcg-svg-minor-gridline"),
                    t.beginPath(),
                    r.restore(t),
                    t.moveTo(o, n);
                    var i = e.mapx(d * Math.cos(s * Math.PI / 180))
                      , a = e.mapy(d * Math.sin(s * Math.PI / 180));
                    t.lineTo(Math.round(i) - .5, Math.round(a) - .5),
                    t.stroke()
                }
            }),
            t.lineWidth = 1,
            t.strokeStyle = "rgba(0, 0 , 0, " + a + ")",
            h(f, d, s.majorStepR, function(s) {
                r.save(t, "dcg-svg-major-gridline"),
                t.beginPath(),
                r.restore(t),
                t.scale(1, x);
                var i = e.mapx(s) - o;
                t.moveTo(o + i, c),
                t.arc(o, c, i, 0, 2 * Math.PI),
                t.scale(1, v),
                t.stroke()
            }),
            t.restore()
        }
        ,
        t.drawCartesianGrid = function(t, e, s) {
            t.save();
            var i = e.viewport.xmin
              , a = e.viewport.ymin
              , o = e.viewport.xmax
              , n = e.viewport.ymax
              , l = e.screen.width
              , g = e.screen.height
              , x = g
              , v = 0;
            e.settings.restrictGridToFirstQuadrant && (i = 0,
            a = 0,
            x = e.mapy(0),
            v = e.mapx(0));
            var c = e.settings.minorAxisOpacity
              , m = e.settings.majorAxisOpacity;
            t.lineWidth = 1,
            t.strokeStyle = "rgba(0, 0 , 0, " + c + ")",
            r.save(t, "dcg-svg-minor-gridline"),
            h(i, o, s.minorStepX, function(s) {
                if (0 !== s || !e.settings.showYAxis) {
                    var i = Math.round(e.mapx(s));
                    i !== l && (t.beginPath(),
                    t.moveTo(i - .5, 0),
                    t.lineTo(i - .5, x),
                    t.stroke())
                }
            }),
            h(a, n, s.minorStepY, function(s) {
                if (0 !== s || !e.settings.showXAxis) {
                    var i = Math.round(e.mapy(s));
                    i !== g && (t.beginPath(),
                    t.moveTo(v, i - .5),
                    t.lineTo(l, i - .5),
                    t.stroke())
                }
            }),
            r.restore(t);
            var d = 1 - (1 - m) / (1 - c);
            t.strokeStyle = "rgba(0, 0 , 0, " + d + ")",
            r.save(t, "dcg-svg-major-gridline"),
            h(i, o, s.majorStepX, function(s) {
                if (0 !== s || !e.settings.showYAxis) {
                    var i = Math.round(e.mapx(s));
                    i !== l && (t.beginPath(),
                    t.moveTo(i - .5, 0),
                    t.lineTo(i - .5, x),
                    t.stroke())
                }
            }),
            h(a, n, s.majorStepY, function(s) {
                if (0 !== s || !e.settings.showXAxis) {
                    var i = Math.round(e.mapy(s));
                    i !== g && (t.beginPath(),
                    t.moveTo(v, i - .5),
                    t.lineTo(l, i - .5),
                    t.stroke())
                }
            }),
            r.restore(t),
            t.restore()
        }
        ,
        t.drawAxes = function(t, e, s) {
            var i = e.settings.axisLineOffset
              , n = e.settings.axisOpacity.toString()
              , h = "rgba(127,205,230," + n + ")"
              , l = "rgba(0,0,0," + n + ")"
              , g = e.settings.xAxisArrowMode
              , x = e.settings.yAxisArrowMode
              , v = e.settings.showXAxis
              , c = e.settings.showYAxis
              , m = Math.round(e.mapx(0)) - i
              , d = Math.round(e.mapy(0)) - i
              , p = e.screen.height
              , f = e.screen.width;
            function u(e, s, i) {
                t.save();
                var a = Math.PI / 12
                  , r = 8 * Math.max(t.lineWidth, 1.5);
                t.lineJoin = "round",
                t.fillStyle = l,
                t.strokeStyle = l,
                t.beginPath(),
                t.moveTo(e, s),
                t.lineTo(e + Math.cos(i - a) * r, s + Math.sin(i - a) * r),
                t.lineTo(e + Math.cos(i + a) * r, s + Math.sin(i + a) * r),
                t.lineTo(e, s),
                t.lineTo(e + Math.cos(i - a) * r, s + Math.sin(i - a) * r),
                t.stroke(),
                t.fill(),
                t.restore()
            }
            var y = p
              , b = 0;
            e.settings.restrictGridToFirstQuadrant && (y = d,
            b = m,
            g === a.BOTH && (g = a.POSITIVE),
            x === a.BOTH && (x = a.POSITIVE)),
            c && (o.save(t, "yaxis"),
            e.settings.takingScreenshot && o.setTitle(t, e.settings.yAxisLabel || "Y axis"),
            r.save(t, "dcg-svg-axis-line"),
            t.lineWidth = 1 * e.settings.axisLineWidth,
            t.strokeStyle = "y" === s ? h : l,
            x === a.BOTH ? (t.beginPath(),
            t.moveTo(m, 2 * e.settings.axisLineWidth),
            t.lineTo(m, p - 2 * e.settings.axisLineWidth),
            t.stroke(),
            u(m, p - e.settings.axisLineWidth, 3 * Math.PI / 2),
            u(m, e.settings.axisLineWidth, Math.PI / 2)) : x === a.POSITIVE ? (t.beginPath(),
            t.moveTo(m, 2 * e.settings.axisLineWidth),
            t.lineTo(m, y),
            t.stroke(),
            u(m, e.settings.axisLineWidth, Math.PI / 2)) : (t.beginPath(),
            t.moveTo(m, 0),
            t.lineTo(m, y),
            t.stroke()),
            r.restore(t),
            o.restore(t)),
            v && (o.save(t, "xaxis"),
            e.settings.takingScreenshot && o.setTitle(t, e.settings.xAxisLabel || "X axis"),
            r.save(t, "dcg-svg-axis-line"),
            t.lineWidth = 1 * e.settings.axisLineWidth,
            t.strokeStyle = "x" === s ? h : l,
            g === a.BOTH ? (t.beginPath(),
            t.moveTo(2 * e.settings.axisLineWidth, d),
            t.lineTo(f - 2 * e.settings.axisLineWidth, d),
            t.stroke(),
            u(e.settings.axisLineWidth, d, 0),
            u(f - e.settings.axisLineWidth, d, Math.PI)) : g === a.POSITIVE ? (t.beginPath(),
            t.lineTo(b, d),
            t.lineTo(f - 2 * e.settings.axisLineWidth, d),
            t.stroke(),
            u(f - e.settings.axisLineWidth, d, Math.PI)) : (t.beginPath(),
            t.lineTo(b, d),
            t.lineTo(f, d),
            t.stroke()),
            r.restore(t),
            o.restore(t))
        }
        ,
        t.drawPolarStepNumbers = function(t, i, a) {
            t.save();
            var o = i.settings.showGrid
              , n = i.settings.xAxisNumbers && i.settings.showXAxis
              , x = i.settings.yAxisNumbers && i.settings.showYAxis
              , v = o && i.settings.polarNumbers
              , c = i.viewport.largestR()
              , m = i.viewport.smallestR()
              , d = i.viewport.xmin
              , p = i.viewport.xmax
              , f = i.viewport.ymin
              , u = i.viewport.ymax
              , y = i.screen.width
              , b = i.screen.height
              , w = {
                left: 3,
                right: y - 3,
                top: 3,
                bottom: b - 3
            }
              , M = i.settings.labelHangingColor
              , T = i.settings.getTextColor()
              , S = i.settings.labelSize
              , A = S;
            function L(t, e, s) {
                var a = Math.sqrt(t * t - e * e);
                f <= a && a <= u && s.push({
                    x: i.mapx(e),
                    y: i.mapy(a)
                }),
                f <= -a && -a <= u && s.push({
                    x: i.mapx(e),
                    y: i.mapy(-a)
                })
            }
            function P(t, e, s) {
                var a = Math.sqrt(t * t - e * e);
                d <= a && a <= p && s.push({
                    x: i.mapx(a),
                    y: i.mapy(e)
                }),
                d <= -a && -a <= p && s.push({
                    x: i.mapx(-a),
                    y: i.mapy(e)
                })
            }
            this.addTextShadow(t, i),
            t.fillStyle = T;
            var k = i.mapx(0)
              , _ = i.mapy(0)
              , W = f <= 0 && 0 <= u && n
              , O = d <= 0 && 0 <= p && x
              , R = "";
            if (!W && !O && o) {
                var C, I, j, B, E = Math.abs(k), X = Math.abs(k - y), Y = Math.abs(_), V = Math.abs(_ - b);
                E <= X ? (C = "left",
                j = E) : (C = "right",
                j = X),
                Y <= V ? (I = "top",
                B = Y) : (I = "bottom",
                B = V),
                n && x ? R = j <= B ? C : I : x ? R = C : n && (R = I)
            }
            var F = {
                left: 0,
                right: y,
                top: _ - 1,
                bottom: _ + 1
            }
              , G = {
                left: k - 1,
                right: k + 1,
                top: 0,
                bottom: b
            };
            if (h(0, c, a.majorStepR, function(a) {
                var r = []
                  , o = []
                  , h = []
                  , l = e(s.value(a, c), S)
                  , v = l.getRect();
                switch (a > 0 ? (O && f <= a && a <= u && o.push({
                    x: k - v.right - 5,
                    y: i.mapy(a)
                }),
                O && f <= -a && -a <= u && o.push({
                    x: k - v.right - 5,
                    y: i.mapy(-a)
                }),
                W && d <= a && a <= p && r.push({
                    x: i.mapx(a),
                    y: _ - v.top + 3
                }),
                W && d <= -a && -a <= p && r.push({
                    x: i.mapx(-a),
                    y: _ - v.top + 3
                })) : O && !n && f <= a && a <= u ? o.push({
                    x: k - v.right - 5,
                    y: i.mapy(a)
                }) : W && !x && d <= a && a <= p && r.push({
                    x: i.mapx(a),
                    y: _ - v.top + 3
                }),
                R) {
                case "top":
                    P(a, u, h);
                    break;
                case "bottom":
                    P(a, f, h);
                    break;
                case "left":
                    L(a, d, h);
                    break;
                case "right":
                    L(a, p, h)
                }
                r.forEach(function(e) {
                    e = l.clampBoundsWithinRect(e, w),
                    l.drawCenteredAt(t, e, "dcg-svg-axis-value"),
                    g(F, l.getRectWhenCenteredAt(e))
                }),
                o.forEach(function(e) {
                    e = l.clampBoundsWithinRect(e, w),
                    l.drawCenteredAt(t, e, "dcg-svg-axis-value"),
                    g(G, l.getRectWhenCenteredAt(e))
                }),
                h.forEach(function(e) {
                    e = l.clampBoundsWithinRect(e, w),
                    l.drawCenteredAt(t, e, "dcg-svg-axis-value")
                })
            }),
            v) {
                var N = Math.ceil(m / a.majorStepR)
                  , z = Math.floor(c / a.majorStepR)
                  , H = Math.ceil((N + z) / 2) * a.majorStepR;
                h(0, 359, m > 0 ? 15 : 30, function(a) {
                    var o;
                    o = i.settings.degreeMode ? a.toString() + "°" : s.value(a * Math.PI / 180, 2 * Math.PI).string;
                    var n = t.measureText(o).width / 2
                      , h = H / 1.05
                      , g = h * Math.cos(a * Math.PI / 180)
                      , x = h * Math.sin(a * Math.PI / 180);
                    if (!(g < d || g > p || x < f || x > u)) {
                        var v = i.mapx(g)
                          , c = i.mapy(x);
                        0 === a || 180 === a ? c -= A : 90 !== a && 270 !== a || (v += n + 3);
                        var m = l(v, 3 + n, y - 3 - n)
                          , w = l(c, 3 + A, b - 3 - A);
                        w = e.computeBaselineFromCenter(w, S),
                        r.save(t, "dcg-svg-polar-axis-value"),
                        t.save(),
                        r.restore(t),
                        t.fillStyle = M,
                        e.setCtxFontSize(t, S),
                        t.strokeText(o, m, w),
                        t.fillText(o, m, w),
                        t.restore()
                    }
                })
            }
            return t.restore(),
            {
                x: F,
                y: G
            }
        }
        ,
        t.drawLabels = function(t, e, s) {
            var i = e.viewport.xmin
              , a = e.viewport.xmax
              , o = e.viewport.ymin
              , n = e.viewport.ymax
              , h = e.screen.width
              , l = e.screen.height
              , g = (a - i) / h
              , v = (n - o) / l
              , c = e.settings.getTextColor()
              , m = e.mapx(0)
              , d = e.mapy(0)
              , p = e.settings.labelSize
              , f = e.settings.showXAxis && e.settings.xAxisLabel
              , u = e.settings.showYAxis && e.settings.yAxisLabel
              , y = s.x
              , b = s.y;
            if (f && y) {
                var w;
                if (r.save(t, "dcg-svg-axis-label"),
                t.save(),
                r.restore(t),
                t.fillStyle = c,
                t.__xLabelOffset && e.settings.isViewportTransient && x(t.__xLabelOffset.xscale, g) && x(t.__xLabelOffset.yscale, v) && (w = {
                    x: t.__xLabelOffset.x + m,
                    y: t.__xLabelOffset.y + d
                }),
                this._setAxisLabelFont(t, f, p, e),
                !w) {
                    var M = h - t.measureText(f).width - 15
                      , T = p;
                    w = y.bottom + T < l ? {
                        x: M,
                        y: y.bottom + T
                    } : {
                        x: M,
                        y: y.top - T / 2
                    },
                    t.__xLabelOffset = {
                        x: w.x - m,
                        y: w.y - d,
                        xscale: g,
                        yscale: v
                    }
                }
                t.strokeText(f, w.x, w.y),
                t.fillText(f, w.x, w.y),
                t.restore()
            } else
                t.__xLabelPosition = null;
            if (u && b) {
                var S;
                if (r.save(t, "dcg-svg-axis-label"),
                t.save(),
                r.restore(t),
                t.fillStyle = c,
                t.__yLabelOffset && e.settings.isViewportTransient && x(t.__yLabelOffset.xscale, g) && x(t.__yLabelOffset.yscale, v) && (S = {
                    x: t.__yLabelOffset.x + m,
                    y: t.__yLabelOffset.y + d
                }),
                this._setAxisLabelFont(t, u, p, e),
                !S) {
                    var A = t.measureText(u).width
                      , L = p
                      , P = A + 5;
                    if (!this._isShortMathyLabel(u)) {
                        var k = A;
                        A = L,
                        L = k,
                        P = .5 * A
                    }
                    var _ = 15 + L;
                    S = b.left - A > 0 ? {
                        x: b.left - P,
                        y: _
                    } : {
                        x: b.right + A,
                        y: _
                    },
                    t.__yLabelOffset = {
                        x: S.x - m,
                        y: S.y - d,
                        xscale: g,
                        yscale: v
                    }
                }
                t.translate(S.x, S.y),
                this._isShortMathyLabel(u) || t.rotate(-Math.PI / 2),
                t.strokeText(u, 0, 0),
                t.fillText(u, 0, 0),
                t.restore()
            } else
                t.__yLabelPosition = null
        }
        ,
        t._isShortMathyLabel = function(t) {
            return t.trim().match(/^([a-zA-Z]?)\(?([a-zA-Z]?)\)?$/)
        }
        ,
        t._setAxisLabelFont = function(t, e, s, i) {
            this.addTextShadow(t, i),
            this._isShortMathyLabel(e) ? t.font = "italic " + Math.round(1.4 * s.toString()) + "px Times" : t.font = Math.round(1.2 * s.toString()) + "px Arial"
        }
        ,
        t.drawCartesianStepNumbers = function(t, i, a, o) {
            t.save();
            var n = i.settings.showXAxis
              , l = i.settings.showYAxis
              , x = n && i.settings.xAxisNumbers
              , v = l && i.settings.yAxisNumbers
              , c = i.viewport.xmin
              , m = i.viewport.xmax
              , d = i.viewport.ymin
              , p = i.viewport.ymax
              , f = i.screen.width
              , u = i.screen.height
              , y = {
                left: 3,
                top: 3,
                right: f - 3,
                bottom: u - 3
            };
            i.settings.restrictGridToFirstQuadrant && (c = 0,
            d = 0);
            var b = i.settings.labelHangingColor
              , w = i.settings.getTextColor()
              , M = i.mapx(0)
              , T = i.mapy(0)
              , S = i.settings.labelSize;
            this.addTextShadow(t, i);
            var A = {
                left: 0,
                right: f,
                top: T - 1,
                bottom: T + 1
            }
              , L = {
                left: M - 1,
                right: M + 1,
                top: 0,
                bottom: u
            }
              , P = !1;
            if (n && l && (x || v)) {
                P = !0,
                t.fillStyle = w;
                var k = e(s.value(0, 1), S);
                k.drawCenteredAt(t, {
                    x: M - k.getRect().right - 5,
                    y: T - k.getRect().top + 5
                }, "dcg-svg-axis-value")
            }
            var _ = []
              , W = [];
            if (x && h(c, m, a.majorStepX, function(t) {
                var i = e(s.value(t, m - c), S);
                "0" === i.getString() && P || _.push(i)
            }),
            v && h(d, p, a.majorStepY, function(t) {
                var i = e(s.value(t, p - d), S);
                "0" === i.getString() && P || W.push(i)
            }),
            o) {
                t.save(),
                r.save(t, "dcg-svg-tickmark");
                var O = i.settings.axisLineOffset
                  , R = "rgba(0,0,0," + i.settings.axisOpacity.toString() + ")";
                t.lineWidth = i.settings.axisLineWidth,
                t.strokeStyle = R;
                var C = Math.round(i.mapy(0)) - O
                  , I = Math.round(i.mapx(0)) - O
                  , j = Math.round(2 * t.lineWidth) - O;
                t.beginPath(),
                _.forEach(function(e) {
                    var s = Math.round(i.mapx(e.getValue())) - O;
                    t.moveTo(s, C - j),
                    t.lineTo(s, C + j)
                }),
                W.forEach(function(e) {
                    var s = Math.round(i.mapy(e.getValue())) - O;
                    t.moveTo(I - j, s),
                    t.lineTo(I + j, s)
                }),
                t.stroke(),
                r.restore(t),
                t.restore()
            }
            return _.forEach(function(e) {
                var s = {
                    x: i.mapx(e.getValue()) - .5 * e.getMinusWidth(),
                    y: T - e.getRect().top + 5
                }
                  , a = e.clampBoundsWithinRect(s, y);
                t.fillStyle = s.y === a.y ? w : b;
                var o = "dcg-svg-axis-value";
                s.x !== a.x && (o += " dcg-svg-offcenter-axis-value"),
                e.drawCenteredAt(t, a, o),
                g(A, e.getRectWhenCenteredAt(a)),
                r.restore(t)
            }),
            W.forEach(function(e) {
                var s = {
                    x: M - 5 - e.getRect().right,
                    y: i.mapy(e.getValue())
                }
                  , a = e.clampBoundsWithinRect(s, y);
                t.fillStyle = s.x === a.x ? w : b;
                var o = "dcg-svg-axis-value";
                s.y !== a.y && (o += " dcg-svg-offcenter-axis-value"),
                e.drawCenteredAt(t, a, o),
                g(L, e.getRectWhenCenteredAt(a)),
                r.restore(t)
            }),
            t.restore(),
            {
                x: A,
                y: L
            }
        }
    })
      , h = function(t, e, s, i) {
        var a = Math.ceil(t / s)
          , r = Math.floor(e / s);
        if (isFinite(r - a) && !(r - a > 1e4))
            for (var o = a; o <= r; o++)
                i(o * s)
    }
      , l = function(t, e, s) {
        return t < e ? e : t > s ? s : t
    }
      , g = function(t, e) {
        e.left < t.left && (t.left = e.left),
        e.right > t.right && (t.right = e.right),
        e.top < t.top && (t.top = e.top),
        e.bottom > t.bottom && (t.bottom = e.bottom)
    }
      , x = function(t, e) {
        var s = Math.abs(t)
          , i = Math.abs(e);
        return Math.abs(s - i) <= 1e-4 * (s < i ? i : s)
    };
    return n
});
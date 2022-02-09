define('graphing/canvas-braille', ["require", "exports", "tslib", "./projection", "./screen", "core/graphing-calc/json/graph-settings", "abraham"], function(require, e, t, i, r, n, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.createBrailleImage = void 0;
    function l(e, t, i, r, n) {
        var a = 1 + e.dotSpacing
          , l = n.charCodeAt(0) - 10240;
        1 & l && t.fillRect(i, r, 1, 1),
        2 & l && t.fillRect(i, r + a, 1, 1),
        4 & l && t.fillRect(i, r + 2 * a, 1, 1),
        8 & l && t.fillRect(i + a, r, 1, 1),
        16 & l && t.fillRect(i + a, r + a, 1, 1),
        32 & l && t.fillRect(i + a, r + 2 * a, 1, 1)
    }
    function o(e, t) {
        for (var i = t.x, r = t.y, n = t.width, a = t.height, l = e.getImageData(i, r, n, a).data, o = 3; o < l.length; o += 4)
            if (0 !== l[o])
                return !1;
        return !0
    }
    function h(e, t) {
        for (var i = t.x, r = t.y, n = t.width, a = t.height, l = e.getImageData(i, r, n, a).data, o = 3; o < l.length; o += 4)
            if (0 === l[o])
                return !1;
        return !0
    }
    function s(e, t, i, r, n) {
        return o(t, d(e, i, r, n))
    }
    function c(e, t) {
        var i = e.dotSpacing;
        return (2 + i) * t.length + (1 + i) * (t.length - 1)
    }
    function f(e, t) {
        return 3 + 2 * e.dotSpacing
    }
    function d(e, t, i, r) {
        var n = e.cellPadding;
        return {
            x: t - n,
            y: i - n,
            width: c(e, r) + 2 * n,
            height: f(e) + 2 * n
        }
    }
    function u(e, t) {
        if (!e)
            return t;
        var i = Math.min(e.x, t.x)
          , r = Math.min(e.y, t.y);
        return {
            x: i,
            y: r,
            width: Math.max(e.x + e.width, t.x + t.width) - i,
            height: Math.max(e.y + e.height, t.y + t.height) - r
        }
    }
    function g(e, t, i) {
        return Math.min(Math.max(e, t), i)
    }
    function x(e, t, i, r, n) {
        return {
            x: g(i, 0, t.canvas.width - c(e, n)),
            y: g(r, 0, t.canvas.height - f(e))
        }
    }
    function v(e, t, i, r, n) {
        var a = t.fillStyle;
        t.fillStyle = "white";
        var o = d(e, i, r, n);
        t.fillRect(o.x, o.y, o.width, o.height),
        t.fillStyle = "black",
        function(e, t, i, r, n) {
            for (var a = 3 + 2 * e.dotSpacing, o = 0; o < n.length; o++)
                l(e, t, i + a * o, r, n[o])
        }(e, t, i, r, n),
        t.fillStyle = a
    }
    function w(e, t, i, r) {
        var n = e.cellPadding;
        return {
            x: Math.round(t - (c(e, r) + n)),
            y: i
        }
    }
    function m(e, t) {
        var i = "nemeth" === t ? a.latexToNemeth(e) : a.latexToUeb(e);
        return i.isError ? "" : function(e) {
            return e.replace(/\u283C(?!$)/g, "")
        }(i.value)
    }
    function y(e, t) {
        return t >= 0 ? e * Math.pow(10, t) : e / Math.pow(10, -t)
    }
    function p(e, t, i, r) {
        var n = i[0]
          , a = i[1]
          , l = Math.ceil(Math.log(a - n) / Math.LN10) - 1
          , o = l
          , h = 5;
        e: for (var s = l; l - s < 4; s--)
            for (var f = 0, d = [5, 2, 1]; f < d.length; f++) {
                var u = d[f]
                  , g = y(u, s)
                  , x = Math.floor(n / g) + 1
                  , v = Math.ceil(a / g) - 1
                  , w = Math.abs(r(g) - r(0))
                  , p = m(String(y(x * u, s)), t)
                  , b = m(String(y(v * u, s)), t);
                if (w < c(e, p) + c(e, " ") || w < c(e, b) + c(e, " "))
                    break e;
                if (v - x >= 15)
                    break e;
                o = s,
                h = u
            }
        return {
            int: h,
            exp: o
        }
    }
    function b(e, t, i) {
        return p(e, t, [i.viewport.xmin, i.viewport.xmax], function(e) {
            return i.mapx(e)
        })
    }
    function M(e, t, i) {
        return i.viewport.isSquare(i.screen) ? b(e, t, i) : p(e, t, [i.viewport.ymin, i.viewport.ymax], function(e) {
            return i.mapy(e)
        })
    }
    function S(e, t) {
        for (var i = e.int, r = e.exp, n = t[0], a = t[1], l = Math.ceil(n / y(i, r)), o = Math.floor(a / y(i, r)), h = [], s = l; s <= o; s++)
            h.push(y(s * i, r));
        return h
    }
    function A(e) {
        switch (e) {
        case "vpmax8":
        case "vpmax11":
            return "rgb(145, 145, 145)";
        case "etc8":
        case "etc11":
            return "rgb(0, 0, 0)";
        default:
            throw new Error("Unexpected embosser model: " + e)
        }
    }
    function R(e) {
        switch (e) {
        case "vpmax8":
        case "vpmax11":
            return "rgb(219, 219, 219)";
        case "etc8":
        case "etc11":
            return "rgb(0, 0, 0)";
        default:
            throw new Error("Unexpected embosser model: " + e)
        }
    }
    function P(e, t, i, r, n, a) {
        void 0 === a && (a = 1);
        var l = e.fillStyle;
        e.fillStyle = t,
        e.fillRect(i - 1, r, a, n - r),
        e.fillStyle = l
    }
    function I(e, t, i, r, n, a) {
        void 0 === a && (a = 1);
        var l = e.fillStyle;
        e.fillStyle = t,
        e.fillRect(r, i - 1, n - r, a),
        e.fillStyle = l
    }
    function E(e, t, i, r) {
        var n = e.fillStyle;
        e.fillStyle = t,
        e.fillRect(i + 1, r, 1, 1),
        e.fillRect(i, r + 1, 1, 1),
        e.fillRect(i + 1, r + 1, 1, 1),
        e.fillRect(i + 2, r + 1, 1, 1),
        e.fillRect(i + 1, r + 2, 1, 1),
        e.fillStyle = n
    }
    e.createBrailleImage = function(e, a, l, g, y) {
        var p, N, C, _, q, O, L, k;
        if (void 0 !== l.margins && void 0 !== a) {
            var B = function(e) {
                if ("etc8" === e || "etc11" === e)
                    return {
                        dotSpacing: 0,
                        cellPadding: 1,
                        graphLineWidth: 1.75,
                        embossPatternInequalities: !0
                    };
                if ("vpmax8" === e || "vpmax11" === e)
                    return {
                        dotSpacing: 1,
                        cellPadding: 2,
                        graphLineWidth: 1,
                        embossPatternInequalities: !1
                    };
                throw new Error("Unexpected embosser model " + e)
            }(g)
              , T = l.margins
              , j = t.__assign({}, a.settings)
              , U = j.showGrid && function(e) {
                if ("etc8" === e || "etc11" === e)
                    return !1;
                if ("vpmax8" === e || "vpmax11" === e)
                    return !0;
                throw new Error("Unexpected embosser model " + e)
            }(g)
              , W = !!j.showXAxis
              , F = !!j.showYAxis
              , D = !!j.xAxisNumbers
              , G = j.xAxisArrowMode
              , H = !!j.yAxisNumbers
              , X = j.yAxisArrowMode
              , Y = B.graphLineWidth
              , $ = {
                showGrid: !1,
                xAxisNumbers: !1,
                xAxisArrowMode: n.AxisArrowModes.NONE,
                yAxisNumbers: !1,
                yAxisArrowMode: n.AxisArrowModes.NONE,
                showXAxis: !1,
                showYAxis: !1,
                graphLineWidth: Y,
                pointLineWidth: 2.5,
                curveOpacity: 1,
                globalCurveColor: "#000",
                disableFill: !0
            };
            for (var z in $)
                a.settings[z] = $[z];
            var J = e.width - T.right - T.left
              , K = e.height - T.top - T.bottom
              , Q = new r.Screen(J,K)
              , V = a.getProjection().viewport;
            a.settings.squareAxes && (V = V.squareCrop(Q));
            var Z = new i.Projection(Q,V,a.settings)
              , ee = e.getContext("2d")
              , te = document.createElement("canvas");
            te.width = J,
            te.height = K;
            var ie = te.getContext("2d")
              , re = document.createElement("canvas");
            re.width = J,
            re.height = K;
            var ne = re.getContext("2d")
              , ae = document.createElement("canvas");
            ae.width = J,
            ae.height = K;
            var le = ae.getContext("2d")
              , oe = document.createElement("canvas");
            oe.width = J,
            oe.height = K;
            var he = oe.getContext("2d")
              , se = document.createElement("canvas");
            se.width = J,
            se.height = K;
            var ce = se.getContext("2d");
            if (null !== ee && null !== he && null !== ie && null !== le && null !== ce && null !== ne) {
                a.settings.disableFill = !0,
                a.screenshotToCanvas(oe, {
                    width: J,
                    height: K,
                    targetPixelRatio: 1,
                    transparentBackground: !0
                }),
                a.settings.disableFill = !1,
                a.screenshotToCanvas(te, {
                    width: J,
                    height: K,
                    targetPixelRatio: 1,
                    transparentBackground: !0
                }),
                ee.fillStyle = "white",
                ee.fillRect(0, 0, e.width, e.height);
                var fe, de = Math.round(Z.mapx(0)), ue = Math.round(Z.mapy(0)), ge = "" !== j.xAxisLabel ? j.xAxisLabel.replace(/ /g, "\\ ") : "x", xe = "" !== j.yAxisLabel ? j.yAxisLabel.replace(/ /g, "\\ ") : "y";
                if (W && Z.coordsAreOnscreen(J - 6, ue - 8, 0))
                    v(fe = t.__assign(t.__assign({}, B), {
                        cellPadding: B.cellPadding + 1
                    }), ce, Ue = (N = x(fe, ie, Ue = (p = w(fe, Ue = J - 2, We = ue - (Pe = 2 + 2 * f(fe)), Re = m(ge, y))).x, We = p.y, Re)).x, We = N.y, Re);
                if (F && Z.coordsAreOnscreen(de + 4, 1, 0))
                    v(fe = t.__assign(t.__assign({}, B), {
                        cellPadding: B.cellPadding + 1
                    }), ce, Ue = (C = x(fe, ie, Ue = de + 4, We = 1, Re = m(xe, y))).x, We = C.y, Re);
                var ve = function(e, t, i) {
                    return {
                        x: S(b(e, t, i), [i.viewport.xmin, i.viewport.xmax]),
                        y: S(M(e, t, i), [i.viewport.ymin, i.viewport.ymax])
                    }
                }(B, y, Z)
                  , we = ve.x
                  , me = ve.y;
                if (W) {
                    for (var ye = void 0, pe = 0, be = we; pe < be.length; pe++) {
                        if (0 !== (Ne = be[pe]) || !F)
                            if (!((ke = Math.round(Z.mapx(Ne))) < 2 || ke > Z.screen.width - 2) && D) {
                                var Me = c(B, m("-1", y)) - c(B, m("1", y));
                                s(B, he, Ue = (_ = x(B, ce, Ue = ke - (Ne < 0 ? Me + 1 : 1), We = ue + 4, Re = m("" + Ne, y))).x, We = _.y, Re) && (v(B, ce, Ue, We, Re),
                                ye = u(ye, d(B, Ue, We, Re)))
                            }
                    }
                    if (B.embossPatternInequalities && ye)
                        ye = u(ye, {
                            x: 0,
                            y: ue,
                            width: J,
                            height: 0
                        }),
                        le.fillStyle = "white",
                        le.fillRect(ye.x, ye.y, ye.width, ye.height)
                }
                if (F) {
                    ye = void 0;
                    for (var Se = 0, Ae = me; Se < Ae.length; Se++) {
                        if (0 !== (qe = Ae[Se]) || !W)
                            if (!((je = Math.round(Z.mapy(qe))) < 2 || je > Z.screen.height - 2)) {
                                var Re, Pe = -Math.ceil(f(B) / 2);
                                if (H)
                                    s(B, he, Ue = (O = x(B, ce, Ue = (q = w(B, Ue = de - 4, We = je + Pe, Re = m("" + qe, y))).x, We = q.y, Re)).x, We = O.y, Re) && (v(B, ce, Ue, We, Re),
                                    ye = u(ye, d(B, Ue, We, Re)))
                            }
                    }
                    if (B.embossPatternInequalities && ye)
                        ye = u(ye, {
                            x: de,
                            y: 0,
                            width: 0,
                            height: K
                        }),
                        le.fillStyle = "white",
                        le.fillRect(ye.x, ye.y, ye.width, ye.height)
                }
                if (W && F)
                    Ue = (L = w(B, Ue = de - 2, We = ue + 2, Re = m(D || H ? "0" : "o", y))).x,
                    We = L.y,
                    Z.coordsAreOnscreen(Ue, We, 0) && s(B, he, Ue = (k = x(B, ce, Ue, We, Re)).x, We = k.y, Re) && v(B, ce, Ue, We, Re);
                for (var Ie = 0, Ee = we; Ie < Ee.length; Ie++) {
                    var Ne = Ee[Ie];
                    (ke = Math.round(Z.mapx(Ne))) < 2 || ke > Z.screen.width - 2 || (F && 0 === Ne || U && P(le, "white", ke - 1, 0, K, 3))
                }
                for (var Ce = 0, _e = me; Ce < _e.length; Ce++) {
                    var qe = _e[Ce];
                    (je = Math.round(Z.mapy(qe))) < 2 || je > Z.screen.height - 2 || (W && 0 === qe || U && I(le, "white", je - 1, 0, J, 3))
                }
                W && I(le, "white", ue - 3, 0, J, 7),
                F && P(le, "white", de - 3, 0, K, 7);
                for (var Oe = 0, Le = we; Oe < Le.length; Oe++) {
                    var ke;
                    Ne = Le[Oe];
                    (ke = Math.round(Z.mapx(Ne))) < 2 || ke > Z.screen.width - 2 || (F && 0 === Ne || (U ? P(le, R(g), ke, 0, K) : W && P(le, R(g), ke, ue - 3, ue + 2)))
                }
                for (var Be = 0, Te = me; Be < Te.length; Be++) {
                    var je;
                    qe = Te[Be];
                    (je = Math.round(Z.mapy(qe))) < 2 || je > Z.screen.height - 2 || (W && 0 === qe || (U ? I(le, R(g), je, 0, J) : F && I(le, R(g), je, de - 3, de + 2)))
                }
                if (W && I(le, A(g), ue, 0, J),
                F && P(le, A(g), de, 0, K),
                X !== n.AxisArrowModes.NONE && (function(e, t, i, r) {
                    var n = e.fillStyle;
                    e.fillStyle = t;
                    for (var a = -2; a <= 2; a++)
                        e.fillRect(i - 1 + a, r + Math.abs(a), 1, 1);
                    e.fillStyle = n
                }(le, A(g), de, 0),
                X === n.AxisArrowModes.BOTH && function(e, t, i, r) {
                    var n = e.fillStyle;
                    e.fillStyle = t;
                    for (var a = -2; a <= 2; a++)
                        e.fillRect(i - 1 + a, r - Math.abs(a), 1, 1);
                    e.fillStyle = n
                }(le, A(g), de, K - 1)),
                G !== n.AxisArrowModes.NONE && (function(e, t, i, r) {
                    var n = e.fillStyle;
                    e.fillStyle = t;
                    for (var a = -2; a <= 2; a++)
                        e.fillRect(i - Math.abs(a), r - 1 + a, 1, 1);
                    e.fillStyle = n
                }(le, A(g), J - 1, ue),
                G === n.AxisArrowModes.BOTH && function(e, t, i, r) {
                    var n = e.fillStyle;
                    e.fillStyle = t;
                    for (var a = -2; a <= 2; a++)
                        e.fillRect(i + Math.abs(a), r - 1 + a, 1, 1);
                    e.fillStyle = n
                }(le, A(g), 0, ue)),
                B.embossPatternInequalities)
                    for (var Ue = 0; Ue < J; Ue += 6)
                        for (var We = 0; We < K; We += 6) {
                            var Fe = {
                                x: Ue,
                                y: We,
                                width: 3,
                                height: 3
                            };
                            h(ie, Fe) && o(le, Fe) && o(he, Fe) && o(ce, Fe) && E(ne, "black", Ue, We)
                        }
                B.embossPatternInequalities || ee.drawImage(te, T.left, T.top),
                ee.drawImage(ae, T.left, T.top),
                ee.drawImage(oe, T.left, T.top),
                ee.drawImage(se, T.left, T.top),
                B.embossPatternInequalities && ee.drawImage(re, T.left, T.top)
            }
            for (var z in $)
                a.settings[z] = j[z]
        }
    }
});
define('graphing/automatic-label-placer', ["require", "exports", "graphing/integral-image", "underscore"], function(require, t, e, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.generateCandidatesForPolygon = t.generateCandidatesForAngle = t.generateCandidatesForSegment = t.generateCandidatesForPoint = t.buildStaticEnvGetter = t.computePositions = t.getIntegralImage = void 0;
    var r = .5
      , o = document.createElement("canvas")
      , n = [];
    function i(t, a) {
        if (!(a.width * a.height > 0))
            return new e.default({
                width: 0,
                height: 0,
                data: []
            });
        o.width = 0,
        o.width = Math.round(a.width * r),
        o.height = Math.round(a.height * r);
        var i = o.getContext("2d");
        i.save(),
        i.scale(o.width / t.canvas.width, o.height / t.canvas.height),
        i.drawImage(t.canvas, 0, 0),
        i.restore();
        var h = i.getImageData(0, 0, o.width, o.height)
          , c = h.data;
        c.length,
        n.length;
        for (var s = n = new Array(c.length / 4), u = 0; u < s.length; u++)
            s[u] = c[4 * u + 3];
        return new e.default({
            width: h.width,
            height: h.height,
            data: s
        })
    }
    function h(t, e) {
        var a = 1 / 0
          , r = -1
          , o = e[t];
        if (1 === o.length)
            return o[0];
        for (var n = 0; n < o.length; n++) {
            var i = e[t][n].staticScore + c(t, n, e);
            (-1 === r || i < a) && (a = i,
            r = n)
        }
        return o[r]
    }
    function c(t, e, a) {
        for (var r = 0, o = a[t][e], n = 0; n < a.length; n++)
            if (n !== t) {
                for (var i = 0, h = a[n], c = h.length - 1; c >= 0; c--) {
                    var s = h[c];
                    i += Math.max(0, Math.min(o.right, s.right) - Math.max(o.left, s.left)) * Math.max(0, Math.min(o.bottom, s.bottom) - Math.max(o.top, s.top))
                }
                r += i / h.length
            }
        return r
    }
    function s(t, e) {
        var a = e.getSum({
            left: t.left * r,
            right: t.right * r,
            top: t.top * r,
            bottom: t.bottom * r
        });
        return a /= 200,
        a /= .25
    }
    function u(t, e) {
        var a = 0;
        return e.forEach(function(e) {
            a += p(t, e)
        }),
        a
    }
    function p(t, e) {
        return Math.max(0, Math.min(t.right, e.right) - Math.max(t.left, e.left)) * Math.max(0, Math.min(t.bottom, e.bottom) - Math.max(t.top, e.top))
    }
    function l(t, e) {
        if (!(e.length <= 1))
            for (var a, r, o, n = t(), i = 0, h = e; i < h.length; i++) {
                var c = h[i];
                c.staticScore += (a = c,
                r = n.viewport,
                o = void 0,
                o = p(a, r),
                10 * (a.width * a.height - o)),
                c.staticScore += u(c, n.domObstructions),
                c.staticScore += s(c, n.integralImage)
            }
    }
    t.getIntegralImage = i,
    t.computePositions = function(t) {
        for (var e = 0; e < t.length; e++) {
            var a = h(e, t);
            t[e] = [a]
        }
        return t.map(function(t) {
            return t[0]
        })
    }
    ,
    t.buildStaticEnvGetter = function(t, e, a) {
        var r;
        return function() {
            return r || (r = {
                domObstructions: a,
                viewport: {
                    left: 0,
                    right: e.width,
                    top: 0,
                    bottom: e.height
                },
                integralImage: i(t, e)
            }),
            r
        }
    }
    ,
    t.generateCandidatesForPoint = function(t, e) {
        var r = e.nakedLabel ? 0 : e.pt_radius
          , o = Math.round(r / Math.sqrt(2))
          , n = []
          , i = e.pt_x
          , h = e.pt_y
          , c = e.width
          , s = e.height
          , u = 400;
        n.push({
            cx_s: 0,
            cy_s: 0,
            cx_a: 0,
            cy_a: 0,
            staticScore: u,
            orientation: "center",
            matches: {
                default: 1,
                center: 1,
                center_auto: 1,
                auto_center: 1
            }
        }),
        n.push({
            cx_s: .5,
            cx_a: r + 3,
            cy_s: 0,
            cy_a: 0,
            staticScore: u,
            orientation: "right",
            matches: {
                default: 1,
                right: 1,
                center_auto: 1,
                auto_right: 1
            }
        }),
        n.push({
            cx_s: -.5,
            cx_a: -r - 3,
            cy_s: 0,
            cy_a: 0,
            staticScore: u,
            orientation: "left",
            matches: {
                default: 1,
                left: 1,
                center_auto: 1,
                auto_left: 1
            }
        }),
        n.push({
            cx_s: 0,
            cx_a: 0,
            cy_s: -.5,
            cy_a: -r,
            staticScore: u,
            orientation: "above",
            matches: {
                default: 1,
                above: 1,
                auto_center: 1,
                above_auto: 1
            }
        }),
        n.push({
            cx_s: -.5,
            cx_a: -o,
            cy_s: -.5,
            cy_a: -o,
            staticScore: u,
            orientation: "tl",
            matches: {
                default: 1,
                above_left: 1,
                above_auto: 1,
                auto_left: 1
            }
        }),
        n.push({
            cx_s: .5,
            cx_a: o,
            cy_s: -.5,
            cy_a: -o,
            staticScore: u,
            orientation: "tr",
            matches: {
                default: 1,
                above_right: 1,
                above_auto: 1,
                auto_right: 1
            }
        }),
        n.push({
            cx_s: 0,
            cx_a: 0,
            cy_s: .5,
            cy_a: r,
            staticScore: u,
            orientation: "below",
            matches: {
                default: 1,
                below: 1,
                auto_center: 1,
                below_auto: 1
            }
        }),
        n.push({
            cx_s: -.5,
            cx_a: -o,
            cy_s: .5,
            cy_a: o,
            staticScore: u,
            orientation: "bl",
            matches: {
                default: 1,
                below_left: 1,
                below_auto: 1,
                auto_left: 1
            }
        }),
        n.push({
            cx_s: .5,
            cx_a: o,
            cy_s: .5,
            cy_a: o,
            staticScore: u,
            orientation: "br",
            matches: {
                default: 1,
                below_right: 1,
                below_auto: 1,
                auto_right: 1
            }
        });
        var p = Math.cos(e.rotation)
          , f = Math.sin(e.rotation)
          , d = n.map(function(t) {
            var a = t.cx_s * c + t.cx_a
              , r = t.cy_s * s + t.cy_a
              , o = a * p - r * f
              , n = r * p + a * f
              , u = "calc(" + (100 * t.cx_s - 50) + "% + " + t.cx_a + "px)"
              , l = "calc(" + (100 * t.cy_s - 50) + "% + " + t.cy_a + "px)"
              , d = -c / 2
              , g = c / 2
              , _ = -s / 2
              , m = s / 2;
            if (e.rotation) {
                var x = function(t) {
                    for (var e = t[0].x, a = t[0].x, r = t[0].y, o = t[0].y, n = t.length - 1; n >= 1; n--) {
                        var i = t[n]
                          , h = i.x
                          , c = i.y;
                        h < e && (e = h),
                        h > a && (a = h),
                        c < r && (r = c),
                        c > o && (o = c)
                    }
                    return {
                        left: e,
                        right: a,
                        top: r,
                        bottom: o
                    }
                }([{
                    x: d * p - _ * f,
                    y: _ * p + d * f
                }, {
                    x: d * p - m * f,
                    y: m * p + d * f
                }, {
                    x: g * p - _ * f,
                    y: _ * p + g * f
                }, {
                    x: g * p - m * f,
                    y: m * p + g * f
                }]);
                d = x.left,
                g = x.right,
                _ = x.top,
                m = x.bottom
            }
            return d = Math.round(i + o + d),
            g = Math.round(i + o + g),
            _ = Math.round(h + n + _),
            m = Math.round(h + n + m),
            {
                pt_x: Math.round(i),
                pt_y: Math.round(h),
                left: d,
                right: g,
                top: _,
                bottom: m,
                width: g - d,
                height: m - _,
                transform: "translate(" + u + "," + l + ")",
                staticScore: e.priorOrientation === t.orientation ? t.staticScore - 20 : t.staticScore,
                orientation: t.orientation,
                matches: t.matches
            }
        });
        return l(t, d = e.enforceOrientation && "default" !== e.enforceOrientation ? a.filter(d, function(t) {
            return !!t.matches[e.enforceOrientation]
        }) : e.nakedLabel ? a.filter(d, function(t) {
            return "center" === t.orientation
        }) : e.keepOrientation && e.priorOrientation ? a.filter(d, function(t) {
            return t.orientation === e.priorOrientation
        }) : a.filter(d, function(t) {
            return "center" !== t.orientation
        })),
        d
    }
    ,
    t.generateCandidatesForSegment = function(t, e) {
        for (var r, o, n = [], i = e.width, h = e.height, c = i / 2, s = h / 2, u = e.pt_x1, p = e.pt_y1, f = e.pt_x2, d = e.pt_y2, g = (d - p) / (f - u), _ = Math.atan2(d - p, f - u) + Math.PI / 2, m = 5 * Math.cos(_), x = 5 * Math.sin(_), v = Math.min(p, d) - Math.abs(x) - h, M = Math.max(p, d) + Math.abs(x), y = [0, 20, 20, 40, 40], b = [], S = 0, w = [.5, .4, .6, .2, .8]; S < w.length; S++) {
            var O = w[S];
            b.push({
                x: u * (1 - O) + f * O,
                y: p * (1 - O) + d * O
            })
        }
        for (var I = 0; I < b.length; I++) {
            var C, P, F, k, A = b[I];
            if (g >= 2 || g <= -2) {
                F = k = A.y - s;
                var q = Math.abs((f - u) / (d - p) * s) + Math.abs(m);
                C = A.x + q,
                P = A.x - q - i
            } else if (g <= .05 && g >= -.05) {
                C = P = A.x - c;
                var E = Math.abs(g * c) + Math.abs(x);
                F = A.y - E - h,
                k = A.y + E
            } else
                m > 0 ? (C = A.x + m,
                P = A.x - m - i) : (C = A.x + m - i,
                P = A.x - m),
                x > 0 ? (F = A.y + x,
                k = A.y - x - h) : (F = A.y + x - h,
                k = A.y - x);
            F < v ? F = v : F > M && (F = M),
            k < v ? k = v : k > M && (k = M);
            var G = (f - u) * (F - p) - (d - p) * (C - u) > 0
              , L = I.toString() + (G ? "-a" : "-b");
            n.push({
                pt_x: A.x,
                pt_y: A.y,
                left: C,
                top: F,
                staticScore: y[I],
                orientation: L,
                matches: (r = {},
                r[L] = 1,
                r)
            });
            var j = I.toString() + (G ? "-b" : "-a");
            n.push({
                pt_x: A.x,
                pt_y: A.y,
                left: P,
                top: k,
                staticScore: y[I],
                orientation: j,
                matches: (o = {},
                o[j] = 1,
                o)
            })
        }
        var D = n.map(function(t) {
            var a = Math.round(t.left)
              , r = Math.round(t.left + i)
              , o = Math.round(t.top)
              , n = Math.round(t.top + h);
            return {
                pt_x: Math.round(t.pt_x),
                pt_y: Math.round(t.pt_y),
                left: a,
                right: r,
                top: o,
                bottom: n,
                width: r - a,
                height: n - o,
                staticScore: e.priorOrientation === t.orientation ? t.staticScore - 20 : t.staticScore,
                orientation: t.orientation,
                matches: t.matches
            }
        });
        return e.keepOrientation && e.priorOrientation && (D = a.filter(D, function(t) {
            return t.orientation === e.priorOrientation
        })),
        l(t, D),
        D
    }
    ,
    t.generateCandidatesForAngle = function(t, e) {
        var r, o = [], n = e.pt_x, i = e.pt_y, h = e.width, c = e.height, s = e.startAngle, u = e.endAngle;
        u < s && (u += 2 * Math.PI);
        var p = (s + u) / 2
          , f = e.isRightAngle ? e.radius * Math.sqrt(2) : e.radius + 4
          , d = f + Math.sqrt(e.width * e.width / 4 + e.height * e.height / 4)
          , g = []
          , _ = d * Math.sin(p);
        _ > f + .5 * c && (_ = f + .5 * c),
        _ < -f - .5 * c && (_ = -f - .5 * c),
        g.push({
            x: n + d * Math.cos(p) - h / 2,
            y: i + _ - c / 2
        });
        for (var m = 0; m < g.length; m++) {
            var x = g[m]
              , v = m.toString() + "-a";
            o.push({
                pt_x: x.x,
                pt_y: x.y,
                left: x.x,
                top: x.y,
                staticScore: 0,
                orientation: v,
                matches: (r = {},
                r[v] = 1,
                r)
            })
        }
        var M = o.map(function(t) {
            var a = Math.round(t.left)
              , r = Math.round(t.left + h)
              , o = Math.round(t.top)
              , n = Math.round(t.top + c);
            return {
                pt_x: Math.round(t.pt_x),
                pt_y: Math.round(t.pt_y),
                left: a,
                right: r,
                top: o,
                bottom: n,
                width: r - a,
                height: n - o,
                staticScore: e.priorOrientation === t.orientation ? t.staticScore - 20 : t.staticScore,
                orientation: t.orientation,
                matches: t.matches
            }
        });
        return e.keepOrientation && e.priorOrientation && (M = a.filter(M, function(t) {
            return t.orientation === e.priorOrientation
        })),
        l(t, M),
        M
    }
    ,
    t.generateCandidatesForPolygon = function(t, e) {
        for (var r = [], o = e.width, n = e.height, i = Math.round(10 / Math.sqrt(2)), h = 50, c = 0, s = 0, u = 0, p = 0; p < e.path.length - 2; p += 2)
            u += 1,
            c += e.path[p],
            s += e.path[p + 1];
        var f = c / u
          , d = s / u;
        r.push({
            left: f - o / 2,
            top: d - n / 2,
            staticScore: 0,
            orientation: "center",
            matches: {
                center: 1
            }
        }),
        r.push({
            left: f + 10 + 3,
            top: d - n / 2,
            staticScore: h,
            orientation: "right",
            matches: {
                right: 1
            }
        }),
        r.push({
            left: f - (10 + o) - 3,
            top: d - n / 2,
            staticScore: h,
            orientation: "left",
            matches: {
                left: 1
            }
        }),
        r.push({
            left: f - o / 2,
            top: d - (n + 10),
            staticScore: h,
            orientation: "top",
            matches: {
                top: 1
            }
        }),
        r.push({
            left: f - (o + i),
            top: d - (n + i),
            staticScore: h,
            orientation: "tl",
            matches: {
                tl: 1
            }
        }),
        r.push({
            left: f + i,
            top: d - (n + i),
            staticScore: h,
            orientation: "tr",
            matches: {
                tr: 1
            }
        }),
        r.push({
            left: f - o / 2,
            top: d + 10,
            staticScore: h,
            orientation: "bottom",
            matches: {
                bottom: 1
            }
        }),
        r.push({
            left: f - (o + i),
            top: d + i,
            staticScore: h,
            orientation: "bl",
            matches: {
                bl: 1
            }
        }),
        r.push({
            left: f + i,
            top: d + i,
            staticScore: h,
            orientation: "br",
            matches: {
                br: 1
            }
        });
        var g = r.map(function(t) {
            var a = Math.round(t.left)
              , r = Math.round(t.left + o)
              , i = Math.round(t.top)
              , h = Math.round(t.top + n);
            return {
                pt_x: Math.round(f),
                pt_y: Math.round(d),
                left: a,
                right: r,
                top: i,
                bottom: h,
                width: r - a,
                height: h - i,
                staticScore: e.priorOrientation === t.orientation ? t.staticScore - 20 : t.staticScore,
                orientation: t.orientation,
                matches: t.matches
            }
        });
        return e.keepOrientation && e.priorOrientation && (g = a.filter(g, function(t) {
            return t.orientation === e.priorOrientation
        })),
        l(t, g),
        g
    }
});
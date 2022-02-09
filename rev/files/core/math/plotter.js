
define('core/math/plotter', ["require", "exports", "tslib", "core/math/distance", "./poi", "./implicit-plotter", "./curve-accumulator", "./poi-finding-accumulator", "core/types/graphmode", "./domaintypes", "core/math/copy-defined-pois"], function(require, e, n, i, t, r, a, o, s, m, c) {
    "use strict";
    function l(e, n) {
        var i = new o.default(n)
          , t = e[0] + n.min * e[1]
          , r = e[0] + n.max * e[1];
        return isFinite(t) && isFinite(r) ? (i.addPoint([n.min, t]),
        i.addPoint([n.max, r]),
        i.addLinearZero(e),
        i.addLinearIntercept(e),
        i.finish()) : i.finish()
    }
    function u(e, i) {
        var t = e(i);
        return {
            segments: [n.__spreadArray(n.__spreadArray([], t), t)],
            resolved: !0
        }
    }
    function d(e, n, r) {
        var a = r.fn
          , o = r.jumpTolerance
          , s = e[0]
          , m = e[1]
          , c = n[0]
          , l = n[1]
          , u = i.mean(s, c)
          , d = a(u);
        return t.bisectJump(s, m, u, d, c, l, a, o)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.errorBranch = void 0,
    e.errorBranch = function(e) {
        return {
            graphMode: s.ERROR,
            error: e,
            segments: []
        }
    }
    ;
    var p = function(e, n, i) {
        var t = i.fn
          , r = i.jumpTolerance
          , a = i.accumulator;
        if (!isFinite(r) || r <= 0)
            return n;
        var o = d(e, n, i);
        if (!o)
            return n;
        for (var s = (n[0] - e[0]) / 10, m = [-s, s], c = n, l = 0; l < m.length; l++) {
            var u = e[0] + m[l]
              , p = t(u);
            isFinite(p) || (u = e[0],
            p = e[1],
            u = e[0],
            p = e[1]);
            var f = n[0] + m[l]
              , h = t(f);
            if (isFinite(h) ? c = [f, h] : (f = n[0],
            h = n[1]),
            d([u, p], [f, h], i)) {
                var v = o[0]
                  , g = o[1];
                return a.addPoint(v),
                a.breakSegment(),
                a.addPoint(g),
                n
            }
        }
        return c
    }
      , f = function(e, n, i) {
        this.derivative = i,
        this.accumulator = new o.default(n,e,i),
        this.fn = e,
        this.jumpTolerance = n.ytolerance || n.tolerance || 0
    };
    function h(e, n, i) {
        var t = n
          , r = e(t);
        return isFinite(r) || (r = e(t = n + i)),
        isFinite(r) || (r = e(t = n - i)),
        [t, r]
    }
    function v(e, n, i) {
        var r, a, o, s, m, c, l, u = new f(e,n,i), d = n.step / 10, v = n.min, g = [l = (r = h(e, v, d))[0], c = r[1]];
        isFinite(c) && u.accumulator.addPoint([l, c]);
        for (var x = Math.ceil((n.max - n.min) / n.step), y = 1; y <= x; y++)
            l = (a = h(e, v = (x - y) / x * n.min + y / x * n.max, d))[0],
            c = a[1],
            isFinite(c) && isFinite(g[1]) ? (l = (o = p(g, [l, c], u))[0],
            c = o[1],
            u.accumulator.addPoint([l, c])) : isFinite(c) && !isFinite(g[1]) ? (m = t.bisectFinite(g[0], g[1], l, c, e)) && (m[0] !== l && u.accumulator.addPoint(m),
            l = (s = p(m, [l, c], u))[0],
            c = s[1],
            u.accumulator.addPoint([l, c])) : !isFinite(c) && isFinite(g[1]) && (m = t.bisectFinite(g[0], g[1], l, c, e)) && ((m = p(g, m, u))[0] !== g[0] && u.accumulator.addPoint(m),
            u.accumulator.breakSegment()),
            g = [l, c];
        return u.accumulator.finish()
    }
    function g(e, n, i, t) {
        var r, a, o, s = n.min, m = n.max - n.min, c = n.xtolerance && n.ytolerance ? Math.min(n.xtolerance, n.ytolerance) : n.tolerance ? n.tolerance : 0, l = Math.floor(m / (Math.PI / i));
        function u(e, n) {
            var r = n % 2 == 0 ? 1 : -1;
            if (!t && -1 === r)
                return !1;
            for (var a = n * (Math.PI / i), o = [s, s + 1, s + 2, s + 3], m = !1, l = 0, u = o.length; l < u; l++) {
                var d = e(o[l])
                  , p = e(o[l] + a);
                if (isFinite(d) && isFinite(p) && (m = !0),
                isFinite(d) !== isFinite(p) || Math.abs(d - r * p) > c)
                    return !1
            }
            return !!m
        }
        for (r = 1; r <= l; r++)
            if (u(e, r)) {
                for (o = r,
                a = 2; a * r <= l; a++)
                    u(e, a * r) || (o = void 0);
                if (o)
                    break
            }
        return o ? o * (Math.PI / i) : null
    }
    function x(e) {
        return [e[1] * Math.cos(e[0]), e[1] * Math.sin(e[0])]
    }
    function y(e, n) {
        return n.map = x,
        v(e, n)
    }
    function F(e, n) {
        if (n.max < n.min)
            return {
                segments: [],
                resolved: !0
            };
        var i, t = new a.Accumulator(n), r = n.min, o = e(r);
        return isFinite(o[0]) && isFinite(o[1]) && t.addPoint(o),
        function(e, n) {
            for (var i = e.min, t = e.max, r = e.step, a = t - i, o = Math.ceil(a / r), s = a / o, m = 0; m < o; m++)
                n(i + m * s);
            n(t)
        }(n, function(n) {
            i = e(n),
            w(e, r, o, n, i, 10, t),
            r = n,
            o = i
        }),
        t.finish()
    }
    function w(e, n, t, r, a, o, s) {
        if (r !== n) {
            var m = s.xtolerance
              , c = s.ytolerance
              , l = s.ztolerance
              , u = i.mean(n, r)
              , d = e(u)
              , p = isFinite(t[0]) && isFinite(t[1]) && (2 === t.length || isFinite(t[2]))
              , f = isFinite(a[0]) && isFinite(a[1]) && (2 === a.length || isFinite(a[2]))
              , h = isFinite(d[0]) && isFinite(d[1]) && (2 === d.length || isFinite(d[2]));
            if (0 === o || u === n || u === r)
                return s.breakSegment(),
                void (f && s.addPoint(a));
            if (p || f)
                if (p === f) {
                    if (p && h && f) {
                        var v = i.pointToSegmentParameter(d[0], d[1], d[2] || 0, t[0], t[1], t[2] || 0, a[0], a[1], a[2] || 0);
                        if (v > .2 && v < .8 && Math.abs(d[0] - (t[0] + v * (a[0] - t[0]))) <= m && Math.abs(d[1] - (t[1] + v * (a[1] - t[1]))) <= c && (2 === t.length || Math.abs(d[2] - (t[2] + v * (a[2] - t[2]))) <= l))
                            return void s.addPoint(a)
                    }
                    t[0] === d[0] && t[1] === d[1] || w(e, n, t, u, d, o - 1, s),
                    a[0] === d[0] && a[1] === d[1] || w(e, u, d, r, a, o - 1, s)
                } else {
                    for (var g = n, x = r, y = t, F = a; n !== u && u !== r; )
                        h == p ? (n = u,
                        t = d,
                        p = h) : (r = u,
                        a = d,
                        f = h),
                        d = e(u = n + (r - n) / 2),
                        h = isFinite(d[0]) && isFinite(d[1]) && (2 === d.length || isFinite(d[2]));
                    p ? (w(e, g, y, n, t, o - 1, s),
                    s.breakSegment()) : (s.breakSegment(),
                    s.addPoint(a),
                    w(e, r, a, x, F, o - 1, s))
                }
        }
    }
    function P(e, n, i) {
        var t = e.viewport.xmin
          , r = e.viewport.xmax
          , a = e.viewport.ymin
          , o = e.viewport.ymax
          , c = n.lineWidth;
        if (c > 3) {
            var l = c * (r - t) / e.screen.width
              , u = c * (o - a) / e.screen.height;
            t -= l,
            r += l,
            a -= u,
            o += u
        }
        var d, p, f = e.trigAngleMultiplier || 1, h = e.oversample || 4, v = 1 / h * (r - t) / e.screen.width, x = 1 / h * (o - a) / e.screen.height, y = n.domainBound;
        switch (n.graphMode) {
        case s.X:
            switch ((d = m.intersectDomains(m.knownDomain([a, o]), y)).type) {
            case "empty":
                return !1;
            case "known":
                a = d.bounds[0],
                o = d.bounds[1]
            }
            p = {
                min: a,
                max: o,
                xtolerance: x,
                ytolerance: v,
                step: x
            };
            break;
        case s.Y:
            switch ((d = m.intersectDomains(m.knownDomain([t, r]), y)).type) {
            case "empty":
                return !1;
            case "known":
                t = d.bounds[0],
                r = d.bounds[1]
            }
            p = {
                min: t,
                max: r,
                xtolerance: v,
                ytolerance: x,
                step: v
            };
            break;
        case s.POLAR:
            if (!n.domain)
                throw new Error("Expected polar graph to have domain");
            if (p = {
                min: n.domain.min,
                max: n.domain.max,
                step: 2 * Math.PI / f / 1e3,
                tolerance: Math.min(v, x)
            },
            !n.domain.isExplicit) {
                var F = g(i, p, f, "=" === n.operator);
                F && (p.max = p.min + F)
            }
            p.step = Math.max(p.step, (p.max - p.min) / 11999);
            break;
        case s.PARAMETRIC:
        case s.PARAMETRIC_CURVE_3D:
            var w = n.domain ? n.domain.min : 0
              , P = n.domain ? n.domain.max : 1
              , M = n.domain ? n.domain.step : .01;
            switch ((d = m.intersectDomains(m.knownDomain([w, P]), y)).type) {
            case "empty":
                return !1;
            case "known":
                w = d.bounds[0],
                P = d.bounds[1]
            }
            p = {
                min: w,
                max: P,
                step: M,
                xtolerance: v,
                ytolerance: x,
                ztolerance: Math.min(v, x)
            };
            break;
        case s.IMPLICIT:
            p = {
                xmin: t,
                xmax: r,
                ymin: a,
                ymax: o,
                xtolerance: v,
                ytolerance: x
            };
            break;
        case s.Z_3D:
            return {
                xmin: -10,
                xmax: 10,
                ymin: -10,
                ymax: 10
            };
        default:
            return !1
        }
        return p
    }
    function M(e, n, i) {
        var t, r, a, o, m = [], c = null;
        switch (i) {
        case s.POLAR:
            c = x;
            break;
        case s.X:
            c = function(e) {
                return [e[1], e[0]]
            }
        }
        for (t = 0; t < e.length; t++)
            for (o = e[t],
            r = 0; r < o.length; r += 2)
                a = [o[r], o[r + 1]],
                c && (a = c(a)),
                m.push(a[0], a[1]);
        for (t = n.length - 1; t >= 0; t--)
            for (r = (o = n[t]).length - 2; r >= 0; r -= 2)
                a = [o[r], o[r + 1]],
                c && (a = c(a)),
                m.push(a[0], a[1]);
        return m
    }
    function b(e) {
        for (var n = [], i = {}, t = 0; t < e.length; t++) {
            var r = e[t]
              , a = r[0]
              , o = r[1];
            isNaN(a) || isNaN(o) ? i[t] = !0 : n.push(r)
        }
        return {
            points: n,
            droppedIndices: i
        }
    }
    e.default = {
        sampleLinear: l,
        sampleXY: v,
        findPiPeriod: g,
        samplePolar: y,
        sampleParametricRecursive: F,
        subsampleParametricRecursive: w,
        validateViewState: function(e) {
            if (!e)
                return !1;
            var n = e.viewport.xmin
              , i = e.viewport.xmax
              , t = e.viewport.ymin
              , r = e.viewport.ymax;
            return !(!isFinite(n) || !isFinite(i) || i <= n) && (!(!isFinite(t) || !isFinite(r) || r <= t) && (!(!isFinite(e.screen.width) || e.screen.width <= 0) && !(!isFinite(e.screen.height) || e.screen.height <= 0)))
        },
        computeDomain: P,
        computeGraphData: function(e) {
            var n, i, t, a = e.viewState, o = e.graphInfo, m = e.compiled, c = e.derivative, d = m.fn, p = P(a, o, d), f = o.graphMode;
            if (p) {
                switch (f) {
                case s.X:
                case s.Y:
                    var h = c ? c.fn : void 0;
                    n = o.isLinear ? l(o.linearCoefficients, p) : v(d, p, h);
                    break;
                case s.POLAR:
                    n = y(d, p);
                    break;
                case s.IMPLICIT:
                    n = r.sampleImplicit(d, p);
                    break;
                case s.PARAMETRIC:
                    p.step || (p.step = (p.max - p.min) / 1e3),
                    n = p.max === p.min ? u(d, p.min) : o.isLinear ? function(e, n) {
                        var i = l(e[0], n)
                          , t = l(e[1], n);
                        return i.segments.length && t.segments.length && 4 === i.segments[0].length && 4 === t.segments[0].length ? {
                            segments: [[i.segments[0][1], t.segments[0][1], i.segments[0][3], t.segments[0][3]]],
                            resolved: !0
                        } : {
                            segments: [],
                            resolved: !0
                        }
                    }(o.linearCoefficients, p) : F(d, p);
                    break;
                case s.PARAMETRIC_CURVE_3D:
                    return p.step || (p.step = (p.max - p.min) / 1e3),
                    n = p.max === p.min ? u(d, p.min) : F(d, p),
                    {
                        graphMode: s.PARAMETRIC_CURVE_3D,
                        segments: n.segments,
                        cacheKey: m.source + ":" + JSON.stringify(p),
                        color: o.color,
                        style: "dummy"
                    };
                case s.Z_3D:
                    return {
                        meshData: function(e, n) {
                            for (var i = e.fn, t = n.xmin, r = n.xmax, a = n.ymin, o = 30, s = (r - t) / 30, m = (n.ymax - a) / o, c = [], l = [], u = [], d = s / 1e3, p = m / 1e3, f = 0; f < 30; f++)
                                for (var h = 0; h < o; h++) {
                                    var v = t + f * s
                                      , g = a + h * m
                                      , x = i(v, g);
                                    c.push(v, g, x);
                                    var y = (i(v + d, g) - x) * p
                                      , F = (i(v, g + p) - x) * d
                                      , w = -d * p
                                      , P = Math.sqrt(y * y + F * F + w * w);
                                    l.push(y / P, F / P, w / P)
                                }
                            for (f = 0; f < 29; f++)
                                for (h = 0; h < 29; h++) {
                                    var M = h * o + f
                                      , b = h * o + f + 1
                                      , I = (h + 1) * o + f
                                      , k = (h + 1) * o + f + 1;
                                    u.push(M, I, b),
                                    u.push(I, k, b)
                                }
                            return {
                                cacheKey: e.source + ":" + JSON.stringify(n),
                                positions: new Float32Array(c),
                                normals: new Float32Array(l),
                                faces: new Int16Array(u)
                            }
                        }(m, p),
                        color: o.color,
                        graphMode: s.Z_3D,
                        poi: {
                            zeros: {
                                x: [],
                                y: []
                            },
                            extrema: {
                                x: [],
                                y: []
                            },
                            intercept: {
                                x: [],
                                y: []
                            }
                        },
                        compiled: m,
                        style: "dummy"
                    };
                default:
                    throw new Error("Programming Error: unexpected graphmode " + f)
                }
                t = n.poi
            } else
                n = {
                    segments: [],
                    resolved: !0
                };
            if ((!t || t.zeros.x.length + t.extrema.x.length + t.intercept.x.length > 250) && (t = {
                zeros: {
                    x: [],
                    y: []
                },
                extrema: {
                    x: [],
                    y: []
                },
                intercept: {
                    x: [],
                    y: []
                }
            }),
            f === s.X)
                for (var g in t)
                    if (t.hasOwnProperty(g)) {
                        var x = g;
                        i = t[x].y,
                        t[x].y = t[x].x,
                        t[x].x = i
                    }
            var w = {
                segments: n.segments,
                resolved: n.resolved,
                graphMode: f,
                color: o.color,
                style: o.lineStyle,
                lineWidth: o.lineWidth,
                lineOpacity: o.lineOpacity,
                listIndex: o.listIndex,
                operator: o.operator,
                poi: t,
                compiled: m
            };
            if (f === s.POLAR) {
                var M = p;
                w.sampledDomain = {
                    min: M.min,
                    max: M.max,
                    step: M.step
                }
            }
            return n.fillSegments && (w.fillSegments = n.fillSegments),
            w
        },
        computeDiscreteGraphData: function(e) {
            var n, i = e.viewState, t = e.graphInfo, r = e.compiled, a = e.maxOverride, o = e.showPoint, m = r.fn, l = P(i, t, m);
            l || (n = {
                segments: [],
                resolved: !0
            });
            var u = l
              , d = u.min
              , p = u.max
              , f = u.step
              , h = b((n = function(e) {
                for (var n = e.fn, i = e.domain, t = i.min, r = i.max, a = Math.floor(t), o = Math.ceil(r), s = [], m = a; m <= o; m++) {
                    var c = n(m);
                    isFinite(m) && isFinite(c) && s.push([m, c])
                }
                return {
                    segments: s,
                    resolved: !0
                }
            }({
                fn: m,
                domain: {
                    min: Math.max(d, 0),
                    max: void 0 !== a ? Math.min(a, p) : p,
                    step: f
                }
            })).segments);
            return {
                segments: [h.points],
                droppedIndices: h.droppedIndices,
                graphMode: s.XYPOINT,
                color: t.color,
                style: t.pointStyle,
                poi: c.default(n.segments),
                showPoint: o
            }
        },
        polygonsFromSegments: function(e, n, t) {
            for (var r = function(e) {
                var n = e[e.length - 1];
                return n[n.length - 2]
            }, a = [], o = 0, s = 0, m = [], c = [], l = -1 / 0, u = -1 / 0; ; ) {
                if (l <= u) {
                    if (o >= n.length)
                        break;
                    c.push(n[o++])
                }
                if (u <= l) {
                    if (s >= e.length)
                        break;
                    m.push(e[s++])
                }
                if (l = r(c),
                u = r(m),
                i.approx(l, u, 4)) {
                    a.push(M(m, c, t)),
                    c = [],
                    m = [];
                    var d = Math.max(l, u);
                    l = d,
                    u = d
                }
            }
            return a
        },
        dropUndefinedPoints: b
    }
});
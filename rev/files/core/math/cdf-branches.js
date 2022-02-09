
define('core/math/cdf-branches', ["require", "exports", "tslib", "core/lib/deepCopy", "core/math/plotter", "core/math/domaintypes", "core/types/styles"], function(require, e, o, n, i, t, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.makeContinuousCDFTopBranches = e.makeDiscreteCDFTopBranches = void 0;
    function d(e) {
        var o = e.viewState
          , d = e.graphInfo
          , r = e.compiled
          , s = e.bounds
          , p = e.included
          , u = e.showPoint
          , c = n.default(d)
          , h = t.intersectDomains(d.domainBound, t.knownDomain(s));
        if ("known" === h.type)
            return c.domainBound = h,
            c.pointStyle = p ? a.PointStyle.POINT : a.PointStyle.OPEN,
            i.default.computeDiscreteGraphData({
                graphInfo: c,
                viewState: o,
                compiled: r,
                showPoint: u,
                maxOverride: void 0
            })
    }
    e.makeDiscreteCDFTopBranches = function(e) {
        var n, i = e.viewState, t = e.graphInfo, a = e.compiled, r = e.bounds, s = e.maxOverride, p = e.showPoint, u = r[0], c = r[1], h = [];
        u = Math.ceil(u),
        c = Math.floor(c);
        var l, v, m, f, w, S = void 0 !== s ? s : 1 / 0;
        if (u === -1 / 0 && c >= S)
            n = d({
                bounds: [u, S],
                included: !0,
                viewState: i,
                graphInfo: t,
                compiled: a,
                showPoint: p
            }),
            h.push(n);
        else if (u === -1 / 0 && c < 1 / 0)
            n = d({
                bounds: [u, c],
                included: !0,
                viewState: i,
                graphInfo: t,
                compiled: a,
                showPoint: p
            }),
            h.push(n),
            h.push(d({
                bounds: [c + 1, S],
                included: !1,
                viewState: i,
                graphInfo: t,
                compiled: a,
                showPoint: p
            }));
        else if (u > -1 / 0 && c >= S)
            n = d({
                bounds: [u, S],
                included: !0,
                viewState: i,
                graphInfo: t,
                compiled: a,
                showPoint: p
            }),
            h.push(d({
                bounds: [-1 / 0, u - 1],
                included: !1,
                viewState: i,
                graphInfo: t,
                compiled: a,
                showPoint: p
            })),
            h.push(n);
        else {
            n = d({
                bounds: [u, c],
                included: !0,
                viewState: i,
                graphInfo: t,
                compiled: a,
                showPoint: p
            });
            var g = d({
                bounds: [-1 / 0, u - 1],
                included: !1,
                viewState: i,
                graphInfo: t,
                compiled: a,
                showPoint: p
            })
              , I = d({
                bounds: [c + 1, S],
                included: !1,
                viewState: i,
                graphInfo: t,
                compiled: a,
                showPoint: p
            });
            h.push(n);
            var b = void 0;
            g && I && (v = I,
            m = (l = g).segments[0],
            f = v.segments[0],
            w = [o.__spreadArray(o.__spreadArray([], m), f)],
            b = o.__assign(o.__assign({}, l), {
                segments: w
            }),
            h.push(b))
        }
        return {
            cdfTopBranch: n,
            topBranches: h
        }
    }
    ;
    e.makeContinuousCDFTopBranches = function(e) {
        var o = e.viewState
          , d = e.graphInfo
          , r = e.compiled
          , s = e.derivative
          , p = e.bounds;
        return {
            cdfTopBranch: function(e) {
                var o = e.viewState
                  , d = e.graphInfo
                  , r = e.compiled
                  , s = e.derivative
                  , p = e.bounds
                  , u = n.default(d)
                  , c = t.intersectDomains(d.domainBound, t.knownDomain(p));
                if ("known" === c.type)
                    return u.domainBound = c,
                    u.lineStyle = a.LineStyle.SOLID,
                    i.default.computeGraphData({
                        graphInfo: u,
                        viewState: o,
                        compiled: r,
                        derivative: s
                    })
            }({
                bounds: [p[0], p[1]],
                viewState: o,
                graphInfo: d,
                compiled: r,
                derivative: s
            }),
            topBranches: [i.default.computeGraphData({
                viewState: o,
                graphInfo: d,
                compiled: r,
                derivative: s
            })]
        }
    }
});
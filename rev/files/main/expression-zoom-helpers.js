define('main/expression-zoom-helpers', ["require", "exports", "core/lib/deepCopy"], function(require, i, n) {
    "use strict";
    function m(i) {
        var m = 1.2;
        return (i = n.default(i)).xmax < 0 && i.xmin < 0 && i.xmax / (i.xmin - i.xmax) < m && (i.xmax = 0),
        i.xmax > 0 && i.xmin > 0 && i.xmin / (i.xmax - i.xmin) < m && (i.xmin = 0),
        i.ymax < 0 && i.ymin < 0 && i.ymax / (i.ymin - i.ymax) < m && (i.ymax = 0),
        i.ymax > 0 && i.ymin > 0 && i.ymin / (i.ymax - i.ymin) < m && (i.ymin = 0),
        i
    }
    function x(i, n) {
        var m, x, a, t, e = i.type, r = function(i, n) {
            if ("dotplot" === i.type || "histogram" === i.type) {
                var m = 80 * Math.max(1, i.xmax - i.xmin) / (i.binWidth ? i.binWidth : 1)
                  , x = .5 * (n.screen.width - m) / m;
                return Math.max(.2, x)
            }
            return .5
        }(i, n), o = function(i) {
            return "boxplot" === i ? 3 : .5
        }(e);
        i.xmin === i.xmax && (i.xmin -= .5,
        i.xmax += .5),
        i.ymin === i.ymax && (i.ymin -= .5,
        i.ymax += .5);
        var y = i.xmax - i.xmin;
        m = i.xmin - r * y,
        x = i.xmax + r * y;
        var s = i.ymax - i.ymin;
        if (a = i.ymin - o * s,
        t = i.ymax + o * s,
        function(i) {
            return "boxplot" === i || "dotplot" === i || "histogram" == i
        }(e)) {
            var p = (x - m) * (n.screen.height / n.screen.width);
            if (p > i.ymax - i.ymin && p < function(i) {
                switch (i) {
                case "histogram":
                case "dotplot":
                    return 12;
                case "boxplot":
                    return 40
                }
                return 1 / 0
            }(e) * (i.ymax - i.ymin)) {
                var u = .5 * (i.ymax + i.ymin);
                t = u + .5 * p,
                a = u - .5 * p
            }
        }
        return {
            xmin: m,
            xmax: x,
            ymin: a,
            ymax: t
        }
    }
    function a(i, n) {
        for (var a = 1 / 0, t = -1 / 0, e = 1 / 0, r = -1 / 0, o = 0, y = i.length, s = 0; s < y; s++) {
            var p = m(i[s]);
            if (isFinite(p.xmax - p.xmin) && isFinite(p.ymax - p.ymin)) {
                var u = x(p, n);
                u.xmin < a && (a = u.xmin),
                u.xmax > t && (t = u.xmax),
                u.ymin < e && (e = u.ymin),
                u.ymax > r && (r = u.ymax)
            } else
                o += 1
        }
        if (o !== y)
            return {
                xmin: a,
                xmax: t,
                ymin: e,
                ymax: r
            }
    }
    Object.defineProperty(i, "__esModule", {
        value: !0
    }),
    i.getRecommendedViewportForExpression = i.shouldExpressionZoomFit = i.padViewport = i.conditionalExpandViewport = void 0,
    i.conditionalExpandViewport = m,
    i.padViewport = x,
    i.shouldExpressionZoomFit = function(i, n) {
        var m = a(i, n);
        if (!m)
            return !1;
        var x = n.mapx(m.xmin)
          , t = n.mapx(m.xmax)
          , e = n.mapy(m.ymin)
          , r = n.mapy(m.ymax);
        return !(Math.abs(x) <= 10 && Math.abs(r) <= 10 && Math.abs(t - n.screen.width) <= 10 && Math.abs(e - n.screen.height) <= 10)
    }
    ,
    i.getRecommendedViewportForExpression = a
});
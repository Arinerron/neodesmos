define('core/math/conics', ['require', 'numeric', 'core/math/distance', 'core/math/qr'], function(require) {
    "use strict";
    var r = require("numeric")
      , n = require("core/math/distance")
      , e = require("core/math/qr");
    function t(r, t) {
        return n.approx(1 / e.conditionNumber(e.qr(r)), 0, t)
    }
    var i = {
        isLine: function(r, n, e, i, o, a) {
            return t([[r, n, 1], [e, i, 1], [o, a, 1]])
        },
        isCircle: function(r, n, e, i, o, a, c, u) {
            return t([[r * r + n * n, r, n, 1], [e * e + i * i, e, i, 1], [o * o + a * a, o, a, 1], [c * c + u * u, c, u, 1]])
        },
        isConic: function(r, n, e, i, o, a, c, u, f, l, s, h) {
            return t([[r * r, n * n, 2 * r * n, r, n, 1], [e * e, i * i, 2 * e * i, e, i, 1], [o * o, a * a, 2 * o * a, o, a, 1], [c * c, u * u, 2 * c * u, c, u, 1], [f * f, l * l, 2 * f * l, f, l, 1], [s * s, h * h, 2 * s * h, s, h, 1]])
        },
        conicQuadraticParameters: function(n, e, t, i, o, a, c, u, f, l) {
            return {
                a: r.det([[e * e, 2 * n * e, n, e, 1], [i * i, 2 * t * i, t, i, 1], [a * a, 2 * o * a, o, a, 1], [u * u, 2 * c * u, c, u, 1], [l * l, 2 * f * l, f, l, 1]]),
                b: r.det([[n * n, e * e, n, e, 1], [t * t, i * i, t, i, 1], [o * o, a * a, o, a, 1], [c * c, u * u, c, u, 1], [f * f, l * l, f, l, 1]]),
                c: -r.det([[n * n, 2 * n * e, n, e, 1], [t * t, 2 * t * i, t, i, 1], [o * o, 2 * o * a, o, a, 1], [c * c, 2 * c * u, c, u, 1], [f * f, 2 * f * l, f, l, 1]])
            }
        },
        classifyConic: function(r, n, e, o, a, c, u, f, l, s, h, b) {
            if (i.isLine(r, n, a, c, h, b))
                return "line";
            if (i.isCircle(r, n, e, o, l, s, h, b))
                return "circle";
            if (!i.isConic(r, n, e, o, a, c, u, f, l, s, h, b))
                return "none";
            var d = i.conicQuadraticParameters(r, n, e, o, a, c, u, f, l, s);
            return t([[d.a, d.b], [d.b, d.c]], 20) ? "parabola" : d.b * d.b > d.a * d.c ? "hyperbola" : "ellipse"
        },
        classifyBranchConic: function(r) {
            var n, e;
            if (1 === r.length && 4 === r[0].length)
                return "line";
            for (var t = 0; t < r.length; t++) {
                var o = r[t]
                  , a = o.length;
                if (a < 12)
                    return "unknown";
                if ("none" === (e = i.classifyConic(o[0], o[1], o[2 * Math.floor(1 * a / 12)], o[2 * Math.floor(1 * a / 12) + 1], o[2 * Math.floor(2 * a / 12)], o[2 * Math.floor(2 * a / 12) + 1], o[2 * Math.floor(3 * a / 12)], o[2 * Math.floor(3 * a / 12) + 1], o[2 * Math.floor(4 * a / 12)], o[2 * Math.floor(4 * a / 12) + 1], o[a - 2], o[a - 1])))
                    return "none";
                if (n && e !== n)
                    return "none";
                n = e
            }
            return n
        }
    };
    return i
});
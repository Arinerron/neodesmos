
define('core/math/distance', ["require", "exports"], function(require, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.approx = t.pointToSegment = t.closestPointOnSegment = t.pointToSegmentParameter = t.mean = t.hypot = void 0;
    var n = Math.hypot && Math.hypot(1 / 0, NaN) === 1 / 0;
    function r(t) {
        return t === 1 / 0 || t === -1 / 0
    }
    function e(n, r, e, i, o, a, u, h, p) {
        var s = t.hypot(u - i, h - o, p - a);
        return 0 === s ? 0 : function(t, n, r, e, i, o) {
            return t * e + n * i + r * o
        }((n - i) / s, (r - o) / s, (e - a) / s, (u - i) / s, (h - o) / s, (p - a) / s)
    }
    function i(t, n, r, i, o, a) {
        var u = e(t, n, 0, r, i, 0, o, a, 0);
        return u <= 0 ? [r, i] : u >= 1 ? [o, a] : [r + u * (o - r), i + u * (a - i)]
    }
    t.hypot = n ? Math.hypot : function(t, n, e) {
        if (r(t) || r(n) || void 0 !== e && r(e))
            return 1 / 0;
        if (isNaN(t) || isNaN(n) || void 0 !== e && isNaN(e))
            return NaN;
        if (0 === t && 0 === n && (void 0 === e || 0 === e))
            return 0;
        for (var i = 0, o = 0, a = 0; a < arguments.length; a += 1) {
            var u = Math.abs(Number(arguments[a]));
            u > i && (o *= i / u * (i / u),
            i = u),
            o += 0 === u && 0 === i ? 0 : u / i * (u / i)
        }
        return i === 1 / 0 ? 1 / 0 : i * Math.sqrt(o)
    }
    ,
    t.mean = function(t, n) {
        return t > 0 == n > 0 ? t + .5 * (n - t) : .5 * (t + n)
    }
    ,
    t.pointToSegmentParameter = e,
    t.closestPointOnSegment = i,
    t.pointToSegment = function(n, r, e, o, a, u) {
        var h = i(n, r, e, o, a, u);
        return t.hypot(n - h[0], r - h[1])
    }
    ,
    t.approx = function(t, n, r) {
        if (void 0 === r && (r = 1),
        t === n)
            return !0;
        if (!isFinite(t) || !isFinite(n))
            return !1;
        if (r > 50)
            throw new Error("Within " + (52 - r) + " bits isn't really approximate any more");
        var e = Math.max(Math.max(Math.abs(t), Math.abs(n)), 1);
        return e === e + (1 === r ? .5 : Math.pow(.5, r)) * Math.abs(n - t)
    }
});
!function(n) {
    "use strict";
    function t(n, t) {
        var r = (65535 & n) + (65535 & t);
        return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r
    }
    function r(n, r, e, o, u, c) {
        return t((f = t(t(r, n), t(o, c))) << (i = u) | f >>> 32 - i, e);
        var f, i
    }
    function e(n, t, e, o, u, c, f) {
        return r(t & e | ~t & o, n, t, u, c, f)
    }
    function o(n, t, e, o, u, c, f) {
        return r(t & o | e & ~o, n, t, u, c, f)
    }
    function u(n, t, e, o, u, c, f) {
        return r(t ^ e ^ o, n, t, u, c, f)
    }
    function c(n, t, e, o, u, c, f) {
        return r(e ^ (t | ~o), n, t, u, c, f)
    }
    function f(n, r) {
        var f, i, a, h, d;
        n[r >> 5] |= 128 << r % 32,
        n[14 + (r + 64 >>> 9 << 4)] = r;
        var l = 1732584193
          , g = -271733879
          , v = -1732584194
          , m = 271733878;
        for (f = 0; f < n.length; f += 16)
            i = l,
            a = g,
            h = v,
            d = m,
            l = e(l, g, v, m, n[f], 7, -680876936),
            m = e(m, l, g, v, n[f + 1], 12, -389564586),
            v = e(v, m, l, g, n[f + 2], 17, 606105819),
            g = e(g, v, m, l, n[f + 3], 22, -1044525330),
            l = e(l, g, v, m, n[f + 4], 7, -176418897),
            m = e(m, l, g, v, n[f + 5], 12, 1200080426),
            v = e(v, m, l, g, n[f + 6], 17, -1473231341),
            g = e(g, v, m, l, n[f + 7], 22, -45705983),
            l = e(l, g, v, m, n[f + 8], 7, 1770035416),
            m = e(m, l, g, v, n[f + 9], 12, -1958414417),
            v = e(v, m, l, g, n[f + 10], 17, -42063),
            g = e(g, v, m, l, n[f + 11], 22, -1990404162),
            l = e(l, g, v, m, n[f + 12], 7, 1804603682),
            m = e(m, l, g, v, n[f + 13], 12, -40341101),
            v = e(v, m, l, g, n[f + 14], 17, -1502002290),
            l = o(l, g = e(g, v, m, l, n[f + 15], 22, 1236535329), v, m, n[f + 1], 5, -165796510),
            m = o(m, l, g, v, n[f + 6], 9, -1069501632),
            v = o(v, m, l, g, n[f + 11], 14, 643717713),
            g = o(g, v, m, l, n[f], 20, -373897302),
            l = o(l, g, v, m, n[f + 5], 5, -701558691),
            m = o(m, l, g, v, n[f + 10], 9, 38016083),
            v = o(v, m, l, g, n[f + 15], 14, -660478335),
            g = o(g, v, m, l, n[f + 4], 20, -405537848),
            l = o(l, g, v, m, n[f + 9], 5, 568446438),
            m = o(m, l, g, v, n[f + 14], 9, -1019803690),
            v = o(v, m, l, g, n[f + 3], 14, -187363961),
            g = o(g, v, m, l, n[f + 8], 20, 1163531501),
            l = o(l, g, v, m, n[f + 13], 5, -1444681467),
            m = o(m, l, g, v, n[f + 2], 9, -51403784),
            v = o(v, m, l, g, n[f + 7], 14, 1735328473),
            l = u(l, g = o(g, v, m, l, n[f + 12], 20, -1926607734), v, m, n[f + 5], 4, -378558),
            m = u(m, l, g, v, n[f + 8], 11, -2022574463),
            v = u(v, m, l, g, n[f + 11], 16, 1839030562),
            g = u(g, v, m, l, n[f + 14], 23, -35309556),
            l = u(l, g, v, m, n[f + 1], 4, -1530992060),
            m = u(m, l, g, v, n[f + 4], 11, 1272893353),
            v = u(v, m, l, g, n[f + 7], 16, -155497632),
            g = u(g, v, m, l, n[f + 10], 23, -1094730640),
            l = u(l, g, v, m, n[f + 13], 4, 681279174),
            m = u(m, l, g, v, n[f], 11, -358537222),
            v = u(v, m, l, g, n[f + 3], 16, -722521979),
            g = u(g, v, m, l, n[f + 6], 23, 76029189),
            l = u(l, g, v, m, n[f + 9], 4, -640364487),
            m = u(m, l, g, v, n[f + 12], 11, -421815835),
            v = u(v, m, l, g, n[f + 15], 16, 530742520),
            l = c(l, g = u(g, v, m, l, n[f + 2], 23, -995338651), v, m, n[f], 6, -198630844),
            m = c(m, l, g, v, n[f + 7], 10, 1126891415),
            v = c(v, m, l, g, n[f + 14], 15, -1416354905),
            g = c(g, v, m, l, n[f + 5], 21, -57434055),
            l = c(l, g, v, m, n[f + 12], 6, 1700485571),
            m = c(m, l, g, v, n[f + 3], 10, -1894986606),
            v = c(v, m, l, g, n[f + 10], 15, -1051523),
            g = c(g, v, m, l, n[f + 1], 21, -2054922799),
            l = c(l, g, v, m, n[f + 8], 6, 1873313359),
            m = c(m, l, g, v, n[f + 15], 10, -30611744),
            v = c(v, m, l, g, n[f + 6], 15, -1560198380),
            g = c(g, v, m, l, n[f + 13], 21, 1309151649),
            l = c(l, g, v, m, n[f + 4], 6, -145523070),
            m = c(m, l, g, v, n[f + 11], 10, -1120210379),
            v = c(v, m, l, g, n[f + 2], 15, 718787259),
            g = c(g, v, m, l, n[f + 9], 21, -343485551),
            l = t(l, i),
            g = t(g, a),
            v = t(v, h),
            m = t(m, d);
        return [l, g, v, m]
    }
    function i(n) {
        var t, r = "", e = 32 * n.length;
        for (t = 0; t < e; t += 8)
            r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);
        return r
    }
    function a(n) {
        var t, r = [];
        for (r[(n.length >> 2) - 1] = void 0,
        t = 0; t < r.length; t += 1)
            r[t] = 0;
        var e = 8 * n.length;
        for (t = 0; t < e; t += 8)
            r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
        return r
    }
    function h(n) {
        var t, r, e = "0123456789abcdef", o = "";
        for (r = 0; r < n.length; r += 1)
            t = n.charCodeAt(r),
            o += e.charAt(t >>> 4 & 15) + e.charAt(15 & t);
        return o
    }
    function d(n) {
        return unescape(encodeURIComponent(n))
    }
    function l(n) {
        return function(n) {
            return i(f(a(n), 8 * n.length))
        }(d(n))
    }
    function g(n, t) {
        return function(n, t) {
            var r, e, o = a(n), u = [], c = [];
            for (u[15] = c[15] = void 0,
            o.length > 16 && (o = f(o, 8 * n.length)),
            r = 0; r < 16; r += 1)
                u[r] = 909522486 ^ o[r],
                c[r] = 1549556828 ^ o[r];
            return e = f(u.concat(a(t)), 512 + 8 * t.length),
            i(f(c.concat(e), 640))
        }(d(n), d(t))
    }
    function v(n, t, r) {
        return t ? r ? g(t, n) : h(g(t, n)) : r ? l(n) : h(l(n))
    }
    "function" == typeof define && define.amd ? define('core/lib/md5', [], function() {
        return v
    }) : "object" == typeof module && module.exports ? module.exports = v : n.md5 = v
}(this);
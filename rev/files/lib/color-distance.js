define('lib/color-distance', ['require', 'underscore', 'lib/named-colors'], function(require) {
    "use strict";
    var r = require("underscore")
      , t = require("lib/named-colors");
    function n(n) {
        var a, i = [], u = n.toLowerCase();
        if ("rgb" === u.slice(0, 3))
            try {
                i = u.replace(/[^\d,]/g, "").split(",").slice(0, 3),
                i = r.map(i, function(r) {
                    return parseInt(r, 10)
                })
            } catch (r) {
                e(n)
            }
        else if ("#" === u[0]) {
            u = u.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/, function(r, t, n, e) {
                return t + t + n + n + e + e
            });
            try {
                i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/.exec(u).slice(1),
                i = r.map(i, function(r) {
                    return parseInt(r, 16)
                })
            } catch (r) {
                e(n)
            }
        } else
            i = t[u];
        return a = i,
        r.isArray(a) && 3 === a.length && r.every(a, function(r) {
            return Number.isInteger(r) && r >= 0 && r <= 255
        }) || e(n),
        {
            R: i[0],
            G: i[1],
            B: i[2]
        }
    }
    function e(r) {
        throw new Error("Invalid color string: " + r)
    }
    function a(t) {
        var n = t.R
          , e = t.G
          , a = t.B
          , i = [];
        return i[0] = .49 * n + .31 * e + .2 * a,
        i[1] = .17697 * n + .8124 * e + .01063 * a,
        i[2] = .01 * e + .99 * a,
        {
            X: (i = r.map(i, function(r) {
                return r / .17697
            }))[0],
            Y: i[1],
            Z: i[2]
        }
    }
    function i(r) {
        var t = r.X
          , n = r.Y
          , e = r.Z
          , a = [];
        return a[0] = 116 * u(n / 100) - 16,
        a[1] = 500 * (u(t / 95.047) - u(n / 100)),
        a[2] = 200 * (u(n / 100) - u(e / 108.883)),
        {
            L: a[0],
            a: a[1],
            b: a[2]
        }
    }
    function u(r) {
        var t = 6 / 29;
        return r > Math.pow(t, 3) ? Math.pow(r, 1 / 3) : r / (3 * t * t) + 4 / 29
    }
    function c(r, t) {
        return function(r, t) {
            var n = r.L
              , e = r.a
              , a = r.b
              , i = t.L
              , u = t.a
              , c = t.b
              , f = n - i
              , o = Math.sqrt(e * e + a * a)
              , s = o - Math.sqrt(u * u + c * c)
              , l = e - u
              , d = a - c
              , h = f / 1
              , p = s / (1 * (1 + .045 * o))
              , v = Math.sqrt(l * l + d * d - s * s) / (1 * (1 + .015 * o));
            return Math.sqrt(h * h + p * p + v * v)
        }(i(a(n(r))), i(a(n(t))))
    }
    return {
        str2rgb: n,
        difference: c,
        closestColor: function(t, n) {
            var e = r.map(n, function(r) {
                return c(t, r)
            })
              , a = r.min(e);
            return n[e.indexOf(a)]
        },
        isLightColor: function(r) {
            if ("string" != typeof r || !r)
                return !1;
            try {
                return c(r, "#fff") < 20
            } catch (r) {
                return !1
            }
        }
    }
});
define('graphing/integral-image', ["require", "exports"], function(require, t) {
    "use strict";
    function a(t, a, e) {
        return Math.max(a, Math.min(e, t))
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var e = function() {
        function t(t) {
            var a = t.data
              , e = t.width
              , i = t.height;
            this.imageData = t;
            for (var o = 1; o < e; o++)
                a[o] += a[o - 1];
            for (var r = 1; r < i; r++)
                a[r * e] += a[r * e - e];
            for (var h = e * i - e - i + 1, f = e - 1, n = 0; n < h; n++) {
                o = 1 + n % f;
                var u = (r = 1 + Math.floor(n / f)) * e
                  , g = o - 1 + u
                  , m = o + u - e
                  , l = o - 1 + u - e;
                a[u + o] += a[g] + a[m] - a[l]
            }
        }
        return t.prototype.getSumForValidRect = function(t) {
            var a = t.left - 1
              , e = t.right - 1
              , i = t.top - 1
              , o = t.bottom - 1
              , r = this.imageData.width
              , h = this.imageData.data
              , f = h[a + i * r]
              , n = h[e + i * r]
              , u = h[a + o * r]
              , g = h[e + o * r];
            return a >= 0 && i >= 0 ? g - n - u + f : a >= 0 ? g - u : i >= 0 ? g - n : g
        }
        ,
        t.prototype.getSum = function(t) {
            var e = {
                left: a(Math.floor(t.left), 0, this.imageData.width),
                right: a(Math.ceil(t.right), 0, this.imageData.width),
                top: a(Math.floor(t.top), 0, this.imageData.height),
                bottom: a(Math.ceil(t.bottom), 0, this.imageData.height)
            };
            return e.left >= e.right || e.top >= e.bottom ? 0 : this.getSumForValidRect(e)
        }
        ,
        t
    }();
    t.default = e
});
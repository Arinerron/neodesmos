
define('graphing/compute-async-screenshot-bounds', ["require", "exports", "lib/console"], function(require, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.computeBoundsFromScreenshotOpts = void 0,
    t.computeBoundsFromScreenshotOpts = function(t) {
        var e = t.mode
          , i = t.width
          , r = t.height
          , h = t.currentBounds
          , p = t.graphpaperAspectRatio
          , f = t.mathAspectRatio
          , m = t.mathBounds
          , l = i / r
          , b = h.left + h.width / 2
          , g = h.bottom + h.height / 2;
        if (void 0 === m.left != (void 0 === m.right) || void 0 === m.bottom != (void 0 === m.top))
            return o.warn('asyncScreenshot: cannot specify "left" bound without "right" or "bottom" bound without "top". Got: ' + m),
            h;
        var n, d, s, u, c, a, v, w, y, x = void 0 !== m.left && void 0 !== m.right, B = void 0 !== m.bottom && void 0 !== m.top, O = x && B;
        switch (e) {
        case "stretch":
            return O ? m : x ? {
                left: m.left,
                right: m.right,
                bottom: h.bottom,
                top: h.top
            } : B ? {
                left: h.left,
                right: h.right,
                bottom: m.bottom,
                top: m.top
            } : h;
        case "contain":
            return O ? (s = m.right - m.left,
            u = m.top - m.bottom,
            c = {
                x: m.left + s / 2,
                y: m.bottom + u / 2
            },
            l > s / u ? (n = (d = u / r) * f,
            {
                left: c.x - n * i / 2,
                right: c.x + n * i / 2,
                bottom: m.bottom,
                top: m.top
            }) : (d = (n = s / i) / f,
            {
                left: m.left,
                right: m.right,
                bottom: c.y - d * r / 2,
                top: c.y + d * r / 2
            })) : x ? (a = m.right - m.left,
            v = m.left + a / 2,
            l > a / h.height ? {
                left: v - (n = (d = h.height / r) * f) * i / 2,
                right: v + n * i / 2,
                bottom: h.bottom,
                top: h.top
            } : (d = (n = a / i) / f,
            {
                left: m.left,
                right: m.right,
                bottom: g - d * r / 2,
                top: g + d * r / 2
            })) : B ? (w = m.top - m.bottom,
            y = m.bottom + w / 2,
            l > h.width / w ? {
                left: b - (n = (d = w / r) * f) * i / 2,
                right: b + n * i / 2,
                bottom: m.bottom,
                top: m.top
            } : (d = (n = h.width / i) / f,
            {
                left: h.left,
                right: h.right,
                bottom: y - d * r / 2,
                top: y + d * r / 2
            })) : l > p ? {
                left: b - (n = (d = h.height / r) * f) * i / 2,
                right: b + n * i / 2,
                bottom: h.bottom,
                top: h.top
            } : (d = (n = h.width / i) / f,
            {
                left: h.left,
                right: h.right,
                bottom: g - d * r / 2,
                top: g + d * r / 2
            });
        case "preserveX":
            return O ? (s = m.right - m.left,
            u = m.top - m.bottom,
            c = {
                x: m.left + s / 2,
                y: m.bottom + u / 2
            },
            s / u,
            d = (n = s / i) / f,
            {
                left: m.left,
                right: m.right,
                bottom: c.y - d * r / 2,
                top: c.y + d * r / 2
            }) : B ? (w = m.top - m.bottom,
            y = m.bottom + w / 2,
            h.width / w,
            d = (n = h.width / i) / f,
            {
                left: h.left,
                right: h.right,
                bottom: y - d * r / 2,
                top: y + d * r / 2
            }) : x ? (d = (n = (a = m.right - m.left) / i) / f,
            {
                left: m.left,
                right: m.right,
                bottom: g - d * r / 2,
                top: g + d * r / 2
            }) : (d = (n = (a = h.right - h.left) / i) / f,
            {
                left: h.left,
                right: h.right,
                bottom: g - d * r / 2,
                top: g + d * r / 2
            });
        case "preserveY":
            return O ? ((s = m.right - m.left) / (u = m.top - m.bottom),
            n = (d = u / r) * f,
            {
                left: (c = {
                    x: m.left + s / 2,
                    y: m.bottom + u / 2
                }).x - n * i / 2,
                right: c.x + n * i / 2,
                bottom: m.bottom,
                top: m.top
            }) : x ? (a = m.right - m.left,
            v = m.left + a / 2,
            a / h.height,
            {
                left: v - (n = (d = h.height / r) * f) * i / 2,
                right: v + n * i / 2,
                bottom: h.bottom,
                top: h.top
            }) : B ? {
                left: b - (n = (d = (w = m.top - m.bottom) / r) * f) * i / 2,
                right: b + n * i / 2,
                bottom: m.bottom,
                top: m.top
            } : {
                left: b - (n = (d = (w = h.top - h.bottom) / r) * f) * i / 2,
                right: b + n * i / 2,
                bottom: h.bottom,
                top: h.top
            };
        default:
            return h
        }
    }
});
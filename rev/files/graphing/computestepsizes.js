
define('graphing/computestepsizes', ['require', './stepnumber', 'core/lib/label'], function(require) {
    "use strict";
    var t = require("./stepnumber")
      , e = require("core/lib/label")
      , i = {}
      , r = function(t, e, i, r) {
        var o = Math.ceil(t / i)
          , a = Math.floor(e / i)
          , n = 1 / i;
        if (!(o > a || a - o > 1e4))
            for (var s = o; s <= a; s++)
                r(s / n)
    };
    function o(t) {
        return t ? {
            base: 10,
            major: [t, 2 * t, 5 * t],
            minor: [4, 4, 5]
        } : i.RATIONAL_STEPS
    }
    return i.RATIONAL_STEPS = {
        base: 10,
        major: [1, 2, 5],
        minor: [5, 4, 5]
    },
    i.PI_STEPS = {
        base: 10,
        major: [Math.PI, 2 * Math.PI, 5 * Math.PI],
        minor: [4, 4, 5]
    },
    i.PI_FRAC_STEPS = {
        base: 2,
        major: [Math.PI / 3],
        minor: [3]
    },
    i.bestStep = function(t, e) {
        for (var i, r, o, a, n = 1 / 0, s = 0; s < e.major.length; s++)
            i = e.major[s],
            o = Math.ceil(Math.log(t / i) / Math.log(e.base)),
            (a = i * Math.pow(e.base, o)) < n && (r = (n = a) / e.minor[s]);
        return {
            major: n,
            minor: r
        }
    }
    ,
    i.countStepsInRange = function(t, e, i) {
        return 1 + (e - t) / i
    }
    ,
    i.calculateSpaceBetweenRects = function(t, e) {
        var i, r;
        return r = t.right < e.left ? e.left - t.right : e.right < t.left ? t.left - e.right : 0,
        i = t.bottom < e.top ? e.top - t.bottom : e.bottom < t.top ? t.top - e.bottom : 0,
        Math.max(i, r)
    }
    ,
    i.estimateMajors = function(t) {
        var e = t.screen.width
          , i = t.screen.height
          , r = t.viewport.xmax - t.viewport.xmin
          , o = t.viewport.ymax - t.viewport.ymin
          , a = t.settings.pixelsPerLabel;
        return {
            majorStepX: a / e * r,
            majorStepY: a / i * o
        }
    }
    ,
    i.cartesian = function(a) {
        var n, s = {}, m = Math.abs(a.settings.xAxisStep), S = Math.abs(a.settings.yAxisStep), p = a.viewport.xmax - a.viewport.xmin, v = a.viewport.ymax - a.viewport.ymin, x = e.value(m, p).string.indexOf("π") >= 0, u = e.value(S, v).string.indexOf("π") >= 0, j = i.countStepsInRange(a.viewport.xmin, a.viewport.xmax, m), h = i.countStepsInRange(a.viewport.ymin, a.viewport.ymax, S), b = i.estimateMajors(a), g = a.settings.labelSize;
        if (m && m !== Math.PI && j >= 3 && j < 100) {
            var c = 0;
            a.settings.xAxisNumbers && r(a.viewport.xmin, a.viewport.xmax, m, function(i) {
                var r = t(e.value(i, p), g);
                c = Math.max(r.getWidth(), c)
            }),
            n = c + 10,
            a.settings.xAxisNumbers || (n = 1 === a.settings.xAxisMinorSubdivisions ? 8 : 20),
            j * n <= a.screen.width && (s.majorStepX = m,
            s.minorStepX = 3 === m || 5 === m ? 1 : m / 4)
        }
        if (S && S !== Math.PI && h >= 3 && h < 100) {
            var f = 0;
            a.settings.yAxisNumbers && r(a.viewport.ymin, a.viewport.ymax, S, function(i) {
                var r = t(e.value(i, v), g);
                f = Math.max(r.getHeight(), f)
            }),
            n = f + 10,
            a.settings.yAxisNumbers || (n = 1 === a.settings.yAxisMinorSubdivisions ? 8 : 20),
            h * n <= a.screen.height && (s.majorStepY = S,
            s.minorStepY = 3 === S || 5 === S ? 1 : S / 4)
        }
        if (!s.majorStepX) {
            var M;
            M = x ? b.majorStepX >= 1 ? i.PI_STEPS : i.PI_FRAC_STEPS : o(m);
            var l = i.bestStep(b.majorStepX, M);
            s.majorStepX = l.major,
            s.minorStepX = l.minor
        }
        if (!s.majorStepY) {
            var A;
            A = u ? b.majorStepY >= 1 ? i.PI_STEPS : i.PI_FRAC_STEPS : o(S);
            var P = i.bestStep(b.majorStepY, A);
            s.majorStepY = P.major,
            s.minorStepY = P.minor
        }
        if (m === S) {
            var w = a.screen.width / p / (a.screen.height / v);
            w >= 1 && w <= 2 ? (s.majorStepX = s.majorStepY,
            s.minorStepX = s.minorStepY) : w <= 1 && w >= .5 && (s.majorStepY = s.majorStepX,
            s.minorStepY = s.minorStepX)
        }
        return a.settings.xAxisMinorSubdivisions > 0 && (s.minorStepX = s.majorStepX / a.settings.xAxisMinorSubdivisions),
        a.settings.yAxisMinorSubdivisions > 0 && (s.minorStepY = s.majorStepY / a.settings.yAxisMinorSubdivisions),
        s
    }
    ,
    i.polar = function(t) {
        var e = i.estimateMajors(t)
          , r = i.bestStep(e.majorStepX, i.RATIONAL_STEPS)
          , o = i.bestStep(e.majorStepY, i.RATIONAL_STEPS)
          , a = r.major > o.major ? r : o;
        return {
            majorStepR: a.major,
            minorStepR: a.minor
        }
    }
    ,
    i
});
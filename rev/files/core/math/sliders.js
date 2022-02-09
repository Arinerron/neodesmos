define('core/math/sliders', ["require", "exports"], function(require, e) {
    "use strict";
    function a(e, a) {
        var r = Math.round(1e6 * e) / 1e6;
        return Math.abs(r - e) < a ? r : e
    }
    function r(e) {
        var r = e.target
          , t = e.hardMin
          , i = e.hardMax
          , n = e.step
          , o = 1e-10;
        if (void 0 !== t && void 0 !== i && (o = Math.min(o, Math.abs(i - t) / 1e3)),
        n && (o = Math.min(o, n / 10)),
        void 0 !== t && (t = a(t, o)),
        void 0 !== i && (i = a(i, o)),
        e.forceSliderToMax && void 0 !== i && (r = i),
        t > i)
            return t;
        if (r <= t)
            return t;
        if (r >= i)
            return i;
        if (n) {
            var d = void 0 !== t ? t : 0;
            r = n * Math.round((r - d) / n) + d
        }
        var u = a(r, o);
        return (n || t === u || i === u) && (r = u),
        r <= t ? t : r >= i ? i : r
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.computeSoftMax = e.constrainSliderValueLikeEvaluator = e.determineWhichLimitsAreCompatibleWithValue = e.roundToReasonableDecimal = void 0,
    e.roundToReasonableDecimal = a,
    e.determineWhichLimitsAreCompatibleWithValue = function(e) {
        var a = !0
          , t = !0
          , i = !0;
        return void 0 !== e.hardMin && e.target < e.hardMin && (a = !1),
        void 0 !== e.hardMax && e.target > e.hardMax && (t = !1),
        e.step && r({
            target: e.target,
            step: e.step,
            hardMin: a ? e.hardMin : void 0,
            hardMax: t ? e.hardMax : void 0
        }) !== e.target && (i = !1),
        {
            min: a,
            max: t,
            step: i
        }
    }
    ,
    e.constrainSliderValueLikeEvaluator = r,
    e.computeSoftMax = function(e) {
        var a = e.storedMax
          , t = e.sliderValue
          , i = e.hardMin
          , n = e.step
          , o = 10;
        if (a > o && (o = a),
        t > o && (o = t),
        i > o && (o = i),
        n) {
            var d = r({
                target: o,
                hardMin: i,
                hardMax: void 0,
                step: n
            });
            o = d >= o ? d : d + n
        }
        return o
    }
});
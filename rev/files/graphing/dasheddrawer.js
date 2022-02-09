define('graphing/dasheddrawer', ["require", "exports", "./constants", "core/math/distance"], function(require, t, s, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.DashedDrawer = void 0;
    var e = function() {
        function t(t, i, e) {
            this.pattern = e,
            this.replen = this.pattern[0] + this.pattern[1],
            i / this.replen > s.MAX_DOTTED_SEGMENTS && (this.pattern[0] = i * this.pattern[0] / this.replen / s.MAX_DOTTED_SEGMENTS,
            this.pattern[1] = i * this.pattern[1] / this.replen / s.MAX_DOTTED_SEGMENTS),
            this.pstate = 0,
            this.dstaccum = 0,
            this.px = null,
            this.py = null,
            this.ctx = t
        }
        return t.getDashedPattern = function(t, s) {
            var i = 11 * t.lineWidth / (s ? 3.5 : 2.5);
            return [i, 7 * i / 11]
        }
        ,
        t.getDottedPattern = function(t, s, i) {
            var e = .5 * t.lineWidth * .1 / (i ? 3.5 : 2.5)
              , h = 8 * e / .1;
            return s && (h *= 2),
            [e, h]
        }
        ,
        t.getTotalSegmentLength = function(t) {
            if (t.length < 4)
                return 0;
            for (var s, e, h = 0, n = 0, r = t[0], a = t[1]; isNaN(r) || isNaN(a); ) {
                if ((n += 2) >= t.length)
                    return 0;
                r = t[n],
                a = t[n + 1]
            }
            for (n += 2; n < t.length; n += 2)
                s = t[n],
                e = t[n + 1],
                isNaN(s) || isNaN(e) || (h += i.hypot(s - r, e - a),
                r = s,
                a = e);
            return h
        }
        ,
        t.prototype.start = function(t, s) {
            this.ctx.desmos_batching || this.ctx.beginPath(),
            this.px = t,
            this.py = s
        }
        ,
        t.prototype.next = function(t, s) {
            if (null === this.px || null === this.py)
                throw new Error("Must call start before calling next");
            var i = this.pattern[this.pstate]
              , e = Math.sqrt(Math.pow(t - this.px, 2) + Math.pow(s - this.py, 2));
            if (e > 1e-5) {
                for (; e + this.dstaccum >= i; ) {
                    var h = t - this.px
                      , n = s - this.py
                      , r = i - this.dstaccum;
                    h *= r / e,
                    n *= r / e,
                    0 === this.pstate && (this.ctx.moveTo(this.px, this.py),
                    this.ctx.lineTo(this.px + h, this.py + n)),
                    this.dstaccum = 0,
                    this.px += h,
                    this.py += n,
                    this.pstate = 0 === this.pstate ? 1 : 0,
                    i = this.pattern[this.pstate],
                    e -= r
                }
                0 === this.pstate && (this.ctx.moveTo(this.px, this.py),
                this.ctx.lineTo(t, s))
            }
            this.px = t,
            this.py = s,
            this.dstaccum += e
        }
        ,
        t.prototype.close = function() {
            this.ctx.desmos_batching || this.ctx.stroke(),
            this.pstate = 0,
            this.dstaccum = 0,
            this.px = null,
            this.py = null
        }
        ,
        t.prototype.drawSegment = function(t) {
            for (var s, i, e = 0, h = t[0], n = t[1]; isNaN(h) || isNaN(n); ) {
                if ((e += 2) >= t.length)
                    return;
                h = t[e],
                n = t[e + 1]
            }
            for (this.start(h, n),
            e += 2; e < t.length; e += 2)
                s = t[e],
                i = t[e + 1],
                isNaN(s) || isNaN(i) || this.next(s, i);
            this.close()
        }
        ,
        t
    }();
    t.DashedDrawer = e
});
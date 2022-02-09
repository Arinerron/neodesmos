define('core/math/curve-accumulator', ["require", "exports", "core/math/distance"], function(require, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.Accumulator = void 0;
    var i = function() {
        function t(t) {
            t ? (this.xtolerance = t.xtolerance || t.tolerance || 0,
            this.ytolerance = t.ytolerance || t.tolerance || 0,
            this.ztolerance = t.ztolerance || t.tolerance || 0,
            this.map = t.map) : this.xtolerance = this.ytolerance = this.ztolerance = 0,
            this.segments = [],
            this.segment = [],
            this.pivotPoint = void 0,
            this.pendingPoint = void 0
        }
        return t.prototype.colinear = function(t, i, n) {
            this.map && (t = this.map(t),
            i = this.map(i),
            n = this.map(n));
            var s = e.pointToSegmentParameter(n[0], n[1], n[2] || 0, t[0], t[1], t[2] || 0, i[0], i[1], i[2] || 0);
            if (s < 1)
                return !1;
            var h = [t[0] + s * (i[0] - t[0]), t[1] + s * (i[1] - t[1]), 3 === t.length ? t[2] + s * (i[2] - t[2]) : 0];
            return Math.abs(n[0] - h[0]) <= this.xtolerance && Math.abs(n[1] - h[1]) <= this.ytolerance && (2 === t.length || Math.abs(n[2] - h[2]) <= this.ztolerance)
        }
        ,
        t.prototype.addPoint = function(t) {
            if (this.dimensions = t.length,
            this.xtolerance < 0 && this.ytolerance < 0 && (2 === this.dimensions || this.ztolerance < 0))
                this.segment.push.apply(this.segment, t);
            else if (this.segment.length) {
                var i = 2 === this.dimensions ? [this.segment[this.segment.length - 2], this.segment[this.segment.length - 1]] : [this.segment[this.segment.length - 3], this.segment[this.segment.length - 2], this.segment[this.segment.length - 1]];
                if (t[0] !== i[0] || t[1] !== i[1] || t[2] !== i[2]) {
                    if (!this.pivotPoint || !this.pendingPoint)
                        return this.pivotPoint = t,
                        void (this.pendingPoint = t);
                    (!this.colinear(i, this.pivotPoint, t) || e.hypot(i[0] - t[0], i[1] - t[1], (i[2] || 0) - (t[2] || 0)) < e.hypot(i[0] - this.pendingPoint[0], i[1] - this.pendingPoint[1], (i[2] || 0) - (this.pendingPoint[2] || 0))) && (this.flushPending(),
                    this.pivotPoint = t),
                    this.pendingPoint = t
                }
            } else
                this.segment.push.apply(this.segment, t)
        }
        ,
        t.prototype.flushPending = function() {
            this.pendingPoint && (this.segment.push.apply(this.segment, this.pendingPoint),
            this.pivotPoint = void 0,
            this.pendingPoint = void 0)
        }
        ,
        t.prototype.breakSegment = function() {
            this.flushPending(),
            this.segment.length > (this.dimensions || 2) && this.segments.push(this.segment),
            this.segment = []
        }
        ,
        t.prototype.getSegments = function() {
            return this.breakSegment(),
            this.segments
        }
        ,
        t.prototype.finish = function() {
            return {
                segments: this.getSegments(),
                resolved: !0
            }
        }
        ,
        t
    }();
    t.Accumulator = i
});
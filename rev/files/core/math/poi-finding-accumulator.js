define('core/math/poi-finding-accumulator', ["require", "exports", "core/math/workerconfig", "tslib", "./curve-accumulator", "./poi"], function(require, e, t, i, r, s) {
    "use strict";
    function u(e) {
        return Math.abs(e) < 5e-8
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var f = function(e) {
        function r(t, i, r) {
            var s = e.call(this, t) || this;
            return s.domain = t,
            s.fn = i,
            s.derivative = r,
            s.poiData = {
                zeros: {
                    x: [],
                    y: []
                },
                intercept: {
                    x: [],
                    y: []
                },
                extrema: {
                    x: [],
                    y: []
                }
            },
            s.zeroBuffer = [],
            s.extremumBuffer = [],
            s
        }
        return i.__extends(r, e),
        r.prototype.getPOI = function() {
            return t.pointsOfInterest ? (void 0 !== this.fn && (this.poiData.intercept = this.findIntercept(this.fn)),
            this.poiData) : {
                zeros: {
                    x: [],
                    y: []
                },
                intercept: {
                    x: [],
                    y: []
                },
                extrema: {
                    x: [],
                    y: []
                }
            }
        }
        ,
        r.prototype.addLinearZero = function(e) {
            var t = -e[0] / e[1];
            this.isOutsideDomain(t) || (this.poiData.zeros = {
                x: [t],
                y: [0]
            })
        }
        ,
        r.prototype.addLinearIntercept = function(e) {
            this.isOutsideDomain(0) || (this.poiData.intercept = {
                x: [0],
                y: [e[0]]
            })
        }
        ,
        r.prototype.isOutsideDomain = function(e) {
            return !this.domain || void 0 === this.domain.min || void 0 === this.domain.max || (e < this.domain.min || e > this.domain.max || isNaN(e))
        }
        ,
        r.prototype.addPoint = function(t) {
            0 === this.segment.length && u(t[1]) && (this.poiData.zeros.x.push(t[0]),
            this.poiData.zeros.y.push(t[1])),
            this.updateZeroBuffer(t),
            this.updateExtremumBuffer(t),
            e.prototype.addPoint.call(this, t)
        }
        ,
        r.prototype.updateZeroBuffer = function(e) {
            if (this.fn)
                if (isFinite(e[0]) && isFinite(e[1]))
                    switch (this.zeroBuffer.length) {
                    case 0:
                        if (u(e[1]))
                            return;
                        return void this.zeroBuffer.push(e);
                    case 1:
                        return 0 === e[1] ? void this.zeroBuffer.push(e) : e[1] > 0 != this.zeroBuffer[0][1] > 0 ? ((t = s.bisectZero(this.zeroBuffer[0][0], this.zeroBuffer[0][1], e[0], e[1], this.fn)) && (this.poiData.zeros.x.push(t[0]),
                        this.poiData.zeros.y.push(t[1])),
                        this.zeroBuffer.length = 0,
                        void this.zeroBuffer.push(e)) : (this.zeroBuffer.length = 0,
                        void this.zeroBuffer.push(e));
                    case 2:
                        if (0 === e[1])
                            return;
                        var t;
                        return e[1] > 0 != this.zeroBuffer[0][1] > 0 ? ((t = s.flatCenter(this.zeroBuffer[0][0], this.zeroBuffer[0][1], this.zeroBuffer[1][0], this.zeroBuffer[1][1], e[0], e[1], this.fn)) && (this.poiData.zeros.x.push(t[0]),
                        this.poiData.zeros.y.push(t[1])),
                        this.zeroBuffer.length = 0,
                        void this.zeroBuffer.push(e)) : (this.zeroBuffer.length = 0,
                        void this.zeroBuffer.push(e))
                    }
                else
                    this.zeroBuffer.length = 0
        }
        ,
        r.prototype.updateExtremumBuffer = function(e) {
            if (this.fn)
                if (isFinite(e[0]) && isFinite(e[1]))
                    switch (this.extremumBuffer.length) {
                    case 0:
                        return void this.extremumBuffer.push(e);
                    case 1:
                        return e[1] === this.extremumBuffer[0][1] && (this.extremumBuffer.length = 0),
                        void this.extremumBuffer.push(e);
                    case 2:
                        if (e[1] === this.extremumBuffer[1][1])
                            return void this.extremumBuffer.push(e);
                        if (e[1] > this.extremumBuffer[1][1] != this.extremumBuffer[1][1] > this.extremumBuffer[0][1]) {
                            if (t = this.bisectExtremumUsingDerivative(this.extremumBuffer[0][0], this.extremumBuffer[0][1], this.extremumBuffer[1][0], this.extremumBuffer[1][1], e[0], e[1]))
                                this.poiData.extrema.x.push(t[0]),
                                this.poiData.extrema.y.push(t[1]),
                                !!!s.bisectJump(this.extremumBuffer[0][0], this.extremumBuffer[0][1], t[0], t[1], e[0], e[1], this.fn, this.ytolerance) && t[0] > this.segment[this.segment.length - 2] && (this.pendingPoint = t);
                            return this.extremumBuffer.shift(),
                            void this.extremumBuffer.push(e)
                        }
                        return this.extremumBuffer.shift(),
                        void this.extremumBuffer.push(e);
                    case 3:
                        if (e[1] === this.extremumBuffer[1][1])
                            return;
                        if (e[1] > this.extremumBuffer[1][1] != this.extremumBuffer[1][1] > this.extremumBuffer[0][1]) {
                            var t = void 0
                              , i = .5 * (this.extremumBuffer[1][0] + this.extremumBuffer[2][0])
                              , r = this.fn(i);
                            return (t = r === this.extremumBuffer[1][1] ? s.flatCenter(this.extremumBuffer[0][0], this.extremumBuffer[0][1], this.extremumBuffer[1][0], this.extremumBuffer[1][1], e[0], e[1], this.fn) : this.bisectExtremumUsingDerivative(this.extremumBuffer[1][0], this.extremumBuffer[1][1], i, r, this.extremumBuffer[2][0], this.extremumBuffer[2][1])) && (this.poiData.extrema.x.push(t[0]),
                            this.poiData.extrema.y.push(t[1])),
                            this.extremumBuffer.shift(),
                            this.extremumBuffer.shift(),
                            void this.extremumBuffer.push(e)
                        }
                        return this.extremumBuffer.shift(),
                        this.extremumBuffer.shift(),
                        void this.extremumBuffer.push(e)
                    }
                else
                    this.zeroBuffer.length = 0
        }
        ,
        r.prototype.bisectExtremumUsingDerivative = function(e, t, i, r, u, f) {
            if (this.fn) {
                var h;
                if (this.derivative) {
                    var n = this.derivative(e)
                      , m = this.derivative(u);
                    if (!isNaN(n) && !isNaN(m) && n < 0 != m < 0) {
                        var o = s.bisectZero(e, n, u, m, this.derivative);
                        o && (h = [o[0], this.fn(o[0])])
                    }
                }
                return h || (h = s.bisectExtremum(e, t, i, r, u, f, this.fn)),
                h
            }
        }
        ,
        r.prototype.breakSegment = function() {
            this.zeroBuffer.length = 0,
            this.extremumBuffer.length = 0,
            this.flushPending(),
            this.segment.length > 2 && (this.segments.push(this.segment),
            u(this.segment[this.segment.length - 1]) && (this.poiData.zeros.x.push(this.segment[this.segment.length - 2]),
            this.poiData.zeros.y.push(this.segment[this.segment.length - 1]))),
            this.segment = []
        }
        ,
        r.prototype.findIntercept = function(e) {
            if (!e)
                return {
                    x: [],
                    y: []
                };
            var t = e(0);
            return isFinite(t) ? {
                x: [0],
                y: [e(0)]
            } : {
                x: [],
                y: []
            }
        }
        ,
        r.prototype.finish = function() {
            return {
                segments: this.getSegments(),
                resolved: !0,
                poi: this.getPOI()
            }
        }
        ,
        r
    }(r.Accumulator);
    e.default = f
});
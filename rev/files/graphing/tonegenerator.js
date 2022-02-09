define('graphing/tonegenerator', ["require", "exports", "bin!./poi.mp3", "browser", "bugsnag", "core/types/graphmode", "graphing/clipping"], function(require, e, t, n, i, a, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getReportedBranch = e.getFirstPlayableBranchIndex = e.canPlayBranch = e.canPlaySketch = void 0;
    var o = .0015
      , s = function() {
        function e(e) {
            var t = e.audioPointMove
              , n = e.animationFinished;
            this.audioSpeed = 50,
            this.audioVolume = .5,
            this.audioPointMove = t,
            this.animationFinished = n
        }
        return e.prototype.suspend = function() {
            this.playbackSupported && this.audioCtx && (this.stop(),
            this.audioCtx.suspend())
        }
        ,
        e.prototype.resume = function() {
            if (!this.audioCtx) {
                var e = window.AudioContext || window.webkitAudioContext;
                if (n.IS_IE)
                    this.playbackSupported = !1,
                    this.audioCtx = void 0;
                else
                    try {
                        this.audioCtx = e ? new e : void 0,
                        this.playbackSupported = !0
                    } catch (e) {
                        i.notify(e),
                        this.playbackSupported = !1,
                        this.audioCtx = void 0
                    }
            }
            this.playbackSupported && this.audioCtx && ("suspended" === this.audioCtx.state && this.audioCtx.resume(),
            this.loadPOI())
        }
        ,
        e.prototype.stop = function() {
            this.playTimeout && (cancelAnimationFrame(this.playTimeout),
            this.playTimeout = void 0),
            this.bufferSource && (this.bufferSource.stop(),
            this.bufferSource.disconnect(),
            this.bufferSource = void 0),
            this.animationFinished()
        }
        ,
        e.prototype.isAnimating = function() {
            return void 0 !== this.playTimeout
        }
        ,
        e.prototype.getAudioSpeed = function() {
            return this.audioSpeed
        }
        ,
        e.prototype.setAudioSpeed = function(e) {
            this.audioSpeed = e
        }
        ,
        e.prototype.getAudioVolume = function() {
            return this.audioVolume
        }
        ,
        e.prototype.setAudioVolume = function(e) {
            this.audioVolume = e,
            void 0 !== this.gainMaster && (this.gainMaster.gain.value = this.audioVolume)
        }
        ,
        e.prototype.getPlaybackSupported = function() {
            return this.playbackSupported
        }
        ,
        e.prototype.playBranchByIndex = function(e, t, n) {
            var i = this;
            if (!(t < 0 || t >= e.branches.length) && f(e.branches[t])) {
                this.playBranch(e.branches[t], t, n, function() {
                    return i.stop()
                })
            }
        }
        ,
        e.prototype.playSketch = function(e, t) {
            var n = this
              , i = e.branches;
            if (0 !== i.length) {
                var a = -1
                  , r = function() {
                    for (a += 1; a < i.length && !f(i[a]); )
                        a += 1;
                    a < i.length ? n.playBranch(i[a], a, t, r) : n.stop()
                };
                r()
            }
        }
        ,
        e.prototype.playPoint = function(e, t) {
            if (this.audioCtx && function(e) {
                switch (e.graphMode) {
                case a.X:
                case a.Y:
                case a.XYPOINT:
                case a.XYPOINT_MOVABLE:
                    return !0;
                default:
                    return !1
                }
            }(e)) {
                var n = this.audioCtx.sampleRate
                  , i = .075 * n
                  , r = this.audioCtx.createBuffer(2, i, n);
                !function(e, t, n, i) {
                    for (var r = e.sampleRate, o = e.getChannelData(0), s = e.getChannelData(1), h = t.graphMode, p = g(n, h), c = o.length - 1, f = {
                        amplitude: 0,
                        phase: 0,
                        noiseVal: 0,
                        lowerOctaveGain: 0,
                        upperOctaveGain: 0
                    }, m = function(e) {
                        switch (e.graphMode) {
                        case a.Y:
                        case a.XYPOINT:
                        case a.XYPOINT_MOVABLE:
                            return {
                                independent: e.x,
                                dependent: e.y
                            };
                        case a.X:
                            return {
                                independent: e.y,
                                dependent: e.x
                            };
                        default:
                            throw M(e.graphMode)
                        }
                    }(t), x = m.independent, v = m.dependent, y = u(h, x, p), C = 0; C < o.length; C++) {
                        f = d(f, {
                            independent: x,
                            dependent: v
                        }, p, r, (c - C) / r),
                        o[C] += f.amplitude * y.left,
                        s[C] += f.amplitude * y.right
                    }
                    i && void 0 !== t.intersects && l(i, e, 0, y)
                }(r, e, t, this.poiBuffer),
                this.connectBuffer(r)
            }
        }
        ,
        e.prototype.connectBuffer = function(e) {
            if (this.audioCtx) {
                this.gainMaster = this.audioCtx.createGain(),
                this.gainMaster.connect(this.audioCtx.destination),
                this.gainMaster.gain.value = this.audioVolume;
                var t = this.audioCtx.createBufferSource();
                this.bufferSource = t,
                t.buffer = e,
                t.connect(this.gainMaster),
                t.start()
            }
        }
        ,
        e.prototype.playBranch = function(e, t, n, i) {
            var o = this;
            if (this.audioCtx) {
                var s = this.audioSpeed / 10
                  , h = function(e, t, n) {
                    switch (e.graphMode) {
                    case a.Y:
                        for (var i = [], o = 0, s = e.segments; o < s.length; o++) {
                            var u = s[o];
                            (f = r.clipStrokeEdges(u, t)).length > 2 && i.push(f)
                        }
                        return {
                            graphMode: e.graphMode,
                            segments: i,
                            poi: e.poi
                        };
                    case a.X:
                        i = [];
                        for (var d = {
                            xmin: t.ymin,
                            xmax: t.ymax,
                            ymin: t.xmin,
                            ymax: t.ymax
                        }, h = 0, p = e.segments; h < p.length; h++) {
                            u = p[h];
                            (f = r.clipStrokeEdges(u, d)).length > 2 && i.push(f)
                        }
                        return {
                            graphMode: e.graphMode,
                            segments: i,
                            poi: e.poi
                        };
                    case a.XYPOINT:
                    case a.XYPOINT_MOVABLE:
                        var c = e.segments[0].slice();
                        c.sort(x);
                        i = [];
                        for (var l = 0; l < c.length; l++) {
                            var f, g = c[l], m = l > 0 ? c[l - 1][0] : -1 / 0, M = l < c.length - 1 ? c[c.length - 1][0] : 1 / 0, v = Math.max(g[0] - .5 * n, .5 * (g[0] + m)), y = Math.min(g[0] + .5 * n, .5 * (g[0] + M));
                            u = [v, g[1], y, g[1]];
                            (f = r.clipStrokeEdges(u, t)).length > 2 && i.push(f)
                        }
                        return {
                            graphMode: a.Y,
                            segments: i
                        };
                    default:
                        throw new Error("Unimplemented graph mode: " + e.graphMode)
                    }
                }(e, n, (n.xmax - n.xmin) * (.075 / s));
                if (h.segments.length) {
                    var p = g(n, h.graphMode)
                      , c = m(h)
                      , f = c.independentMin
                      , v = c.independentMax
                      , y = this.audioCtx.sampleRate
                      , C = s * (v - f) / (p.independentMax - p.independentMin)
                      , b = Math.floor(y * C)
                      , P = this.audioCtx.createBuffer(2, b, y);
                    !function(e, t, n, i) {
                        for (var r = e.sampleRate, o = e.getChannelData(0), s = e.getChannelData(1), h = t.graphMode, p = g(n, h), c = m(t), f = c.independentMin, x = c.independentMax, v = x - f, y = 0, C = 0, b = o.length - 1, P = b / r, S = {
                            amplitude: 0,
                            phase: 0,
                            noiseVal: 0,
                            lowerOctaveGain: 0,
                            upperOctaveGain: 0
                        }, B = 0; B < o.length; B++) {
                            for (var O = u(h, E = (b - B) / b * f + B / b * x, p); y < t.segments.length && t.segments[y][C] < E; )
                                (C += 2) >= t.segments[y].length && (y += 1,
                                C = 0);
                            var w = t.segments[y]
                              , I = NaN
                              , T = NaN;
                            if (w && w.length > 2 && C - 2 >= 0 && C + 1 < w.length) {
                                T = (w[w.length - 2] - E) * (P / v);
                                var A = w[C - 2]
                                  , X = w[C - 1]
                                  , Y = w[C]
                                  , N = Y - A;
                                I = (Y - E) / N * X + (E - A) / N * w[C + 1]
                            }
                            S = d(S, {
                                independent: E,
                                dependent: I
                            }, p, r, T),
                            o[B] += S.amplitude * O.left,
                            s[B] += S.amplitude * O.right
                        }
                        if (i && t.poi && t.poi.intersections)
                            for (var V = 0, k = function(e, t) {
                                if (e === a.X)
                                    return t.y;
                                if (e === a.Y)
                                    return t.x;
                                throw M(e)
                            }(h, t.poi.intersections); V < k.length; V++) {
                                var E = k[V];
                                l(i, e, B = Math.round((E - f) / (x - f) * b), u(h, E, p))
                            }
                    }(P, h, n, this.poiBuffer),
                    this.connectBuffer(P);
                    var S = this.audioCtx.currentTime
                      , B = function() {
                        if (void 0 !== o.playTimeout && cancelAnimationFrame(o.playTimeout),
                        o.audioCtx) {
                            var e = o.audioCtx.currentTime - S
                              , n = (C - e) / C * f + e / C * v;
                            o.audioPointMove(t, n),
                            e < C ? o.playTimeout = requestAnimationFrame(B) : i()
                        }
                    };
                    B()
                } else
                    requestAnimationFrame(i)
            }
        }
        ,
        e.prototype.loadPOI = function() {
            var e = this;
            this.playbackSupported && !this.poiBuffer && this.audioCtx && this.audioCtx.decodeAudioData(t.slice(0), function(t) {
                e.poiBuffer = t
            })
        }
        ,
        e
    }();
    function u(e, t, n) {
        if (e === a.X)
            return {
                left: 1,
                right: 1
            };
        var i = n.independentMin
          , r = n.independentMax
          , o = Math.abs((t - i) / (r - i));
        return isFinite(o) || (o = .5),
        o = Math.max(Math.min(o, 1), 0),
        {
            left: Math.cos(Math.PI / 2 * o),
            right: Math.sin(Math.PI / 2 * o)
        }
    }
    function d(e, t, n, i, a) {
        var r = t.independent
          , s = t.dependent
          , u = e.phase
          , d = e.noiseVal
          , p = e.lowerOctaveGain
          , l = e.upperOctaveGain
          , f = n.dependentMin
          , g = n.dependentMax
          , m = 0
          , M = 0
          , x = 0;
        !isNaN(s) && f <= s && s <= g ? (u += function(e) {
            return Math.min(Math.max(330 * Math.pow(2, e), 125), 2e3)
        }((s - f) / (g - f)) / i,
        a < .006 ? (M = 0,
        x = 0) : (M = .5,
        x = r >= 0 ? .15 : 0),
        s < 0 && (m += .1 * (d = c(d)))) : m += .04 * (d = c(d));
        return l += (x - l) / (i * o),
        {
            amplitude: m += (p += (M - p) / (i * o)) * h(u) + l * h(2 * u),
            phase: u,
            noiseVal: d,
            lowerOctaveGain: p,
            upperOctaveGain: l
        }
    }
    function h(e) {
        return .8782 * (p(e) + .25 * p(2 * e) + .25 * p(3 * e))
    }
    function p(e) {
        return Math.sin(2 * Math.PI * e)
    }
    function c(e) {
        return (e + .2 * (2 * Math.random() - 1)) / 1.02
    }
    function l(e, t, n, i) {
        for (var a = e.getChannelData(0), r = t.getChannelData(0), o = t.getChannelData(1), s = 0; s < a.length && s + n < r.length; s++)
            r[s + n] += a[s] * i.left,
            o[s + n] += a[s] * i.right
    }
    function f(e) {
        switch (e.graphMode) {
        case a.X:
        case a.Y:
        case a.XYPOINT:
        case a.XYPOINT_MOVABLE:
            return e.segments.length > 0;
        default:
            return !1
        }
    }
    function g(e, t) {
        switch (t) {
        case a.Y:
        case a.XYPOINT:
        case a.XYPOINT_MOVABLE:
            return {
                independentMin: e.xmin,
                independentMax: e.xmax,
                dependentMin: e.ymin,
                dependentMax: e.ymax
            };
        case a.X:
            return {
                independentMin: e.ymin,
                independentMax: e.ymax,
                dependentMin: e.xmin,
                dependentMax: e.xmax
            };
        default:
            throw M(t)
        }
    }
    function m(e) {
        var t = e.segments[0]
          , n = e.segments[e.segments.length - 1];
        return {
            independentMin: t[0],
            independentMax: n[n.length - 2]
        }
    }
    function M(e) {
        return "Unexpected graph mode. Received " + e
    }
    function x(e, t) {
        return e[0] - t[0]
    }
    e.default = s,
    e.canPlaySketch = function(e) {
        if (!e.visible)
            return !1;
        for (var t = 0, n = e.branches; t < n.length; t++) {
            if (f(n[t]))
                return !0
        }
        return !1
    }
    ,
    e.canPlayBranch = f,
    e.getFirstPlayableBranchIndex = function(e) {
        for (var t = 0; t < e.branches.length; t++)
            if (f(e.branches[t]))
                return t;
        return 0
    }
    ,
    e.getReportedBranch = function(e, t) {
        for (var n = 0, i = 0; i <= t; i++)
            f(e.branches[i]) && (n += 1);
        return n
    }
});
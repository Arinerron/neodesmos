define('graphing/graphsketch', ["require", "exports", "core/math/poi-type", "core/types/graphmode", "./poi", "core/math/poi-type", "lib/mathspeak"], function(require, e, t, i, s, h, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.GraphSketch = void 0;
    var o = function() {
        function e(e, i) {
            var s = this;
            this.color = "#000000",
            this.style = "normal",
            this.visible = !0,
            this.showPOI = !1,
            this.showHighlight = !1,
            this.selected = !1,
            this.labels = [],
            this.id = e,
            this.branches = void 0 !== i ? i : [],
            this.getPOI().forEach(function(e) {
                e.type === t.LABEL && s.labels.push(e)
            })
        }
        return e.prototype.getPOI = function() {
            if (this.__cachedPOI)
                return this.__cachedPOI;
            this.__cachedPOI = [],
            this.__cachedPOIIds = {};
            for (var e = 0; e < this.branches.length; e++) {
                var s = this.branches[e];
                if (s.graphMode === i.X || s.graphMode === i.Y)
                    (h = s.poi).zeros && this._pushPOI(h.zeros, e, t.ZERO),
                    h.intercept && this._pushPOI(h.intercept, e, t.INTERCEPT),
                    h.extrema && this._pushPOI(h.extrema, e, t.EXTREMUM),
                    h.intersections && this._pushPOI(h.intersections, e, t.INTERSECTION);
                else if (s.graphMode === i.XYPOINT || s.graphMode === i.XYPOINT_MOVABLE) {
                    var h = s.poi
                      , a = s.graphMode === i.XYPOINT && !0 === s.interactiveLabel;
                    if (!0 === s.showLabel || a) {
                        var o = s.nakedLabel;
                        h.defined && this._pushPOI(h.defined, e, t.LABEL, o)
                    } else
                        h.defined && this._pushPOI(h.defined, e, t.DEFINITION)
                }
            }
            return this.__cachedPOI
        }
        ,
        e.prototype.getBranchPOI = function(e) {
            return this.getPOI().filter(function(t) {
                return t.branch === e
            })
        }
        ,
        e.prototype.getMovablePoints = function() {
            if (this.__cachedMovablePoints)
                return this.__cachedMovablePoints;
            this.__cachedMovablePoints = [];
            var e = this.branches[0];
            if (e && 1 === e.segments.length && e.graphMode === i.XYPOINT_MOVABLE)
                for (var t = e.segments[0], s = 0; s < t.length; s++) {
                    var h = void 0;
                    e.tableId && (h = {
                        tableId: e.tableId,
                        columnId: this.id,
                        rowIndex: e.movablePointInfo[s].index,
                        dragX: e.movablePointInfo[s].dragX,
                        dragY: e.movablePointInfo[s].dragY
                    });
                    var o = e.scaleFactors ? e.scaleFactors[0][s] : void 0
                      , c = h ? h.rowIndex : s
                      , r = 1 === e.segments.length && e.labels && e.labels[s] ? e.labels[s] : void 0
                      , n = e.hasOwnProperty("pointOpacity") ? e.pointOpacity : 1;
                    this.__cachedMovablePoints.push({
                        type: "movable-point",
                        id: "movable:[" + this.id + "," + c + "]",
                        sketch: this,
                        color: this.color,
                        pointOpacity: n,
                        tableInfo: h,
                        scaleFactor: o,
                        x: t[s][0],
                        y: t[s][1],
                        label: r,
                        ariaLabel: r && a.getMathspeakFromText(r)
                    })
                }
            return this.__cachedMovablePoints
        }
        ,
        e.prototype.getMovablePointByIndex = function(e) {
            return this.getMovablePoints()[e]
        }
        ,
        e.prototype.getStaticLabeledPoints = function() {
            var e = this;
            if (this.__cachedStaticLabeledPoints)
                return this.__cachedStaticLabeledPoints;
            var t = this.branches[0];
            return this.__cachedStaticLabeledPoints = [],
            this.getPOI().forEach(function(s) {
                if ((s.type === h.DEFINITION || s.type === h.LABEL) && t.graphMode === i.XYPOINT) {
                    var o = t.showLabel
                      , c = s.getLabel();
                    (o || "" !== c) && e.__cachedStaticLabeledPoints.push({
                        type: "static-labeled-point",
                        id: "static[" + e.id + "," + s.id + "]",
                        x: s.x,
                        y: s.y,
                        sketch: s.sketch,
                        label: c,
                        ariaLabel: "" !== c ? a.getMathspeakFromText(c) : void 0
                    })
                }
            }),
            this.__cachedStaticLabeledPoints
        }
        ,
        e.prototype._pushPOI = function(e, t, i, h) {
            void 0 === h && (h = !1);
            for (var a = 0, o = e.x.length; a < o; a++) {
                var c = new s.POI(e.x[a],e.y[a],i,this,t,a,h);
                e.intersects && (c.intersects = e.intersects[a]),
                this.__cachedPOI.push(c),
                this.__cachedPOIIds[c.id] = c
            }
        }
        ,
        e.prototype.updateIntersections = function(e) {
            for (var s = this, h = 0, a = this.branches.length; h < a; h++) {
                (c = this.branches[h]).graphMode !== i.ERROR && (c.poi.intersections = e[h])
            }
            var o = this.__cachedPOI;
            this.__cachedPOI = [],
            o.forEach(function(e) {
                e.type !== t.INTERSECTION ? s.__cachedPOI.push(e) : delete s.__cachedPOIIds[e.id]
            });
            for (h = 0; h < this.branches.length; h++) {
                var c;
                if ((c = this.branches[h]).graphMode === i.X || c.graphMode === i.Y) {
                    var r = c.poi;
                    r.intersections && this._pushPOI(r.intersections, h, t.INTERSECTION)
                }
            }
        }
        ,
        e.prototype.getPOIById = function(e) {
            return this.__cachedPOIIds[e]
        }
        ,
        e.prototype.updateFrom = function(e) {
            if (e) {
                this.visible = !0,
                this.showPOI = e.showPOI,
                this.showHighlight = e.showHighlight,
                this.selected = e.selected;
                var t = this.branches[0].graphMode;
                if (t === i.XYPOINT || t === i.XYPOINT_MOVABLE) {
                    for (var s = !0, h = 0; h < this.__cachedPOI.length; h++) {
                        var a = e.__cachedPOI[h]
                          , o = this.__cachedPOI[h];
                        if (!a || a.type !== o.type) {
                            s = !1;
                            break
                        }
                    }
                    if (s)
                        for (h = 0; h < this.__cachedPOI.length; h++) {
                            a = e.__cachedPOI[h],
                            o = this.__cachedPOI[h];
                            delete this.__cachedPOIIds[o.id],
                            this.__cachedPOIIds[a.id] = o,
                            o.id = a.id
                        }
                }
            }
        }
        ,
        e
    }();
    e.GraphSketch = o
});
!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define('base64', [], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).base64js = e()
    }
}(function() {
    return function e(r, t, n) {
        function o(i, u) {
            if (!t[i]) {
                if (!r[i]) {
                    var a = "function" == typeof require && require;
                    if (!u && a)
                        return a(i, !0);
                    if (f)
                        return f(i, !0);
                    var d = new Error("Cannot find module '" + i + "'");
                    throw d.code = "MODULE_NOT_FOUND",
                    d
                }
                var c = t[i] = {
                    exports: {}
                };
                r[i][0].call(c.exports, function(e) {
                    var t = r[i][1][e];
                    return o(t || e)
                }, c, c.exports, e, r, t, n)
            }
            return t[i].exports
        }
        for (var f = "function" == typeof require && require, i = 0; i < n.length; i++)
            o(n[i]);
        return o
    }({
        "/": [function(require, e, r) {
            "use strict";
            r.byteLength = function(e) {
                return 3 * e.length / 4 - a(e)
            }
            ,
            r.toByteArray = function(e) {
                var r, t, f, i, u, d, c = e.length;
                u = a(e),
                d = new o(3 * c / 4 - u),
                f = u > 0 ? c - 4 : c;
                var h = 0;
                for (r = 0,
                t = 0; r < f; r += 4,
                t += 3)
                    i = n[e.charCodeAt(r)] << 18 | n[e.charCodeAt(r + 1)] << 12 | n[e.charCodeAt(r + 2)] << 6 | n[e.charCodeAt(r + 3)],
                    d[h++] = i >> 16 & 255,
                    d[h++] = i >> 8 & 255,
                    d[h++] = 255 & i;
                2 === u ? (i = n[e.charCodeAt(r)] << 2 | n[e.charCodeAt(r + 1)] >> 4,
                d[h++] = 255 & i) : 1 === u && (i = n[e.charCodeAt(r)] << 10 | n[e.charCodeAt(r + 1)] << 4 | n[e.charCodeAt(r + 2)] >> 2,
                d[h++] = i >> 8 & 255,
                d[h++] = 255 & i);
                return d
            }
            ,
            r.fromByteArray = function(e) {
                for (var r, n = e.length, o = n % 3, f = "", i = [], u = 16383, a = 0, c = n - o; a < c; a += u)
                    i.push(d(e, a, a + u > c ? c : a + u));
                1 === o ? (r = e[n - 1],
                f += t[r >> 2],
                f += t[r << 4 & 63],
                f += "==") : 2 === o && (r = (e[n - 2] << 8) + e[n - 1],
                f += t[r >> 10],
                f += t[r >> 4 & 63],
                f += t[r << 2 & 63],
                f += "=");
                return i.push(f),
                i.join("")
            }
            ;
            for (var t = [], n = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, u = f.length; i < u; ++i)
                t[i] = f[i],
                n[f.charCodeAt(i)] = i;
            function a(e) {
                var r = e.length;
                if (r % 4 > 0)
                    throw new Error("Invalid string. Length must be a multiple of 4");
                return "=" === e[r - 2] ? 2 : "=" === e[r - 1] ? 1 : 0
            }
            function d(e, r, n) {
                for (var o, f, i = [], u = r; u < n; u += 3)
                    o = (e[u] << 16) + (e[u + 1] << 8) + e[u + 2],
                    i.push(t[(f = o) >> 18 & 63] + t[f >> 12 & 63] + t[f >> 6 & 63] + t[63 & f]);
                return i.join("")
            }
            n["-".charCodeAt(0)] = 62,
            n["_".charCodeAt(0)] = 63
        }
        , {}]
    }, {}, [])("/")
});
define('graphing/viewport', ["require", "exports"], function(require, t) {
    "use strict";
    function i(t, i) {
        return t + 1e-8 * (i - t) > t && i - t > 1e-300 && i - t < 1e300
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.Viewport = void 0;
    var s = function() {
        function t(t, i, s, h) {
            void 0 === t && (t = -10),
            void 0 === i && (i = 10),
            void 0 === s && (s = -10),
            void 0 === h && (h = 10),
            this.xmin = t,
            this.xmax = i,
            this.ymin = s,
            this.ymax = h
        }
        return t.fromObject = function(i) {
            return new t(i.xmin,i.xmax,i.ymin,i.ymax)
        }
        ,
        t.prototype.toObject = function() {
            return {
                xmin: this.xmin,
                ymin: this.ymin,
                xmax: this.xmax,
                ymax: this.ymax
            }
        }
        ,
        t.prototype.equals = function(t) {
            return this.xmin === t.xmin && (this.ymin === t.ymin && (this.xmax === t.xmax && this.ymax === t.ymax))
        }
        ,
        t.prototype.isXValid = function() {
            return i(this.xmin, this.xmax)
        }
        ,
        t.prototype.isYValid = function() {
            return i(this.ymin, this.ymax)
        }
        ,
        t.prototype.isValid = function() {
            return this.isXValid() && this.isYValid()
        }
        ,
        t.prototype.isSquare = function(t) {
            return Math.abs(t.height - t.width * this.aspectRatio()) < 1
        }
        ,
        t.prototype.aspectRatio = function() {
            return (this.ymax - this.ymin) / (this.xmax - this.xmin)
        }
        ,
        t.prototype.squareXAxis = function(i) {
            var s = this.xmax - this.xmin
              , h = this.ymax - this.ymin
              , a = this.xmin + s / 2
              , n = h / i.height * i.width;
            return new t(a - n / 2,a + n / 2,this.ymin,this.ymax)
        }
        ,
        t.prototype.squareYAxis = function(i) {
            var s = this.xmax - this.xmin
              , h = this.ymax - this.ymin
              , a = this.ymin + h / 2
              , n = s / i.width * i.height;
            return new t(this.xmin,this.xmax,a - n / 2,a + n / 2)
        }
        ,
        t.prototype.squareCrop = function(t) {
            return this.aspectRatio() > t.height / t.width ? this.squareYAxis(t) : this.squareXAxis(t)
        }
        ,
        t.prototype.polarDiameter = function() {
            var t = Math.abs(this.xmax)
              , i = Math.abs(this.xmin)
              , s = Math.abs(this.ymax)
              , h = Math.abs(this.ymin);
            return 1.5 * Math.max(t, i, s, h)
        }
        ,
        t.prototype.largestR = function() {
            return Math.sqrt(Math.pow(Math.max(-this.xmin, this.xmax), 2) + Math.pow(Math.max(-this.ymin, this.ymax), 2))
        }
        ,
        t.prototype.smallestR = function() {
            return this.xmin <= 0 && this.xmax >= 0 && this.ymin <= 0 && this.ymax >= 0 ? 0 : this.xmin <= 0 && this.xmax >= 0 ? Math.min(Math.abs(this.ymin), Math.abs(this.ymax)) : this.ymin <= 0 && this.ymax >= 0 ? Math.min(Math.abs(this.xmin), Math.abs(this.xmax)) : Math.sqrt(Math.pow(Math.max(this.xmin, -this.xmax), 2) + Math.pow(Math.max(this.ymin, -this.ymax), 2))
        }
        ,
        t
    }();
    t.Viewport = s
});
define('core/math/recttransformation', ["require", "exports"], function(require, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.RT = void 0;
    var s = function() {
        function t(t, s, i, o) {
            void 0 === t && (t = 0),
            void 0 === s && (s = 0),
            void 0 === i && (i = 1),
            void 0 === o && (o = i),
            this.tx = t,
            this.ty = s,
            this.sx = i,
            this.sy = o
        }
        return t.prototype.toJSON = function() {
            return {
                tx: this.tx,
                ty: this.ty,
                sx: this.sx,
                sy: this.sy
            }
        }
        ,
        t.prototype.compose = function(s) {
            return new t(this.sx * s.tx + this.tx,this.sy * s.ty + this.ty,this.sx * s.sx,this.sy * s.sy)
        }
        ,
        t.prototype.translate = function(s, i) {
            var o = void 0 === i ? s.x : i.x - s.x
              , n = void 0 === i ? s.y : i.y - s.y;
            return new t(this.tx + o,this.ty + n,this.sx,this.sy)
        }
        ,
        t.prototype.scale = function(s, i) {
            return t.scale(s, i).compose(this)
        }
        ,
        t.prototype.scaleAtPoint = function(s, i, o) {
            return void 0 === o && (o = i),
            t.scaleAtPoint(s, i, o).compose(this)
        }
        ,
        t.prototype.inverse = function() {
            return new t(-this.tx / this.sx,-this.ty / this.sy,1 / this.sx,1 / this.sy)
        }
        ,
        t.prototype.div = function(s) {
            return new t((this.tx * s.sx - this.sx * s.tx) / s.sx,(this.ty * s.sy - this.sy * s.ty) / s.sy,this.sx / s.sx,this.sy / s.sy)
        }
        ,
        t.prototype.conjugate = function(s) {
            return new t(this.tx * s.sx + s.tx * (1 - this.sx),this.ty * s.sy + s.ty * (1 - this.sy),this.sx,this.sy)
        }
        ,
        t.prototype.pow = function(s) {
            return new t(this.tx * i(this.sx, s),this.ty * i(this.sy, s),Math.pow(this.sx, s),Math.pow(this.sy, s))
        }
        ,
        t.prototype.mapX = function(t) {
            return this.sx * t + this.tx
        }
        ,
        t.prototype.mapY = function(t) {
            return this.sy * t + this.ty
        }
        ,
        t.prototype.mapPoint = function(t) {
            return {
                x: this.mapX(t.x),
                y: this.mapY(t.y)
            }
        }
        ,
        t.prototype.mapRect = function(t) {
            return {
                left: this.mapX(t.left),
                right: this.mapX(t.right),
                bottom: this.mapY(t.bottom),
                top: this.mapY(t.top)
            }
        }
        ,
        t.scale = function(s, i) {
            return void 0 === i && (i = s),
            new t(0,0,s,i)
        }
        ,
        t.translate = function(s, i) {
            return (new t).translate(s, i)
        }
        ,
        t.scaleAtPoint = function(s, i, o) {
            return void 0 === o && (o = i),
            void 0 === o && (o = i),
            new t(s.x * (1 - i),s.y * (1 - o),i,o)
        }
        ,
        t.fromRects = function(s, i) {
            var o = (i.right - i.left) / (s.right - s.left)
              , n = (i.top - i.bottom) / (s.top - s.bottom);
            return new t(i.left - o * s.left,i.bottom - n * s.bottom,o,n)
        }
        ,
        t.fromJSON = function(s) {
            return new t(s.tx,s.ty,s.sx,s.sy)
        }
        ,
        t
    }();
    function i(t, s) {
        var i = t - 1;
        return 1 + i * i * i == 1 ? s * (1 + i * (s - 1) * (.5 + 1 / 6 * i * (s - 2))) : (Math.pow(t, s) - 1) / i
    }
    t.RT = s
});
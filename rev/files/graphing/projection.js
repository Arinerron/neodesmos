define('graphing/projection', ["require", "exports", "core/math/recttransformation"], function(require, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.Projection = void 0;
    var o = function() {
        function t(t, o, i) {
            this.screen = t,
            this.viewport = o,
            this.settings = i,
            this.mathCoordinates = function(t) {
                return {
                    left: t.xmin,
                    right: t.xmax,
                    bottom: t.ymin,
                    top: t.ymax
                }
            }(o),
            this.pixelCoordinates = function(t) {
                return {
                    left: 0,
                    right: t.width,
                    top: 0,
                    bottom: t.height
                }
            }(t),
            this.mathToPixels = e.RT.fromRects(this.mathCoordinates, this.pixelCoordinates),
            this.pixelsToMath = e.RT.fromRects(this.pixelCoordinates, this.mathCoordinates)
        }
        return t.prototype.mapx = function(t) {
            return this.mathToPixels.mapX(t)
        }
        ,
        t.prototype.mapy = function(t) {
            return this.mathToPixels.mapY(t)
        }
        ,
        t.prototype.map_pt = function(t) {
            return this.mathToPixels.mapPoint(t)
        }
        ,
        t.prototype.reverse_mapx = function(t) {
            return this.pixelsToMath.mapX(t)
        }
        ,
        t.prototype.reverse_mapy = function(t) {
            return this.pixelsToMath.mapY(t)
        }
        ,
        t.prototype.reverse_map_pt = function(t) {
            return this.pixelsToMath.mapPoint(t)
        }
        ,
        t.prototype.coordsAreOnscreen = function(t, e, o) {
            return t > -(o = void 0 === o ? 0 : o) && e > -o && t < this.screen.width + o && e < this.screen.height + o
        }
        ,
        t.prototype.closestPointOnScreen = function(t) {
            var e = this.pixelCoordinates;
            return {
                x: Math.min(Math.max(t.x, e.left), e.right),
                y: Math.min(Math.max(t.y, e.top), e.bottom)
            }
        }
        ,
        t
    }();
    t.Projection = o
});
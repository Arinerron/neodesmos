define('graphing/draw-image-to-ctx', ["require", "exports", "graphing-calc/models/list", "./svg-classes"], function(require, e, a, t) {
    "use strict";
    var r;
    function i(e, a) {
        if (r && r.color === a && r.img === e)
            return r.canvas;
        r ? (r.color = a,
        r.img = e) : r = {
            color: a,
            img: e,
            canvas: document.createElement("canvas")
        };
        var t = r.canvas;
        t.width = 0,
        t.width = e.width,
        t.height = e.height;
        var i = t.getContext("2d");
        return i.drawImage(e, 0, 0),
        i.fillStyle = a,
        i.globalCompositeOperation = "source-atop",
        i.fillRect(0, 0, e.width, e.height),
        t
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.drawImageToCtx = void 0,
    e.drawImageToCtx = function(e, r, s) {
        var l = e.formula;
        if (l && l.dimensions.x)
            for (var o = l.dimensions, c = 0; c < o.x.length; c++) {
                var d = o.x[c]
                  , n = o.y[c]
                  , g = o.width[c]
                  , m = o.height[c]
                  , h = o.radianAngle[c];
                if (isFinite(d) && isFinite(n) && isFinite(g) && isFinite(m) && isFinite(h)) {
                    t.save(r, "dcg-svg-image"),
                    r.save(),
                    t.restore(r),
                    r.globalAlpha = o.opacity[c];
                    var b = s.mapy(m) - s.mapy(0)
                      , v = s.mapx(g) - s.mapx(0)
                      , p = 0 === h ? 1 : Math.abs(v / g * (m / b))
                      , u = s.mapx(d)
                      , y = s.mapy(n)
                      , O = m < 0 ? -1 : 1
                      , f = g < 0 ? -1 : 1
                      , j = (u - v / 2) * f
                      , x = (y + b * p / 2) * O
                      , w = Math.abs(v)
                      , I = Math.abs(b);
                    0 !== h && (r.translate(u, y),
                    r.scale(1, 1 / p),
                    r.rotate(h),
                    r.translate(-u, -y)),
                    r.scale(f, O);
                    var k, C, F = !1, L = !1, M = e.controller.getGrapher();
                    M && "2d" === M.type && (F = M.clickableObjectsLayer.shouldDrawHovered(e.id),
                    k = M.clickableObjectsLayer.getHoveredObject(),
                    L = M.clickableObjectsLayer.shouldDrawPressed(e.id),
                    C = M.clickableObjectsLayer.getPressedObject());
                    var P = e.imageObj
                      , S = P;
                    L && C && C.listIndex == c ? S = e.depressedImageObj ? e.depressedImageObj : i(P, "rgba(50,50,50,0.2)") : F && k && k.listIndex === c && (S = e.hoveredImageObj ? e.hoveredImageObj : i(P, "rgba(200,200,200,0.2)")),
                    r.drawImage(S, j, x, w, I * p),
                    a.isItemSelected(e) && e.controller.isTraceEnabled() && (r.beginPath(),
                    r.rect(j, x, w, I * p),
                    r.restore(),
                    r.save(),
                    r.strokeStyle = "#6993C7",
                    r.lineWidth = 2,
                    r.stroke()),
                    r.restore()
                }
            }
    }
});
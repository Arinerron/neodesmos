define('graphing/poidotslayer', ['require', 'loadcss!poi', 'pjs', './graphslayer', './constants'], function(require) {
    "use strict";
    require("loadcss!poi");
    var t = require("pjs")
      , i = require("./graphslayer").GraphsLayer
      , e = require("./constants")
      , n = t(function(t) {
        t.init = function() {
            this.savedPOI = []
        }
        ,
        t.redrawToCtx = function(t, i, e, r, o) {
            var a = [];
            for (var s in e) {
                var h = e[s];
                if (h.visible) {
                    h.showHighlight && n.drawSketchHighlight(h, t, i, r, o);
                    var l = h.getPOI();
                    (h.showPOI || l.length && l[0].isAttachedToPlottedPoint()) && a.push.apply(a, n.drawPOIs(l, t, "#AAAAAA", i))
                }
            }
            this.savedPOI = a
        }
        ,
        t.getDrawnPOI = function() {
            return this.savedPOI
        }
    });
    return n.drawSketchHighlight = function(t, e, n, r, o) {
        n.settings.setProperty("highlight", !0),
        i.drawSketchToCtx(t, e, n, r, o),
        n.settings.setProperty("highlight", !1)
    }
    ,
    n.drawPOIs = function(t, n, r, o) {
        n.lineWidth = o.settings.pointLineWidth,
        n.strokeStyle = r || "#AAAAAA",
        n.fillStyle = r || "#AAAAAA",
        n.lineJoin = "round",
        n.lineCap = "round";
        var a = n.globalAlpha;
        n.globalAlpha = e.POI_ALPHA;
        var s, h, l = [], A = t.length;
        if (A && t[0].isAttachedToPlottedPoint())
            for (s = 0; s < A; s++)
                h = t[s],
                i.mapPointToScreen(o, h.x, h.y) && l.push(h);
        else
            for (s = 0; s < A; s++)
                h = t[s],
                i.drawPointToCtx(n, o, h.x, h.y) && l.push(h);
        return n.globalAlpha = a,
        l
    }
    ,
    n
});
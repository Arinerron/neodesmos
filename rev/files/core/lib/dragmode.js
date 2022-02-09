define('core/lib/dragmode', ["require", "exports"], function(require, e) {
    "use strict";
    var r;
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.reconcileDragMode = e.DragMode = void 0,
    function(e) {
        e.NONE = "NONE",
        e.X = "X",
        e.Y = "Y",
        e.XY = "XY",
        e.AUTO = "AUTO"
    }(r = e.DragMode || (e.DragMode = {})),
    e.reconcileDragMode = function(e, n) {
        var t = function(e) {
            return e ? "none" === e[0].type && "none" === e[1].type ? r.NONE : "none" === e[1].type ? r.X : "none" === e[0].type ? r.Y : r.XY : r.NONE
        }(n);
        switch (e) {
        case r.NONE:
            return r.NONE;
        case r.AUTO:
        case r.XY:
            return t;
        case r.X:
            return t === r.X || t === r.XY ? r.X : r.NONE;
        case r.Y:
            return t === r.Y || t === r.XY ? r.Y : r.NONE;
        default:
            return r.NONE
        }
    }
});
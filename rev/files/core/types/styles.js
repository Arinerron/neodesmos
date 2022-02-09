
define('core/types/styles', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.LineStyle = e.PointStyle = void 0,
    function(e) {
        e.POINT = "POINT",
        e.OPEN = "OPEN",
        e.CROSS = "CROSS"
    }(e.PointStyle || (e.PointStyle = {})),
    function(e) {
        e.SOLID = "SOLID",
        e.DASHED = "DASHED",
        e.DOTTED = "DOTTED"
    }(e.LineStyle || (e.LineStyle = {}))
});
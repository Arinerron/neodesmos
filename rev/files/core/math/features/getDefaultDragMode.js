define('core/math/features/getDefaultDragMode', ['require', 'parsenodes', 'core/lib/dragmode'], function(require) {
    "use strict";
    var e = require("parsenodes")
      , t = require("core/lib/dragmode").DragMode;
    e.Base.prototype.getMoveStrategy = function() {
        return t.NONE
    }
    ,
    e.Assignment.prototype.getDefaultDragMode = function(e) {
        return "none" !== e[0].type && "none" !== e[1].type ? t.XY : "none" !== e[0].type ? t.X : "none" !== e[1].type ? t.Y : t.NONE
    }
    ,
    e.ParenSeq.prototype.getDefaultDragMode = function(e) {
        return "updateSlider" === e[0].type && "updateSlider" === e[1].type ? t.XY : "updateSlider" === e[0].type ? t.X : "updateSlider" === e[1].type ? t.Y : t.NONE
    }
});
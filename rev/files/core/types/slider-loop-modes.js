define('core/types/slider-loop-modes', ["require", "exports"], function(require, e) {
    "use strict";
    var o;
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getSliderIcon = e.SliderLoopMode = void 0,
    function(e) {
        e.LOOP_FORWARD_REVERSE = "LOOP_FORWARD_REVERSE",
        e.LOOP_FORWARD = "LOOP_FORWARD",
        e.PLAY_ONCE = "PLAY_ONCE",
        e.PLAY_INDEFINITELY = "PLAY_INDEFINITELY"
    }(o = e.SliderLoopMode || (e.SliderLoopMode = {})),
    e.getSliderIcon = function(e) {
        switch (e) {
        case o.LOOP_FORWARD:
            return "dcg-icon-arrow-one-way";
        case o.LOOP_FORWARD_REVERSE:
            return "dcg-icon-arrow-two-way";
        case o.PLAY_ONCE:
            return "dcg-icon-arrow-once";
        case o.PLAY_INDEFINITELY:
            return "dcg-icon-arrow-infinite"
        }
    }
});
define('tours/sliders', ['require', 'pjs', './base_tour', 'predicates/common'], function(require) {
    "use strict";
    var e = require("pjs")
      , s = require("./base_tour")
      , t = require("predicates/common");
    return e(s, function(e, s) {
        e.sliderHasSlid = !1,
        e.shouldPopup = function() {
            return !!this.getMatchingExpSelector(t.SLIDER)
        }
        ,
        e.update = function() {
            if (this.resourcesOpen())
                return this.requireResourcesNotOpen();
            if (!this.expressionsVisible())
                return this.requireExpressionsVisible();
            if (this.editListMode())
                return this.requireNotEditListMode();
            var e, s = this.getMatchingExpSelector(t.GRAPHABLE_EXP), i = this.getMatchingExpSelector(t.SLIDER), r = this.getMatchingExpSelector(t.ANIMATING_SLIDER), n = this.getMatchingExpSelector(t.SLID_SLIDER);
            if (s && r)
                return {
                    final: !0,
                    position: "s",
                    endingMsg: this.s("graphing-tours-label-sliders-pro"),
                    sel: r.find(".dcg-circular-icon")
                };
            if (s && n)
                return n.find(".dcg-depressed").length ? {
                    doNotUpdate: !0
                } : {
                    position: "s",
                    content: "<b>" + this.s("graphing-tours-label-sliders-hands-free") + "</b><br>" + this.s("graphing-tours-label-sliders-press-play"),
                    sel: n.find(".dcg-circular-icon")
                };
            if (s && i) {
                var o = i.find(".dcg-thumb .dcg-graphic");
                return 1 === o.length ? {
                    position: "s",
                    content: this.s("graphing-tours-label-sliders-drag-handle"),
                    sel: o
                } : {
                    position: "e",
                    content: this.s("graphing-tours-label-sliders-change-value"),
                    sel: i
                }
            }
            return (e = this.expressionCount() > 1 ? this.getMatchingExpSelector(t.HAS_N_DEPENDENCIES(1)) : this.getMatchingExpSelector(t.HAS_N_DEPENDENCIES(2))) ? {
                position: "s",
                content: "<b>" + this.s("graphing-tours-label-awesome") + "</b> " + this.s("graphing-tours-label-sliders-add"),
                sel: e.find(".dcg-slider-btn-container:last .dcg-btn-blue")
            } : (e = this.getMatchingExpSelector(t.FOCUSED_OR_EMPTY_EXP)) ? {
                position: "e",
                content: "<b>" + this.s("graphing-tours-label-sliders-make-sliders") + "</b><br>" + this.s("graphing-tours-label-sliders-try-typing", {
                    sample_expression: '<span class="trip-math">y=mx+b</span>'
                }),
                sel: e,
                delayBeforeExit: 600
            } : {
                position: "e",
                content: this.s("graphing-tours-label-sliders-blank-expression"),
                sel: ".dcg-action-newmath"
            }
        }
    })
});
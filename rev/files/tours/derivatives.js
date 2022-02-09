
define('tours/derivatives', ['require', 'pjs', './base_tour', './derivatives_predicates'], function(require) {
    "use strict";
    var t = require("pjs")
      , i = require("./base_tour")
      , e = require("./derivatives_predicates");
    return t(i, function(t, i) {
        t.shouldPopup = function() {
            return !1
        }
        ,
        t.update = function() {
            if (this.resourcesOpen())
                return this.requireResourcesNotOpen();
            if (!this.expressionsVisible())
                return this.requireExpressionsVisible();
            if (this.editListMode())
                return this.requireNotEditListMode();
            var t = this.getMatchingExpId(e.DEFINE_F)
              , i = this.getMatchingExpId(e.DEFINE_G)
              , s = this.getMatchingExpSelector(e.INLINE_DERIVATIVE);
            return t ? i ? s ? {
                final: !0,
                position: "e",
                endingMsg: this.s("graphing-tours-label-great-job"),
                sel: s,
                scrollContainer: this.expList()
            } : {
                position: "e",
                content: this.s("graphing-tours-label-derivative-one-more", {
                    equation: "<span class='trip-math'>\\frac{d}{dx}\\ln \\left(x\\right)</span>"
                }),
                sel: this.getAvailableExp([t, i]),
                scrollContainer: this.expList()
            } : {
                position: "e",
                content: this.s("graphing-tours-label-derivative-graph-derivative", {
                    equation: "<span class='trip-math'>g\\left(x\\right)=\\frac{d}{dx}f\\left(x\\right)</span>"
                }) + "<div class='trip-hint'>" + this.s("graphing-tours-label-derivative-hint-type-derivative") + "</div>",
                sel: this.getAvailableExp([t]),
                scrollContainer: this.expList()
            } : {
                position: "e",
                content: "<b>" + this.s("graphing-tours-label-derivative-start-graph") + "</b><br>" + this.s("graphing-tours-label-derivative-start-function", {
                    equation: "<span class='trip-math'>f\\left(x\\right)=x\\sin \\left(x\\right)</span>"
                }),
                sel: this.getAvailableExp(),
                scrollContainer: this.expList()
            }
        }
    })
});
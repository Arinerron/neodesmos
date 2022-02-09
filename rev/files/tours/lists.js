
define('tours/lists', ['require', 'pjs', './base_tour', './list_predicates'], function(require) {
    "use strict";
    var t = require("pjs")
      , i = require("./base_tour")
      , s = require("./list_predicates");
    return t(i, function(t, i) {
        t.shouldPopup = function() {
            return !!this.getMatchingExpSelector(s.ANY_LIST)
        }
        ,
        t.update = function() {
            if (this.resourcesOpen())
                return this.requireResourcesNotOpen();
            if (!this.expressionsVisible())
                return this.requireExpressionsVisible();
            if (this.editListMode())
                return this.requireNotEditListMode();
            var t = this.getMatchingExpId(s.A_LIST)
              , i = this.getMatchingExpId(s.B_LIST)
              , e = this.getMatchingExpId(s.C_LIST)
              , a = this.getMatchingExpId(s.A_DEP)
              , n = this.getMatchingExpId(s.B_DEP)
              , l = this.getMatchingExpSelector(s.C_DEP);
            return t ? a ? i ? e ? n ? l ? {
                final: !0,
                position: "e",
                endingMsg: this.s("graphing-tours-label-great-job"),
                sel: l.find(".dcg-evaluation"),
                scrollContainer: this.expList()
            } : {
                position: "e",
                content: "<b>" + this.s("graphing-tours-label-last-thing") + "</b> " + this.s("graphing-tours-label-list-computation", {
                    equation: "<span class='trip-math'>total\\left(c\\right)</span>"
                }) + "<div class='trip-hint'>",
                sel: this.getAvailableExp([t, i, a, e, n]),
                scrollContainer: this.expList(),
                delayBeforeExit: 600
            } : {
                position: "e",
                content: "<b>" + this.s("graphing-tours-label-lists-graph-points") + "</b> " + this.s("graphing-tours-label-lists-point-equation", {
                    equation: "<span class='trip-math'>\\left(b, sin\\left(b\\right)\\right)</span>"
                }) + "<div class='trip-hint'>" + this.s("graphing-tours-label-lists-hint-plot-points") + "</div>",
                sel: this.getAvailableExp([t, i, a, e]),
                scrollContainer: this.expList()
            } : {
                position: "e",
                content: this.s("graphing-tours-label-lists-count-by", {
                    equation: "<span class='trip-math'>c=\\left[10, 15, ..., 95\\right]</span>"
                }),
                sel: this.getAvailableExp([t, i, a]),
                scrollContainer: this.expList(),
                delayBeforeExit: 600
            } : {
                position: "e",
                content: "<b>" + this.s("graphing-tours-label-awesome") + "</b> " + this.s("graphing-tours-label-lists-create-range", {
                    equation: "<span class='trip-math'>b=\\left[0...8\\right]</span>"
                }),
                sel: this.getAvailableExp([t, a]),
                scrollContainer: this.expList(),
                delayBeforeExit: 600
            } : {
                position: "e",
                content: "<b>" + this.s("graphing-tours-label-lists-put-to-work") + "</b> " + this.s("graphing-tours-label-lists-graph-equation", {
                    equation: "<span class='trip-math'>y=x^2+a</span>"
                }) + "<div class='trip-hint'>" + this.s("graphing-tours-label-lists-hint-superscript", {
                    suggestion1: "y=x^2+a",
                    suggestion2: "a<sup>2</sup>"
                }) + "</div>",
                sel: this.getAvailableExp([t]),
                scrollContainer: this.expList()
            } : {
                position: "e",
                content: "<b>" + this.s("graphing-tours-label-lists-are-powerful") + "</b><br>" + this.s("graphing-tours-label-lists-begin-equation", {
                    equation: "<span class='trip-math'>a=\\left[1,2,3\\right]</span>"
                }) + "<div class='trip-hint'>" + this.s("graphing-tours-label-lists-hint-abc"),
                sel: this.getAvailableExp(),
                scrollContainer: this.expList(),
                delayBeforeExit: 600
            }
        }
    })
});
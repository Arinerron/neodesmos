
define('tours/restrictions', ['require', 'pjs', './base_tour', 'predicates/common'], function(require) {
    "use strict";
    var s = require("pjs")
      , t = require("./base_tour")
      , e = require("predicates/common");
    return s(t, function(s) {
        s.shouldPopup = function() {
            return !!this.getMatchingExpSelector(e.RESTRICTED)
        }
        ,
        s.restrictedLineTour = function() {
            if (this.resourcesOpen())
                return this.requireResourcesNotOpen();
            if (!this.expressionsVisible())
                return this.requireExpressionsVisible();
            var s = this.getMatchingExpSelector(e.RESTRICTED_LINE)
              , t = this.getMatchingExpSelector(e.EXP_NOT_RESTRICTED_LINE);
            if (s)
                return t ? (this.phaseOn++,
                this.update()) : {
                    position: "e",
                    content: "<b>" + this.s("graphing-tours-label-brilliant") + "</b><br>" + this.s("graphing-tours-label-restrictions-new-expression"),
                    sel: ".dcg-new-math-div"
                };
            var i = this.getMatchingExpId(e.FOCUSED_OR_EMPTY_EXP)
              , r = this.getSelectorById(i)
              , n = this.getModelById(i);
            if (r) {
                var a = this.expMatches(n, e.NONCONSTANT_LINE);
                return this.expMatches(n, e.HAS_ERROR) ? {
                    doNotUpdate: !0
                } : a ? {
                    position: "e",
                    content: ["<b>" + this.s("graphing-tours-label-awesome") + "</b><br>", this.s("graphing-tours-label-restrictions-domain", {
                        sample_expression: '<span class="trip-math">\\left\\{x<0\\right\\}</span>'
                    }), "<br><i>" + this.s("graphing-tours-label-restrictions-abc", {
                        buttons: "{ }"
                    }) + "</i>"].join(""),
                    sel: r
                } : {
                    position: "e",
                    content: ["<b>" + this.s("graphing-tours-label-restrictions-start") + "</b><br>", this.s("graphing-tours-label-restrictions-straight-line", {
                        sample_expression: '<span class="trip-math">y=2x</span>'
                    })].join(""),
                    sel: r
                }
            }
            return {
                position: "e",
                content: this.s("graphing-tours-label-restrictions-blank-expression"),
                sel: ".dcg-new-math-div"
            }
        }
        ,
        s.restrictedParabolaTour = function() {
            if (this.resourcesOpen())
                return this.requireResourcesNotOpen();
            if (!this.expressionsVisible())
                return this.requireExpressionsVisible();
            if (this.getMatchingExpSelector([e.RESTRICTED, e.PARABOLA]))
                return {
                    final: !0,
                    position: "e",
                    endingMsg: this.s("graphing-tours-label-restrictions-star"),
                    sel: ".dcg-exppanel-container"
                };
            var s = this.getMatchingExpId([e.EXP_NOT_RESTRICTED_LINE, e.FOCUSED_EXP])
              , t = this.getSelectorById(s)
              , i = this.getModelById(s);
            if (t) {
                var r = this.expMatches(i, [e.PARABOLA, e.HAS_DEPENDENT_Y])
                  , n = this.expMatches(i, e.SHIFTED_PARABOLA)
                  , a = this.expMatches(i, e.PARABOLA);
                return this.expMatches(i, e.HAS_ERROR) ? {
                    doNotUpdate: !0
                } : a ? r ? n ? {
                    position: "e",
                    content: ["<b>" + this.s("graphing-tours-label-nice") + "</b><br>" + this.s("graphing-tours-label-restrictions-range", {
                        sample_expression: '<span class="trip-math">\\left\\{y<4\\right\\}</span>'
                    })].join(""),
                    sel: t
                } : {
                    position: "e",
                    content: ["<b>" + this.s("graphing-tours-label-restrictions-move-parabola") + "</b><br>", this.s("graphing-tours-label-restrictions-change-equation", {
                        sample_expression: '<span class="trip-math">y=x^2-2</span>'
                    })].join(""),
                    sel: t
                } : {
                    position: "e",
                    content: ["<b>" + this.s("graphing-tours-label-restrictions-dont-forget") + "</b><br>", this.s("graphing-tours-label-restrictions-type-all", {
                        sample_expression: '<span class="trip-math">y=x^2</span>'
                    })].join(""),
                    sel: t
                } : {
                    position: "e",
                    content: [this.s("graphing-tours-label-restrictions-graph-parabola", {
                        sample_expression: '<span class="trip-math">y=x^2</span>'
                    }) + "<br><i>" + this.s("graphing-tours-label-restrictions-typing-hint", {
                        suggestion1: "y=x^2",
                        suggestion2: '<span class="trip-math">a^2</span>'
                    }) + "</i>"].join(""),
                    sel: t
                }
            }
            return {
                position: "e",
                content: this.s("graphing-tours-label-restrictions-blank-expression"),
                sel: ".dcg-new-math-div"
            }
        }
        ,
        s.phaseOn = 0,
        s.phases = [s.restrictedLineTour, s.restrictedParabolaTour],
        s.update = function() {
            return this.phases[this.phaseOn].call(this)
        }
    })
});

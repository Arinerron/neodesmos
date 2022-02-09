define('tours/tour_controller', ['require', 'pjs', 'tours/all_tours', 'lib/urlparser', 'jquery'], function(require) {
    "use strict";
    var t = require("pjs")
      , r = require("tours/all_tours")
      , o = require("lib/urlparser")
      , u = require("jquery");
    return t(function(t, s) {
        t.init = function(t) {
            this.tourManager = t._calc.tourManager,
            this.Calc = t._calc,
            this.tourManager.closingMsg = function(t, r) {
                return "<b>" + t + "</b><br>" + this.Calc.controller.s("graphing-tours-label-self-destruct", {
                    seconds: r
                })
            }
            .bind(this)
        }
        ,
        t.shouldPopupTour = function(t) {
            if (this.Calc.controller.getItemCount() > 3)
                return !0;
            var o = r[t].tour(this.Calc);
            return !!o.shouldPopup && o.shouldPopup()
        }
        ,
        t.startTour = function(t, o) {
            if (t && r[t]) {
                var u = r[t].tour(this.Calc);
                this.tourManager.currentTour && this.tourManager.stopTour(),
                this.tourManager.startTour(u)
            }
        }
        ,
        t.startTourFromUrl = function() {
            if (u(".dcg-expressionitem").length < 2)
                setTimeout(this.startTourFromUrl.bind(this), 100);
            else {
                var t = o.getParameter(location.search, "tour");
                this.startTour(t, "url")
            }
        }
        ,
        t.setCalc = function(t) {
            this.Calc = t
        }
    })
});
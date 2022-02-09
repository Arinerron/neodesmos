
define('tours/regressions', ['require', 'pjs', 'jquery', './base_tour', 'loadcss!regression-tour', 'browser', 'predicates/common'], function(require) {
    "use strict";
    var t = require("pjs")
      , e = require("jquery")
      , s = require("./base_tour");
    require("loadcss!regression-tour");
    var i = require("browser")
      , r = require("predicates/common");
    return t(s, function(t, s) {
        t.shouldPopup = function() {
            return !!this.getMatchingExpSelector(r.TABLE)
        }
        ,
        t.hasCreatedLinearRegression = !1,
        t.hasInitiallyRenderedSampleDataLink = !1,
        t.update = function() {
            if (this.resourcesOpen())
                return this.requireResourcesNotOpen();
            if (!this.expressionsVisible())
                return this.requireExpressionsVisible();
            if (this.editListMode())
                return this.requireNotEditListMode();
            var t = this.getMatchingExpId(r.REGRESSION) || this.getMatchingExpId(r.EXP)
              , s = this.getSelectorById(t)
              , n = this.getModelById(t)
              , a = this.getMatchingExpId(r.HAS_DATA_COLUMN)
              , o = this.getSelectorById(a)
              , l = this.getModelById(a);
            if (!o || !l.columnModels[1]) {
                var d = e(".dcg-action-newtable:visible")
                  , g = !i.IS_IPAD && !i.IS_MOBILE;
                return 0 === d.length && g ? this.hasInitiallyRenderedSampleDataLink ? {
                    doNotUpdate: !0
                } : (this.hasInitiallyRenderedSampleDataLink = !0,
                {
                    position: "e",
                    content: '<div class="trip-title">' + this.s("graphing-tours-label-regressions-data") + "</div>" + this.s("graphing-tours-label-regressions-docs", {
                        sample_data_link: '<a class="trip-link" target="_blank" href="https://docs.google.com/spreadsheets/d/1h4kYwWka_1PvI5G-hPYz_QBe1FrYLo9Gb1XvxJz-QYE/edit#gid=0">' + this.s("graphing-tours-label-regressions-sample-data") + "</a>"
                    }) + ' <div class="trip-hint"><br>' + this.s("graphing-tours-label-regressions-own-data", {
                        plus_icon: '<i class="dcg-icon-plus"></i>'
                    }) + "</div>",
                    sel: s || e(".dcg-exppanel")
                }) : 0 === d.length ? {
                    position: "e",
                    content: '<div class="trip-title">' + this.s("graphing-tours-label-regressions-data-2") + "</div>" + this.s("graphing-tours-label-new-item"),
                    sel: e(".dcg-add-expression-btn"),
                    delayBeforeExit: 150
                } : {
                    position: "e",
                    content: this.s("graphing-tours-label-regressions-new-table"),
                    sel: d,
                    delayBeforeExit: 250
                }
            }
            if (o.find(".dcg-row .dcg-cell:nth-of-type(2):not(.dcg-table-header):not(.dcg-empty)").length < 5)
                return {
                    position: "e",
                    content: '<div class="trip-title">' + this.s("graphing-tours-label-regressions-fill-sample-data") + "</div><table class='dcg-regression-tour-table'><tr><td><span class='trip-math'>x_1</span></td><td><span class='trip-math'>y_1</span></td></tr><tr><td>1</td><td>0.8</td></tr><tr><td>2</td><td>2.7</td></tr><tr><td>3</td><td>3.9</td></tr><tr><td>4</td><td>4.6</td></tr><tr><td>5</td><td>5</td></tr></table>",
                    sel: o.find(".dcg-row:nth-of-type(2) .dcg-cell:nth-of-type(2)")
                };
            if ("expression" !== (this.getMatchingExpModel(r.REGRESSION) || this.getMatchingExpModel(r.FOCUSED_EXP) || this.controller.getItemModelByIndex(0)).type) {
                var p = e(".dcg-action-newexpression:visible");
                return 0 === p.length ? {
                    position: "e",
                    content: '<div class="trip-title">' + this.s("graphing-tours-label-awesome") + "</div>" + this.s("graphing-tours-label-new-item"),
                    sel: e(".dcg-add-expression-btn"),
                    delayBeforeExit: 150
                } : {
                    position: "e",
                    content: this.s("graphing-tours-label-regressions-expression-option"),
                    sel: p,
                    delayBeforeExit: 150
                }
            }
            var h = n.formula
              , c = h ? h.regression : void 0
              , u = c ? c.statistics : void 0
              , b = c ? c.parameters : void 0;
            if (u && u.r && (this.hasCreatedLinearRegression = !0),
            !this.hasCreatedLinearRegression)
                return {
                    position: "e",
                    content: this.s("graphing-tours-label-regressions-equation", {
                        equation: "<span class='trip-math'>y_1\\sim mx_1+b</span>"
                    }) + "<div class='trip-hint'>" + this.s("graphing-tours-label-regressions-hint-1", {
                        y_1: "<span class='trip-math'>y_1</span>",
                        y1: "<span class='trip-math'>y1</span>"
                    }) + "</div><div class='trip-hint'>" + this.s("graphing-tours-label-regressions-hint-2", {
                        twiddle: "<span class='trip-math'>~</span>"
                    }) + "</div>",
                    sel: s,
                    delayBeforeExit: 150
                };
            var v = e(".dcg-residual-suggestion.dcg-visible");
            return v.length ? {
                position: "e",
                content: "<div class='trip-title'>" + this.s("graphing-tours-label-regressions-check-model") + "</div>" + this.s("graphing-tours-label-regressions-residuals"),
                sel: v,
                delayBeforeExit: 250
            } : u && (u.Rsquared >= .99 || u.r >= .99 || b && b.a && b.k && b.h) ? {
                final: !0,
                position: "e",
                endingMsg: "<div class='trip-title'>" + this.s("graphing-tours-label-regressions-keep-exploring") + "</div>",
                sel: e(".dcg-exppanel")
            } : {
                position: "e",
                content: "<div class='trip-title'>" + this.s("graphing-tours-label-regressions-new-model") + "</div>" + this.s("graphing-tours-label-regressions-better-fit", {
                    equation: "<span class='trip-math'>y_1~a(x_1-h)^2+b</span>"
                }),
                sel: s,
                delayBeforeExit: 300
            }
        }
    })
});
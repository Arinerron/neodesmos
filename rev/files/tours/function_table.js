
define('tours/function_table', ['require', 'pjs', './base_tour', 'jquery', 'predicates/common', 'graphing-calc/models/table'], function(require) {
    "use strict";
    var e = require("pjs")
      , t = require("./base_tour")
      , s = require("jquery")
      , n = require("predicates/common")
      , i = require("graphing-calc/models/table");
    return e(t, function(e, t) {
        e.shouldPopup = function() {
            return !!this.getMatchingExpSelector(n.TABLE)
        }
        ,
        e.update = function() {
            if (this.resourcesOpen())
                return this.requireResourcesNotOpen();
            if (!this.expressionsVisible())
                return this.requireExpressionsVisible();
            var e = this.getMatchingExpId(n.HAS_FUNCTION_COLUMN)
              , t = this.getSelectorById(e)
              , o = this.getModelById(e)
              , a = this.getMatchingExpSelector(n.FOCUSED_OR_EMPTY_EXP)
              , l = this.getMatchingExpSelector([n.COMPLEX_EXP, n.TABLEABLE_EXP]);
            if (t) {
                var r = o
                  , c = "POINTS" === r.columnModels[1].columnMode
                  , d = s(".dcg-table-column-menu").length > 0
                  , p = r.columnModels.length > 3 && !1 === r.columnModels[2].discrete
                  , h = i.getSelectedCell(r);
                return p ? {
                    final: !0,
                    position: "e",
                    endingMsg: this.s("graphing-tours-label-advanced-tables-wizard"),
                    sel: t
                } : h && 0 === h.row && 2 === h.column ? {
                    position: "e",
                    content: this.s("graphing-tours-label-advanced-tables-type-function", {
                        sample_expression: '<span class="trip-math">cos\\left(x\\right)</span>'
                    }),
                    sel: t.find("tr:nth-of-type(1) .dcg-cell:nth-of-type(3)")
                } : !h || 0 === h.row && 2 === h.column ? c && !h ? {
                    position: "e",
                    content: this.s("graphing-tours-label-advanced-tables-continue"),
                    sel: t.find("tr:nth-of-type(1) .dcg-cell:nth-of-type(2)")
                } : d ? {
                    content: this.s("graphing-tours-label-advanced-tables-dots"),
                    position: "e",
                    sel: ".dcg-table-points"
                } : {
                    content: this.s("graphing-tours-label-advanced-tables-options"),
                    position: "e",
                    sel: t.find("tr:nth-of-type(1) .dcg-cell:nth-of-type(2) .dcg-circular-icon")
                } : {
                    position: "e",
                    content: this.s("graphing-tours-label-advanced-tables-new-column"),
                    sel: t.find("tr:nth-of-type(1) .dcg-cell:nth-of-type(3)")
                }
            }
            return l ? this.editListMode() ? {
                position: "e",
                content: this.s("graphing-tours-label-advanced-tables-create"),
                sel: ".dcg-action-createtable",
                delayBeforeExit: 400
            } : {
                position: "s",
                content: "<b>" + this.s("graphing-tours-label-advanced-tables-convert") + "</b><br>" + this.s("graphing-tours-label-advanced-tables-edit-list"),
                sel: ".dcg-action-toggle-edit"
            } : a ? {
                position: "e",
                content: ["<b>" + this.s("graphing-tours-label-advanced-tables-graph") + "</b><br>", this.s("graphing-tours-label-advanced-tables-type-function", {
                    sample_expression: '<span class="trip-math">y=sin\\left(x\\right)</span>'
                })].join(""),
                sel: a
            } : {
                position: "e",
                content: this.s("graphing-tours-label-advanced-tables-start"),
                sel: ".dcg-new-math-div"
            }
        }
    })
});
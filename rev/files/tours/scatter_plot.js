
define('tours/scatter_plot', ['require', 'pjs', 'jquery', './base_tour', 'predicates/common', 'graphing-calc/models/table'], function(require) {
    "use strict";
    var t = require("pjs")
      , e = require("jquery")
      , s = require("./base_tour")
      , o = require("predicates/common")
      , i = require("graphing-calc/models/table");
    return t(s, function(t, s) {
        t.shouldPopup = function() {
            return !!this.getMatchingExpSelector(o.TABLE)
        }
        ,
        t.update = function() {
            if (this.resourcesOpen())
                return this.requireResourcesNotOpen();
            if (!this.expressionsVisible())
                return this.requireExpressionsVisible();
            if (this.editListMode())
                return this.requireNotEditListMode();
            var t = this.getMatchingExpId(o.HAS_DATA_COLUMN)
              , s = this.getSelectorById(t)
              , n = this.getModelById(t);
            if (!s) {
                var r = e(".dcg-action-newtable:visible");
                return 0 === r.length ? {
                    position: "e",
                    content: "<b>" + this.s("graphing-tours-label-tables-start") + "</b><br>" + this.s("graphing-tours-label-new-item"),
                    sel: e(".dcg-add-expression-btn")
                } : {
                    position: "e",
                    content: this.s("graphing-tours-label-tables-select-table"),
                    sel: r,
                    delayBeforeExit: 300
                }
            }
            for (var l, c, g, a = n, h = i.getSelectedCell(a), p = a.columnModels[0].cells.length, d = 0, b = 0; b < p && b < 3; b++) {
                var f = s.find(".dcg-row:nth-of-type(" + (b + 2) + ") .dcg-cell:nth-of-type(1)")
                  , u = s.find(".dcg-row:nth-of-type(" + (b + 2) + ") .dcg-cell:nth-of-type(2)");
                f.is(":not(.dcg-empty, .dcg-error)") && u.is(":not(.dcg-empty, .dcg-error)") && d++
            }
            if (3 === d) {
                var y = a.columnModels[1].points && a.columnModels[1].lines
                  , w = e(".dcg-table-column-menu").length > 0;
                return y && !w ? {
                    final: !0,
                    position: "e",
                    endingMsg: this.s("graphing-tours-label-tables-whiz"),
                    sel: s
                } : y ? {
                    position: "e",
                    content: this.s("graphing-tours-label-tables-close-options"),
                    sel: s
                } : w ? {
                    content: this.s("graphing-tours-label-tables-dots"),
                    position: "e",
                    sel: ".dcg-toggle-switch:eq(1)"
                } : {
                    content: ["<b>" + this.s("graphing-tours-label-tables-last-trick") + "</b><br>", this.s("graphing-tours-label-tables-open-options")].join(""),
                    position: "e",
                    sel: s.find(".dcg-row:nth-of-type(1) .dcg-cell:nth-of-type(2) .dcg-circular-icon")
                }
            }
            for (l = 0; l < p; l++)
                for (c = 0; c < 2; c++)
                    if ((g = s.find(".dcg-row:nth-of-type(" + (l + 2) + ") .dcg-cell:nth-of-type(" + (c + 1) + ")")).is(".dcg-error"))
                        return {
                            position: "e",
                            content: this.s("graphing-tours-label-tables-valid-number"),
                            sel: g
                        };
            if (!h)
                return {
                    position: "e",
                    content: this.s("graphing-tours-label-tables-back"),
                    sel: s.find(".dcg-row:nth-of-type(" + l + ") .dcg-cell:nth-of-type(2)")
                };
            if (2 === p && 1 === d && h && 1 === h.row)
                return {
                    position: "e",
                    content: this.s("graphing-tours-label-tables-next-row"),
                    sel: s.find(".dcg-row:nth-of-type(" + (h.row + 1) + ") .dcg-cell:nth-of-type(2)")
                };
            if (3 === p && 2 === d && h && 3 !== h.row)
                return {
                    position: "e",
                    content: "<b>" + this.s("graphing-tours-label-awesome") + "</b><br>" + this.s("graphing-tours-label-tables-enter"),
                    sel: s.find(".dcg-row:nth-of-type(" + (h.row + 1) + ") .dcg-cell:nth-of-type(2)")
                };
            for (l = 0; l < p; l++)
                for (c = 0; c < 2; c++)
                    if ((g = s.find(".dcg-row:nth-of-type(" + (l + 2) + ") .dcg-cell:nth-of-type(" + (c + 1) + ")")).is(".dcg-empty")) {
                        var m = this.s("graphing-tours-label-tables-fill-row");
                        return 2 === l && 1 === c && (m = this.s("graphing-tours-label-tables-fill-another")),
                        0 === l && 1 === c && (m = "<b>" + this.s("graphing-tours-label-tables-fill-cell") + "</b><br>" + this.s("graphing-tours-label-tables-type-number")),
                        {
                            position: "e",
                            content: m,
                            sel: s.find(".dcg-row:nth-of-type(" + (l + 2) + ") .dcg-cell:nth-of-type(2)")
                        }
                    }
        }
    })
});
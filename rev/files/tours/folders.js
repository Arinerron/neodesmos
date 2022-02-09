define('tours/folders', ['require', 'pjs', './base_tour', 'jquery', 'graphing-calc/models/expression'], function(require) {
    "use strict";
    var e = require("pjs")
      , t = require("./base_tour")
      , i = require("jquery")
      , s = require("graphing-calc/models/expression")
      , n = function(e, t) {
        return "folder" == e.type
    }
      , r = function(e, t) {
        return s.isGraphable(e) && !e.folderId
    };
    return e(t, function(e, t) {
        e.shouldPopup = function() {
            return !!this.getMatchingExpSelector(n)
        }
        ,
        e.update = function() {
            if (this.resourcesOpen())
                return this.requireResourcesNotOpen();
            if (!this.expressionsVisible())
                return this.requireExpressionsVisible();
            if (this.editListMode())
                return this.requireNotEditListMode();
            var e = this.getMatchingExpId(n)
              , t = this.getSelectorById(e)
              , s = this.getModelById(e)
              , o = this.getMatchingExpSelector(r);
            if (!s) {
                var l = i(".dcg-action-newfolder:visible");
                return 0 === l.length ? {
                    position: "e",
                    content: "<b>" + this.s("graphing-tours-label-folders-start") + "</b><br>" + this.s("graphing-tours-label-new-item"),
                    sel: i(".dcg-add-expression-btn")
                } : {
                    position: "e",
                    content: this.s("graphing-tours-label-folders-option"),
                    sel: l
                }
            }
            return this.cachedTitle != s.title && (this.cachedTitle = s.title,
            this.lastChange = new Date),
            !this.cachedTitle || new Date - this.lastChange < 1e3 ? {
                position: "e",
                content: this.s("graphing-tours-label-folders-name"),
                sel: t
            } : 0 === s.controller.getNumberOfItemsInFolder(s.id) ? o ? {
                position: "e",
                content: this.s("graphing-tours-label-folders-grab") + "<div class='trip-hint'>" + this.s("graphing-tours-label-folders-indicator") + "</div>",
                scrollContainer: this.expList(),
                sel: o
            } : {
                position: "e",
                content: "<b>" + this.s("graphing-tours-label-awesome") + "</b> " + this.s("graphing-tours-label-folders-new-equation", {
                    equation: "<span class='trip-math'>x+y=3</span>"
                }),
                scrollContainer: this.expList(),
                sel: this.getAvailableExp(),
                delayBeforeExit: 500
            } : s.collapsed ? s.hidden ? {
                final: !0,
                position: "e",
                endingMsg: this.s("graphing-tours-label-great-job"),
                sel: ".dcg-exppanel-container",
                scrollContainer: this.expList()
            } : {
                position: "s",
                content: "<b>" + this.s("graphing-tours-label-folders-did-you-know") + "</b>" + this.s("graphing-tours-label-folders-hide"),
                scrollContainer: this.expList(),
                sel: t.find(".dcg-circular-icon")
            } : {
                position: "e",
                content: "<b>" + this.s("graphing-tours-label-folders-great-start") + "</b> " + this.s("graphing-tours-label-folders-collapse"),
                scrollContainer: this.expList(),
                sel: t.find(".dcg-caret-container")
            }
        }
    })
});
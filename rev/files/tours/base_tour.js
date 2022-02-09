define('tours/base_tour', ['require', 'pjs', 'jquery', '../predicates/common', 'graphing-calc/models/abstract-item'], function(require) {
    "use strict";
    var e = require("pjs")
      , t = require("jquery")
      , r = require("../predicates/common")
      , n = require("graphing-calc/models/abstract-item");
    return e(function(e) {
        e.init = function(e) {
            this.Calc = e,
            this.controller = this.Calc.controller
        }
        ,
        e.expressionsVisible = function() {
            return this.controller.isListVisible()
        }
        ,
        e.s = function(e, t) {
            return this.controller.s(e, t)
        }
        ,
        e.requireExpressionsVisible = function() {
            return {
                position: "e",
                content: this.s("graphing-tours-label-require-expressions-visible"),
                sel: t(".dcg-show-expressions-tab"),
                delayBeforeEnter: 400,
                delayBeforeExit: 400
            }
        }
        ,
        e.resourcesOpen = function() {
            return t("body").hasClass("resources-open")
        }
        ,
        e.requireResourcesNotOpen = function() {
            return {
                position: "e",
                content: this.s("graphing-tours-label-require-resources-not-open"),
                sel: t(".dcg-action-opendrawer"),
                delayBeforeEnter: 400,
                delayBeforeExit: 400
            }
        }
        ,
        e.editListMode = function() {
            return this.controller.isInEditListMode()
        }
        ,
        e.requireNotEditListMode = function() {
            return {
                position: "s",
                content: this.s("graphing-tours-label-require-not-edit-list-mode"),
                sel: t(".dcg-action-toggle-edit")
            }
        }
        ,
        e.expressionCount = function() {
            return this.controller.getItemCount()
        }
        ,
        e.getExpSketch = function(e) {
            var t = this.Calc.grapher.graphSketches[e.id];
            if (!t || t.visible)
                return t
        }
        ,
        e.getAvailableExp = function(e) {
            var t = this.getMatchingExpSelector(r.FOCUSED_OR_EMPTY_EXP, e);
            return t || ".dcg-new-math-div"
        }
        ,
        e.expList = function() {
            return t(this.Calc.rootElt).find(".dcg-exppanel")
        }
        ,
        e.getSelectorById = function(e) {
            return this.controller.getItemSelectorById(e)
        }
        ,
        e.getModelById = function(e) {
            return this.controller.getItemModel(e)
        }
        ,
        e.expMatches = function(e, t) {
            if (!e)
                return !1;
            if ("function" == typeof t)
                return t.call(r, e, this.getExpSketch(e));
            for (var n = 0; n < t.length; n++)
                if (!t[n].call(r, e, this.getExpSketch(e)))
                    return !1;
            return !0
        }
        ,
        e.getMatchingExpId = function(e, t) {
            var r, i, o = {}, s = this.controller.getAllItemModels();
            for (r = 0; r < s.length; r++)
                i = s[r],
                "render" === n.getDisplayState(i) && (o[i.id] = !0);
            for (var c in t)
                delete o[c];
            var l = this.controller.getSelectedItem();
            if (l && o[l.id] && this.expMatches(l, e))
                return l.id;
            for (r = 0; r < s.length; r++)
                if (o[(i = s[r]).id] && this.expMatches(i, e))
                    return i.id;
            return null
        }
        ,
        e.getMatchingExpSelector = function(e, t) {
            var r = this.getMatchingExpId(e, t);
            return r ? this.getSelectorById(r) : r
        }
        ,
        e.getMatchingExpModel = function(e, t) {
            var r = this.getMatchingExpId(e, t);
            return r ? this.getModelById(r) : r
        }
    })
});
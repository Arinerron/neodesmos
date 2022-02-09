define('main/mygraphs_controller', ['require', 'pjs', 'jquery', 'underscore_model', 'lib/aria', 'lib/conditional_blur', 'analytics/looker'], function(require) {
    "use strict";
    var t = require("pjs")
      , e = require("jquery")
      , r = require("underscore_model").UnderscoreModel
      , o = require("lib/aria")
      , n = require("lib/conditional_blur").default
      , i = require("analytics/looker").logJSON;
    return t(r, function(t, r) {
        t.init = function(t, e, o) {
            r.init.call(this),
            this.graphsController = t,
            this.api = e,
            this.s = o,
            this.recoveryAttempted = !1,
            this.isOpen = !1,
            this.pageLoadTime = Date.now()
        }
        ,
        t.isMygraphsOpen = function() {
            return this.isOpen
        }
        ,
        t.hasAttemptedRecovery = function() {
            return this.recoveryAttempted
        }
        ,
        t.openMygraphs = function(t) {
            this.recoveryAttempted = !1,
            this.isOpen = !0,
            e("body").addClass("resources-open"),
            i("user-action::open-my-graphs", {
                product: this.graphsController.product
            }),
            o.alert(this.s("account-shell-narration-mygraphs-open-graph")),
            n(),
            t && "keyboard" === t.device && e(".dcg-action-newblankgraph").focus(),
            this.triggerEvent("onOpenMygraphs")
        }
        ,
        t.closeMygraphs = function() {
            this.isOpen = !1,
            e("body").removeClass("resources-open")
        }
        ,
        t.openBlankGraph = function() {
            this.closeMygraphs(),
            this.graphsController.clearGraphByUserAction(),
            this.triggerEvent("triggerRender")
        }
        ,
        t.onOpenGraph = function(t) {
            t.example || (t.recovery ? i("recovered-graph", {
                product: this.graphsController.product,
                timeSincePageload: Date.now() - this.pageLoadTime,
                payloadJSON: {
                    action: "open"
                }
            }) : i("user-action::open-saved", {
                product: this.graphsController.product,
                timeSincePageload: Date.now() - this.pageLoadTime
            }));
            var e = this.copyGraphWithTranslation(t);
            this.graphsController.loadGraph(e),
            this._concludeOpenGraph(e)
        }
        ,
        t.toast = function(t, e) {
            this.triggerEvent("toast", {
                message: t,
                opts: e
            })
        }
        ,
        t._concludeOpenGraph = function(t) {
            var e = t.title || this.graphsController.getUntitledString()
              , r = this.s("account-shell-text-mygraphs-opened-graph", {
                graphTitle: e
            });
            this.toast(r, {
                undoCallback: function() {
                    this.graphsController.restorePreviousGraph()
                }
                .bind(this)
            }),
            this.closeMygraphs(),
            this.triggerEvent("triggerRender")
        }
        ,
        t.copyGraphWithTranslation = function(t) {
            var e = t.copy();
            return t.example && (e.title = this.s(t.title)),
            e
        }
        ,
        t.openGraphBehindCover = function(t) {
            var r = this.copyGraphWithTranslation(t);
            this.graphsController.loadGraph(r);
            var o = e.Deferred();
            return "graphing" === this.graphsController.product || "graphing3d" === this.graphsController.product ? (this.api._calc.evaluator.notifyWhenSynced(function() {
                o.resolve()
            }),
            setTimeout(function() {
                o.resolve()
            }, 6e3)) : "geometry" === this.graphsController.product && o.resolve(),
            o.then(function() {
                this._concludeOpenGraph(r)
            }
            .bind(this)),
            o.promise()
        }
        ,
        t.getThumbnail = function() {
            return this.api.screenshot({
                width: 200,
                height: 200,
                targetPixelRatio: 2
            })
        }
    })
});
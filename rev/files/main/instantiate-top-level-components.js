
define('main/instantiate-top-level-components', ['require', 'config', 'underscore', 'main/user_controller', 'main/graphs_controller', 'main/language_controller', 'main/mygraphs_controller', 'tours/tour_controller', 'calculator-shell/controller', 'main/globalhotkeys', 'browser', 'ipad.scrollfix', 'loadcss!main', 'api/calculator'], function(require) {
    "use strict";
    var e = require("config")
      , r = require("underscore")
      , o = require("main/user_controller").UserController
      , a = require("main/graphs_controller").GraphsController
      , t = require("main/language_controller").default
      , n = require("main/mygraphs_controller")
      , l = require("tours/tour_controller")
      , s = require("calculator-shell/controller").Controller
      , c = require("main/globalhotkeys").default
      , i = require("browser")
      , h = require("ipad.scrollfix");
    require("loadcss!main");
    var d = require("api/calculator");
    return function(g) {
        var p = e.all()
          , u = JSON.parse(g.exampleGraphsRaw);
        p.disableScrollFix || h.limitScrollOnDocument(),
        p.redrawSlowly = !i.IS_MOBILE,
        p.border = !1,
        p.disableScrollFix = !0,
        p.showHamburger = !0,
        g.calcOptions && (p = r.extend(p, g.calcOptions));
        var v = document.getElementById("graph-container")
          , m = d.Calculator(v, p, g.onCalcReady)
          , b = l(m);
        window.tourController = b;
        var w = new t(m)
          , y = new o
          , C = w.s.bind(w)
          , f = w.raw.bind(w)
          , _ = w.unpack.bind(w)
          , E = new a({
            api: m,
            s: C,
            getLanguage: w.getLanguage.bind(w),
            examplesJSON: u,
            randomSeed: g.seed,
            product: "graphing"
        });
        E.observeEvent("driveAccessError", function(e, r) {
            m._calc.controller.dispatch({
                type: "toast/show",
                toast: {
                    message: 'Error saving. <a href="' + r.authorizeUrl + '" target="_blank" class="dcg-action-hide">Click here</a> to re-authorize Desmos to save graphs to Google Drive.',
                    toastStyle: "error",
                    hideAfter: 0
                }
            })
        });
        var S = n(E, m, C);
        E.observeEvent("onClearGraph", function() {
            m.focusFirstExpression()
        }),
        S.observeEvent("toast", function(e, r) {
            var o = {
                message: r.message
            };
            for (var a in r.opts)
                r.opts.hasOwnProperty(a) && (o[a] = r.opts[a]);
            m._calc.controller.dispatch({
                type: "toast/show",
                toast: o
            })
        }),
        E.observeEvent("toast", function(e, r) {
            var o = {
                message: r.message
            };
            for (var a in r.opts)
                r.opts.hasOwnProperty(a) && (o[a] = r.opts[a]);
            m._calc.controller.dispatch({
                type: "toast/show",
                toast: o
            })
        }),
        E.observeEvent("clearUnsavedChanges", function() {
            m._calc.controller.dispatch({
                type: "clear-unsaved-changes"
            })
        }),
        E.observeEvent("clearUndoRedo", function() {
            m._calc.controller.dispatch({
                type: "clear-undoredo-history"
            })
        });
        var k, G = !1;
        m._calc.controller.subToChanges(function() {
            var e = m._calc.controller.hasUnsavedChanges();
            e !== G && x.triggerRender(),
            G = e
        }),
        m.hasUnsavedChanges = function() {
            return m._calc.controller.hasUnsavedChanges()
        }
        ,
        m.controller.triggerEasterEgg = function(e) {
            var r = "betchacant" === e ? m.controller.s("account-shell-label-betchacant-loading") : m.controller.s("account-shell-label-loading")
              , o = E.getEasterEggGraphs(e);
            0 !== o.length && (k = Math.floor(Math.random() * o.length),
            m.controller.dispatch({
                type: "toast/show",
                toast: {
                    message: r,
                    hideAfter: 0,
                    toastStyle: "cover"
                }
            }),
            E.loadGraphImmediately(o[k]).done(function() {
                S.openGraphBehindCover(o[k])
            }))
        }
        ,
        !1 !== e.get("expressions") && (m.controller.triggerClearGraph = function() {
            E.clearGraphByUserAction()
        }
        ,
        m.observeEvent("openDrawer", function() {
            x.dispatch({
                type: "open-mygraphs"
            })
        }));
        var x = new s({
            userController: y,
            graphsController: E,
            tourController: b,
            languageController: w,
            mygraphsController: S,
            api: m,
            s: C,
            raw: f,
            unpack: _,
            getLanguage: w.getLanguage.bind(w),
            product: "graphing"
        });
        return m._calc.globalHotkeys = new c(m._calc.controller,x,m._calc.instanceHotkeys),
        m._calc.controller.setCanShowKeyboardShortcuts(!0),
        m.observeEvent("showHotkeysModal", function() {
            x.dispatch({
                type: "show-modal",
                modal: "hotkeys",
                device: "keyboard"
            })
        }),
        window.userController = y,
        window.headerController = x,
        {
            Calc: m,
            userController: y,
            graphsController: E,
            tourController: b,
            headerController: x
        }
    }
});
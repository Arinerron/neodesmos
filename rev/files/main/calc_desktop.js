
define('main/calc_desktop', ['require', 'jquery', 'browser', 'main/load_data', 'config', 'loadcss!print', 'lib/i18n', 'main/graph', 'text!example_graphs', 'api/calculator', 'main/external-login-popup', 'analytics/looker', 'analytics/usage-monitor', 'dcgview', 'calculator-shell/wrapper', 'calculator-shell/modals', 'mygraphs/wrapper', 'main/disable-dragdrop-events', 'vendor/bugsnag', 'bugsnag', './instantiate-top-level-components'], function(require) {
    "use strict";
    var e = require("jquery")
      , a = require("browser")
      , t = require("main/load_data")
      , o = require("config");
    require("loadcss!print");
    var n = require("lib/i18n")
      , r = require("main/graph")
      , s = require("text!example_graphs")
      , l = require("api/calculator")
      , i = require("main/external-login-popup")
      , c = require("analytics/looker").logPageLoad
      , d = require("analytics/usage-monitor").default
      , p = require("dcgview")
      , u = require("calculator-shell/wrapper").ViewWrapper
      , g = require("calculator-shell/modals").Modals
      , m = require("mygraphs/wrapper").MygraphsWrapper
      , h = require("main/disable-dragdrop-events").default
      , w = require("vendor/bugsnag")
      , y = require("bugsnag");
    function f(n) {
        var w = require("./instantiate-top-level-components")({
            seed: t.seed,
            modalContainer: "body",
            exampleGraphsRaw: s,
            calcOptions: {
                pasteGraphLink: !0
            }
        })
          , f = w.Calc
          , v = f._calc.controller;
        v.setBugsnagContext("main-controller"),
        f.updateSettings({
            language: n
        });
        var x = w.userController
          , C = w.graphsController
          , I = w.tourController
          , S = w.headerController;
        function b(e, a) {
            return v.s(e, a)
        }
        y.setBeforeSendCB(function(e) {
            var a = v.stateStack;
            a && a.serializeForBugsnag && (e.metaData.states = a.serializeForBugsnag())
        });
        var k = new d({
            calcController: v
        });
        (k.trackFeatureUsage("graph-feature", "hasSlider"),
        k.trackFeatureUsage("graph-feature", "hasRegression"),
        k.trackFeatureUsage("graph-feature", "hasAction"),
        k.trackFeatureUsage("graph-feature", "expressionErrors"),
        k.start(),
        i.listenForLoginRequests(x, b),
        o.get("no_navigation_warning") || e(window).on("beforeunload", function() {
            if (f.hasUnsavedChanges())
                return b("account-shell-text-confirm-leave")
        }),
        t.user && x.completeLogin(t.user, "load"),
        t.graph ? C.loadGraph(r.fromAjax(t.graph)) : (C.clearGraph(),
        t.latex && f.setExpression({
            latex: t.latex
        })),
        c({
            userId: x.getUserId(),
            desmosLang: n
        }),
        I.startTourFromUrl(),
        x.getEmailChangeToken() && S.dispatch({
            type: "show-modal",
            modal: "change-email",
            device: "mouse"
        }),
        S.triggerRender = function() {
            f.viewWrapper && f.viewWrapper.update(),
            f.modalsView && f.modalsView.update(),
            f.myGraphsWrapper && f.myGraphsWrapper.update(),
            x.getEmailChangeToken() && "change-email" !== S.getOpenModal() && history.replaceState(null, null, document.location.pathname)
        }
        ,
        f.viewWrapper = p.mountToNode(u, document.getElementById("dcg-header-container"), {
            controller: function() {
                return S
            }
        }),
        f.modalsView = p.mountToNode(g, document.getElementById("dcg-modal-container"), {
            controller: function() {
                return S
            }
        }),
        f.myGraphsWrapper = p.mountToNode(m, document.getElementById("mygraphs-container"), {
            controller: p.const(S),
            makeAPI: function(e) {
                return new l.Calculator(e,{
                    settingsMenu: !1,
                    keypad: !1,
                    zoomButtons: !1,
                    branding: !1,
                    border: !1,
                    disableScrollFix: !0,
                    expressions: !1
                })
            }
        }),
        !a.IS_ANDROID || a.IS_CHROME || a.IS_FIREFOX || S.dispatch({
            type: "show-modal",
            modal: "unsupported-browser"
        }),
        document.location.search.match(/(\?|\&)create_account/) ? (history.replaceState(null, null, document.location.pathname),
        x.isLoggedIn() ? v.dispatch({
            type: "toast/show",
            toast: {
                message: b("account-shell-text-logged-in")
            }
        }) : S.dispatch({
            type: "show-modal",
            modal: "signup",
            device: "mouse"
        })) : document.location.search.match(/(\?|\&)login/) ? (history.replaceState(null, null, document.location.pathname),
        x.isLoggedIn() ? v.dispatch({
            type: "toast/show",
            toast: {
                message: b("account-shell-text-logged-in")
            }
        }) : S.dispatch({
            type: "show-modal",
            modal: "login"
        })) : document.location.search.match(/(\?|\&)reset_password/) && (history.replaceState(null, null, document.location.pathname),
        S.dispatch({
            type: "show-modal",
            modal: "recover-password"
        })),
        window.matchMedia) && window.matchMedia("print").addListener(function(e) {
            e.matches ? v.dispatch({
                type: "enter-printmode"
            }) : v.dispatch({
                type: "exit-printmode"
            })
        });
        return h(e(document)),
        f
    }
    o.get("testing") || y.init(w);
    var v = n.detectLanguage();
    return n.fetchLanguage(v).then(function() {
        return f(v)
    }, function() {
        return f("en")
    })
});
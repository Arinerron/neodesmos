
define('analytics/looker', ["require", "exports", "tslib", "underscore", "jquery"], function(require, e, a, n, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.logPageLoad = e.logJSON = e.logNumber = e.log = e.getPageLoadId = void 0;
    var o, t = {
        eventType: "eventType",
        pageLoadId: window.pageLoadId || "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            var a = 16 * Math.random() | 0;
            return ("x" == e ? a : 3 & a | 8).toString(16)
        }),
        source: "browser",
        app: "knox",
        userAgent: navigator.userAgent
    }, g = [];
    function i(e) {
        var n = a.__assign(a.__assign(a.__assign({}, t), {
            url: document.location.href
        }), e);
        g.push(n),
        s()
    }
    function x(e, a) {
        i({
            eventType: e,
            payloadJSON: JSON.stringify(a)
        })
    }
    e.getPageLoadId = function() {
        return t.pageLoadId
    }
    ,
    e.log = i,
    e.logNumber = function(e, a) {
        i({
            eventType: e,
            payloadNumber: a
        })
    }
    ,
    e.logJSON = x;
    var u = !0;
    e.logPageLoad = function(e) {
        var n = document.location.href
          , r = navigator.userLanguage || navigator.language
          , t = document.referrer
          , g = a.__assign({
            browserLang: r,
            referrer: t
        }, e);
        o !== n && (o = n,
        u ? (x("page-load", g),
        u = !1) : (delete g.referrer,
        x("page-spa-load", g)))
    }
    ;
    var d = !1
      , s = n.throttle(function() {
        if (!d && 0 != g.length) {
            var e = g.splice(0, 50);
            d = !0,
            r.ajax({
                url: "/data-events",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    events: e
                })
            }).always(function() {
                d = !1,
                s()
            })
        }
    }, 1e3, {
        leading: !1
    })
});
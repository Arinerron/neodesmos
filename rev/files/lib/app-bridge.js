define('lib/app-bridge', ['require', 'jquery', 'underscore_model', 'browser', 'lib/conditional_blur', 'vendor/fake-xml-http-request', 'pjs', 'console', 'main/backend'], function(require) {
    "use strict";
    var e = require("jquery")
      , t = require("underscore_model").UnderscoreModel
      , n = require("browser")
      , o = require("lib/conditional_blur").default
      , i = require("vendor/fake-xml-http-request")
      , r = null
      , s = null
      , a = require("pjs")
      , d = require("console")
      , l = !1
      , u = require("main/backend")
      , h = {}
      , c = 0;
    if (n.IS_IOS) {
        var f = []
          , m = [];
        r = {
            loaded: !1,
            methods: {},
            queuedMethodCalls: []
        },
        e(function() {
            var t = [];
            window.ObjC_callback = function(e) {
                r.loaded = !0,
                e.split(" ").forEach(function(e) {
                    r.methods[e] = function(o, i) {
                        var r, s, a = i ? (r = i,
                        s = m.length ? m.pop() : f.length,
                        f[s] = r,
                        s) : -1;
                        t.push("desmos:" + e + "/" + a + "/" + encodeURIComponent(o)),
                        1 === t.length && n.attr("src", t[0])
                    }
                }),
                this.ObjC_callback = function(e, o) {
                    try {
                        -1 !== e && (r = f[i = e],
                        f[i] = null,
                        m.push(i),
                        r)(o)
                    } finally {
                        t.shift(),
                        t.length > 0 && n.attr("src", t[0])
                    }
                    var i, r
                }
                ,
                r.methods.proxyXHR && (window.XMLHttpRequest = i,
                i.onSend = function(e) {
                    var t = c + "";
                    c += 1,
                    h[t] = e,
                    r.methods.proxyXHR(JSON.stringify({
                        id: t,
                        url: e.url,
                        method: e.method,
                        headers: e.requestHeaders,
                        body: e.requestBody
                    }))
                }
                ),
                r.queuedMethodCalls.forEach(function(e) {
                    p[e.methodName].apply(p, e.args)
                })
            }
            ;
            var n = e('<iframe id="objc-bridge" style="position:absolute; left: -1000px; z-index: -1" src="desmos:loaded"/>').appendTo(document.body)
        })
    } else
        n.IS_ANDROID ? s = window.Android : l = !0;
    var p = new (a(t, function(e, t) {
        e.init = function() {
            t.init.call(this),
            this.heartbeatTimeout = null,
            this.observeEvent("started resumed", function(e) {
                this.gaEvent(e + ":" + this.versionNumber),
                this.incrementHeartbeat(0)
            }
            .bind(this)),
            -1 !== document.location.search.indexOf("simulateVersionNumber") && (this.versionNumber = "?.?.?")
        }
        ,
        e.heartbeat = function(e) {
            clearTimeout(this.heartbeatTimeout),
            this.gaEvent("heartbeat-" + 10 * e),
            this.incrementHeartbeat(e)
        }
        ,
        e.incrementHeartbeat = function(e) {
            clearTimeout(this.heartbeatTimeout),
            this.heartbeatTimeout = setTimeout(function() {
                this.heartbeat(e + 1)
            }
            .bind(this), 6e5)
        }
        ,
        e._started = function(e, t) {
            this.appId = e,
            this.versionNumber = t,
            this.triggerEvent("started")
        }
        ,
        e._resumed = function() {
            this.triggerEvent("resumed")
        }
        ,
        e.handleAndroidBackButtonAndReturnIfShouldMoveToBackground = function() {
            var e = window.Calc && window.Calc.controller;
            return e && e.isKeypadOpen() ? (o(),
            "false") : (e = window.MainController) && e.handleAndroidBackButton() ? "false" : "true"
        }
        ,
        e.isInApp = function() {
            return window.platform && "www" !== window.platform
        }
        ,
        e.onGoogleAuthResult = function(e) {
            this.triggerEvent("onGoogleAuthResult", e)
        }
        ,
        e.onAppleAuthResult = function(e) {
            this.triggerEvent("onAppleAuthResult", e)
        }
        ,
        e.onObjCXHRProxyResult = function(e) {
            var t = e.id
              , n = h[t];
            delete h[t],
            n.respond(e.status, e.headers, e.body)
        }
        ,
        e.sendAnalyticsEvent = function(e, t) {
            this.sendSerializedAnalyticsEvent(JSON.stringify({
                type: e,
                payload: t
            }))
        }
    }));
    return ["hideLoadingScreen", "gaEvent", "openGoogleLogin", "openAppleLogin", "logout", "saveCookies", "deleteCookies", "startSingleAppMode", "endSingleAppMode", "setWWWSubdomain", "sendSerializedAnalyticsEvent", "sendStoredLogsToDesmos"].forEach(function(e) {
        p[e] = function() {
            l || (s ? s[e] ? s[e].apply(s, arguments) : d.log("call to missing Android method", e, arguments) : r && (r.loaded ? r.methods[e] ? r.methods[e].apply(r, arguments) : d.log("call to missing ObjC method", e, arguments) : r.queuedMethodCalls.push({
                methodName: e,
                args: arguments
            })))
        }
    }),
    l || (window.AppBridge = p,
    document.addEventListener("click", function(t) {
        var n = e(t.target).closest("a[href]")[0];
        if (n && "file:" === n.protocol) {
            var o = n.getAttribute("href");
            "/" !== o[0] && (o = "/" + o),
            n.setAttribute("href", u.baseURL + o)
        }
    }, !0)),
    p
});

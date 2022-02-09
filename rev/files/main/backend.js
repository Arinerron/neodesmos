define('main/backend', ["require", "exports", "jquery"], function(require, e, t) {
    "use strict";
    function r(e) {
        return function(t) {
            if (t && t.responseJSON && (t = t.responseJSON),
            !0 === t.success)
                e.resolve();
            else {
                var r = (t && t.errors || []).map(function(e) {
                    return e.message
                });
                e.reject(r[0] || "Internal Server Error")
            }
        }
    }
    function n(e) {
        if (e && e.routeDeprecated) {
            e.js && new Function(e.js)();
            var r = t.Deferred();
            return r.reject(e),
            r.promise()
        }
        return e
    }
    function o(r, o) {
        return t.ajax({
            dataType: "json",
            url: e.baseURL + r,
            xhrFields: {
                withCredentials: !0
            },
            data: o
        }).then(n)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getJSON = e.postJSON = e.post = e.handleDeprecatedRoute = e.exchangeAppleAuth = e.exchangeGoogleAuthCode = e.getAppleLoginURL = e.getGoogleLoginURL = e.baseURL = void 0,
    e.baseURL = "",
    e.getGoogleLoginURL = function(t) {
        void 0 === t && (t = {});
        var r = "?source=" + (t.fromUI || "");
        return t.teacher && (r += "&teacher=true"),
        e.baseURL + "/drive_api/calculator/login" + r
    }
    ,
    e.getAppleLoginURL = function(t) {
        void 0 === t && (t = {});
        var r = "?source=" + (t.fromUI || "");
        return t.teacher && (r += "&teacher=true"),
        e.baseURL + "/apple_api/calculator/login" + r
    }
    ,
    e.exchangeGoogleAuthCode = function(e) {
        var n = t.Deferred();
        return e ? o("/account/google_auth?code=" + e).always(r(n)) : setTimeout(function() {
            n.reject("no auth code")
        }, 1),
        n.promise()
    }
    ,
    e.exchangeAppleAuth = function(e) {
        var n = t.Deferred()
          , a = e && e.jwt
          , c = e && e.name || "";
        return e && a ? o("/account/apple_auth?name=" + encodeURIComponent(c) + "&jwt=" + encodeURIComponent(a)).always(r(n)) : setTimeout(function() {
            n.reject("no auth code")
        }, 1),
        n.promise()
    }
    ,
    e.handleDeprecatedRoute = n,
    e.post = function(r, o) {
        return t.ajax({
            type: "POST",
            url: e.baseURL + r,
            headers: {
                Accept: "application/json, text/javascript, */*; q=0.01"
            },
            data: o,
            xhrFields: {
                withCredentials: !0
            }
        }).then(n)
    }
    ,
    e.postJSON = function(r, o) {
        return t.ajax({
            type: "POST",
            contentType: "application/json",
            url: e.baseURL + r,
            headers: {
                Accept: "application/json, text/javascript, */*; q=0.01"
            },
            data: JSON.stringify(o || null),
            xhrFields: {
                withCredentials: !0
            }
        }).then(n)
    }
    ,
    e.getJSON = o
});
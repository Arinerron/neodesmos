define('lib/urlparser', ["require", "exports"], function(require, e) {
    "use strict";
    function r(e, r) {
        return new RegExp("[?|&]" + r + "(=|&|;|$)").test(e)
    }
    function t(e, r, t) {
        if (r !== encodeURIComponent(r))
            throw new Error("Programming error: parameter name should be URL-safe without encoding.");
        var n = encodeURIComponent(t);
        if (e.length) {
            var a = e.split("#")
              , o = /\?/.test(e) ? a[0] + "&" + r + "=" + n : a[0] + "?" + r + "=" + n;
            return void 0 !== a[1] ? o + "#" + a[1] : o
        }
        return "?" + r + "=" + n
    }
    function n(e, r, t) {
        var n = new RegExp("([?|&])" + r + "=([^&;]+?)(&|#|;|$)").exec(e);
        if (!n)
            return e;
        var a = n[1]
          , o = "" + a + r + "=" + n[2]
          , u = "" + a + r + "=" + encodeURIComponent(t);
        return e.replace(o, u)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.setParameter = e.deleteParameter = e.replaceParameter = e.pushParameter = e.hasParameter = e.getParameter = void 0,
    e.getParameter = function(e, r) {
        var t = new RegExp("[?|&]" + r + "=([^&;]+?)(&|#|;|$)").exec(e);
        return t ? decodeURIComponent(t[1].replace(/\+/g, "%20")) : null
    }
    ,
    e.hasParameter = r,
    e.pushParameter = t,
    e.replaceParameter = n,
    e.deleteParameter = function(e, r) {
        var t = new RegExp("([?|&])" + r + "=([^&;]+?)(&|#|;|$)").exec(e);
        if (!t)
            return e;
        var n = "" + t[1] + r + "=" + t[2]
          , a = e.replace(n, "");
        return "&" === a[0] ? a.replace("&", "?") : a
    }
    ,
    e.setParameter = function(e, a, o) {
        return r(e, a) ? n(e, a, o) : t(e, a, o)
    }
});
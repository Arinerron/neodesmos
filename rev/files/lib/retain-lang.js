define('lib/retain-lang', ["require", "exports", "./parse-query-params", "./urlparser"], function(require, e, r, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.retainLang = e.domainNotDesmos = void 0;
    var a = /lang=[A-Za-z]+/
      , s = /(cl|learn|help).desmos.com/
      , n = /^(?:https?:)?(?:\/\/)?([^\s\/\?]+)/i
      , o = /(^desmos\.com$)|(\.desmos.com$)/;
    function i(e) {
        var r = n.exec(e);
        if (r) {
            var t = r[1];
            return !o.test(t)
        }
        return !1
    }
    e.domainNotDesmos = i,
    e.retainLang = function(e, n) {
        var o = r.getQueryParams()
          , m = "";
        return m = void 0 !== n ? n : o.lang ? "" + o.lang : "",
        "" === e || "" === m || a.test(e) || s.test(e) || i(e) ? e : t.setParameter(e, "lang", m)
    }
});

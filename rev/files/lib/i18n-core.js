
define('lib/i18n-core', ["require", "exports", "text!l10n/all-en-strings.ftl", "tslib", "underscore", "lib/console", "./i18n-homepage-langs", "./enabled-languages", "./fluent-bundle-sequence"], function(require, n, r, e, t, a, u, o, i) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    n.unpack = n.isSupportedLanguage = n.currentLanguage = n.formatWithFluent = n.createDictionaryLookupFunction = n.s = n.raw = n.hasTranslation = n.restrictToHomepageLanguages = n.initFluentData = n.setLanguage = n.locale_dict = void 0;
    var l = "";
    n.locale_dict = {};
    var c = {}
      , s = {}
      , f = ["ar", "hy-AM", "hi", "tr", "xx-XX"];
    function g(n, r, e) {
        return p(n, null != r ? r : {}, null != e ? e : l)
    }
    function p(n, r, e) {
        var t = d(e).format(n, function(n) {
            var r = {};
            for (var e in n) {
                var t = n[e];
                void 0 !== t && (r[e] = t)
            }
            return r
        }(r));
        return null == t ? (a.warn("Could not format string " + n),
        "") : t
    }
    function d(t) {
        var u = s[t];
        if (!u) {
            n.locale_dict[t] || (n.locale_dict[t] = o.expandLocaleOptionsThoroughly([t]));
            for (var l = [], f = 0, g = n.locale_dict[t]; f < g.length; f++) {
                var p = g[f]
                  , d = c[p];
                d && l.push({
                    lang: p,
                    source: d
                })
            }
            var v = {};
            "xx-XX" === t && (v.transform = function(n) {
                return n.replace(/[a-z]/gi, "♦")
            }
            ),
            u = s[t] = i.FluentBundleSequence.fromSources(e.__spreadArray(e.__spreadArray([], l), [{
                lang: "en",
                source: r
            }]), function(n) {
                a.warn(n)
            }, v)
        }
        return u
    }
    n.setLanguage = function(n) {
        l = n || ""
    }
    ,
    n.initFluentData = function(n) {
        for (var r in n)
            delete s[r],
            c[r] = n[r]
    }
    ,
    n.restrictToHomepageLanguages = function() {
        for (var n in o.ENABLED_LANGUAGES)
            u.isHomepageLanguage(n) || delete o.ENABLED_LANGUAGES[n]
    }
    ,
    n.hasTranslation = function(n, r) {
        var e = null != r ? r : l;
        return d(e).hasTranslation(n, e)
    }
    ,
    n.raw = function(n, r) {
        if (r)
            for (var e in r)
                r.hasOwnProperty(e) && (n = n.split("__" + e + "__").join(r[e]));
        return n
    }
    ,
    n.s = g,
    n.createDictionaryLookupFunction = function(n) {
        return function(r, e) {
            return p(r, null != e ? e : {}, n())
        }
    }
    ,
    n.formatWithFluent = p,
    n.currentLanguage = function() {
        return l
    }
    ,
    n.isSupportedLanguage = function(n) {
        return o.ENABLED_LANGUAGES.hasOwnProperty(n) || t.contains(f, n)
    }
    ,
    n.unpack = function n(r, e) {
        if (null == r)
            return "";
        if ("string" == typeof r)
            return r;
        if ("number" == typeof r)
            return "" + r;
        var t, a = r.vars;
        if (a)
            for (var u in t = {},
            a)
                a.hasOwnProperty(u) && (t[u] = n(a[u], e));
        return g(r.key, t, e)
    }
});
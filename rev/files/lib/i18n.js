
define('lib/i18n', ["require", "exports", "config", "jquery", "lib/console", "./enabled-languages", "./i18n-core", "./i18n-core"], function(require, e, a, n, t, r, o, u) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.fetchLanguage = e.detectLanguage = e.locale_dict = e.unpack = e.currentLanguage = e.createDictionaryLookupFunction = e.s = e.raw = e.hasTranslation = e.restrictToHomepageLanguages = void 0,
    Object.defineProperty(e, "restrictToHomepageLanguages", {
        enumerable: !0,
        get: function() {
            return u.restrictToHomepageLanguages
        }
    }),
    Object.defineProperty(e, "hasTranslation", {
        enumerable: !0,
        get: function() {
            return u.hasTranslation
        }
    }),
    Object.defineProperty(e, "raw", {
        enumerable: !0,
        get: function() {
            return u.raw
        }
    }),
    Object.defineProperty(e, "s", {
        enumerable: !0,
        get: function() {
            return u.s
        }
    }),
    Object.defineProperty(e, "createDictionaryLookupFunction", {
        enumerable: !0,
        get: function() {
            return u.createDictionaryLookupFunction
        }
    }),
    Object.defineProperty(e, "currentLanguage", {
        enumerable: !0,
        get: function() {
            return u.currentLanguage
        }
    }),
    Object.defineProperty(e, "unpack", {
        enumerable: !0,
        get: function() {
            return u.unpack
        }
    });
    var s = "undefined" != typeof Desmos && Desmos.localeData ? Desmos.localeData : {};
    function i() {
        for (var e = r.expandLocaleOptionsThoroughly([a.get("language"), navigator.userLanguage, navigator.language]), n = 0; n < e.length; n++) {
            var t = e[n];
            if (o.isSupportedLanguage(t))
                return t
        }
        return "en"
    }
    e.locale_dict = {},
    e.detectLanguage = i,
    e.fetchLanguage = function(e) {
        var a = n.Deferred();
        if ("undefined" == typeof Desmos)
            return a.reject(),
            a.promise();
        if (Desmos.supportedLanguages || (Desmos.supportedLanguages = []),
        Desmos.supportedLanguages.indexOf(e) >= 0 || "en" === e || "xx-XX" === e)
            return o.setLanguage(e),
            a.resolve(!0),
            a.promise();
        if (!o.isSupportedLanguage(e)) {
            var u = -1 !== e.indexOf("-") ? e.split("-")[0] : e;
            for (var s in r.ENABLED_LANGUAGES)
                if (u === s.split("-")[0] && r.ENABLED_LANGUAGES[s].useAsRoot) {
                    e = s;
                    break
                }
        }
        return n.get("/api/v1/calculator/language/" + e + ".ftl", function(n) {
            Desmos.localeData || (Desmos.localeData = {}),
            Desmos.supportedLanguages || (Desmos.supportedLanguages = []),
            Desmos.localeData[e] = n[e],
            Desmos.supportedLanguages.push(e),
            o.initFluentData(Desmos.localeData),
            o.setLanguage(e),
            a.resolve(!0)
        }).fail(function(n) {
            404 === n.status && t.warn(e + " is not an available language."),
            a.reject()
        }),
        a.promise()
    }
    ,
    o.initFluentData(s),
    o.setLanguage(i())
});
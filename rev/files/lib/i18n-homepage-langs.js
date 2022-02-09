define('lib/i18n-homepage-langs', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.isHomepageLanguage = e.homepage_languages = void 0,
    e.homepage_languages = {
        ar: !0,
        de: !0,
        en: !0,
        es: !0,
        et: !0,
        fr: !0,
        id: !0,
        it: !0,
        ja: !0,
        ko: !0,
        nl: !0,
        pl: !0,
        "pt-BR": !0,
        ru: !0,
        "sv-SE": !0,
        th: !0,
        tr: !0,
        vi: !0,
        "zh-CN": !0,
        "zh-TW": !0
    },
    e.isHomepageLanguage = function(a) {
        return !!e.homepage_languages[a]
    }
});
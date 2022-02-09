
define('lib/enabled-languages', ["require", "exports"], function(require, s) {
    "use strict";
    Object.defineProperty(s, "__esModule", {
        value: !0
    }),
    s.ENABLED_LANGUAGES = s.buildSupportedLanguagesMap = s.expandLocaleOptionsThoroughly = void 0,
    s.expandLocaleOptionsThoroughly = function(e) {
        for (var o = [], a = 0, d = e; a < d.length; a++) {
            var m = d[a];
            if (m && "string" == typeof m) {
                var u = m.split("-")[0];
                for (var t in o.push(m),
                o.push(u),
                s.ENABLED_LANGUAGES) {
                    var i = s.ENABLED_LANGUAGES[t];
                    t.split("-")[0] === u && i.useAsRoot && o.push(t)
                }
            }
        }
        return o
    }
    ,
    s.buildSupportedLanguagesMap = function() {
        var e = {}
          , o = Object.keys(s.ENABLED_LANGUAGES);
        for (var a in o) {
            var d = o[a];
            e[d] = {
                code: d,
                display_name: s.ENABLED_LANGUAGES[d].displayName
            }
        }
        return e
    }
    ,
    s.ENABLED_LANGUAGES = {
        en: {
            displayName: "English (US)",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !1
        },
        es: {
            displayName: "Español (LATAM)",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_ES-ES.pdf",
            useAsRoot: !0
        },
        et: {
            displayName: "Eesti",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !1
        },
        ru: {
            displayName: "Русский",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_RU.pdf",
            useAsRoot: !1
        },
        da: {
            displayName: "Dansk",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !1
        },
        de: {
            displayName: "Deutsch",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_DE.pdf",
            useAsRoot: !1
        },
        "pt-BR": {
            displayName: "Português (Brasil)",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !0
        },
        "pt-PT": {
            displayName: "Português (Portugal)",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !1
        },
        ca: {
            displayName: "Català",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !1
        },
        fr: {
            displayName: "Français",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_FR.pdf",
            useAsRoot: !1
        },
        it: {
            displayName: "Italiano",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_IT.pdf",
            useAsRoot: !1
        },
        is: {
            displayName: "Íslenska",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !1
        },
        nl: {
            displayName: "Nederlands",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !1
        },
        no: {
            displayName: "Norsk",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !1
        },
        "sv-SE": {
            displayName: "Svenska",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !0
        },
        hu: {
            displayName: "Magyar",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !1
        },
        cs: {
            displayName: "Čeština",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !1
        },
        pl: {
            displayName: "Polski",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_PL.pdf",
            useAsRoot: !1
        },
        id: {
            displayName: "Bahasa Indonesia",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !1
        },
        vi: {
            displayName: "Tiếng Việt",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_VI.pdf",
            useAsRoot: !1
        },
        el: {
            displayName: "Ελληνικά",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_EL.pdf",
            useAsRoot: !1
        },
        uk: {
            displayName: "Українська",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !1
        },
        ka: {
            displayName: "ქართული",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !1
        },
        th: {
            displayName: "ภาษาไทย",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !1
        },
        tr: {
            displayName: "Türkçe",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_TR.pdf",
            useAsRoot: !1
        },
        "zh-CN": {
            displayName: "简体中文",
            useAsRoot: !0,
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_ZH-CN.pdf"
        },
        "zh-TW": {
            displayName: "繁體中文",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_ZH-TW.pdf",
            useAsRoot: !1
        },
        ko: {
            displayName: "한국어",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide.pdf",
            useAsRoot: !1
        },
        ja: {
            displayName: "日本語",
            userGuideURL: "https://desmos.s3.amazonaws.com/Desmos_User_Guide_JA.pdf",
            useAsRoot: !1
        }
    }
});

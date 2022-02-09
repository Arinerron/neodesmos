define('api/util', ["require", "exports", "lib/console"], function(require, e, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.validateLanguage = void 0,
    e.validateLanguage = function(e) {
        return "es-ES" === e ? (a.warn("{language: 'es-ES'} has been deprecated. Proceeding with {language: 'es'}"),
        "es") : e
    }
});


define('core/math/parser/char-codes', ["require", "exports"], function(require, e) {
    "use strict";
    function t(e) {
        return 97 <= e && e <= 122
    }
    function i(e) {
        return 65 <= e && e <= 90
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.isWhitespace = e.isSingleQuote = e.isDot = e.isBackslash = e.isLetter = e.isUpperCaseLetter = e.isLowerCaseLetter = e.isDigit = void 0,
    e.isDigit = function(e) {
        return 48 <= e && e <= 57
    }
    ,
    e.isLowerCaseLetter = t,
    e.isUpperCaseLetter = i,
    e.isLetter = function(e) {
        return t(e) || i(e)
    }
    ,
    e.isBackslash = function(e) {
        return 92 === e
    }
    ,
    e.isDot = function(e) {
        return 46 === e
    }
    ,
    e.isSingleQuote = function(e) {
        return 39 === e
    }
    ,
    e.isWhitespace = function(e) {
        if (9 <= e && e <= 13)
            return !0;
        if (8192 <= e && e <= 8202)
            return !0;
        switch (e) {
        case 32:
        case 160:
        case 5760:
        case 8232:
        case 8233:
        case 8239:
        case 8287:
        case 12288:
        case 65279:
            return !0;
        default:
            return !1
        }
    }
});
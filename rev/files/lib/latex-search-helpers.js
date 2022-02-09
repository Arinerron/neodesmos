
define('lib/latex-search-helpers', ["require", "exports"], function(require, e) {
    "use strict";
    function r(e) {
        return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
    }
    function t(e) {
        return e.replace(/\\\\right\\(\\*[})\]|])/g, ".*\\\\right\\$1").replace(/ ?\\([}\]])/g, ".*\\$1")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getFuzzyLatexRegExp = e.addFuzzyMatches = e.escapeForRegex = void 0,
    e.escapeForRegex = r,
    e.addFuzzyMatches = t,
    e.getFuzzyLatexRegExp = function(e) {
        var u = t(r(e));
        return new RegExp(u)
    }
});
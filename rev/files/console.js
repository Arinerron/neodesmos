
define('console', ['require'], function(require) {
    var o = function() {}
      , n = {};
    return ["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd", "time", "timeEnd", "group", "groupCollapsed", "groupEnd", "trace"].forEach(function(e) {
        "undefined" != typeof window && window.console && window.console[e] ? n[e] = function() {
            Function.prototype.apply.call(window.console[e], window.console, arguments)
        }
        : n[e] = o
    }),
    n
});
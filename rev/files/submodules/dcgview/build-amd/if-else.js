
define('submodules/dcgview/build-amd/if-else', ["./switch-union"], function(e) {
    "use strict";
    function t(e) {
        return e && "object" == typeof e && "default"in e ? e : {
            default: e
        }
    }
    var n = t(e);
    return function(e, t) {
        var u = n.default(function() {
            return e() ? "true" : "false"
        }, t);
        return u._viewName = "IfElse",
        u
    }
});
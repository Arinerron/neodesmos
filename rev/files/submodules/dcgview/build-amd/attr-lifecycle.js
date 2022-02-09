define('submodules/dcgview/build-amd/attr-lifecycle', ["./const"], function(t) {
    "use strict";
    function e(t) {
        return t && "object" == typeof t && "default"in t ? t : {
            default: t
        }
    }
    var n = e(t);
    return function(t) {
        return function(e) {
            if ("function" != typeof e)
                throw new Error("The " + t + " attribute expects a function for the value");
            if (n.default.isConst(e))
                throw new Error("The " + t + " attribute does not expect a const for the value");
            var r = {
                bindings: {}
            };
            return r.bindings[t] = e,
            r
        }
    }
});
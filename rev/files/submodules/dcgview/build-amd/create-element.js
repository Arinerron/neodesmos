
define('submodules/dcgview/build-amd/create-element', ["./dcg-element"], function(e) {
    "use strict";
    function r(e) {
        return e && "object" == typeof e && "default"in e ? e : {
            default: e
        }
    }
    var t = r(e);
    function n(e, r) {
        if (null != e)
            if (Array.isArray(e))
                for (var t = 0; t < e.length; t++)
                    n(e[t], r);
            else
                r.push(e)
    }
    return function(e, r) {
        for (var i = [], f = arguments.length - 1, u = 2; u <= f; u++)
            n(arguments[u], i);
        if ("string" == typeof e)
            return new t.default(e,r,i);
        if (e && e._isDCGViewClass)
            return new e(r,i);
        throw new Error("createElement expects a String or DCGViewClass")
    }
});
define('submodules/dcgview/build-amd/attr-style', ["./const", "./attr"], function(t, r) {
    "use strict";
    function e(t) {
        return t && "object" == typeof t && "default"in t ? t : {
            default: t
        }
    }
    var n = e(t)
      , u = e(r);
    function o(t) {
        var r = t()
          , e = typeof r;
        if ("string" === e)
            return r;
        if (!e || "object" !== e)
            throw new Error("Unsupported type returned from style getter: " + e);
        var n = "";
        for (var u in r) {
            var o = r[u];
            r.hasOwnProperty(u) && null != o && (n ? n += ";" + u + ":" + o : n = u + ":" + o)
        }
        return n
    }
    return function(t) {
        var r, e = o(t);
        return n.default.isConst(t) || (r = {
            onUpdate: function(r) {
                var n = o(t);
                e !== n && (u.default.update(r, "style", n),
                e = n)
            }
        }),
        {
            value: e,
            bindings: r
        }
    }
});

define('submodules/dcgview/build-amd/attr-generic', ["./const", "./attr"], function(t, n) {
    "use strict";
    function e(t) {
        return t && "object" == typeof t && "default"in t ? t : {
            default: t
        }
    }
    var u = e(t)
      , a = e(n);
    return function(t, n) {
        var e, r = n();
        return u.default.isConst(n) || (e = {
            onUpdate: function(e) {
                var u = n();
                u !== r && (r = u,
                a.default.update(e, t, u))
            }
        }),
        {
            value: r,
            bindings: e
        }
    }
});
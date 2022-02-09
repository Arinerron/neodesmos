define('submodules/dcgview/build-amd/compute-key-mutations', ["./longest-subsequence"], function(e) {
    "use strict";
    function r(e) {
        return e && "object" == typeof e && "default"in e ? e : {
            default: e
        }
    }
    var t = r(e);
    return function(e, r) {
        var n, o, u = {}, f = [], s = [];
        for (n = 0; n < r.length; n++)
            u[o = r[n]] = n;
        for (n = 0; n < e.length; n++)
            void 0 === u[o = e[n]] && f.push(o);
        var i = [];
        for (n = 0; n < e.length; n++) {
            var l = u[o = e[n]];
            void 0 !== l && i.push(l)
        }
        var a = t.default(i)
          , h = {};
        for (n = 0; n < a.length; n++)
            h[o = r[a[n]]] = !0;
        for (n = r.length - 1; n >= 0; n--)
            h[o = r[n]] || s.push({
                key: o,
                beforeKey: r[n + 1]
            });
        return {
            removes: f,
            inserts: s
        }
    }
});
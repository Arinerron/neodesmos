define('submodules/dcgview/build-amd/attr-class', ["./const"], function(r) {
    "use strict";
    function e(r) {
        return r && "object" == typeof r && "default"in r ? r : {
            default: r
        }
    }
    var t = e(r);
    function n(r) {
        var e = r()
          , t = typeof e;
        if ("string" === t)
            return e;
        if (!t || "object" !== t)
            throw new Error("Unsupported type returned from class getter: " + t);
        var n = "";
        for (var a in e) {
            if (e.hasOwnProperty(a))
                e[a] && (n ? n += " " + a : n = a)
        }
        return n
    }
    var a = /^\s+|\s+$/g
      , s = /\s+/;
    return function(r) {
        var e, o = n(r);
        return t.default.isConst(r) || (e = {
            onUpdate: function(e) {
                var t = n(r);
                o !== t && (e.className === o ? (e.className = t,
                o = t) : (e.className = function(r, e, t) {
                    for (var n = [], o = r.className.replace(a, "").split(s), i = e.replace(a, "").split(s), u = {}, f = i.length - 1; f >= 0; f--)
                        u[i[f]] = !0;
                    var c = o.length;
                    for (f = 0; f < c; f++) {
                        var l = o[f];
                        u.hasOwnProperty(l) || n.push(l)
                    }
                    return t ? n.length ? t + " " + n.join(" ") : t : n.join(" ")
                }(e, o, t),
                o = t))
            }
        }),
        {
            value: o,
            bindings: e
        }
    }
});
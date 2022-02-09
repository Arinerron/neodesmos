define('submodules/dcgview/build-amd/bind-attrs', ["./attr-event-handler", "./attr-generic", "./is-event-handler", "./custom-attributes", "./bindings", "./warnings"], function(t, n, i, e, u, a) {
    "use strict";
    function r(t) {
        return t && "object" == typeof t && "default"in t ? t : {
            default: t
        }
    }
    var o = r(t)
      , d = r(n)
      , f = r(i)
      , l = r(e)
      , s = r(u)
      , c = r(a)
      , v = {
        onMount: !0,
        didMount: !0,
        willUnmount: !0,
        willUpdate: !0,
        onUpdate: !0,
        didUpdate: !0
    }
      , b = {
        willMount: !0,
        onMount: !0,
        didMount: !0,
        willUnmount: !0,
        onUnmount: !0,
        didUnmount: !0
    };
    function m(t, n, i) {
        var e = !1;
        return function() {
            e ? c.default.warn(t + " is a one-time binding but was called multiple times", i) : (e = !0,
            n.apply(this, arguments))
        }
    }
    function p(t, n, i) {
        var e = i.bindings;
        if (e)
            for (var u in e) {
                var a = e[u];
                u in v && (a = a.bind(null, n)),
                u in b && (a = m(u, a, t)),
                s.default.add(t, u, a)
            }
    }
    function w(t, n) {
        if ("function" != typeof n)
            throw new Error('The "' + t + '" attr must be a function. It is: ' + JSON.stringify(n));
        return l.default.isCustomAttribute(t) ? l.default.parse(t, n) : f.default(t) ? o.default(t, n) : d.default(t, n)
    }
    return function(t, n, i) {
        if (n)
            for (var e in n) {
                var u = w(e, n[e]);
                if (u) {
                    var a = u.value;
                    void 0 !== a && i.setAttribute(e, a),
                    u.bindings && p(t, i, u)
                }
            }
    }
});
define("pjs", [], function() {
    return function(n, t, o) {
        function r(n) {
            return "object" == typeof n
        }
        function e(n) {
            return "function" == typeof n
        }
        function i() {}
        return function n(o, p) {
            function u() {
                var n = new c;
                return e(n.init) && n.init.apply(n, arguments),
                n
            }
            function c() {}
            undefined === p && (p = o,
            o = Object),
            u.Bare = c;
            var f, y = i.prototype = o.prototype, a = c.prototype = u.prototype = new i;
            return a.constructor = u,
            u.mixin = function(t) {
                return c.prototype = u.prototype = n(u, t).prototype,
                u
            }
            ,
            (u.open = function(n) {
                if (f = {},
                e(n) ? f = n.call(u, a, y, u, o) : r(n) && (f = n),
                r(f))
                    for (var i in f)
                        t.call(f, i) && (a[i] = f[i]);
                return e(a.init) || (a.init = o),
                u
            }
            )(p)
        }
    }(0, {}.hasOwnProperty)
});
define('core/graphing-calc/diffs/calculate-diff', ["require", "exports", "underscore", "./longest-subsequence"], function(require, r, e, i) {
    "use strict";
    var n;
    function t(r, e, i) {
        var n = {};
        for (var t in r)
            if (r.hasOwnProperty(t))
                if (e.hasOwnProperty(t)) {
                    var f = u(r[t], e[t], i, t);
                    f && (n[t] = f)
                } else
                    n[t] = {
                        d: 1
                    };
        for (var t in e)
            e.hasOwnProperty(t) && !r.hasOwnProperty(t) && (n[t] = {
                s: e[t]
            });
        return n
    }
    function u(r, u, s, a) {
        if (e.isArray(r) && e.isArray(u)) {
            if (s === n.EXPRESSIONS && "list" === a || s === n.TABLE_EXPRESSION && "columns" === a)
                return function(r, u) {
                    for (var s = {}, a = {}, o = 0; o < r.length; o++) {
                        if (void 0 !== a[r[o].id])
                            return {
                                s: u
                            };
                        a[r[o].id] = o
                    }
                    var E = {};
                    for (o = 0; o < u.length; o++) {
                        if (void 0 !== E[u[o].id])
                            return {
                                s: u
                            };
                        E[u[o].id] = o
                    }
                    for (var l = function(r, e, n) {
                        for (var t = {}, u = e.filter(function(r) {
                            return void 0 !== n[r.id]
                        }).map(function(r) {
                            return n[r.id]
                        }), f = i.findLongestSubsequence(u), s = 0, a = f; s < a.length; s++) {
                            t[r[a[s]].id] = !0
                        }
                        return t
                    }(r, u, a), O = 0, c = 0; c < r.length; c++) {
                        var d = r[c];
                        if (l[d.id]) {
                            var S = E[d.id]
                              , v = u[S]
                              , R = {};
                            if (O !== S && (R.a = u.slice(O, S).map(function(e) {
                                return f(r, a, e)
                            })),
                            !e.isEqual(d, v)) {
                                var p = "table" === d.type && "table" === v.type;
                                R.e = t(d, v, p ? n.TABLE_EXPRESSION : n.OTHER)
                            }
                            e.isEmpty(R) || (s[c] = R),
                            O = S + 1
                        } else
                            s[c] = {
                                d: 1
                            }
                    }
                    O < u.length && (s[r.length] = {
                        a: u.slice(O, u.length).map(function(e) {
                            return f(r, a, e)
                        })
                    });
                    if (!e.isEmpty(s))
                        return {
                            l: s
                        };
                    return
                }(r, u);
            if (!e.isEqual(r, u))
                return {
                    s: u
                }
        } else if (e.isObject(r) && e.isObject(u)) {
            var o = t(r, u, function(r, e) {
                return r === n.ROOT && "expressions" === e ? n.EXPRESSIONS : n.OTHER
            }(s, a));
            if (!e.isEmpty(o))
                return {
                    e: o
                }
        } else if (!e.isEqual(r, u))
            return {
                s: u
            }
    }
    function f(r, i, u) {
        if (i[u.id]) {
            var f = r[i[u.id]]
              , s = {
                f: i[u.id]
            };
            return e.isEqual(f, u) || (s.e = t(f, u, n.OTHER)),
            {
                m: s
            }
        }
        return {
            s: u
        }
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.calculateDiff = void 0,
    function(r) {
        r[r.ROOT = 0] = "ROOT",
        r[r.EXPRESSIONS = 1] = "EXPRESSIONS",
        r[r.TABLE_EXPRESSION = 2] = "TABLE_EXPRESSION",
        r[r.OTHER = 3] = "OTHER"
    }(n || (n = {})),
    r.calculateDiff = function(r, e) {
        return t(r, e, n.ROOT)
    }
});
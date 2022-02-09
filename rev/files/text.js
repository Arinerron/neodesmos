
define('text', {
    load: function(id) {
        throw new Error("Dynamic load not allowed: " + id);
    }
});
!function(n, r) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define("underscore", r) : function() {
        var t = n._
          , e = r();
        n._ = e,
        e.noConflict = function() {
            return n._ = t,
            e
        }
    }()
}(this, function() {
    var n = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global || Function("return this")() || {}
      , r = Array.prototype
      , t = Object.prototype
      , e = "undefined" != typeof Symbol ? Symbol.prototype : null
      , u = r.push
      , o = r.slice
      , i = t.toString
      , a = t.hasOwnProperty
      , f = Array.isArray
      , c = Object.keys
      , l = Object.create
      , p = n.isNaN
      , s = n.isFinite
      , v = function() {};
    function h(n) {
        return n instanceof h ? n : this instanceof h ? void (this._wrapped = n) : new h(n)
    }
    var y = h.VERSION = "1.10.2";
    function g(n, r, t) {
        if (void 0 === r)
            return n;
        switch (null == t ? 3 : t) {
        case 1:
            return function(t) {
                return n.call(r, t)
            }
            ;
        case 3:
            return function(t, e, u) {
                return n.call(r, t, e, u)
            }
            ;
        case 4:
            return function(t, e, u, o) {
                return n.call(r, t, e, u, o)
            }
        }
        return function() {
            return n.apply(r, arguments)
        }
    }
    function d(n, r, t) {
        return null == n ? ur : Cn(n) ? g(n, r, t) : Ln(n) && !Kn(n) ? ir(n) : or(n)
    }
    function m(n, r) {
        return d(n, r, 1 / 0)
    }
    function b(n, r, t) {
        return h.iteratee !== m ? h.iteratee(n, r) : d(n, r, t)
    }
    function j(n, r) {
        return r = null == r ? n.length - 1 : +r,
        function() {
            for (var t = Math.max(arguments.length - r, 0), e = Array(t), u = 0; u < t; u++)
                e[u] = arguments[u + r];
            switch (r) {
            case 0:
                return n.call(this, e);
            case 1:
                return n.call(this, arguments[0], e);
            case 2:
                return n.call(this, arguments[0], arguments[1], e)
            }
            var o = Array(r + 1);
            for (u = 0; u < r; u++)
                o[u] = arguments[u];
            return o[r] = e,
            n.apply(this, o)
        }
    }
    function _(n) {
        if (!Ln(n))
            return {};
        if (l)
            return l(n);
        v.prototype = n;
        var r = new v;
        return v.prototype = null,
        r
    }
    function w(n) {
        return function(r) {
            return null == r ? void 0 : r[n]
        }
    }
    function x(n, r) {
        return null != n && a.call(n, r)
    }
    function S(n, r) {
        for (var t = r.length, e = 0; e < t; e++) {
            if (null == n)
                return;
            n = n[r[e]]
        }
        return t ? n : void 0
    }
    h.iteratee = m;
    var A = Math.pow(2, 53) - 1
      , O = w("length");
    function M(n) {
        var r = O(n);
        return "number" == typeof r && r >= 0 && r <= A
    }
    function E(n, r, t) {
        var e, u;
        if (r = g(r, t),
        M(n))
            for (e = 0,
            u = n.length; e < u; e++)
                r(n[e], e, n);
        else {
            var o = Sn(n);
            for (e = 0,
            u = o.length; e < u; e++)
                r(n[o[e]], o[e], n)
        }
        return n
    }
    function N(n, r, t) {
        r = b(r, t);
        for (var e = !M(n) && Sn(n), u = (e || n).length, o = Array(u), i = 0; i < u; i++) {
            var a = e ? e[i] : i;
            o[i] = r(n[a], a, n)
        }
        return o
    }
    function k(n) {
        var r = function(r, t, e, u) {
            var o = !M(r) && Sn(r)
              , i = (o || r).length
              , a = n > 0 ? 0 : i - 1;
            for (u || (e = r[o ? o[a] : a],
            a += n); a >= 0 && a < i; a += n) {
                var f = o ? o[a] : a;
                e = t(e, r[f], f, r)
            }
            return e
        };
        return function(n, t, e, u) {
            var o = arguments.length >= 3;
            return r(n, g(t, u, 4), e, o)
        }
    }
    var I = k(1)
      , T = k(-1);
    function B(n, r, t) {
        var e = (M(n) ? on : Tn)(n, r, t);
        if (void 0 !== e && -1 !== e)
            return n[e]
    }
    function R(n, r, t) {
        var e = [];
        return r = b(r, t),
        E(n, function(n, t, u) {
            r(n, t, u) && e.push(n)
        }),
        e
    }
    function F(n, r, t) {
        r = b(r, t);
        for (var e = !M(n) && Sn(n), u = (e || n).length, o = 0; o < u; o++) {
            var i = e ? e[o] : o;
            if (!r(n[i], i, n))
                return !1
        }
        return !0
    }
    function q(n, r, t) {
        r = b(r, t);
        for (var e = !M(n) && Sn(n), u = (e || n).length, o = 0; o < u; o++) {
            var i = e ? e[o] : o;
            if (r(n[i], i, n))
                return !0
        }
        return !1
    }
    function D(n, r, t, e) {
        return M(n) || (n = On(n)),
        ("number" != typeof t || e) && (t = 0),
        ln(n, r, t) >= 0
    }
    var W = j(function(n, r, t) {
        var e, u;
        return Cn(r) ? u = r : Kn(r) && (e = r.slice(0, -1),
        r = r[r.length - 1]),
        N(n, function(n) {
            var o = u;
            if (!o) {
                if (e && e.length && (n = S(n, e)),
                null == n)
                    return;
                o = n[r]
            }
            return null == o ? o : o.apply(n, t)
        })
    });
    function z(n, r) {
        return N(n, or(r))
    }
    function P(n, r, t) {
        var e, u, o = -1 / 0, i = -1 / 0;
        if (null == r || "number" == typeof r && "object" != typeof n[0] && null != n)
            for (var a = 0, f = (n = M(n) ? n : On(n)).length; a < f; a++)
                null != (e = n[a]) && e > o && (o = e);
        else
            r = b(r, t),
            E(n, function(n, t, e) {
                ((u = r(n, t, e)) > i || u === -1 / 0 && o === -1 / 0) && (o = n,
                i = u)
            });
        return o
    }
    function K(n, r, t) {
        if (null == r || t)
            return M(n) || (n = On(n)),
            n[ar(n.length - 1)];
        var e = M(n) ? Dn(n) : On(n)
          , u = O(e);
        r = Math.max(Math.min(r, u), 0);
        for (var o = u - 1, i = 0; i < r; i++) {
            var a = ar(i, o)
              , f = e[i];
            e[i] = e[a],
            e[a] = f
        }
        return e.slice(0, r)
    }
    function L(n, r) {
        return function(t, e, u) {
            var o = r ? [[], []] : {};
            return e = b(e, u),
            E(t, function(r, u) {
                var i = e(r, u, t);
                n(o, r, i)
            }),
            o
        }
    }
    var V = L(function(n, r, t) {
        x(n, t) ? n[t].push(r) : n[t] = [r]
    })
      , C = L(function(n, r, t) {
        n[t] = r
    })
      , J = L(function(n, r, t) {
        x(n, t) ? n[t]++ : n[t] = 1
    })
      , U = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
    var $ = L(function(n, r, t) {
        n[t ? 0 : 1].push(r)
    }, !0);
    function G(n, r, t) {
        return null == n || n.length < 1 ? null == r ? void 0 : [] : null == r || t ? n[0] : H(n, n.length - r)
    }
    function H(n, r, t) {
        return o.call(n, 0, Math.max(0, n.length - (null == r || t ? 1 : r)))
    }
    function Q(n, r, t) {
        return o.call(n, null == r || t ? 1 : r)
    }
    function X(n, r, t, e) {
        for (var u = (e = e || []).length, o = 0, i = O(n); o < i; o++) {
            var a = n[o];
            if (M(a) && (Kn(a) || Vn(a)))
                if (r)
                    for (var f = 0, c = a.length; f < c; )
                        e[u++] = a[f++];
                else
                    X(a, r, t, e),
                    u = e.length;
            else
                t || (e[u++] = a)
        }
        return e
    }
    var Y = j(function(n, r) {
        return rn(n, r)
    });
    function Z(n, r, t, e) {
        er(r) || (e = t,
        t = r,
        r = !1),
        null != t && (t = b(t, e));
        for (var u = [], o = [], i = 0, a = O(n); i < a; i++) {
            var f = n[i]
              , c = t ? t(f, i, n) : f;
            r && !t ? (i && o === c || u.push(f),
            o = c) : t ? D(o, c) || (o.push(c),
            u.push(f)) : D(u, f) || u.push(f)
        }
        return u
    }
    var nn = j(function(n) {
        return Z(X(n, !0, !0))
    });
    var rn = j(function(n, r) {
        return r = X(r, !0, !0),
        R(n, function(n) {
            return !D(r, n)
        })
    });
    function tn(n) {
        for (var r = n && P(n, O).length || 0, t = Array(r), e = 0; e < r; e++)
            t[e] = z(n, e);
        return t
    }
    var en = j(tn);
    function un(n) {
        return function(r, t, e) {
            t = b(t, e);
            for (var u = O(r), o = n > 0 ? 0 : u - 1; o >= 0 && o < u; o += n)
                if (t(r[o], o, r))
                    return o;
            return -1
        }
    }
    var on = un(1)
      , an = un(-1);
    function fn(n, r, t, e) {
        for (var u = (t = b(t, e, 1))(r), o = 0, i = O(n); o < i; ) {
            var a = Math.floor((o + i) / 2);
            t(n[a]) < u ? o = a + 1 : i = a
        }
        return o
    }
    function cn(n, r, t) {
        return function(e, u, i) {
            var a = 0
              , f = O(e);
            if ("number" == typeof i)
                n > 0 ? a = i >= 0 ? i : Math.max(i + f, a) : f = i >= 0 ? Math.min(i + 1, f) : i + f + 1;
            else if (t && i && f)
                return e[i = t(e, u)] === u ? i : -1;
            if (u != u)
                return (i = r(o.call(e, a, f), tr)) >= 0 ? i + a : -1;
            for (i = n > 0 ? a : f - 1; i >= 0 && i < f; i += n)
                if (e[i] === u)
                    return i;
            return -1
        }
    }
    var ln = cn(1, on, fn)
      , pn = cn(-1, an);
    function sn(n, r, t, e, u) {
        if (!(e instanceof r))
            return n.apply(t, u);
        var o = _(n.prototype)
          , i = n.apply(o, u);
        return Ln(i) ? i : o
    }
    var vn = j(function(n, r, t) {
        if (!Cn(n))
            throw new TypeError("Bind must be called on a function");
        var e = j(function(u) {
            return sn(n, e, r, this, t.concat(u))
        });
        return e
    })
      , hn = j(function(n, r) {
        var t = hn.placeholder
          , e = function() {
            for (var u = 0, o = r.length, i = Array(o), a = 0; a < o; a++)
                i[a] = r[a] === t ? arguments[u++] : r[a];
            for (; u < arguments.length; )
                i.push(arguments[u++]);
            return sn(n, e, this, this, i)
        };
        return e
    });
    hn.placeholder = h;
    var yn = j(function(n, r) {
        var t = (r = X(r, !1, !1)).length;
        if (t < 1)
            throw new Error("bindAll must be passed function names");
        for (; t--; ) {
            var e = r[t];
            n[e] = vn(n[e], n)
        }
    });
    var gn = j(function(n, r, t) {
        return setTimeout(function() {
            return n.apply(null, t)
        }, r)
    })
      , dn = hn(gn, h, 1);
    function mn(n) {
        return function() {
            return !n.apply(this, arguments)
        }
    }
    function bn(n, r) {
        var t;
        return function() {
            return --n > 0 && (t = r.apply(this, arguments)),
            n <= 1 && (r = null),
            t
        }
    }
    var jn = hn(bn, 2)
      , _n = !{
        toString: null
    }.propertyIsEnumerable("toString")
      , wn = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    function xn(n, r) {
        var e = wn.length
          , u = n.constructor
          , o = Cn(u) && u.prototype || t
          , i = "constructor";
        for (x(n, i) && !D(r, i) && r.push(i); e--; )
            (i = wn[e])in n && n[i] !== o[i] && !D(r, i) && r.push(i)
    }
    function Sn(n) {
        if (!Ln(n))
            return [];
        if (c)
            return c(n);
        var r = [];
        for (var t in n)
            x(n, t) && r.push(t);
        return _n && xn(n, r),
        r
    }
    function An(n) {
        if (!Ln(n))
            return [];
        var r = [];
        for (var t in n)
            r.push(t);
        return _n && xn(n, r),
        r
    }
    function On(n) {
        for (var r = Sn(n), t = r.length, e = Array(t), u = 0; u < t; u++)
            e[u] = n[r[u]];
        return e
    }
    function Mn(n) {
        for (var r = {}, t = Sn(n), e = 0, u = t.length; e < u; e++)
            r[n[t[e]]] = t[e];
        return r
    }
    function En(n) {
        var r = [];
        for (var t in n)
            Cn(n[t]) && r.push(t);
        return r.sort()
    }
    function Nn(n, r) {
        return function(t) {
            var e = arguments.length;
            if (r && (t = Object(t)),
            e < 2 || null == t)
                return t;
            for (var u = 1; u < e; u++)
                for (var o = arguments[u], i = n(o), a = i.length, f = 0; f < a; f++) {
                    var c = i[f];
                    r && void 0 !== t[c] || (t[c] = o[c])
                }
            return t
        }
    }
    var kn = Nn(An)
      , In = Nn(Sn);
    function Tn(n, r, t) {
        r = b(r, t);
        for (var e, u = Sn(n), o = 0, i = u.length; o < i; o++)
            if (r(n[e = u[o]], e, n))
                return e
    }
    function Bn(n, r, t) {
        return r in t
    }
    var Rn = j(function(n, r) {
        var t = {}
          , e = r[0];
        if (null == n)
            return t;
        Cn(e) ? (r.length > 1 && (e = g(e, r[1])),
        r = An(n)) : (e = Bn,
        r = X(r, !1, !1),
        n = Object(n));
        for (var u = 0, o = r.length; u < o; u++) {
            var i = r[u]
              , a = n[i];
            e(a, i, n) && (t[i] = a)
        }
        return t
    })
      , Fn = j(function(n, r) {
        var t, e = r[0];
        return Cn(e) ? (e = mn(e),
        r.length > 1 && (t = r[1])) : (r = N(X(r, !1, !1), String),
        e = function(n, t) {
            return !D(r, t)
        }
        ),
        Rn(n, e, t)
    })
      , qn = Nn(An, !0);
    function Dn(n) {
        return Ln(n) ? Kn(n) ? n.slice() : kn({}, n) : n
    }
    function Wn(n, r) {
        var t = Sn(r)
          , e = t.length;
        if (null == n)
            return !e;
        for (var u = Object(n), o = 0; o < e; o++) {
            var i = t[o];
            if (r[i] !== u[i] || !(i in u))
                return !1
        }
        return !0
    }
    function zn(n, r, t, u) {
        if (n === r)
            return 0 !== n || 1 / n == 1 / r;
        if (null == n || null == r)
            return !1;
        if (n != n)
            return r != r;
        var o = typeof n;
        return ("function" === o || "object" === o || "object" == typeof r) && function(n, r, t, u) {
            n instanceof h && (n = n._wrapped);
            r instanceof h && (r = r._wrapped);
            var o = i.call(n);
            if (o !== i.call(r))
                return !1;
            switch (o) {
            case "[object RegExp]":
            case "[object String]":
                return "" + n == "" + r;
            case "[object Number]":
                return +n != +n ? +r != +r : 0 == +n ? 1 / +n == 1 / r : +n == +r;
            case "[object Date]":
            case "[object Boolean]":
                return +n == +r;
            case "[object Symbol]":
                return e.valueOf.call(n) === e.valueOf.call(r)
            }
            var a = "[object Array]" === o;
            if (!a) {
                if ("object" != typeof n || "object" != typeof r)
                    return !1;
                var f = n.constructor
                  , c = r.constructor;
                if (f !== c && !(Cn(f) && f instanceof f && Cn(c) && c instanceof c) && "constructor"in n && "constructor"in r)
                    return !1
            }
            u = u || [];
            var l = (t = t || []).length;
            for (; l--; )
                if (t[l] === n)
                    return u[l] === r;
            if (t.push(n),
            u.push(r),
            a) {
                if ((l = n.length) !== r.length)
                    return !1;
                for (; l--; )
                    if (!zn(n[l], r[l], t, u))
                        return !1
            } else {
                var p, s = Sn(n);
                if (l = s.length,
                Sn(r).length !== l)
                    return !1;
                for (; l--; )
                    if (!x(r, p = s[l]) || !zn(n[p], r[p], t, u))
                        return !1
            }
            return t.pop(),
            u.pop(),
            !0
        }(n, r, t, u)
    }
    function Pn(n) {
        return function(r) {
            return i.call(r) === "[object " + n + "]"
        }
    }
    var Kn = f || Pn("Array");
    function Ln(n) {
        var r = typeof n;
        return "function" === r || "object" === r && !!n
    }
    var Vn = Pn("Arguments")
      , Cn = Pn("Function")
      , Jn = Pn("String")
      , Un = Pn("Number")
      , $n = Pn("Date")
      , Gn = Pn("RegExp")
      , Hn = Pn("Error")
      , Qn = Pn("Symbol")
      , Xn = Pn("Map")
      , Yn = Pn("WeakMap")
      , Zn = Pn("Set")
      , nr = Pn("WeakSet");
    !function() {
        Vn(arguments) || (Vn = function(n) {
            return x(n, "callee")
        }
        )
    }();
    var rr = n.document && n.document.childNodes;
    function tr(n) {
        return Un(n) && p(n)
    }
    function er(n) {
        return !0 === n || !1 === n || "[object Boolean]" === i.call(n)
    }
    function ur(n) {
        return n
    }
    function or(n) {
        return Kn(n) ? function(r) {
            return S(r, n)
        }
        : w(n)
    }
    function ir(n) {
        return n = In({}, n),
        function(r) {
            return Wn(r, n)
        }
    }
    function ar(n, r) {
        return null == r && (r = n,
        n = 0),
        n + Math.floor(Math.random() * (r - n + 1))
    }
    "function" != typeof /./ && "object" != typeof Int8Array && "function" != typeof rr && (Cn = function(n) {
        return "function" == typeof n || !1
    }
    );
    var fr = Date.now || function() {
        return (new Date).getTime()
    }
      , cr = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }
      , lr = Mn(cr);
    function pr(n) {
        var r = function(r) {
            return n[r]
        }
          , t = "(?:" + Sn(n).join("|") + ")"
          , e = RegExp(t)
          , u = RegExp(t, "g");
        return function(n) {
            return n = null == n ? "" : "" + n,
            e.test(n) ? n.replace(u, r) : n
        }
    }
    var sr = pr(cr)
      , vr = pr(lr);
    var hr = 0;
    var yr = h.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    }
      , gr = /(.)^/
      , dr = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }
      , mr = /\\|'|\r|\n|\u2028|\u2029/g
      , br = function(n) {
        return "\\" + dr[n]
    };
    function jr(n, r) {
        return n._chain ? h(r).chain() : r
    }
    function _r(n) {
        return E(En(n), function(r) {
            var t = h[r] = n[r];
            h.prototype[r] = function() {
                var n = [this._wrapped];
                return u.apply(n, arguments),
                jr(this, t.apply(h, n))
            }
        }),
        h
    }
    E(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
        var t = r[n];
        h.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments),
            "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0],
            jr(this, r)
        }
    }),
    E(["concat", "join", "slice"], function(n) {
        var t = r[n];
        h.prototype[n] = function() {
            return jr(this, t.apply(this._wrapped, arguments))
        }
    }),
    h.prototype.value = function() {
        return this._wrapped
    }
    ,
    h.prototype.valueOf = h.prototype.toJSON = h.prototype.value,
    h.prototype.toString = function() {
        return String(this._wrapped)
    }
    ;
    var wr = _r({
        default: h,
        VERSION: y,
        iteratee: m,
        restArguments: j,
        each: E,
        forEach: E,
        map: N,
        collect: N,
        reduce: I,
        foldl: I,
        inject: I,
        reduceRight: T,
        foldr: T,
        find: B,
        detect: B,
        filter: R,
        select: R,
        reject: function(n, r, t) {
            return R(n, mn(b(r)), t)
        },
        every: F,
        all: F,
        some: q,
        any: q,
        contains: D,
        includes: D,
        include: D,
        invoke: W,
        pluck: z,
        where: function(n, r) {
            return R(n, ir(r))
        },
        findWhere: function(n, r) {
            return B(n, ir(r))
        },
        max: P,
        min: function(n, r, t) {
            var e, u, o = 1 / 0, i = 1 / 0;
            if (null == r || "number" == typeof r && "object" != typeof n[0] && null != n)
                for (var a = 0, f = (n = M(n) ? n : On(n)).length; a < f; a++)
                    null != (e = n[a]) && e < o && (o = e);
            else
                r = b(r, t),
                E(n, function(n, t, e) {
                    ((u = r(n, t, e)) < i || u === 1 / 0 && o === 1 / 0) && (o = n,
                    i = u)
                });
            return o
        },
        shuffle: function(n) {
            return K(n, 1 / 0)
        },
        sample: K,
        sortBy: function(n, r, t) {
            var e = 0;
            return r = b(r, t),
            z(N(n, function(n, t, u) {
                return {
                    value: n,
                    index: e++,
                    criteria: r(n, t, u)
                }
            }).sort(function(n, r) {
                var t = n.criteria
                  , e = r.criteria;
                if (t !== e) {
                    if (t > e || void 0 === t)
                        return 1;
                    if (t < e || void 0 === e)
                        return -1
                }
                return n.index - r.index
            }), "value")
        },
        groupBy: V,
        indexBy: C,
        countBy: J,
        toArray: function(n) {
            return n ? Kn(n) ? o.call(n) : Jn(n) ? n.match(U) : M(n) ? N(n, ur) : On(n) : []
        },
        size: function(n) {
            return null == n ? 0 : M(n) ? n.length : Sn(n).length
        },
        partition: $,
        first: G,
        head: G,
        take: G,
        initial: H,
        last: function(n, r, t) {
            return null == n || n.length < 1 ? null == r ? void 0 : [] : null == r || t ? n[n.length - 1] : Q(n, Math.max(0, n.length - r))
        },
        rest: Q,
        tail: Q,
        drop: Q,
        compact: function(n) {
            return R(n, Boolean)
        },
        flatten: function(n, r) {
            return X(n, r, !1)
        },
        without: Y,
        uniq: Z,
        unique: Z,
        union: nn,
        intersection: function(n) {
            for (var r = [], t = arguments.length, e = 0, u = O(n); e < u; e++) {
                var o = n[e];
                if (!D(r, o)) {
                    var i;
                    for (i = 1; i < t && D(arguments[i], o); i++)
                        ;
                    i === t && r.push(o)
                }
            }
            return r
        },
        difference: rn,
        unzip: tn,
        zip: en,
        object: function(n, r) {
            for (var t = {}, e = 0, u = O(n); e < u; e++)
                r ? t[n[e]] = r[e] : t[n[e][0]] = n[e][1];
            return t
        },
        findIndex: on,
        findLastIndex: an,
        sortedIndex: fn,
        indexOf: ln,
        lastIndexOf: pn,
        range: function(n, r, t) {
            null == r && (r = n || 0,
            n = 0),
            t || (t = r < n ? -1 : 1);
            for (var e = Math.max(Math.ceil((r - n) / t), 0), u = Array(e), o = 0; o < e; o++,
            n += t)
                u[o] = n;
            return u
        },
        chunk: function(n, r) {
            if (null == r || r < 1)
                return [];
            for (var t = [], e = 0, u = n.length; e < u; )
                t.push(o.call(n, e, e += r));
            return t
        },
        bind: vn,
        partial: hn,
        bindAll: yn,
        memoize: function(n, r) {
            var t = function(e) {
                var u = t.cache
                  , o = "" + (r ? r.apply(this, arguments) : e);
                return x(u, o) || (u[o] = n.apply(this, arguments)),
                u[o]
            };
            return t.cache = {},
            t
        },
        delay: gn,
        defer: dn,
        throttle: function(n, r, t) {
            var e, u, o, i, a = 0;
            t || (t = {});
            var f = function() {
                a = !1 === t.leading ? 0 : fr(),
                e = null,
                i = n.apply(u, o),
                e || (u = o = null)
            }
              , c = function() {
                var c = fr();
                a || !1 !== t.leading || (a = c);
                var l = r - (c - a);
                return u = this,
                o = arguments,
                l <= 0 || l > r ? (e && (clearTimeout(e),
                e = null),
                a = c,
                i = n.apply(u, o),
                e || (u = o = null)) : e || !1 === t.trailing || (e = setTimeout(f, l)),
                i
            };
            return c.cancel = function() {
                clearTimeout(e),
                a = 0,
                e = u = o = null
            }
            ,
            c
        },
        debounce: function(n, r, t) {
            var e, u, o = function(r, t) {
                e = null,
                t && (u = n.apply(r, t))
            }, i = j(function(i) {
                if (e && clearTimeout(e),
                t) {
                    var a = !e;
                    e = setTimeout(o, r),
                    a && (u = n.apply(this, i))
                } else
                    e = gn(o, r, this, i);
                return u
            });
            return i.cancel = function() {
                clearTimeout(e),
                e = null
            }
            ,
            i
        },
        wrap: function(n, r) {
            return hn(r, n)
        },
        negate: mn,
        compose: function() {
            var n = arguments
              , r = n.length - 1;
            return function() {
                for (var t = r, e = n[r].apply(this, arguments); t--; )
                    e = n[t].call(this, e);
                return e
            }
        },
        after: function(n, r) {
            return function() {
                if (--n < 1)
                    return r.apply(this, arguments)
            }
        },
        before: bn,
        once: jn,
        keys: Sn,
        allKeys: An,
        values: On,
        mapObject: function(n, r, t) {
            r = b(r, t);
            for (var e = Sn(n), u = e.length, o = {}, i = 0; i < u; i++) {
                var a = e[i];
                o[a] = r(n[a], a, n)
            }
            return o
        },
        pairs: function(n) {
            for (var r = Sn(n), t = r.length, e = Array(t), u = 0; u < t; u++)
                e[u] = [r[u], n[r[u]]];
            return e
        },
        invert: Mn,
        functions: En,
        methods: En,
        extend: kn,
        extendOwn: In,
        assign: In,
        findKey: Tn,
        pick: Rn,
        omit: Fn,
        defaults: qn,
        create: function(n, r) {
            var t = _(n);
            return r && In(t, r),
            t
        },
        clone: Dn,
        tap: function(n, r) {
            return r(n),
            n
        },
        isMatch: Wn,
        isEqual: function(n, r) {
            return zn(n, r)
        },
        isEmpty: function(n) {
            return null == n || (M(n) && (Kn(n) || Jn(n) || Vn(n)) ? 0 === n.length : 0 === Sn(n).length)
        },
        isElement: function(n) {
            return !(!n || 1 !== n.nodeType)
        },
        isArray: Kn,
        isObject: Ln,
        isArguments: Vn,
        isFunction: Cn,
        isString: Jn,
        isNumber: Un,
        isDate: $n,
        isRegExp: Gn,
        isError: Hn,
        isSymbol: Qn,
        isMap: Xn,
        isWeakMap: Yn,
        isSet: Zn,
        isWeakSet: nr,
        isFinite: function(n) {
            return !Qn(n) && s(n) && !p(parseFloat(n))
        },
        isNaN: tr,
        isBoolean: er,
        isNull: function(n) {
            return null === n
        },
        isUndefined: function(n) {
            return void 0 === n
        },
        has: function(n, r) {
            if (!Kn(r))
                return x(n, r);
            for (var t = r.length, e = 0; e < t; e++) {
                var u = r[e];
                if (null == n || !a.call(n, u))
                    return !1;
                n = n[u]
            }
            return !!t
        },
        identity: ur,
        constant: function(n) {
            return function() {
                return n
            }
        },
        noop: function() {},
        property: or,
        propertyOf: function(n) {
            return null == n ? function() {}
            : function(r) {
                return Kn(r) ? S(n, r) : n[r]
            }
        },
        matcher: ir,
        matches: ir,
        times: function(n, r, t) {
            var e = Array(Math.max(0, n));
            r = g(r, t, 1);
            for (var u = 0; u < n; u++)
                e[u] = r(u);
            return e
        },
        random: ar,
        now: fr,
        escape: sr,
        unescape: vr,
        result: function(n, r, t) {
            Kn(r) || (r = [r]);
            var e = r.length;
            if (!e)
                return Cn(t) ? t.call(n) : t;
            for (var u = 0; u < e; u++) {
                var o = null == n ? void 0 : n[r[u]];
                void 0 === o && (o = t,
                u = e),
                n = Cn(o) ? o.call(n) : o
            }
            return n
        },
        uniqueId: function(n) {
            var r = ++hr + "";
            return n ? n + r : r
        },
        templateSettings: yr,
        template: function(n, r, t) {
            !r && t && (r = t),
            r = qn({}, r, h.templateSettings);
            var e, u = RegExp([(r.escape || gr).source, (r.interpolate || gr).source, (r.evaluate || gr).source].join("|") + "|$", "g"), o = 0, i = "__p+='";
            n.replace(u, function(r, t, e, u, a) {
                return i += n.slice(o, a).replace(mr, br),
                o = a + r.length,
                t ? i += "'+\n((__t=(" + t + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : u && (i += "';\n" + u + "\n__p+='"),
                r
            }),
            i += "';\n",
            r.variable || (i = "with(obj||{}){\n" + i + "}\n"),
            i = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
            try {
                e = new Function(r.variable || "obj","_",i)
            } catch (n) {
                throw n.source = i,
                n
            }
            var a = function(n) {
                return e.call(this, n, h)
            }
              , f = r.variable || "obj";
            return a.source = "function(" + f + "){\n" + i + "}",
            a
        },
        chain: function(n) {
            var r = h(n);
            return r._chain = !0,
            r
        },
        mixin: _r
    });
    return wr._ = wr,
    wr
});
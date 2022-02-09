define('lib/random_hash', ['require', 'exports', 'module'], function(require, t) {
    "use strict";
    function n(t) {
        this.bauArc4 = new e(function(t) {
            var n, r = t + "", e = [], i = 0;
            for (n = 0; n < r.length; n++)
                e[o(n)] = o((i ^= 19 * e[o(n)]) + r.charCodeAt(n));
            return e
        }(t))
    }
    n.prototype.g = function(t) {
        for (var n = Array(t), r = 0; r < t; r++)
            n[r] = this.bauArc4.g(1);
        return n
    }
    ;
    var r = 256;
    function o(t) {
        return 255 & t
    }
    function e(t) {
        var n, e, i = this, a = t.length, u = 0, f = i.i = i.j = i.m = 0;
        for (i.S = [],
        i.c = [],
        a || (t = [a++]); u < r; )
            i.S[u] = u++;
        for (u = 0; u < r; u++)
            f = o(f + (n = i.S[u]) + t[u % a]),
            e = i.S[f],
            i.S[u] = e,
            i.S[f] = n;
        i.g = function(t) {
            var n = i.S
              , e = o(i.i + 1)
              , a = n[e]
              , u = o(i.j + a)
              , f = n[u];
            n[e] = f,
            n[u] = a;
            for (var c = n[o(a + f)]; --t; )
                e = o(e + 1),
                f = n[u = o(u + (a = n[e]))],
                n[e] = f,
                n[u] = a,
                c = c * r + n[o(a + f)];
            return i.i = e,
            i.j = u,
            c
        }
        ,
        i.g(r)
    }
    var i, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".toLowerCase(), u = function(t) {
        if (!t || !t.length || t.length < 32)
            throw new Error("You must supply a seed to RandomHashFactory. It should have at least 128 bits of entropy, but was " + t);
        var r = new n(t);
        this.next = function() {
            for (var t, n = Array(10), o = 0; o < 10; )
                (t = r.g(1)[0] >> 2) < 62 && (n[o] = a[t],
                o++);
            return n.join("")
        }
        ,
        this.nextSeed = function() {
            for (var t = r.g(16), n = Array(16), o = 0; o < 16; o++)
                n[o] = t[o].toString(16),
                1 === n[o].length && (n[o] = "0" + n[o]);
            return n.join("")
        }
    };
    return t.next = function() {
        if (!i)
            throw "Random Hash Factory not initialized";
        return i.next()
    }
    ,
    t.nextSeed = function() {
        if (!i)
            throw "Random Hash Factory not initialized";
        return i.nextSeed()
    }
    ,
    t.init = function(t) {
        i = new u(t)
    }
    ,
    t
});
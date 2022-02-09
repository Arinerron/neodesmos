
define('numeric', [], function() {
    "use strict";
    var r = "undefined" == typeof exports ? function() {}
    : exports;
    return "undefined" != typeof global && (global.numeric = r),
    r.version = "1.2.6",
    r._myIndexOf = function(r) {
        var n, e = this.length;
        for (n = 0; n < e; ++n)
            if (this[n] === r)
                return n;
        return -1
    }
    ,
    r.myIndexOf = Array.prototype.indexOf ? Array.prototype.indexOf : r._myIndexOf,
    r.precision = 4,
    r.largeArray = 50,
    r.compile = function() {
        var n = Array.prototype.slice.call(arguments)
          , e = n.pop();
        return e = "return function (" + n.join(",") + ") {" + e + "}",
        new Function(["numeric"],e)(r)
    }
    ,
    r._dim = function(r) {
        for (var n = []; "object" == typeof r; )
            n.push(r.length),
            r = r[0];
        return n
    }
    ,
    r.dim = function(n) {
        var e;
        return "object" == typeof n ? "object" == typeof (e = n[0]) ? "object" == typeof e[0] ? r._dim(n) : [n.length, e.length] : [n.length] : []
    }
    ,
    r.mapreduce = function(n, e) {
        return r.compile("x", "accum", "_s", "_k", 'if(typeof accum === "undefined") accum = ' + e + ';\nif(typeof x === "number") { var xi = x; ' + n + '; return accum; }\nif(typeof _s === "undefined") _s = numeric.dim(x);\nif(typeof _k === "undefined") _k = 0;\nvar _n = _s[_k];\nvar i,xi;\nif(_k < _s.length-1) {\n    for(i=_n-1;i>=0;i--) {\n        accum = arguments.callee(x[i],accum,_s,_k+1);\n    }    return accum;\n}\nfor(i=_n-1;i>=1;i-=2) { \n    xi = x[i];\n    ' + n + ";\n    xi = x[i-1];\n    " + n + ";\n}\nif(i === 0) {\n    xi = x[i];\n    " + n + "\n}\nreturn accum;")
    }
    ,
    r.mapreduce2 = function(n, e) {
        return r.compile("x", "var n = x.length;\nvar i,xi;\n" + e + "\nfor(i=n-1;i!==-1;--i) { \n    xi = x[i];\n    " + n + "\n}\nreturn accum;")
    }
    ,
    r.rep = function(n, e, t) {
        void 0 === t && (t = 0);
        var i, o = n[t], a = Array(o);
        if (t === n.length - 1) {
            for (i = o - 2; i >= 0; i -= 2)
                a[i + 1] = e,
                a[i] = e;
            return -1 === i && (a[0] = e),
            a
        }
        for (i = o - 1; i >= 0; i--)
            a[i] = r.rep(n, e, t + 1);
        return a
    }
    ,
    r.dotMMsmall = function(r, n) {
        var e, t, i, o, a, f, u, c, s, m, l;
        for (o = r.length,
        a = n.length,
        f = n[0].length,
        u = Array(o),
        e = o - 1; e >= 0; e--) {
            for (c = Array(f),
            s = r[e],
            i = f - 1; i >= 0; i--) {
                for (m = s[a - 1] * n[a - 1][i],
                t = a - 2; t >= 1; t -= 2)
                    l = t - 1,
                    m += s[t] * n[t][i] + s[l] * n[l][i];
                0 === t && (m += s[0] * n[0][i]),
                c[i] = m
            }
            u[e] = c
        }
        return u
    }
    ,
    r._getCol = function(r, n, e) {
        var t;
        for (t = r.length - 1; t > 0; --t)
            e[t] = r[t][n],
            e[--t] = r[t][n];
        0 === t && (e[0] = r[0][n])
    }
    ,
    r.dotMMbig = function(n, e) {
        var t, i, o, a = r._getCol, f = e.length, u = Array(f), c = n.length, s = e[0].length, m = new Array(c), l = r.dotVV;
        for (--f,
        i = --c; -1 !== i; --i)
            m[i] = Array(s);
        for (i = --s; -1 !== i; --i)
            for (a(e, i, u),
            o = c; -1 !== o; --o)
                0,
                t = n[o],
                m[o][i] = l(t, u);
        return m
    }
    ,
    r.dotMV = function(n, e) {
        var t, i = n.length, o = (e.length,
        Array(i)), a = r.dotVV;
        for (t = i - 1; t >= 0; t--)
            o[t] = a(n[t], e);
        return o
    }
    ,
    r.dotVM = function(r, n) {
        var e, t, i, o, a, f, u;
        for (i = r.length,
        o = n[0].length,
        a = Array(o),
        t = o - 1; t >= 0; t--) {
            for (f = r[i - 1] * n[i - 1][t],
            e = i - 2; e >= 1; e -= 2)
                u = e - 1,
                f += r[e] * n[e][t] + r[u] * n[u][t];
            0 === e && (f += r[0] * n[0][t]),
            a[t] = f
        }
        return a
    }
    ,
    r.dotVV = function(r, n) {
        var e, t, i = r.length, o = r[i - 1] * n[i - 1];
        for (e = i - 2; e >= 1; e -= 2)
            t = e - 1,
            o += r[e] * n[e] + r[t] * n[t];
        return 0 === e && (o += r[0] * n[0]),
        o
    }
    ,
    r.dot = function(n, e) {
        var t = r.dim;
        switch (1e3 * t(n).length + t(e).length) {
        case 2002:
            return e.length < 10 ? r.dotMMsmall(n, e) : r.dotMMbig(n, e);
        case 2001:
            return r.dotMV(n, e);
        case 1002:
            return r.dotVM(n, e);
        case 1001:
            return r.dotVV(n, e);
        case 1e3:
            return r.mulVS(n, e);
        case 1:
            return r.mulSV(n, e);
        case 0:
            return n * e;
        default:
            throw new Error("numeric.dot only works on vectors and matrices")
        }
    }
    ,
    r.diag = function(r) {
        var n, e, t, i, o = r.length, a = Array(o);
        for (n = o - 1; n >= 0; n--) {
            for (i = Array(o),
            e = n + 2,
            t = o - 1; t >= e; t -= 2)
                i[t] = 0,
                i[t - 1] = 0;
            for (t > n && (i[t] = 0),
            i[n] = r[n],
            t = n - 1; t >= 1; t -= 2)
                i[t] = 0,
                i[t - 1] = 0;
            0 === t && (i[0] = 0),
            a[n] = i
        }
        return a
    }
    ,
    r.getDiag = function(r) {
        var n, e = Math.min(r.length, r[0].length), t = Array(e);
        for (n = e - 1; n >= 1; --n)
            t[n] = r[n][n],
            t[--n] = r[n][n];
        return 0 === n && (t[0] = r[0][0]),
        t
    }
    ,
    r.identity = function(n) {
        return r.diag(r.rep([n], 1))
    }
    ,
    r.pointwise = function(n, e, t) {
        void 0 === t && (t = "");
        var i, o, a = [], f = /\[i\]$/, u = "", c = !1;
        for (i = 0; i < n.length; i++)
            f.test(n[i]) ? u = o = n[i].substring(0, n[i].length - 3) : o = n[i],
            "ret" === o && (c = !0),
            a.push(o);
        return a[n.length] = "_s",
        a[n.length + 1] = "_k",
        a[n.length + 2] = 'if(typeof _s === "undefined") _s = numeric.dim(' + u + ');\nif(typeof _k === "undefined") _k = 0;\nvar _n = _s[_k];\nvar i' + (c ? "" : ", ret = Array(_n)") + ";\nif(_k < _s.length-1) {\n    for(i=_n-1;i>=0;i--) ret[i] = arguments.callee(" + n.join(",") + ",_s,_k+1);\n    return ret;\n}\n" + t + "\nfor(i=_n-1;i!==-1;--i) {\n    " + e + "\n}\nreturn ret;",
        r.compile.apply(null, a)
    }
    ,
    r.pointwise2 = function(n, e, t) {
        void 0 === t && (t = "");
        var i, o, a = [], f = /\[i\]$/, u = "", c = !1;
        for (i = 0; i < n.length; i++)
            f.test(n[i]) ? u = o = n[i].substring(0, n[i].length - 3) : o = n[i],
            "ret" === o && (c = !0),
            a.push(o);
        return a[n.length] = "var _n = " + u + ".length;\nvar i" + (c ? "" : ", ret = Array(_n)") + ";\n" + t + "\nfor(i=_n-1;i!==-1;--i) {\n" + e + "\n}\nreturn ret;",
        r.compile.apply(null, a)
    }
    ,
    r._biforeach = function r(n, e, t, i, o) {
        var a;
        if (i !== t.length - 1)
            for (a = t[i] - 1; a >= 0; a--)
                r("object" == typeof n ? n[a] : n, "object" == typeof e ? e[a] : e, t, i + 1, o);
        else
            o(n, e)
    }
    ,
    r._biforeach2 = function r(n, e, t, i, o) {
        if (i === t.length - 1)
            return o(n, e);
        var a, f = t[i], u = Array(f);
        for (a = f - 1; a >= 0; --a)
            u[a] = r("object" == typeof n ? n[a] : n, "object" == typeof e ? e[a] : e, t, i + 1, o);
        return u
    }
    ,
    r._foreach = function r(n, e, t, i) {
        var o;
        if (t !== e.length - 1)
            for (o = e[t] - 1; o >= 0; o--)
                r(n[o], e, t + 1, i);
        else
            i(n)
    }
    ,
    r._foreach2 = function r(n, e, t, i) {
        if (t === e.length - 1)
            return i(n);
        var o, a = e[t], f = Array(a);
        for (o = a - 1; o >= 0; o--)
            f[o] = r(n[o], e, t + 1, i);
        return f
    }
    ,
    r.ops2 = {
        add: "+",
        sub: "-",
        mul: "*",
        div: "/",
        mod: "%",
        and: "&&",
        or: "||",
        eq: "===",
        neq: "!==",
        lt: "<",
        gt: ">",
        leq: "<=",
        geq: ">=",
        band: "&",
        bor: "|",
        bxor: "^",
        lshift: "<<",
        rshift: ">>",
        rrshift: ">>>"
    },
    r.opseq = {
        addeq: "+=",
        subeq: "-=",
        muleq: "*=",
        diveq: "/=",
        modeq: "%=",
        lshifteq: "<<=",
        rshifteq: ">>=",
        rrshifteq: ">>>=",
        bandeq: "&=",
        boreq: "|=",
        bxoreq: "^="
    },
    r.mathfuns = ["abs", "acos", "asin", "atan", "ceil", "cos", "exp", "floor", "log", "round", "sin", "sqrt", "tan", "isNaN", "isFinite"],
    r.mathfuns2 = ["atan2", "pow", "max", "min"],
    r.ops1 = {
        neg: "-",
        not: "!",
        bnot: "~",
        clone: ""
    },
    r.mapreducers = {
        any: ["if(xi) return true;", "var accum = false;"],
        all: ["if(!xi) return false;", "var accum = true;"],
        sum: ["accum += xi;", "var accum = 0;"],
        prod: ["accum *= xi;", "var accum = 1;"],
        norm2Squared: ["accum += xi*xi;", "var accum = 0;"],
        norminf: ["accum = max(accum,abs(xi));", "var accum = 0, max = Math.max, abs = Math.abs;"],
        norm1: ["accum += abs(xi);", "var accum = 0, abs = Math.abs;"],
        sup: ["accum = max(accum,xi);", "var accum = -Infinity, max = Math.max;"],
        inf: ["accum = min(accum,xi);", "var accum = Infinity, min = Math.min;"]
    },
    function() {
        var n, e;
        for (n = 0; n < r.mathfuns2.length; ++n)
            e = r.mathfuns2[n],
            r.ops2[e] = e;
        for (n in r.ops2)
            if (r.ops2.hasOwnProperty(n)) {
                e = r.ops2[n];
                var t, i, o = "";
                -1 !== r.myIndexOf.call(r.mathfuns2, n) ? (o = "var " + e + " = Math." + e + ";\n",
                t = function(r, n, t) {
                    return r + " = " + e + "(" + n + "," + t + ")"
                }
                ,
                i = function(r, n) {
                    return r + " = " + e + "(" + r + "," + n + ")"
                }
                ) : (t = function(r, n, t) {
                    return r + " = " + n + " " + e + " " + t
                }
                ,
                i = r.opseq.hasOwnProperty(n + "eq") ? function(r, n) {
                    return r + " " + e + "= " + n
                }
                : function(r, n) {
                    return r + " = " + r + " " + e + " " + n
                }
                ),
                r[n + "VV"] = r.pointwise2(["x[i]", "y[i]"], t("ret[i]", "x[i]", "y[i]"), o),
                r[n + "SV"] = r.pointwise2(["x", "y[i]"], t("ret[i]", "x", "y[i]"), o),
                r[n + "VS"] = r.pointwise2(["x[i]", "y"], t("ret[i]", "x[i]", "y"), o),
                r[n] = r.compile("var n = arguments.length, i, x = arguments[0], y;\nvar VV = numeric." + n + "VV, VS = numeric." + n + "VS, SV = numeric." + n + 'SV;\nvar dim = numeric.dim;\nfor(i=1;i!==n;++i) { \n  y = arguments[i];\n  if(typeof x === "object") {\n      if(typeof y === "object") x = numeric._biforeach2(x,y,dim(x),0,VV);\n      else x = numeric._biforeach2(x,y,dim(x),0,VS);\n  } else if(typeof y === "object") x = numeric._biforeach2(x,y,dim(y),0,SV);\n  else ' + i("x", "y") + "\n}\nreturn x;\n"),
                r[e] = r[n],
                r[n + "eqV"] = r.pointwise2(["ret[i]", "x[i]"], i("ret[i]", "x[i]"), o),
                r[n + "eqS"] = r.pointwise2(["ret[i]", "x"], i("ret[i]", "x"), o),
                r[n + "eq"] = r.compile("var n = arguments.length, i, x = arguments[0], y;\nvar V = numeric." + n + "eqV, S = numeric." + n + 'eqS\nvar s = numeric.dim(x);\nfor(i=1;i!==n;++i) { \n  y = arguments[i];\n  if(typeof y === "object") numeric._biforeach(x,y,s,0,V);\n  else numeric._biforeach(x,y,s,0,S);\n}\nreturn x;\n')
            }
        for (n = 0; n < r.mathfuns2.length; ++n)
            e = r.mathfuns2[n],
            delete r.ops2[e];
        for (n = 0; n < r.mathfuns.length; ++n)
            e = r.mathfuns[n],
            r.ops1[e] = e;
        for (n in r.ops1)
            r.ops1.hasOwnProperty(n) && (o = "",
            e = r.ops1[n],
            -1 !== r.myIndexOf.call(r.mathfuns, n) && Math.hasOwnProperty(e) && (o = "var " + e + " = Math." + e + ";\n"),
            r[n + "eqV"] = r.pointwise2(["ret[i]"], "ret[i] = " + e + "(ret[i]);", o),
            r[n + "eq"] = r.compile("x", 'if(typeof x !== "object") return ' + e + "x\nvar i;\nvar V = numeric." + n + "eqV;\nvar s = numeric.dim(x);\nnumeric._foreach(x,s,0,V);\nreturn x;\n"),
            r[n + "V"] = r.pointwise2(["x[i]"], "ret[i] = " + e + "(x[i]);", o),
            r[n] = r.compile("x", 'if(typeof x !== "object") return ' + e + "(x)\nvar i;\nvar V = numeric." + n + "V;\nvar s = numeric.dim(x);\nreturn numeric._foreach2(x,s,0,V);\n"));
        for (n = 0; n < r.mathfuns.length; ++n)
            e = r.mathfuns[n],
            delete r.ops1[e];
        for (n in r.mapreducers)
            r.mapreducers.hasOwnProperty(n) && (e = r.mapreducers[n],
            r[n + "V"] = r.mapreduce2(e[0], e[1]),
            r[n] = r.compile("x", "s", "k", e[1] + 'if(typeof x !== "object") {    xi = x;\n' + e[0] + '\n    return accum;\n}if(typeof s === "undefined") s = numeric.dim(x);\nif(typeof k === "undefined") k = 0;\nif(k === s.length-1) return numeric.' + n + "V(x);\nvar xi;\nvar n = x.length, i;\nfor(i=n-1;i!==-1;--i) {\n   xi = arguments.callee(x[i]);\n" + e[0] + "\n}\nreturn accum;\n"))
    }(),
    r.inv = function(n) {
        var e, t, i, o, a, f, u, c = r.dim(n), s = Math.abs, m = c[0], l = c[1], h = r.clone(n), d = r.identity(m);
        for (f = 0; f < l; ++f) {
            var p = -1
              , y = -1;
            for (a = f; a !== m; ++a)
                (u = s(h[a][f])) > y && (p = a,
                y = u);
            for (t = h[p],
            h[p] = h[f],
            h[f] = t,
            o = d[p],
            d[p] = d[f],
            d[f] = o,
            n = t[f],
            u = f; u !== l; ++u)
                t[u] /= n;
            for (u = l - 1; -1 !== u; --u)
                o[u] /= n;
            for (a = m - 1; -1 !== a; --a)
                if (a !== f) {
                    for (e = h[a],
                    i = d[a],
                    n = e[f],
                    u = f + 1; u !== l; ++u)
                        e[u] -= t[u] * n;
                    for (u = l - 1; u > 0; --u)
                        i[u] -= o[u] * n,
                        i[--u] -= o[u] * n;
                    0 === u && (i[0] -= o[0] * n)
                }
        }
        return d
    }
    ,
    r.det = function(n) {
        var e = r.dim(n);
        if (2 !== e.length || e[0] !== e[1])
            throw new Error("numeric: det() only works on square matrices");
        var t, i, o, a, f, u, c, s, m = e[0], l = 1, h = r.clone(n);
        for (i = 0; i < m - 1; i++) {
            for (o = i,
            t = i + 1; t < m; t++)
                Math.abs(h[t][i]) > Math.abs(h[o][i]) && (o = t);
            for (o !== i && (c = h[o],
            h[o] = h[i],
            h[i] = c,
            l *= -1),
            a = h[i],
            t = i + 1; t < m; t++) {
                for (u = (f = h[t])[i] / a[i],
                o = i + 1; o < m - 1; o += 2)
                    s = o + 1,
                    f[o] -= a[o] * u,
                    f[s] -= a[s] * u;
                o !== m && (f[o] -= a[o] * u)
            }
            if (0 === a[i])
                return 0;
            l *= a[i]
        }
        return l * h[i][i]
    }
    ,
    r.transpose = function(r) {
        var n, e, t, i, o, a = r.length, f = r[0].length, u = Array(f);
        for (e = 0; e < f; e++)
            u[e] = Array(a);
        for (n = a - 1; n >= 1; n -= 2) {
            for (i = r[n],
            t = r[n - 1],
            e = f - 1; e >= 1; --e)
                (o = u[e])[n] = i[e],
                o[n - 1] = t[e],
                (o = u[--e])[n] = i[e],
                o[n - 1] = t[e];
            0 === e && ((o = u[0])[n] = i[0],
            o[n - 1] = t[0])
        }
        if (0 === n) {
            for (t = r[0],
            e = f - 1; e >= 1; --e)
                u[e][0] = t[e],
                u[--e][0] = t[e];
            0 === e && (u[0][0] = t[0])
        }
        return u
    }
    ,
    r.negtranspose = function(r) {
        var n, e, t, i, o, a = r.length, f = r[0].length, u = Array(f);
        for (e = 0; e < f; e++)
            u[e] = Array(a);
        for (n = a - 1; n >= 1; n -= 2) {
            for (i = r[n],
            t = r[n - 1],
            e = f - 1; e >= 1; --e)
                (o = u[e])[n] = -i[e],
                o[n - 1] = -t[e],
                (o = u[--e])[n] = -i[e],
                o[n - 1] = -t[e];
            0 === e && ((o = u[0])[n] = -i[0],
            o[n - 1] = -t[0])
        }
        if (0 === n) {
            for (t = r[0],
            e = f - 1; e >= 1; --e)
                u[e][0] = -t[e],
                u[--e][0] = -t[e];
            0 === e && (u[0][0] = -t[0])
        }
        return u
    }
    ,
    r.norm2 = function(n) {
        return Math.sqrt(r.norm2Squared(n))
    }
    ,
    r.linspace = function(r, n, e) {
        if (void 0 === e && (e = Math.max(Math.round(n - r) + 1, 1)),
        e < 2)
            return 1 === e ? [r] : [];
        var t, i = Array(e);
        for (t = --e; t >= 0; t--)
            i[t] = (t * n + (e - t) * r) / e;
        return i
    }
    ,
    r.getBlock = function(n, e, t) {
        var i = r.dim(n);
        return function r(n, o) {
            var a, f = e[o], u = t[o] - f, c = Array(u);
            if (o === i.length - 1) {
                for (a = u; a >= 0; a--)
                    c[a] = n[a + f];
                return c
            }
            for (a = u; a >= 0; a--)
                c[a] = r(n[a + f], o + 1);
            return c
        }(n, 0)
    }
    ,
    r.setBlock = function(n, e, t, i) {
        var o = r.dim(n);
        return function r(n, i, a) {
            var f, u = e[a], c = t[a] - u;
            if (a === o.length - 1)
                for (f = c; f >= 0; f--)
                    n[f + u] = i[f];
            for (f = c; f >= 0; f--)
                r(n[f + u], i[f], a + 1)
        }(n, i, 0),
        n
    }
    ,
    r.getRange = function(r, n, e) {
        var t, i, o, a, f = n.length, u = e.length, c = Array(f);
        for (t = f - 1; -1 !== t; --t)
            for (c[t] = Array(u),
            o = c[t],
            a = r[n[t]],
            i = u - 1; -1 !== i; --i)
                o[i] = a[e[i]];
        return c
    }
    ,
    r.blockMatrix = function(n) {
        var e = r.dim(n);
        if (e.length < 4)
            return r.blockMatrix([n]);
        var t, i, o, a, f, u = e[0], c = e[1];
        for (t = 0,
        i = 0,
        o = 0; o < u; ++o)
            t += n[o][0].length;
        for (a = 0; a < c; ++a)
            i += n[0][a][0].length;
        var s = Array(t);
        for (o = 0; o < t; ++o)
            s[o] = Array(i);
        var m, l, h, d, p, y = 0;
        for (o = 0; o < u; ++o) {
            for (m = i,
            a = c - 1; -1 !== a; --a)
                for (m -= (f = n[o][a])[0].length,
                h = f.length - 1; -1 !== h; --h)
                    for (p = f[h],
                    l = s[y + h],
                    d = p.length - 1; -1 !== d; --d)
                        l[m + d] = p[d];
            y += n[o][0].length
        }
        return s
    }
    ,
    r.tensor = function(n, e) {
        if ("number" == typeof n || "number" == typeof e)
            return r.mul(n, e);
        var t = r.dim(n)
          , i = r.dim(e);
        if (1 !== t.length || 1 !== i.length)
            throw new Error("numeric: tensor product is only defined for vectors");
        var o, a, f, u, c = t[0], s = i[0], m = Array(c);
        for (a = c - 1; a >= 0; a--) {
            for (o = Array(s),
            u = n[a],
            f = s - 1; f >= 3; --f)
                o[f] = u * e[f],
                o[--f] = u * e[f],
                o[--f] = u * e[f],
                o[--f] = u * e[f];
            for (; f >= 0; )
                o[f] = u * e[f],
                --f;
            m[a] = o
        }
        return m
    }
    ,
    r.epsilon = 2220446049250313e-31,
    r.LU = function(n, e) {
        e = e || !1;
        var t, i, o, a, f, u, c, s, m, l = Math.abs, h = n.length, d = h - 1, p = new Array(h);
        for (e || (n = r.clone(n)),
        o = 0; o < h; ++o) {
            for (c = o,
            m = l((u = n[o])[o]),
            i = o + 1; i < h; ++i)
                m < (a = l(n[i][o])) && (m = a,
                c = i);
            for (p[o] = c,
            c != o && (n[o] = n[c],
            n[c] = u,
            u = n[o]),
            f = u[o],
            t = o + 1; t < h; ++t)
                n[t][o] /= f;
            for (t = o + 1; t < h; ++t) {
                for (s = n[t],
                i = o + 1; i < d; ++i)
                    s[i] -= s[o] * u[i],
                    s[++i] -= s[o] * u[i];
                i === d && (s[i] -= s[o] * u[i])
            }
        }
        return {
            LU: n,
            P: p
        }
    }
    ,
    r.LUsolve = function(n, e) {
        var t, i, o, a, f, u = n.LU, c = u.length, s = r.clone(e), m = n.P;
        for (t = c - 1; -1 !== t; --t)
            s[t] = e[t];
        for (t = 0; t < c; ++t)
            for (o = m[t],
            m[t] !== t && (f = s[t],
            s[t] = s[o],
            s[o] = f),
            a = u[t],
            i = 0; i < t; ++i)
                s[t] -= s[i] * a[i];
        for (t = c - 1; t >= 0; --t) {
            for (a = u[t],
            i = t + 1; i < c; ++i)
                s[t] -= s[i] * a[i];
            s[t] /= a[t]
        }
        return s
    }
    ,
    r.solve = function(n, e, t) {
        return r.LUsolve(r.LU(n, t), e)
    }
    ,
    r
});

define('core/math/builtin', ["require", "exports", "core/lib/md5", "core/vendor/d3-color", "core/math/quadrature", "core/math/mathshim", "core/math/mathshim", "core/math/distance", "core/math/distance", "core/math/tofraction", "core/math/poi", "./maybe-rational", "./builtin-common"], function(require, t, r, n, e, a, o, u, i, f, h, c, s) {
    "use strict";
    function l(t, r, n) {
        return Math.max(r, Math.min(n, t))
    }
    function M(r, n) {
        r = Math.round(r),
        n = Math.round(n);
        var e = t.gcd(r, n);
        return Math.abs(r / e * n)
    }
    function v(t) {
        return p(t + 1)
    }
    function p(t) {
        if (t < 0)
            return Math.PI / (P(Math.PI * t) * p(1 - t));
        if (t > 170)
            return 1 / 0;
        var r, n = Math.round(t) === t;
        return r = t < 15 ? g(t) : t < 120 ? function(t) {
            var r = t - 1;
            return Math.pow(r, r) * Math.exp(T(r) - r) * Math.sqrt(2 * Math.PI * r)
        }(t) : Math.exp(m(t)),
        n ? Math.round(r) : r
    }
    function g(t) {
        var r = 1 + t * (4.077131788261185 + t * (7.024675027156382 + t * (6.657107767450176 + t * (3.766266976716022 + t * (1.2792371666711133 + t * (.24304596436338005 + .020049769312165774 * t))))))
          , n = 1 + t * (4.154347453162709 + t * (7.270007565107539 + t * (6.97805297331391 + t * (3.989651532924167 + t * (1.367176195613119 + t * (.26175627691546965 + .021742722739397567 * t))))));
        return Math.E * Math.pow((1 + t) / Math.E, 1 + t) / (t * Math.sqrt(1 + t)) * (r / n)
    }
    function m(t) {
        var r = t - 1;
        return r * (Math.log(r) - 1) + .5 * Math.log(2 * Math.PI * r) + T(r)
    }
    function d(t, r) {
        if (t !== Math.floor(t))
            return NaN;
        if (t < 0)
            return NaN;
        if (0 === t)
            return 1 / I(r);
        var n = P(r);
        if (1 === t)
            return -1 / (n * n);
        var e = w(r);
        if (2 === t)
            return 2 * e / (n * n * n);
        for (var a = [0, 2], o = [], u = 3; u <= t; u++) {
            o = [];
            for (var i = 0; i < u; i++) {
                var f = 0
                  , h = 0;
                i > 0 && (f = (u - i + 1) * a[i - 1]),
                i + 2 < u && (h = (i + 1) * a[i + 1]),
                o.push(-(f + h))
            }
            a = o
        }
        var c = 0;
        for (i = t - 1; i >= 0; i--)
            c = o[i] + e * c;
        return c / Math.pow(n, t + 1)
    }
    function N(t, r) {
        return 0 === r ? NaN : (n = r === Math.E ? Math.log(t) : 2 === r && Math.log2 ? Math.log2(t) : 10 === r && Math.log10 ? Math.log10(t) : Math.log(t) / Math.log(r),
        Math.pow(r, Math.round(n)) === t ? Math.round(n) : n);
        var n
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.uniquePerm = t.elementsAt = t.select = t.polygon = t.hsv = t.rgb = t.distance = t.quad = t.stdevp = t.stdev = t.spearman = t.rank = t.validateSampleCount = t.validateRangeLength = t.corr = t.cov = t.covp = t.variance = t.mad = t.varp = t.argMax = t.argMin = t.median = t.lowerQuartileIndex = t.upperQuartileIndex = t.lowerQuantileIndex = t.upperQuantileIndex = t.quartileIndex = t.sortPerm = t.quartile = t.quantile = t.listMax = t.listMin = t.length = t.stats = t.ittest = t.ttest = t.itscore = t.tscore = t.invUniform = t.invT = t.invBinom = t.invPoisson = t.invNorm = t.erfcx = t.erf = t.uniformcdf = t.uniformpdf = t.poissoncdf = t.poissonpdf = t.binompdf = t.binomcdf = t.poissonSample = t.binomSample = t.tSample = t.normalSample = t.uniformSample = t.randomPerm = t.shuffle = t.random = t.normalpdf = t.normalcdf = t.tcdf = t.tpdf = t.total = t.mean = t.acoth = t.acsch = t.asech = t.coth = t.csch = t.sech = t.asec = t.acsc = t.acot = t.cot = t.csc = t.sec = t.tan = t.cos = t.sin = t.nthroot = t.common_log = t.log_base = t.log = t.polyGamma = t.cotDerivative = t.bernoulliTable = t.lnGamma = t.gamma = t.factorial = t.nPr = t.nCr = t.listLCM = t.listGCD = t.lcm = t.mod = t.pow = t.gcd = t.toFraction = t.hypot = t.sign = t.sqrtxsqm1 = t.sqrtxsqp1 = t.log1p = t.expm1 = t.atanh = t.asinh = t.acosh = t.tanh = t.sinh = t.cosh = t.md5Spyable = void 0,
    t.md5Spyable = r,
    Object.defineProperty(t, "cosh", {
        enumerable: !0,
        get: function() {
            return o.cosh
        }
    }),
    Object.defineProperty(t, "sinh", {
        enumerable: !0,
        get: function() {
            return o.sinh
        }
    }),
    Object.defineProperty(t, "tanh", {
        enumerable: !0,
        get: function() {
            return o.tanh
        }
    }),
    Object.defineProperty(t, "acosh", {
        enumerable: !0,
        get: function() {
            return o.acosh
        }
    }),
    Object.defineProperty(t, "asinh", {
        enumerable: !0,
        get: function() {
            return o.asinh
        }
    }),
    Object.defineProperty(t, "atanh", {
        enumerable: !0,
        get: function() {
            return o.atanh
        }
    }),
    Object.defineProperty(t, "expm1", {
        enumerable: !0,
        get: function() {
            return o.expm1
        }
    }),
    Object.defineProperty(t, "log1p", {
        enumerable: !0,
        get: function() {
            return o.log1p
        }
    }),
    Object.defineProperty(t, "sqrtxsqp1", {
        enumerable: !0,
        get: function() {
            return o.sqrtxsqp1
        }
    }),
    Object.defineProperty(t, "sqrtxsqm1", {
        enumerable: !0,
        get: function() {
            return o.sqrtxsqm1
        }
    }),
    Object.defineProperty(t, "sign", {
        enumerable: !0,
        get: function() {
            return o.sign
        }
    }),
    Object.defineProperty(t, "hypot", {
        enumerable: !0,
        get: function() {
            return i.hypot
        }
    }),
    t.toFraction = f.default,
    t.gcd = s.gcd,
    t.pow = s.pow,
    t.mod = function(t, r) {
        var n = t % r;
        return t * r < 0 && 0 !== n ? n + r : n
    }
    ,
    t.lcm = M,
    t.listGCD = function(r) {
        if (0 === r.length)
            return NaN;
        for (var n = r[0], e = 1; e < r.length; e++)
            n = t.gcd(n, r[e]);
        return n
    }
    ,
    t.listLCM = function(t) {
        if (0 === t.length)
            return NaN;
        for (var r = t[0], n = 1; n < t.length; n++)
            r = M(r, t[n]);
        return r
    }
    ,
    t.nCr = function(t, r) {
        if (t = Math.round(t),
        (r = Math.round(r)) > t || t < 0 || r < 0)
            return 0;
        if (r === 1 / 0 || t === 1 / 0)
            return NaN;
        r > t - r && (r = t - r);
        for (var n = 1, e = 0; e < r; e++)
            n *= (t - e) / (e + 1);
        return Math.round(n)
    }
    ,
    t.nPr = function(t, r) {
        if (t = Math.round(t),
        (r = Math.round(r)) > t || t < 0 || r < 0)
            return 0;
        if (r === 1 / 0 || t === 1 / 0)
            return NaN;
        for (var n = 1, e = 0; e < r; e++)
            n *= t - e;
        return n
    }
    ,
    t.factorial = v,
    t.gamma = p,
    t.lnGamma = function(t) {
        return t < 0 ? NaN : t < 15 ? Math.log(g(t)) : m(t)
    }
    ,
    t.bernoulliTable = [1 / 6, -1 / 30, 1 / 42, -1 / 30, 5 / 66, -691 / 2730, 7 / 6, -3617 / 510, 43867 / 798, -174611 / 330, 854513 / 138, -236364091 / 2730, 8553103 / 6, -23749461029 / 870],
    t.cotDerivative = d,
    t.polyGamma = function r(n, e) {
        if (n < 0)
            return NaN;
        if (n !== Math.floor(n))
            return NaN;
        var a = n % 2 == 0 ? -1 : 1;
        if (e < 0)
            return -a * r(n, 1 - e) - Math.pow(Math.PI, n + 1) * d(n, Math.PI * e);
        for (var o = v(n), u = 0, i = Math.pow(e, -(n + 1)); e < 10; )
            u += i,
            e++,
            i = Math.pow(e, -(n + 1));
        u += 0 === n ? -Math.log(e) : i * e / n,
        u += .5 * i;
        for (var f = t.bernoulliTable, h = n + 1, c = 2, s = i * e * h / c, l = 1 / (e * e), M = 1; M <= 14; M++)
            u += (s *= l) * f[M - 1],
            s *= ++h / ++c,
            s *= ++h / ++c;
        return o * a * u
    }
    ,
    t.log = function(t) {
        var r = Math.log(t);
        return Math.exp(Math.round(r)) === t ? Math.round(r) : r
    }
    ,
    t.log_base = N,
    t.common_log = function(t) {
        return N(t, 10)
    }
    ,
    t.nthroot = function(r, n) {
        return t.pow(r, 1 / n)
    }
    ;
    var b = 1 / Math.PI;
    function q(t) {
        return !(t > 1e12) && Math.round(b * t) * Math.PI === t
    }
    function x(t) {
        if (t > 1e12)
            return !1;
        var r = Math.round(2 * b * t);
        return r % 2 == 1 && r * Math.PI == 2 * t
    }
    function P(t) {
        return q(Math.abs(t)) ? 0 : Math.sin(t)
    }
    function w(t) {
        return x(Math.abs(t)) ? 0 : Math.cos(t)
    }
    function I(t) {
        var r = Math.abs(t);
        return q(r) ? 0 : x(r) ? 1 / 0 : Math.tan(t)
    }
    function y(t) {
        for (var r = 0, n = 0; n < t.length; n++)
            r += t[n];
        return r / t.length
    }
    function S(t) {
        return t > 50 ? Math.exp(.5 * ((1 - t) * a.log1p(-1 / (t - 1)) - 1) + O(.5 * (t - 1)) - O(.5 * (t - 2))) * Math.sqrt((1 - 1 / t) / (2 * Math.PI)) : p((t + 1) / 2) / (p(t / 2) * Math.sqrt(t * Math.PI))
    }
    function j(t, r, n) {
        if (void 0 === n && (n = t - r),
        Math.abs(n) < .1 * (t + r))
            for (var e = n / (t + r), a = n * n / (t + r), o = 2 * t * e, u = 1; u < 10; u++) {
                var i = a + (o *= e * e) / (2 * u + 1);
                if (i == a)
                    return i;
                a = i
            }
        return t * Math.log(t / r) + r - t
    }
    t.sin = P,
    t.cos = w,
    t.tan = I,
    t.sec = function(t) {
        return x(Math.abs(t)) ? 1 / 0 : 1 / Math.cos(t)
    }
    ,
    t.csc = function(t) {
        return q(Math.abs(t)) ? 1 / 0 : 1 / Math.sin(t)
    }
    ,
    t.cot = function(t) {
        var r = Math.abs(t);
        return q(r) ? 1 / 0 : x(r) ? 0 : 1 / Math.tan(t)
    }
    ,
    t.acot = function(t) {
        return Math.PI / 2 - Math.atan(t)
    }
    ,
    t.acsc = function(t) {
        return Math.asin(1 / t)
    }
    ,
    t.asec = function(t) {
        return Math.acos(1 / t)
    }
    ,
    t.sech = function(t) {
        return 1 / a.cosh(t)
    }
    ,
    t.csch = function(t) {
        return 1 / a.sinh(t)
    }
    ,
    t.coth = function(t) {
        return 1 / a.tanh(t)
    }
    ,
    t.asech = function(t) {
        return a.acosh(1 / t)
    }
    ,
    t.acsch = function(t) {
        return a.asinh(1 / t)
    }
    ,
    t.acoth = function(t) {
        return a.atanh(1 / t)
    }
    ,
    t.mean = y,
    t.total = function(t) {
        for (var r = 0, n = 0; n < t.length; n++)
            r += t[n];
        return r
    }
    ;
    var F = [0, .08106146679532726, .0413406959554093, .02767792568499834, .020790672103765093, .016644691189821193, .013876128823070748, .01189670994589177, .010411265261972096, .009255462182712733, .00833056343336287, .007573675487951841, .00694284010720953, .006408994188004207, .0059513701127588475, .005554733551962801];
    function O(t) {
        return t > 15 ? T(t) : t < 0 ? NaN : t === Math.floor(t) ? F[t] : Math.log(v(t) / (Math.pow(t, t) * Math.exp(-t) * Math.sqrt(2 * Math.PI * t)))
    }
    function T(t) {
        var r = t * t;
        return (.08333333333333333 - (.002777777777777778 - (.0007936507936507937 - (.0005952380952380953 - .0008417508417508417 / r) / r) / r) / r) / t
    }
    function Q(t, r) {
        return r <= 0 ? NaN : S(r) * Math.pow(1 + t * t / r, -(r + 1) / 2)
    }
    function C(t, r) {
        if (r > 0)
            return 1 - C(t, -r);
        if (r === -1 / 0)
            return 0;
        if (0 === r)
            return .5;
        if (t >= 40 && r > -1)
            return .5 + S(t) * function(t, r) {
                for (var n = r * r / t, e = r, a = e, o = 1; o <= 15; o++)
                    a += e *= -(2 * o - 1) / (2 * o + 1) * (.5 * (t + 1) + o - 1) / o * n;
                return a
            }(t, r);
        if (r / t < -1e3) {
            var n = r * r;
            return S(t) * Math.pow(t, .5 * (t - 1)) * Math.pow(Math.abs(r), -t) * (1 - t * t * (t + 1) * (1 / (2 + t) + t * (t + 3) / (4 * (4 + t) * n)) / (2 * n))
        }
        var e = Math.sqrt(r * r + t);
        return function(t, r, n) {
            if (t < 0 || t > 1)
                throw new RangeError("First argument must be between 0 and 1.");
            if (1 === r && 1 === n)
                return t;
            if (0 === t)
                return 0;
            if (1 === t)
                return 1;
            if (0 === r)
                return 1;
            if (0 === n)
                return 0;
            var e = O(r + n) - O(r) - O(n) - j(r, (r + n) * t) - j(n, (r + n) * (1 - t), (r + n) * t - r)
              , a = Math.exp(e) * Math.sqrt(r * n / (2 * Math.PI * (r + n)));
            return t < (r + 1) / (r + n + 2) ? a * R(t, r, n) / r : 1 - a * R(1 - t, n, r) / n
        }((r + e) / (2 * e), t / 2, t / 2)
    }
    function E(t, r, n) {
        return n <= 0 ? NaN : t === -1 / 0 ? C(n, r) : t > 0 && r > 0 ? C(n, -t) - C(n, -r) : C(n, r) - C(n, t)
    }
    function R(t, r, n) {
        var e = Math.pow(2, -52)
          , a = 1e-300
          , o = r + n
          , u = r + 1
          , i = r - 1
          , f = 1
          , h = 1 - o * t / u;
        Math.abs(h) < a && (h = a);
        for (var c = h = 1 / h, s = 1; s <= 100; s++) {
            var l = 2 * s
              , M = s * (n - s) * t / ((i + l) * (r + l));
            h = 1 + M * h,
            Math.abs(h) < a && (h = a),
            f = 1 + M / f,
            Math.abs(f) < a && (f = a),
            c *= (h = 1 / h) * f,
            h = 1 + (M = -(r + s) * (o + s) * t / ((r + l) * (u + l))) * h,
            Math.abs(h) < a && (h = a),
            f = 1 + M / f,
            Math.abs(f) < a && (f = a);
            var v = (h = 1 / h) * f;
            if (c *= v,
            Math.abs(v - 1) <= e)
                return c
        }
        return c
    }
    function _(t, r, n) {
        return (t - r) / (Math.SQRT2 * Math.abs(n))
    }
    function G(t) {
        return t < 0 ? .5 * Math.exp(-t * t) * K(-t) : 1 - .5 * Math.exp(-t * t) * K(t)
    }
    function A(r) {
        var n = t.md5Spyable(r);
        return (4294967296 * (2097151 & parseInt(n.slice(0, 8), 16)) + parseInt(n.slice(8, 16), 16)) / 9007199254740992
    }
    function D(t, r) {
        for (var n = r.length - 1; n > 0; n--) {
            var e = t + "::sc" + n
              , a = Math.floor(A(e) * (n + 1))
              , o = r[n];
            r[n] = r[a],
            r[a] = o
        }
    }
    function L(t, r, n) {
        return A(t) * (n - r) + r
    }
    function k(t, r, n) {
        return t >= r ? 1 : t < 0 ? 0 : t < Math.floor((r + 1) * n) ? B(t, r, n) : 1 - B(r - t - 1, r, 1 - n)
    }
    function B(t, r, n) {
        for (var e = (1 - n) / n, a = U(t, r, n), o = a; t > 0 && o + (a *= t / (r - t + 1) * e) !== o; t--)
            o += a;
        return o
    }
    function U(t, r, n) {
        if (t = Math.round(t),
        (r = l(Math.round(r), 0, 1 / 0)) === 1 / 0)
            return NaN;
        if (n = l(n, 0, 1),
        t < 0 || t > r)
            return 0;
        if (0 === n)
            return 0 === t ? 1 : 0;
        if (1 === n)
            return t === r ? 1 : 0;
        if (0 === t)
            return Math.exp(r * a.log1p(-n));
        if (t === r)
            return Math.pow(n, r);
        var e = O(r) - O(t) - O(r - t) - j(t, r * n) - j(r - t, r * (1 - n), r * n - t);
        return Math.exp(e) * Math.sqrt(r / (2 * Math.PI * t * (r - t)))
    }
    function z(t, r) {
        return r < 0 ? NaN : (t = Math.round(t)) < 0 ? 0 : 0 === r ? 0 === t ? 1 : 0 : 0 === t ? Math.exp(-r) : Math.exp(-O(t) - j(t, r)) / Math.sqrt(2 * Math.PI * t)
    }
    function H(t, r) {
        if (isNaN(t) || isNaN(r))
            return NaN;
        if (t === 1 / 0)
            return 1;
        if ((t = Math.floor(t)) < 0)
            return 0;
        if (0 === r)
            return 1;
        if (t + 1 > 12 && 2.35 * (t + 1) > r && .3 * (t + 1) < r)
            return function(t, r) {
                for (var n = r / t, e = a.sign(r - t) * Math.sqrt(2 * j(1, n)), o = [1, -.3333333333333333, .08333333333333333, -.014814814814814815, .0011574074074074073, .0003527336860670194, -.0001787551440329218, 3919263178522438e-20, -2185448510679992e-21, -185406221071516e-20, 8.296711340953087e-7, -1.7665952736826078e-7, 6.707853543401498e-9, 1.0261809784240309e-8, -4.382036018453353e-9, 9.14769958223679e-10, -25514193994946248e-27, -5830772132550426e-26, 24361948020667415e-27, -50276692801141755e-28, 11004392031956135e-29, 3371763262400985e-28, -1392388722418162e-28, 28534893807047445e-30, -5139111834242572e-31, -19752288294349442e-31, 8099521156704561e-31], u = o.length - 2, i = 0, f = 0, h = 0, c = 0; u >= 0; u--)
                    c = e * c + (h = (u + 2) * i / t + o[u + 1]),
                    i = f,
                    f = h;
                if (c *= t / (t + i),
                r < t) {
                    var s = Math.exp(-.5 * t * e * e) * (.5 * K(-e * Math.sqrt(t / 2)) - c / Math.sqrt(2 * Math.PI * t));
                    return isFinite(s) ? 1 - s : 1
                }
                var l = Math.exp(-.5 * t * e * e) * (.5 * K(e * Math.sqrt(t / 2)) + c / Math.sqrt(2 * Math.PI * t));
                return isFinite(l) ? l : 0
            }(t + 1, r);
        if (t + 1 >= r) {
            var n = function(t, r) {
                var n = Math.pow(2, -52)
                  , e = 1e-300
                  , a = 1 / t
                  , o = 1 / e
                  , u = 1 / t
                  , i = 2
                  , f = 0
                  , h = t
                  , c = -(t - 1)
                  , s = 0;
                do {
                    0 === (u = u * (c -= 1) * r + (h += 1)) && (u = e),
                    0 === (o = h + c * r / o) && (o = e),
                    a *= f = o * (u = 1 / u),
                    0 === (u = u * (s += 1) * r + (h += 1)) && (u = e),
                    0 === (o = h + s * r / o) && (o = e),
                    a *= f = o * (u = 1 / u),
                    i += 2
                } while (i < 100 && Math.abs(f - 1) > n);
                return a
            }(t + 1, r);
            return isFinite(n) ? 1 - r * z(t, r) * n : 1
        }
        n = function(t, r) {
            var n = Math.pow(2, -52)
              , e = 1e-300
              , a = r + 1 - t
              , o = 1 / a
              , u = 1 / e
              , i = 1 / a
              , f = 2
              , h = 0
              , c = a;
            do {
                var s = -(f - 1) * (f - t - 1);
                0 === (i = i * s + (c += 2)) && (i = e),
                0 === (u = c + s / u) && (u = e),
                o *= h = u * (i = 1 / i),
                f += 1
            } while (f < 100 && Math.abs(h - 1) > n);
            return o
        }(t + 1, r);
        return isFinite(n) ? r * z(t, r) * n : 0
    }
    function J(t, r, n) {
        return n <= r ? NaN : t < r ? 0 : t > n ? 1 : (t - r) / (n - r)
    }
    function K(t) {
        if (t < 0)
            return t < -6.1 ? 2 * Math.exp(t * t) : 2 * Math.exp(t * t) - K(-t);
        if (t > 50) {
            var r = .5641895835477563
              , n = t * t;
            return t > 5e7 ? r / t : r * (n * (n + 4.5) + 2) / (t * (n * (n + 5) + 3.75))
        }
        return (.9999999999999999 + t * (2.224574423459406 + t * (2.444115549920689 + t * (1.7057986861852539 + t * (.8257463703357973 + t * (.28647031042892007 + t * (.07124513844341643 + t * (.012296749268608364 + t * (.001347817214557592 + 7263959403471071e-20 * t))))))))) / (1 + t * (3.352953590554884 + t * (5.227518529742423 + t * (5.003720878235473 + t * (3.266590890998987 + t * (1.5255421920765353 + t * (.5185887413188858 + t * (.12747319185915415 + t * (.02185979575963238 + t * (.0023889438122503674 + .00012875032817508128 * t))))))))))
    }
    function V(t) {
        var r, n, e;
        return t > .5 ? -V(1 - t) : .5 === t ? 0 : t < 0 ? NaN : 0 === t ? -1 / 0 : (e = t < .02425 ? (((((-.00778489400243029 * (r = Math.sqrt(-2 * Math.log(t))) - .322396458041136) * r - 2.40075827716184) * r - 2.54973253934373) * r + 4.37466414146497) * r + 2.93816398269878) / ((((.00778469570904146 * r + .32246712907004) * r + 2.445134137143) * r + 3.75440866190742) * r + 1) : (((((-39.6968302866538 * (n = (r = t - .5) * r) + 220.946098424521) * n - 275.928510446969) * n + 138.357751867269) * n - 30.6647980661472) * n + 2.50662827745924) * r / (((((-54.4760987982241 * n + 161.585836858041) * n - 155.698979859887) * n + 66.8013118877197) * n - 13.2806815528857) * n + 1)) - Math.sqrt(2 * Math.PI) * (.5 * K(-e / Math.SQRT2) - Math.exp(.5 * e * e) * t)
    }
    function W(t, r) {
        if (r <= 0 || t < 0 || t > 1)
            return NaN;
        if (0 === t)
            return 0;
        if (1 === t)
            return 1 / 0;
        for (var n = 1, e = 1, a = 1; Math.exp(-r) * e < t; ) {
            if (e + (n *= r / a) === e)
                return 1 / 0;
            e += n,
            a += 1
        }
        return a - 1
    }
    function X(t, r, n) {
        if (r !== Math.round(r))
            return NaN;
        if (n < 0 || n > 1)
            return NaN;
        if (t < 0 || t > 1)
            return NaN;
        if (0 === t)
            return 0;
        if (1 === t)
            return r;
        if (0 === r)
            return 0;
        if (1 === n)
            return r;
        if (0 === n)
            return 0;
        for (var e = n / (1 - n), a = Math.pow(1 - n, r), o = a, u = 1; o < t; ) {
            if (o + (a *= (r - u + 1) / u * e) === o)
                return r;
            if (u > r)
                return r;
            o += a,
            u += 1
        }
        return u - 1
    }
    function Y(t, r) {
        var n = 4 * r * (1 - r);
        switch (t) {
        case 1:
            return Math.tan(Math.PI * (r - .5));
        case 2:
            return 2 * (r - .5) * Math.sqrt(2 / n);
        case 4:
            var e = Math.cos(Math.acos(Math.sqrt(n)) / 3) / Math.sqrt(n);
            return 2 * a.sign(r - .5) * Math.sqrt(e - 1);
        default:
            throw new Error("_invTSimple() must be called with 1, 2, or 4 df.")
        }
    }
    function Z(t, r) {
        var n = Mt(t);
        return (y(t) - r) * Math.sqrt(t.length) / n
    }
    function $(t, r) {
        var n = t.length
          , e = y(t)
          , a = Mt(t)
          , o = r.length
          , u = y(r)
          , i = Mt(r);
        return (e - u) / (Math.sqrt(((n - 1) * a * a + (o - 1) * i * i) / (n + o - 2)) * Math.sqrt(1 / n + 1 / o))
    }
    function tt(t, r, n) {
        return n < 0 ? E(-1 / 0, t, r) : n > 0 ? E(-1 / 0, -t, r) : 2 * E(-1 / 0, -Math.abs(t), r)
    }
    function rt(t) {
        if (t.length < 1)
            return NaN;
        var r = t[0];
        if (isNaN(r))
            return NaN;
        for (var n = 1; n < t.length; n++) {
            if (isNaN(t[n]))
                return NaN;
            t[n] < r && (r = t[n])
        }
        return r
    }
    function nt(t) {
        if (t.length < 1)
            return NaN;
        var r = t[0];
        if (isNaN(r))
            return NaN;
        for (var n = 1; n < t.length; n++) {
            if (isNaN(t[n]))
                return NaN;
            t[n] >= r && (r = t[n])
        }
        return r
    }
    function et(t, r) {
        if (!isFinite(r) || r < 0 || r > 1)
            return NaN;
        if (t.some(isNaN))
            return NaN;
        if (0 === t.length)
            return NaN;
        var n = t.length
          , e = ot(t)
          , a = r * (n - 1);
        return Math.floor(a) === a ? t[e[a]] : (Math.ceil(a) - a) * t[e[Math.floor(a)]] + (a - Math.floor(a)) * t[e[Math.ceil(a)]]
    }
    function at(t, r) {
        if (!isFinite(r) || r < 0 || r > 4)
            return NaN;
        if (t.some(isNaN))
            return NaN;
        var n = ot(t)
          , e = ut(t, r)
          , a = Math.floor(e)
          , o = Math.ceil(e);
        return (t[n[a]] + t[n[o]]) / 2
    }
    function ot(t) {
        for (var r = t.length, n = [], e = 0; e < r; e++)
            n.push(e);
        return n.sort(function(r, n) {
            return c.asFloat(c.sub(t[r], t[n]))
        }),
        n
    }
    function ut(t, r) {
        r = Math.round(r);
        var n, e = t.length, a = e % 2 == 1;
        return 1 === e ? 0 : (0 === r && (n = 0),
        2 === r && (n = (e - 1) / 2),
        4 === r && (n = e - 1),
        1 === r && (n = a ? (e + 1) / 4 - 1 : (e + 2) / 4 - 1),
        3 === r && (n = a ? (3 * e + 3) / 4 - 1 : (3 * e + 2) / 4 - 1),
        void 0 === n ? NaN : n)
    }
    function it(t) {
        return et(t, .5)
    }
    function ft(t) {
        for (var r = y(t), n = 0, e = 0; e < t.length; e++) {
            var a = t[e] - r;
            n += a * a
        }
        return n / t.length
    }
    function ht(t) {
        var r = t.length;
        return ft(t) * r / (r - 1)
    }
    function ct(t, r) {
        var n = Math.min(t.length, r.length);
        t.length !== n && (t = t.slice(0, n)),
        r.length !== n && (r = r.slice(0, n));
        for (var e = y(t), a = y(r), o = 0, u = 0; u < n; u++)
            o += (t[u] - e) * (r[u] - a);
        return o / n
    }
    function st(t, r) {
        var n = Math.min(t.length, r.length);
        t.length !== n && (t = t.slice(0, n)),
        r.length !== n && (r = r.slice(0, n));
        for (var e = y(t), a = y(r), o = 0, u = 0, i = 0, f = 0; f < n; f++) {
            var h = t[f] - e
              , c = r[f] - a;
            o += h * h,
            u += c * c,
            i += h * c
        }
        return i / Math.sqrt(o * u)
    }
    function lt(t) {
        var r = t.length;
        if (0 === r)
            return [];
        for (var n = [], e = [], a = 0; a < r; a++)
            e.push([t[a], a]);
        e.sort(function(t, r) {
            var n = t[0]
              , e = r[0];
            return n === 1 / 0 && e === 1 / 0 || n === -1 / 0 && e === -1 / 0 ? 0 : n - e
        });
        for (var o = 0, u = 1, i = 1; o < r; ) {
            for (var f = o; f < r - 1 && e[f][0] === e[f + 1][0]; )
                f += 1;
            i = f - o + 1;
            var h = void 0;
            for (f = 0; f < i; f++)
                n[h = e[o + f][1]] = isNaN(t[h]) ? NaN : u + .5 * (i - 1);
            u += i,
            o += i
        }
        return n
    }
    function Mt(t) {
        return Math.sqrt(ht(t))
    }
    function vt(t, r, n) {
        return [l(Math.round(t), 0, 255), l(Math.round(r), 0, 255), l(Math.round(n), 0, 255)]
    }
    function pt(t) {
        if (Array.isArray(t))
            return "[" + t.map(pt).join(",") + "]";
        switch (typeof t) {
        case "string":
            return t;
        case "boolean":
        case "number":
            return t.toString();
        case "object":
            if ("object" == typeof (e = t) && e && "Action" === e.type) {
                var r = [];
                for (var n in t.updateRules)
                    r.push('"' + n + '": ' + pt(t.updateRules[n].value));
                return "{" + r.join(",") + "}"
            }
            return t.n + "/" + t.d;
        default:
            return t
        }
        var e
    }
    t.tpdf = Q,
    t.tcdf = E,
    t.normalcdf = function(t, r, n, e) {
        var a = _(r, n, e);
        if (t === -1 / 0)
            return G(a);
        var o = _(t, n, e);
        return t > 0 && r > 0 ? G(-o) - G(-a) : G(a) - G(o)
    }
    ,
    t.normalpdf = function(t, r, n) {
        return 1 / Math.sqrt(2 * Math.PI * n * n) * Math.exp(-(t - r) * (t - r) / (2 * n * n))
    }
    ,
    t.random = A,
    t.shuffle = function(t, r) {
        var n = r.slice();
        return D(t, n),
        n
    }
    ,
    t.randomPerm = function(t, r) {
        for (var n = [], e = 0; e < r; e++)
            n.push(e);
        return D(t, n),
        n
    }
    ,
    t.uniformSample = L,
    t.normalSample = function(t, r, n) {
        var e, a, o, u, i = 0;
        do {
            e = t + "::sc" + i,
            i += 1,
            a = 2 * L(e, 0, 1) - 1,
            e = t + "::sc" + i,
            i += 1,
            u = a * a + (o = 2 * L(e, 0, 1) - 1) * o
        } while (u >= 1 || 0 === u);
        return r + n * a * Math.sqrt(-2 * Math.log(u) / u)
    }
    ,
    t.tSample = function(t, r) {
        if (r <= 0)
            return NaN;
        var n, e, a, o, u = 0;
        do {
            n = t + "::sc" + u,
            u += 1,
            e = 2 * L(n, 0, 1) - 1,
            n = t + "::sc" + u,
            u += 1,
            o = e * e + (a = 2 * L(n, 0, 1) - 1) * a
        } while (o > 1);
        var i = e * e / o
          , f = r * (Math.pow(o, -2 / r) - 1);
        return n = t + "::sc" + u,
        u += 1,
        (L(n, 0, 1) < .5 ? -1 : 1) * Math.sqrt(i * f)
    }
    ,
    t.binomSample = function(t, r, n) {
        return (r = l(Math.round(r), 0, 1 / 0)) === 1 / 0 ? NaN : (n = l(n, 0, 1),
        X(L(t, 0, 1), r, n))
    }
    ,
    t.poissonSample = function(t, r) {
        return r <= 0 ? NaN : W(L(t, 0, 1), r)
    }
    ,
    t.binomcdf = function(t, r, n, e) {
        return (n = l(Math.round(n), 0, 1 / 0)) === 1 / 0 ? NaN : (e = l(e, 0, 1),
        r < 0 ? 0 : (t = Math.ceil(t),
        r = Math.floor(r),
        t === -1 / 0 ? k(r, n, e) : k(r, n, e) - k(t - 1, n, e)))
    }
    ,
    t.binompdf = U,
    t.poissonpdf = z,
    t.poissoncdf = function(t, r, n) {
        return n <= 0 ? NaN : (t = Math.ceil(t),
        (r = Math.floor(r)) < 0 ? 0 : t === -1 / 0 ? H(r, n) : H(r, n) - H(t - 1, n))
    }
    ,
    t.uniformpdf = function(t, r, n) {
        return n <= r ? NaN : t < r || t > n ? 0 : 1 / (n - r)
    }
    ,
    t.uniformcdf = function(t, r, n, e) {
        return J(r, n, e) - J(t, n, e)
    }
    ,
    t.erf = function(t) {
        var r = -t * t;
        return r < -750 ? t >= 0 ? 1 : -1 : t >= .065 ? 1 - Math.exp(r) * K(t) : t <= -.065 ? Math.exp(r) * K(-t) - 1 : t * (1.1283791670955126 + r * (.37612638903183754 + r * (.11283791670955126 + r * (.026866170645131252 + .005223977625442188 * r))))
    }
    ,
    t.erfcx = K,
    t.invNorm = V,
    t.invPoisson = W,
    t.invBinom = X,
    t.invT = function t(r, n) {
        return isNaN(n) || n <= 0 || r < 0 || r > 1 ? NaN : 0 === r ? -1 / 0 : 1 === r ? 1 / 0 : 1 === n || 2 === n || 4 === n ? Y(n, r) : .5 === r ? 0 : r > .5 ? function(t, r, n, e) {
            if (!isFinite(n) || !isFinite(e))
                return NaN;
            var a = n
              , o = e;
            for (; ; ) {
                var u = h.floatMiddle(a, o)
                  , i = C(t, u);
                if (u === a || u === o)
                    return i > r ? a : o;
                i < r ? a = u : o = u
            }
        }(n, r, n > 1 ? V(r) : Y(1, r), n > 1 ? Y(1, r) : Math.pow(Q(0, n) * Math.pow(n, (n - 1) / 2) / (1 - r), 1 / n)) : -t(1 - r, n)
    }
    ,
    t.invUniform = function(t, r, n) {
        return t < 0 || t > 1 || n <= r ? NaN : 0 === t ? r : 1 === t ? n : r + t * (n - r)
    }
    ,
    t.tscore = Z,
    t.itscore = $,
    t.ttest = function(t, r) {
        1 === arguments.length && (r = 0);
        var n = Z(t, r)
          , e = t.length - 1;
        return {
            lessThan: tt(n, e, -1),
            greaterThan: tt(n, e, 1),
            notEqual: tt(n, e, 0)
        }
    }
    ,
    t.ittest = function(t, r) {
        var n = $(t, r)
          , e = t.length + r.length - 2;
        return {
            lessThan: tt(n, e, -1),
            greaterThan: tt(n, e, 1),
            notEqual: tt(n, e, 0)
        }
    }
    ,
    t.stats = function(t) {
        return {
            min: rt(t),
            q1: at(t, 1),
            median: it(t),
            q3: at(t, 3),
            max: nt(t)
        }
    }
    ,
    t.length = function(t) {
        return t.length
    }
    ,
    t.listMin = rt,
    t.listMax = nt,
    t.quantile = et,
    t.quartile = at,
    t.sortPerm = ot,
    t.quartileIndex = ut,
    t.upperQuantileIndex = function(t, r) {
        return ot(t)[Math.ceil(r * (t.length - 1))] + 1
    }
    ,
    t.lowerQuantileIndex = function(t, r) {
        return ot(t)[Math.floor(r * (t.length - 1))] + 1
    }
    ,
    t.upperQuartileIndex = function(t, r) {
        return ot(t)[Math.ceil(ut(t, r))] + 1
    }
    ,
    t.lowerQuartileIndex = function(t, r) {
        return ot(t)[Math.floor(ut(t, r))] + 1
    }
    ,
    t.median = it,
    t.argMin = function(t) {
        if (t.length < 1)
            return 0;
        var r = t[0];
        if (isNaN(r))
            return 0;
        for (var n = 0, e = 1; e < t.length; e++) {
            if (isNaN(t[e]))
                return 0;
            t[e] < r && (n = e,
            r = t[e])
        }
        return n + 1
    }
    ,
    t.argMax = function(t) {
        if (t.length < 1)
            return 0;
        var r = t[0];
        if (isNaN(r))
            return 0;
        for (var n = 0, e = 1; e < t.length; e++)
            if (t[e] >= r) {
                if (isNaN(t[e]))
                    return 0;
                n = e,
                r = t[e]
            }
        return n + 1
    }
    ,
    t.varp = ft,
    t.mad = function(t) {
        for (var r = y(t), n = 0, e = 0; e < t.length; e++)
            n += Math.abs(t[e] - r);
        return n / t.length
    }
    ,
    t.variance = ht,
    t.covp = ct,
    t.cov = function(t, r) {
        var n = Math.min(t.length, r.length);
        return ct(t, r) * n / (n - 1)
    }
    ,
    t.corr = st,
    t.validateRangeLength = function(t, r, n, e) {
        for (var a = t[0], o = 2; o < t.length; o++) {
            var i = c.asFloat(c.div(c.sub(t[o], a), n));
            if (!u.approx(i, o, 10))
                return 0
        }
        var f = c.asFloat(e);
        for (o = 0; o < r.length - 1; o++) {
            i = c.asFloat(c.div(c.sub(r[o], a), n));
            if (!u.approx(i, f - r.length + o, 10))
                return 0
        }
        return !isFinite(f) || f < t.length || f < r.length ? 0 : f
    }
    ,
    t.validateSampleCount = function(t) {
        return t < 0 || !isFinite(t) ? 0 : t
    }
    ,
    t.rank = lt,
    t.spearman = function(t, r) {
        var n = Math.min(t.length, r.length);
        return t.length !== n && (t = t.slice(0, n)),
        r.length !== n && (r = r.slice(0, n)),
        st(lt(t), lt(r))
    }
    ,
    t.stdev = Mt,
    t.stdevp = function(t) {
        return Math.sqrt(ft(t))
    }
    ,
    t.quad = e.quad,
    t.distance = function(t, r) {
        return u.hypot(r[0] - t[0], r[1] - t[1])
    }
    ,
    t.rgb = vt,
    t.hsv = function(t, r, e) {
        t = l(t, 0, 360),
        r = l(r, 0, 1);
        var a = (e = l(e, 0, 1)) * (1 - r / 2);
        r = 0 === a || 1 === a ? 0 : (e - a) / Math.min(a, 1 - a);
        var o = n.hsl(t, r, a).rgb();
        return vt(o.r, o.g, o.b)
    }
    ,
    t.polygon = function(t) {
        return t
    }
    ,
    t.select = function(t, r) {
        for (var n = [], e = 0; e < t.length; e++)
            r[e] && n.push(t[e]);
        return n
    }
    ,
    t.elementsAt = function(t, r) {
        for (var n = [], e = 0, a = r; e < a.length; e++) {
            var o = a[e];
            n.push(t[o])
        }
        return n
    }
    ,
    t.uniquePerm = function(t) {
        for (var r = [], n = {}, e = 0; e < t.length; e++) {
            var a = pt(t[e]);
            n.hasOwnProperty(a) || (n[a] = !0,
            r.push(e))
        }
        return r
    }
});
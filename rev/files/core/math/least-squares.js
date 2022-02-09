
define('core/math/least-squares', ["require", "exports", "numeric", "core/math/distance", "./qr"], function(require, r, e, n, t) {
    "use strict";
    function a(r, e) {
        for (var n = [], t = 0; t < e; t++)
            n.push(r);
        return n
    }
    function i(r, e) {
        for (var n = o(r, e), t = 0, a = 0, i = n; a < i.length; a++) {
            var u = i[a];
            t += u * u
        }
        return t / n.length
    }
    function o(r, e) {
        return r.apply(void 0, e)
    }
    function u(r, e) {
        for (var n = [], t = 0, a = r; t < a.length; t++) {
            var i = a[t].apply(void 0, e);
            n.push(i)
        }
        return n
    }
    function s(r, e) {
        for (var n = [], t = 0; t < r.length; t++)
            e[t] && n.push(r[t]);
        return n
    }
    function l(r, e, n) {
        for (var t = [], a = 0, i = 0; a < r.length; a++) {
            var o = 0;
            n[a] && (o = e[i],
            i += 1),
            t.push(r[a] + o)
        }
        return t
    }
    function v(r, n, v, f) {
        var S, p = f.maxIterations, g = f.linearSubset || a(!1, v.length), h = e.not(g), d = s(n, g), M = s(n, h), c = v, E = 0, m = .001;
        if (e.any(g)) {
            S = {
                Jv: G = e.transpose(u(d, c)),
                F: N = t.qr(G)
            };
            var q = o(r, c);
            c = l(c, e.neg(t.qrSolve(N, q, {
                regularize: !0
            })), g)
        }
        for (var b = !1, x = i(r, c); E < p && !b && isFinite(x); ) {
            q = o(r, c);
            var y = u(M, c)
              , z = e.transpose(y)
              , I = void 0
              , F = void 0;
            if (S) {
                var N = S.F
                  , G = S.Jv;
                I = e.dot(y, e.sub(q, e.dot(G, t.qrSolve(N, q, {
                    regularize: !0
                })))),
                F = e.dot(y, e.sub(z, e.dot(G, t.qrSolve(N, z, {
                    regularize: !0
                }))))
            } else
                I = e.dot(y, q),
                F = e.dot(y, z);
            for (var L = c, J = !1; E < p && !b && !J; ) {
                E += 1;
                var O = e.add(F, e.diag(a(m, M.length)));
                L = l(c, e.neg(e.solve(O, I, !0)), h),
                b = e.all(e.eq(L, c));
                var P = void 0;
                if (S) {
                    P = {
                        Jv: G = e.transpose(u(d, L)),
                        F: N = t.qr(G)
                    };
                    var R = o(r, L);
                    L = l(L, e.neg(t.qrSolve(N, R, {
                        regularize: !0
                    })), g)
                }
                var k = i(r, L);
                (J = k < x) ? (c = L,
                x = k,
                S = P,
                m *= .1) : (m = Math.max(m, 1e-64),
                m *= 2)
            }
        }
        return {
            solution: c,
            MSE: x
        }
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.testOnlyExports = r.optimizeNonLinear = r.optimizeLinear = r.tryRoundingSmallParametersToZero = r.evaluateMeanSquare = void 0,
    r.evaluateMeanSquare = i,
    r.tryRoundingSmallParametersToZero = function(r, e) {
        var n = e.solution.map(function(r) {
            return Math.abs(r) < 1e-6 ? 0 : r
        })
          , t = i(r, n);
        return isFinite(e.MSE) && !isFinite(e.MSE) || t < e.MSE || e.MSE !== e.MSE + Math.pow(.5, 8) * (t - e.MSE) ? e : {
            solution: n,
            MSE: t
        }
    }
    ,
    r.optimizeLinear = function(r, n) {
        for (var s = a(0, n.length), l = u(n, s), v = t.qr(e.transpose(l), {
            mutateInput: !0
        }), f = 0; f < 2; f++) {
            var S = o(r, s)
              , p = e.neg(t.qrSolve(v, S, {
                regularize: !1
            }));
            s = e.add(s, p)
        }
        var g = i(r, s);
        if (t.isNumericallyFullRank(v))
            return {
                solution: s,
                MSE: g
            };
        var h = a(0, n.length);
        for (f = 0; f < 2; f++) {
            S = o(r, h),
            p = e.neg(t.qrSolve(v, S, {
                regularize: !0
            }));
            h = e.add(h, p)
        }
        var d = i(r, h);
        return .999 * d <= g ? {
            solution: h,
            MSE: d
        } : {
            solution: s,
            MSE: g
        }
    }
    ;
    var f = [18.9, .105, .0113, .089, 4.414, .373, .06, .149, 1.84, 9.26, 5, .7, .2, 1.13, 2.61, 1, .007, 30, 120, 1500, 4e-4, 7.23, -1, -.0081, -.03, -28.6, -1.71, -.4, -6.94, -.777, -500]
      , S = function(r) {
        for (var e = [], n = 0; n < f.length; n++) {
            for (var t = [], a = 0; a < r; a++)
                t[a] = 0 === n && 1 !== r ? 0 : 1 === n && 1 !== r ? 1 : f[503 * (n * r + a) % f.length];
            e.push(t)
        }
        return e
    }
      , p = function(r, e, n, t, a) {
        for (var i = [], o = 0, u = n; o < u.length; o++) {
            var s = u[o];
            i.push({
                soln: v(r, e, s, a),
                initialGuess: s
            })
        }
        i.sort(function(r, e) {
            return isNaN(r.soln.MSE) ? 1 : isNaN(e.soln.MSE) ? -1 : r.soln.MSE - e.soln.MSE
        });
        for (var l = [], f = 0; f < t; f++)
            l.push(i[f].initialGuess);
        return l
    };
    function g(r, e, n, t) {
        if (!e)
            return r;
        if ("known" !== e.type)
            return r;
        var a = e.bounds;
        return a[0] === -1 / 0 && a[1] === 1 / 0 ? r : a[0] === -1 / 0 ? a[1] - Math.exp(-r) : a[1] === 1 / 0 ? a[0] + Math.exp(r) : n / (t - 1) * a[1] + (t - 1 - n) / (t - 1) * a[0]
    }
    var h = [3, 5, 7, 11, 13, 17, 19];
    function d(r, e) {
        for (var n = [], t = 0; t < r.length; t++) {
            for (var a = r[t], i = [], o = 0; o < a.length; o++) {
                var u = h[o % h.length] * t % r.length;
                i.push(g(a[o], e[o], u, r.length))
            }
            n.push(i)
        }
        return n
    }
    r.optimizeNonLinear = function(r, e, t) {
        t || (t = {});
        var a = t.linearSubset
          , i = t.bounds
          , o = t.preferredInitialGuess
          , u = S(e.length);
        i && (u = d(u, i));
        var s = p(r, e, u, 5, {
            maxIterations: 3,
            linearSubset: a
        })
          , l = v(r, e, p(r, e, s, 1, {
            maxIterations: 60,
            linearSubset: a
        })[0], {
            maxIterations: 250,
            linearSubset: a
        });
        if (!o)
            return l;
        var f = v(r, e, o, {
            maxIterations: 100,
            linearSubset: a
        });
        return isFinite(f.MSE) && (f.MSE < l.MSE || n.approx(f.MSE, l.MSE, 8)) ? f : l
    }
    ,
    r.testOnlyExports = {
        generateInitialGuesses: S,
        mapInitialGuesses: d
    }
});

define('core/math/features/getMoveStrategy', ['require', 'parsenodes', 'core/math/types', 'core/math/maybe-rational', 'core/math/functions'], function(require) {
    "use strict";
    var e = require("parsenodes")
      , t = require("core/math/types")
      , n = require("core/math/maybe-rational").maybeRational
      , r = require("core/math/functions")
      , i = e.Constant(n(0, 1));
    function a(e) {
        return {
            type: "none",
            inputString: e
        }
    }
    function o(e) {
        return {
            type: "updateCoordinate",
            inputString: e
        }
    }
    function s(e, t, n) {
        return {
            type: "updateSlider",
            inputString: e,
            id: t,
            coefficients: n
        }
    }
    function u(e, t, n, r) {
        return {
            type: "updateSliderNonlinear",
            inputString: e,
            id: t,
            initialValue: n.constant_value,
            min: n.slider_min_number,
            max: n.slider_max_number,
            compiled: r
        }
    }
    function c(e, t, n, r, a, o) {
        for (var s = t.getDependencies(), u = 0; u < s.length; u++)
            if (a[s[u]])
                return !1;
        for (var c = s.length - 1; c >= 0; c--) {
            var f = s[c];
            if (!o[f]) {
                var g = r[f];
                if (void 0 !== g) {
                    var l = n[f];
                    if (1 === l.order) {
                        var p = l.tree.getPolynomialCoefficients(f)
                          , v = p[1] || i
                          , d = p[0] || i;
                        if (d.isConstant && v.isConstant)
                            if (isFinite(d.asValue()) && isFinite(v.asValue()))
                                if (0 !== v.asValue())
                                    return {
                                        symbol: f,
                                        id: g,
                                        coefficients: [-d.asValue() / v.asValue(), 1 / v.asValue()]
                                    }
                    }
                }
            }
        }
        return !1
    }
    function f(e, t) {
        var n = function(e) {
            for (var t = {}, n = 0; n < e.length; n++)
                t[e[n]] = !0;
            return t
        }(e)
          , r = {};
        for (var i in t) {
            var a = t[i].evaluationState.assignment;
            t[i].evaluationState.is_slidable && n[a] && (r[a] = i)
        }
        return r
    }
    function g(e, t, n, r) {
        for (var i = [], a = 0; a < n.length; a++) {
            var o = n[a]
              , s = {};
            i.push(s);
            for (var u = 0; u < r.length; u++) {
                var c = r[u]
                  , f = Object.create(t);
                f[c] = void 0;
                var g = o.tryGetConcreteTree(e, f);
                g.isError ? s[c] = {
                    tree: g,
                    order: 1 / 0
                } : s[c] = {
                    tree: g,
                    order: g.polynomialOrder(c)
                }
            }
        }
        return i
    }
    function l(e, t, n) {
        for (var r = 0; r < e.length; r++) {
            var i = e[r];
            0 !== t[i].order && (n[i] = !0)
        }
    }
    e.Base.prototype.getMoveStrategy = function() {}
    ,
    e.Assignment.prototype.getMoveStrategy = function(t, n, r, i, a) {
        if (this._expression instanceof e.ParenSeq)
            return this._expression.getMoveStrategy(t, n, r, i, a)
    }
    ,
    e.ParenSeq.prototype.getMoveStrategy = function(e, n, i, p, v) {
        if (i.valueType === t.Point && 0 === i.getDependencies().length) {
            for (var d = f(this.getDependencies(), p), y = Object.keys(d), h = this.args, m = g(e, n, h, y), S = [], C = {}, b = {}, _ = 0; _ < 2; _++) {
                var I = h[_]
                  , V = I.getInputString();
                if (I.isConstant)
                    S[_] = o(V);
                else {
                    var P = c(0, I, m[_], d, C, b);
                    P && (S[_] = s(V, P.id, P.coefficients),
                    C[P.symbol] = !0,
                    l(y, m[_], b)),
                    S[_] || (S[_] = a(V))
                }
            }
            if ("none" !== S[0].type || "none" !== S[1].type)
                return S;
            if (1 === y.length) {
                var D, M = y[0], O = d[M];
                try {
                    var j = Object.create(n);
                    j[M] = void 0,
                    D = this.getConcreteTree(e, j).getCompiledFunction()
                } catch (e) {
                    return
                }
                return r.dehydrateCompiledFunction(D),
                [u(h[0].getInputString(), O, p[O].evaluationState, D), a(h[1].getInputString())]
            }
        }
    }
    ,
    e.Image.prototype.getMoveStrategy = function(e, n, r, i, u) {
        if (r.center.valueType === t.Point && 0 === r.center.getDependencies().length && r.width.isConstant && r.height.isConstant && r.radianAngle.isConstant && r.opacity.isConstant) {
            var p = f(this.getDependencies(), i)
              , v = Object.keys(p)
              , d = [this.width, this.height];
            "ParenSeq" === this.center.type ? d.push(this.center.args[0], this.center.args[1]) : "Identifier" === this.center.type && (this.center.referencedStatementId = function(e, t) {
                for (var n in t)
                    if (t[n].evaluationState.assignment === e)
                        return n
            }(this.center._symbol, i));
            for (var y = [], h = {}, m = {}, S = g(e, n, d, v), C = [2, 3, 0, 1], b = 0; b < C.length; b++) {
                var _ = C[b]
                  , I = d[_];
                if (I) {
                    var V = I.getInputString();
                    if (I.isConstant)
                        y[_] = o(V);
                    else {
                        var P = c(0, I, S[_], p, h, m);
                        P && (y[_] = s(V, P.id, P.coefficients),
                        h[P.symbol] = !0,
                        l(v, S[_], m)),
                        y[_] || (y[_] = a(V))
                    }
                } else
                    y[_] = a("")
            }
            if ("none" !== y[0].type || "none" !== y[1].type || "none" !== y[2].type || "none" !== y[3].type)
                return y
        }
    }
});
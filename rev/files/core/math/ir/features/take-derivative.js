
define('core/math/ir/features/take-derivative', ["require", "exports", "core/math/builtinframe", "tslib", "core/math/errormsg", "../scope", "../instructions", "../opcodes", "./get-dependency-mask", "core/math/policy", "core/math/baseparser", "../build-ir", "./copy-instruction", "core/math/types", "./substitute", "./list-length", "../dependencies", "core/math/maybe-rational"], function(require, t, e, r, n, a, s, x, i, o, u, c, p, y, l, d, f, g) {
    "use strict";
    function v(t, e, r) {
        for (var n = t.chunk, a = t.valueMap, i = t.derivativeMap, o = t.backwardMask, u = e; u <= r; u++) {
            var c = n.getInstruction(u);
            if (o[u] && s.beginsBlock(c) && -1 !== c.endIndex)
                switch (c.type) {
                case x.BeginIntegral:
                    u = _(t, u);
                    continue;
                case x.BeginLoop:
                case x.BeginBroadcast:
                    u = h(t, u);
                    continue
                }
            a.push(m(t, u)),
            i.push(I(t, u))
        }
        return r
    }
    function _(t, e) {
        var n = t.chunk
          , a = t.forwardMask
          , x = t.valueMap
          , i = t.derivativeMap
          , o = t.ZERO
          , u = n.getInstruction(e)
          , c = u.endIndex
          , y = n.getInstruction(c)
          , d = o;
        if (a[u.args[1]]) {
            var f = x[u.args[1]];
            d = n.Add([d, n.Multiply([i[u.args[1]], l.substitute(n, f, e, y.args[1])])])
        }
        if (a[u.args[0]]) {
            f = x[u.args[0]];
            d = n.Subtract([d, n.Multiply([i[u.args[0]], l.substitute(n, f, e, y.args[1])])])
        }
        if (function(t, e, r) {
            var n = t.getInstruction(e)
              , a = t.getInstruction(n.endIndex);
            if (a.args[1] < e + 1)
                return r[a.args[1]];
            for (var x = e + 1; x <= a.args[1]; x++) {
                var i = t.getInstruction(x);
                if (!s.isLeafInstruction(i))
                    for (var o = 0, u = i.args; o < u.length; o++) {
                        var c = u[o];
                        if (c < e && r[c])
                            return !0
                    }
            }
            return !1
        }(n, e, a)) {
            var g = x.slice();
            g.push(p.copyInstructionWithArgs(n, u, [g[u.args[0]], g[u.args[1]]])),
            i.push(o),
            v(r.__assign(r.__assign({}, t), {
                valueMap: g,
                mustCopy: !0
            }), e + 1, c - 1);
            var _ = p.copyInstructionWithArgs(n, y, [g[y.args[0]], i[y.args[1]]]);
            i.push(_),
            d = n.Add([d, p.copyInstructionWithArgs(n, n.getInstruction(c + 1), [_])])
        } else
            for (var h = e; h <= c; h++)
                i.push(o);
        if (function(t, e, r) {
            for (var n = t.getInstruction(e), a = e; a <= n.endIndex; a++) {
                var x = t.getInstruction(a);
                if (!s.isLeafInstruction(x))
                    for (var i = 0, o = x.args; i < o.length; i++) {
                        var u = o[i];
                        if (r[u] !== u)
                            return !0
                    }
            }
            return !1
        }(n, e, x)) {
            var I = r.__assign(r.__assign({}, t), {
                mustCopy: !0
            });
            for (h = e; h <= c + 1; h++)
                x.push(m(I, h))
        } else
            for (h = e; h <= c + 1; h++)
                x.push(h);
        return i.push(d),
        c + y.args.length - 1
    }
    function h(t, e) {
        var n = t.chunk
          , a = t.derivativeMap
          , s = t.valueMap
          , i = t.ZERO
          , o = n.getInstruction(e)
          , u = o.endIndex
          , c = n.getInstruction(u);
        if (o.type === x.BeginBroadcast)
            s.push(p.copyInstructionWithArgs(n, o, o.args)),
            a.push(i);
        else {
            var y = [];
            y.push(s[o.args[0]], s[o.args[1]]);
            for (var l = 2; l < o.args.length; l++)
                y.push(s[o.args[l]], a[o.args[l]]);
            s.push(p.copyInstructionWithArgs(n, o, y)),
            a.push(i);
            for (l = 2; l < o.args.length; l++)
                s.push(p.copyInstructionWithArgs(n, n.getInstruction(e + l - 1), [s[e]])),
                a.push(p.copyInstructionWithArgs(n, n.getInstruction(e + l - 1), [s[e]]))
        }
        v(r.__assign(r.__assign({}, t), {
            mustCopy: !0
        }), a.length, u - 1);
        var d = [];
        d.push(s[c.args[0]]);
        for (l = 1; l < c.args.length; l++)
            d.push(s[c.args[l]], a[c.args[l]]);
        s.push(p.copyInstructionWithArgs(n, c, d)),
        a.push(i);
        for (l = 1; l < c.args.length; l++)
            s.push(p.copyInstructionWithArgs(n, n.getInstruction(u + l), [s[u]])),
            a.push(p.copyInstructionWithArgs(n, n.getInstruction(u + l), [s[u]]));
        return u + c.args.length - 1
    }
    function m(t, e) {
        var r = t.chunk
          , n = t.valueMap
          , a = t.mustCopy
          , x = r.getInstruction(e);
        if (s.isLeafInstruction(x))
            return a ? p.copyInstruction(r, x) : e;
        for (var i = [], o = !1, u = 0, c = x.args; u < c.length; u++) {
            var y = c[u];
            i.push(n[y]),
            n[y] !== y && (o = !0)
        }
        return o || a ? p.copyInstructionWithArgs(r, x, i) : e
    }
    function I(t, e) {
        var r = t.chunk
          , n = t.derivativeVarIndex
          , a = t.forwardMask
          , i = t.backwardMask
          , o = t.valueMap
          , u = t.derivativeMap
          , c = t.ZERO
          , l = t.ONE
          , f = t.NAN
          , v = r.getInstruction(e);
        if (!i[e])
            return c;
        if (e === n) {
            if (y.isList(v.valueType)) {
                var _ = d.listLengthIndex(r, e)
                  , h = r.BeginBroadcast([_])
                  , m = r.EndBroadcast([h, l]);
                return r.BroadcastResult(y.ListOfNumber, [m])
            }
            return l
        }
        if (s.beginsBlock(v) || s.endsBlock(v) || v.type === x.BlockVar || v.type === x.BroadcastResult || v.type === x.Equal || v.type === x.Greater || v.type === x.Less || v.type === x.GreaterEqual || v.type === x.LessEqual || v.type === x.And || v.type === x.Distribution || v.type === x.ExtendSeed || v.type === x.Action)
            return c;
        if (!a[e] || s.isLeafInstruction(v))
            return v.valueType !== y.Number ? r.Multiply([c, o[e]]) : v.type !== x.Constant || isFinite(g.asFloat(v.value)) ? c : f;
        if (v.type === x.List || v.type === x.OrderedPair) {
            for (var I = [], b = 0, M = v.args; b < M.length; b++) {
                var A = M[b];
                I.push(u[A])
            }
            return p.copyInstructionWithArgs(r, v, I)
        }
        if (v.type === x.Piecewise)
            return p.copyInstructionWithArgs(r, v, [o[v.args[0]], u[v.args[1]], u[v.args[2]]]);
        for (var q = c, w = [], E = 0, N = v.args; E < N.length; E++) {
            var k = N[E];
            w.push(o[k])
        }
        for (var L = 0; L < v.args.length; L++)
            if (a[v.args[L]]) {
                var O = u[v.args[L]];
                if (O !== c) {
                    var T = z(t, v, L, w, O);
                    T !== c && (q = q === c ? T : r.Add([T, q]))
                }
            }
        return q
    }
    function z(t, r, n, s, i) {
        var u = t.chunk
          , y = t.ZERO
          , l = t.ONE
          , d = t.NAN;
        switch (r.type) {
        case x.Add:
            return i;
        case x.Subtract:
            switch (n) {
            case 0:
                return i;
            default:
                return u.Negative([i])
            }
        case x.Multiply:
            switch (n) {
            case 0:
                return u.Multiply([i, s[1]]);
            default:
                return u.Multiply([s[0], i])
            }
        case x.Divide:
            switch (n) {
            case 0:
                return u.Divide([i, s[1]]);
            default:
                return u.Multiply([s[0], u.Divide([u.Negative([i]), u.Multiply([s[1], s[1]])])])
            }
        case x.Negative:
            return u.Negative([i]);
        case x.Exponent:
        case x.RawExponent:
            switch (n) {
            case 0:
                return u.Multiply([u.Multiply([s[1], u.Exponent([s[0], u.Subtract([s[1], l])])]), i]);
            default:
                return u.Multiply([u.Piecewise([u.Equal([s[0], y]), u.Piecewise([u.GreaterEqual([s[1], y]), y, d]), u.Multiply([u.SyntheticNativeFunction("ln", [s[0]]), u.Exponent([s[0], s[1]])])]), i])
            }
        case x.NativeFunction:
            return function(t, r, n, s) {
                for (var x = Object.create(e), i = a.Scope({}, -1), u = 0; u < n.length; u++) {
                    var p = b[u];
                    a.setSymbol(i, p, n[u]),
                    x[p] = f.FRAME_SENTINEL
                }
                return a.setSymbol(i, "x_1", s),
                x.x_1 = f.FRAME_SENTINEL,
                c.addToIR(c.Ctx(o.defaultPolicy, x, t, i, void 0), r)
            }(u, A[r.symbol][n], s, i);
        case x.ListAccess:
        case x.DeferredListAccess:
        case x.InboundsListAccess:
        case x.OrderedPairAccess:
            switch (n) {
            case 0:
                return p.copyInstructionWithArgs(u, r, [i, s[1]]);
            default:
                return y
            }
        default:
            throw new Error("Unimplemented derivative for opcode " + r.type)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.takeDerivative = void 0,
    t.takeDerivative = function(t, e, r) {
        var a = t.getInstruction(e);
        if (!y.isTypeOrListOfType(a.valueType, y.Number) && !y.isTypeOrListOfType(a.valueType, y.Point))
            throw n.derivativeTypeError([y.prettyPrint(a.valueType)]);
        var o = t.getInstruction(r);
        if (!y.isTypeOrListOfType(o.valueType, y.Number) && o.type !== x.Noop)
            throw n.parseError();
        var u = t.Constant(0);
        if (e < r)
            return u;
        for (var c = t.Constant(1), p = t.Constant(NaN), l = i.getDependencyMask(t, r), d = function(t, e) {
            for (var r = [], n = 0; n < e; n++)
                r.push(!1);
            r.push(!0);
            for (n = e; n >= 0; n--)
                if (r[n]) {
                    var a = t.getInstruction(n);
                    if (!s.isLeafInstruction(a))
                        if (a.type === x.Piecewise)
                            r[a.args[1]] = !0,
                            r[a.args[2]] = !0;
                        else
                            for (var i = 0, o = a.args; i < o.length; i++) {
                                r[o[i]] = !0
                            }
                }
            return r
        }(t, e), f = [], g = [], _ = 0; _ < r; _++)
            g.push(_),
            f.push(u);
        return v({
            chunk: t,
            derivativeVarIndex: r,
            forwardMask: l,
            backwardMask: d,
            valueMap: g,
            derivativeMap: f,
            mustCopy: !1,
            ZERO: u,
            ONE: c,
            NAN: p
        }, r, e),
        f[e]
    }
    ;
    var b = ["x", "y", "z", "u"]
      , M = {
        exp: ["\\exp(x)*x_1"],
        ln: ["\\{x >= 0: x_1/x \\}"],
        log: ["\\{x >= 0: x_1/(x*\\ln(10)) \\}"],
        sqrt: ["x_1/(2*\\sqrt{x})"],
        rtxsqpone: ["x*x_1/\\rtxsqpone(x)"],
        rtxsqmone: ["x*x_1/\\rtxsqmone(x)"],
        sin: ["\\cos(x)*x_1"],
        cos: ["-\\sin(x)*x_1"],
        tan: ["\\sec(x)^2*x_1"],
        arcsin: ["x_1/\\sqrt{1 - x^2}"],
        arccos: ["-x_1/\\sqrt{1 - x^2}"],
        sinh: ["\\cosh(x)*x_1"],
        cosh: ["\\sinh(x)*x_1"],
        tanh: ["(\\sech(x))^2*x_1"],
        arcsinh: ["x_1/\\sqrt{x^2 + 1}"],
        arccosh: ["\\{ x > 0: x_1/\\rtxsqmone(x) \\}"],
        arctanh: ["\\{ \\abs(x) < 1: x_1/(1 - x^2) \\}"],
        csc: ["-\\cot(x)*\\csc(x)*x_1"],
        sec: ["\\tan(x)*\\sec(x)*x_1"],
        cot: ["-\\csc(x)^2*x_1"],
        arccsc: ["-x_1/(\\abs(x)*\\rtxsqmone(x))"],
        arcsec: ["x_1/(\\abs(x)*\\rtxsqmone(x))"],
        arccot: ["-x_1/(1+x^2)"],
        csch: ["-\\coth(x)*\\csch(x)*x_1"],
        sech: ["-\\tanh(x)*\\sech(x)*x_1"],
        coth: ["-(\\csch(x))^2*x_1"],
        arccsch: ["-x_1/(\\abs(x)*\\rtxsqpone(x))"],
        arcsech: ["\\{ x >= 0: -x_1/(x*\\sqrt{1 - x^2}) \\}"],
        arccoth: ["\\{ \\abs(x) > 1 : x_1/(1 - x^2) \\}"],
        factorial: ["(x)!*\\polyGamma(0, x + 1)*x_1"],
        floor: ["\\{ \\mod(x, 1) > 0: 0*x_1 \\}"],
        ceil: ["\\{ \\mod(x, 1) > 0: 0*x_1 \\}"],
        round: ["\\{ \\abs(\\mod(x, 1) - 0.5) > 0: 0*x_1 \\}"],
        abs: ["\\{ \\abs(x) > 0: \\sign(x)*x_1 \\}"],
        sign: ["\\{ \\abs(x) > 0: 0*x_1 \\}"],
        distance: ["-((y.x-x.x)*x_1.x+(y.y-x.y)*x_1.y)/\\distance(x,y)", "((y.x-x.x)*x_1.x+(y.y-x.y)*x_1.y)/\\distance(x,y)"],
        mean: ["\\mean(x_1)"],
        total: ["\\total(x_1)"],
        length: ["0"],
        var: ["2*\\cov(x, x_1)"],
        varp: ["2*\\cov(x, x_1)*(\\length(x)-1)/\\length(x)"],
        stdev: ["\\cov(x, x_1)/\\stdev(x)"],
        stdevp: ["\\covp(x, x_1)/\\stdevp(x)"],
        mad: ["\\mean(\\sign(x-\\mean(x))*(x_1 - \\mean(x_1)))"],
        min: ["x_1[\\argmin(x)]"],
        max: ["x_1[\\argmax(x)]"],
        median: ["0.5*(x_1[\\lowerQuantileIndex(x, 0.5)] + x_1[\\upperQuantileIndex(x, 0.5)])"],
        argmin: ["0/0"],
        argmax: ["0/0"],
        gcd: ["0/0"],
        lcm: ["0/0"],
        erf: ["\\frac{2x_1}{\\sqrt{\\pi }}e^{-x^2}"],
        invNorm: ["\\frac{x_1}{\\pdf(\\normaldist(0,1),\\invNorm(x))}"],
        logbase: ["\\{x > 0: \\frac{x_1}{x*\\ln(y)} \\}", "\\frac{-\\log_{y}(x)*x_1}{y*\\ln(y)}"],
        nthroot: ["x^{1/y - 1}/y*x_1", "-\\frac{x^{1/y}*\\ln(x)*x_1}{y^2}"],
        hypot: ["x_1*x/\\hypot(x,y)", "x_1*y/\\hypot(x,y)"],
        polyGamma: ["0/0", "\\polyGamma(1 + x, y)*x_1"],
        mod: ["\\{ \\abs(\\mod(x, y)) > 0: x_1 \\}", "\\{ \\mod(x/y, 1) > 0: -\\floor(x/y)*x_1 \\}"],
        cov: ["\\cov(x_1, y)", "\\cov(x, x_1)"],
        covp: ["\\covp(x_1, y)", "\\covp(x, x_1)"],
        corr: ["(\\cov(x_1, y) - (\\cov(x, y)*\\cov(x, x_1)/\\var(x)))/(\\stdevp(x)\\stdevp(y))", "(\\cov(x, x_1) - (\\cov(x, y)*\\cov(y, x_1)/\\var(y)))/(\\stdevp(x)\\stdevp(y))"],
        spearman: ["0/0", "0/0"],
        quantile: ["\\{ \\floor(y*(\\length(x)-1)) = y*(\\length(x)-1) :   x_1[\\upperQuantileIndex(x, y)],  (\\ceil(y*(\\length(x)-1)) - y*(\\length(x)-1))*x_1[\\lowerQuantileIndex(x, y)] +   (y*(\\length(x)-1) - \\floor(y*(\\length(x)-1)))*x_1[\\upperQuantileIndex(x, y)]\\}", "\\{ \\floor(y*(\\length(x)-1)) < y*(\\length(x)-1) :   (x[\\upperQuantileIndex(x, y)] - x[\\lowerQuantileIndex(x, y)])*x_1\\}"],
        quartile: ["0.5*(x_1[\\lowerQuartileIndex(x, y)] + x_1[\\upperQuartileIndex(x, y)])", "0/0"],
        tscore: ["\\frac{\\sqrt{\\length(x)}(\\stdev(x)*\\mean(x_1)-(\\mean(x)-y)*\\frac{\\cov(x,x_1)}{\\stdev(x)})}{\\stdev(x)^2}", "-x_1*\\sqrt{\\length(x)}/\\stdev(x)"],
        quartileIndex: ["0/0", "0/0"],
        upperQuartileIndex: ["0/0", "0/0"],
        lowerQuartileIndex: ["0/0", "0/0"],
        upperQuantileIndex: ["0/0", "0/0"],
        lowerQuantileIndex: ["0/0", "0/0"],
        nCr: ["0/0", "0/0"],
        nPr: ["0/0", "0/0"],
        arctan: ["x_1*y/(y^2+x^2)", "-x_1*x/(y^2+x^2)"],
        poissonpdf: ["0/0", "x_1\\frac{e^{-y}(\\floor(x)-y)y^{(\\floor(x)-1)}}{(\\floor(x))!}"],
        invPoisson: ["0/0", "0/0"],
        tpdf: ["x_1*\\pdf(\\tdist(y),x)*\\frac{-(y+1)*x}{y+x^2}", "x_1*\\frac{1}{2}\\pdf(\\tdist(y),x)(  \\frac{x^2-1}{y + x^2} + \\ln(\\frac{y}{y + x^2}) +   \\polyGamma(0, \\frac{1+y}{2}) - \\polyGamma(0, y/2))"],
        invT: ["x_1/\\pdf(\\tdist(y),\\invT(x, y))", "0/0"],
        tcdf: ["-x_1*\\pdf(\\tdist(z),x)", "x_1*\\pdf(\\tdist(z),y)", "0/0"],
        poissoncdf: ["0/0", "0/0", "x_1\\sum _{n=\\max(0,\\floor(\\min(x,y)))}^{\\floor(\\max(x,y))}\\frac{e^{-z}(n-z)z^{(n-1)}}{n!}"],
        normalpdf: ["-x_1*\\frac{x-y}{z^2} \\pdf(\\normaldist(y,z),x)", "x_1*\\frac{x-y}{z^2} \\pdf(\\normaldist(y,z),x)", "x_1*(\\frac{(x-y-z)*(x-y+z)}{z^3}) \\pdf(\\normaldist(y,z),x)"],
        binompdf: ["0/0", "0/0", "\\{0<=z<=1: x_1*\\pdf(\\binomialdist(y,z),x)*(\\frac{\\round(x)}{z}-\\frac{\\round(y)-\\round(x)}{1-z}), 0 \\}"],
        invBinom: ["0/0", "0/0", "0/0"],
        uniformpdf: ["0", "\\{y<=x: \\frac{x_1}{(z-y)^2}, 0\\}", "\\{z>=x: -\\frac{x_1}{(z-y)^2}, 0\\}"],
        invUniform: ["\\{y<=x<=z: x_1*(z-y), 0\\}", "\\{y<=x<=z: x_1*(1-x), 0\\}", "\\{y<=x<=z: x_1*x, 0\\}"],
        normalcdf: ["-x_1\\pdf(\\normaldist(z,u), x)", "x_1\\pdf(\\normaldist(z,u), y)", "-x_1*(\\pdf(\\normaldist(z,u), y) - \\pdf(\\normaldist(z,u), x))", "x_1*(  \\{\\abs(y)=1/0:0,\\frac{z-y}{u}\\pdf(\\normaldist(z,u),y)\\} -   \\{\\abs(x)=1/0:0,\\frac{z-x}{u}\\pdf(\\normaldist(z,u),x)\\})"],
        binomcdf: ["0/0", "0/0", "0/0", "\\{0<=u<=1: x_1*\\sum _{n=\\max(0,\\round(\\min(x,y)))}^{\\round(\\max(x,y))}(  \\pdf(\\binomialdist(z,u),n)*(\\frac{n}{u}-\\frac{\\round(z)-n}{1-u})), 0 \\}"],
        uniformcdf: ["\\{z>u: 0/0, -x_1\\pdf(\\uniformdist(z,u), x)\\}", "\\{z>u: 0/0, x_1\\pdf(\\uniformdist(z,u), y)\\}", "\\{z>u: 0/0, x_1*(\\frac{\\{z<x<u:u-x,0\\} + \\{z<y<u:y-u,0\\}}{(u-z)^2})\\}", "\\{z>u: 0/0, x_1*(\\frac{\\{z<x<u:x-z,0\\} + \\{z<y<u:z-y,0\\}}{(u-z)^2})\\}"],
        normalSample: ["0/0", "0/0", "0/0"],
        uniformSample: ["0/0", "0/0", "0/0"],
        tSample: ["0/0", "0/0"],
        poissonSample: ["0/0", "0/0"],
        binomSample: ["0/0", "0/0", "0/0"],
        rgb: ["0/0", "0/0", "0/0"],
        hsv: ["0/0", "0/0", "0/0"],
        polygon: ["\\polygon(x_1)"],
        validateRangeLength: ["0", "0", "0", "\\{\\validateRangeLength(x,y,z,u) \\ge 1: x_1, 0\\}"],
        validateSampleCount: ["\\{x<0:0,1\\}*x_1"],
        select: ["\\select(x_1, y)", "0*\\select(x,y)"],
        shuffle: ["0*y", "\\shuffle(x, x_1)"],
        sortPerm: ["0*x"],
        elementsAt: ["\\elementsAt(x_1, y)", "0*\\elementsAt(x,y)"],
        uniquePerm: ["0*\\uniquePerm(x)"]
    }
      , A = {};
    for (var q in M) {
        for (var w = q, E = M[w], N = [], k = 0; k < E.length; k++) {
            var L = E[k];
            N.push(u.parse(L, {}))
        }
        A[w] = N
    }
});
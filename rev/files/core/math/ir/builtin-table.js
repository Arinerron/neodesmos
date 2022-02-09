define('core/math/ir/builtin-table', ["require", "exports", "core/math/types", "./opcodes", "core/math/maybe-rational"], function(require, e, t, r, n) {
    "use strict";
    function u(e, r, n) {
        var u, a, l, i, m, o, s = null !== (u = null == n ? void 0 : n.tag) && void 0 !== u ? u : "default", d = null !== (a = null == n ? void 0 : n.argumentTypes) && void 0 !== a ? a : function(e) {
            switch (e) {
            case "default":
            case "trig":
            case "inverseTrig":
            case "never-broadcast":
                return [t.Number];
            case "reducer":
                return [t.ListOfNumber];
            case "doubleReducer":
                return [t.ListOfNumber, t.ListOfNumber];
            case "parameterizedReducer":
                return [t.ListOfNumber, t.Number];
            case "color":
                return [t.Number, t.Number, t.Number]
            }
        }(s), g = (null == n ? void 0 : n.defaultArguments) ? n.defaultArguments.length : 0, c = null !== (l = null == n ? void 0 : n.minArity) && void 0 !== l ? l : d.length - g, p = null !== (i = null == n ? void 0 : n.maxArity) && void 0 !== i ? i : function(e, t, r) {
            return "reducer" === e ? 1 / 0 : t + r
        }(s, c, g), b = null !== (m = null == n ? void 0 : n.allowDotCall) && void 0 !== m ? m : function(e) {
            switch (e) {
            case "default":
            case "trig":
            case "inverseTrig":
            case "doubleReducer":
            case "color":
            case "never-broadcast":
                return !1;
            case "reducer":
            case "parameterizedReducer":
                return !0
            }
        }(s);
        return {
            module: e,
            symbol: r,
            argumentTypes: d,
            defaultArguments: null == n ? void 0 : n.defaultArguments,
            returnType: null !== (o = null == n ? void 0 : n.returnType) && void 0 !== o ? o : t.Number,
            tag: s,
            minArity: c,
            maxArity: p,
            allowDotCall: b
        }
    }
    function a(e) {
        if (!n.isRational(e))
            throw new Error("Programming Error: numeric constants should be rational");
        return {
            type: r.Constant,
            valueType: t.Number,
            value: e
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.CompilerFunctionTable = e.BuiltInTable = void 0;
    var l = a(n.maybeRational(0, 1))
      , i = a(n.maybeRational(1, 1))
      , m = a(n.maybeRational(1, 2));
    function o(e, t) {
        var r, n, u, a, l = null == t ? void 0 : t.defaultArguments, i = null !== (r = null == t ? void 0 : t.maxArity) && void 0 !== r ? r : function(e, t) {
            return t ? t.length + e : e
        }(e, l), m = null !== (n = null == t ? void 0 : t.fallthroughUnlessDistribution) && void 0 !== n && n, o = null !== (u = null == t ? void 0 : t.allowDotCall) && void 0 !== u && u, s = null !== (a = null == t ? void 0 : t.isSeeded) && void 0 !== a && a;
        return {
            minArity: e,
            maxArity: i,
            defaultArguments: l,
            fallthroughUnlessDistribution: m,
            minArityExampleArgs: null == t ? void 0 : t.minArityExampleArgs,
            maxArityExampleArgs: null == t ? void 0 : t.maxArityExampleArgs,
            dotMinArityExampleArgs: null == t ? void 0 : t.dotMinArityExampleArgs,
            dotMaxArityExampleArgs: null == t ? void 0 : t.dotMaxArityExampleArgs,
            allowDotCall: o,
            isSeeded: s
        }
    }
    function s() {
        return o(0, {
            maxArity: 1 / 0
        })
    }
    e.BuiltInTable = {
        sin: u("BuiltIn", "sin", {
            tag: "trig"
        }),
        cos: u("BuiltIn", "cos", {
            tag: "trig"
        }),
        tan: u("BuiltIn", "tan", {
            tag: "trig"
        }),
        cot: u("BuiltIn", "cot", {
            tag: "trig"
        }),
        sec: u("BuiltIn", "sec", {
            tag: "trig"
        }),
        csc: u("BuiltIn", "csc", {
            tag: "trig"
        }),
        arcsin: u("Math", "asin", {
            tag: "inverseTrig"
        }),
        arccos: u("Math", "acos", {
            tag: "inverseTrig"
        }),
        arctan: u("Math", "atan2", {
            argumentTypes: [t.Number, t.Number],
            defaultArguments: [i],
            tag: "inverseTrig"
        }),
        arccot: u("BuiltIn", "acot", {
            tag: "inverseTrig"
        }),
        arcsec: u("BuiltIn", "asec", {
            tag: "inverseTrig"
        }),
        arccsc: u("BuiltIn", "acsc", {
            tag: "inverseTrig"
        }),
        sinh: u("BuiltIn", "sinh"),
        cosh: u("BuiltIn", "cosh"),
        tanh: u("BuiltIn", "tanh"),
        coth: u("BuiltIn", "coth"),
        sech: u("BuiltIn", "sech"),
        csch: u("BuiltIn", "csch"),
        arcsinh: u("BuiltIn", "asinh"),
        arccosh: u("BuiltIn", "acosh"),
        arctanh: u("BuiltIn", "atanh"),
        arccoth: u("BuiltIn", "acoth"),
        arcsech: u("BuiltIn", "asech"),
        arccsch: u("BuiltIn", "acsch"),
        sqrt: u("Math", "sqrt"),
        rtxsqpone: u("BuiltIn", "sqrtxsqp1"),
        rtxsqmone: u("BuiltIn", "sqrtxsqm1"),
        nthroot: u("BuiltIn", "nthroot", {
            argumentTypes: [t.Number, t.Number]
        }),
        hypot: u("BuiltIn", "hypot", {
            argumentTypes: [t.Number, t.Number]
        }),
        log: u("BuiltIn", "common_log"),
        logbase: u("BuiltIn", "log_base", {
            argumentTypes: [t.Number, t.Number]
        }),
        ln: u("BuiltIn", "log"),
        exp: u("Math", "exp"),
        floor: u("Math", "floor"),
        ceil: u("Math", "ceil"),
        round: u("Math", "round"),
        abs: u("Math", "abs"),
        sign: u("BuiltIn", "sign"),
        mod: u("BuiltIn", "mod", {
            argumentTypes: [t.Number, t.Number]
        }),
        nCr: u("BuiltIn", "nCr", {
            argumentTypes: [t.Number, t.Number]
        }),
        nPr: u("BuiltIn", "nPr", {
            argumentTypes: [t.Number, t.Number]
        }),
        factorial: u("BuiltIn", "factorial"),
        polyGamma: u("BuiltIn", "polyGamma", {
            argumentTypes: [t.Number, t.Number]
        }),
        lcm: u("BuiltIn", "listLCM", {
            tag: "reducer"
        }),
        gcd: u("BuiltIn", "listGCD", {
            tag: "reducer"
        }),
        distance: u("BuiltIn", "distance", {
            argumentTypes: [t.Point, t.Point]
        }),
        polygon: u("BuiltIn", "polygon", {
            tag: "never-broadcast",
            argumentTypes: [t.ListOfPoint],
            returnType: t.Polygon
        }),
        mean: u("BuiltIn", "mean", {
            tag: "reducer"
        }),
        total: u("BuiltIn", "total", {
            tag: "reducer"
        }),
        stdev: u("BuiltIn", "stdev", {
            tag: "reducer"
        }),
        stdevp: u("BuiltIn", "stdevp", {
            tag: "reducer"
        }),
        mad: u("BuiltIn", "mad", {
            tag: "reducer"
        }),
        length: u("BuiltIn", "length", {
            tag: "reducer",
            argumentTypes: [t.ListOfAny]
        }),
        min: u("BuiltIn", "listMin", {
            tag: "reducer"
        }),
        max: u("BuiltIn", "listMax", {
            tag: "reducer"
        }),
        argmin: u("BuiltIn", "argMin", {
            tag: "reducer"
        }),
        argmax: u("BuiltIn", "argMax", {
            tag: "reducer"
        }),
        median: u("BuiltIn", "median", {
            tag: "reducer"
        }),
        var: u("BuiltIn", "variance", {
            tag: "reducer"
        }),
        varp: u("BuiltIn", "varp", {
            tag: "reducer"
        }),
        cov: u("BuiltIn", "cov", {
            tag: "doubleReducer"
        }),
        covp: u("BuiltIn", "covp", {
            tag: "doubleReducer"
        }),
        corr: u("BuiltIn", "corr", {
            tag: "doubleReducer"
        }),
        spearman: u("BuiltIn", "spearman", {
            tag: "doubleReducer"
        }),
        quantile: u("BuiltIn", "quantile", {
            tag: "parameterizedReducer"
        }),
        quartile: u("BuiltIn", "quartile", {
            tag: "parameterizedReducer"
        }),
        upperQuantileIndex: u("BuiltIn", "upperQuantileIndex", {
            tag: "parameterizedReducer"
        }),
        lowerQuantileIndex: u("BuiltIn", "lowerQuantileIndex", {
            tag: "parameterizedReducer"
        }),
        quartileIndex: u("BuiltIn", "quartileIndex", {
            tag: "parameterizedReducer"
        }),
        upperQuartileIndex: u("BuiltIn", "upperQuartileIndex", {
            tag: "parameterizedReducer"
        }),
        lowerQuartileIndex: u("BuiltIn", "lowerQuartileIndex", {
            tag: "parameterizedReducer"
        }),
        normalcdf: u("BuiltIn", "normalcdf", {
            argumentTypes: [t.Number, t.Number, t.Number, t.Number],
            defaultArguments: [l, i]
        }),
        normalpdf: u("BuiltIn", "normalpdf", {
            argumentTypes: [t.Number, t.Number, t.Number],
            defaultArguments: [l, i]
        }),
        binomcdf: u("BuiltIn", "binomcdf", {
            argumentTypes: [t.Number, t.Number, t.Number, t.Number],
            defaultArguments: [m]
        }),
        binompdf: u("BuiltIn", "binompdf", {
            argumentTypes: [t.Number, t.Number, t.Number],
            defaultArguments: [m]
        }),
        poissoncdf: u("BuiltIn", "poissoncdf", {
            argumentTypes: [t.Number, t.Number, t.Number]
        }),
        poissonpdf: u("BuiltIn", "poissonpdf", {
            argumentTypes: [t.Number, t.Number, t.Number]
        }),
        uniformcdf: u("BuiltIn", "uniformcdf", {
            argumentTypes: [t.Number, t.Number, t.Number, t.Number],
            defaultArguments: [l, i]
        }),
        uniformpdf: u("BuiltIn", "uniformpdf", {
            argumentTypes: [t.Number, t.Number, t.Number],
            defaultArguments: [l, i]
        }),
        invT: u("BuiltIn", "invT", {
            argumentTypes: [t.Number, t.Number]
        }),
        invPoisson: u("BuiltIn", "invPoisson", {
            argumentTypes: [t.Number, t.Number]
        }),
        invBinom: u("BuiltIn", "invBinom", {
            argumentTypes: [t.Number, t.Number, t.Number]
        }),
        invUniform: u("BuiltIn", "invUniform", {
            argumentTypes: [t.Number, t.Number, t.Number]
        }),
        tpdf: u("BuiltIn", "tpdf", {
            argumentTypes: [t.Number, t.Number]
        }),
        tcdf: u("BuiltIn", "tcdf", {
            argumentTypes: [t.Number, t.Number, t.Number]
        }),
        erf: u("BuiltIn", "erf"),
        invNorm: u("BuiltIn", "invNorm"),
        tscore: u("BuiltIn", "tscore", {
            tag: "parameterizedReducer",
            defaultArguments: [l]
        }),
        normalSample: u("BuiltIn", "normalSample", {
            argumentTypes: [t.SeedType, t.Number, t.Number]
        }),
        uniformSample: u("BuiltIn", "uniformSample", {
            argumentTypes: [t.SeedType, t.Number, t.Number]
        }),
        tSample: u("BuiltIn", "tSample", {
            argumentTypes: [t.SeedType, t.Number]
        }),
        poissonSample: u("BuiltIn", "poissonSample", {
            argumentTypes: [t.SeedType, t.Number]
        }),
        binomSample: u("BuiltIn", "binomSample", {
            argumentTypes: [t.SeedType, t.Number, t.Number]
        }),
        rgb: u("BuiltIn", "rgb", {
            returnType: t.RGBColor,
            tag: "color"
        }),
        hsv: u("BuiltIn", "hsv", {
            returnType: t.RGBColor,
            tag: "color"
        }),
        validateRangeLength: u("BuiltIn", "validateRangeLength", {
            returnType: t.Number,
            argumentTypes: [t.ListOfNumber, t.ListOfNumber, t.Number, t.Number],
            tag: "never-broadcast"
        }),
        validateSampleCount: u("BuiltIn", "validateSampleCount", {
            returnType: t.Number,
            argumentTypes: [t.Number]
        }),
        select: u("BuiltIn", "select", {
            argumentTypes: [t.ListOfAny, t.ListOfBool],
            returnType: function(e) {
                return e[0]
            },
            tag: "never-broadcast"
        }),
        shuffle: u("BuiltIn", "shuffle", {
            argumentTypes: [t.SeedType, t.ListOfAny],
            returnType: function(e) {
                return e[1]
            },
            tag: "never-broadcast"
        }),
        sortPerm: u("BuiltIn", "sortPerm", {
            argumentTypes: [t.ListOfNumber],
            returnType: t.ListOfNumber,
            tag: "never-broadcast"
        }),
        elementsAt: u("BuiltIn", "elementsAt", {
            argumentTypes: [t.ListOfAny, t.ListOfNumber],
            returnType: function(e) {
                return e[0]
            },
            tag: "never-broadcast"
        }),
        uniquePerm: u("BuiltIn", "uniquePerm", {
            argumentTypes: [t.ListOfAny],
            returnType: t.ListOfNumber,
            tag: "never-broadcast"
        })
    },
    e.CompilerFunctionTable = {
        round: o(1, {
            maxArity: 2
        }),
        midpoint: o(2),
        sort: o(1, {
            maxArity: 2,
            minArityExampleArgs: "([3,2,1])",
            maxArityExampleArgs: "([1,2,3],[3,2,1])",
            dotMaxArityExampleArgs: "([3,4])",
            allowDotCall: !0
        }),
        shuffle: o(2, {
            maxArity: 3,
            minArityExampleArgs: "([1,2,3])",
            maxArityExampleArgs: "([1,2,3],2)",
            dotMaxArityExampleArgs: "(2)",
            allowDotCall: !0,
            isSeeded: !0
        }),
        join: o(2, {
            maxArity: 1 / 0,
            minArityExampleArgs: "([1,2],[3,4])",
            dotMinArityExampleArgs: "([3,4])",
            allowDotCall: !0
        }),
        unique: o(1, {
            minArityExampleArgs: "([1,2,3])",
            maxArityExampleArgs: "([1,2,3])",
            allowDotCall: !0
        }),
        normaldist: o(0, {
            defaultArguments: [l, i]
        }),
        tdist: o(1),
        binomialdist: o(1, {
            defaultArguments: [m]
        }),
        poissondist: o(1),
        uniformdist: o(0, {
            defaultArguments: [l, i]
        }),
        pdf: o(2, {
            allowDotCall: !0
        }),
        cdf: o(2, {
            maxArity: 3,
            allowDotCall: !0
        }),
        mean: o(1, {
            fallthroughUnlessDistribution: !0,
            allowDotCall: !0
        }),
        median: o(1, {
            fallthroughUnlessDistribution: !0,
            allowDotCall: !0
        }),
        stdev: o(1, {
            fallthroughUnlessDistribution: !0,
            allowDotCall: !0
        }),
        var: o(1, {
            fallthroughUnlessDistribution: !0,
            allowDotCall: !0
        }),
        quantile: o(2, {
            fallthroughUnlessDistribution: !0,
            allowDotCall: !0,
            minArityExampleArgs: "([1,2,3], 1)",
            maxArityExampleArgs: "([1,2,3], 1)",
            dotMinArityExampleArgs: "(x)",
            dotMaxArityExampleArgs: "(x)"
        }),
        random: o(1, {
            maxArity: 4,
            allowDotCall: !0,
            isSeeded: !0
        }),
        polygon: o(0, {
            maxArity: 1 / 0
        }),
        histogram: s(),
        dotplot: s(),
        boxplot: s(),
        ttest: s(),
        ittest: s(),
        stats: s(),
        det: s(),
        inv: s(),
        transpose: s(),
        rref: s(),
        trace: s()
    }
});
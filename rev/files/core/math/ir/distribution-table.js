
define('core/math/ir/distribution-table', ["require", "exports", "./features/list-length"], function(require, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.randomSampleFromList = t.DistributionTable = void 0,
    t.DistributionTable = {
        normaldist: {
            pdf: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("normalpdf", i.concat(r.args))
            },
            cdf: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("normalcdf", i.concat(r.args))
            },
            mean: function(t, n, i) {
                return t.getInstruction(n).args[0]
            },
            median: function(n, i, r) {
                return t.DistributionTable.normaldist.mean(n, i, r)
            },
            stdev: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("abs", [r.args[1]])
            },
            var: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.Multiply([r.args[1], r.args[1]])
            },
            quantile: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.Add([t.Multiply([t.SyntheticNativeFunction("invNorm", i), t.SyntheticNativeFunction("abs", [r.args[1]])]), r.args[0]])
            },
            random: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("normalSample", [i[0], r.args[0], r.args[1]])
            }
        },
        tdist: {
            pdf: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("tpdf", i.concat(r.args))
            },
            cdf: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("tcdf", i.concat(r.args))
            },
            mean: function(t, n, i) {
                return t.Constant(0)
            },
            median: function(t, n, i) {
                return t.Constant(0)
            },
            stdev: function(n, i, r) {
                return n.SyntheticNativeFunction("sqrt", [t.DistributionTable.tdist.var(n, i, r)])
            },
            var: function(t, n, i) {
                var r = t.getInstruction(n)
                  , e = t.Constant(2)
                  , a = r.args[0];
                return t.Piecewise([t.GreaterEqual([a, e]), t.Divide([a, t.Subtract([a, e])]), t.Constant(NaN)])
            },
            quantile: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("invT", [i[0], r.args[0]])
            },
            random: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("tSample", [i[0], r.args[0]])
            }
        },
        poissondist: {
            pdf: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("poissonpdf", i.concat(r.args))
            },
            cdf: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("poissoncdf", i.concat(r.args))
            },
            mean: function(t, n, i) {
                return t.getInstruction(n).args[0]
            },
            median: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("invPoisson", [t.Constant(.5), r.args[0]])
            },
            stdev: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("sqrt", [r.args[0]])
            },
            var: function(n, i, r) {
                return t.DistributionTable.poissondist.mean(n, i, r)
            },
            quantile: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("invPoisson", [i[0], r.args[0]])
            },
            random: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("poissonSample", [i[0], r.args[0]])
            }
        },
        binomialdist: {
            pdf: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("binompdf", i.concat(r.args))
            },
            cdf: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("binomcdf", i.concat(r.args))
            },
            mean: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.Multiply([r.args[0], r.args[1]])
            },
            median: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("invBinom", [t.Constant(.5), r.args[0], r.args[1]])
            },
            stdev: function(n, i, r) {
                return n.SyntheticNativeFunction("sqrt", [t.DistributionTable.binomialdist.var(n, i, r)])
            },
            var: function(t, n, i) {
                var r = t.getInstruction(n).args
                  , e = r[0]
                  , a = r[1];
                return t.Multiply([e, t.Multiply([a, t.Subtract([t.Constant(1), a])])])
            },
            quantile: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("invBinom", [i[0], r.args[0], r.args[1]])
            },
            random: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("binomSample", [i[0], r.args[0], r.args[1]])
            }
        },
        uniformdist: {
            pdf: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("uniformpdf", i.concat(r.args))
            },
            cdf: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("uniformcdf", i.concat(r.args))
            },
            mean: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.Divide([t.Add([r.args[0], r.args[1]]), t.Constant(2)])
            },
            median: function(n, i, r) {
                return t.DistributionTable.uniformdist.mean(n, i, r)
            },
            stdev: function(n, i, r) {
                return n.SyntheticNativeFunction("sqrt", [t.DistributionTable.uniformdist.var(n, i, r)])
            },
            var: function(t, n, i) {
                var r = t.getInstruction(n)
                  , e = t.Subtract([r.args[1], r.args[0]]);
                return t.Divide([t.Multiply([e, e]), t.Constant(12)])
            },
            quantile: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("invUniform", [i[0], r.args[0], r.args[1]])
            },
            random: function(t, n, i) {
                var r = t.getInstruction(n);
                return t.SyntheticNativeFunction("uniformSample", [i[0], r.args[0], r.args[1]])
            }
        }
    },
    t.randomSampleFromList = function(t, i, r) {
        var e = r[0]
          , a = t.Constant(0)
          , o = t.Constant(1);
        if (0 === n.getConstantListLength(t, i))
            return t.Constant(NaN);
        var u = n.listLengthIndex(t, i);
        return t.InboundsListAccess([i, t.Add([t.SyntheticNativeFunction("floor", [t.Multiply([t.SyntheticNativeFunction("uniformSample", [e, a, o]), u])]), o])])
    }
});
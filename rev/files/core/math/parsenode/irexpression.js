define('core/math/parsenode/irexpression', ['require', 'pjs', './base', 'core/math/types', 'core/math/ir/features/as-value', 'core/math/ir/features/nan-of-type', 'core/math/errormsg'], function(require) {
    "use strict";
    var e = require("pjs")
      , t = require("./base")
      , n = require("core/math/types")
      , i = require("core/math/ir/features/as-value").compilerValueToRuntimeValue
      , s = require("core/math/ir/features/nan-of-type").nanOfType
      , u = require("core/math/errormsg");
    return e(t, function(e, t, r) {
        e.init = function(e) {
            if (t.init.call(this),
            this._chunk = e,
            this.valueType = e.getReturnType(),
            this.addDependencies(e.getLiveArgNames()),
            this.isList = n.isList(this.valueType),
            this.isList && (this.length = this._chunk.getConstantListLength(),
            void 0 === this.length))
                throw u.variableLengthTopLevelList(e.getListLengthDependencies());
            var i = e.isConstant();
            this.isConstant = i && (this.valueType === n.Number || this.valueType === n.Bool),
            this.isEmptyAction = i && this.valueType === n.Action && 0 === Object.keys(e.asValue().updateRules).length
        }
        ,
        e.shouldExportAns = function() {
            return !0
        }
        ,
        e.getCompiledFunction = function(e) {
            return this._chunk.getCompiledFunction(e)
        }
        ,
        e.polynomialOrder = function(e) {
            return this._chunk.polynomialOrder(e, {
                allowRestriction: !0,
                allowClosedBlockReferences: !1
            })
        }
        ,
        e.getPolynomialCoefficients = function(e) {
            for (var t = this._chunk.getPolynomialCoefficients(e), n = t.chunk, i = t.coefficients, s = [], u = 0; u < i.length; u++) {
                var o = n.copy();
                o.returnIndex = i[u],
                o.close(),
                s.push(new r(o))
            }
            return s
        }
        ,
        e.takeDerivative = function(e) {
            var t = this._chunk.copy().takeDerivative(e).close();
            return new r(t)
        }
        ,
        e.boundDomain = function(e) {
            return this._chunk.boundDomain(e)
        }
        ,
        e.asValue = function() {
            if (this._chunk.isConstant())
                return this._chunk.asValue();
            if (this.isList) {
                for (var e = [], t = i(s(n.elementType(this.valueType))), u = 0; u < this.length; u++)
                    e.push(t);
                return e
            }
            return i(s(this.valueType))
        }
        ,
        e.asCompilerValue = function() {
            return this._chunk.asCompilerValue()
        }
        ,
        e.isNaN = function() {
            return "number" == typeof this.asValue() && isNaN(this.asValue())
        }
        ,
        e.getEvaluationInfo = function() {
            return !(!this._chunk.isConstant() || 0 !== this.getDependencies().length || !n.isTypeOrListOfType(this.valueType, n.Number) && !n.isTypeOrListOfType(this.valueType, n.Bool)) && [{
                val: this.asValue()
            }]
        }
        ,
        e.elementAt = function(e) {
            var t = this._chunk.elementAt(e);
            return new r(t)
        }
        ,
        e.findLinearSubset = function(e) {
            return this._chunk.findLinearSubset(e)
        }
        ,
        e.deriveRegressionRestrictions = function() {
            var e = this._chunk.deriveRegressionRestrictions();
            return e === this._chunk ? this : new r(e)
        }
        ,
        e.eachElement = function(e) {
            for (var t = 0; t < this.length; t++)
                e(this.elementAt(t), t)
        }
        ,
        e.mapElements = function(e) {
            for (var t = [], n = 0; n < this.length; n++)
                t.push(e(this.elementAt(n), n));
            return t
        }
    })
});
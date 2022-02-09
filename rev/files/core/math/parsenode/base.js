
define('core/math/parsenode/base', ['require', 'pjs', 'core/math/parser/input-span', 'core/math/domaintypes', 'core/math/types'], function(require) {
    "use strict";
    var e = require("pjs")
      , n = require("core/math/parser/input-span")
      , t = require("core/math/domaintypes")
      , i = require("core/math/types");
    return e(function(e, s, d) {
        e.init = function() {
            this._dependencies = [],
            this._dummyDependencies = [],
            this._updateSymbols = [],
            this._scope = {
                definitions: [],
                dependencies: [],
                scopes: []
            },
            this._exports = []
        }
        ,
        e.exportPenalty = 0,
        e.setInputSpan = function(e) {
            this._inputSpan = e
        }
        ,
        e.getInputString = function() {
            return void 0 === this.getInputSpan() ? "" : n.slice(this._inputSpan)
        }
        ,
        e.getInputSpan = function() {
            return this._inputSpan
        }
        ,
        e.shouldExportAns = function() {
            return !1
        }
        ,
        e.getAnsVariable = function() {
            return this.shouldExportAns() && this.userData && this.userData.hasOwnProperty("index") ? ["ans_" + this.userData.index] : []
        }
        ,
        e.addDependency = function(e) {
            -1 === this._dependencies.indexOf(e) && this._dependencies.push(e),
            -1 === this._scope.dependencies.indexOf(e) && this._scope.dependencies.push(e)
        }
        ,
        e.addDependencies = function(e) {
            for (var n = 0; n < e.length; n++)
                this.addDependency(e[n])
        }
        ,
        e.addDummyDependency = function(e) {
            -1 === this._dependencies.indexOf(e) && this._dependencies.push(e),
            -1 === this._dummyDependencies.indexOf(e) && this._dummyDependencies.push(e)
        }
        ,
        e.addDummyDependencies = function(e) {
            for (var n = 0; n < e.length; n++)
                this.addDummyDependency(e[n])
        }
        ,
        e.addUpdateSymbol = function(e) {
            -1 === this._dependencies.indexOf(e) && this._dependencies.push(e),
            -1 === this._updateSymbols.indexOf(e) && this._updateSymbols.push(e)
        }
        ,
        e.mergeDependencies = function() {
            for (var e = 0; e < arguments.length; e++) {
                var n, t = arguments[e];
                for (n = 0; n < t._dependencies.length; n++)
                    -1 === this._dependencies.indexOf(t._dependencies[n]) && this._dependencies.push(t._dependencies[n]);
                for (n = 0; n < t._updateSymbols.length; n++)
                    -1 === this._updateSymbols.indexOf(t._updateSymbols[n]) && this._updateSymbols.push(t._updateSymbols[n]);
                for (n = 0; n < t._scope.dependencies.length; n++)
                    -1 === this._scope.dependencies.indexOf(t._scope.dependencies[n]) && this._scope.dependencies.push(t._scope.dependencies[n]);
                this.addDummyDependencies(t.getDummyDependencies()),
                Array.prototype.push.apply(this._scope.scopes, t._scope.scopes)
            }
        }
        ,
        e.mergeDependenciesInScope = function(e, n) {
            this.addDummyDependencies(e);
            var t = n.getScope()
              , i = {
                definitions: e,
                dependencies: t.dependencies,
                scopes: t.scopes
            };
            this._scope.scopes.push(i);
            for (var s = 0; s < n._dependencies.length; s++)
                -1 === this._dependencies.indexOf(n._dependencies[s]) && this._dependencies.push(n._dependencies[s]);
            for (s = 0; s < n._updateSymbols.length; s++)
                -1 === this._updateSymbols.indexOf(n._updateSymbols[s]) && this._updateSymbols.push(n._updateSymbols[s]);
            this.addDummyDependencies(n.getDummyDependencies())
        }
        ,
        e.getDependencies = function() {
            return this._dependencies
        }
        ,
        e.getDummyDependencies = function() {
            return this._dummyDependencies
        }
        ,
        e.getUpdateSymbols = function() {
            return this._updateSymbols
        }
        ,
        e.getScope = function() {
            return this._scope
        }
        ,
        e.dependsOn = function(e) {
            return this._dependencies.indexOf(e) > -1
        }
        ,
        e.getExports = function() {
            return (this._exports || []).concat(this.getAnsVariable())
        }
        ,
        e.getLegalExports = function(e) {
            return this.getExports().filter(function(n) {
                return !e.assignmentForbidden(n)
            })
        }
        ,
        e.exportsSymbol = function(e) {
            return this._exports.indexOf(e) > -1
        }
        ,
        e.exportTo = function(e, n, t) {
            for (var i = this.getLegalExports(e), s = 0; s < i.length; s++) {
                var d = i[s];
                if (t[d])
                    return;
                t[d] = n.blocksExport ? n : this
            }
        }
        ,
        e.getOperator = function() {
            return this.operator || "="
        }
        ,
        e.isInequality = function() {
            return !1
        }
        ,
        e.isShadeBetween = function() {
            return !1
        }
        ,
        e.getAllIds = function() {
            return this.userData ? [this.userData.id] : []
        }
        ,
        e.getEvaluationInfo = function() {
            return !1
        }
        ,
        e.shouldPromoteToSlider = function(e) {
            return !1
        }
        ,
        e.getSliderVariables = function(e, n) {
            var t = e.sliderVariables(n.getDependencies());
            return n.valueType === i.Point || n.valueType === i.ListOfPoint ? t.filter(function(n) {
                return !e.validParametricVariable(n)
            }) : t
        }
        ,
        e.getCompiledDerivative = function() {
            var e = this.getDependencies();
            return this.takeDerivative(e[0] || "x").getCompiledFunction()
        }
        ,
        e.asValue = function() {}
        ,
        e.boundDomain = function(e) {
            return t.unknownDomain()
        }
    })
});
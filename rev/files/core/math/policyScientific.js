define('core/math/policyScientific', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.PolicySingleExpressionScientific = e.PolicyScientific = void 0;
    var i = function() {
        function e(e) {
            this.singleExpression = e.singleExpression
        }
        return e.prototype.assignmentForbidden = function(e) {
            return this.singleExpression ? "ans" !== e.slice(0, 3) : "tmp" === e.slice(0, 3)
        }
        ,
        e.prototype.isValidSlider = function(e) {
            return !1
        }
        ,
        e.prototype.sliderVariables = function() {
            return []
        }
        ,
        e.prototype.graphingEnabled = function() {
            return !1
        }
        ,
        e.prototype.ansEnabled = function() {
            return !this.singleExpression
        }
        ,
        e.prototype.disabledFeatures = function() {
            return this.singleExpression ? ["Sum", "Product", "Integral", "Derivative", "Piecewise", "PercentOf"] : ["Sum", "Product", "Integral", "Derivative", "Piecewise"]
        }
        ,
        e
    }();
    e.PolicyScientific = new i({
        singleExpression: !1
    }),
    e.PolicySingleExpressionScientific = new i({
        singleExpression: !0
    })
});
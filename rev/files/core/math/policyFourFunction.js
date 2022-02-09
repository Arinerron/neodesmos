define('core/math/policyFourFunction', ["require", "exports"], function(require, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    n.PolicySingleExpressionFourFunction = n.PolicyFourFunction = void 0;
    var e = function() {
        function n(n) {
            this.singleExpression = n.singleExpression
        }
        return n.prototype.assignmentForbidden = function(n) {
            return "ans" !== n.slice(0, 3)
        }
        ,
        n.prototype.isValidSlider = function(n) {
            return !1
        }
        ,
        n.prototype.sliderVariables = function() {
            return []
        }
        ,
        n.prototype.graphingEnabled = function() {
            return !1
        }
        ,
        n.prototype.ansEnabled = function() {
            return !this.singleExpression
        }
        ,
        n.prototype.disabledFeatures = function() {
            return ["Sum", "Product", "Integral", "List", "Derivative", "Piecewise", "Exponent", "PercentOf"]
        }
        ,
        n
    }();
    n.PolicyFourFunction = new e({
        singleExpression: !1
    }),
    n.PolicySingleExpressionFourFunction = new e({
        singleExpression: !0
    })
});
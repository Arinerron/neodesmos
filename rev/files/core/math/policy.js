
define('core/math/policy', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.defaultPolicy = void 0;
    var n = ["Sum", "Product", "Integral", "List", "Derivative", "Piecewise", "Exponent", "PercentOf", "FunctionDefinition", "UpdateRule"];
    e.defaultPolicy = {
        assignmentForbidden: function(e) {
            return !0
        },
        graphingEnabled: function() {
            return !1
        },
        isValidSlider: function(e) {
            return !1
        },
        sliderVariables: function(e) {
            return []
        },
        ansEnabled: function() {
            return !1
        },
        disabledFeatures: function() {
            return n
        }
    }
});
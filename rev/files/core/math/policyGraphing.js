
define('core/math/policyGraphing', ["require", "exports", "./builtinframe", "core/types/graphmode"], function(require, t, r, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.PolicyGraphing3D = t.PolicyGraphing = void 0;
    var n = function() {
        function t() {}
        return t.prototype.dimensions = function() {
            return 2
        }
        ,
        t.prototype.assignmentForbidden = function(t) {
            return "x" === t || "y" === t || "theta" === t || "index" === t || "dt" === t || "tmp" === t.slice(0, 3) || r.hasOwnProperty(t)
        }
        ,
        t.prototype.isValidSlider = function(t) {
            return "x" === t || "y" === t || "ans" !== t.slice(0, 3) && !this.assignmentForbidden(t)
        }
        ,
        t.prototype.sliderVariables = function(t) {
            var r = this;
            return -1 !== t.indexOf("theta") && (t = t.filter(function(t) {
                return "r" !== t
            })),
            t.filter(function(t) {
                return !r.assignmentForbidden(t) && ("ans" !== t.slice(0, 3) && "_" !== t[0])
            })
        }
        ,
        t.prototype.graphingEnabled = function() {
            return !0
        }
        ,
        t.prototype.ansEnabled = function() {
            return !1
        }
        ,
        t.prototype.validRegressionParameter = function(t) {
            return "x" !== t && "y" !== t
        }
        ,
        t.prototype.validLHS = function(t) {
            return "theta" !== t
        }
        ,
        t.prototype.unplottablePolarFunction = function(t, r) {
            return "theta" === t && -1 !== r.indexOf("r")
        }
        ,
        t.prototype.validDoubleInequalitySymbol = function(t) {
            return "x" === t || "y" === t
        }
        ,
        t.prototype.validDoubleInequalityVariables = function(t) {
            return !(t.length > 2) && t.every(this.validDoubleInequalitySymbol)
        }
        ,
        t.prototype.validExpressionVariables = function(t) {
            return 1 === t.length && "x" === t[0]
        }
        ,
        t.prototype.validSolvedVariable = function(t) {
            return "x" === t || "y" === t || "r" === t
        }
        ,
        t.prototype.validImplicitVariables = function(t) {
            switch (t.length) {
            case 0:
                return !0;
            case 1:
                return "x" === t[0] || "y" === t[0] || "r" === t[0];
            case 2:
                return "x" === t[0] && "y" === t[1] || "y" === t[0] && "x" === t[1] || "r" === t[0] && "theta" === t[1] || "theta" === t[0] && "r" === t[1];
            default:
                return !1
            }
        }
        ,
        t.prototype.graphableListVariables = function(t, r) {
            return "x" === t || "y" === t || "r" === t || "x" === r || "y" === r
        }
        ,
        t.prototype.validParametricVariable = function(t) {
            return "t" === t
        }
        ,
        t.prototype.validParametricVariables = function(t) {
            return 1 === t.length && this.validParametricVariable(t[0])
        }
        ,
        t.prototype.validInequalityVariables = function(t) {
            switch (t.length) {
            case 1:
                return "x" === t[0] || "y" === t[0] || "r" === t[0];
            case 2:
                return this.validImplicitVariables(t);
            default:
                return !1
            }
        }
        ,
        t.prototype.validFirstColumnVariable = function(t) {
            return "y" !== t && "r" !== t && "theta" !== t && !t.match(/y_(\d+)/)
        }
        ,
        t.prototype.validActionVariable = function(t) {
            return "dt" === t || "index" === t
        }
        ,
        t.prototype.complicatedPolarImplicit = function(t, r) {
            return "theta" === t || "r" === t && 1 !== r
        }
        ,
        t.prototype.constantGraphMode = function(t) {
            return "x" === t ? e.X : "r" === t ? e.POLAR : e.Y
        }
        ,
        t.prototype.graphMode = function(t, r) {
            var n = r[0];
            return "y" === n || "x" === t ? e.X : "r" === t && "theta" === n ? e.POLAR : e.Y
        }
        ,
        t.prototype.tableableAsConstant = function(t) {
            return "x" !== t && ("r" !== t && "theta" !== t)
        }
        ,
        t.prototype.implicitIndependent = function(t) {
            return "x"
        }
        ,
        t.prototype.implicitDependency = function(t) {
            return 1 !== t.length ? "y" : "y" === t[0] ? "x" : "theta" === t[0] ? "r" : "y"
        }
        ,
        t.prototype.graphableAsConstant = function(t) {
            return "y" === t || "x" === t || "r" === t
        }
        ,
        t.prototype.disabledFeatures = function() {
            return []
        }
        ,
        t
    }()
      , i = function() {
        function t() {}
        return t.prototype.dimensions = function() {
            return 3
        }
        ,
        t.prototype.assignmentForbidden = function(t) {
            return "x" === t || "y" === t || "z" === t || "tmp" === t.slice(0, 3) || r.hasOwnProperty(t)
        }
        ,
        t.prototype.isValidSlider = function(t) {
            return "x" === t || "y" === t || "z" === t || "ans" !== t.slice(0, 3) && !this.assignmentForbidden(t)
        }
        ,
        t.prototype.sliderVariables = function(t) {
            var r = this;
            return t.filter(function(t) {
                return !r.assignmentForbidden(t) && "ans" !== t.slice(0, 3)
            })
        }
        ,
        t.prototype.graphingEnabled = function() {
            return !0
        }
        ,
        t.prototype.ansEnabled = function() {
            return !1
        }
        ,
        t.prototype.validRegressionParameter = function(t) {
            return !1
        }
        ,
        t.prototype.validLHS = function(t) {
            return !0
        }
        ,
        t.prototype.unplottablePolarFunction = function(t, r) {
            return !1
        }
        ,
        t.prototype.validDoubleInequalitySymbol = function(t) {
            return !1
        }
        ,
        t.prototype.validDoubleInequalityVariables = function(t) {
            return !1
        }
        ,
        t.prototype.validExpressionVariables = function(t) {
            var r = t.join("");
            return "x" === r || "y" === r || "xy" === r || "yx" === r
        }
        ,
        t.prototype.validSolvedVariable = function(t) {
            return "x" === t || "y" === t || "z" === t
        }
        ,
        t.prototype.validImplicitVariables = function(t) {
            return !1
        }
        ,
        t.prototype.graphableListVariables = function(t, r) {
            return "x" === t || "y" === t || "x" === r || "y" === r
        }
        ,
        t.prototype.validParametricVariable = function(t) {
            return "t" === t
        }
        ,
        t.prototype.validParametricVariables = function(t) {
            return 1 === t.length && this.validParametricVariable(t[0])
        }
        ,
        t.prototype.validInequalityVariables = function(t) {
            return !1
        }
        ,
        t.prototype.validFirstColumnVariable = function(t) {
            return !1
        }
        ,
        t.prototype.validActionVariable = function(t) {
            return "dt" === t || "index" === t
        }
        ,
        t.prototype.complicatedPolarImplicit = function(t, r) {
            return !1
        }
        ,
        t.prototype.constantGraphMode = function(t) {
            return e.Z_3D
        }
        ,
        t.prototype.graphMode = function(t, r) {
            return "z" === t && this.validExpressionVariables(r) ? e.Z_3D : e.NONE
        }
        ,
        t.prototype.tableableAsConstant = function(t) {
            return "x" !== t && "r" !== t
        }
        ,
        t.prototype.implicitIndependent = function(t) {
            return "x"
        }
        ,
        t.prototype.implicitDependency = function(t) {
            if (2 !== t.length)
                return "z";
            var r = t[0] < t[1] ? t[0] + t[1] : t[1] + t[0];
            return "xy" === r ? "z" : "xz" === r ? "y" : "yz" === r ? "x" : "z"
        }
        ,
        t.prototype.graphableAsConstant = function(t) {
            return "z" === t
        }
        ,
        t.prototype.disabledFeatures = function() {
            return []
        }
        ,
        t
    }();
    t.PolicyGraphing = new n,
    t.PolicyGraphing3D = new i
});
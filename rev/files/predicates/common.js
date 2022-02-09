
define('predicates/common', ['require', 'parser', 'core/math/conics', 'graphing-calc/models/expression', 'graphing-calc/models/list'], function(require) {
    "use strict";
    var n = require("parser")
      , e = require("core/math/conics")
      , r = require("graphing-calc/models/expression")
      , t = require("graphing-calc/models/list");
    return {
        FOCUSED_EXP: function(n, e) {
            return t.isItemSelected(n) && "expression" === n.type
        },
        FOCUSED_OR_EMPTY_EXP: function(n, e) {
            return !(!t.isItemSelected(n) || "expression" !== n.type) || "expression" === n.type && r.isEmpty(n)
        },
        COMPLEX_EXP: function(n, t) {
            return "expression" === n.type && r.isGraphable(n) && t && t.branches[0] && "line" !== e.classifyBranchConic(t.branches[0].segments)
        },
        TABLEABLE_EXP: function(n, e) {
            return r.isGraphable(n) && n.formula.is_tableable
        },
        EXP: function(n, e) {
            return "expression" === n.type
        },
        GRAPHABLE_EXP: function(n, e) {
            return r.isGraphable(n)
        },
        HAS_ERROR: function(n, e) {
            return n.error && ("expression" !== n.type || !r.isEmpty(n))
        },
        DEPENDS_ON: function(e) {
            return function(r, t) {
                return !!r.latex && n.parse(r.latex).getDependencies().indexOf(e) >= 0
            }
        },
        DEFINES: function(e) {
            return function(r, t) {
                return !!r.latex && n.parse(r.latex).getExports().indexOf(e) >= 0
            }
        },
        HAS_N_DEPENDENCIES: function(n) {
            return function(e, r) {
                return "expression" === e.type && e.formula && e.formula.variables && e.formula.variables.length >= n
            }
        },
        NONCONSTANT_LINE: function(n, r) {
            return r && "line" === e.classifyBranchConic(r.branches[0].segments) && !isFinite(n.formula.constant_value)
        },
        RESTRICTED_LINE: function(n, e) {
            return this.NONCONSTANT_LINE(n, e) && this.RESTRICTED(n, e)
        },
        EXP_NOT_RESTRICTED_LINE: function(n, e) {
            return this.EXP(n, e) && !this.RESTRICTED_LINE(n, e)
        },
        PARABOLA: function(n, r) {
            return r && r.branches && r.branches.some(function(n) {
                return "parabola" === e.classifyBranchConic(n.segments)
            })
        },
        RESTRICTED: function(n, e) {
            return !(!n || !n.latex) && !!n.latex.match(/\\left\\{(.+)\\right\\}/)
        },
        SHIFTED_PARABOLA: function(n, e) {
            if (!this.PARABOLA(n, e))
                return !1;
            var r = e.branches[0].compiled.fn;
            return 0 !== r(0) || 1 !== r(1)
        },
        EVALUATION: function(n, e) {
            return n.formula && n.formula.is_evaluable && isFinite(n.formula.constant_value)
        },
        HAS_DEPENDENT_Y: function(n, e) {
            return "y" === n.formula.assignment
        },
        SLIDER: function(n, e) {
            return !!n.sliderExists && !r.isGraphable(n)
        },
        ANIMATING_SLIDER: function(n, e) {
            return n.sliderExists && n.slider.isPlaying
        },
        SLID_SLIDER: function(n, e) {
            return n.sliderExists && !r.isGraphable(n) && 1 !== r.getSliderValue(n)
        },
        TABLE: function(n, e) {
            return "table" === n.type
        },
        REGRESSION: function(n, e) {
            return n.formula && n.formula.regression
        },
        HAS_DATA_COLUMN: function(n, e) {
            if (!this.TABLE(n, e))
                return !1;
            for (var r = 1; r < n.columnModels.length; r++)
                if (n.columnModels[r].discrete)
                    return !0;
            return !1
        },
        HAS_FUNCTION_COLUMN: function(n, e) {
            if (!this.TABLE(n, e))
                return !1;
            for (var r = 1; r < n.columnModels.length; r++)
                if (!1 === n.columnModels[r].discrete)
                    return !0;
            return !1
        }
    }
});
define('graphing/poi', ["require", "exports", "core/math/poi-type", "core/types/graphmode", "core/types/point-opacity"], function(require, t, e, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.POI = void 0;
    var r = 1
      , s = function() {
        function t(t, e, i, n, s, h, o) {
            this.x = t,
            this.y = e,
            this.type = i,
            this.sketch = n,
            this.branch = s,
            this.pointIdxOnBranch = h,
            this.bareLabel = void 0 !== o && o,
            this.id = r++
        }
        return t.prototype.getLabel = function() {
            var t = this.sketch && this.sketch.branches[this.branch];
            return t && "labels"in t && t.labels && t.labels[this.pointIdxOnBranch] || ""
        }
        ,
        t.prototype.getGraphMode = function() {
            return this.sketch.branches[this.branch].graphMode
        }
        ,
        t.prototype.getCompiledFunction = function() {
            var t = this.sketch.branches[this.branch];
            if ("compiled"in t && t.compiled)
                return t.compiled.fn
        }
        ,
        t.prototype.isAttachedToPlottedPoint = function() {
            return this.type === e.DEFINITION || this.type === e.LABEL
        }
        ,
        t.prototype.isMovable = function() {
            return this.getGraphMode() === i.XYPOINT_MOVABLE
        }
        ,
        t.prototype.isPersistent = function() {
            return this.type === e.LABEL
        }
        ,
        t.prototype.getLabelSize = function() {
            var t = this.sketch && this.sketch.branches[this.branch];
            return this.type === e.LABEL && t && "labelSize"in t ? void 0 === t.labelSize ? 1 : t.labelSize : 1
        }
        ,
        t.prototype.getLabelRotation = function() {
            var t = this.sketch && this.sketch.branches[this.branch];
            return this.type === e.LABEL && t && "labelAngle"in t ? void 0 === t.labelAngle ? 0 : t.labelAngle : 0
        }
        ,
        t.prototype.getPointOpacity = function() {
            var t = this.sketch && this.sketch.branches[this.branch];
            return t && "pointOpacity"in t && void 0 !== t.pointOpacity ? t.pointOpacity : this.isMovable() ? 1 : n.DEFAULT
        }
        ,
        t.prototype.getTextOutline = function() {
            if (this.hasEditableLabel())
                return !1;
            var t = this.sketch && this.sketch.branches[this.branch];
            return this.type !== e.LABEL || !t || !("suppressTextOutline"in t) || !t.suppressTextOutline
        }
        ,
        t.prototype.hasInteractiveLabel = function() {
            var t = this.sketch && this.sketch.branches[this.branch];
            return !(!t || !("interactiveLabel"in t)) && !!t.interactiveLabel
        }
        ,
        t.prototype.hasEditableLabel = function() {
            var t = this.sketch && this.sketch.branches[this.branch];
            return !(!t || !("editableLabel"in t)) && !!t.editableLabel
        }
        ,
        t.prototype.isBareLabel = function() {
            return this.bareLabel
        }
        ,
        t.prototype.getMovablePoint = function() {
            return this.sketch.getMovablePointByIndex(this.pointIdxOnBranch)
        }
        ,
        t
    }();
    t.POI = s
});
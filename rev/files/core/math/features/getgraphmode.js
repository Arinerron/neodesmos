
define('core/math/features/getgraphmode', ['require', 'parsenodes', 'core/types/graphmode', 'core/lib/dragmode', 'core/lib/dragmode', 'core/math/types'], function(require) {
    "use strict";
    var e = require("parsenodes")
      , t = require("core/types/graphmode")
      , r = require("core/lib/dragmode").reconcileDragMode
      , o = require("core/lib/dragmode").DragMode
      , n = require("core/math/types");
    function s(e, s) {
        if (s.isMovablePoint && function(e, t) {
            var n;
            return n = e && e.hasOwnProperty("dragMode") ? e.dragMode === o.AUTO ? t.defaultDragMode : e.dragMode : t.defaultDragMode,
            r(n, t.moveStrategy)
        }(this.userData, s) !== o.NONE)
            return t.XYPOINT_MOVABLE;
        var i = s.getDependencies();
        switch (s.valueType) {
        case n.Point:
        case n.ListOfPoint:
            return 0 === i.length ? t.XYPOINT : e.validParametricVariables(i) ? 2 === e.dimensions() ? t.PARAMETRIC : t.PARAMETRIC_CURVE_3D : t.NONE;
        case n.Number:
        case n.ListOfNumber:
            return 2 === e.dimensions() && 1 === i.length ? t.Y : 3 === e.dimensions() && 2 === i.length ? t.Z_3D : t.NONE;
        case n.Polygon:
        case n.ListOfPolygon:
            return t.POLYGON;
        default:
            return t.NONE
        }
    }
    function i(e, r) {
        var o = r._expression.getDependencies();
        if (o.length > 1)
            return t.NONE;
        if (r._expression.isList && 0 === r._expression.length)
            return t.NONE;
        var n = r._symbol;
        return e.graphMode(n, o)
    }
    function a(e, r) {
        return r.isError ? t.NONE : t.VISUALIZATION
    }
    e.Base.prototype.getGraphMode = function(e, r) {
        return t.NONE
    }
    ,
    e.Expression.prototype.getGraphMode = s,
    e.Equation.prototype.getGraphMode = e.BaseComparator.prototype.getGraphMode = function(r, o) {
        var n = o.getDependencies();
        return o.isConstant ? t.NONE : o instanceof e.SolvedEquation ? 0 === n.length ? r.graphableAsConstant(o._symbol) ? r.constantGraphMode(o._symbol) : t.NONE : i(r, o) : 1 === n.length || 2 === n.length ? t.IMPLICIT : t.NONE
    }
    ,
    e.DoubleInequality.prototype.getGraphMode = function(e, t) {
        return e.constantGraphMode(t._symbol)
    }
    ,
    e.Assignment.prototype.getGraphMode = function(r, o) {
        if (o instanceof e.SolvedEquation)
            return i(r, o);
        if (this.isEquation(o))
            return this.asEquation().getGraphMode(r, o);
        var a = o.getDependencies();
        switch (o.valueType) {
        case n.Number:
        case n.ListOfNumber:
        case n.EmptyList:
            switch (a.length) {
            case 0:
                return r.graphableAsConstant(this._symbol) ? r.constantGraphMode(this._symbol) : t.NONE;
            case 1:
                return o.valueType !== n.ListOfNumber || r.graphableListVariables(this._symbol, a[0]) ? this.isSlider ? t.NONE : r.graphMode(this._symbol, a) : t.NONE;
            case 2:
                return 3 === r.dimensions() && "z" === this._symbol ? t.Z_3D : t.NONE;
            default:
                return t.NONE
            }
            break;
        default:
            return s.call(this, r, o)
        }
    }
    ,
    e.FunctionDefinition.prototype.getGraphMode = function(e, r) {
        if (1 !== this._argSymbols.length)
            return t.NONE;
        var o = e.graphMode(this._symbol, this._argSymbols)
          , s = r.getDependencies();
        switch (r.valueType) {
        case n.Number:
        case n.ListOfNumber:
            switch (s.length) {
            case 0:
                return o;
            case 1:
                return s[0] !== this._argSymbols[0] ? t.NONE : o;
            default:
                return t.NONE
            }
            break;
        default:
            return t.NONE
        }
    }
    ,
    e.Regression.prototype.getGraphMode = function(e, r) {
        return this.isLhsSimple && r.isModelValid ? 1 !== r.model.getDependencies().length ? t.NONE : t.Y : t.NONE
    }
    ,
    e.Object3D.prototype.getGraphMode = function(e, r) {
        return r.isError ? t.NONE : t.OBJECT3D
    }
    ,
    e.Histogram.prototype.getGraphMode = a,
    e.DotPlot.prototype.getGraphMode = a,
    e.BoxPlot.prototype.getGraphMode = a,
    e.Image.prototype.getGraphMode = function(e, r) {
        return this.userData.showPoints ? this.center.isError || this.radianAngle.isError || this.width.isError || this.height.isError || this.opacity.isError ? t.NONE : t.XYPOINT : t.NONE
    }
});
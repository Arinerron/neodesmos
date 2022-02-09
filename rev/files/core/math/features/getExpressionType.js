
define('core/math/features/getExpressionType', ['require', 'parsenodes', 'core/types/graphmode', 'core/math/expression-types', 'core/math/types'], function(require) {
    "use strict";
    var e = require("parsenodes")
      , t = require("core/types/graphmode")
      , o = require("core/math/expression-types").ExpressionType
      , r = require("core/math/types");
    e.Base.prototype.getExpressionType = function(e, p) {
        return e === t.X || e === t.Y ? o.X_OR_Y : e === t.XYPOINT || e === t.XYPOINT_MOVABLE ? p === r.Point ? o.SINGLE_POINT : o.POINT_LIST : e === t.PARAMETRIC || e === t.PARAMETRIC_CURVE_3D ? o.PARAMETRIC : e === t.POLAR ? o.POLAR : e === t.IMPLICIT ? o.IMPLICIT : r.isTypeOrListOfType(p, r.Polygon) ? o.POLYGON : o.X_OR_Y
    }
    ,
    e.Histogram.prototype.getExpressionType = function(e, t) {
        return o.HISTOGRAM
    }
    ,
    e.Object3D.prototype.getExpressionType = function(e, t) {
        return o.CUBE
    }
    ,
    e.DotPlot.prototype.getExpressionType = function(e, t) {
        return o.DOTPLOT
    }
    ,
    e.BoxPlot.prototype.getExpressionType = function(e, t) {
        return o.BOXPLOT
    }
});
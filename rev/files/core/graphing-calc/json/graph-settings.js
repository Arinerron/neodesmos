
define('core/graphing-calc/json/graph-settings', ["require", "exports", "tslib"], function(require, i, s) {
    "use strict";
    var e;
    Object.defineProperty(i, "__esModule", {
        value: !0
    }),
    i.isGraphSetting = i.publicGraphSettings = i.DefaultGraphSettings = i.AxisArrowModes = void 0,
    function(i) {
        i.NONE = "NONE",
        i.POSITIVE = "POSITIVE",
        i.BOTH = "BOTH"
    }(e = i.AxisArrowModes || (i.AxisArrowModes = {}));
    var r = {
        showGrid: !0,
        showXAxis: !0,
        showYAxis: !0,
        xAxisStep: 0,
        yAxisStep: 0,
        xAxisMinorSubdivisions: 0,
        yAxisMinorSubdivisions: 0,
        xAxisArrowMode: e.NONE,
        yAxisArrowMode: e.NONE,
        xAxisLabel: "",
        yAxisLabel: "",
        xAxisNumbers: !0,
        yAxisNumbers: !0,
        polarMode: !1,
        polarNumbers: !0,
        degreeMode: !1,
        randomSeed: "",
        restrictGridToFirstQuadrant: !1
    };
    i.DefaultGraphSettings = s.__assign(s.__assign({}, r), {
        squareAxes: !0
    }),
    i.publicGraphSettings = Object.keys(r),
    i.isGraphSetting = function(i) {
        return i in r
    }
});
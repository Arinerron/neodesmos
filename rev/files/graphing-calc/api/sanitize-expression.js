
define('graphing-calc/api/sanitize-expression', ["require", "exports", "core/types/styles", "core/lib/dragmode", "core/types/label-sizes", "core/types/label-orientations", "core/lib/number-to-latex", "lib/console"], function(require, e, i, n, t, a, r, o) {
    "use strict";
    function l(e, i) {
        for (var n in i)
            if (i.hasOwnProperty(n) && i[n] === e)
                return !0;
        return !1
    }
    function d(i) {
        return l(i, e.SanitizedPointStyle)
    }
    function s(i) {
        return l(i, e.SanitizedLineStyle)
    }
    function p(i) {
        return l(i, e.SanitizedDragMode)
    }
    function y(e) {
        return {
            id: e.id,
            latex: e.latex,
            color: e.color,
            hidden: e.hidden,
            pointStyle: e.pointStyle,
            pointSize: e.pointSize,
            pointOpacity: e.pointOpacity,
            lineStyle: e.lineStyle,
            lineWidth: e.lineWidth,
            lineOpacity: e.lineOpacity,
            points: e.points,
            lines: e.lines,
            dragMode: e.dragMode,
            values: e.values.slice()
        }
    }
    function O(e, i) {
        return e.hasOwnProperty("id") ? e.id + "" : i.generateId()
    }
    function c(i, n) {
        var t = {
            type: "expression",
            id: O(i, n)
        };
        return t.type = "expression",
        t.id = O(i, n),
        i.hasOwnProperty("latex") && (t.latex = i.latex + ""),
        i.hasOwnProperty("color") && (t.color = i.color + ""),
        i.hasOwnProperty("points") && (t.points = !!i.points),
        i.hasOwnProperty("lines") && (t.lines = !!i.lines),
        i.hasOwnProperty("style") && (o.warn("As of API v1.1 the 'style' property is deprecated and has been split into 'pointStyle' and 'lineStyle'."),
        d(i.style) ? t.pointStyle = i.style : s(i.style) ? t.lineStyle = i.style : o.warn("Invalid style: '" + i.style + "'.")),
        i.hasOwnProperty("pointStyle") && (d(i.pointStyle) ? t.pointStyle = i.pointStyle : o.warn("Invalid pointStyle: '" + i.pointStyle + "'.")),
        i.hasOwnProperty("pointSize") && (t.pointSize = "" + i.pointSize),
        i.hasOwnProperty("pointOpacity") && (t.pointOpacity = "" + i.pointOpacity),
        i.hasOwnProperty("lineStyle") && (s(i.lineStyle) ? t.lineStyle = i.lineStyle : o.warn("Invalid lineStyle: '" + i.lineStyle + "'.")),
        i.hasOwnProperty("lineWidth") && (t.lineWidth = "" + i.lineWidth),
        i.hasOwnProperty("lineOpacity") && (t.lineOpacity = "" + i.lineOpacity),
        i.hasOwnProperty("hidden") && (t.hidden = !!i.hidden),
        i.hasOwnProperty("secret") && (t.secret = !!i.secret),
        i.hasOwnProperty("sliderBounds") && i.sliderBounds && (t.slider = {
            min: r.default(i.sliderBounds.min),
            max: r.default(i.sliderBounds.max),
            step: r.default(i.sliderBounds.step)
        },
        t.slider.min && (t.slider.hardMin = !0),
        t.slider.max && (t.slider.hardMax = !0)),
        i.hasOwnProperty("parametricDomain") && i.parametricDomain ? (t.parametricDomain = {
            min: r.default(i.parametricDomain.min),
            max: r.default(i.parametricDomain.max)
        },
        i.hasOwnProperty("domain") && o.warn("Both 'parametricDomain' and the deprecated 'domain' property were specified. Using 'parametricDomain'.")) : i.hasOwnProperty("domain") && (o.warn("The 'domain' property is deprecated.Use 'parametricDomain' to specify the domain for parametric functions"),
        t.parametricDomain = {
            min: r.default(i.domain.min),
            max: r.default(i.domain.max)
        }),
        i.hasOwnProperty("polarDomain") && i.polarDomain && (t.polarDomain = {
            min: r.default(i.polarDomain.min),
            max: r.default(i.polarDomain.max)
        }),
        i.hasOwnProperty("dragMode") && (p(i.dragMode) ? t.dragMode = i.dragMode : o.warn("Invalid dragMode: '" + i.dragMode + "'.")),
        i.hasOwnProperty("label") && (t.label = i.label + ""),
        i.hasOwnProperty("showLabel") && (t.showLabel = !!i.showLabel),
        i.hasOwnProperty("labelSize") && ("string" == typeof i.labelSize ? t.labelSize = i.labelSize : o.warn("Invalid labelSize: " + i.labelSize)),
        i.hasOwnProperty("labelOrientation") && (l(i.labelOrientation, e.SanitizedLabelOrientation) ? t.labelOrientation = i.labelOrientation : o.warn("Invalid labelOrientation: " + i.labelOrientation)),
        i.hasOwnProperty("fill") && (t.fill = !!i.fill),
        i.hasOwnProperty("fillOpacity") && (t.fillOpacity = "" + i.fillOpacity),
        t
    }
    function m(i, t) {
        var a = {
            id: O(i, t)
        };
        return i.hasOwnProperty("latex") && (a.latex = i.latex + ""),
        i.hasOwnProperty("color") && (a.color = i.color + ""),
        i.hasOwnProperty("hidden") && (a.hidden = !!i.hidden),
        i.hasOwnProperty("points") && (a.points = !!i.points),
        i.hasOwnProperty("lines") && (a.lines = !!i.lines),
        i.hasOwnProperty("values") && i.values && (a.values = i.values.map(function(e) {
            return e + ""
        })),
        i.hasOwnProperty("pointStyle") && (d(i.pointStyle) ? a.pointStyle = i.pointStyle : o.warn("Invalid pointStyle: '" + i.pointStyle + "'.")),
        i.hasOwnProperty("pointSize") && (a.pointSize = "" + i.pointSize),
        i.hasOwnProperty("pointOpacity") && (a.pointOpacity = "" + i.pointOpacity),
        i.hasOwnProperty("lineStyle") && (s(i.lineStyle) ? a.lineStyle = i.lineStyle : o.warn("Invalid lineStyle: '" + i.lineStyle + "'.")),
        i.hasOwnProperty("lineWidth") && (a.lineWidth = "" + i.lineWidth),
        i.hasOwnProperty("lineOpacity") && (a.lineOpacity = "" + i.lineOpacity),
        i.hasOwnProperty("columnMode") && (o.warn("As of API v1.1 the 'columnMode' property is deprecated and has been split into individual 'points' and 'lines' properties."),
        i.columnMode === e.SanitizedColumnMode.POINTS_AND_LINES ? (a.points = !0,
        a.lines = !0) : i.columnMode === e.SanitizedColumnMode.LINES ? (a.points = !1,
        a.lines = !0) : (a.points = !0,
        a.lines = !1),
        a.lines && !a.points && i.hasOwnProperty("dragMode") && i.dragMode !== n.DragMode.NONE && (o.warn("A 'lines' value of true and 'points' value of false is only compatible with a dragMode of 'NONE'. Proceeding by setting 'points' to true."),
        a.points = !0),
        l(i.columnMode, e.SanitizedColumnMode) && o.warn("Invalid columnMode: '" + i.columnMode + "'.")),
        i.hasOwnProperty("dragMode") && (p(i.dragMode) ? a.dragMode = i.dragMode === n.DragMode.AUTO ? n.DragMode.NONE : i.dragMode : o.warn("Invalid dragMode: '" + i.dragMode + "'.")),
        a
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.validateItem = e.sanitizeItem = e.SanitizedLabelOrientation = e.SanitizedLabelSize = e.SanitizedColumnMode = e.SanitizedDragMode = e.SanitizedLineStyle = e.SanitizedPointStyle = void 0,
    e.SanitizedPointStyle = {
        OPEN: i.PointStyle.OPEN,
        CROSS: i.PointStyle.CROSS,
        POINT: i.PointStyle.POINT
    },
    e.SanitizedLineStyle = {
        SOLID: i.LineStyle.SOLID,
        DASHED: i.LineStyle.DASHED,
        DOTTED: i.LineStyle.DOTTED
    },
    e.SanitizedDragMode = {
        NONE: n.DragMode.NONE,
        AUTO: n.DragMode.AUTO,
        X: n.DragMode.X,
        Y: n.DragMode.Y,
        XY: n.DragMode.XY
    },
    e.SanitizedColumnMode = {
        POINTS: "POINTS",
        LINES: "LINES",
        POINTS_AND_LINES: "POINTS_AND_LINES"
    },
    e.SanitizedLabelSize = {
        SMALL: t.LabelSize.SMALL,
        MEDIUM: t.LabelSize.MEDIUM,
        LARGE: t.LabelSize.LARGE
    },
    e.SanitizedLabelOrientation = {
        DEFAULT: a.LabelOrientation.DEFAULT,
        CENTER: a.LabelOrientation.CENTER,
        CENTER_AUTO: a.LabelOrientation.CENTER_AUTO,
        AUTO_CENTER: a.LabelOrientation.AUTO_CENTER,
        ABOVE: a.LabelOrientation.ABOVE,
        ABOVE_LEFT: a.LabelOrientation.ABOVE_LEFT,
        ABOVE_RIGHT: a.LabelOrientation.ABOVE_RIGHT,
        ABOVE_AUTO: a.LabelOrientation.ABOVE_AUTO,
        BELOW: a.LabelOrientation.BELOW,
        BELOW_LEFT: a.LabelOrientation.BELOW_LEFT,
        BELOW_RIGHT: a.LabelOrientation.BELOW_RIGHT,
        BELOW_AUTO: a.LabelOrientation.BELOW_AUTO,
        LEFT: a.LabelOrientation.LEFT,
        AUTO_LEFT: a.LabelOrientation.AUTO_LEFT,
        RIGHT: a.LabelOrientation.RIGHT,
        AUTO_RIGHT: a.LabelOrientation.AUTO_RIGHT
    },
    e.sanitizeItem = function(e) {
        switch (e.type) {
        case "expression":
            return function(e) {
                var i = {
                    id: e.id,
                    type: e.type
                };
                return ["latex", "color", "lineStyle", "lineWidth", "lineOpacity", "pointStyle", "pointSize", "pointOpacity", "points", "lines", "fill", "fillOpacity", "hidden", "secret", "dragMode", "label", "showLabel", "labelSize", "labelOrientation", "interactiveLabel"].forEach(function(n) {
                    e.hasOwnProperty(n) && (i[n] = e[n])
                }),
                e.hasOwnProperty("parametricDomain") && (i.parametricDomain = {
                    min: e.parametricDomain.min,
                    max: e.parametricDomain.max
                }),
                e.hasOwnProperty("polarDomain") && (i.polarDomain = {
                    min: e.polarDomain.min,
                    max: e.polarDomain.max
                }),
                e.hasOwnProperty("domain") && (i.domain = {
                    min: e.domain.min,
                    max: e.domain.max
                }),
                e.slider && (e.slider.hardMin && (i.sliderBounds = i.sliderBounds || {},
                i.sliderBounds.min = e.slider.min),
                e.slider.hardMax && (i.sliderBounds = i.sliderBounds || {},
                i.sliderBounds.max = e.slider.max),
                e.slider.step && (i.sliderBounds = i.sliderBounds || {},
                i.sliderBounds.step = e.slider.step)),
                i
            }(e);
        case "table":
            return function(e) {
                return {
                    id: e.id,
                    type: e.type,
                    columns: e.columns.map(y)
                }
            }(e);
        case "folder":
        case "image":
            return function(e) {
                return {
                    id: e.id,
                    type: e.type,
                    hidden: e.hidden,
                    secret: e.secret
                }
            }(e);
        case "text":
            return function(e) {
                return {
                    id: e.id,
                    type: e.type,
                    secret: e.secret
                }
            }(e);
        default:
            return e
        }
    }
    ,
    e.validateItem = function(e, i, n) {
        var t = e.type;
        if (i && t && t !== i)
            o.warn("Cannot change type of expression from '" + i + "' to '" + t + "'.");
        else
            switch (t) {
            case void 0:
            case "expression":
                return c(e, n);
            case "image":
                return function(e, i) {
                    var n = {
                        type: "image",
                        id: O(e, i)
                    };
                    return e.hasOwnProperty("hidden") && (n.hidden = !!e.hidden),
                    n
                }(e, n);
            case "table":
                return function(e, i) {
                    var n = {
                        type: "table",
                        id: O(e, i)
                    };
                    return e.hasOwnProperty("columns") && e.columns && (n.columns = e.columns.map(function(e) {
                        return m(e, i)
                    })),
                    n
                }(e, n);
            case "folder":
                return function(e, i) {
                    var n = {
                        type: "folder",
                        id: O(e, i)
                    };
                    return e.hasOwnProperty("hidden") && (n.hidden = !!e.hidden),
                    n
                }(e, n);
            default:
                return i ? void o.warn("Cannot modify expressions of type: '" + i + "' through the API.") : void o.warn("Invalid expression type: '" + t + "'.")
            }
    }
});
define('core/graphing-calc/json/expression', ["require", "exports", "tslib", "core/types/opacity", "core/types/styles", "core/lib/dragmode", "core/types/slider-loop-modes", "core/types/label-sizes", "core/types/label-orientations", "core/lib/default-spec", "../../lib/copy-properties"], function(require, e, i, a, l, t, s, r, n, o, d) {
    "use strict";
    var L;
    function D(i) {
        return d.extractPropertiesLike(i, e.DEFAULTS_DYNAMIC)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.computeParsableState = e.areDynamicPropertiesStrictEqual = e.extractDynamicProperties = e.stripDefaults = e.inflateDefaults = e.SLIDER_DEFAULTS = e.DEFAULTS = e.DEFAULTS_DYNAMIC = e.DEFAULT_SLIDER_PERIOD = e.EditableLabelMode = e.CLICKABLEINFO_DEFAULTS = e.VIZ_DEFAULTS = e.CDF_DEFAULTS = void 0,
    e.CDF_DEFAULTS = {
        show: !1,
        min: "",
        max: ""
    },
    e.VIZ_DEFAULTS = {
        breadth: "",
        axisOffset: "",
        alignedAxis: "x",
        showBoxplotOutliers: !0,
        binAlignment: "center",
        dotplotXMode: "exact",
        histogramMode: ""
    },
    e.CLICKABLEINFO_DEFAULTS = {
        enabled: !1,
        description: "",
        latex: ""
    },
    function(e) {
        e.None = "NONE",
        e.Math = "MATH",
        e.Text = "TEXT"
    }(L = e.EditableLabelMode || (e.EditableLabelMode = {})),
    e.DEFAULT_SLIDER_PERIOD = 4e3,
    e.DEFAULTS_DYNAMIC = {
        polarDomain: {
            min: "",
            max: ""
        },
        parametricDomain: {
            min: "",
            max: ""
        },
        cdf: e.CDF_DEFAULTS,
        colorLatex: "",
        fillOpacity: "" + a.DEFAULT,
        lineOpacity: "",
        pointOpacity: "",
        pointSize: "",
        lineWidth: "",
        labelAngle: "",
        vizProps: e.VIZ_DEFAULTS,
        clickableInfo: e.CLICKABLEINFO_DEFAULTS
    },
    e.DEFAULTS = i.__assign(i.__assign({
        folderId: "",
        latex: "",
        color: "",
        showLabel: !1,
        label: "",
        hidden: !1,
        secret: !1,
        dragMode: t.DragMode.AUTO,
        labelSize: r.LabelSize.MEDIUM,
        labelOrientation: n.LabelOrientation.DEFAULT,
        suppressTextOutline: !1,
        interactiveLabel: !1,
        editableLabelMode: L.None,
        residualVariable: "",
        isLogModeRegression: !1,
        pointStyle: l.PointStyle.POINT,
        lineStyle: l.LineStyle.SOLID,
        regressionParameters: {},
        displayEvaluationAsFraction: !1,
        slider: {}
    }, e.DEFAULTS_DYNAMIC), {
        points: void 0,
        lines: void 0,
        fill: void 0
    }),
    e.SLIDER_DEFAULTS = {
        hardMin: !1,
        hardMax: !1,
        animationPeriod: e.DEFAULT_SLIDER_PERIOD,
        loopMode: s.SliderLoopMode.LOOP_FORWARD_REVERSE,
        playDirection: 1,
        isPlaying: !1,
        min: "-10",
        max: "10",
        step: ""
    },
    e.inflateDefaults = function(a) {
        return i.__assign(i.__assign(i.__assign({}, e.DEFAULTS), a), {
            slider: i.__assign(i.__assign({}, e.SLIDER_DEFAULTS), a.slider),
            cdf: i.__assign(i.__assign({}, e.CDF_DEFAULTS), a.cdf),
            vizProps: i.__assign(i.__assign({}, e.VIZ_DEFAULTS), a.vizProps),
            clickableInfo: i.__assign(i.__assign({}, e.CLICKABLEINFO_DEFAULTS), a.clickableInfo)
        })
    }
    ,
    e.stripDefaults = function(a) {
        var l = o.stripDefaults(e.DEFAULTS, i.__assign(i.__assign({}, a), {
            slider: o.stripDefaults(e.SLIDER_DEFAULTS, a.slider)
        }))
          , t = o.stripDefaultsAndMaybeReturnUndefined(e.CDF_DEFAULTS, a.cdf);
        void 0 === t ? delete l.cdf : l.cdf = t;
        var s = o.stripDefaultsAndMaybeReturnUndefined(e.VIZ_DEFAULTS, a.vizProps);
        void 0 === s ? delete l.vizProps : l.vizProps = s;
        var r = o.stripDefaultsAndMaybeReturnUndefined(e.CLICKABLEINFO_DEFAULTS, a.clickableInfo);
        return void 0 === r ? delete l.clickableInfo : l.clickableInfo = r,
        l
    }
    ,
    e.extractDynamicProperties = D,
    e.areDynamicPropertiesStrictEqual = function(i, a) {
        for (var l in e.DEFAULTS_DYNAMIC)
            if (e.DEFAULTS_DYNAMIC.hasOwnProperty(l) && i[l] !== a[l])
                return !1;
        return !0
    }
    ,
    e.computeParsableState = function(e) {
        var a = r.maybeMigrateLabelSizeEnumToLatex(e.labelSize)
          , l = a || e.labelSize;
        return i.__assign({
            type: "statement",
            id: e.id,
            latex: e.latex,
            label: e.label,
            color: e.color,
            fill: e.fill,
            points: e.points,
            lines: e.lines,
            pointStyle: e.pointStyle,
            lineStyle: e.lineStyle,
            dragMode: e.dragMode,
            labelSize: l,
            labelOrientation: e.labelOrientation,
            suppressTextOutline: e.suppressTextOutline,
            interactiveLabel: e.interactiveLabel,
            editableLabelMode: e.editableLabelMode,
            residualVariable: e.residualVariable,
            regressionParameters: e.regressionParameters,
            isLogModeRegression: e.isLogModeRegression,
            showLabel: e.showLabel,
            shouldGraph: e.hidden,
            slider: {
                min: e.slider.hardMin ? e.slider.min : "",
                max: e.slider.hardMax ? e.slider.max : "",
                softMin: e.slider.hardMin ? "" : e.slider.min,
                softMax: e.slider.hardMax ? "" : e.slider.max,
                step: e.slider.step,
                isPlayingOnce: e.slider.isPlaying && e.slider.loopMode === s.SliderLoopMode.PLAY_ONCE
            }
        }, D(e))
    }
});
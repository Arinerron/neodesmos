
define('graphing-calc/models/expression', ["require", "exports", "tslib", "core/lib/dragmode", "core/types/slider-loop-modes", "core/types/styles", "core/types/label-sizes", "core/types/label-orientations", "core/math/evaluate-single-expression", "lib/rounding", "core/lib/deepCopy", "core/lib/copy-properties", "./abstract-item", "./list", "underscore", "core/math/expression-types", "core/lib/label", "core/lib/number-to-latex", "core/math/sliders", "core/lib/number-to-latex", "core/lib/validate-color", "core/graphing-calc/json/expression", "core/math/distribution-spec", "core/graphing-calc/extract-slider-value-from-latex"], function(require, e, i, a, t, r, n, l, o, s, d, u, c, f, p, m, g, x, b, S, v, _, D, M) {
    "use strict";
    function L(e) {
        return void 0 === e ? NaN : +e
    }
    function h(e) {
        var i = e.formula;
        return !!i && (e.controller.isDecimalToFractionEnabled() && i.hasOwnProperty("constant_value") && g.canDisplayAsFraction(L(i.constant_value)))
    }
    function y(e) {
        var i = e.formula;
        if (!i)
            return !1;
        var a = i.is_evaluable && i.zero_values && i.zero_values.length > 0 && "boolean" != typeof i.zero_values[0].val
          , t = h(e) && W(e)
          , r = !!i.rgb_value && e.formula.assignment;
        return a || t || r
    }
    function P(e, i) {
        if (!isFinite(i))
            return e;
        var a = /=(.*?)([-\.0-9]+)/
          , t = e.match(a);
        if (!t)
            return e;
        if (parseFloat(t[2]) === i)
            return e;
        var r = S.numberToDecimalString(i);
        return e.replace(a, "=$1" + r)
    }
    function T(e) {
        var i = e.dragMode === a.DragMode.AUTO && void 0 !== e.formula.default_drag_mode ? e.formula.default_drag_mode : e.dragMode;
        e.dragMode === a.DragMode.AUTO && e.hidden && (i = a.DragMode.NONE),
        e.reconciledDragMode = a.reconcileDragMode(i, e.formula.move_strategy),
        e.interactiveLabel && e.reconciledDragMode !== a.DragMode.NONE && Y(e, !1)
    }
    function E(e, i, a) {
        if (!e.sliderExists)
            return NaN;
        var t = O(e)
          , r = w(e)
          , n = C(e);
        if (a && void 0 !== a.overwriteStep && (n = a.overwriteStep),
        i = b.constrainSliderValueLikeEvaluator({
            target: i,
            hardMin: e.slider.hardMin ? t : void 0,
            hardMax: e.slider.hardMax ? r : void 0,
            step: n
        }),
        !a || !a.ignoreSoftLimits) {
            if (!e.slider.hardMin && i < t)
                return t;
            if (!e.slider.hardMax && i > r)
                return r
        }
        return i
    }
    function F(e) {
        var i = f.getParentFolderModel(e);
        i && i.hidden || e.formula.expression_type && H(e) ? e.shouldGraph = !1 : e.shouldGraph = !e.hidden
    }
    function V(e) {
        var i = e.formula && e.formula.raw_slider_latex;
        if (e.sliderExists && e.latex === i) {
            var a = e.latex;
            if (e.cachedDisplayLatex.storedLatex === a) {
                var t = N(e);
                if (isFinite(t)) {
                    var r = e.controller.getFocusLocation();
                    r && "expression" === r.type && r.id === e.id || (e.cachedDisplayLatex.valueLatex = P(e.latex, t))
                }
            } else
                e.cachedDisplayLatex = {
                    storedLatex: e.latex,
                    valueLatex: e.latex
                }
        } else
            e.cachedDisplayLatex = {
                storedLatex: e.latex,
                valueLatex: e.latex
            }
    }
    function A(e) {
        var i = g.value(e);
        return i.superscript && i.mantissa ? i.mantissa + "^{" + i.superscript + "}" : i.string
    }
    function O(e) {
        if (e.slider.hardMin) {
            var i = e.formula.slider_min_number;
            return isFinite(i) ? i : NaN
        }
        var a = e.controller.isDegreeMode()
          , t = o.default(e.slider.min, a)
          , r = z(e)
          , n = C(e)
          , l = e.slider.hardMax ? e.formula.slider_max_number : void 0
          , s = -10;
        if (t < s && (s = t),
        r < s && (s = r),
        l < s && (s = l),
        n) {
            var d = b.constrainSliderValueLikeEvaluator({
                target: s,
                hardMin: void 0,
                hardMax: l,
                step: n
            });
            s = d <= s ? d : d - n
        }
        return s
    }
    function w(e) {
        if (e.slider.hardMax) {
            var i = e.formula.slider_max_number;
            return isFinite(i) ? i : NaN
        }
        var a = e.controller.isDegreeMode()
          , t = o.default(e.slider.max, a)
          , r = z(e)
          , n = C(e)
          , l = e.slider.hardMin ? e.formula.slider_min_number : void 0;
        return b.computeSoftMax({
            storedMax: t,
            sliderValue: r,
            step: n,
            hardMin: l
        })
    }
    function C(e) {
        return e.formula.slider_step_number
    }
    function N(e) {
        if (e.formula && e.formula.is_slider) {
            var i = e.formula.constant_value;
            if (void 0 !== i)
                return +i
        }
    }
    function z(e) {
        var i = e.formula && e.formula.raw_slider_latex;
        if (e.latex !== i)
            return M.extractSliderValueFromLatex(e.latex);
        var a = N(e);
        return isFinite(a) ? a : NaN
    }
    function I(e) {
        var a = e.cachedViewState;
        a && _.areDynamicPropertiesStrictEqual(a, e) && a.folderId === e.folderId && a.color === e.color && a.latex === e.latex && a.showLabel === e.showLabel && a.label === e.label && a.hidden === e.hidden && a.secret === e.secret && a.fill === e.fill && a.points === e.points && a.lines === e.lines && a.lineStyle === e.lineStyle && a.pointStyle === e.pointStyle && a.dragMode === e.dragMode && a.labelSize === e.labelSize && a.labelOrientation === e.labelOrientation && a.suppressTextOutline === e.suppressTextOutline && a.interactiveLabel === e.interactiveLabel && a.editableLabelMode === e.editableLabelMode && a.residualVariable === e.residualVariable && a.regressionParameters === e.regressionParameters && a.isLogModeRegression === e.isLogModeRegression && a.displayEvaluationAsFraction === e.displayEvaluationAsFraction && a.slider === e.slider || (e.cachedViewState = i.__assign({
            type: e.type,
            id: e.id,
            folderId: e.folderId,
            color: e.color,
            latex: e.latex,
            showLabel: e.showLabel,
            label: e.label,
            hidden: e.hidden,
            secret: e.secret,
            points: e.points,
            lines: e.lines,
            lineStyle: e.lineStyle,
            pointStyle: e.pointStyle,
            fill: e.fill,
            dragMode: e.dragMode,
            labelSize: e.labelSize,
            labelOrientation: e.labelOrientation,
            suppressTextOutline: e.suppressTextOutline,
            interactiveLabel: e.interactiveLabel,
            editableLabelMode: e.editableLabelMode,
            residualVariable: e.residualVariable,
            regressionParameters: e.regressionParameters,
            isLogModeRegression: e.isLogModeRegression,
            displayEvaluationAsFraction: e.displayEvaluationAsFraction,
            slider: e.slider
        }, _.extractDynamicProperties(e)))
    }
    function k(e) {
        var a, t = e.memoizedUndoRedoStateParams, r = e.cachedViewState, n = e.preTransientState;
        (e.cachedUndoRedoFullState = r,
        t && t.viewState === r && t.preTransientState === n) || (e.memoizedUndoRedoStateParams = {
            viewState: r,
            preTransientState: n
        },
        delete (a = n ? i.__assign(i.__assign({}, r), {
            latex: n.latex,
            slider: i.__assign(i.__assign({}, r.slider), n.slider)
        }) : i.__assign({}, r)).regressionParameters,
        delete a.residualVariable,
        e.cachedUndoRedoDiffState = a)
    }
    function R(e) {
        var i = f.getParentFolderModel(e)
          , a = !(!i || !i.hidden)
          , t = e.cachedViewState
          , r = e.index
          , n = e.showLabel && !a
          , l = e.shouldGraph
          , o = e.memoizedParsableStateParams;
        if (!o || o.viewState !== t || o.index !== r || o.showLabel !== n || o.shouldGraph !== l) {
            e.memoizedParsableStateParams = {
                viewState: t,
                index: r,
                showLabel: n,
                shouldGraph: l
            };
            var s = _.computeParsableState(t);
            s.index = r,
            s.showLabel = n,
            s.shouldGraph = l,
            e.cachedParsableState = s
        }
    }
    function U(e) {
        return !(!e.sliderExists || !e.slider.isPlaying && !e.sliderDragging) || !!e.draggingOnGraphpaper
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.isPotentiallyMovable = e.blankOutExpressionAfterClearingLatex = e.isClickableAllowed = e.getCDFEvaluation = e.getLabelAngleValue = e.getColorLatexValue = e.isColorLatexValid = e.isLineWidthValid = e.isPointSizeValid = e.isLabelAngleValid = e.isLabelSizeValid = e.isPointOpacityValid = e.isLineOpacityValid = e.isFillOpacityValid = e.isCDFMaxValid = e.isCDFMinValid = e.setCDFMax = e.setCDFMin = e.setShowCDF = e.getCDFMaxPlaceholder = e.getCDFMinPlaceholder = e.getCDFMax = e.getCDFMin = e.shouldShowCDFFooter = e.isListValuedDistribution = e.isPrimaryLatexValid = e.shouldShowCDFCheckbox = e.parseToplevelFunction = e.isDiscreteDistribution = e.isToplevelDistribution = e.isToplevelFunction = e.isStats = e.isTTest = e.isVisualization = e.isHistogram = e.isDotPlot = e.isBoxPlot = e.isPointOrPointList = e.isPointList = e.isSinglePoint = e.isPolar = e.isParametric = e.isRegression = e.isInequality = e.isPolygon = e.hasSlider = e.isNonemptyAction = e.getParametricDomainMax = e.getParametricDomainMin = e.getPolarDomainMax = e.getPolarDomainMin = e.hasDomain = e.areAllVisibilityPropsOff = e.setHidden = e.isDraggableAndHidden = e.hasEditableLabel = e.getEditableLabelMode = e.setEditableLabelMode = e.setInteractiveLabel = e.setSuppressTextOutline = e.setLabelOrientation = e.setLabelAngle = e.setLabelSize = e.setLineStyle = e.setLines = e.setPointStyle = e.setPoints = e.setDragMode = e.setLabelDropdownOpen = e.setColorLatex = e.setLineWidth = e.setPointSize = e.setPointOpacity = e.setLineOpacity = e.setFillOpacity = e.setFill = e.setColor = e.setLogMode = e.setParametricDomainMax = e.setPolarDomainMax = e.setParametricDomainMin = e.setPolarDomainMin = e.setShowLabel = e.setLabel = e.setEvaluationAsFraction = e.shouldEvaluationDisplayAsFraction = e.setSliderAnimationPeriod = e.setSliderStep = e.setSliderDragging = e.setSliderLoopMode = e.setLatex = e.commitSliderSoftLimits = e.setSliderIsPlaying = e.setSliderMax = e.setSliderMin = e.restoreState = e.onControllerUpdate = e.shouldBlockActionUpdate = e.isTransient = e.getAssignment = e.eachLatex = e.updateCachedParsableState = e.initModel = e.updateCachedUndoRedoState = e.setIsDraggingOnGrapher = e.updateCachedViewState = e.getState = e.isDomainMaxValid = e.isDomainMinValid = e.getDomainMax = e.getDomainMin = e.isSliderStepValid = e.isSliderMaxValid = e.isSliderMinValid = e.needsDotplotXMode = e.isClickableObject = e.setClickableInfoRuleLatex = e.setClickableInfoProp = e.setVizProp = e.getVizProp = e.isVizPropValid = e.isSliderAtEndOfPlayOnce = e.getSliderValue = e.getRawSliderValue = e.getSliderStep = e.getSliderMax = e.getSliderMin = e.getDisplaySliderMax = e.getDisplaySliderMin = e.getDisplayLatex = e.updateDisplayLatex = e.computeShouldGraph = e.onFormulaUpdate = e.getMissingVariables = e.tickSliderStep = e.adjustSliderByDraggingThumb = e.adjustSliderByKeyboard = e.adjustSliderByMovablePoint = e.updateReconciledDragMode = e.isEmpty = e.computeNewSliderLatex = e.getStatsResults = e.getTTestResults = e.getEvaluationValue = e.shouldShowEvaluation = e.isGraphable = e.isRationalizableConstant = e.EvaluationLabelOptions = void 0,
    e.EvaluationLabelOptions = {
        smallCutoff: 1e-6,
        bigCutoff: 1e9,
        digits: 12
    },
    e.isRationalizableConstant = h,
    e.isGraphable = function(e) {
        return !(!e.formula || !e.formula.is_graphable)
    }
    ,
    e.shouldShowEvaluation = y,
    e.getEvaluationValue = function(e) {
        var i = e.formula;
        return y(e) ? i.zero_values && i.zero_values.length ? i.zero_values[0].val : i.rgb_value ? i.rgb_value : i.constant_value : h(e) ? e.formula.constant_value : NaN
    }
    ,
    e.getTTestResults = function(e) {
        var i = e.formula.ttest_results;
        if (i && isFinite(i.lessThan))
            return {
                lessThan: i.lessThan,
                greaterThan: i.greaterThan,
                notEqual: i.notEqual
            }
    }
    ,
    e.getStatsResults = function(e) {
        var i = e.formula.stats_results;
        if (i && isFinite(i.min))
            return {
                min: i.min,
                q1: i.q1,
                median: i.median,
                q3: i.q3,
                max: i.max
            }
    }
    ,
    e.computeNewSliderLatex = P,
    e.isEmpty = function(e) {
        return "" === ((e.latex || "") + (e.label || "")).split(" ").join("")
    }
    ,
    e.updateReconciledDragMode = T,
    e.adjustSliderByMovablePoint = function(e, i) {
        if (e.sliderExists) {
            e.slider.isPlaying && q(e, !1);
            var a = E(e, i, {
                ignoreSoftLimits: !0
            });
            e.latex = P(e.latex, a)
        }
    }
    ,
    e.adjustSliderByKeyboard = function(e, i, a) {
        if (e.sliderExists) {
            e.slider.isPlaying && q(e, !1),
            B(e);
            var t = function(e, i, a) {
                if (void 0 === a && (a = {}),
                !e.sliderExists)
                    return NaN;
                var t = z(e)
                  , r = O(e)
                  , n = w(e)
                  , l = C(e);
                void 0 === a.overwriteStep && (a.overwriteStep = l || (n - r) / 20);
                var o = 0;
                switch (i) {
                case "min":
                    return E(e, r);
                case "max":
                    return E(e, n);
                case "up":
                    o = 1;
                    break;
                case "down":
                    o = -1;
                    break;
                case "bigup":
                    o = 5;
                    break;
                case "bigdown":
                    o = -5;
                    break;
                default:
                    return i
                }
                for (var s = t, d = 0; d < 20; d++) {
                    var u = d / 3 * a.overwriteStep
                      , c = t;
                    if (o > 0)
                        (t = E(e, s + u, a)) > c && (o -= 1);
                    else {
                        if (!(o < 0))
                            break;
                        (t = E(e, s - u, a)) < c && (o += 1)
                    }
                }
                return t
            }(e, i, a);
            e.latex = P(e.latex, t)
        }
    }
    ,
    e.adjustSliderByDraggingThumb = function(e, i) {
        if (e.sliderExists) {
            e.slider.isPlaying && q(e, !1);
            var a = E(e, i);
            e.latex = P(e.latex, a)
        }
    }
    ,
    e.tickSliderStep = function(e, i) {
        if (e.sliderExists && !e.resetSliderAnimationTargetValue) {
            var a = e.sliderLastTickTime;
            if (e.sliderLastTickTime = i,
            void 0 !== a) {
                var r = i - a
                  , n = O(e)
                  , l = w(e)
                  , o = C(e)
                  , d = e.slider.animationPeriod
                  , u = e.slider.loopMode;
                if (isNaN(e.sliderAnimationTargetValue)) {
                    var c = z(e);
                    isNaN(c) || (e.sliderAnimationTargetValue = c)
                }
                var f, p, m = o ? o / 2 : 0;
                if (u === t.SliderLoopMode.LOOP_FORWARD_REVERSE)
                    e.sliderAnimationTargetValue >= l ? j(e, {
                        playDirection: -1
                    }) : e.sliderAnimationTargetValue <= n && j(e, {
                        playDirection: 1
                    });
                else if (u === t.SliderLoopMode.LOOP_FORWARD)
                    j(e, {
                        playDirection: 1
                    }),
                    e.sliderAnimationTargetValue >= l + m && (e.sliderAnimationTargetValue = n - m);
                else if (u === t.SliderLoopMode.PLAY_ONCE)
                    j(e, {
                        playDirection: 1
                    });
                else {
                    if (u !== t.SliderLoopMode.PLAY_INDEFINITELY)
                        throw new Error("Unexpected slider loop mode: " + u);
                    j(e, {
                        playDirection: 1
                    })
                }
                if (isFinite(r) || (r = 0),
                u === t.SliderLoopMode.PLAY_INDEFINITELY)
                    f = r / (d / 4),
                    o && (f *= o),
                    e.sliderAnimationTargetValue += f,
                    p = e.sliderAnimationTargetValue,
                    o || (p = s.shortestDecimalBetween(p - .1 * f, p + .1 * f)),
                    p = E(e, p, {
                        ignoreSoftLimits: !0
                    }),
                    e.latex = P(e.latex, p);
                else {
                    if (f = (l - n) * (r = Math.min(r, d / 10)) / d,
                    e.sliderAnimationTargetValue += f * e.slider.playDirection,
                    e.sliderAnimationTargetValue = Math.max(n - m, Math.min(l + m, e.sliderAnimationTargetValue)),
                    p = e.sliderAnimationTargetValue,
                    !o) {
                        var g = f / r * (1e3 / 60);
                        p = s.shortestDecimalBetween(p - .1 * g, p + .1 * g)
                    }
                    p = E(e, p),
                    e.latex = P(e.latex, p)
                }
            }
        }
    }
    ,
    e.getMissingVariables = function(e) {
        var i = e.formula;
        return i ? i.is_single_identifier ? [] : i.variables || [] : []
    }
    ,
    e.onFormulaUpdate = function(e, i) {
        e.formula = i,
        e.error = i.error,
        e.unresolved = !1,
        i.is_slider ? e.sliderExists && !e.resetSliderAnimationTargetValue || (e.sliderAnimationTargetValue = z(e),
        e.sliderDragging = !1,
        e.sliderExists = !0) : e.sliderExists = !1,
        e.resetSliderAnimationTargetValue = !1;
        var a = {};
        i.is_regression && (a = i.regression.parameters,
        e.residualVariable = i.regression.residualVariable,
        e.controller.areLogModeRegressionsForced() && (e.isLogModeRegression = !0)),
        p.isEqual(e.regressionParameters, a) || (e.regressionParameters = a)
    }
    ,
    e.computeShouldGraph = F,
    e.updateDisplayLatex = V,
    e.getDisplayLatex = function(e) {
        return e.cachedDisplayLatex.valueLatex
    }
    ,
    e.getDisplaySliderMin = function(e) {
        return e.slider.hardMin ? e.slider.min : A(O(e))
    }
    ,
    e.getDisplaySliderMax = function(e) {
        return e.slider.hardMax ? e.slider.max : A(w(e))
    }
    ,
    e.getSliderMin = O,
    e.getSliderMax = w,
    e.getSliderStep = C,
    e.getRawSliderValue = N,
    e.getSliderValue = z,
    e.isSliderAtEndOfPlayOnce = function(e) {
        return e.slider.loopMode === t.SliderLoopMode.PLAY_ONCE && z(e) >= w(e)
    }
    ,
    e.isVizPropValid = function(e, i) {
        return !!e.formula.viz_valids && !!e.formula.viz_valids[i]
    }
    ,
    e.getVizProp = function(e, i) {
        return e.vizProps[i]
    }
    ,
    e.setVizProp = function(e, a, t) {
        var r;
        e.vizProps = i.__assign(i.__assign({}, e.vizProps), ((r = {})[a] = t,
        r))
    }
    ,
    e.setClickableInfoProp = function(e, a, t) {
        var r;
        e.clickableInfo = i.__assign(i.__assign({}, e.clickableInfo), ((r = {})[a] = t,
        r))
    }
    ,
    e.setClickableInfoRuleLatex = function(e, a) {
        e.clickableInfo = i.__assign(i.__assign({}, e.clickableInfo), {
            latex: a
        })
    }
    ,
    e.isClickableObject = function(e) {
        return e.clickableInfo.enabled && ne(e) && e.formula.click_handler && "maybe-valid" === e.formula.click_handler.status
    }
    ,
    e.needsDotplotXMode = function(e) {
        return !!e.__workerNeedsDotplotXMode
    }
    ,
    e.isSliderMinValid = function(e) {
        return !(!e.formula || !e.formula.slider_min_valid)
    }
    ,
    e.isSliderMaxValid = function(e) {
        return !(!e.formula || !e.formula.slider_max_valid)
    }
    ,
    e.isSliderStepValid = function(e) {
        return !(!e.formula || !e.formula.slider_step_valid)
    }
    ,
    e.getDomainMin = function(e) {
        if (!e.formula)
            return NaN;
        if (isFinite(e.__workerSampledDomainMin))
            return e.__workerSampledDomainMin;
        var i = e.formula.domain_min_number;
        return isFinite(i) ? i : NaN
    }
    ,
    e.getDomainMax = function(e) {
        if (!e.formula)
            return NaN;
        if (isFinite(e.__workerSampledDomainMax))
            return e.__workerSampledDomainMax;
        var i = e.formula.domain_max_number;
        return isFinite(i) ? i : NaN
    }
    ,
    e.isDomainMinValid = function(e) {
        return !(!e.formula || !e.formula.domain_min_valid)
    }
    ,
    e.isDomainMaxValid = function(e) {
        return !(!e.formula || !e.formula.domain_max_valid)
    }
    ,
    e.getState = function(e, a) {
        var t = e.cachedViewState;
        if (a.stripDefaults && "" === e.parametricDomain.min && "" === e.parametricDomain.max || (t = i.__assign(i.__assign({}, t), {
            domain: {
                min: "" === e.parametricDomain.min ? "0" : e.parametricDomain.min,
                max: "" === e.parametricDomain.max ? "1" : e.parametricDomain.max
            }
        })),
        a.stripDefaults)
            return _.stripDefaults(t);
        if (void 0 === t.points || void 0 === t.lines || void 0 === t.fill) {
            var r = d.default(t);
            return void 0 === r.points && delete r.points,
            void 0 === r.lines && delete r.lines,
            void 0 === r.fill && delete r.fill,
            r
        }
        return t
    }
    ,
    e.updateCachedViewState = I,
    e.setIsDraggingOnGrapher = function(e, i) {
        i && B(e),
        e.draggingOnGraphpaper = i
    }
    ,
    e.updateCachedUndoRedoState = k,
    e.initModel = function(e, a) {
        var t = d.default(_.inflateDefaults(e))
          , r = t.color;
        return r && v.default(r) || (r = a.getNextColor()),
        i.__assign(i.__assign(i.__assign({}, t), c.DEFAULTS(a)), {
            labelDropdownOpen: !1,
            formula: {
                error: void 0,
                operator: "=",
                variables: []
            },
            error: void 0,
            unresolved: !1,
            color: r,
            pointStyle: t.pointStyle,
            lineStyle: t.lineStyle,
            displayEvaluationAsFraction: t.displayEvaluationAsFraction,
            shouldGraph: void 0,
            sliderDragging: void 0,
            sliderAnimationTargetValue: void 0,
            resetSliderAnimationTargetValue: !1,
            sliderLastTickTime: void 0,
            draggingOnGraphpaper: !1,
            cachedUndoRedoDiffState: void 0,
            cachedUndoRedoFullState: void 0,
            cachedParsableState: void 0,
            cachedViewState: void 0,
            cachedDisplayLatex: {
                storedLatex: "",
                valueLatex: ""
            }
        })
    }
    ,
    e.updateCachedParsableState = R,
    e.eachLatex = function(e, i) {
        i(e.latex, "latex"),
        i(e.lineWidth, "lineWidth"),
        i(e.fillOpacity, "fillOpacity"),
        i(e.lineOpacity, "lineOpacity"),
        i(e.pointOpacity, "pointOpacity"),
        i(e.pointSize, "pointSize"),
        i(e.labelAngle, "labelAngle"),
        i(e.labelSize, "labelSize"),
        K(e) && (i(e.parametricDomain.min, "parametricDomainMin"),
        i(e.parametricDomain.max, "parametricDomainMax")),
        $(e) && (i(e.polarDomain.min, "polarDomainMin"),
        i(e.polarDomain.max, "polarDomainMax")),
        e.sliderExists && (i(e.slider.min, "sliderMin"),
        i(e.slider.max, "sliderMax"),
        i(e.slider.step, "sliderStep")),
        e.residualVariable && i(e.residualVariable, "residualVariable")
    }
    ,
    e.getAssignment = function(e) {
        return e.formula && e.formula.assignment
    }
    ,
    e.isTransient = U,
    e.shouldBlockActionUpdate = function(e) {
        return !(!e.sliderExists || !e.sliderDragging) || !!e.draggingOnGraphpaper
    }
    ,
    e.onControllerUpdate = function(e) {
        U(e) ? e.preTransientState || (e.preTransientState = {
            latex: e.latex,
            slider: {
                min: e.slider.min,
                max: e.slider.max,
                playDirection: e.slider.playDirection
            }
        }) : delete e.preTransientState,
        e.sliderExists && e.slider.isPlaying || (e.sliderLastTickTime = void 0),
        c.updateIsHiddenFromUI(e),
        F(e),
        T(e),
        I(e),
        k(e),
        R(e),
        V(e)
    }
    ;
    var G = i.__assign({
        id: !1,
        type: !1,
        color: !0,
        folderId: !0,
        latex: !0,
        showLabel: !0,
        label: !0,
        hidden: !0,
        secret: !0,
        points: !0,
        lines: !0,
        lineStyle: !0,
        pointStyle: !0,
        fill: !0,
        dragMode: !0,
        labelSize: !0,
        labelOrientation: !0,
        suppressTextOutline: !0,
        interactiveLabel: !0,
        editableLabelMode: !0,
        residualVariable: !0,
        regressionParameters: !0,
        isLogModeRegression: !0,
        displayEvaluationAsFraction: !0,
        slider: !0
    }, u.makeTrueMap(_.DEFAULTS_DYNAMIC));
    function j(e, a) {
        e.slider = i.__assign(i.__assign({}, e.slider), a)
    }
    function q(e, i) {
        e && (e.slider.isPlaying !== i && (j(e, {
            isPlaying: i
        }),
        i && (B(e),
        e.sliderAnimationTargetValue = z(e))))
    }
    function B(e) {
        if (!e.slider.hardMin) {
            var i = x.default(O(e));
            i !== e.slider.min && j(e, {
                min: i
            })
        }
        if (!e.slider.hardMax) {
            var a = x.default(w(e));
            a !== e.slider.max && j(e, {
                max: a
            })
        }
    }
    function W(e) {
        return e.displayEvaluationAsFraction
    }
    function Y(e, i) {
        e.interactiveLabel = i
    }
    function H(e) {
        if (X(e))
            return !1;
        var i = e.points
          , a = e.lines
          , t = e.fill
          , r = m.getReconciledExpressionProps(e.formula.expression_type, {
            points: i,
            lines: a,
            fill: t
        });
        return !r.points && !r.lines && !r.fill
    }
    function X(e) {
        return !!e.formula.is_inequality
    }
    function K(e) {
        return e.formula.expression_type === m.ExpressionType.PARAMETRIC
    }
    function $(e) {
        return e.formula.expression_type === m.ExpressionType.POLAR
    }
    function J(e) {
        var i = ie(e);
        return !(!i || "visualization" !== i.type || "boxplot" !== i.symbol)
    }
    function Q(e) {
        var i = ie(e);
        return !(!i || "visualization" !== i.type || "dotplot" !== i.symbol)
    }
    function Z(e) {
        var i = ie(e);
        return !(!i || "visualization" !== i.type || "histogram" !== i.symbol)
    }
    function ee(e) {
        var i = ie(e);
        return !(!i || "distribution" !== i.type)
    }
    function ie(e) {
        if (e.controller.areDistributionsEnabled() && e.latex)
            return e.cachedParseToplevelFunction && e.cachedParseToplevelFunction.latex === e.latex || (e.cachedParseToplevelFunction = {
                latex: e.latex,
                spec: D.parseToplevelFunction(e.latex)
            }),
            e.cachedParseToplevelFunction.spec
    }
    function ae(e) {
        return te(e) && ee(e)
    }
    function te(e) {
        return !!e.formula.expression_type
    }
    function re(e) {
        return !!e.formula.is_concrete_list
    }
    function ne(e) {
        return !!m.isClickableExpressionType(e.formula.expression_type) && (!e.reconciledDragMode || e.reconciledDragMode === a.DragMode.NONE)
    }
    e.restoreState = function(e, i) {
        u.copyProperties({
            from: i,
            to: e,
            props: G
        }),
        e.resetSliderAnimationTargetValue = !0,
        e.sliderAnimationTargetValue = void 0
    }
    ,
    e.setSliderMin = function(e, i) {
        j(e, i ? {
            hardMin: !0,
            min: i
        } : {
            hardMin: !1,
            min: "-10"
        })
    }
    ,
    e.setSliderMax = function(e, i) {
        j(e, i ? {
            hardMax: !0,
            max: i
        } : {
            hardMax: !1,
            max: "10"
        })
    }
    ,
    e.setSliderIsPlaying = q,
    e.commitSliderSoftLimits = B,
    e.setLatex = function(e, i) {
        var a = M.extractSliderValueFromLatex(i);
        if (isFinite(a)) {
            var t = b.determineWhichLimitsAreCompatibleWithValue({
                target: a,
                step: C(e),
                hardMin: e.slider.hardMin ? O(e) : void 0,
                hardMax: e.slider.hardMax ? w(e) : void 0
            });
            t.min || j(e, {
                hardMin: !1,
                min: "-10"
            }),
            t.max || j(e, {
                hardMax: !1,
                max: "10"
            }),
            t.step || j(e, {
                step: ""
            })
        }
        e.latex = i
    }
    ,
    e.setSliderLoopMode = function(e, i) {
        j(e, {
            loopMode: i,
            playDirection: 1
        }),
        i === t.SliderLoopMode.PLAY_INDEFINITELY && j(e, {
            hardMin: !1,
            hardMax: !1,
            min: "",
            max: ""
        }),
        e.sliderAnimationTargetValue = O(e)
    }
    ,
    e.setSliderDragging = function(e, i) {
        i && B(e),
        e.sliderDragging = i
    }
    ,
    e.setSliderStep = function(e, i) {
        j(e, {
            step: i
        })
    }
    ,
    e.setSliderAnimationPeriod = function(e, i) {
        j(e, {
            animationPeriod: i
        })
    }
    ,
    e.shouldEvaluationDisplayAsFraction = W,
    e.setEvaluationAsFraction = function(e, i) {
        e.displayEvaluationAsFraction = i
    }
    ,
    e.setLabel = function(e, i) {
        e.label = i
    }
    ,
    e.setShowLabel = function(e, i) {
        e.showLabel = i
    }
    ,
    e.setPolarDomainMin = function(e, a) {
        e.polarDomain = i.__assign(i.__assign({}, e.polarDomain), {
            min: a
        })
    }
    ,
    e.setParametricDomainMin = function(e, a) {
        e.parametricDomain = i.__assign(i.__assign({}, e.parametricDomain), {
            min: a
        })
    }
    ,
    e.setPolarDomainMax = function(e, a) {
        e.polarDomain = i.__assign(i.__assign({}, e.polarDomain), {
            max: a
        })
    }
    ,
    e.setParametricDomainMax = function(e, a) {
        e.parametricDomain = i.__assign(i.__assign({}, e.parametricDomain), {
            max: a
        })
    }
    ,
    e.setLogMode = function(e, i) {
        e.isLogModeRegression = i
    }
    ,
    e.setColor = function(e, i) {
        v.default(i) && (e.color = i,
        e.colorLatex = "")
    }
    ,
    e.setFill = function(e, i) {
        e.fill = i
    }
    ,
    e.setFillOpacity = function(e, i) {
        e.fillOpacity !== i && (e.fillOpacity = i)
    }
    ,
    e.setLineOpacity = function(e, i) {
        e.lineOpacity !== i && (e.lineOpacity = i)
    }
    ,
    e.setPointOpacity = function(e, i) {
        e.pointOpacity !== i && (e.pointOpacity = i)
    }
    ,
    e.setPointSize = function(e, i) {
        e.pointSize !== i && (e.pointSize = i)
    }
    ,
    e.setLineWidth = function(e, i) {
        e.lineWidth !== i && (e.lineWidth = i)
    }
    ,
    e.setColorLatex = function(e, i) {
        e.colorLatex !== i && (e.colorLatex = i)
    }
    ,
    e.setLabelDropdownOpen = function(e, i) {
        e.labelDropdownOpen = i
    }
    ,
    e.setDragMode = function(e, i) {
        e.dragMode !== i && (e.dragMode = i)
    }
    ,
    e.setPoints = function(e, i) {
        e.points = i
    }
    ,
    e.setPointStyle = function(e, i) {
        e.pointStyle !== i && (e.pointStyle = i,
        i !== r.PointStyle.POINT && (e.dragMode = a.DragMode.NONE))
    }
    ,
    e.setLines = function(e, i) {
        e.lines = i
    }
    ,
    e.setLineStyle = function(e, i) {
        e.lineStyle !== i && (e.lineStyle = i)
    }
    ,
    e.setLabelSize = function(e, i) {
        e.labelSize = i
    }
    ,
    e.setLabelAngle = function(e, i) {
        e.labelAngle = i
    }
    ,
    e.setLabelOrientation = function(e, i) {
        e.labelOrientation = i
    }
    ,
    e.setSuppressTextOutline = function(e, i) {
        e.suppressTextOutline = i
    }
    ,
    e.setInteractiveLabel = Y,
    e.setEditableLabelMode = function(e, i) {
        e.editableLabelMode = i
    }
    ,
    e.getEditableLabelMode = function(e) {
        return e.editableLabelMode
    }
    ,
    e.hasEditableLabel = function(e) {
        var i = e.editableLabelMode;
        return i === _.EditableLabelMode.Math || i === _.EditableLabelMode.Text
    }
    ,
    e.isDraggableAndHidden = function(e) {
        return !(e.reconciledDragMode === a.DragMode.NONE || !e.hidden)
    }
    ,
    e.setHidden = function(e, i) {
        e.hidden = i,
        !i && H(e) && (e.lines = e.points = e.fill = void 0)
    }
    ,
    e.areAllVisibilityPropsOff = H,
    e.hasDomain = function(e) {
        return K(e) || $(e)
    }
    ,
    e.getPolarDomainMin = function(e) {
        return e.polarDomain.min
    }
    ,
    e.getPolarDomainMax = function(e) {
        return e.polarDomain.max
    }
    ,
    e.getParametricDomainMin = function(e) {
        return e.parametricDomain.min
    }
    ,
    e.getParametricDomainMax = function(e) {
        return e.parametricDomain.max
    }
    ,
    e.isNonemptyAction = function(e) {
        return !!e.formula.action_value && Object.keys(e.formula.action_value).length > 0
    }
    ,
    e.hasSlider = function(e) {
        return !!e.sliderExists
    }
    ,
    e.isPolygon = function(e) {
        return e.formula.expression_type === m.ExpressionType.POLYGON
    }
    ,
    e.isInequality = X,
    e.isRegression = function(e) {
        return !!e.formula.is_regression
    }
    ,
    e.isParametric = K,
    e.isPolar = $,
    e.isSinglePoint = function(e) {
        return e.formula.expression_type === m.ExpressionType.SINGLE_POINT
    }
    ,
    e.isPointList = function(e) {
        return e.formula.expression_type === m.ExpressionType.POINT_LIST
    }
    ,
    e.isPointOrPointList = function(e) {
        return e.formula.expression_type === m.ExpressionType.POINT_LIST || e.formula.expression_type === m.ExpressionType.SINGLE_POINT
    }
    ,
    e.isBoxPlot = J,
    e.isDotPlot = Q,
    e.isHistogram = Z,
    e.isVisualization = function(e) {
        return J(e) || Q(e) || Z(e)
    }
    ,
    e.isTTest = function(e) {
        return e.formula.expression_type === m.ExpressionType.TTEST
    }
    ,
    e.isStats = function(e) {
        return e.formula.expression_type === m.ExpressionType.STATS
    }
    ,
    e.isToplevelFunction = function(e) {
        return !!ie(e)
    }
    ,
    e.isToplevelDistribution = ee,
    e.isDiscreteDistribution = function(e) {
        var i = e.formula;
        return !!i && !!i.is_discrete_distribution
    }
    ,
    e.parseToplevelFunction = ie,
    e.shouldShowCDFCheckbox = ae,
    e.isPrimaryLatexValid = te,
    e.isListValuedDistribution = re,
    e.shouldShowCDFFooter = function(e) {
        return !!ae(e) && (!re(e) && e.cdf.show)
    }
    ,
    e.getCDFMin = function(e) {
        return e.cdf.min
    }
    ,
    e.getCDFMax = function(e) {
        return e.cdf.max
    }
    ,
    e.getCDFMinPlaceholder = function(e) {
        var i = L(e.formula.cdf_min_default);
        return i === -1 / 0 ? "-\\infty" : isFinite(i) ? i + "" : "-\\infty"
    }
    ,
    e.getCDFMaxPlaceholder = function(e) {
        var i = L(e.formula.cdf_max_default);
        return i === 1 / 0 ? "\\infty" : isFinite(i) ? i + "" : "\\infty"
    }
    ,
    e.setShowCDF = function(e, a) {
        e.cdf = i.__assign(i.__assign({}, e.cdf), {
            show: a
        })
    }
    ,
    e.setCDFMin = function(e, a) {
        e.cdf = i.__assign(i.__assign({}, e.cdf), {
            min: a
        })
    }
    ,
    e.setCDFMax = function(e, a) {
        e.cdf = i.__assign(i.__assign({}, e.cdf), {
            max: a
        })
    }
    ,
    e.isCDFMinValid = function(e) {
        return !!e.formula && !1 !== e.formula.cdf_min_valid
    }
    ,
    e.isCDFMaxValid = function(e) {
        return !!e.formula && !1 !== e.formula.cdf_max_valid
    }
    ,
    e.isFillOpacityValid = function(e) {
        return !!e.formula && !1 !== e.formula.fill_opacity_valid
    }
    ,
    e.isLineOpacityValid = function(e) {
        return !!e.formula && !1 !== e.formula.line_opacity_valid
    }
    ,
    e.isPointOpacityValid = function(e) {
        return !!e.formula && !1 !== e.formula.point_opacity_valid
    }
    ,
    e.isLabelSizeValid = function(e) {
        return !!e.formula && !1 !== e.formula.label_size_valid
    }
    ,
    e.isLabelAngleValid = function(e) {
        return !!e.formula && !1 !== e.formula.label_angle_valid
    }
    ,
    e.isPointSizeValid = function(e) {
        return !!e.formula && !1 !== e.formula.point_size_valid
    }
    ,
    e.isLineWidthValid = function(e) {
        return !!e.formula && !1 !== e.formula.line_width_valid
    }
    ,
    e.isColorLatexValid = function(e) {
        return !!e.formula && !1 !== e.formula.color_latex_valid
    }
    ,
    e.getColorLatexValue = function(e) {
        return e.formula && e.formula.color_latex_value
    }
    ,
    e.getLabelAngleValue = function(e) {
        return e.formula && e.formula.label_angle_value
    }
    ,
    e.getCDFEvaluation = function(e) {
        var i = e.formula && e.formula.cdf_evaluation;
        return isFinite(i) ? i : 0
    }
    ,
    e.isClickableAllowed = ne,
    e.blankOutExpressionAfterClearingLatex = function(e) {
        e.showLabel = _.DEFAULTS.showLabel,
        e.label = _.DEFAULTS.label,
        e.hidden = _.DEFAULTS.hidden,
        e.dragMode = _.DEFAULTS.dragMode,
        e.fill = _.DEFAULTS.fill,
        e.points = _.DEFAULTS.points,
        e.pointStyle = _.DEFAULTS.pointStyle,
        e.lines = _.DEFAULTS.lines,
        e.lineStyle = _.DEFAULTS.lineStyle,
        e.slider = _.SLIDER_DEFAULTS,
        e.latex = "",
        e.labelSize = n.LabelSize.MEDIUM,
        e.labelOrientation = l.LabelOrientation.DEFAULT,
        e.displayEvaluationAsFraction = _.DEFAULTS.displayEvaluationAsFraction,
        e.suppressTextOutline = !1,
        e.interactiveLabel = !1,
        e.editableLabelMode = _.DEFAULTS.editableLabelMode,
        u.copyAllProperties(_.DEFAULTS_DYNAMIC, e)
    }
    ,
    e.isPotentiallyMovable = function(e) {
        return !!e.formula.move_strategy
    }
});
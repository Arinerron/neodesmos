define('expressions/expression-icon-view', ["require", "exports", "tslib", "dcgview", "core/lib/dragmode", "core/types/styles", "core/math/comparators", "graphing-calc/models/abstract-item", "core/math/expression-types", "graphing-calc/models/expression", "../dcgview-helpers/tooltipped-error", "./play-pause-icon-view", "./circular-icon-view", "main/manage-focus-helper", "./action-icon-view", "jquery.handleevent"], function(require, e, o, t, i, r, n, l, s, a, d, c, p, h, u) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var g = t.Components.SwitchUnion
      , m = "#000"
      , f = "#fff"
      , y = function(e) {
        function y() {
            return null !== e && e.apply(this, arguments) || this
        }
        return o.__extends(y, e),
        y.prototype.init = function() {
            this.model = this.props.model(),
            this.controller = this.props.controller()
        }
        ,
        y.prototype.template = function() {
            var e = this;
            return t.createElement("div", {
                class: t.const("dcg-expression-icon-container")
            }, g(this.bindFn(this.getIconMode), {
                error: function() {
                    return t.createElement(d.TooltippedError, {
                        error: e.bindFn(e.getErrorMsg),
                        isWhite: function() {
                            return e.controller.isItemSelected(e.model.id) || e.controller.isItemBeingDragged(e.model.id)
                        },
                        gravity: e.const("se")
                    })
                },
                none: function() {
                    return t.createElement("span", null)
                },
                slider: function() {
                    return t.createElement(c.PlayPauseIconView, {
                        controller: e.props.controller,
                        model: e.props.model
                    })
                },
                action: function() {
                    return t.createElement(u.ActionIconView, {
                        controller: e.props.controller,
                        model: e.props.model
                    })
                },
                icon: function() {
                    return t.createElement("div", {
                        class: t.const("dcg-circular-icon-container"),
                        role: t.const("button"),
                        tabindex: t.const("0"),
                        "model-id": function() {
                            return e.model.id
                        },
                        "aria-label": e.bindFn(e.getIconAriaLabel),
                        onTap: function(o) {
                            if (!o.wasHandled("dragdrop") && !o.wasLongheld())
                                return e.myOptionsOpen() ? e.toggleOptions(o) : !e.controller.isInEditListMode() && !o.shiftKey || e.isFraction() ? e.isFraction() ? e.onToggleFractionDisplay() : void e.toggleGraphShown() : e.toggleOptions(o)
                        },
                        onLongHold: function(o) {
                            o.handle("dcg-longhold"),
                            o.handle("dcg-tap"),
                            e.isFraction() || e.toggleOptions(o)
                        },
                        manageFocus: e.const(h.manageFocusHelper({
                            controller: e.controller,
                            location: {
                                type: "expression-icon",
                                id: e.model.id
                            }
                        }))
                    }, t.createElement(p.CircularIconView, {
                        iconType: e.bindFn(e.getIconType),
                        backgroundColor: e.bindFn(e.getBackgroundColor),
                        whiteIcon: e.bindFn(e.isSelected),
                        foregroundColor: e.bindFn(e.getForegroundColor),
                        iconModifier: e.bindFn(e.getIconModifier)
                    }))
                }
            }))
        }
        ,
        y.prototype.getErrorMsg = function() {
            return this.colorError() ? this.controller.s("shared-calculator-error-color-not-assigned") : this.controller.unpack(this.model.error)
        }
        ,
        y.prototype.myOptionsOpen = function() {
            var e = this.controller.getOpenItemMenu();
            return !!e && e.model === this.model
        }
        ,
        y.prototype.toggleOptions = function(e) {
            this.controller.dispatch({
                type: "toggle-item-settings-menu",
                menu: {
                    type: "expression",
                    model: this.model,
                    focusFirstOption: "keyboard" === e.device
                }
            })
        }
        ,
        y.prototype.isSelected = function() {
            return this.controller.isItemSelected(this.model.id) || this.controller.isItemBeingDragged(this.model.id)
        }
        ,
        y.prototype.isFraction = function() {
            return this.controller.canDisplayEvaluationForItemAsFraction(this.model.id)
        }
        ,
        y.prototype.getIconMode = function() {
            return this.hasError() ? "error" : this.controller.getGraphSettings().config.graphpaper ? a.isGraphable(this.model) ? "icon" : this.hasSlider() ? "slider" : this.isFraction() ? "icon" : this.isNonemptyAction() ? "action" : "none" : "none"
        }
        ,
        y.prototype.toggleGraphShown = function() {
            this.controller.dispatch({
                type: "toggle-item-hidden",
                id: this.model.id
            })
        }
        ,
        y.prototype.colorError = function() {
            return !!this.model.formula.rgb_value && !this.model.formula.assignment
        }
        ,
        y.prototype.hasError = function() {
            return !!this.colorError() || !!this.model.error && !a.isEmpty(this.model) && "none" === this.controller.getBrailleMode()
        }
        ,
        y.prototype.hasSlider = function() {
            return !!this.model.sliderExists
        }
        ,
        y.prototype.isNonemptyAction = function() {
            return a.isNonemptyAction(this.model)
        }
        ,
        y.prototype.getDisplayProps = function() {
            var e = this.model
              , o = e.points
              , t = e.lines
              , i = e.fill;
            return s.getReconciledExpressionProps(this.model.formula.expression_type, {
                points: o,
                lines: t,
                fill: i
            })
        }
        ,
        y.prototype.getBackgroundColor = function() {
            if (!this.isFraction())
                return l.getMaybeGradientDisplayColor(this.model);
            var e = this.isSelected();
            return this.controller.shouldEvaluationForItemDisplayAsFraction(this.model.id) ? e ? f : m : ""
        }
        ,
        y.prototype.getForegroundColor = function() {
            if (!this.isFraction())
                return "";
            var e = this.isSelected();
            return e !== this.controller.shouldEvaluationForItemDisplayAsFraction(this.model.id) ? f : e ? "#6399cb" : m
        }
        ,
        y.prototype.onToggleFractionDisplay = function() {
            this.controller.dispatch({
                type: "toggle-fraction-evaluation",
                id: this.model.id
            })
        }
        ,
        y.prototype.getIconModifier = function() {
            return a.isBoxPlot(this.model) && "y" === a.getVizProp(this.model, "alignedAxis") ? "rotated" : "none"
        }
        ,
        y.prototype.getIconType = function() {
            if (this.isFraction())
                return "fraction";
            if (!this.model.shouldGraph)
                return "hidden";
            if (this.controller.isInEditListMode())
                return "none";
            var e = this.model.pointStyle
              , o = this.model.lineStyle
              , t = this.getDisplayProps()
              , l = this.model.formula;
            if (a.isBoxPlot(this.model))
                return "boxplot";
            if (a.isDotPlot(this.model)) {
                if ("POINT" === this.model.pointStyle)
                    return "dotplot-default";
                if ("CROSS" === this.model.pointStyle)
                    return "dotplot-cross";
                if ("OPEN" === this.model.pointStyle)
                    return "dotplot-open"
            }
            if (a.isHistogram(this.model))
                return "histogram";
            if (a.isToplevelDistribution(this.model))
                return a.shouldShowCDFFooter(this.model) ? "filled-distribution" : "unfilled-distribution";
            if (this.model.reconciledDragMode === i.DragMode.X)
                return "movable-horizontal";
            if (this.model.reconciledDragMode === i.DragMode.Y)
                return "movable-vertical";
            if (this.model.reconciledDragMode === i.DragMode.XY)
                return "movable-both";
            if (a.isPointOrPointList(this.model))
                return a.isSinglePoint(this.model) ? e === r.PointStyle.OPEN ? "point-open" : e === r.PointStyle.CROSS ? "point-cross" : "point-default" : t.lines && t.points ? "table-points-and-lines" : t.lines ? "table-lines" : "table-points";
            var s = this.getDisplayProps().fill;
            if (a.isPolygon(this.model))
                return s ? t.lines ? o === r.LineStyle.DASHED ? "polygon-dashed-filled" : o === r.LineStyle.DOTTED ? "polygon-dotted-filled" : "polygon-default-filled" : "polygon-none-filled" : t.lines ? o === r.LineStyle.DASHED ? "polygon-dashed" : o === r.LineStyle.DOTTED ? "polygon-dotted" : "polygon-default" : "none";
            if (a.isParametric(this.model))
                return s ? t.lines ? o === r.LineStyle.DASHED ? "parametric-dashed-filled" : o === r.LineStyle.DOTTED ? "parametric-dotted-filled" : "parametric-default-filled" : "parametric-none-filled" : t.lines ? o === r.LineStyle.DASHED ? "graph-dashed" : o === r.LineStyle.DOTTED ? "graph-dotted" : "graph-default" : "none";
            var d = l.operator
              , c = 0 !== n.table[d].direction
              , p = !1 === n.table[d].inclusive;
            return l.is_shade_between || !p && c ? "shaded-inequality" : p && !c ? "inequality" : p && c ? "shaded-inequality" : o === r.LineStyle.DASHED ? "graph-dashed" : o === r.LineStyle.DOTTED ? "graph-dotted" : "graph-default"
        }
        ,
        y.prototype.getIconAriaLabel = function() {
            return this.isFraction() ? a.shouldEvaluationDisplayAsFraction(this.model) ? this.controller.s("shared-calculator-narration-display-as-decimal") : this.controller.s("shared-calculator-narration-display-as-fraction") : this.myOptionsOpen() ? this.controller.s("graphing-calculator-narration-hide-options") : this.controller.isInEditListMode() ? this.controller.s("graphing-calculator-narration-show-options") : this.model.hidden ? this.controller.s("graphing-calculator-narration-show-expression") : this.controller.s("graphing-calculator-narration-hide-expression")
        }
        ,
        y
    }(t.Class);
    e.default = y
});

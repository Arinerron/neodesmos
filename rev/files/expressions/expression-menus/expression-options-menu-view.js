
define('expressions/expression-menus/expression-options-menu-view', ["require", "exports", "tslib", "dcgview", "lib/aria", "jquery", "./lines", "./colors-only", "./fill", "./clickable", "./points", "./label", "./drag", "graphing-calc/models/expression", "core/math/expression-types", "core/lib/dragmode", "loadcss!./expression-options-menu-view"], function(require, e, i, n, t, s, o, r, l, c, a, p, u, d, h, m) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.ExpressionOptionsMenuView = void 0;
    var f = n.Components
      , g = f.For
      , O = f.If
      , b = function(e) {
        function f() {
            return null !== e && e.apply(this, arguments) || this
        }
        return i.__extends(f, e),
        f.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id,
            this.props.registerRepositionCb(this.bindFn(this.renderOffset))
        }
        ,
        f.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: function() {
                    return {
                        "dcg-expressions-options-menu": !0,
                        "dcg-options-menu": !0
                    }
                },
                role: n.const("group"),
                "aria-label": function() {
                    return e.controller.s("graphing-calculator-narration-options-menu")
                },
                didMount: this.bindFn(this.didMountContainer)
            }, n.createElement(g, {
                each: this.bindFn(this.getSections)
            }, n.createElement("div", null, function(t) {
                switch (t) {
                case "points":
                    return n.createElement(a.PointsMenu, i.__assign({}, e.props, {
                        isOpen: function() {
                            return e.isSectionOpen("points")
                        },
                        isFirstOpenSection: function() {
                            return e.isFirstOpenSection("points")
                        }
                    }));
                case "label":
                    return n.createElement(p.LabelMenu, i.__assign({}, e.props, {
                        isOpen: function() {
                            return e.isSectionOpen("label")
                        },
                        isFirstOpenSection: function() {
                            return e.isFirstOpenSection("label")
                        }
                    }));
                case "drag":
                    return n.createElement(u.DragMenu, i.__assign({}, e.props, {
                        isOpen: function() {
                            return e.isSectionOpen("drag")
                        },
                        isFirstOpenSection: function() {
                            return e.isFirstOpenSection("drag")
                        }
                    }));
                case "lines":
                    return n.createElement(o.LineMenu, i.__assign({}, e.props, {
                        isOpen: function() {
                            return e.isSectionOpen("lines")
                        },
                        isFirstOpenSection: function() {
                            return e.isFirstOpenSection("lines")
                        }
                    }));
                case "fill":
                    return n.createElement(l.FillMenu, i.__assign({}, e.props, {
                        isOpen: function() {
                            return e.isSectionOpen("fill")
                        },
                        isFirstOpenSection: function() {
                            return e.isFirstOpenSection("fill")
                        }
                    }));
                case "colors-only":
                    return n.createElement(r.ColorsOnlyMenu, i.__assign({}, e.props, {
                        isOpen: e.const(!0),
                        isFirstOpenSection: e.const(!0)
                    }))
                }
            })), n.createElement(O, {
                predicate: this.bindFn(this.isClickable)
            }, function() {
                return n.createElement(c.ClickableMenu, i.__assign({}, e.props, {
                    isOpen: function() {
                        return !!e.model.clickableInfo.enabled
                    },
                    isFirstOpenSection: e.const(!1)
                }))
            }), n.createElement("div", {
                class: n.const("dcg-triangle"),
                didMount: this.bindFn(this.didMountArrow)
            }))
        }
        ,
        f.prototype.willUnmount = function() {
            t.alert(this.controller.s("graphing-calculator-narration-options-menu-closed"))
        }
        ,
        f.prototype.didMountContainer = function(e) {
            this.$containerElt = s(e),
            t.alert(this.controller.s("graphing-calculator-narration-options-menu-open"))
        }
        ,
        f.prototype.didMountArrow = function(e) {
            this.$arrowElt = s(e)
        }
        ,
        f.prototype.renderOffset = function(e) {
            if (this.$containerElt && this.$arrowElt) {
                var i = this.$containerElt.outerHeight()
                  , n = 0;
                i > e && (n = +e - i);
                var t = -n < i - 38;
                this.$containerElt.css("margin-top", n + "px"),
                this.$arrowElt.css("margin-top", -n + "px"),
                this.$arrowElt.css("display", t ? "" : "none")
            }
        }
        ,
        f.prototype.isClickable = function() {
            return this.controller.areActionsEnabled() && d.isClickableAllowed(this.model)
        }
        ,
        f.prototype.getSections = function() {
            return d.isHistogram(this.model) || d.isBoxPlot(this.model) || d.isRegression(this.model) || d.isDiscreteDistribution(this.model) ? ["colors-only"] : d.isToplevelDistribution(this.model) ? ["lines"] : d.isDotPlot(this.model) ? ["points"] : d.isPointList(this.model) ? ["points", "label", "lines"] : d.isSinglePoint(this.model) ? this.model.formula.move_strategy ? ["points", "label", "drag"] : ["points", "label"] : d.isParametric(this.model) || d.isPolygon(this.model) ? ["lines", "fill"] : d.isInequality(this.model) ? d.isPolar(this.model) ? ["lines"] : ["lines", "fill"] : ["lines"]
        }
        ,
        f.prototype.isFirstOpenSection = function(e) {
            for (var i = 0, n = this.getSections(); i < n.length; i++) {
                var t = n[i];
                if (t === e)
                    return this.isSectionOpen(e);
                if (this.isSectionOpen(t))
                    return !1
            }
            return !1
        }
        ,
        f.prototype.isSectionOpen = function(e) {
            var i = this.model
              , n = i.points
              , t = i.lines
              , s = i.fill
              , o = h.getReconciledExpressionProps(this.model.formula.expression_type, {
                points: n,
                lines: t,
                fill: s
            });
            switch (e) {
            case "lines":
                return !this.model.hidden && o.lines;
            case "label":
                return this.model.showLabel;
            case "fill":
                return !this.model.hidden && (!!d.isInequality(this.model) || o.fill);
            case "points":
                return !this.model.hidden && (d.isSinglePoint(this.model) ? !this.model.hidden : o.points);
            case "drag":
                return this.model.reconciledDragMode !== m.DragMode.NONE;
            case "colors-only":
                return !0
            }
        }
        ,
        f
    }(n.Class);
    e.ExpressionOptionsMenuView = b
});

define('expressions/expression-menus/label-orientation-view', ["require", "exports", "tslib", "dcgview", "core/types/label-orientations", "graphing-calc/models/expression", "loadcss!./label-orientation-view", "loadcss!toggle"], function(require, t, e, i, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.LabelOrientationView = void 0;
    var a = i.Components.For
      , r = [{
        orientation: n.LabelOrientation.DEFAULT,
        cssClass: "dcg-label-orientation-center",
        description: "graphing-calculator-text-label-orientation-default"
    }, {
        orientation: n.LabelOrientation.ABOVE,
        cssClass: "dcg-label-orientation-above",
        description: "graphing-calculator-text-label-orientation-above"
    }, {
        orientation: n.LabelOrientation.ABOVE_RIGHT,
        cssClass: "dcg-label-orientation-above-right",
        description: "graphing-calculator-text-label-orientation-above-right"
    }, {
        orientation: n.LabelOrientation.RIGHT,
        cssClass: "dcg-label-orientation-right",
        description: "graphing-calculator-text-label-orientation-right"
    }, {
        orientation: n.LabelOrientation.BELOW_RIGHT,
        cssClass: "dcg-label-orientation-below-right",
        description: "graphing-calculator-text-label-orientation-below-right"
    }, {
        orientation: n.LabelOrientation.BELOW,
        cssClass: "dcg-label-orientation-below",
        description: "graphing-calculator-text-label-orientation-below"
    }, {
        orientation: n.LabelOrientation.BELOW_LEFT,
        cssClass: "dcg-label-orientation-below-left",
        description: "graphing-calculator-text-label-orientation-below-left"
    }, {
        orientation: n.LabelOrientation.LEFT,
        cssClass: "dcg-label-orientation-left",
        description: "graphing-calculator-text-label-orientation-left"
    }, {
        orientation: n.LabelOrientation.ABOVE_LEFT,
        cssClass: "dcg-label-orientation-above-left",
        description: "graphing-calculator-text-label-orientation-above-left"
    }]
      , l = function(t) {
        function l() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(l, t),
        l.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id
        }
        ,
        l.prototype.template = function() {
            var t = this;
            return i.createElement("div", {
                class: i.const("dcg-label-orientation-view"),
                style: function() {
                    return "transform: rotate(" + t.getCSSRotationValue() + ");"
                }
            }, i.createElement("span", {
                class: i.const("dcg-vertical-orientation-indicator")
            }), i.createElement(a, {
                each: function() {
                    return r
                },
                key: function(t) {
                    return t.orientation
                }
            }, i.createElement("div", {
                class: i.const("dcg-label-orientations"),
                role: i.const("radiogroup"),
                "aria-label": function() {
                    return t.controller.s("graphing-calculator-heading-label-orientation")
                }
            }, function(e) {
                return i.createElement("div", {
                    class: function() {
                        var i;
                        return (i = {})[e.cssClass] = !0,
                        i["dcg-orientation-option"] = !0,
                        i["dcg-selected"] = t.isSelected(e.orientation),
                        i["dcg-orientation-disabled"] = t.isDisabled(e.orientation),
                        i
                    },
                    role: i.const("radio"),
                    tabindex: i.const("0"),
                    "aria-label": function() {
                        return t.controller.s(e.description)
                    },
                    "aria-checked": function() {
                        return t.getOrientation() === e.orientation
                    },
                    onTap: function() {
                        return t.onTapOrientation(e.orientation)
                    }
                }, i.createElement("i", {
                    class: function() {
                        return {
                            "dcg-icon-chevron-left": e.orientation !== n.LabelOrientation.DEFAULT
                        }
                    }
                }))
            })))
        }
        ,
        l.prototype.isDisabled = function(t) {
            return t === n.LabelOrientation.DEFAULT && (!!this.isPointVisible() || this.model.labelOrientation === n.LabelOrientation.DEFAULT)
        }
        ,
        l.prototype.isSelected = function(t) {
            return t === n.LabelOrientation.DEFAULT && t === this.model.labelOrientation ? !this.isPointVisible() : t === this.model.labelOrientation
        }
        ,
        l.prototype.isPointVisible = function() {
            return !this.model.hidden && (o.isSinglePoint(this.model) ? !this.model.hidden : this.model.points)
        }
        ,
        l.prototype.getCSSRotationValue = function() {
            var t = o.getLabelAngleValue(this.model);
            return (Array.isArray(t) ? 0 : t) + "rad"
        }
        ,
        l.prototype.getOrientation = function() {
            return this.props.model().labelOrientation
        }
        ,
        l.prototype.onTapOrientation = function(t) {
            t === this.getOrientation() && (t = n.LabelOrientation.DEFAULT),
            this.controller.dispatch({
                type: "set-item-label-orientation",
                id: this.id,
                labelOrientation: t
            })
        }
        ,
        l
    }(i.Class);
    t.LabelOrientationView = l
});
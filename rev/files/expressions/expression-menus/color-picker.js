define('expressions/expression-menus/color-picker', ["require", "exports", "lib/color-distance", "tslib", "dcgview", "underscore", "expressions/colors", "../../lib/mathspeak", "./color-swatch", "../../shared-components/tooltip", "dcgview-helpers/static-mathquill-view", "loadcss!./color-picker"], function(require, e, t, n, o, r, c, s, l, i, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.ColorPicker = void 0;
    var u = o.Components
      , d = u.For
      , p = u.If
      , m = function(e) {
        function u() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(u, e),
        u.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id
        }
        ,
        u.prototype.template = function() {
            var e = this;
            return o.createElement("div", {
                class: o.const("dcg-color-picker-container")
            }, o.createElement(d, {
                each: function() {
                    return r.values(e.controller.getColors())
                }
            }, o.createElement("span", {
                class: o.const("dcg-color-picker-menu dcg-do-not-blur")
            }, function(t) {
                return o.createElement("span", {
                    class: o.const("dcg-color-tile"),
                    handleevent: o.const("true"),
                    role: o.const("button"),
                    tabindex: o.const(0),
                    "aria-label": function() {
                        return c.getColorName(e.controller, t)
                    },
                    "aria-pressed": function() {
                        return e.isSelected(t)
                    },
                    onTap: function() {
                        return e.props.onColorSelected(t)
                    }
                }, o.createElement("span", {
                    class: o.const("dcg-color-swatch"),
                    style: function() {
                        return {
                            background: t
                        }
                    }
                }), o.createElement(p, {
                    predicate: function() {
                        return e.isSelected(t)
                    }
                }, function() {
                    return o.createElement("i", {
                        class: o.const("dcg-icon-check")
                    })
                }))
            })), o.createElement(p, {
                predicate: function() {
                    return e.getUniqueCustomColors().length > 0
                }
            }, function() {
                return o.createElement(d, {
                    each: e.bindFn(e.getUniqueCustomColors),
                    key: function(e) {
                        return "string" == typeof e ? e : e.assignmentLatex
                    }
                }, o.createElement("span", {
                    class: o.const("dcg-color-picker-menu dcg-do-not-blur")
                }, function(n) {
                    return "string" == typeof n ? o.createElement("span", {
                        class: o.const("dcg-color-picker-placeholder")
                    }) : o.createElement(i.Tooltip, {
                        tooltip: function() {
                            return n.assignmentLatex
                        },
                        renderAsLatex: function() {
                            return {
                                view: function(t) {
                                    return o.createElement(a.default, {
                                        config: e.const({}),
                                        latex: function() {
                                            return t
                                        }
                                    })
                                }
                            }
                        }
                    }, o.createElement("span", {
                        class: function() {
                            return {
                                "dcg-color-tile": !0,
                                "dcg-light-color": t.isLightColor(e.controller.getColorById(n.id))
                            }
                        },
                        handleevent: o.const("true"),
                        role: o.const("button"),
                        tabindex: o.const(0),
                        "aria-label": function() {
                            return s.getMathspeakFromText(n.assignmentLatex)
                        },
                        "aria-pressed": function() {
                            return e.model.colorLatex === n.assignmentLatex
                        },
                        onTap: function() {
                            return e.props.onCustomColorSelected(n.assignmentLatex)
                        }
                    }, o.createElement(l.ColorSwatch, {
                        color: function() {
                            return e.controller.getColorById(n.id)
                        }
                    }), o.createElement(p, {
                        predicate: function() {
                            return e.model.colorLatex === n.assignmentLatex
                        }
                    }, function() {
                        return o.createElement("i", {
                            class: o.const("dcg-icon-check")
                        })
                    })))
                }))
            }))
        }
        ,
        u.prototype.isSelected = function(e) {
            if (this.model.colorLatex && r.pluck(this.getUniqueCustomColors(), "assignmentLatex").indexOf(this.model.colorLatex) >= 0)
                return !1;
            return this.props.selectedColor() === e
        }
        ,
        u.prototype.getUniqueCustomColors = function() {
            if (this.props.hideCustomColors && this.props.hideCustomColors())
                return [];
            for (var e = this.controller.getAllColorAssignments(), t = r.countBy(e, function(e) {
                return e.assignmentLatex
            }), n = r.filter(e, function(e) {
                return 1 === t[e.assignmentLatex]
            }), o = 0; o < n.length % 6; o++)
                n.push("placholder-" + o);
            return n
        }
        ,
        u
    }(o.Class);
    e.ColorPicker = m
});
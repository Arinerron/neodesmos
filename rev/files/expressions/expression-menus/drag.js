define('expressions/expression-menus/drag', ["require", "exports", "tslib", "./base-menu-section", "dcgview", "underscore", "expressions/toggle-view", "core/lib/dragmode", "../circular-icon-view"], function(require, e, t, r, o, n, i, a, c) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.DragMenu = void 0;
    var d = o.Components
      , l = d.If
      , s = d.For
      , g = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.template = function() {
            var e = this;
            return o.createElement("div", {
                class: o.const("dcg-options-menu-section")
            }, o.createElement("div", {
                class: o.const("dcg-options-menu-section-title")
            }, function() {
                return e.controller.s("graphing-calculator-heading-drag")
            }, o.createElement(i.ToggleView, {
                ariaLabel: function() {
                    return e.controller.s("graphing-calculator-narration-menu-drag-enabled")
                },
                toggled: this.props.isOpen,
                onChange: this.bindFn(this.toggleDragEnabled)
            })), o.createElement(l, {
                predicate: this.props.isOpen
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-options-menu-content")
                }, o.createElement(s, {
                    each: function() {
                        return [a.DragMode.X, a.DragMode.Y, a.DragMode.XY]
                    }
                }, o.createElement("div", {
                    class: o.const("dcg-style-icons"),
                    role: o.const("radiogroup")
                }, function(t) {
                    return o.createElement("div", {
                        class: function() {
                            return {
                                "dcg-style-icon-container": !0,
                                "dcg-disabled": e.isDisabled(t)
                            }
                        },
                        onTap: function() {
                            return e.onDragModeSelected(t)
                        },
                        role: o.const("radio"),
                        tabindex: function() {
                            return e.isDisabled(t) ? -1 : 0
                        },
                        "aria-label": function() {
                            return "X" === t ? e.controller.s("graphing-calculator-narration-drag-mode-x") : "Y" === t ? e.controller.s("graphing-calculator-narration-drag-mode-y") : "XY" === t ? e.controller.s("graphing-calculator-narration-drag-mode-xy") : e.controller.raw("")
                        },
                        "aria-checked": function() {
                            return e.getDragMode() === t
                        }
                    }, o.createElement(c.CircularIconView, {
                        backgroundColor: function() {
                            return "#000"
                        },
                        semiTransparent: function() {
                            return e.getDragMode() !== t
                        },
                        iconType: function() {
                            return "X" === t ? "movable-horizontal" : "Y" === t ? "movable-vertical" : "movable-both"
                        }
                    }))
                })))
            }))
        }
        ,
        r.prototype.isDisabled = function(e) {
            var t = this.controller.getEnabledDragModesForItem(this.id);
            return !n.contains(t, e)
        }
        ,
        r.prototype.onDragModeSelected = function(e) {
            if ("expression" === this.model.type) {
                if (this.isDisabled(e))
                    return;
                this.controller.dispatch({
                    type: "set-item-dragmode",
                    id: this.id,
                    dragMode: e
                })
            } else {
                var t = this.model.id
                  , r = this.model.table.id;
                this.controller.dispatch({
                    type: "set-tablecolumn-dragmode",
                    tableId: r,
                    columnId: t,
                    dragMode: e
                })
            }
        }
        ,
        r.prototype.getDragMode = function() {
            return "expression" === this.model.type && this.model.reconciledDragMode || this.model.dragMode
        }
        ,
        r.prototype.toggleDragEnabled = function() {
            var e = this.getDragMode() !== a.DragMode.NONE ? a.DragMode.NONE : a.DragMode.XY;
            "expression" === this.model.type ? this.controller.dispatch({
                type: "set-item-dragmode",
                id: this.id,
                dragMode: e
            }) : this.onDragModeSelected(e)
        }
        ,
        r
    }(r.BaseMenuSection);
    e.DragMenu = g
});

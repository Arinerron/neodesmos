define('expressions/tables/table_icon_view', ["require", "exports", "tslib", "dcgview", "graphing-calc/models/abstract-item", "dcgview-helpers/tooltipped-error", "../circular-icon-view", "main/manage-focus-helper", "jquery.handleevent"], function(require, t, o, e, n, r, i, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = e.Components.SwitchUnion
      , c = function(t) {
        function c() {
            return null !== t && t.apply(this, arguments) || this
        }
        return o.__extends(c, t),
        c.prototype.init = function() {
            this.model = this.props.model(),
            this.controller = this.props.controller()
        }
        ,
        c.prototype.template = function() {
            var t = this;
            return e.createElement("div", {
                class: e.const("dcg-table-icon-container")
            }, s(this.bindFn(this.typeOfIcon), {
                error: function() {
                    return e.createElement(r.TooltippedError, {
                        error: function() {
                            return t.controller.unpack(t.model.error)
                        },
                        gravity: t.const("se")
                    })
                },
                none: function() {
                    return e.createElement("span", null)
                },
                icon: function() {
                    return e.createElement("div", {
                        class: e.const("dcg-circular-icon-container"),
                        role: e.const("button"),
                        tabindex: e.const("0"),
                        "aria-label": t.bindFn(t.getIconAriaLabel),
                        handleevent: e.const("true"),
                        "model-id": function() {
                            return t.model.id
                        },
                        onTap: function(o) {
                            if (!o.wasHandled("dragdrop") && !o.wasLongheld())
                                return t.myOptionsOpen() || t.controller.isInEditListMode() || o.shiftKey ? t.toggleOptions() : void t.toggleGraphShown()
                        },
                        onLongHold: function(o) {
                            o.handle("dcg-longhold"),
                            o.handle("dcg-tap"),
                            t.toggleOptions()
                        },
                        manageFocus: t.const(l.manageFocusHelper({
                            controller: t.controller,
                            location: {
                                type: "table-icon",
                                id: t.model.table.id,
                                columnId: t.model.id
                            }
                        }))
                    }, e.createElement(i.CircularIconView, {
                        iconType: t.bindFn(t.getIcon),
                        backgroundColor: t.bindFn(t.getModelColor)
                    }))
                }
            }))
        }
        ,
        c.prototype.getModelColor = function() {
            return n.getMaybeGradientDisplayColor(this.model)
        }
        ,
        c.prototype.myOptionsOpen = function() {
            var t = this.controller.getOpenItemMenu();
            return !!t && t.model === this.model
        }
        ,
        c.prototype.toggleOptions = function() {
            this.controller.dispatch({
                type: "toggle-item-settings-menu",
                menu: {
                    type: "table-column",
                    model: this.model,
                    focusFirstOption: !1
                }
            })
        }
        ,
        c.prototype.toggleGraphShown = function() {
            this.controller.dispatch({
                type: "toggle-tablecolumn-hidden",
                tableId: this.model.table.id,
                columnId: this.model.id
            })
        }
        ,
        c.prototype.hasError = function() {
            return !!this.model.error
        }
        ,
        c.prototype.getIcon = function() {
            return this.model.shouldGraph ? this.controller.isInEditListMode() ? "none" : this.model.points && this.model.lines ? "table-points-and-lines" : this.model.points && !this.model.lines ? "table-points" : !this.model.points && this.model.lines ? "table-lines" : "none" : "hidden"
        }
        ,
        c.prototype.typeOfIcon = function() {
            return "" === this.model.latex ? "none" : this.controller.getGraphSettings().config.graphpaper ? this.model.error ? "error" : 0 === this.model.index ? "none" : "icon" : "none"
        }
        ,
        c.prototype.getIconAriaLabel = function() {
            return this.myOptionsOpen() ? this.controller.s("graphing-calculator-narration-hide-options") : this.controller.isInEditListMode() ? this.controller.s("graphing-calculator-narration-show-options") : this.model.shouldGraph ? this.controller.s("graphing-calculator-narration-hide-table-column") : this.controller.s("graphing-calculator-narration-show-table-column")
        }
        ,
        c
    }(e.Class);
    t.default = c
});
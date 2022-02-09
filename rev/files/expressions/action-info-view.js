
define('expressions/action-info-view', ["require", "exports", "tslib", "dcgview", "main/mathquill-operators", "dcgview-helpers/static-mathquill-view", "graphing-calc/models/focus", "loadcss!./action-info-view"], function(require, t, e, n, o, i, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = function(t) {
        function c() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(c, t),
        c.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model()
        }
        ,
        c.prototype.template = function() {
            var t = this;
            return n.createElement("div", {
                class: n.const("dcg-action-info"),
                handleEvent: n.const("true")
            }, n.createElement("span", {
                class: n.const("dcg-action-label")
            }, n.const("Run ")), n.createElement(i.default, {
                latex: function() {
                    return t.model.clickableInfo.latex
                },
                config: this.bindFn(this.getMQConfig)
            }), n.createElement("span", {
                class: n.const("dcg-action-label")
            }, n.const(" on click")), n.createElement("span", {
                class: n.const("dcg-click-edit"),
                role: n.const("button"),
                tabindex: n.const("0"),
                "aria-label": function() {
                    return t.controller.s("graphing-calculator-narration-edit-action")
                },
                onTap: this.bindFn(this.editAction)
            }, n.createElement("i", {
                class: n.const("dcg-icon-pencil")
            })))
        }
        ,
        c.prototype.editAction = function() {
            s.setFocusLocation(this.controller, {
                type: "expression-menu",
                id: this.model.id,
                location: "updaterule"
            }),
            "expression" === this.model.type ? this.controller.dispatch({
                type: "toggle-item-settings-menu",
                menu: {
                    type: "expression",
                    model: this.model,
                    focusFirstOption: !1
                }
            }) : this.controller.dispatch({
                type: "toggle-item-settings-menu",
                menu: {
                    type: "image",
                    model: this.model,
                    focusFirstOption: !1
                }
            })
        }
        ,
        c.prototype.getMQConfig = function() {
            return {
                autoOperatorNames: o.getAutoOperators({
                    additionalOperators: ["index"]
                }),
                autoCommands: o.getAutoCommands()
            }
        }
        ,
        c
    }(n.Class);
    t.default = c
});

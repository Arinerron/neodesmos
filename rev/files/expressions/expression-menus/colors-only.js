
define('expressions/expression-menus/colors-only', ["require", "exports", "tslib", "./base-menu-section", "dcgview", "./color-picker", "graphing-calc/models/expression"], function(require, e, o, t, n, s, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.ColorsOnlyMenu = void 0;
    var r = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return o.__extends(t, e),
        t.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("dcg-options-menu-section")
            }, n.createElement(s.ColorPicker, o.__assign({}, this.props, {
                model: function() {
                    return e.model
                },
                selectedColor: this.bindFn(this.getModelColor),
                onColorSelected: this.bindFn(this.onColorSelected),
                onCustomColorSelected: this.bindFn(this.onCustomColorSelected),
                hideCustomColors: function() {
                    return "expression" === e.model.type && i.isRegression(e.model)
                }
            })))
        }
        ,
        t
    }(t.BaseMenuSection);
    e.ColorsOnlyMenu = r
});
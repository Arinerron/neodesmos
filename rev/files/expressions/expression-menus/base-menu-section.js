
define('expressions/expression-menus/base-menu-section', ["require", "exports", "tslib", "dcgview", "main/mathquill-operators", "graphing-calc/models/abstract-item"], function(require, t, e, o, i, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.BaseMenuSection = void 0;
    var s = function(t) {
        function o() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(o, t),
        o.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id
        }
        ,
        o.prototype.getMQConfig = function() {
            return {
                autoOperatorNames: i.getAutoOperators()
            }
        }
        ,
        o.prototype.getFocusedInput = function() {
            var t = this.controller.getFocusLocation()
              , e = "header" === this.model.type ? this.model.table.id : this.id;
            if (t && "expression-menu" === t.type && t.id === e)
                return t.location
        }
        ,
        o.prototype.handleFocusedChanged = function(t, e) {
            var o = "header" === this.model.type ? this.model.table.id : this.id;
            t ? this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "expression-menu",
                    id: o,
                    location: e
                }
            }) : this.controller.dispatch({
                type: "blur-focus-location",
                location: {
                    type: "expression-menu",
                    id: o,
                    location: e
                }
            })
        }
        ,
        o.prototype.onColorSelected = function(t) {
            "image" !== this.model.type && ("expression" === this.model.type ? this.controller.dispatch({
                type: "set-item-color",
                id: this.id,
                color: t
            }) : this.controller.dispatch({
                type: "set-tablecolumn-color",
                color: t,
                tableId: this.model.table.id,
                columnId: this.id
            }))
        }
        ,
        o.prototype.onCustomColorSelected = function(t) {
            "image" !== this.model.type && ("expression" === this.model.type ? this.controller.dispatch({
                type: "set-item-colorlatex",
                id: this.id,
                colorLatex: t
            }) : this.controller.dispatch({
                type: "set-tablecolumn-colorlatex",
                tableId: this.model.table.id,
                columnId: this.model.id,
                colorLatex: t
            }))
        }
        ,
        o.prototype.getModelColor = function() {
            return "image" === this.model.type ? "" : l.getDisplayColor(this.model)
        }
        ,
        o
    }(o.Class);
    t.BaseMenuSection = s
});

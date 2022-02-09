
define('expressions/new_expression_view', ["require", "exports", "tslib", "dcgview", "loadcss!new_expression"], function(require, e, t, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = function(e) {
        function s() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(s, e),
        s.prototype.template = function() {
            return this.controller = this.props.controller(),
            n.createElement("div", {
                class: n.const("dcg-expressionitem dcg-new-expression dcg-opened")
            }, n.createElement("div", {
                class: n.const("dcg-new-math-div dcg-do-not-blur dcg-action-newmath"),
                onTap: this.bindFn(this.newMath)
            }, n.createElement("div", {
                class: n.const("dcg-new-expression-fade")
            })), n.createElement("span", {
                class: n.const("dcg-tab")
            }, n.createElement("span", {
                class: n.const("dcg-num dcg-variable-index")
            }, this.bindFn(this.getIndex)), n.createElement("div", {
                class: n.const("dcg-tab-interior")
            })))
        }
        ,
        s.prototype.getIndex = function() {
            return this.controller.getNextDisplayIndex()
        }
        ,
        s.prototype.newMath = function() {
            this.controller.dispatch({
                type: "new-expression-at-end"
            })
        }
        ,
        s
    }(n.Class);
    e.default = s
});

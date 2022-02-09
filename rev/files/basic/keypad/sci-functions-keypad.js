
define('basic/keypad/sci-functions-keypad', ["require", "exports", "tslib", "dcgview", "basic/dcgview-basic", "keypad/keys", "keypad/keypad", "keypad/row"], function(require, e, t, i, s, n, l, c) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = i.Components.IfElse
      , a = function(e) {
        function s() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(s, e),
        s.prototype.template = function() {
            var e = this;
            return i.createElement("div", {
                class: i.const("dcg-sci-func-keypad")
            }, i.createElement(l.default, {
                controller: this.props.controller
            }, i.createElement(c.default, null, n.view(this, "sin"), n.view(this, "cos"), n.view(this, "tan"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), n.view(this, "a^b"), n.view(this, "sqrt"), n.view(this, "nthroot")), i.createElement(c.default, null, n.view(this, "arcsin"), n.view(this, "arccos"), n.view(this, "arctan"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), n.view(this, "e^x"), n.view(this, "abs"), r(function() {
                return e.controller.getReplaceRoundWithReciprocal()
            }, {
                true: function() {
                    return n.view(e, "a^{-1}")
                },
                false: function() {
                    return n.view(e, "round")
                }
            })), i.createElement(c.default, null, n.view(this, "mean"), n.view(this, "stdev"), n.view(this, "stdevp"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), n.view(this, "ln"), n.view(this, "log"), n.view(this, "backspace", {
                style: "highlight"
            })), i.createElement(c.default, null, n.view(this, "nPr"), n.view(this, "nCr"), n.view(this, "!"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), n.view(this, "e"), n.view(this, "pi"), n.view(this, "enter", {
                style: "blue"
            }))))
        }
        ,
        s
    }(s.DCGViewBasic);
    e.default = a
});
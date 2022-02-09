define('pillow-keypad/functions-keypad', ["require", "exports", "tslib", "dcgview", "keypad/keys", "keypad/keypad", "keypad/row", "./dcgview-pillow-keypad"], function(require, e, t, i, s, l, n, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = function(e) {
        function a() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(a, e),
        a.prototype.template = function() {
            return i.createElement(l.default, {
                controller: this.props.controller
            }, i.createElement(n.default, null, s.view(this, "sin"), s.view(this, "cos"), s.view(this, "tan"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), s.view(this, "ln"), s.view(this, "log"), s.view(this, "backspace", {
                style: "highlight"
            })), i.createElement(n.default, null, s.view(this, "arcsin"), s.view(this, "arccos"), s.view(this, "arctan"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), s.view(this, "e^x"), s.view(this, "abs"), s.view(this, "round")), i.createElement(n.default, null, s.view(this, "mean"), s.view(this, "stdev"), s.view(this, "stdevp"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), s.view(this, "a^b"), s.view(this, "sqrt"), s.view(this, "nthroot")), i.createElement(n.default, null, s.view(this, "nPr"), s.view(this, "nCr"), s.view(this, "!"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), s.view(this, "e"), s.view(this, "%"), s.view(this, "enter", {
                style: "blue"
            })))
        }
        ,
        a
    }(a.DCGViewPillowKeypad);
    e.default = r
});
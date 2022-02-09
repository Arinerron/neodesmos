
define('pillow-keypad/main-keypad', ["require", "exports", "tslib", "dcgview", "keypad/keys", "keypad/keypad", "keypad/row", "./dcgview-pillow-keypad"], function(require, e, t, i, l, h, s, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var c = function(e) {
        function a() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(a, e),
        a.prototype.template = function() {
            return i.createElement(h.default, {
                controller: this.props.controller
            }, i.createElement(s.default, null, l.view(this, "a^2"), l.view(this, "a^b"), l.view(this, "|a|"), l.view(this, "a/b"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), l.view(this, "7", {
                style: "highlight"
            }), l.view(this, "8", {
                style: "highlight"
            }), l.view(this, "9", {
                style: "highlight"
            }), l.view(this, "/"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), l.view(this, "x"), l.view(this, "y")), i.createElement(s.default, null, l.view(this, "("), l.view(this, ")"), l.view(this, "<"), l.view(this, ">"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), l.view(this, "4", {
                style: "highlight"
            }), l.view(this, "5", {
                style: "highlight"
            }), l.view(this, "6", {
                style: "highlight"
            }), l.view(this, "*"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), l.view(this, "left", {
                style: "highlight"
            }), l.view(this, "right", {
                style: "highlight"
            })), i.createElement(s.default, null, l.view(this, "sqrt"), l.view(this, ","), l.view(this, "<="), l.view(this, ">="), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), l.view(this, "1", {
                style: "highlight"
            }), l.view(this, "2", {
                style: "highlight"
            }), l.view(this, "3", {
                style: "highlight"
            }), l.view(this, "-"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), l.spacer(.5), l.view(this, "backspace", {
                style: "highlight",
                colspan: 1.5
            })), i.createElement(s.default, null, l.view(this, "nthroot"), l.view(this, "pi"), l.view(this, "%"), l.view(this, "a_b"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), l.view(this, "0", {
                style: "highlight"
            }), l.view(this, ".", {
                style: "highlight"
            }), l.view(this, "="), l.view(this, "+"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), l.view(this, "enter", {
                colspan: 2,
                style: "blue"
            })))
        }
        ,
        a
    }(a.DCGViewPillowKeypad);
    e.default = c
});
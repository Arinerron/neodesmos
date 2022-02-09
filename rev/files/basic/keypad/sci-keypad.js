define('basic/keypad/sci-keypad', ["require", "exports", "tslib", "dcgview", "basic/dcgview-basic", "keypad/keys", "keypad/keypad", "keypad/row"], function(require, e, t, i, l, s, h, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = i.Components.IfElse
      , c = function(e) {
        function l() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(l, e),
        l.prototype.template = function() {
            var e = this;
            return i.createElement(h.default, {
                controller: this.props.controller
            }, i.createElement(n.default, null, s.view(this, "a^2"), s.view(this, "a^b"), s.view(this, "|a|"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), s.view(this, "7", {
                style: "highlight"
            }), s.view(this, "8", {
                style: "highlight"
            }), s.view(this, "9", {
                style: "highlight"
            }), s.view(this, "division"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), s.view(this, "%"), s.view(this, "a/b")), i.createElement(n.default, null, s.view(this, "sqrt"), s.view(this, "nthroot"), s.view(this, "pi"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), s.view(this, "4", {
                style: "highlight"
            }), s.view(this, "5", {
                style: "highlight"
            }), s.view(this, "6", {
                style: "highlight"
            }), s.view(this, "multiplication"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), s.view(this, "left", {
                style: "highlight"
            }), s.view(this, "right", {
                style: "highlight"
            })), i.createElement(n.default, null, s.view(this, "sin"), s.view(this, "cos"), s.view(this, "tan"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), s.view(this, "1", {
                style: "highlight"
            }), s.view(this, "2", {
                style: "highlight"
            }), s.view(this, "3", {
                style: "highlight"
            }), s.view(this, "-"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), s.spacer(.5), s.view(this, "backspace", {
                style: "highlight",
                colspan: 1.5
            })), i.createElement(n.default, null, s.view(this, "("), s.view(this, ")"), a(function() {
                return e.controller.getReplaceCommaWith10Exp()
            }, {
                true: function() {
                    return s.view(e, "10^n")
                },
                false: function() {
                    return s.view(e, ",")
                }
            }), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), s.view(this, "0", {
                style: "highlight"
            }), s.view(this, ".", {
                style: "highlight"
            }), s.view(this, "ans"), s.view(this, "+"), i.createElement("div", {
                class: i.const("dcg-partition-placeholder")
            }), s.view(this, "enter", {
                style: "blue",
                colspan: 2
            })))
        }
        ,
        l
    }(l.DCGViewBasic);
    e.default = c
});
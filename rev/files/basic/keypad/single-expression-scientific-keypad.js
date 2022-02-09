define('basic/keypad/single-expression-scientific-keypad', ["require", "exports", "tslib", "dcgview", "basic/dcgview-basic", "keypad/keys", "keypad/keypad", "keypad/row"], function(require, e, i, t, s, l, h, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var c = function(e) {
        function s() {
            return null !== e && e.apply(this, arguments) || this
        }
        return i.__extends(s, e),
        s.prototype.template = function() {
            return t.createElement(h.default, {
                controller: this.props.controller
            }, t.createElement(a.default, null, l.view(this, "("), l.view(this, ")"), l.view(this, "x^2"), l.view(this, "sqrt"), t.createElement("div", {
                class: t.const("dcg-partition-placeholder")
            }), l.view(this, "x^3"), l.view(this, "x^y"), l.view(this, "ythroot")), t.createElement(a.default, null, l.view(this, "7", {
                style: "highlight"
            }), l.view(this, "8", {
                style: "highlight"
            }), l.view(this, "9", {
                style: "highlight"
            }), l.view(this, "division"), t.createElement("div", {
                class: t.const("dcg-partition-placeholder")
            }), l.view(this, "pi"), l.view(this, "e^x"), l.view(this, "!")), t.createElement(a.default, null, l.view(this, "4", {
                style: "highlight"
            }), l.view(this, "5", {
                style: "highlight"
            }), l.view(this, "6", {
                style: "highlight"
            }), l.view(this, "multiplication"), t.createElement("div", {
                class: t.const("dcg-partition-placeholder")
            }), l.view(this, "log"), l.view(this, "ln"), l.view(this, "|x|")), t.createElement(a.default, null, l.view(this, "1", {
                style: "highlight"
            }), l.view(this, "2", {
                style: "highlight"
            }), l.view(this, "3", {
                style: "highlight"
            }), l.view(this, "-"), t.createElement("div", {
                class: t.const("dcg-partition-placeholder")
            }), l.view(this, "sin"), l.view(this, "cos"), l.view(this, "tan")), t.createElement(a.default, null, l.view(this, "0", {
                style: "highlight"
            }), l.view(this, ".", {
                style: "highlight"
            }), l.view(this, "x/y"), l.view(this, "+"), t.createElement("div", {
                class: t.const("dcg-partition-placeholder")
            }), l.view(this, "arcsin"), l.view(this, "arccos"), l.view(this, "arctan")))
        }
        ,
        s
    }(s.DCGViewBasic);
    e.default = c
});
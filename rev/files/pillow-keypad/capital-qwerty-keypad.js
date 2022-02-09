define('pillow-keypad/capital-qwerty-keypad', ["require", "exports", "tslib", "dcgview", "./dcgview-pillow-keypad", "keypad/keys", "keypad/keypad", "keypad/row"], function(require, e, i, t, s, h, l, w) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var v = function(e) {
        function s() {
            return null !== e && e.apply(this, arguments) || this
        }
        return i.__extends(s, e),
        s.prototype.template = function() {
            return t.createElement(l.default, {
                controller: this.props.controller
            }, t.createElement(w.default, null, h.view(this, "Q"), h.view(this, "W"), h.view(this, "E"), h.view(this, "R"), h.view(this, "T"), h.view(this, "Y"), h.view(this, "U"), h.view(this, "I"), h.view(this, "O"), h.view(this, "P")), t.createElement(w.default, null, t.createElement("div", {
                class: t.const("dcg-half-width-placeholder")
            }), h.view(this, "A"), h.view(this, "S"), h.view(this, "D"), h.view(this, "F"), h.view(this, "G"), h.view(this, "H"), h.view(this, "J"), h.view(this, "K"), h.view(this, "L"), t.createElement("div", {
                class: t.const("dcg-half-width-placeholder")
            })), t.createElement(w.default, null, h.view(this, "shift", {
                style: "highlight"
            }), h.view(this, "Z"), h.view(this, "X"), h.view(this, "C"), h.view(this, "V"), h.view(this, "B"), h.view(this, "N"), h.view(this, "M"), h.view(this, ","), h.view(this, "backspace", {
                style: "highlight"
            })), t.createElement(w.default, null, h.view(this, "="), h.view(this, "("), h.view(this, ")"), h.view(this, "["), h.view(this, "]"), h.view(this, "!"), h.view(this, "'"), h.view(this, "obelus"), h.view(this, "enter", {
                style: "blue"
            })))
        }
        ,
        s
    }(s.DCGViewPillowKeypad);
    e.default = v
});

define('basic/keypad/sci-capital-letters-keypad', ["require", "exports", "tslib", "dcgview", "basic/dcgview-basic", "keypad/keys", "keypad/keypad", "keypad/row"], function(require, e, i, t, s, h, v, w) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = function(e) {
        function s() {
            return null !== e && e.apply(this, arguments) || this
        }
        return i.__extends(s, e),
        s.prototype.template = function() {
            return t.createElement(v.default, {
                controller: this.props.controller
            }, t.createElement(w.default, null, h.view(this, "A"), h.view(this, "B"), h.view(this, "C"), h.view(this, "D"), h.view(this, "E"), h.view(this, "F"), h.view(this, "G"), h.view(this, "H"), h.view(this, "I"), h.view(this, "J")), t.createElement(w.default, null, h.view(this, "K"), h.view(this, "L"), h.view(this, "M"), h.view(this, "N"), h.view(this, "O"), h.view(this, "P"), h.view(this, "Q"), h.view(this, "R"), h.view(this, "S"), h.view(this, "T")), t.createElement(w.default, null, h.view(this, "=", {
                style: "highlight"
            }), h.view(this, ","), h.view(this, "U"), h.view(this, "V"), h.view(this, "W"), h.view(this, "X"), h.view(this, "Y"), h.view(this, "Z"), h.view(this, "pi"), h.view(this, "backspace", {
                style: "highlight"
            })), t.createElement(w.default, null, h.view(this, "shift", {
                style: "highlight",
                colspan: 2
            }), h.view(this, "("), h.view(this, ")"), h.view(this, "["), h.view(this, "]"), h.view(this, "!"), h.view(this, "'"), h.view(this, "enter", {
                style: "blue",
                colspan: 2
            })))
        }
        ,
        s
    }(s.DCGViewBasic);
    e.default = l
});

define('basic/keypad/sci-qwerty-keypad', ["require", "exports", "tslib", "dcgview", "basic/dcgview-basic", "keypad/keys", "keypad/keypad", "keypad/row"], function(require, e, i, t, s, h, l, v) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var w = function(e) {
        function s() {
            return null !== e && e.apply(this, arguments) || this
        }
        return i.__extends(s, e),
        s.prototype.template = function() {
            return t.createElement(l.default, {
                controller: this.props.controller
            }, t.createElement(v.default, null, h.view(this, "q"), h.view(this, "w"), h.view(this, "e"), h.view(this, "r"), h.view(this, "t"), h.view(this, "y"), h.view(this, "u"), h.view(this, "i"), h.view(this, "o"), h.view(this, "p")), t.createElement(v.default, null, t.createElement("div", {
                class: t.const("dcg-half-width-placeholder")
            }), h.view(this, "a"), h.view(this, "s"), h.view(this, "d"), h.view(this, "f"), h.view(this, "g"), h.view(this, "h"), h.view(this, "j"), h.view(this, "k"), h.view(this, "l"), t.createElement("div", {
                class: t.const("dcg-half-width-placeholder")
            })), t.createElement(v.default, null, h.view(this, "=", {
                style: "highlight"
            }), h.view(this, "z"), h.view(this, "x"), h.view(this, "c"), h.view(this, "v"), h.view(this, "b"), h.view(this, "n"), h.view(this, "m"), h.view(this, ","), h.view(this, "backspace", {
                style: "highlight"
            })), t.createElement(v.default, null, h.view(this, "shift", {
                style: "highlight",
                colspan: 1.5
            }), h.view(this, "("), h.view(this, ")"), h.view(this, "["), h.view(this, "]"), h.view(this, "!"), h.view(this, "'"), h.view(this, "pi"), h.view(this, "enter", {
                style: "blue",
                colspan: 1.5
            })))
        }
        ,
        s
    }(s.DCGViewBasic);
    e.default = w
});
define('pillow-keypad/qwerty-keypad', ["require", "exports", "tslib", "dcgview", "keypad/keys", "keypad/keypad", "keypad/row", "./dcgview-pillow-keypad"], function(require, e, i, t, s, h, l, w) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var v = function(e) {
        function w() {
            return null !== e && e.apply(this, arguments) || this
        }
        return i.__extends(w, e),
        w.prototype.template = function() {
            return t.createElement(h.default, {
                controller: this.props.controller
            }, t.createElement(l.default, null, s.view(this, "q"), s.view(this, "w"), s.view(this, "e"), s.view(this, "r"), s.view(this, "t"), s.view(this, "y"), s.view(this, "u"), s.view(this, "i"), s.view(this, "o"), s.view(this, "p")), t.createElement(l.default, null, t.createElement("div", {
                class: t.const("dcg-half-width-placeholder")
            }), s.view(this, "a"), s.view(this, "s"), s.view(this, "d"), s.view(this, "f"), s.view(this, "g"), s.view(this, "h"), s.view(this, "j"), s.view(this, "k"), s.view(this, "l"), t.createElement("div", {
                class: t.const("dcg-half-width-placeholder")
            })), t.createElement(l.default, null, s.view(this, "shift", {
                style: "highlight"
            }), s.view(this, "z"), s.view(this, "x"), s.view(this, "c"), s.view(this, "v"), s.view(this, "b"), s.view(this, "n"), s.view(this, "m"), s.view(this, ":"), s.view(this, "backspace", {
                style: "highlight"
            })), t.createElement(l.default, null, s.view(this, "~"), s.view(this, "{"), s.view(this, "}"), s.view(this, "["), s.view(this, "]"), s.view(this, "!"), s.view(this, "'"), s.view(this, "obelus"), s.view(this, "enter", {
                style: "blue"
            })))
        }
        ,
        w
    }(w.DCGViewPillowKeypad);
    e.default = v
});
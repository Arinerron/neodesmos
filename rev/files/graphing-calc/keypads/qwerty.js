define('graphing-calc/keypads/qwerty', ["require", "exports", "tslib", "dcgview", "./dcgview-graphing", "keypad/keys", "keypad/keypad", "keypad/row"], function(require, e, i, t, s, h, l, v) {
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
            }, t.createElement(v.default, null, h.view(this, "q"), h.view(this, "w"), h.view(this, "e"), h.view(this, "r"), h.view(this, "t"), h.view(this, "y"), h.view(this, "u"), h.view(this, "i"), h.view(this, "o"), h.view(this, "p")), t.createElement(v.default, null, h.view(this, "a"), h.view(this, "s"), h.view(this, "d"), h.view(this, "f"), h.view(this, "g"), h.view(this, "h"), h.view(this, "j"), h.view(this, "k"), h.view(this, "l"), h.view(this, "theta")), t.createElement(v.default, null, h.view(this, "shift", {
                colspan: 1.364,
                style: "highlight"
            }), h.spacer(.136), h.view(this, "z"), h.view(this, "x"), h.view(this, "c"), h.view(this, "v"), h.view(this, "b"), h.view(this, "n"), h.view(this, "m"), h.spacer(.136), h.view(this, "backspace", {
                colspan: 1.364,
                style: "highlight"
            })), t.createElement(v.default, null, h.view(this, "123", {
                colspan: 1.818,
                style: "highlight"
            }), h.spacer(.182), h.view(this, "a_b"), h.view(this, "!%_left"), h.view(this, "[]_left"), h.view(this, "{}_left"), h.view(this, "~:_left"), h.view(this, ",'_left"), h.spacer(.182), h.view(this, "enter", {
                colspan: 1.818,
                style: "blue"
            })))
        }
        ,
        s
    }(s.default);
    e.default = w
});
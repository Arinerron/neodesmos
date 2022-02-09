
define('graphing-calc/keypads/letters', ["require", "exports", "tslib", "dcgview", "./dcgview-graphing", "keypad/keys", "keypad/keypad", "keypad/row"], function(require, e, i, t, s, h, l, v) {
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
            }, t.createElement(v.default, null, h.view(this, "a"), h.view(this, "b"), h.view(this, "c"), h.view(this, "d"), h.view(this, "e"), h.view(this, "f"), h.view(this, "g"), h.view(this, "h"), h.view(this, "i"), h.view(this, "j")), t.createElement(v.default, null, h.view(this, "k"), h.view(this, "l"), h.view(this, "m"), h.view(this, "n"), h.view(this, "o"), h.view(this, "p"), h.view(this, "q"), h.view(this, "r"), h.view(this, "s"), h.view(this, "t")), t.createElement(v.default, null, h.view(this, "shift", {
                style: "highlight"
            }), h.view(this, "u"), h.view(this, "v"), h.view(this, "w"), h.view(this, "x"), h.view(this, "y"), h.view(this, "z"), h.view(this, "theta"), h.view(this, "backspace", {
                colspan: 2,
                style: "highlight"
            })), t.createElement(v.default, null, h.view(this, "123", {
                colspan: 2,
                style: "highlight"
            }), h.view(this, "a_b"), h.view(this, "!%_left"), h.view(this, "[]_left"), h.view(this, "{}_left"), h.view(this, "~:_left"), h.view(this, ",'_left"), h.view(this, "enter", {
                colspan: 2,
                style: "blue"
            })))
        }
        ,
        s
    }(s.default);
    e.default = w
});
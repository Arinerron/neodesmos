define('graphing-calc/keypads/letters-capital', ["require", "exports", "tslib", "dcgview", "./dcgview-graphing", "keypad/keys", "keypad/keypad", "keypad/row"], function(require, e, i, t, s, h, l, v) {
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
            }, t.createElement(v.default, null, h.view(this, "A"), h.view(this, "B"), h.view(this, "C"), h.view(this, "D"), h.view(this, "E"), h.view(this, "F"), h.view(this, "G"), h.view(this, "H"), h.view(this, "I"), h.view(this, "J")), t.createElement(v.default, null, h.view(this, "K"), h.view(this, "L"), h.view(this, "M"), h.view(this, "N"), h.view(this, "O"), h.view(this, "P"), h.view(this, "Q"), h.view(this, "R"), h.view(this, "S"), h.view(this, "T")), t.createElement(v.default, null, h.view(this, "shift", {
                style: "highlight"
            }), h.view(this, "U"), h.view(this, "V"), h.view(this, "W"), h.view(this, "X"), h.view(this, "Y"), h.view(this, "Z"), h.view(this, "tau"), h.view(this, "backspace", {
                colspan: 2,
                style: "highlight"
            })), t.createElement(v.default, null, h.view(this, "123", {
                colspan: 2,
                style: "highlight"
            }), h.view(this, "a^b"), h.view(this, "!%_right"), h.view(this, "[]_right"), h.view(this, "{}_right"), h.view(this, "~:_right"), h.view(this, ",'_right"), h.view(this, "enter", {
                colspan: 2,
                style: "blue"
            })))
        }
        ,
        s
    }(s.default);
    e.default = w
});

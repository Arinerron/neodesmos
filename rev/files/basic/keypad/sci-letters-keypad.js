
define('basic/keypad/sci-letters-keypad', ["require", "exports", "tslib", "dcgview", "basic/dcgview-basic", "keypad/keys", "keypad/keypad", "keypad/row"], function(require, e, i, t, s, h, v, w) {
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
            }, t.createElement(w.default, null, h.view(this, "a"), h.view(this, "b"), h.view(this, "c"), h.view(this, "d"), h.view(this, "e"), h.view(this, "f"), h.view(this, "g"), h.view(this, "h"), h.view(this, "i"), h.view(this, "j")), t.createElement(w.default, null, h.view(this, "k"), h.view(this, "l"), h.view(this, "m"), h.view(this, "n"), h.view(this, "o"), h.view(this, "p"), h.view(this, "q"), h.view(this, "r"), h.view(this, "s"), h.view(this, "t")), t.createElement(w.default, null, h.view(this, "=", {
                style: "highlight"
            }), h.view(this, ","), h.view(this, "u"), h.view(this, "v"), h.view(this, "w"), h.view(this, "x"), h.view(this, "y"), h.view(this, "z"), h.view(this, "pi"), h.view(this, "backspace", {
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
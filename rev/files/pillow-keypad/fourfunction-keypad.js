define('pillow-keypad/fourfunction-keypad', ["require", "exports", "tslib", "dcgview", "keypad/keys", "keypad/keypad", "keypad/row", "./dcgview-pillow-keypad"], function(require, e, i, t, l, h, s, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = function(e) {
        function n() {
            return null !== e && e.apply(this, arguments) || this
        }
        return i.__extends(n, e),
        n.prototype.template = function() {
            var e = this;
            return t.createElement(h.default, {
                controller: this.props.controller
            }, t.createElement(s.default, null, l.view(this, "1", {
                style: "highlight"
            }), l.view(this, "2", {
                style: "highlight"
            }), l.view(this, "3", {
                style: "highlight"
            }), l.view(this, "4", {
                style: "highlight"
            }), l.view(this, "5", {
                style: "highlight"
            }), l.view(this, "6", {
                style: "highlight"
            }), l.view(this, "7", {
                style: "highlight"
            }), l.view(this, "8", {
                style: "highlight"
            }), l.view(this, "9", {
                style: "highlight"
            }), l.view(this, "0", {
                style: "highlight"
            }), t.createElement("div", {
                class: t.const("dcg-partition-placeholder")
            }), l.view(this, "left", {
                style: "highlight"
            }), l.view(this, "right", {
                style: "highlight"
            }), t.createElement("div", {
                class: t.const("dcg-inline-hide-keypad-button"),
                "dcg-command": t.const("hide-keypad"),
                onTap: function() {
                    return e.props.controller().dispatch({
                        type: "hide-keypad"
                    })
                }
            }, t.createElement("div", {
                class: t.const("dcg-inline-hide-keypad-button-inner")
            }, t.createElement("i", {
                class: t.const("dcg-icon-hide")
            })))), t.createElement(s.default, null, l.spacer(2), l.view(this, "."), l.view(this, "="), l.view(this, "+"), l.view(this, "-"), l.view(this, "multiplication"), l.view(this, "obelus"), l.spacer(3), l.view(this, "backspace", {
                style: "highlight",
                colspan: 1.5
            }), l.spacer(1)), t.createElement(s.default, null, l.spacer(2), l.view(this, "a/b"), l.view(this, ","), l.view(this, "("), l.view(this, ")"), l.view(this, "<"), l.view(this, ">"), l.spacer(2.5), l.view(this, "enter", {
                colspan: 2,
                style: "blue"
            }), l.spacer(1)))
        }
        ,
        n
    }(n.DCGViewPillowKeypad);
    e.default = a
});
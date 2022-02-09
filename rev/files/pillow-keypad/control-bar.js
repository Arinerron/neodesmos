define('pillow-keypad/control-bar', ["require", "exports", "tslib", "dcgview", "keypad/control-bar", "keypad/control-btn", "./dcgview-pillow-keypad"], function(require, t, e, n, c, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = function(t) {
        function o() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(o, t),
        o.prototype.template = function() {
            var t = this.props.controller();
            return n.createElement(c.default, {
                controller: this.props.controller
            }, n.createElement(r.default, {
                command: this.const("main"),
                selected: function() {
                    return "main" === t.getScientificKeyboardMode()
                },
                ignoreInTabOrder: this.const(!0),
                selectable: this.const(!0),
                onTap: function() {
                    return t.dispatch({
                        type: "main"
                    })
                }
            }, function() {
                return t.s("basic-calculator-button-controlbar-main")
            }), n.createElement(r.default, {
                command: this.const("ABC"),
                selected: function() {
                    return -1 !== ["qwerty", "capitalQwerty"].indexOf(t.getScientificKeyboardMode())
                },
                ignoreInTabOrder: this.const(!0),
                selectable: this.const(!0),
                ariaLabel: function() {
                    return t.s("basic-calculator-narration-controlbar-abc")
                },
                onTap: function() {
                    return t.dispatch({
                        type: "ABC"
                    })
                }
            }, function() {
                return t.s("basic-calculator-button-controlbar-abc")
            }), n.createElement(r.default, {
                command: this.const("functions"),
                selected: function() {
                    return -1 !== ["functions", "restrictedFunctions"].indexOf(t.getScientificKeyboardMode())
                },
                ariaLabel: function() {
                    return t.s("basic-calculator-narration-controlbar-functions")
                },
                ignoreInTabOrder: this.const(!0),
                selectable: this.const(!0),
                onTap: function() {
                    return t.dispatch({
                        type: "functions"
                    })
                }
            }, function() {
                return t.s("shared-calculator-button-controlbar-functions")
            }), n.createElement("div", {
                class: n.const("dcg-hide-keypad-button"),
                "dcg-command": n.const("hide-keypad"),
                onTap: function() {
                    return t.dispatch({
                        type: "hide-keypad"
                    })
                }
            }, n.createElement("i", {
                class: n.const("dcg-icon-hide")
            })))
        }
        ,
        o
    }(o.DCGViewPillowKeypad);
    t.default = a
});

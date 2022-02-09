define('graphing-calc/keypads/numbers', ["require", "exports", "tslib", "dcgview", "./dcgview-graphing", "keypad/keys", "keypad/keypad", "keypad/row", "keypad/btn"], function(require, t, e, i, n, l, s, r, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var h = function(t) {
        function n() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(n, t),
        n.prototype.template = function() {
            var t = this;
            return i.createElement(s.default, {
                controller: this.props.controller
            }, i.createElement(r.default, null, l.view(this, "boldX"), l.view(this, "boldY"), l.view(this, "a^2"), l.view(this, "a^b"), l.spacer(.5), l.view(this, "7", {
                style: "highlight"
            }), l.view(this, "8", {
                style: "highlight"
            }), l.view(this, "9", {
                style: "highlight"
            }), l.view(this, "division"), l.spacer(.5), i.createElement(a.default, {
                command: this.const("functions"),
                ariaLabel: function() {
                    return t.controller.s("graphing-calculator-narration-functions")
                },
                colspan: this.const(2),
                style: this.const("highlight"),
                active: function() {
                    return t.controller.isKeypadFunctionsPopoverOpen()
                },
                onTap: function() {
                    return t.dispatch({
                        type: "keypad/functions"
                    })
                }
            }, this.bindFn(this.getFuncsBtnText))), i.createElement(r.default, null, l.view(this, "("), l.view(this, ")"), l.view(this, "<"), l.view(this, ">"), l.spacer(.5), l.view(this, "4", {
                style: "highlight"
            }), l.view(this, "5", {
                style: "highlight"
            }), l.view(this, "6", {
                style: "highlight"
            }), l.view(this, "multiplication"), l.spacer(.5), l.view(this, "left", {
                style: "highlight"
            }), l.view(this, "right", {
                style: "highlight"
            })), i.createElement(r.default, null, l.view(this, "|a|"), l.view(this, ","), l.view(this, "<="), l.view(this, ">="), l.spacer(.5), l.view(this, "1", {
                style: "highlight"
            }), l.view(this, "2", {
                style: "highlight"
            }), l.view(this, "3", {
                style: "highlight"
            }), l.view(this, "-"), l.spacer(1), l.view(this, "backspace", {
                colspan: 1.5,
                style: "highlight"
            })), i.createElement(r.default, null, i.createElement("div", {
                class: i.const("dcg-abc-audio-container")
            }, i.createElement(a.default, {
                command: i.const("ABC"),
                colspan: this.const(1),
                ariaLabel: function() {
                    return t.controller.s("graphing-calculator-narration-toggle-letters")
                },
                style: this.const("highlight"),
                onTap: function() {
                    t.dispatch({
                        type: "keypad/abc"
                    })
                }
            }, function() {
                return t.controller.getLayoutMeasurements().width <= 600 ? t.controller.raw("ABC") : t.controller.raw("A B C")
            }), i.createElement(a.default, {
                command: i.const("Audio"),
                disabled: function() {
                    return !t.controller.canAudioTrace()
                },
                ariaLabel: function() {
                    return t.controller.s("graphing-calculator-narration-toggle-audio-trace")
                },
                colspan: this.const(1),
                style: function() {
                    return "highlight"
                },
                onTap: function() {
                    return t.dispatch({
                        type: "keypad/audio-trace",
                        command: "on"
                    })
                }
            }, i.createElement("i", {
                class: i.const("dcg-icon-volume")
            }))), l.view(this, "sqrt"), l.view(this, "pi"), l.spacer(.5), l.view(this, "0", {
                style: "highlight"
            }), l.view(this, ".", {
                style: "highlight"
            }), l.view(this, "="), l.view(this, "+"), l.spacer(.5), l.view(this, "enter", {
                colspan: 2,
                style: "blue"
            })))
        }
        ,
        n.prototype.getFuncsBtnText = function() {
            return this.controller.isNarrow() ? this.controller.s("graphing-calculator-button-funcs") : this.controller.s("graphing-calculator-button-functions")
        }
        ,
        n
    }(n.default);
    t.default = h
});
define('basic/keypad/braille-keypad', ["require", "exports", "tslib", "dcgview", "basic/dcgview-basic", "./braille-example-row", "loadcss!./braille-keypad"], function(require, e, t, l, r, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.template = function() {
            var e = this;
            return l.createElement("div", {
                class: function() {
                    return {
                        "dcg-braille-io-keypad-container": !0,
                        "dcg-has-background-color": e.controller.hasBackgroundColor()
                    }
                }
            }, l.createElement("div", {
                class: l.const("dcg-braille-io-keypad")
            }, l.createElement("div", {
                class: l.const("dcg-braille-description")
            }, l.createElement("div", {
                class: l.const("dcg-braille-title")
            }, function() {
                return e.controller.s("basic-calculator-text-braille-mode-is-on", {
                    mode: e.brailleType()
                })
            }), l.createElement("div", {
                class: l.const("dcg-braille-info-text")
            }, function() {
                return e.controller.s("basic-calculator-text-how-to-type-braille")
            }), l.createElement("div", {
                class: l.const("dcg-blue-btn"),
                role: l.const("button"),
                tabindex: l.const(0),
                onTap: function() {
                    return e.controller.dispatch({
                        type: "set-braille-mode",
                        mode: "none"
                    })
                }
            }, function() {
                return e.controller.s("basic-calculator-button-turn-braille-mode-off", {
                    mode: e.brailleType()
                })
            })), l.createElement("div", {
                class: l.const("dcg-braille-examples-table-container")
            }, l.createElement("table", {
                class: l.const("dcg-braille-examples-table")
            }, l.createElement("tr", null, l.createElement("th", null, function() {
                return e.controller.s("basic-calculator-heading-braille-table-type-this")
            }), l.createElement("th", null, function() {
                return e.brailleType()
            }), l.createElement("th", null, function() {
                return e.controller.s("basic-calculator-heading-braille-table-typeset")
            })), l.createElement(n.BrailleExampleRow, {
                brailleMode: function() {
                    return e.controller.getBrailleMode()
                },
                latex: this.const("2+2")
            }), l.createElement(n.BrailleExampleRow, {
                brailleMode: function() {
                    return e.controller.getBrailleMode()
                },
                latex: this.const("\\frac{1}{2}")
            }), l.createElement(n.BrailleExampleRow, {
                brailleMode: function() {
                    return e.controller.getBrailleMode()
                },
                latex: this.const("\\sqrt{4}")
            })), l.createElement("div", {
                class: l.const("dcg-more-examples-link")
            }, l.createElement("a", {
                href: function() {
                    return "https://www.desmos.com/braille-examples?" + e.controller.getBrailleMode()
                },
                target: l.const("_blank")
            }, function() {
                return e.controller.s("basic-calculator-link-view-braille-examples")
            })))))
        }
        ,
        r.prototype.brailleType = function() {
            return "nemeth" === this.controller.getBrailleMode() ? "Nemeth" : "ueb" === this.controller.getBrailleMode() ? "UEB" : ""
        }
        ,
        r
    }(r.DCGViewBasic);
    e.default = a
});
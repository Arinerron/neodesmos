define('keypad/mq-commands', ["require", "exports"], function(require, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.execute = void 0;
    var e = {
        loga: function(t) {
            t.write("\\log_{}"),
            t.typedText("("),
            t.keystroke("Left"),
            t.keystroke("Down")
        },
        nthroot: function(t) {
            t.write("\\sqrt[]{}"),
            t.keystroke("Left"),
            t.keystroke("Left")
        },
        ddx: function(t) {
            t.write("\\frac{d}{dx}")
        },
        arcsin: function(t) {
            t.write("sin^{-1}"),
            t.typedText("(")
        },
        arccos: function(t) {
            t.write("cos^{-1}"),
            t.typedText("(")
        },
        arctan: function(t) {
            t.write("tan^{-1}"),
            t.typedText("(")
        },
        arcsec: function(t) {
            t.write("sec^{-1}"),
            t.typedText("(")
        },
        arccsc: function(t) {
            t.write("csc^{-1}"),
            t.typedText("(")
        },
        arccot: function(t) {
            t.write("cot^{-1}"),
            t.typedText("(")
        },
        "A^T": function(t) {
            t.typedText("^T"),
            t.keystroke("Right")
        },
        "A^-1": function(t) {
            t.typedText("^-1"),
            t.keystroke("Right")
        },
        "A^2": function(t) {
            t.typedText("^2"),
            t.keystroke("Right")
        },
        "a^2": function(t) {
            t.typedText("^2"),
            t.keystroke("Right")
        },
        "a^3": function(t) {
            t.typedText("^3"),
            t.keystroke("Right")
        },
        "a/b": function(t) {
            t.write("\\frac{}{}"),
            t.keystroke("Left")
        }
    };
    t.execute = function(t, n) {
        e[n](t)
    }
});
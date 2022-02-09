
define('graphing/braille-size-options', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.brailleSizes = void 0,
    e.brailleSizes = {},
    e.brailleSizes.vpmax8 = {
        width: 170,
        height: 220,
        margins: {
            left: 5,
            top: 15,
            right: 5,
            bottom: 50
        },
        name: function(e) {
            return e.s("graphing-calculator-label-braille-size-vpmax8")
        }
    },
    e.brailleSizes.vpmax11 = {
        width: 230,
        height: 220,
        margins: {
            left: 15,
            top: 15,
            right: 5,
            bottom: 5
        },
        name: function(e) {
            return e.s("graphing-calculator-label-braille-size-vpmax11")
        }
    },
    e.brailleSizes.etc8 = {
        width: 96,
        height: 96,
        margins: {
            left: 5,
            top: 15,
            right: 0,
            bottom: 0
        },
        name: function(e) {
            return e.s("graphing-calculator-label-braille-size-etc8")
        }
    },
    e.brailleSizes.etc11 = {
        width: 132,
        height: 134,
        margins: {
            left: 10,
            top: 15,
            right: 5,
            bottom: 5
        },
        name: function(e) {
            return e.s("graphing-calculator-label-braille-size-etc11")
        }
    }
});
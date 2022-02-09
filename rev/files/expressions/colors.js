define('expressions/colors', ["require", "exports", "core/lib/color-helpers"], function(require, r, o) {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.getColorName = r.all = r.BLACK = r.ORANGE = r.PURPLE = r.GREEN = r.BLUE = r.RED = void 0,
    r.RED = o.colors.RED,
    r.BLUE = o.colors.BLUE,
    r.GREEN = o.colors.GREEN,
    r.PURPLE = o.colors.PURPLE,
    r.ORANGE = o.colors.ORANGE,
    r.BLACK = o.colors.BLACK,
    r.all = [r.RED, r.BLUE, r.GREEN, r.PURPLE, r.ORANGE, r.BLACK],
    r.getColorName = function(r, c) {
        switch (c) {
        case o.colors.RED:
            return r.s("graphing-calculator-text-color-red");
        case o.colors.BLUE:
            return r.s("graphing-calculator-text-color-blue");
        case o.colors.GREEN:
            return r.s("graphing-calculator-text-color-green");
        case o.colors.PURPLE:
            return r.s("graphing-calculator-text-color-purple");
        case o.colors.ORANGE:
            return r.s("graphing-calculator-text-color-orange");
        case o.colors.BLACK:
            return r.s("graphing-calculator-text-color-black");
        case o.colors.GRAY:
            return r.s("graphing-calculator-text-color-gray");
        default:
            return r.s("graphing-calculator-text-color-unknown")
        }
    }
});
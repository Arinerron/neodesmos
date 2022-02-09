define('core/types/label-sizes', ["require", "exports"], function(require, e) {
    "use strict";
    var i;
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.maybeMigrateLabelSizeEnumToLatex = e.LabelSize = void 0,
    function(e) {
        e.SMALL = "small",
        e.MEDIUM = "medium",
        e.LARGE = "large"
    }(i = e.LabelSize || (e.LabelSize = {})),
    e.maybeMigrateLabelSizeEnumToLatex = function(e) {
        return e === i.SMALL ? ".85" : e === i.MEDIUM ? "1" : e === i.LARGE ? "1.35" : void 0
    }
});
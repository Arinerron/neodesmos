define('main/layout-model', ["require", "exports", "browser"], function(require, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.defaultLayoutModel = e.getShiftedLayoutForCurrentLayout = void 0,
    e.getShiftedLayoutForCurrentLayout = function(e) {
        switch (e) {
        case "letters":
            return "capitalLetters";
        case "noQwertyLetters":
            return "noQwertyCapitalLetters";
        case "noQwertyCapitalLetters":
            return "noQwertyLetters";
        default:
            return "letters"
        }
    }
    ,
    e.defaultLayoutModel = function(e) {
        return {
            keypadMinimized: !t.IS_TOUCH_DEVICE,
            keypadLayout: "mainNumbers",
            keypadFunctionsOpen: !1,
            graphSettingsOpen: !1,
            addExpressionOpen: !1,
            expressionsVisible: !!e.expressions,
            inEditListMode: !1,
            isFileDraggedOver: !1,
            expressionsHiddenTime: void 0
        }
    }
});
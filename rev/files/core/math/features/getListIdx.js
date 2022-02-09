
define('core/math/features/getListIdx', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getListIdxFromBranchIdx = void 0,
    e.getListIdxFromBranchIdx = function(e, r) {
        var t;
        switch (r) {
        case "solvedEquation":
            t = 2;
            break;
        case "baseComparator":
            t = 4;
            break;
        default:
            t = 1
        }
        return Math.floor(e / t)
    }
});
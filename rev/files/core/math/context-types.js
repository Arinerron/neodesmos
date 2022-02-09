
define('core/math/context-types', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.isActionCompilerValue = void 0,
    e.isActionCompilerValue = function(e) {
        return !("object" != typeof e || !e) && "Action" === e.type
    }
});

define('graphing/svg-classes', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.restore = e.save = void 0,
    e.save = function(e, s) {
        var a = e;
        a._dcgSaveClassName && a._dcgSaveClassName(s)
    }
    ,
    e.restore = function(e) {
        var s = e;
        s._dcgRestoreClassName && s._dcgRestoreClassName()
    }
});
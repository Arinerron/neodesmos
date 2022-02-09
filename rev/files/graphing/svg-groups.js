define('graphing/svg-groups', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.restore = e.setTitle = e.save = void 0,
    e.save = function(e, t) {
        var r = e;
        r._dcgStartNamedGroup && r._dcgStartNamedGroup(t)
    }
    ,
    e.setTitle = function(e, t) {
        var r = e;
        r._dcgSetTitle && r._dcgSetTitle(t)
    }
    ,
    e.restore = function(e) {
        var t = e;
        t._dcgEndNamedGroup && t._dcgEndNamedGroup()
    }
});
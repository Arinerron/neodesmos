define('core/graphing-calc/json/folder', ["require", "exports", "tslib", "core/lib/default-spec"], function(require, e, t, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.stripDefaults = e.inflateDefaults = e.DEFAULTS = void 0,
    e.DEFAULTS = {
        collapsed: !1,
        hidden: !1,
        secret: !1,
        title: ""
    },
    e.inflateDefaults = function(s) {
        return t.__assign(t.__assign({}, e.DEFAULTS), s)
    }
    ,
    e.stripDefaults = function(t) {
        return s.stripDefaults(e.DEFAULTS, t)
    }
});
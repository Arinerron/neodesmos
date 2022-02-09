define('core/graphing-calc/json/text', ["require", "exports", "tslib", "core/lib/default-spec"], function(require, e, t, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.stripDefaults = e.inflateDefaults = e.DEFAULTS = void 0,
    e.DEFAULTS = {
        folderId: "",
        text: "",
        secret: !1
    },
    e.inflateDefaults = function(s) {
        return t.__assign(t.__assign({}, e.DEFAULTS), s)
    }
    ,
    e.stripDefaults = function(t) {
        return s.stripDefaults(e.DEFAULTS, t)
    }
});
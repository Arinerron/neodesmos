define('core/graphing-calc/json/ticker', ["require", "exports", "tslib", "core/lib/default-spec"], function(require, e, t, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.inflateDefaults = e.stripDefaults = e.DEFAULTS = void 0,
    e.DEFAULTS = {
        handlerLatex: "",
        minStepLatex: "",
        open: !1,
        playing: !1
    },
    e.stripDefaults = function(t) {
        return n.stripDefaultsAndMaybeReturnUndefined(e.DEFAULTS, t)
    }
    ,
    e.inflateDefaults = function(n) {
        return t.__assign(t.__assign({}, e.DEFAULTS), n)
    }
});
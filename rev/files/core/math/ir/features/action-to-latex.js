
define('core/math/ir/features/action-to-latex', ["require", "exports", "../../../lib/label", "./value-to-latex"], function(require, e, t, a) {
    "use strict";
    function o(e, o) {
        var i = e.updateRules[o]
          , r = i.valueType
          , u = i.value;
        return t.identifierToLatex(o) + "=" + a.valueToLatex(r, u)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.actionLatexForSymbol = e.actionToLatex = void 0,
    e.actionToLatex = function(e) {
        var t = {};
        for (var a in e.updateRules)
            t[a] = o(e, a);
        return t
    }
    ,
    e.actionLatexForSymbol = o
});

define('core/math/ir/scope', ["require", "exports"], function(require, e) {
    "use strict";
    function o(e, o) {
        return {
            symbolMap: e,
            maxIndex: o
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.childScope = e.setSymbol = e.getSymbol = e.Scope = void 0,
    e.Scope = o,
    e.getSymbol = function(e, o) {
        return e.symbolMap[o]
    }
    ,
    e.setSymbol = function(e, o, t) {
        e.symbolMap[o] = t,
        e.maxIndex = Math.max(e.maxIndex, t)
    }
    ,
    e.childScope = function(e) {
        return o(Object.create(e.symbolMap), e.maxIndex)
    }
});
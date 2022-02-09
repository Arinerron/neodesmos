define('core/math/domaintypes', ["require", "exports"], function(require, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    n.intersectDomains = n.allReals = n.linearPositiveDomain = n.knownDomain = n.unknownDomain = n.emptyDomain = void 0;
    n.emptyDomain = function() {
        return {
            type: "empty"
        }
    }
    ;
    n.unknownDomain = function() {
        return {
            type: "unknown"
        }
    }
    ;
    n.knownDomain = function(e) {
        return isNaN(e[0]) || isNaN(e[1]) || e[1] < e[0] ? n.emptyDomain() : {
            type: "known",
            bounds: e
        }
    }
    ;
    n.linearPositiveDomain = function(e, o) {
        if (0 === o)
            return e > 0 ? n.allReals() : n.emptyDomain();
        var t = -e / o
          , i = o < 0 ? [-1 / 0, t] : [t, 1 / 0];
        return n.knownDomain(i)
    }
    ;
    n.allReals = function() {
        return n.knownDomain([-1 / 0, 1 / 0])
    }
    ;
    n.intersectDomains = function(e, o) {
        if ("empty" === e.type || "empty" === o.type)
            return n.emptyDomain();
        if ("unknown" === e.type || "unknown" === o.type)
            return n.unknownDomain();
        if (e.bounds && o.bounds) {
            var t = [Math.max(e.bounds[0], o.bounds[0]), Math.min(e.bounds[1], o.bounds[1])];
            return n.knownDomain(t)
        }
        return n.emptyDomain()
    }
});
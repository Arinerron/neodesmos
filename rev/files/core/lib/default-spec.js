
define('core/lib/default-spec', ["require", "exports", "underscore", "core/lib/deepCopy"], function(require, e, r, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.populateDefaults = e.stripDefaultsAndMaybeReturnUndefined = e.stripDefaults = void 0,
    e.stripDefaults = function(e, t) {
        var n = {};
        for (var a in t)
            t.hasOwnProperty(a) && (r.isEqual(e[a], t[a]) || (n[a] = t[a]));
        return n
    }
    ,
    e.stripDefaultsAndMaybeReturnUndefined = function(e, t) {
        var n = void 0
          , a = {};
        for (var u in t)
            t.hasOwnProperty(u) && (r.isEqual(e[u], t[u]) || (a[u] = t[u],
            n = a));
        return n
    }
    ,
    e.populateDefaults = function(e, r) {
        r || (r = {});
        var n = {};
        for (var a in e)
            e.hasOwnProperty(a) && !r.hasOwnProperty(a) && (n[a] = t.default(e[a]));
        for (var a in r)
            r.hasOwnProperty(a) && (n[a] = r[a]);
        return n
    }
});
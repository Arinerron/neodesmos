
define('core/graphing-calc/migrate-state', ["require", "exports", "./migrations/0", "./migrations/1", "./migrations/2", "./migrations/3", "./migrations/4", "core/graphing-calc/validate-state", "./migrations/5", "./migrations/6", "./migrations/7", "./migrations/8", "./migrations/9"], function(require, e, r, t, n, i, o, a, s, l, u, c, d) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.migrateToPersisted = e.migrateToLatest = e.currentVersion = e.persistedVersion = void 0;
    var v = [r, t, n, i, o, s.migrateState, l.migrateState, u.default, c.default, d.default];
    function g(r) {
        if (r.version > e.currentVersion)
            return "undefined" != typeof console && console.warn && console.warn("Loading saved state with version " + r.version + " but last known version is " + e.currentVersion + ". States saved in a newer version of the calculator may not load correctly in an older version of the calculator."),
            a.validateState(r);
        if (r.hasOwnProperty("version") && !v[r.version])
            return "undefined" != typeof console && console.warn && console.warn("State has invalid version " + r.version + ". If a version is present, it should be a non-negative integer less than or equal to " + e.currentVersion + "."),
            a.validateState(r);
        for (r.hasOwnProperty("version") || (r = v[0](r)); r.version < e.currentVersion; )
            r = v[r.version + 1](r);
        return a.validateState(r)
    }
    e.persistedVersion = 9,
    e.currentVersion = 9,
    e.migrateToLatest = g,
    e.migrateToPersisted = function(e) {
        return g(e)
    }
});
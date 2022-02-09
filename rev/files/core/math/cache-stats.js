define('core/math/cache-stats', ["require", "exports"], function(require, e) {
    "use strict";
    var a;
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.markCacheRead = e.markCacheWrite = e.markCacheMiss = e.markCacheHit = e.setCacheStatStore = void 0,
    e.setCacheStatStore = function(e) {
        a = e
    }
    ,
    e.markCacheHit = function() {
        a && (a.cacheHits += 1)
    }
    ,
    e.markCacheMiss = function() {
        a && (a.cacheMisses += 1)
    }
    ,
    e.markCacheWrite = function() {
        a && (a.cacheWrites += 1)
    }
    ,
    e.markCacheRead = function() {
        a && (a.cacheReads += 1)
    }
});
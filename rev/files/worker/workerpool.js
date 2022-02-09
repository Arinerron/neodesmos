
define('worker/workerpool', ['require', 'console', './create_worker_url', 'pjs', 'underscore_model', './fakeworker', 'underscore', 'lib/urlparser'], function(require) {
    "use strict";
    var r = require("console")
      , e = require("./create_worker_url")
      , n = require("pjs")
      , o = require("underscore_model").UnderscoreModel
      , t = require("./fakeworker")
      , i = require("underscore")
      , s = require("lib/urlparser")
      , a = "";
    try {
        void 0 === (a = s.getParameter(window.location.search, "workerThrottle")) && (a = s.getParameter(window.top.location.search, "workerThrottle"))
    } catch (r) {}
    var c = parseInt(a, 10)
      , u = 0;
    function k(r) {
        return c ? function(e) {
            u = Math.max(Date.now(), u) + c,
            setTimeout(r, u - Date.now(), e)
        }
        : r
    }
    return n(o, function(n, o) {
        n.init = function(r) {
            o.init.call(this),
            this.workers = [],
            this.maxWorkers = r,
            this.workerURL = e()
        }
        ,
        n.allowedToSpawnWorker = function() {
            return this.workerURL && this.workers.length < this.maxWorkers
        }
        ,
        n.killWorker = function(r) {
            -1 !== i.indexOf(this.workers, r) && (r.terminate(),
            this.workers = i.without(this.workers, r),
            i.shuffle(i.values(r.__connections)).forEach(function(r) {
                r && r.onWorkerKilled && r.onWorkerKilled()
            }))
        }
        ,
        n.spawnWorker = function() {
            try {
                var e = new Worker(this.workerURL);
                return e.__connections = {},
                e.__isFake = !1,
                e.onerror = function(e) {
                    r.log(e)
                }
                ,
                e.addEventListener("message", k(function(r) {
                    var n = r.data;
                    if ((!n || !n.log) && n && n.connectionId) {
                        var o = e.__connections[n.connectionId];
                        o && o.onResponse(n.originalMessage)
                    }
                })),
                this.workers.push(e),
                e
            } catch (r) {
                return null
            }
        }
        ,
        n.spawnFakeWorker = function() {
            var r = t(k(function(e) {
                var n = i.values(r.__connections)[0];
                n && n.onResponse(e)
            }));
            return r.__isFake = !0,
            r.__connections = {},
            r
        }
        ,
        n.findLeastUsedWorker = function() {
            return i.sortBy(this.workers, function(r) {
                return i.size(r.__connections)
            })[0]
        }
        ,
        n.allocateWorker = function() {
            var r = null;
            return this.allowedToSpawnWorker() && (r = this.spawnWorker()),
            r || (r = this.findLeastUsedWorker()),
            r || (r = this.spawnFakeWorker()),
            r
        }
    })
});
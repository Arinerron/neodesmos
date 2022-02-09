define('worker/fakeworker', ['require', 'worker/workercore'], function(require) {
    "use strict";
    var e = require("worker/workercore");
    return function(n) {
        var t = {}
          , r = e(function(e, t) {
            n({
                type: e,
                payload: t
            })
        });
        return t.postMessage = function(e) {
            setTimeout(function() {
                r.processChangeSet(e)
            }, 0)
        }
        ,
        t
    }
});

define('worker/workerpoolconnection', ['require', 'pjs', 'underscore_model'], function(require) {
    "use strict";
    return require("pjs")(require("underscore_model").UnderscoreModel, function(e, o) {
        e.init = function(e) {
            o.init.call(this),
            this.workerPool = e,
            this.worker = e.allocateWorker(),
            this.worker.__connections[this.guid] = this
        }
        ,
        e.destroy = function() {
            this.sendMessage({
                type: "destroy"
            }),
            delete this.worker.__connections[this.guid]
        }
        ,
        e.killWorker = function() {
            this.worker.__isFake || this.workerPool.killWorker(this.worker)
        }
        ,
        e.onWorkerKilled = function() {}
        ,
        e.onResponse = function(e) {}
        ,
        e.sendMessage = function(e) {
            this.worker.__isFake ? this.worker.postMessage(e) : this.worker.postMessage({
                connectionId: this.guid,
                originalMessage: e
            })
        }
    })
});

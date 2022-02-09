
define('main/evaluator', ["require", "exports", "worker/workerpoolconnection", "worker/workerpool", "core/lib/deepCopy", "core/math/functions", "underscore"], function(require, e, t, n, o, s, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.Evaluator = void 0;
    var a = function() {
        function e(e) {
            this.__ticksEnabled = !0,
            this.listeners = {
                processChangeSet: function(e) {
                    var t = {}
                      , n = {};
                    for (var o in e.graphChanges) {
                        var i = e.graphChanges[o];
                        void 0 === i ? n[o] = !0 : (s.rehydrateGraphData(i),
                        t[o] = i)
                    }
                    var a = {};
                    for (var o in e.intersectionChanges)
                        n[o] || (a[o] = e.intersectionChanges[o]);
                    var r = !!this.changeSet;
                    this.onEvaluatorResults({
                        evaluationStates: e.statusChanges,
                        graphData: {
                            addedGraphs: t,
                            removedGraphs: n,
                            intersections: a
                        },
                        renderSlowly: !!e.isCompleteState,
                        timingData: e.timingData,
                        eventUpdates: e.eventUpdates
                    });
                    for (var h = e.syncId; this.syncRequests.length && void 0 !== h && this.syncRequests[0].id <= h; ) {
                        this.syncRequests.shift().callback()
                    }
                    this.markJobFinished(),
                    r && this._processChangeSet()
                }
            },
            this.__state = {},
            this.changeSet = null,
            this.cumulativeChangeSet = {},
            this.syncId = 1,
            this.syncRequests = [],
            e || (e = n()),
            this.workerPool = e,
            this.createWorkerPoolConnection()
        }
        return e.prototype.createWorkerPoolConnection = function() {
            var e = this;
            this.workerPoolConnection && (this.workerPoolConnection.onResponse = function() {}
            ,
            this.workerPoolConnection.onWorkerKilled = function() {}
            ),
            this.workerPoolConnection = t(this.workerPool),
            this.markJobFinished(),
            this.workerPoolConnection.onResponse = function(t) {
                e.shouldIgnoreWorkerMessage(t) ? "processChangeSet" === t.type && (e.markJobFinished(),
                e._processChangeSet()) : e.listeners[t.type].call(e, t.payload)
            }
            ,
            this.workerPoolConnection.onWorkerKilled = function() {
                var t = e.hasJobInWorker();
                e.createWorkerPoolConnection(),
                t ? (e.changeSet = o.default(e.cumulativeChangeSet),
                e.__state.changed = !0,
                e.__state.droppedMessage = !0) : (e.changeSet = o.default(e.cumulativeChangeSet),
                e.__state.changed = !1),
                e.processChangeSet()
            }
        }
        ,
        e.prototype.destroy = function() {
            this.workerPoolConnection && (this.workerPoolConnection.onResponse = function() {}
            ,
            this.workerPoolConnection.onWorkerKilled = function() {}
            ,
            this.workerPoolConnection.destroy())
        }
        ,
        e.prototype.shouldIgnoreWorkerMessage = function(e) {
            return !!this.__suspendUntilSyncId && (!e || !e.payload || !(e.payload.syncId >= this.__suspendUntilSyncId))
        }
        ,
        e.prototype.suspend = function() {
            var e = this;
            this.changeSet && this.changeSet.syncId || (this.syncId++,
            this.applyToChangeSets(function(t) {
                t.syncId = e.syncId
            })),
            this.__suspendUntilSyncId = this.changeSet.syncId
        }
        ,
        e.prototype.markJobFinished = function() {
            this.__state.droppedMessage = !1,
            this.__jobStartTime = -1,
            this.__suspendUntilSyncId = void 0
        }
        ,
        e.prototype.startJobTimer = function() {
            this.__jobStartTime = (new Date).getTime()
        }
        ,
        e.prototype.hasJobInWorker = function() {
            return -1 !== this.__jobStartTime
        }
        ,
        e.prototype.getJobElapsedTime = function() {
            return this.hasJobInWorker() ? (new Date).getTime() - this.__jobStartTime : NaN
        }
        ,
        e.prototype.setTicksEnabled = function(e) {
            this.__ticksEnabled = e
        }
        ,
        e.prototype.tick = function() {
            this.__ticksEnabled && this._processChangeSet()
        }
        ,
        e.prototype.processChangeSet = function() {
            this.__processChangeSetRequested = !0
        }
        ,
        e.prototype._processChangeSet = function() {
            if (this._syncEvaluatorConfig(),
            this.__processChangeSetRequested) {
                var e = this.getJobElapsedTime() >= 4e3;
                if (this.__state.droppedMessage && e)
                    this.workerPoolConnection.killWorker();
                else if (this.__state.changed && this.changeSet)
                    if (this.changeSet.syncId || (this.syncId++,
                    this.changeSet.syncId = this.syncId),
                    this.hasJobInWorker())
                        this.changeSet.isCompleteState && e && this.workerPoolConnection.killWorker();
                    else {
                        var t = this.changeSet;
                        this.changeSet = null,
                        this.__state.changed = !1,
                        this.startJobTimer(),
                        this.workerPoolConnection.sendMessage(t),
                        this.__processChangeSetRequested = !1
                    }
            }
        }
        ,
        e.prototype.notifyWhenSynced = function(e) {
            var t = this;
            this._syncEvaluatorConfig(),
            this.hasJobInWorker() || this.changeSet ? (this.syncId++,
            this.syncRequests.push({
                id: this.syncId,
                callback: e
            }),
            this.applyToChangeSets(function(e) {
                e.syncId = t.syncId
            })) : setTimeout(e, 0)
        }
        ,
        e.prototype.applyToChangeSets = function(e) {
            this.__state.changed = !0,
            this.changeSet || (this.changeSet = {}),
            this.cumulativeChangeSet || (this.cumulativeChangeSet = {}),
            e(this.changeSet),
            e(this.cumulativeChangeSet),
            this.processChangeSet()
        }
        ,
        e.prototype.clearStatementsAndStartCompleteState = function() {
            this.hasJobInWorker() && this.suspend(),
            this.applyToChangeSets(function(e) {
                e.isCompleteState = !0,
                delete e.statements
            })
        }
        ,
        e.prototype.markUndoRedoState = function() {
            this.applyToChangeSets(function(e) {
                e.isUndoRedoState = !0
            })
        }
        ,
        e.prototype.addStatement = function(e) {
            this.applyToChangeSets(function(t) {
                t.statements || (t.statements = {}),
                t.statements[e.id] = o.default(e)
            })
        }
        ,
        e.prototype.removeStatement = function(e) {
            this.applyToChangeSets(function(t) {
                t.statements || (t.statements = {}),
                t.removes || (t.removes = {}),
                delete t.statements[e],
                t.removes[e] = !0
            })
        }
        ,
        e.prototype.addActionStepEvent = function(e) {
            this.applyToChangeSets(function(t) {
                t.events || (t.events = []),
                t.events.push({
                    type: "step",
                    expressionId: e
                })
            })
        }
        ,
        e.prototype.addClockTickEvent = function(e, t) {
            this.applyToChangeSets(function(n) {
                n.events || (n.events = []),
                n.events.push({
                    type: "clock-tick",
                    id: e,
                    isFirstTick: t
                })
            })
        }
        ,
        e.prototype.addClickEvent = function(e, t) {
            this.applyToChangeSets(function(n) {
                n.events || (n.events = []),
                void 0 === t && (t = 0),
                n.events.push({
                    type: "click",
                    expressionId: e,
                    indexVar: t
                })
            })
        }
        ,
        e.prototype._syncEvaluatorConfig = function() {
            if (this.readEvaluatorConfig) {
                var e = this.readEvaluatorConfig();
                for (var t in e)
                    this._applyIfChanged(e, t)
            }
        }
        ,
        e.prototype._applyIfChanged = function(e, t) {
            var n = this.cumulativeChangeSet && this.cumulativeChangeSet[t]
              , o = e[t];
            i.isEqual(n, o) || this.applyToChangeSets(function(e) {
                e[t] = o
            })
        }
        ,
        e
    }();
    e.Evaluator = a
});
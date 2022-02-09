define('main/graphs_controller', ["require", "exports", "main/graph", "main/calculator_3d_backend", "main/geometry_backend", "lib/random_hash", "tslib", "jquery", "underscore", "main/calculator_backend", "lib/parse-json-errors", "lib/underscore-shim", "bugsnag", "analytics/looker"], function(require, e, t, r, a, i, o, n, s, h, p, c, g, d) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.GraphsController = void 0;
    var u = function(e) {
        function c(r) {
            var a = r.api
              , o = r.s
              , n = r.getLanguage
              , h = r.examplesJSON
              , p = r.randomSeed
              , c = r.product
              , g = e.call(this) || this;
            g.product = c,
            g.api = a,
            g.s = o,
            g.getLanguage = n,
            g.previousGraph = void 0,
            g.recoveryParentHash = void 0,
            g.randomHash = i,
            g._seedRandom(p),
            g.__savedGraphs = [],
            g.__recoveryGraphs = [];
            var d = h.map(t.fromAjax);
            return g.__exampleGraphs = s.filter(d, function(e) {
                return !e.easterEgg
            }),
            g.__easterEggGraphs = s.filter(d, function(e) {
                return !!e.easterEgg
            }),
            g.__graphInfoCache = {},
            g.__exampleGraphs.forEach(function(e) {
                g._addGraphToCache(e)
            }),
            g.__easterEggGraphs.forEach(function(e) {
                g._addGraphToCache(e)
            }),
            g.lastSync = void 0,
            g.lastSaveFailureMessage = "",
            g.recentSaveFailure = !1,
            g.recentSaveSuccess = !1,
            g.saving = !1,
            g.syncError = !1,
            g.isLoadingGraphs = !1,
            g.currentGraph = t(),
            g._enableLoadingGraphStates(),
            g.pageLoadTime = Date.now(),
            g
        }
        return o.__extends(c, e),
        c.prototype._seedRandom = function(e) {
            if (e) {
                var t = new Date
                  , r = "" + e + t.getTime() + t.getMilliseconds();
                this.randomHash.init(r)
            } else
                alert(this.s("account-shell-error-something-went-wrong", {
                    error_num: "77361"
                }))
        }
        ,
        c.prototype.requestDeleteGraph = function(e) {
            var t = this._getCachedGraphInfo(e);
            t.canCancelDelete = !0,
            t.deleteTimeout = setTimeout(this._deleteGraph.bind(this, e), 3e3),
            t.isDeletingGraph = !0,
            t.didDeleteGraphFail = !1,
            this.triggerEvent("listChanged", void 0),
            this.triggerEvent("triggerRender", void 0)
        }
        ,
        c.prototype._removeSavedGraphByHash = function(e) {
            this.__savedGraphs = s.filter(this.__savedGraphs, function(t) {
                return t.hash !== e
            })
        }
        ,
        c.prototype._removeRecoveryGraphByHash = function(e) {
            this.__recoveryGraphs = s.filter(this.__recoveryGraphs, function(t) {
                return t.hash !== e
            })
        }
        ,
        c.prototype._deleteGraph = function(e) {
            var t, i = this, o = e.hash, n = this._getCachedGraphInfo(e);
            switch (n.canCancelDelete = !1,
            this.triggerEvent("listChanged", void 0),
            this.triggerEvent("triggerRender", void 0),
            this.product) {
            case "graphing":
                t = h.removeGraph({
                    hash: o,
                    lang: this.getLanguage()
                });
                break;
            case "graphing3d":
                t = r.removeGraph(e);
                break;
            case "geometry":
                t = a.removeConstruction(e)
            }
            return t.done(function() {
                i._removeSavedGraphByHash(o),
                i._removeRecoveryGraphByHash(o)
            }).fail(function() {
                n.didDeleteGraphFail = !0
            }).always(function() {
                n.isDeletingGraph = !1,
                i.triggerEvent("listChanged", void 0),
                i.triggerEvent("triggerRender", void 0)
            })
        }
        ,
        c.prototype.cancelDeleteGraph = function(e) {
            var t = this._getCachedGraphInfo(e);
            clearTimeout(t.deleteTimeout),
            t.isDeletingGraph = !1,
            t.didDeleteGraphFail = !1,
            t.canCancelDelete = !1,
            this.triggerEvent("listChanged", void 0),
            this.triggerEvent("triggerRender", void 0)
        }
        ,
        c.prototype.millisecondsSinceSync = function() {
            return this.lastSync ? Date.now() - this.lastSync : 1 / 0
        }
        ,
        c.prototype.clear = function() {
            this.lastSync = void 0,
            this.setSavedGraphsFromJSON([]),
            this.setRecoveryGraphsFromJSON([])
        }
        ,
        c.prototype.dismissSaveError = function() {
            this.recentSaveFailure = !1,
            this.triggerEvent("triggerRender", void 0)
        }
        ,
        c.prototype._triggerSaveSuccess = function() {
            var e = this;
            this.saving = !1,
            this.recentSaveSuccess = !0,
            this.lastSaveFailureMessage = void 0,
            this.triggerEvent("triggerRender", void 0),
            this.recentSaveTimeout = setTimeout(function() {
                e.recentSaveSuccess = !1,
                e.triggerEvent("triggerRender", void 0)
            }, 3e3)
        }
        ,
        c.prototype._triggerSaveError = function(e) {
            var t = e.length && e[0].message ? e[0].message : this.s("account-shell-error-unexpected-error");
            this.saving = !1,
            this.recentSaveFailure = !0,
            this.lastSaveFailureMessage = t,
            this.triggerEvent("triggerRender", void 0),
            this.recentSaveTimeout = setTimeout(this.dismissSaveError.bind(this), 6e4)
        }
        ,
        c.prototype._updateGraphData = function(e) {
            var t = JSON.stringify(this.api.getState());
            e.setProperty("graphData", t),
            e.setProperty("parentHash", e.hash),
            e.setProperty("recoveryParentHash", this.recoveryParentHash);
            var r = this.randomHash.next();
            e.setProperty("hash", r),
            this.recoveryParentHash = r;
            var a = this.api.screenshot({
                width: 200,
                height: 200,
                targetPixelRatio: 2
            });
            e.setProperty("thumbURL", a)
        }
        ,
        c.prototype._clearSaveTimeout = function() {
            this.recentSaveFailure = !1,
            this.recentSaveSuccess = !1,
            this.lastSaveFailureMessage = void 0,
            this.triggerEvent("triggerRender", void 0),
            clearTimeout(this.recentSaveTimeout)
        }
        ,
        c.prototype.save = function(e) {
            var t = this
              , i = e && e.newTitle
              , o = !(!e || !e.saveCopy);
            i && (this.currentGraph.title = i),
            this._clearSaveTimeout(),
            this.saving = !0,
            this.triggerEvent("triggerRender", void 0);
            var n = this.currentGraph.copy();
            n.recovery && (n.recovery = !1,
            d.logJSON("recovered-graph", {
                product: this.product,
                timeSincePageload: Date.now() - this.pageLoadTime,
                payloadJSON: {
                    action: "save"
                }
            })),
            this._updateGraphData(n);
            var s, c = !o && this.wasCurrentGraphEverSaved();
            switch (this.product) {
            case "graphing":
                s = h.saveGraph(n, {
                    myGraphs: !0,
                    isUpdate: c,
                    lang: this.getLanguage()
                });
                break;
            case "graphing3d":
                s = r.saveGraph(n, {
                    myGraphs: !0,
                    isUpdate: c
                });
                break;
            case "geometry":
                s = a.saveConstruction(n, {
                    myConstructions: !0,
                    isUpdate: c
                })
            }
            s.done(function(e) {
                t.currentGraph = e.copy(),
                t._onCurrentGraphChanged(),
                t.triggerEvent("clearUnsavedChanges", void 0),
                t.triggerEvent("triggerRender", void 0),
                c && t._removeSavedGraphByHash(e.parentHash),
                e.draft && t._removeRecoveryGraphByHash(e.parentHash),
                t.__savedGraphs.unshift(e),
                t._addGraphToCache(e),
                t.triggerEvent("listChanged", void 0),
                t.triggerEvent("triggerRender", void 0),
                t._triggerSaveSuccess()
            }).fail(function(e) {
                var r = 413 === e.status ? [{
                    message: t.s("account-shell-error-graph-too-large")
                }] : p.rawParseJSONErrors(e);
                t._triggerSaveError(r)
            })
        }
        ,
        c.prototype.shareGraph = function() {
            var e, t = this.currentGraph.copy();
            switch (this._updateGraphData(t),
            this.product) {
            case "graphing":
                e = h.saveGraph(t, {
                    myGraphs: !1,
                    isUpdate: !1,
                    lang: this.getLanguage()
                });
                break;
            case "graphing3d":
                e = r.saveGraph(t, {
                    myGraphs: !1,
                    isUpdate: !1
                });
                break;
            case "geometry":
                e = a.saveConstruction(t, {
                    myConstructions: !1,
                    isUpdate: !1
                })
            }
            return e
        }
        ,
        c.prototype.saveRecoveryGraph = function() {
            var e = this.currentGraph.copy()
              , t = JSON.stringify(this.api.getState());
            e.setProperty("graphData", t),
            e.setProperty("parentHash", e.hash),
            e.setProperty("recoveryParentHash", this.recoveryParentHash);
            var r = this.randomHash.next() + this.randomHash.next();
            e.setProperty("hash", r),
            this.recoveryParentHash = r;
            var a = this.api.screenshot({
                width: 200,
                height: 200,
                targetPixelRatio: 2
            });
            return e.setProperty("thumbURL", a),
            h.saveGraph(e, {
                myGraphs: !1,
                isUpdate: !1,
                recovery: !0,
                lang: this.getLanguage()
            })
        }
        ,
        c.prototype.isCurrentGraphTitled = function() {
            return !!this.currentGraph.title
        }
        ,
        c.prototype.isCurrentGraphARecoveryGraph = function() {
            var e = this.currentGraph;
            if (!e || !e.hash)
                return !1;
            var t = e.hash;
            return s.any(this.__recoveryGraphs, function(e) {
                return e.hash === t
            })
        }
        ,
        c.prototype.wasCurrentGraphEverSaved = function() {
            var e = this.currentGraph;
            if (!e || !e.hash)
                return !1;
            var t = e.hash;
            return s.any(this.__savedGraphs, function(e) {
                return e.hash === t
            })
        }
        ,
        c.prototype.isRecoveryUIEnabledForProduct = function() {
            return "graphing" === this.product
        }
        ,
        c.prototype.fetchRecoveryGraphs = function() {
            var e, t = this, r = Date.now();
            switch (this.isLoadingRecoveryGraphs = !0,
            clearTimeout(this.fetchDurationTimeout),
            this.triggerEvent("triggerRender", void 0),
            this.product) {
            case "graphing":
                e = h.getRecoveryGraphs({
                    lang: this.getLanguage()
                });
                break;
            case "graphing3d":
                throw new Error("code error: should not fetchRecoveryGraphs for 3d");
            case "geometry":
                throw new Error("code error: should not fetchRecoveryGraphs for geometry")
            }
            e.done(function(e) {
                t.setRecoveryGraphsFromJSON(e.recoveryGraphs || e.recoveryConstructions)
            }).fail(function() {
                t.triggerEvent("onRecoveryGraphsError", void 0)
            }).always(function() {
                var e = 2e3 - (Date.now() - r);
                t.isLoadingRecoveryGraphs = !1,
                e > 0 ? t.fetchDurationTimeout = setTimeout(function() {
                    t.triggerEvent("triggerRender", void 0)
                }, e) : t.triggerEvent("triggerRender", void 0)
            })
        }
        ,
        c.prototype.clearRecoveryGraphsForTests = function() {
            return h.clearRecoveryGraphsForTests()
        }
        ,
        c.prototype.refreshGraphs = function() {
            var e, t = this;
            switch (this.isLoadingGraphs = !0,
            this.syncError = !1,
            this.triggerEvent("triggerRender", void 0),
            this.product) {
            case "graphing":
                e = h.getGraphs({
                    lang: this.getLanguage()
                });
                break;
            case "graphing3d":
                e = r.getGraphs();
                break;
            case "geometry":
                e = a.getConstructions()
            }
            e.done(function(e) {
                t.lastSync = Date.now(),
                t.setSavedGraphsFromJSON(e.myGraphs || e.myConstructions)
            }).fail(function() {
                t.syncError = !0,
                t.triggerEvent("onSyncError", void 0)
            }).always(function() {
                t.isLoadingGraphs = !1,
                t.triggerEvent("triggerRender", void 0)
            })
        }
        ,
        c.prototype.getRecoveryGraphs = function() {
            return this.__recoveryGraphs.slice(0)
        }
        ,
        c.prototype.getSavedGraphs = function() {
            return this.__savedGraphs.slice(0)
        }
        ,
        c.prototype.getExampleGraphs = function() {
            return this.__exampleGraphs.slice(0)
        }
        ,
        c.prototype.getEasterEggGraphs = function(e) {
            return s.filter(this.__easterEggGraphs, function(t) {
                return t.easterEgg === e
            })
        }
        ,
        c.prototype.getSavedAndExampleGraphs = function() {
            return this.__savedGraphs.concat(this.__exampleGraphs)
        }
        ,
        c.prototype.setSavedGraphsFromJSON = function(e) {
            var r = this;
            e || (e = []),
            this.__savedGraphs = e.map(function(e) {
                var a = t.fromAjax(e)
                  , i = r._getCachedGraphInfo(a);
                return i ? i.graph : (r._addGraphToCache(a),
                a)
            }),
            this._lazyLoadGraphStates(),
            this.triggerEvent("listChanged", void 0),
            this.triggerEvent("triggerRender", void 0)
        }
        ,
        c.prototype.setRecoveryGraphsFromJSON = function(e) {
            var r = this;
            e || (e = []),
            this.__recoveryGraphs = e.map(function(e) {
                var a = t.fromAjax(e);
                a.draft = !0,
                a.recovery = !0;
                var i = r._getCachedGraphInfo(a);
                return i ? i.graph : (r._addGraphToCache(a),
                a)
            }),
            this._lazyLoadGraphStates(),
            this.triggerEvent("listChanged", void 0),
            this.triggerEvent("triggerRender", void 0)
        }
        ,
        c.prototype.getSavedGraphsAsJSON = function() {
            return this.__savedGraphs.map(t.toAjax)
        }
        ,
        c.prototype._enableLoadingGraphStates = function() {
            var e = this;
            clearTimeout(this.__loadNextGraphStateTimeout);
            var t = function() {
                e._loadNextGraphState(),
                e.__loadNextGraphStateTimeout = setTimeout(t, 50)
            };
            t()
        }
        ,
        c.prototype._disableLoadingGraphStates = function() {
            clearTimeout(this.__loadNextGraphStateTimeout)
        }
        ,
        c.prototype._loadNextGraphState = function() {
            var e = this;
            if (!this.__currentAjaxRequest) {
                var t = this._dequeueGraphInfo();
                t && (this.__currentAjaxRequest = this.loadGraphImmediately(t.graph),
                this.__currentAjaxRequest.always(function() {
                    e.__currentAjaxRequest = void 0
                }))
            }
        }
        ,
        c.prototype.loadGraphImmediately = function(e) {
            var t = this
              , r = n.Deferred();
            if (!e.graphData) {
                var a = e.stateURL
                  , i = this._getCachedGraphInfo(e);
                return i.isDataLoading = !0,
                n.getJSON(a).done(function(t) {
                    e.graphData = t,
                    i.didDataLoadFail = !1,
                    r.resolve(t)
                }).fail(function(e) {
                    i.didDataLoadFail = !0,
                    r.reject(e)
                }).always(function(e) {
                    i.isDataLoading = !1,
                    t.triggerEvent("listChanged", void 0),
                    t.triggerEvent("triggerRender", void 0)
                })
            }
            return requestAnimationFrame(function() {
                r.resolve()
            }),
            r
        }
        ,
        c.prototype._getCachedGraphInfo = function(e) {
            return e && this.__graphInfoCache[e.getCollectionKey()]
        }
        ,
        c.prototype._addGraphToCache = function(e) {
            this.__graphInfoCache[e.getCollectionKey()] = {
                graph: e
            }
        }
        ,
        c.prototype._enqueueGraphInfo = function(e) {
            this.__nextAjaxRequestPriority || (this.__nextAjaxRequestPriority = 0),
            e.ajaxPriority = ++this.__nextAjaxRequestPriority
        }
        ,
        c.prototype._dequeueGraphInfo = function() {
            var e, t = -1 / 0;
            for (var r in this.__graphInfoCache) {
                var a = this.__graphInfoCache[r]
                  , i = a.ajaxPriority;
                void 0 !== i && i > t && (t = i,
                e = a)
            }
            return s.isObject(e) ? void 0 === e ? null : (delete e.ajaxPriority,
            e) : null
        }
        ,
        c.prototype.loadDataForGraph = function(e) {
            if (e) {
                var t = this._getCachedGraphInfo(e);
                if (!t)
                    throw new Error('graphsController does not have a reference to graph with hash "' + e.hash + '"');
                t.graph.graphData || (t.isDataLoading = !0,
                t.didDataLoadFail = !1,
                this._enqueueGraphInfo(t),
                this.triggerEvent("triggerRender", void 0))
            }
        }
        ,
        c.prototype._lazyLoadGraphStates = function() {
            for (var e = this.getSavedAndExampleGraphs(), t = Math.min(20, e.length) - 1; t >= 0; t--)
                this.loadDataForGraph(e[t])
        }
        ,
        c.prototype.didDataLoadFail = function(e) {
            var t = this._getCachedGraphInfo(e);
            return !(!t || !t.didDataLoadFail)
        }
        ,
        c.prototype.didDeleteGraphFail = function(e) {
            var t = this._getCachedGraphInfo(e);
            return !(!t || !t.didDeleteGraphFail)
        }
        ,
        c.prototype.isDeletingGraph = function(e) {
            var t = this._getCachedGraphInfo(e);
            return !(!t || !t.isDeletingGraph)
        }
        ,
        c.prototype.canCancelDelete = function(e) {
            var t = this._getCachedGraphInfo(e);
            return !(!t || !t.canCancelDelete)
        }
        ,
        c.prototype.loadGraph = function(e, r) {
            this.previousGraph = this.currentGraph ? this.currentGraph.copy() : t(),
            this.previousGraph.graphData = JSON.stringify(this.api.getState());
            var a = e.copy();
            delete a.example,
            this.api.setState(a.graphData, {
                forceExpressionsOpen: !0,
                forceUnsavedChanges: !!a.recovery,
                allowUndo: r && r.allowUndo
            }),
            this.currentGraph = a,
            this._onCurrentGraphChanged(),
            this.recoveryParentHash = this.currentGraph.hash,
            r && r.allowUndo || this.triggerEvent("clearUndoRedo", void 0),
            a.recovery || this.triggerEvent("clearUnsavedChanges", void 0),
            this.triggerEvent("triggerRender", void 0)
        }
        ,
        c.prototype.restorePreviousGraph = function() {
            this.loadGraph(this.previousGraph || t())
        }
        ,
        c.prototype.clearGraph = function(e) {
            this.loadGraph(t(), e),
            this.triggerEvent("onClearGraph", void 0)
        }
        ,
        c.prototype._onCurrentGraphChanged = function() {
            var e = this.currentGraph;
            e.title ? document.title = e.title : "graphing" === this.product ? document.title = this.s("account-shell-heading-graphingcalc-page-title") : "graphing3d" === this.product ? document.title = this.s("account-shell-heading-3dcalc-page-title") : document.title = this.s("account-shell-heading-geometry-page-title"),
            this._replaceState(e)
        }
        ,
        c.prototype._replaceState = function(e) {
            if (window.history && history.replaceState) {
                var t = e.getURL();
                t && (window.location.search && (t += window.location.search),
                t !== window.location.href && history.replaceState(e.hash, e.title, t))
            }
        }
        ,
        c.prototype.toast = function(e, t) {
            this.triggerEvent("toast", {
                message: e,
                opts: t
            })
        }
        ,
        c.prototype.clearGraphByUserAction = function() {
            var e, t = this;
            if (this.currentGraph.hash)
                return this.clearGraph(),
                e = "geometry" === this.product ? this.s("account-shell-text-new-construction-created") : this.s("account-shell-text-new-graph-created"),
                void this.toast(e, {
                    undoCallback: function() {
                        t.restorePreviousGraph(),
                        t._replaceState(t.currentGraph)
                    }
                });
            var r = this.api.getState();
            this.clearGraph({
                allowUndo: !0
            }),
            e = "geometry" === this.product ? this.s("account-shell-text-construction-cleared") : this.s("account-shell-text-graph-cleared"),
            this.toast(e, {
                undoCallback: function() {
                    t.api.setState(r, {
                        forceExpressionsOpen: !0,
                        allowUndo: !0
                    })
                }
            })
        }
        ,
        c.prototype.getSaveFailureMessage = function() {
            return this.lastSaveFailureMessage || ""
        }
        ,
        c.prototype.isSaving = function() {
            return !!this.saving
        }
        ,
        c.prototype.didSaveFail = function() {
            return !!this.recentSaveFailure
        }
        ,
        c.prototype.didSaveSucceed = function() {
            return !!this.recentSaveSuccess
        }
        ,
        c.prototype.isSyncing = function() {
            return !!this.isLoadingGraphs
        }
        ,
        c.prototype.didSyncFail = function() {
            return !!this.syncError
        }
        ,
        c.prototype.getCurrentDisplayDate = function() {
            return this.currentGraph.displayDate()
        }
        ,
        c.prototype.getCurrentGraphTitle = function() {
            return this.currentGraph.title
        }
        ,
        c.prototype.getUntitledString = function() {
            return "geometry" === this.product ? this.s("account-shell-text-untitled") : "graphing" === this.product || "graphing3d" === this.product ? this.s("account-shell-text-untitled-graph") : (g.notify("Unknown product: " + this.product),
            "Untitled")
        }
        ,
        c.prototype.hasUnsavedChanges = function() {
            return this.api.hasUnsavedChanges()
        }
        ,
        c
    }(c.UnderscoreModelShim);
    e.GraphsController = u
});

define('core/math/statementanalysis', ['require', 'core/math/evaluationstate', 'pjs', 'core/types/graphmode', 'core/math/workerconfig'], function(require) {
    "use strict";
    var e = require("core/math/evaluationstate").EvaluationState
      , t = require("pjs")
      , r = require("core/types/graphmode")
      , i = require("core/math/workerconfig");
    return t(function(t) {
        t.init = function(t, r, i) {
            this.policy = t,
            this.rawTree = r,
            this.concreteTree = i,
            this.evaluationState = e(t, r, i)
        }
        ,
        t.exportTo = function(e, t) {
            this.rawTree.exportTo(e, this.concreteTree, t)
        }
        ,
        t.graph = function(e) {
            return this.rawTree.tryGraph(this.policy, this.concreteTree, e)
        }
        ,
        t.getGraphMode = function() {
            return this.rawTree.getGraphMode(this.policy, this.concreteTree)
        }
        ,
        t.getGraphInfo = function() {
            return this.rawTree.getGraphInfo(this.policy, this.concreteTree)
        }
        ,
        t.shouldIntersect = function() {
            if (!this.evaluationState.is_graphable)
                return !1;
            if (!this.rawTree.userData.shouldGraph)
                return !1;
            if (!i.pointsOfInterest)
                return !1;
            var e = this.getGraphMode();
            return e === r.X || e === r.Y
        }
    })
});
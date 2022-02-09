define('main/calculator_backend', ["require", "exports", "main/graph", "./backend"], function(require, r, e, a) {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.clearRecoveryGraphsForTests = r.removeGraph = r.getRecoveryGraphs = r.getGraphs = r.emailFeedback = r.saveGraph = void 0,
    r.saveGraph = function(r, t) {
        if (!t.hasOwnProperty("myGraphs"))
            throw new Error("Argument Error: saveGraph options must specify myGraphs");
        if (!t.hasOwnProperty("isUpdate"))
            throw new Error("Argument Error: saveGraph options must specify isUpdate");
        var o = {
            parent_hash: r.parentHash,
            recovery_parent_hash: r.recoveryParentHash,
            thumb_data: r.thumbURL,
            graph_hash: r.hash,
            my_graphs: t.myGraphs,
            is_update: t.isUpdate,
            recovery: t.recovery,
            title: r.title || void 0,
            calc_state: r.graphData,
            lang: t.lang
        };
        return a.post("/api/v1/calculator/save", o).then(function(a) {
            return e.updateFromSync(r, a),
            r
        })
    }
    ,
    r.emailFeedback = function(r) {
        return a.post("/api/v1/calculator/email_feedback", r)
    }
    ,
    r.getGraphs = function(r) {
        return a.getJSON("/api/v1/calculator/my_graphs", r)
    }
    ,
    r.getRecoveryGraphs = function(r) {
        return a.getJSON("/api/v1/calculator/recovery_graphs", r)
    }
    ,
    r.removeGraph = function(r) {
        return a.post("/api/v1/calculator/my_graphs/remove", r)
    }
    ,
    r.clearRecoveryGraphsForTests = function() {
        return a.post("/api/v1/calculator/recovery_graphs/clear")
    }
});
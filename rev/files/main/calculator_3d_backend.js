define('main/calculator_3d_backend', ['require', 'main/graph', './backend'], function(require) {
    "use strict";
    var r = require("main/graph")
      , a = require("./backend");
    return {
        saveGraph: function(t, e) {
            if (!e.hasOwnProperty("myGraphs"))
                throw new Error("Argument Error: saveGraph options must specify myGraphs");
            if (!e.hasOwnProperty("isUpdate"))
                throw new Error("Argument Error: saveGraph options must specify isUpdate");
            var s = {
                parent_hash: t.parentHash,
                thumb_data: t.thumbURL,
                graph_hash: t.hash,
                my_graphs: e.myGraphs,
                is_update: e.isUpdate,
                title: t.title || void 0
            };
            return s.state = t.graphData,
            a.post("/api/v1/calculator_3d/save", s).then(function(a) {
                return r.updateFromSync(t, a),
                t
            })
        },
        getGraphs: function() {
            return a.getJSON("/api/v1/calculator_3d/my_graphs")
        },
        removeGraph: function(r) {
            return a.post("/api/v1/calculator_3d/my_graphs/remove", {
                hash: r.hash
            })
        }
    }
});
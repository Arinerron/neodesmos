define('main/geometry_backend', ['require', 'main/graph', './backend'], function(require) {
    "use strict";
    var t = require("main/graph")
      , r = require("./backend");
    return {
        saveConstruction: function(n, o) {
            if (!o.hasOwnProperty("myConstructions"))
                throw new Error("Argument Error: saveConstruction options must specify myConstructions");
            if (!o.hasOwnProperty("isUpdate"))
                throw new Error("Argument Error: saveConstruction options must specify isUpdate");
            var s = {
                state: n.graphData,
                parent_hash: n.parentHash,
                thumb_data: n.thumbURL,
                hash: n.hash,
                my_constructions: o.myConstructions,
                is_update: o.isUpdate,
                title: n.title || void 0
            };
            return r.post("/api/v1/geometry/save", s).then(function(r) {
                return t.updateFromSync(n, r),
                n
            })
        },
        getConstructions: function() {
            return r.getJSON("/api/v1/geometry/my_constructions")
        },
        removeConstruction: function(t) {
            return r.post("/api/v1/geometry/my_constructions/remove", {
                hash: t.hash
            })
        }
    }
});
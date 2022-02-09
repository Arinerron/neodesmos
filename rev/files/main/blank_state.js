define('main/blank_state', ["require", "exports", "core/graphing-calc/migrate-state"], function(require, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.BLANK_STATE = void 0,
    e.BLANK_STATE = {
        version: r.currentVersion,
        randomSeed: "",
        graph: {
            viewport: {
                xmin: -10,
                ymin: -13.25,
                xmax: 10,
                ymax: 13.25
            }
        },
        expressions: {
            list: [{
                id: "1",
                type: "expression"
            }]
        }
    },
    e.default = e.BLANK_STATE
});
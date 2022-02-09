
define('tours/all_tours', ['require', 'tours/sliders', 'tours/scatter_plot', 'tours/function_table', 'tours/restrictions', 'tours/regressions', 'tours/lists', 'tours/folders', 'tours/derivatives', 'underscore'], function(require) {
    "use strict";
    var e = require("tours/sliders")
      , t = require("tours/scatter_plot")
      , r = require("tours/function_table")
      , s = {
        sliders: {
            tour: e,
            titleKey: "graphing-tours-heading-sliders"
        },
        tables: {
            tour: t,
            titleKey: "graphing-tours-heading-tables"
        },
        restrictions: {
            tour: require("tours/restrictions"),
            titleKey: "graphing-tours-heading-restrictions"
        },
        functiontable: {
            tour: r,
            hideInHelp: !0,
            titleKey: "graphing-tours-heading-advanced-tables"
        },
        regressions: {
            tour: require("tours/regressions"),
            titleKey: "graphing-tours-heading-regressions"
        },
        lists: {
            tour: require("tours/lists"),
            titleKey: "graphing-tours-heading-lists",
            hideInHelp: !0
        },
        folders: {
            tour: require("tours/folders"),
            titleKey: "graphing-tours-heading-folders",
            hideInHelp: !0
        },
        derivatives: {
            tour: require("tours/derivatives"),
            titleKey: "graphing-tours-heading-derivatives",
            hideInHelp: !0
        }
    };
    return require("underscore").each(s, function(e, t) {
        e.name = t
    }),
    s
});
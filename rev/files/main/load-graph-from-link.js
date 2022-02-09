define('main/load-graph-from-link', ["require", "exports", "core/graphing-calc/migrate-state", "tslib", "jquery", "core/lib/deepCopy"], function(require, t, e, r, a, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.default = function(t, s, i) {
        var d = !1;
        t.dispatch({
            type: "toast/show",
            toast: {
                message: t.s("graphing-calculator-text-toast-importing-graph"),
                hideAfter: 0,
                toastStyle: "cover",
                onHide: function() {
                    d = !0
                }
            }
        });
        var l = function() {
            d || t.dispatch({
                type: "toast/show",
                toast: {
                    message: t.s("graphing-calculator-text-toast-error-importing-graph"),
                    toastStyle: "error",
                    hideAfter: 12e3
                }
            })
        }
          , n = function(e, r) {
            t.dispatch({
                type: "set-state",
                state: e
            }),
            t.dispatch({
                type: "toast/show",
                toast: {
                    message: t.s("graphing-calculator-text-toast-imported-graph"),
                    undoCallback: function() {
                        t.dispatch({
                            type: "set-state",
                            state: r
                        })
                    }
                }
            })
        };
        a.getJSON(s).done(function(a) {
            var s = e.migrateToLatest(a.state);
            i(s, function(e, s) {
                e || !s ? l() : function(e, a) {
                    if (!d) {
                        var s = t.getSelectedItem();
                        if (s) {
                            var i = "folder" === s.type
                              , l = "folder" !== s.type && !!s.folderId
                              , f = i || l
                              , p = {}
                              , c = t.getState()
                              , g = c.expressions.list;
                            if (1 !== g.length || i) {
                                for (var h = e.expressions.list, u = 0; u < h.length; u++) {
                                    var y = t.generateId()
                                      , v = h[u];
                                    if ("folder" !== v.type)
                                        v.folderId ? v.folderId = p[v.folderId] : i ? v.folderId = s.id : l && (v.folderId = s.folderId),
                                        v.id = y;
                                    else {
                                        if (f)
                                            return void t.dispatch({
                                                type: "toast/show",
                                                toast: {
                                                    message: t.s("graphing-calculator-text-toast-error-no-folders"),
                                                    toastStyle: "error",
                                                    hideAfter: 12e3
                                                }
                                            });
                                        p[v.id] = y,
                                        v.id = y
                                    }
                                }
                                for (var m = o.default(c), I = 0; I < g.length; ) {
                                    if (g[I].id === s.id) {
                                        i && (g[I].title = a);
                                        break
                                    }
                                    I += 1
                                }
                                var x = i ? I + 1 : I
                                  , S = i ? 0 : 1;
                                g.splice.apply(g, r.__spreadArray([x, S], h)),
                                n(c, m)
                            } else
                                n(e, c)
                        }
                    }
                }(s, a.title || "")
            })
        }).fail(l)
    }
});
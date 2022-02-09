define('mygraphs/item', ["require", "exports", "tslib", "dcgview", "jquery", "../shared-components/tooltip", "loadcss!./item"], function(require, e, t, n, r, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.Item = void 0;
    var s = n.Components.If
      , c = function(e) {
        function c() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(c, e),
        c.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                role: n.const("listitem"),
                class: function() {
                    return {
                        "saved-graph": !0,
                        "graph-link-container": !0,
                        "dcg-selected": e.props.isSelected()
                    }
                },
                onTap: function(t) {
                    t.wasHandled() || e.props.onTap(t)
                }
            }, n.createElement(s, {
                predicate: function() {
                    return !e.props.isDeletingGraph() && !e.props.didDeleteGraphFail()
                }
            }, function() {
                return n.createElement("div", {
                    role: n.const("link"),
                    tabindex: n.const(0),
                    class: function() {
                        return {
                            "graph-link": !0,
                            "dcg-action-preview-graph": !0,
                            "example-graph": e.props.isExample()
                        }
                    },
                    didMount: e.bindFn(e.onMount)
                }, n.createElement("span", {
                    class: n.const("dcg-thumb"),
                    style: e.const({
                        "background-image": "url(" + e.props.getThumbURL() + ")"
                    })
                }), n.createElement("div", {
                    class: n.const("dcg-graph-details")
                }, n.createElement("div", {
                    class: n.const("dcg-title")
                }, e.props.getTitle), n.createElement("div", {
                    class: n.const("dcg-subtitle dcg-graph-date")
                }, function() {
                    return e.props.isExample() ? e.props.s("account-shell-label-mygraphs-example") : e.props.getDisplayDate()
                })))
            }), n.createElement(s, {
                predicate: this.props.isDeletingGraph
            }, function() {
                return n.createElement("div", {
                    "aria-live": n.const("assertive"),
                    "aria-atomic": n.const("true"),
                    class: n.const("deleting"),
                    handleEvent: n.const("true"),
                    onTap: function() {
                        e.props.canCancelDelete() && e.props.cancelDeleteGraph()
                    }
                }, function() {
                    return e.props.s("account-shell-text-mygraphs-deleting")
                }, n.createElement(s, {
                    predicate: e.props.canCancelDelete
                }, function() {
                    return n.createElement("div", {
                        role: n.const("button"),
                        tabindex: n.const(0),
                        class: n.const("cancel-delete")
                    }, function() {
                        return e.props.s("account-shell-button-mygraphs-cancel")
                    })
                }))
            }), n.createElement(s, {
                predicate: this.props.didDeleteGraphFail
            }, function() {
                return n.createElement("div", {
                    "aria-live": n.const("assertive"),
                    "aria-atomic": n.const("true"),
                    class: n.const("retry-delete"),
                    handleEvent: n.const("true")
                }, function() {
                    return e.props.s("account-shell-error-mygraphs-error-deleting")
                }, n.createElement("a", {
                    role: n.const("button"),
                    tabindex: n.const(0),
                    class: n.const("dcg-action-removegraph"),
                    onTap: e.props.requestDeleteGraph
                }, function() {
                    return e.props.s("account-shell-button-mygraphs-try-again")
                }), function() {
                    return e.props.s("account-shell-text-mygraphs-or")
                }, n.createElement("a", {
                    role: n.const("button"),
                    tabindex: n.const(0),
                    class: n.const("dcg-action-cancelremovegraph"),
                    onTap: e.props.cancelDeleteGraph
                }, function() {
                    return e.props.s("account-shell-button-mygraphs-cancel")
                }))
            }), n.createElement(s, {
                predicate: function() {
                    return !e.props.isExample() && !e.props.isDeletingGraph() && !e.props.didDeleteGraphFail()
                }
            }, function() {
                return n.createElement("span", {
                    class: n.const("actions"),
                    handleEvent: n.const("true")
                }, n.createElement("span", {
                    role: n.const("button"),
                    tabindex: n.const(0),
                    "aria-label": function() {
                        return e.props.s("account-shell-button-mygraphs-delete-title", {
                            graphTitle: e.props.getTitle()
                        })
                    },
                    class: n.const("dcg-action-removegraph"),
                    onTap: e.props.requestDeleteGraph
                }, n.createElement(o.Tooltip, {
                    tooltip: function() {
                        return e.props.s("account-shell-button-mygraphs-delete-graph")
                    },
                    gravity: e.const("e")
                }, n.createElement("i", {
                    class: n.const("dcg-icon-remove")
                }))))
            }))
        }
        ,
        c.prototype.didUpdate = function() {
            this.props.isSelected() && this.$node.trigger("focus")
        }
        ,
        c.prototype.onMount = function(e) {
            var t = this;
            this.$node = r(e),
            this.$node.on("focus", function() {
                t.props.isSelected() || t.props.onFocus()
            })
        }
        ,
        c
    }(n.Class);
    e.Item = c
});

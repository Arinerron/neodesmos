define('calculator-shell/share-menu', ["require", "exports", "main/calculator_backend", "tslib", "dcgview", "jquery", "lib/selectable-input", "./menu", "analytics/looker", "shared/dcgviews/localize", "loadcss!./share-menu"], function(require, e, t, n, r, o, c, s, a, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.ShareMenu = void 0;
    var i = r.Components
      , u = i.If
      , d = i.Textarea
      , p = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.init = function() {
            this.controller = this.props.controller(),
            this.graphsController = this.controller.graphsController,
            this.graph = null,
            this.shareInProgress = !0,
            this.didSharingFail = !1,
            a.logJSON("user-action::open-share-dropdown", {})
        }
        ,
        t.prototype.template = function() {
            var e = this;
            return r.createElement(s.Menu, {
                title: function() {
                    return e.controller.s("account-shell-heading-share-graph")
                },
                type: r.const("share"),
                label: function() {
                    return e.controller.s("account-shell-narration-share-options")
                },
                controller: this.props.controller
            }, r.createElement("div", {
                class: r.const("dcg-popover-content")
            }, r.createElement(u, {
                predicate: function() {
                    return e.shareInProgress
                }
            }, function() {
                return r.createElement("div", {
                    class: r.const("dcg-loading")
                }, r.createElement("span", {
                    class: r.const("dcg-spinner")
                }), function() {
                    return e.controller.s("account-shell-label-loading")
                })
            }), r.createElement(u, {
                predicate: function() {
                    return e.didSharingFail
                }
            }, function() {
                return r.createElement("div", {
                    class: r.const("dcg-failed")
                }, r.createElement("span", {
                    "aria-live": r.const("assertive"),
                    "aria-atomic": r.const(!0)
                }, function() {
                    return e.controller.s("account-shell-error-sharing-link") + " "
                }), r.createElement("span", {
                    role: r.const("button"),
                    tabindex: r.const(0),
                    class: r.const("dcg-action-retry"),
                    onTap: function() {
                        return e.controller.dispatch({
                            type: "toggle-menu",
                            payload: "none"
                        }),
                        e.controller.dispatch({
                            type: "toggle-menu",
                            payload: "share"
                        })
                    }
                }, function() {
                    return e.controller.s("account-shell-button-retry-now")
                }), function() {
                    return " " + e.controller.s("account-shell-text-or") + " "
                }, r.createElement("span", {
                    role: r.const("button"),
                    tabindex: r.const(0),
                    class: r.const("dcg-action-close"),
                    onTap: function() {
                        return e.controller.dispatch({
                            type: "toggle-menu",
                            payload: "share"
                        })
                    }
                }, function() {
                    return e.controller.s("account-shell-button-cancel")
                }), r.const("."))
            }), r.createElement(u, {
                predicate: function() {
                    return !e.shareInProgress && !e.didSharingFail
                }
            }, function() {
                return r.createElement("div", {
                    class: r.const("dcg-loaded"),
                    didMount: e.didMountLoaded.bind(e)
                }, function() {
                    return e.controller.s("account-shell-label-share-link")
                }, r.createElement(c.SelectableInput, {
                    controller: e.props.controller,
                    link: function() {
                        return e.getGraphPath()
                    }
                }), r.createElement(u, {
                    predicate: function() {
                        return !e.controller.shouldDisablePrintAndExport()
                    }
                }, function() {
                    return r.createElement("div", {
                        class: r.const("dcg-share-actions")
                    }, r.createElement("span", {
                        class: r.const("dcg-print-link"),
                        onTap: e.print.bind(e),
                        tabindex: r.const(0),
                        role: r.const("link")
                    }, r.createElement("i", {
                        class: r.const("dcg-icon-print"),
                        "aria-hidden": r.const("true")
                    }), r.createElement("span", null, function() {
                        return e.controller.s("account-shell-button-print")
                    })), r.createElement("span", {
                        class: r.const("dcg-export-image-link"),
                        onTap: e.exportImage.bind(e),
                        tabindex: r.const(0),
                        role: r.const("link")
                    }, r.createElement("i", {
                        class: r.const("dcg-icon-export"),
                        "aria-hidden": r.const("true")
                    }), r.createElement("span", null, function() {
                        return e.controller.s("account-shell-button-export-image")
                    })), r.createElement("span", {
                        class: function() {
                            return {
                                "dcg-embed-link": !0,
                                "dcg-selected": e.embedVisible
                            }
                        },
                        onTap: e.toggleEmbedVisible.bind(e),
                        tabindex: r.const(0),
                        role: r.const("button"),
                        "aria-pressed": function() {
                            return e.embedVisible
                        }
                    }, r.createElement("i", {
                        class: r.const("dcg-icon-embed"),
                        "aria-hidden": r.const("true")
                    }), r.createElement("span", null, function() {
                        return e.controller.s("account-shell-button-embed")
                    })))
                }), r.createElement(u, {
                    predicate: function() {
                        return e.embedVisible
                    }
                }, function() {
                    return r.createElement("div", {
                        class: r.const("dcg-embed-div share-div"),
                        didMount: e.didMountTextarea.bind(e)
                    }, r.createElement(d, {
                        rows: r.const("6"),
                        class: r.const("select-all first-input dcg-variable-htmlembedcode"),
                        value: function() {
                            return e.getGraphEmbedCode()
                        },
                        onInput: function() {}
                    }))
                }), r.createElement(u, {
                    predicate: function() {
                        return e.controller.shouldShowArtContestNudge()
                    }
                }, function() {
                    return r.createElement("div", {
                        class: r.const("dcg-art-contest-container")
                    }, r.createElement("span", {
                        class: r.const("dcg-trophy-icon")
                    }, r.const("🏆")), r.createElement(l.Localize, {
                        i18n: e.const(e.controller),
                        key: e.const("account-shell-text-share-submit-to-contest")
                    }, r.createElement("span", {
                        class: r.const("dcg-contest-submit-message")
                    }, r.const("Submit this graph to the"), r.const(" "), r.createElement("span", {
                        class: r.const("dcg-bold-text")
                    }, r.const("Global Math Art Contest!")))), r.createElement("div", {
                        class: r.const("dcg-enter-btn"),
                        role: r.const("button"),
                        tabindex: r.const(0),
                        onTap: function(t) {
                            return e.controller.state.artContestURLFromShareMenu = e.getGraphPath(),
                            e.controller.dispatch({
                                type: "show-modal",
                                modal: "contest-submission",
                                device: t.device
                            })
                        }
                    }, function() {
                        return e.controller.s("account-shell-button-submit")
                    }))
                }))
            })))
        }
        ,
        t.prototype.didMountTextarea = function(e) {
            o(e).find("textarea").trigger("focus").trigger("select")
        }
        ,
        t.prototype.toggleEmbedVisible = function() {
            this.embedVisible = !this.embedVisible,
            this.unmounted || this.update()
        }
        ,
        t.prototype.didMountLoaded = function() {
            this.embedVisible = !1
        }
        ,
        t.prototype.print = function() {
            window.print()
        }
        ,
        t.prototype.exportImage = function(e) {
            this.controller.dispatch({
                type: "show-modal",
                modal: "export-image",
                device: e.device
            })
        }
        ,
        t.prototype.getGraphPath = function() {
            return null != this.graph ? this.graph.getURL() : void 0
        }
        ,
        t.prototype.getGraphEmbedCode = function() {
            if (!this.graph)
                return "";
            return '<iframe src="' + (this.getGraphPath() + "?embed") + '" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>'
        }
        ,
        t.prototype.didUnmount = function() {
            this.unmounted = !0
        }
        ,
        t.prototype.didMount = function() {
            var e = this;
            return this.graphsController.shareGraph().done(function(t) {
                e.graph = t
            }).fail(function() {
                e.didSharingFail = !0
            }).always(function() {
                e.shareInProgress = !1,
                e.unmounted || e.update()
            })
        }
        ,
        t
    }(r.Class);
    e.ShareMenu = p
});

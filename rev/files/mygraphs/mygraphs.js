
define('mygraphs/mygraphs', ["require", "exports", "tslib", "dcgview", "jquery", "underscore", "mygraphs/item", "mygraphs/graph-in-progress", "mygraphs/user-bar", "mygraphs/graph-preview", "mygraphs/syncing-status-bar", "mygraphs/account-reminder", "mygraphs/load-graph-view", "scroll_helpers", "mygraphs/heading", "keys", "analytics/looker", "shared/dcgviews/localize", "loadcss!./mygraphs"], function(require, e, t, r, n, o, a, l, i, s, c, p, u, h, d, g, m, v) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.Mygraphs = void 0;
    var f = r.Components
      , y = f.If
      , G = f.For
      , w = f.IfElse
      , E = "default"
      , C = "search"
      , b = function(e) {
        function f() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.state = "default",
            t
        }
        return t.__extends(f, e),
        f.prototype.didUpdate = function() {
            this.previewGraph && h.scrollVisible(n(this.getSelectedNode()), this.$scrollableNode, 60) && this.update()
        }
        ,
        f.prototype.didMountScrollable = function(e) {
            var t = this;
            this.$scrollableNode = n(e),
            this.$scrollableNode.on("focusin", function(e) {
                if (null != t.previewGraph && !n(e.target).hasClass("graph-link"))
                    return t.previewItem(null)
            }),
            n(window).on("keydown", function(e) {
                if (!t.props.isOpen())
                    return !0;
                switch (g.lookup(e)) {
                case g.UP:
                    return t.selectUp(e);
                case g.DOWN:
                    return t.selectDown(e)
                }
            });
            var r = o.throttle(this.hidePreviewIfTooScrolled.bind(this), 200);
            this.$scrollableNode.on("scroll", r),
            this.debouncedFetchSelectedGraph = o.debounce(this.fetchSelectedGraph.bind(this), 200)
        }
        ,
        f.prototype.fetchSelectedGraph = function() {
            return this.props.graphsController().loadDataForGraph(this.previewGraph)
        }
        ,
        f.prototype.hidePreviewIfTooScrolled = function() {
            if (null != this.previewGraph) {
                var e = n(this.getSelectedNode())
                  , t = n(this.findRootNode()).find(".active-arrow")
                  , r = e.offset()
                  , o = e.height()
                  , a = t.offset();
                if (void 0 !== r && void 0 !== o && void 0 !== a) {
                    var l = r.top + .5 * o
                      , i = a.top;
                    Math.abs(l - i) > 10 && this.previewItem(null)
                }
            }
        }
        ,
        f.prototype.openSearch = function() {
            this.state = C,
            this.previewItem(null)
        }
        ,
        f.prototype.closeSearch = function() {
            this.state = E,
            this.previewItem(null)
        }
        ,
        f.prototype.updateFilter = function(e) {
            this.filter = e,
            this.update()
        }
        ,
        f.prototype.getMaxGraphs = function() {
            return this.maxGraphs || 50
        }
        ,
        f.prototype.getCountRemaining = function() {
            return this.getSavedGraphs().length - this.getMaxGraphs()
        }
        ,
        f.prototype.showMoreGraphs = function(e) {
            var t = this.getMaxGraphs();
            if (this.getCountRemaining() < 2 * t ? this.maxGraphs = 1 / 0 : this.maxGraphs = 2 * t,
            this.update(),
            "keyboard" === (null != e ? e.device : void 0)) {
                var r = this.getSavedAndExampleGraphs()
                  , n = null != r ? r[t] : void 0;
                n && this.previewItem(n)
            }
        }
        ,
        f.prototype.getSelectedNode = function() {
            return n(".dcg-mygraphs .graph-link-container.dcg-selected")[0]
        }
        ,
        f.prototype.selectUp = function(e) {
            if (null != this.previewGraph) {
                e.preventDefault();
                var t = this.getSavedAndExampleGraphs();
                if (t.length) {
                    var r = null != this.previewGraph ? this.previewGraph.hash : void 0
                      , n = o.indexOf(o.pluck(t, "hash"), r)
                      , a = null != t ? t[n - 1] : void 0;
                    a ? a && this.previewItem(a) : null != this.$newGraph && this.$newGraph.trigger("focus")
                }
            }
        }
        ,
        f.prototype.selectDown = function(e) {
            if (null != this.previewGraph) {
                var t = this.getSavedAndExampleGraphs();
                if (t.length) {
                    e.preventDefault();
                    var r = null != this.previewGraph ? this.previewGraph.hash : void 0
                      , n = o.indexOf(o.pluck(t, "hash"), r)
                      , a = null != t ? t[n + 1] : void 0;
                    a && (!a.example && n + 1 >= this.getMaxGraphs() && this.showMoreGraphs(),
                    this.previewItem(a))
                }
            }
        }
        ,
        f.prototype.getFilter = function() {
            return this.state === C && null != this.filter ? this.filter : ""
        }
        ,
        f.prototype.getRecoveryGraphs = function() {
            return this.props.graphsController().getRecoveryGraphs()
        }
        ,
        f.prototype.attemptRecovery = function() {
            this.logRecoveryClientEvent("ask"),
            this.controller.mygraphsController.recoveryAttempted = !0,
            this.controller.graphsController.fetchRecoveryGraphs(),
            this.update()
        }
        ,
        f.prototype.hasAttemptedRecovery = function() {
            return this.controller.mygraphsController.hasAttemptedRecovery() && !this.isAttemptingRecovery()
        }
        ,
        f.prototype.isAttemptingRecovery = function() {
            return this.controller.graphsController.isLoadingRecoveryGraphs
        }
        ,
        f.prototype.shouldShowAttemptRecoveryText = function() {
            return !!this.graphsController.isRecoveryUIEnabledForProduct() && !this.hasAttemptedRecovery()
        }
        ,
        f.prototype.getSavedGraphs = function() {
            return this.props.graphsController().getSavedGraphs()
        }
        ,
        f.prototype.getExampleGraphs = function() {
            return this.props.graphsController().getExampleGraphs()
        }
        ,
        f.prototype.getSavedAndExampleGraphs = function() {
            return this.props.graphsController().getSavedAndExampleGraphs()
        }
        ,
        f.prototype.filterGraphs = function(e) {
            var t = this
              , r = this.getFilter().toLowerCase();
            return r ? e.filter(function(e) {
                return t.sanitizeTitle(e).toLowerCase().indexOf(r) >= 0
            }) : e
        }
        ,
        f.prototype.sliceGraphs = function(e) {
            return e.slice(0, this.getMaxGraphs())
        }
        ,
        f.prototype.canShowMore = function(e) {
            return e.length > this.getMaxGraphs()
        }
        ,
        f.prototype.onFocusGraph = function(e) {
            this.skipPreview() || this.previewItem(e)
        }
        ,
        f.prototype.onTapGraph = function(e, t) {
            this.skipPreview() || "keyboard" === t.device ? this.openGraphWithCover(e) : this.previewGraph !== e && this.previewItem(e)
        }
        ,
        f.prototype.previewItem = function(e) {
            this.previewGraph && (this.previewGraph = null),
            e && (this.previewGraph = e,
            this.debouncedFetchSelectedGraph()),
            this.update()
        }
        ,
        f.prototype.skipPreview = function() {
            var e = window.platform;
            return n("body").width() < 650 || "ios" === e || "android" === e
        }
        ,
        f.prototype.onOpenPreviewGraph = function() {
            if (null != this.previewGraph) {
                var e = this.previewGraph;
                this.previewItem(null),
                this.props.onOpenGraph(e)
            }
        }
        ,
        f.prototype.openGraphWithCover = function(e) {
            var t = this;
            if (this.graphWithCover = e,
            this.previewItem(null),
            null != e)
                return setTimeout(function() {
                    t.props.graphsController().loadGraphImmediately(e).done(function() {
                        t.graphWithCover && t.props.openGraphBehindCover(e).then(function() {
                            t.graphWithCover = null,
                            t.update()
                        })
                    }).always(function() {
                        t.update()
                    })
                }, 250)
        }
        ,
        f.prototype.cancelLoadGraphWithCover = function() {
            this.graphWithCover = null,
            this.update()
        }
        ,
        f.prototype.didDataLoadFail = function(e) {
            return this.props.graphsController().didDataLoadFail(e)
        }
        ,
        f.prototype.willUpdate = function() {
            this.props.isOpen() && this.controller.userController.isLoggedIn() || (this.state = E)
        }
        ,
        f.prototype.didMountNewGraph = function(e) {
            var t = this;
            return this.$newGraph = n(e),
            this.$newGraph.on("keydown", function(e) {
                if (g.lookup(e) === g.DOWN) {
                    var r = t.getSavedAndExampleGraphs();
                    return t.previewItem(r[0]),
                    e.preventDefault(),
                    e.stopPropagation()
                }
            })
        }
        ,
        f.prototype.sanitizeTitle = function(e) {
            return e.example ? this.controller.s(e.title) : e.title || this.graphsController.getUntitledString()
        }
        ,
        f.prototype.init = function() {
            this.state = E,
            this.controller = this.props.controller(),
            this.graphsController = this.controller.graphsController
        }
        ,
        f.prototype.template = function() {
            var e = this;
            return r.createElement("div", {
                class: function() {
                    return {
                        "dcg-mygraphs": !0,
                        "logged-in": e.controller.userController.isLoggedIn(),
                        "preview-mode": !!e.props.previewMode(),
                        "maintenance-mode": !!e.props.maintenanceMode()
                    }
                }
            }, r.createElement("div", {
                class: r.const("dcg-resources-container")
            }, r.createElement(y, {
                predicate: function() {
                    return e.props.accountsEnabled() && !e.controller.userController.isLoggedIn() && !e.props.previewMode() && !e.props.maintenanceMode()
                }
            }, function() {
                return r.createElement(p.AccountReminder, {
                    onCreateAccount: e.props.onCreateAccount,
                    onSignIn: e.props.onSignIn,
                    controller: e.props.controller
                })
            }), r.createElement(y, {
                predicate: function() {
                    return e.controller.userController.isLoggedIn()
                }
            }, function() {
                return r.createElement("div", null, r.createElement(y, {
                    predicate: function() {
                        return e.controller.userController.isLoggedIn() && e.state === E
                    }
                }, function() {
                    return r.createElement(c.SyncingStatusBar, {
                        isSyncingGraphs: function() {
                            return e.props.graphsController().isSyncing()
                        },
                        didSyncFail: function() {
                            return e.props.graphsController().didSyncFail()
                        },
                        requestSyncGraphs: e.props.refreshGraphs,
                        s: e.controller.s
                    })
                }), r.createElement(i.UserBar, {
                    controller: e.props.controller,
                    openSearch: e.openSearch.bind(e),
                    closeSearch: e.closeSearch.bind(e),
                    updateFilter: e.updateFilter.bind(e),
                    isSearching: function() {
                        return e.state === C
                    },
                    s: e.controller.s
                }))
            }), r.createElement("div", {
                class: r.const("dcg-scrollable"),
                didMount: this.didMountScrollable.bind(this)
            }, r.createElement("div", {
                class: r.const("dcg-scrollable-interior")
            }, r.createElement(y, {
                predicate: this.props.maintenanceMode
            }, function() {
                return r.createElement("div", {
                    class: r.const("maintenance-mode")
                }, function() {
                    return e.controller.s("account-shell-text-mygraphs-maintenance-mode")
                })
            }), r.createElement(y, {
                predicate: this.props.previewMode
            }, function() {
                return r.createElement("div", {
                    class: r.const("maintenance-mode")
                }, function() {
                    var t;
                    return null === (t = e.props.previewMode()) || void 0 === t ? void 0 : t.message
                }, r.createElement("br", null), r.createElement("a", {
                    tabindex: r.const("0"),
                    class: r.const("dcg-btn-green"),
                    href: function() {
                        var t;
                        return null === (t = e.props.previewMode()) || void 0 === t ? void 0 : t.url
                    },
                    target: r.const("_blank")
                }, function() {
                    return e.controller.s("account-shell-text-mygraphs-share-thoughts")
                }))
            }), r.createElement(y, {
                predicate: function() {
                    return e.state !== C && e.controller.shouldShowArtContestNudge()
                }
            }, function() {
                return r.createElement("div", {
                    onTap: function(t) {
                        e.controller.dispatch({
                            type: "show-modal",
                            modal: "contest-submission",
                            device: t.device
                        })
                    },
                    class: r.const("dcg-sidebar-contest-submit")
                }, r.createElement("span", {
                    class: r.const("dcg-trophy-icon")
                }, r.const("🏆")), r.createElement(v.Localize, {
                    i18n: e.const(e.controller),
                    key: e.const("account-shell-text-mygraphs-submit-to-contest")
                }, r.createElement("span", {
                    class: r.const("dcg-contest-submit-message")
                }, r.const("Submit this graph to the"), r.const(" "), r.createElement("span", {
                    class: r.const("dcg-bold-text")
                }, r.const("Global Math Art Contest!")))))
            }), r.createElement(y, {
                predicate: function() {
                    return e.state !== C
                }
            }, function() {
                return r.createElement("div", {
                    role: r.const("link"),
                    tabindex: r.const("0"),
                    class: r.const("new-blank-graph dcg-action-newblankgraph"),
                    onTap: function() {
                        return e.previewItem(null),
                        e.props.openBlankGraph()
                    },
                    didMount: e.didMountNewGraph.bind(e)
                }, r.createElement("div", {
                    class: r.const("new-blank-graph-inner")
                }, r.createElement("span", {
                    class: r.const("dcg-add-blank")
                }, r.createElement("i", {
                    class: r.const("dcg-icon-plus")
                })), r.createElement("span", {
                    class: r.const("dcg-new-graph-title")
                }, function() {
                    return "geometry" === e.props.controller().getProduct() ? e.controller.s("account-shell-text-mygraphs-new-construction") : e.controller.s("account-shell-text-mygraphs-new-blank-graph")
                })))
            }), r.createElement(y, {
                predicate: function() {
                    return !e.props.maintenanceMode() && !e.props.previewMode() && e.controller.userController.isLoggedIn() && e.state !== C
                }
            }, function() {
                return r.createElement("div", null, r.createElement(d.default, {
                    title: function() {
                        return "geometry" === e.props.controller().getProduct() ? e.controller.s("account-shell-text-mygraphs-current-construction") : e.controller.s("account-shell-text-mygraphs-current-graph")
                    }
                }), r.createElement(l.GraphInProgress, {
                    getTitle: function() {
                        return e.getPreviewTitle()
                    },
                    getDisplayDate: function() {
                        return e.controller.unpack(e.props.graphsController().getCurrentDisplayDate())
                    },
                    isOpen: e.props.isOpen,
                    getThumbnail: e.props.getThumbnail,
                    isSaveEnabled: e.props.isSaveEnabled,
                    simpleSave: function() {
                        return e.props.simpleSave(),
                        e.previewItem(null)
                    },
                    openSaveDialog: function() {
                        return e.props.openSaveDialog(),
                        e.previewItem(null)
                    },
                    wasCurrentGraphEverSaved: function() {
                        return e.props.graphsController().wasCurrentGraphEverSaved()
                    },
                    isSaving: function() {
                        return e.props.graphsController().isSaving()
                    },
                    didSaveRecentlySucceed: function() {
                        return e.props.graphsController().didSaveSucceed()
                    },
                    didSaveRecentlyFail: function() {
                        return e.props.graphsController().didSaveFail()
                    },
                    s: e.controller.s
                }), r.createElement(y, {
                    predicate: e.bindFn(e.shouldShowAttemptRecoveryText)
                }, function() {
                    return r.createElement("div", {
                        class: r.const("dcg-lost-work-link")
                    }, w(function() {
                        return e.isAttemptingRecovery()
                    }, {
                        true: function() {
                            return r.createElement("span", null, r.createElement("span", null, function() {
                                return e.controller.s("account-shell-text-mygraphs-attempting-recovery")
                            }), r.createElement("span", {
                                class: r.const("dcg-spinner-dark")
                            }))
                        },
                        false: function() {
                            return r.createElement("span", null, r.createElement("span", null, function() {
                                return e.controller.s("account-shell-text-mygraphs-lost-work") + " "
                            }), r.createElement("span", {
                                tabIndex: r.const(0),
                                role: r.const("link"),
                                class: r.const("dcg-attempt-recovery"),
                                onTap: e.bindFn(e.attemptRecovery)
                            }, function() {
                                return e.controller.s("account-shell-button-mygraphs-attempt-recovery")
                            }))
                        }
                    }))
                }))
            }), r.createElement(y, {
                predicate: function() {
                    return !e.props.maintenanceMode() && !e.props.previewMode() && e.controller.userController.isLoggedIn() && e.hasAttemptedRecovery() && e.state !== C
                }
            }, function() {
                return r.createElement("div", null, w(function() {
                    return e.getRecoveryGraphs().length
                }, {
                    true: function() {
                        return r.createElement("div", {
                            class: r.const("dcg-recovery-graphs-list")
                        }, r.createElement(d.default, {
                            title: function() {
                                return e.controller.s("account-shell-heading-mygraphs-recovered-work")
                            }
                        }), r.createElement(G, {
                            each: function() {
                                return e.getRecoveryGraphs()
                            },
                            key: function(e) {
                                return e.getCollectionKey()
                            }
                        }, r.createElement("div", {
                            role: r.const("list")
                        }, function(t) {
                            return r.createElement(a.Item, {
                                onTap: function(r) {
                                    return e.onTapGraph(t, r)
                                },
                                onFocus: function() {
                                    return e.onFocusGraph(t)
                                },
                                cancelDeleteGraph: function() {
                                    return e.props.graphsController().cancelDeleteGraph(t)
                                },
                                requestDeleteGraph: function() {
                                    return e.logRecoveryClientEvent("delete"),
                                    e.previewItem(null),
                                    e.props.graphsController().requestDeleteGraph(t)
                                },
                                isDeletingGraph: function() {
                                    return e.props.graphsController().isDeletingGraph(t)
                                },
                                canCancelDelete: function() {
                                    return e.props.graphsController().canCancelDelete(t)
                                },
                                didDeleteGraphFail: function() {
                                    return e.props.graphsController().didDeleteGraphFail(t)
                                },
                                isSelected: function() {
                                    return t === e.previewGraph
                                },
                                isExample: r.const(!1),
                                getDisplayDate: function() {
                                    return e.controller.unpack(t.displayDate())
                                },
                                getTitle: function() {
                                    return e.sanitizeTitle(t)
                                },
                                getThumbURL: function() {
                                    return t.thumbURL
                                },
                                s: e.controller.s
                            })
                        })))
                    },
                    false: function() {
                        return r.createElement("div", {
                            class: r.const("dcg-no-recovery-graphs")
                        }, function() {
                            return e.controller.s("account-shell-text-mygraphs-no-unsaved-graphs")
                        })
                    }
                }))
            }), r.createElement(y, {
                predicate: function() {
                    return e.controller.userController.isLoggedIn()
                }
            }, function() {
                return r.createElement(d.default, {
                    title: function() {
                        return "geometry" === e.props.controller().getProduct() ? e.controller.s("account-shell-heading-mygraphs-saved-constructions") : e.controller.s("account-shell-heading-mygraphs-saved-graphs")
                    }
                })
            }), r.createElement(G, {
                each: function() {
                    return e.sliceGraphs(e.filterGraphs(e.getSavedGraphs()))
                },
                key: function(e) {
                    return e.getCollectionKey()
                }
            }, r.createElement("div", {
                class: r.const("dcg-saved-graphs-list"),
                role: r.const("list")
            }, function(t) {
                return r.createElement(a.Item, {
                    onTap: function(r) {
                        return e.onTapGraph(t, r)
                    },
                    onFocus: function() {
                        return e.onFocusGraph(t)
                    },
                    cancelDeleteGraph: function() {
                        return e.props.graphsController().cancelDeleteGraph(t)
                    },
                    requestDeleteGraph: function() {
                        return e.previewItem(null),
                        e.props.graphsController().requestDeleteGraph(t)
                    },
                    isDeletingGraph: function() {
                        return e.props.graphsController().isDeletingGraph(t)
                    },
                    canCancelDelete: function() {
                        return e.props.graphsController().canCancelDelete(t)
                    },
                    didDeleteGraphFail: function() {
                        return e.props.graphsController().didDeleteGraphFail(t)
                    },
                    isSelected: function() {
                        return t === e.previewGraph
                    },
                    isExample: r.const(!1),
                    getDisplayDate: function() {
                        return e.controller.unpack(t.displayDate())
                    },
                    getTitle: function() {
                        return e.sanitizeTitle(t)
                    },
                    getThumbURL: function() {
                        return t.thumbURL
                    },
                    s: e.controller.s
                })
            })), r.createElement(y, {
                predicate: function() {
                    return e.controller.userController.isLoggedIn() && 0 === e.filterGraphs(e.getSavedGraphs()).length
                }
            }, function() {
                return r.createElement("div", {
                    "aria-live": r.const("assertive"),
                    "aria-atomic": r.const("true"),
                    class: r.const("no-matches")
                }, function() {
                    return e.state === C ? e.controller.s("account-shell-text-mygraphs-no-search-results") : e.controller.s("account-shell-text-mygraphs-no-saved-graphs")
                })
            }), r.createElement(y, {
                predicate: function() {
                    return e.canShowMore(e.filterGraphs(e.getSavedGraphs()))
                }
            }, function() {
                return r.createElement("div", {
                    class: r.const("dcg-show-more-graphs"),
                    onTap: e.showMoreGraphs.bind(e),
                    role: r.const("button"),
                    tabindex: r.const(0)
                }, function() {
                    return e.controller.s("account-shell-text-mygraphs-count-more", {
                        count: e.getCountRemaining()
                    })
                })
            }), r.createElement(d.default, {
                title: function() {
                    return e.controller.s("account-shell-heading-mygraphs-examples")
                }
            }), r.createElement(G, {
                each: function() {
                    return e.filterGraphs(e.getExampleGraphs())
                },
                key: function(e) {
                    return e.getCollectionKey()
                }
            }, r.createElement("div", {
                role: r.const("list")
            }, function(t) {
                return r.createElement(a.Item, {
                    onTap: function(r) {
                        return e.onTapGraph(t, r)
                    },
                    onFocus: function() {
                        return e.onFocusGraph(t)
                    },
                    cancelDeleteGraph: function() {},
                    requestDeleteGraph: function() {},
                    isDeletingGraph: r.const(!1),
                    didDeleteGraphFail: r.const(!1),
                    canCancelDelete: r.const(!1),
                    isSelected: function() {
                        return t === e.previewGraph
                    },
                    isExample: r.const(!0),
                    getDisplayDate: function() {
                        return e.controller.unpack(t.displayDate())
                    },
                    getTitle: function() {
                        return e.sanitizeTitle(t)
                    },
                    getThumbURL: function() {
                        return t.thumbURL
                    },
                    s: e.controller.s
                })
            })), r.createElement(y, {
                predicate: function() {
                    return !!e.getFilter() && 0 === e.filterGraphs(e.getExampleGraphs()).length
                }
            }, function() {
                return r.createElement("div", {
                    "aria-live": r.const("assertive"),
                    "aria-atomic": r.const("true"),
                    class: r.const("no-matches")
                }, function() {
                    return e.controller.s("account-shell-text-mygraphs-no-examples-match-search")
                })
            }), r.createElement("div", {
                class: r.const("dcg-mygraphs-legal")
            }, r.createElement("a", {
                href: r.const("/terms"),
                target: r.const("_blank")
            }, function() {
                return e.controller.s("account-shell-link-terms")
            }), r.const("|"), r.createElement("a", {
                href: r.const("/privacy"),
                target: r.const("_blank")
            }, function() {
                return e.controller.s("account-shell-link-privacy")
            }), r.createElement(y, {
                predicate: function() {
                    return !!e.props.versionNumber()
                }
            }, function() {
                return r.createElement("div", {
                    class: r.const("dcg-version")
                }, function() {
                    return e.controller.s("account-shell-text-mygraphs-version")
                }, r.const(" "), e.props.versionNumber)
            })))), r.createElement(y, {
                predicate: function() {
                    return e.previewGraph
                }
            }, function() {
                return r.createElement(s.GraphPreview, {
                    alignToNode: function() {
                        return e.getSelectedNode()
                    },
                    getTitle: function() {
                        if (null != e.previewGraph)
                            return e.sanitizeTitle(e.previewGraph)
                    },
                    getGraphData: function() {
                        return null != e.previewGraph ? e.previewGraph.graphData : void 0
                    },
                    onCancel: function() {
                        return e.previewItem(null)
                    },
                    didDataLoadFail: function() {
                        return e.didDataLoadFail(e.previewGraph)
                    },
                    requestLoadGraphData: e.fetchSelectedGraph.bind(e),
                    onOpenGraph: e.onOpenPreviewGraph.bind(e),
                    s: e.controller.s,
                    makeAPI: e.props.makeAPI,
                    getOpenText: function() {
                        return e.controller.getOpenText()
                    }
                })
            })), r.createElement(y, {
                predicate: this.props.isOpen
            }, function() {
                return r.createElement("div", {
                    role: r.const("link"),
                    tabindex: r.const(0),
                    class: r.const("dcg-resources-cover dcg-action-close-resources"),
                    style: function() {
                        return {
                            opacity: null != e.previewGraph ? .6 : 0
                        }
                    },
                    onTap: function() {
                        return null != e.previewGraph ? e.previewItem(null) : e.props.closeDrawer()
                    },
                    "aria-label": function() {
                        return null != e.previewGraph ? e.controller.s("account-shell-button-mygraphs-close-graph-preview") : e.controller.s("account-shell-button-mygraphs-close-graph-list")
                    }
                })
            }), r.createElement(y, {
                predicate: function() {
                    return null != e.graphWithCover
                }
            }, function() {
                return r.createElement("div", {
                    class: r.const("dcg-fullscreen-loading-container")
                }, r.createElement(y, {
                    predicate: function() {
                        return null != (null != e.graphWithCover ? e.graphWithCover.graphData : void 0)
                    }
                }, function() {
                    return r.createElement("div", {
                        "aria-live": r.const("assertive"),
                        "aria-atomic": r.const("true"),
                        class: r.const("dcg-graph-loading")
                    }, r.createElement("div", {
                        class: r.const("pulsing-message")
                    }, function() {
                        return e.controller.s("account-shell-text-mygraphs-opening")
                    }), r.createElement("div", {
                        class: r.const("slow-loading")
                    }, function() {
                        return e.getSlowLoadingText()
                    }))
                }), r.createElement(y, {
                    predicate: function() {
                        return null == (null != e.graphWithCover ? e.graphWithCover.graphData : void 0)
                    }
                }, function() {
                    return r.createElement(u.LoadGraphView, {
                        didDataLoadFail: function() {
                            return e.didDataLoadFail(e.graphWithCover)
                        },
                        onCancel: e.cancelLoadGraphWithCover.bind(e),
                        requestLoadGraphData: function() {
                            return e.openGraphWithCover(e.graphWithCover)
                        },
                        s: e.controller.s
                    })
                }))
            }))
        }
        ,
        f.prototype.getPreviewTitle = function() {
            return this.graphsController.getCurrentGraphTitle() || this.graphsController.getUntitledString()
        }
        ,
        f.prototype.getSlowLoadingText = function() {
            return "graphing" === this.graphsController.product ? this.controller.s("account-shell-text-mygraphs-slow-big-graphs") : "geometry" === this.graphsController.product ? this.controller.s("account-shell-text-mygraphs-slow-big-constructions") : ""
        }
        ,
        f.prototype.logRecoveryClientEvent = function(e) {
            m.logJSON("recovered-graph", {
                product: this.controller.graphsController.product,
                timeSincePageload: Date.now() - this.controller.mygraphsController.pageLoadTime,
                payloadJSON: {
                    action: e
                }
            })
        }
        ,
        f
    }(r.Class);
    e.Mygraphs = b
});

define('expressions/add_expression_view', ["require", "exports", "tslib", "keys", "browser", "dcgview", "jquery", "./image-upload-view", "main/manage-focus-helper", "../shared-components/tooltip", "loadcss!add_expression"], function(require, e, t, n, o, r, c, a, l, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = r.Components.If
      , d = function(e) {
        function d() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(d, e),
        d.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        d.prototype.template = function() {
            var e = this;
            return r.createElement("div", {
                class: r.const("dcg-add-expression-container")
            }, r.createElement(i.Tooltip, {
                tooltip: function() {
                    return e.controller.s("graphing-calculator-label-add-item-tooltip")
                },
                gravity: function() {
                    return e.controller.isNarrow() ? "ne" : "se"
                }
            }, r.createElement("span", {
                class: function() {
                    return {
                        "dcg-icon-btn": !0,
                        "dcg-add-expression-btn": !0,
                        "dcg-action-add-expression": !0,
                        "dcg-do-blur": !0,
                        "dcg-active": e.controller.isAddExpressionOpen()
                    }
                },
                handleEvent: r.const("true"),
                role: r.const("button"),
                tabindex: r.const("0"),
                "aria-haspopup": r.const("true"),
                "aria-expanded": function() {
                    return e.controller.isAddExpressionOpen()
                },
                "aria-label": function() {
                    return e.controller.s("graphing-calculator-label-add-item-tooltip")
                },
                didMount: function(t) {
                    e.toggleButtonNode = t
                },
                onTap: this.bindFn(this.toggleAddExpression),
                manageFocus: this.const(l.manageFocusHelper({
                    controller: this.controller,
                    location: {
                        type: "add-item-btn"
                    }
                }))
            }, r.createElement("i", {
                class: r.const("dcg-icon-plus")
            }))), r.createElement(s, {
                predicate: function() {
                    return e.controller.isAddExpressionOpen()
                }
            }, function() {
                return r.createElement("div", {
                    class: function() {
                        return {
                            "dcg-add-expression-dropdown": !0,
                            "dcg-popover": !0,
                            "dcg-bottom": !e.controller.isNarrow(),
                            "dcg-right": e.controller.isNarrow()
                        }
                    },
                    role: r.const("complementary"),
                    "aria-label": function() {
                        return e.controller.s("graphing-calculator-narration-add-item-menu")
                    },
                    didMount: e.bindFn(e.didMountPopover),
                    didUnmount: e.bindFn(e.didUnmountPopover)
                }, r.createElement("div", {
                    class: r.const("dcg-popover-interior")
                }, r.createElement("div", {
                    class: r.const("dcg-new-item dcg-do-not-blur dcg-action-newexpression"),
                    role: r.const("button"),
                    tabindex: r.const(0),
                    "aria-label": function() {
                        return e.controller.s("graphing-calculator-narration-add-expression")
                    },
                    onTap: e.bindFn(e.newExpression),
                    handleEvent: r.const("true"),
                    manageFocus: e.const(l.manageFocusHelper({
                        controller: e.controller,
                        location: {
                            type: "add-expression-btn"
                        }
                    }))
                }, r.createElement("i", {
                    class: r.const("dcg-icon-new-expression dcg-expression-icon")
                }), function() {
                    return e.controller.s("graphing-calculator-label-expression-lowercase")
                }), r.createElement(s, {
                    predicate: function() {
                        return e.controller.areNotesEnabled()
                    }
                }, function() {
                    return r.createElement("div", {
                        class: r.const("dcg-new-item dcg-do-not-blur dcg-action-newtext"),
                        role: r.const("button"),
                        tabindex: r.const(0),
                        "aria-label": function() {
                            return e.controller.s("graphing-calculator-narration-add-note")
                        },
                        onTap: e.bindFn(e.newText),
                        handleEvent: r.const("true"),
                        manageFocus: e.const(l.manageFocusHelper({
                            controller: e.controller,
                            location: {
                                type: "add-note-btn"
                            }
                        }))
                    }, r.createElement("i", {
                        class: r.const("dcg-icon-new-text dcg-expression-icon")
                    }), function() {
                        return e.controller.s("graphing-calculator-label-note-lowercase")
                    })
                }), r.createElement("div", {
                    class: r.const("dcg-new-item dcg-do-not-blur dcg-action-newtable"),
                    role: r.const("button"),
                    tabindex: r.const(0),
                    "aria-label": function() {
                        return e.controller.s("graphing-calculator-narration-add-table")
                    },
                    onTap: e.bindFn(e.newTable),
                    handleEvent: r.const("true"),
                    manageFocus: e.const(l.manageFocusHelper({
                        controller: e.controller,
                        location: {
                            type: "add-table-btn"
                        }
                    }))
                }, r.createElement("i", {
                    class: r.const("dcg-icon-new-table dcg-expression-icon")
                }), function() {
                    return e.controller.s("graphing-calculator-label-table-lowercase")
                }), r.createElement(s, {
                    predicate: function() {
                        return e.controller.areFoldersEnabled()
                    }
                }, function() {
                    return r.createElement("div", {
                        class: r.const("dcg-new-item dcg-do-not-blur dcg-action-newfolder"),
                        role: r.const("button"),
                        tabindex: r.const(0),
                        "aria-label": function() {
                            return e.controller.s("graphing-calculator-narration-add-folder")
                        },
                        onTap: e.bindFn(e.newFolder),
                        handleEvent: r.const("true"),
                        manageFocus: e.const(l.manageFocusHelper({
                            controller: e.controller,
                            location: {
                                type: "add-folder-btn"
                            }
                        }))
                    }, r.createElement("i", {
                        class: r.const("dcg-icon-new-folder dcg-expression-icon")
                    }), function() {
                        return e.controller.s("graphing-calculator-label-folder-lowercase")
                    })
                }), r.createElement(s, {
                    predicate: function() {
                        return e.controller.areImagesEnabled()
                    }
                }, function() {
                    return r.createElement(a.ImageUploadView, {
                        controller: function() {
                            return e.controller
                        },
                        ariaLabel: function() {
                            return e.controller.s("graphing-calculator-narration-add-image")
                        },
                        onFileChange: function(t) {
                            return e.insertFiles(t)
                        },
                        location: e.const({
                            type: "add-image-btn"
                        })
                    }, r.createElement("div", {
                        class: r.const("dcg-new-item dcg-action-newimage")
                    }, r.createElement("i", {
                        class: r.const("dcg-icon-new-image dcg-expression-icon")
                    }), function() {
                        return e.controller.s("graphing-calculator-label-image-lowercase")
                    }))
                }), r.createElement(s, {
                    predicate: e.bindFn(e.showAddTicker)
                }, function() {
                    return r.createElement("div", {
                        class: r.const("dcg-new-item dcg-do-not-blur dcg-action-ticker"),
                        role: r.const("button"),
                        tabindex: r.const(0),
                        "aria-label": function() {
                            return e.controller.s("graphing-calculator-narration-add-ticker")
                        },
                        onTap: e.bindFn(e.addTicker),
                        handleEvent: r.const("true"),
                        manageFocus: e.const(l.manageFocusHelper({
                            controller: e.controller,
                            location: {
                                type: "add-ticker-btn"
                            }
                        }))
                    }, r.createElement("i", {
                        class: r.const("dcg-icon-metronome dcg-expression-icon")
                    }), function() {
                        return e.controller.s("graphing-calculator-label-ticker-lowercase")
                    })
                })), r.createElement("span", {
                    class: r.const("dcg-arrow")
                }))
            }))
        }
        ,
        d.prototype.showAddTicker = function() {
            return this.controller.areActionsEnabled() && !this.controller.getTickerOpen()
        }
        ,
        d.prototype.didMountPopover = function(e) {
            var t = this;
            this.popoverNode = e,
            c(document).on("dcg-tapstart.add-expression-view wheel.add-expression-view", function(e) {
                t.eventShouldClosePopover(e) && t.controller.dispatch({
                    type: "close-add-expression",
                    focusIconAfterClose: "keyboard" === e.device
                })
            }),
            c(document).on("keydown.add-expression-view", function(e) {
                if ("Esc" === n.lookup(e) && t.controller.dispatch({
                    type: "close-add-expression",
                    focusIconAfterClose: !0
                }),
                "Tab" === n.lookup(e) && !e.altKey && !e.metaKey && !e.ctrlKey) {
                    var o = t.controller.getFocusLocation();
                    if (!o)
                        return;
                    var r = void 0;
                    r = t.showAddTicker() ? {
                        type: "add-ticker-btn"
                    } : t.controller.areImagesEnabled() ? {
                        type: "add-image-btn"
                    } : t.controller.areFoldersEnabled() ? {
                        type: "add-folder-btn"
                    } : {
                        type: "add-table-btn"
                    },
                    e.shiftKey || o.type !== r.type ? e.shiftKey && "add-item-btn" === o.type && (t.controller.dispatch({
                        type: "set-focus-location",
                        location: r
                    }),
                    e.preventDefault(),
                    e.stopPropagation()) : (t.controller.dispatch({
                        type: "set-focus-location",
                        location: {
                            type: "add-item-btn"
                        }
                    }),
                    e.preventDefault(),
                    e.stopPropagation())
                }
            }),
            o.IS_IPAD && o.IS_IN_IFRAME && c(e).on("dcg-tapstart", function(e) {
                return e.preventDefault()
            }),
            c(e).find(".dcg-new-item").on("touchstart", function(e) {
                return e.preventDefault()
            })
        }
        ,
        d.prototype.didUnmountPopover = function() {
            c(document).off(".add-expression-view")
        }
        ,
        d.prototype.toggleAddExpression = function(e) {
            this.controller.dispatch({
                type: "toggle-add-expression",
                focusOnOpen: "keyboard" === e.device
            })
        }
        ,
        d.prototype.newExpression = function() {
            this.controller.dispatch({
                type: "new-expression"
            })
        }
        ,
        d.prototype.newText = function() {
            this.controller.dispatch({
                type: "new-text"
            })
        }
        ,
        d.prototype.newFolder = function() {
            this.controller.dispatch({
                type: "new-folder"
            })
        }
        ,
        d.prototype.addTicker = function() {
            this.controller.dispatch({
                type: "open-ticker"
            })
        }
        ,
        d.prototype.newTable = function() {
            this.controller.dispatch({
                type: "new-table"
            })
        }
        ,
        d.prototype.insertFiles = function(e) {
            this.controller.dispatch({
                type: "new-images",
                files: e
            })
        }
        ,
        d.prototype.eventShouldClosePopover = function(e) {
            var t = !!c(e.target).closest(this.popoverNode).length
              , n = !!c(e.target).closest(this.toggleButtonNode).length;
            return !(t || n)
        }
        ,
        d
    }(r.Class);
    e.default = d
});

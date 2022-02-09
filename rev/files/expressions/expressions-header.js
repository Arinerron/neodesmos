
define('expressions/expressions-header', ["require", "exports", "tslib", "./add_expression_view", "dcgview", "main/manage-focus-helper", "../shared-components/tooltip", "loadcss!./expressions-header"], function(require, t, n, e, o, r, c) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = o.Components.If
      , i = function(t) {
        function i() {
            return null !== t && t.apply(this, arguments) || this
        }
        return n.__extends(i, t),
        i.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        i.prototype.template = function() {
            var t = this;
            return o.createElement("div", {
                class: function() {
                    return {
                        "dcg-expression-top-bar": !0,
                        "dcg-expressions-scrolled": t.showShadow()
                    }
                },
                role: o.const("toolbar"),
                "aria-label": function() {
                    return t.controller.s("graphing-calculator-narration-expression-bar")
                },
                didMount: function(n) {
                    t.node = n
                },
                onTapStart: this.bindFn(this.clearSelectionOnMobile),
                style: function() {
                    return {
                        background: t.controller.hasBackgroundColor() ? t.controller.getPillboxBackgroundColor() : void 0
                    }
                }
            }, o.createElement("div", {
                class: o.const("dcg-left-buttons")
            }, o.createElement(l, {
                predicate: this.bindFn(this.showHamburger)
            }, function() {
                return o.createElement("span", {
                    class: o.const("dcg-action-opendrawer dcg-tooltip dcg-icon-btn dcg-in-api-action-opendrawer"),
                    handleEvent: o.const("true"),
                    tooltip: function() {
                        return t.controller.s("graphing-calculator-label-open-graph-tooltip")
                    },
                    role: o.const("button"),
                    tabindex: o.const("0"),
                    "aria-label": function() {
                        return t.controller.s("graphing-calculator-narration-open-graph")
                    },
                    onTap: function() {
                        return t.controller.dispatch({
                            type: "open-drawer"
                        })
                    }
                }, o.createElement("i", {
                    class: o.const("dcg-icon-hamburger")
                }))
            }), o.createElement(l, {
                predicate: function() {
                    return !t.controller.isInEditListMode()
                }
            }, function() {
                return o.createElement(e.default, {
                    controller: function() {
                        return t.props.controller()
                    }
                })
            }), o.createElement(l, {
                predicate: this.bindFn(this.showRerandomize)
            }, function() {
                return o.createElement(c.Tooltip, {
                    tooltip: function() {
                        return t.controller.s("graphing-calculator-label-randomize-tooltip")
                    },
                    gravity: function() {
                        return t.controller.isNarrow() ? "n" : "s"
                    }
                }, o.createElement("span", {
                    class: o.const("dcg-icon-btn"),
                    handleEvent: o.const("true"),
                    role: o.const("button"),
                    tabindex: o.const("0"),
                    "aria-label": function() {
                        return t.controller.s("graphing-calculator-label-randomize-tooltip")
                    },
                    onTap: function() {
                        return t.controller.dispatch({
                            type: "re-randomize"
                        })
                    }
                }, o.createElement("i", {
                    class: o.const("dcg-icon-randomize")
                })))
            }), o.createElement(l, {
                predicate: function() {
                    return t.controller.isInEditListMode() && !t.controller.hasDefaultState()
                }
            }, function() {
                return o.createElement("span", {
                    class: o.const("dcg-btn-red dcg-action-clearall"),
                    role: o.const("button"),
                    tabindex: o.const("0"),
                    onTap: function() {
                        return t.controller.dispatch({
                            type: "clear-graph"
                        })
                    }
                }, function() {
                    return t.controller.s("graphing-calculator-button-clear-graph")
                })
            }), o.createElement(l, {
                predicate: function() {
                    return t.controller.isInEditListMode() && t.controller.hasDefaultState()
                }
            }, function() {
                return o.createElement("span", {
                    class: o.const("dcg-btn-red dcg-action-reset"),
                    role: o.const("button"),
                    tabindex: o.const("0"),
                    onTap: function() {
                        return t.controller.dispatch({
                            type: "reset-graph"
                        })
                    }
                }, function() {
                    return t.controller.s("graphing-calculator-button-reset-graph")
                })
            })), o.createElement("div", {
                class: o.const("dcg-center-buttons")
            }, o.createElement(c.Tooltip, {
                tooltip: function() {
                    return t.controller.s("graphing-calculator-label-undo-tooltip")
                },
                gravity: function() {
                    return t.controller.isNarrow() ? "n" : "s"
                },
                disabled: function() {
                    return !t.controller.canUndo()
                }
            }, o.createElement("span", {
                class: function() {
                    return {
                        "dcg-action-undo": !0,
                        "dcg-icon-btn": !0,
                        "dcg-disabled": !t.controller.canUndo()
                    }
                },
                role: o.const("button"),
                tabindex: function() {
                    return t.controller.canUndo() ? 0 : -1
                },
                "aria-label": function() {
                    return t.controller.s("graphing-calculator-narration-undo")
                },
                onTap: function() {
                    return t.controller.dispatch({
                        type: "undo"
                    })
                },
                "aria-disabled": function() {
                    return !t.controller.canUndo()
                }
            }, o.createElement("i", {
                class: o.const("dcg-icon-undo")
            }))), o.createElement(c.Tooltip, {
                tooltip: function() {
                    return t.controller.s("graphing-calculator-label-redo-tooltip")
                },
                gravity: function() {
                    return t.controller.isNarrow() ? "n" : "s"
                },
                disabled: function() {
                    return !t.controller.canRedo()
                }
            }, o.createElement("span", {
                class: function() {
                    return {
                        "dcg-action-redo": !0,
                        "dcg-icon-btn": !0,
                        "dcg-disabled": !t.controller.canRedo()
                    }
                },
                role: o.const("button"),
                tabindex: function() {
                    return t.controller.canRedo() ? 0 : -1
                },
                "aria-label": function() {
                    return t.controller.s("graphing-calculator-narration-redo")
                },
                onTap: function() {
                    return t.controller.dispatch({
                        type: "redo"
                    })
                },
                "aria-disabled": function() {
                    return !t.controller.canRedo()
                }
            }, o.createElement("i", {
                class: o.const("dcg-icon-redo")
            })))), o.createElement("div", {
                class: o.const("dcg-right-buttons")
            }, o.createElement(l, {
                predicate: function() {
                    return !t.controller.isInEditListMode()
                }
            }, function() {
                return o.createElement(c.Tooltip, {
                    tooltip: function() {
                        return t.controller.s("graphing-calculator-label-edit-list-tooltip")
                    },
                    gravity: function() {
                        return t.controller.isNarrow() ? "n" : "s"
                    }
                }, o.createElement("span", {
                    class: o.const("dcg-icon-btn dcg-action-toggle-edit"),
                    handleEvent: o.const("true"),
                    role: o.const("button"),
                    tabindex: o.const("0"),
                    "aria-label": function() {
                        return t.controller.s("graphing-calculator-narration-edit-expression-list")
                    },
                    onTap: t.bindFn(t.toggleEditListMode),
                    manageFocus: t.const(r.manageFocusHelper({
                        controller: t.controller,
                        location: {
                            type: "edit-list-toggle"
                        }
                    }))
                }, o.createElement("i", {
                    class: o.const("dcg-icon-settings")
                })))
            }), o.createElement(l, {
                predicate: function() {
                    return t.controller.isInEditListMode()
                }
            }, function() {
                return o.createElement("span", {
                    class: o.const("dcg-btn-blue dcg-action-toggle-edit dcg-do-not-blur"),
                    handleEvent: o.const("true"),
                    role: o.const("button"),
                    tabindex: o.const("0"),
                    onTap: t.bindFn(t.toggleEditListMode),
                    manageFocus: t.const(r.manageFocusHelper({
                        controller: t.controller,
                        location: {
                            type: "edit-list-toggle"
                        }
                    }))
                }, function() {
                    return t.controller.s("graphing-calculator-button-done")
                })
            }), o.createElement(l, {
                predicate: function() {
                    return !t.controller.isInEditListMode() && t.controller.getGraphSettings().config.graphpaper
                }
            }, function() {
                return o.createElement(c.Tooltip, {
                    tooltip: function() {
                        return t.controller.s("graphing-calculator-label-hide-expression-list-tooltip")
                    },
                    gravity: function() {
                        return t.controller.isNarrow() ? "nw" : "sw"
                    }
                }, o.const(" "), o.createElement("span", {
                    class: function() {
                        return {
                            "dcg-resize-list-btn": !0,
                            "dcg-action-hideexpressions": !0,
                            "dcg-icon-btn": !0,
                            "dcg-rotated": t.controller.isNarrow()
                        }
                    },
                    role: o.const("button"),
                    tabindex: o.const("0"),
                    "aria-label": function() {
                        return t.controller.s("graphing-calculator-label-hide-expression-list-tooltip")
                    },
                    onTap: function(n) {
                        t.controller.dispatch({
                            type: "hide-expressions-list",
                            focusShowIcon: "keyboard" === n.device
                        })
                    },
                    manageFocus: t.const(r.manageFocusHelper({
                        controller: t.controller,
                        location: {
                            type: "hide-expression-list-btn"
                        }
                    }))
                }, o.createElement("i", {
                    class: o.const("dcg-icon-hide")
                })))
            })))
        }
        ,
        i.prototype.showShadow = function() {
            return !this.controller.getTickerOpen() && (!this.controller.getExpressionSearchOpen() && this.props.expsScrolled())
        }
        ,
        i.prototype.showRerandomize = function() {
            return this.controller.anyItemDependsOnRandomSeed()
        }
        ,
        i.prototype.showHamburger = function() {
            return !!this.controller.getGraphSettings().config.showHamburger && (!this.controller.isInEditListMode() && !this.controller.isNarrow())
        }
        ,
        i.prototype.clearSelectionOnMobile = function(t) {
            t.wasHandled() || this.controller.dispatch({
                type: "set-none-selected"
            })
        }
        ,
        i.prototype.toggleEditListMode = function(t) {
            this.controller.dispatch({
                type: "set-edit-list-mode",
                isEditListMode: !this.controller.isInEditListMode(),
                focusExpressionList: !1
            }),
            "keyboard" === t.device && this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "edit-list-toggle"
                }
            })
        }
        ,
        i
    }(o.Class);
    t.default = i
});
define('graphing-calc/views/main', ["require", "exports", "tslib", "touchtracking", "ipad.scrollfix", "dcgview", "jquery", "../../expressions/list-view", "graphing-calc/keypads/main", "main/pillbox-view", "main/toast-view", "main/disable-dragdrop-events", "main/manage-focus-helper", "../../shared-components/tooltip"], function(require, t, e, o, r, n, i, c, l, a, s, g, p, d) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = n.Components.If
      , f = function(t) {
        function f() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(f, t),
        f.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        f.prototype.settings = function() {
            return this.controller.getGraphSettings()
        }
        ,
        f.prototype.template = function() {
            var t = this;
            return n.createElement("div", {
                class: n.const("dcg-calculator-api-container"),
                style: n.const("width: 100%; height: 100%; position: relative;")
            }, n.createElement("div", {
                class: function() {
                    return {
                        "dcg-container": !0,
                        "dcg-fullscreen": !t.controller.isListVisible(),
                        "dcg-narrow": t.controller.isNarrow(),
                        "dcg-PROJECTOR-MODE": t.settings().config.projectorMode,
                        "dcg-inverted-colors": !!t.settings().config.invertedColors,
                        "dcg-EDIT-LIST-MODE": t.controller.isInEditListMode(),
                        "dcg-no-graphpaper": !t.settings().config.graphpaper,
                        "dcg-no-branding": !t.settings().config.branding,
                        "dcg-no-expression-topbar": !t.settings().config.expressionsTopbar,
                        "dcg-default-border": !!t.settings().config.border,
                        "dcg-no-hyperlinks": !t.settings().config.links,
                        "dcg-has-background-color": t.controller.hasBackgroundColor(),
                        "dcg-is-interactive": t.settings().config.expressions || !t.settings().config.lockViewport
                    }
                },
                style: function() {
                    return {
                        "font-size": t.settings().config.fontSize + "px",
                        background: t.getContainerBackgroundColor(),
                        color: t.controller.getTextColor()
                    }
                },
                role: n.const("application"),
                "aria-label": function() {
                    return t.controller.s("graphing-calculator-narration-main-desmos-graphing-calculator")
                },
                "x-ms-format-detection": n.const("none"),
                didMount: this.bindFn(this.didMountRoot)
            }, n.createElement(u, {
                predicate: function() {
                    return t.controller.getGraphSettings().config.expressions
                }
            }, function() {
                return n.createElement(c.default, {
                    controller: t.props.controller
                })
            }), n.createElement(u, {
                predicate: function() {
                    return t.controller.isListEnabled() && !t.controller.isListVisible()
                }
            }, function() {
                return n.createElement("div", {
                    class: function() {
                        return {
                            "dcg-overgraph-icon-container": !0,
                            "dcg-bottom-right": t.controller.isNarrow()
                        }
                    }
                }, n.createElement(d.Tooltip, {
                    tooltip: function() {
                        return t.controller.s("graphing-calculator-label-tooltip-show-list")
                    },
                    gravity: function() {
                        return t.controller.isNarrow() ? "nw" : "se"
                    }
                }, n.createElement("div", {
                    class: function() {
                        return {
                            "dcg-show-expressions-tab": !0,
                            "dcg-overgraph-icon": !0,
                            "dcg-rotated": t.controller.isNarrow()
                        }
                    },
                    "aria-label": function() {
                        return t.controller.s("graphing-calculator-label-tooltip-show-list")
                    },
                    role: n.const("button"),
                    tabindex: n.const("0"),
                    onTap: function(e) {
                        t.controller.dispatch({
                            type: "show-expressions-list",
                            focusHideIcon: "keyboard" === e.device
                        })
                    },
                    manageFocus: t.const(p.manageFocusHelper({
                        controller: t.controller,
                        location: {
                            type: "show-expression-list-btn"
                        }
                    }))
                }, n.createElement("i", {
                    class: n.const("dcg-icon-show")
                }))))
            }), n.createElement(u, {
                predicate: this.bindFn(this.showHamburger)
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-overgraph-icon-container")
                }, n.createElement(d.Tooltip, {
                    tooltip: function() {
                        return t.controller.s("graphing-calculator-label-tooltip-open-graph")
                    },
                    gravity: t.const("se")
                }, n.createElement("div", {
                    role: n.const("button"),
                    "aria-label": function() {
                        return t.controller.s("graphing-calculator-label-tooltip-open-graph")
                    },
                    class: n.const("dcg-action-opendrawer dcg-in-api-action-opendrawer dcg-overgraph-icon"),
                    onTap: function() {
                        return t.controller.dispatch({
                            type: "open-drawer"
                        })
                    }
                }, n.createElement("i", {
                    class: n.const("dcg-icon-hamburger")
                }))))
            }), n.createElement(a.default, {
                controller: this.props.controller
            }), n.createElement(s.ToastView, {
                message: function() {
                    var e = t.controller.getToastData().message;
                    return t.controller.raw(e || "")
                },
                link: function() {
                    return t.controller.getToastData().link || void 0
                },
                showUndo: function() {
                    return !!t.controller.getToastData().undoCallback
                },
                showLearnMore: function() {
                    return !!t.controller.getToastData().learnMoreCallback
                },
                noAria: function() {
                    return !!t.controller.getToastData().noAria
                },
                toastStyle: function() {
                    return t.controller.getToastData().toastStyle
                },
                s: this.controller.s,
                onUndo: function() {
                    return t.controller.dispatch({
                        type: "toast/undo"
                    })
                },
                onLearnMore: function() {
                    return t.controller.dispatch({
                        type: "toast/learn-more"
                    })
                },
                onClose: function() {
                    return t.controller.dispatch({
                        type: "toast/close"
                    })
                }
            }), n.createElement("div", {
                class: n.const("dcg-grapher")
            }), n.createElement(u, {
                predicate: function() {
                    return t.controller.getGraphSettings().config.keypad
                }
            }, function() {
                return n.createElement(l.default, {
                    controller: t.props.controller
                })
            })))
        }
        ,
        f.prototype.showHamburger = function() {
            return !!this.controller.getGraphSettings().config.showHamburger && (!this.controller.isInEditListMode() && this.controller.isNarrow())
        }
        ,
        f.prototype.getContainerBackgroundColor = function() {
            return this.controller.hasTransparentBackground() ? "none" : this.controller.getBackgroundColor()
        }
        ,
        f.prototype.didMountRoot = function(t) {
            o.monitor(t),
            this.controller.getGraphSettings().config.disableScrollFix || r.limitScrollOnElement(t),
            this.setupFileDragDrop(t)
        }
        ,
        f.prototype.setupFileDragDrop = function(t) {
            var e = this
              , o = i(t);
            g.default(o);
            var r = i()
              , n = this;
            function c() {
                r = i(),
                o.off(".filedraggedover"),
                n.controller.dispatch({
                    type: "file-is-not-dragged-over"
                })
            }
            o.on("dragenter", function(t) {
                e.controller.areImagesEnabled() && (0 === r.length && o.on("dcg-tapstart.filedraggedover", c),
                r = r.add(t.target),
                e.controller.dispatch({
                    type: "file-is-dragged-over"
                }))
            }).on("dragleave", function(t) {
                0 === (r = r.not(t.target)).length && c()
            }).on("drop", c)
        }
        ,
        f
    }(n.Class);
    t.default = f
});
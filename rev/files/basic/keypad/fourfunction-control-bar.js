define('basic/keypad/fourfunction-control-bar', ["require", "exports", "tslib", "dcgview", "keypad/control-bar", "keypad/control-btn", "./settings-control-button", "basic/dcgview-basic"], function(require, t, e, n, r, c, o, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = n.Components
      , i = l.If
      , u = l.IfElse
      , s = function(t) {
        function a() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(a, t),
        a.prototype.template = function() {
            var t = this
              , e = this.props.controller();
            return n.createElement(r.default, {
                controller: this.props.controller
            }, n.createElement(i, {
                predicate: function() {
                    return !t.controller.getRestrictedEditing()
                }
            }, function() {
                return n.createElement(c.default, {
                    command: t.const("undo"),
                    disabled: function() {
                        return !e.canUndo()
                    },
                    ariaLabel: function() {
                        return e.s("basic-calculator-narration-controlbar-undo")
                    },
                    onTap: function(t) {
                        return e.dispatch({
                            type: "undo",
                            source: "keyboard" === t.device ? "button-keyboard" : "button-tap"
                        })
                    }
                }, n.createElement("i", {
                    class: n.const("dcg-icon-undo")
                }))
            }), n.createElement(i, {
                predicate: function() {
                    return !t.controller.getRestrictedEditing()
                }
            }, function() {
                return n.createElement(c.default, {
                    command: t.const("redo"),
                    disabled: function() {
                        return !e.canRedo()
                    },
                    ariaLabel: function() {
                        return e.s("basic-calculator-narration-controlbar-redo")
                    },
                    onTap: function(t) {
                        return e.dispatch({
                            type: "redo",
                            source: "keyboard" === t.device ? "button-keyboard" : "button-tap"
                        })
                    }
                }, n.createElement("i", {
                    class: n.const("dcg-icon-redo")
                }))
            }), u(function() {
                return e.shouldShowClear()
            }, {
                true: function() {
                    return n.createElement(c.default, {
                        command: t.const("clear"),
                        ariaLabel: function() {
                            return e.s("basic-calculator-narration-controlbar-clear")
                        },
                        onTap: function() {
                            return e.dispatch({
                                type: "clear"
                            })
                        }
                    }, function() {
                        return e.s("basic-calculator-button-controlbar-clear")
                    })
                },
                false: function() {
                    return n.createElement(c.default, {
                        command: t.const("clearall"),
                        disabled: function() {
                            return !e.canClear()
                        },
                        ariaLabel: function() {
                            return e.s("basic-calculator-narration-controlbar-clear-all")
                        },
                        onTap: function() {
                            return e.dispatch({
                                type: "set-blank",
                                opts: {
                                    allowUndo: !0
                                }
                            })
                        }
                    }, function() {
                        return e.s("basic-calculator-button-controlbar-clear-all")
                    })
                }
            }), n.createElement(i, {
                predicate: function() {
                    return t.controller.getRestrictedEditing()
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-spacer-2")
                })
            }), n.createElement(i, {
                predicate: function() {
                    return "none" === e.getBrailleMode()
                }
            }, function() {
                return n.createElement(c.default, {
                    command: t.const("backspace"),
                    ariaLabel: function() {
                        return e.s("basic-calculator-narration-controlbar-backspace")
                    },
                    disabled: function() {
                        return !e.canBackspace()
                    },
                    onTap: function() {
                        return e.dispatch({
                            type: "keypad/press-key",
                            key: "Backspace"
                        })
                    }
                }, n.createElement("i", {
                    class: n.const("dcg-icon-delete")
                }))
            }), n.createElement(i, {
                predicate: function() {
                    return t.props.controller().getSettingsMenu()
                }
            }, function() {
                return n.createElement(o.default, {
                    controller: t.props.controller
                })
            }))
        }
        ,
        a.prototype.onToggleSettingsMenu = function() {
            this.controller.dispatch({
                type: "toggle-settings-menu"
            })
        }
        ,
        a
    }(a.DCGViewBasic);
    t.default = s
});
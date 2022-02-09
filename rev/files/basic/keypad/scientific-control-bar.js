define('basic/keypad/scientific-control-bar', ["require", "exports", "tslib", "dcgview", "keypad/control-bar", "keypad/control-btn", "basic/dcgview-basic", "keypad/control-toggle", "./settings-control-button"], function(require, t, n, e, r, o, a, c, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e.Components
      , u = i.If
      , s = i.IfElse
      , d = function(t) {
        function a() {
            return null !== t && t.apply(this, arguments) || this
        }
        return n.__extends(a, t),
        a.prototype.template = function() {
            var t = this
              , n = this.props.controller();
            return e.createElement(r.default, {
                controller: this.props.controller
            }, e.createElement(o.default, {
                command: this.const("main"),
                selected: function() {
                    return "main" === n.getKeyboardMode()
                },
                disabled: function() {
                    return t.controller.renderAsBraille()
                },
                ignoreInTabOrder: this.const(!0),
                selectable: this.const(!0),
                onTap: function() {
                    return n.dispatch({
                        type: "main"
                    })
                },
                ariaLabel: function() {
                    return n.s("basic-calculator-narration-controlbar-main")
                }
            }, function() {
                return n.s("basic-calculator-button-controlbar-main")
            }), e.createElement(o.default, {
                command: this.const("ABC"),
                selected: function() {
                    return -1 !== ["qwerty", "capitalQwerty", "letters"].indexOf(n.getKeyboardMode())
                },
                disabled: function() {
                    return t.controller.renderAsBraille()
                },
                ignoreInTabOrder: this.const(!0),
                selectable: this.const(!0),
                ariaLabel: function() {
                    return n.s("basic-calculator-narration-controlbar-abc")
                },
                onTap: function() {
                    return n.dispatch({
                        type: "ABC"
                    })
                }
            }, function() {
                return n.s("basic-calculator-button-controlbar-abc")
            }), e.createElement(o.default, {
                command: this.const("functions"),
                selected: function() {
                    return -1 !== ["functions", "restrictedFunctions"].indexOf(n.getKeyboardMode())
                },
                ariaLabel: function() {
                    return n.s("basic-calculator-narration-controlbar-functions")
                },
                disabled: function() {
                    return t.controller.renderAsBraille()
                },
                ignoreInTabOrder: this.const(!0),
                selectable: this.const(!0),
                onTap: function() {
                    return n.dispatch({
                        type: "functions"
                    })
                }
            }, function() {
                return n.s("basic-calculator-button-controlbar-func")
            }), e.createElement(c.default, {
                command: this.const("degrees"),
                toggled: function() {
                    return t.model.getDegreeMode()
                },
                defaultOption: function() {
                    return n.s("basic-calculator-label-controlbar-rad")
                },
                toggledOption: function() {
                    return n.s("basic-calculator-label-controlbar-deg")
                },
                defaultAriaLabel: function() {
                    return n.s("basic-calculator-narration-controlbar-radians")
                },
                toggledAriaLabel: function() {
                    return n.s("basic-calculator-narration-controlbar-degrees")
                },
                onTap: function() {
                    return n.dispatch({
                        type: "degrees"
                    })
                },
                controller: this.props.controller
            }), e.createElement(u, {
                predicate: function() {
                    return !t.controller.getRestrictedEditing()
                }
            }, function() {
                return e.createElement(o.default, {
                    command: t.const("undo"),
                    disabled: function() {
                        return !n.canUndo()
                    },
                    ariaLabel: function() {
                        return n.s("basic-calculator-narration-controlbar-undo")
                    },
                    onTap: function(t) {
                        return n.dispatch({
                            type: "undo",
                            source: "keyboard" === t.device ? "button-keyboard" : "button-tap"
                        })
                    }
                }, e.createElement("i", {
                    class: e.const("dcg-icon-undo")
                }))
            }), e.createElement(u, {
                predicate: function() {
                    return !t.controller.getRestrictedEditing()
                }
            }, function() {
                return e.createElement(o.default, {
                    command: t.const("redo"),
                    disabled: function() {
                        return !n.canRedo()
                    },
                    ariaLabel: function() {
                        return n.s("basic-calculator-narration-controlbar-redo")
                    },
                    onTap: function(t) {
                        return n.dispatch({
                            type: "redo",
                            source: "keyboard" === t.device ? "button-keyboard" : "button-tap"
                        })
                    }
                }, e.createElement("i", {
                    class: e.const("dcg-icon-redo")
                }))
            }), s(function() {
                return n.shouldShowClear()
            }, {
                true: function() {
                    return e.createElement(o.default, {
                        command: t.const("clear"),
                        ariaLabel: function() {
                            return n.s("basic-calculator-narration-controlbar-clear")
                        },
                        onTap: function() {
                            return n.dispatch({
                                type: "clear"
                            })
                        }
                    }, function() {
                        return n.s("basic-calculator-button-controlbar-clear")
                    })
                },
                false: function() {
                    return e.createElement(o.default, {
                        command: t.const("clearall"),
                        disabled: function() {
                            return !n.canClear()
                        },
                        ariaLabel: function() {
                            return n.s("basic-calculator-narration-controlbar-clear-all")
                        },
                        onTap: function() {
                            return n.dispatch({
                                type: "set-blank",
                                opts: {
                                    allowUndo: !0
                                }
                            })
                        }
                    }, function() {
                        return n.s("basic-calculator-button-controlbar-clear-all")
                    })
                }
            }), e.createElement(u, {
                predicate: function() {
                    return t.props.controller().getSettingsMenu()
                }
            }, function() {
                return e.createElement(l.default, {
                    controller: t.props.controller
                })
            }))
        }
        ,
        a
    }(a.DCGViewBasic);
    t.default = d
});
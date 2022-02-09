define('basic/keypad/single-expression-scientific-control-bar', ["require", "exports", "tslib", "dcgview", "keypad/control-bar", "keypad/control-btn", "basic/dcgview-basic", "keypad/control-toggle"], function(require, t, e, n, r, a, c, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = n.Components.If
      , i = function(t) {
        function c() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(c, t),
        c.prototype.template = function() {
            var t = this
              , e = this.props.controller();
            return n.createElement(r.default, {
                controller: this.props.controller
            }, n.createElement(o.default, {
                command: this.const("degrees"),
                toggled: function() {
                    return t.model.getDegreeMode()
                },
                defaultOption: function() {
                    return e.s("basic-calculator-label-controlbar-rad")
                },
                toggledOption: function() {
                    return e.s("basic-calculator-label-controlbar-deg")
                },
                defaultAriaLabel: function() {
                    return e.s("basic-calculator-narration-controlbar-radians")
                },
                toggledAriaLabel: function() {
                    return e.s("basic-calculator-narration-controlbar-degrees")
                },
                onTap: function() {
                    return e.dispatch({
                        type: "degrees"
                    })
                },
                controller: this.props.controller
            }), n.createElement("div", {
                class: n.const("dcg-spacer")
            }), n.createElement(l, {
                predicate: function() {
                    return !t.controller.getRestrictedEditing()
                }
            }, function() {
                return n.createElement(a.default, {
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
            }), n.createElement(l, {
                predicate: function() {
                    return !t.controller.getRestrictedEditing()
                }
            }, function() {
                return n.createElement(a.default, {
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
            }), n.createElement("div", {
                class: n.const("dcg-spacer")
            }), n.createElement(a.default, {
                narrowButton: this.const(!0),
                command: this.const("clear"),
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
            }), n.createElement(a.default, {
                narrowButton: this.const(!0),
                command: this.const("backspace"),
                ariaLabel: function() {
                    return e.s("basic-calculator-narration-controlbar-backspace")
                },
                onTap: function() {
                    return e.dispatch({
                        type: "keypad/press-key",
                        key: "Backspace"
                    })
                }
            }, n.createElement("i", {
                class: n.const("dcg-icon-delete")
            })))
        }
        ,
        c
    }(c.DCGViewBasic);
    t.default = i
});
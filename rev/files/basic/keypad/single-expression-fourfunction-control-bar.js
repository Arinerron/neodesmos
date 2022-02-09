
define('basic/keypad/single-expression-fourfunction-control-bar', ["require", "exports", "tslib", "dcgview", "keypad/control-bar", "keypad/control-btn", "basic/dcgview-basic"], function(require, e, t, n, r, c, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = n.Components.If
      , i = function(e) {
        function a() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(a, e),
        a.prototype.template = function() {
            var e = this
              , t = this.props.controller();
            return n.createElement(r.default, {
                controller: this.props.controller
            }, n.createElement(o, {
                predicate: function() {
                    return !e.controller.getRestrictedEditing()
                }
            }, function() {
                return n.createElement(c.default, {
                    command: e.const("undo"),
                    disabled: function() {
                        return !t.canUndo()
                    },
                    ariaLabel: function() {
                        return t.s("basic-calculator-narration-controlbar-undo")
                    },
                    onTap: function(e) {
                        return t.dispatch({
                            type: "undo",
                            source: "keyboard" === e.device ? "button-keyboard" : "button-tap"
                        })
                    }
                }, n.createElement("i", {
                    class: n.const("dcg-icon-undo")
                }))
            }), n.createElement(o, {
                predicate: function() {
                    return !e.controller.getRestrictedEditing()
                }
            }, function() {
                return n.createElement(c.default, {
                    command: e.const("redo"),
                    disabled: function() {
                        return !t.canRedo()
                    },
                    ariaLabel: function() {
                        return t.s("basic-calculator-narration-controlbar-redo")
                    },
                    onTap: function(e) {
                        return t.dispatch({
                            type: "redo",
                            source: "keyboard" === e.device ? "button-keyboard" : "button-tap"
                        })
                    }
                }, n.createElement("i", {
                    class: n.const("dcg-icon-redo")
                }))
            }), n.createElement(c.default, {
                command: this.const("clear"),
                ariaLabel: function() {
                    return t.s("basic-calculator-narration-controlbar-clear")
                },
                onTap: function() {
                    return t.dispatch({
                        type: "clear"
                    })
                }
            }, function() {
                return t.s("basic-calculator-button-controlbar-clear")
            }), n.createElement(o, {
                predicate: function() {
                    return e.controller.getRestrictedEditing()
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-spacer-2")
                })
            }), n.createElement(o, {
                predicate: function() {
                    return "none" === t.getBrailleMode()
                }
            }, function() {
                return n.createElement(c.default, {
                    command: e.const("backspace"),
                    ariaLabel: function() {
                        return t.s("basic-calculator-narration-controlbar-backspace")
                    },
                    disabled: function() {
                        return !t.canBackspace()
                    },
                    onTap: function() {
                        return t.dispatch({
                            type: "keypad/press-key",
                            key: "Backspace"
                        })
                    }
                }, n.createElement("i", {
                    class: n.const("dcg-icon-delete")
                }))
            }))
        }
        ,
        a
    }(a.DCGViewBasic);
    e.default = i
});

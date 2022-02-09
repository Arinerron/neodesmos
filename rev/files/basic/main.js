
define('basic/main', ["require", "exports", "tslib", "browser", "keys", "dcgview", "./dcgview-basic", "jquery", "./keypad/fourfunction-control-bar", "./keypad/single-expression-fourfunction-control-bar", "./keypad/scientific-control-bar", "./keypad/single-expression-scientific-control-bar", "./keypad/fourfunction-keypad", "./keypad/single-expression-fourfunction-keypad", "./keypad/single-expression-scientific-keypad", "./keypad/scientific-keypad", "./keypad/braille-keypad", "./basic-list-view", "lib/aria", "touchtracking", "loadcss!desmos-icons", "loadcss!./main", "loadcss!dcg-normalize"], function(require, e, r, t, n, o, l, c, i, a, s, u, d, p, f, m, y, h, g, E) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var b = o.Components
      , k = b.If
      , v = b.IfElse
      , C = function(e) {
        function l() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(l, e),
        l.prototype.template = function() {
            var e = this;
            return o.createElement(k, {
                predicate: function() {
                    return e.controller.shouldRender()
                }
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-calculator-api-container"),
                    style: o.const("width: 100%; height: 100%; position: relative;")
                }, o.createElement("div", {
                    class: function() {
                        return {
                            "dcg-calc-basic-main-wrapper": !0,
                            "dcg-narrow": e.controller.containerSize.width < 570,
                            "dcg-short": e.controller.containerSize.height <= 540,
                            "dcg-scientific-calculator": e.controller.isScientificCalc(),
                            "dcg-four-function-calculator": e.controller.isFourFunctionCalc(),
                            "dcg-container": !0
                        }
                    },
                    onKeydown: e.bindFn(e.handleRootKeydown),
                    didMount: e.bindFn(e.didMountRoot),
                    "x-ms-format-detection": o.const("none")
                }, o.createElement("div", {
                    role: o.const("application"),
                    "aria-label": function() {
                        return e.controller.isScientificCalc() ? e.controller.s("basic-calculator-narration-calc-description-scientific") : e.controller.isFourFunctionCalc() ? e.controller.s("basic-calculator-narration-calc-description-fourfunction") : ""
                    },
                    class: function() {
                        return {
                            "dcg-calc-basic-main": !0,
                            "dcg-inverted-colors": e.controller.getInvertedColors(),
                            "dcg-projector-mode": e.controller.isProjectorMode(),
                            "dcg-ipad": t.IS_IPAD,
                            "dcg-has-background-color": e.controller.hasBackgroundColor(),
                            "dcg-no-hyperlinks": !e.controller.getAllowLinks()
                        }
                    },
                    style: function() {
                        return {
                            "font-size": e.controller.getFontSize() + "px",
                            background: e.controller.getBackgroundColor(),
                            color: e.controller.getTextColor(),
                            filter: e.controller.getInvertedColors() ? "invert(100%)" : "none"
                        }
                    }
                }, o.createElement(h.default, {
                    controller: e.props.controller
                }), o.createElement(k, {
                    predicate: function() {
                        return e.controller.isScientificCalc() && e.model.isSingleExpression()
                    }
                }, function() {
                    return o.createElement("div", null, o.createElement(u.default, {
                        controller: e.props.controller
                    }), o.createElement("div", {
                        class: o.const("dcg-basic-keypad-container")
                    }, v(function() {
                        return e.controller.renderAsBraille()
                    }, {
                        true: function() {
                            return o.createElement(y.default, {
                                controller: e.props.controller
                            })
                        },
                        false: function() {
                            return o.createElement(f.default, {
                                controller: e.props.controller
                            })
                        }
                    })))
                }), o.createElement(k, {
                    predicate: function() {
                        return e.controller.isScientificCalc() && !e.model.isSingleExpression()
                    }
                }, function() {
                    return o.createElement("div", null, o.createElement(s.default, {
                        controller: e.props.controller
                    }), o.createElement("div", {
                        class: o.const("dcg-basic-keypad-container")
                    }, v(function() {
                        return e.controller.renderAsBraille()
                    }, {
                        true: function() {
                            return o.createElement(y.default, {
                                controller: e.props.controller
                            })
                        },
                        false: function() {
                            return o.createElement(m.default, {
                                controller: e.props.controller
                            })
                        }
                    })))
                }), o.createElement(k, {
                    predicate: function() {
                        return e.controller.isFourFunctionCalc() && e.model.isSingleExpression()
                    }
                }, function() {
                    return o.createElement("div", null, o.createElement(a.default, {
                        controller: e.props.controller
                    }), o.createElement("div", {
                        class: o.const("dcg-basic-keypad-container")
                    }, v(function() {
                        return e.controller.renderAsBraille()
                    }, {
                        true: function() {
                            return o.createElement(y.default, {
                                controller: e.props.controller
                            })
                        },
                        false: function() {
                            return o.createElement(p.default, {
                                controller: e.props.controller
                            })
                        }
                    })))
                }), o.createElement(k, {
                    predicate: function() {
                        return e.controller.isFourFunctionCalc() && !e.model.isSingleExpression()
                    }
                }, function() {
                    return o.createElement("div", null, o.createElement(i.default, {
                        controller: e.props.controller
                    }), o.createElement("div", {
                        class: o.const("dcg-basic-keypad-container")
                    }, v(function() {
                        return e.controller.renderAsBraille()
                    }, {
                        true: function() {
                            return o.createElement(y.default, {
                                controller: e.props.controller
                            })
                        },
                        false: function() {
                            return o.createElement(d.default, {
                                controller: e.props.controller
                            })
                        }
                    })))
                }))))
            })
        }
        ,
        l.prototype.didMountRoot = function(e) {
            E.monitor(e)
        }
        ,
        l.prototype.handleRootKeydown = function(e) {
            if (n.isUndo(e))
                return this.dispatch({
                    type: "undo",
                    source: "keyboard-shortcut"
                }),
                !1;
            if (n.isRedo(e))
                return this.dispatch({
                    type: "redo",
                    source: "keyboard-shortcut"
                }),
                !1;
            if (!e.metaKey && !e.shiftKey)
                if (e.ctrlKey || e.altKey || n.lookup(e) !== n.BACKSPACE) {
                    if (e.ctrlKey === t.IS_APPLE && e.altKey === !t.IS_APPLE) {
                        var r = n.lookupChar(e);
                        if ("N" === r) {
                            if (!this.controller.getBrailleControls())
                                return;
                            return this.dispatch({
                                type: "set-braille-mode",
                                mode: "nemeth"
                            }),
                            g.alert(this.controller.s("basic-calculator-narration-hotkey-nemeth")),
                            !1
                        }
                        if ("U" === r) {
                            if (!this.controller.getBrailleControls())
                                return;
                            return this.dispatch({
                                type: "set-braille-mode",
                                mode: "ueb"
                            }),
                            g.alert(this.controller.s("basic-calculator-narration-hotkey-ueb")),
                            !1
                        }
                        if ("Q" === r || "X" === r) {
                            if (!this.controller.getBrailleControls())
                                return;
                            return this.dispatch({
                                type: "set-braille-mode",
                                mode: "none"
                            }),
                            g.alert(this.controller.s("basic-calculator-narration-hotkey-braille-off")),
                            !1
                        }
                        if ("6" === r) {
                            if (!this.controller.getBrailleControls())
                                return;
                            var o = !this.controller.getSixKeyInput();
                            return this.dispatch({
                                type: "set-six-key-input",
                                mode: o
                            }),
                            g.alert(o ? this.controller.s("basic-calculator-narration-hotkey-six-key-input-on") : this.controller.s("basic-calculator-narration-hotkey-six-key-input-off")),
                            !1
                        }
                    }
                } else if (!document.activeElement || E.elIsFocusable(c(document.activeElement)))
                    return !1;
            return !0
        }
        ,
        l
    }(l.DCGViewBasic);
    e.default = C
});
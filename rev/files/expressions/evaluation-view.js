define('expressions/evaluation-view', ["require", "exports", "tslib", "dcgview", "core/lib/label", "dcgview-helpers/static-mathquill-view", "./expression-menus/color-swatch", "../shared-components/mathquill-braille-wrapper", "./expression_view", "loadcss!./evaluation-view"], function(require, e, t, n, o, r, a, i, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var c = n.Components
      , s = c.If
      , u = c.SwitchUnion;
    var p = function(e) {
        function c() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(c, e),
        c.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        c.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("dcg-evaluation-container")
            }, n.createElement("div", {
                class: function() {
                    return {
                        "dcg-evaluation": !0,
                        "dcg-do-blur": !0,
                        "dcg-hidden": e.props.controller().isInEditListMode()
                    }
                },
                handleEvent: n.const("true"),
                tabindex: function() {
                    return e.props.focusable() && "none" === e.controller.getBrailleMode() ? "0" : "-1"
                }
            }, n.createElement(i.default, t.__assign({
                latex: this.bindFn(this.getBrailleEvaluation),
                ariaLabel: this.const(""),
                brailleShouldFocus: function() {
                    var t = e.controller.getFocusLocation();
                    return !!t && ("braille-output" === t.type && t.id === e.props.id())
                },
                onBrailleInput: function() {},
                isStatic: this.const(!0),
                onBrailleFocusedChanged: function(t) {
                    t ? e.controller.dispatch({
                        type: "set-focus-location",
                        location: {
                            type: "braille-output",
                            id: e.props.id()
                        }
                    }) : e.controller.dispatch({
                        type: "blur-focus-location",
                        location: {
                            type: "braille-output",
                            id: e.props.id()
                        }
                    })
                }
            }, l.getBrailleWrapperProps(this.controller, {
                gravity: "sw"
            })), n.createElement("div", {
                class: n.const("dcg-evaluation-label-container"),
                onTap: this.bindFn(this.onSelectEvaluation)
            }, n.createElement(s, {
                predicate: function() {
                    return !!e.props.dependent()
                }
            }, function() {
                return n.createElement(r.default, {
                    latex: function() {
                        return o.identifierToLatex(e.props.dependent())
                    },
                    config: e.const({})
                }, n.createElement("span", null))
            }), n.createElement("span", {
                class: n.const("dcg-equals")
            }, n.createElement(r.default, {
                latex: this.const("="),
                config: this.const({})
            }))), n.createElement("span", {
                class: function() {
                    return {
                        "dcg-text-selectable": "rgbcolor" !== e.getEvaluationType(),
                        "dcg-evaluation-html": !0,
                        "dcg-color-evaluation": "rgbcolor" === e.getEvaluationType()
                    }
                },
                didMount: this.bindFn(this.didMountEvaluation)
            }, u(function() {
                return e.getEvaluationType()
            }, {
                list: function() {
                    return n.createElement("span", {
                        class: n.const("dcg-evaluation-list")
                    }, function() {
                        return e.controller.s("graphing-calculator-label-evaluation-list", {
                            count: e.props.val().length
                        })
                    })
                },
                fraction: function() {
                    return n.createElement(r.default, {
                        latex: function() {
                            return o.truncatedLatexLabel(e.props.val(), e.getLabelOptions())
                        },
                        config: e.const({})
                    })
                },
                undefined: function() {
                    return n.createElement("span", null, n.const("undefined"))
                },
                scientific: function() {
                    return n.createElement(r.default, {
                        latex: function() {
                            return e.getNumberLabel().mantissa + "\\times10^{" + e.getNumberLabel().exponent + "}"
                        },
                        config: e.const({})
                    })
                },
                decimal: function() {
                    return n.createElement(r.default, {
                        latex: function() {
                            return e.getNumberLabel().value
                        },
                        config: e.const({})
                    })
                },
                rgbcolor: function() {
                    return n.createElement(a.ColorSwatch, {
                        color: function() {
                            return e.controller.getColorById(e.props.id())
                        },
                        isEvaluation: e.const(!0)
                    })
                }
            })))), n.createElement("div", {
                class: n.const("dcg-clear")
            }))
        }
        ,
        c.prototype.getNumberLabel = function() {
            return e = this.props.val(),
            t = this.getLabelOptions(),
            o.numericLabel(e, t);
            var e, t
        }
        ,
        c.prototype.getEvaluationType = function() {
            var e = this.props.val();
            return "string" == typeof e ? "rgbcolor" : Array.isArray(e) ? "string" == typeof e[0] ? "rgbcolor" : "list" : this.getNumberLabel().type
        }
        ,
        c.prototype.getLabelOptions = function() {
            return this.props.controller().getEvaluationLabelOptionsForItem(this.props.id())
        }
        ,
        c.prototype.didMountEvaluation = function(e) {
            this.evaluationNode = e
        }
        ,
        c.prototype.onSelectEvaluation = function() {
            var e = document.createRange();
            e.selectNodeContents(this.evaluationNode);
            var t = window.getSelection();
            t && (t.removeAllRanges(),
            (t = window.getSelection()) && t.addRange(e))
        }
        ,
        c.prototype.getBrailleEvaluation = function() {
            var e = "";
            this.props.dependent() && (e = o.identifierToLatex(this.props.dependent())),
            e += "=";
            var t = this.getEvaluationType();
            switch (t) {
            case "list":
                e += this.controller.s("graphing-calculator-label-evaluation-list", {
                    count: this.props.val().length
                });
                break;
            case "fraction":
                e += o.truncatedLatexLabel(this.props.val(), this.getLabelOptions());
                break;
            case "undefined":
                e = "undefined";
                break;
            case "scientific":
                e += this.getNumberLabel().mantissa + "\\times10^{" + this.getNumberLabel().exponent + "}";
                break;
            case "decimal":
                e += this.getNumberLabel().value;
                break;
            case "rgbcolor":
                e += this.props.val();
                break;
            default:
                return t
            }
            return e
        }
        ,
        c
    }(n.Class);
    e.default = p
});
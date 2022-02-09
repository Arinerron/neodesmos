define('main/settings-view', ["require", "exports", "tslib", "keys", "scroll_helpers", "dcgview", "dcgview-helpers/static-mathquill-view", "dcgview-helpers/mathquill-view", "jquery", "core/graphing-calc/json/graph-settings", "core/math/evaluate-single-expression", "graphing/viewport", "dcgview-helpers/checkbox", "main/manage-focus-helper", "main/mathquill-operators", "../shared-components/mathquill-braille-wrapper", "../expressions/expression_view", "../shared-components/tooltip", "loadcss!./settings-view"], function(require, t, e, n, r, o, i, s, a, c, l, g, d, u, p, h, m, b) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var f = o.Components
      , x = f.Input
      , y = f.If
      , v = function(t) {
        function n() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(n, t),
        n.prototype.template = function() {
            var t = this;
            return o.createElement(h.default, e.__assign({
                latex: function() {
                    return t.props.parent().getLimitLatex(t.props.limit())
                },
                ariaLabel: function() {
                    return t.props.ariaLabel()
                },
                onBrailleInput: function(e) {
                    return t.props.parent().setLimitLatex(t.props.limit(), e)
                },
                onBrailleFocusedChanged: function(e) {
                    return t.props.parent().onFocusedChanged(t.props.limit(), e)
                },
                brailleShouldFocus: function() {
                    return t.props.parent().getFocusedLimit() === t.props.limit()
                },
                hasError: function() {
                    return t.props.parent().isLimitInvalid(t.props.limit())
                },
                dataDCGLimit: function() {
                    return t.props.limit()
                }
            }, m.getBrailleWrapperProps(this.props.controller()), {
                capExpressionSize: function() {}
            }), o.createElement(s.default, {
                isFocused: function() {
                    return t.props.parent().getFocusedLimit() === t.props.limit()
                },
                latex: function() {
                    return t.props.parent().getLimitLatex(t.props.limit())
                },
                capExpressionSize: function() {
                    return t.props.parent().getCapExpressionSize()
                },
                config: this.bindFn(this.getMQConfig),
                getAriaLabel: function() {
                    return t.props.ariaLabel()
                },
                getAriaPostLabel: this.const(""),
                onUserChangedLatex: function(e) {
                    return t.props.parent().setLimitLatex(t.props.limit(), e)
                },
                onFocusedChanged: function(e) {
                    return t.props.parent().onFocusedChanged(t.props.limit(), e)
                },
                hasError: this.const(!1),
                selectOnFocus: this.const(!0),
                needsSystemKeypad: function() {
                    return t.props.needsSystemKeypad()
                }
            }, o.createElement("span", {
                class: function() {
                    return {
                        "dcg-math-field": !0,
                        "dcg-math-input": !0,
                        "dcg-invalid": t.props.parent().isLimitInvalid(t.props.limit()),
                        "dcg-focus": t.props.parent().getFocusedLimit() === t.props.limit()
                    }
                },
                "data-dcg-limit": function() {
                    return t.props.limit()
                }
            })))
        }
        ,
        n.prototype.getMQConfig = function() {
            return {
                autoOperatorNames: p.getAutoOperators()
            }
        }
        ,
        n
    }(o.Class)
      , A = function(t) {
        function s() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(s, t),
        s.prototype.template = function() {
            var t = this;
            return this.controller = this.props.controller(),
            o.createElement("div", {
                class: o.const("dcg-settings-view-container")
            }, o.createElement(b.Tooltip, {
                tooltip: function() {
                    return t.controller.s("graphing-calculator-label-tooltip-graph-settings")
                },
                gravity: this.const("w")
            }, o.createElement("div", {
                class: o.const("dcg-btn-flat-gray dcg-settings-pillbox dcg-action-settings"),
                role: o.const("button"),
                tabindex: o.const("0"),
                "aria-haspopup": o.const("true"),
                "aria-expanded": function() {
                    return t.controller.isGraphSettingsOpen()
                },
                "aria-label": function() {
                    return t.controller.s("graphing-calculator-label-tooltip-graph-settings")
                },
                onTap: this.bindFn(this.onTapSettingsButton),
                manageFocus: this.const(u.manageFocusHelper({
                    controller: this.controller,
                    location: {
                        type: "settings",
                        location: "icon"
                    }
                })),
                style: function() {
                    return {
                        background: t.controller.getPillboxBackgroundColor()
                    }
                }
            }, o.createElement("i", {
                class: o.const("dcg-icon-wrench"),
                "aria-hidden": o.const("true")
            }))), o.createElement(y, {
                predicate: function() {
                    return t.controller.isGraphSettingsOpen()
                }
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-settings-container dcg-left dcg-popover dcg-constrained-height-popover"),
                    style: t.bindFn(t.getContainerStyle),
                    didMount: t.bindFn(t.didMountContainer),
                    didUnmount: t.bindFn(t.didUnmountContainer)
                }, o.createElement("div", {
                    class: o.const("dcg-popover-interior"),
                    role: o.const("complementary"),
                    "aria-label": o.const("Graph Settings")
                }, o.createElement("div", {
                    class: o.const("dcg-visual-settings")
                }, o.createElement("div", {
                    class: o.const("dcg-group-title")
                }, function() {
                    return t.controller.s("shared-calculator-label-settings-display")
                }), o.createElement("div", {
                    class: o.const("dcg-displaysizegroup dcg-segmented-control-container"),
                    role: o.const("group"),
                    "aria-label": function() {
                        return t.controller.s("shared-calculator-narration-settings-display-size")
                    }
                }, o.createElement("div", {
                    class: function() {
                        return {
                            "dcg-action-displaysizedefault": !0,
                            "dcg-segmented-control-btn": !0,
                            "dcg-dark-gray-segmented-control-btn": !0,
                            "dcg-selected dcg-active": !t.getProjectorMode()
                        }
                    },
                    "aria-pressed": function() {
                        return !t.getProjectorMode()
                    },
                    role: o.const("button"),
                    tabindex: o.const("0"),
                    "aria-label": function() {
                        return t.controller.s("shared-calculator-narration-settings-display-size-default")
                    },
                    onTap: t.bindFn(t.setDefaultDisplaySize)
                }, o.const("A")), o.createElement("div", {
                    class: function() {
                        return {
                            "dcg-action-displaysizelarge": !0,
                            "dcg-segmented-control-btn": !0,
                            "dcg-dark-gray-segmented-control-btn": !0,
                            "dcg-selected dcg-active": t.getProjectorMode()
                        }
                    },
                    "aria-pressed": t.bindFn(t.getProjectorMode),
                    role: o.const("button"),
                    tabindex: o.const("0"),
                    "aria-label": function() {
                        return t.controller.s("shared-calculator-narration-settings-display-size-large")
                    },
                    onTap: t.bindFn(t.setLargeDisplaySize),
                    manageFocus: t.const(u.manageFocusHelper({
                        controller: t.controller,
                        location: {
                            type: "settings",
                            location: "projector-mode"
                        }
                    }))
                }, o.const("A"))), o.createElement(d.Checkbox, {
                    ariaLabel: function() {
                        return t.controller.s("graphing-calculator-label-settings-reverse-contrast")
                    },
                    onChange: t.bindFn(t.toggleInvertedColors),
                    checked: function() {
                        return t.controller.getInvertedColors()
                    },
                    green: t.const(!0)
                }, function() {
                    return t.controller.s("graphing-calculator-label-settings-reverse-contrast")
                }), o.createElement(y, {
                    predicate: function() {
                        return t.controller.getBrailleControls()
                    }
                }, function() {
                    return o.createElement("div", {
                        class: o.const("dcg-braille-container dcg-braille-mode")
                    }, o.createElement(d.Checkbox, {
                        ariaLabel: function() {
                            return t.controller.s("graphing-calculator-label-settings-braille-mode")
                        },
                        onChange: t.bindFn(t.toggleBrailleMode),
                        checked: function() {
                            return "none" !== t.controller.getBrailleMode()
                        },
                        green: t.const(!0)
                    }, function() {
                        return t.controller.s("graphing-calculator-label-settings-braille-mode")
                    }), o.createElement(y, {
                        predicate: function() {
                            return "none" !== t.controller.getBrailleMode()
                        }
                    }, function() {
                        return o.createElement("div", {
                            class: o.const("dcg-braille-options-container")
                        }, o.createElement("div", {
                            role: o.const("group"),
                            "aria-label": function() {
                                return t.controller.s("graphing-calculator-label-settings-braille-mode")
                            },
                            class: o.const("dcg-braille-options-buttons dcg-segmented-control-container")
                        }, o.createElement("span", {
                            class: function() {
                                return {
                                    "dcg-segmented-control-btn": !0,
                                    "dcg-dark-gray-segmented-control-btn": !0,
                                    "dcg-braille-option": !0,
                                    "dcg-selected dcg-active": "nemeth" === t.controller.getBrailleMode()
                                }
                            },
                            role: o.const("button"),
                            onTap: function() {
                                return t.controller.dispatch({
                                    type: "set-braille-mode",
                                    mode: "nemeth"
                                })
                            },
                            tabindex: o.const(0),
                            "aria-label": function() {
                                return t.controller.s("graphing-calculator-button-settings-braille-mode-nemeth")
                            },
                            "aria-pressed": function() {
                                return "nemeth" === t.controller.getBrailleMode()
                            }
                        }, function() {
                            return t.controller.s("graphing-calculator-button-settings-braille-mode-nemeth")
                        }), o.createElement("span", {
                            class: function() {
                                return {
                                    "dcg-segmented-control-btn": !0,
                                    "dcg-dark-gray-segmented-control-btn": !0,
                                    "dcg-braille-option": !0,
                                    "dcg-selected dcg-active": "ueb" === t.controller.getBrailleMode()
                                }
                            },
                            role: o.const("button"),
                            onTap: function() {
                                return t.controller.dispatch({
                                    type: "set-braille-mode",
                                    mode: "ueb"
                                })
                            },
                            tabindex: o.const(0),
                            "aria-label": function() {
                                return t.controller.s("graphing-calculator-button-settings-braille-mode-ueb")
                            },
                            "aria-pressed": function() {
                                return "ueb" === t.controller.getBrailleMode()
                            }
                        }, function() {
                            return t.controller.s("graphing-calculator-button-settings-braille-mode-ueb")
                        })), o.createElement("div", {
                            class: o.const("dcg-checkbox-title dcg-six-key-checkbox")
                        }, o.createElement(d.Checkbox, {
                            ariaLabel: function() {
                                return t.controller.s("graphing-calculator-label-settings-six-key-braille")
                            },
                            onChange: function(e) {
                                return t.controller.dispatch({
                                    type: "set-six-key-input",
                                    useSixKeyInput: e
                                })
                            },
                            checked: function() {
                                return t.controller.getSixKeyInput()
                            },
                            green: t.const(!0)
                        }, function() {
                            return t.controller.s("graphing-calculator-label-settings-six-key-braille")
                        }), o.createElement("a", {
                            href: o.const("https://www.desmos.com/accessibility#braille"),
                            class: o.const("dcg-six-key-info"),
                            target: o.const("_blank")
                        }, o.createElement("i", {
                            class: o.const("dcg-icon-question-sign")
                        }))), o.createElement("div", {
                            class: o.const("dcg-refreshable-braille-note")
                        }, function() {
                            return t.controller.s("graphing-calculator-text-refreshable-braille-display-note") + " "
                        }, o.createElement("a", {
                            href: function() {
                                return "https://www.desmos.com/braille-examples?" + t.controller.getBrailleMode()
                            },
                            target: o.const("_blank")
                        }, function() {
                            return t.controller.s("graphing-calculator-link-view-braille-examples")
                        })))
                    }))
                })), o.createElement("div", {
                    class: o.const("dcg-top-section-flex dcg-grid-settings-container")
                }, o.createElement("div", {
                    class: o.const("dcg-grid-settings")
                }, o.createElement(d.Checkbox, {
                    ariaLabel: function() {
                        return t.controller.s("graphing-calculator-label-settings-grid")
                    },
                    onChange: t.bindFn(t.toggleGrid),
                    checked: t.bindFn(t.getShowGrid),
                    green: t.const(!0)
                }, function() {
                    return t.controller.s("graphing-calculator-label-settings-grid")
                }), o.createElement(y, {
                    predicate: t.bindFn(t.getShowGrid)
                }, function() {
                    return o.createElement("div", {
                        class: o.const("dcg-circle-icon-group dcg-grid-group")
                    }, o.createElement("div", {
                        class: function() {
                            return {
                                "dcg-circle-icon": !0,
                                "dcg-action-cartesian": !0,
                                "dcg-active": !t.getPolarMode()
                            }
                        },
                        role: o.const("button"),
                        tabindex: o.const("0"),
                        ariaPressed: function() {
                            return !t.getPolarMode()
                        },
                        "aria-label": function() {
                            return t.controller.s("graphing-calculator-narration-settings-cartesian-grid")
                        },
                        onTap: t.bindFn(t.setCartesianMode)
                    }), o.const(" "), o.createElement("div", {
                        class: function() {
                            return {
                                "dcg-circle-icon": !0,
                                "dcg-action-polar": !0,
                                "dcg-active": t.getPolarMode()
                            }
                        },
                        role: o.const("button"),
                        tabindex: o.const("0"),
                        ariaPressed: function() {
                            return t.getPolarMode()
                        },
                        "aria-label": function() {
                            return t.controller.s("graphing-calculator-narration-settings-polar-grid")
                        },
                        onTap: t.bindFn(t.setPolarMode)
                    }))
                }), o.createElement(d.Checkbox, {
                    ariaLabel: function() {
                        return t.controller.s("graphing-calculator-label-settings-arrows")
                    },
                    onChange: t.bindFn(t.toggleArrows),
                    checked: function() {
                        return t.getAxisArrowMode() !== c.AxisArrowModes.NONE
                    },
                    green: t.const(!0)
                }, function() {
                    return t.controller.s("graphing-calculator-label-settings-arrows")
                }), o.createElement(y, {
                    predicate: function() {
                        return t.getAxisArrowMode() !== c.AxisArrowModes.NONE
                    }
                }, function() {
                    return o.createElement("div", {
                        class: o.const("dcg-circle-icon-group dcg-arrow-group")
                    }, o.createElement("div", {
                        role: o.const("button"),
                        tabindex: o.const("0"),
                        class: function() {
                            return {
                                "dcg-circle-icon": !0,
                                "dcg-arrows": !0,
                                "dcg-active": t.getAxisArrowMode() === c.AxisArrowModes.BOTH
                            }
                        },
                        "dcg-arrows": o.const("BOTH"),
                        "aria-label": function() {
                            return t.controller.s("graphing-calculator-narration-settings-show-both")
                        },
                        "aria-pressed": function() {
                            return t.getAxisArrowMode() === c.AxisArrowModes.BOTH
                        },
                        onTap: function() {
                            return t.setAxisArrowMode(c.AxisArrowModes.BOTH)
                        }
                    }, o.createElement("i", {
                        class: o.const("dcg-icon-arrows-two")
                    })), o.const(" "), o.createElement("div", {
                        role: o.const("button"),
                        tabindex: o.const("0"),
                        class: function() {
                            return {
                                "dcg-circle-icon": !0,
                                "dcg-arrows": !0,
                                "dcg-active": t.getAxisArrowMode() === c.AxisArrowModes.POSITIVE
                            }
                        },
                        "dcg-arrows": o.const("POSITIVE"),
                        "aria-label": function() {
                            return t.controller.s("graphing-calculator-narration-settings-show-positive")
                        },
                        "aria-pressed": function() {
                            return t.getAxisArrowMode() === c.AxisArrowModes.POSITIVE
                        },
                        onTap: function() {
                            return t.setAxisArrowMode(c.AxisArrowModes.POSITIVE)
                        }
                    }, o.createElement("i", {
                        class: o.const("dcg-icon-arrows-one")
                    })))
                })), o.createElement("div", {
                    class: o.const("dcg-top-checkboxes-container")
                }, o.createElement(d.Checkbox, {
                    ariaLabel: function() {
                        return t.controller.s("graphing-calculator-label-settings-axis-numbers")
                    },
                    onChange: t.bindFn(t.toggleAxisNumbers),
                    checked: t.bindFn(t.getAxisNumbers),
                    small: t.const(!0),
                    green: t.const(!0)
                }, function() {
                    return t.controller.s("graphing-calculator-label-settings-axis-numbers")
                }), o.createElement(y, {
                    predicate: function() {
                        return t.getShowGrid() && !t.getPolarMode()
                    }
                }, function() {
                    return o.createElement(d.Checkbox, {
                        ariaLabel: function() {
                            return t.controller.s("graphing-calculator-label-settings-minor-gridlines")
                        },
                        onChange: t.bindFn(t.toggleMinorGridlines),
                        checked: t.bindFn(t.getMinorGridlines),
                        small: t.const(!0),
                        green: t.const(!0)
                    }, function() {
                        return t.controller.s("graphing-calculator-label-settings-minor-gridlines")
                    })
                }), o.createElement(y, {
                    predicate: function() {
                        return t.controller.canUseAdvancedStyling() && !t.getPolarMode()
                    }
                }, function() {
                    return o.createElement(d.Checkbox, {
                        checked: function() {
                            return t.controller.getGraphSettings().restrictGridToFirstQuadrant
                        },
                        ariaLabel: t.const("One Quadrant"),
                        onChange: function(e) {
                            return t.controller.dispatch({
                                type: "set-graph-settings",
                                restrictGridToFirstQuadrant: e
                            })
                        },
                        small: t.const(!0),
                        green: t.const(!0)
                    }, o.const("One Quadrant"))
                }), o.createElement(y, {
                    predicate: function() {
                        return !t.getSquareAxes()
                    }
                }, function() {
                    return o.createElement("div", {
                        role: o.const("button"),
                        tabindex: o.const("0"),
                        class: o.const("dcg-action-zoom-square dcg-btn-light-gray"),
                        onTap: t.bindFn(t.zoomSquare)
                    }, function() {
                        return t.controller.s("graphing-calculator-button-settings-zoom-square")
                    })
                }))), o.createElement("div", {
                    class: o.const("dcg-axes-settings-container")
                }, o.createElement("div", {
                    class: o.const("dcg-checkbox-title dcg-x-axis-title")
                }, o.createElement(d.Checkbox, {
                    ariaLabel: function() {
                        return t.controller.s("graphing-calculator-label-settings-x-axis")
                    },
                    onChange: t.bindFn(t.toggleXAxis),
                    checked: t.bindFn(t.getShowXAxis),
                    green: t.const(!0)
                }, function() {
                    return t.controller.s("graphing-calculator-label-settings-x-axis")
                }), o.createElement(x, {
                    class: t.const("dcg-axis-label dcg-x-axis-label"),
                    placeholder: function() {
                        return t.controller.s("graphing-calculator-label-settings-add-label")
                    },
                    "aria-label": function() {
                        return t.controller.s("graphing-calculator-narration-settings-x-axis-label")
                    },
                    disabled: function() {
                        return !t.getShowXAxis() || void 0
                    },
                    "aria-disabled": function() {
                        return !t.getShowXAxis() || void 0
                    },
                    onInput: t.bindFn(t.onXAxisLabelInput),
                    value: t.bindFn(t.getXAxisLabel)
                })), o.createElement("div", {
                    class: o.const("dcg-editable-mathquill-container dcg-x-axis-options")
                }, o.createElement(v, {
                    limit: t.const("xmin"),
                    ariaLabel: function() {
                        return t.controller.s("graphing-calculator-narration-settings-x-axis-min")
                    },
                    needsSystemKeypad: function() {
                        return !t.controller.isKeypadEnabled()
                    },
                    parent: t.const(t),
                    controller: t.props.controller
                }), o.createElement(i.default, {
                    config: t.const({}),
                    latex: t.const("\\le x\\le")
                }, o.createElement("span", {
                    class: o.const("dcg-interval-interior")
                })), o.createElement(v, {
                    limit: t.const("xmax"),
                    ariaLabel: function() {
                        return t.controller.s("graphing-calculator-narration-settings-x-axis-max")
                    },
                    needsSystemKeypad: function() {
                        return !t.controller.isKeypadEnabled()
                    },
                    parent: t.const(t),
                    controller: t.props.controller
                }), o.createElement(y, {
                    predicate: function() {
                        return !t.getPolarMode()
                    }
                }, function() {
                    return o.createElement("span", {
                        class: o.const("dcg-step-container")
                    }, o.createElement("span", {
                        class: o.const("dcg-step-label"),
                        "aria-hidden": o.const("true")
                    }, function() {
                        return t.controller.s("graphing-calculator-label-settings-step")
                    }), o.createElement(v, {
                        limit: t.const("xstep"),
                        ariaLabel: function() {
                            return t.controller.s("graphing-calculator-narration-settings-x-axis-step")
                        },
                        needsSystemKeypad: function() {
                            return !t.controller.isKeypadEnabled()
                        },
                        parent: t.const(t),
                        controller: t.props.controller
                    }))
                })), o.createElement("div", {
                    class: o.const("dcg-checkbox-title dcg-y-axis-title")
                }, o.createElement(d.Checkbox, {
                    ariaLabel: function() {
                        return t.controller.s("graphing-calculator-label-settings-y-axis")
                    },
                    onChange: t.bindFn(t.toggleYAxis),
                    checked: t.bindFn(t.getShowYAxis),
                    green: t.const(!0)
                }, function() {
                    return t.controller.s("graphing-calculator-label-settings-y-axis")
                }), o.createElement(x, {
                    class: t.const("dcg-axis-label dcg-y-axis-label"),
                    placeholder: function() {
                        return t.controller.s("graphing-calculator-label-settings-add-label")
                    },
                    "aria-label": function() {
                        return t.controller.s("graphing-calculator-narration-settings-y-axis-label")
                    },
                    disabled: function() {
                        return !t.getShowYAxis() || void 0
                    },
                    "aria-disabled": function() {
                        return !t.getShowYAxis() || void 0
                    },
                    onInput: t.bindFn(t.onYAxisLabelInput),
                    value: t.bindFn(t.getYAxisLabel)
                })), o.createElement("div", {
                    class: o.const("dcg-editable-mathquill-container dcg-y-axis-options")
                }, o.createElement(v, {
                    limit: t.const("ymin"),
                    ariaLabel: function() {
                        return t.controller.s("graphing-calculator-narration-settings-y-axis-min")
                    },
                    needsSystemKeypad: function() {
                        return !t.controller.isKeypadEnabled()
                    },
                    parent: t.const(t),
                    controller: t.props.controller
                }), o.createElement(i.default, {
                    config: t.const({}),
                    latex: t.const("\\le y\\le")
                }, o.createElement("span", {
                    class: o.const("dcg-interval-interior")
                })), o.createElement(v, {
                    limit: t.const("ymax"),
                    ariaLabel: function() {
                        return t.controller.s("graphing-calculator-narration-settings-y-axis-max")
                    },
                    needsSystemKeypad: function() {
                        return !t.controller.isKeypadEnabled()
                    },
                    parent: t.const(t),
                    controller: t.props.controller
                }), o.createElement(y, {
                    predicate: function() {
                        return !t.getPolarMode()
                    }
                }, function() {
                    return o.createElement("span", {
                        class: o.const("dcg-step-container")
                    }, o.createElement("span", {
                        class: o.const("dcg-step-label"),
                        "aria-hidden": o.const("true")
                    }, function() {
                        return t.controller.s("graphing-calculator-label-settings-step")
                    }), o.createElement(v, {
                        limit: t.const("ystep"),
                        ariaLabel: function() {
                            return t.controller.s("graphing-calculator-narration-settings-y-axis-step")
                        },
                        needsSystemKeypad: function() {
                            return !t.controller.isKeypadEnabled()
                        },
                        parent: t.const(t),
                        controller: t.props.controller
                    }))
                }))), o.createElement("div", {
                    class: o.const("dcg-radiangroup dcg-segmented-control-container"),
                    role: o.const("group"),
                    "aria-label": function() {
                        return t.controller.s("graphing-calculator-narration-settings-angle")
                    }
                }, o.createElement("div", {
                    class: function() {
                        return {
                            "dcg-action-radianmode": !0,
                            "dcg-segmented-control-btn": !0,
                            "dcg-dark-gray-segmented-control-btn": !0,
                            "dcg-selected dcg-active": !t.getDegreeMode()
                        }
                    },
                    "aria-pressed": function() {
                        return !t.getDegreeMode()
                    },
                    role: o.const("button"),
                    tabindex: o.const("0"),
                    "aria-label": function() {
                        return t.controller.s("graphing-calculator-button-settings-radians")
                    },
                    onTap: t.bindFn(t.setRadianMode)
                }, function() {
                    return t.controller.s("graphing-calculator-button-settings-radians")
                }), o.createElement("div", {
                    class: function() {
                        return {
                            "dcg-action-degreemode": !0,
                            "dcg-segmented-control-btn": !0,
                            "dcg-dark-gray-segmented-control-btn": !0,
                            "dcg-selected dcg-active": t.getDegreeMode()
                        }
                    },
                    "aria-pressed": t.bindFn(t.getDegreeMode),
                    role: o.const("button"),
                    tabindex: o.const("0"),
                    "aria-label": function() {
                        return t.controller.s("graphing-calculator-button-settings-degrees")
                    },
                    onTap: t.bindFn(t.setDegreeMode),
                    manageFocus: t.const(u.manageFocusHelper({
                        controller: t.controller,
                        location: {
                            type: "settings",
                            location: "degree-mode"
                        }
                    }))
                }, function() {
                    return t.controller.s("graphing-calculator-button-settings-degrees")
                })), o.createElement("div", {
                    class: o.const("dcg-arrow")
                })))
            }))
        }
        ,
        s.prototype.didMountContainer = function(t) {
            var e = this;
            this.node = t,
            a(document).on("dcg-tapstart.settings-view wheel.settings-view", function(t) {
                e.eventShouldClosePopover(t) && e.controller.dispatch({
                    type: "close-graph-settings",
                    focusIconAfterClose: "keyboard" === t.device
                })
            }),
            a(document).on("keydown.settings-view", function(t) {
                if ("Esc" === n.lookup(t) && e.controller.dispatch({
                    type: "close-graph-settings",
                    focusIconAfterClose: !0
                }),
                e.controller.isGraphSettingsOpen() && "Tab" === n.lookup(t) && !t.altKey && !t.metaKey && !t.ctrlKey) {
                    var r = e.controller.getFocusLocation();
                    if (!r || "settings" !== r.type)
                        return;
                    t.shiftKey || "degree-mode" !== r.location ? t.shiftKey && "icon" === r.location && (e.controller.dispatch({
                        type: "set-focus-location",
                        location: {
                            type: "settings",
                            location: "degree-mode"
                        }
                    }),
                    t.preventDefault(),
                    t.stopPropagation()) : (e.controller.dispatch({
                        type: "set-focus-location",
                        location: {
                            type: "settings",
                            location: "icon"
                        }
                    }),
                    t.preventDefault(),
                    t.stopPropagation())
                }
            })
        }
        ,
        s.prototype.didUnmountContainer = function() {
            a(document).off(".settings-view")
        }
        ,
        s.prototype.didUpdate = function() {
            if (this.controller.isGraphSettingsOpen()) {
                var t = this.controller.getKeypadHeight();
                t !== this.cachedKeypadHeight && document.activeElement && a(document.activeElement).closest(this.node).length && r.scrollVisible(a(document.activeElement), a(this.node).find(".dcg-popover-interior"), 50),
                this.cachedKeypadHeight = t
            }
        }
        ,
        s.prototype.eventShouldClosePopover = function(t) {
            var e = a(t.target)
              , n = !!e.closest(this.node).length
              , r = !!e.closest(".dcg-action-settings").length
              , o = this.isMathquillFocused() && e.closest(".dcg-keypad").length
              , i = !!e.closest(".dcg-action-undo").length || !!e.closest(".dcg-action-redo").length;
            return !(n || r || o || i)
        }
        ,
        s.prototype.onTapSettingsButton = function(t) {
            this.controller.dispatch({
                type: "toggle-graph-settings",
                focusOnOpen: "keyboard" === t.device
            })
        }
        ,
        s.prototype.isMathquillFocused = function() {
            return void 0 !== this.getFocusedLimit()
        }
        ,
        s.prototype.getLimitLatex = function(t) {
            return this.controller.getSettingsViewModel().limitLatex[t]
        }
        ,
        s.prototype.setLimitLatex = function(t, e) {
            e !== this.controller.getSettingsViewModel().limitLatex[t] && this.controller.dispatch({
                type: "set-axis-limit-latex",
                limit: t,
                latex: e
            })
        }
        ,
        s.prototype.getFocusedLimit = function() {
            var t = this.controller.getFocusLocation();
            if (t && "settings" === t.type)
                return t.location
        }
        ,
        s.prototype.getInvalidLimits = function() {
            var t = !!this.controller.getGraphSettings().degreeMode
              , e = l.default(this.getLimitLatex("xmin"), t)
              , n = l.default(this.getLimitLatex("xmax"), t)
              , r = l.default(this.getLimitLatex("ymin"), t)
              , o = l.default(this.getLimitLatex("ymax"), t)
              , i = "" === this.getLimitLatex("xstep") ? 0 : l.default(this.getLimitLatex("xstep"), t)
              , s = "" === this.getLimitLatex("ystep") ? 0 : l.default(this.getLimitLatex("ystep"), t)
              , a = {}
              , c = new g.Viewport(e,n,r,o);
            return isFinite(e) && isFinite(n) ? (a.xmin = !c.isXValid(),
            a.xmax = a.xmin) : (a.xmin = !isFinite(e),
            a.xmax = !isFinite(n)),
            isFinite(r) && isFinite(o) ? (a.ymin = !c.isYValid(),
            a.ymax = a.ymin) : (a.ymin = !isFinite(r),
            a.ymax = !isFinite(o)),
            a.xstep = !isFinite(i) || i < 0,
            a.ystep = !isFinite(s) || s < 0,
            a
        }
        ,
        s.prototype.isLimitInvalid = function(t) {
            return this.getInvalidLimits()[t]
        }
        ,
        s.prototype.onFocusedChanged = function(t, e) {
            e ? this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "settings",
                    location: t
                }
            }) : this.controller.dispatch({
                type: "blur-focus-location",
                location: {
                    type: "settings",
                    location: t
                }
            })
        }
        ,
        s.prototype.onXAxisLabelInput = function(t) {
            this.controller.dispatch({
                type: "set-graph-settings",
                xAxisLabel: t
            })
        }
        ,
        s.prototype.onYAxisLabelInput = function(t) {
            this.controller.dispatch({
                type: "set-graph-settings",
                yAxisLabel: t
            })
        }
        ,
        s.prototype.getXAxisLabel = function() {
            return this.controller.getGraphSettings().xAxisLabel
        }
        ,
        s.prototype.getYAxisLabel = function() {
            return this.controller.getGraphSettings().yAxisLabel
        }
        ,
        s.prototype.getShowXAxis = function() {
            return !!this.controller.getGraphSettings().showXAxis
        }
        ,
        s.prototype.toggleXAxis = function() {
            this.controller.dispatch({
                type: "set-graph-settings",
                showXAxis: !this.getShowXAxis()
            })
        }
        ,
        s.prototype.getShowYAxis = function() {
            return !!this.controller.getGraphSettings().showYAxis
        }
        ,
        s.prototype.toggleYAxis = function() {
            this.controller.dispatch({
                type: "set-graph-settings",
                showYAxis: !this.getShowYAxis()
            })
        }
        ,
        s.prototype.getAxisNumbers = function() {
            return !!this.controller.getGraphSettings().xAxisNumbers
        }
        ,
        s.prototype.toggleAxisNumbers = function() {
            var t = this.getAxisNumbers();
            this.controller.dispatch({
                type: "set-graph-settings",
                xAxisNumbers: !t,
                yAxisNumbers: !t,
                polarNumbers: !t
            })
        }
        ,
        s.prototype.getMinorGridlines = function() {
            return 0 === this.controller.getGraphSettings().xAxisMinorSubdivisions
        }
        ,
        s.prototype.toggleMinorGridlines = function() {
            var t = this.getMinorGridlines() ? 1 : 0;
            this.controller.dispatch({
                type: "set-graph-settings",
                yAxisMinorSubdivisions: t,
                xAxisMinorSubdivisions: t
            })
        }
        ,
        s.prototype.getPolarMode = function() {
            return !!this.controller.getGraphSettings().polarMode
        }
        ,
        s.prototype.setPolarMode = function() {
            this.controller.dispatch({
                type: "set-graph-settings",
                polarMode: !0
            })
        }
        ,
        s.prototype.setCartesianMode = function() {
            this.controller.dispatch({
                type: "set-graph-settings",
                polarMode: !1
            })
        }
        ,
        s.prototype.getDegreeMode = function() {
            return !!this.controller.getGraphSettings().degreeMode
        }
        ,
        s.prototype.setRadianMode = function() {
            this.controller.dispatch({
                type: "set-graph-settings",
                degreeMode: !1
            })
        }
        ,
        s.prototype.setDegreeMode = function() {
            this.controller.dispatch({
                type: "set-graph-settings",
                degreeMode: !0
            })
        }
        ,
        s.prototype.getProjectorMode = function() {
            return !!this.controller.getGraphSettings().config.projectorMode
        }
        ,
        s.prototype.toggleInvertedColors = function() {
            this.controller.dispatch({
                type: "set-inverted-colors",
                value: !this.controller.getInvertedColors()
            })
        }
        ,
        s.prototype.toggleBrailleMode = function() {
            this.controller.dispatch({
                type: "set-braille-mode",
                mode: "none" === this.controller.getBrailleMode() ? "nemeth" : "none"
            })
        }
        ,
        s.prototype.setDefaultDisplaySize = function() {
            this.controller.dispatch({
                type: "set-projector-mode",
                value: !1
            })
        }
        ,
        s.prototype.setLargeDisplaySize = function() {
            this.controller.dispatch({
                type: "set-projector-mode",
                value: !0
            })
        }
        ,
        s.prototype.getAxisArrowMode = function() {
            return this.controller.getGraphSettings().xAxisArrowMode
        }
        ,
        s.prototype.setAxisArrowMode = function(t) {
            this.controller.dispatch({
                type: "set-graph-settings",
                xAxisArrowMode: t,
                yAxisArrowMode: t
            })
        }
        ,
        s.prototype.getShowGrid = function() {
            return this.controller.getGraphSettings().showGrid
        }
        ,
        s.prototype.toggleGrid = function() {
            this.controller.dispatch({
                type: "set-graph-settings",
                showGrid: !this.getShowGrid()
            })
        }
        ,
        s.prototype.toggleArrows = function() {
            var t = this.getAxisArrowMode() === c.AxisArrowModes.NONE ? c.AxisArrowModes.BOTH : c.AxisArrowModes.NONE;
            this.controller.dispatch({
                type: "set-graph-settings",
                xAxisArrowMode: t,
                yAxisArrowMode: t
            })
        }
        ,
        s.prototype.getSquareAxes = function() {
            return !!this.controller.getGraphSettings().squareAxes
        }
        ,
        s.prototype.getContainerStyle = function() {
            return this.controller.getKeypadHeight() ? "bottom: 0" : ""
        }
        ,
        s.prototype.zoomSquare = function() {
            this.controller.dispatch({
                type: "zoom",
                direction: "square"
            })
        }
        ,
        s.prototype.getCapExpressionSize = function() {
            return !!this.controller.getGraphSettings().config.capExpressionSize
        }
        ,
        s
    }(o.Class);
    t.default = A
});
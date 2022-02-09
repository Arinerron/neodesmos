
define('basic/settings-menu', ["require", "exports", "tslib", "browser", "keys", "dcgview", "./dcgview-basic", "jquery", "dcgview-helpers/download-button", "lib/export-braille-equations", "loadcss!./settings-menu"], function(require, e, t, n, o, r, c, l, s, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.SettingsMenu = void 0;
    var a = r.Components.If
      , d = function(e) {
        function c() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(c, e),
        c.prototype.template = function() {
            var e = this;
            return r.createElement("div", {
                class: function() {
                    return {
                        "dcg-settings-dropdown": !0,
                        "dcg-popover": !0,
                        "dcg-has-background-color": e.controller.hasBackgroundColor(),
                        "dcg-point-left": e.controller.containerSize.height <= 420
                    }
                },
                role: r.const("complementary"),
                "aria-label": r.const("Settings Menu"),
                didMount: this.bindFn(this.didMountSettingsDropdown),
                didUnmount: this.bindFn(this.didUnmountSettingsDropdown)
            }, r.createElement("div", {
                class: r.const("dcg-popover-interior"),
                style: function() {
                    return {
                        background: e.controller.getBackgroundColor()
                    }
                }
            }, r.createElement("div", {
                class: function() {
                    return {
                        "dcg-settings-menu-option": !0,
                        "dcg-displaysize-container": !0
                    }
                }
            }, r.createElement("div", {
                class: r.const("dcg-group-title")
            }, function() {
                return e.controller.s("shared-calculator-label-settings-display")
            }), r.createElement("div", {
                role: r.const("group"),
                "aria-label": function() {
                    return e.controller.s("shared-calculator-narration-settings-display-size")
                },
                class: r.const("dcg-displaysize-buttons dcg-segmented-control-container")
            }, r.createElement("span", {
                class: function() {
                    return {
                        "dcg-displaysize-option": !0,
                        "dcg-displaysize-default": !0,
                        "dcg-segmented-control-btn": !0,
                        "dcg-dark-gray-segmented-control-btn": !0,
                        "dcg-selected": !e.getProjectorMode()
                    }
                },
                role: r.const("button"),
                onTap: this.bindFn(this.setDefaultDisplaySize),
                tabindex: r.const(0),
                "aria-label": function() {
                    return e.controller.s("shared-calculator-narration-settings-display-size-default")
                },
                "aria-pressed": function() {
                    return !e.getProjectorMode()
                }
            }, r.const("A")), r.createElement("span", {
                class: function() {
                    return {
                        "dcg-displaysize-option": !0,
                        "dcg-displaysize-large": !0,
                        "dcg-segmented-control-btn": !0,
                        "dcg-dark-gray-segmented-control-btn": !0,
                        "dcg-selected": e.getProjectorMode()
                    }
                },
                role: r.const("button"),
                onTap: this.bindFn(this.setLargeDisplaySize),
                tabindex: r.const(0),
                "aria-label": function() {
                    return e.controller.s("shared-calculator-narration-settings-display-size-large")
                },
                "aria-pressed": this.bindFn(this.getProjectorMode)
            }, r.const("A")))), r.createElement("div", {
                role: r.const("checkbox"),
                tabindex: r.const(0),
                onTap: this.bindFn(this.onToggleInvertedColors),
                "aria-checked": function() {
                    return e.controller.getInvertedColors()
                },
                "aria-label": function() {
                    return e.controller.s("basic-calculator-narration-reverse-contrast")
                },
                class: function() {
                    return {
                        "dcg-settings-menu-option": !0,
                        "dcg-do-not-blur": !0,
                        "dcg-checked": e.controller.getInvertedColors(),
                        "dcg-checkbox-container": !0,
                        "dcg-reverse-contrast": !0
                    }
                },
                handleEvent: r.const(!0)
            }, r.createElement("span", {
                class: r.const("dcg-checkbox-box")
            }, r.createElement("i", {
                class: r.const("dcg-icon-check")
            })), r.createElement("span", {
                class: r.const("dcg-checkbox-label")
            }, function() {
                return e.controller.s("basic-calculator-label-reverse-contrast")
            })), r.createElement(a, {
                predicate: function() {
                    return e.controller.getBrailleControls()
                }
            }, function() {
                return r.createElement("div", null, r.createElement("div", {
                    role: r.const("checkbox"),
                    tabindex: r.const(0),
                    onTap: e.bindFn(e.onToggleBrailleMode),
                    "aria-checked": function() {
                        return e.controller.renderAsBraille()
                    },
                    "aria-label": function() {
                        return e.controller.s("basic-calculator-narration-braille-mode")
                    },
                    class: function() {
                        return {
                            "dcg-settings-menu-option": !0,
                            "dcg-do-not-blur": !0,
                            "dcg-checked": e.controller.renderAsBraille(),
                            "dcg-checkbox-container": !0,
                            "dcg-braille-mode": !0
                        }
                    },
                    handleEvent: r.const(!0)
                }, r.createElement("span", {
                    class: r.const("dcg-checkbox-box")
                }, r.createElement("i", {
                    class: r.const("dcg-icon-check")
                })), r.createElement("span", {
                    class: r.const("dcg-checkbox-label")
                }, function() {
                    return e.controller.s("basic-calculator-label-braille-mode")
                })), r.createElement(a, {
                    predicate: function() {
                        return e.controller.renderAsBraille()
                    }
                }, function() {
                    return r.createElement("div", {
                        class: function() {
                            return {
                                "dcg-settings-menu-option": !0,
                                "dcg-braille-container": !0
                            }
                        }
                    }, r.createElement("div", {
                        role: r.const("group"),
                        "aria-label": function() {
                            return e.controller.s("basic-calculator-label-braille-mode")
                        },
                        class: r.const("dcg-braille-options-buttons dcg-segmented-control-container")
                    }, r.createElement("span", {
                        class: function() {
                            return {
                                "dcg-braille-option": !0,
                                "dcg-segmented-control-btn": !0,
                                "dcg-dark-gray-segmented-control-btn": !0,
                                "dcg-selected": e.isNemeth()
                            }
                        },
                        role: r.const("button"),
                        onTap: function() {
                            return e.setBrailleMode("nemeth")
                        },
                        tabindex: r.const(0),
                        "aria-label": function() {
                            return e.controller.s("basic-calculator-narration-nemeth")
                        },
                        "aria-pressed": function() {
                            return e.isNemeth()
                        }
                    }, function() {
                        return e.controller.s("basic-calculator-button-nemeth")
                    }), r.createElement("span", {
                        class: function() {
                            return {
                                "dcg-braille-option": !0,
                                "dcg-segmented-control-btn": !0,
                                "dcg-dark-gray-segmented-control-btn": !0,
                                "dcg-selected": e.isUEB()
                            }
                        },
                        role: r.const("button"),
                        onTap: function() {
                            return e.setBrailleMode("ueb")
                        },
                        tabindex: r.const(0),
                        "aria-label": function() {
                            return e.controller.s("basic-calculator-narration-ueb")
                        },
                        "aria-pressed": function() {
                            return e.isUEB()
                        }
                    }, function() {
                        return e.controller.s("basic-calculator-button-ueb")
                    })), r.createElement("div", {
                        class: r.const("dcg-braille-options-container")
                    }, r.createElement("div", {
                        role: r.const("checkbox"),
                        tabindex: r.const(0),
                        onTap: function() {
                            return e.onToggleSixKeyInput()
                        },
                        "aria-checked": function() {
                            return e.controller.getSixKeyInput()
                        },
                        "aria-label": function() {
                            return e.controller.s("basic-calculator-narration-six-key-input")
                        },
                        class: function() {
                            return {
                                "dcg-settings-menu-option": !0,
                                "dcg-do-not-blur": !0,
                                "dcg-six-key-checkbox": !0,
                                "dcg-checked": e.controller.getSixKeyInput(),
                                "dcg-checkbox-container": !0
                            }
                        },
                        handleEvent: r.const(!0)
                    }, r.createElement("span", {
                        class: r.const("dcg-checkbox-box")
                    }, r.createElement("i", {
                        class: r.const("dcg-icon-check")
                    })), r.createElement("span", {
                        class: r.const("dcg-checkbox-label")
                    }, function() {
                        return e.controller.s("basic-calculator-label-six-key-input")
                    })), r.createElement("a", {
                        href: r.const("https://www.desmos.com/accessibility#braille"),
                        class: r.const("dcg-six-key-info"),
                        target: r.const("_blank")
                    }, r.createElement("i", {
                        class: r.const("dcg-icon-question-sign")
                    })), r.createElement(a, {
                        predicate: function() {
                            return !n.IS_MOBILE && s.canDownload() && e.controller.getBrailleExpressionDownload()
                        }
                    }, function() {
                        return r.createElement(s.default, {
                            data: function() {
                                var t = i.getBrailleEquationsBasic(e.model, e.controller.getBrailleMode());
                                return new Blob([t],{
                                    type: "text/plain"
                                })
                            },
                            enabled: e.const(!0),
                            filename: e.const("desmos-equations.brl"),
                            text: function() {
                                return e.controller.s("basic-calculator-link-download-braille-equations")
                            },
                            isBraille: e.const(!0)
                        })
                    })))
                }))
            }), r.createElement(a, {
                predicate: function() {
                    return !!e.getVersionNumber()
                }
            }, function() {
                return r.createElement("div", {
                    class: r.const("dcg-version-number")
                }, r.const("Version: "), function() {
                    return e.getVersionNumber()
                })
            })))
        }
        ,
        c.prototype.getVersionNumber = function() {
            var e = window;
            if (e && e.AppBridge)
                return e.AppBridge.versionNumber
        }
        ,
        c.prototype.didUnmountSettingsDropdown = function() {
            l(document).off(".dcg-settings-view")
        }
        ,
        c.prototype.didMountSettingsDropdown = function(e) {
            var t = this;
            this.settingsGroupNode = e,
            l(document).on("dcg-tapstart.dcg-settings-view", function(e) {
                0 === l(e.target).closest(".dcg-basic-settings-container").length && t.controller.dispatch({
                    type: "close-settings-menu"
                })
            }),
            l(document).on("keydown.dcg-settings-view", function(e) {
                if ("Esc" === o.lookup(e) && (t.controller.dispatch({
                    type: "close-settings-menu"
                }),
                t.controller.dispatch({
                    type: "focus-last-expression"
                })),
                "Tab" === o.lookup(e) && !e.altKey && !e.metaKey && !e.ctrlKey) {
                    var n = document.activeElement
                      , r = l(t.props.settingsButtonNode())
                      , c = l(t.settingsGroupNode).find(".dcg-settings-menu-option:last");
                    e.shiftKey || n !== c[0] ? e.shiftKey && n === r[0] && (c.trigger("focus"),
                    e.preventDefault(),
                    e.stopPropagation()) : (r.trigger("focus"),
                    e.preventDefault(),
                    e.stopPropagation())
                }
            })
        }
        ,
        c.prototype.setBrailleMode = function(e) {
            this.controller.dispatch({
                type: "set-braille-mode",
                mode: e
            })
        }
        ,
        c.prototype.onToggleBrailleMode = function() {
            this.controller.dispatch({
                type: "set-braille-mode",
                mode: this.controller.renderAsBraille() ? "none" : "nemeth"
            })
        }
        ,
        c.prototype.isNemeth = function() {
            return "nemeth" === this.controller.getBrailleMode()
        }
        ,
        c.prototype.isUEB = function() {
            return "ueb" === this.controller.getBrailleMode()
        }
        ,
        c.prototype.isLatex = function() {
            return "none" === this.controller.getBrailleMode()
        }
        ,
        c.prototype.onToggleSixKeyInput = function() {
            var e = !this.controller.getSixKeyInput();
            this.controller.dispatch({
                type: "set-six-key-input",
                mode: e
            })
        }
        ,
        c.prototype.onToggleInvertedColors = function() {
            var e = !this.controller.getInvertedColors();
            this.controller.dispatch({
                type: "update-inverted-colors",
                mode: e
            })
        }
        ,
        c.prototype.getProjectorMode = function() {
            return this.controller.isProjectorMode()
        }
        ,
        c.prototype.setDefaultDisplaySize = function() {
            this.controller.dispatch({
                type: "update-projector-mode",
                mode: !1
            })
        }
        ,
        c.prototype.setLargeDisplaySize = function() {
            this.controller.dispatch({
                type: "update-projector-mode",
                mode: !0
            })
        }
        ,
        c
    }(c.DCGViewBasic);
    e.SettingsMenu = d
});

define('calculator-shell/export-image-dialog', ["require", "exports", "api/calculator", "config", "tslib", "dcgview", "jquery", "lib/data-uri-to-blob", "lib/svg-string-to-blob", "dcgview-helpers/download-button", "./export-image-size-options", "lib/export-braille-equations", "graphing/braille-size-options", "./modal", "shared/dcgviews/localize", "browser", "loadcss!./export-image-dialog"], function(require, t, e, n, i, r, o, s, c, l, a, u, d, h, g, p) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.sizes = void 0;
    var m = r.Components
      , f = m.If
      , v = m.IfElse;
    t.sizes = {};
    var b = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    };
    t.sizes.small_square = {
        width: 160,
        height: 160,
        margins: b,
        name: function(t) {
            return t.s("account-shell-label-export-size-small-square")
        }
    },
    t.sizes.medium_square = {
        width: 400,
        height: 400,
        margins: b,
        name: function(t) {
            return t.s("account-shell-label-export-size-medium-square")
        }
    },
    t.sizes.large_square = {
        width: 1e3,
        height: 1e3,
        margins: b,
        name: function(t) {
            return t.s("account-shell-label-export-size-large-square")
        }
    },
    t.sizes.medium_rectangle = {
        width: 600,
        height: 400,
        margins: b,
        name: function(t) {
            return t.s("account-shell-label-export-size-medium-rectangle")
        }
    },
    t.sizes.large_rectangle = {
        width: 1200,
        height: 800,
        margins: b,
        name: function(t) {
            return t.s("account-shell-label-export-size-large-rectangle")
        }
    },
    t.sizes = i.__assign(i.__assign({}, t.sizes), d.brailleSizes);
    var w = function(d) {
        function m() {
            return null !== d && d.apply(this, arguments) || this
        }
        return i.__extends(m, d),
        m.prototype.init = function() {
            this.controller = this.props.controller(),
            this.thickness = "thin",
            this.size = "medium_square";
            var t = this.controller.api.controller.getBrailleMode();
            this.brailleMode = "none" !== t ? t : "nemeth",
            this.showDownloadButton = l.canDownload(),
            this.unmounted = !1,
            this.svgDropdownOpen = !1,
            this.markImagesDirty(),
            this.loaded = !1
        }
        ,
        m.prototype.template = function() {
            var t = this;
            return r.createElement(h.Modal, {
                controller: this.props.controller
            }, r.createElement("div", {
                id: r.const("export-image-dialog")
            }, r.createElement("h1", null, function() {
                return t.controller.s("account-shell-heading-export-graph")
            }), r.createElement("div", {
                class: r.const("dcg-offscreen-calculator"),
                didMount: this.bindFn(this.didMountOffscreenCalc),
                willUnmount: this.bindFn(this.willUnmountOffscreenCalc),
                "aria-hidden": r.const("true")
            }), r.createElement("div", {
                class: r.const("dcg-columns")
            }, r.createElement("div", {
                class: r.const("dcg-left-column")
            }, r.createElement("div", {
                class: function() {
                    return {
                        "dcg-graph-preview": !0,
                        "dcg-preview-loading": t.pngDirty
                    }
                }
            }, r.createElement(f, {
                predicate: function() {
                    return t.loaded
                }
            }, function() {
                return r.createElement("img", {
                    class: r.const("dcg-graph-image"),
                    didMount: t.bindFn(t.didMountGraphPreview),
                    src: function() {
                        return t.previewDataURL
                    },
                    alt: function() {
                        return t.controller.s("account-shell-narration-graph-preview")
                    }
                })
            }), r.createElement(f, {
                predicate: function() {
                    return t.pngDirty
                }
            }, function() {
                return r.createElement("span", {
                    class: r.const("dcg-loading-message")
                }, r.createElement("span", {
                    class: r.const("dcg-spinner")
                }), function() {
                    return t.controller.s("account-shell-label-loading")
                })
            }), r.createElement(f, {
                predicate: function() {
                    return !t.pngDirty && !t.isExportingBraille()
                }
            }, function() {
                return r.createElement("span", {
                    class: r.const("dcg-zoom-percentage")
                }, t.bindFn(t.getZoom))
            }))), r.createElement("div", {
                class: r.const("dcg-right-column")
            }, r.createElement("div", {
                role: r.const("heading"),
                "aria-level": r.const("2"),
                class: r.const("dcg-section-title")
            }, function() {
                return t.controller.s("account-shell-heading-export-size")
            }), r.createElement(a.default, {
                controller: this.props.controller,
                selectedSize: function() {
                    return t.size
                },
                selectSize: this.bindFn(this.selectSize)
            }), r.createElement(f, {
                predicate: function() {
                    return !t.isExportingBraille()
                }
            }, function() {
                return r.createElement("div", null, r.createElement("div", {
                    role: r.const("heading"),
                    "aria-level": r.const("2"),
                    class: r.const("dcg-section-title")
                }, function() {
                    return t.controller.s("account-shell-heading-line-thickness")
                }), r.createElement("div", {
                    role: r.const("group"),
                    "aria-label": function() {
                        return t.controller.s("account-shell-heading-line-thickness")
                    },
                    class: r.const("dcg-button-group")
                }, r.createElement("div", {
                    role: r.const("button"),
                    tabindex: r.const("0"),
                    class: function() {
                        return {
                            "dcg-button": !0,
                            "dcg-selected": "thin" === t.thickness
                        }
                    },
                    "aria-pressed": function() {
                        return "thin" === t.thickness
                    },
                    onTap: function() {
                        return t.selectThickness("thin")
                    }
                }, function() {
                    return t.controller.s("account-shell-button-line-thin")
                }), r.createElement("div", {
                    role: r.const("button"),
                    tabindex: r.const("0"),
                    class: function() {
                        return {
                            "dcg-button": !0,
                            "dcg-selected": "medium" === t.thickness
                        }
                    },
                    "aria-pressed": function() {
                        return "medium" === t.thickness
                    },
                    onTap: function() {
                        return t.selectThickness("medium")
                    }
                }, function() {
                    return t.controller.s("account-shell-button-line-medium")
                }), r.createElement("div", {
                    role: r.const("button"),
                    tabindex: r.const("0"),
                    class: function() {
                        return {
                            "dcg-button": !0,
                            "dcg-selected": "thick" === t.thickness
                        }
                    },
                    "aria-pressed": function() {
                        return "thick" === t.thickness
                    },
                    onTap: function() {
                        return t.selectThickness("thick")
                    }
                }, function() {
                    return t.controller.s("account-shell-button-line-thick")
                })))
            }), r.createElement(f, {
                predicate: function() {
                    return t.isExportingBraille()
                }
            }, function() {
                return r.createElement("div", {
                    class: r.const("braille-container")
                }, r.createElement("div", {
                    role: r.const("heading"),
                    "aria-level": r.const("2"),
                    class: r.const("dcg-section-title")
                }, function() {
                    return t.controller.s("account-shell-heading-braille-mode")
                }), r.createElement("div", {
                    role: r.const("group"),
                    "aria-label": function() {
                        return t.controller.s("account-shell-heading-braille-mode")
                    },
                    class: r.const("dcg-button-group")
                }, r.createElement("div", {
                    role: r.const("button"),
                    tabindex: r.const("0"),
                    class: function() {
                        return {
                            "dcg-button": !0,
                            "dcg-selected": "nemeth" === t.brailleMode
                        }
                    },
                    "aria-pressed": function() {
                        return "nemeth" === t.brailleMode
                    },
                    onTap: function() {
                        return t.selectBrailleMode("nemeth")
                    }
                }, function() {
                    return t.controller.s("account-shell-button-braille-nemeth")
                }), r.createElement("div", {
                    role: r.const("button"),
                    tabindex: r.const("0"),
                    class: function() {
                        return {
                            "dcg-button": !0,
                            "dcg-selected": "ueb" === t.brailleMode
                        }
                    },
                    "aria-pressed": function() {
                        return "ueb" === t.brailleMode
                    },
                    onTap: function() {
                        return t.selectBrailleMode("ueb")
                    }
                }, function() {
                    return t.controller.s("account-shell-button-braille-ueb")
                })), r.createElement("div", {
                    class: r.const("braille-instructions")
                }, r.createElement("div", {
                    role: r.const("heading"),
                    "aria-level": r.const("2"),
                    class: r.const("dcg-section-title")
                }, function() {
                    return t.controller.s("account-shell-heading-embossing-instructions")
                }), r.createElement(f, {
                    predicate: function() {
                        return "vpmax8" === t.size || "vpmax11" === t.size
                    }
                }, function() {
                    return r.createElement("ul", null, r.createElement("li", null, function() {
                        return t.controller.s("account-shell-text-embossing-vpmax-save")
                    }), r.createElement("li", null, function() {
                        return t.controller.s("account-shell-text-embossing-vpmax-print", {
                            size: E(t.size)
                        })
                    }))
                }), r.createElement(f, {
                    predicate: function() {
                        return "etc8" === t.size || "etc11" === t.size
                    }
                }, function() {
                    return r.createElement("ul", null, r.createElement("li", null, function() {
                        return t.controller.s("account-shell-text-embossing-etc-save")
                    }), r.createElement("li", null, function() {
                        return t.controller.s("account-shell-text-embossing-etc-print", {
                            size: E(t.size)
                        })
                    }))
                }), r.createElement("div", {
                    class: r.const("dcg-feedback-link")
                }, r.createElement(g.Localize, {
                    i18n: t.const(t.controller),
                    key: t.const("graphing-calculator-text-export-braille-email-accessibility")
                }, r.const("Feedback? Email"), r.const(" "), r.createElement("a", {
                    class: r.const("blue-link"),
                    href: r.const("mailto:accessibility@desmos.com")
                }, r.const("accessibility@desmos.com")), r.const(".")))))
            }), v(this.const(this.showDownloadButton), {
                true: function() {
                    return r.createElement("div", null, r.createElement("div", {
                        role: r.const("group"),
                        "aria-label": function() {
                            return t.controller.s("account-shell-narration-image-download")
                        },
                        class: function() {
                            return {
                                "dcg-download-button-group": !0,
                                "dcg-download-button-group-singleton": t.isExportingBraille()
                            }
                        }
                    }, r.createElement(l.default, {
                        data: function() {
                            return t.previewBlob
                        },
                        enabled: function() {
                            return !t.pngDirty
                        },
                        filename: t.const("desmos-graph.png"),
                        text: function() {
                            return t.controller.s("account-shell-button-download-png")
                        }
                    }), r.createElement(f, {
                        predicate: function() {
                            return !t.isExportingBraille()
                        }
                    }, function() {
                        return r.createElement("div", {
                            role: r.const("button"),
                            tabindex: function() {
                                return t.svgDirty ? -1 : 0
                            },
                            "aria-disabled": function() {
                                return t.svgDirty
                            },
                            "aria-expanded": function() {
                                return t.svgDropdownOpen
                            },
                            "aria-label": function() {
                                return t.controller.s("account-shell-button-svg-options")
                            },
                            class: function() {
                                return {
                                    "dcg-svg-dropdown": !0,
                                    "dcg-button": !0,
                                    "dcg-disabled": t.svgDirty
                                }
                            },
                            onTap: t.bindFn(t.toggleSvgDropdown)
                        }, r.createElement("i", {
                            class: r.const("dcg-icon-caret-down")
                        }))
                    })), r.createElement(f, {
                        predicate: function() {
                            return t.isExportingBraille() && !p.IS_MOBILE
                        }
                    }, function() {
                        return r.createElement(l.default, {
                            data: function() {
                                return t.brailleBlob
                            },
                            enabled: function() {
                                return !t.pngDirty
                            },
                            filename: t.const("desmos-equations.brl"),
                            text: function() {
                                return t.controller.s("account-shell-button-download-braille")
                            },
                            isBraille: t.const(!0)
                        })
                    }), r.createElement(f, {
                        predicate: function() {
                            return t.svgDropdownOpen
                        }
                    }, function() {
                        return r.createElement("div", {
                            class: r.const("dcg-svg-popover dcg-popover dcg-top"),
                            didMount: t.bindFn(t.didMountSvgDropdown),
                            willUnmount: t.bindFn(t.willUnmountSvgDropdown)
                        }, r.createElement("div", {
                            class: r.const("dcg-popover-interior")
                        }, r.createElement(l.default, {
                            data: function() {
                                return t.svgBlob
                            },
                            enabled: function() {
                                return !t.svgDirty
                            },
                            filename: t.const("desmos-graph.svg"),
                            text: function() {
                                return t.controller.s("account-shell-button-download-svg")
                            },
                            isSvg: t.const(!0)
                        }), r.createElement("div", {
                            class: r.const("dcg-beta-tag")
                        }, function() {
                            return t.controller.s("account-shell-label-beta")
                        })), r.createElement("div", {
                            class: r.const("dcg-arrow")
                        }))
                    }))
                },
                false: function() {
                    return r.createElement(f, {
                        predicate: function() {
                            return !t.isExportingBraille()
                        }
                    }, function() {
                        return r.createElement("div", {
                            class: r.const("dcg-download-not-enabled-notice")
                        }, r.createElement("div", {
                            role: r.const("heading"),
                            "aria-level": r.const("2"),
                            class: r.const("dcg-title")
                        }, function() {
                            return t.controller.s("account-shell-heading-download-instructions")
                        }), function() {
                            return t.controller.s("account-shell-text-download-instructions")
                        })
                    })
                }
            })))))
        }
        ,
        m.prototype.didMountSvgDropdown = function(t) {
            var e = this;
            o(document).on("dcg-tap.svg-dropdown", function(n) {
                var i = n.target
                  , r = o(".dcg-svg-dropdown")[0];
                t && r && (r.contains(i) || t.contains(i) || e.closeSvgDropdown())
            })
        }
        ,
        m.prototype.willUnmountSvgDropdown = function() {
            o(document).off(".svg-dropdown")
        }
        ,
        m.prototype.didMountOffscreenCalc = function(t) {
            var n = this;
            this.calculator = new e.Calculator(t,{
                expressions: !1,
                keypad: !1,
                branding: !1,
                border: !1,
                enableTabindex: !1
            }),
            this.calculator._calc.evaluator.notifyWhenSynced(function() {
                n.markImagesDirty(),
                n.updateIfMounted()
            }),
            this.calculator.setState(this.controller.api.getState())
        }
        ,
        m.prototype.willUnmountOffscreenCalc = function() {
            this.calculator && this.calculator.destroy()
        }
        ,
        m.prototype.markImagesDirty = function() {
            this.pngDirty = !0,
            this.svgDirty = !0
        }
        ,
        m.prototype.selectSize = function(t) {
            this.size = t,
            this.markImagesDirty(),
            this.updateIfMounted()
        }
        ,
        m.prototype.selectBrailleMode = function(t) {
            this.brailleMode = t,
            this.markImagesDirty(),
            this.updateIfMounted()
        }
        ,
        m.prototype.getZoom = function() {
            return this.controller.s("account-shell-label-zoom", {
                value: Math.min(100, Math.round(4e4 / this.getWidth()))
            })
        }
        ,
        m.prototype.selectThickness = function(t) {
            this.thickness = t,
            this.markImagesDirty(),
            this.updateIfMounted()
        }
        ,
        m.prototype.didMountGraphPreview = function(t) {
            this.previewImg = t
        }
        ,
        m.prototype.getGridOpacity = function() {
            switch (this.thickness) {
            case "thick":
                return 1;
            case "medium":
                return .6;
            case "thin":
                return .4;
            default:
                return this.thickness
            }
        }
        ,
        m.prototype.getAxisWeight = function() {
            switch (this.thickness) {
            case "thick":
            case "medium":
                return 2;
            case "thin":
                return 1.5;
            default:
                return this.thickness
            }
        }
        ,
        m.prototype.getGraphThickness = function() {
            switch (this.thickness) {
            case "thick":
                return 5;
            case "medium":
                return 3.5;
            case "thin":
                return 2.5;
            default:
                return this.thickness
            }
        }
        ,
        m.prototype.getLabelSize = function() {
            if ("small_square" === this.size)
                switch (this.thickness) {
                case "thick":
                    return 14;
                case "medium":
                    return 12;
                case "thin":
                    return 10;
                default:
                    return this.thickness
                }
            else
                switch (this.thickness) {
                case "thick":
                    return 20;
                case "medium":
                    return 17;
                case "thin":
                    return 14;
                default:
                    return this.thickness
                }
        }
        ,
        m.prototype.updateViewSettings = function() {
            if (void 0 !== this.calculator && void 0 !== this.calculator._calc && void 0 !== this.calculator._calc.grapher && void 0 !== this.calculator._calc.grapher.settings) {
                var t = this.calculator._calc.grapher.settings;
                this.isExportingBraille() || (t.majorAxisOpacity = this.getGridOpacity(),
                t.minorAxisOpacity = this.getGridOpacity() / 2,
                t.axisLineOffset = 0,
                t.setProperty("axisLineWidth", this.getAxisWeight()),
                t.labelSize = this.getLabelSize(),
                t.graphLineWidth = this.getGraphThickness(),
                t.pointLineWidth = 3 * this.getGraphThickness())
            }
        }
        ,
        m.prototype.getBackgroundSize = function() {
            switch (this.size) {
            case "medium_rectangle":
            case "large_rectangle":
                return "contain";
            case "small_square":
                return t.sizes.small_square.width + "px " + t.sizes.small_square.height + "px";
            default:
                return "cover"
            }
        }
        ,
        m.prototype.getHeight = function() {
            return t.sizes[this.size].height
        }
        ,
        m.prototype.getWidth = function() {
            return t.sizes[this.size].width
        }
        ,
        m.prototype.didUnmount = function() {
            this.unmounted = !0
        }
        ,
        m.prototype.updateIfMounted = function() {
            this.unmounted || this.update()
        }
        ,
        m.prototype.updateGraphPreview = function() {
            var t = this;
            if ((this.pngDirty || this.svgDirty) && void 0 !== this.calculator && void 0 !== this.calculator._calc && void 0 !== this.calculator._calc.grapher && void 0 !== this.calculator._calc.grapher.settings) {
                this.updateViewSettings();
                var e = {
                    width: this.getWidth(),
                    height: this.getHeight(),
                    preserveAxisNumbers: !0,
                    showLabels: !0,
                    targetPixelRatio: 2
                }
                  , r = {
                    braille: {
                        embosserModel: this.size,
                        brailleMode: this.brailleMode
                    }
                };
                if (this.pngDirty) {
                    var o = this.isExportingBraille() ? r : e;
                    this.calculator.asyncScreenshot(o, function(e) {
                        t.previewDataURL = e,
                        t.previewBlob = s.default(t.previewDataURL),
                        t.pngDirty = !1,
                        t.loaded = !0,
                        t.updateIfMounted(),
                        t.resizePreviewImg()
                    })
                }
                if (this.svgDirty) {
                    var l = i.__assign(i.__assign({}, e), {
                        svg: !0
                    })
                      , a = n.get("worksheetSVG");
                    a && (l.targetPixelRatio = 1),
                    this.calculator.asyncScreenshot(l, function(e) {
                        a && (e = function(t) {
                            var e = (new DOMParser).parseFromString(t, "text/xml");
                            function n(t, n) {
                                e.querySelectorAll(t).forEach(n)
                            }
                            return n(".dcg-svg-region", function(t) {
                                t.setAttribute("fill", "black")
                            }),
                            n(".dcg-svg-label *", function(t) {
                                t.setAttribute("stroke", "none"),
                                t.setAttribute("fill", "black")
                            }),
                            n(".dcg-svg-axis-value text", function(t) {
                                "none" !== t.getAttribute("stroke") ? t.parentElement && t.parentElement.removeChild(t) : (t.setAttribute("font-family", "Helvetica Neue"),
                                t.setAttribute("font-weight", "bold"))
                            }),
                            n(".dcg-svg-offcenter-axis-value", function(t) {
                                t.parentElement && t.parentElement.removeChild(t)
                            }),
                            n(".dcg-svg-curve", function(t) {
                                t.setAttribute("stroke", "black"),
                                t.setAttribute("stroke-width", "5"),
                                t.setAttribute("stroke-opacity", "1")
                            }),
                            n(".dcg-svg-point", function(t) {
                                t.setAttribute("stroke", "black"),
                                t.setAttribute("stroke-width", "10"),
                                t.setAttribute("stroke-opacity", "1")
                            }),
                            n(".dcg-svg-background", function(t) {
                                var n = parseFloat(t.getAttribute("width"))
                                  , i = parseFloat(t.getAttribute("height"))
                                  , r = 3
                                  , o = e.createElementNS("http://www.w3.org/2000/svg", "path");
                                o.setAttribute("d", "M" + (n - r) + "," + r + "v" + (i - 2 * r) + "H" + r + "V" + r + "H" + (n - r) + " M" + n + ",0H0v" + i + "h" + n + "V0L" + n + ",0z"),
                                t.parentElement.appendChild(o)
                            }),
                            n(".dcg-svg-axis-line", function(t) {
                                t.setAttribute("stroke", "black"),
                                t.setAttribute("stroke-width", "4"),
                                t.setAttribute("stroke-opacity", "1")
                            }),
                            n(".dcg-svg-minor-gridline, .dcg-svg-major-gridline", function(t) {
                                t.setAttribute("stroke", "black"),
                                t.setAttribute("stroke-width", "1"),
                                t.setAttribute("stroke-opacity", "1")
                            }),
                            e.firstChild.outerHTML
                        }(e)),
                        t.svgBlob = c.default(e),
                        t.svgDirty = !1,
                        t.updateIfMounted(),
                        t.resizePreviewImg()
                    })
                }
            }
        }
        ,
        m.prototype.updateBrailleEquations = function() {
            if (this.isExportingBraille()) {
                var t = u.getBrailleEquationsGraphing(this.controller.api.controller, this.brailleMode);
                this.brailleBlob = new Blob([t],{
                    type: "text/plain"
                })
            }
        }
        ,
        m.prototype.resizePreviewImg = function() {
            if (this.previewImg) {
                var t = 1;
                "etc8" !== this.size && "etc11" !== this.size || (t = 2),
                "vpmax8" !== this.size && "vpmax11" !== this.size || (t = 1.5);
                var e = Math.min(this.getWidth(), 400)
                  , n = this.getHeight() / this.getWidth() * e;
                this.previewImg.width = e * t,
                this.previewImg.height = n * t
            }
        }
        ,
        m.prototype.willUpdate = function() {
            this.updateGraphPreview(),
            this.updateBrailleEquations()
        }
        ,
        m.prototype.isExportingBraille = function() {
            return "vpmax8" === (t = this.size) || "vpmax11" === t || "etc8" === t || "etc11" === t;
            var t
        }
        ,
        m.prototype.closeSvgDropdown = function() {
            this.svgDropdownOpen = !1,
            this.updateIfMounted()
        }
        ,
        m.prototype.toggleSvgDropdown = function() {
            this.svgDropdownOpen = !this.svgDropdownOpen,
            this.updateIfMounted()
        }
        ,
        m
    }(r.Class);
    function E(t) {
        switch (t) {
        case "etc8":
            return "8.5 x 11.0";
        case "etc11":
            return "11.5 x 11.0";
        case "vpmax8":
            return "8.5 x 11";
        case "vpmax11":
            return "11.5 x 11";
        default:
            return t
        }
    }
    t.default = w
});

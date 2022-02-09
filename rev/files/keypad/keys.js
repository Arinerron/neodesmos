define('keypad/keys', ["require", "exports", "./btn", "dcgview-helpers/static-mathquill-view", "dcgview"], function(require, a, e, t, n) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    }),
    a.spacer = a.view = void 0;
    var r = n.Components
      , c = r.IfElse
      , o = r.If
      , l = r.Switch;
    function i(a, e) {
        return void 0 === a ? n.const(e) : "function" == typeof a ? a : n.const(a)
    }
    function d(a) {
        return function(r, o, l, d) {
            return void 0 === l && (l = {}),
            n.createElement(e.default, {
                command: n.const(a.command || a.typedText || a.keys[0]),
                ariaLabel: function() {
                    return a.ariaLabelKey ? d(a.ariaLabelKey) : a.typedText || a.keys[0]
                },
                colspan: i(l.colspan, 1),
                style: function() {
                    return l.style || "default"
                },
                onTap: function() {
                    return o({
                        type: "keypad/type-text",
                        text: a.typedText || a.keys[0]
                    })
                }
            }, c(function() {
                return "{" === a.keys[0] || "[" === a.keys[0]
            }, {
                true: function() {
                    return n.createElement("span", {
                        class: n.const("dcg-mq-math-mode"),
                        style: n.const("font-size: 120%")
                    }, n.const(a.keys[0]), n.const(" "), n.createElement("span", {
                        style: n.const("color: #999")
                    }, n.const(a.keys[1])))
                },
                false: function() {
                    return n.createElement("span", {
                        class: n.const("dcg-either-or-btn")
                    }, n.createElement(t.default, {
                        config: n.const({}),
                        latex: n.const(a.keys[0])
                    }), n.createElement("span", {
                        style: n.const("color: #999")
                    }, n.createElement(t.default, {
                        config: n.const({}),
                        latex: n.const(a.keys[1])
                    })))
                }
            }))
        }
    }
    function s(a) {
        return function(r, o, l, d) {
            return void 0 === l && (l = {}),
            n.createElement(e.default, {
                command: n.const(a.command || a.typedText || a.keys[1]),
                ariaLabel: function() {
                    return a.ariaLabelKey ? d(a.ariaLabelKey) : a.typedText || a.keys[0]
                },
                colspan: i(l.colspan, 1),
                style: i(l.style, "default"),
                onTap: function() {
                    return o({
                        type: "keypad/type-text",
                        text: a.typedText || a.keys[1]
                    })
                }
            }, c(function() {
                return "}" === a.keys[1] || "]" === a.keys[1]
            }, {
                true: function() {
                    return n.createElement("span", {
                        class: n.const("dcg-mq-math-mode"),
                        style: n.const("font-size: 120%")
                    }, n.createElement("span", {
                        style: n.const("color: #999")
                    }, n.const(a.keys[0])), n.const(" "), n.const(a.keys[1]))
                },
                false: function() {
                    return n.createElement("span", null, n.createElement("span", {
                        style: n.const("color: #999")
                    }, n.createElement(t.default, {
                        config: n.const({}),
                        latex: n.const(a.keys[0])
                    })), n.createElement(t.default, {
                        config: n.const({}),
                        latex: n.const(a.keys[1])
                    }))
                }
            }))
        }
    }
    function y(a) {
        return function(t, r, c, l) {
            return void 0 === c && (c = {}),
            n.createElement(e.default, {
                command: n.const(a.command),
                ariaLabel: function() {
                    return a.ariaLabelKey ? l(a.ariaLabelKey) : t
                },
                colspan: i(c.colspan, 1),
                style: function() {
                    return c.style || "default"
                },
                onTap: function() {
                    r({
                        type: "keypad/audio-trace",
                        command: a.command
                    })
                }
            }, n.createElement(o, {
                predicate: n.const(void 0 !== a.iconClass)
            }, function() {
                return n.createElement("span", {
                    class: function() {
                        return {
                            "dcg-button-icon": !0,
                            "dcg-icon-only": void 0 === a.contentKey
                        }
                    }
                }, n.createElement("i", {
                    class: n.const(a.iconClass)
                }))
            }), n.createElement(o, {
                predicate: n.const(void 0 !== a.contentKey)
            }, function() {
                return n.createElement("span", null, function() {
                    return l(a.contentKey) || t
                })
            }))
        }
    }
    function u(a) {
        return function(r, c, o, l) {
            return void 0 === o && (o = {}),
            n.createElement(e.default, {
                command: n.const(a.command || r),
                ariaLabel: function() {
                    return a.ariaLabelKey ? l(a.ariaLabelKey) : r
                },
                colspan: i(o.colspan, 1),
                style: function() {
                    return o.style || "default"
                },
                onTap: function() {
                    return c({
                        type: "keypad/type-text",
                        text: a.typedText || r
                    })
                }
            }, n.createElement(t.default, {
                config: n.const({}),
                latex: n.const(a.content || r)
            }))
        }
    }
    function p(a) {
        return function(t, r, c, o) {
            return void 0 === c && (c = {}),
            n.createElement(e.default, {
                command: n.const(a.command || t),
                ariaLabel: function() {
                    return a.ariaLabelKey ? o(a.ariaLabelKey) : t
                },
                colspan: i(c.colspan, 1),
                style: function() {
                    return c.style || "default"
                },
                onTap: function() {
                    return r({
                        type: "keypad/type-text",
                        text: a.typedText || t
                    })
                }
            }, n.createElement("span", {
                class: n.const("dcg-mq-math-mode")
            }, n.const(a.content || t)))
        }
    }
    function k(a) {
        return function(r, c, o, d) {
            return void 0 === o && (o = {}),
            n.createElement(e.default, {
                command: n.const(r),
                ariaLabel: function() {
                    return a.ariaLabelKey ? d(a.ariaLabelKey) : r
                },
                colspan: i(o.colspan, 1),
                style: function() {
                    return o.style || "default"
                },
                onTap: function() {
                    return c({
                        type: "keypad/type-text",
                        text: r + "("
                    })
                }
            }, n.createElement(l, {
                key: function() {
                    return r.match(/^[a-z]{2,}$/)
                }
            }, function(a) {
                return a ? n.createElement("span", {
                    class: n.const("dcg-mq-math-mode dcg-static-mathquill-view")
                }, n.createElement("span", {
                    class: n.const("dcg-mq-root-block")
                }, n.createElement("span", {
                    class: n.const("dcg-mq-operator-name")
                }, function() {
                    return r
                }))) : n.createElement(t.default, {
                    config: n.const({}),
                    latex: n.const(r)
                })
            }))
        }
    }
    function m(a) {
        return function(r, c, o, l) {
            return void 0 === o && (o = {}),
            n.createElement(e.default, {
                command: n.const(a.command),
                ariaLabel: function() {
                    return a.ariaLabelKey ? l(a.ariaLabelKey) : a.command
                },
                colspan: i(o.colspan, 1),
                style: function() {
                    return o.style || "default"
                },
                onTap: function() {
                    c({
                        type: "keypad/custom-command",
                        command: a.command
                    })
                }
            }, n.createElement(t.default, {
                config: n.const({}),
                latex: n.const(a.content)
            }))
        }
    }
    var f = {
        "{": p({
            ariaLabelKey: "shared-calculator-narration-keypad-key-left-bracket"
        }),
        "}": p({
            ariaLabelKey: "shared-calculator-narration-keypad-key-right-bracket"
        }),
        "(": u({
            ariaLabelKey: "shared-calculator-narration-keypad-key-left-paren"
        }),
        ")": u({
            ariaLabelKey: "shared-calculator-narration-keypad-key-right-paren"
        }),
        sqrt: u({
            content: "\\sqrt{}",
            ariaLabelKey: "shared-calculator-narration-keypad-key-sqrt"
        }),
        "/": u({
            ariaLabelKey: "shared-calculator-narration-keypad-key-divide"
        }),
        division: u({
            content: "÷",
            typedText: "/",
            command: "/",
            ariaLabelKey: "shared-calculator-narration-keypad-key-divide"
        }),
        obelus: u({
            content: "÷",
            typedText: "÷",
            ariaLabelKey: "shared-calculator-narration-keypad-key-divide"
        }),
        "*": u({
            ariaLabelKey: "shared-calculator-narration-keypad-key-times"
        }),
        multiplication: u({
            content: "×",
            typedText: "*",
            command: "*",
            ariaLabelKey: "shared-calculator-narration-keypad-key-times"
        }),
        "-": u({
            ariaLabelKey: "shared-calculator-narration-keypad-key-minus"
        }),
        "+": u({
            ariaLabelKey: "shared-calculator-narration-keypad-key-plus"
        }),
        ".": u({
            ariaLabelKey: "shared-calculator-narration-keypad-key-decimal"
        }),
        ans: function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                command: n.const(a),
                ariaLabel: function() {
                    return c("shared-calculator-narration-keypad-key-ans")
                },
                colspan: i(r.colspan, 1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/type-text",
                        text: a
                    })
                }
            }, n.const("ans"))
        },
        enter: function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                command: n.const(a),
                ariaLabel: function() {
                    return c("shared-calculator-narration-keypad-key-enter")
                },
                colspan: i(r.colspan, 1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/press-key",
                        key: "Enter"
                    })
                }
            }, n.createElement("i", {
                class: n.const("dcg-icon-arrow-enter")
            }))
        },
        shift: function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                command: n.const(a),
                ariaLabel: function() {
                    return c("shared-calculator-narration-keypad-key-shift")
                },
                colspan: i(r.colspan, 1),
                style: function() {
                    return r.style || "default"
                },
                active: i(r.active, !1),
                onTap: function() {
                    return t({
                        type: "keypad/shift"
                    })
                }
            }, n.createElement("i", {
                class: n.const("dcg-icon-shift")
            }))
        },
        left: function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                command: n.const(a),
                ariaLabel: function() {
                    return c("shared-calculator-narration-keypad-key-left-arrow")
                },
                colspan: i(r.colspan, 1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/press-key",
                        key: "Left"
                    })
                }
            }, n.createElement("i", {
                class: n.const("dcg-icon-arrow-left")
            }))
        },
        right: function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                command: n.const(a),
                ariaLabel: function() {
                    return c("shared-calculator-narration-keypad-key-right-arrow")
                },
                colspan: i(r.colspan, 1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/press-key",
                        key: "Right"
                    })
                }
            }, n.createElement("i", {
                class: n.const("dcg-icon-arrow-right")
            }))
        },
        123: function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                command: n.const(a),
                ariaLabel: function() {
                    return c("shared-calculator-narration-keypad-key-toggle-numbers")
                },
                colspan: i(r.colspan, 1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/123"
                    })
                }
            }, n.const("1 2 3"))
        },
        ABC: function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                command: n.const(a),
                ariaLabel: function() {
                    return c("shared-calculator-narration-keypad-key-toggle-letters")
                },
                colspan: i(r.colspan, 1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/abc"
                    })
                }
            }, n.const("A B C"))
        },
        Audio: function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                command: n.const(a),
                ariaLabel: function() {
                    return c("shared-calculator-narration-keypad-key-toggle-audio-trace")
                },
                colspan: i(r.colspan, 1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/audio-trace",
                        command: "on"
                    })
                }
            }, n.createElement("i", {
                class: n.const("dcg-icon-volume")
            }))
        },
        backspace: function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                command: n.const(a),
                ariaLabel: function() {
                    return c("shared-calculator-narration-keypad-key-backspace")
                },
                colspan: i(r.colspan, 1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/press-key",
                        key: "Backspace"
                    })
                }
            }, n.createElement("i", {
                class: n.const("dcg-icon-delete")
            }))
        },
        pi: u({
            content: "\\pi",
            ariaLabelKey: "shared-calculator-narration-keypad-key-pi"
        }),
        alpha: u({
            content: "\\alpha",
            ariaLabelKey: "shared-calculator-narration-keypad-key-alpha"
        }),
        beta: u({
            content: "\\beta",
            ariaLabelKey: "shared-calculator-narration-keypad-key-beta"
        }),
        theta: u({
            content: "\\theta",
            ariaLabelKey: "shared-calculator-narration-keypad-key-theta"
        }),
        tau: u({
            content: "\\tau",
            ariaLabelKey: "shared-calculator-narration-keypad-key-tau"
        }),
        "a^2": m({
            command: "a^2",
            content: "a^2",
            ariaLabelKey: "shared-calculator-narration-keypad-key-squared"
        }),
        "a^3": m({
            command: "a^3",
            content: "a^3",
            ariaLabelKey: "shared-calculator-narration-keypad-key-cubed"
        }),
        "x^3": m({
            command: "a^3",
            content: "x^3",
            ariaLabelKey: "shared-calculator-narration-keypad-key-cubed"
        }),
        "a^b": u({
            content: "a^b",
            typedText: "^",
            ariaLabelKey: "shared-calculator-narration-keypad-key-superscript"
        }),
        a_b: u({
            content: "a_b",
            typedText: "_",
            ariaLabelKey: "shared-calculator-narration-keypad-key-subscript"
        }),
        "a/b": m({
            content: "\\frac{a}{b}",
            command: "a/b",
            ariaLabelKey: "shared-calculator-narration-keypad-key-fraction"
        }),
        "x^2": m({
            command: "a^2",
            content: "x^2",
            ariaLabelKey: "shared-calculator-narration-keypad-key-squared"
        }),
        "x^y": u({
            content: "x^y",
            typedText: "^",
            ariaLabelKey: "shared-calculator-narration-keypad-key-superscript"
        }),
        "x/y": u({
            content: "\\frac{x}{y}",
            typedText: "/",
            ariaLabelKey: "shared-calculator-narration-keypad-key-fraction"
        }),
        nthroot: m({
            command: "nthroot",
            content: "\\sqrt[n]{}",
            ariaLabelKey: "shared-calculator-narration-keypad-key-nthroot"
        }),
        ythroot: m({
            command: "nthroot",
            content: "\\sqrt[y]{}",
            ariaLabelKey: "shared-calculator-narration-keypad-key-ythroot"
        }),
        sin: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-sin"
        }),
        cos: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-cos"
        }),
        tan: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-tan"
        }),
        sec: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-sec"
        }),
        csc: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-csc"
        }),
        cot: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-cot"
        }),
        sinh: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-sinh"
        }),
        cosh: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-cosh"
        }),
        tanh: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-tanh"
        }),
        sech: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-csch"
        }),
        csch: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-csch"
        }),
        coth: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-coth"
        }),
        arcsin: m({
            command: "arcsin",
            content: "sin^{-1}",
            ariaLabelKey: "shared-calculator-narration-keypad-key-arcsin"
        }),
        arccos: m({
            command: "arccos",
            content: "cos^{-1}",
            ariaLabelKey: "shared-calculator-narration-keypad-key-arccos"
        }),
        arctan: m({
            command: "arctan",
            content: "tan^{-1}",
            ariaLabelKey: "shared-calculator-narration-keypad-key-arctan"
        }),
        arccsc: m({
            command: "arccsc",
            content: "csc^{-1}",
            ariaLabelKey: "shared-calculator-narration-keypad-key-arccsc"
        }),
        arcsec: m({
            command: "arcsec",
            content: "sec^{-1}",
            ariaLabelKey: "shared-calculator-narration-keypad-key-arcsec"
        }),
        arccot: m({
            command: "arccot",
            content: "cot^{-1}",
            ariaLabelKey: "shared-calculator-narration-keypad-key-arccot"
        }),
        "|a|": u({
            typedText: "|",
            ariaLabelKey: "shared-calculator-narration-keypad-key-abs"
        }),
        "|x|": u({
            typedText: "|",
            ariaLabelKey: "shared-calculator-narration-keypad-key-abs"
        }),
        ln: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-ln"
        }),
        log: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-log"
        }),
        quantile: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-quantile"
        }),
        quartile: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-quartile"
        }),
        var: k({}),
        varp: k({}),
        nCr: k({}),
        loga: m({
            command: "loga",
            content: "log_a",
            ariaLabelKey: "shared-calculator-narration-keypad-key-loga"
        }),
        stdev: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-stdev"
        }),
        mad: k({}),
        nPr: k({}),
        total: k({}),
        length: k({}),
        for: k({}),
        min: k({}),
        max: k({}),
        cov: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-cov"
        }),
        covp: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-covp"
        }),
        corr: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-corr"
        }),
        spearman: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-spearman"
        }),
        stats: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-stats"
        }),
        polygon: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-polygon"
        }),
        distance: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-distance"
        }),
        midpoint: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-midpoint"
        }),
        mean: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-mean"
        }),
        stdevp: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-stdevp"
        }),
        mod: k({}),
        "e^x": u({
            typedText: "e^",
            ariaLabelKey: "shared-calculator-narration-keypad-key-exp"
        }),
        "10^n": u({
            content: "\\times10^{n}",
            typedText: "*10^",
            ariaLabelKey: "shared-calculator-narration-keypad-key-10-n"
        }),
        "a^{-1}": u({
            typedText: "^-1",
            ariaLabelKey: "shared-calculator-narration-keypad-key-reciprocal"
        }),
        sum: u({
            content: "\\sum",
            ariaLabelKey: "shared-calculator-narration-keypad-key-sum"
        }),
        prod: u({
            content: "\\prod",
            ariaLabelKey: "shared-calculator-narration-keypad-key-product"
        }),
        floor: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-floor"
        }),
        ceil: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-ceil"
        }),
        round: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-round"
        }),
        abs: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-abs"
        }),
        "!": u({
            ariaLabelKey: "shared-calculator-narration-keypad-key-factorial"
        }),
        "n!": u({
            typedText: "!",
            ariaLabelKey: "shared-calculator-narration-keypad-key-factorial"
        }),
        median: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-median"
        }),
        lcm: k({}),
        gcd: k({}),
        gcf: k({}),
        ddx: m({
            command: "ddx",
            content: "\\frac{d}{dx}"
        }),
        int: u({
            content: "\\int",
            ariaLabelKey: "shared-calculator-narration-keypad-key-int"
        }),
        "%": u({
            content: "\\%",
            ariaLabelKey: "shared-calculator-narration-keypad-key-percent-of"
        }),
        "->": u({
            content: "\\to",
            ariaLabelKey: "shared-calculator-narration-keypad-key-action-to"
        }),
        prime: u({
            typedText: "'",
            content: "f'",
            ariaLabelKey: "shared-calculator-narration-keypad-key-prime"
        }),
        exp: u({}),
        sign: k({}),
        normaldist: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-normaldist"
        }),
        poissondist: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-poissondist"
        }),
        binomialdist: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-binomialdist"
        }),
        uniformdist: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-uniformdist"
        }),
        erf: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-erf"
        }),
        histogram: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-histogram"
        }),
        boxplot: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-boxplot"
        }),
        dotplot: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-dotplot"
        }),
        tscore: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-tscore"
        }),
        ittest: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-ittest"
        }),
        ttest: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-ttest"
        }),
        tdist: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-tdist"
        }),
        pdf: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-pdf"
        }),
        cdf: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-pdf"
        }),
        random: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-random"
        }),
        inversecdf: k({
            ariaLabelKey: "shared-calculator-narration-keypad-key-inversecdf"
        }),
        sort: k({}),
        shuffle: k({}),
        unique: k({}),
        join: k({}),
        "A^-1": m({
            command: "A^-1",
            content: "A^{-1}",
            ariaLabelKey: "matrix-calculator-narration-keypad-key-inverse"
        }),
        "A^T": m({
            command: "A^T",
            content: "A^T",
            ariaLabelKey: "matrix-calculator-narration-keypad-key-transpose"
        }),
        "A^2": m({
            command: "A^2",
            content: "A^2",
            ariaLabelKey: "shared-calculator-narration-keypad-key-squared"
        }),
        "A^n": u({
            content: "A^n",
            typedText: "^",
            ariaLabelKey: "shared-calculator-narration-keypad-key-exp"
        }),
        det: k({
            ariaLabelKey: "matrix-calculator-narration-keypad-key-det"
        }),
        trace: k({
            ariaLabelKey: "matrix-calculator-narration-keypad-key-trace"
        }),
        rref: k({
            ariaLabelKey: "matrix-calculator-narration-keypad-key-rref"
        }),
        a: u({}),
        b: u({}),
        c: u({}),
        d: u({}),
        e: u({}),
        f: u({}),
        g: u({}),
        h: u({}),
        i: u({}),
        j: u({}),
        k: u({}),
        l: u({}),
        m: u({}),
        n: u({}),
        o: u({}),
        p: u({}),
        q: u({}),
        r: u({}),
        s: u({}),
        t: u({}),
        u: u({}),
        v: u({}),
        w: u({}),
        x: u({}),
        boldX: u({
            content: "x",
            typedText: "x"
        }),
        y: u({}),
        boldY: u({
            content: "y",
            typedText: "y"
        }),
        z: u({}),
        A: u({}),
        B: u({}),
        C: u({}),
        D: u({}),
        E: u({}),
        F: u({}),
        G: u({}),
        H: u({}),
        I: u({}),
        J: u({}),
        K: u({}),
        L: u({}),
        M: u({}),
        N: u({}),
        O: u({}),
        P: u({}),
        Q: u({}),
        R: u({}),
        S: u({}),
        T: u({}),
        U: u({}),
        V: u({}),
        W: u({}),
        X: u({}),
        Y: u({}),
        Z: u({}),
        0: u({}),
        1: u({}),
        2: u({}),
        3: u({}),
        4: u({}),
        5: u({}),
        6: u({}),
        7: u({}),
        8: u({}),
        9: u({}),
        ",": u({}),
        "=": u({}),
        "[": u({}),
        "]": u({}),
        "{}_left": d({
            keys: ["{", "}"]
        }),
        "{}_right": s({
            keys: ["{", "}"]
        }),
        "()_left": d({
            keys: ["(", ")"]
        }),
        "()_right": s({
            keys: ["(", ")"]
        }),
        "[]_left": d({
            keys: ["[", "]"]
        }),
        "[]_right": s({
            keys: ["[", "]"]
        }),
        ",'_left": d({
            keys: [",", "′"]
        }),
        ",'_right": s({
            keys: [",", "′"],
            typedText: "'"
        }),
        '"': u({}),
        "'": u({}),
        "~": u({}),
        ":": u({}),
        ">": u({}),
        "<": u({}),
        ">=": u({
            content: "\\ge"
        }),
        "<=": u({
            content: "\\le"
        }),
        "!%_left": d({
            keys: ["!", "{}^{%}"]
        }),
        "!%_right": s({
            keys: ["!", "{}^{%}"],
            typedText: "%"
        }),
        "~:_left": d({
            keys: ["~", "{}^{:}"]
        }),
        "~:_right": s({
            keys: ["~", "{}^{:}"],
            typedText: ":"
        }),
        "audio-trace-off": y({
            contentKey: "graphing-calculator-button-keypad-audio-trace-off",
            command: "off"
        }),
        "volume-down": function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                command: n.const(a),
                ariaLabel: function() {
                    return c("graphing-calculator-narration-keypad-key-volume-down")
                },
                disabled: i(r.disabled, !1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/audio-trace",
                        command: "volume-down"
                    })
                }
            }, n.createElement("span", {
                class: n.const("dcg-button-icon dcg-icon-only")
            }, n.createElement("i", {
                class: n.const("dcg-icon-volume-down")
            })))
        },
        "volume-up": function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                command: n.const(a),
                ariaLabel: function() {
                    return c("graphing-calculator-narration-keypad-key-volume-up")
                },
                disabled: i(r.disabled, !1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/audio-trace",
                        command: "volume-up"
                    })
                }
            }, n.createElement("span", {
                class: n.const("dcg-button-icon dcg-icon-only")
            }, n.createElement("i", {
                class: n.const("dcg-icon-volume-up")
            })))
        },
        "speed-down": function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                command: n.const(a),
                ariaLabel: function() {
                    return c("graphing-calculator-narration-keypad-key-speed-down")
                },
                disabled: i(r.disabled, !1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/audio-trace",
                        command: "speed-down"
                    })
                }
            }, n.createElement("span", {
                class: n.const("dcg-button-icon dcg-icon-only")
            }, n.createElement("i", {
                class: n.const("dcg-icon-hide")
            })))
        },
        "speed-up": function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                command: n.const(a),
                ariaLabel: function() {
                    return c("graphing-calculator-narration-keypad-key-speed-up")
                },
                disabled: i(r.disabled, !1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/audio-trace",
                        command: "speed-up"
                    })
                }
            }, n.createElement("span", {
                class: n.const("dcg-button-icon dcg-icon-only")
            }, n.createElement("i", {
                class: n.const("dcg-icon-show")
            })))
        },
        "previous-point": function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                ariaLabel: function() {
                    return c("graphing-calculator-narration-keypad-key-previous-point")
                },
                command: n.const(a),
                disabled: i(r.disabled, !1),
                colspan: i(r.colspan, 1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/audio-trace",
                        command: "previous-point"
                    })
                }
            }, n.createElement("span", {
                class: n.const("dcg-button-icon dcg-icon-only")
            }, n.createElement("i", {
                class: n.const("dcg-icon-thin-arrow-left")
            })))
        },
        "next-point": function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                ariaLabel: function() {
                    return c("graphing-calculator-narration-keypad-key-next-point")
                },
                command: n.const(a),
                disabled: i(r.disabled, !1),
                colspan: i(r.colspan, 1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/audio-trace",
                        command: "next-point"
                    })
                }
            }, n.createElement("span", {
                class: n.const("dcg-button-icon dcg-icon-only")
            }, n.createElement("i", {
                class: n.const("dcg-icon-thin-arrow-right")
            })))
        },
        "previous-poi": function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                ariaLabel: function() {
                    return c("graphing-calculator-narration-keypad-key-previous-poi")
                },
                command: n.const(a),
                disabled: i(r.disabled, !1),
                colspan: i(r.colspan, 1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/audio-trace",
                        command: "previous-poi"
                    })
                }
            }, n.createElement("span", {
                class: n.const("dcg-button-icon dcg-icon-only")
            }, n.createElement("i", {
                class: n.const("dcg-icon-hide")
            })))
        },
        "next-poi": function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                ariaLabel: function() {
                    return c("graphing-calculator-narration-keypad-key-next-poi")
                },
                command: n.const(a),
                disabled: i(r.disabled, !1),
                colspan: i(r.colspan, 1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/audio-trace",
                        command: "next-poi"
                    })
                }
            }, n.createElement("span", {
                class: n.const("dcg-button-icon dcg-icon-only")
            }, n.createElement("i", {
                class: n.const("dcg-icon-show")
            })))
        },
        "previous-curve": function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                ariaLabel: function() {
                    return c("graphing-calculator-narration-keypad-key-previous-curve")
                },
                command: n.const(a),
                disabled: i(r.disabled, !1),
                colspan: i(r.colspan, 1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/audio-trace",
                        command: "previous-curve"
                    })
                }
            }, n.createElement("span", {
                class: n.const("dcg-button-icon dcg-icon-only")
            }, n.createElement("i", {
                class: n.const("dcg-icon-caret-up")
            })))
        },
        "next-curve": function(a, t, r, c) {
            return void 0 === r && (r = {}),
            n.createElement(e.default, {
                ariaLabel: function() {
                    return c("graphing-calculator-narration-keypad-key-next-curve")
                },
                command: n.const(a),
                disabled: i(r.disabled, !1),
                style: function() {
                    return r.style || "default"
                },
                onTap: function() {
                    return t({
                        type: "keypad/audio-trace",
                        command: "next-curve"
                    })
                }
            }, n.createElement("span", {
                class: n.const("dcg-button-icon dcg-icon-only")
            }, n.createElement("i", {
                class: n.const("dcg-icon-caret-down")
            })))
        },
        "describe-point": y({
            contentKey: "graphing-calculator-button-keypad-describe-point",
            command: "describe-point"
        }),
        "describe-curve": y({
            contentKey: "graphing-calculator-button-keypad-describe-curve",
            command: "describe-curve"
        })
    };
    a.view = function(a, e, t) {
        void 0 === t && (t = {});
        var n = a.dispatch;
        return f[e](e, n, t, a.s)
    }
    ,
    a.spacer = function(a) {
        return void 0 === a && (a = 1),
        n.createElement("div", {
            style: n.const("flex-grow:" + a)
        })
    }
});
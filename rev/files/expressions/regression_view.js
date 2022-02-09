
define('expressions/regression_view', ["require", "exports", "tslib", "dcgview", "core/lib/label", "dcgview-helpers/static-mathquill-view", "../shared-components/tooltip", "loadcss!regression"], function(require, e, t, n, r, o, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getRoundedStat = e.getRoundedParam = void 0;
    var i = n.Components
      , a = i.If
      , c = i.For
      , l = i.IfElse
      , g = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.template = function() {
            var e = this;
            return this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id,
            n.createElement(a, {
                predicate: this.bindFn(this.hasRegression)
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-regression-container")
                }, n.createElement("div", {
                    class: n.const("dcg-handle-event"),
                    handleEvent: n.const("true")
                }, n.createElement(a, {
                    predicate: e.bindFn(e.getShouldSuggestLogMode)
                }, function() {
                    return n.createElement("div", {
                        class: n.const("dcg-log-mode-toggle")
                    }, l(function() {
                        return e.areLogModeRegressionsForced()
                    }, {
                        true: function() {
                            return n.createElement("div", {
                                class: n.const("dcg-action-log-mode-toggle dcg-no-hover-styling")
                            }, function() {
                                return e.controller.s("graphing-calculator-button-regression-log-mode")
                            })
                        },
                        false: function() {
                            return n.createElement("div", null, n.createElement("div", {
                                class: function() {
                                    return {
                                        "dcg-action-log-mode-toggle": !0,
                                        "dcg-toggled-on": e.getIsLogModeRegression()
                                    }
                                },
                                onTap: e.bindFn(e.onTapLogMode)
                            }, n.createElement("span", {
                                class: n.const("dcg-log-mode-checkbox"),
                                role: n.const("checkbox"),
                                "aria-checked": function() {
                                    return e.getIsLogModeRegression()
                                },
                                tabindex: n.const("0"),
                                "aria-label": function() {
                                    return e.controller.s("graphing-calculator-button-regression-log-mode")
                                }
                            }, n.createElement("i", {
                                class: n.const("dcg-icon-check")
                            })), function() {
                                return e.controller.s("graphing-calculator-button-regression-log-mode")
                            }), n.createElement(s.Tooltip, {
                                tooltip: function() {
                                    return e.controller.s("graphing-calculator-label-regression-log-mode-help-tooltip")
                                },
                                gravity: e.const("e")
                            }, n.createElement("a", {
                                "aria-label": function() {
                                    return e.controller.s("graphing-calculator-label-regression-log-mode-help-tooltip")
                                },
                                class: n.const("dcg-log-mode-toggle-help"),
                                target: n.const("_blank"),
                                href: n.const("https://help.desmos.com/hc/en-us/articles/204349605")
                            }, n.createElement("i", {
                                class: n.const("dcg-icon-question-sign")
                            }))))
                        }
                    }))
                }), n.createElement("div", {
                    class: n.const("dcg-statistics"),
                    role: n.const("group"),
                    "aria-label": function() {
                        return e.controller.s("graphing-calculator-heading-regression-statistics")
                    }
                }, n.createElement("div", {
                    class: n.const("dcg-expression-footer-title")
                }, function() {
                    return e.controller.s("graphing-calculator-heading-regression-statistics")
                }, n.createElement(a, {
                    predicate: function() {
                        return e.getRegression().statistics.hasOwnProperty("RMSE")
                    }
                }, function() {
                    return n.createElement(s.Tooltip, {
                        tooltip: function() {
                            return e.controller.s("graphing-calculator-label-regression-what-is-rmse-tooltip")
                        },
                        gravity: e.const("s")
                    }, n.createElement("a", {
                        class: n.const("dcg-expression-footer-title-help"),
                        target: n.const("_blank"),
                        href: n.const("https://help.desmos.com/hc/en-us/articles/202529129-What-is-RMSE-"),
                        "aria-label": function() {
                            return e.controller.s("graphing-calculator-label-regression-what-is-rmse-tooltip")
                        }
                    }, n.createElement("i", {
                        class: n.const("dcg-icon-question-sign")
                    })))
                }), n.createElement(a, {
                    predicate: function() {
                        return e.getRegression().statistics.Rsquared < 0
                    }
                }, function() {
                    return n.createElement(s.Tooltip, {
                        tooltip: function() {
                            return e.controller.s("graphing-calculator-label-regression-why-is-negative-tooltip")
                        },
                        gravity: e.const("s")
                    }, n.createElement("a", {
                        "aria-label": function() {
                            return e.controller.s("graphing-calculator-label-regression-why-is-negative-tooltip")
                        },
                        class: n.const("dcg-expression-footer-title-help"),
                        target: n.const("_blank"),
                        href: n.const("https://help.desmos.com/hc/en-us/articles/202529139-Why-am-I-seeing-a-negative-R-2-value-")
                    }, n.createElement("i", {
                        class: n.const("dcg-icon-question-sign")
                    })))
                })), n.createElement("div", {
                    class: n.const("dcg-statistics-values")
                }, n.createElement(a, {
                    predicate: function() {
                        return e.getRegression().statistics.hasOwnProperty("Rsquared")
                    }
                }, function() {
                    return n.createElement("div", null, n.createElement(o.default, {
                        latex: function() {
                            return "R^2=" + d(e.getRegression(), "Rsquared")
                        },
                        config: e.const({})
                    }, n.createElement("span", {
                        tabindex: n.const("0")
                    })))
                }), n.createElement(a, {
                    predicate: function() {
                        return e.getRegression().statistics.hasOwnProperty("rsquared")
                    }
                }, function() {
                    return n.createElement("div", null, n.createElement(o.default, {
                        latex: function() {
                            return "r^2=" + d(e.getRegression(), "rsquared")
                        },
                        config: e.const({})
                    }, n.createElement("span", {
                        tabindex: n.const("0")
                    })))
                }), n.createElement(a, {
                    predicate: function() {
                        return e.getRegression().statistics.hasOwnProperty("r")
                    }
                }, function() {
                    return n.createElement("div", null, n.createElement(o.default, {
                        latex: function() {
                            return "r=" + d(e.getRegression(), "r")
                        },
                        config: e.const({})
                    }, n.createElement("span", {
                        class: n.const("dcg-r-value"),
                        tabindex: n.const("0")
                    })))
                }), n.createElement(a, {
                    predicate: function() {
                        return e.getRegression().statistics.hasOwnProperty("RMSE")
                    }
                }, function() {
                    return n.createElement("div", null, n.createElement(o.default, {
                        latex: function() {
                            return "\\operatorname{RMSE}=" + d(e.getRegression(), "RMSE")
                        },
                        config: e.const({})
                    }, n.createElement("span", {
                        tabindex: n.const("0")
                    })))
                }))), n.createElement("div", {
                    role: n.const("group"),
                    "aria-label": function() {
                        return e.controller.s("graphing-calculator-heading-regression-residuals")
                    },
                    class: n.const("dcg-residuals")
                }, n.createElement("div", {
                    class: n.const("dcg-expression-footer-title")
                }, function() {
                    return e.controller.s("graphing-calculator-heading-regression-residuals")
                }), n.createElement(o.default, {
                    latex: e.bindFn(e.getResidualVariable),
                    config: e.const({})
                }, n.createElement("span", {
                    class: n.const("dcg-residuals-variable"),
                    tabindex: n.const("0")
                })), n.createElement("div", {
                    class: function() {
                        return {
                            "dcg-residual-suggestion": !0,
                            "dcg-action-plot-residual": !0,
                            "dcg-btn": !0,
                            "dcg-btn-light-gray": !0,
                            "dcg-visible": e.getResidualSuggestionVisible()
                        }
                    },
                    "aria-hidden": function() {
                        return !e.getResidualSuggestionVisible()
                    },
                    role: n.const("button"),
                    tabindex: function() {
                        return e.getResidualSuggestionVisible() ? "0" : void 0
                    },
                    onTap: e.bindFn(e.onTapResidualsSuggestion)
                }, function() {
                    return e.controller.s("graphing-calculator-button-regression-plot-residuals")
                })), n.createElement(a, {
                    predicate: function() {
                        return Object.keys(e.getRegression().parameters).length > 0
                    }
                }, function() {
                    return n.createElement("div", {
                        class: n.const("dcg-parameters-container")
                    }, n.createElement("div", {
                        class: n.const("dcg-expression-footer-title")
                    }, function() {
                        return e.controller.s("graphing-calculator-heading-regression-parameters")
                    }, n.createElement(a, {
                        predicate: function() {
                            return e.isNonLinearRegression()
                        }
                    }, function() {
                        return n.createElement(s.Tooltip, {
                            tooltip: function() {
                                return e.controller.s("graphing-calculator-label-regression-parameters-not-exact")
                            },
                            gravity: e.const("s")
                        }, n.createElement("a", {
                            class: n.const("dcg-expression-footer-title-help"),
                            target: n.const("_blank"),
                            href: n.const("https://help.desmos.com/hc/en-us/articles/360042428612"),
                            "aria-label": function() {
                                return e.controller.s("graphing-calculator-label-regression-parameters-not-exact")
                            }
                        }, n.createElement("i", {
                            class: n.const("dcg-icon-question-sign")
                        })))
                    })), n.createElement(c, {
                        each: function() {
                            return Object.keys(e.getRegression().parameters)
                        }
                    }, n.createElement("div", {
                        role: n.const("group"),
                        "aria-label": function() {
                            return e.controller.s("graphing-calculator-heading-regression-parameters")
                        },
                        class: n.const("dcg-parameters")
                    }, function(t) {
                        return n.createElement(o.default, {
                            latex: function() {
                                return t + "=" + u(e.getRegression(), t)
                            },
                            config: e.const({})
                        }, n.createElement("span", {
                            class: n.const("dcg-parameter"),
                            tabindex: n.const("0")
                        }))
                    })))
                }), n.createElement("div", {
                    class: n.const("dcg-clear")
                }), n.createElement(a, {
                    predicate: function() {
                        return e.hasParameterWarning()
                    }
                }, function() {
                    return n.createElement("div", {
                        class: n.const("dcg-parameter-warning")
                    }, n.createElement("i", {
                        class: n.const("dcg-icon-error")
                    }), n.const(" "), function() {
                        return e.controller.s("graphing-calculator-text-regression-potentially-inaccurate-parameters")
                    }, n.const(" "), n.createElement("a", {
                        href: n.const("https://help.desmos.com/hc/en-us/articles/360042942771"),
                        target: n.const("_blank")
                    }, function() {
                        return e.controller.s("graphing-calculator-link-learn-more")
                    }))
                })))
            })
        }
        ,
        r.prototype.onTapResidualsSuggestion = function() {
            this.controller.dispatch({
                type: "plot-residuals",
                id: this.id
            })
        }
        ,
        r.prototype.onTapLogMode = function() {
            this.controller.dispatch({
                type: "toggle-logmode",
                id: this.id
            })
        }
        ,
        r.prototype.getRegression = function() {
            return this.model.formula.regression
        }
        ,
        r.prototype.hasRegression = function() {
            return !!this.model.formula.regression
        }
        ,
        r.prototype.isNonLinearRegression = function() {
            return !this.getRegression().isLinear
        }
        ,
        r.prototype.getResidualVariable = function() {
            return this.getRegression().residualVariable || ""
        }
        ,
        r.prototype.getResidualSuggestionVisible = function() {
            return void 0 !== this.getRegression().residualSuggestionId
        }
        ,
        r.prototype.areLogModeRegressionsForced = function() {
            return this.controller.areLogModeRegressionsForced()
        }
        ,
        r.prototype.getShouldSuggestLogMode = function() {
            return !!this.getRegression().shouldSuggestLogMode
        }
        ,
        r.prototype.hasParameterWarning = function() {
            return !!this.getRegression().parameterWarning
        }
        ,
        r.prototype.getIsLogModeRegression = function() {
            return !!this.model.isLogModeRegression
        }
        ,
        r
    }(n.Class);
    function u(e, t) {
        return r.truncatedLatexLabel(e.parameters[t], {
            digits: 6,
            smallCutoff: 1e-6,
            bigCutoff: 1e9
        })
    }
    function d(e, t) {
        return r.truncatedLatexLabel(e.statistics[t], {
            zeroCutoff: 1e-15,
            digits: 4,
            smallCutoff: 1e-6,
            bigCutoff: 1e9
        })
    }
    e.default = g,
    e.getRoundedParam = u,
    e.getRoundedStat = d
});
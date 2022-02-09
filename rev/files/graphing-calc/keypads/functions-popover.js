define('graphing-calc/keypads/functions-popover', ["require", "exports", "tslib", "dcgview", "./dcgview-graphing", "keypad/keys", "loadcss!./functions-popover"], function(require, t, e, i, n, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = i.Components
      , s = o.If
      , c = o.For
      , a = function(t) {
        function n() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(n, t),
        n.prototype.template = function() {
            var t = this;
            return i.createElement("div", {
                class: i.const("dcg-functions-popover dcg-popover dcg-top")
            }, i.createElement("div", {
                class: i.const("dcg-popover-interior")
            }, i.createElement("div", {
                class: i.const("dcg-interior-buttons")
            }, i.createElement(c, {
                each: this.bindFn(this.getKeypadKeys),
                key: function(t) {
                    return t.id
                }
            }, i.createElement("div", {
                class: i.const("dcg-basic-keypad dcg-do-not-blur")
            }, function(e) {
                return i.createElement("div", {
                    class: i.const("dcg-keypad-keys-section")
                }, i.createElement(s, {
                    predicate: function() {
                        return void 0 !== e.title
                    }
                }, function() {
                    return i.createElement("div", {
                        class: i.const("dcg-section-heading")
                    }, function() {
                        return e.title
                    }, i.createElement(s, {
                        predicate: function() {
                            return !!e.helpLink
                        }
                    }, function() {
                        return i.createElement("a", {
                            href: function() {
                                return e.helpLink.url
                            },
                            target: i.const("_blank"),
                            "aria-label": function() {
                                return e.helpLink.tooltip
                            }
                        }, i.createElement("i", {
                            class: i.const("dcg-icon-question-sign")
                        }))
                    }))
                }), i.createElement(s, {
                    predicate: function() {
                        return void 0 === e.title
                    }
                }, function() {
                    return i.createElement("div", {
                        class: i.const("dcg-popover-section-separator")
                    })
                }), i.createElement(c, {
                    each: function() {
                        return e.keys
                    }
                }, i.createElement("div", {
                    class: i.const("dcg-keypad-keys-buttons")
                }, function(e) {
                    return t.b(e)
                })))
            })))), i.createElement("div", {
                class: i.const("dcg-arrow")
            }))
        }
        ,
        n.prototype.getInverseTrigSection = function() {
            var t = this.controller.areFunctionsRestricted() ? ["arcsin", "arccos", "arctan"] : ["arcsin", "arccos", "arctan", "arccsc", "arcsec", "arccot"];
            return {
                id: "inversetrig",
                title: this.controller.s("graphing-calculator-heading-inverse-trig"),
                keys: t
            }
        }
        ,
        n.prototype.getGeometryMethods = function() {
            var t = !this.controller.areFunctionsRestricted() || this.controller.areGeometryFunctionsForceEnabled() ? ["polygon", "distance", "midpoint"] : ["polygon"];
            return {
                id: "geometry",
                title: this.controller.s("graphing-calculator-heading-geometry"),
                keys: t
            }
        }
        ,
        n.prototype.getTrigSection = function() {
            var t = this.controller.areFunctionsRestricted() ? ["sin", "cos", "tan"] : ["sin", "cos", "tan", "csc", "sec", "cot"];
            return {
                id: "trig",
                title: this.controller.s("graphing-calculator-heading-trig"),
                keys: t
            }
        }
        ,
        n.prototype.getHyperbolicTrigSection = function() {
            var t = this.controller.areFunctionsRestricted() ? ["sinh", "cosh", "tanh"] : ["sinh", "cosh", "tanh", "csch", "sech", "coth"];
            return {
                id: "hyperbtrig",
                title: this.controller.s("graphing-calculator-heading-hyperbolic-trig"),
                keys: t
            }
        }
        ,
        n.prototype.getListFunctions = function() {
            return {
                id: "lists",
                title: this.controller.s("graphing-calculator-heading-lists"),
                keys: ["join", "sort", "shuffle", "unique", "for"]
            }
        }
        ,
        n.prototype.getStatTests = function() {
            return {
                id: "stat-tests",
                title: this.controller.s("graphing-calculator-heading-stat-tests"),
                keys: ["ttest", "tscore", "ittest"]
            }
        }
        ,
        n.prototype.getStatsSection = function() {
            var t = ["mean", "median", "min", "max", "quartile", "quantile", "stdev", "stdevp", "var"];
            return this.controller.areFunctionsRestricted() || (t = t.concat(["mad", "cov", "covp"])),
            t = t.concat(["corr", "spearman", "stats", "length", "total"]),
            {
                id: "stats",
                title: this.controller.s("graphing-calculator-heading-stats"),
                keys: t
            }
        }
        ,
        n.prototype.getMiscSection = function() {
            return {
                title: this.controller.s("graphing-calculator-button-functions-menu-number-theory"),
                id: "misc",
                keys: ["lcm", "gcd", "mod", "ceil", "floor", "round", "sign", "nthroot", "nPr", "nCr"]
            }
        }
        ,
        n.prototype.getVisualizationsSection = function() {
            return {
                title: this.controller.s("graphing-calculator-heading-dist-tab-visualizations"),
                id: "visualizations",
                keys: ["histogram", "dotplot", "boxplot"],
                helpLink: {
                    url: "https://help.desmos.com/hc/en-us/articles/360022405991-Data-Visualizations",
                    tooltip: this.controller.s("graphing-calculator-narration-dist-tab-visualizations")
                }
            }
        }
        ,
        n.prototype.getCalculusSection = function() {
            return {
                title: this.controller.s("graphing-calculator-heading-calculus"),
                id: "calculus",
                keys: ["exp", "ln", "log", "loga", "ddx", "prime", "int", "sum", "prod"]
            }
        }
        ,
        n.prototype.getDistributionsSection = function() {
            return {
                title: this.controller.s("graphing-calculator-heading-dist-tab-distributions"),
                id: "distributions",
                keys: ["normaldist", "tdist", "poissondist", "binomialdist", "uniformdist", "pdf", "cdf", "inversecdf", "random"],
                helpLink: {
                    url: "https://help.desmos.com/hc/en-us/articles/360022401451-Distributions",
                    tooltip: this.controller.s("graphing-calculator-narration-dist-tab-distributions")
                }
            }
        }
        ,
        n.prototype.getKeypadKeys = function() {
            var t = [this.getTrigSection(), this.getInverseTrigSection(), this.getStatsSection(), this.getListFunctions(), this.getVisualizationsSection()];
            return this.controller.areDistributionsEnabled() && (t.push(this.getDistributionsSection()),
            t.push(this.getStatTests())),
            t.push(this.getCalculusSection()),
            t.push(this.getHyperbolicTrigSection()),
            t.push(this.getGeometryMethods()),
            t.push(this.getMiscSection()),
            t
        }
        ,
        n.prototype.b = function(t) {
            return r.view(this, t, {
                style: "popover"
            })
        }
        ,
        n
    }(n.default);
    t.default = a
});

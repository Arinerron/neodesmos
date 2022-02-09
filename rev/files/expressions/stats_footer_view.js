
define('expressions/stats_footer_view', ["require", "exports", "tslib", "dcgview", "graphing-calc/models/expression", "dcgview-helpers/static-mathquill-view", "core/lib/number-to-latex", "loadcss!./stats_footer_view"], function(require, e, t, n, a, l, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var c = function(e) {
        function c() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(c, e),
        c.prototype.template = function() {
            var e = this;
            return this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id,
            n.createElement("div", {
                class: n.const("dcg-stats-footer-container dcg-do-blur"),
                handleEvent: n.const("true")
            }, n.createElement("table", null, n.createElement("tr", null, n.createElement("td", null, n.createElement("div", {
                class: n.const("dcg-value"),
                role: n.const("textbox"),
                "aria-readonly": n.const("true"),
                tabindex: n.const("0"),
                "aria-label": function() {
                    return "Min: " + e.getMin()
                }
            }, n.createElement("span", {
                class: n.const("dcg-row-header")
            }, n.const("Min")), n.createElement("span", {
                class: n.const("dcg-evaluation")
            }, n.createElement(l.default, {
                config: this.const({}),
                latex: this.bindFn(this.getMin)
            }))))), n.createElement("tr", null, n.createElement("td", null, n.createElement("div", {
                class: n.const("dcg-value"),
                role: n.const("textbox"),
                "aria-readonly": n.const("true"),
                tabindex: n.const("0"),
                "aria-label": function() {
                    return "Q1: " + e.getQ1()
                }
            }, n.createElement("span", {
                class: n.const("dcg-row-header")
            }, n.const("Q1")), n.createElement("span", {
                class: n.const("dcg-evaluation")
            }, n.createElement(l.default, {
                config: this.const({}),
                latex: this.bindFn(this.getQ1)
            }))))), n.createElement("tr", null, n.createElement("td", null, n.createElement("div", {
                class: n.const("dcg-value"),
                role: n.const("textbox"),
                "aria-readonly": n.const("true"),
                tabindex: n.const("0"),
                "aria-label": function() {
                    return "Median: " + e.getMedian()
                }
            }, n.createElement("span", {
                class: n.const("dcg-row-header")
            }, n.const("Median")), n.createElement("span", {
                class: n.const("dcg-evaluation")
            }, n.createElement(l.default, {
                config: this.const({}),
                latex: this.bindFn(this.getMedian)
            }))))), n.createElement("tr", null, n.createElement("td", null, n.createElement("div", {
                class: n.const("dcg-value"),
                role: n.const("textbox"),
                "aria-readonly": n.const("true"),
                tabindex: n.const("0"),
                "aria-label": function() {
                    return "Q3: " + e.getQ3()
                }
            }, n.createElement("span", {
                class: n.const("dcg-row-header")
            }, n.const("Q3")), n.createElement("span", {
                class: n.const("dcg-evaluation")
            }, n.createElement(l.default, {
                config: this.const({}),
                latex: this.bindFn(this.getQ3)
            }))))), n.createElement("tr", null, n.createElement("td", null, n.createElement("div", {
                class: n.const("dcg-value"),
                role: n.const("textbox"),
                "aria-readonly": n.const("true"),
                tabindex: n.const("0"),
                "aria-label": function() {
                    return "Max: " + e.getMax()
                }
            }, n.createElement("span", {
                class: n.const("dcg-row-header")
            }, n.const("Max")), n.createElement("span", {
                class: n.const("dcg-evaluation")
            }, n.createElement(l.default, {
                config: this.const({}),
                latex: this.bindFn(this.getMax)
            })))))))
        }
        ,
        c.prototype.getMin = function() {
            var e = a.getStatsResults(this.model);
            return e ? s.numberToDecimalString(e.min) : ""
        }
        ,
        c.prototype.getQ1 = function() {
            var e = a.getStatsResults(this.model);
            return e ? s.numberToDecimalString(e.q1) : ""
        }
        ,
        c.prototype.getMedian = function() {
            var e = a.getStatsResults(this.model);
            return e ? s.numberToDecimalString(e.median) : ""
        }
        ,
        c.prototype.getQ3 = function() {
            var e = a.getStatsResults(this.model);
            return e ? s.numberToDecimalString(e.q3) : ""
        }
        ,
        c.prototype.getMax = function() {
            var e = a.getStatsResults(this.model);
            return e ? s.numberToDecimalString(e.max) : ""
        }
        ,
        c
    }(n.Class);
    e.default = c
});

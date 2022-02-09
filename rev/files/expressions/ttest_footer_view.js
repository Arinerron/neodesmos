define('expressions/ttest_footer_view', ["require", "exports", "tslib", "dcgview", "graphing-calc/models/expression", "core/lib/number-to-latex", "dcgview-helpers/static-mathquill-view", "loadcss!./ttest_footer_view"], function(require, e, t, n, a, s, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id
        }
        ,
        r.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("dcg-ttest-footer-container dcg-do-blur"),
                handleEvent: n.const("true")
            }, n.createElement("table", null, n.createElement("tr", null, n.createElement("td", null, n.createElement("div", {
                class: n.const("dcg-value"),
                role: n.const("textbox"),
                "aria-readonly": n.const("true"),
                tabindex: n.const("0"),
                "aria-label": function() {
                    return "Less than: " + e.getLessThan()
                }
            }, n.createElement("span", {
                class: n.const("dcg-operator")
            }, n.createElement(l.default, {
                config: this.const({}),
                latex: this.const("<")
            })), n.createElement("span", {
                class: n.const("dcg-evaluation")
            }, n.createElement(l.default, {
                config: this.const({}),
                latex: function() {
                    return e.getLessThan()
                }
            }))))), n.createElement("tr", null, n.createElement("td", null, n.createElement("div", {
                class: n.const("dcg-value"),
                role: n.const("textbox"),
                "aria-readonly": n.const("true"),
                tabindex: n.const("0"),
                "aria-label": function() {
                    return "Greater than: " + e.getGreaterThan()
                }
            }, n.createElement("span", {
                class: n.const("dcg-operator")
            }, n.createElement(l.default, {
                config: this.const({}),
                latex: this.const(">")
            })), n.createElement("span", {
                class: n.const("dcg-evaluation")
            }, n.createElement(l.default, {
                config: this.const({}),
                latex: function() {
                    return e.getGreaterThan()
                }
            }))))), n.createElement("tr", null, n.createElement("td", null, n.createElement("div", {
                class: n.const("dcg-value"),
                role: n.const("textbox"),
                "aria-readonly": n.const("true"),
                tabindex: n.const("0"),
                "aria-label": function() {
                    return "Not equal: " + e.getNotEqual()
                }
            }, n.createElement("span", {
                class: n.const("dcg-operator")
            }, n.createElement(l.default, {
                config: this.const({}),
                latex: this.const("≠")
            })), n.createElement("span", {
                class: n.const("dcg-evaluation")
            }, n.createElement(l.default, {
                config: this.const({}),
                latex: function() {
                    return e.getNotEqual()
                }
            })))))))
        }
        ,
        r.prototype.getLessThan = function() {
            var e = a.getTTestResults(this.model);
            return e ? s.numberToStatsConfidenceLatex(e.lessThan, 5) : ""
        }
        ,
        r.prototype.getGreaterThan = function() {
            var e = a.getTTestResults(this.model);
            return e ? s.numberToStatsConfidenceLatex(e.greaterThan, 5) : ""
        }
        ,
        r.prototype.getNotEqual = function() {
            var e = a.getTTestResults(this.model);
            return e ? s.numberToStatsConfidenceLatex(e.notEqual, 5) : ""
        }
        ,
        r
    }(n.Class);
    e.default = r
});

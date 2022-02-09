
define('expressions/distribution_parameters_view', ["require", "exports", "tslib", "dcgview", "graphing-calc/models/expression", "expressions/cdf-footer-view", "./parameters_suggestions_view", "loadcss!./distribution_parameters_view"], function(require, e, t, r, o, n, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = r.Components.If
      , l = function(e) {
        function l() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(l, e),
        l.prototype.template = function() {
            var e = this;
            return this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id,
            r.createElement("div", {
                class: r.const("dcg-distribution-parameters-container dcg-mq-underline-container dcg-do-blur"),
                tapboundary: r.const("true"),
                handleEvent: r.const("true")
            }, r.createElement(s.ParametersSuggestionsView, {
                model: this.props.model,
                controller: this.props.controller
            }), r.createElement(i, {
                predicate: function() {
                    return o.shouldShowCDFCheckbox(e.model)
                }
            }, function() {
                return r.createElement(n.default, {
                    model: e.props.model,
                    controller: e.props.controller
                })
            }))
        }
        ,
        l
    }(r.Class);
    e.default = l
});

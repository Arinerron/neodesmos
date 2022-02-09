define('expressions/suggested-zoom-view', ["require", "exports", "tslib", "dcgview", "../shared-components/tooltip", "loadcss!./suggested-zoom-view"], function(require, t, o, e, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.SuggestedZoomView = void 0;
    var i = e.Components.If
      , r = function(t) {
        function r() {
            return null !== t && t.apply(this, arguments) || this
        }
        return o.__extends(r, t),
        r.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model()
        }
        ,
        r.prototype.template = function() {
            var t = this;
            return e.createElement(i, {
                predicate: function() {
                    return t.controller.shouldExpressionZoomFit(t.model)
                }
            }, function() {
                return e.createElement("div", {
                    class: e.const("dcg-suggested-zoom-view dcg-do-blur"),
                    handleEvent: e.const(!0)
                }, e.createElement(n.Tooltip, {
                    tooltip: t.bindFn(t.getZoomText),
                    gravity: function() {
                        return "e"
                    }
                }, e.createElement("i", {
                    onTap: t.bindFn(t.onZoom),
                    role: e.const("button"),
                    "aria-label": t.bindFn(t.getZoomText),
                    class: e.const("dcg-icon-zoom-fit")
                })))
            })
        }
        ,
        r.prototype.getZoomText = function() {
            return this.controller.s("graphing-calculator-text-zoom-fit")
        }
        ,
        r.prototype.onZoom = function() {
            this.controller.dispatch({
                type: "expression-zoom-fit",
                id: this.model.id
            })
        }
        ,
        r
    }(e.Class);
    t.SuggestedZoomView = r
});

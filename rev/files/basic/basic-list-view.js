define('basic/basic-list-view', ["require", "exports", "tslib", "scroll_helpers", "dcgview", "./dcgview-basic", "./expression-view", "jquery", "lib/conditional_blur", "loadcss!./basic-list-view"], function(require, e, t, n, i, r, o, s, c) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var d = i.Components
      , l = d.For
      , a = d.If
      , u = function(e) {
        function r() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.didShowAnswerHint = !1,
            t.didHideAnswerHint = !1,
            t
        }
        return t.__extends(r, e),
        r.prototype.template = function() {
            var e = this;
            return i.createElement("div", {
                class: i.const("dcg-basic-list-container"),
                role: i.const("complementary"),
                "aria-label": function() {
                    return e.controller.s("basic-calculator-narration-expression-list")
                },
                didMount: this.bindFn(this.didMountContainer)
            }, i.createElement("div", {
                class: i.const("dcg-basic-list-placeholder"),
                didMount: this.bindFn(this.didMountPlaceholder)
            }, i.createElement(a, {
                predicate: this.bindFn(this.showAnswerHint)
            }, function() {
                return i.createElement("div", {
                    class: i.const("dcg-answer-hint")
                }, function() {
                    return e.controller.s("basic-calculator-label-answer-hint")
                })
            })), i.createElement(l, {
                each: function() {
                    return e.model.getExpressionOrder()
                }
            }, i.createElement("div", {
                class: function() {
                    return {
                        "dcg-basic-list": !0,
                        "dcg-projector-mode": e.controller.isProjectorMode()
                    }
                }
            }, function(t) {
                return i.createElement(o.default, {
                    controller: e.props.controller,
                    id: e.const(t)
                })
            })))
        }
        ,
        r.prototype.didMountPlaceholder = function(e) {
            s(e).on("dcg-tap", c.default)
        }
        ,
        r.prototype.showAnswerHint = function() {
            if (this.didHideAnswerHint)
                return !1;
            var e = this.model.getExpressionOrder()[0];
            return !(!this.model.shouldShowEvaluationForExpression(e) && !this.didShowAnswerHint) && (this.didShowAnswerHint = !0,
            !(this.model.getNumberOfExpressions() > 1 || "" === this.model.getExpressionLatex(e)) || (this.didHideAnswerHint = !0,
            !1))
        }
        ,
        r.prototype.didUpdate = function() {
            if (this.$container) {
                var e = this.$container.find(".dcg-focused");
                e.length > 0 && n.scrollVisible(e, this.$container, 50)
            }
        }
        ,
        r.prototype.didMountContainer = function(e) {
            this.$container = s(e)
        }
        ,
        r
    }(r.DCGViewBasic);
    e.default = u
});

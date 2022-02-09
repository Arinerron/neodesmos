define('dcgview-helpers/static-mathquill-view', ["require", "exports", "tslib", "dcgview", "vendor/mathquill", "jquery", "lib/conditional_blur", "loadcss!./static-mathquill-view"], function(require, t, i, a, e, l, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function(t) {
        function o() {
            return null !== t && t.apply(this, arguments) || this
        }
        return i.__extends(o, t),
        o.prototype.template = function() {
            var t = this;
            return 1 === this.children.length ? this.children[0] : a.createElement("div", {
                didMount: function(i) {
                    return t.didMountMathquill(i)
                }
            })
        }
        ,
        o.prototype.didMount = function() {
            1 === this.children.length && this.didMountMathquill(this.findRootNode())
        }
        ,
        o.prototype.didMountMathquill = function(t) {
            this.staticMath = e.MQ.StaticMath(t, this.props.config()),
            l(t).off(".mathquill").addClass("dcg-static-mathquill-view").on("dcg-tapstart", function() {
                s.default()
            }),
            this.updateMathquill()
        }
        ,
        o.prototype.didUpdate = function() {
            this.updateMathquill()
        }
        ,
        o.prototype.updateMathquill = function() {
            this.updateMathquillAria(),
            this.updateMathquillLatex()
        }
        ,
        o.prototype.updateMathquillLatex = function() {
            if (this.staticMath) {
                var t = this.props.latex();
                this.lastLatex !== t && (this.staticMath.latex(t),
                this.lastLatex = t,
                this.props.onReflow && this.props.onReflow())
            }
        }
        ,
        o.prototype.updateMathquillAria = function() {
            if (this.staticMath && this.props.getAriaLabel) {
                var t = this.props.getAriaLabel();
                t !== this.staticMath.getAriaLabel() && this.staticMath.setAriaLabel(t)
            }
        }
        ,
        o
    }(a.Class);
    t.default = o
});
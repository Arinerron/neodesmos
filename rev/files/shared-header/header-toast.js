
define('shared-header/header-toast', ["require", "exports", "tslib", "dcgview", "main/toast-view"], function(require, t, e, r, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.HeaderToast = void 0;
    var o = function(t) {
        function o() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(o, t),
        o.prototype.template = function() {
            var t = this;
            return r.createElement(s.ToastView, {
                message: this.bindFn(this.getMessage),
                s: this.bindFn(this.s),
                onClose: function() {
                    return t.graphsController().dismissSaveError()
                },
                showUndo: this.const(!1),
                showLearnMore: this.const(!1),
                toastStyle: this.bindFn(this.getStyle),
                noAria: this.const(!1),
                showClose: this.bindFn(this.showClose)
            })
        }
        ,
        o.prototype.s = function(t, e) {
            return this.props.controller().s(t, e)
        }
        ,
        o.prototype.graphsController = function() {
            return this.props.controller().graphsController
        }
        ,
        o.prototype.getStyle = function() {
            return this.graphsController().didSaveFail() ? "error" : void 0
        }
        ,
        o.prototype.showClose = function() {
            return this.graphsController().didSaveFail()
        }
        ,
        o.prototype.getMessage = function() {
            return this.graphsController().isSaving() ? this.props.controller().s("shared-calculator-label-saving") : this.graphsController().didSaveSucceed() ? this.props.controller().s("shared-calculator-label-saved") : this.graphsController().didSaveFail() ? this.props.controller().raw(this.graphsController().getSaveFailureMessage()) : ""
        }
        ,
        o
    }(r.Class);
    t.HeaderToast = o
});
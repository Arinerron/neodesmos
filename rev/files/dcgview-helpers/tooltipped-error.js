
define('dcgview-helpers/tooltipped-error', ["require", "exports", "tslib", "dcgview", "../shared-components/tooltip", "loadcss!./tooltipped-error"], function(require, t, e, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TooltippedError = void 0;
    var i = function(t) {
        function i() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(i, t),
        i.prototype.template = function() {
            var t = this;
            return r.createElement(o.Tooltip, {
                tooltip: this.props.error,
                sticky: this.const(!0),
                gravity: this.props.gravity
            }, r.createElement("div", {
                class: function() {
                    return {
                        "dcg-tooltipped-error": !0,
                        "dcg-white": t.props.isWhite && t.props.isWhite(),
                        "dcg-small": t.props.size && "small" === t.props.size()
                    }
                }
            }, r.createElement("i", {
                class: r.const("dcg-icon-error")
            })))
        }
        ,
        i
    }(r.Class);
    t.TooltippedError = i
});

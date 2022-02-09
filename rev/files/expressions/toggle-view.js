
define('expressions/toggle-view', ["require", "exports", "tslib", "dcgview", "loadcss!./toggle-view"], function(require, e, t, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.ToggleView = void 0;
    var o = function(e) {
        function o() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(o, e),
        o.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: function() {
                    return {
                        "dcg-toggle-view": !0,
                        "dcg-toggled": e.props.toggled()
                    }
                },
                "aria-label": function() {
                    return e.props.ariaLabel()
                },
                role: n.const("checkbox"),
                tabindex: n.const("0"),
                "aria-checked": function() {
                    return e.props.toggled()
                },
                toggled: function() {
                    return e.props.toggled()
                },
                onTap: this.bindFn(this.props.onChange)
            }, n.createElement("div", {
                class: n.const("dcg-toggle-switch")
            }))
        }
        ,
        o
    }(n.Class);
    e.ToggleView = o
});

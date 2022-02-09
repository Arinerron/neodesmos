
define('keypad/control-toggle', ["require", "exports", "tslib", "lib/aria", "core/lib/color-helpers", "dcgview", "./dcgview-keypad", "loadcss!./control-toggle"], function(require, t, e, o, r, l, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = function(t) {
        function a() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(a, t),
        a.prototype.template = function() {
            var t = this;
            return l.createElement("div", {
                class: function() {
                    return {
                        "dcg-keypad-control-toggle": !0,
                        "dcg-toggled": t.props.toggled()
                    }
                },
                role: l.const("button"),
                tabindex: l.const("0"),
                "aria-label": this.bindFn(this.getAriaLabel),
                onTap: this.bindFn(this.handleTap)
            }, l.createElement("div", {
                class: l.const("dcg-ctrl-toggle-option")
            }, this.props.defaultOption), l.createElement("div", {
                class: l.const("dcg-ctrl-toggle-option")
            }, this.props.toggledOption), l.createElement("div", {
                class: l.const("dcg-ctrl-toggle-cover"),
                style: function() {
                    return {
                        background: r.shadeColor(t.controller.getBackgroundColor(), -.1)
                    }
                }
            }))
        }
        ,
        a.prototype.getAriaLabel = function() {
            var t = {
                toggled: this.props.toggledAriaLabel(),
                default: this.props.defaultAriaLabel()
            };
            return this.props.toggled() ? this.controller.s("shared-calculator-narration-control-toggle-switch-to-default", t) : this.controller.s("shared-calculator-narration-control-toggle-switch-to-toggled", t)
        }
        ,
        a.prototype.handleTap = function() {
            this.props.toggled() ? o.alert(this.props.defaultAriaLabel()) : o.alert(this.props.toggledAriaLabel()),
            this.props.onTap(this.props.command())
        }
        ,
        a
    }(a.default);
    t.default = n
});
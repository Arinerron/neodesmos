
define('shared-components/shared-checkbox', ["require", "exports", "tslib", "dcgview", "jquery", "loadcss!./shared-checkbox", "loadcss!./dcg-shared-icons"], function(require, e, s, r, c) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.SharedCheckbox = void 0;
    var a = function(e) {
        function a() {
            return null !== e && e.apply(this, arguments) || this
        }
        return s.__extends(a, e),
        a.prototype.template = function() {
            var e = this;
            return r.createElement("div", {
                class: function() {
                    return {
                        "dcg-shared-component-checkbox": !0,
                        "dcg-shared-checked": e.props.checked(),
                        "dcg-shared-disabled": e.props.disabled && e.props.disabled(),
                        "dcg-shared-small": e.props.small && e.props.small(),
                        "dcg-shared-green": e.props.green && e.props.green()
                    }
                },
                onTap: this.bindFn(this.onChange)
            }, r.createElement("span", {
                tabindex: r.const(0),
                class: r.const("dcg-shared-checkbox"),
                role: r.const("checkbox"),
                "aria-label": this.props.ariaLabel,
                "aria-disabled": function() {
                    return e.props.disabled && e.props.disabled()
                },
                "aria-checked": this.props.checked
            }, r.createElement("i", {
                class: r.const("dcg-shared-icon-check"),
                "aria-hidden": r.const("true")
            })), r.createElement("span", {
                class: r.const("dcg-shared-checkbox-children")
            }, this.children))
        }
        ,
        a.prototype.onChange = function(e) {
            e.target && c(e.target).attr("href") || this.props.disabled && this.props.disabled() || this.props.onChange(!this.props.checked())
        }
        ,
        a
    }(r.Class);
    e.SharedCheckbox = a
});

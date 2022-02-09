
define('dcgview-helpers/checkbox', ["require", "exports", "tslib", "dcgview", "jquery", "loadcss!./checkbox"], function(require, e, s, c, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.Checkbox = void 0;
    var r = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return s.__extends(r, e),
        r.prototype.template = function() {
            var e = this;
            return c.createElement("div", {
                class: function() {
                    return {
                        "dcg-component-checkbox": !0,
                        "dcg-checked": e.props.checked(),
                        "dcg-disabled": e.props.disabled && e.props.disabled(),
                        "dcg-small": e.props.small && e.props.small(),
                        "dcg-green": e.props.green && e.props.green()
                    }
                },
                onTap: this.bindFn(this.onChange)
            }, c.createElement("span", {
                tabindex: c.const(0),
                class: c.const("dcg-checkbox"),
                role: c.const("checkbox"),
                "aria-label": this.props.ariaLabel,
                "aria-disabled": function() {
                    return e.props.disabled && e.props.disabled()
                },
                "aria-checked": this.props.checked
            }, c.createElement("i", {
                class: c.const("dcg-icon-check"),
                "aria-hidden": c.const("true")
            })), c.createElement("span", {
                class: c.const("dcg-checkbox-children")
            }, this.children))
        }
        ,
        r.prototype.onChange = function(e) {
            e.target && t(e.target).attr("href") || this.props.disabled && this.props.disabled() || this.props.onChange(!this.props.checked())
        }
        ,
        r
    }(c.Class);
    e.Checkbox = r
});

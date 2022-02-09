
define('keypad/btn', ["require", "exports", "tslib", "dcgview", "loadcss!./btn"], function(require, t, e, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = function(t) {
        function n() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(n, t),
        n.prototype.template = function() {
            var t = this;
            return s.createElement("div", {
                class: function() {
                    return {
                        "dcg-keypad-btn-container": !0,
                        "dcg-disabled": t.isDisabled()
                    }
                },
                style: function() {
                    return {
                        "flex-grow": t.getColSpan()
                    }
                }
            }, s.createElement("span", {
                role: s.const("button"),
                class: this.bindFn(this.getClasses),
                "dcg-command": this.props.command,
                "aria-label": this.bindFn(this.getAriaLabel),
                "aria-disabled": this.bindFn(this.isDisabled),
                onTap: function() {
                    t.isDisabled() || t.props.onTap()
                }
            }, s.createElement("span", {
                class: s.const("dcg-keypad-btn-content")
            }, this.children)))
        }
        ,
        n.prototype.getClasses = function() {
            var t = {
                "dcg-keypad-btn": !0,
                "dcg-keypad-btn-active": this.isActive()
            }
              , e = this.props.style();
            switch (e) {
            case "default":
                t["dcg-btn-light-on-gray"] = !0;
                break;
            case "highlight":
                t["dcg-btn-dark-on-gray"] = !0;
                break;
            case "popover":
                t["dcg-btn-light-gray"] = !0;
                break;
            case "blue":
                t["dcg-btn-short-blue"] = !0;
                break;
            case "tall-blue":
                t["dcg-btn-tall-blue"] = !0;
                break;
            default:
                return e
            }
            return t
        }
        ,
        n.prototype.isActive = function() {
            return !!this.props.active && this.props.active()
        }
        ,
        n.prototype.getAriaLabel = function() {
            return this.props.ariaLabel ? this.props.ariaLabel() : this.props.command()
        }
        ,
        n.prototype.getColSpan = function() {
            return this.props.colspan ? this.props.colspan() : void 0
        }
        ,
        n.prototype.isDisabled = function() {
            return this.props.disabled && this.props.disabled()
        }
        ,
        n
    }(s.Class);
    t.default = n
});
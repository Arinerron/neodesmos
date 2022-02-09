define('keypad/control-btn', ["require", "exports", "tslib", "dcgview", "loadcss!./control-btn"], function(require, t, e, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function(t) {
        function s() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(s, t),
        s.prototype.template = function() {
            var t = this;
            return i.createElement("div", {
                class: function() {
                    return {
                        "dcg-keypad-control-btn": !0,
                        "dcg-disabled": t.isDisabled(),
                        "dcg-selected": !t.isDisabled() && t.isSelected(),
                        "dcg-selectable-btn": !t.isDisabled() && t.isSelectable(),
                        "dcg-narrow-control-btn": t.props.narrowButton && t.props.narrowButton()
                    }
                },
                didMount: this.bindFn(this.didMount),
                role: i.const("button"),
                "aria-disabled": function() {
                    return t.isDisabled() || void 0
                },
                "aria-label": function() {
                    return t.getAriaLabel()
                },
                "dcg-command": this.props.command,
                onTap: this.bindFn(this.handleTap),
                "aria-pressed": function() {
                    return t.hasPopup() || t.isDisabled() || !t.isSelectable() ? void 0 : t.isSelected()
                },
                "aria-expanded": function() {
                    return t.hasPopup() && !t.isDisabled() ? t.isSelected() : void 0
                },
                tabindex: this.bindFn(this.getTabIndex)
            }, this.children)
        }
        ,
        s.prototype.getTabIndex = function() {
            return this.isDisabled() ? void 0 : this.props.ignoreInTabOrder && this.props.ignoreInTabOrder() ? -1 : 0
        }
        ,
        s.prototype.handleTap = function(t) {
            this.isDisabled() || this.props.onTap(t)
        }
        ,
        s.prototype.getAriaLabel = function() {
            return this.props.ariaLabel ? this.props.ariaLabel() : this.props.command()
        }
        ,
        s.prototype.hasPopup = function() {
            return !!this.props.ariaPopup && this.props.ariaPopup()
        }
        ,
        s.prototype.isDisabled = function() {
            return !!this.props.disabled && this.props.disabled()
        }
        ,
        s.prototype.isSelected = function() {
            return !!this.props.selected && this.props.selected()
        }
        ,
        s.prototype.isSelectable = function() {
            return !!this.props.selectable && this.props.selectable()
        }
        ,
        s.prototype.didMount = function(t) {
            this.props.didMount && this.props.didMount(t)
        }
        ,
        s
    }(i.Class);
    t.default = s
});

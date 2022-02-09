define('calculator-shell/header-icon', ["require", "exports", "tslib", "dcgview", "../shared-components/tooltip"], function(require, t, e, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.HeaderIcon = void 0;
    var r = function(t) {
        function r() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(r, t),
        r.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        r.prototype.template = function() {
            var t = this;
            return this.controller = this.props.controller(),
            n.createElement(o.Tooltip, {
                tooltip: this.props.tooltip,
                gravity: this.bindFn(this.getGravity),
                offset: function() {
                    return {
                        top: 12
                    }
                }
            }, n.createElement("span", {
                role: n.const("button"),
                tabindex: n.const(0),
                "aria-haspopup": n.const("true"),
                "aria-label": function() {
                    return t.props.label()
                },
                "aria-expanded": function() {
                    return t.isMenuOpen()
                },
                class: function() {
                    var e;
                    return (e = {
                        "dcg-header-btn": !0
                    })["dcg-action-" + t.props.name()] = !0,
                    e["dcg-tooltip"] = !0,
                    e["dcg-active"] = t.isMenuOpen(),
                    e
                },
                "dcg-menu-button": this.props.name,
                onTap: this.props.onTap.bind(this)
            }, n.createElement("i", {
                class: this.props.icon
            })))
        }
        ,
        r.prototype.getGravity = function() {
            return this.props.gravity ? this.props.gravity() : "s"
        }
        ,
        r.prototype.isMenuOpen = function() {
            return this.controller.getOpenMenu() === this.props.label().toLowerCase()
        }
        ,
        r
    }(n.Class);
    t.HeaderIcon = r
});
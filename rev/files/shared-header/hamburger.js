define('shared-header/hamburger', ["require", "exports", "tslib", "browser", "dcgview", "../shared-components/tooltip"], function(require, e, t, o, r, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.Hamburger = void 0;
    var p = function(e) {
        function p() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(p, e),
        p.prototype.template = function() {
            var e = this;
            return r.createElement("span", {
                role: r.const("button"),
                tabindex: r.const(0),
                "aria-label": function() {
                    return e.openGraphText()
                },
                class: r.const("dcg-header-btn dcg-action-opendrawer dcg-tooltip"),
                tooltip: function() {
                    return e.openGraphText()
                },
                onTap: function(t) {
                    return e.props.controller().dispatch({
                        type: "open-mygraphs",
                        device: t.device
                    })
                }
            }, r.createElement(n.Tooltip, {
                tooltip: function() {
                    return e.openGraphText()
                },
                disabled: function() {
                    return !e.props.tooltip()
                },
                gravity: this.const("se"),
                offset: function() {
                    return {
                        top: 12
                    }
                }
            }, r.createElement("i", {
                class: r.const("dcg-icon-hamburger")
            })))
        }
        ,
        p.prototype.openGraphText = function() {
            var e = this.props.controller().getOpenText();
            return o.IS_APPLE ? this.props.controller().s("account-shell-label-open-graph-mac", {
                open_graph: e
            }) : this.props.controller().s("account-shell-label-open-graph-pc", {
                open_graph: e
            })
        }
        ,
        p
    }(r.Class);
    e.Hamburger = p
});
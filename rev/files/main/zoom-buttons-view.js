
define('main/zoom-buttons-view', ["require", "exports", "tslib", "dcgview", "../shared-components/tooltip", "loadcss!pillboxes"], function(require, t, o, n, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function(t) {
        function r() {
            return null !== t && t.apply(this, arguments) || this
        }
        return o.__extends(r, t),
        r.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        r.prototype.template = function() {
            var t = this;
            return n.createElement("div", {
                class: n.const("dcg-zoom-container")
            }, n.createElement("div", {
                class: n.const("dcg-zoominout-pillbox dcg-btn-flat-gray dcg-btn-flat-gray-group"),
                style: function() {
                    return {
                        background: t.controller.getPillboxBackgroundColor()
                    }
                }
            }, n.createElement(e.Tooltip, {
                tooltip: function() {
                    return t.controller.s("graphing-calculator-label-tooltip-zoom-in")
                },
                gravity: this.const("w")
            }, n.createElement("div", {
                class: n.const("dcg-action-zoomin"),
                role: n.const("button"),
                tabindex: n.const("0"),
                "aria-label": function() {
                    return t.controller.s("graphing-calculator-label-tooltip-zoom-in")
                },
                onTap: this.bindFn(this.zoomIn),
                style: function() {
                    return {
                        background: t.controller.getPillboxBackgroundColor()
                    }
                }
            }, n.createElement("i", {
                class: n.const("dcg-icon dcg-icon-plus"),
                "aria-hidden": n.const("true")
            }))), n.createElement(e.Tooltip, {
                tooltip: function() {
                    return t.controller.s("graphing-calculator-label-tooltip-zoom-out")
                },
                gravity: this.const("w")
            }, n.createElement("div", {
                class: n.const("dcg-option dcg-action-zoomout dcg-tooltip-e"),
                tooltip: function() {
                    return t.controller.s("graphing-calculator-label-tooltip-zoom-out")
                },
                role: n.const("button"),
                tabindex: n.const("0"),
                "aria-label": function() {
                    return t.controller.s("graphing-calculator-label-tooltip-zoom-out")
                },
                onTap: this.bindFn(this.zoomOut),
                style: function() {
                    return {
                        background: t.controller.getPillboxBackgroundColor()
                    }
                }
            }, n.createElement("i", {
                class: n.const("dcg-icon dcg-icon-minus"),
                "aria-hidden": n.const("true")
            })))), n.createElement(e.Tooltip, {
                tooltip: function() {
                    return t.controller.s("graphing-calculator-label-tooltip-zoom-default")
                },
                gravity: this.const("w")
            }, n.createElement("div", {
                class: function() {
                    return {
                        "dcg-btn-flat-gray": !0,
                        "dcg-option": !0,
                        "dcg-action-zoomrestore": !0,
                        "dcg-disabled": t.getZoomedDefault()
                    }
                },
                "aria-disabled": this.bindFn(this.getZoomedDefault),
                role: n.const("button"),
                tabindex: n.const("0"),
                "aria-label": function() {
                    return t.controller.s("graphing-calculator-narration-zoom-default")
                },
                onTap: this.bindFn(this.zoomRestore),
                style: function() {
                    return {
                        background: t.controller.getPillboxBackgroundColor()
                    }
                }
            }, n.createElement("i", {
                class: n.const("dcg-icon dcg-icon-home"),
                "aria-hidden": n.const("true")
            }))))
        }
        ,
        r.prototype.zoomIn = function() {
            this.controller.dispatch({
                type: "zoom",
                direction: "in"
            })
        }
        ,
        r.prototype.zoomOut = function() {
            this.controller.dispatch({
                type: "zoom",
                direction: "out"
            })
        }
        ,
        r.prototype.zoomRestore = function() {
            this.controller.dispatch({
                type: "zoom",
                direction: "default"
            })
        }
        ,
        r.prototype.getZoomedDefault = function() {
            return this.controller.getGraphSettings().zoomedDefault
        }
        ,
        r
    }(n.Class);
    t.default = r
});
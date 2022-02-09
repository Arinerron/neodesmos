define('main/pillbox-view', ["require", "exports", "tslib", "dcgview", "./graphpaper-branding-view", "./settings-view", "./zoom-buttons-view", "./reset-button-view", "loadcss!pillboxes"], function(require, t, e, o, n, r, l, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = o.Components.If
      , c = function(t) {
        function c() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(c, t),
        c.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        c.prototype.template = function() {
            var t = this;
            return o.createElement("div", null, o.createElement(s, {
                predicate: this.bindFn(this.shouldShowContainer)
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-pillbox-container"),
                    role: o.const("group"),
                    "aria-label": function() {
                        return t.controller.s("graphing-calculator-narration-graph-settings-controls")
                    }
                }, o.createElement("div", {
                    class: o.const("dcg-overgraph-pillbox-elements"),
                    style: t.bindFn(t.getContainerStyle)
                }, o.createElement(s, {
                    predicate: t.bindFn(t.shouldShowSettings)
                }, function() {
                    return o.createElement(r.default, {
                        controller: t.props.controller
                    })
                }), o.createElement(s, {
                    predicate: t.bindFn(t.shouldShowResetButton)
                }, function() {
                    return o.createElement(i.default, {
                        controller: t.props.controller
                    })
                }), o.createElement(s, {
                    predicate: t.bindFn(t.shouldShowZoomButtons)
                }, function() {
                    return o.createElement(l.default, {
                        controller: t.props.controller
                    })
                })))
            }), o.createElement(n.default, {
                controller: function() {
                    return t.props.controller()
                }
            }))
        }
        ,
        c.prototype.getContainerStyle = function() {
            var t = this.controller.isKeypadOpen() ? this.controller.getKeypadHeight() : 0;
            return this.controller.isGraphSettingsOpen() ? "bottom: " + t + "px;" : "bottom: auto"
        }
        ,
        c.prototype.shouldShowContainer = function() {
            return this.shouldShowSettings() || this.shouldShowZoomButtons() || this.shouldShowResetButton()
        }
        ,
        c.prototype.shouldShowSettings = function() {
            return this.controller.getGraphSettings().config.settingsMenu
        }
        ,
        c.prototype.shouldShowZoomButtons = function() {
            return this.controller.getGraphSettings().config.zoomButtons
        }
        ,
        c.prototype.shouldShowResetButton = function() {
            return this.controller.getGraphSettings().config.showResetButtonOnGraphpaper && this.controller.hasDefaultState()
        }
        ,
        c
    }(o.Class);
    t.default = c
});

define('basic/keypad/settings-control-button', ["require", "exports", "tslib", "dcgview", "keypad/control-btn", "basic/dcgview-basic", "basic/settings-menu", "loadcss!./settings-control-button"], function(require, t, e, n, o, s, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n.Components.If
      , c = function(t) {
        function s() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(s, t),
        s.prototype.template = function() {
            var t = this
              , e = this.props.controller();
            return n.createElement("div", {
                class: n.const("dcg-basic-settings-container")
            }, n.createElement(o.default, {
                didMount: function(e) {
                    return t.settingsButtonNode = e
                },
                command: this.const("settings"),
                ariaLabel: function() {
                    return e.s("basic-calculator-narration-controlbar-settings")
                },
                onTap: this.bindFn(this.onToggleSettingsMenu),
                selected: function() {
                    return t.controller.isSettingsMenuOpen()
                },
                ariaPopup: this.const(!0)
            }, n.createElement("i", {
                class: n.const("dcg-icon-wrench")
            })), n.createElement(r, {
                predicate: function() {
                    return t.controller.isSettingsMenuOpen()
                }
            }, function() {
                return n.createElement(i.SettingsMenu, {
                    controller: t.props.controller,
                    settingsButtonNode: function() {
                        return t.settingsButtonNode
                    }
                })
            }))
        }
        ,
        s.prototype.onToggleSettingsMenu = function() {
            this.controller.dispatch({
                type: "toggle-settings-menu"
            })
        }
        ,
        s
    }(s.DCGViewBasic);
    t.default = c
});
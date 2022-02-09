define('calculator-shell/hotkeys-dialog', ["require", "exports", "tslib", "dcgview", "./modal", "browser", "dcgview-helpers/static-mathquill-view", "jquery", "loadcss!./hotkeys-dialog"], function(require, c, e, t, n, s, o, a) {
    "use strict";
    Object.defineProperty(c, "__esModule", {
        value: !0
    }),
    c.HotkeysDialog = void 0;
    var r = t.Components.If
      , l = function(c) {
        function l() {
            return null !== c && c.apply(this, arguments) || this
        }
        return e.__extends(l, c),
        l.prototype.init = function() {
            this.controller = this.props.controller(),
            null == this.controller.state.hotkeysDialog && (this.controller.state.hotkeysDialog = {
                shortcutOS: s.IS_APPLE ? "mac" : "windows"
            })
        }
        ,
        l.prototype.template = function() {
            var c = this;
            return t.createElement(n.Modal, {
                controller: this.props.controller
            }, t.createElement("div", {
                id: t.const("dcg-hotkeys-dialog")
            }, t.createElement("h1", null, function() {
                return c.controller.s("shared-calculator-heading-keyboard-shortcuts")
            }), t.createElement("div", {
                class: t.const("dcg-toggle-container")
            }, t.createElement("span", {
                class: function() {
                    return {
                        "dcg-action-toggleos": !0,
                        "dcg-windows-option": !0,
                        "dcg-selected": "windows" === c.getShortcutOS()
                    }
                },
                role: t.const("button"),
                tabindex: t.const(0),
                "aria-pressed": function() {
                    return "windows" === c.getShortcutOS()
                },
                onTap: function() {
                    return c.setShortcutOS("windows")
                }
            }, function() {
                return c.controller.s("shared-calculator-button-windows-chrome")
            }), t.createElement("span", {
                class: function() {
                    return {
                        "dcg-action-toggleos": !0,
                        "dcg-mac-option": !0,
                        "dcg-selected": "mac" === c.getShortcutOS()
                    }
                },
                role: t.const("button"),
                tabindex: t.const(0),
                "aria-pressed": function() {
                    return "mac" === c.getShortcutOS()
                },
                onTap: function() {
                    return c.setShortcutOS("mac")
                }
            }, function() {
                return c.controller.s("shared-calculator-button-mac")
            })), t.createElement("div", {
                class: t.const("dcg-hotkey-container")
            }, t.createElement("div", {
                class: t.const("dcg-hotkey-section")
            }, t.createElement("h2", {
                class: t.const("dcg-hotkey-section-header")
            }, function() {
                return c.controller.s("shared-calculator-heading-keyboard-shortcuts-common-actions")
            }), t.createElement("table", null, t.createElement("tr", null, t.createElement("th", null, function() {
                return c.controller.s("shared-calculator-heading-function-table-column-header")
            }), t.createElement("th", {
                class: t.const("dcg-os-windows")
            }, function() {
                return c.controller.s("shared-calculator-heading-windows-chrome-table-column-header")
            }), t.createElement("th", {
                class: t.const("dcg-os-mac")
            }, function() {
                return c.controller.s("shared-calculator-heading-mac-table-column-header")
            })), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-close-a-dialog")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Esc"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Esc")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-open-a-graph")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("O"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("O")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-save-a-graph")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("S"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("S")))), t.createElement("tr", {
                class: t.const("hotkey-table-row")
            }, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-print-a-graph")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("P"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("P")))), t.createElement("tr", {
                class: t.const("hotkey-table-row")
            }, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-show-or-hide-expression-list")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("E"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("E")))), t.createElement("tr", {
                class: t.const("hotkey-table-row")
            }, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-focus-expression-list")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("E"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("E")))), t.createElement("tr", {
                class: t.const("hotkey-table-row")
            }, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-open-expression-options")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("O"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("O")))), t.createElement("tr", {
                class: t.const("hotkey-table-row")
            }, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-delete-expression")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("D"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("D")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-add-expression")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("X"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("X")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-add-note")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("O"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("O")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-collapse-folder")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-expand-folder")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-collapse-all-folders")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-expand-all-folders")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-add-folder")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("F"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("F")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-add-image")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("I"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("I")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-add-table")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("T"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("T")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-undo")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Z"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Z")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-redo")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Z"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Z")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-toggle-edit-list-mode")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("D"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("OPTION")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("D")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-toggle-graph-settings-menu")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("G"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("G")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-toggle-account-menu")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("A"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("A")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-toggle-help-menu")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("H"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("H")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-toggle-language-menu")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("L"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("L")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-toggle-share-menu")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("S"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("S"))))), t.createElement("h2", {
                class: t.const("dcg-hotkey-section-header")
            }, function() {
                return c.controller.s("shared-calculator-heading-keyboard-shortcuts-expression-entry-and-navigation")
            }), t.createElement("table", null, t.createElement("tr", null, t.createElement("th", null, function() {
                return c.controller.s("shared-calculator-heading-function-table-column-header")
            }), t.createElement("th", {
                class: t.const("dcg-os-windows")
            }, function() {
                return c.controller.s("shared-calculator-heading-windows-chrome-table-column-header")
            }), t.createElement("th", {
                class: t.const("dcg-os-mac")
            }, t.const("Mac Shortcut"))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-previous-expression")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")), t.const("or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")), t.const("or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-next-expression")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")), t.const("or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")), t.const("or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-remove-empty-expression")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Backspace"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Delete")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-previous-character")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-next-character")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-move-to-numerator")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-move-to-denominator")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-exit-block")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-beginning-of-block")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Home"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Fn")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-end-of-block")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("End"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Fn")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-beginning-of-expression")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Home"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Fn")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-end-of-expression")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("End"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Fn")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-increase-selection-left")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-increase-selection-right")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-delete-selection")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Backspace"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Delete")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-select-all")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("A"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("A")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-speak-parent-block")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Option")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-speak-focused-block")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Option")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-speak-left-adjacent-block")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Option")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-speak-right-adjacent-block")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Option")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-speak-selection")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Option")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-speak-answer")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("="))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Option")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")))), t.createElement(r, {
                predicate: function() {
                    return c.controller.isDecimalToFractionEnabled()
                }
            }, function() {
                return t.createElement("tr", null, t.createElement("td", null, function() {
                    return c.controller.s("shared-calculator-text-keyboard-shortcut-show-answer-as-decimal-or-fraction")
                }), t.createElement("td", {
                    class: t.const("dcg-keyboard-shortcut dcg-os-windows")
                }, t.createElement("span", {
                    class: t.const("dcg-key-command")
                }, t.const("ALT")), t.const("+"), t.createElement("span", {
                    class: t.const("dcg-key-command")
                }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                    class: t.const("dcg-key-command")
                }, t.const("F"))), t.createElement("td", {
                    class: t.const("dcg-keyboard-shortcut dcg-os-mac")
                }, t.createElement("span", {
                    class: t.const("dcg-key-command")
                }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                    class: t.const("dcg-key-command")
                }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                    class: t.const("dcg-key-command")
                }, t.const("F"))))
            })), t.createElement("h2", {
                class: t.const("dcg-hotkey-section-header")
            }, function() {
                return c.controller.s("shared-calculator-heading-keyboard-shortcuts-graphs-with-interactive-points")
            }), t.createElement("table", null, t.createElement("tr", null, t.createElement("th", null, function() {
                return c.controller.s("shared-calculator-heading-function-table-column-header")
            }), t.createElement("th", {
                class: t.const("dcg-os-windows")
            }, function() {
                return c.controller.s("shared-calculator-heading-windows-chrome-table-column-header")
            }), t.createElement("th", {
                class: t.const("dcg-os-mac")
            }, t.const("Mac Shortcut"))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-focus-first-interactive-point")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("P"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("COMMAND")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("P")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-next-interactive-point")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-previous-interactive-point")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-increase-x")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-decrease-x")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-increase-y")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-decrease-y")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-increase-x-larger")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-decrease-x-larger")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-increase-y-larger")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-decrease-y-larger")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-speak-x")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("X"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("X")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-speak-y")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Y"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Y")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-speak-label")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("L"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("L")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-speak-color")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("C"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("C"))))), t.createElement("h2", {
                class: t.const("dcg-hotkey-section-header")
            }, function() {
                return c.controller.s("shared-calculator-heading-keyboard-shortcuts-braille")
            }), t.createElement("table", null, t.createElement("tr", null, t.createElement("th", null, function() {
                return c.controller.s("shared-calculator-heading-function-table-column-header")
            }), t.createElement("th", {
                class: t.const("dcg-os-windows")
            }, function() {
                return c.controller.s("shared-calculator-heading-windows-chrome-table-column-header")
            }), t.createElement("th", {
                class: t.const("dcg-os-mac")
            }, function() {
                return c.controller.s("shared-calculator-heading-mac-table-column-header")
            })), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-nemeth-mode")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("N"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("N")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-ueb-mode")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("U"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("U")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-print-mode")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Q"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Q")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-toggle-braille-typing")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("6"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("6")))))), t.createElement("div", {
                class: t.const("dcg-hotkey-section")
            }, t.createElement("h2", {
                class: t.const("dcg-hotkey-section-header")
            }, function() {
                return c.controller.s("shared-calculator-heading-keyboard-shortcuts-symbols")
            }), t.createElement("table", null, t.createElement("tr", null, t.createElement("th", null, function() {
                return c.controller.s("shared-calculator-heading-function-table-column-header")
            }), t.createElement("th", {
                class: t.const("dcg-os-windows")
            }, function() {
                return c.controller.s("shared-calculator-heading-windows-chrome-table-column-header")
            }), t.createElement("th", {
                class: t.const("dcg-os-mac")
            }, t.const("Mac Shortcut"))), t.createElement("tr", null, t.createElement("td", null, t.createElement(o.default, {
                config: this.const({}),
                latex: this.const("a^b")
            })), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("^")), function() {
                return "(" + c.controller.s("shared-calculator-text-keyboard-shortcut-usually")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("6")), t.const(")")), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("^")), function() {
                return "(" + c.controller.s("shared-calculator-text-keyboard-shortcut-usually")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("6")), t.const(")"))), t.createElement("tr", null, t.createElement("td", null, t.createElement(o.default, {
                config: this.const({}),
                latex: this.const("a_b")
            })), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("_")), function() {
                return "(" + c.controller.s("shared-calculator-text-keyboard-shortcut-usually")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("-")), t.const(")")), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("_")), function() {
                return "(" + c.controller.s("shared-calculator-text-keyboard-shortcut-usually")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("-")), t.const(")"))), t.createElement("tr", null, t.createElement("td", null, t.createElement(o.default, {
                config: this.const({}),
                latex: this.const("\\le")
            })), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("<")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("="))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("<")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("=")))), t.createElement("tr", null, t.createElement("td", null, t.createElement(o.default, {
                config: this.const({}),
                latex: this.const("\\ge")
            })), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const(">")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("="))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const(">")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("=")))), t.createElement("tr", null, t.createElement("td", null, t.createElement(o.default, {
                config: this.const({}),
                latex: this.const("a'")
            })), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("'"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("'")))), t.createElement("tr", null, t.createElement("td", null, t.createElement(o.default, {
                config: this.const({}),
                latex: this.const("\\frac{a}{b}")
            })), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("f")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("r")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("a")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("c"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("f")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("r")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("a")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("c")))), t.createElement("tr", null, t.createElement("td", null, t.createElement(o.default, {
                config: this.const({}),
                latex: this.const("\\sqrt{a}")
            })), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("s")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("q")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("r")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("t"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("s")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("q")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("r")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("t")))), t.createElement("tr", null, t.createElement("td", null, t.createElement(o.default, {
                config: this.const({}),
                latex: this.const("\\sqrt[3]{a}")
            })), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("c")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("b")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("r")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("t"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("c")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("b")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("r")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("t")))), t.createElement("tr", null, t.createElement("td", null, t.createElement(o.default, {
                config: this.const({}),
                latex: this.const("\\sqrt[n]{a}")
            })), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("n")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("t")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("h")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("r")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("o")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("o")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("t"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("n")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("t")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("h")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("r")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("o")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("o")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("t")))), t.createElement("tr", null, t.createElement("td", null, t.createElement(o.default, {
                config: this.const({}),
                latex: this.const("\\sum_{n=a}^b")
            })), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("s")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("u")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("m"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("s")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("u")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("m")))), t.createElement("tr", null, t.createElement("td", null, t.createElement(o.default, {
                config: this.const({}),
                latex: this.const("\\int_a^b")
            })), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("i")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("n")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("t"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("i")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("n")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("t")))), t.createElement("tr", null, t.createElement("td", null, t.createElement(o.default, {
                config: this.const({}),
                latex: this.const("\\prod_{n=a}^b")
            })), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("p")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("r")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("o")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("d"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("p")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("r")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("o")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("d")))), t.createElement("tr", null, t.createElement("td", null, t.createElement(o.default, {
                config: this.const({}),
                latex: this.const("\\pi")
            })), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("p")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("i"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("p")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("i")))), t.createElement("tr", null, t.createElement("td", null, t.createElement(o.default, {
                config: this.const({}),
                latex: this.const("\\theta")
            })), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("t")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("h")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("e")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("t")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("a"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("t")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("h")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("e")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("t")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("a")))), t.createElement("tr", null, t.createElement("td", null, this.const("→")), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("-")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const(">"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("-")), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const(">"))))), t.createElement("h2", {
                class: t.const("dcg-hotkey-section-header")
            }, function() {
                return c.controller.s("shared-calculator-heading-keyboard-shortcuts-audio-tracing")
            }), t.createElement("table", null, t.createElement("tr", null, t.createElement("th", null, function() {
                return c.controller.s("shared-calculator-heading-function-table-column-header")
            }), t.createElement("th", {
                class: t.const("dcg-os-windows")
            }, function() {
                return c.controller.s("shared-calculator-heading-windows-chrome-table-column-header")
            }), t.createElement("th", {
                class: t.const("dcg-os-mac")
            }, t.const("Mac Shortcut"))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-toggle-audio-trace")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("T"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Option")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("T")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-summarize-graph")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("S"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Option")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("S")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-previous-point")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")), t.const(","), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")), t.const(", or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("J"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")), t.const(","), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")), t.const(", or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("J")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-next-point")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")), t.const(","), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")), t.const(", or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("L"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")), t.const(","), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")), t.const(", or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("L")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-previous-poi")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Page Up")), t.const(","), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab")), t.const(", or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("K"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Fn")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")), t.const(","), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab")), t.const(", or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("K")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-next-poi")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Page Down")), t.const(","), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab")), t.const(", or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("I"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Fn")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")), t.const(","), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab")), t.const(", or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("I")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-first-point")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Home")), t.const("or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("U"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Fn")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")), t.const("or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("U")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-last-point")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("End")), t.const("or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("N"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Fn")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")), t.const("or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("N")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-speak-poi-count")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("P"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("P")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-speak-x")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("X"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("X")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-speak-y")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Y"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Y")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-speak-color")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("C"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("C")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-speak-branch")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("B"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("B")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-speak-point-type")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("T"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("T")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-move-to-origin")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("O"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("O")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-previous-curve")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("OPTION")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-next-curve")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("OPTION")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-hear-graph")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("H"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("H")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-hear-specific-branch")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("1")), t.const("-"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("0"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("1")), t.const("-"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("0")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-adjust-playback-speed")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("ALT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("1")), t.const("-"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("5"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Option")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("1")), t.const("-"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("5")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-increase-volume")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("V"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("V")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-decrease-volume")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("V"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("V")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-announce-slider-animations")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("A"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("A")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-toggle-slider-trace")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("S"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("S")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-slider-trace-decrease")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")), t.const("or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("J"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")), t.const("or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("J")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-slider-trace-decrease-larger")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Page Down"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Fn")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-slider-trace-increase")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")), t.const("or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("L"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")), t.const("or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("L")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-slider-trace-increase-larger")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Page Up"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Fn")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-slider-trace-minimum")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Home")), t.const("or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("U"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Fn")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")), t.const("or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("U")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-slider-trace-maximum")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("End")), t.const("or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("N"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Fn")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")), t.const("or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("N")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-slider-trace-next-slider")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")), t.const(","), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab")), t.const(", or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("K"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")), t.const(","), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab")), t.const(", or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("K")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-slider-trace-previous-slider")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")), t.const(","), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab")), t.const(", or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("I"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")), t.const(","), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab")), t.const(", or"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("I"))))), t.createElement("h2", {
                class: t.const("dcg-hotkey-section-header")
            }, function() {
                return c.controller.s("shared-calculator-heading-keyboard-shortcuts-sliders")
            }), t.createElement("table", null, t.createElement("tr", null, t.createElement("th", null, function() {
                return c.controller.s("shared-calculator-heading-function-table-column-header")
            }), t.createElement("th", {
                class: t.const("dcg-os-windows")
            }, function() {
                return c.controller.s("shared-calculator-heading-windows-chrome-table-column-header")
            }), t.createElement("th", {
                class: t.const("dcg-os-mac")
            }, t.const("Mac Shortcut"))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-slider-decrease")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-slider-decrease-larger")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Page Down"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Fn")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-slider-increase")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-slider-increase-larger")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Page Up"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Fn")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-slider-minimum")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Home"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Fn")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-slider-maximum")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("End"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Fn")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow"))))), t.createElement("h2", {
                class: t.const("dcg-hotkey-section-header tables-section")
            }, function() {
                return c.controller.s("shared-calculator-heading-keyboard-shortcuts-tables")
            }), t.createElement("table", null, t.createElement("tr", null, t.createElement("th", null, function() {
                return c.controller.s("shared-calculator-heading-function-table-column-header")
            }), t.createElement("th", {
                class: t.const("dcg-os-windows")
            }, function() {
                return c.controller.s("shared-calculator-heading-windows-chrome-table-column-header")
            }), t.createElement("th", {
                class: t.const("dcg-os-mac")
            }, t.const("Mac Shortcut"))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-table-previous-cell")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("SHIFT")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-table-next-cell")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Tab")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-table-previous-row")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-table-next-row")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-table-previous-column")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-table-next-column")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-table-first-row")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Up Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-table-last-row")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Down Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-table-first-column")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Left Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-table-last-column")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("Right Arrow")))), t.createElement("tr", null, t.createElement("td", null, function() {
                return c.controller.s("shared-calculator-text-keyboard-shortcut-table-speak-column-header")
            }), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-windows")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("H"))), t.createElement("td", {
                class: t.const("dcg-keyboard-shortcut dcg-os-mac")
            }, t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("CTRL")), t.const("+"), t.createElement("span", {
                class: t.const("dcg-key-command")
            }, t.const("H")))))))))
        }
        ,
        l.prototype.getShortcutOS = function() {
            return this.controller.state.hotkeysDialog.shortcutOS
        }
        ,
        l.prototype.setShortcutOS = function(c) {
            this.controller.state.hotkeysDialog.shortcutOS = c,
            this.unmounted || this.update()
        }
        ,
        l.prototype.didMount = function() {
            this.updateVisibleShortcuts()
        }
        ,
        l.prototype.didUnmount = function() {
            this.unmounted = !0
        }
        ,
        l.prototype.didUpdate = function() {
            this.updateVisibleShortcuts()
        }
        ,
        l.prototype.updateVisibleShortcuts = function() {
            var c = this.getShortcutOS()
              , e = a(".dcg-os-mac")
              , t = a(".dcg-os-windows");
            "mac" === c ? (e.show(),
            t.hide()) : "windows" === c && (e.hide(),
            t.show())
        }
        ,
        l
    }(t.Class);
    c.HotkeysDialog = l
});
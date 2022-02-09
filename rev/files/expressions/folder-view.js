define('expressions/folder-view', ["require", "exports", "tslib", "./expression-edit-actions", "./abstract-item-view", "./smart_textarea", "dcgview", "./circular-icon-view", "jquery.handleevent", "loadcss!./folder-view"], function(require, e, t, o, n, r, i, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var c = function(e) {
        function n() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(n, e),
        n.prototype.didMount = function() {
            this.onItemViewMounted()
        }
        ,
        n.prototype.willUnmount = function() {
            this.onItemViewUnmounted()
        }
        ,
        n.prototype.template = function() {
            var e = this;
            return i.createElement("div", {
                class: function() {
                    return {
                        "dcg-do-not-blur": !0,
                        "dcg-expressionitem": !0,
                        "dcg-expressionfolder": !0,
                        "dcg-inFolder": !1,
                        "dcg-selected": e.controller.isItemSelected(e.id),
                        "dcg-dragging": !!e.controller.isItemBeingDragged(e.id),
                        "dcg-collapsed": !!e.model.collapsed,
                        "dcg-hidden": !!e.model.hidden,
                        "dcg-has-items": e.controller.getNumberOfItemsInFolder(e.id) > 0,
                        "dcg-secretFolder": e.model.secret && !e.controller.canAdministerSecretFolders()
                    }
                },
                "expr-id": function() {
                    return e.model.id
                },
                onTapStart: this.bindFn(this.onMouseSelect),
                onTap: this.bindFn(this.onMouseSelect)
            }, i.createElement("div", {
                class: i.const("dcg-fade-container")
            }, i.createElement("div", {
                class: i.const("dcg-main")
            }, i.createElement("div", {
                role: i.const("button"),
                tabindex: i.const("0"),
                "aria-pressed": function() {
                    return e.model.collapsed
                },
                "aria-label": function() {
                    return e.controller.s("graphing-calculator-narration-collapse-folder")
                },
                class: i.const("dcg-caret-container dcg-action-toggle-folder-collapsed dcg-do-not-blur"),
                handleEvent: i.const("true"),
                onTap: this.bindFn(this.toggleCollapsed)
            }, i.createElement("i", {
                class: i.const("dcg-icon-caret-down")
            })), i.createElement(r.default, {
                shouldFocus: this.bindFn(this.isFocused),
                text: function() {
                    return e.model.title
                },
                placeholder: function() {
                    return e.controller.s("graphing-calculator-text-note-placeholder")
                },
                showLinks: function() {
                    return e.controller.areLinksEnabled()
                },
                onInput: this.bindFn(this.onInput),
                onFocusChange: this.bindFn(this.onFocusChange),
                onSpecialKey: this.bindFn(this.onSpecialKey),
                ariaLabel: this.bindFn(this.getAriaLabel),
                readonly: function() {
                    return e.controller.isInEditListMode()
                },
                readonlyAction: this.bindFn(this.exitEditListMode)
            }), i.createElement("div", {
                role: i.const("checkbox"),
                "aria-checked": function() {
                    return e.model.secret
                },
                "aria-label": function() {
                    return e.controller.s("graphing-calculator-button-hide-folder-from-students")
                },
                class: function() {
                    return {
                        "dcg-action-toggle-secret-folder": !0,
                        "dcg-do-not-blur": !0,
                        "dcg-checked": e.model.secret
                    }
                },
                style: function() {
                    return {
                        display: e.controller.canAdministerSecretFolders() ? void 0 : "none"
                    }
                },
                handleEvent: i.const("true"),
                onTap: this.bindFn(this.toggleSecret)
            }, i.createElement("span", {
                class: i.const("dcg-checkbox-box")
            }, i.createElement("i", {
                class: i.const("dcg-icon-check")
            })), i.createElement("span", {
                class: i.const("dcg-checkbox-label")
            }, function() {
                return e.controller.s("graphing-calculator-button-hide-folder-from-students-2")
            }))), i.createElement("i", {
                class: i.const("dcg-icon-remove dcg-top-level-delete"),
                handleEvent: i.const("true"),
                onTap: this.bindFn(this.onDelete)
            })), i.createElement("span", {
                class: i.const("dcg-tab dcg-action-drag"),
                handleevent: i.const("true"),
                tapboundary: i.const("true"),
                disablescroll: i.const("true"),
                style: i.const("touch-action:none"),
                onTapStart: this.bindFn(this.onDragPending)
            }, i.createElement("span", {
                class: i.const("dcg-num")
            }, function() {
                return e.model.displayIndex
            }), i.createElement("div", {
                class: i.const("dcg-tab-interior")
            }, i.createElement("span", {
                role: i.const("button"),
                tabindex: i.const("0"),
                "aria-pressed": function() {
                    return !!e.model.hidden
                },
                "aria-label": function() {
                    return e.controller.s("graphing-calculator-narration-hide-folder")
                },
                class: i.const("dcg-circular-icon-container dcg-expression-icon-container"),
                onTap: this.bindFn(this.toggleHidden)
            }, i.createElement(l.CircularIconView, {
                iconType: function() {
                    return e.model.hidden ? "hidden" : "folder"
                },
                whiteIcon: function() {
                    return e.controller.isItemSelected(e.model.id) || e.controller.isItemBeingDragged(e.model.id)
                }
            })))), i.createElement(o.ExpressionEditActions, {
                controller: this.props.controller,
                id: function() {
                    return e.model.id
                }
            }))
        }
        ,
        n.prototype.toggleHidden = function() {
            this.controller.dispatch({
                type: "toggle-item-hidden",
                id: this.id
            })
        }
        ,
        n.prototype.toggleSecret = function() {
            this.controller.dispatch({
                type: "set-item-secret",
                id: this.id,
                isSecret: !this.model.secret
            })
        }
        ,
        n.prototype.toggleCollapsed = function() {
            this.controller.dispatch({
                type: "set-folder-collapsed",
                id: this.id,
                isCollapsed: !this.model.collapsed
            })
        }
        ,
        n.prototype.onInput = function(e) {
            this.controller.dispatch({
                type: "set-folder-title",
                id: this.id,
                title: e
            })
        }
        ,
        n.prototype.onFocusChange = function(e) {
            e ? this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "folder",
                    id: this.id
                }
            }) : this.controller.dispatch({
                type: "blur-focus-location",
                location: {
                    type: "folder",
                    id: this.id
                }
            })
        }
        ,
        n.prototype.onSpecialKey = function(e) {
            return this.controller.dispatch({
                type: "on-special-key-pressed",
                key: e
            })
        }
        ,
        n.prototype.isFocused = function() {
            var e = this.controller.getFocusLocation();
            return !(!e || "folder" !== e.type || e.id !== this.id)
        }
        ,
        n.prototype.getAriaLabel = function() {
            var e = "";
            this.model.hidden || this.model.collapsed || this.model.secret ? !this.model.hidden || this.model.collapsed || this.model.secret ? this.model.hidden || !this.model.collapsed || this.model.secret ? this.model.hidden || this.model.collapsed || !this.model.secret ? this.model.hidden && this.model.collapsed && !this.model.secret ? e = this.controller.s("graphing-calculator-narration-description-hidden-collapsed-folder") : this.model.hidden && !this.model.collapsed && this.model.secret ? e = this.controller.s("graphing-calculator-narration-description-hidden-secret-folder") : !this.model.hidden && this.model.collapsed && this.model.secret ? e = this.controller.s("graphing-calculator-narration-description-collapsed-secret-folder") : this.model.hidden && this.model.collapsed && this.model.secret && (e = this.controller.s("graphing-calculator-narration-description-hidden-collapsed-secret-folder")) : e = this.controller.s("graphing-calculator-narration-description-secret-folder") : e = this.controller.s("graphing-calculator-narration-description-collapsed-folder") : e = this.controller.s("graphing-calculator-narration-description-hidden-folder") : e = this.controller.s("graphing-calculator-narration-description-folder");
            var t = this.controller.getNumberOfItemsInFolder(this.id);
            return t > 0 ? this.controller.s("graphing-calculator-narration-folder-has-items", {
                folder: e,
                count: t
            }) : e
        }
        ,
        n
    }(n.default);
    e.default = c
});
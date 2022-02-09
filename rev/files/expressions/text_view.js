
define('expressions/text_view', ["require", "exports", "tslib", "./abstract-item-view", "./smart_textarea", "dcgview", "./expression-edit-actions", "jquery.handleevent"], function(require, t, e, n, o, i, c) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function(t) {
        function n() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(n, t),
        n.prototype.didMount = function() {
            this.onItemViewMounted()
        }
        ,
        n.prototype.willUnmount = function() {
            this.onItemViewUnmounted()
        }
        ,
        n.prototype.template = function() {
            var t = this;
            return i.createElement("div", {
                class: function() {
                    return {
                        "dcg-do-not-blur": !0,
                        "dcg-expressionitem": !0,
                        "dcg-expressiontext": !0,
                        "dcg-inFolder": !!t.model.folderId,
                        "dcg-selected": !!t.controller.isItemSelected(t.id),
                        "dcg-dragging": !!t.controller.isItemBeingDragged(t.id)
                    }
                },
                "expr-id": function() {
                    return t.model.id
                },
                onTapStart: this.bindFn(this.onMouseSelect),
                onTap: this.bindFn(this.onMouseSelect)
            }, i.createElement("div", {
                class: i.const("dcg-fade-container")
            }, i.createElement("div", {
                class: i.const("dcg-main")
            }, i.createElement(o.default, {
                shouldFocus: this.bindFn(this.isFocused),
                text: function() {
                    return t.model.text
                },
                placeholder: function() {
                    return t.controller.s("graphing-calculator-text-enter-note-placeholder")
                },
                showLinks: function() {
                    return t.controller.areLinksEnabled()
                },
                onInput: this.bindFn(this.onInput),
                onFocusChange: this.bindFn(this.onFocusChange),
                onSpecialKey: this.bindFn(this.onSpecialKey),
                readonly: function() {
                    return t.controller.isInEditListMode()
                },
                readonlyAction: this.bindFn(this.exitEditListMode)
            })), i.createElement("i", {
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
                return t.model.displayIndex
            }), i.createElement("div", {
                class: i.const("dcg-tab-interior")
            }), i.createElement("i", {
                class: i.const("dcg-icon-text")
            })), i.createElement(c.ExpressionEditActions, {
                controller: this.props.controller,
                id: function() {
                    return t.model.id
                }
            }))
        }
        ,
        n.prototype.onInput = function(t) {
            this.controller.dispatch({
                type: "set-note-text",
                id: this.id,
                text: t
            })
        }
        ,
        n.prototype.onFocusChange = function(t) {
            t ? this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "text",
                    id: this.id
                }
            }) : this.controller.dispatch({
                type: "blur-focus-location",
                location: {
                    type: "text",
                    id: this.id
                }
            })
        }
        ,
        n.prototype.onSpecialKey = function(t) {
            return this.controller.dispatch({
                type: "on-special-key-pressed",
                key: t
            })
        }
        ,
        n.prototype.isFocused = function() {
            var t = this.controller.getFocusLocation();
            return !(!t || "text" !== t.type || t.id !== this.id)
        }
        ,
        n
    }(n.default);
    t.default = s
});
define('expressions/smart_textarea', ["require", "exports", "tslib", "keys", "browser", "dcgview", "jquery", "lib/conditional_blur", "jquery.handleevent", "loadcss!./smart_textarea"], function(require, e, t, o, n, i, a, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = i.Components.Textarea
      , p = function(e) {
        function p() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(p, e),
        p.prototype.template = function() {
            var e = this;
            return i.createElement("div", {
                class: i.const("dcg-smart-textarea-container")
            }, i.createElement("div", {
                class: i.const("dcg-displayTextarea dcg-fixed-width-element"),
                didMount: this.bindFn(this.didMountDisplay)
            }), i.createElement(r, {
                class: function() {
                    return {
                        "dcg-do-blur": !0,
                        "dcg-fixed-width-element": !0,
                        "dcg-smart-textarea": !0,
                        "dcg-empty": !e.props.text()
                    }
                },
                "aria-label": function() {
                    return e.props.ariaLabel ? e.props.ariaLabel() : void 0
                },
                placeholder: this.props.placeholder,
                readonly: function() {
                    return !!e.props.readonly() || void 0
                },
                value: this.props.text,
                onInput: this.props.onInput,
                didMount: this.bindFn(this.didMountTextarea),
                onKeydown: this.bindFn(this.onKeydownEvent)
            }))
        }
        ,
        p.prototype.getDisplayTextHTML = function() {
            var e = this.props.text() || "";
            if (e = e.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
            !this.props.showLinks())
                return e;
            return e = e.replace(/(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a rel='nofollow ugc' href='$1' target ='_blank'>$1</a>")
        }
        ,
        p.prototype.willUnmount = function() {
            this.textareaNode = void 0
        }
        ,
        p.prototype.didMountDisplay = function(e) {
            this.displayNode = e,
            a(e).on("touchend", function(e) {
                e.preventDefault()
            }),
            a(e).on("dcg-tap dcg-tapstart", "a", function(e) {
                e.handle()
            }),
            this.renderDisplayText()
        }
        ,
        p.prototype.didMountTextarea = function(e) {
            var t = this;
            this.textareaNode = e,
            a(e).on("dcg-tapstart", function(e) {
                e.handle()
            }),
            a(e).on("focusin focusout", function() {
                return t.onFocusEvent()
            }),
            this.updateFocused()
        }
        ,
        p.prototype.didUpdate = function() {
            this.updateFocused(),
            this.renderDisplayText()
        }
        ,
        p.prototype.onFocusEvent = function() {
            if (this.textareaNode) {
                var e = document.activeElement === this.textareaNode;
                this.shouldBeFocused() !== e && this.props.onFocusChange(e)
            }
        }
        ,
        p.prototype.renderDisplayText = function() {
            if (this.displayNode) {
                var e = this.getDisplayTextHTML();
                this.lastDisplayTextHTML !== e && (this.lastDisplayTextHTML = e,
                this.displayNode.innerHTML = e)
            }
        }
        ,
        p.prototype.isFocused = function() {
            return document.activeElement === this.textareaNode
        }
        ,
        p.prototype.shouldBeFocused = function() {
            return this.props.shouldFocus()
        }
        ,
        p.prototype.updateFocused = function() {
            if (this.textareaNode) {
                var e = this.isFocused()
                  , t = this.shouldBeFocused();
                if (e !== t)
                    if (t) {
                        if (n.IS_IPAD && n.IS_IN_IFRAME)
                            return;
                        this.textareaNode.focus(),
                        this.textareaNode.selectionStart = this.textareaNode.selectionEnd = this.textareaNode.value.length
                    } else
                        this.textareaNode.blur()
            }
        }
        ,
        p.prototype.onKeydownEvent = function(e) {
            var t = this.textareaNode;
            if (t) {
                var n = o.lookup(e);
                this.props.readonly() && void 0 !== this.props.readonlyAction ? e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || n !== o.ENTER && n !== o.SPACEBAR || (e.preventDefault(),
                this.props.readonlyAction()) : (n !== o.ENTER || e.metaKey ? n === o.ESCAPE ? s.default() : n === o.UP ? 0 !== t.selectionStart || 0 !== t.selectionEnd || e.altKey || e.metaKey || (e.preventDefault(),
                this.props.onSpecialKey("Up")) : n === o.DOWN ? t.selectionStart !== t.value.length || t.selectionEnd !== t.value.length || e.altKey || e.metaKey || (e.preventDefault(),
                this.props.onSpecialKey("Down")) : n === o.BACKSPACE ? 0 === t.value.length && (e.preventDefault(),
                this.props.onSpecialKey("Backspace")) : n === o.DELETE && 0 === t.value.length && (e.preventDefault(),
                this.props.onSpecialKey("Delete")) : (e.preventDefault(),
                this.props.onSpecialKey("Enter")),
                this.props.onKeydown && this.props.onKeydown(e))
            }
        }
        ,
        p
    }(i.Class);
    e.default = p
});
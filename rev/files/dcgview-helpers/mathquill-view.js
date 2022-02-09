
define('dcgview-helpers/mathquill-view', ["require", "exports", "tslib", "keys", "browser", "dcgview", "vendor/mathquill", "jquery", "./static-mathquill-view", "../core/lib/count-latex-tokens", "loadcss!./mathquill-view"], function(require, e, t, i, o, a, n, s, r, p) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.EXPRESSION_TOKEN_LIMIT = void 0;
    var l = a.Components.If;
    e.EXPRESSION_TOKEN_LIMIT = 100;
    var d = function(d) {
        function u() {
            var e = null !== d && d.apply(this, arguments) || this;
            return e.lastLatexProp = "",
            e.wasFocusedLastUpdate = !1,
            e
        }
        return t.__extends(u, d),
        u.prototype.template = function() {
            var e = this;
            return 1 === this.children.length ? this.children[0] : a.createElement("div", {
                class: a.const("dcg-mq-container")
            }, a.createElement(l, {
                predicate: function() {
                    return e.getPlaceholder().trim().length > 0
                }
            }, function() {
                return a.createElement("span", {
                    class: a.const("dcg-mq-placeholder")
                }, a.createElement(r.default, {
                    config: function() {
                        return e.props.config()
                    },
                    latex: function() {
                        return e.getPlaceholder()
                    }
                }))
            }), a.createElement("div", {
                class: function() {
                    return {
                        "dcg-math-field": !0,
                        "dcg-no-fadeout": e.props.noFadeout && e.props.noFadeout(),
                        "dcg-invalid": e.props.hasError(),
                        "dcg-focus": e.props.isFocused()
                    }
                },
                didMount: function(t) {
                    return e.didMountMathquill(t)
                },
                "data-dcg-label": function() {
                    return e.props.dataLabelAttributeValue ? e.props.dataLabelAttributeValue() : void 0
                }
            }))
        }
        ,
        u.prototype.didMount = function() {
            1 === this.children.length && this.didMountMathquill(this.findRootNode())
        }
        ,
        u.prototype.willUnmount = function() {
            this.$mathField.off(".view"),
            this.mathField = void 0
        }
        ,
        u.prototype.getPlaceholder = function() {
            return this.props.placeholder ? this.props.isFocused() || this.props.latex() ? "" : this.props.placeholder() : ""
        }
        ,
        u.prototype.didMountMathquill = function(e) {
            var a = this
              , r = t.__assign(t.__assign({}, this.props.config()), {
                handlers: {
                    reflow: function(e) {
                        a.props.onReflow && a.mathField && a.props.onReflow(e)
                    }
                },
                onCut: function() {
                    a.mathField && a.props.onUserChangedLatex(a.mathField.latex())
                },
                onPaste: function() {
                    a.mathField && a.props.onUserChangedLatex(a.mathField.latex())
                },
                overrideTypedText: function(e) {
                    a.mathField && a.viewCanAcceptText(e) && (a.props.onUserTypedText ? a.props.onUserTypedText(e) : (a.mathField.typedText(e),
                    a.props.onUserChangedLatex(a.mathField.latex())))
                },
                overrideKeystroke: function(e, t) {
                    if ("Backspace" === e && t.preventDefault(),
                    a.mathField) {
                        if ("Spacebar" === e && a.props.disableSpace && a.props.disableSpace())
                            return t.preventDefault();
                        if (t.originalEvent) {
                            var o = i.lookup(t.originalEvent);
                            if ("Up" === o || "Down" === o || "Left" === o || "Right" === o || "Esc" === o) {
                                var n = [];
                                t.ctrlKey && n.push("Ctrl"),
                                t.metaKey && n.push("Meta"),
                                t.altKey && n.push("Alt"),
                                t.shiftKey && n.push("Shift"),
                                n.length ? (n.push(o),
                                e = n.join("-")) : e = o
                            }
                        }
                        a.props.onUserPressedKey ? a.props.onUserPressedKey(e, t) : (a.mathField.keystroke(e, t),
                        a.props.onUserChangedLatex(a.mathField.latex()))
                    }
                }
            });
            this.props.needsSystemKeypad && this.props.needsSystemKeypad() && (r.substituteTextarea = function() {
                return s('<textarea autocorrect="off" autocapitalize="none" spellcheck="false" autocomplete="off">')[0]
            }
            ),
            this.$mathField = s(e),
            this.mathField = n.MQ.MathField(e, r),
            e._mqMathFieldInstance = this.mathField,
            e._mqViewInstance = this,
            this.$mathField.on("focusin.view focusout.view", function(e) {
                return a.onFocusEvent(e)
            }).on("paste.view", function(e) {
                return a.onPasteEvent(e)
            }),
            (o.IS_IOS || o.IS_ANDROID) && this.$mathField.on("keypress.view", function(e) {
                return a.onKeypressEvent(e)
            }),
            this.hookupMQTapTouch(),
            this.updateMathquill()
        }
        ,
        u.prototype.didUpdate = function() {
            this.updateMathquill()
        }
        ,
        u.prototype.updateMathquill = function() {
            this.updateMathquillAria(),
            this.updateMathquillLatex(),
            this.updateMathquillFocused(),
            this.updateMathquillPostLabel()
        }
        ,
        u.prototype.onFocusEvent = function(e) {
            var t = this.isFocused();
            t !== this.shouldBeFocused() && this.props.onFocusedChanged(t, e)
        }
        ,
        u.prototype.onPasteEvent = function(e) {
            var t = ""
              , i = window.clipboardData
              , o = e.originalEvent;
            i && i.getData ? t = i.getData("Text") : o && o.clipboardData && o.clipboardData.getData && (t = o.clipboardData.getData("text/plain"));
            var a = this.viewCanAcceptText(t);
            return !a && this.props.onExpressionSizeExceeded && this.props.onExpressionSizeExceeded(),
            a
        }
        ,
        u.prototype.viewCanAcceptText = function(e) {
            return u.canAcceptText(this.mathField, this.props.capExpressionSize(), e)
        }
        ,
        u.canAcceptText = function(t, i, o) {
            if (!t)
                return !1;
            if (!i)
                return !0;
            var a = t.latex();
            return p.countLatexTokens(a) + p.countLatexTokens(o) <= e.EXPRESSION_TOKEN_LIMIT
        }
        ,
        u.prototype.onKeypressEvent = function(e) {
            if (e.stopPropagation(),
            e.preventDefault(),
            this.mathField) {
                var t = e.key && 1 === e.key.length ? e.key : void 0;
                t && this.viewCanAcceptText(t) && (this.props.onUserTypedText ? this.props.onUserTypedText(t) : (this.mathField.typedText(t),
                this.props.onUserChangedLatex(this.mathField.latex())))
            }
        }
        ,
        u.prototype.hookupMQTapTouch = function() {
            var e = this;
            this.$mathField.on("dcg-tap.view", function(t) {
                if ("touch" === t.device && e.mathField) {
                    var i = t.changedTouches[0];
                    e.mathField.clickAt(i.clientX, i.clientY, i.target),
                    e.isFocused() || e.mathField.focus();
                    var o = void 0;
                    setTimeout(function() {
                        o = Date.now()
                    }, 0),
                    e.mathField.ignoreNextMousedown(function() {
                        return void 0 === o || Date.now() - o < 500
                    })
                }
            })
        }
        ,
        u.prototype.updateMathquillAria = function() {
            if (this.mathField) {
                var e = this.props.getAriaLabel();
                e !== this.mathField.getAriaLabel() && this.mathField.setAriaLabel(e)
            }
        }
        ,
        u.prototype.updateMathquillPostLabel = function() {
            this.mathField && this.mathField.setAriaPostLabel(this.props.getAriaPostLabel(), this.props.hasError() ? 5e3 : 1e3)
        }
        ,
        u.prototype.updateMathquillLatex = function() {
            var t = this.props.latex();
            this.mathField && this.lastLatexProp !== t && (this.props.capExpressionSize() && p.countLatexTokens(t) > e.EXPRESSION_TOKEN_LIMIT || (this.lastLatexProp = t,
            this.mathField.latex() !== t && this.mathField.latex(t)))
        }
        ,
        u.prototype.updateMathquillFocused = function() {
            if (this.mathField) {
                var e = this.isFocused()
                  , t = this.shouldBeFocused();
                t && t !== this.wasFocusedLastUpdate && this.props.selectOnFocus && this.props.selectOnFocus() && this.mathField.select(),
                this.wasFocusedLastUpdate = t,
                e !== t && (t ? this.mathField.focus() : this.mathField.blur())
            }
        }
        ,
        u.prototype.isFocused = function() {
            return !(!document.activeElement || !s(document.activeElement).closest(this.$mathField).length)
        }
        ,
        u.prototype.shouldBeFocused = function() {
            return this.props.isFocused()
        }
        ,
        u.getFocusedMathquill = function() {
            if (document.activeElement) {
                var e = s(document.activeElement).closest(".dcg-mq-editable-field")[0];
                return e ? e._mqMathFieldInstance : void 0
            }
        }
        ,
        u.getMQViewInstance = function(e) {
            var t = e.el();
            return t ? t._mqViewInstance : void 0
        }
        ,
        u.applyArrowKeyAndReturnIfWasAtBounds = function(e, t, i) {
            var o = s(e.el())
              , a = o.find(".dcg-mq-selection")
              , n = 1 === a.length && a.parent().parent()[0] === o[0] && 1 === a.parent().children().length;
            if (("Up" === t || "Down" === t) && n)
                return e.keystroke(t, i),
                !0;
            var r = o.find(".dcg-mq-cursor")[0];
            if (!r)
                return e.keystroke(t, i),
                !1;
            var p = r.previousSibling || r.parentElement;
            return e.keystroke(t, i),
            p === (r.previousSibling || r.parentElement)
        }
        ,
        u.simulateKeypress = function(e, t) {
            var i = u.getMQViewInstance(e);
            i && (i.props.onUserPressedKey ? i.props.onUserPressedKey(t) : (e.keystroke(t),
            i.props.onUserChangedLatex(e.latex())))
        }
        ,
        u.simulateUserChangedLatex = function(e) {
            var t = u.getMQViewInstance(e);
            t && t.mathField && t.props.onUserChangedLatex(t.mathField.latex())
        }
        ,
        u.handleKeystrokeAndDecideIfSpecialEvent = function(e, t, i) {
            return "Enter" === t || ("Delete" === t && "" === e.latex() || ("Backspace" === t && "" === e.latex() || ("Up" === t || "Down" === t || "Left" === t || "Right" === t ? u.applyArrowKeyAndReturnIfWasAtBounds(e, t, i) : (e.keystroke(t, i),
            !1))))
        }
        ,
        u
    }(a.Class);
    e.default = d
});
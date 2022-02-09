
define('shared-components/mathquill-braille-wrapper', ["require", "exports", "tslib", "lib/i18n", "jquery", "abraham", "dcgview", "./braille-input", "./tooltip", "loadcss!./Abraham", "loadcss!./mathquill-braille-wrapper"], function(require, t, e, r, i, o, n, l, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.brailleInputIsEmpty = t.getFocusedBrailleElement = void 0;
    var s = n.Components.If
      , p = function(t) {
        function i() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(i, t),
        i.prototype.init = function() {
            this.currentBrailleValue = this.getBrailleFromLatex(this.props.latex()),
            this.currentBrailleMode = this.props.mode(),
            this.hasTranslationError = !1,
            this.currentLatex = this.props.latex()
        }
        ,
        i.prototype.isFocused = function() {
            return void 0 !== this.brailleInput && document.activeElement == this.brailleInput
        }
        ,
        i.prototype.getBrailleShouldFocus = function() {
            return "none" !== this.props.mode() && this.props.brailleShouldFocus && this.props.brailleShouldFocus()
        }
        ,
        i.prototype.isStatic = function() {
            return !!this.props.isStatic && this.props.isStatic()
        }
        ,
        i.prototype.isInline = function() {
            return !!this.props.isInline && this.props.isInline()
        }
        ,
        i.prototype.hasError = function() {
            return !!this.props.hasError && this.props.hasError()
        }
        ,
        i.prototype.willUpdate = function() {
            var t = this.currentLatex !== this.props.latex()
              , e = this.props.mode()
              , r = e !== this.currentBrailleMode && "none" !== e;
            (!this.isFocused() || t || r) && (this.currentLatex = this.props.latex(),
            (r || !this.hasTranslationError || t || this.isStatic()) && (this.currentBrailleValue = this.getBrailleFromLatex(this.props.latex()),
            this.hasTranslationError = !1),
            this.currentBrailleMode = e)
        }
        ,
        i.prototype.onBrailleInput = function(t) {
            if (this.props.onBrailleInput) {
                var e = this.getLatexFromBraille(t);
                this.hasTranslationError = e.isError;
                var r = this.props.capExpressionSize && this.props.capExpressionSize();
                !e.isError && r && r.exceedsLimit(e.value) ? r.onExpressionSizeExceeded() : (this.currentBrailleValue = t,
                e.isError || (this.currentLatex = e.value,
                this.props.onBrailleInput(e.value)))
            }
        }
        ,
        i.prototype.getBrailleFromLatex = function(t, e) {
            void 0 === e && (e = !1);
            var r = function(t, e) {
                return "nemeth" === e ? o.latexToNemeth(t) : "ueb" === e ? o.latexToUeb(t) : {
                    isError: !0,
                    error: "Braille mode should be 'nemeth' or 'ueb'"
                }
            }(t, this.props.mode());
            return r.isError ? "" : e ? r.value : o.UnicodeBraille.toExpandedBrailleAscii(r.value)
        }
        ,
        i.prototype.getLatexFromBraille = function(t) {
            return function(t, e) {
                return "nemeth" === e ? o.nemethToLatex(t) : "ueb" === e ? o.uebToLatex(t) : {
                    isError: !0,
                    error: "Braille mode should be 'nemeth' or 'ueb'"
                }
            }(o.UnicodeBraille.coerceToSixDotCells(t), this.props.mode())
        }
        ,
        i.prototype.getBrailleLabel = function(t) {
            return this.getBrailleFromLatex(t.replace(/\s/, "\\ "))
        }
        ,
        i.prototype.shouldShowBraille = function() {
            var t = this.props.mode();
            return "nemeth" === t || "ueb" === t
        }
        ,
        i.prototype.isOverflowingLeft = function() {
            return !!this.brailleInput && this.brailleInput.scrollLeft > 0
        }
        ,
        i.prototype.isOverflowingRight = function() {
            if (!this.brailleInput)
                return !1;
            var t = this.brailleInput.getBoundingClientRect().width;
            return this.brailleInput.scrollWidth > t + this.brailleInput.scrollLeft + 2
        }
        ,
        i.prototype.didMountBrailleInput = function(t) {
            this.brailleInput = t
        }
        ,
        i.prototype.didUnmountBrailleInput = function() {
            this.brailleInput = void 0
        }
        ,
        i.prototype.getTooltipGravity = function() {
            var t = this.props.tooltipOptions && this.props.tooltipOptions();
            return t && t.gravity ? t.gravity : "se"
        }
        ,
        i.prototype.getTooltipDelay = function() {
            var t = this.props.tooltipOptions && this.props.tooltipOptions();
            return t && t.delay ? t.delay : 0
        }
        ,
        i.prototype.handleBrailleFocusChanged = function(t, e) {
            this.props.onBrailleFocusedChanged && this.props.onBrailleFocusedChanged(t, e),
            this.brailleInput && (t && this.props.selectOnFocus && this.props.selectOnFocus() && this.brailleInput.select(),
            this.isStatic() && this.brailleInput.scrollTo(0, 0))
        }
        ,
        i.prototype.getTooltipText = function() {
            var t = this.props.placeholder && !this.isFocused() ? this.props.placeholder() : "";
            return r.raw(this.props.latex() || t)
        }
        ,
        i.prototype.template = function() {
            var t = this;
            return n.createElement("div", {
                class: n.const("dcg-mathquill-wrapper")
            }, n.createElement(s, {
                predicate: function() {
                    return t.shouldShowBraille()
                }
            }, function() {
                return n.createElement("div", {
                    class: function() {
                        return {
                            "dcg-mathquill-braille": !0,
                            "dcg-focus": t.getBrailleShouldFocus(),
                            "dcg-invalid": t.hasError(),
                            "dcg-mathquill-static-braille": t.isStatic(),
                            "dcg-mathquill-braille-overflow-left": t.isOverflowingLeft(),
                            "dcg-mathquill-braille-overflow-right": t.isOverflowingRight()
                        }
                    },
                    "data-dcg-limit": function() {
                        return t.props.dataDCGLimit ? t.props.dataDCGLimit() : void 0
                    },
                    "data-dcg-label": function() {
                        return t.props.dataLabelAttributeValue ? t.props.dataLabelAttributeValue() : void 0
                    }
                }, n.createElement(a.Tooltip, {
                    class: t.const("dcg-mathquill-braille-tooltip"),
                    renderAsLatex: function() {
                        return {
                            view: t.props.tooltipOptions().latexView
                        }
                    },
                    tooltip: function() {
                        return t.getTooltipText()
                    },
                    gravity: t.bindFn(t.getTooltipGravity),
                    delay: t.bindFn(t.getTooltipDelay),
                    showOnTapstart: t.const(!0)
                }, n.createElement(s, {
                    predicate: function() {
                        return t.isInline()
                    }
                }, function() {
                    return n.createElement("span", {
                        class: n.const("dcg-inline-braille")
                    }, function() {
                        return r.raw(t.getBrailleFromLatex(t.props.latex(), !0))
                    })
                }), n.createElement(s, {
                    predicate: function() {
                        return !t.isInline()
                    }
                }, function() {
                    return n.createElement(l.default, {
                        ariaLabel: function() {
                            return r.raw(t.props.ariaLabel ? t.getBrailleLabel(t.props.ariaLabel()) : "")
                        },
                        didMount: t.bindFn(t.didMountBrailleInput),
                        didUnmount: t.bindFn(t.didUnmountBrailleInput),
                        onFocusedChanged: t.bindFn(t.handleBrailleFocusChanged),
                        shouldFocus: t.bindFn(t.getBrailleShouldFocus),
                        onKeydown: t.props.onBrailleKeydown,
                        onInput: t.bindFn(t.onBrailleInput),
                        sixKeyInput: t.props.sixKeyInput,
                        value: function() {
                            return t.currentBrailleValue
                        },
                        placeholder: function() {
                            return r.raw(t.props.placeholder ? t.getBrailleFromLatex(t.props.placeholder()) : "")
                        },
                        tabindex: function() {
                            return t.props.tabindex ? t.props.tabindex() : 0
                        },
                        isStatic: t.bindFn(t.isStatic),
                        size: function() {
                            return t.currentBrailleValue && t.currentBrailleValue.length || 1
                        }
                    })
                })))
            }), n.createElement("div", {
                class: n.const("dcg-typeset-math"),
                style: function() {
                    return {
                        display: t.shouldShowBraille() && !t.isInline() ? "none" : void 0
                    }
                },
                "aria-hidden": function() {
                    return t.shouldShowBraille()
                }
            }, this.children))
        }
        ,
        i
    }(n.Class);
    t.default = p,
    t.getFocusedBrailleElement = function() {
        if (document.activeElement && i(document.activeElement).hasClass("dcg-braille-input"))
            return document.activeElement
    }
    ,
    t.brailleInputIsEmpty = function(t) {
        return !t || "" === i(t).val()
    }
});
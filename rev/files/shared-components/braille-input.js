define('shared-components/braille-input', ["require", "exports", "tslib", "lib/i18n", "dcgview", "jquery"], function(require, t, o, e, s, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = s.Components.Input
      , r = function(t) {
        function r() {
            return null !== t && t.apply(this, arguments) || this
        }
        return o.__extends(r, t),
        r.prototype.init = function() {
            var t;
            for (this.ASCIICharacters = " A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=",
            this.ASCIITable = [],
            this.HomeRowCharacters = "FDSJKL",
            this.charCodes = [],
            this.sixKeyModel = {
                keysDown: 0,
                stickyKeysDown: 0
            },
            t = 0; t < this.ASCIICharacters.length; t++)
                this.ASCIITable.push(this.ASCIICharacters.charCodeAt(t));
            for (t = 0; t < this.HomeRowCharacters.length; t++)
                this.charCodes.push(this.HomeRowCharacters.charCodeAt(t))
        }
        ,
        r.prototype.template = function() {
            var t = this;
            return s.createElement(n, {
                class: this.const("dcg-braille-input dcg-do-blur"),
                tabindex: function() {
                    return t.props.tabindex ? t.props.tabindex() : 0
                },
                readonly: function() {
                    return t.props.isStatic() ? "true" : void 0
                },
                autocomplete: this.const("off"),
                autocorrect: this.const("off"),
                autocapitalize: this.const("off"),
                spellcheck: this.const("false"),
                onKeydown: this.bindFn(this.onKeydown),
                onKeyup: this.bindFn(this.onKeyup),
                onInput: this.bindFn(this.props.onInput),
                value: function() {
                    return t.props.value()
                },
                "aria-label": function() {
                    return t.props.ariaLabel() || e.raw("")
                },
                didMount: this.bindFn(this.didMount),
                didUnmount: this.bindFn(this.props.didUnmount),
                placeholder: function() {
                    return t.props.placeholder ? t.props.placeholder() : ""
                },
                size: function() {
                    return t.props.size && t.props.size()
                }
            })
        }
        ,
        r.prototype.didMount = function(t) {
            var o = this;
            this.rootNode = t,
            i(this.rootNode).on("focus", function(t) {
                o.props.shouldFocus() || o.props.onFocusedChanged(!0, t.originalEvent || t)
            }).on("blur", function(t) {
                o.props.shouldFocus() && o.props.onFocusedChanged(!1, t.originalEvent || t)
            }),
            this.props.didMount(t),
            this.updateFocus()
        }
        ,
        r.prototype.didUpdate = function() {
            this.updateFocus()
        }
        ,
        r.prototype.updateFocus = function() {
            this.rootNode && (this.props.shouldFocus() && document.activeElement !== this.rootNode && this.rootNode.focus(),
            this.props.shouldFocus() || document.activeElement !== this.rootNode || this.rootNode.blur())
        }
        ,
        r.prototype.onKeydown = function(t) {
            var e = this.charCodes.indexOf(t.which);
            this.props.isStatic() || !this.isSixKeyInput() || t.altKey || t.ctrlKey || t.metaKey || t.shiftKey || -1 === e ? this.props.onKeydown && this.props.onKeydown(t) : (this.sixKeyModel = o.__assign(o.__assign({}, this.sixKeyModel), {
                keysDown: this.addKey(this.sixKeyModel.keysDown, e),
                stickyKeysDown: this.addKey(this.sixKeyModel.stickyKeysDown, e)
            }),
            t.preventDefault())
        }
        ,
        r.prototype.onKeyup = function(t) {
            var e = this.charCodes.indexOf(t.which)
              , s = !1;
            return this.props.isStatic() || !this.isSixKeyInput() || t.altKey || t.ctrlKey || t.metaKey || t.shiftKey || -1 === e ? s = !0 : (this.sixKeyModel = o.__assign(o.__assign({}, this.sixKeyModel), {
                keysDown: this.removeKey(this.sixKeyModel.keysDown, e)
            }),
            0 === this.sixKeyModel.keysDown && (this.addCharacter(this.bitsToASCII(this.sixKeyModel.stickyKeysDown)),
            this.sixKeyModel = o.__assign(o.__assign({}, this.sixKeyModel), {
                stickyKeysDown: 0
            }))),
            s || t.preventDefault(),
            s
        }
        ,
        r.prototype.addKey = function(t, o) {
            return t | 1 << o
        }
        ,
        r.prototype.removeKey = function(t, o) {
            return t & ~(1 << o)
        }
        ,
        r.prototype.bitsToASCII = function(t) {
            return String.fromCharCode(this.ASCIITable[t])
        }
        ,
        r.prototype.addCharacter = function(t) {
            this.rootNode && !this.props.isStatic() && (this.rootNode.setRangeText(t, this.rootNode.selectionStart, this.rootNode.selectionEnd, "end"),
            this.props.onInput(this.rootNode.value))
        }
        ,
        r.prototype.isSixKeyInput = function() {
            return "function" == typeof this.props.sixKeyInput && this.props.sixKeyInput()
        }
        ,
        r
    }(s.Class);
    t.default = r
});

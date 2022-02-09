define('basic/keypad/fourfunction-keypad', ["require", "exports", "tslib", "dcgview", "basic/dcgview-basic", "keypad/keys", "keypad/keypad", "keypad/row"], function(require, t, e, i, l, n, s, h) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = function(t) {
        function l() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(l, t),
        l.prototype.template = function() {
            var t = this;
            return i.createElement("div", {
                role: i.const("group"),
                "aria-label": function() {
                    return t.s("basic-calculator-narration-keypad")
                }
            }, i.createElement(s.default, {
                controller: this.props.controller
            }, i.createElement(h.default, null, n.view(this, "(", {
                colspan: this.parenColspan()
            }), n.view(this, ")", {
                colspan: this.parenColspan()
            }), this.makeAdditionalFunctionKey(0), this.makeAdditionalFunctionKey(1), n.view(this, "division")), i.createElement(h.default, null, n.view(this, "7", {
                style: "highlight"
            }), n.view(this, "8", {
                style: "highlight"
            }), n.view(this, "9", {
                style: "highlight"
            }), n.view(this, "multiplication")), i.createElement(h.default, null, n.view(this, "4", {
                style: "highlight"
            }), n.view(this, "5", {
                style: "highlight"
            }), n.view(this, "6", {
                style: "highlight"
            }), n.view(this, "-")), i.createElement(h.default, null, n.view(this, "1", {
                style: "highlight"
            }), n.view(this, "2", {
                style: "highlight"
            }), n.view(this, "3", {
                style: "highlight"
            }), n.view(this, "+")), i.createElement(h.default, null, n.view(this, "0", {
                style: "highlight"
            }), n.view(this, ".", {
                style: "highlight"
            }), n.view(this, "ans"), n.view(this, "enter", {
                style: "blue"
            }))))
        }
        ,
        l.prototype.parenColspan = function() {
            return this.controller.getAdditionalFunctions().length > 1 ? .5 : 1
        }
        ,
        l.prototype.makeAdditionalFunctionKey = function(t) {
            var e = this.controller.getAdditionalFunctions()[t];
            return "exponent" === e ? n.view(this, "a^b") : "percent" === e ? n.view(this, "%") : "sqrt" === e ? n.view(this, "sqrt") : "fraction" === e ? n.view(this, "a/b") : void 0
        }
        ,
        l
    }(l.DCGViewBasic);
    t.default = a
});
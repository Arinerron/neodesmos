define('dcgview-helpers/mathquill-proxy', ["require", "exports", "dcgview-helpers/mathquill-view"], function(require, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.MathQuillProxy = void 0;
    var o = function() {
        function t(t) {
            this.mq = t,
            this.id = t.id,
            this.data = t.data
        }
        return t.prototype.simulateUserChangedLatex = function() {
            e.default.simulateUserChangedLatex(this.mq)
        }
        ,
        t.prototype.simulateKeypress = function(t) {
            e.default.simulateKeypress(this.mq, t)
        }
        ,
        t.prototype.latex = function(t) {
            return void 0 === t ? this.mq.latex() : (this.mq.latex(t),
            void this.simulateUserChangedLatex())
        }
        ,
        t.prototype.reflow = function() {
            this.mq.reflow()
        }
        ,
        t.prototype.el = function() {
            return this.mq.el()
        }
        ,
        t.prototype.getAriaLabel = function() {
            return this.mq.getAriaLabel()
        }
        ,
        t.prototype.setAriaLabel = function(t) {
            return this.mq.setAriaLabel(t)
        }
        ,
        t.prototype.html = function() {
            return this.mq.html()
        }
        ,
        t.prototype.mathspeak = function() {
            return this.mq.mathspeak()
        }
        ,
        t.prototype.select = function() {
            this.mq.select()
        }
        ,
        t.prototype.moveToRightEnd = function() {
            this.mq.moveToRightEnd()
        }
        ,
        t.prototype.cmd = function(t) {
            this.mq.cmd(t),
            this.simulateUserChangedLatex()
        }
        ,
        t.prototype.write = function(t) {
            this.mq.write(t),
            this.simulateUserChangedLatex()
        }
        ,
        t.prototype.keystroke = function(t) {
            this.simulateKeypress(t)
        }
        ,
        t.prototype.typedText = function(t) {
            this.mq.typedText(t),
            this.simulateUserChangedLatex()
        }
        ,
        t.prototype.clearSelection = function() {
            this.mq.clearSelection()
        }
        ,
        t.prototype.getAriaPostLabel = function() {
            return this.mq.getAriaPostLabel()
        }
        ,
        t.prototype.setAriaPostLabel = function(t, e) {
            this.mq.setAriaPostLabel(t, e)
        }
        ,
        t.prototype.blur = function() {
            this.mq.blur()
        }
        ,
        t.prototype.focus = function() {
            this.mq.focus()
        }
        ,
        t.prototype.revert = function() {
            this.mq.revert()
        }
        ,
        t.prototype.ignoreNextMousedown = function(t) {
            this.mq.ignoreNextMousedown(t)
        }
        ,
        t.prototype.clickAt = function(t, e, o) {
            this.mq.clickAt(t, e, o)
        }
        ,
        t
    }();
    t.MathQuillProxy = o
});
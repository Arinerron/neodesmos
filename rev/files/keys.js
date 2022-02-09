
define('keys', ['require', 'browser'], function(require) {
    var t = require("browser");
    return new function() {
        for (var e = {
            8: this.BACKSPACE = "Backspace",
            9: this.TAB = "Tab",
            13: this.ENTER = "Enter",
            16: this.SHIFT = "Shift",
            17: this.CONTROL = "Control",
            18: this.ALT = "Alt",
            20: this.CAPSLOCK = "CapsLock",
            27: this.ESCAPE = "Esc",
            32: this.SPACEBAR = "Space",
            33: this.PAGEUP = "PageUp",
            34: this.PAGEDOWN = "PageDown",
            35: this.END = "End",
            36: this.HOME = "Home",
            37: this.LEFT = "Left",
            38: this.UP = "Up",
            39: this.RIGHT = "Right",
            40: this.DOWN = "Down",
            46: this.DELETE = "Del"
        }, i = {
            Backspace: this.BACKSPACE,
            Tab: this.TAB,
            Enter: this.ENTER,
            Shift: this.SHIFT,
            Control: this.CONTROL,
            Alt: this.ALT,
            CapsLock: this.CAPSLOCK,
            Escape: this.ESCAPE,
            " ": this.SPACEBAR,
            PageUp: this.PAGEUP,
            PageDown: this.PAGEDOWN,
            End: this.END,
            Home: this.HOME,
            ArrowLeft: this.LEFT,
            ArrowUp: this.UP,
            ArrowRight: this.RIGHT,
            ArrowDown: this.DOWN,
            Delete: this.DELETE
        }, h = {
            UIKeyInputUpArrow: this.UP,
            UIKeyInputDownArrow: this.DOWN,
            UIKeyInputLeftArrow: this.LEFT,
            UIKeyInputRightArrow: this.RIGHT,
            UIKeyInputEscape: this.ESCAPE,
            UIKeyInputPageUp: this.PAGEUP,
            UIKeyInputPageDown: this.PAGEDOWN
        }, s = ["0123456789abcdefghijklmnopqrstuvwxyz", "º¡™£¢∞§¶•ªå∫ç∂ ƒ©˙ ∆˚¬µ øπœ®ß† √∑≈¥Ω", "‚⁄€‹›ﬁﬂ‡°·ÅıÇÎ´Ï˝ÓˆÔÒÂ˜Ø∏Œ‰Íˇ¨◊„˛Á¸"].map(function(t) {
            return t.split("")
        }), r = s[0], n = s[1], o = s[2], y = {}, a = {}, E = 0; E < r.length; E++) {
            var c = r[E];
            " " !== n[E] && (y[n[E]] = c.toUpperCase()),
            " " !== o[E] && (a[o[E]] = c.toUpperCase())
        }
        this.isUndo = function(t) {
            return !t.altKey && !t.shiftKey && (t.ctrlKey || t.metaKey) && ("z" == t.key || 90 == t.which)
        }
        ,
        this.isRedo = function(t) {
            return !t.altKey && (t.ctrlKey || t.metaKey) && ("y" === t.key || 89 == t.which || t.shiftKey && ("Z" === t.key || "z" === t.key || 90 === t.which))
        }
        ,
        this.isSelectAll = function(t) {
            return !t.altKey && (t.ctrlKey || t.metaKey) && ("a" === t.key || "A" === t.key || 65 == t.which)
        }
        ,
        this.isBacktick = function(t) {
            return !(t.altKey || t.ctrlKey || t.metaKey || t.shiftKey || "`" !== t.key && 192 != t.which)
        }
        ,
        this.isHelp = function(t) {
            return !t.altKey && (t.ctrlKey || t.metaKey) && ("/" === t.key || 191 == t.which)
        }
        ,
        this.lookup = function(t) {
            return i[t.key] || e[t.which] || h[t.key]
        }
        ,
        this.lookupChar = function(e) {
            if (!e.key)
                return String.fromCharCode(e.which);
            if (t.IS_APPLE && e.altKey) {
                var i = e.shiftKey ? a : y;
                if (i[e.key])
                    return i[e.key]
            }
            return 1 === e.key.length ? e.key.toUpperCase() : "Enter" === e.key ? String.fromCharCode(13) : "Tab" === e.key ? String.fromCharCode(9) : void 0
        }
    }
});
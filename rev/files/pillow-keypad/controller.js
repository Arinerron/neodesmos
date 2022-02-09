define('pillow-keypad/controller', ["require", "exports", "flux", "keypad/mq-commands", "lib/i18n", "dcgview-helpers/mathquill-view"], function(require, e, t, a, i, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = function() {
        function e(e) {
            var a = this;
            this.keypadType = "scientific",
            this.scientificKeyboardMode = "main",
            this.dispatcher = new t.Dispatcher,
            this.s = i.createDictionaryLookupFunction(function() {
                return "en"
            }),
            this.dispatch = function(e) {
                var t;
                for (a.dispatcher.dispatch(e); t = a._queuedCallbacks.shift(); )
                    t()
            }
            ,
            this._queuedCallbacks = [],
            this.keypadType = null != e ? e : "scientific",
            this.dispatcher = new t.Dispatcher,
            this.hookUpDispatcher()
        }
        return e.prototype.getBackgroundColor = function() {
            return "does-not-matter"
        }
        ,
        e.prototype.runAfterDispatch = function(e) {
            this._queuedCallbacks.push(e)
        }
        ,
        e.prototype.enqueueEvent = function(e) {
            var t = this;
            this.runAfterDispatch(function() {
                t.onEventEmitted && t.onEventEmitted(e)
            })
        }
        ,
        e.prototype.getKeypadType = function() {
            return this.keypadType
        }
        ,
        e.prototype.getScientificKeyboardMode = function() {
            return this.scientificKeyboardMode
        }
        ,
        e.prototype.updateKeyboardMode = function(e) {
            this.scientificKeyboardMode = e
        }
        ,
        e.prototype.typeIntoFocusedMathquill = function(e) {
            e = e.replace(/\r|\n/g, "");
            var t = this.activeMQ;
            t && (t.typedText(e),
            n.default.simulateUserChangedLatex(t))
        }
        ,
        e.prototype.pressKeyInFocusedMathquill = function(e, t) {
            var a = this.activeMQ;
            if (a)
                return "Enter" === e ? (t && (t.preventDefault(),
                t.stopPropagation()),
                void this.enqueueEvent("enter")) : void a.keystroke(e, t)
        }
        ,
        e.prototype.executeCommandInFocusedMathquill = function(e) {
            var t = this.activeMQ;
            t && a.execute(t, e)
        }
        ,
        e.prototype.hookUpDispatcher = function() {
            var e = this;
            this.dispatcher.register(function(t) {
                switch (e.enqueueEvent("render"),
                t.type) {
                case "hide-keypad":
                    e.enqueueEvent("hide-keypad");
                    break;
                case "set-active-mq":
                    e.activeMQ = t.mq;
                    break;
                case "set-keypad-type":
                    e.keypadType = t.keypadType;
                    break;
                case "keypad/shift":
                    e.updateKeyboardMode("capitalQwerty" === e.scientificKeyboardMode ? "qwerty" : "capitalQwerty");
                    break;
                case "main":
                    e.updateKeyboardMode("main");
                    break;
                case "ABC":
                    e.updateKeyboardMode("qwerty");
                    break;
                case "functions":
                    e.updateKeyboardMode("functions");
                    break;
                case "keypad/type-text":
                    e.typeIntoFocusedMathquill(t.text);
                    break;
                case "keypad/press-key":
                    e.pressKeyInFocusedMathquill(t.key, t.evt);
                    break;
                case "keypad/custom-command":
                    e.executeCommandInFocusedMathquill(t.command);
                    break;
                case "keypad/123":
                case "keypad/abc":
                case "keypad/audio-trace":
                    break;
                default:
                    return t
                }
            })
        }
        ,
        e
    }();
    e.default = o
});
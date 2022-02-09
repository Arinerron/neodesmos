
define('lib/state-stack', ["require", "exports"], function(require, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function() {
        function t(t) {
            void 0 === t && (t = 100),
            this.clear(),
            this._sizeLimit = t
        }
        return t.prototype.clear = function() {
            this._stack = [],
            this._stackPointer = -1
        }
        ,
        t.prototype.getState = function() {
            return this._stack[this._stackPointer]
        }
        ,
        t.prototype.serializeForBugsnag = function() {
            function t(t) {
                try {
                    return JSON.stringify(t, null, 2)
                } catch (t) {
                    return "[[could not jsonify]]"
                }
            }
            return {
                currentState: t(this._stack[this._stackPointer]),
                undoState: t(this._stack[this._stackPointer - 1]),
                redoState: t(this._stack[this._stackPointer + 1])
            }
        }
        ,
        t.prototype.addState = function(t) {
            this.canRedo() && this._stack.splice(this._stackPointer + 1),
            this._stack.push(t),
            this._stack.length > this._sizeLimit && this._stack.shift(),
            this._stackPointer = this._stack.length - 1
        }
        ,
        t.prototype.replaceState = function(t) {
            this.canRedo() && this._stack.splice(this._stackPointer + 1),
            this.replaceInteriorState(t)
        }
        ,
        t.prototype.replaceInteriorState = function(t) {
            0 === this._stack.length ? (this._stack.push(t),
            this._stackPointer = 0) : this._stack[this._stackPointer] = t
        }
        ,
        t.prototype.canUndo = function() {
            return this._stackPointer > 0
        }
        ,
        t.prototype.canRedo = function() {
            return this._stackPointer < this._stack.length - 1
        }
        ,
        t.prototype.undo = function() {
            this.canUndo() && (this._stackPointer -= 1)
        }
        ,
        t.prototype.redo = function() {
            this.canRedo() && (this._stackPointer += 1)
        }
        ,
        t
    }();
    t.default = i
});
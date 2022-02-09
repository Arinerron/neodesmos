define('api/pillow-keypad', ["require", "exports", "tslib", "dcgview", "./abstract", "pillow-keypad/controller", "pillow-keypad/main"], function(require, t, e, o, n, i, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var p = function(t) {
        function n(e, o) {
            var i = t.call(this, e) || this;
            return i instanceof n ? (i.init(o),
            i) : new n(e,o)
        }
        return e.__extends(n, t),
        n.prototype.init = function(t) {
            var e = this;
            this.controller = new i.default(t),
            this.controller.onEventEmitted = function(t) {
                "render" === t && e.updateView(),
                e.triggerEvent(t, void 0)
            }
            ,
            this.setupDomChangeDetector(!0)
        }
        ,
        n.prototype.setActiveMathquill = function(t) {
            this.controller.dispatch({
                type: "set-active-mq",
                mq: t
            })
        }
        ,
        n.prototype.setKeypadType = function(t) {
            this.controller.dispatch({
                type: "set-keypad-type",
                keypadType: t
            })
        }
        ,
        n.prototype.onCreateView = function() {
            return o.mountToNode(r.default, this.rootElt, {
                controller: o.const(this.controller)
            })
        }
        ,
        n.prototype.onResizeView = function(t) {}
        ,
        n.prototype.onDestroyView = function() {
            o.unmountFromNode(this.rootElt)
        }
        ,
        n.prototype.destroy = function() {
            t.prototype.destroy.call(this)
        }
        ,
        n
    }(n.default);
    t.default = p
});

define('lib/evt-delegator', ["require", "exports", "jquery", "underscore"], function(require, e, n, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.Delegator = void 0;
    var t = function() {
        function e() {
            var e = this;
            this.handlers = [],
            n(document).on("keydown.delegator", function(n) {
                return e.handleEvent(n)
            })
        }
        return e.prototype.push = function(e) {
            var n = this
              , t = r.uniqueId("delegator_");
            return this.handlers.push({
                token: t,
                handler: e
            }),
            function() {
                return n.handlers = r.filter(n.handlers, function(e) {
                    return e.token != t
                })
            }
        }
        ,
        e.prototype.handleEvent = function(e) {
            if (!e.isDefaultPrevented() && this.handlers.length)
                for (var n = !1, r = function() {
                    return n = !0
                }, t = 0, o = this.handlers.slice().reverse(); t < o.length; t++) {
                    if ((0,
                    o[t].handler)(e, r),
                    n)
                        return
                }
        }
        ,
        e
    }();
    e.Delegator = new t
});
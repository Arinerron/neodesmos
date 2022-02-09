
define('main/shared-clock-bus', ["require", "exports", "main/raf-loop", "underscore_model"], function(require, e, n, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.unsubscribe = e.subscribe = void 0;
    var i = new r.UnderscoreModel;
    n(function(e) {
        i.triggerEvent("tick", e)
    });
    var t = 0;
    e.subscribe = function(e) {
        return t += 1,
        i.observeEvent("tick." + t, function(n, r) {
            e(r)
        }),
        t
    }
    ,
    e.unsubscribe = function(e) {
        i.unobserveEvent("tick." + e)
    }
});
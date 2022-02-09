define('lib/underscore-shim', ["require", "exports", "underscore_model"], function(require, e, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.UnderscoreModelShim = void 0;
    var t = function() {
        function e() {
            this.model = new o.UnderscoreModel
        }
        return e.prototype.triggerEvent = function(e, o) {
            this.model.triggerEvent(e, o)
        }
        ,
        e.prototype.observeEvent = function(e, o) {
            this.model.observeEvent(e, o)
        }
        ,
        e.prototype.unobserveEvent = function(e) {
            this.model.unobserveEvent(e)
        }
        ,
        e.prototype.setProperty = function(e, o) {
            this[e] = o,
            this.model.setProperty(e, o)
        }
        ,
        e.prototype.observe = function(e, o) {
            this.model.observe(e, o)
        }
        ,
        e.prototype.observeAndSync = function(e, o) {
            this.model.observeAndSync(e, o)
        }
        ,
        e.prototype.unobserve = function(e) {
            this.model.unobserve(e)
        }
        ,
        e
    }();
    e.UnderscoreModelShim = t
});
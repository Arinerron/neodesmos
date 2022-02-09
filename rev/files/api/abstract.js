define('api/abstract', ["require", "exports", "lib/console", "underscore_model", "ipad.scrollfix", "lib/dom-change-detector"], function(require, e, t, o, n, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(e) {
            if (this.rootElt = e,
            this.eventModel = new o.UnderscoreModel,
            !e)
                throw new Error("must pass an HTMLElement to the API")
        }
        return e.prototype.setupDomChangeDetector = function(e) {
            var t = this;
            this.autoSize = e,
            n.limitScrollOnElement(this.rootElt),
            this.domChangeDetector = new i.default(this.rootElt,function(e) {
                switch (e.type) {
                case "added":
                    t.view = t.onCreateView(),
                    t.onResizeView(e.size);
                    break;
                case "removed":
                    t.onDestroyView(),
                    t.view = void 0;
                    break;
                case "resized":
                    t.onResizeView(e.size)
                }
            }
            ),
            !1 !== this.autoSize ? this.domChangeDetector.startWatching() : this.domChangeDetector.checkForChanges()
        }
        ,
        e.prototype.detach = function() {
            t.warn(".detach() is deprecated. It should no longer be necessary")
        }
        ,
        e.prototype.destroy = function() {
            function e(e) {
                t.warn("You've destroyed this API instance. You can no longer call ." + e + "()")
            }
            for (var o in this.view && this.onDestroyView(),
            this.domChangeDetector.destroy(),
            this)
                "function" == typeof this[o] ? this[o] = e.bind(this, o) : this.hasOwnProperty(o) && delete this[o];
            this.destroy = function() {}
        }
        ,
        e.prototype.resize = function() {
            this.domChangeDetector.checkForChanges()
        }
        ,
        e.prototype.updateView = function() {
            this.view && document.body && document.body.contains(this.rootElt) && this.view.update()
        }
        ,
        e.prototype.triggerEvent = function(e, t) {
            this.eventModel.triggerEvent(e, t)
        }
        ,
        e.prototype.observeEvent = function(e, t) {
            this.eventModel.observeEvent(e, t)
        }
        ,
        e.prototype.unobserveEvent = function(e) {
            this.eventModel.unobserveEvent(e)
        }
        ,
        e
    }();
    e.default = r
});
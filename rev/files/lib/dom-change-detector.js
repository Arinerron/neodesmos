define('lib/dom-change-detector', ["require", "exports", "tslib", "jquery"], function(require, t, e, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.checkAllWatchingDetectors = t.testFixture = void 0;
    var s = 1
      , h = {}
      , n = !1;
    function r() {
        n = !0,
        requestAnimationFrame(d)
    }
    function d() {
        for (var e in t.testFixture.rafSPY && t.testFixture.rafSPY(),
        n = !1,
        h)
            h[e].detectAndEnqueueEvent(),
            n = !0;
        if (n)
            for (var e in r(),
            h)
                h[e].dispatchQueuedEvent()
    }
    t.testFixture = {},
    t.checkAllWatchingDetectors = d;
    var a = function() {
        function t(t, e) {
            this.elt = t,
            this.cb = e,
            this.destroyed = !1,
            this.lastOffscreen = !1,
            this.id = s.toString(),
            this.appliedScale = {
                x: 1,
                y: 1
            },
            s++
        }
        return t.prototype.stopWatching = function() {
            delete h[this.id]
        }
        ,
        t.prototype.startWatching = function() {
            this.checkForChanges(),
            h[this.id] = this,
            n || r()
        }
        ,
        t.prototype.resetAppliedScalingAndGetBoundingClientRect = function() {
            var t = this.elt.getBoundingClientRect()
              , e = {
                x: t.width / this.elt.offsetWidth,
                y: t.height / this.elt.offsetHeight
            };
            if (e.x === this.appliedScale.x && e.y === this.appliedScale.y)
                return t;
            var s = i(this.elt).children(".dcg-wrapper")[0];
            return s && (this.appliedScale = e,
            i(s).css({
                transform: "scale(" + 1 / this.appliedScale.x + "," + 1 / this.appliedScale.y + ")",
                width: 100 * this.appliedScale.x + "%",
                height: 100 * this.appliedScale.y + "%",
                "transform-origin": "0 0"
            })),
            t
        }
        ,
        t.prototype.detectAndEnqueueEvent = function() {
            if (!this.destroyed) {
                var t = !0;
                if (document.body && document.body.contains(this.elt)) {
                    var i = this.resetAppliedScalingAndGetBoundingClientRect();
                    t = i.top > window.innerHeight || i.bottom < 0 || i.left > window.innerWidth || i.right < 0,
                    this.lastSize ? i.width === this.lastSize.width && i.height === this.lastSize.height || (this.lastSize.width = i.width,
                    this.lastSize.height = i.height,
                    this.queuedEvent = {
                        type: "resized",
                        target: this.elt,
                        size: e.__assign({}, this.lastSize),
                        isOffscreen: t
                    }) : (this.lastSize = {
                        width: i.width,
                        height: i.height
                    },
                    this.queuedEvent = {
                        type: "added",
                        target: this.elt,
                        size: e.__assign({}, this.lastSize),
                        isOffscreen: t
                    })
                } else
                    this.lastSize && (this.lastSize = void 0,
                    this.queuedEvent = {
                        type: "removed",
                        target: this.elt,
                        isOffscreen: !0
                    });
                t !== this.lastOffscreen && (this.lastOffscreen = t,
                this.queuedEvent || (this.queuedEvent = {
                    type: "offscreen-noop",
                    target: this.elt,
                    isOffscreen: t
                }))
            }
        }
        ,
        t.prototype.dispatchQueuedEvent = function() {
            var t = this.queuedEvent;
            t && (this.queuedEvent = void 0,
            this.cb(t))
        }
        ,
        t.prototype.checkForChanges = function() {
            this.detectAndEnqueueEvent(),
            this.dispatchQueuedEvent()
        }
        ,
        t.prototype.destroy = function() {
            for (var t in this.stopWatching(),
            this)
                this.hasOwnProperty(t) && delete this[t];
            this.destroyed = !0
        }
        ,
        t
    }();
    t.default = a
});

define('dcgview-helpers/dragdrop', ["require", "exports", "tslib", "underscore", "jquery", "lib/underscore-shim"], function(require, t, e, i, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.DragDrop = void 0;
    var n = function(t) {
        function o() {
            var e = t.call(this) || this;
            return e.dragging = !1,
            e.guid = i.uniqueId("dragdrop-class"),
            e
        }
        return e.__extends(o, t),
        o.prototype._evt2pt = function(t) {
            return {
                x: t.changedTouches[0].pageX - this._offsetPt.x,
                y: t.changedTouches[0].pageY - this._offsetPt.y
            }
        }
        ,
        o.prototype._dispatch = function(t, e) {
            if (!this._destroyed) {
                var i = this._evt2pt(e);
                this.triggerEvent(t, {
                    x: i.x,
                    y: i.y,
                    dx: i.x - this._startPt.x,
                    dy: i.y - this._startPt.y,
                    evt: e
                })
            }
        }
        ,
        o.prototype.destroy = function() {
            r(document).off("." + this.guid),
            this._destroyed = !0
        }
        ,
        o.prototype.startDrag = function(t, e) {
            var i = this;
            if (void 0 === e && (e = {}),
            !this.dragging)
                return r(document).on("dcg-tapmove." + this.guid, function(t) {
                    (t.originalEvent || t).preventDefault(),
                    cancelAnimationFrame(i.frameThrottle),
                    i.frameThrottle = requestAnimationFrame(function() {
                        return i.doDrag(t)
                    })
                }),
                r(document).on("dcg-tapend." + this.guid + " dcg-tapcancel." + this.guid, function(t) {
                    return i.endDrag(t)
                }),
                this._offsetPt = {
                    x: 0,
                    y: 0
                },
                e.origin && (this._offsetPt = {
                    x: this._evt2pt(t).x - e.origin.x,
                    y: this._evt2pt(t).y - e.origin.y
                }),
                this._startPt = this._evt2pt(t),
                this.setProperty("dragging", !0),
                this._dispatch("onGrab", t)
        }
        ,
        o.prototype.doDrag = function(t) {
            this.dragging && this._dispatch("onDrag", t)
        }
        ,
        o.prototype.endDrag = function(t) {
            this.dragging && (r(document).off("." + this.guid),
            this.doDrag(t),
            this.setProperty("dragging", !1),
            this._dispatch("onDrop", t))
        }
        ,
        o
    }(o.UnderscoreModelShim);
    t.DragDrop = n
});

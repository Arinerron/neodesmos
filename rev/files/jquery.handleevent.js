
define('jquery.handleevent', ['require', 'jquery'], function(require) {
    var t = require("jquery")
      , e = "_*_";
    t.Event.prototype.wasHandled = function(n) {
        n = n || e;
        var r = this.originalEvent
          , a = r && r.handledBy;
        if (a && a[n])
            return !0;
        if (n !== e)
            return !1;
        var i = t(this.target).closest("[handleEvent]");
        return !(!i.length || i[0] === this.currentTarget) && "false" !== i.attr("handleEvent")
    }
    ,
    t.Event.prototype.handle = function(t) {
        t = t || e;
        var n = this.originalEvent;
        if (n) {
            var r = n.handledBy;
            r || (r = n.handledBy = {}),
            r[t] = !0
        }
    }
});
!function(e) {
    "function" == typeof define && define.amd ? define('vendor/jquery.mousewheel', ["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
}(function(e) {
    var t, n, i = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], o = "onwheel"in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], l = Array.prototype.slice;
    if (e.event.fixHooks)
        for (var s = i.length; s; )
            e.event.fixHooks[i[--s]] = e.event.mouseHooks;
    var a = e.event.special.mousewheel = {
        version: "3.1.9",
        setup: function() {
            if (this.addEventListener)
                for (var t = o.length; t; )
                    this.addEventListener(o[--t], h, !1);
            else
                this.onmousewheel = h;
            e.data(this, "mousewheel-line-height", a.getLineHeight(this)),
            e.data(this, "mousewheel-page-height", a.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var e = o.length; e; )
                    this.removeEventListener(o[--e], h, !1);
            else
                this.onmousewheel = null
        },
        getLineHeight: function(t) {
            return parseInt(e(t)["offsetParent"in e.fn ? "offsetParent" : "parent"]().css("fontSize"), 10)
        },
        getPageHeight: function(t) {
            return e(t).height()
        },
        settings: {
            adjustOldDeltas: !0
        }
    };
    function h(i) {
        var o = i || window.event
          , s = l.call(arguments, 1)
          , a = 0
          , h = 0
          , d = 0
          , f = 0;
        if ((i = e.event.fix(o)).type = "mousewheel",
        "detail"in o && (d = -1 * o.detail),
        "wheelDelta"in o && (d = o.wheelDelta),
        "wheelDeltaY"in o && (d = o.wheelDeltaY),
        "wheelDeltaX"in o && (h = -1 * o.wheelDeltaX),
        "axis"in o && o.axis === o.HORIZONTAL_AXIS && (h = -1 * d,
        d = 0),
        a = 0 === d ? h : d,
        "deltaY"in o && (a = d = -1 * o.deltaY),
        "deltaX"in o && (h = o.deltaX,
        0 === d && (a = -1 * h)),
        0 !== d || 0 !== h) {
            if (1 === o.deltaMode) {
                var c = e.data(this, "mousewheel-line-height");
                a *= c,
                d *= c,
                h *= c
            } else if (2 === o.deltaMode) {
                var m = e.data(this, "mousewheel-page-height");
                a *= m,
                d *= m,
                h *= m
            }
            return f = Math.max(Math.abs(d), Math.abs(h)),
            (!n || f < n) && (n = f,
            r(o, f) && (n /= 40)),
            r(o, f) && (a /= 40,
            h /= 40,
            d /= 40),
            a = Math[a >= 1 ? "floor" : "ceil"](a / n),
            h = Math[h >= 1 ? "floor" : "ceil"](h / n),
            d = Math[d >= 1 ? "floor" : "ceil"](d / n),
            i.deltaX = h,
            i.deltaY = d,
            i.deltaFactor = n,
            i.deltaMode = 0,
            s.unshift(i, a, h, d),
            t && clearTimeout(t),
            t = setTimeout(u, 200),
            (e.event.dispatch || e.event.handle).apply(this, s)
        }
    }
    function u() {
        n = null
    }
    function r(e, t) {
        return a.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0
    }
    e.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    })
});
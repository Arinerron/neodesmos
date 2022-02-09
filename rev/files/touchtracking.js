define('touchtracking', ['require', 'jquery', 'ipad.ghostevents', 'keys', 'loadcss!./touchtracking'], function(require) {
    var e, t, n = -1 !== document.location.href.indexOf("dcgDebugTouchTracking=dcgYES"), o = require("jquery"), c = require("ipad.ghostevents"), a = require("keys");
    require("loadcss!./touchtracking"),
    null == window._touchtracking_id_counter && (window._touchtracking_id_counter = 0),
    window._touchtracking_id_counter += 1;
    var i = "touchtracking_id_" + window._touchtracking_id_counter
      , r = function(e) {
        t && (t[0].value = "(" + Date.now() + ") " + e + "\n" + t[0].value)
    };
    c.evtInScope = function(e) {
        return k(e.target)
    }
    ,
    c.isGhostEvent = function(e) {
        return !window.PointerEvent && (!(g !== u && g !== d && !Y()) && (e.target !== f && ((!e.target || !o.contains(e.target, f)) && ((!f || !o.contains(f, e.target)) && (r("found ghost event"),
        !0)))))
    }
    ;
    var u = 1
      , d = 4
      , g = 0
      , s = {}
      , l = {}
      , p = []
      , h = 0
      , v = null
      , f = null
      , m = null
      , y = []
      , E = function(e) {
        for (var t = []; e; )
            t.push(e),
            e = e.parentNode;
        return t
    }
      , b = function(e) {
        for (var t = [], n = 0; n < e.length; n++) {
            var c = e[n];
            if (t.push(c),
            o(c).is(".dcg-tap-container, .dcg-no-touchtracking"))
                return o(c).is(".dcg-tap-container." + i) ? t : []
        }
        return []
    }
      , T = function(e, t) {
        f = null,
        r("beginMode:" + (g = e)),
        p = E(g === u ? t.originalEvent.touches[0].target : t.target),
        o(b(p)).addClass("dcg-depressed").each(function() {
            var e = o(this);
            C(e) && e.addClass("dcg-focus-by-tap")
        }),
        o(p).each(function() {
            var e = o(this);
            e.data({
                originalScrollTop: e.scrollTop(),
                originalScrollLeft: e.scrollLeft()
            })
        }),
        l = {}
    }
      , w = function(e) {
        return e.is('input, textarea, select, [role="textbox"]') || e.hasClass("dcg-mathquill-input-span") || e.is("[contenteditable=true]")
    }
      , k = function(e) {
        return !!o(e).closest(".dcg-tap-container, .dcg-no-touchtracking").is(".dcg-tap-container." + i)
    }
      , C = function(e) {
        return 3 !== g && !w(e) && k(e)
    }
      , x = function(e, t) {
        f = null,
        r("endMode:" + g),
        o(".dcg-depressed").removeClass("dcg-depressed");
        var n = o(document.activeElement);
        if (!N(e.target) && C(n))
            try {
                n.blur()
            } catch (e) {}
        if (o(".dcg-focus-by-tap").removeClass("dcg-focus-by-tap"),
        o(p).each(function() {
            var e = o(this)
              , t = e.data("originalScrollTop") - e.scrollTop()
              , n = e.data("originalScrollLeft") - e.scrollLeft();
            (t || n) && (l.scroll = !0)
        }),
        1 === l["dcg-tapstart"] && 1 === l["dcg-tapend"] && !l["dcg-tapcancel"] && !l.scroll) {
            r("potential dcg-tap");
            var c = t.changedTouches[0].clientX
              , a = t.changedTouches[0].clientY;
            if (e && !e.device && 0 === c && 0 === a) {
                var i = e.target.getBoundingClientRect();
                c = (i.left + i.right) / 2,
                a = (i.top + i.bottom) / 2,
                e.device = "keyboard"
            }
            r("potential dcg-tap coords:" + c + ":" + a);
            for (var s = !1, m = !1, y = 0; y < p.length && !s; y++) {
                var E, b = o(p[y]);
                if ("function" == typeof b[0].getBoundingClientRect && (E = b[0].getBoundingClientRect()),
                "true" === b.attr("tapboundary") && (s = !0),
                E) {
                    if (c < E.left || a < E.top)
                        continue;
                    if (c > E.right)
                        continue;
                    if (a > E.bottom)
                        continue
                }
                f = b[0],
                m = !0,
                I("dcg-tap", e, {
                    target: f,
                    touches: t.touches,
                    changedTouches: t.changedTouches
                });
                break
            }
        }
        r("result of dcg-tap:  did_dispatch=" + m + "  did_escape=" + s),
        g !== u && g !== d || (v = setTimeout(function() {
            v = null,
            h = (new Date).getTime()
        }, 1e3)),
        p = [],
        g = 0
    }
      , Y = function() {
        return v || (new Date).getTime() - h < 500
    }
      , X = function(e) {
        return void 0 !== e.identifier ? e.identifier : e.pointerId
    }
      , _ = function(e) {
        for (var t = [], n = 0; n < e.length; n++) {
            var o = e[n];
            t.push({
                identifier: X(o),
                x: o.pageX,
                y: o.pageY,
                screenX: o.screenX,
                screenY: o.screenY,
                pageX: o.pageX,
                pageY: o.pageY,
                clientX: o.clientX,
                clientY: o.clientY
            })
        }
        return t
    }
      , I = function(e, t, n) {
        var c = X(t)
          , a = _(n.touches)
          , i = _(n.changedTouches);
        if (r("dispatchEvent:" + e),
        "dcg-tapstart" === e)
            s[c] = {
                type: e,
                pageX: i[0].pageX,
                pageY: i[0].pageY
            };
        else if ("dcg-tapmove" === e) {
            var p = i[0]
              , h = s[c];
            if (h && p.pageX === h.pageX && p.pageY === h.pageY)
                return;
            if ((g === u || g === d) && h && "dcg-tapstart" === h.type && Math.abs(h.pageX - p.pageX) + Math.abs(h.pageY - p.pageY) < 2)
                return;
            s[c] = {
                type: e,
                pageX: i[0].pageX,
                pageY: i[0].pageY
            }
        }
        void 0 === l[e.toLowerCase()] ? l[e.toLowerCase()] = 1 : l[e.toLowerCase()]++;
        var v = o.event.fix(t.originalEvent);
        v.type = e,
        v.device = g === u || g === d ? "touch" : 3 === g ? "keyboard" : "mouse",
        v.touches = a,
        v.changedTouches = i,
        v.target = n.target ? n.target : t.target;
        var f = "keyboard" !== v.device && l["dcg-longhold"] > 0;
        v.wasLongheld = function() {
            return f
        }
        ,
        v.preventTap = function() {
            l["dcg-tapcancel"] = 1
        }
        ,
        clearTimeout(m),
        "dcg-tapstart" === v.type && "keyboard" !== v.device && 1 === v.touches.length && (m = setTimeout(function() {
            I("dcg-longhold", t, n)
        }, 500)),
        v.target && v.target.nodeName && "a" === v.target.nodeName.toLowerCase() && "dcg-tap" === v.type && "keyboard" === v.device && v.target.click && v.target.click(),
        r("trigger event:" + v.type),
        o(v.target).trigger(v)
    }
      , L = function(e) {
        var t = p
          , n = !!p.length
          , c = o(".dcg-tap-container." + i + " .dcg-hovered")
          , a = o.makeArray(c.filter(function() {
            return k(this)
        }))
          , r = []
          , u = []
          , d = [];
        b(E(e)).forEach(function(e) {
            n && -1 === t.indexOf(e) || (-1 === a.indexOf(e) && d.push(e),
            r.push(e))
        });
        for (var g = 0; g < a.length; g++)
            e = a[g],
            -1 === r.indexOf(e) && u.push(e);
        o(u).removeClass("dcg-hovered").trigger("tipsyhide"),
        o(d).addClass("dcg-hovered").trigger("tipsyshow")
    }
      , S = function(e) {
        for (var t = 0; t < y.length; t++)
            if (y[t].pointerId === e)
                return !0;
        return !1
    }
      , M = function(e) {
        for (var t = 0; t < y.length; t++)
            if (y[t].pointerId === e)
                return y.splice(t, 1)[0]
    }
      , P = function(e) {
        0 === g && T(d, e),
        L(null),
        y.push(e.originalEvent),
        I("dcg-tapstart", e, {
            touches: y,
            changedTouches: [e.originalEvent]
        })
    }
      , R = function(e) {
        M(e.originalEvent.pointerId);
        var t = {
            touches: y,
            changedTouches: [e.originalEvent]
        };
        I("dcg-tapcancel", e, t),
        0 === y.length && x(e, t)
    }
      , A = function(e) {
        M(e.originalEvent.pointerId);
        var t = {
            touches: y,
            changedTouches: [e.originalEvent]
        };
        I("dcg-tapend", e, t),
        0 === y.length && x(e, t)
    }
      , D = function(e) {
        return "touch" === e.originalEvent.pointerType || 2 === e.originalEvent.pointerType
    };
    o(document).on("pointerdown MSPointerDown", function(e) {
        r("document.on:" + e.type),
        2 !== g && g !== u && D(e) && (S(e.originalEvent.pointerId) ? r("exit. pointer id already exists: " + e.originalEvent.pointerId) : P(e))
    }),
    o(document).on("pointermove MSPointerMove", function(e) {
        r("document.on:" + e.type),
        2 !== g && g !== u && D(e) && (S(e.originalEvent.pointerId) || (r("pointer id already exists: " + e.originalEvent.pointerId),
        P(e)),
        M(e.originalEvent.pointerId),
        y.push(e.originalEvent),
        I("dcg-tapmove", e, {
            touches: y,
            changedTouches: [e.originalEvent]
        }))
    }),
    o(document).on("pointercancel MSPointerCancel", function(e) {
        var t;
        if ((r("document.on:" + e.type),
        g === d && D(e)) && S(e.originalEvent.pointerId))
            for (R(e); t = y.pop(); ) {
                e = o.Event(t, {
                    originalEvent: t
                });
                R(e)
            }
    }),
    o(document).on("pointerup MSPointerUp", function(e) {
        var t;
        if ((r("document.on:" + e.type),
        g === d && D(e)) && S(e.originalEvent.pointerId))
            for (A(e); t = y.pop(); ) {
                e = o.Event(t, {
                    originalEvent: t
                });
                A(e)
            }
    });
    var O = function() {
        var e = !1;
        try {
            var t = Object.defineProperty({}, "passive", {
                get: function() {
                    e = !0
                }
            });
            window.addEventListener("test", function() {}, t),
            window.removeEventListener("test", function() {}, t)
        } catch (e) {}
        return e
    }();
    function B(e, t) {
        var n = O ? {
            passive: !1
        } : void 0;
        document.addEventListener(e, function(e) {
            r("document.on:" + e.type),
            t(o.event.fix(e))
        }, n)
    }
    function N(e) {
        var t = !!o(e).closest(".dcg-do-not-blur").length
          , n = !!o(e).closest(".dcg-do-blur").length;
        return !(!t || n || !k(e))
    }
    return B("touchstart", function(e) {
        2 !== g && g !== d && (0 === g && T(u, e),
        L(null),
        I("dcg-tapstart", e, {
            touches: e.originalEvent.touches,
            changedTouches: e.originalEvent.changedTouches
        }))
    }),
    B("touchmove", function(e) {
        g === u && I("dcg-tapmove", e, {
            touches: e.originalEvent.touches,
            changedTouches: e.originalEvent.changedTouches
        })
    }),
    B("touchcancel", function(e) {
        if (g === u) {
            var t = {
                touches: e.originalEvent.touches,
                changedTouches: e.originalEvent.changedTouches
            };
            I("dcg-tapcancel", e, t),
            0 === e.originalEvent.touches.length && x(e, t)
        }
    }),
    B("touchend", function(e) {
        if (g === u) {
            var t = {
                touches: e.originalEvent.touches,
                changedTouches: e.originalEvent.changedTouches
            };
            I("dcg-tapend", e, t),
            0 === e.originalEvent.touches.length && x(e, t)
        }
    }),
    o(document).on("mousedown", function(e) {
        if (r("document.on:" + e.type),
        1 !== e.button && 2 !== e.button) {
            if (g === u || g === d || Y())
                return !o(e.target).is("input, textarea, select") && k(e.target) && e.preventDefault(),
                void r("abort mousedown: " + g + ":" + Y());
            T(2, e),
            I("dcg-tapstart", e, {
                touches: [e],
                changedTouches: [e]
            })
        }
    }),
    o(document).ready(function() {
        o(document).on("mousedown", function(e) {
            if (r("document.on:" + e.type),
            N(e.target)) {
                e.preventDefault();
                try {
                    var t = window.getSelection();
                    if (1 === t.rangeCount) {
                        var n = t.getRangeAt(0);
                        n.startContainer === n.endContainer && o(n.startContainer).closest(".dcg-text-selectable").length && t.removeAllRanges()
                    }
                } catch (e) {}
            }
        })
    }),
    o(document).on("mouseleave", function(e) {
        r("document.on:" + e.type),
        0 === g && (Y() ? r("abort mouseleave: " + g + ":" + Y()) : L(null))
    }),
    o(document).on("mousemove", function(e) {
        r("document.on:" + e.type),
        1 !== e.button && 2 !== e.button && g !== u && g !== d && (Y() ? r("abort mousemove: " + g + ":" + Y()) : (L(e.target),
        I("dcg-tapmove", e, {
            touches: [e],
            changedTouches: [e]
        })))
    }),
    o(document).on("mouseup", function(e) {
        if (r("document.on:" + e.type),
        1 !== e.button && 2 !== e.button && 2 === g) {
            var t = {
                touches: [],
                changedTouches: [e]
            };
            I("dcg-tapend", e, t),
            x(e, t)
        }
    }),
    o(document).on("keydown", function(e) {
        if (r("document.on:" + e.type),
        (a.lookup(e) === a.ENTER || a.lookup(e) === a.SPACEBAR) && k(e.target) && 3 !== g) {
            if (o(e.target).is('a:not([ontap]), button, input, textarea, select, [role="textbox"], [contenteditable="true"]'))
                return;
            e.preventDefault(),
            T(3, e),
            I("dcg-tapstart", e, {
                touches: [e],
                changedTouches: [e]
            })
        }
    }),
    o(document).on("keyup", function(e) {
        if (r("document.on:" + e.type),
        (a.lookup(e) === a.ENTER || a.lookup(e) === a.SPACEBAR) && k(e.target) && 3 === g) {
            var t = {
                touches: [],
                changedTouches: [e]
            };
            I("dcg-tapend", e, t),
            x(e, t)
        }
    }),
    {
        monitor: function(c) {
            o(c).addClass("dcg-tap-container"),
            o(c).addClass(i),
            n && (e && e.remove(),
            e = o('<div style="position:absolute;bottom:10px;right:10px;"><textarea rows="30" cols="40"></textarea><div id="dcg-touchtracking-debug-copy" class="dcg-btn-blue">COPY LOGS</div></div>'),
            t = e.find("textarea"),
            o(c).append(e),
            o("#dcg-touchtracking-debug-copy")[0].addEventListener("mousedown", function() {
                t[0].select(),
                document.execCommand("copy")
            }, !0),
            r("monitor touches"))
        },
        ignore: function(e) {
            o(e).addClass("dcg-no-touchtracking")
        },
        isTapActive: function() {
            return 0 !== g
        },
        elIsFocusable: w
    }
});
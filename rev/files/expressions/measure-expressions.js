
define('expressions/measure-expressions', ["require", "exports", "jquery"], function(require, t, e) {
    "use strict";
    function n(t) {
        for (var e = [], n = 0, r = t.getAllItemModels(); n < r.length; n++) {
            var i = r[n]
              , o = t.getItemRootNodeById(i.id);
            o && e.push(o)
        }
        return e
    }
    function r(t, e) {
        for (var r = n(t), i = 0, o = r.length - 1; i <= o; ) {
            var g = i + Math.floor((o - i) / 2)
              , l = r[g]
              , a = l.getBoundingClientRect();
            if (a.top > e)
                o = g - 1;
            else {
                if (!(a.bottom < e))
                    return l;
                i = g + 1
            }
        }
    }
    function i(t) {
        var r = l(t);
        if (r) {
            var i = function(t, e) {
                for (var r, i = n(t), o = 0, g = i.length - 1; o <= g; ) {
                    var l = o + Math.floor((g - o) / 2)
                      , a = i[l];
                    a.getBoundingClientRect().top > e ? (g = l - 1,
                    r = a) : o = l + 1
                }
                return r
            }(t, r.top - 2);
            if (i)
                return e(i).attr("expr-id")
        }
    }
    function o(t) {
        return t.find$(".dcg-exppanel")[0]
    }
    function g(t) {
        var n = o(t);
        if (n)
            return e(n)
    }
    function l(t) {
        var e = o(t);
        if (e)
            return e.getBoundingClientRect()
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.getDragContainerHeight = t.getExpListHeight = t.getExppanelScrolledTop = t.getExppanelRect = t.getOuterExppanelRect = t.getExppanelSelector = t.getExppanelElt = t.getFirstFullyVisibleItemId = t.getLastVisibleItemId = t.getFirstVisibleItemId = void 0,
    t.getFirstVisibleItemId = function(t, n) {
        var o = l(t);
        if (o) {
            if (n) {
                var g = t.getItemRootNodeById(n);
                if (g) {
                    var a = g.getBoundingClientRect();
                    if (a.height > 0 && a.top <= o.top && a.bottom >= o.top)
                        return n
                }
            }
            var u = r(t, o.top);
            return u ? e(u).attr("expr-id") : i(t)
        }
    }
    ,
    t.getLastVisibleItemId = function(t, n) {
        var i = l(t);
        if (i) {
            var o = function(t) {
                for (var e = t.getAllItemModels(), n = e.length - 1; n >= 0; n--) {
                    var r = e[n];
                    if (r.dcgView)
                        return r.id
                }
            }(t);
            if (o) {
                if (n) {
                    var g = t.getItemRootNodeById(n);
                    if (g) {
                        var a = g.getBoundingClientRect();
                        if (a.height > 0 && a.top <= i.bottom && a.bottom >= i.bottom)
                            return n;
                        if (n === o && a.bottom <= i.bottom)
                            return n
                    }
                }
                var u = r(t, i.bottom);
                return u && e(u).attr("expr-id") || o
            }
        }
    }
    ,
    t.getFirstFullyVisibleItemId = i,
    t.getExppanelElt = o,
    t.getExppanelSelector = g,
    t.getOuterExppanelRect = function(t) {
        var e = t.find$(".dcg-exppanel-outer")[0];
        if (e)
            return e.getBoundingClientRect()
    }
    ,
    t.getExppanelRect = l,
    t.getExppanelScrolledTop = function(t) {
        var e = o(t);
        if (e) {
            var n = e.getBoundingClientRect()
              , r = e.scrollTop;
            return n.top - r
        }
    }
    ,
    t.getExpListHeight = function(t) {
        var e = t.find$(".dcg-expressionlist");
        if (1 === e.length)
            return e.height()
    }
    ,
    t.getDragContainerHeight = function(t) {
        var e = g(t);
        return e && e.find(".dcg-drag-container").height() || 0
    }
});
define('scroll_helpers', ['require'], function(require) {
    return {
        scrollVisible: function(o, t, r) {
            var e, i = t.height(), l = o.outerHeight(), n = o.offset(), f = t.offset();
            if (!n || !f)
                return !1;
            var s = t[0].scrollTop
              , c = n.top + s - f.top
              , u = c - r
              , a = l + c + r - i;
            return (e = u >= a ? Math.min(Math.max(s, a), u) : .5 * (u + a)) !== s && (t[0].scrollTop = e,
            t[0].scrollTop != s)
        }
    }
});
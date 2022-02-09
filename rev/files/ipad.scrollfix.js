
define('ipad.scrollfix', ['require', 'jquery'], function(require) {
    var o = require("jquery")
      , n = !1
      , e = function(e) {
        n || o(e).bind("touchstart", function(n) {
            var e = o(n.target)
              , l = 0
              , r = null;
            if (!e.closest("[disablescroll]").length)
                for (; 0 === l && e.length && void 0 !== e[0].tagName; ) {
                    var t = e.css("overflow")
                      , c = e.css("overflow-y");
                    if ("hidden" !== t && "visible" !== t && "hidden" !== c && "hidden" !== c) {
                        var i = e.scrollTop();
                        0 !== i && (l = 2),
                        e.scrollTop(i + 1),
                        e.scrollTop() !== i && (l |= 1,
                        e.scrollTop(i))
                    }
                    e = e.parent()
                }
            if (0 !== l) {
                r = [];
                for (var s = n.originalEvent.touches, f = 0; f < s.length; f++) {
                    var u = {};
                    for (var a in s[f])
                        s[f].hasOwnProperty(a) && (u[a] = s[f][a]);
                    r.push(u)
                }
            }
            o(document).on("touchmove.scrollfix", function(o) {
                if (r) {
                    var n = r[0]
                      , e = o.originalEvent.touches[0].screenY - n.screenY;
                    (e > 0 && !(2 & l) || e < 0 && !(1 & l)) && (l = 0),
                    e && (r = null)
                }
                0 === l && o.preventDefault()
            }),
            o(document).on("touchend.scrollfix", function() {
                o(document).off(".scrollfix")
            })
        })
    };
    return {
        limitScrollOnElement: e,
        limitScrollOnDocument: function() {
            e(document),
            n = !0
        }
    }
});
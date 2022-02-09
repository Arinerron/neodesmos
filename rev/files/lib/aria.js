
define('lib/aria', ["require", "exports", "browser", "jquery"], function(require, e, a, t) {
    "use strict";
    var r;
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.alert = e.queue = e.clear = void 0;
    var i = []
      , n = "";
    function l(e) {
        i.push(e)
    }
    e.clear = function() {
        void 0 !== r && r.empty()
    }
    ,
    e.queue = l,
    e.alert = function(e) {
        if (void 0 !== e && l(e),
        void 0 !== r && i.length > 0) {
            var t = i.join(" ").replace(/ +(?= )/g, "");
            r.attr("aria-relevant", n === t && a.IS_APPLE ? "all" : "additions text"),
            r.empty().text(t),
            n = t
        }
        i.length = 0
    }
    ,
    t(function() {
        var e = ".dcg-aria-alert";
        0 === t(e).length && t("body").append("<p aria-live='assertive' aria-atomic='true' class='dcg-aria-alert'></p>"),
        r = t(e)
    })
});
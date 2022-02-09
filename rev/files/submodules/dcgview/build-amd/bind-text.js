
define('submodules/dcgview/build-amd/bind-text', ["./bindings"], function(n) {
    "use strict";
    function e(n) {
        return n && "object" == typeof n && "default"in n ? n : {
            default: n
        }
    }
    var t = e(n)
      , a = !1;
    return {
        bindText: function(n, e, d) {
            if ("function" != typeof d)
                throw new Error("bindText expects a function");
            var i = d();
            null == i && (i = "");
            var u = document.createTextNode(i);
            if (a) {
                var o = document.createElement("span");
                o.appendChild(u),
                e.appendChild(o)
            } else
                e.appendChild(u);
            t.default.add(n, "onUpdate", function() {
                var n = d();
                null == n && (n = ""),
                i !== n && (u.nodeValue = n,
                i = n)
            })
        },
        enableSpanWrapping: function() {
            a = !0
        }
    }
});
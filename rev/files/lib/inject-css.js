
define('lib/inject-css', ['require', 'underscore'], function(require) {
    "use strict";
    var e = require("underscore")
      , t = {}
      , n = [];
    return function(r, d) {
        var c = t[r];
        if (!c) {
            c = document.createElement("style"),
            t[r] = c;
            var o = e.sortedIndex(n, r)
              , i = t[n[o]];
            i ? document.head.insertBefore(c, i) : document.head.appendChild(c),
            n.splice(o, 0, r)
        }
        c.textContent = d
    }
});
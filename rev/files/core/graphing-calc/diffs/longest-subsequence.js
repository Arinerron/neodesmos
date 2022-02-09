define('core/graphing-calc/diffs/longest-subsequence', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.findLongestSubsequence = void 0,
    e.findLongestSubsequence = function(e) {
        for (var r = e.length, n = new Array(r), i = new Array(r + 1), o = 0, t = 0; t < r; t++) {
            var u = void 0;
            if (e[i[o]] < e[t])
                u = o + 1;
            else {
                for (var a = 1, f = o - 1; a <= f; ) {
                    var s = Math.ceil((a + f) / 2);
                    e[i[s]] < e[t] ? a = s + 1 : f = s - 1
                }
                u = a
            }
            n[t] = i[u - 1],
            i[u] = t,
            u > o && (o = u)
        }
        var v = new Array(o)
          , c = i[o];
        for (t = o - 1; t >= 0; t--)
            v[t] = e[c],
            c = n[c];
        return v
    }
});
define('submodules/dcgview/build-amd/longest-subsequence', [], function() {
    "use strict";
    return function(r) {
        var e, n, a = r.length, t = new Array(a), f = new Array(a + 1), i = 0;
        for (n = 0; n < a; n++) {
            if (r[f[i]] < r[n])
                e = i + 1;
            else {
                for (var o = 1, u = i - 1; o <= u; ) {
                    var c = Math.ceil((o + u) / 2);
                    r[f[c]] < r[n] ? o = c + 1 : u = c - 1
                }
                e = o
            }
            t[n] = f[e - 1],
            f[e] = n,
            e > i && (i = e)
        }
        var v = new Array(i)
          , l = f[i];
        for (n = i - 1; n >= 0; n--)
            v[n] = r[l],
            l = t[l];
        return v
    }
});
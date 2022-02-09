
define('submodules/dcgview/build-amd/spread', [], function() {
    "use strict";
    return function(r) {
        var e = arguments.length;
        if (e < 2)
            return r;
        for (var n = 1; n < e; n++)
            for (var t = arguments[n], f = Object.keys(t), u = f.length, i = 0; i < u; i++) {
                var a = f[i];
                r[a] = t[a]
            }
        return r
    }
});
define('submodules/dcgview/build-amd/bindings', [], function() {
    "use strict";
    return {
        add: function(n, i, r) {
            var t = n._bindings[i];
            t ? t.push(r) : n._bindings[i] = [r]
        },
        invoke: function(n, i) {
            var r = n._bindings[i];
            if (r)
                for (var t = r.length, d = 0; d < t; d++)
                    r[d]()
        }
    }
});
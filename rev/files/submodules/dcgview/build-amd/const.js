define('submodules/dcgview/build-amd/const', [], function() {
    "use strict";
    return {
        isConst: function(n) {
            return !("function" != typeof n || !n.isDCGViewConst)
        },
        makeConst: function(n) {
            var t = function() {
                return n
            };
            return t.isDCGViewConst = !0,
            t
        }
    }
});
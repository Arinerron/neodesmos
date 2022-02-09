
define('main/raf-loop', ['require', 'lib/parse-query-params'], function(require) {
    "use strict";
    var e = (0,
    require("lib/parse-query-params").getQueryParams)().timeoutLoop;
    return void 0 !== e ? (e = parseFloat(e),
    isNaN(e) && (e = 1e3 / 60),
    function(t) {
        setTimeout(function i() {
            setTimeout(i, e),
            t(Date.now())
        }, e)
    }
    ) : function(e) {
        requestAnimationFrame(function t(i) {
            requestAnimationFrame(t),
            e(i)
        })
    }
});
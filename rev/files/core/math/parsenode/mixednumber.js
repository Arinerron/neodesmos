define('core/math/parsenode/mixednumber', ['require', 'pjs', './constant'], function(require) {
    "use strict";
    return require("pjs")(require("./constant"), function(n, i) {
        n.init = function(n) {
            i.init.call(this, n)
        }
        ,
        n.is_mixed_number = !0
    })
});
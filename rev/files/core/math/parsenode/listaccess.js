
define('core/math/parsenode/listaccess', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), function(i, n) {
        i.init = function(i) {
            n.init.call(this, i),
            this.list = i[0],
            this.index = i[1]
        }
    })
});
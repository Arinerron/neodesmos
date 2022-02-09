
define('core/math/parsenode/orderedpairaccess', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), function(i, n) {
        i.init = function(i) {
            n.init.call(this, i),
            this.point = i[0],
            this.index = i[1]
        }
    })
});
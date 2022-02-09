define('core/math/parsenode/range', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), function(n, i, t) {
        n.init = function(n) {
            i.init.call(this, n),
            this.beginning = n[0],
            this.end = n[1]
        }
        ,
        n.isHalfEmpty = function() {
            return this.end && this.end.args && 0 === this.end.args.length
        }
    })
});
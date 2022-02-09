
define('core/math/parsenode/assignmentexpression', ['require', './expression', 'pjs'], function(require) {
    "use strict";
    var i = require("./expression");
    return require("pjs")(i, function(i, n) {
        i.init = function(i) {
            n.init.call(this, i),
            this._symbol = i[0]._symbol
        }
    })
});
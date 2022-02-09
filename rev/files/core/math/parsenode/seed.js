
define('core/math/parsenode/seed', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), function(i, n) {
        i.init = function(i) {
            "string" != typeof i && (i = "" + i),
            this._stringValue = i,
            n.init.call(this, [])
        }
        ,
        i.isString = !0,
        i.asValue = function() {
            return this._stringValue
        }
    })
});
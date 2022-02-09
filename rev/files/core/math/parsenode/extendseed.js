
define('core/math/parsenode/extendseed', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), function(t, s) {
        t.init = function(t, e) {
            s.init.call(this, e),
            this.seed = e[0],
            this.userSeed = e[1],
            this.tag = t
        }
        ,
        t.asValue = function() {
            return this.seed.asValue() + "::" + this.tag + this.userSeed.asValue()
        }
        ,
        t.copyWithArgs = function(t) {
            return new this.constructor(this.tag,t)
        }
    })
});
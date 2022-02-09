
define('core/math/parsenode/ticker', ['require', 'pjs', './base'], function(require) {
    "use strict";
    return require("pjs")(require("./base"), function(e, i) {
        e.init = function(e) {
            i.init.call(this),
            this.handler = e.handler,
            this.minStep = e.minStep,
            this.mergeDependencies(this.handler),
            this.mergeDependencies(this.minStep)
        }
    })
});
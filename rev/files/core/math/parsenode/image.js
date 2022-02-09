
define('core/math/parsenode/image', ['require', 'pjs', './base'], function(require) {
    "use strict";
    return require("pjs")(require("./base"), function(i, t, e, h) {
        i.isImage = !0,
        i.init = function(i, e) {
            t.init.call(this),
            this.center = i.center,
            this.radianAngle = i.radianAngle,
            this.width = i.width,
            this.height = i.height,
            this.opacity = i.opacity,
            this.moveStrategy = e,
            this.mergeDependencies(this.center, this.radianAngle, this.width, this.height, this.opacity)
        }
    })
});
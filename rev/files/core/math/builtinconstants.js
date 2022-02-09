define('core/math/builtinconstants', ['require', 'core/math/parsenode/constant', 'core/math/maybe-rational'], function(require) {
    "use strict";
    var t = require("core/math/parsenode/constant")
      , a = require("core/math/maybe-rational").maybeRational;
    return {
        pi: t(Math.PI),
        tau: t(2 * Math.PI),
        e: t(Math.E),
        trigAngleMultiplier: t(a(1, 1)),
        infty: t(1 / 0)
    }
});
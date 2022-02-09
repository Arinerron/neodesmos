define('core/math/parsenode/comparator', ['require', 'core/math/parsenode/basecomparator'], function(require) {
    "use strict";
    var e = require("core/math/parsenode/basecomparator");
    return {
        "<": e.create("<"),
        ">": e.create(">"),
        "<=": e.create("<="),
        ">=": e.create(">="),
        "=": e.create("=")
    }
});
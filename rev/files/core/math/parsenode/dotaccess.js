
define('core/math/parsenode/dotaccess', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), {})
});

define('core/math/parsenode/parenseq', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), {})
});
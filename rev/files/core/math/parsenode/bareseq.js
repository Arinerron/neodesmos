
define('core/math/parsenode/bareseq', ['require', 'pjs', './expression'], function(require) {
    "use strict";
    return require("pjs")(require("./expression"), {})
});
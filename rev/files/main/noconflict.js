define('main/noconflict', ['require', 'jquery', 'underscore'], function(require) {
    "use strict";
    var e = require("jquery")
      , s = require("underscore");
    return "undefined" == typeof Desmos && (Desmos = {}),
    function() {
        Desmos.$ = e,
        Desmos._ = s,
        Desmos.$.noConflict(!0)
    }
});
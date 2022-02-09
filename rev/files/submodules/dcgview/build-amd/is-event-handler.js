
define('submodules/dcgview/build-amd/is-event-handler', [], function() {
    "use strict";
    return function(n) {
        return "o" === n[0] && "n" === n[1] && n[2].toUpperCase() === n[2]
    }
});

define('submodules/dcgview/build-amd/class', ["./create-class"], function(t) {
    "use strict";
    function e(t) {
        return t && "object" == typeof t && "default"in t ? t : {
            default: t
        }
    }
    return e(t).default({
        template: function() {}
    })
});

define('submodules/dcgview/build-amd/custom-attributes', [], function() {
    "use strict";
    var t = {};
    return {
        isCustomAttribute: function(n) {
            return t.hasOwnProperty(n)
        },
        add: function(n, r) {
            t[n] = r
        },
        parse: function(n, r) {
            return (0,
            t[n])(r)
        }
    }
});
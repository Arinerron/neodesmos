
define('submodules/dcgview/build-amd/attr-event-handler', [], function() {
    "use strict";
    return function(n, t) {
        if (null != t) {
            if ("string" != typeof n)
                throw new Error("Must pass a string for an EventHandler name");
            if ("function" != typeof t)
                throw new Error("Must pass a function for an EventHandler callback");
            return {
                bindings: {
                    onMount: function(r) {
                        r[n.toLowerCase()] = function(n) {
                            n && t.apply(this, arguments)
                        }
                    }
                }
            }
        }
    }
});
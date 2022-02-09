define('worker/workercore', ['require', 'core/math/context'], function(require) {
    "use strict";
    var e = require("core/math/context").Context;
    return function(n) {
        var t = new e;
        return {
            processChangeSet: function(e) {
                var r = t.processChangeSet(e);
                n("processChangeSet", r)
            }
        }
    }
});
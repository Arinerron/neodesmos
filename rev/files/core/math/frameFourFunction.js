define('core/math/frameFourFunction', ['require', 'core/math/builtinframe'], function(require) {
    "use strict";
    var t = require("core/math/builtinframe");
    return {
        getFrame: function(n) {
            var i = {};
            return n.additionalFunctions && -1 !== n.additionalFunctions.indexOf("sqrt") && (i.sqrt = t.sqrt),
            i
        }
    }
});
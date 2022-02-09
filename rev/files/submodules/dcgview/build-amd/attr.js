define('submodules/dcgview/build-amd/attr', [], function() {
    "use strict";
    return {
        update: function(t, e, i) {
            void 0 === i ? t.removeAttribute(e) : t.setAttribute(e, i + "")
        }
    }
});
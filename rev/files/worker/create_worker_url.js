define('worker/create_worker_url', ['require', 'worker_src'], function(require) {
    "use strict";
    var e = require("worker_src");
    return function() {
        if (!e.length)
            return "/assets/generated/combined/toplevel/worker.js";
        var r;
        try {
            r = new Blob([e],{
                type: "application/javascript"
            })
        } catch (i) {
            try {
                var t = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder);
                t.append(e),
                r = t.getBlob("application/javascript")
            } catch (e) {
                return null
            }
        }
        return (window.URL || window.webkitURL).createObjectURL(r)
    }
});
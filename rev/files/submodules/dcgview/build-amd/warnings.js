
define('submodules/dcgview/build-amd/warnings', [], function() {
    "use strict";
    var r = [];
    return {
        warn: function(n, e) {
            try {
                if (e && e._isDCGView) {
                    n += " [" + e._viewName + "]";
                    var a = e.traceViewHierarchy();
                    a.ancestors.length > 0 && (n += "\nView Hierarchy:\n" + a.formatted)
                }
                throw new Error(n)
            } catch (n) {
                console.warn(n);
                for (var t = 0; t < r.length; t++)
                    r[t](n)
            }
        },
        addWarningHandler: function(n) {
            r.push(n)
        },
        removeWarningHandler: function(n) {
            var e = r;
            r = [];
            for (var a = 0; a < e.length; a++) {
                var t = e[a];
                t !== n && r.push(t)
            }
        }
    }
});
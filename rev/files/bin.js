define('bin', ["base64"], function(e) {
    "use strict";
    var n = {};
    return {
        load: function(e, r, i, o) {
            var t = r.toUrl(e);
            if (o.isBuild) {
                var a = require.nodeRequire("fs");
                n[e] = a.readFileSync(t).toString("base64"),
                i()
            } else {
                var s = new XMLHttpRequest;
                s.open("GET", t, !0),
                s.responseType = "arraybuffer",
                s.onload = function() {
                    i(s.response)
                }
                ,
                s.send()
            }
        },
        write: function(e, r, i, o) {
            r in n ? i("define('" + e + "!" + r + "', ['base64'], function (base64) {  return base64.toByteArray('" + n[r] + "').buffer;});") : console.log("ERROR - failed to find file " + r + " in buildMap")
        }
    }
});

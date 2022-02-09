define('lib/parse-json-errors', ["require", "exports"], function(require, r) {
    "use strict";
    function e(r) {
        if (0 === r.status)
            return [{
                message: "Connection failed. Check your internet connection?"
            }];
        try {
            return JSON.parse(r.responseText).errors
        } catch (r) {
            return [{
                message: "Unexpected server error. Try again, or e-mail calculator@desmos.com."
            }]
        }
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.parseJSONErrors = r.rawParseJSONErrors = void 0,
    r.rawParseJSONErrors = e,
    r.parseJSONErrors = function(r) {
        return e(r).map(function(r) {
            return r.message
        })
    }
});

define('lib/svg-string-to-blob', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = function(e) {
        if (-1 === e.indexOf("xmlns="))
            throw new Error('Programming error: <svg> elements require the "xmlns" attribute to render properly');
        return new Blob([e],{
            type: "image/xml+svg;charset=utf-8"
        })
    }
});

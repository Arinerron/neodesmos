
define('lib/abraham-helpers', ["require", "exports", "abraham"], function(require, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.brailleToLatex = e.latexToBraille = void 0,
    e.latexToBraille = function(e, o) {
        return "nemeth" === o ? r.latexToNemeth(e) : "ueb" === o ? r.latexToUeb(e) : {
            isError: !0,
            error: "Braille mode should be 'nemeth' or 'ueb'"
        }
    }
    ,
    e.brailleToLatex = function(e, o) {
        return "nemeth" === o ? r.nemethToLatex(e) : "ueb" === o ? r.uebToLatex(e) : {
            isError: !0,
            error: "Braille mode should be 'nemeth' or 'ueb'"
        }
    }
});

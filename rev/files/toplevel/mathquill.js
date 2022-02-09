
define('toplevel/mathquill', ['require', 'testbridge', 'mathquill_src', 'loadcss!Symbola-basic', 'loadcss!vendor/mathquill/mathquill-basic'], function(require) {
    "use strict";
    return require("testbridge"),
    require("mathquill_src"),
    require("loadcss!Symbola-basic"),
    require("loadcss!vendor/mathquill/mathquill-basic"),
    window.MathQuill.noConflict()
});
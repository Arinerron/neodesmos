
define("toplevel/calculator_desktop", ['require', 'testbridge', 'touchtracking', 'main/calc_desktop', 'main/noconflict'], function(require) {
    "use strict";
    require("testbridge"),
    require("touchtracking").monitor(document.body);
    var t = require("main/calc_desktop");
    return require("main/noconflict")(),
    t
});

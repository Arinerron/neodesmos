
define('worker_src', ['require', 'text!worker_src_underlying'], function(require) {
    "use strict";
    return require("text!worker_src_underlying")
});
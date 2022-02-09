
define('loadImage', ['require', 'vendor/load-image/load-image-orientation', 'vendor/load-image/load-image-meta', 'vendor/load-image/load-image-ios', 'vendor/load-image/load-image-exif', 'vendor/load-image/load-image-exif-map', 'vendor/load-image/load-image'], function(require) {
    "use strict";
    return require("vendor/load-image/load-image-orientation"),
    require("vendor/load-image/load-image-meta"),
    require("vendor/load-image/load-image-ios"),
    require("vendor/load-image/load-image-exif"),
    require("vendor/load-image/load-image-exif-map"),
    require("vendor/load-image/load-image")
});
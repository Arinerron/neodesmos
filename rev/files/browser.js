define('browser', ['require', 'jquery'], function(require) {
    var n, t, a, r, e, i = require("jquery"), o = {
        IS_IE8: null !== navigator.userAgent.match(/MSIE 8.0/i),
        IS_IE9: null !== navigator.userAgent.match(/MSIE 9.0/i),
        IS_IE: null !== navigator.userAgent.match(/MSIE/i) || null !== navigator.userAgent.match(/Trident/i) && null !== navigator.userAgent.match(/rv:11/i),
        IS_EDGE: null !== navigator.userAgent.match(/Edge/i),
        IS_IPAD: null !== navigator.userAgent.match(/iPad/i),
        IS_MOBILE: null !== navigator.userAgent.match(/Mobile|Android/i),
        IS_ANDROID: null !== navigator.userAgent.match(/Android/i),
        IS_IOS: null !== navigator.userAgent.match(/(iPad|iPhone|iPod)/i) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1,
        IS_CHROME: null !== navigator.userAgent.match(/Chrome/i),
        IS_FIREFOX: null !== navigator.userAgent.match(/Firefox/i),
        IS_SAFARI: null !== navigator.userAgent.match(/^((?!chrome|android).)*safari/i),
        IS_APPLE: null !== navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i),
        IS_WINDOWS: null !== navigator.platform.match(/(Win32)/i),
        IS_TOUCH: null !== navigator.userAgent.match(/Touch/i),
        IS_KINDLE: null !== navigator.userAgent.match(/Kindle/i) || null !== navigator.userAgent.match(/Silk/i),
        IS_BRAILLENOTE: null !== navigator.userAgent.match(/KeyWeb/i),
        IS_IN_IFRAME: window.parent !== window
    };
    return o.IS_TABLET = o.IS_IPAD || o.IS_ANDROID || o.IS_KINDLE,
    o.IS_TOUCH_DEVICE = o.SHOULD_NOT_AUTOFOCUS = o.IS_IOS || o.IS_ANDROID || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i),
    o.IOS_VERSION = (n = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)) ? [parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3] || 0, 10)] : null,
    o.MAC_VERSION = function() {
        var n = navigator.appVersion.match(/OS X (\d+)_(\d+)_?(\d+)?/);
        return n ? [parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3] || 0, 10)] : null
    }(),
    o.CHROME_VERSION = function() {
        var n = navigator.appVersion.match(/Chrom(e|ium)\/([0-9]+)\.([0-9]+)\.?([0-9]+)?/);
        return n ? [parseInt(n[2], 10), parseInt(n[3], 10), parseInt(n[4] || 0, 10)] : null
    }(),
    o.SUPPORTS_INPUTMODE = (t = o.IOS_VERSION,
    a = o.MAC_VERSION,
    r = o.CHROME_VERSION,
    t && t[0] >= 13 || o.IS_IOS && !t && a && (a[0] > 10 || 10 === a[0] && a[1] >= 15) || o.IS_ANDROID && r && r[0] >= 76),
    o.SUPPORTS_TRANSLATE3D = !1,
    i(document).ready(function() {
        var n, t, a = document.createElement("p"), r = {
            webkitTransform: "-webkit-transform",
            OTransform: "-o-transform",
            msTransform: "-ms-transform",
            MozTransform: "-moz-transform",
            transform: "transform"
        };
        for (var e in document.body.insertBefore(a, null),
        r)
            if (void 0 !== a.style[e]) {
                if (a.style[e] = "translate3d(1px,1px,1px)",
                !(t = window.getComputedStyle(a)))
                    return;
                n = t.getPropertyValue(r[e])
            }
        document.body.removeChild(a),
        o.SUPPORTS_TRANSLATE3D = void 0 !== n && n.length > 0 && "none" !== n
    }),
    o.translateRule = function(n, t) {
        return o.SUPPORTS_TRANSLATE3D ? "translate3d(" + n + (n ? "px" : "") + "," + t + (t ? "px" : "") + ",0)" : "translate(" + n + (n ? "px" : "") + "," + t + (t ? "px" : "") + ")"
    }
    ,
    o.SUPPORTS_CANVAS = !(!(e = document.createElement("canvas")).getContext || !e.getContext("2d")),
    o
});
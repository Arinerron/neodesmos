
define('core/lib/color-helpers', ["require", "exports"], function(require, e) {
    "use strict";
    function r(e) {
        return t(e) ? (e.match(/^#([A-Fa-f0-9]{3})$/g) && (e = "#" + e[1] + e[1] + e[2] + e[2] + e[3] + e[3]),
        e.toLowerCase()) : e
    }
    function t(e) {
        return "string" == typeof e && (e.match(/^#([A-Fa-f0-9]{3})$/g) || e.match(/^#([A-Fa-f0-9]{6})$/g))
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.colors = e.getDisplayColor = e.mutateOpacity = e.parseHex = e.invertColor = e.shadeColor = e.isValidHexColor = e.normalizeColor = void 0,
    e.normalizeColor = r,
    e.isValidHexColor = t,
    e.shadeColor = function(e, a) {
        if (!t(e = r(e)))
            return e;
        a > 1 && (a = 1),
        a < -1 && (a = -1);
        var o = parseInt(e.slice(1), 16)
          , n = a < 0 ? 0 : 255
          , i = a < 0 ? -1 * a : a
          , l = o >> 16
          , c = o >> 8 & 255
          , s = 255 & o;
        return "#" + (16777216 + 65536 * (Math.round((n - l) * i) + l) + 256 * (Math.round((n - c) * i) + c) + (Math.round((n - s) * i) + s)).toString(16).slice(1)
    }
    ,
    e.invertColor = function(e) {
        if (!t(e = r(e)))
            return e;
        var a = "0123456789abcdef";
        return "#" + e.slice(1).split("").map(function(e) {
            return a[15 - a.indexOf(e)]
        }).join("")
    }
    ,
    e.parseHex = function(e) {
        if (3 === (e = e.replace(/#/, "")).length)
            var r = parseInt(e.slice(0, 1) + e.slice(0, 1), 16)
              , t = parseInt(e.slice(1, 2) + e.slice(1, 2), 16)
              , a = parseInt(e.slice(2, 3) + e.slice(2, 3), 16);
        else if (6 === e.length)
            r = parseInt(e.slice(0, 2), 16),
            t = parseInt(e.slice(2, 4), 16),
            a = parseInt(e.slice(4, 6), 16);
        else
            r = 0,
            t = 0,
            a = 0;
        return {
            r: r,
            g: t,
            b: a
        }
    }
    ,
    e.mutateOpacity = function(e, r) {
        var t = /(rgba\([\d]+\,\ ?[\d]+\,\ ?[\d]+\,\ ?)[\d.]+(\))/;
        return e.match(t) ? e.replace(t, "$1" + r + "$2") : e
    }
    ,
    e.getDisplayColor = function(e, r) {
        if (r && r.colorLatexValue) {
            var t = r.colorLatexValue;
            return Array.isArray(t) ? t[0] : t
        }
        return e.color
    }
    ,
    e.colors = {
        RED: "#c74440",
        BLUE: "#2d70b3",
        GREEN: "#388c46",
        PURPLE: "#6042a6",
        ORANGE: "#fa7e19",
        BLACK: "#000000",
        GRAY: "#aaaaaa"
    }
});
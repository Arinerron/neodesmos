
define('core/lib/number-to-latex', ["require", "exports"], function(require, e) {
    "use strict";
    function r(e) {
        var r = e + "";
        if (/\d+\.?\d*e[\+\-]*\d+/i.test(r)) {
            var t = String(r).toLowerCase().split("e")
              , n = parseFloat(t[0])
              , i = parseInt(t[1], 10)
              , a = Math.abs(i)
              , o = Math.abs(n).toString().split(".");
            if (i < 0)
                r = "0." + new Array(a).join("0") + o.join("");
            else {
                var f = o[1];
                f && (a -= f.length),
                r = o.join("") + new Array(a + 1).join("0")
            }
            n < 0 && (r = "-" + r)
        }
        return r
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.numberToStatsConfidenceLatex = e.numberToDecimalString = void 0,
    e.default = function(e) {
        if ("string" == typeof e)
            return e;
        if (void 0 === e)
            return "";
        if (isNaN(e))
            return "\\frac{0}{0}";
        if (e === 1 / 0)
            return "\\infty";
        if (e === -1 / 0)
            return "-\\infty";
        var r = e + "";
        return r = (r = r.replace(/^1e\+?([-\d]+)/, "10^{$1}")).replace(/([-\d\.]+)e\+?([-\d]+)/, "$1\\cdot 10^{$2}")
    }
    ,
    e.numberToDecimalString = r,
    e.numberToStatsConfidenceLatex = function(e, t) {
        void 0 === t && (t = 2);
        var n, i = r(e), a = i.indexOf(".");
        if (-1 === a)
            return i;
        for (var o = a + 1; o < i.length; o++)
            if (n) {
                if (i[o] !== n)
                    break
            } else {
                if ("0" !== i[o] && "9" !== i[o])
                    break;
                n = i[o]
            }
        return i.substr(0, Math.max(a + 5, o + t))
    }
});
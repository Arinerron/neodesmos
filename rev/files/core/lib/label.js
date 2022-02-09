define('core/lib/label', ["require", "exports", "underscore", "core/math/distance", "core/math/tofraction"], function(require, e, t, n, r) {
    "use strict";
    function a(e, t) {
        if (void 0 === t && (t = e),
        isNaN(e) || !isFinite(e))
            return {
                ariaString: "undefined",
                string: "undefined",
                value: e
            };
        if (0 === e)
            return {
                ariaString: "0",
                string: "0",
                value: e
            };
        Math.abs(e) > Math.abs(t) && (t = e);
        var a, i = r.default(e / Math.PI, 24);
        if (m(t) && n.approx(i.n / i.d * Math.PI, e, 3))
            return {
                ariaString: f(a = (0 === i.n ? "0" : 1 === i.n ? "π" : -1 === i.n ? "-π" : i.n.toString() + "π") + (1 === i.d ? "" : "/" + i.d.toString())),
                string: a,
                value: i.n / i.d * Math.PI
            };
        if (m(t))
            return {
                ariaString: f(a = function(e) {
                    return "-0" === e ? "0" : e
                }(l(e.toFixed(v(t))))),
                string: a,
                value: parseFloat(a)
            };
        var u = p(e.toExponential(v(t / e))).split("e")
          , o = u[0] + "×10"
          , c = u[1].replace("+", "");
        return {
            ariaString: f(a = p(e.toExponential(v(t / e))).replace("+", "")),
            string: a,
            mantissa: o,
            superscript: c,
            value: parseFloat(a)
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.trimLatex = e.latexToIdentifier = e.identifierToHTML = e.identifierToLatex = e.formatSymbol = e.truncatedAriaLabel = e.truncatedLatexLabel = e.truncatedPlainmathLabel = e.truncatedHTMLLabel = e.numericLabel = e.canDisplayAsFraction = e.point = e.value = void 0,
    e.value = a;
    var i = {
        "[e]": " times 10 to the ",
        "[+]": " plus ",
        "[-]": " minus ",
        "[*]": " times ",
        "[/]": " over ",
        "[π]": " pi ",
        "[τ]": " tau ",
        "[θ]": " theta ",
        "[ϕ]": " phi "
    }
      , u = new RegExp(Object.keys(i).join("|"),"gi");
    function o(e) {
        return i["[" + e + "]"]
    }
    var c = /(\.)([0-9]+)/g;
    function s(e, t, n) {
        return t + n.split("").join(" ").trim()
    }
    function f(e) {
        return e.replace(c, s).replace(u, o).replace(/ +/gi, " ").trim()
    }
    e.point = function(e, t, n, r) {
        var i = a(e, t);
        return [i, a(r(i.value), n)]
    }
    ;
    var d = /\.?0+$/;
    function l(e) {
        return -1 === e.indexOf(".") ? e : e.replace(d, "")
    }
    function p(e) {
        return e.replace(/\.?0+e/, "e")
    }
    function m(e) {
        return 1e-4 < (e = Math.abs(e)) && e < 1e7
    }
    function v(e) {
        return e = Math.abs(e),
        e = Math.max(e, 1e-16),
        Math.max(3, Math.floor(4.5 - Math.log(e) / Math.LN10))
    }
    function h(e) {
        return 1e6 / Math.sqrt(Math.abs(e))
    }
    function b(e) {
        var t = h(e);
        if (t < 1)
            return !1;
        if (t > 1e12)
            return !1;
        var n = r.default(e, t)
          , a = n.n
          , i = n.d;
        return 1 !== i && e === e + Math.pow(2, -3) * Math.abs(a / i - e)
    }
    function g(e, t) {
        if (t = t || {},
        isNaN(e) || !isFinite(e))
            return {
                type: "undefined"
            };
        if (0 === e || t.zeroCutoff && Math.abs(e) < t.zeroCutoff)
            return {
                type: "decimal",
                value: "0"
            };
        var n = t.smallCutoff || .001
          , a = t.bigCutoff || 1e6
          , i = t.digits || 10
          , u = p(e.toExponential(i - 2)).match(/([\d\.\-]+)e\+?([\d\-]+)/);
        if (!u)
            return {
                type: "undefined"
            };
        var o = parseInt(u[2], 10) >= i;
        if (b(e) && t.displayAsFraction) {
            var c = r.default(e, h(e));
            return {
                type: "fraction",
                numerator: c.n.toString(),
                denominator: c.d.toString()
            }
        }
        if (Math.abs(e) > a || Math.abs(e) < n || o)
            return {
                type: "scientific",
                mantissa: u[1],
                exponent: u[2]
            };
        var s = l(e.toPrecision(i));
        return e !== Number(s) && t.addEllipses && (s += "..."),
        {
            type: "decimal",
            value: s
        }
    }
    function x(e) {
        e = e.replace("\\", "");
        var t = {
            pi: "π",
            tau: "τ",
            theta: "θ",
            phi: "ϕ",
            div: "÷",
            cdot: "⋅",
            times: "×",
            lt: "<",
            gt: ">",
            le: "≤",
            ge: "≥",
            sim: "∼",
            ldots: "…",
            prime: "′",
            approx: "≈",
            to: "→",
            "->": "→"
        };
        return t.hasOwnProperty(e) ? t[e] : e
    }
    e.canDisplayAsFraction = b,
    e.numericLabel = g,
    e.truncatedHTMLLabel = function(e, t) {
        var n = g(e, t);
        switch (n.type) {
        case "undefined":
            return "undefined";
        case "decimal":
            return n.value;
        case "scientific":
            return n.mantissa + "<span class='dcg-cross'>×</span>10<sup>" + n.exponent + "</sup>";
        case "fraction":
            return "1" === n.denominator ? n.numerator : n.numerator + "/" + n.denominator;
        default:
            return n
        }
    }
    ,
    e.truncatedPlainmathLabel = function(e, t) {
        var n = g(e, t);
        switch (n.type) {
        case "undefined":
            return "undefined";
        case "decimal":
            return n.value;
        case "scientific":
            return n.mantissa + " * 10^" + n.exponent;
        case "fraction":
            return "1" === n.denominator ? n.numerator : n.numerator + "/" + n.denominator;
        default:
            return n
        }
    }
    ,
    e.truncatedLatexLabel = function(e, t) {
        var n = g(e, t);
        switch (n.type) {
        case "undefined":
            return "undefined";
        case "decimal":
            return n.value;
        case "scientific":
            return n.mantissa + "\\times10^{" + n.exponent + "}";
        case "fraction":
            return "1" === n.denominator ? n.numerator : "-" === n.numerator[0] ? "-\\frac{" + n.numerator.slice(1) + "}{" + n.denominator + "}" : "\\frac{" + n.numerator + "}{" + n.denominator + "}";
        default:
            return n
        }
    }
    ,
    e.truncatedAriaLabel = function(e, t) {
        var n = g(e, t);
        switch (n.type) {
        case "undefined":
            return "undefined";
        case "decimal":
            return f(n.value);
        case "scientific":
            return f(n.mantissa + "e" + n.exponent);
        case "fraction":
            return f(n.numerator + "/" + n.denominator);
        default:
            return n
        }
    }
    ,
    e.formatSymbol = x,
    e.identifierToLatex = function(e) {
        var t = e.split("_")
          , n = "";
        return t[0].length > 1 && (n += "\\"),
        n += t[0],
        t[1] && (n += "_{" + t[1] + "}"),
        n
    }
    ,
    e.identifierToHTML = function(e) {
        if (!e)
            return "";
        var n = e.split("_").map(x).map(t.escape)
          , r = n[0];
        return n[1] && (r += "<sub>" + n[1] + "</sub>"),
        r
    }
    ,
    e.latexToIdentifier = function(e) {
        return (e = e.replace(/\\operatorname\{(.*)\}/, "$1")).replace(/[{}\\]/g, "")
    }
    ,
    e.trimLatex = function(e) {
        return e.replace(/^(\\ | |\\space)+/, "").replace(/(\\ | |\\space)+$/, "")
    }
});
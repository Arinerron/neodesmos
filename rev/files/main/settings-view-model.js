define('main/settings-view-model', ["require", "exports", "tslib", "core/lib/label"], function(require, t, i, e) {
    "use strict";
    function n(t, i) {
        var n = e.value(t, i)
          , a = "";
        if (n.mantissa)
            a = n.mantissa.split("×").join("\\cdot") + "^{" + n.superscript + "}";
        else {
            var m = n.string.split("/");
            a = 2 === m.length ? "-" === m[0][0] ? "-\\frac{" + m[0].slice(1) + "}{" + m[1] + "}" : "\\frac{" + m[0] + "}{" + m[1] + "}" : n.string
        }
        return a = a.replace(/π/, "\\pi")
    }
    function a(t) {
        return {
            xmin: n(t.xmin, t.xmax - t.xmin),
            xmax: n(t.xmax, t.xmax - t.xmin),
            ymin: n(t.ymin, t.ymax - t.ymin),
            ymax: n(t.ymax, t.ymax - t.ymin)
        }
    }
    function m(t, i) {
        return 0 === t ? "" : n(t, i)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.defaultSettingsViewModel = t.limitLatex = t.formatStep = t.formatViewport = t.formatLatex = void 0,
    t.formatLatex = n,
    t.formatViewport = a,
    t.formatStep = m,
    t.limitLatex = function(t, e, n) {
        var r = a(t);
        return i.__assign(i.__assign({}, r), {
            xstep: m(e, t.xmax - t.xmin),
            ystep: m(n, t.ymax - t.ymin)
        })
    }
    ,
    t.defaultSettingsViewModel = function() {
        return {
            limitLatex: {
                xmin: "",
                xmax: "",
                xstep: "",
                ymin: "",
                ymax: "",
                ystep: ""
            }
        }
    }
});
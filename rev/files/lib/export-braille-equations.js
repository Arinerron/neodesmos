define('lib/export-braille-equations', ["require", "exports", "abraham", "graphing-calc/models/expression", "expressions/regression_view", "core/lib/number-to-latex"], function(require, e, r, t, s, a) {
    "use strict";
    function n(e, t, s) {
        if (void 0 === s && (s = !1),
        s && (e = e.replace(/ /g, "\\ ")),
        "none" === t)
            return e;
        var a = "nemeth" === t ? r.latexToNemeth(e) : r.latexToUeb(e);
        return a.isError ? "" : r.UnicodeBraille.toBrailleAscii(a.value)
    }
    function o(e) {
        var r = "--------------------";
        return r + "\n" + e + "\n" + r
    }
    function i(e, r) {
        var t = "" + e;
        return "nemeth" === r ? n(t, r, !1) + "_4" : "ueb" === r ? n(t + ".", r, !1) : ""
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getBrailleEquationsBasic = e.getBrailleEquationsGraphing = void 0,
    e.getBrailleEquationsGraphing = function(e, r) {
        if ("none" === r)
            return "";
        var u = [];
        u.push(n("Expression List", r, !0)),
        u.push(""),
        u.push("");
        for (var l = "", p = e.getItemCount(), d = 0; d < p; d++) {
            var h = e.getItemModelByIndex(d);
            if (h && !h.secret) {
                "" !== l && "folder" !== h.type && l !== h.folderId && (u.push(o(n("End Folder", r, !0))),
                l = "");
                var c = "";
                switch (h.type) {
                case "expression":
                    if (!h.hidden) {
                        var g = i(h.displayIndex, r);
                        c = h.latex;
                        var v = []
                          , f = h.formula;
                        if (f && !t.isEmpty(h))
                            if (e.shouldShowEvaluationForItem(h.id)) {
                                var x = f.zero_values && f.zero_values.length ? f.zero_values[0].val : f.constant_value;
                                Array.isArray(x) ? c += "\\ " + x.length + "\\ element\\ list" : c += "=" + x
                            } else if (t.shouldShowCDFFooter(h))
                                v.push(n("Min=" + t.getCDFMin(h), r, !1)),
                                v.push(n("Max=" + t.getCDFMax(h), r, !1)),
                                t.isCDFMaxValid(h) && t.isCDFMinValid(h) && v.push(n("CDF=" + t.getCDFEvaluation(h), r, !1));
                            else if (t.isTTest(h)) {
                                var m = t.getTTestResults(h);
                                m && (v.push(n("<" + a.numberToStatsConfidenceLatex(m.lessThan, 5), r, !1)),
                                v.push(n(">" + a.numberToStatsConfidenceLatex(m.greaterThan, 5), r, !1)),
                                v.push(n("\\ne" + a.numberToStatsConfidenceLatex(m.notEqual, 5), r, !1)))
                            } else if (f.is_regression && f.regression) {
                                var E = f.regression
                                  , b = E.statistics
                                  , y = E.parameters;
                                for (var S in b.hasOwnProperty("Rsquared") && v.push(n("R^2=" + s.getRoundedStat(E, "Rsquared"), r, !1)),
                                b.hasOwnProperty("rsquared") && v.push(n("r^2=" + s.getRoundedStat(E, "rsquared"), r, !1)),
                                b.hasOwnProperty("r") && v.push(n("r=" + s.getRoundedStat(E, "r"), r, !1)),
                                b.hasOwnProperty("RMSE") && v.push(n("\\operatorname{RMSE}=" + s.getRoundedStat(E, "RMSE"), r, !1)),
                                y)
                                    v.push(n(S + "=" + s.getRoundedParam(E, S), r, !1))
                            }
                        u.push(g + "  " + n(c, r, !1)),
                        u.push.apply(u, v)
                    }
                    break;
                case "text":
                    u.push(n(h.text, r, !0));
                    break;
                case "folder":
                    h.collapsed ? c = "Collapsed Folder " + h.title : (c = "Start Folder " + h.title,
                    l = h.id),
                    u.push(o(n(c, r, !0)));
                    break;
                case "image":
                    u.push(n("Image", r, !1));
                    break;
                case "table":
                    u.push(o(n("Start Table", r, !0)));
                    for (var F = 0, T = h.rowModels; F < T.length; F++) {
                        for (var C = [], M = 0, R = T[F].cells; M < R.length; M++) {
                            var q = R[M]
                              , w = "";
                            if ("header" === q.type)
                                w = q.latex || "";
                            else if ("cell" === q.type) {
                                var B = q.column.index
                                  , _ = q.row.index - 1;
                                w = q.column.disabled ? q.column.computedValues[_] || "" : h.columns[B].values[_] || ""
                            }
                            C.push(n(w, r))
                        }
                        var I = C.join("\t");
                        /^\t/.test(I) || u.push(I)
                    }
                    u.push(o(n("End Table", r, !0)));
                    break;
                default:
                    return h
                }
            }
        }
        return "" !== l && u.push(o(n("End Folder", r, !0))),
        u.join("\n")
    }
    ,
    e.getBrailleEquationsBasic = function(e, r) {
        if ("none" === r)
            return "";
        var t = [];
        t.push(n("Expression List", r, !0)),
        t.push(""),
        t.push("");
        for (var s = 0, a = e.getExpressionOrder(); s < a.length; s++) {
            var o = a[s]
              , u = i(e.getExpressionIndex(o) + 1, r)
              , l = e.getExpressionLatex(o)
              , p = e.getExpressionValue(o);
            void 0 !== p && (l += "=" + p),
            t.push(u + "  " + n(l, r, !1))
        }
        return t.join("\n")
    }
});

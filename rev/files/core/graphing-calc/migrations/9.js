define('core/graphing-calc/migrations/9', ["require", "exports", "tslib", "core/lib/random-seed", "../json/ticker"], function(require, e, i, r, n) {
    "use strict";
    function l(e, i, r) {
        if (e.verticalLabel)
            switch (delete i.verticalLabel,
            i.labelAngle = r ? "90" : "\\frac{\\pi}{2}",
            e.labelOrientation) {
            case "above":
                i.labelOrientation = "right";
                break;
            case "below":
                i.labelOrientation = "left";
                break;
            case "left":
                i.labelOrientation = "above";
                break;
            case "right":
                i.labelOrientation = "below"
            }
        e.extendedLabelOrientation && (i.labelOrientation = e.extendedLabelOrientation,
        delete i.extendedLabelOrientation)
    }
    function t(e, r) {
        if (e.vizProps)
            switch (e.vizProps.dotplotSize) {
            case "small":
                r.pointSize = "9";
                break;
            case "large":
                r.pointSize = "20"
            }
        if (e.vizProps) {
            var n = i.__assign({}, e.vizProps);
            delete n.dotplotSize,
            Object.keys(n).length ? r.vizProps = n : delete r.vizProps
        }
    }
    function a(e) {
        return e.filter(function(e) {
            var i = e.assignment
              , r = e.expression;
            return !!i && !!r
        })
    }
    function o(e) {
        return e.map(function(e) {
            return e.assignment + "\\to " + e.expression
        }).join(",") || ""
    }
    function s(e) {
        for (var i, r = JSON.stringify(e), n = /_(\d)|_\{(\d+)\}/g, l = {}; null !== (i = n.exec(r)); ) {
            l[void 0 !== i[1] ? i[1] : i[2]] = !0
        }
        return l
    }
    function f(e, i) {
        for (var r = i + 1; ; r++)
            if (!e[r])
                return r
    }
    function d(e) {
        for (var i, r = JSON.stringify(e), n = /"(\d+)"/g, l = {}; null !== (i = n.exec(r)); ) {
            l[void 0 !== i[1] ? i[1] : i[2]] = !0
        }
        return l
    }
    function c(e, i) {
        for (var r = i + 1; ; r++)
            if (!e[r])
                return r
    }
    function u(e, i) {
        var r = {
            handlerLatex: e,
            playing: !0,
            open: !0
        };
        return void 0 !== i && (r.minStepLatex = function(e) {
            if (/^\d+$/.test(e)) {
                var i = parseInt(e, 10);
                return 0 === i ? "\\infty" : "" + Math.round(1e3 / i)
            }
            return "\\frac{1000}{" + e + "}"
        }(i)),
        r
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.rulesToLatex = e.filterEmptyRules = void 0,
    e.filterEmptyRules = a,
    e.rulesToLatex = o,
    e.default = function(e) {
        if (8 !== e.version)
            throw new Error("Unexpected version: " + e.version);
        var p = !1;
        e.graph && e.graph.degreeMode && (p = !0);
        for (var b, v, x = e.expressions.ticker || n.DEFAULTS, g = 0, k = 0, h = [], I = 0, _ = e.expressions.list; I < _.length; I++) {
            var y = _[I];
            switch (y.type) {
            case "expression":
                l(y, w = i.__assign({}, y), p),
                t(y, w);
                var O = void 0;
                if (y.clickableInfo && y.clickableInfo.rules) {
                    var m = y.clickableInfo
                      , z = m.rules
                      , L = i.__rest(m, ["rules"])
                      , S = o(j = a(z));
                    if (j.length > 1) {
                        b || (b = s(e)),
                        g = f(b, g),
                        v || (v = d(e)),
                        k = c(v, k);
                        var P = "A_{" + g + "}";
                        L.latex = P,
                        O = {
                            type: "expression",
                            id: "" + k,
                            latex: P + "=" + S
                        },
                        void 0 !== y.folderId && (O.folderId = y.folderId)
                    } else
                        L.latex = S;
                    w.clickableInfo = L
                }
                w.clickableInfo && w.clickableInfo.enabled && w.hidden && (w.clickableInfo.enabled = !1),
                h.push(w),
                O && h.push(O);
                break;
            case "image":
                if (y.clickableInfo && y.clickableInfo.rules) {
                    var w = i.__assign({}, y)
                      , A = y.clickableInfo;
                    z = A.rules,
                    L = i.__rest(A, ["rules"]),
                    S = o(j = a(z)),
                    O = void 0;
                    if (j.length > 1) {
                        b || (b = s(e)),
                        g = f(b, g),
                        v || (v = d(e)),
                        k = c(v, k);
                        P = "A_{" + g + "}";
                        L.latex = P,
                        O = {
                            type: "expression",
                            id: "" + k,
                            latex: P + "=" + S
                        },
                        void 0 !== y.folderId && (O.folderId = y.folderId)
                    } else
                        L.latex = S;
                    w.clickableInfo = L,
                    h.push(w),
                    O && h.push(O)
                } else
                    h.push(y);
                break;
            case "simulation":
                var j, E = void 0;
                if (y.clickableInfo && y.clickableInfo.rules)
                    E = o(j = a(y.clickableInfo.rules));
                else
                    E = "";
                if (y.isPlaying && "" !== E)
                    b || (b = s(e)),
                    E = (P = "A_{" + (g = f(b, g)) + "}") + "=" + E,
                    x = u(P, y.fps);
                w = {
                    type: "expression",
                    id: y.id,
                    latex: E
                };
                void 0 !== y.folderId && (w.folderId = y.folderId),
                h.push(w);
                break;
            default:
                h.push(y)
            }
        }
        return {
            version: 9,
            randomSeed: e.randomSeed || r.default(),
            graph: e.graph,
            expressions: {
                list: h,
                ticker: x
            }
        }
    }
});
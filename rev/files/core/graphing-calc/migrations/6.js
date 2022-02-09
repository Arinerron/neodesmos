define('core/graphing-calc/migrations/6', ["require", "exports", "core/lib/deepCopy", "underscore", "core/math/sliders", "core/math/evaluate-single-expression"], function(require, e, r, i, t, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.migrateState = void 0;
    function n(e) {
        var r = {};
        for (var i in e)
            if (e.hasOwnProperty(i) && "style" !== i)
                if ("values" === i && (r[i] = e[i].map(function(e) {
                    return e ? "" + e : ""
                })),
                "columnMode" !== i || e.hasOwnProperty("points") || e.hasOwnProperty("lines"))
                    r[i] = e[i];
                else
                    switch (e[i]) {
                    case "LINES":
                        r.points = !1,
                        r.lines = !0;
                        break;
                    case "POINTS_AND_LINES":
                        r.points = !0,
                        r.lines = !0;
                        break;
                    default:
                        r.points = !0,
                        r.lines = !1
                    }
        return r.hasOwnProperty("pointStyle") || (r.pointStyle = "POINT"),
        r.hasOwnProperty("lineStyle") || (r.lineStyle = "SOLID"),
        r.id = "" + r.id,
        r
    }
    var l = {
        sliderMin: "min",
        sliderMax: "max",
        sliderInterval: "step",
        sliderHardMin: "hardMin",
        sliderHardMax: "hardMax",
        sliderAnimationPeriod: "animationPeriod",
        sliderLoopMode: "loopMode",
        sliderPlayDirection: "playDirection",
        sliderIsPlaying: "isPlaying"
    };
    function s(e) {
        var r = function(e) {
            if (function(e) {
                return !(e.length < 2) && "`" === e[0] && "`" === e[e.length - 1]
            }(e))
                return {
                    raw: e,
                    parts: [e]
                };
            for (var r, i = "({" + ["[a-zA-Z][0-9]*", "[a-zA-Z]_[a-zA-Z0-9]+", "[a-zA-Z]_\\{[a-zA-Z0-9]+\\}"].join("})|({") + "})", t = new RegExp(i,"g"), a = [], n = 0, l = 0; r = t.exec(e); ) {
                (l = r.index) > n && a.push(e.substr(n, l - n));
                var s = r[0]
                  , o = s.replace(/[{}\$]/g, "").replace(/^([a-zA-Z])([0-9]+)$/, "$1_$2");
                a.push({
                    symbol: o,
                    str: s
                }),
                n = r.index + s.length
            }
            return n < e.length && a.push(e.substr(n)),
            {
                raw: e,
                parts: a
            }
        }(e)
          , t = "";
        return i.each(r.parts, function(e) {
            t += "object" == typeof e && e.str ? "$" + e.str : e
        }),
        t
    }
    function o(e, r, o, d) {
        var p, f = e.type, c = {};
        switch (f) {
        case "folder":
            for (p in e)
                e.hasOwnProperty(p) && ("memberIds" === p || (c[p] = e[p]));
            break;
        case "expression":
            for (p in e)
                if (e.hasOwnProperty(p))
                    if ("style" !== p || e.hasOwnProperty("pointStyle") || e.hasOwnProperty("lineStyle"))
                        l.hasOwnProperty(p) ? (c.slider = c.slider || {},
                        c.slider[l[p]] = e[p]) : c[p] = e[p],
                        e.label && (c.label = s(e.label));
                    else {
                        var u = e[p];
                        i.contains(["POINT", "OPEN", "CROSS"], u) ? (c.pointStyle = u,
                        c.lineStyle = "SOLID") : i.contains(["SOLID", "DASHED", "DOTTED"], u) ? (c.pointStyle = "POINT",
                        c.lineStyle = u) : (c.pointStyle = "POINT",
                        c.lineStyle = "SOLID")
                    }
            c.latex && c.slider && !c.slider.isPlaying && function(e, r) {
                var i = e.latex.split("=");
                if (2 === i.length) {
                    var n = a.default(i[1], r);
                    if (isFinite(n)) {
                        var l = e.slider.hardMin ? a.default(e.slider.min || "-10", r) : void 0
                          , s = e.slider.hardMax ? a.default(e.slider.max || "10", r) : void 0
                          , o = e.slider.step ? a.default(e.slider.step, r) : void 0
                          , d = t.determineWhichLimitsAreCompatibleWithValue({
                            target: n,
                            step: o,
                            hardMin: l,
                            hardMax: s
                        });
                        d.min || (delete e.slider.hardMin,
                        delete e.slider.min),
                        d.max || (delete e.slider.hardMax,
                        delete e.slider.max),
                        d.step || delete e.slider.step
                    }
                }
            }(c, d),
            c.hasOwnProperty("fillOpacity") || (c.fillOpacity = .4),
            !1 === c.label && (c.label = ""),
            c.labelSize || (c.labelSize = "medium"),
            c.labelOrientation || (c.labelOrientation = "default"),
            c.verticalLabel || (c.verticalLabel = !1),
            c.interactiveLabel || (c.interactiveLabel = !1);
            break;
        case "image":
            for (p in e)
                e.hasOwnProperty(p) && "x" !== p && "y" !== p && (c[p] = e[p]);
            c.center = "\\left(" + (e.x || "0") + "," + (e.y || "0") + "\\right)",
            c.angle = e.angle || "0",
            c.foreground = !!c.foreground;
            break;
        case "text":
            for (p in e)
                e.hasOwnProperty(p) && (c[p] = e[p]);
            break;
        case "table":
            for (p in e)
                e.hasOwnProperty(p) && (c[p] = "columns" === p ? e[p].map(n) : e[p]);
            break;
        default:
            throw new Error("Unexpected expression type: " + f)
        }
        if (c.id = "" + c.id,
        "folder" === e.type)
            r.folderId = c.id,
            r.memberIds = e.memberIds,
            c.folderId = "";
        else {
            var h = o[c.id];
            r.memberIds && r.memberIds[h] ? c.folderId = r.folderId : (c.folderId = "",
            r.folderId = void 0,
            r.memberIds = void 0)
        }
        return c
    }
    e.migrateState = function(e) {
        if (5 !== e.version)
            throw new Error("Unexpected version: " + e.version);
        var i = !(!e.graph || !e.graph.degreeMode)
          , t = e.expressions.list
          , a = -1
          , n = {}
          , l = {}
          , s = {};
        return {
            version: 6,
            graph: e.graph,
            expressions: {
                list: t.map(function(e) {
                    return n[e.id] ? (-1 === a && (a = function(e) {
                        for (var r = 0, i = /^[0-9]+$/, t = e.length - 1; t >= 0; t--) {
                            var a, n = e[t], l = n.id;
                            if (i.test(l) && (a = parseInt(l, 10)) > r && (r = a),
                            "table" === n.type && n.columns)
                                for (var s = n.columns.length - 1; s >= 0; s--)
                                    l = n.columns[s].id,
                                    i.test(l) && (a = parseInt(l, 10)) > r && (r = a)
                        }
                        return r + 1
                    }(t)),
                    l[a] = e.id,
                    (e = r.default(e)).id = a + "",
                    a += 1) : l[e.id] = e.id,
                    n[e.id] = !0,
                    o(e, s, l, i)
                })
            }
        }
    }
});
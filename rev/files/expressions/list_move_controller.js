define('expressions/list_move_controller', ["require", "exports", "core/lib/dragmode", "core/lib/number-to-latex", "core/lib/label", "lib/rounding", "graphing-calc/models/expression", "graphing-calc/models/table", "graphing-calc/models/list", "graphing-calc/models/image", "core/math/poi", "core/math/functions"], function(require, e, t, i, r, a, n, o, l, s, d, g) {
    "use strict";
    function h(e, t) {
        return {
            left: e.x - t,
            right: e.x + t,
            top: e.y + t,
            bottom: e.y - t
        }
    }
    function m(e, i) {
        switch (i) {
        case t.DragMode.X:
            return 0 === e;
        case t.DragMode.Y:
            return 1 === e;
        case t.DragMode.XY:
            return !0;
        default:
            return !1
        }
    }
    function p(e, t, i) {
        if (0 === i[0] && 0 === i[1])
            return {
                x: t.x,
                y: t.y,
                width: e.width,
                height: e.height
            };
        var r = Math.cos(e.radianAngle)
          , a = Math.sin(e.radianAngle)
          , n = t.x - e.x
          , o = t.y - e.y;
        if (0 === i[0])
            return {
                x: e.x,
                y: e.y,
                width: e.width,
                height: 2 * i[1] * (r * o + a * n)
            };
        if (0 === i[1])
            return {
                x: e.x,
                y: e.y,
                width: 2 * i[0] * (r * n - a * o),
                height: e.height
            };
        var l = 2 * (e.width * i[0] * (r * n - a * o) + e.height * i[1] * (a * n + r * o)) / (e.width * e.width + e.height * e.height);
        return {
            x: e.x,
            y: e.y,
            width: l * e.width,
            height: l * e.height
        }
    }
    function u(e) {
        return void 0 === e ? NaN : e[0]
    }
    function c(e, t, r, o, l) {
        var d = t.formula;
        if (!d || !d.move_strategy)
            return !1;
        var g = d.dimensions
          , m = {
            x: u(g.x),
            y: u(g.y),
            width: u(g.width),
            height: u(g.height),
            radianAngle: u(g.radianAngle)
        }
          , c = r.scaleFactor || [0, 0]
          , f = 0 !== c[0] && 0 !== c[1]
          , y = l.closestPointOnScreen(o)
          , x = function(e, t, i) {
            for (var r = ["x", "y", "width", "height"], a = {
                x: 1 / 0,
                y: 1 / 0,
                width: 1 / 0,
                height: 1 / 0
            }, n = {
                x: -1 / 0,
                y: -1 / 0,
                width: -1 / 0,
                height: -1 / 0
            }, o = 0, l = [{
                x: t.left,
                y: t.bottom
            }, {
                x: t.left,
                y: t.top
            }, {
                x: t.right,
                y: t.top
            }, {
                x: t.right,
                y: t.bottom
            }]; o < l.length; o++)
                for (var s = p(e, l[o], i), d = 0, g = r; d < g.length; d++) {
                    var h = g[d];
                    a[h] = Math.min(a[h], s[h]),
                    n[h] = Math.max(n[h], s[h])
                }
            return {
                min: a,
                max: n
            }
        }(m, l.pixelsToMath.mapRect(h(y, f ? .05 : .5)), c)
          , v = l.mathToPixels.mapRect({
            left: m.x - .5 * m.width,
            right: m.x + .5 * m.width,
            top: m.y - .5 * m.height,
            bottom: m.y + .5 * m.height
        })
          , b = Math.abs(v.right - v.left)
          , M = Math.abs(v.bottom - v.top)
          , w = l.mathToPixels.mapRect({
            left: x.min.x - .5 * x.min.width,
            right: x.min.x + .5 * x.min.width,
            top: x.min.y - .5 * x.min.height,
            bottom: x.min.y + .5 * x.min.height
        })
          , D = Math.abs(w.right - w.left)
          , S = Math.abs(w.bottom - w.top);
        if (D < b && D < 1 || S < M && S < 1)
            return !1;
        for (var I = ["width", "height", "x", "y"], P = !1, _ = 0; _ < I.length; _++) {
            var O = I[_]
              , B = d.move_strategy[_];
            switch (B.type) {
            case "updateCoordinate":
                var C = a.shortestDecimalBetween(x.min[O], x.max[O])
                  , A = i.default(C);
                switch (O) {
                case "width":
                case "height":
                    s.setMQAttribute(t, O, A);
                    break;
                case "x":
                    if ("updateCoordinate" === d.move_strategy[3].type) {
                        var G = a.shortestDecimalBetween(x.min.y, x.max.y)
                          , N = "\\left(" + A + "," + i.default(G) + "\\right)";
                        s.setMQAttribute(t, "center", N)
                    } else {
                        N = "\\left(" + A + "," + d.move_strategy[3].inputString + "\\right)";
                        s.setMQAttribute(t, "center", N)
                    }
                    break;
                case "y":
                    if ("updateCoordinate" !== d.move_strategy[2].type) {
                        N = "\\left(" + d.move_strategy[2].inputString + "," + A + "\\right)";
                        s.setMQAttribute(t, "center", N)
                    }
                    break;
                default:
                    return O
                }
                P = !0;
                break;
            case "updateSlider":
                var T = e.getItemModel(B.id);
                if (!T || "expression" !== T.type)
                    continue;
                var k = B.coefficients[0]
                  , L = B.coefficients[1]
                  , j = L * x.min[O] + k
                  , R = L * x.max[O] + k
                  , Q = a.shortestDecimalBetween(j, R)
                  , X = T.latex;
                n.adjustSliderByMovablePoint(T, Q),
                T.latex !== X && (P = !0)
            }
        }
        return P
    }
    function f(e, o, l, s, p) {
        var u = o.formula;
        if (!u || !u.move_strategy)
            return !1;
        var c = o.reconciledDragMode || t.DragMode.NONE
          , f = !1
          , y = s.closestPointOnScreen(l)
          , x = s.pixelsToMath.mapRect(h(y, .5))
          , v = [{
            min: x.left,
            max: x.right
        }, {
            min: x.top,
            max: x.bottom
        }];
        "updateCoordinate" !== u.move_strategy[0].type && "updateCoordinate" !== u.move_strategy[1].type || (n.setLatex(o, function(e, t, n) {
            var o;
            o = e.assignment ? r.identifierToLatex(e.assignment) + "=" : "";
            var l = a.shortestDecimalBetween(t[0].min, t[0].max)
              , s = a.shortestDecimalBetween(t[1].min, t[1].max)
              , d = "updateCoordinate" === e.move_strategy[0].type && m(0, n)
              , g = "updateCoordinate" === e.move_strategy[1].type && m(1, n);
            return o + "\\left(" + (d ? i.default(l) : e.move_strategy[0].inputString) + "," + (g ? i.default(s) : e.move_strategy[1].inputString) + "\\right)"
        }(u, v, c)),
        f = !0);
        for (var b, M, w, D, S, I, P, _ = function() {
            if ("updateSlider" !== (b = u.move_strategy[O]).type && "updateSliderNonlinear" !== b.type)
                return "continue";
            if (!m(O, c))
                return "continue";
            if (!(M = e.getItemModel(b.id)) || "expression" !== M.type)
                return "continue";
            if (w = M.latex,
            p && (D = 0 === O ? p.x : p.y),
            D) {
                var t = M.slider && "" !== M.slider.step && (("up" === D || "bigup" === D) && !M.slider.hardMax || ("down" === D || "bigdown" === D) && !M.slider.hardMin);
                n.adjustSliderByKeyboard(M, D, {
                    ignoreSoftLimits: t
                })
            } else if ("updateSlider" === b.type)
                S = b.coefficients[0],
                I = b.coefficients[1],
                P = a.shortestDecimalBetween(I * v[O].min + S, I * v[O].max + S),
                n.adjustSliderByMovablePoint(M, P);
            else if ("updateSliderNonlinear" === b.type) {
                b.compiled.fn || g.rehydrateCompiledFunction(b.compiled);
                var i = b.compiled.fn
                  , r = b.initialValue
                  , o = b.min
                  , l = b.max
                  , h = [y.x, y.y]
                  , x = d.findLocalClosestPointOnParametric(function(e) {
                    var t, r = i(e), a = r[0], n = r[1];
                    return [a = (t = s.mathToPixels.mapPoint({
                        x: a,
                        y: n
                    })).x, n = t.y]
                }, h, r, o, l, 1);
                if (x) {
                    var _ = a.shortestDecimalBetween(x[0], x[1]);
                    void 0 !== o && _ < o && (_ = o),
                    void 0 !== l && _ > l && (_ = l),
                    n.adjustSliderByMovablePoint(M, _)
                }
            }
            M.latex !== w && (f = !0)
        }, O = 0; O < 2; O++)
            _();
        return f
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.onMovePoint = e.onStopMovingPoint = e.onStartMovingPoint = void 0,
    e.onStartMovingPoint = function(e, i, r) {
        if (r.tableInfo) {
            l.setSelected(i, void 0);
            var a = e.getItemModel(r.tableInfo.tableId);
            if (!a || "table" !== a.type)
                return;
            o.setIsDraggingOnGrapher(a, !0)
        } else {
            var d = e.getItemModel(r.sketch.id);
            if (!d || "expression" !== d.type && "image" !== d.type)
                return;
            if ("image" !== d.type && l.setSelected(i, void 0),
            !d.formula || !d.formula.move_strategy)
                return;
            for (var g = d.formula.move_strategy, h = 0; h < g.length; h++)
                if ("updateCoordinate" === g[h].type)
                    "image" === d.type ? s.setIsDraggingOnGrapher(d, !0) : "expression" === d.type && n.setIsDraggingOnGrapher(d, !0);
                else if ("updateSlider" === g[h].type || "updateSliderNonlinear" === g[h].type) {
                    var m, p = e.getItemModel(g[h].id);
                    if (!p || "expression" !== p.type)
                        continue;
                    if ((m = "expression" === d.type ? d.reconciledDragMode : void 0) === t.DragMode.NONE || 0 === h && m === t.DragMode.Y || 1 === h && m === t.DragMode.X)
                        continue;
                    n.setSliderDragging(p, !0)
                }
        }
    }
    ,
    e.onStopMovingPoint = function(e, t) {
        for (var i = 0, r = e.getAllItemModels(); i < r.length; i++) {
            var a = r[i];
            "table" === a.type ? a.draggingOnGraphpaper && o.setIsDraggingOnGrapher(a, !1) : "expression" === a.type ? (a.sliderDragging && n.setSliderDragging(a, !1),
            a.draggingOnGraphpaper && n.setIsDraggingOnGrapher(a, !1)) : "image" === a.type && a.draggingOnGraphpaper && s.setIsDraggingOnGrapher(a, !1)
        }
    }
    ,
    e.onMovePoint = function(e, t, r, n, l) {
        if (t.tableInfo)
            return function(e, t, r, n) {
                var l = t.tableInfo.tableId
                  , s = t.tableInfo.rowIndex
                  , d = t.tableInfo.columnId
                  , g = t.tableInfo.dragX
                  , m = t.tableInfo.dragY
                  , p = e.getItemModel(l);
                if (p && "table" === p.type) {
                    var u = o.getColumnModel(p, d);
                    if (u) {
                        var c = n.closestPointOnScreen(r)
                          , f = n.pixelsToMath.mapRect(h(c, .5))
                          , y = {
                            x: i.default(a.shortestDecimalBetween(f.left, f.right)),
                            y: i.default(a.shortestDecimalBetween(f.top, f.bottom))
                        };
                        if (g && o.setCellLatex(p, {
                            row: s + 1,
                            column: 0
                        }, y.x),
                        m) {
                            var x = u.index;
                            o.setCellLatex(p, {
                                row: s + 1,
                                column: x
                            }, y.y)
                        }
                    }
                }
            }(e, t, r, n),
            !0;
        var s = e.getItemModel(t.sketch.id);
        return !!s && ("image" === s.type ? c(e, s, t, r, n) : "expression" === s.type && f(e, s, r, n, l))
    }
});
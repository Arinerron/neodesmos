
define('graphing/canvas-labels', ["require", "exports", "tslib", "core/lib/deepCopy", "graphing/svg-classes"], function(require, e, t, r, o) {
    "use strict";
    function n(e, t) {
        e.translate(t.left - .5, t.top - .5)
    }
    function i(e, t) {
        var r = document.createRange();
        r.selectNode(e);
        var o = r.getBoundingClientRect();
        if (o.width > 0 && o.height > 0) {
            var n = window.getComputedStyle(e.parentElement)
              , i = e.nodeValue || "";
            if (i) {
                var a = -.228 * parseFloat(n.fontSize)
                  , l = n.fontStyle + " " + n.fontWeight + " " + n.fontSize + " " + n.fontFamily;
                return {
                    type: "text",
                    rect: {
                        left: o.left - t.pointCenterX,
                        right: o.right - t.pointCenterY,
                        top: o.top - t.pointCenterY,
                        bottom: o.bottom - t.pointCenterY
                    },
                    text: i,
                    color: n.color || "#000",
                    font: l,
                    y: o.height + a,
                    hasOutline: t.hasOutline
                }
            }
        }
    }
    function a(e, t, r) {
        e.save(),
        e.font = t.font,
        r ? (e.strokeStyle = "#FFF",
        e.lineWidth = 3,
        e.miterLimit = 2,
        e.strokeText(t.text, 0, t.y)) : (e.fillStyle = t.color,
        e.fillText(t.text, 0, t.y)),
        e.restore()
    }
    function l(e, t, r) {
        e.save(),
        r ? (e.strokeStyle = "#FFF",
        e.lineWidth = 3) : (t.fillColor && (e.fillStyle = t.fillColor),
        t.strokeColor && (e.strokeStyle = t.strokeColor)),
        e.beginPath();
        for (var o = 0, n = t.instructions; o < n.length; o++) {
            var i = n[o];
            switch (i.type) {
            case "moveTo":
                e.moveTo(i.x, i.y);
                break;
            case "lineTo":
                e.lineTo(i.x, i.y);
                break;
            case "arcTo":
                e.arcTo(i.cx, i.cy, i.x, i.y, i.radius);
                break;
            case "ellipse":
                e.ellipse(i.centerX, i.centerY, i.radiusX, i.radiusY, i.rotation, i.startAngle, i.endAngle, i.anticlockwise)
            }
        }
        e.closePath(),
        r ? e.stroke() : (t.strokeColor && e.stroke(),
        t.fillColor && e.fill()),
        e.restore()
    }
    function s(e, t) {
        var r = Math.sqrt(e[0] * e[0] + e[1] * e[1])
          , o = Math.sqrt(t[0] * t[0] + t[1] * t[1])
          , n = e[0] * t[0] + e[1] * t[1]
          , i = Math.acos(n / (r * o));
        return e[0] * t[1] - e[1] * t[0] < 0 && (i *= -1),
        i
    }
    function c(e, t, r, o, n, i, a, l, c) {
        var p = Math.cos(n)
          , u = Math.sin(n)
          , h = (e - l) / 2
          , d = (t - c) / 2
          , f = p * h + u * d
          , y = -u * h + p * d
          , g = r * r
          , v = o * o
          , C = f * f
          , x = y * y
          , b = Math.sqrt((g * v - g * x - v * C) / (g * x + v * C));
        i === a && (b *= -1);
        var m = b * r * y / o
          , T = -b * o * f / r
          , w = [1, 0]
          , k = [(-f - m) / r, (-y - T) / o];
        return {
            centerX: p * m - u * T + (e + l) / 2,
            centerY: u * m + p * T + (t + c) / 2,
            radiusX: r,
            radiusY: o,
            startAngle: s(w, [(f - m) / r, (y - T) / o]),
            endAngle: s(w, k),
            rotation: n,
            anticlockwise: 0 === a
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.drawCommandsToCtx = e.computeDrawingCommandsForDOMLabel = void 0;
    var p = {};
    function u(e, o) {
        var n = e.childNodes[0];
        if (n && "path" === n.nodeName) {
            var i = e.getBoundingClientRect();
            if (i.width > 0 && i.height > 0) {
                for (var a = function(e, r) {
                    var o = e + "-" + r
                      , n = p[o];
                    if (n)
                        return n;
                    n = [],
                    p[o] = n;
                    var i = r.split(" ");
                    if (4 !== i.length)
                        return n;
                    var a = parseFloat(i[0])
                      , l = parseFloat(i[2])
                      , s = parseFloat(i[1])
                      , u = parseFloat(i[3])
                      , h = l - a
                      , d = u - s;
                    function f(e) {
                        return (e - a) / h
                    }
                    function y(e) {
                        return (e - s) / d
                    }
                    var g = new RegExp("(M[0-9-.]+ [0-9-.]+)|(L[0-9-.]+ [0-9-.]+)|(A[0-9-.]+ [0-9-.]+ [0-9-.]+ [0-9-.]+ [0-9-.]+ [0-9-.]+ [0-9-.]+)","g")
                      , v = e.match(g);
                    if (!v || !v.length)
                        return n;
                    for (var C = NaN, x = NaN, b = 0, m = v; b < m.length; b++) {
                        var T = m[b]
                          , w = T.substr(1).split(" ").map(parseFloat);
                        switch (T[0]) {
                        case "M":
                            C = f(w[0]),
                            x = y(w[1]),
                            n.push({
                                type: "moveTo",
                                x: C,
                                y: x
                            });
                            break;
                        case "L":
                            C = f(w[0]),
                            x = y(w[1]),
                            n.push({
                                type: "lineTo",
                                x: C,
                                y: x
                            });
                            break;
                        case "A":
                            var k = w[0] / h
                              , F = w[1] / d
                              , Y = w[2]
                              , X = w[3]
                              , M = w[4]
                              , S = f(w[5])
                              , N = y(w[6])
                              , A = c(C, x, k, F, Y, X, M, S, N);
                            C = S,
                            x = N,
                            n.push(t.__assign({
                                type: "ellipse"
                            }, A))
                        }
                    }
                    return n
                }(n.getAttribute("d") || "", e.getAttribute("viewBox") || ""), l = window.getComputedStyle(e), s = i.width, u = i.height, h = 0, d = a = r.default(a); h < d.length; h++) {
                    var f = d[h];
                    switch (f.type) {
                    case "moveTo":
                    case "lineTo":
                        f.x *= s,
                        f.y *= u;
                        break;
                    case "arcTo":
                        f.x *= s,
                        f.y *= u,
                        f.cx *= s,
                        f.cy *= u,
                        f.radius *= s;
                        break;
                    case "ellipse":
                        f.centerX *= s,
                        f.centerY *= u,
                        f.radiusX *= s,
                        f.radiusY *= u;
                        break;
                    default:
                        return f
                    }
                }
                return {
                    type: "path",
                    rect: {
                        left: i.left - o.pointCenterX,
                        right: i.right - o.pointCenterX,
                        top: i.top - o.pointCenterY,
                        bottom: i.bottom - o.pointCenterY
                    },
                    fillColor: l.color || "#000",
                    instructions: a
                }
            }
        }
    }
    function h(e, t, r) {
        var o = window.getComputedStyle(e);
        "0px" !== o.borderTopWidth && ((s = function(e, t, r) {
            var o = e.getBoundingClientRect();
            if (o.width > 0 && o.height > 0) {
                var n = o.width
                  , i = parseFloat(t.borderTopWidth || "1px")
                  , a = t.borderTopColor || "#000"
                  , l = [{
                    type: "moveTo",
                    x: 0,
                    y: 0
                }, {
                    type: "lineTo",
                    x: n,
                    y: 0
                }, {
                    type: "lineTo",
                    x: n,
                    y: i
                }, {
                    type: "lineTo",
                    x: 0,
                    y: i
                }];
                return {
                    type: "path",
                    rect: {
                        left: o.left - r.pointCenterX,
                        right: o.right - r.pointCenterX,
                        top: o.top - r.pointCenterY,
                        bottom: o.bottom - r.pointCenterY
                    },
                    instructions: l,
                    fillColor: a
                }
            }
        }(e, o, t)) && r.push(s));
        for (var n = e.childNodes, a = 0; a < n.length; a++) {
            var l = n[a];
            if (3 === l.nodeType)
                (s = i(l, t)) && r.push(s);
            else if ("svg" === l.nodeName) {
                var s;
                (s = u(l, t)) && r.push(s)
            } else
                1 === l.nodeType && h(l, t, r)
        }
    }
    e.computeDrawingCommandsForDOMLabel = function(e, t) {
        var r = [];
        if (t.hasBorder) {
            var o = function(e, t) {
                var r = e.getBoundingClientRect();
                if (r.width > 0 && r.height > 0) {
                    var o = -5
                      , n = r.width + 5
                      , i = -5
                      , a = r.height + 5
                      , l = [{
                        type: "moveTo",
                        x: -2,
                        y: i
                    }, {
                        type: "lineTo",
                        x: n - 3,
                        y: i
                    }, {
                        type: "arcTo",
                        cx: n,
                        cy: i,
                        x: n,
                        y: -2,
                        radius: 3
                    }, {
                        type: "lineTo",
                        x: n,
                        y: a - 3
                    }, {
                        type: "arcTo",
                        cx: n,
                        cy: a,
                        x: n - 3,
                        y: a,
                        radius: 3
                    }, {
                        type: "lineTo",
                        x: -2,
                        y: a
                    }, {
                        type: "arcTo",
                        cx: o,
                        cy: a,
                        x: o,
                        y: a - 3,
                        radius: 3
                    }, {
                        type: "lineTo",
                        x: o,
                        y: -2
                    }, {
                        type: "arcTo",
                        cx: o,
                        cy: i,
                        x: -2,
                        y: i,
                        radius: 3
                    }];
                    return {
                        type: "path",
                        disableGlow: !0,
                        rect: {
                            left: r.left - t.pointCenterX,
                            right: r.right - t.pointCenterX,
                            top: r.top - t.pointCenterY,
                            bottom: r.bottom - t.pointCenterY
                        },
                        instructions: l,
                        strokeColor: "#C2C2C2",
                        fillColor: "rgba(255,255,255,.75)"
                    }
                }
            }(e, t);
            o && r.push(o)
        }
        return h(e, t, r),
        r
    }
    ,
    e.drawCommandsToCtx = function(e, t) {
        o.save(t, "dcg-svg-label"),
        t.save(),
        o.restore(t);
        for (var r = 0, i = e; r < i.length; r++) {
            var s = i[r];
            switch (t.save(),
            n(t, s.rect),
            s.type) {
            case "path":
                s.disableGlow || l(t, s, !0);
                break;
            case "text":
                s.hasOutline && a(t, s, !0);
                break;
            default:
                return s
            }
            t.restore()
        }
        for (var c = 0, p = e; c < p.length; c++) {
            s = p[c];
            switch (t.save(),
            n(t, s.rect),
            s.type) {
            case "path":
                l(t, s, !1);
                break;
            case "text":
                a(t, s, !1);
                break;
            default:
                return s
            }
            t.restore()
        }
        t.restore()
    }
});
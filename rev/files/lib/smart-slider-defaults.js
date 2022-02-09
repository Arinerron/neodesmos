define('lib/smart-slider-defaults', ["require", "exports", "core/math/baseparser", "core/types/line-width", "core/types/point-size", "core/types/point-opacity", "core/types/line-opacity", "core/types/opacity"], function(require, e, i, n, a, r, t, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.checkVariableForBoundRestrictions = e.computeDefaults = void 0;
    var u = function(e) {
        return {
            value: "0",
            min: "0",
            max: e.degreeMode ? "360" : "2\\pi"
        }
    }
      , l = {
        latex: void 0,
        polarDomainMin: void 0,
        polarDomainMax: void 0,
        parametricDomainMin: void 0,
        parametricDomainMax: void 0,
        pointSize: function() {
            return {
                value: a.DEFAULT + "",
                min: "0",
                max: "10"
            }
        },
        labelAngle: u,
        labelSize: function() {
            return {
                value: "1",
                min: "0",
                max: "5"
            }
        },
        lineWidth: function() {
            return {
                value: n.DEFAULT + "",
                min: "0",
                max: "10"
            }
        },
        fillOpacity: function() {
            return {
                value: o.DEFAULT + "",
                min: "0",
                max: "1"
            }
        },
        lineOpacity: function() {
            return {
                value: t.DEFAULT + "",
                min: "0",
                max: "1"
            }
        },
        pointOpacity: function() {
            return {
                value: r.DEFAULT + "",
                min: "0",
                max: "1"
            }
        },
        sliderMin: void 0,
        sliderMax: void 0,
        sliderStep: void 0,
        residualVariable: void 0,
        tableHeader: void 0,
        tableCellValue: void 0,
        imageOpacity: function() {
            return {
                value: "1",
                min: "0",
                max: "1"
            }
        },
        imageCenter: void 0,
        imageHeight: function() {
            return {
                value: "10",
                min: "-10",
                max: "10"
            }
        },
        imageWidth: function() {
            return {
                value: "10",
                min: "-10",
                max: "10"
            }
        },
        imageAngle: u,
        tickerMinStep: function() {
            return {
                value: "0",
                min: "0"
            }
        },
        tickerHandler: void 0
    }
      , c = {
        rgb: {
            paramBounds: function(e) {
                return {
                    value: "0",
                    min: "0",
                    max: "255",
                    step: "1"
                }
            }
        },
        hsv: {
            paramBounds: function(e) {
                return 0 === e ? {
                    value: "0",
                    min: "0",
                    max: "360",
                    step: "1"
                } : {
                    value: "0.5",
                    min: "0",
                    max: "1"
                }
            }
        }
    };
    function m(e, i, n) {
        var a = i.parsed
          , r = i.location;
        if ("Identifier" === a.type && a._symbol === e) {
            var t = l[r];
            if (!t)
                return;
            return [t(n)]
        }
        "Assignment" === a.type && (a = a._expression);
        var o = [];
        switch (a.type) {
        case "FunctionCall":
            var u = a._symbol;
            if (c.hasOwnProperty(u)) {
                var m = c[u];
                a.args.forEach(function(i, n) {
                    if ("Identifier" === i.type && i._symbol === e) {
                        var a = m.paramBounds(n);
                        a && o.push(a)
                    }
                })
            }
            break;
        default:
            return
        }
        return o
    }
    e.computeDefaults = function(e, n, a) {
        for (var r = e.map(function(e) {
            return {
                location: e.location,
                parsed: i.parse(e.latex)
            }
        }), t = {}, o = 0, u = n; o < u.length; o++)
            for (var l = u[o], c = 0, p = r; c < p.length; c++) {
                var s = m(l, p[c], a);
                s && s.length && (t[l] = s[0])
            }
        return t
    }
    ,
    e.checkVariableForBoundRestrictions = m
});
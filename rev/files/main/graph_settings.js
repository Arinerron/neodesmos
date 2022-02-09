
define('main/graph_settings', ['require', 'pjs', 'underscore', 'underscore_model', 'core/graphing-calc/json/graph-settings', 'console', 'core/graphing-calc/json/graph-settings', 'core/lib/color-helpers'], function(require) {
    "use strict";
    var e = require("pjs")
      , r = require("underscore")
      , o = require("underscore_model").UnderscoreModel
      , t = require("core/graphing-calc/json/graph-settings").AxisArrowModes
      , i = require("console")
      , n = require("core/graphing-calc/json/graph-settings").DefaultGraphSettings
      , s = require("core/lib/color-helpers")
      , a = e(o, function(e, c, l) {
        e.init = function() {
            for (var e in c.init.call(this),
            this.stateProperties = [],
            this.cloneProperties = [],
            this.config = new o,
            n)
                n.hasOwnProperty(e) && this.addStateProperty(e, n[e]);
            this.labelHangingColor = "rgba(150,150,150,1)",
            this.lastChangedAxis = "x";
            var r = this;
            function t(e, o, t) {
                function i() {
                    r.setProperty(e, r.config.projectorMode ? t : o)
                }
                r.cloneProperties.push(e),
                r.config.observe("projectorMode", i),
                i()
            }
            function i(e, o, t, i, n) {
                function s() {
                    var s;
                    s = r.config.projectorMode ? r.highlight ? n : i : r.highlight ? t : o,
                    r.setProperty(e, s)
                }
                r.cloneProperties.push(e),
                r.observe("highlight", s),
                r.config.observe("projectorMode", s),
                s()
            }
            t("labelSize", 14, 19),
            t("majorAxisOpacity", .4, 1),
            t("minorAxisOpacity", .12, .25),
            t("axisOpacity", .9, .9),
            t("axisLineWidth", 1.5, 2),
            t("axisLineOffset", .25, 0),
            t("pixelsPerLabel", 80, 120),
            i("curveOpacity", .7, 1, .7, 1),
            t("globalCurveColor", void 0, void 0),
            t("disableFill", !1, !1),
            i("graphLineWidth", 2.5, 3.5, 5, 7),
            i("pointLineWidth", 9, 11, 15, 17)
        }
        ,
        e.addStateProperty = function(e, r) {
            this[e] = r,
            this.stateProperties.push(e),
            this.cloneProperties.push(e)
        }
        ,
        l.fromObject = function(e) {
            var r = a();
            return r.cloneProperties.forEach(function(o) {
                e.hasOwnProperty(o) && r.setProperty(o, e[o])
            }),
            r
        }
        ,
        e.registerCallbacks = function(e, r) {
            var o = this
              , t = function() {
                e.redrawAllLayers()
            };
            this.stateProperties.forEach(function(e) {
                o.observe(e, t)
            }),
            this.config.observe("backgroundColor", t),
            this.config.observe("textColor", t),
            this.config.observe("invertedColors", t),
            this.observe("squareAxes", function() {
                e.viewportController.enforceSquareAxes()
            }),
            this.observe("backgroundColor", function() {
                e.redrawAllLayers()
            }),
            this.observe("textColor", function() {
                e.redrawAllLayers()
            }),
            this.config.observe("enableTabindex", function() {
                e.redrawAllLayers()
            }),
            this.config.observeAndSync("projectorMode", function() {
                e.redrawAllLayers()
            })
        }
        ;
        var d = function(e, o) {
            var n;
            switch (e) {
            case "xAxisMinorSubdivisions":
            case "yAxisMinorSubdivisions":
                o !== (n = Math.round(Math.min(Math.max(0, o), 5))) && i.warn("minorSubdivisions must be an integer between 0 and 5. You provided " + o + ", which we changed to " + n + ".");
                break;
            case "degreeMode":
            case "projectorMode":
            case "showGrid":
            case "showXAxis":
            case "showYAxis":
            case "xAxisNumbers":
            case "yAxisNumbers":
            case "polarNumbers":
            case "enableTabindex":
            case "invertedColors":
                o !== (n = "false" !== o && !!o) && i.warn(e + " must be a Boolean. You provided " + o + " (" + typeof o + "), which we changed to " + n + " (" + typeof n + ").");
                break;
            case "xAxisStep":
            case "yAxisStep":
                n = parseFloat(o),
                isFinite(o) || (n = 0,
                i.warn(e + " must be a number. You provided " + o + ", which we changed to " + n + "."));
                break;
            case "xAxisArrowMode":
            case "yAxisArrowMode":
                (n = t[o]) !== o && (n = t.NONE,
                i.warn("unknown AxisArrowMode. Allowed values are: \n" + r.keys(t).join("\n")));
                break;
            case "xAxisLabel":
            case "yAxisLabel":
                n = o,
                "string" != typeof o && (n = "",
                i.warn(e + " must be a string. you provided a " + typeof o + "."));
                break;
            case "randomSeed":
                n = o,
                "string" != typeof o && (n = "" + o,
                i.warn("randomSeed must be a string. you provided a " + typeof o + "."));
                break;
            case "backgroundColor":
                n = o,
                "string" != typeof o && (n = "",
                i.warn(e + " must be a string. you provided a " + typeof o + ".")),
                n || (n = "#fff"),
                "#" !== n[0] && (n = "#" + n);
                break;
            case "textColor":
                n = o,
                "string" != typeof o && (n = "",
                i.warn(e + " must be a string. you provided a " + typeof o + ".")),
                n || (n = "#000"),
                "#" !== n[0] && (n = "#" + n);
                break;
            case "fontSize":
                n = o,
                "number" != typeof o && (n = parseInt(n, 10),
                i.warn("fontSize must be a number. Attempted to convert " + o + " to " + n + "."));
                break;
            case "language":
                n = o,
                "string" != typeof o && (n = "",
                i.warn(e + " must be a string. you provided a " + typeof o + ".")),
                "undefined" != typeof Desmos && Desmos.supportedLanguages.indexOf(o) < 0 && "en" !== o && (n = "en",
                i.warn(o + " is not currently an available language."));
                break;
            default:
                n = o
            }
            return n
        };
        e._validateSettings = function(e) {
            var r = {}
              , o = !1;
            for (var t in e)
                this.stateProperties.indexOf(t) >= 0 ? r[t] = d(t, e[t]) : (i.warn('Invalid graph setting "' + t + '".'),
                o = !0);
            return o && i.warn("Available graph settings are: \n" + this.stateProperties.join("\n")),
            r
        }
        ,
        e.getBackgroundColor = function() {
            var e = s.normalizeColor(this.config.backgroundColor || "#fff");
            return this.config.invertedColors && "#ffffff" !== e ? s.invertColor(e) : e
        }
        ,
        e.getTextColor = function() {
            var e = s.normalizeColor(this.config.textColor || "#000");
            return this.config.invertedColors && "#000000" !== e ? s.invertColor(e) : e
        }
        ,
        e.setGraphSettings = function(e) {
            var r = this._validateSettings(e);
            for (var o in r)
                r.hasOwnProperty(o) && ("projectorMode" === o || "invertedColors" === o || "fontSize" === o || "language" === o || "backgroundColor" === o || "textColor" === o ? this.config.setProperty(o, r[o]) : this.setProperty(o, r[o]))
        }
    });
    return a
});

define('graphing/canvaslayer', ['require', 'jquery', 'pjs', 'browser'], function(require) {
    "use strict";
    var t = require("jquery")
      , i = require("pjs")
      , a = require("browser");
    return i(function(i) {
        i.init = function(i) {
            this.grapher = i,
            this.$ = t("<div class='dcg-graph-outer' role='img'></div>").attr("aria-roledescription", this.s("graphing-calculator-narration-graphpaper-label")),
            this.canvas_node = t("<canvas class='dcg-graph-inner'></canvas>").css("position", "relative").css("display", "block"),
            this.devicePixelRatio = window.devicePixelRatio || 1,
            this.ctx = this.canvas_node[0].getContext("2d"),
            this.resize(0, 0),
            a.IS_IOS && a.IS_IN_IFRAME && (this.$.css("-webkit-transform", "translate3d(0,-.25px,0)"),
            this.$.append('<div style="width:1px; height:.5px; pointer-events:none; opacity: 0;" aria-hidden="true">text</div>')),
            this.$.append(this.canvas_node)
        }
        ,
        i.resize = function(t, i, a) {
            a = a || this.devicePixelRatio,
            t === this.width && i === this.height || (this.width = t,
            this.height = i,
            this.canvas_node.css("width", t + "px").css("height", i + "px").attr("width", t * a).attr("height", i * a),
            this.ctx = this.canvas_node[0].getContext("2d"),
            this.ctx.scale(a, a))
        }
        ,
        i.s = function(t, i) {
            return this.grapher.controller.s(t, i)
        }
        ,
        i.getAriaLabel = function(t) {
            var i = "";
            if (0 === t)
                return this.s("graphing-calculator-narration-empty-graphpaper");
            i = 1 === t ? this.s("graphing-calculator-narration-graphpaper-one-graph") : this.s("graphing-calculator-narration-graphpaper-multiple-graphs", {
                count: t
            });
            var r = this.grapher.getAudioTrace();
            r && !r.getAudioTraceActive() && (void 0 !== r.agNavigator.getFirstTraceableSketch({
                selectAssociatedExpression: !1
            }) && (a.IS_APPLE ? i += " " + this.s("graphing-calculator-narration-audio-instructions-enter-audio-trace-mac") : i += " " + this.s("graphing-calculator-narration-audio-instructions-enter-audio-trace-windows")));
            return i
        }
        ,
        i.updateAria = function(t, i) {
            this.$.attr("aria-hidden", !t || !this.grapher.settings.config.graphpaper).attr("tabindex", t && this.grapher.settings.config.graphpaper && this.grapher.settings.config.enableTabindex && i > 0 ? 0 : -1).attr("aria-label", this.getAriaLabel(i))
        }
        ,
        i.redraw = function() {}
    })
});

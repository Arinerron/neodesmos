
define('core/math/parsenode/slider', ['require', 'pjs', './assignment', './identifier'], function(require) {
    "use strict";
    var i = require("pjs")
      , s = require("./assignment")
      , e = require("./identifier");
    return i(s, function(i, t, n, r) {
        i.isSlider = !0,
        i.init = function(i, s) {
            t.init.call(this, e(i._symbol), i._expression),
            this.setInputSpan(i._inputSpan),
            this.sliderAssignment = i,
            this.sliderMin = s.sliderMin,
            this.sliderMax = s.sliderMax,
            this.sliderSoftMin = s.sliderSoftMin,
            this.sliderSoftMax = s.sliderSoftMax,
            this.sliderStep = s.sliderStep,
            this.sliderIsPlayingOnce = s.sliderIsPlayingOnce,
            this.sliderMin && this.mergeDependencies(this.sliderMin),
            this.sliderMax && this.mergeDependencies(this.sliderMax),
            this.sliderStep && this.mergeDependencies(this.sliderStep)
        }
        ,
        i.shouldPromoteToSlider = function(i) {
            return !1
        }
        ,
        i.asAssignment = function() {
            return s(this._symbol, this._expression)
        }
    })
});
define('tours/tour_manager', ['require', 'pjs', './trip'], function(require) {
    "use strict";
    var t = require("pjs")
      , i = require("./trip");
    return t(function(t, r) {
        t.init = function() {
            this.tripManager = new i({
                onTripStop: this.stopTour.bind(this)
            }),
            this.currentStep = void 0,
            this.currentTour = void 0
        }
        ,
        t._tripLoop = function() {
            if (clearTimeout(this.__tripLoopTimeout),
            this.running) {
                var t = this;
                t._advanceTrip(),
                t.__tripLoopTimeout = setTimeout(t._tripLoop.bind(t), 200)
            }
        }
        ,
        t._advanceTrip = function() {
            var t = this.currentTour.update()
              , i = (new Date).getTime();
            if (t && this.currentStep && t.content !== this.currentStep.content) {
                if (this.currentStep.delayBeforeExit) {
                    if (this.throttleTimer && i - this.throttleTimer < this.currentStep.delayBeforeExit)
                        return;
                    if (!this.throttleTimer)
                        return void (this.throttleTimer = i)
                }
                t.delayBeforeEnter && (this.currentStep = t,
                this.throttleTimer = i)
            }
            if (!(t && this.currentStep && t.content === this.currentStep.content && this.throttleTimer && i - this.throttleTimer < this.currentStep.delayBeforeEnter) && (this.throttleTimer = null,
            t && !t.doNotUpdate)) {
                if (this.currentStep = t,
                t.final)
                    return void this.finishTour(t, 5);
                this.tripManager.showTripBlock(t)
            }
        }
        ,
        t.updateNow = t._advanceTrip,
        t.startTour = function(t) {
            this.running || (this.currentTour = t,
            this.running = !0,
            this._tripLoop(),
            this.tripManager.fadeInTripBlock())
        }
        ,
        t.closingMsg = function(t, i) {
            return "<b>" + t + "</b><br>This message will self-destruct in " + i + "..."
        }
        ,
        t.finishTour = function(t, i) {
            clearTimeout(this.__tripLoopTimeout),
            this.running = !1;
            var r = this;
            i < 0 ? r.tripManager.stop() : (t.endingMsg && (t.content = r.closingMsg(t.endingMsg, i)),
            r.tripManager.showTripBlock(t),
            setTimeout(function() {
                r.finishTour(t, i - 1)
            }, 1e3))
        }
        ,
        t.stopTour = function() {
            this.running = !1,
            this.currentStep = void 0,
            this.currentTour = void 0
        }
    })
});